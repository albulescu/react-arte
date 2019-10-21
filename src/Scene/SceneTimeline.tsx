import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { TimelineMax, TimelineLite } from 'gsap';
import { SceneView } from './SceneView';
import { ScrollerEvent, EventEmitter } from '../Core/Events';
import { Scene, InternalSceneContext } from '..';

export interface InitialTweenState {
  target: any;
  vars: any;
}

export interface TweenState extends InitialTweenState {
    duration: number;
    position: string;
}

export type Transition = {
  target: Element | Text | null;
  duration: number;
  vars: any;
  position: string | number;
}

export type TransitionFactory = (target: Element | Text | null) => Transition;

export type SceneTransition = Transition | TransitionFactory;

export type SceneContextProps = {
  transitions: {[key: string]: SceneTransition};
}

export const SceneTimelineContext = React.createContext<SceneContextProps>({} as SceneContextProps);



export type SceneTimelineProps = {
  initial: InitialTweenState[],
  states: TweenState[][]
  parallax?: boolean;
}

export type SceneTimelineState = {}

export class SceneTimeline extends Component<SceneTimelineProps, SceneTimelineState> {

  /**
   * Timeline created from container props
   */
  timeline = new TimelineMax({ paused: true });

  /**
   * Keep scene view references
   */
  items: SceneView[] = [];

  /**
   * Context properties
   */
  sceneContextProps: SceneContextProps;

  /**
   * Keep transitions defined in context and setted by SceneView attributes
   */
  contextTransitionsIn: TimelineMax;
  contextTransitionsOut: TimelineMax;

  events: EventEmitter<ScrollerEvent> = new EventEmitter<ScrollerEvent>();

  element: HTMLDivElement;

  componentDidMount() {

    const { initial, states } = this.props;

    const pause = () => this.timeline.pause();

    if (!initial || !states) { return; }

    for(let i=0; i<initial.length; i++) {
      this.timeline.set(
        this.getSceneElement(
          initial[i].target
        ),
        initial[i].vars
      );
    } 

    this.timeline.add(pause);
    this.timeline.play();

    for(let i=0; i<states.length; i++) {
      for(let j=0; j<states[i].length; j++) {
        this.timeline.to(
          this.getSceneElement(
            states[i][j].target
          ),
          states[i][j].duration,
          states[i][j].vars,
          states[i][j].position
        );
      }
      this.timeline.add(pause);
    }

    document.addEventListener('click', () => {
      this.timeline.play();
    });
  }


  /**
   * Called when scene enters viewport
   */
  onScreenEnter() {
    // TODO: Write code here
  }

  /**
   * Called while scene enters viewport
   * @param event Event with progress percent
   */
  onScreenEnterProgress(event: ScrollerEvent) {

    if (!event.data || !this.props.parallax) {
      return;
    }

    const anim = new TimelineLite({ paused: true });

    if (event.data.direction === ScrollerEvent.DirectionForward) {
      anim.fromTo(this.element, 1, {yPercent: -50}, {yPercent: 0});
    } else {
      anim.fromTo(this.element, 1, {yPercent: 50}, {yPercent: 0});
    }
    
    anim.totalProgress(event.data.progress);
  }

  /**
   * Called when scene is completly entred the viewport
   */
  onSceneEnter(_event: ScrollerEvent) {
    // TODO: Write code here
  }

  /**
   * Called when scene starts scrolling inside
   */
  onSceneStart(_event: ScrollerEvent) {
    // TODO: Write code here
  }

  /**
   * On inner scene scrolling progress
   */
  onSceneProgress(_event: ScrollerEvent) {
    // TODO: Write code here
  }

  /**
   * Called when scene leaves
   */
  onSceneLeave(_event: ScrollerEvent) {
    // TODO: Write code here
  }

  /**
   * Scene leave progress
   */
  onScreenLeaveProgress(event: ScrollerEvent) {
    
    if (!event.data || !this.props.parallax) {
      return;
    }

    const anim = new TimelineLite({ paused: true });

    if (event.data.direction === ScrollerEvent.DirectionForward) {
      anim.fromTo(this.element, 1, {yPercent: 0}, {yPercent: 50});
    } else {
      anim.fromTo(this.element, 1, {yPercent: 0}, {yPercent: -50});
    }
    
    anim.totalProgress(event.data.progress);
  }

  /**
   * Called when scene is not visible on the viewport
   */
  onScreenLeave() {
    // TODO: Write code here
  }

  getEvents(): EventEmitter<ScrollerEvent> {
    return this.events;
  }

  getSceneElement(id: string): Element {
    
    if (!id) {
      throw new Error(`Scene id is undefiend`);
    }

    const scene = this.items.find(s => s && s.props.id === id);
    
    if (!scene) {
      throw new Error(`Scene with id ${id} not found`);
    }

    return ReactDOM.findDOMNode(scene) as Element;
  }

  createScenesViews(props: SceneContextProps): React.ReactNode {
    this.sceneContextProps = props;
    return React.Children.map(this.props.children, (scene: React.ReactElement, index: number) => {
      return <scene.type key={index} {...scene.props} ref={(ref: any) => this.items[index] = ref}></scene.type>
    });
  }

  render() {
    return (
      <InternalSceneContext.Consumer>
        {(scene: Scene) => {
          scene.setContainer(this);
          return (
            <SceneTimelineContext.Consumer>
              {(props: SceneContextProps) => (
                <div ref={ref => this.element = ref as HTMLDivElement} className="arte-scene-timeline">
                  {this.createScenesViews(props)}
                </div>
              )}
            </SceneTimelineContext.Consumer>
          )
        }}
      </InternalSceneContext.Consumer>
    )
  }
}
import React, { Component } from 'react';
// @ts-ignore
import { Scroller } from '../Scroller/Scroller';
import { ScrollerEvent, EventEmitter } from '../Core/Events';

export const InternalSceneContext = React.createContext({});

export type SceneProps = {

  scroller: Scroller;

  /**
   * Duration to stick to this section. 
   * The progress of scrolling is sent to the timeline
   */
  duration?: number

  /**
   * Pin scene
   */
  pin?: boolean;

  /**
   * Show / hide animation of this scene
   * Available animations:
   * - parallax
   */
  animation?: string

  /**
   * Animation options
   */
  animationOpts?: any
}

export class Scene extends Component<SceneProps, {}> {

  visible: boolean;

  /**
   * Internal container used by custom component of this scene
   */
  container: any;

  /**
   * Scroller Events of this scene
   */
  events: EventEmitter<ScrollerEvent> = new EventEmitter();

  elementRef: React.RefObject<any> = React.createRef();

  /**
   * Register scene div to the scroller
   * @param ref Reference of scene div
   */
  componentDidMount() {
    this.props.scroller.registerScene(this);
  }

  /**
   * Listen for scrolling events and forward to 
   * custom component and his SceneTimeline
   * @param ref 
   */
  setEvents(ref: Element) {

    const component = ref as any;

    const execCompFn = (fn: string, event?: any) => {

      if (component && typeof(component[fn]) === 'function') {
        component[fn](event);
      }

      if (typeof(this.container) !== 'undefined' &&
        typeof(this.container[fn]) === 'function') {
        this.container[fn](event);
      }
    };

    this.getEvents().on((event: ScrollerEvent) => {

      if (event.name === ScrollerEvent.ScreenEnter) {
        execCompFn('onScreenEnter');
      }

      if (event.name === ScrollerEvent.SceneEnter) {
        execCompFn('onSceneEnter', event);
      }

      if (event.name === ScrollerEvent.SceneStart) {
        execCompFn('onSceneStart', event);
      }

      if (event.name === ScrollerEvent.SceneLeave) {
        execCompFn('onSceneLeave', event);
      }

      if (event.name === ScrollerEvent.SceneProgress) {
        execCompFn('onSceneProgress', event);
      }

      if (event.name === ScrollerEvent.ScreenEnterProgress) {
        execCompFn('onScreenEnterProgress', event);
      }

      if (event.name === ScrollerEvent.ScreenLeaveProgress) {
        execCompFn('onScreenLeaveProgress', event);
      }

      if (event.name === ScrollerEvent.ScreenLeave) {
        execCompFn('onScreenLeave');
      }
    });
  }

  /**
   * Link with this section
   * @param container Used to forward scrolling events
   */
  setContainer(container: any) {
    this.container = container;
  }

  /**
   * Get events for this section
   */
  getEvents():EventEmitter<ScrollerEvent> {
    return this.events;
  }

  /**
   * Get scene div element
   */
  getElement(): HTMLElement {
    return this.elementRef.current;
  }

  render() {

    const { children, scroller } = this.props;

    scroller.reset();
    
    const component: any = React.Children.only(children);

    return (
      <InternalSceneContext.Provider value={this}>
        <div ref={this.elementRef} className="arte-scene">
          <component.type ref={(ref: any) => this.setEvents(ref)}></component.type>
        </div>
      </InternalSceneContext.Provider>
    );
  }
}
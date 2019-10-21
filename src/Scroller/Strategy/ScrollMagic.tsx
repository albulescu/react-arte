// @ts-ignore
import ScrollMagic from 'scrollmagic';
// @ts-ignore
import { ScrollingStrategy } from "./Interfaces";
import { ScrollerEvent, ScrollerEventName } from '../../Core/Events';
import { throttle } from '../../Core/Utils';
import { Scene } from '../..';

export interface ScrollMagicControllerProperties {
  [key: string]: string
}

export interface ScrollMagicSceneProps {
  duration: number
  pushFollowers?:boolean
  fixed?: boolean
  animation?: string;
}

export class ScrollMagicStrategy implements ScrollingStrategy  {
  
  /**
   * ScrollMagic Controller
   */
  controller: any;

  /**
   * ScrollMagic Scenes
   */
  scrollMagicScenes: any[] = [];

  /**
   * Page scenes
   */
  scenes: Scene[] = [];

  /**
   * Throtlled update
   */
  updateThrottled: Function;

  /**
   * Keep last scroll top to find direction
   */
  lastScrollTop = 0;

  constructor(_page: any, _props: ScrollMagicControllerProperties) {
    this.controller = new ScrollMagic.Controller({
      globalSceneOptions:{ triggerHook: 'onLeave' }
    });

    this.updateThrottled = throttle(this.update.bind(this), 5);
    window.addEventListener('scroll', this.onScroll.bind(this));
    window.addEventListener('resize', this.onResize.bind(this));
  }

  onScroll(event: any) {
    var st = window.pageYOffset || document.documentElement.scrollTop;
    if (st > this.lastScrollTop){
      event.wheelDelta = 1;
    } else {
      event.wheelDelta = -1;
    }
    this.updateThrottled(event);
    this.lastScrollTop = st <= 0 ? 0 : st;
  }

  onResize(event: any) {
    this.updateThrottled(event);
  }

  update(event: any) {
    this.scenes.forEach(e => this.verifyScrollVisibilityProgress(event, e));
  }

  verifyScrollVisibilityProgress(event: any, scene: Scene) {

    var delta, direction = '';

    if (event.wheelDelta) {
      delta = event.wheelDelta;
    } else {
      delta = -1 * event.deltaY;
    }

    if (delta < 0) { direction = ScrollerEvent.DirectionReverse; }
    else if (delta > 0) { direction = ScrollerEvent.DirectionForward; }

    var viewport = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
    var rect: DOMRect = scene.getElement().getBoundingClientRect() as DOMRect;
    
    const index = this.scenes.indexOf(scene);
    const state = this.scrollMagicScenes[index].state();
    const inViewPort = this.isOnViewPort(scene.getElement());
    let progress = 0, visibility = '';

    if (inViewPort && !scene.visible) {
      scene.visible = true;
      scene.getEvents().emit(
        new ScrollerEvent(`screen.enter`, { progress, direction })
      );
    }

    if (inViewPort && state === 'AFTER') {
      progress = Math.abs(rect.y / viewport);
      progress = direction === ScrollerEvent.DirectionReverse ? 1 - progress : progress;
      visibility = direction === ScrollerEvent.DirectionReverse ? 'enter' : 'leave';
      
    } else if (inViewPort && state === 'BEFORE' ) {
      progress = Math.abs(rect.y / viewport);
      progress = direction === ScrollerEvent.DirectionForward ? 1 - progress : progress;
      visibility = direction === ScrollerEvent.DirectionForward ? 'enter' : 'leave';
    } else if (!inViewPort && scene.visible ) {
      scene.visible = false;
      scene.getEvents().emit(
        new ScrollerEvent(`screen.leave`, { progress, direction })
      );
    }

    if (visibility !== '') {
      scene.getEvents().emit(
        new ScrollerEvent(
          `screen.${visibility}.progress`,
          { progress, direction }
        )
      );
    }
  }

  isOnViewPort(element: Element) {
    var rect = element.getBoundingClientRect();
    return !(rect.bottom < 0 || rect.right < 0 || rect.left > window.innerWidth || rect.top > window.innerHeight);
  }

  registerScene(scene:Scene): void {
    
    const element = scene.getElement();

    const scrollMagicScene = new ScrollMagic.Scene({
      duration: scene.props.duration ? scene.props.duration : 100,
      triggerElement: element,
    });

    scrollMagicScene.setPin(element, {...scene.props, pushFollowers: true});
    scrollMagicScene.enabled(true);

    const forwardEvent = (name: ScrollerEventName) => () => scene.getEvents().emit(
      new ScrollerEvent(name)
    );

    scrollMagicScene.on('enter', forwardEvent(ScrollerEvent.SceneEnter));
    scrollMagicScene.on('start', forwardEvent(ScrollerEvent.SceneStart));
    scrollMagicScene.on('leave', forwardEvent(ScrollerEvent.SceneLeave));
    scrollMagicScene.on('progress', (event: any) => scene.getEvents().emit(
      new ScrollerEvent(ScrollerEvent.SceneProgress, {progress: event.progress, direction: event.scrollDirection})
    ));

    this.controller.addScene(scrollMagicScene);
    this.scenes.push(scene);
    this.scrollMagicScenes.push(scrollMagicScene);
  }

  start() {}

  reset() {}
}
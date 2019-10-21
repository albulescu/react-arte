export type ScrollerEventName = string;

export class ScrollerEventData {
  direction: string;
  progress: number;
}

export class ScrollerEvent {
  
  static DirectionReverse = 'REVERSE';
  static DirectionForward = 'FORWARD';

  static SceneStart: ScrollerEventName = 'scene.start'
  static SceneEnter: ScrollerEventName = 'scene.enter'
  static SceneLeave: ScrollerEventName = 'scene.leave'
  static SceneProgress: ScrollerEventName = 'scene.progress'
  
  static ScreenEnterProgress: ScrollerEventName = 'screen.enter.progress'
  static ScreenLeaveProgress: ScrollerEventName = 'screen.leave.progress'

  static ScreenEnter: ScrollerEventName = 'screen.enter'
  static ScreenLeave: ScrollerEventName = 'screen.leave'

  constructor(
    public readonly name: ScrollerEventName,
    public readonly data?: ScrollerEventData) {}
}

export interface Listener<T> {
  (event: T): any;
}

export interface Disposable {
  dispose(): void;
}

export class EventEmitter<T> {
  private listeners: Listener<T>[] = [];
  private listenersOncer: Listener<T>[] = [];

  on = (listener: Listener<T>): Disposable => {
    this.listeners.push(listener);
    return {
      dispose: () => this.off(listener)
    };
  }

  once = (listener: Listener<T>): void => {
    this.listenersOncer.push(listener);
  }

  off = (listener: Listener<T>) => {
    var callbackIndex = this.listeners.indexOf(listener);
    if (callbackIndex > -1) this.listeners.splice(callbackIndex, 1);
  }

  emit = (event: T) => {
    /** Update any general listeners */
    this.listeners.forEach((listener) => listener(event));

    /** Clear the `once` queue */
    if (this.listenersOncer.length > 0) {
      const toCall = this.listenersOncer;
      this.listenersOncer = [];
      toCall.forEach((listener) => listener(event));
    }
  }

  pipe = (te: EventEmitter<T>): Disposable => {
    return this.on((e) => te.emit(e));
  }
}
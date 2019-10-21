import React, { Component } from 'react';

export enum SceneType {
  Fade = 'fade',
  Stack = 'stack',
  Static = 'static',
  Overlay = 'overlay'
}

export type SceneProps = {
  id: string
  type: SceneType
}

export class SceneViewTransition extends Component<SceneProps> {
  render() {
    return (
      <div className="arte-scene">
        {this.props.children}
      </div>
    );
  }
}
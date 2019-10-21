import React, { Component } from 'react';

export enum SceneType {
  Fade = 'fade',
  Stack = 'stack',
  Static = 'static',
  Overlay = 'overlay'
}

export type SceneViewProps = {
  id: string;
  type: SceneType | string;
  transitionIn: string;
  transitionOut: string;
}

export class SceneView extends Component<SceneViewProps> {
  render() {
    return (
      <div className="arte-scene-view">
        {this.props.children}
      </div>
    );
  }
}
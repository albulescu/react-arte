import React, { Component } from 'react';

export interface SceneStateProps {}
export interface SceneStateComponentState {}

export class SceneState extends Component<SceneStateProps,SceneStateComponentState>  {
  render() {
    return (
      <div className="arte-scene-state">
        {this.props.children}
      </div>
    );
  }
}
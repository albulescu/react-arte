import React, { Component } from 'react';
import { SceneState } from './SceneState';
import { InternalSceneContext, Scene } from '../Scene/Scene';

export interface SceneStatesProps {
  duration?: number,
  transitions: any;
  vsize?: boolean;
  trigger: string;
}
export interface SceneStatesComponentState {}

export class SceneStateList extends Component<SceneStatesProps, SceneStatesComponentState>  {

  static defaultProps = {
    trigger: 'default',
    duration: 1,
  };

  stateRefs: React.RefObject<SceneState>[] = [];
  currentState: string;

  next() {
    // TODO: Write code here for moving to next state
  }

  registerStateRef(ref: React.RefObject<SceneState>, index: number) {
    this.stateRefs[index] = ref;
  }

  createStateView() {
    return React.Children.map(this.props.children, (child: React.ReactElement, index) => {
      <child.type key={index} ref={(ref: React.RefObject<SceneState>) => this.registerStateRef(ref, index)}></child.type>
    });
  }

  render() {
    const { vsize } = this.props;
    const classes = ['arte-scene-state-lists'];
    if (vsize) { classes.push('vsize'); }
    return (
      <InternalSceneContext.Consumer>
        {(scene: Scene) => {
          scene.setContainer(this);
          return (
            <div className={classes.join(', ')}>
              {this.createStateView()}
            </div>
          );
        }}
      </InternalSceneContext.Consumer>
    );
  }
}
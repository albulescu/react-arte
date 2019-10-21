import React, { Component } from 'react'
import { SceneView, SceneTimeline } from 'react-arte'

import './Video.css';

export default class VideoComponent extends Component {

  onScreenEnter() {
    console.log('Video::onScreenEnter');
  }

  onScreenEnterProgress(event) {
    console.log('Video::onScreenEnterProgress', event.data);
  }

  onSceneEnter(event) {
    console.log('Video::onSceneEnter');
  }

  onSceneStart(event) {
    console.log('Video::onSceneStart');
  }

  onSceneProgress(event) {
    console.log('Video::onSceneProgress', event.data);
  }

  onSceneLeave(event) {
    console.log('Video::onSceneLeave');
  }

  onScreenLeaveProgress(event) {
    console.log('Video::onScreenLeaveProgress', event.data);
  }

  onScreenLeave() {
    console.log('Video::onScreenLeave');
  }

  render() {
    
    const initial = [];

    const states = [];

    return (
      <SceneTimeline parallax initial={initial} states={states}>
        <SceneView transitionIn="slideIn" transitionOut="slideOut" type="static" id="menu">
          <div className="video">
            Video component page
          </div>
        </SceneView>
      </SceneTimeline>
    )
  }
}

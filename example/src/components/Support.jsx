import React, { Component } from 'react'
import { SceneView, SceneTimeline } from 'react-arte'

export default class SupportComponent extends Component {

  render() {
    
    const initial = [];

    const states = [];

    return (
      <SceneTimeline initial={initial} states={states}>
        <SceneView type="static" id="menu">
          <div className="support">
            Support
          </div>
        </SceneView>
      </SceneTimeline>
    )
  }
}

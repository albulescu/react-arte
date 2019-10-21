import React, { Component } from 'react'
import { SceneView, SceneTimeline } from 'react-arte'

export default class ColorsComponent extends Component {

  render() {
    
    const initial = [];

    const states = [];

    return (
      <SceneTimeline initial={initial} states={states}>
        <SceneView type="static" id="menu">
          <div className="colors">
            Colors Component
          </div>
        </SceneView>
      </SceneTimeline>
    )
  }
}

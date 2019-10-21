import React, { Component } from 'react'
import { SceneView, SceneTimeline } from 'react-arte'

export default class CompareComponent extends Component {

  render() {
    
    const initial = [];

    const states = [];

    return (
      <SceneTimeline initial={initial} states={states}>
        <SceneView type="static" id="menu">
          <div className="compare">
            Compare
          </div>
        </SceneView>
      </SceneTimeline>
    )
  }
}

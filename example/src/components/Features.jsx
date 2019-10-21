import React, { Component } from 'react'
import { SceneView, SceneTimeline } from 'react-arte'

export default class FeaturesComponent extends Component {

  render() {
    
    const initial = [];

    const states = [];

    const style = {
      background: '#000',
      color: '#ffffff',
      padding: '10px',
      position: 'absolute',
    };

    return (
      <SceneTimeline initial={initial} states={states}>
        <SceneView type="static" id="menu"><div style={style}>Scene X</div></SceneView>
        <SceneView id="blades"><div style={style}>Scene Y</div></SceneView>
        <SceneView id="waterproof"><div style={style}>Scene Z</div></SceneView>
        <SceneView id="battery"><div style={style}>Scene D</div></SceneView>
        <SceneView id="autosense"><div style={style}>Scene D</div></SceneView>
      </SceneTimeline>
    )
  }
}

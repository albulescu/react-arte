import React, { Component } from 'react'
import { SceneView, SceneTimeline } from 'react-arte'

export default class HeaderComponent extends Component {

  render() {

    const initial = [
      { target: "a", vars: { x: 50, y: 0 }},
      { target: "b", vars: { x: 50, y: 100 }},
      { target: "c", vars: { x: 50, y: 200 }},
      { target: "d", vars: { x: 50, y: 300 }},
    ];

    const states = [
      [
        { target: "a", duration: 0.3, vars: { x: 200 }, position: 'x+=0'},
        { target: "b", duration: 0.3, vars: { x: 200 }, position: 'x+=0.1'},
        { target: "c", duration: 0.3, vars: { x: 200 }, position: 'x+=0.2'},
        { target: "d", duration: 0.3, vars: { x: 200 }, position: 'x+=0.3'},
      ],
      [
        { target: "a", duration: 0.3, vars: { x: 800 }, position: 'y+=0'},
        { target: "b", duration: 0.3, vars: { x: 800 }, position: 'y+=0.1'},
        { target: "c", duration: 0.3, vars: { x: 800 }, position: 'y+=0.2'},
        { target: "d", duration: 0.3, vars: { x: 800 }, position: 'y+=0.3'},
      ]
    ];

    const style = {
      background: '#000',
      color: '#ffffff',
      padding: '10px',
      position: 'absolute',
    };

    return (
      <SceneTimeline initial={initial} states={states}>
        <SceneView id="a"><div style={style}>Scene X</div></SceneView>
        <SceneView id="b"><div style={style}>Scene Y</div></SceneView>
        <SceneView id="c"><div style={style}>Scene Z</div></SceneView>
        <SceneView id="d"><div style={style}>Scene D</div></SceneView>
      </SceneTimeline>
    )
  }
}

import React, { Component } from 'react'

import { Linear } from 'gsap';

import { Page, Scene, SceneTimelineContext } from 'react-arte'
import HeaderComponent from './components/Header';
import FeaturesComponent from './components/Features';
import VideoComponent from './components/Video';
import SupportComponent from './components/Support';
import UpgradeComponent from './components/Upgrade';
import TechnicalComponent from './components/Technical';
import ColorsComponent from './components/Colors';
import CompareComponent from './components/Compare';

export default class App extends Component {
  render() {

    const sceneContextProps = {
      transitions: {
        
        "slideIn::initial": (target) => {
          return {
            duration: 1,
            vars: { yPercent: -50, ease: Linear.easeNone }
          }
        },

        "slideIn": (target) => {
          return {
            duration: 1,
            vars: { yPercent: 0, ease: Linear.easeNone }
          }
        },

        "slideOut": (target) => {
          return {
            duration: 1,
            vars: { yPercent: 50, ease: Linear.easeNone }
          }
        },
      },
    }

    //const scrollerProps = {
    //  globalSceneOptions:{ triggerHook: 'onLeave' }
    //};
    
    return (
      <SceneTimelineContext.Provider value={sceneContextProps}>
        <Page scroller="scrollmagic">
          <Scene>
            <HeaderComponent />
          </Scene>
          <Scene>
            <FeaturesComponent />
          </Scene>
          <Scene>
            <VideoComponent />
          </Scene>
          <Scene>
            <SupportComponent />
          </Scene>
          <Scene>
            <UpgradeComponent />
          </Scene>
          <Scene>
            <TechnicalComponent />
          </Scene>
          <Scene>
            <ColorsComponent />
          </Scene>
          <Scene>
            <CompareComponent />
          </Scene>
        </Page>
      </SceneTimelineContext.Provider>
    )
  }
}

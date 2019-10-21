# react-arte

> 

[![NPM](https://img.shields.io/npm/v/react-arte.svg)](https://www.npmjs.com/package/react-arte) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save react-arte
```

## Usage

```tsx
import * as React from 'react'

import { Page, Scene, SceneTimeline, SceneView } from 'react-arte'

class ComponentA extends React.Component {
  render() {
    return (
      <SceneTimeline>
        <SceneView>
          Custom component A
        </SceneView>
      </SceneTimeline>
    )
  }
}

class ComponentB extends React.Component {
  render() {
    return (
      <SceneTimeline parallax>
        <SceneView>
          Custom component B
        </SceneView>
      </SceneTimeline>
    )
  }
}

class ComponentC extends React.Component {
  render() {
    return (
      <SceneTimeline>
        <SceneView>
          Custom component C
        </SceneView>
      </SceneTimeline>
    )
  }
}

class Example extends React.Component {
  render () {
    return (
      <Page>
        <Scene>
          <ComponentA />
        </Scene>
        <Scene>
          <ComponentB />
        </Scene>
        <Scene>
          <ComponentC />
        </Scene>
      </Page>
    )
  }
}
```

## License

MIT © [artus.com](https://github.com/artus.com)

import React, { Component } from 'react'
import { render } from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import Script from 'react-load-script'
// import App from './containers/App'
import LoginContainer from './containers/LoginContainer'
import config from './api'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = { gapiLoaded: false }
  }


  render() {
    const handleScriptError = () => this.setState({ gapiLoaded: false })
    const handleScriptLoad = () => {
      const initClient = () =>
        gapi.client.init(config).then( () =>
          this.setState({ gapiLoaded: true }))

      gapi.load('client:auth2', initClient)
    }

    let element
    if (this.state.gapiLoaded) {
      element = (
        <BrowserRouter>
          <LoginContainer gapi={gapi} />
        </BrowserRouter>
      )
    } else {
      element = <div>Loading GAPI</div>
    }

    return (
      <div>
        <Script
          url="https://apis.google.com/js/api.js"
          onError={handleScriptError}
          onLoad={handleScriptLoad}
        />
        {element}
      </div>
    )
  }
}

render(
  <App />,
  document.getElementById('app')
)

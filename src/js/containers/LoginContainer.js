import React, { Component } from 'react'
import Button from '../components/Button'
import CalendarContainer from '../containers/CalendarContainer'

class Login extends Component {
  constructor(props) {
    super(props)

    this.state = { isLoggedIn: false }

    this.handleLoginClick = this.handleLoginClick.bind(this)
    this.handleLogoutClick = this.handleLogoutClick.bind(this)
  }

  componentWillMount() {
    const getLoginState = () =>
      this.props.gapi.auth2.getAuthInstance().isSignedIn.get()
    this.setState({ isLoggedIn: getLoginState() })

    this.props.gapi.auth2.getAuthInstance().isSignedIn
      .listen(() => this.setState({ isLoggedIn: getLoginState() }))
  }
  handleLoginClick() {
    this.props.gapi.auth2.getAuthInstance().signIn()
  }

  handleLogoutClick() {
    this.props.gapi.auth2.getAuthInstance().signOut()
  }

  render() {
    const { isLoggedIn } = this.state
    let button

    if (isLoggedIn) {
      button = <Button onClick={this.handleLogoutClick} text="Logout" />
    } else {
      button = <Button onClick={this.handleLoginClick} text="Login" />
    }

    return (
      <div>
        {button}
        <CalendarContainer gapi={this.props.gapi} />
      </div>
    )
  }
}

export default Login

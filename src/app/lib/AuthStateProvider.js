// wrapper for Firebase authentication with lazy-loading

import React from 'react'
import firebaseManager from './firebaseManager'


class AuthStateProvider extends React.Component {

  state = {
    isLoading: true,
    error: null,
    auth: null,
  }

  componentDidMount() {
    this.unsubscribe = firebaseManager.sharedInstance.firebase().auth()
      .onAuthStateChanged(this.handleAuth, this.handleError)
  }

  componentWillUnmount() {
    if (this.unsubscribe) {
      this.unsubscribe()
    }
  }

  handleAuth = auth => {
    this.setState({
      isLoading: false,
      auth,
      error: null,
    })
  }

  handleError = error => {
    this.setState({
      isLoading: false,
      auth: null,
      error,
    })
  }

  render() {
    return this.props.children(this.state)
  }

}

export default AuthStateProvider

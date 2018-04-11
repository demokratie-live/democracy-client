import React from "react";

export default function prevetNavStackDuplicate(Component) {
  return class PreventNavStackDuplicate extends React.Component {

    componentDidMount() {
      this.props.navigator.setOnNavigatorEvent(event => {
        if (event.id === 'didDisappear') {
          this.navigated = null
        }
      })
    }

    navigated = null

    navigateTo = screenOptions => {
      if (!this.navigated) {
        this.props.navigator.push(screenOptions)
      }

      this.navigated = true
    }

    render() {
      return <Component {...this.props} navigateTo={this.navigateTo} />
    }

  }
}

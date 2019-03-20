import React from 'react'
import FirebaseProvider from './Firebase'

class Provider extends React.Component {
	render() {
		return <FirebaseProvider>{this.props.children}</FirebaseProvider>
	}
}

export default Provider

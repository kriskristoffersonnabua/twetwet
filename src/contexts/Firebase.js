import React from 'react'
import firebase from 'firebase'
import { forIn } from 'lodash'

const FirebaseContext = React.createContext()

class FirebaseProvider extends React.Component {
	constructor(props) {
		super(props)
		//this should be on env
		this.state = {
			twets: []
		}
		var config = {
			apiKey: 'AIzaSyDviAg2ubfmyCfQSu0fxUP1qgap_2Tpl6o',
			authDomain: 'twettwet-c4151.firebaseapp.com',
			databaseURL: 'https://twettwet-c4151.firebaseio.com',
			projectId: 'twettwet-c4151',
			storageBucket: 'twettwet-c4151.appspot.com',
			messagingSenderId: '478488113549'
		}
		firebase.initializeApp(config)
	}

	componentDidMount() {
		this.getTwetsController = firebase.database().ref()
		this.getTwetsController.child('twets').on('value', snapshot => {
			let twets = []
			forIn(snapshot.val(), (val, key) =>
				twets.push({
					id: key,
					...val
				})
			)
			this.setState({ twets })
		})
	}

	componentWillUnmount() {
		this.getTwetController.off()
	}

	addTwet = twet => {
		const fR = firebase.database().ref()
		const key = fR.child('twets').push().key
		fR
			.child('twets')
			.child(key)
			.set(twet)
		fR.off()
	}

	//returns a promise that resolve the snapshot of the node
	getNode = node => {
		return firebase
			.database()
			.ref()
			.child(node)
			.once('value')
	}

	updateNode = (node, updates) => {
		firebase
			.database()
			.ref(node)
			.update(updates)
	}

	deleteNode = node => {
		firebase
			.database()
			.ref(node)
			.remove()
	}

	//subscribe to current node, returns ref
	subscribeToNode = (node, callback) => {
		const ref = firebase.database().ref(node)
		ref.on('value', callback)
		return ref
	}

	unsubscribeFromNode = nodeRef => nodeRef.off()

	//TODO: remove node

	render() {
		const fns = {
			addTwet: this.addTwet,
			getNode: this.getNode,
			updateNode: this.updateNode,
			deleteNode: this.deleteNode,
			subscribeToNode: this.subscribeToNode,
			unsubscribeFromNode: this.unsubscribeFromNode
		}

		return (
			<FirebaseContext.Provider value={{ ...this.state, ...fns }}>
				{this.props.children}
			</FirebaseContext.Provider>
		)
	}
}

const withFirebase = Component => props => {
	return (
		<FirebaseContext.Consumer>
			{firebaseContext => {
				return <Component {...firebaseContext} {...props} />
			}}
		</FirebaseContext.Consumer>
	)
}

export { withFirebase, FirebaseProvider as default }

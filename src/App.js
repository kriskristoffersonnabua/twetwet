import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom'
import logo from './logo.svg'
import Home from './screens/Home'
import Provider from './contexts'
import './App.css'

class App extends Component {
	render() {
		return (
			<Router>
				<Provider>
					<div>
						<ul>
							<Link to="/Home">Home</Link>
						</ul>
					</div>
					<Switch>
						<Route exact path="/" component={Home} />
						<Route path="/Home" component={Home} />
						<Route render={() => <div>Page Not Found</div>} />
					</Switch>
				</Provider>
			</Router>
		)
	}
}

export default App

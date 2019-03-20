import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom'
import logo from './logo.svg'
import Home from './screens/Home'
import NotFound from './screens/NotFound'
import Provider from './contexts'
import './App.css'
import 'bulma/css/bulma.min.css'

class App extends Component {
	render() {
		return (
			<Router>
				<Provider>
					<nav className="navbar">
						<div className="navbar-brand">
							<a className="navbar-item" href="localhost:1234">
								<img
									src={require('./assets/brand.png')}
									width="112"
									height="28"
								/>
							</a>

							<a
								role="button"
								className="navbar-burger burger"
								aria-label="menu"
								aria-expanded="false"
								data-target="navbarBasicExample">
								<span aria-hidden="true" />
								<span aria-hidden="true" />
								<span aria-hidden="true" />
							</a>
						</div>
						<div className="navbar-menu">
							<div className="navbar-start">
								<div className="navbar-item">
									<Link to="/home">Home</Link>
								</div>
								<div className="navbar-item">
									<Link to="/about">About</Link>
								</div>
							</div>
							<div className="navbar-end">
								<div className="navbar-item">
									<Link
										to="/signup"
										className="button is-primary">
										Sign Up
									</Link>
								</div>
								<div className="navbar-item">
									<Link
										to="/login"
										className="button is-light">
										Log In
									</Link>
								</div>
							</div>
						</div>
					</nav>
					<Switch>
						<Route exact path="/" component={Home} />
						<Route path="/Home" component={Home} />
						<Route component={NotFound} />
					</Switch>
				</Provider>
			</Router>
		)
	}
}

export default App

import React from 'react'
import HomeForm from '../../components/Home/Form'
import Twet from '../../components/Home/Twet'
import { withFirebase } from '../../contexts/Firebase'

class Home extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			twets: []
		}
	}

	static getDerivedStateFromProps(nextProps) {
		return {
			twets: nextProps.twets
		}
	}

	render() {
		return (
			<div>
				<HomeForm />
				<ul>
					{this.state.twets
						.sort((a, b) => b.created - a.created)
						.map(twet => {
							return <Twet key={twet.id} tid={twet.id} />
						})}
				</ul>
			</div>
		)
	}
}

export default withFirebase(Home)

import React from 'react'
import { withFirebase } from '../../../contexts/Firebase'

class HomeForm extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			twet: ''
		}
	}

	//TODO: submit tweet
	submitTwet = () => {
		const { addTwet } = this.props
		if (!!this.state.twet) {
			addTwet({ twet: this.state.twet, created: Date.now() })
			this.setState({ twet: '' })
		}
	}

	replyTweet = () => {
		//reply node
		const { replies, updateNode, tid } = this.props
		if (!!this.state.twet) {
			let newReplies = replies
			newReplies.push({ reply: this.state.twet })
			console.log(tid, newReplies)
			updateNode(`twets/${tid}`, { replies: newReplies })
			this.setState({ twet: '' })
		}
	}

	setValue = evt => {
		this.setState({
			[evt.currentTarget.name]: evt.currentTarget.value
		})
	}

	render() {
		const { twet } = this.state
		const { isReply } = this.props

		return (
			<div>
				<textarea value={twet} onChange={this.setValue} name="twet" />
				<button onClick={!isReply ? this.submitTwet : this.replyTweet}>
					submit
				</button>
			</div>
		)
	}
}

export default withFirebase(HomeForm)

import React from 'react'
import { withFirebase } from '../../../contexts/Firebase'
import HomeForm from '../Form'

class Twet extends React.Component {
	constructor(props) {
		super(props)
		this.state = { showReplyForm: false, replies: [] }
	}

	static getDerivedStateFromProps(nextProps) {
		const { tid } = nextProps
		return { tid }
	}

	componentDidMount() {
		this.twetRef = this.props.subscribeToNode(
			`twets/${this.state.tid}`,
			snapshot => {
				this.setState({ ...snapshot.val() })
			}
		)
	}

	componentWillUnmount() {
		this.twetRef.off()
	}

	removeTwet = () => {
		this.twetRef.off()
		this.props.deleteNode(`twets/${this.state.tid}`)
	}

	retwet = () => {
		const { twet } = this.state
		this.props.addTwet({ twet, created: Date.now() })
	}

	toggleReplyForm = () =>
		this.setState({ showReplyForm: !this.state.showReplyForm })

	render() {
		const { twet, showReplyForm, tid } = this.state
		return (
			<div>
				<div>
					<p>{!!twet && twet}</p>
					<button onClick={this.toggleReplyForm}>reply</button>
					<button onClick={this.retwet}>retweet</button>
					<button onClick={this.removeTwet}>delete</button>
				</div>
				<ul>
					{this.state.replies.map(reply => {
						return <p>{reply.reply}</p>
					})}
					{showReplyForm ? (
						<HomeForm
							isReply={true}
							tid={tid}
							replies={this.state.replies}
						/>
					) : null}
				</ul>
			</div>
		)
	}
}

export default withFirebase(Twet)

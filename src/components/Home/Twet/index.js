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
			<div className="media" style={{ padding: '10px' }}>
				<figure class="media-left">
					<p class="image is-64x64">
						<img src="https://api.adorable.io/avatars/285/abott@adorable.png" />
					</p>
				</figure>
				<div className="media-content">
					<p>
						<strong style={{ marginRight: '5px' }}>
							Anonymous Stranger
						</strong>
						<small>@anony</small>
					</p>
					<p>{!!twet && twet}</p>
					<a class="icon" onClick={this.toggleReplyForm}>
						<i class="fas fa-reply" />
					</a>
					<a class="icon" onClick={this.retwet}>
						<i class="fas fa-retweet" />
					</a>
					<a class="icon" onClick={this.removeTwet}>
						<i class="fas fa-trash" />
					</a>
					<br />
					<div>
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
					</div>
				</div>
			</div>
		)
	}
}

export default withFirebase(Twet)

import React from 'react'
import './NotFound.css'

class NotFound extends React.Component {
	render() {
		return (
			<div
				style={{
					display: 'flex',
					width: '100%',
					height: '70vh',
					justifyContent: 'center',
					alignItems: 'center',
					fontFamily: 'Roboto Mono',
					color: '#d10000'
				}}>
				<span className="notfound">404</span>
				<img
					className="imagekuno"
					src="https://www.geek.com/wp-content/uploads/2018/08/religious-horror-movies-625x351.jpg"
				/>
			</div>
		)
	}
}

export default NotFound

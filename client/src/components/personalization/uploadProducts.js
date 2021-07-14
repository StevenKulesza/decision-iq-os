import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Row, Col, Button } from 'reactstrap'
import Dropzone from 'react-dropzone'
import ModalGeneral from '../global/modals/modal'
import * as dropBasic from '../../styles/dropzone/dropzone'
import * as buttonStyles from '../../styles/button/button'

import { addProduct } from '../../actions/templates'

class UploadProducts extends Component {
	constructor() {
    super()
    this.state = {
		accepted: [],
		rejected: [],
		csvJson: []
	}
	
	this.onCsvDropped = this.onCsvDropped.bind(this);
  }

  	onCsvDropped(accepted, rejected) { 
		this.setState({ accepted, rejected }); 

		accepted.forEach(file => {
			const req = new XMLHttpRequest();
			let formData = new FormData();
			let fileToUpload = file;

			// add the selected category
			formData.append("csv", fileToUpload);
			formData.append("type", "product");
			req.onload = onloadHandler.bind(this);
			req.open("PUT", "/feeds/json/create");
			req.send(formData);
			function onloadHandler() {
				this.setState({ csvJson: JSON.parse(req.response)},
				() => this.state.csvJson.map(data => this.props.addProduct(data))
				)
			};
		});

	}

  render() {
	const { accepted, rejected } = this.state;

    return (
		<ModalGeneral
			buttonColor='link'
			buttonLabel='(+) Import Products'
			title='Upload CSV file'
			actionButton='Done'
		>
			<Row>
				<Col>
					<Dropzone
						onDrop={this.onCsvDropped}
						accept=".csv, text/plain, application/vnd.ms-excel"
					>
						{({ getRootProps, getInputProps }) => (
							<section>
								<div {...getRootProps()} className={dropBasic.dropBasic}>
									<input {...getInputProps()} />
									<p>Drag 'n' drop some files here, or click to select files.</p>
									<Button
										className={buttonStyles.btn}
										color='primary'>
										Add Files
									</Button>
								</div>
							</section>
						)}
					</Dropzone>
					{accepted.length >= 1 ? 
						<Row className='mt-3'>
							<Col>
								<h5>
									{accepted.length === 1 ?
										accepted.length + ' accepted file' :
										accepted.length + ' accepted files'}
								</h5>
							</Col>
							<Col>
								<h5>
									{rejected.length === 1 ?
										rejected.length + ' rejected file' :
										rejected.length + ' rejected files'}
								</h5>
							</Col>
						</Row>
					: null}
					<ul>
					{this.state.csvJson.map(item => {
						return <li>{item.image.imageID +'-'+ item.product_id +'-'+ item.division + '-' + item.description}</li>
					})}
					</ul>
				</Col>
			</Row>
		</ModalGeneral>
    )
  }
}

const mapStateToProps = (state) => ({
})

const mapDispatchToProps = dispatch => ({
	addProduct: (data) => { dispatch(addProduct(data)) }
})

export default connect(mapStateToProps, mapDispatchToProps)(UploadProducts)

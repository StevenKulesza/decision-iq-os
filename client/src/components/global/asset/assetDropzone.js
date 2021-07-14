import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Row, Col, Button, Label } from 'reactstrap'
import Dropzone from 'react-dropzone'
import Select from 'react-virtualized-select'

import { fetchBlobs } from '../../../actions/blobs';
import * as dropBasic from '../../../styles/dropzone/dropzone'
import * as buttonStyles from '../../../styles/button/button'

class AssetDropzone extends Component {
	constructor() {
		super()
		this.state = {
			accepted: [],
			rejected: [],

			// TODO: Move this out of state and into template options
			assetTypes: [{
				label: 'All',
				value: 'all'
			},
			{
				label: 'Product',
				value: 'product'
			},
			{
				label: 'Arrow',
				value: 'arrow'
			},
			{
				label: 'Background',
				value: 'background'
			},
			{
				label: 'Logo',
				value: 'logo'
			},
			{
				label: 'Offer',
				value: 'offer'
			},
			{
				label: 'Personalization',
				value: 'personalization'
			}],
			selectedCategory: {
				label: 'All',
				value: 'all'
			}
		}

		this.onImageDropped = this.onImageDropped.bind(this);
		this.handleChange = this.handleChange.bind(this);
	}

	handleChange = (data) => {
		this.setState({
			selectedCategory: data
		})
		if (this.props.onChange) this.props.onChange(data);
	};

	onImageDropped(accepted, rejected) {
		if (this.props.flight && this.props.flight.name === "") {
			alert('Please insert flight name in previous step');
		} else {
			this.setState({ accepted, rejected });

			accepted.forEach(file => {
				const req = new XMLHttpRequest();
				let formData = new FormData();
				let fileToUpload = file;

				// add the selected category
				formData.append("image", fileToUpload);
				formData.append("category", this.state.selectedCategory.value);
				formData.append("client", this.props.client.name)
				formData.append("flight", this.props.flight.name)

				req.onload = onloadHandler.bind(this);
				req.open("PUT", "/blobs/upload/create");
				req.send(formData);

				function onloadHandler() {
					this.props.dispatch(fetchBlobs(this.props.client.name, this.props.flight.name));
				};
			});
		}
	}

	render() {
		const { accepted, rejected, assetTypes, selectedCategory } = this.state;
		return (
			<React.Fragment>
				<Row className='mb-3'>
					<Col sm={'4'} className="text-left">
						<Label>Image Category:</Label>
						<Select
							value={selectedCategory}
							options={assetTypes}
							onChange={this.handleChange}
						/>
					</Col>
				</Row>
				<Row>
					<Col>
						<Dropzone 
							onDrop={this.onImageDropped}
							accept="image/jpeg, image/svg+xml, image/png"
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
					</Col>
				</Row>
			</React.Fragment>
		)
	}
}

const mapStateToProps = (state) => ({
	client: state.client,
	flight: state.flight
})


export default connect(mapStateToProps)(AssetDropzone)

import React, { Component } from 'react'
import { Table, ButtonGroup, Button, Badge, Col, Row } from 'reactstrap'
import { css } from 'emotion'
import { IoIosTrash, IoMdEye,IoIosGrid, IoIosListBox } from 'react-icons/io'
import { connect } from 'react-redux';
import ModalGeneral from '../modals/modal'
import Pagination from '../pagination/pagination'
import GeneralCard from '../cards/general'

// Actions
import { deleteBlob } from '../../../actions/blobs';

import * as styles from '../../../styles/table/table'

class AssetTable extends Component {
	constructor(){
        super();
        this.state = {
			currentPage: 1,
			itemsPerPage: 10,
			layout: 'grid'
        }
        this.handleClick = this.handleClick.bind(this);
	}

	handleClick(event) {
        console.log(Number(event))
        this.setState({
            currentPage: Number(event.target.id)
        });
	}
	onRadioBtnClick(type) {
    	this.setState({ layout:type });
  	}

	render () {
		// Logic for displaying current items
		const { currentPage, itemsPerPage } = this.state;
		const indexOfLastItem = currentPage * itemsPerPage;
		const indexOfFirstItem = indexOfLastItem - itemsPerPage;
		const currentItems = this.props.data.slice(indexOfFirstItem, indexOfLastItem);

		const viewIcon =  <IoMdEye />;
		const trashIcon = <IoIosTrash/>;
		

		let assets = (this.props.data.length > 0) ? currentItems.map((data, index) => {
			if (this.state.layout === 'list') {
				return (
				<tr key={data.label+data.lastModified}>
					<td>{data.label ? data.label : '-' }</td>
					<td><Badge color="info" pill>{data.category ? data.category : '-' }</Badge></td>
					<td>{data.dimensions ? data.dimensions : '-'}</td>
					<td>{data.size ? data.size : '-'}</td>
					<td>{data.lastModified ? data.lastModified : '-'}</td>
					<td>
						<ButtonGroup>
								<ModalGeneral
									buttonColor='link'
									buttonLabel={viewIcon}
									title={'Preview of ' + data.label}
									actionButton='Done'
								>
									<img className="mb-3" src={data.file} alt={data.label}/>
								</ModalGeneral>
								{' '}
								<ModalGeneral
									buttonColor='link'
									buttonLabel={trashIcon}
									actionType='delete'
									actionButton='Delete'
									title={'Are You Sure you want to delete ' + data.label + '?'}
									onClick={()=>{this.props.deleteBlob(data.label, this.props.client.name, this.props.flight.name)}}
								>
									<img className="mb-3" src={data.file} alt={data.label}/>
								</ModalGeneral>	
						</ButtonGroup>
					</td>
				</tr>
			)
		}
		else {
			return (
				<Col sm={3} className='pb-3'>	
					<GeneralCard>
						<div style={{height: '150px', width: '100%', overflow: 'hidden', backgroundColor: '#f7f7f7'}}>
							<img style={{maxHeight:'100%'}} className="mb-3" src={data.file} alt={data.label}/>
						</div>
						<div><p className='pt-2'>{data.label ? data.label : '-' }</p></div>
						<div><Badge color="info" pill>{data.category ? data.category : '-' }</Badge></div>
						<div>{data.dimensions ? data.dimensions : '-'}</div>
						<div>{data.size ? data.size + ' B' : '-'}</div>
						<div>{data.lastModified ? data.lastModified : '-'}</div>
						<ButtonGroup>
								<ModalGeneral
									buttonColor='link'
									buttonLabel={viewIcon}
									title={'Preview of ' + data.label}
									actionButton='Done'
								>
									<img className="mb-3" src={data.file} alt={data.label}/>
								</ModalGeneral>
								{' '}
								<ModalGeneral
									buttonColor='link'
									buttonLabel={trashIcon}
									actionType='delete'
									actionButton='Delete'
									title={'Are You Sure you want to delete ' + data.label + '?'}
									onClick={()=>{this.props.deleteBlob(data.label, this.props.client.name, this.props.flight.name)}}
								>
									<img className="mb-3" src={data.file} alt={data.label}/>
								</ModalGeneral>	
						</ButtonGroup>
					</GeneralCard>
				</Col>
			)
		}
			
		}) : <tr><td>No Assets Available. Press "Add New" to upload.</td></tr>;

		let assetContainer = (this.state.layout === 'list') ?
			<Table striped responsive hover className={css`${styles.table}`}>
				<thead>
				<tr>
					<th>Name</th>
					<th>Type</th>
					<th>Dimensions</th>
					<th>Size</th>
					<th>Date</th>
					<th>Action</th>
				</tr>
				</thead>
				<tbody>
					{assets}
				</tbody>
			</Table> :
			<Row>
				{assets}
			</Row>


		return (
			<React.Fragment>
				<hr/>
				<Row>
					<Col>
					</Col>
					<Col>
					</Col>
					<Col className='text-right'>				
						<ButtonGroup>
							<Button color="info" onClick={() => this.onRadioBtnClick('grid')} active={this.state.layout === 'grid'}><IoIosGrid/></Button>
							<Button color="info" onClick={() => this.onRadioBtnClick('list')} active={this.state.layout === 'list'}><IoIosListBox/></Button>
						</ButtonGroup>
					</Col>
				</Row>
				<hr/>
				{assetContainer}
				<Pagination 
					itemsPerPage={itemsPerPage}
					items={this.props.data}
					currentPage={currentPage}
					currentItems={currentItems}
					handleClick={this.handleClick}
				/>
			</React.Fragment>
		)
	}
}

const mapStateToProps = state => ({
	flight: state.flight,
	client: state.client
})
  

const mapDispatchToProps = dispatch => ({
	deleteBlob: (item, client, flight) => { dispatch(deleteBlob(item, client, flight)) }
})

export default connect(mapStateToProps, mapDispatchToProps)(AssetTable)

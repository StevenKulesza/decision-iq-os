import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Row, Col } from 'reactstrap'
import AssetDropzone from './assetDropzone'
import AssetTable from './assetTable'

export class AssetsTab extends Component {
  
  render() {
    let assets;

    if (this.props.loading) {
      assets = 'Loading...'
    } else if (this.props.error !== null && this.props.error) {
      assets = this.props.error
    } else {
      assets = <AssetTable data={this.props.blobs} />
    }
    
    return (
      <div>
        <Row className='pb-3'>
            <Col className='text-center'>
								<AssetDropzone />
            </Col>
				</Row>
        <Row>
            <Col>
              {assets}
            </Col>
        </Row>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  blobs: state.blobs.blobs,
  loading: state.blobs.loading,
  error: state.blobs.error
})

export default connect(mapStateToProps)(AssetsTab)

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Row, Col } from 'reactstrap';
import ImagePicker from '../image-picker/image-picker';
import InputGeneral from '../form-groups/input';
import CollapseGeneral from '../collapse/collapse';

export class Frame extends Component {

  render() {
    return (
      <React.Fragment>
        <CollapseGeneral key={1} name={'Frame 1'}>
            <Row>
              <Col sm={6}>
                <InputGeneral 
                  label='Name'
                  value='New Frame'
                  type='text'
                  onChange = {
                    (e) => {}
                  }
                />
              </Col>
              <Col sm={6}>
                <ImagePicker
                  label={'Image'}
                  value={''}
                  onChange = {
                    (image) => {
                      // handle case if image is removed
                      if (image === null || undefined) image = {value: ''}
                    }
                  }
                />
              </Col>
              <Col sm={6}>
                <InputGeneral 
                  label='Clicktag'
                  value=''
                  type='text'
                  onChange = {
                    (e) => {}
                  }
                />
              </Col>
            </Row>
          </CollapseGeneral>
      </React.Fragment>
    )
  }
}

const mapStateToProps = (state) => ({
  
})

const mapDispatchToProps = {
  
}

export default connect(mapStateToProps, mapDispatchToProps)(Frame)

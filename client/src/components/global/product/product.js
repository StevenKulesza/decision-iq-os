import React, { Component } from 'react'
import { Row, Col } from 'reactstrap';
import ImagePicker from '../../global/image-picker/image-picker';
import InputGeneral from '../../global/form-groups/input';
import CollapseGeneral from '../../global/collapse/collapse';

export default class Product extends Component {
  render() {
    const {data} = this.props;
    return (

        <CollapseGeneral key={this.props.index} name={data.brand ? data.brand : ''}>
            <Row>
              <Col sm={6}>
                <InputGeneral 
                  label='Name'
                  name='brand'
                  value={data.brand ? data.brand : '' }
                  type='text'
                  onChange = {
                    (e) => {this.props.onChange(this.props.index, 'brand', e.target.value)}
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

                      this.props.onChange(
                        this.props.index,
                        'image',
                        image.value
                      )
                    }
                  }
                />
              </Col>
                <Col sm={6}>
                <InputGeneral 
                  label='Description'
                  name='description'
                  value={data.description ? data.description : '' }
                  type='text'
                  onChange = {
                    (e) => {this.props.onChange(this.props.index,e.target.name,e.target.value)}
                  }
                />
              </Col>
              <Col sm={6}>
                <InputGeneral 
                  label='Clicktag'
                  name='clicktag'
                  value={data.clicktag ? data.clicktag : '' }
                  type='text'
                  onChange = {
                    (e) => {this.props.onChange(this.props.index,e.target.name,e.target.value)}
                  }
                />
              </Col>
              <Col sm={6}>
                <InputGeneral 
                  label='Price'
                  name='price'
                  value={data.price ? data.price : '' }
                  type='text'
                  onChange = {
                    (e) => {this.props.onChange(this.props.index,e.target.name,e.target.value)}
                  }
                />
              </Col>
              <Col sm={6}>
                <InputGeneral 
                  label='ID'
                  value={data.product_id ? data.product_id : '' }
                  name='product_id'
                  type='text'
                  onChange = {
                    (e) => {this.props.onChange(this.props.index,e.target.name,e.target.value)}
                  }
                />
              </Col>
            </Row>
          </CollapseGeneral>

    )
  }
}


// Packages
import React from 'react';
import { connect } from 'react-redux';
import UploadProducts from '../uploadProducts'
import { Row, Col, Button } from 'reactstrap';
import {updateProduct, addProduct, removeProduct, setVisualizer} from '../../../actions/templates';
import { IoIosTrash } from 'react-icons/io'
import ImagePicker from '../../global/image-picker/image-picker';
import InputGeneral from '../../global/form-groups/input';
import CollapseGeneral from '../../global/collapse/collapse';

class ProductsTab extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // example ... replace with actual products
      products: [0],
      activeProduct: 0
    }

    this.setActiveProduct = this.setActiveProduct.bind(this);
  }


  // The below needs to be refactored into Redux actions / reducers
  // We need to dispatch an action passing the data to the redux store


  // we'll use this to display the product a user wants to preview in the templates
  setActiveProduct(index) {
    this.setState({
      activeProduct: index
    })
  }

  render() {
    const products = this.props.selectedTemplate.template.products.products;
    return(
      <div>
        <Row className='pb-2'>
          <Col className='text-center'>
              <Button color='link' onClick={ (e) => {this.props.addProduct() }}>(+) Add New</Button> 
              <UploadProducts />
          </Col>
				</Row>
        <hr />
        {
          products.map((product, index) => {
            return (
              <div key={index} onMouseEnter={ (e) => {this.props.setVisualizer('products', index)}}>
                <Row>
                  <Col xs={11}>
                    <div>
                    <CollapseGeneral key={index} name={product.brand ? product.brand : ''}>
                      <Row>
                        <Col sm={6}>
                          <InputGeneral 
                            label='Name'
                            name='brand'
                            value={product.brand ? product.brand : '' }
                            type='text'
                            onChange = {
                              (e) => {this.props.updateProduct(index, 'brand', e.target.value)}
                            }
                          />
                        </Col>
                        <Col sm={6}>
                          <ImagePicker
                            label={'Image'}
                            value={product.image.value}
                            images={this.props.blobs.blobs}
                            autoSelect={product.image.imageID}
                            onChange = {
                              (image) => {

                                
                                // handle case if image is removed
                                let newImageValue = (image === null || typeof(image) === undefined) ? null : image.file
                                let newProductImage = {...product.image};

                                newProductImage.value = newImageValue;
                                newProductImage.imageID = (image) ? image.label : null;
                                
                                this.props.updateProduct(
                                  index,
                                  'image',
                                  newProductImage
                                )
                              }
                            }
                          />
                        </Col>
                          <Col sm={6}>
                          <InputGeneral 
                            label='Description'
                            name='description'
                            value={product.description ? product.description : '' }
                            type='text'
                            onChange = {
                              (e) => {this.props.updateProduct(index,'description',e.target.value)}
                            }
                          />
                        </Col>
                        <Col sm={6}>
                          <InputGeneral 
                            label='Clicktag'
                            name='clicktag'
                            value={product.clicktag ? product.clicktag : '' }
                            type='text'
                            onChange = {
                              (e) => {this.props.updateProduct(index,'clicktag',e.target.value)}
                            }
                          />
                        </Col>
                        <Col sm={6}>
                          <InputGeneral 
                            label='Price'
                            name='price'
                            value={product.price ? product.price : '' }
                            type='text'
                            onChange = {
                              (e) => {this.props.updateProduct(index,'price',e.target.value)}
                            }
                          />
                        </Col>
                        <Col sm={6}>
                          <InputGeneral 
                            label='ID'
                            value={product.product_id ? product.product_id : '' }
                            name='product_id'
                            type='text'
                            onChange = {
                              (e) => {this.props.updateProduct(index,'product_id',e.target.value)}
                            }
                          />
                        </Col>
                      </Row>
                    </CollapseGeneral>
                    </div>
                  </Col>
                  <Col xs={1}>
                    <Button color='link' onClick={() => this.props.removeProduct(index)}><IoIosTrash/></Button>
                  </Col>
                </Row>
              </div>
            )
          })
        }
        
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  updateProduct: (productKey, fieldKey, value) => dispatch(updateProduct(productKey, fieldKey, value)),
  addProduct: (data) => dispatch(addProduct(data)),
  removeProduct: (index) => dispatch(removeProduct(index)),
  setVisualizer: (tabKey, objectKey) => dispatch(setVisualizer(tabKey, objectKey))
});

export default connect(null, mapDispatchToProps)(ProductsTab);
// Packages
import React from 'react';
import { connect } from 'react-redux';
import { Row, Col, ListGroup, ListGroupItem } from 'reactstrap';
import {updateProduct, addProduct, removeProduct, setVisualizer} from '../../../actions/templates';

class ProductsTab extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [0],
      activeProduct: 0
    }

    this.setActiveProduct = this.setActiveProduct.bind(this);
  }

  setActiveProduct(index) {
    this.setState({
      activeProduct: index
    })
  }

  render() {
    const products = this.props.selectedTemplate.template.products.products;
    return(
      <div>
        {
          products.map((product, index) => {
            return (
              <div key={index} onMouseEnter={ (e) => {this.props.setVisualizer('products', index)}}>
                <Row>
                  <Col>
                    <ListGroup>
                    <ListGroupItem action style={{borderRadius: '0px'}} key={index}>{product.brand ? product.brand : ''}</ListGroupItem>
                    </ListGroup>
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
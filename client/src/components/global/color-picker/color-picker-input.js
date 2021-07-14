import React from 'react';
import ColorPicker from './color-picker';
import InputGeneral from '../form-groups/input';
import { Row, Col, Label } from 'reactstrap';

export default class ColorPickerInput extends React.Component {
  state = {
    color: '#000',
  };

  handlePickerChange = (color) => {
    this.setState({
      color: color
    })
    if(this.props.onChange) this.props.onChange(color);
  };

  handleTextChange = (event) => {
    let color = event.target.value;
    //var isValidColor  = /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(color);
    this.setState({
      color: color
    })
    if(this.props.onChange) this.props.onChange(color);
  };

  render() {
    return (
      <Row noGutters={true}>
        <Col>
          {this.props.label && <Label for={this.props.name} style={{width:'100%'}}>{this.props.label}:</Label>}
          <Row noGutters={true}>
            <Col xs="10">
              <InputGeneral placeholder="#000"
                onChange= { this.handleTextChange }
                value= { this.props.value || this.state.color }
                type= "text"
              />
            </Col>
            <Col xs="2">
              <ColorPicker color={this.props.value || this.state.color}  onChange={this.handlePickerChange} />
            </Col>
          </Row>
        </Col>
      </Row>

    )
  }
}

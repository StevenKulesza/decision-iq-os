import React from 'react';
import { Row, Col, FormGroup, Label } from 'reactstrap';
import Select from 'react-virtualized-select';
import 'react-select/dist/react-select.css';
import 'react-virtualized/styles.css'
import 'react-virtualized-select/styles.css'
import {client} from '../../../constants/constants';

class FontPicker extends React.Component {
  state = {
    selectedFont: null,
    fonts: []
  };

  handleChange = (data) => {
    this.setState({
      selectedFont: data
    })
    if (this.props.onChange) this.props.onChange(data);
  };

  componentDidMount(){
    fetch('https://www.googleapis.com/webfonts/v1/webfonts?key='+client.google_font_api_key)
    .then(results => {return results.json()})
    .then(data => {
        var fonts = [];
        /* eslint array-callback-return:0 */
        data.items.map(item => {
            let font = {};
            font.value = item.family;
            font.label = item.family;
            font.files = item.files
            fonts.push(font);
        });
      this.setState({fonts: fonts});
    });
  }

  render() {

    return (
      <Row noGutters={true}>
        <Col>
            <FormGroup>
                {this.props.label && <Label for={this.props.name}>{this.props.label}:</Label>}

                <Select
                    name={this.props.label}
                    value={this.props.value || this.state.selectedFont}
                    options={this.state.fonts}
                    onChange={this.handleChange}
                />
            </FormGroup>
        </Col>
      </Row>

    )
  }
}

export default FontPicker;
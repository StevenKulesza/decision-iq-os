import React from 'react';
import { connect } from 'react-redux';
import { Row, Col, FormGroup, Label } from 'reactstrap';
import Select from 'react-virtualized-select';
import 'react-select/dist/react-select.css';
import 'react-virtualized/styles.css'
import 'react-virtualized-select/styles.css'

import { selectAudience } from '../../../actions/flight'
import { copyAudienceObject } from '../../../actions/templates'

class AudiencePicker extends React.Component {

  defaultAudience = {
    name: 'all_audiences',
    value: 'all_audiences',
    label: 'all_audiences'
  }

  handleChange = (data) => {
      if(data == null){
        data = this.defaultAudience;
      }

      this.setState({
          selectedAudience: data
      })

      // check for audience in template
      // copy default audience if does not exist
      this.props.copyAudienceObject(data.value)

      //change audience key for styles
      this.props.selectAudience(data.value)
  };

  
  render() {
    let audienceList = [this.defaultAudience];

    this.props.flight.audiences.map(item => {
      // normalize data paths for select component
      let audience = {};
      audience.name = item.name;
      audience.value = item.name;
      audience.label = item.name;
      audienceList.push(audience);
      return audienceList;
    });

    return (
      <Row noGutters={true}>
        <Col>
            <FormGroup>
                {this.props.label && <Label for={this.props.name}>{this.props.label}:</Label>}
                <Select
                  name={this.props.label}
                  value={this.props.flight.selectedAudience}
                  options={audienceList}
                  onChange={this.handleChange}
                />
            </FormGroup>
        </Col>
      </Row>

    )
  }
}

const mapDispatchToProps = dispatch => ({
  copyAudienceObject: (audience) => dispatch(copyAudienceObject(audience)),
  selectAudience: (audience) => dispatch(selectAudience(audience))
});


export default connect(null, mapDispatchToProps)(AudiencePicker);
import React from 'react'
import { connect } from 'react-redux'
import { Container, Row, Col, Label } from 'reactstrap';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import {
  addFlightName,
  addFlightStartDate,
  addFlightEndDate
} from '../../actions/flight';

import Header from '../global/header/header';
import InputGeneral from '../global/form-groups/input';

class FlightName extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleChangeStart = this.handleChangeStart.bind(this);
    this.handleChangeEnd = this.handleChangeEnd.bind(this);
  }

  handleChange(e) {
    this.props.addFlightName(e.target.value)
  }

  handleChangeStart(date) {
    this.props.addFlightStartDate(date)
  }

  handleChangeEnd(date) {
    this.props.addFlightEndDate(date)
  }

  render() {
    let startDateToString = this.props.flight.startDate.toString();
    let endDateToString = this.props.flight.endDate.toString()
    let startDate = new Date(startDateToString);
    let endDate = new Date(endDateToString);

    return (
      <div>
        <Container>
          <Header
            h1='Flight Information'
            p='General flight information for trafficking'
            align='left'
            wayfinder
          />
          <div className='pb-5'>
            <Row>
              <Col>
                <InputGeneral
                  label='Flight Name'
                  value={this.props.flight.name}
                  placeholder='Please Enter Flight Name'
                  onChange={(e) => { this.handleChange(e) }}
                  type='text'
                />
              </Col>
              <Col></Col>
              <Col>
                <Label>Start Date</Label>
                <DatePicker
                  selected={startDate}
                  selectsStart
                  startDate={startDate}
                  endDate={endDate}
                  onChange={this.handleChangeStart}
                />
              </Col>
              <Col>
                <Label>End Date</Label>
                <DatePicker
                  selected={endDate}
                  selectsEnd
                  startDate={startDate}
                  endDate={endDate}
                  onChange={this.handleChangeEnd}
                />
              </Col>
            </Row>
          </div>
        </Container>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  flight: state.flight
})

const mapDispatchToProps = dispatch => ({
  addFlightName: (flightName) => dispatch(addFlightName(flightName)),
  addFlightStartDate: (date) => dispatch(addFlightStartDate(date)),
  addFlightEndDate: (date) => dispatch(addFlightEndDate(date))
});

export default connect(mapStateToProps, mapDispatchToProps)(FlightName);
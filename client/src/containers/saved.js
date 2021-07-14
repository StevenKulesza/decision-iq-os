import React from 'react'
import { connect } from 'react-redux'
import { Container, Button, Table } from 'reactstrap';
import axios from 'axios'

import Header from '../components/global/header/header';
import NavbarFooter from '../components/global/navbar/navbar-footer';

// route history
import history from '../history';

import {
    fetchFlights,
    addFlightName,
    deleteSavedFlight,
    deleteSavedFlightSuccess
} from '../actions/flight';
import { selectTemplate } from '../actions/templates'


class Saved extends React.Component {
  constructor(props) {
    super(props)

    this.handleSavedFlightSelect = this.handleSavedFlightSelect.bind(this)
    this.handleSavedFlightDelete = this.handleSavedFlightDelete.bind(this)
  }

  componentDidMount() {
      this.props.fetchFlights();
  }

  handleSavedFlightSelect(index){
    const selectedFlight = this.props.flight.savedFlights[index].name;

    return axios({
        method:'get',
        url:'/flights/' + encodeURI(selectedFlight)
    })
    .then(res => {
        this.props.addFlightName(res.data.name);
        this.props.selectTemplate(res.data.data);
        history.push('/flight-information');
    })
  }

  handleSavedFlightDelete(index) {
    const selectedFlight = this.props.flight.savedFlights[index].name;
    this.props.deleteSavedFlight(selectedFlight);
    //TODO: put into fetch promise of deleteSavedFlight
    this.props.deleteSavedFlightSuccess(selectedFlight);
  }

  render() {
    var page = null;

    if(this.props.flight.loading){
        page = <div className='text-center mb-5'>Loading...</div>;
    } else if (this.props.flight.savedFlights && this.props.flight.savedFlights.length === 0) {
        page = <div className='text-center mb-5'>NO SAVED FLIGHTS</div>;
    } else {
        page = (
            <div>
                <Table>
                    <thead>
                        <tr>
                            <th>Flight Name</th>
                            <th>Template Type</th>
                            <th>Last Modified</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.flight.savedFlights.map((flight, index) => {
                            return (
                                <tr key={flight.name}>
                                    <td>{flight.name}</td>
                                    <td>{flight.type}</td>
                                    <td>{flight.lastModified}</td>
                                    <td>
                                        <Button onClick={() => {this.handleSavedFlightSelect(index)}}>Select</Button>{' '}
                                        <Button onClick={() => {this.handleSavedFlightDelete(index)}}>Delete</Button>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </Table>
            </div>
        )
    }

    return (
        <React.Fragment>
            <Container>
                <Header
                    h1='Saved Flights'
                    p='Select a saved flight to edit.'
                    />
                {page}
            </Container>
            <NavbarFooter prevPage />
        </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
    flight: state.flight
})

const mapDispatchToProps = dispatch => ({
    fetchFlights:       (index) => dispatch(fetchFlights(index)),
    addFlightName:      (name) => dispatch(addFlightName(name)),
    selectTemplate:     (template) => dispatch(selectTemplate(template)),
    deleteSavedFlight: (flight) => dispatch(deleteSavedFlight(flight)),
    deleteSavedFlightSuccess: (flight) => dispatch(deleteSavedFlightSuccess(flight))
});

export default connect(mapStateToProps, mapDispatchToProps)(Saved);
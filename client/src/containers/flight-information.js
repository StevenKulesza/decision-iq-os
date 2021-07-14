import React from 'react'
import { connect } from 'react-redux'
import { Container } from 'reactstrap';
import NavbarFooter from '../components/global/navbar/navbar-footer';

import FlightName from '../components/flight-information/flight-name';
import Audience from '../components/flight-information/audience';
import Template from '../components/flight-information/template';

class FlightInformation extends React.Component {
  render() {
    return (
        <React.Fragment>
            <Container>
                <FlightName/>
                <hr/>
                <Template/>
                <hr/>
                <Audience/>
            </Container>
            <NavbarFooter 
                nextPage='/assets' 
                nextPageTitle='Assets'
                prevPage
            />
        </React.Fragment>
    );
  }
}
export default connect()(FlightInformation);
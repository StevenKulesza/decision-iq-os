import React from 'react'
import { connect } from 'react-redux'
import { Container } from 'reactstrap';
import Header from '../components/global/header/header';
import NavbarFooter from '../components/global/navbar/navbar-footer';
import AssetsTab from '../components/global/asset/assets'

class Assets extends React.Component {
  render() {
    return (
        <React.Fragment>
            <Container>
              <Header h1='Assets' p='Import assets below.' align='left' wayfinder/>
              <AssetsTab/>
            </Container>

            <NavbarFooter 
                nextPage='/personalization' 
                nextPageTitle='Personalization'
                prevPage
            />
        </React.Fragment>
    );
  }
}
export default connect()(Assets);
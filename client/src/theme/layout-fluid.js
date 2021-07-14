// Packages
import React from 'react'
import { Container } from 'reactstrap'

// Components and Styles
import Navbar from '../components/global/navbar/navbar'
import Footer from '../components/global/footer/footer'

class LayoutMain extends React.Component {
  render() {
    return (
      <div>
        <Navbar layout='main' />
          <Container fluid>
            {this.props.children}
          </Container>
        <Footer />
      </div>
    )
  }
}

export default LayoutMain;

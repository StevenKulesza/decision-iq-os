// Packages
import React from 'react'

// Components and Styles
import Navbar from '../components/global/navbar/navbar'
import Footer from '../components/global/footer/footer'

class LayoutLogin extends React.Component {
  render() {
    return (
      <div>
        <Navbar layout='empty' />
          {this.props.children}
        <Footer />
      </div>
    )
  }
}

export default LayoutLogin;

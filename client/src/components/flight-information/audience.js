import React from 'react'
import { connect } from 'react-redux'
import { Container, Row, Col, Button } from 'reactstrap';

import {addAudience, deleteAudience} from '../../actions/flight';

import Header from '../global/header/header';
import InputGeneral from '../global/form-groups/input';
import AlertMessage from '../global/alert/alert';

import * as styles from '../../styles/button/button'

class Audience extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      audience: ''
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.deleteAudience = this.deleteAudience.bind(this);
  }

  handleChange(e) {
    this.setState({
     [e.target.name]: e.target.value
    })
  }

  handleSubmit(e) {
    console.log(this.state.audience)
    e.preventDefault();
    if (this.state.audience.length > 0) {
      this.props.addAudience(this.state.audience)

      this.setState({
        audience: ''
      })
    }
  }

  deleteAudience(e) {
    this.props.deleteAudience(e.target.getAttribute('name'))
  }

  render() {
      return(
      <div>
        <Container>
        <Header
          h1='Audiences'
          p='Enter Audience Name(s) for your flight below'
          align='left'
        />
        <div className='pb-5'>
          <Row className='pb-5'>
            <Col>
              <Row>  
                <Col sm={10}>
                <InputGeneral
                      name='audience'
                      value={this.state.audience}
                      placeholder='Please Enter Audience Name'
                      onChange={(e) => { this.handleChange(e) }}
                      type='text'
                    /> 
                </Col>
                <Col sm={2}>
                  <Button className={styles.btn} size='sm' color='primary' onClick={this.handleSubmit}>Add</Button>
                </Col>
              </Row>
            </Col>
            <Col></Col>
            <Col></Col>
          </Row>
            <Row>
                {this.props.audiences && this.props.audiences.length > 0 ? 
                this.props.audiences.map(audience => {
                return (
                  <Col sm={4} key={audience.name}>
                    <AlertMessage
                      message={audience.name}
                      name={audience.name}
                      color='info'
                      onClick={(e) => {this.deleteAudience(e)}}
                      dismissable={true}
                    />
                  </Col>
                  )
              }) :
              <Col>
                <p>No audiences created</p>
              </Col>
            }
            </Row>
        </div>
        </Container>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  audiences: state.flight.audiences
})

const mapDispatchToProps = dispatch => ({
  addAudience: (audience) => dispatch(addAudience(audience)),
  deleteAudience: (audience) => dispatch(deleteAudience(audience))
});

export default connect(mapStateToProps, mapDispatchToProps)(Audience);
// Packages
import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Container, Row, Col, Button } from 'reactstrap';
import { css } from 'emotion';
// style
import * as styles from '../../../styles/nav/navbar-footer'
import * as buttonStyles from '../../../styles/button/button'


// route history
import history from '../../../history';

class NavbarFooter extends Component {

  constructor(props){
     super(props);
     this.handleBack = this.handleBack.bind(this);
     this.handleNext = this.handleNext.bind(this);
  }

  // with react-router
  handleBack(){
    history.goBack();
  }

  // with react-router
  handleNext(nextPage){
    history.push(nextPage);
  }

  render() {
    return (
      <div className={css`${styles.navbarFooter}`}>
        <Container>
          <Row>
            <Col sm={4}>
              <h5>{this.props.flight.name}</h5>
            </Col>
            <Col sm={8} className='text-right'>
                {this.props.prevPage ? 
                  <Button 
                    onClick={this.handleBack} 
                    className={css`${buttonStyles.btn}`} 
                    color='secondary'>Previous Step</Button>
                : null}{' '}
                {
                  this.props.nextPage ?
                <Button 
                  onClick={() => this.handleNext(this.props.nextPage)}
                  className={css`${buttonStyles.btn}`}
                  color='primary'
                > 
                  Next{this.props.nextPageTitle ? ': '+ this.props.nextPageTitle: null}
                </Button>
                 : null
                }
                
            </Col>
          </Row>
        </Container>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  flight: state.flight
})

const mapDispatchToProps = {
  
}

export default connect(mapStateToProps, mapDispatchToProps)(NavbarFooter)


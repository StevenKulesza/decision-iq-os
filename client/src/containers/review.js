// Packages
import React from 'react';
import { connect } from 'react-redux';
import { Container, Row, Col } from 'reactstrap';
import { css } from 'emotion';

// Components and Styles
import Header from '../components/global/header/header';
import Templates from '../components/personalization/templates';
import PersonalizationPanel from '../components/review/panel';
import NavbarFooter from '../components/global/navbar/navbar-footer';

import ActionBar from '../components/review/actionBar';

// Actions
import { fetchBlobs } from '../actions/blobs';

import * as styles from '../styles/personalization/personalization';

class Review extends React.Component {
  // fetch blobls from database
  componentDidMount() {
    this.props.dispatch(fetchBlobs(this.props.client.name, this.props.flight.name));
  }

  render() {
    return(
      <div>
        <Container>
          <Header h1='Review and Export' p='Take one last look before downloading your finished product.' align='left' wayfinder/>
        </Container>
        <ActionBar 
          client={this.props.client} 
          flight={this.props.flight} 
          selectedTemplate={this.props.selectedTemplate}
        />
        <Container fluid>
          <Row>
            <Col sm={7} className={css`${styles.templatesPanel}` + ' pt-5 pb-5'}>
              <Templates 
                blobs={this.props.blobs} 
                client={this.props.client} 
                flight={this.props.flight} 
                selectedTemplate={this.props.selectedTemplate} 
              />
            </Col>
            <Col sm={5} className={css`${styles.personalizationPanel}`}>
              <PersonalizationPanel 
                blobs={this.props.blobs} 
                client={this.props.client} 
                flight={this.props.flight} 
                selectedTemplate={this.props.selectedTemplate} 
              />
            </Col>
          </Row>
        </Container>
        <NavbarFooter prevPage />
      </div>
    )
  }
}

const mapStateToProps = state => ({
  blobs: state.blobs,
  client: state.client,
  flight: state.flight,
  selectedTemplate: state.templates.selectedTemplate
})

export default connect(mapStateToProps)(Review);

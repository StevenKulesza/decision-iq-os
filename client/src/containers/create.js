import React from 'react'
import { connect } from 'react-redux'
import { Container, Row, Col} from 'reactstrap';

import Header from '../components/global/header/header';
import NavbarFooter from '../components/global/navbar/navbar-footer';
import GeneralCard from '../components/global/cards/general'

class Create extends React.Component {
  render() {
    return (
        <div>
        <Container>
            <Header
                h1='Create a flight'
                p='Descriptive copy spanning a single line ipsum dolor sit amet.'
                />
            <div className='pb-5'>
                <Row className='pb-5'>
                    <Col xs="6">                
                        <GeneralCard color='primary' url='/flight-information'>
                            <h4>Start from scratch</h4>
                            <p>Create a new flight and begin personalizing now.</p>
                        </GeneralCard>
                    </Col>
                    <Col xs="6">
                        <GeneralCard color='primary' url='/saved'>
                            <h4>Edit or continue</h4>
                            <p>Select a previously saved Flight to load as a starting point.</p>
                        </GeneralCard>
                    </Col>
                </Row>
            </div>
        </Container>
        <NavbarFooter />
        </div>
    );
  }
}
export default connect()(Create);
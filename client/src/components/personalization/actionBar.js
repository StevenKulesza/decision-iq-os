import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import ModalSave from '../global/modals/save'
import SelectionDropdown from '../template-size/selection-dropdown';

class ActionBar extends React.Component {
  render() {
    return (
        <div className="action-bar p-3" style={{backgroundColor:'#e8e7e7'}}>
          <Container>
            <Row>
                <Col sm={6} className='text-left'>
                    <SelectionDropdown items={this.props.selectedTemplate.sizes}/>
                </Col>
                <Col sm={6} className='text-right'>
                    <ModalSave />
                </Col>
            </Row>
          </Container>
        </div>
    )
  }
}
export default ActionBar;

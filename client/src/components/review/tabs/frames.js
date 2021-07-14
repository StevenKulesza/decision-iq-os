// Packages
import React from 'react';
import { connect } from 'react-redux';
import { Row, Col, ListGroup, ListGroupItem } from 'reactstrap';
import {updateFrame, addFrame, removeFrame, setVisualizer, setEvergreen} from '../../../actions/templates';

class FramesTab extends React.Component {
  render() {
    let activeSizes = [];
    //TODO: This should not be on the render level, the state object itself should not contain useless information. 
    //      It would be better if this was altered at the template level for future flexibility
    // grab the active sizes
    Object.keys(this.props.selectedTemplate.sizes).map(size => {
      if (this.props.selectedTemplate.sizes[size].active) {
        return activeSizes.push(size)
      } 
      return activeSizes;
    })
    
    const frames = this.props.selectedTemplate.template.frames.frames;

    return(
      <div>
        {frames.map((frame, index) => {
          return (
            <div key={index} onMouseEnter={ (e) => {this.props.setVisualizer('frames', index)}}>
              <Row>
                <Col>
                  <ListGroup>
                  <ListGroupItem key={index} action style={{borderRadius: '0px'}}>{frame.name}</ListGroupItem>
                  </ListGroup>
                </Col>
              </Row>
            </div>
          )
        })}
      </div>
    )
  }
}


const mapDispatchToProps = dispatch => ({
  updateFrame: (frameKey, frame) => dispatch(updateFrame(frameKey, frame)),
  addFrame: (data) => dispatch(addFrame(data)),
  removeFrame: (index) => dispatch(removeFrame(index)),
  setVisualizer: (tabKey, objectKey) => dispatch(setVisualizer(tabKey, objectKey)) , 
  setEvergreen: (frameName) => dispatch(setEvergreen(frameName))
});

export default connect(null, mapDispatchToProps)(FramesTab);

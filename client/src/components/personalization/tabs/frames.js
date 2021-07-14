// Packages
import React from 'react';
import { connect } from 'react-redux';
import { Row, Col, Button } from 'reactstrap';
import {updateFrame, addFrame, removeFrame, setVisualizer, setEvergreen} from '../../../actions/templates';
import { IoIosTrash } from 'react-icons/io'
import ImagePicker from '../../global/image-picker/image-picker';
import InputGeneral from '../../global/form-groups/input';
import CollapseGeneral from '../../global/collapse/collapse';

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

    function displaySize(size){
      if(!size) return true;
      for(let i=0; i<activeSizes.length; i++){
        if(size === activeSizes[i]) return true;
      }
      return false;
    }

    const frames = this.props.selectedTemplate.template.frames.frames;

    return(
      <div>
        <Row className='pb-2'>
          <Col className='text-center'>
              <Button color='link' onClick={ (e) => {this.props.addFrame()} }>(+) Add New</Button>
          </Col>
				</Row>
        <hr />
        {frames.map((frame, index) => {

          function imagePicker(size){
            if(!displaySize(size)) return null;
            return(
              <Col sm={6}>
                <ImagePicker
                  label={'Image ' + size}
                  value={frame.image[size].value}
                  images={this.props.blobs.blobs}
                  autoSelect={frame.image[size].autoSelect}
                  onChange = {
                    (image) => {
                      // handle case if image is removed
                      let newImageValue = (image === null || typeof(image) === undefined) ? null : image.file;
                      let imageUpdate ={
                        "image": {
                          ...frame.image
                        }
                      }
                      imageUpdate.image[size].value = newImageValue;
                      imageUpdate.image[size].imageID = (image) ? image.label : null;
                      
                      this.props.updateFrame(
                        index,
                        imageUpdate
                      )
                    }
                  }
                />
              </Col>
            )
          }
          imagePicker = imagePicker.bind(this);

          return (
            <div key={index} onMouseEnter={ (e) => {this.props.setVisualizer('frames', index)}}>
              <Row>
                <Col xs={11}>
                  <div>
                  <CollapseGeneral key={index} name={frame.name}>
                    <Row>
                      <Col sm={6}>
                        <InputGeneral 
                          label='Name'
                          value={frame.name}
                          type='text'
                          onChange = {
                            (e) => { 
                              for (let size in frame.image) {
                                frame.image[size].autoSelect = "(?=.*" + size + ")(?=.*" + e.target.value + ").*$";
                              }

                              console.log(frame)

                              this.props.updateFrame(index, {
                                "name": e.target.value,
                              }) 
                          }
                          }
                        />
                      </Col>
                      {imagePicker("160x600")}
                      {imagePicker("300x250")}
                      {imagePicker("300x600")}
                      {imagePicker("728x90")}
                      <Col sm={6}>
                        <InputGeneral 
                          label='Clicktag'
                          value={frame.clicktag}
                          type='text'
                          onChange = {
                            (e) => {this.props.updateFrame(index,{
                              "clicktag": e.target.value
                            })}
                          }
                        />
                      </Col>
                      <Col sm={6}>
                        Evergreen: 
                        <input className='ml-1' type="radio" id={frame.name} name="evergreen" value={frame.name} onChange = {
                            (e) => {this.props.setEvergreen(e.target.value)}
                        }
                        checked={frame.evergreen}
                        />
                      </Col>
                    </Row>
                  </CollapseGeneral>
                  </div>
                </Col>
                <Col xs={1}>
                  <Button color='link' onClick={() => this.props.removeFrame(index)}><IoIosTrash/></Button>
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

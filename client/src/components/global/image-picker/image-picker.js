import React from 'react';
import { Row, Col, FormGroup, Label } from 'reactstrap';
import Select from 'react-virtualized-select';
import 'react-select/dist/react-select.css';
import 'react-virtualized/styles.css'
import 'react-virtualized-select/styles.css'

class ImagePicker extends React.Component {
  state = {
    selectedImage: null,
    images: []
  };

  constructor(props){
    super(props);

    this.autoSelectImage = this.autoSelectImage.bind(this);
  }

  handleChange = (data) => {
    this.setState({
      selectedImage: data
    })
    if (this.props.onChange) this.props.onChange(data);
  };

  //select an image by its imageID
  selectImageByID(imageID){
    if(!imageID) return;
    let previousSelection = null;

    for(let i=0; i<this.props.images.length; i++){
      if(imageID === this.props.images[i].label){
        previousSelection = this.props.images[i];
        break;
      }
    }
    
    this.handleChange(previousSelection);
  }

  //TODO: Temporary function. This will be removed once state and feed are decoupled and an image schema is established
  selectImageByValue(label){
    if(!label) return;
    let previousSelection = null;

    let oldValue = label.substring(0, label.indexOf("?")).split('/');
    oldValue = oldValue[oldValue.length-1];
    for(let i=0; i<this.props.images.length; i++){
      if(oldValue === this.props.images[i].label){
        previousSelection = this.props.images[i];
        break;
      }
    }
    
    this.handleChange(previousSelection);
  }

  autoSelectImage() {

    //if no autoselect is defined, return
    if(this.props.autoSelect === null) return;

    //should be something like: autoSelect={"(?=.*"+someword+")(?=.*"+someotherword+").*$"}
    let rx = this.props.autoSelect;
    for(let i=0; i<this.props.images.length; i++){
      let image = this.props.images[i];
      if(image.label.match(rx) !== null){
        this.handleChange(image)
        console.log("Auto matched '" + image.label + "' to image field '" + this.props.label + "'");
        break;
      }
    }
  }

  componentWillReceiveProps(nextProps){
    //if the images updated, see if you need to try autoSelectImage
    if(nextProps.images !== this.props.images){
      this.setState({
        images: nextProps.images
      }, () => {if(!this.props.value) this.autoSelectImage()});
    }
  }

  componentDidMount() {
    //Make sure previous selection is chosen
    if(this.props.value) this.selectImageByValue(this.props.value);
    else this.autoSelectImage();
  }

  render() {
    
    return (
      <Row noGutters={true}>
        <Col>
            <FormGroup>
                {this.props.label && <Label for={this.props.name}>{this.props.label}:</Label>}

                <Select
                    name={this.props.label}
                    value={this.state.selectedImage}
                    options={this.props.images}
                    onChange={this.handleChange}
                />
            </FormGroup>
        </Col>
      </Row>

    )
  }
}


export default ImagePicker

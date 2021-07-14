import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Form, FormGroup, Label, Input } from 'reactstrap';
import ModalGeneral from './modal'
import axios from 'axios'
import manualDownload from '../../../utils/manualDownload'

export class ExportModal extends Component {
  constructor() {
    super();
    this.state = {
      export: {
        "richloads": false,
        "images": false,
        "feed": false
      },
      packageURL: null
    }

    this.checkHandler = this.checkHandler.bind(this);
    this.exportHandler = this.exportHandler.bind(this);
  }

  checkHandler(e){
    let newState = {
      export:{
        ...this.state.export,
      }
    };
    newState.export[e.target.name] = e.target.checked;
    this.setState(newState);
  }


  exportHandler(){
    this.setState({
      packageURL: null
    });

    axios({
      method:'post',
      url:'/feeds/export?feed='+this.state.export.feed+'&richloads='+this.state.export.richloads+'&images='+this.state.export.images,
      data: this.props.template
    })
    .then(res => {
      if(!res.data.package) return;
      this.setState({
        packageURL: res.data.package
      });

      //automatically download file
      axios({
        url: res.data.package,
        method: 'GET',
        responseType: 'blob', // important
      }).then((response) => {
        manualDownload(response.data, (this.props.flight.name) ? this.props.flight.name + '.zip' : "flight.zip", response.headers["content-type"]);
        alert("download started");
      });
    })
    .catch(error => {
      console.log(error);
      alert("error");
    });
  }


  render() {
    return (
      <React.Fragment>
        <ModalGeneral 
            buttonLabel={'EXPORT'}
            actionButton={'Export'}
            title={'Export ' + this.props.flight.name}
            onClick={this.exportHandler}
        >
          <p>Select what you would like to included in your export package.</p>
          <Form>
            <FormGroup check>
              <Label check>
                  <Input type="checkbox" name='richloads' onClick={this.checkHandler} /> Richloads
              </Label>
            </FormGroup>
            <FormGroup check>
              <Label check>
                  <Input type="checkbox" name='images' onClick={this.checkHandler} /> Images
              </Label>
            </FormGroup>
            <FormGroup check>
              <Label check>
                  <Input type="checkbox" name='feed' onClick={this.checkHandler} /> Feed
              </Label>
            </FormGroup>
          </Form>
        </ModalGeneral>
      </React.Fragment>
    )
  }
}

const mapStateToProps = (state) => ({
  flight: state.flight,
  template: state.templates.selectedTemplate
})
const mapDispatchToProps = {
  
}
export default connect(mapStateToProps, mapDispatchToProps)(ExportModal)

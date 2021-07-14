// Packages
import React from 'react';
import { connect } from 'react-redux';
import { Row, Col, Label } from 'reactstrap';
import ColorPickerInput from '../../global/color-picker/color-picker-input';
import FontPicker from '../../global/font-picker/font-picker';
import ImagePicker from '../../global/image-picker/image-picker';
import InputGeneral from '../../global/form-groups/input';
import AudiencePicker from '../../global/audience-picker/audience-picker'
import CollapseGeneral from '../../global/collapse/collapse';
import {updateStyle, updateStyles} from '../../../actions/templates';
import Select from 'react-virtualized-select';
import 'react-select/dist/react-select.css';
import 'react-virtualized/styles.css'
import 'react-virtualized-select/styles.css'
import WebFont from 'webfontloader';

class StyleTab extends React.Component {
  constructor(props) {
    super(props);

    //initial State
    this.state = {
      font: null,
    }
  }

  render() {
    const { selectedTemplate, flight } = this.props;
    const template = selectedTemplate.template;
    const templateStyles = template.styles.styles[flight.selectedAudience];
    const sizes = selectedTemplate.sizes;
    let activeSizes = [];
    let style;

    //TODO: This should not be on the render level, the state object itself should not contain useless information. 
    //      It would be better if this was altered at the template level for future flexibility
    // grab the active sizes
    Object.keys(sizes).map(size => {
      if (sizes[size].active) {
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

    return(
      <div>
      {flight.audiences.length > 0 ? 
        <React.Fragment>
            <AudiencePicker
              label={'Select an audience to configure'}
              name={'Audience'}
              flight={this.props.flight}
            />
          <hr/> 
        </React.Fragment>
      : null
      }
      {
        Object.keys(templateStyles).map(styleKey => {
          if(styleKey === "label" || styleKey === "audience_id") return null;
          return(
            <CollapseGeneral key={styleKey} name={templateStyles[styleKey].label}>
              <Row>
                {Object.keys(templateStyles[styleKey]).map(fieldKey => {
                    style = templateStyles[styleKey][fieldKey];

                    if (styleKey === "label") {
                      return null;
                    } else if (style.type === 'color') {
                      return (
                        <Col sm={6} key={fieldKey}>
                          <ColorPickerInput
                            label={style.label}
                            value={style.value}
                            onChange = {
                              (color) => {
                                this.props.updateStyle(
                                  styleKey, 
                                  fieldKey,
                                  flight.selectedAudience, 
                                  color
                                )
                              }
                            }
                          />
                        </Col>
                      )
                    } else if (style.type === 'image') {
                        if(!displaySize(style.size)) return null;
                          return (
                            <Col sm={6} key={fieldKey}>
                                <ImagePicker
                                  label={style.label + ((style.size) ? (' - '+ style.size) : "")}
                                  value={style.value}
                                  for={templateStyles[styleKey].label}
                                  size={style.size}
                                  autoSelect={(style.autoSelect)?style.autoSelect:null}
                                  images={this.props.blobs.blobs}
                                  onChange = {
                                    (image) => {
                                      console.log('UPDATING', flight.selectedAudience)
                                      // handle case if image is removed
                                      let newImageValue = (image === null || typeof(image) === undefined) ? null : image.file
                                      let newStyles = {...template.styles.styles};

                                      newStyles[flight.selectedAudience][styleKey][fieldKey] = {
                                        ...newStyles[flight.selectedAudience][styleKey][fieldKey],
                                        "value": newImageValue,
                                        "imageID": (newImageValue) ? image.label : null
                                      }

                                      this.props.updateStyles(newStyles)
                                    }
                                  }
                                />
                            </Col>
                          )
                    } else if (style.type === 'text') {
                      return ( 
                        <Col sm={6} key={fieldKey}>
                          <InputGeneral 
                            label={style.label}
                            value={style.value}
                            type='text'
                            onChange = {
                              (e) => {
                                this.props.updateStyle(
                                  styleKey, 
                                  fieldKey,
                                  flight.selectedAudience,
                                  e.target.value
                                )
                              }
                            }
                          />
                        </Col>
                      )
                    } else if (style.type === 'option') {
                      let options = style.options.map(option => {
                        return {label: option, value: option}
                      });
                      return ( 
                        <Col sm={6} key={fieldKey}>
                          <Label for={style.label}>{style.label}:</Label>
                          <Select
                              name={style.label}
                              value={style.value}
                              options={options}
                              clearable={false}
                              onChange={
                                (e) => {
                                  this.props.updateStyle(
                                    styleKey,
                                    fieldKey,
                                    flight.selectedAudience,
                                    e.value
                                  )
                                }
                              }
                          />
                        </Col>
                      )
                    }  else if (style.type === 'number') {
                      return ( 
                        <Col sm={6} key={fieldKey}>
                          <InputGeneral
                            label={style.label}
                            value={style.value}
                            type='number'
                            onChange = {
                              (e) => {
                                this.props.updateStyle(
                                  styleKey,
                                  fieldKey,
                                  flight.selectedAudience,
                                  e.target.value
                                )
                              }
                            }
                          />
                        </Col>
                      )
                    } else if (style.type === 'font') {
                      let font = style.value;
                      if(font && font !== ""){
                          WebFont.load({
                          google: {
                            families: [font+':100,200,300,400,500,600,700,800,900']
                          }
                        });
                      }
                      
                      return (
                        <Col sm={6} key={fieldKey}>
                          <FontPicker
                            label={style.label}
                            value={style.value}
                            onChange = {
                              (font) => {
                                if(!font) return;
                                this.props.updateStyle(
                                  styleKey,
                                  fieldKey,
                                  flight.selectedAudience,
                                  font.value
                                )
                              }
                            }
                          />
                        </Col> 
                      )
                    } else {
                      return null;
                    }
                })}
              </Row>
            </CollapseGeneral>
          )
        })
      }
      </div>
      
    )
  }
}


const mapDispatchToProps = dispatch => ({
  updateStyle: (styleKey, fieldKey, selectedAudience, value) => dispatch(updateStyle(styleKey, fieldKey, selectedAudience, value)),
  updateStyles: (data) => dispatch(updateStyles(data))
});

export default connect(null, mapDispatchToProps)(StyleTab);

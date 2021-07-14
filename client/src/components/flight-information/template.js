// Packages
import React from 'react';
import { connect } from 'react-redux';
import { Container,Row,Col,Label } from 'reactstrap'

// Components and Styles
import Header from '../global/header/header';
import ModalGeneral from '../global/modals/modal';
import DataCard from '../template-selection/cards/cards';

// Actions
import {
  fetchTemplates,
  selectTemplateType,
  selectTemplate
} from '../../actions/templates';

import Select from 'react-virtualized-select';
import 'react-select/dist/react-select.css';
import 'react-virtualized/styles.css'
import 'react-virtualized-select/styles.css'

class Template extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      selectedTemplateType: {
        name: 'display',
        value: 'display',
        label: 'display',
        index: 0
      }
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange = (data) => {
    let defaultTemplate = {
      name: 'display',
      value: 'display',
      label: 'display',
      index: 0
    }

    if (data == null) {
      data = defaultTemplate;
    }

    this.setState({
      selectedTemplateType: data
    })

    //change Template key for styles
    this.props.selectTemplateType(data.index)
  };

  componentWillMount() {
    this.setState({
      selectedTemplate: this.props.selectedTemplate
    })
  }
  // fetch templates from database
  componentDidMount() {
    this.props.fetchTemplates();
  }

  template(templateIndex) {
    const { templates } = this.props;
    const selectedTemplate = {...templates.templates[templates.selectedTemplateType].content[templateIndex]};
    this.props.selectTemplate(selectedTemplate);
  }

  render() {
    const { error, loading, templates } = this.props;
    let content;
    let templateList = [];

    templates.templates.map((item,index)=> {
      // normalize data paths for select component
      let template = {};
      template.name = item.type;
      template.value = item.type;
      template.label = item.type;
      template.index = index;
      templateList.push(template);
      return templateList;
    });

    if (error) {
      content = <div className='text-center mb-3'>Error! + {error.message}</div>;
    } else if (loading) {
      content = <div className='text-center mb-5'>Loading...</div>;
    } else {
      content = (
        <React.Fragment>
          <Row>
            <Col>
              <Label>Template Type:</Label>
              <Select 
                name='Template Type'
                value={this.state.selectedTemplateType}
                options={templateList}
                onChange={this.handleChange}
              />
            </Col>
            <Col></Col>
            <Col>
              <Label>Template Package:</Label>
              {this.state.selectedTemplateType && this.state.selectedTemplateType.name.length > 1 ?
                <ModalGeneral
                  buttonColor='secondary'
                  buttonLabel={'Select a '+ this.state.selectedTemplateType.name + ' template.'}
                  title={'Select a '+ this.state.selectedTemplateType.name + ' template. ' + this.props.templates.selectedTemplate.name + ' template is selected.'}
                  actionButton='Done'
                  size='large'
                >

                <Row>
                { typeof templates.templates[templates.selectedTemplateType] !== 'undefined' && 
                templates.templates[templates.selectedTemplateType].content.map((c, index) => (
                  <Col sm={{ size: 6 }} className='mt-3 mb-3' key={index}>
                    <DataCard
                      imageUrl={c.imageUrl}
                      title={c.name}
                      description={c.description}
                      url={this.props.url}
                      class={(this.props.templates.selectedTemplate.name === c.name) ? ' selected ': ''}
                      onClick={() => { 
                        this.template(index); 
                      }}
                    />
                  </Col>
                ))}
              </Row>
                </ModalGeneral> :
                <p>No Template Type Selected.</p>
              }
            </Col>
            <Col></Col>
           
          </Row>
          <Row>
            <Col>
            { templates.selectedTemplate !== 0 ?
              <Row className='pt-5'>
                <Col sm={4}>
                  <img 
                    src={this.props.templates.selectedTemplate.imageUrl} 
                    alt={this.props.templates.selectedTemplate.name}
                  />
                </Col>
                <Col sm={8}>
                  <h2>{this.props.templates.selectedTemplate.name}</h2>
                  <p>{this.props.templates.selectedTemplate.description}</p>
                </Col>
              </Row> : 
                  <p className='pt-5'>No template selected</p>
                }
            </Col>
            <Col></Col>
          </Row>
        </React.Fragment>
      )
    }

    return(
      <div>
        <Container>
          <Header
            h1='Template Selection'
            p='Select a template for your flight below.'
            align='left'
          />
          <div className='pb-5'>
            {content}
          </div>
        </Container>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  fetchTemplates: () => dispatch(fetchTemplates()),
  selectTemplateType: (index) => dispatch(selectTemplateType(index)),
  selectTemplate: (selectedTemplate) => dispatch(selectTemplate(selectedTemplate))

});

const mapStateToProps = state => ({
  templates: state.templates,
  loading: state.templates.loading,
  error: state.templates.error
})

export default connect(mapStateToProps, mapDispatchToProps)(Template);

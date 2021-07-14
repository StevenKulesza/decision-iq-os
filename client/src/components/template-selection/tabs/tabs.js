// Packages
import React from 'react';
import { connect } from 'react-redux'
import { TabContent, TabPane, Nav, NavItem, NavLink, Row, Col } from 'reactstrap';
import classnames from 'classnames';
import { css } from 'emotion'
import shortid from 'shortid';

// Actions
import { selectTemplate, selectTemplateType } from '../../../actions/templates'

// Components
import DataCard from '../cards/cards'

// Styles
import * as styles from '../../../styles/tabs/tabs'

class Tabs extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      activeTab: 0
    };

    this.template = this.template.bind(this);
    this.toggle = this.toggle.bind(this);
  }

  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });

      this.props.dispatch(selectTemplateType(tab));
    }
  }

  template(templateIndex) {
    const { templates } = this.props;
    let selectedTemplate = {...templates.templates[this.state.activeTab].content[templateIndex]};
    this.props.dispatch(selectTemplate(selectedTemplate));
  }

  render() {
    let tabContent;
    if (this.props.loading) {
      tabContent = 'Loading...';
      return (tabContent)
    } else if (this.props.error) {
      tabContent = this.props.error;
      return (tabContent)
    } else {
      tabContent = this.props.tabItems.map((item, index) => {
        if (item.content.length > 0){
        return (
          <TabPane key={shortid.generate()} tabId={index}>
            <Row>
              {item.content.map((c, index) => (
                <Col sm={{ size: 6 }} md={{ size: 4, offset: 1 }} className='mt-5 mb-5' key={index}>
                  <DataCard
                    imageUrl={c.imageUrl}
                    title={c.name}
                    description={c.description}
                    url={this.props.url}
                    onClick={() => { this.template(index); }}
                  />
                </Col>
              ))}
            </Row>
          </TabPane>
          )
      } else {
        return (
          <TabPane key={shortid.generate()} tabId={index}>
            <Row>
              <Col className='mt-5 mb-5 text-center'>
                <p>You do not have templates for {item.type}.</p>
              </Col>
            </Row>
          </TabPane>
        )
      }
    });
    }


    
    return (
      <div>
        <Nav tabs className={css`${styles.tabs}` + ' nav-justified'}>
        {this.props.tabItems.map((item, index) => {
          return (
            <NavItem key={shortid.generate()}>
              <NavLink
                className={classnames({ active: this.state.activeTab === index })}
                onClick={() => { this.toggle(index); }}
              >
                {item.type}
              </NavLink>
            </NavItem>
            )
          })}
        </Nav>
        <TabContent activeTab={this.state.activeTab}>
          {tabContent}
        </TabContent>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  templates: state.templates,
  loading: state.templates.loading,
  error: state.templates.error
})


export default connect(mapStateToProps)(Tabs);

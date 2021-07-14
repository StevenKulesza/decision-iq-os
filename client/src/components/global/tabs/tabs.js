import React from 'react';
import { css } from 'emotion';
import { TabContent, TabPane, Nav, NavItem, NavLink, Row, Col } from 'reactstrap';
import classnames from 'classnames';

import StyleTab from '../../personalization/tabs/style'
import ProductsTab from '../../personalization/tabs/products'
import FramesTab from '../../personalization/tabs/frames'

// Styles
import * as styles from '../../../styles/tabs/tabs'

class Tabs extends React.Component {
  constructor(props) {
	super(props);

	this.state = {
		activeTab: 0
	};

	this.toggle = this.toggle.bind(this);
  }

  toggle(tab) {
		if (this.state.activeTab !== tab) {
			this.setState({
			activeTab: tab
			});
		}
  }
  
  render() {
	let {selectedTemplate} = this.props;
	let tabTitlesArr = [];

	// grab tab labels from feed object
	if (selectedTemplate && selectedTemplate.template !== undefined){
		for (let key in selectedTemplate.template) {
			if (selectedTemplate.template[key].label) {

				// Dont display the Audience Tab
				if (selectedTemplate.template[key].label !== 'Audience') {
					tabTitlesArr.push(selectedTemplate.template[key].label)
				}

			}
		}
	}

	// set tabs labels based on tabTitleArr
	let tabTitles = tabTitlesArr.map((title, index) => {
		return (
			<NavItem key={title}>
				<NavLink
					className={classnames({ active: (this.state.activeTab === index) })}
					onClick={() => { this.toggle(index); }}
				>
					{title}
				</NavLink>
			</NavItem>
		)
	})



	const tabSwitch = (data) => {
		/* eslint no-unreachable: 0 */
		switch (data) {
			case 'Styles':
				return <StyleTab {...this.props} />
			break;
			case 'Frames':
				return <FramesTab {...this.props} />
			break;
			case 'Products':
				return <ProductsTab {...this.props} />
			break;
			default:
				return 'No content available.'
			break;
		}
	}
	
	// crawl feed object to display each component for each key
	let tabContents = tabTitlesArr.map((tab, index) => {
		return (
			<TabPane key={tab} tabId={index}>
				<Row>
					<Col sm="12">
						{tabSwitch(tab)}
					</Col>
				</Row>
			</TabPane>
		)
	})

	return (
		<div>
			<Nav tabs className={css`${styles.tabs}` + ' nav-justified'}>
				{tabTitles}
			</Nav>
			<TabContent className={css`${styles.scrollable}`} activeTab={this.state.activeTab}>
				{tabContents}
			</TabContent>
		</div>
	);
  }
}


export default Tabs;
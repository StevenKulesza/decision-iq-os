import React, { Component } from 'react';
import { css } from 'emotion'
import { Collapse, Button } from 'reactstrap';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';

import * as styles from '../../../styles/button/button'

class CollapseGeneral extends Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = { collapse: false };
  }

  toggle() {
    this.setState({ collapse: !this.state.collapse });
  }

  render() {
    let caret;

    if (this.state.collapse) {
      caret = <IoIosArrowDown / > ;
    } else {
      caret = <IoIosArrowUp />;
    }

    return (
      <div>
        <Button block onClick={this.toggle} className={css`${styles.buttonAccordian}`}>{this.props.name} <span className='float-right'>{caret}</span></Button>
        <Collapse isOpen={this.state.collapse}>
          {this.props.children}
        </Collapse>
      </div>
    );
  }
}

export default CollapseGeneral;
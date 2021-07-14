import React from 'react';
import { Dropdown, DropdownMenu, DropdownToggle, Row, Col } from 'reactstrap';

import Switch from './switch';

class SelectionDropdown extends React.Component {
    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = {
            dropdownOpen: false
        };
    }

    toggle() {
        this.setState({
            dropdownOpen: !this.state.dropdownOpen
        });
    }
  render() {
    return (
        <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
            <DropdownToggle caret>
            Change Sizes
            </DropdownToggle>
            <DropdownMenu style={{backgroundColor:"#f7f7f7"}} className='p-2'>
            <p>Toggle template sizes:</p>
            {Object.keys(this.props.items).map((key, index) => {  
                return (
                    <Row key={index}>
                        <Col className='pt-2'>{key}:</Col>
                        <Col><Switch value={key}/></Col> 
                    </Row>
                )
                })}
            </DropdownMenu>
        </Dropdown>
    )
  }
}

SelectionDropdown.defaultProps = {
    items: []
}

export default SelectionDropdown;

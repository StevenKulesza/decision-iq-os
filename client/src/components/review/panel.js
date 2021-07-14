// Packages
import React from 'react';
import Tabs from './tabs/tabs';

class PersonalizationPanel extends React.Component {

  render() {
    return(
      <div>
        <Tabs {...this.props} />
      </div>
    )
  }
}

export default PersonalizationPanel;

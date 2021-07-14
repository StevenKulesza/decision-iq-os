// Packages
import React from 'react'
import { connect } from 'react-redux'
import { css } from 'emotion'

// Actions
import { addTemplateSize, deleteTemplateSize } from '../../actions/templates'

// Styles
import * as styles from '../../styles/switch/switch'

class Switch extends React.Component {
	constructor(props) {
    super(props);
    this.state = {
    	selection: false
    }

    this.handleChange = this.handleChange.bind(this);
  };

  componentWillMount() {
    /* eslint array-callback-return: 0 */
    Object.keys(this.props.templateSizes).map((key, index) => {
      let size = this.props.templateSizes[key].width + 'x' + this.props.templateSizes[key].height;

      if (this.props.templateSizes[key].active === true && size === this.props.value) {
        this.setState({
          selection:true
        })
      }
    });
  }

  handleChange(e) {
    this.setState({ selection: e.target.checked });

		if (this.state.selection === false) {
			this.props.dispatch(addTemplateSize(e.target.value));
		} else {
			this.props.dispatch(deleteTemplateSize(e.target.value));
		}
  };

  render() {
    return (
      <div className={css`${styles.onOffSwitch}`}>
        <input 
          type="checkbox" 
          value={this.props.value} 
          id={this.props.value} 
          name="onoffswitch" 
          className="onoffswitch-checkbox"
          onChange={this.handleChange}
          checked={this.state.selection}
        />
        <label className="onoffswitch-label" htmlFor={this.props.value}>
          <span className="onoffswitch-inner"></span>
          <span className="onoffswitch-switch"></span>
        </label>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  templateSizes: state.templates.selectedTemplate.sizes
})

export default connect(mapStateToProps)(Switch);

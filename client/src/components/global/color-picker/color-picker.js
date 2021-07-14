import React from 'react'
import { SketchPicker } from 'react-color'
import { css } from 'emotion';

// Styles
import * as styles from '../../../styles/color-picker/color-picker.js'

class ColorPicker extends React.Component {
  state = {
    displayColorPicker: false,
    color: '#123456',
  };

  handleClick = () => {
    this.setState({ displayColorPicker: !this.state.displayColorPicker })
  };

  handleClose = () => {
    this.setState({ displayColorPicker: false })
  };

  handleChange = (color) => {

    this.setState({ color: color.rgb })

    //if there is no transparency, use hex
    if(color.rgb.a === 1){
      if(this.props.onChange) this.props.onChange(color.hex);
    }else{
      if(this.props.onChange) this.props.onChange("rgba(" + color.rgb.r + "," + color.rgb.g + "," + color.rgb.b + "," + color.rgb.a + ")");
    }

  };

  render() {
    let displayColor = this.props.color ? this.props.color : this.state.color;

    const color = {
        background: `${displayColor}`,
    }

    return (
      <div>
        <div className={css`${styles.swatch}`} onClick={ this.handleClick }>
          <div className={css`${styles.color}`} style={color} />
        </div>
        { this.state.displayColorPicker 
          ? 
          <div className={ css`${styles.popover}` }>
            <div className={ css`${styles.cover}` } onClick={ this.handleClose }/>
            <SketchPicker color={ displayColor } onChange={ this.handleChange } disableAlpha={false} presetColors={["transparent"]}/>
          </div> 
          : 
          null 
        }
      </div>
    )
  }
}

export default ColorPicker;
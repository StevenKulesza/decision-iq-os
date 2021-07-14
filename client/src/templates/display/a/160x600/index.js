// Packages
import React from 'react'
import { connect } from 'react-redux'
import { css } from 'emotion';

import * as display from '../../../../styles/templates/display/display'
import './styles.css'

class Index extends React.Component {

  render(){
    let {selectedTemplate} = this.props;
    let templateStyles = selectedTemplate.template.styles;

    const logoStyle = css({
      backgroundImage: 'url(' + templateStyles.logo.image.value + ')',
      backgroundSize: 'contain',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat'
    })

    const ctaStyle = css({
      backgroundColor: templateStyles.cta.background.value,
      backgroundImage: 'url(' + templateStyles.cta.background_image.value + ')',
      backgroundSize: 'contain',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      color: templateStyles.cta.color.value,
    })

    const headerStyle = css({
      backgroundColor: templateStyles.header.background.value,
      backgroundImage: 'url(' + templateStyles.header.background_image.value + ')',
      backgroundSize: 'cover'
    })

    const footerStyle = css({
      backgroundColor: templateStyles.footer.background.value,
      backgroundImage: 'url(' + templateStyles.footer.background_image.value + ')',
      backgroundSize: 'cover'
    })

    const backgroundStyle = css({
      backgroundColor: templateStyles.background.background.value,
      backgroundImage: 'url(' + templateStyles.background.background_image.value + ')',
      backgroundSize: 'cover'
    })

    const galleryImageStyle = css({
      backgroundImage: 'url(https://via.placeholder.com/160x275)',
      backgroundSize: 'cover'
    })

    return (
      <div className={css`${display.banner160x600}` + ' ' + css`${display.bannerGlobalStyles}` + ' a160x600'}>
        <div className='banner absolute'>
          <div className={backgroundStyle + " left-frame absolute"}>
            <div className="text1 absolute center-bg contain"></div>
          </div>

          <div className="gallery absolute">
            <div className="items absolute">
              <div className="item-container">
                <div className={ galleryImageStyle + " image-item absolute contain"}></div>
              </div>
            </div>
          </div>

          <div className={ headerStyle + " header absolute"}>
            <div className={ logoStyle + " logo absolute contain center-bg"}></div>
          </div>
          <div className={footerStyle + " footer absolute"}>
            <div className={ctaStyle + " cta absolute"}>{templateStyles.cta.text.value}</div>
          </div>

          <div className="clicktag-general"></div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  templates: state.templates.templates,
  selectedTemplateType: state.templates.selectedTemplateType,
  selectedTemplate: state.templates.selectedTemplate
})

export default connect(mapStateToProps)(Index)
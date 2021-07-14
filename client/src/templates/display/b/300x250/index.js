// Packages
import React from 'react'
import { css } from 'emotion';

import * as display from '../../../../styles/templates/display/display'
import './styles.css'

class Index extends React.Component {

  render(){
    let selectedTemplate = this.props.selectedTemplate,
        selectedAudience = this.props.flight.selectedAudience;
    let templateStyles = selectedTemplate.template.styles.styles[selectedAudience];

    let product = {
      "brand":"",
      "price":"",
      "description":"",
      "image":""
    };

    let frame = {
      "name": "",
      "clicktag": "",
      "image": {
          "160x600": {
            "value": ""
          },
          "300x250": {
            "value": ""
          },
          "300x600": {
            "value": ""
          },
          "728x90": {
            "value": ""
          }
      }
    };

   

    //Visualize Product
    if(selectedTemplate.visualizer 
      && selectedTemplate.visualizer.tabKey === "products" &&
      selectedTemplate.template.products.products[selectedTemplate.visualizer.objectKey]){
      product = selectedTemplate.template.products.products[selectedTemplate.visualizer.objectKey];
    }

    //Visualize Frame
    if(selectedTemplate.visualizer &&
        selectedTemplate.visualizer.tabKey === "frames" &&
        selectedTemplate.template.frames.frames[selectedTemplate.visualizer.objectKey]){
      frame = selectedTemplate.template.frames.frames[selectedTemplate.visualizer.objectKey];
    }

    let galleryBackground = (selectedTemplate.visualizer &&
       selectedTemplate.visualizer.tabKey === "frames") ? frame.image["300x250"].value : templateStyles.gallery.background_image_300x250.value;

    const logoStyle = css({
      backgroundImage: templateStyles.logo.image.value ? 'url(' + templateStyles.logo.image.value + ')' : null,
      backgroundSize: 'contain',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat'
    })

    const galleryStyle = css({
      backgroundColor: templateStyles.gallery.background.value,
      backgroundImage: galleryBackground ? 'url(' + galleryBackground + ')' : null,
      backgroundSize: '100% auto',
      backgroundRepeat: 'no-repeat'
    })

    const ctaStyle = css({
      backgroundColor: templateStyles.cta.background.value,
      backgroundImage: templateStyles.cta.background_image.value ? 'url(' + templateStyles.cta.background_image.value + ')' : null,
      backgroundSize: 'contain',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      color: templateStyles.cta.color.value,
    })

    const headerStyle = css({
      backgroundColor: templateStyles.header.background.value,
      backgroundImage: templateStyles.header.background_image_300x250.value ? 'url(' + templateStyles.header.background_image_300x250.value + ')' : null,
      backgroundSize: 'cover'
    })
    
    const footerStyle = css({
      backgroundColor: templateStyles.footer.background.value,
      backgroundImage: templateStyles.footer.background_image_300x250.value ? 'url(' + templateStyles.footer.background_image_300x250.value + ')' : null,
      backgroundSize: 'cover'
    })

    const backgroundStyle = css({
      backgroundColor: templateStyles.background.background.value,
      backgroundImage: templateStyles.background.background_image_300x250.value ? 'url(' + templateStyles.background.background_image_300x250.value + ')' : null,
      backgroundSize: 'cover'
    })

    const priceStyle = css({
      backgroundColor: templateStyles.price.background.value,
      color: templateStyles.price.color.value,
      fontFamily: templateStyles.price.font_family.value,
      fontSize: templateStyles.price.font_size.value + 'px',
      fontWeight: templateStyles.price.font_weight.value,
      letterSpacing: templateStyles.price.letter_spacing.value
    })

    const textStyle = css({
      background: templateStyles.text.background.value,
      color: templateStyles.text.color.value,
      fontFamily: templateStyles.text.font_family.value,
      fontSize: templateStyles.text.font_size.value + 'px',
      fontWeight: templateStyles.text.font_weight.value,
      letterSpacing: templateStyles.text.letter_spacing.value
    })

    const arrowStyle = css({
      backgroundImage: templateStyles.gallery.arrow.value ? 'url(' + templateStyles.gallery.arrow.value + ')' : null,
    });

    const productImageStyle = css({
      backgroundImage: product.image.value ? 'url(' + product.image.value  + ')' : null
    })

    return (
      <div className={css`${display.banner300x250}` + ' ' + css`${display.bannerGlobalStyles}` + ' b300x250'}>
        <div className={backgroundStyle + ' banner absolute'}>
          <div className="clicktag-general">
            <div className={ headerStyle + " header absolute"}>
              <div className="text1 absolute contain center-bg">
              </div>
            </div>
            <div className={footerStyle + " footer absolute"}>
              <div className={ctaStyle + " cta absolute"}>{templateStyles.cta.text.value}</div>
              <div className={logoStyle + " logo absolute contain center-bg"}></div>
            </div>
          </div>
          
          <div className={galleryStyle + " gallery absolute"}>
            <div className={arrowStyle + " arrow-left absolute contain center-bg"}></div>
            <div className="items absolute">
              <div className="item-container">
                <div className="items-text-container absolute">
                  <div className="vert-align">
                    <p className={priceStyle + " item-price"} dangerouslySetInnerHTML={{__html: product.price}}>

                    </p>
                    <p className={textStyle + " item-description"}><span dangerouslySetInnerHTML={{__html: product.brand}}></span><br/><span dangerouslySetInnerHTML={{__html: product.description}}></span></p>
                  </div>
                </div>
                <div className={productImageStyle + " image-item absolute contain"}></div>
              </div>
            </div>
            <div className={arrowStyle + " arrow-right absolute contain center-bg"}></div>
          </div>
        </div>
      </div>
    )
  }
}


export default Index
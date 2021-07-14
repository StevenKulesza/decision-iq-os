var setAssets = function (paths) {
  var imageArray = [];
  var audienceStyle = grabStyleId(paths.audienceId, paths.styles);

  var fontArray = [{
      family: paths.styles[audienceStyle].price.font_family.value,
      variants: paths.styles[audienceStyle].price.font_weight.value,
      subsets: ''
    },
    {
      family: paths.styles[audienceStyle].text.font_family.value,
      variants: paths.styles[audienceStyle].text.font_weight.value,
      subsets: ''
    }
  ];
  //load fonts
  for (var i = 0; i < fontArray.length; i++) {
    loadFont(fontArray[i])
  }

  // background
  elem('.bg').style.backgroundColor = paths.styles[audienceStyle].background.background.value;
  elem('.bg').style.backgroundImage = 'url("' + paths.styles[audienceStyle].background.background_image_728x90.imageID + '")';
  
  // gallery
  elem('.arrow-left').style.backgroundImage   = 'url("' + paths.styles[audienceStyle].gallery.arrow.imageID + '")';
  elem('.arrow-right').style.backgroundImage  = 'url("' + paths.styles[audienceStyle].gallery.arrow.imageID + '")';
  elem('.gallery').style.backgroundColor      = paths.styles[audienceStyle].gallery.background.value;
  elem('.gallery').style.backgroundImage      = 'url("' + paths.styles[audienceStyle].gallery.background_image_728x90.imageID + '")';

  // logo
  elem('.logo').style.backgroundImage = 'url("' + paths.styles[audienceStyle].logo.image.imageID + '")';

  // cta
  elem('.cta').style.cssText              = paths.styles[audienceStyle].cta.color.value + paths.styles[audienceStyle].cta.background.value;
  elem('.cta-copy').innerHTML             = paths.styles[audienceStyle].cta.text.value;
  elem('.cta-copy').style.color           = paths.styles[audienceStyle].cta.color.value;
  elem('.cta-copy').style.backgroundColor = paths.styles[audienceStyle].cta.background.value;
  elem('.cta-copy').style.backgroundImage = 'url("' + paths.styles[audienceStyle].cta.background_image.imageID + '")';

  // text
  var itemPrice = elems('.item-price');
  var itemDescription = elems('.item-description');
  for (var i = 0; i < itemPrice.length; i++) {
    itemPrice[i].style.color = paths.styles[audienceStyle].price.color.value;
    itemPrice[i].style.backgroundColor = paths.styles[audienceStyle].price.background.value;
    itemPrice[i].style.fontFamily = paths.styles[audienceStyle].price.font_family.value;
    itemPrice[i].style.fontSize = paths.styles[audienceStyle].price.font_size.value + 'px';
    itemPrice[i].style.fontWeight = paths.styles[audienceStyle].price.font_weight.value;
    itemPrice[i].style.letterSpacing = paths.styles[audienceStyle].price.letter_spacing.value;

    itemDescription[i].style.color = paths.styles[audienceStyle].text.color.value;
    itemDescription[i].style.backgroundColor = paths.styles[audienceStyle].text.background.value;
    itemDescription[i].style.fontFamily = paths.styles[audienceStyle].text.font_family.value;
    itemDescription[i].style.fontSize = paths.styles[audienceStyle].text.font_size.value + 'px';
    itemDescription[i].style.fontWeight = paths.styles[audienceStyle].text.font_weight.value;
    itemDescription[i].style.letterSpacing = paths.styles[audienceStyle].text.letter_spacing.value;
  }

  elem('.text1').style.backgroundImage = 'url("' + paths.styles[audienceStyle].header.background_image_728x90.imageID + '")';

  // preload images
  preloadCheck(paths.styles[audienceStyle].background.background_image_728x90.value, imageArray);
  preloadCheck(paths.styles[audienceStyle].gallery.background_image_728x90.value, imageArray);
  preloadCheck(paths.styles[audienceStyle].cta.background_image.imageID, imageArray);
  preloadCheck(paths.styles[audienceStyle].header.background_image_728x90.value, imageArray);

  // if frames are true then push its set images/copy and add to preloader
  for (f in paths.frames) {
    if (paths.frames[f].visible === true && paths.frames[f].name !== 'geo') {
      console.log(paths.frames[f])
      loadFrame('.frame-' + paths.frames[f].name, paths.frames[f].image[size].imageID);
    }
  }

  /* Frame Constructor - Preloads and applys frame to HTML */
  function loadFrame(className, imagePath) {
    elem(className).style.backgroundImage = 'url("' + imagePath + '")';
    preloadCheck(imagePath, imageArray);
  }

  preloadImages(imageArray, paths);
};

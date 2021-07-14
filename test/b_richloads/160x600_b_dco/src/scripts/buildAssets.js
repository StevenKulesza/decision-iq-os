var buildAssets = (function () {
  var stateTrackingData = [];
  var htmlToInclude = '';
  var framesToInclude = '';
  var clickTagGeneral = elem('.clicktag-general');
  var lifecycleClicktag;
  var i;
  var p;
  var framesToSubtractFromRotation = 0;
  var framesCount = 0;

  var buildFromFeed = function (data) {
    stateTrackingData.push('success');
    var setAssetNumber = Number(myFT.instantAds.numberOfProducts);
    var products = weightedSort(data.products, setAssetNumber);
    var frames = data.frames;

    if (myFT.instantAds.uid == undefined) myFT.instantAds.uid = '';

    // if maxAssets is set and can be met, do that; else, use all assets
    totalItems = (setAssetNumber && (setAssetNumber < products.length)) ? setAssetNumber : products.length;

    // set main clicktag
    myFT.applyClickTag(clickTagGeneral, 1, '?' + myFT.instantAds.clicktag1 + myFT.instantAds.uid);
    clickTagGeneral.addEventListener('click', resetClicktag);

    // calculate asset count
    p = products.length > totalItems ? products.length - 1 - totalItems : 0;

    // build HTML structure
    for (i = 0; i < totalItems; i++) {
      p = i + 1; // HTML element asset number
      htmlToInclude += '<div class="item' + p + ' item-container"><div class="items-text-container absolute"><div class="vert-align"><p class="item' + p + 'price item-price"></p><p class="item' + p + 'description item-description"></p></div></div><div class="image-item' + p + ' image-item absolute contain center-bg"></div></div>';
    }

    // apply the html to the dom
    elem('.items').innerHTML = htmlToInclude;

    // configure HTML elements
    assets = products.slice(-totalItems);

    // build frames
    for (var i = 0; i < frames.length; i++) {
      var frameName = frames[i].name;

      if (frameName === 'geo' || frames[i].evergreen) framesToSubtractFromRotation++
      if (frames[i].visible) {
        if (frameName !== 'kc' && frameName !== 'geo') {

          p++;
          framesCount++
          // totalItems++
          framesToInclude += '<div class="item' + p + ' item-container"><div class="image-item' + p + ' absolute cover frame-' + frameName + ' full-frame"></div></div>';
        }
      } else framesToSubtractFromRotation++
    }
    elem('.items').innerHTML += framesToInclude;
    
    // build each asset
    for (i = 0; i < totalItems; i++) {
      product = products[i];
      stateTrackingData.push(product.product_id);
      p = i + 1; // HTML element asset number

      // apply image size
      elem('.image-item' + p).style.backgroundImage = 'url("' + product.image.imageID + '")';

      // apply item copy
      elem('.item' + p + 'price').innerHTML = product.price;
      elem('.item' + p + 'description').innerHTML = product.brand + "<br>" + product.description;

      // apply item clicktag
      lifecycleClicktag = '?' + product.clicktag + myFT.instantAds.uid;
      myFT.applyClickTag(elem('.item' + p), p + 1, lifecycleClicktag);
      elem('.item' + p).addEventListener('click', resetClicktag); // stop carousel
    }

    p++;

    for (i = 1; i < p + framesCount; i++) {
      lifecycleClicktag = '?' + product.clicktag + myFT.instantAds.uid;
      myFT.applyClickTag(elem('.item' + i), i + 1, lifecycleClicktag);

      elem('.item' + i).addEventListener('click', resetClicktag); // stop carousel
    }

    // console.log(totalItems, frames.length, framesToSubtractFromRotation, framesCount)
    totalItems += framesCount;

    // push to log file
    myFT.stateTrackingEvent(stateTrackingData.join('|'));
  };

  return {
    buildFromFeed: buildFromFeed
  };
}());

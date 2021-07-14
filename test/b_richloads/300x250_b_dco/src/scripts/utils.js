// global vars
var size = ['300x250']; //['160x600', '300x250', '300x600', '728x90'];//ad size from adSizes
var galleryInterval;
var isGalleryAnimating = false;
var loadedImages = 0;

// grab style id 
function grabStyleId(audienceId, stylePath) {
  var styleObjId = '';
  for (var i in stylePath) {
    if (i === audienceId) {
      return styleObjId = i;
    } else {
      return styleObjId = Object.keys(stylePath)[0];
    }
  }
}

// font load
function loadFont(font) {
  var apiUrl = [];

  apiUrl.push('https://fonts.googleapis.com/css?family=');
  apiUrl.push(font.family.replace(/ /g, '+'));
  if (font.variants) {
    apiUrl.push(':');
    apiUrl.push(font.variants);
  }
  if (font.subsets) {
    apiUrl.push('&subset=');
    apiUrl.push(font.subsets);
  }

  var url = apiUrl.join('');
  var link = document.createElement('link');

  link.rel = 'stylesheet';
  link.href = url;
  document.head.appendChild(link);
}

// show static image
function showStatic() {
  var clickTagGeneral = elem('.clicktag-general');
  // apply clicktag to static from manifest
  myFT.applyClickTag(clickTagGeneral, 1, myFT.instantAds.clicktag1);

  // add static image from manifest
  elem('.static').style.backgroundImage = 'url(' + myFT.instantAds.failsafeStatic + ')';

  // show static image
  elem('.banner').style.display = 'block';
  elem('.static').style.opacity = 1;
}

// weighted sort algorithm
function weightedSort(data, productLimit) {
  var products = [];
  var output = [];
  var dataSum = 0;
  var sum = 0;
  var sortedData;
  var randomNumber;
  var numberToPop;
  var noOfproducts = productLimit;
  var j;
  var k;
  var l;
  var i;
  var x;

  // rescale weights if not equal to 1
  for (k = 0; k < data.length; k++) {
    dataSum = dataSum + data[k].weight;
  }

  for (j = 0; j < data.length; j++) {
    data[j].weight = data[j].weight / dataSum;
  }

  // sort weights from heigh to low
  sortedData = data.sort(function (a, b) {
    return parseFloat(a.weight) - parseFloat(b.weight);
  });

  sortedData.reverse();

  output = sortedData;

  for (i = 0; i < noOfproducts; i++) {
    // generate random number
    randomNumber = Math.random();

    // create cumulative distribution from weights
    for (x in output) {
      sum = sum + output[x].weight;
      // grab the new output and regenerate the cumulative sums
      output[x].cumul_sum = sum;
    }

    for (l = 0; l < output.length; l++) {
      // for cumulative weights greater than random number
      if (output[l].cumul_sum > randomNumber) {
        // take larger number
        numberToPop = output[l];

        // push into product rotation
        products.push(numberToPop);

        // pop from output
        output.splice(l, 1);

        // rescale remaining weights up to 1 (divide each remaining weight by (1 - poped weight))
        for (j = 0; j < output.length; j++) {
          output[j].weight = output[j].weight / (1 - numberToPop.weight);
        }

        // break out of loop, and recalculate to pull new product
        break;
      }
    }
    // reset
    dataSum = 0;
    sum = 0;
  }
  return products;
}

// preloader
function preloadImages(imageArray, paths) {
  var tempImage;
  var i;

  //If there are no images, load anyway
  if(imageArray.length == 0) return animateAd.init(paths);

  for (i = 0; i < imageArray.length; i++) {
    tempImage = new Image();
    if (imageArray[i].indexOf('.svg') !== -1) {
      trackProgress(imageArray, paths);
    } else {
      tempImage.addEventListener('load', trackProgress(imageArray, paths));
    }
    tempImage.src = imageArray[i];
  }
}

function trackProgress(imageArray, paths) {
  loadedImages++;
  if (loadedImages === imageArray.length) {
    animateAd.init(paths)
  }
}

function preloadCheck (image, array) {
  if (image && image !== "") array.push(image);
}

// stop gallery
function resetClicktag() {
  clearInterval(galleryInterval);
}

// select one element
function elem(element) {
  return document.querySelector(element);
}

// select all elements
function elems(element) {
  return document.querySelectorAll(element);
}


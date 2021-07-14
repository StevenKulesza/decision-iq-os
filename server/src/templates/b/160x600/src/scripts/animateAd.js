var animateAd = (function () { 
  var loadedImages = 0;
  var lT = 0.8;
  var sT = 0.4;
  var easeInOut = Power1.easeInOut;
  var tL = new TimelineMax();
  var isGeo = false;

  var init = function (paths) {
    var currentSlider = 1;
    for (var i = 0; i < paths.frames.length; i++) {
      var frameName = paths.frames[i].name;
      if (frameName === 'geo' && paths.frames[i].visible) {
        tL
          .set('.gallery', { height: 402 })
          .set('.footer', {height: 38})
          .set('.image-item', { top: 172, height: 160, width: '100%', right: 0 })
          .set('.items-text-container', { top: 66, right: 0, left: 10, width: 140, height: 104 })
          .set('.arrow-right', { top: 320 })
          .set('.arrow-left', { top: -45 })
        ;

        isGeo = true;
      }
    }

    // display the banner after preload
    elem('.banner').style.display = 'block';

    // initial fade-in
    tL
      .to('.logo', sT, { autoAlpha: 1, ease: easeInOut })
      .to('.text1', sT, { autoAlpha: 1, ease: easeInOut })
      .to(['.gallery', 'gallery_arrows'], sT, { autoAlpha: 1, ease: easeInOut})
    ;
    
    if (!isGeo) tL.to(['.text2', '.plus-container'], lT, { autoAlpha: 1, ease: easeInOut });
    
    tL.to('.cta', sT, { autoAlpha: 1, ease: easeInOut, onComplete: playGallery }, '-=' + sT)


    function playGallery() {
      if (totalItems >= 2) galleryInterval = setInterval(moveDown, 2000);
    }

    function move() {
      tL.to('.item-container', sT, { autoAlpha: 0, zIndex: 0, ease: easeInOut }); // fade out all items
      tL.to('.item' + currentSlider, sT, { delay: 0.2, autoAlpha: 1, zIndex: 1, ease: easeInOut, onComplete: animateFalse });   // fade in applicable item after delay

      function animateFalse() {
        isGalleryAnimating = false;
      }
    }

    function moveUp() {
      if (!isGalleryAnimating) {
        isGalleryAnimating = true;
        currentSlider--;
        if (currentSlider < 1) currentSlider = totalItems;  // rollover if needed
        move();
      }
    }

    function moveDown() {
      if (isGalleryAnimating === false) {
        isGalleryAnimating = true;
        currentSlider++;
        if (currentSlider === totalItems) resetClicktag();  // stop auto animation
        if (currentSlider > totalItems) currentSlider = 1;  // rollover if needed
        move();
      }
    }

    myFT.$('.arrow-left').on('click', function () {
      if (!isGalleryAnimating) {
        moveUp();
        clearInterval(galleryInterval);
      }
    });

    myFT.$('.arrow-right').on('click', function () {
      if (!isGalleryAnimating) {
        moveDown();
        clearInterval(galleryInterval);
      }
    });
  };

  return {
    init: init
  };
}());

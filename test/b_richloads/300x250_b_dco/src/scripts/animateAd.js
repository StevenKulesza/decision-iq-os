var animateAd = (function () {
  
  var loadedImages = 0;
  var lT = 0.8;
  var sT = 0.4;
  var easeInOut = Power1.easeInOut;
  var tL = new TimelineMax();

  var init = function (paths) {
    var currentSlider = 1;

    // display the banner after preload
    elem('.banner').style.display = 'block';

    // initial fade-in
    tL
      .to('.text1', sT, { autoAlpha: 1, ease: easeInOut })
      .to('.plus-container', sT, { autoAlpha: 1, ease: easeInOut })
      .to('.gallery', sT, { autoAlpha: 1, ease: easeInOut })
      .to('gallery_arrows', sT, { opacity: 1, ease: easeInOut })
      .to(['.logo', '.cta'], sT, { autoAlpha: 1, ease: easeInOut, onComplete: playGallery }, '-=' + sT)
    ;

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

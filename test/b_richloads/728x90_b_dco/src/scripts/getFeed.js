// myFT Load
myFT.on('instantads', getFeed);

function getFeed() {
  var ftFeed = new FTFeed(myFT);
  ftFeed.getFeed(
    function (data) {

      var paths = {
        styles: data[0].styles.styles,
        frames: data[0].frames.frames,
        products: data[0].products.products,
        audienceId: data[0].audience_id

      };

      buildAssets.buildFromFeed(paths);
      setAssets(paths);
    },
    function (errorMsg, feedUrl) {
      var audience = feedUrl.split('audienceId=')[1].split('&')[0];
      myFT.stateTrackingEvent('error|' + audience);

      // show a static image
      showStatic();
    }
  );
}

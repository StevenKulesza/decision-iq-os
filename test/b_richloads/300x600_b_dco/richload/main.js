var galleryInterval,size=["300x600"],isGalleryAnimating=!1,loadedImages=0;function grabStyleId(e,t){for(var a in t)return a===e?a:Object.keys(t)[0]}function loadFont(e){var t=[];t.push("https://fonts.googleapis.com/css?family="),t.push(e.family.replace(/ /g,"+")),e.variants&&(t.push(":"),t.push(e.variants)),e.subsets&&(t.push("&subset="),t.push(e.subsets));var a=t.join(""),l=document.createElement("link");l.rel="stylesheet",l.href=a,document.head.appendChild(l)}function showStatic(){var e=elem(".clicktag-general");myFT.applyClickTag(e,1,myFT.instantAds.clicktag1),elem(".static").style.backgroundImage="url("+myFT.instantAds.failsafeStatic+")",elem(".banner").style.display="block",elem(".static").style.opacity=1}function weightedSort(e,t){var a,l,s,i,r,n,o,c,m=[],g=[],u=0,d=0,y=t;for(r=0;r<e.length;r++)u+=e[r].weight;for(i=0;i<e.length;i++)e[i].weight=e[i].weight/u;for((a=e.sort(function(e,t){return parseFloat(e.weight)-parseFloat(t.weight)})).reverse(),g=a,o=0;o<y;o++){for(c in l=Math.random(),g)d+=g[c].weight,g[c].cumul_sum=d;for(n=0;n<g.length;n++)if(g[n].cumul_sum>l){for(s=g[n],m.push(s),g.splice(n,1),i=0;i<g.length;i++)g[i].weight=g[i].weight/(1-s.weight);break}d=u=0}return m}function preloadImages(e,t){var a,l;if(0==e.length)return animateAd.init(t);for(l=0;l<e.length;l++)a=new Image,-1!==e[l].indexOf(".svg")?trackProgress(e,t):a.addEventListener("load",trackProgress(e,t)),a.src=e[l]}function trackProgress(e,t){++loadedImages===e.length&&animateAd.init(t)}function preloadCheck(e,t){e&&""!==e&&t.push(e)}function resetClicktag(){clearInterval(galleryInterval)}function elem(e){return document.querySelector(e)}function elems(e){return document.querySelectorAll(e)}function getFeed(){new FTFeed(myFT).getFeed(function(e){var t={styles:e[0].styles.styles,frames:e[0].frames.frames,products:e[0].products.products,audienceId:e[0].audience_id};buildAssets.buildFromFeed(t),setAssets(t)},function(e,t){var a=t.split("audienceId=")[1].split("&")[0];myFT.stateTrackingEvent("error|"+a),showStatic()})}myFT.on("instantads",getFeed);var buildAssets=function(){var r,n,o=[],c="",m="",g=elem(".clicktag-general"),u=0;return{buildFromFeed:function(e){o.push("success");var t=Number(myFT.instantAds.numberOfProducts),a=weightedSort(e.products,t),l=e.frames;for(null==myFT.instantAds.uid&&(myFT.instantAds.uid=""),totalItems=t&&t<a.length?t:a.length,myFT.applyClickTag(g,1,"?"+myFT.instantAds.clicktag1+myFT.instantAds.uid),g.addEventListener("click",resetClicktag),n=a.length>totalItems?a.length-1-totalItems:0,s=0;s<totalItems;s++)c+='<div class="item'+(n=s+1)+' item-container"><div class="items-text-container absolute"><div class="vert-align"><p class="item'+n+'price item-price"></p><p class="item'+n+'description item-description"></p></div></div><div class="image-item'+n+' image-item absolute contain center-bg"></div></div>';elem(".items").innerHTML=c,assets=a.slice(-totalItems);for(var s=0;s<l.length;s++){var i=l[s].name;("geo"===i||l[s].evergreen)&&0,l[s].visible?"kc"!==i&&"geo"!==i&&(u++,m+='<div class="item'+ ++n+' item-container"><div class="image-item'+n+" absolute cover frame-"+i+' full-frame"></div></div>'):0}for(elem(".items").innerHTML+=m,s=0;s<totalItems;s++)product=a[s],o.push(product.product_id),elem(".image-item"+(n=s+1)).style.backgroundImage='url("'+product.image.imageID+'")',elem(".item"+n+"price").innerHTML=product.price,elem(".item"+n+"description").innerHTML=product.brand+"<br>"+product.description,r="?"+product.clicktag+myFT.instantAds.uid,myFT.applyClickTag(elem(".item"+n),n+1,r),elem(".item"+n).addEventListener("click",resetClicktag);for(n++,s=1;s<n+u;s++)r="?"+product.clicktag+myFT.instantAds.uid,myFT.applyClickTag(elem(".item"+s),s+1,r),elem(".item"+s).addEventListener("click",resetClicktag);totalItems+=u,myFT.stateTrackingEvent(o.join("|"))}}}(),setAssets=function(e){for(var a=[],t=grabStyleId(e.audienceId,e.styles),l=[{family:e.styles[t].price.font_family.value,variants:e.styles[t].price.font_weight.value,subsets:""},{family:e.styles[t].text.font_family.value,variants:e.styles[t].text.font_weight.value,subsets:""}],s=0;s<l.length;s++)loadFont(l[s]);elem(".bg").style.backgroundColor=e.styles[t].background.background.value,elem(".bg").style.backgroundImage='url("'+e.styles[t].background.background_image_300x600.imageID+'")',elem(".arrow-left").style.backgroundImage='url("'+e.styles[t].gallery.arrow.imageID+'")',elem(".arrow-right").style.backgroundImage='url("'+e.styles[t].gallery.arrow.imageID+'")',elem(".gallery").style.backgroundColor=e.styles[t].gallery.background.value,elem(".gallery").style.backgroundImage='url("'+e.styles[t].gallery.background_image_300x600.imageID+'")',elem(".logo").style.backgroundImage='url("'+e.styles[t].logo.image.imageID+'")',elem(".cta").style.cssText=e.styles[t].cta.color.value+e.styles[t].cta.background.value,elem(".cta-copy").innerHTML=e.styles[t].cta.text.value,elem(".cta-copy").style.color=e.styles[t].cta.color.value,elem(".cta-copy").style.backgroundColor=e.styles[t].cta.background.value,elem(".cta-copy").style.backgroundImage='url("'+e.styles[t].cta.background_image.imageID+'")';var i=elems(".item-price"),r=elems(".item-description");for(s=0;s<i.length;s++)i[s].style.color=e.styles[t].price.color.value,i[s].style.backgroundColor=e.styles[t].price.background.value,i[s].style.fontFamily=e.styles[t].price.font_family.value,i[s].style.fontSize=e.styles[t].price.font_size.value+"px",i[s].style.fontWeight=e.styles[t].price.font_weight.value,i[s].style.letterSpacing=e.styles[t].price.letter_spacing.value,r[s].style.color=e.styles[t].text.color.value,r[s].style.backgroundColor=e.styles[t].text.background.value,r[s].style.fontFamily=e.styles[t].text.font_family.value,r[s].style.fontSize=e.styles[t].text.font_size.value+"px",r[s].style.fontWeight=e.styles[t].text.font_weight.value,r[s].style.letterSpacing=e.styles[t].text.letter_spacing.value;for(f in elem(".text1").style.backgroundImage='url("'+e.styles[t].header.background_image_300x600.imageID+'")',preloadCheck(e.styles[t].background.background_image_300x600.imageID,a),preloadCheck(e.styles[t].gallery.background_image_300x600.imageID,a),preloadCheck(e.styles[t].cta.background_image.imageID,a),preloadCheck(e.styles[t].header.background_image_300x600.imageID,a),e.frames)!0===e.frames[f].visible&&!1===e.frames[f].evergreen?n(".frame-"+e.frames[f].name,e.frames[f].image[size].imageID):"geo"!==e.frames[f].name&&(elem(".text2").style.backgroundImage='url("'+e.frames[f].image[size].imageID+'")');function n(e,t){elem(e).style.backgroundImage='url("'+t+'")',preloadCheck(t,a)}preloadImages(a,e)},animateAd=function(){var i=Power1.easeInOut,r=new TimelineMax,n=!1;return{init:function(e){for(var t=1,a=0;a<e.frames.length;a++)"geo"===e.frames[a].name&&e.frames[a].visible&&(r.set(".gallery",{top:229,height:310}).set(".header",{height:229}).set(".text1",{height:229}).set(".image-item",{top:121,height:154,width:"100%",right:0}).set(".items-text-container",{top:22,right:0,left:15,width:265,height:104}).set(".arrow-right",{top:235}),n=!0);function l(){r.to(".item-container",.4,{autoAlpha:0,zIndex:0,ease:i}),r.to(".item"+t,.4,{delay:.2,autoAlpha:1,zIndex:1,ease:i,onComplete:function(){isGalleryAnimating=!1}})}function s(){!1===isGalleryAnimating&&(isGalleryAnimating=!0,++t===totalItems&&resetClicktag(),t>totalItems&&(t=1),l())}elem(".banner").style.display="block",r.to(".logo",.4,{autoAlpha:1,ease:i}).to(".text1",.4,{autoAlpha:1,ease:i}),n||r.to([".text2",".plus-container"],.8,{autoAlpha:1,ease:i}),r.to([".gallery","gallery_arrows"],.4,{autoAlpha:1,ease:i}).to(".cta",.4,{autoAlpha:1,ease:i,onComplete:function(){2<=totalItems&&(galleryInterval=setInterval(s,2e3))}},"-=0.4"),myFT.$(".arrow-left").on("click",function(){isGalleryAnimating||(isGalleryAnimating||(isGalleryAnimating=!0,--t<1&&(t=totalItems),l()),clearInterval(galleryInterval))}),myFT.$(".arrow-right").on("click",function(){isGalleryAnimating||(s(),clearInterval(galleryInterval))})}}}();
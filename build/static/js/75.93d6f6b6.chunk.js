(this["webpackJsonpforbitswap-nfts-interface-v2"]=this["webpackJsonpforbitswap-nfts-interface-v2"]||[]).push([[75],{2548:function(e,t,r){!function(e,t,r,n){"use strict";function i(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function o(e){for(var t,r=1;r<arguments.length;r++)t=null==arguments[r]?{}:arguments[r],r%2?i(Object(t),!0).forEach((function(r){n(e,r,t[r])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):i(Object(t)).forEach((function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(t,r))}));return e}function c(e){var t=e.srcList,n=e.imgPromise,i=void 0===n?d({decode:!0}):n,c=e.useSuspense,a=void 0===c||c,s=r.useState(!0)[1],b=u(l(t)),h=b.join("");if(f[h]||(f[h]={promise:p(b,i),cache:"pending",error:null}),f[h].promise.then((function(e){f[h]=o(o({},f[h]),{},{cache:"resolved",src:e}),a||s(!1)})).catch((function(e){f[h]=o(o({},f[h]),{},{cache:"rejected",error:e}),a||s(!1)})),"resolved"===f[h].cache)return{src:f[h].src,isLoading:!1,error:null};if("rejected"===f[h].cache){if(a)throw f[h].error;return{isLoading:!1,error:f[h].error,src:void 0}}if(a)throw f[h].promise;return{isLoading:!0,src:void 0,error:null}}function a(e){var r=e.decode,n=e.src,i=void 0===n?[]:n,o=e.loader,a=void 0===o?null:o,u=e.unloader,l=void 0===u?null:u,f=e.container,p=void 0===f?b:f,h=e.loaderContainer,m=void 0===h?b:h,j=e.unloaderContainer,O=void 0===j?b:j,g=e.imgPromise,v=e.crossorigin,w=e.useSuspense,y=void 0!==w&&w,P=t(e,["decode","src","loader","unloader","container","loaderContainer","unloaderContainer","imgPromise","crossorigin","useSuspense"]),x=c({srcList:i,imgPromise:g=g||d({decode:!(void 0!==r)||r,crossOrigin:v}),useSuspense:y}),I=x.src,k=x.isLoading;return I?p(s.createElement("img",Object.assign({src:I},P))):!y&&k?m(a):!y&&l?O(l):null}t=t&&Object.prototype.hasOwnProperty.call(t,"default")?t.default:t;var s="default"in r?r.default:r;n=n&&Object.prototype.hasOwnProperty.call(n,"default")?n.default:n;var d=function(e){var t=e.decode,r=e.crossOrigin,n=void 0===r?"":r;return function(e){return new Promise((function(r,i){var o=new Image;n&&(o.crossOrigin=n),o.onload=function(){(void 0===t||t)&&o.decode?o.decode().then(r).catch(i):r()},o.onerror=i,o.src=e}))}},u=function(e){return e.filter((function(e){return e}))},l=function(e){return Array.isArray(e)?e:[e]},f={},p=function(e,t){var r=!1;return new Promise((function(n,i){var o=function(e){return t(e).then((function(){r=!0,n(e)}))};e.reduce((function(e,t){return e.catch((function(){if(!r)return o(t)}))}),o(e.shift())).catch(i)}))},b=function(e){return e};e.Img=a,e.useImage=c,Object.defineProperty(e,"__esModule",{value:!0})}(t,r(771),r(0),r(231))},2626:function(e,t,r){"use strict";r.r(t);var n=r(0),i=r.n(n),o=r(2548),c=r(165),a=r(19),s=r(33),d=r(1762),u=r(1761),l=Object(s.a)(d.a)((function(e){e.theme;return{alignItems:"center",justifyContent:"center",position:"relative",minHeight:"50vh",img:{height:"100%",width:"100%",display:"block"},"@keyframes roll":{"25%":{top:"10%"},"75%":{top:"5%"}}}})),f=Object(s.a)(u.a)({position:"absolute",width:"25%",overflow:"hidden",top:"6%",left:"28%",zIndex:10,animation:"roll 10s linear infinite"}),p=Object(s.a)(u.a)((function(e){var t=e.theme;return Object(a.a)({width:"80%"},t.breakpoints.down("md"),{width:"90%"})})),b=Object(s.a)(u.a)((function(e){var t=e.theme;return Object(a.a)({width:"70%",marginTop:20},t.breakpoints.down("md"),{width:"90%"})})),h=r.p+"static/media/text-infinity-white.f1d8abd6.webp",m=r.p+"static/media/text-infinity-black.dccdd680.webp",j=r.p+"static/media/astronaut.df7c16c9.webp",O=r.p+"static/media/infinity.4839358b.webp",g=r(2),v=function(){var e="light"===Object(c.a)().palette.mode;return Object(g.jsxs)(l,{children:[Object(g.jsx)(f,{children:Object(g.jsx)(o.Img,{loading:"lazy",src:j,alt:"astronaut"})}),Object(g.jsx)(p,{children:Object(g.jsx)(o.Img,{loading:"lazy",src:O,alt:"infinity"})}),Object(g.jsx)(b,{children:e?Object(g.jsx)(o.Img,{loading:"lazy",src:m,alt:"text"}):Object(g.jsx)(o.Img,{loading:"lazy",src:h,alt:"text"})})]})};t.default=i.a.memo(v)}}]);
//# sourceMappingURL=75.93d6f6b6.chunk.js.map
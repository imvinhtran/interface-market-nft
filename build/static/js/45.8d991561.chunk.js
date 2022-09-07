(this["webpackJsonpforbitswap-nfts-interface-v2"]=this["webpackJsonpforbitswap-nfts-interface-v2"]||[]).push([[45,77],{1787:function(e,t,a){"use strict";a.r(t);var n=a(8),r=a(33),c=Object(r.a)("input")((function(e){var t=e.theme;return Object(n.a)(Object(n.a)({display:"block",border:"none",borderRadius:"12px",padding:"15px",outline:"none",width:"100%",fontSize:"16px",fontWeight:500,lineHeight:"16px",color:t.palette.text.primary},"light"===t.palette.mode?{background:t.palette.primaryLight.main}:{background:t.palette.primary.dark}),{},{"&::placeholder":{color:"light"===t.palette.mode?"#000":"#fff",fontSize:"16px",fontWeight:500,opacity:.4}})})),i=a(2);function o(e){e.id;var t=e.type,a=e.registerHookForm,r=e.placeholder,o=e.value,s=e.onChange,l=e.className,u=e.readOnly,d=e.sx,b=e.otherProps;return Object(i.jsx)(c,Object(n.a)(Object(n.a)({type:t,step:"any",className:l},a),{},{placeholder:r,value:o,onChange:s,sx:d,readOnly:u,autoComplete:"off",autoCorrect:"off"},b))}o.defaultProps={onChange:function(e){}};t.default=o},1790:function(e,t,a){"use strict";var n=a(8),r=a(340),c=a(229),i={createNft:function(e,t){return r.a.post("/items/create",e)},updateNftByItemId:function(e,t,a){var n="/items/update/userAddress/".concat(t,"/itemId/").concat(a);return r.a.put(n,e)},freezeNft:function(e,t,a){var n={itemId:e,userAddress:t,metaData:a};return r.a.put("/items/freeze",n)},getListTokenId:function(e,t){var a=e.pageSize,r=e.page,i="/items/query/pageSize/".concat(a,"/page/").concat(r),o=Object(n.a)({},t);return c.a.post(i,o)},getSearchListTokenId:function(e,t){var a=e.pageSize,r=e.page,i="/items/query-search/pageSize/".concat(a,"/page/").concat(r),o=Object(n.a)({},t);return c.a.post(i,o)},getLessNftInfoByTokenId:function(e){var t=e.itemId,a=e.userAddress,n="/items/itemId/".concat(t,"?userAddress=").concat(a);return c.a.get(n)},getDetailNftItemById:function(e){var t="/items/detail/itemId/".concat(e);return c.a.get(t)},getSearchNftItemById:function(e){var t="/items/search/itemId/".concat(e);return c.a.get(t)},getDataForFreezeNft:function(e){var t="/items/freeze/metadata/itemId/".concat(e);return c.a.get(t)}};t.a=i},1824:function(e,t,a){"use strict";var n=a(230),r=a(16),c=a(4),i=a(0),o=a(22),s=a(155),l=a(1759);a(19);function u(e){return String(e).match(/[\d.\-+]*\s*(.*)/)[1]||""}function d(e){return parseFloat(e)}var b=a(749),p=a(33),j=a(42),h=a(1705),f=a(1760);function m(e){return Object(h.a)("MuiSkeleton",e)}Object(f.a)("MuiSkeleton",["root","text","rectangular","circular","pulse","wave","withChildren","fitContent","heightAuto"]);var O,g,x,v,y,w,k,S,C=a(2),I=["animation","className","component","height","style","variant","width"],R=Object(s.c)(y||(y=O||(O=Object(n.a)(["\n  0% {\n    opacity: 1;\n  }\n\n  50% {\n    opacity: 0.4;\n  }\n\n  100% {\n    opacity: 1;\n  }\n"])))),N=Object(s.c)(w||(w=g||(g=Object(n.a)(["\n  0% {\n    transform: translateX(-100%);\n  }\n\n  50% {\n    /* +0.5s of delay between each loop */\n    transform: translateX(100%);\n  }\n\n  100% {\n    transform: translateX(100%);\n  }\n"])))),z=Object(p.a)("span",{name:"MuiSkeleton",slot:"Root",overridesResolver:function(e,t){var a=e.ownerState;return[t.root,t[a.variant],!1!==a.animation&&t[a.animation],a.hasChildren&&t.withChildren,a.hasChildren&&!a.width&&t.fitContent,a.hasChildren&&!a.height&&t.heightAuto]}})((function(e){var t=e.theme,a=e.ownerState,n=u(t.shape.borderRadius)||"px",r=d(t.shape.borderRadius);return Object(c.a)({display:"block",backgroundColor:Object(b.a)(t.palette.text.primary,"light"===t.palette.mode?.11:.13),height:"1.2em"},"text"===a.variant&&{marginTop:0,marginBottom:0,height:"auto",transformOrigin:"0 55%",transform:"scale(1, 0.60)",borderRadius:"".concat(r).concat(n,"/").concat(Math.round(r/.6*10)/10).concat(n),"&:empty:before":{content:'"\\00a0"'}},"circular"===a.variant&&{borderRadius:"50%"},a.hasChildren&&{"& > *":{visibility:"hidden"}},a.hasChildren&&!a.width&&{maxWidth:"fit-content"},a.hasChildren&&!a.height&&{height:"auto"})}),(function(e){return"pulse"===e.ownerState.animation&&Object(s.b)(k||(k=x||(x=Object(n.a)(["\n      animation: "," 1.5s ease-in-out 0.5s infinite;\n    "]))),R)}),(function(e){var t=e.ownerState,a=e.theme;return"wave"===t.animation&&Object(s.b)(S||(S=v||(v=Object(n.a)(["\n      position: relative;\n      overflow: hidden;\n\n      /* Fix bug in Safari https://bugs.webkit.org/show_bug.cgi?id=68196 */\n      -webkit-mask-image: -webkit-radial-gradient(white, black);\n\n      &::after {\n        animation: "," 1.6s linear 0.5s infinite;\n        background: linear-gradient(90deg, transparent, ",", transparent);\n        content: '';\n        position: absolute;\n        transform: translateX(-100%); /* Avoid flash during server-side hydration */\n        bottom: 0;\n        left: 0;\n        right: 0;\n        top: 0;\n      }\n    "]))),N,a.palette.action.hover)})),A=i.forwardRef((function(e,t){var a=Object(j.a)({props:e,name:"MuiSkeleton"}),n=a.animation,i=void 0===n?"pulse":n,s=a.className,u=a.component,d=void 0===u?"span":u,b=a.height,p=a.style,h=a.variant,f=void 0===h?"text":h,O=a.width,g=Object(r.a)(a,I),x=Object(c.a)({},a,{animation:i,component:d,variant:f,hasChildren:Boolean(g.children)}),v=function(e){var t=e.classes,a=e.variant,n=e.animation,r=e.hasChildren,c=e.width,i=e.height,o={root:["root",a,n,r&&"withChildren",r&&!c&&"fitContent",r&&!i&&"heightAuto"]};return Object(l.a)(o,m,t)}(x);return Object(C.jsx)(z,Object(c.a)({as:d,ref:t,className:Object(o.default)(v.root,s),ownerState:x},g,{style:Object(c.a)({width:O,height:b},p)}))}));t.a=A},1831:function(e,t,a){"use strict";var n=a(21),r=a(16),c=a(4),i=a(0),o=a(22),s=a(1759),l=a(33),u=a(42),d=a(443),b=a(2),p=Object(d.a)(Object(b.jsx)("path",{d:"M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"}),"Person"),j=a(1705),h=a(1760);function f(e){return Object(j.a)("MuiAvatar",e)}Object(h.a)("MuiAvatar",["root","colorDefault","circular","rounded","square","img","fallback"]);var m=["alt","children","className","component","imgProps","sizes","src","srcSet","variant"],O=Object(l.a)("div",{name:"MuiAvatar",slot:"Root",overridesResolver:function(e,t){var a=e.ownerState;return[t.root,t[a.variant],a.colorDefault&&t.colorDefault]}})((function(e){var t=e.theme,a=e.ownerState;return Object(c.a)({position:"relative",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,width:40,height:40,fontFamily:t.typography.fontFamily,fontSize:t.typography.pxToRem(20),lineHeight:1,borderRadius:"50%",overflow:"hidden",userSelect:"none"},"rounded"===a.variant&&{borderRadius:t.shape.borderRadius},"square"===a.variant&&{borderRadius:0},a.colorDefault&&{color:t.palette.background.default,backgroundColor:"light"===t.palette.mode?t.palette.grey[400]:t.palette.grey[600]})})),g=Object(l.a)("img",{name:"MuiAvatar",slot:"Img",overridesResolver:function(e,t){return t.img}})({width:"100%",height:"100%",textAlign:"center",objectFit:"cover",color:"transparent",textIndent:1e4}),x=Object(l.a)(p,{name:"MuiAvatar",slot:"Fallback",overridesResolver:function(e,t){return t.fallback}})({width:"75%",height:"75%"});var v=i.forwardRef((function(e,t){var a=Object(u.a)({props:e,name:"MuiAvatar"}),l=a.alt,d=a.children,p=a.className,j=a.component,h=void 0===j?"div":j,v=a.imgProps,y=a.sizes,w=a.src,k=a.srcSet,S=a.variant,C=void 0===S?"circular":S,I=Object(r.a)(a,m),R=null,N=function(e){var t=e.crossOrigin,a=e.referrerPolicy,r=e.src,c=e.srcSet,o=i.useState(!1),s=Object(n.a)(o,2),l=s[0],u=s[1];return i.useEffect((function(){if(r||c){u(!1);var e=!0,n=new Image;return n.onload=function(){e&&u("loaded")},n.onerror=function(){e&&u("error")},n.crossOrigin=t,n.referrerPolicy=a,n.src=r,c&&(n.srcset=c),function(){e=!1}}}),[t,a,r,c]),l}(Object(c.a)({},v,{src:w,srcSet:k})),z=w||k,A=z&&"error"!==N,L=Object(c.a)({},a,{colorDefault:!A,component:h,variant:C}),D=function(e){var t=e.classes,a={root:["root",e.variant,e.colorDefault&&"colorDefault"],img:["img"],fallback:["fallback"]};return Object(s.a)(a,f,t)}(L);return R=A?Object(b.jsx)(g,Object(c.a)({alt:l,src:w,srcSet:k,sizes:y,ownerState:L,className:D.img},v)):null!=d?d:z&&l?l[0]:Object(b.jsx)(x,{className:D.fallback}),Object(b.jsx)(O,Object(c.a)({as:h,ownerState:L,className:Object(o.default)(D.root,p),ref:t},I,{children:R}))}));t.a=v},2187:function(e,t,a){"use strict";var n=a(273);Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var r=n(a(275)),c=a(2),i=(0,r.default)((0,c.jsx)("path",{d:"M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"}),"Search");t.default=i},2620:function(e,t,a){"use strict";a.r(t);var n=a(35),r=a(21),c=a(1),i=a.n(c),o=a(0),s=a.n(o),l=a(164),u=a(1761),d=a(1776),b=a(33),p=a(1762),j=Object(b.a)(d.a)((function(e){var t=e.theme;return{width:"100%",height:1,borderBottom:"1px solid ".concat(t.palette.grey[500]),opacity:.3}})),h=Object(b.a)(p.a)({cursor:"pointer",":hover":{opacity:.5}}),f=Object(b.a)(p.a)((function(e){e.theme;return{cursor:"pointer",borderRadius:10,padding:"5px 8px 5px 8px"}})),m=a(8),O=Object(b.a)(u.a)((function(e){var t=e.theme;return Object(m.a)(Object(m.a)({marginLeft:"auto"},"light"===t.palette.mode?{backgroundColor:t.palette.primaryLight.main}:{backgroundColor:t.palette.primary.main}),{},{borderRadius:10})})),g=Object(b.a)(d.a)((function(e){e.theme;return{padding:"8px 0 8px 8px",fontWeight:600}})),x=a(34),v=a(1831),y=a(1824),w=a(2);function k(e){return Object(w.jsxs)(p.a,{direction:"row",alignItems:"center",spacing:1,sx:{padding:"5px 0px 5px 10px"},children:[Object(w.jsx)(y.a,{variant:"circular",width:40,height:40,sx:{flexShrink:0}}),Object(w.jsxs)(u.a,{children:[Object(w.jsx)(y.a,{sx:{width:"100px"}}),Object(w.jsx)(y.a,{sx:{width:"80px"}})]})]})}var S=Object(b.a)(u.a)((function(e){var t=e.theme;return{display:"flex",alignItems:"center",gap:10,cursor:"pointer",padding:"8px 0 8px 8px","&:hover":Object(m.a)({},"light"===t.palette.mode?{backgroundColor:t.palette.primaryLight.dark}:{backgroundColor:t.palette.primary.main})}})),C=a(126),I=a(1790),R=a(1789),N=a(263),z=a(79),A=a(74);function L(e){var t=e.resultId,a=e.type,c=e.deactivateDropdown,s=Object(x.f)(),l=Object(o.useState)(null),b=Object(r.a)(l,2),p=b[0],j=b[1],h=Object(o.useState)(!1),f=Object(r.a)(h,2),m=f[0],O=f[1],g=Object(z.c)(A.c);return Object(o.useEffect)((function(){var e=!0;return Object(n.a)(i.a.mark((function n(){var r,c,o,s,l,u;return i.a.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:if(O(!0),n.prev=1,"collection"!==a){n.next=9;break}return n.next=5,R.a.getSearchCollectionById(t);case 5:r=n.sent,e&&j({image:r.logo,info1:r.collectionName,info2:null!==(c=Object(C.D)(r.collectionAddress,6,5))&&void 0!==c?c:"",src:"/collections/view/".concat(r._id)}),n.next=21;break;case 9:if("item"!==a){n.next=17;break}return n.next=12,I.a.getSearchNftItemById(t);case 12:o=n.sent,console.log(o),e&&j({image:o.itemMedia,info1:o.itemName,info2:null!==(s=Object(C.D)(o.itemTokenId,6,5))&&void 0!==s?s:"",src:"/detail/".concat(o._id)}),n.next=21;break;case 17:return n.next=19,N.a.getSearchUser(t);case 19:l=n.sent,e&&j({image:l.avatar,info1:l.username,info2:null!==(u=Object(C.D)(l.userAddress,6,5))&&void 0!==u?u:"",src:g===l.userAddress?"my-info-account":"/info-account/".concat(l.userAddress)});case 21:n.next=26;break;case 23:n.prev=23,n.t0=n.catch(1),console.log(n.t0);case 26:return n.prev=26,e&&O(!1),n.finish(26);case 29:case"end":return n.stop()}}),n,null,[[1,23,26,29]])})))(),function(){return e=!1}}),[]),m?Object(w.jsx)(k,{}):p?Object(w.jsxs)(S,{onClick:function(){c(),s(p.src)},children:[Object(w.jsx)(v.a,{src:p.image,alt:"collection logo",sx:{width:"40px",height:"40px"}}),Object(w.jsxs)(u.a,{children:[Object(w.jsx)(d.a,{variant:"body1",children:p.info1}),Object(w.jsx)(d.a,{variant:"body2",sx:{opacity:.5},children:p.info2})]})]}):Object(w.jsx)(w.Fragment,{})}function D(e){var t=e.amount;return Object(w.jsx)(w.Fragment,{children:new Array(t||3).fill(null).map((function(e,t){return Object(w.jsxs)(u.a,{children:[Object(w.jsx)(j,{}),Object(w.jsx)(k,{})]},t)}))})}var E=a(467),F=a(2187),M=a.n(F),P=a(218),B=a.n(P),T=Object(b.a)(p.a)((function(e){var t=e.theme;return Object(m.a)(Object(m.a)({position:"absolute",top:"100%",left:"50%",width:"100%",maxHeight:400,overflow:"auto",transform:"translateX(-50%)",boxShadow:t.customShadows.z24},"light"===t.palette.mode?{backgroundColor:"inherit"}:{backgroundImage:t.palette.gradients.modal,borderBottom:"1px solid ".concat(t.palette.border.cardDark)}),{},{"&::-webkit-scrollbar":{display:"block",width:"3px",height:"4px"},"&::-webkit-scrollbar-track":{display:"block",background:"#0c5599"},"&::-webkit-scrollbar-thumb":{display:"block",background:"#65b8ff",borderRadius:"5px"}})})),V=Object(b.a)(u.a)((function(e){e.theme;return{position:"fixed",top:0,left:0,width:"100vw",height:"100vh",zIndex:1,display:"none","&.active":{display:"block"}}})),_=Object(b.a)(u.a)((function(e){var t=e.theme;return Object(m.a)(Object(m.a)({position:"fixed",top:0,left:0,transform:"translateY(-110%)",transition:"all 0.2s",width:"100vw",zIndex:100},"light"===t.palette.mode?{backgroundColor:t.palette.primaryLight.main}:{backgroundImage:t.palette.gradients.modal}),{},{"&.active":{transform:"translateY(0)"}})})),W=a(1787);function X(e){var t=e.inputValue,a=e.handleOnChangeInputValue,n=e.RenderSearchResults,c=Object(o.useRef)(null),i=Object(o.useRef)(null),s=Object(o.useState)(!1),l=Object(r.a)(s,2),d=l[0],b=l[1];Object(o.useEffect)((function(){var e=function(e){e.stopPropagation(),c.current&&!c.current.contains(e.target)&&b(!1)};return d&&document.body.addEventListener("click",e,{passive:!0}),function(){document.body.removeEventListener("click",e)}}),[d]);return Object(w.jsxs)(u.a,{sx:{marginLeft:"auto"},onClick:function(){d||(b(!0),i.current&&i.current.focus())},children:[Object(w.jsx)(f,{alignItems:"center",justifyContent:"center",children:Object(w.jsx)(M.a,{})}),Object(w.jsx)(V,{className:d?"active":""}),Object(w.jsxs)(_,{ref:c,className:d?"active":"",children:[Object(w.jsxs)(p.a,{direction:"row",alignItems:"center",sx:{px:2},children:[Object(w.jsx)(M.a,{}),Object(w.jsx)(W.default,{otherProps:{ref:i},type:"text",value:t,placeholder:"Search in NFTSpaceX",onChange:a,sx:{flexGrow:1,borderRadius:"0",my:1,backgroundColor:"inherit"}}),Object(w.jsx)(h,{alignItems:"center",justifyContent:"center",onClick:function(){b(!1)},children:Object(w.jsx)(B.a,{})})]}),d&&Object(w.jsxs)(T,{children:[Object(w.jsx)(j,{}),n((function(){b(!1)}))]})]})]})}var q=Object(b.a)(p.a)((function(e){var t=e.theme;return Object(m.a)({borderRadius:10},"light"===t.palette.mode?{backgroundColor:t.palette.primaryLight.main}:{backgroundColor:t.palette.primary.main})})),H=Object(b.a)(u.a)((function(e){var t=e.theme;return Object(m.a)(Object(m.a)({display:"none",position:"absolute",top:"120%",left:0,transition:"all 0.2s",width:"100%",zIndex:100,borderRadius:10,boxShadow:t.customShadows.z24},"light"===t.palette.mode?{backgroundColor:t.palette.primaryLight.main}:{backgroundImage:t.palette.gradients.modal,border:"1px solid ".concat(t.palette.primary.main)}),{},{"&.active":{display:"block"}})}));function G(e){var t=e.inputValue,a=e.setInputValue,n=e.handleOnChangeInputValue,c=e.RenderSearchResults,i=Object(o.useRef)(null),s=Object(o.useRef)(null),l=Object(o.useState)(!1),d=Object(r.a)(l,2),b=d[0],p=d[1],j=Object(o.useState)(""),m=Object(r.a)(j,2),O=m[0],g=m[1];Object(o.useEffect)((function(){var e=function(e){e.stopPropagation(),i.current&&!i.current.contains(e.target)&&p(!1)};return b?(document.body.addEventListener("click",e,{passive:!0}),a(O)):(g(t),a(Object(C.E)(t,8))),function(){document.body.removeEventListener("click",e),a(O)}}),[b]),Object(o.useEffect)((function(){var e=function(e){"Escape"===e.key&&(p(!1),s.current&&s.current.blur())};return window.addEventListener("keydown",e,{passive:!0}),function(){window.removeEventListener("keydown",e)}}),[]);return Object(w.jsx)(u.a,{sx:{width:b?"".concat(window.innerWidth<1300?0:250,"px"):"140px",transition:"all 0.4s"},children:Object(w.jsxs)(u.a,{sx:{position:"absolute",top:0,right:0,marginTop:"-5px",width:b?"100%":"140px",transition:"all 0.4s"},ref:i,onClick:function(){b||(p(!0),s.current&&s.current.focus())},children:[Object(w.jsxs)(q,{direction:"row",alignItems:"center",children:[!b&&Object(w.jsx)(f,{alignItems:"center",justifyContent:"center",children:Object(w.jsx)(M.a,{sx:{cursor:"pointer",flexShrink:0}})}),Object(w.jsx)(W.default,{otherProps:{ref:s},type:"text",value:t,placeholder:b?"Search items, collections and user accounts":"Search...",onChange:n,sx:{flexGrow:1,padding:b?"0px 0px 0px 10px":"0px 10px 0px 0px",borderRadius:"0",my:1,backgroundColor:"inherit"}}),b&&Object(w.jsx)(h,{alignItems:"center",justifyContent:"center",sx:{flexShrink:0,pr:1},onClick:function(e){p(!1),a("")},children:Object(w.jsx)(B.a,{})})]}),Object(w.jsx)(H,{className:b?"active":"",children:c((function(){p(!1)}))})]})})}var J=function(){var e=Object(o.useRef)(null),t=Object(o.useContext)(E.a).innerWidth,a=Object(o.useState)(""),c=Object(r.a)(a,2),s=c[0],b=c[1],p=Object(o.useState)(!1),h=Object(r.a)(p,2),f=h[0],m=h[1],x=Object(o.useState)(!1),v=Object(r.a)(x,2),y=v[0],k=v[1],S=Object(o.useState)(!1),C=Object(r.a)(S,2),z=C[0],A=C[1],F=Object(o.useState)(!1),M=Object(r.a)(F,2),P=M[0],B=M[1],T=Object(o.useState)([]),V=Object(r.a)(T,2),_=V[0],W=V[1],q=Object(o.useState)([]),H=Object(r.a)(q,2),J=H[0],U=H[1],Y=Object(o.useState)([]),K=Object(r.a)(Y,2),Q=K[0],Z=K[1];Object(o.useEffect)((function(){s?Object(n.a)(i.a.mark((function e(){var t;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return k(!0),e.prev=1,e.next=4,R.a.getSearchListCollectionId({page:1,pageSize:3},{text:s});case 4:t=e.sent,W(t.data),k(!1),e.next=13;break;case 9:e.prev=9,e.t0=e.catch(1),l.b.error("Some error occurred while searching collection!"),k(!1);case 13:case"end":return e.stop()}}),e,null,[[1,9]])})))():W([])}),[f]),Object(o.useEffect)((function(){s?Object(n.a)(i.a.mark((function e(){var t;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return A(!0),e.prev=1,e.next=4,I.a.getSearchListTokenId({page:1,pageSize:3},{text:s});case 4:t=e.sent,U(t.data),A(!1),e.next=13;break;case 9:e.prev=9,e.t0=e.catch(1),l.b.error("Some error occurred while searching item!"),A(!1);case 13:case"end":return e.stop()}}),e,null,[[1,9]])})))():U([])}),[f]),Object(o.useEffect)((function(){s?Object(n.a)(i.a.mark((function e(){var t;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return B(!0),e.prev=1,e.next=4,N.a.getListUserById({page:1,pageSize:3},{text:s});case 4:t=e.sent,Z(t.data),B(!1),e.next=13;break;case 9:e.prev=9,e.t0=e.catch(1),l.b.error("Some error occurred while searching user!"),B(!1);case 13:case"end":return e.stop()}}),e,null,[[1,9]])})))():Z([])}),[f]);var $=function(t){var a=t.target.value;b(a),e&&clearTimeout(e.current),e.current=setTimeout((function(){m(!f)}),500)},ee=function(e){return Object(w.jsxs)(u.a,{children:[Object(w.jsx)(g,{variant:"body1",children:"Collection"}),y?Object(w.jsx)(D,{}):_.length>0?Object(w.jsx)(w.Fragment,{children:_.map((function(t,a){return Object(w.jsxs)(u.a,{children:[Object(w.jsx)(j,{}),Object(w.jsx)(L,{resultId:t._id,type:"collection",deactivateDropdown:e})]},a)}))}):Object(w.jsx)(d.a,{variant:"body2",sx:{pl:1,pb:1},children:"No result"}),Object(w.jsx)(j,{}),Object(w.jsx)(g,{variant:"body1",children:"Item"}),z?Object(w.jsx)(D,{}):J.length>0?Object(w.jsx)(w.Fragment,{children:J.map((function(t,a){return Object(w.jsxs)(u.a,{children:[Object(w.jsx)(j,{}),Object(w.jsx)(L,{resultId:t._id,type:"item",deactivateDropdown:e})]},a)}))}):Object(w.jsx)(d.a,{variant:"body2",sx:{pl:1,pb:1},children:"No result"}),Object(w.jsx)(j,{}),Object(w.jsx)(g,{variant:"body1",children:"Account"}),P?Object(w.jsx)(D,{}):Q.length>0?Object(w.jsx)(w.Fragment,{children:Q.map((function(t,a){return Object(w.jsxs)(u.a,{children:[Object(w.jsx)(j,{}),Object(w.jsx)(L,{resultId:t._id,type:"user",deactivateDropdown:e})]},a)}))}):Object(w.jsx)(d.a,{variant:"body2",sx:{pl:1,pb:1},children:"No result"})]})};return Object(w.jsxs)(O,{children:[t<=1050&&Object(w.jsx)(X,{inputValue:s,handleOnChangeInputValue:$,RenderSearchResults:ee}),t>1050&&Object(w.jsx)(G,{inputValue:s,setInputValue:b,handleOnChangeInputValue:$,RenderSearchResults:ee})]})};t.default=s.a.memo(J)}}]);
//# sourceMappingURL=45.8d991561.chunk.js.map
(this["webpackJsonpforbitswap-nfts-interface-v2"]=this["webpackJsonpforbitswap-nfts-interface-v2"]||[]).push([[58,67],{1801:function(t,e,n){"use strict";n.d(e,"b",(function(){return i}));var a=n(1705),r=n(1760);function i(t){return Object(a.a)("MuiCircularProgress",t)}var o=Object(r.a)("MuiCircularProgress",["root","determinate","indeterminate","colorPrimary","colorSecondary","svg","circle","circleDeterminate","circleIndeterminate","circleDisableShrink"]);e.a=o},1802:function(t,e,n){"use strict";n.r(e),n.d(e,"default",(function(){return d}));var a=n(19),r=n(8),i=n(21),o=n(1761),c=n(1824),s=n(0),l=n(1844),u=n(1801),h=n(2);function d(t){var e=t.src,n=t.alt,d=t.wrapperPosition,b=t.style,f=t.type,j=t.errorComponent,v=t.refresh,m=void 0!==v&&v,p=Object(s.useState)(!1),O=Object(i.a)(p,2),g=O[0],k=O[1],w=Object(s.useState)(!1),x=Object(i.a)(w,2),S=x[0],y=x[1],C=Object(s.useState)(!1),M=Object(i.a)(C,2),R=M[0],D=M[1];function P(t){return Object(h.jsxs)(o.a,{sx:{position:"relative"},children:[Object(h.jsx)(l.a,Object(r.a)(Object(r.a)({variant:"determinate",sx:{color:function(t){return t.palette.grey["light"===t.palette.mode?200:800]}},size:40,thickness:4},t),{},{value:100})),Object(h.jsx)(l.a,Object(r.a)({variant:"indeterminate",disableShrink:!0,sx:Object(a.a)({color:function(t){return"light"===t.palette.mode?"#1a90ff":"#308fe8"},animationDuration:"550ms",position:"absolute",left:0},"& .".concat(u.a.circle),{strokeLinecap:"round"}),size:40,thickness:4},t))]})}return Object(s.useEffect)((function(){D(!R)}),[m]),Object(h.jsxs)(o.a,{sx:{position:d,top:0,left:0,width:"100%",height:"100%"},children:[Object(h.jsx)("img",{loading:"lazy",style:Object(r.a)(Object(r.a)({},b),{},{opacity:g?1:0}),src:e,alt:n,onLoad:function(){setTimeout((function(){k(!0)}),500)},onError:function(){y(!0)}}),!g&&!S&&Object(h.jsx)(h.Fragment,{children:"skeleton"===f?Object(h.jsx)(c.a,{variant:"rectangular",sx:{position:"absolute",top:0,left:0,width:"100%",height:"100%"}}):Object(h.jsx)(o.a,{sx:{position:"absolute",top:"50%",left:"50%",transform:"translate(-50%, -50%)"},children:Object(h.jsx)(P,{})})}),S&&j]})}},1824:function(t,e,n){"use strict";var a=n(230),r=n(16),i=n(4),o=n(0),c=n(22),s=n(155),l=n(1759);n(19);function u(t){return String(t).match(/[\d.\-+]*\s*(.*)/)[1]||""}function h(t){return parseFloat(t)}var d=n(749),b=n(33),f=n(42),j=n(1705),v=n(1760);function m(t){return Object(j.a)("MuiSkeleton",t)}Object(v.a)("MuiSkeleton",["root","text","rectangular","circular","pulse","wave","withChildren","fitContent","heightAuto"]);var p,O,g,k,w,x,S,y,C=n(2),M=["animation","className","component","height","style","variant","width"],R=Object(s.c)(w||(w=p||(p=Object(a.a)(["\n  0% {\n    opacity: 1;\n  }\n\n  50% {\n    opacity: 0.4;\n  }\n\n  100% {\n    opacity: 1;\n  }\n"])))),D=Object(s.c)(x||(x=O||(O=Object(a.a)(["\n  0% {\n    transform: translateX(-100%);\n  }\n\n  50% {\n    /* +0.5s of delay between each loop */\n    transform: translateX(100%);\n  }\n\n  100% {\n    transform: translateX(100%);\n  }\n"])))),P=Object(b.a)("span",{name:"MuiSkeleton",slot:"Root",overridesResolver:function(t,e){var n=t.ownerState;return[e.root,e[n.variant],!1!==n.animation&&e[n.animation],n.hasChildren&&e.withChildren,n.hasChildren&&!n.width&&e.fitContent,n.hasChildren&&!n.height&&e.heightAuto]}})((function(t){var e=t.theme,n=t.ownerState,a=u(e.shape.borderRadius)||"px",r=h(e.shape.borderRadius);return Object(i.a)({display:"block",backgroundColor:Object(d.a)(e.palette.text.primary,"light"===e.palette.mode?.11:.13),height:"1.2em"},"text"===n.variant&&{marginTop:0,marginBottom:0,height:"auto",transformOrigin:"0 55%",transform:"scale(1, 0.60)",borderRadius:"".concat(r).concat(a,"/").concat(Math.round(r/.6*10)/10).concat(a),"&:empty:before":{content:'"\\00a0"'}},"circular"===n.variant&&{borderRadius:"50%"},n.hasChildren&&{"& > *":{visibility:"hidden"}},n.hasChildren&&!n.width&&{maxWidth:"fit-content"},n.hasChildren&&!n.height&&{height:"auto"})}),(function(t){return"pulse"===t.ownerState.animation&&Object(s.b)(S||(S=g||(g=Object(a.a)(["\n      animation: "," 1.5s ease-in-out 0.5s infinite;\n    "]))),R)}),(function(t){var e=t.ownerState,n=t.theme;return"wave"===e.animation&&Object(s.b)(y||(y=k||(k=Object(a.a)(["\n      position: relative;\n      overflow: hidden;\n\n      /* Fix bug in Safari https://bugs.webkit.org/show_bug.cgi?id=68196 */\n      -webkit-mask-image: -webkit-radial-gradient(white, black);\n\n      &::after {\n        animation: "," 1.6s linear 0.5s infinite;\n        background: linear-gradient(90deg, transparent, ",", transparent);\n        content: '';\n        position: absolute;\n        transform: translateX(-100%); /* Avoid flash during server-side hydration */\n        bottom: 0;\n        left: 0;\n        right: 0;\n        top: 0;\n      }\n    "]))),D,n.palette.action.hover)})),N=o.forwardRef((function(t,e){var n=Object(f.a)({props:t,name:"MuiSkeleton"}),a=n.animation,o=void 0===a?"pulse":a,s=n.className,u=n.component,h=void 0===u?"span":u,d=n.height,b=n.style,j=n.variant,v=void 0===j?"text":j,p=n.width,O=Object(r.a)(n,M),g=Object(i.a)({},n,{animation:o,component:h,variant:v,hasChildren:Boolean(O.children)}),k=function(t){var e=t.classes,n=t.variant,a=t.animation,r=t.hasChildren,i=t.width,o=t.height,c={root:["root",n,a,r&&"withChildren",r&&!i&&"fitContent",r&&!o&&"heightAuto"]};return Object(l.a)(c,m,e)}(g);return Object(C.jsx)(P,Object(i.a)({as:h,ref:e,className:Object(c.default)(k.root,s),ownerState:g},O,{style:Object(i.a)({width:p,height:d},b)}))}));e.a=N},1844:function(t,e,n){"use strict";var a,r,i,o,c,s,l,u,h=n(230),d=n(16),b=n(4),f=n(0),j=n(22),v=n(1759),m=n(155),p=n(32),O=n(42),g=n(33),k=n(1801),w=n(2),x=["className","color","disableShrink","size","style","thickness","value","variant"],S=44,y=Object(m.c)(c||(c=a||(a=Object(h.a)(["\n  0% {\n    transform: rotate(0deg);\n  }\n\n  100% {\n    transform: rotate(360deg);\n  }\n"])))),C=Object(m.c)(s||(s=r||(r=Object(h.a)(["\n  0% {\n    stroke-dasharray: 1px, 200px;\n    stroke-dashoffset: 0;\n  }\n\n  50% {\n    stroke-dasharray: 100px, 200px;\n    stroke-dashoffset: -15px;\n  }\n\n  100% {\n    stroke-dasharray: 100px, 200px;\n    stroke-dashoffset: -125px;\n  }\n"])))),M=Object(g.a)("span",{name:"MuiCircularProgress",slot:"Root",overridesResolver:function(t,e){var n=t.ownerState;return[e.root,e[n.variant],e["color".concat(Object(p.a)(n.color))]]}})((function(t){var e=t.ownerState,n=t.theme;return Object(b.a)({display:"inline-block"},"determinate"===e.variant&&{transition:n.transitions.create("transform")},"inherit"!==e.color&&{color:n.palette[e.color].main})}),(function(t){return"indeterminate"===t.ownerState.variant&&Object(m.b)(l||(l=i||(i=Object(h.a)(["\n      animation: "," 1.4s linear infinite;\n    "]))),y)})),R=Object(g.a)("svg",{name:"MuiCircularProgress",slot:"Svg",overridesResolver:function(t,e){return e.svg}})({display:"block"}),D=Object(g.a)("circle",{name:"MuiCircularProgress",slot:"Circle",overridesResolver:function(t,e){var n=t.ownerState;return[e.circle,e["circle".concat(Object(p.a)(n.variant))],n.disableShrink&&e.circleDisableShrink]}})((function(t){var e=t.ownerState,n=t.theme;return Object(b.a)({stroke:"currentColor"},"determinate"===e.variant&&{transition:n.transitions.create("stroke-dashoffset")},"indeterminate"===e.variant&&{strokeDasharray:"80px, 200px",strokeDashoffset:0})}),(function(t){var e=t.ownerState;return"indeterminate"===e.variant&&!e.disableShrink&&Object(m.b)(u||(u=o||(o=Object(h.a)(["\n      animation: "," 1.4s ease-in-out infinite;\n    "]))),C)})),P=f.forwardRef((function(t,e){var n=Object(O.a)({props:t,name:"MuiCircularProgress"}),a=n.className,r=n.color,i=void 0===r?"primary":r,o=n.disableShrink,c=void 0!==o&&o,s=n.size,l=void 0===s?40:s,u=n.style,h=n.thickness,f=void 0===h?3.6:h,m=n.value,g=void 0===m?0:m,y=n.variant,C=void 0===y?"indeterminate":y,P=Object(d.a)(n,x),N=Object(b.a)({},n,{color:i,disableShrink:c,size:l,thickness:f,value:g,variant:C}),z=function(t){var e=t.classes,n=t.variant,a=t.color,r=t.disableShrink,i={root:["root",n,"color".concat(Object(p.a)(a))],svg:["svg"],circle:["circle","circle".concat(Object(p.a)(n)),r&&"circleDisableShrink"]};return Object(v.a)(i,k.b,e)}(N),F={},A={},X={};if("determinate"===C){var B=2*Math.PI*((S-f)/2);F.strokeDasharray=B.toFixed(3),X["aria-valuenow"]=Math.round(g),F.strokeDashoffset="".concat(((100-g)/100*B).toFixed(3),"px"),A.transform="rotate(-90deg)"}return Object(w.jsx)(M,Object(b.a)({className:Object(j.default)(z.root,a),style:Object(b.a)({width:l,height:l},A,u),ownerState:N,ref:e,role:"progressbar"},X,P,{children:Object(w.jsx)(R,{className:z.svg,ownerState:N,viewBox:"".concat(22," ").concat(22," ").concat(S," ").concat(S),children:Object(w.jsx)(D,{className:z.circle,style:F,ownerState:N,cx:S,cy:S,r:(S-f)/2,fill:"none",strokeWidth:f})})}))}));e.a=P}}]);
//# sourceMappingURL=58.6109245b.chunk.js.map
(this["webpackJsonpforbitswap-nfts-interface-v2"]=this["webpackJsonpforbitswap-nfts-interface-v2"]||[]).push([[50],{1789:function(t,e,n){"use strict";var a=n(8),r=n(340),c=n(229),o={getListTopCollection:function(t,e){var n=t.pageSize,r=t.page,o="/collections/top/pageSize/".concat(n,"/page/").concat(r);return c.a.post(o,Object(a.a)({},e))},fetchNewCollectionsPagination:function(t,e){var n="/collections/query/pageSize/".concat(t,"/page/").concat(e);return c.a.post(n,{sort:"createdAt:desc"})},getListCollectionId:function(t,e){var n=t.page,r=t.pageSize,o="/collections/query/pageSize/".concat(r,"/page/").concat(n),i=Object(a.a)({},e);return c.a.post(o,i)},getSearchListCollectionId:function(t,e){var n=t.page,r=t.pageSize,o="/collections/query-search/pageSize/".concat(r,"/page/").concat(n),i=Object(a.a)({},e);return c.a.post(o,i)},getListCollectionByOwnerOrCreatorItems:function(t,e){var n=t.page,r=t.pageSize,o="/collections/collectible-asset/pageSize/".concat(r,"/page/").concat(n),i=Object(a.a)({},e);return c.a.post(o,i)},getCollectionById:function(t){var e="/collections/collectionId/".concat(t);return c.a.get(e)},getCollectionDetailById:function(t){var e="/collections/detail/collectionId/".concat(t);return c.a.get(e)},getSearchCollectionById:function(t){var e="/collections/search/collectionId/".concat(t);return c.a.get(e)},createCollection:function(t){return console.log("data gui len ne",t),r.a.post("/collections/create",t)},importCollection:function(t,e,n){var a={chainId:t,userAddress:e,collectionAddress:n};return r.a.post("/items/import",a)},editCollection:function(t,e){var n="/collections/collectionId/".concat(e);return r.a.put(n,t)},checkExistCollectionName:function(t,e){return c.a.post("/collections/checkName",{collectionName:t,chainId:e})},getAllCategory:function(){return c.a.get("/collections/category")},getListCollectionCategory:function(){return c.a.get("/collections/topCategory")}};e.a=o},1799:function(t,e,n){"use strict";n.d(e,"f",(function(){return u})),n.d(e,"b",(function(){return s})),n.d(e,"d",(function(){return d})),n.d(e,"j",(function(){return b})),n.d(e,"e",(function(){return p})),n.d(e,"i",(function(){return g})),n.d(e,"k",(function(){return f})),n.d(e,"l",(function(){return j})),n.d(e,"m",(function(){return h})),n.d(e,"n",(function(){return m})),n.d(e,"g",(function(){return O})),n.d(e,"h",(function(){return x})),n.d(e,"c",(function(){return y})),n.d(e,"a",(function(){return w}));var a=n(8),r=n(33),c=n(1761),o=n(1776),i=n(1762),l=n(1781),u=Object(r.a)(c.a)((function(t){var e=t.theme;return Object(a.a)(Object(a.a)({position:"relative",borderRadius:12,padding:"10px 20px",cursor:"pointer",transition:"0.1s all"},"light"===e.palette.mode?{backgroundColor:e.palette.primaryLight.main}:{backgroundColor:e.palette.primary.main}),{},{"&:hover":{transform:"scale(0.95)"}})})),s=Object(r.a)(o.a)((function(t){t.theme;return{position:"absolute",top:0,left:15,transform:"translateY(-50%)",fontSize:12,borderRadius:5,paddingLeft:2,paddingRight:2}})),d=Object(r.a)(i.a)((function(t){t.theme;return{flexDirection:"row",alignItems:"center"}})),b=Object(r.a)(c.a)((function(t){t.theme;return{marginRight:10,img:{width:"100%",height:"100%",objectFit:"cover !important"}}})),p=Object(r.a)(o.a)((function(t){t.theme;return{maxWidth:180,whiteSpace:"nowrap",textOverflow:"ellipsis",overflow:"hidden"}})),g=Object(r.a)(c.a)((function(t){var e=t.theme;return Object(a.a)({border:"1px solid ".concat(e.palette.primary.main),borderRadius:20,padding:"10px 20px"},"light"===e.palette.mode?{backgroundColor:e.palette.primaryLight.light}:{backgroundImage:"linear-gradient(to left, #00284b 0%, #020a1a 100%)"})})),f=Object(r.a)("ul")((function(t){t.theme;return{overflowY:"auto",maxHeight:300,"&::-webkit-scrollbar":{display:"block",width:"3px",height:"4px"},"&::-webkit-scrollbar-track":{display:"block",background:"#0c5599"},"&::-webkit-scrollbar-thumb":{display:"block",background:"#65b8ff",borderRadius:"5px"}}})),j=Object(r.a)("li")((function(t){var e=t.theme;return{position:"relative",listStyleType:"none",padding:"10px 0",borderRadius:10,cursor:"pointer","&:hover":Object(a.a)({},"light"===e.palette.mode?{background:e.palette.primaryLight.main}:{background:e.palette.primary.main})}})),h=Object(r.a)(c.a)((function(t){t.theme;return{position:"absolute",top:"50%",left:10,transform:"translateY(-50%)",borderRadius:"50%",overflow:"hidden",img:{width:"100%",height:"100%",objectFit:"cover"}}})),m=Object(r.a)(o.a)((function(t){t.theme;return{textAlign:"center"}})),O=Object(r.a)(c.a)((function(t){t.theme;return{position:"absolute",top:"50%",right:10,transform:"translateY(-50%)",width:20,height:20}})),x=Object(r.a)(i.a)((function(t){t.theme;return{flexDirection:"row",alignItems:"center",width:"100%",marginTop:10}})),v=Object(r.a)(l.a)((function(t){t.theme;return{flexGrow:1,borderRadius:10,padding:"8px 20px",textAlign:"center",cursor:"pointer"}})),y=Object(r.a)(v)((function(t){var e=t.theme;return Object(a.a)(Object(a.a)({marginRight:10,color:e.palette.text.primary},"light"===e.palette.mode?{backgroundColor:e.palette.primaryLight.main}:{backgroundColor:e.palette.primary.main}),{},{"&:hover":Object(a.a)({},"light"===e.palette.mode?{backgroundColor:e.palette.primaryLight.dark}:{backgroundColor:e.palette.primary.light})})})),w=Object(r.a)(v)((function(t){var e=t.theme;return{backgroundImage:e.palette.gradients.main,color:e.palette.text.primary,"&:hover":{transition:"0.5s all",backgroundSize:"200%",backgroundPosition:"right center",boxShadow:"none"}}}))},1800:function(t,e,n){"use strict";var a=n(273);Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var r=a(n(275)),c=n(2),o=(0,r.default)((0,c.jsx)("path",{d:"M9 16.17 4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"}),"Check");e.default=o},2072:function(t,e,n){"use strict";var a=n(273);Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var r=a(n(275)),c=n(2),o=(0,r.default)((0,c.jsx)("path",{d:"M7.41 8.59 12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"}),"KeyboardArrowDown");e.default=o},2635:function(t,e,n){"use strict";n.r(e);var a=n(8),r=n(21),c=n(0),o=n.n(c),i=n(164),l=n(79),u=n(475),s=n(35),d=n(1),b=n.n(d),p=n(1789),g=n(126),f=n(58);function j(t,e,n,a){return Object(s.a)(b.a.mark((function r(){var c,o,i;return b.a.wrap((function(r){for(;;)switch(r.prev=r.next){case 0:return Object(f.a)(Object(u.p)()),r.prev=1,r.next=4,p.a.getListTopCollection(t,e);case 4:c=r.sent,o=c.pagination,i=Object(g.d)(o.currentPage,o.totalPages),Object(f.a)(Object(u.n)(i)),n?Object(f.a)(Object(u.b)(c)):Object(f.a)(Object(u.c)(c)),r.next=14;break;case 11:r.prev=11,r.t0=r.catch(1),Object(f.a)(Object(u.d)(r.t0));case 14:return r.prev=14,a&&a(Object(f.b)()),r.finish(14);case 17:case"end":return r.stop()}}),r,null,[[1,11,14,17]])})))}var h=n(56),m=n(1779),O=n(1761),x=n(1776),v=n(1762),y=n(2072),w=n.n(y),k=n(1800),C=n.n(k),S=n(33),I=Object(S.a)(x.a)((function(t){return{display:"flex",alignItems:"center",color:t.theme.palette.primary.light,cursor:"pointer",fontWeight:600,paddingLeft:"0.5rem"}})),L=(Object(S.a)(O.a)({display:"flex","@media screen and (max-width: 432px)":{flexDirection:"column",alignItems:"center"}}),n(1799)),z=n(2),D=Object(h.a)(Object(c.lazy)((function(){return n.e(46).then(n.bind(null,2652))}))),R=Object(h.a)(Object(c.lazy)((function(){return n.e(7).then(n.bind(null,1852))}))),A=Object(h.a)(Object(c.lazy)((function(){return n.e(79).then(n.bind(null,1796))}))),P=[{name:"1 day",value:"volume24Hours"},{name:"7 days",value:"volume7Days"},{name:"30 days",value:"volume30Days"}];function M(){var t=Object(l.b)(),e=Object(c.useState)(!1),n=Object(r.a)(e,2),o=n[0],s=n[1],d=Object(c.useState)(!1),b=Object(r.a)(d,2),p=b[0],g=b[1],f=Object(c.useState)(!1),h=Object(r.a)(f,2),y=h[0],k=h[1],S=Object(c.useState)("7 days"),M=Object(r.a)(S,2),N=M[0],T=M[1],B=Object(l.c)(u.l),E=Object(l.c)(u.f),Y=Object(l.c)(u.g),_=Object(l.c)(u.j),q=Object(l.c)(u.k),W=Object(l.c)(u.i),F=u.h;Object(c.useEffect)((function(){return t(j(F.pagination,F.filter,!0,J)),function(){t(Object(u.e)()),s(!1)}}),[]),Object(c.useEffect)((function(){(1!==B.page||W)&&t(j(B,E,!1,J))}),[B,E]),Object(c.useEffect)((function(){p&&t(Object(u.o)(Object(a.a)(Object(a.a)({},B),{},{page:B.page+1})))}),[p]);var H=function(e){T(e.name),console.log(E),t(Object(u.m)(Object(a.a)(Object(a.a)({},E),{},{sortBy:e.value}))),k(!1)},J=function(t){g(!1);var e=t.trendingCollection;e.isSuccess||i.b.error("Some error occur when getting trending collections! "+e.errorMessage)};return Object(z.jsxs)(m.a,{maxWidth:"xl",children:[Object(z.jsxs)(O.a,{sx:{display:"flex",alignItems:"center",justifyContent:"start"},children:[Object(z.jsx)(x.a,{variant:"h2",children:"Ranking Collection in"}),Object(z.jsx)(A,{activeDropDown:y,setActiveDropDown:k,buttonContent:Object(z.jsxs)(I,{variant:"h2",children:[N," ",Object(z.jsx)(w.a,{sx:{width:40,height:40}})]}),dropdownContent:Object(z.jsx)(L.i,{sx:{width:"180px"},children:Object(z.jsx)(L.k,{children:P.map((function(t,e){var n=N===t.name;return Object(z.jsxs)(L.l,{onClick:function(){return H(t)},children:[Object(z.jsx)(L.n,{children:t.name}),n&&Object(z.jsx)(L.g,{children:Object(z.jsx)(C.a,{sx:{width:"100%",height:"100%"}})})]},e)}))})})})]}),Object(z.jsx)(O.a,{sx:{marginTop:"20px"},children:Object(z.jsx)(D,{listCollection:_,isLoading:q,hasNextPage:Y,fetchNextPage:function(){g(!0)},allowLoadMore:o})}),!o&&Y&&!q&&Object(z.jsx)(v.a,{sx:{marginTop:"50px"},alignItems:"center",children:Object(z.jsx)(R,{onClick:function(){return s(!0)}})})]})}e.default=o.a.memo(M)}}]);
//# sourceMappingURL=50.16bb1a57.chunk.js.map
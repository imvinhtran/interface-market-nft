(this["webpackJsonpforbitswap-nfts-interface-v2"]=this["webpackJsonpforbitswap-nfts-interface-v2"]||[]).push([[56],{1790:function(e,t,n){"use strict";var c=n(8),a=n(340),r=n(229),i={createNft:function(e,t){return a.a.post("/items/create",e)},updateNftByItemId:function(e,t,n){var c="/items/update/userAddress/".concat(t,"/itemId/").concat(n);return a.a.put(c,e)},freezeNft:function(e,t,n){var c={itemId:e,userAddress:t,metaData:n};return a.a.put("/items/freeze",c)},getListTokenId:function(e,t){var n=e.pageSize,a=e.page,i="/items/query/pageSize/".concat(n,"/page/").concat(a),s=Object(c.a)({},t);return r.a.post(i,s)},getSearchListTokenId:function(e,t){var n=e.pageSize,a=e.page,i="/items/query-search/pageSize/".concat(n,"/page/").concat(a),s=Object(c.a)({},t);return r.a.post(i,s)},getLessNftInfoByTokenId:function(e){var t=e.itemId,n=e.userAddress,c="/items/itemId/".concat(t,"?userAddress=").concat(n);return r.a.get(c)},getDetailNftItemById:function(e){var t="/items/detail/itemId/".concat(e);return r.a.get(t)},getSearchNftItemById:function(e){var t="/items/search/itemId/".concat(e);return r.a.get(t)},getDataForFreezeNft:function(e){var t="/items/freeze/metadata/itemId/".concat(e);return r.a.get(t)}};t.a=i},1821:function(e,t,n){"use strict";var c=n(229),a={getListPaymentTokenByChainId:function(e){var t="orders/listToken?chainId=".concat(e);return c.a.get(t)},changeTokenToUsd:function(e,t,n){return c.a.post("/items/changePrice",{from:e,to:t,inputPrice:n})}};t.a=a},1825:function(e,t,n){"use strict";n.d(t,"a",(function(){return u}));var c=n(35),a=n(1),r=n.n(a),i=n(1821),s=n(449),o=n(58);function u(e,t){return Object(c.a)(r.a.mark((function n(){var c;return r.a.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return Object(o.a)(Object(s.f)()),n.prev=1,n.next=4,i.a.getListPaymentTokenByChainId(e);case 4:c=n.sent,Object(o.a)(Object(s.b)(c)),n.next=12;break;case 8:n.prev=8,n.t0=n.catch(1),Object(o.a)(Object(s.c)(n.t0)),t&&t(Object(o.b)());case 12:case"end":return n.stop()}}),n,null,[[1,8]])})))}},2634:function(e,t,n){"use strict";n.r(t);var c=n(8),a=n(21),r=n(0),i=n(164),s=n(79),o=n(487),u=n(35),f=n(1),b=n.n(f),j=n(1790),l=n(58),O=n(126);function d(e,t,n,c){return Object(u.a)(b.a.mark((function a(){var r,i,s;return b.a.wrap((function(a){for(;;)switch(a.prev=a.next){case 0:return Object(l.a)(Object(o.o)()),a.prev=1,a.next=4,j.a.getListTokenId(e,t);case 4:r=a.sent,console.log("response",r),i=r.pagination,s=Object(O.d)(i.currentPage,i.totalPages),Object(l.a)(Object(o.m)(s)),n?Object(l.a)(Object(o.b)(r)):Object(l.a)(Object(o.c)(r)),a.next=15;break;case 12:a.prev=12,a.t0=a.catch(1),Object(l.a)(Object(o.d)(a.t0.message));case 15:return a.prev=15,c&&c(Object(l.b)()),a.finish(15);case 18:case"end":return a.stop()}}),a,null,[[1,12,15,18]])})))}var p=n(56),m=n(1779),g=n(1776),h=n(1762),x=n(1761),v=n(33),I=Object(v.a)(h.a)((function(e){e.theme;return{flexDirection:"row",justifyContent:"space-between",alignItems:"center"}})),k=n(74),y=n(1825),w=n(2),T=Object(p.a)(Object(r.lazy)((function(){return Promise.all([n.e(0),n.e(2),n.e(30)]).then(n.bind(null,1845))}))),S=Object(p.a)(Object(r.lazy)((function(){return n.e(7).then(n.bind(null,1852))}))),N=Object(p.a)(Object(r.lazy)((function(){return Promise.all([n.e(1),n.e(10),n.e(73)]).then(n.bind(null,1934))}))),z=Object(p.a)(Object(r.lazy)((function(){return n.e(77).then(n.bind(null,1787))})));t.default=function(){var e=Object(s.b)(),t=Object(r.useRef)(null),n=Object(r.useState)(!1),u=Object(a.a)(n,2),f=u[0],b=u[1],j=Object(r.useState)(!1),l=Object(a.a)(j,2),O=l[0],p=l[1],v=Object(s.c)(k.e),P=Object(s.c)(o.k),C=Object(s.c)(o.g),L=Object(s.c)(o.h),B=Object(s.c)(o.f),F=Object(s.c)(o.j),E=o.i;Object(r.useEffect)((function(){window.scrollTo({top:0,behavior:"smooth"})}),[]),Object(r.useEffect)((function(){v&&e(Object(y.a)(v,D))}),[v]),Object(r.useEffect)((function(){return e(d(E.pagination,E.filter,!0,A)),function(){e(Object(o.e)()),b(!1)}}),[]),Object(r.useEffect)((function(){(1!==P.page||C.isFiltering)&&e(d(P,C,!1,A))}),[P,C]),Object(r.useEffect)((function(){O&&e(Object(o.n)(Object(c.a)(Object(c.a)({},P),{},{page:P.page+1})))}),[O]);var A=function(e){p(!1);var t=e.allNfts;t.isSuccess||i.b.error("Some error occur when getting all NFTs! "+t.errorMessage)},D=function(e){e.tokenPayment.isSuccess||i.b.error("Can not fetch list token payment!")};return Object(w.jsxs)(m.a,{maxWidth:"xl",children:[Object(w.jsx)(g.a,{variant:"h2",sx:{mt:3},children:"NFTSpaceX"}),Object(w.jsxs)(I,{sx:{mt:5},children:[Object(w.jsx)(N,{filterBlockChain:!0,filterStatus:!0,filterCollection:!0,filterPrice:!0,initialStateFilter:E.filter,filter:C,setFilter:o.l}),Object(w.jsx)(h.a,{direction:"row",alignItems:"center",justifyContent:"end",spacing:2,sx:{flexGrow:1},children:Object(w.jsx)(x.a,{sx:{flexGrow:1},children:Object(w.jsx)(z,{type:"text",onChange:function(n){var a=n.target.value;t&&clearTimeout(t.current),t.current=setTimeout((function(){e(Object(o.l)(Object(c.a)(Object(c.a)({},C),{},{itemName:a})))}),500)},placeholder:"Search name ...",sx:{padding:"12px 15px",width:"80%",marginLeft:"auto",minWidth:"130px",maxWidth:"500px"}})})})]}),Object(w.jsx)(x.a,{sx:{mt:3},children:Object(w.jsx)(T,{listTokenId:B,isLoading:F,hasNextPage:L,fetchNextPage:function(){p(!0)},allowLoadMore:f})}),!f&&L&&!F&&Object(w.jsx)(h.a,{sx:{marginTop:"50px"},alignItems:"center",children:Object(w.jsx)(S,{onClick:function(){return b(!0)}})})]})}}}]);
//# sourceMappingURL=56.ba39ac0f.chunk.js.map
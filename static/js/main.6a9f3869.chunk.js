(this["webpackJsonpmy-app"]=this["webpackJsonpmy-app"]||[]).push([[0],{14:function(e,t,n){},16:function(e,t,n){},18:function(e,t,n){},19:function(e,t,n){},20:function(e,t,n){"use strict";n.r(t);var c=n(1),s=n.n(c),a=n(9),r=n.n(a),o=(n(14),n(3)),i=n.n(o),u=n(8),j=n(6),b=n(2),p=(n(16),n.p+"static/media/three-dots.b98a8c76.svg"),f=n(0);function l(){return Object(f.jsx)("div",{children:Object(f.jsx)("img",{className:"loader",src:p,alt:""})})}var h=function(e){return!!e&&Boolean(e.count)},O=function(e){return!!e&&Boolean(e.id)};n(18);function m(e){var t=e.pokemonItem,n=Object(c.useState)({weight:0,baseExperience:0,height:0}),s=Object(b.a)(n,2),a=s[0],r=s[1],o=Object(c.useState)(!1),u=Object(b.a)(o,2),p=u[0],h=u[1],m=Object(c.useState)(""),d=Object(b.a)(m,2),x=d[0],v=d[1],g=Object(c.useState)(!1),k=Object(b.a)(g,2),w=k[0],N=k[1];return Object(c.useEffect)((function(){function e(){return(e=Object(j.a)(i.a.mark((function e(){var n,c;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch(t.url);case 2:return n=e.sent,e.next=5,n.json();case 5:c=e.sent,O(c)&&(r({weight:c.weight,baseExperience:c.base_experience,height:c.height}),v(c.sprites.other.dream_world.front_default),h(!1));case 7:case"end":return e.stop()}}),e)})))).apply(this,arguments)}h(!0),function(){e.apply(this,arguments)}()}),[t.url]),p?Object(f.jsx)(l,{}):Object(f.jsx)("div",{className:w?"activeCard":"pokemon-card",onClick:function(){return N(!w)},children:Object(f.jsxs)("div",{className:"pokemon-header-wrapper",children:[Object(f.jsx)("span",{className:"pokemon-name",children:t.name}),Object(f.jsxs)("div",{className:"pokemon-common-info",children:[Object(f.jsxs)("span",{children:["Weight: ",a.weight]}),Object(f.jsxs)("span",{children:["Base experience: ",a.baseExperience]}),Object(f.jsxs)("span",{children:["Height: ",a.height]})]}),Object(f.jsx)("div",{className:"pokemon-image",children:Object(f.jsx)("img",{src:x,alt:""})})]})},t.name)}n(19);var d=function(){var e=Object(c.useState)([]),t=Object(b.a)(e,2),n=t[0],s=t[1],a=Object(c.useState)(0),r=Object(b.a)(a,2),o=r[0],p=r[1],O=Object(c.useState)(!0),d=Object(b.a)(O,2),x=d[0],v=d[1],g=Object(c.useState)(null),k=Object(b.a)(g,2),w=k[0],N=k[1];return Object(c.useEffect)((function(){function e(){return(e=Object(j.a)(i.a.mark((function e(){var t,n;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch("https://pokeapi.co/api/v2/pokemon?limit=".concat(10,"&offset=").concat(10*o));case 2:return t=e.sent,e.next=5,t.json();case 5:n=e.sent,h(n)&&(v(!1),s((function(e){return[].concat(Object(u.a)(e),Object(u.a)(n.results))})));case 7:case"end":return e.stop()}}),e)})))).apply(this,arguments)}!function(){e.apply(this,arguments)}()}),[o]),function(e){var t=e.ref,n=e.onIntersect,s=e.isDisabled;Object(c.useEffect)((function(){if(!s&&t){var e=new IntersectionObserver((function(e){Object(b.a)(e,1)[0].isIntersecting&&n()}),{threshold:1,rootMargin:"200px"});return e.observe(t),function(){e.unobserve(t)}}}),[t,n,s])}({ref:w,onIntersect:Object(c.useCallback)((function(){p((function(e){return e+1}))}),[]),isDisabled:x}),x?Object(f.jsx)(l,{}):Object(f.jsxs)("div",{className:"pokemon-wrapper",children:[Object(f.jsx)("span",{className:"pokemon-logo",children:"choose your pokemon!"}),Object(f.jsx)("div",{className:"pokemon-cards",children:n.map((function(e){return Object(f.jsx)(m,{pokemonItem:e},e.name)}))}),Object(f.jsx)("div",{ref:N,className:"observer-block"})]})},x=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,21)).then((function(t){var n=t.getCLS,c=t.getFID,s=t.getFCP,a=t.getLCP,r=t.getTTFB;n(e),c(e),s(e),a(e),r(e)}))};r.a.render(Object(f.jsx)(s.a.StrictMode,{children:Object(f.jsx)(d,{})}),document.getElementById("root")),x()}},[[20,1,2]]]);
//# sourceMappingURL=main.6a9f3869.chunk.js.map
(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[302],{8004:function(e,r,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/tickets/new",function(){return n(2876)}])},3544:function(e,r,n){"use strict";n.d(r,{Z:function(){return o}});var t=n(5893),i=n(682),c=n(218),s=n(540),u=function(e){var r=e.currentUser;return(0,t.jsx)(c.Z,{bg:"light",className:"px-3",children:(0,t.jsxs)(i.Z,{children:[(0,t.jsx)(c.Z.Brand,{href:"/",children:"GitTix"}),(0,t.jsx)(s.Z,{className:"d-flex justify-content-end align-items-center gap-3",children:r?(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(s.Z.Item,{children:(0,t.jsx)(s.Z.Link,{href:"/tickets/new",children:"Sell Tickets"})}),(0,t.jsx)(s.Z.Item,{children:(0,t.jsx)(s.Z.Link,{href:"/orders",children:"My Orders"})}),(0,t.jsx)(s.Z.Item,{children:(0,t.jsx)(s.Z.Link,{href:"/auth/signout",children:"Sign out"})})]}):(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(s.Z.Item,{children:(0,t.jsx)(s.Z.Link,{href:"/auth/signup",children:"Sign up"})}),(0,t.jsx)(s.Z.Item,{children:(0,t.jsx)(s.Z.Link,{href:"/auth/signin",children:"Sign in"})})]})})]})})},o=function(e){var r=e.children,n=e.currentUser;return(0,t.jsxs)("div",{children:[(0,t.jsx)(u,{currentUser:n}),(0,t.jsx)(i.Z,{className:"mt-5",children:r})]})}},7423:function(e,r,n){"use strict";var t=n(4051),i=n.n(t),c=n(5893),s=n(9669),u=n.n(s),o=n(7294);function a(e,r,n,t,i,c,s){try{var u=e[c](s),o=u.value}catch(a){return void n(a)}u.done?r(o):Promise.resolve(o).then(t,i)}function l(e,r,n){return r in e?Object.defineProperty(e,r,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[r]=n,e}function d(e){for(var r=1;r<arguments.length;r++){var n=null!=arguments[r]?arguments[r]:{},t=Object.keys(n);"function"===typeof Object.getOwnPropertySymbols&&(t=t.concat(Object.getOwnPropertySymbols(n).filter((function(e){return Object.getOwnPropertyDescriptor(n,e).enumerable})))),t.forEach((function(r){l(e,r,n[r])}))}return e}r.Z=function(e){var r=e.url,n=e.method,t=e.body,s=e.onSuccess,l=(0,o.useState)(null),h=l[0],f=l[1],p=function(){var e,o=(e=i().mark((function e(){var o,a,l,h=arguments;return i().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return o=h.length>0&&void 0!==h[0]?h[0]:{},e.prev=1,f(null),e.next=5,u()[n](r,d({},t,o));case 5:return a=e.sent,s&&s(a.data),e.abrupt("return",a.data);case 10:e.prev=10,e.t0=e.catch(1),f((0,c.jsxs)("div",{className:"alert alert-danger",children:[(0,c.jsx)("h4",{children:"Ooops..."}),(0,c.jsx)("ul",{className:"my-0",children:null===(l=e.t0.response)||void 0===l?void 0:l.data.errors.map((function(e,r){return(0,c.jsx)("li",{children:e.message},r)}))})]}));case 14:case"end":return e.stop()}}),e,null,[[1,10]])})),function(){var r=this,n=arguments;return new Promise((function(t,i){var c=e.apply(r,n);function s(e){a(c,t,i,s,u,"next",e)}function u(e){a(c,t,i,s,u,"throw",e)}s(void 0)}))});return function(){return o.apply(this,arguments)}}();return{doRequest:p,errors:h}}},2876:function(e,r,n){"use strict";n.r(r),n.d(r,{__N_SSP:function(){return f}});var t=n(4051),i=n.n(t),c=n(5893),s=n(2914),u=n(5005),o=n(7294),a=n(3544),l=n(7423),d=n(1163);function h(e,r,n,t,i,c,s){try{var u=e[c](s),o=u.value}catch(a){return void n(a)}u.done?r(o):Promise.resolve(o).then(t,i)}var f=!0;r.default=function(e){var r=e.currentUser,n=(0,o.useState)(""),t=n[0],f=n[1],p=(0,o.useState)(""),v=p[0],m=p[1],x=(0,l.Z)({url:"/api/tickets",method:"post",body:{title:t,price:v},onSuccess:function(){return d.default.push("/")}}),j=x.doRequest,Z=x.errors,b=function(){var e,r=(e=i().mark((function e(r){return i().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r.preventDefault(),e.next=3,j();case 3:case"end":return e.stop()}}),e)})),function(){var r=this,n=arguments;return new Promise((function(t,i){var c=e.apply(r,n);function s(e){h(c,t,i,s,u,"next",e)}function u(e){h(c,t,i,s,u,"throw",e)}s(void 0)}))});return function(e){return r.apply(this,arguments)}}();return(0,c.jsxs)(a.Z,{currentUser:r,children:[(0,c.jsx)("h1",{className:"mb-4",children:"Create a Ticket"}),(0,c.jsxs)(s.Z,{onSubmit:b,children:[(0,c.jsxs)(s.Z.Group,{className:"mb-3",controlId:"formEmail",children:[(0,c.jsx)(s.Z.Label,{children:"Title"}),(0,c.jsx)(s.Z.Control,{placeholder:"Enter a title for your ticket",value:t,onChange:function(e){return f(e.target.value)}})]}),(0,c.jsxs)(s.Z.Group,{className:"mb-3",controlId:"formPassword",children:[(0,c.jsx)(s.Z.Label,{children:"Price"}),(0,c.jsx)(s.Z.Control,{type:"number",placeholder:"Enter a price for your ticket",value:v,onChange:function(e){return m(e.target.value)}})]}),Z,(0,c.jsx)(u.Z,{className:"mt-3",type:"submit",children:"Create ticket"})]})]})}}},function(e){e.O(0,[183,400,529,774,888,179],(function(){return r=8004,e(e.s=r);var r}));var r=e.O();_N_E=r}]);
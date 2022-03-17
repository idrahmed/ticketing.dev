"use strict";
(() => {
var exports = {};
exports.id = 349;
exports.ids = [349];
exports.modules = {

/***/ 4314:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2167);
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_0__);

const ingressInstance = ({ req  })=>{
    return axios__WEBPACK_IMPORTED_MODULE_0___default().create({
        baseURL: "http://ticketing-prod.me",
        headers: req.headers
    });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ingressInstance);


/***/ }),

/***/ 9797:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ _orderId_),
  "getServerSideProps": () => (/* binding */ getServerSideProps)
});

// EXTERNAL MODULE: external "react/jsx-runtime"
var jsx_runtime_ = __webpack_require__(997);
// EXTERNAL MODULE: external "react"
var external_react_ = __webpack_require__(6689);
// EXTERNAL MODULE: ./api/ingressInstance.js
var ingressInstance = __webpack_require__(4314);
// EXTERNAL MODULE: ./components/Layout.js + 1 modules
var Layout = __webpack_require__(3544);
;// CONCATENATED MODULE: external "react-stripe-checkout"
const external_react_stripe_checkout_namespaceObject = require("react-stripe-checkout");
var external_react_stripe_checkout_default = /*#__PURE__*/__webpack_require__.n(external_react_stripe_checkout_namespaceObject);
// EXTERNAL MODULE: external "react-bootstrap"
var external_react_bootstrap_ = __webpack_require__(358);
// EXTERNAL MODULE: ./hooks/useRequest.js
var useRequest = __webpack_require__(7423);
// EXTERNAL MODULE: ./node_modules/next/link.js
var next_link = __webpack_require__(1664);
// EXTERNAL MODULE: external "next/router"
var router_ = __webpack_require__(1853);
var router_default = /*#__PURE__*/__webpack_require__.n(router_);
;// CONCATENATED MODULE: ./pages/orders/[orderId].js









function millisToMinutesAndSeconds(millis) {
    const minutes = Math.floor(millis / 60000);
    const seconds = (millis % 60000 / 1000).toFixed(0);
    return minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
}
const Order = ({ currentUser , order  })=>{
    const { 0: timeLeft , 1: setTimeLeft  } = (0,external_react_.useState)(0);
    const { doRequest , errors  } = (0,useRequest/* default */.Z)({
        url: "/api/payments",
        method: "post",
        body: {
            orderId: order.id
        },
        onSuccess: ()=>{
            router_default().push("/orders");
        }
    });
    (0,external_react_.useEffect)(()=>{
        const findTimeLeft = ()=>{
            const msLeft = new Date(order.expiresAt) - new Date();
            setTimeLeft(msLeft);
            // if time remaining is less than 0 we want to clear the interval i.e. ticket is expired
            // and we dont want to keep calculating
            if (msLeft < 0) {
                clearInterval(timerId);
            }
        };
        // initial call
        findTimeLeft();
        // every second, we'll call the fn
        const timerId = setInterval(findTimeLeft, 1000);
        // we need to clean up after we are done with the component. i.e. if the user navigates away
        return ()=>{
            clearInterval(timerId);
        };
    }, [
        order
    ]);
    return(/*#__PURE__*/ jsx_runtime_.jsx(Layout/* default */.Z, {
        currentUser: currentUser,
        children: timeLeft < 0 ? /*#__PURE__*/ jsx_runtime_.jsx("div", {
            children: "Order Expired"
        }) : /*#__PURE__*/ (0,jsx_runtime_.jsxs)(external_react_bootstrap_.Container, {
            children: [
                /*#__PURE__*/ jsx_runtime_.jsx(external_react_bootstrap_.Row, {
                    className: "mb-4",
                    children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)("h4", {
                        children: [
                            "Time left to pay: ",
                            millisToMinutesAndSeconds(timeLeft),
                            " minutes"
                        ]
                    })
                }),
                /*#__PURE__*/ (0,jsx_runtime_.jsxs)(external_react_bootstrap_.Row, {
                    children: [
                        /*#__PURE__*/ jsx_runtime_.jsx(external_react_bootstrap_.Col, {
                            children: /*#__PURE__*/ jsx_runtime_.jsx((external_react_stripe_checkout_default()), {
                                // calling the doRequest fn here to make payment to our backend.
                                token: ({ id  })=>doRequest({
                                        token: id
                                    })
                                ,
                                stripeKey: "pk_test_51I8wqdDMbiFkoU4gnZh8EvyRP7F0IJ1sBBSjhKNWo5T3PCI0F7TcCcMBjTCoXqr9SZk3DAqjN6ZUm9Arxtz9XssK00q3YDS5re",
                                amount: order.ticket.price * 100,
                                name: "Ticketing.dev",
                                email: currentUser.email,
                                currency: "USD"
                            })
                        }),
                        /*#__PURE__*/ jsx_runtime_.jsx(external_react_bootstrap_.Col, {
                            children: /*#__PURE__*/ jsx_runtime_.jsx(next_link["default"], {
                                href: {
                                    pathname: "/tickets/[ticketId]",
                                    query: {
                                        ticketId: order.ticket.id
                                    }
                                },
                                children: /*#__PURE__*/ jsx_runtime_.jsx(external_react_bootstrap_.Button, {
                                    variant: "secondary",
                                    children: "View ticket"
                                })
                            })
                        })
                    ]
                })
            ]
        })
    }));
};
async function getServerSideProps(context) {
    const { orderId  } = context.query;
    const { data  } = await (0,ingressInstance/* default */.Z)(context).get("/api/users/currentuser");
    const { data: order  } = await (0,ingressInstance/* default */.Z)(context).get(`/api/orders/${orderId}`);
    return {
        props: {
            currentUser: data.currentUser,
            order
        }
    };
}
/* harmony default export */ const _orderId_ = (Order);


/***/ }),

/***/ 2167:
/***/ ((module) => {

module.exports = require("axios");

/***/ }),

/***/ 562:
/***/ ((module) => {

module.exports = require("next/dist/server/denormalize-page-path.js");

/***/ }),

/***/ 4014:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/i18n/normalize-locale-path.js");

/***/ }),

/***/ 8524:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/is-plain-object.js");

/***/ }),

/***/ 8020:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/mitt.js");

/***/ }),

/***/ 4964:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router-context.js");

/***/ }),

/***/ 9565:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/get-asset-path-from-route.js");

/***/ }),

/***/ 4365:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/get-middleware-regex.js");

/***/ }),

/***/ 1428:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/is-dynamic.js");

/***/ }),

/***/ 1292:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/parse-relative-url.js");

/***/ }),

/***/ 979:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/querystring.js");

/***/ }),

/***/ 6052:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/resolve-rewrites.js");

/***/ }),

/***/ 4226:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/route-matcher.js");

/***/ }),

/***/ 5052:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/route-regex.js");

/***/ }),

/***/ 9232:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/utils.js");

/***/ }),

/***/ 1853:
/***/ ((module) => {

module.exports = require("next/router");

/***/ }),

/***/ 6689:
/***/ ((module) => {

module.exports = require("react");

/***/ }),

/***/ 358:
/***/ ((module) => {

module.exports = require("react-bootstrap");

/***/ }),

/***/ 997:
/***/ ((module) => {

module.exports = require("react/jsx-runtime");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, [730,664,544,423], () => (__webpack_exec__(9797)));
module.exports = __webpack_exports__;

})();
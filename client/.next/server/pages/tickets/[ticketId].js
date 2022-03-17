"use strict";
(() => {
var exports = {};
exports.id = 42;
exports.ids = [42];
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
        baseURL: "http://ingress-nginx-controller.ingress-nginx.svc.cluster.local",
        headers: req.headers
    });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ingressInstance);


/***/ }),

/***/ 9567:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getServerSideProps": () => (/* binding */ getServerSideProps),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1853);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_bootstrap__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(358);
/* harmony import */ var react_bootstrap__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _api_ingressInstance__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(4314);
/* harmony import */ var _components_Layout__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(3544);
/* harmony import */ var _hooks_useRequest__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(7423);






const Ticket = ({ currentUser , ticket  })=>{
    const { doRequest , errors  } = (0,_hooks_useRequest__WEBPACK_IMPORTED_MODULE_5__/* ["default"] */ .Z)({
        url: "/api/orders",
        method: "post",
        body: {
            ticketId: ticket.id
        },
        onSuccess: (order)=>next_router__WEBPACK_IMPORTED_MODULE_1___default().push(`/orders/[orderId]`, `/orders/${order.id}`)
    });
    return(/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_Layout__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */ .Z, {
        currentUser: currentUser,
        children: [
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("h1", {
                className: "mb-4",
                children: ticket.title
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("h4", {
                className: "mb-4",
                children: [
                    "Price: $",
                    ticket.price
                ]
            }),
            errors,
            ticket.orderId ? /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__.Button, {
                variant: "danger",
                disabled: true,
                children: "This ticket is currently reserved or has been purchased"
            }) : ticket.userId === (currentUser === null || currentUser === void 0 ? void 0 : currentUser.id) ? /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__.Button, {
                children: "Edit your ticket"
            }) : /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__.Button, {
                onClick: ()=>doRequest()
                ,
                children: "Purchase ticket"
            })
        ]
    }));
};
async function getServerSideProps(context) {
    const { ticketId  } = context.query;
    const { data  } = await (0,_api_ingressInstance__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .Z)(context).get("/api/users/currentuser");
    const { data: ticket  } = await (0,_api_ingressInstance__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .Z)(context).get(`/api/tickets/${ticketId}`);
    return {
        props: {
            currentUser: data.currentUser,
            ticket
        }
    };
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Ticket);


/***/ }),

/***/ 2167:
/***/ ((module) => {

module.exports = require("axios");

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
var __webpack_exports__ = __webpack_require__.X(0, [544,423], () => (__webpack_exec__(9567)));
module.exports = __webpack_exports__;

})();
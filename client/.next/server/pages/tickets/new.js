"use strict";
(() => {
var exports = {};
exports.id = 302;
exports.ids = [302];
exports.modules = {

/***/ 3536:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (/* binding */ requireAuthentication)
/* harmony export */ });
function requireAuthentication(gssp) {
    return async (ctx)=>{
        const { req , res  } = ctx;
        const session = req.cookies.session;
        if (!session) {
            // Redirect to login page
            return {
                redirect: {
                    destination: "/auth/signin",
                    statusCode: 302
                }
            };
        }
        return await gssp(ctx); // Continue on to call `getServerSideProps` logic
    };
}


/***/ }),

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

/***/ 2876:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getServerSideProps": () => (/* binding */ getServerSideProps),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_bootstrap__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(358);
/* harmony import */ var react_bootstrap__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _components_Layout__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(3544);
/* harmony import */ var _HOC_requireAuth__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(3536);
/* harmony import */ var _api_ingressInstance__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(4314);
/* harmony import */ var _hooks_useRequest__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(7423);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(1853);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_6__);








const NewTicket = ({ currentUser  })=>{
    const { 0: title , 1: setTitle  } = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)("");
    const { 0: price , 1: setPrice  } = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)("");
    const { doRequest , errors  } = (0,_hooks_useRequest__WEBPACK_IMPORTED_MODULE_5__/* ["default"] */ .Z)({
        url: "/api/tickets",
        method: "post",
        body: {
            title,
            price
        },
        onSuccess: ()=>next_router__WEBPACK_IMPORTED_MODULE_6___default().push("/")
    });
    const onSubmit = async (event)=>{
        event.preventDefault();
        await doRequest();
    };
    return(/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_Layout__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .Z, {
        currentUser: currentUser,
        children: [
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("h1", {
                className: "mb-4",
                children: "Create a Ticket"
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__.Form, {
                onSubmit: onSubmit,
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__.Form.Group, {
                        className: "mb-3",
                        controlId: "formEmail",
                        children: [
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__.Form.Label, {
                                children: "Title"
                            }),
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__.Form.Control, {
                                placeholder: "Enter a title for your ticket",
                                value: title,
                                onChange: (e)=>setTitle(e.target.value)
                            })
                        ]
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__.Form.Group, {
                        className: "mb-3",
                        controlId: "formPassword",
                        children: [
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__.Form.Label, {
                                children: "Price"
                            }),
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__.Form.Control, {
                                type: "number",
                                placeholder: "Enter a price for your ticket",
                                value: price,
                                onChange: (e)=>setPrice(e.target.value)
                            })
                        ]
                    }),
                    errors,
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__.Button, {
                        className: "mt-3",
                        type: "submit",
                        children: "Create ticket"
                    })
                ]
            })
        ]
    }));
};
const getServerSideProps = (0,_HOC_requireAuth__WEBPACK_IMPORTED_MODULE_7__/* .requireAuthentication */ .Z)(async (ctx)=>{
    const { data  } = await (0,_api_ingressInstance__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */ .Z)(ctx).get("/api/users/currentuser");
    return {
        props: {
            currentUser: data.currentUser
        }
    };
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (NewTicket);


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
var __webpack_exports__ = __webpack_require__.X(0, [544,423], () => (__webpack_exec__(2876)));
module.exports = __webpack_exports__;

})();
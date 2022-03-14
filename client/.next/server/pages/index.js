"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "pages/index";
exports.ids = ["pages/index"];
exports.modules = {

/***/ "./api/ingressInstance.js":
/*!********************************!*\
  !*** ./api/ingressInstance.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! axios */ \"axios\");\n/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_0__);\n\nconst ingressInstance = ({ req  })=>{\n    return axios__WEBPACK_IMPORTED_MODULE_0___default().create({\n        baseURL: \"http://ingress-nginx-controller.ingress-nginx.svc.cluster.local\",\n        headers: req.headers\n    });\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ingressInstance);\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9hcGkvaW5ncmVzc0luc3RhbmNlLmpzLmpzIiwibWFwcGluZ3MiOiI7Ozs7OztBQUF5QjtBQUV6QixLQUFLLENBQUNDLGVBQWUsSUFBSSxDQUFDLENBQUNDLEdBQUcsRUFBQyxDQUFDLEdBQUssQ0FBQztJQUNwQyxNQUFNLENBQUNGLG1EQUFZLENBQUMsQ0FBQztRQUNuQkksT0FBTyxFQUFFLENBQWlFO1FBQzFFQyxPQUFPLEVBQUVILEdBQUcsQ0FBQ0csT0FBTztJQUN0QixDQUFDO0FBQ0gsQ0FBQztBQUVELGlFQUFlSixlQUFlLEVBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9jbGllbnQvLi9hcGkvaW5ncmVzc0luc3RhbmNlLmpzP2JjZjAiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGF4aW9zIGZyb20gXCJheGlvc1wiO1xyXG5cclxuY29uc3QgaW5ncmVzc0luc3RhbmNlID0gKHsgcmVxIH0pID0+IHtcclxuICByZXR1cm4gYXhpb3MuY3JlYXRlKHtcclxuICAgIGJhc2VVUkw6IFwiaHR0cDovL2luZ3Jlc3MtbmdpbngtY29udHJvbGxlci5pbmdyZXNzLW5naW54LnN2Yy5jbHVzdGVyLmxvY2FsXCIsXHJcbiAgICBoZWFkZXJzOiByZXEuaGVhZGVycyxcclxuICB9KTtcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGluZ3Jlc3NJbnN0YW5jZTtcclxuIl0sIm5hbWVzIjpbImF4aW9zIiwiaW5ncmVzc0luc3RhbmNlIiwicmVxIiwiY3JlYXRlIiwiYmFzZVVSTCIsImhlYWRlcnMiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./api/ingressInstance.js\n");

/***/ }),

/***/ "./components/Header.js":
/*!******************************!*\
  !*** ./components/Header.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"react/jsx-dev-runtime\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react_bootstrap__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-bootstrap */ \"react-bootstrap\");\n/* harmony import */ var react_bootstrap__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _api_ingressInstance__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../api/ingressInstance */ \"./api/ingressInstance.js\");\n\n\n\n\nconst Header = ()=>{\n    let currentUser;\n    (0,react__WEBPACK_IMPORTED_MODULE_2__.useEffect)(()=>{\n        const isUser = async ()=>{\n            const { data  } = await (0,_api_ingressInstance__WEBPACK_IMPORTED_MODULE_3__[\"default\"])(context).get(\"/api/users/currentuser\");\n            return data.currentUser;\n        };\n        currentUser = isUser();\n    });\n    return(/*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__.Navbar, {\n        bg: \"light\",\n        className: \"px-3\",\n        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__.Container, {\n            children: [\n                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__.Navbar.Brand, {\n                    href: \"/\",\n                    children: \"GitTix\"\n                }, void 0, false, {\n                    fileName: \"C:\\\\Users\\\\ID\\\\Desktop\\\\microservices course\\\\large_proj\\\\client\\\\components\\\\Header.js\",\n                    lineNumber: 20,\n                    columnNumber: 9\n                }, undefined),\n                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__.Nav, {\n                    className: \"d-flex justify-content-end align-items-center gap-3\",\n                    children: currentUser ? /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__.Nav.Item, {\n                        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__.Nav.Link, {\n                            href: \"/auth/signout\",\n                            children: \"Sign out\"\n                        }, void 0, false, {\n                            fileName: \"C:\\\\Users\\\\ID\\\\Desktop\\\\microservices course\\\\large_proj\\\\client\\\\components\\\\Header.js\",\n                            lineNumber: 26,\n                            columnNumber: 15\n                        }, undefined)\n                    }, void 0, false, {\n                        fileName: \"C:\\\\Users\\\\ID\\\\Desktop\\\\microservices course\\\\large_proj\\\\client\\\\components\\\\Header.js\",\n                        lineNumber: 25,\n                        columnNumber: 13\n                    }, undefined) : /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {\n                        children: [\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__.Nav.Item, {\n                                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__.Nav.Link, {\n                                    href: \"/auth/signup\",\n                                    children: \"Sign up\"\n                                }, void 0, false, {\n                                    fileName: \"C:\\\\Users\\\\ID\\\\Desktop\\\\microservices course\\\\large_proj\\\\client\\\\components\\\\Header.js\",\n                                    lineNumber: 31,\n                                    columnNumber: 17\n                                }, undefined)\n                            }, void 0, false, {\n                                fileName: \"C:\\\\Users\\\\ID\\\\Desktop\\\\microservices course\\\\large_proj\\\\client\\\\components\\\\Header.js\",\n                                lineNumber: 30,\n                                columnNumber: 15\n                            }, undefined),\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__.Nav.Item, {\n                                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__.Nav.Link, {\n                                    href: \"/auth/signin\",\n                                    children: \"Sign in\"\n                                }, void 0, false, {\n                                    fileName: \"C:\\\\Users\\\\ID\\\\Desktop\\\\microservices course\\\\large_proj\\\\client\\\\components\\\\Header.js\",\n                                    lineNumber: 34,\n                                    columnNumber: 17\n                                }, undefined)\n                            }, void 0, false, {\n                                fileName: \"C:\\\\Users\\\\ID\\\\Desktop\\\\microservices course\\\\large_proj\\\\client\\\\components\\\\Header.js\",\n                                lineNumber: 33,\n                                columnNumber: 15\n                            }, undefined)\n                        ]\n                    }, void 0, true)\n                }, void 0, false, {\n                    fileName: \"C:\\\\Users\\\\ID\\\\Desktop\\\\microservices course\\\\large_proj\\\\client\\\\components\\\\Header.js\",\n                    lineNumber: 23,\n                    columnNumber: 9\n                }, undefined)\n            ]\n        }, void 0, true, {\n            fileName: \"C:\\\\Users\\\\ID\\\\Desktop\\\\microservices course\\\\large_proj\\\\client\\\\components\\\\Header.js\",\n            lineNumber: 19,\n            columnNumber: 7\n        }, undefined)\n    }, void 0, false, {\n        fileName: \"C:\\\\Users\\\\ID\\\\Desktop\\\\microservices course\\\\large_proj\\\\client\\\\components\\\\Header.js\",\n        lineNumber: 18,\n        columnNumber: 5\n    }, undefined));\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Header);\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9jb21wb25lbnRzL0hlYWRlci5qcy5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFBd0Q7QUFDdkI7QUFDbUI7QUFFcEQsS0FBSyxDQUFDSyxNQUFNLE9BQVMsQ0FBQztJQUNwQixHQUFHLENBQUNDLFdBQVc7SUFDZkgsZ0RBQVMsS0FBTyxDQUFDO1FBQ2YsS0FBSyxDQUFDSSxNQUFNLGFBQWUsQ0FBQztZQUMxQixLQUFLLENBQUMsQ0FBQyxDQUFDQyxJQUFJLEVBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQ0osZ0VBQWUsQ0FBQ0ssT0FBTyxFQUFFQyxHQUFHLENBQ2pELENBQXdCO1lBRTFCLE1BQU0sQ0FBQ0YsSUFBSSxDQUFDRixXQUFXO1FBQ3pCLENBQUM7UUFDREEsV0FBVyxHQUFHQyxNQUFNO0lBQ3RCLENBQUM7SUFFRCxNQUFNLDZFQUNITCxtREFBTTtRQUFDUyxFQUFFLEVBQUMsQ0FBTztRQUFDQyxTQUFTLEVBQUMsQ0FBTTs4RkFDaENaLHNEQUFTOzs0RkFDUEUseURBQVk7b0JBQUNZLElBQUksRUFBQyxDQUFHOzhCQUFDLENBQU07Ozs7Ozs0RkFHNUJiLGdEQUFHO29CQUFDVyxTQUFTLEVBQUMsQ0FBcUQ7OEJBQ2pFTixXQUFXLCtFQUNUTCxxREFBUTs4R0FDTkEscURBQVE7NEJBQUNhLElBQUksRUFBQyxDQUFlO3NDQUFDLENBQVE7Ozs7Ozs7Ozs7Ozt3R0FJdENiLHFEQUFRO3NIQUNOQSxxREFBUTtvQ0FBQ2EsSUFBSSxFQUFDLENBQWM7OENBQUMsQ0FBTzs7Ozs7Ozs7Ozs7d0dBRXRDYixxREFBUTtzSEFDTkEscURBQVE7b0NBQUNhLElBQUksRUFBQyxDQUFjOzhDQUFDLENBQU87Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBUXJELENBQUM7QUFFRCxpRUFBZVQsTUFBTSxFQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vY2xpZW50Ly4vY29tcG9uZW50cy9IZWFkZXIuanM/NGRiYiJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb250YWluZXIsIE5hdiwgTmF2YmFyIH0gZnJvbSBcInJlYWN0LWJvb3RzdHJhcFwiO1xyXG5pbXBvcnQgeyB1c2VFZmZlY3QgfSBmcm9tIFwicmVhY3RcIjtcclxuaW1wb3J0IGluZ3Jlc3NJbnN0YW5jZSBmcm9tIFwiLi4vYXBpL2luZ3Jlc3NJbnN0YW5jZVwiO1xyXG5cclxuY29uc3QgSGVhZGVyID0gKCkgPT4ge1xyXG4gIGxldCBjdXJyZW50VXNlcjtcclxuICB1c2VFZmZlY3QoKCkgPT4ge1xyXG4gICAgY29uc3QgaXNVc2VyID0gYXN5bmMgKCkgPT4ge1xyXG4gICAgICBjb25zdCB7IGRhdGEgfSA9IGF3YWl0IGluZ3Jlc3NJbnN0YW5jZShjb250ZXh0KS5nZXQoXHJcbiAgICAgICAgXCIvYXBpL3VzZXJzL2N1cnJlbnR1c2VyXCJcclxuICAgICAgKTtcclxuICAgICAgcmV0dXJuIGRhdGEuY3VycmVudFVzZXI7XHJcbiAgICB9O1xyXG4gICAgY3VycmVudFVzZXIgPSBpc1VzZXIoKTtcclxuICB9KTtcclxuXHJcbiAgcmV0dXJuIChcclxuICAgIDxOYXZiYXIgYmc9XCJsaWdodFwiIGNsYXNzTmFtZT1cInB4LTNcIj5cclxuICAgICAgPENvbnRhaW5lcj5cclxuICAgICAgICA8TmF2YmFyLkJyYW5kIGhyZWY9XCIvXCI+R2l0VGl4PC9OYXZiYXIuQnJhbmQ+XHJcbiAgICAgICAgey8qIDx1bCBjbGFzc05hbWU9XCJuYXYgZC1mbGV4IGFsaWduLWl0ZW1zLWNlbnRlclwiPntsaW5rc308L3VsPiAqL31cclxuXHJcbiAgICAgICAgPE5hdiBjbGFzc05hbWU9XCJkLWZsZXgganVzdGlmeS1jb250ZW50LWVuZCBhbGlnbi1pdGVtcy1jZW50ZXIgZ2FwLTNcIj5cclxuICAgICAgICAgIHtjdXJyZW50VXNlciA/IChcclxuICAgICAgICAgICAgPE5hdi5JdGVtPlxyXG4gICAgICAgICAgICAgIDxOYXYuTGluayBocmVmPVwiL2F1dGgvc2lnbm91dFwiPlNpZ24gb3V0PC9OYXYuTGluaz5cclxuICAgICAgICAgICAgPC9OYXYuSXRlbT5cclxuICAgICAgICAgICkgOiAoXHJcbiAgICAgICAgICAgIDw+XHJcbiAgICAgICAgICAgICAgPE5hdi5JdGVtPlxyXG4gICAgICAgICAgICAgICAgPE5hdi5MaW5rIGhyZWY9XCIvYXV0aC9zaWdudXBcIj5TaWduIHVwPC9OYXYuTGluaz5cclxuICAgICAgICAgICAgICA8L05hdi5JdGVtPlxyXG4gICAgICAgICAgICAgIDxOYXYuSXRlbT5cclxuICAgICAgICAgICAgICAgIDxOYXYuTGluayBocmVmPVwiL2F1dGgvc2lnbmluXCI+U2lnbiBpbjwvTmF2Lkxpbms+XHJcbiAgICAgICAgICAgICAgPC9OYXYuSXRlbT5cclxuICAgICAgICAgICAgPC8+XHJcbiAgICAgICAgICApfVxyXG4gICAgICAgIDwvTmF2PlxyXG4gICAgICA8L0NvbnRhaW5lcj5cclxuICAgIDwvTmF2YmFyPlxyXG4gICk7XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBIZWFkZXI7XHJcbiJdLCJuYW1lcyI6WyJDb250YWluZXIiLCJOYXYiLCJOYXZiYXIiLCJ1c2VFZmZlY3QiLCJpbmdyZXNzSW5zdGFuY2UiLCJIZWFkZXIiLCJjdXJyZW50VXNlciIsImlzVXNlciIsImRhdGEiLCJjb250ZXh0IiwiZ2V0IiwiYmciLCJjbGFzc05hbWUiLCJCcmFuZCIsImhyZWYiLCJJdGVtIiwiTGluayJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./components/Header.js\n");

/***/ }),

/***/ "./components/Layout.js":
/*!******************************!*\
  !*** ./components/Layout.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"react/jsx-dev-runtime\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react_bootstrap__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-bootstrap */ \"react-bootstrap\");\n/* harmony import */ var react_bootstrap__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _Header__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Header */ \"./components/Header.js\");\n\n\n\nconst Layout = ({ children  })=>{\n    return(/*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n        children: [\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Header__WEBPACK_IMPORTED_MODULE_2__[\"default\"], {}, void 0, false, {\n                fileName: \"C:\\\\Users\\\\ID\\\\Desktop\\\\microservices course\\\\large_proj\\\\client\\\\components\\\\Layout.js\",\n                lineNumber: 7,\n                columnNumber: 7\n            }, undefined),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__.Container, {\n                className: \"mt-5\",\n                children: children\n            }, void 0, false, {\n                fileName: \"C:\\\\Users\\\\ID\\\\Desktop\\\\microservices course\\\\large_proj\\\\client\\\\components\\\\Layout.js\",\n                lineNumber: 8,\n                columnNumber: 7\n            }, undefined)\n        ]\n    }, void 0, true, {\n        fileName: \"C:\\\\Users\\\\ID\\\\Desktop\\\\microservices course\\\\large_proj\\\\client\\\\components\\\\Layout.js\",\n        lineNumber: 6,\n        columnNumber: 5\n    }, undefined));\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Layout);\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9jb21wb25lbnRzL0xheW91dC5qcy5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQTJDO0FBQ2Q7QUFFN0IsS0FBSyxDQUFDRSxNQUFNLElBQUksQ0FBQyxDQUFDQyxRQUFRLEVBQUMsQ0FBQyxHQUFLLENBQUM7SUFDaEMsTUFBTSw2RUFDSEMsQ0FBRzs7d0ZBQ0RILCtDQUFNOzs7Ozt3RkFDTkQsc0RBQVM7Z0JBQUNLLFNBQVMsRUFBQyxDQUFNOzBCQUFFRixRQUFROzs7Ozs7Ozs7Ozs7QUFHM0MsQ0FBQztBQUVELGlFQUFlRCxNQUFNLEVBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9jbGllbnQvLi9jb21wb25lbnRzL0xheW91dC5qcz81MTVjIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbnRhaW5lciB9IGZyb20gXCJyZWFjdC1ib290c3RyYXBcIjtcclxuaW1wb3J0IEhlYWRlciBmcm9tIFwiLi9IZWFkZXJcIjtcclxuXHJcbmNvbnN0IExheW91dCA9ICh7IGNoaWxkcmVuIH0pID0+IHtcclxuICByZXR1cm4gKFxyXG4gICAgPGRpdj5cclxuICAgICAgPEhlYWRlciAvPlxyXG4gICAgICA8Q29udGFpbmVyIGNsYXNzTmFtZT1cIm10LTVcIj57Y2hpbGRyZW59PC9Db250YWluZXI+XHJcbiAgICA8L2Rpdj5cclxuICApO1xyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgTGF5b3V0O1xyXG4iXSwibmFtZXMiOlsiQ29udGFpbmVyIiwiSGVhZGVyIiwiTGF5b3V0IiwiY2hpbGRyZW4iLCJkaXYiLCJjbGFzc05hbWUiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./components/Layout.js\n");

/***/ }),

/***/ "./pages/index.js":
/*!************************!*\
  !*** ./pages/index.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"getServerSideProps\": () => (/* binding */ getServerSideProps),\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"react/jsx-dev-runtime\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _api_ingressInstance__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../api/ingressInstance */ \"./api/ingressInstance.js\");\n/* harmony import */ var _components_Layout__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../components/Layout */ \"./components/Layout.js\");\n\n\n\nconst index = ()=>{\n    return(/*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_Layout__WEBPACK_IMPORTED_MODULE_2__[\"default\"], {}, void 0, false, {\n        fileName: \"C:\\\\Users\\\\ID\\\\Desktop\\\\microservices course\\\\large_proj\\\\client\\\\pages\\\\index.js\",\n        lineNumber: 5,\n        columnNumber: 10\n    }, undefined));\n};\nasync function getServerSideProps(context) {\n    // 'http://SERVICENAME.NAMESPACE.svc.clutser.local'\n    const { data  } = await (0,_api_ingressInstance__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(context).get(\"/api/users/currentuser\");\n    return {\n        props: {\n            currentUser: data.currentUser\n        }\n    };\n}\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (index);\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9wYWdlcy9pbmRleC5qcy5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQW9EO0FBQ1g7QUFFekMsS0FBSyxDQUFDRSxLQUFLLE9BQVMsQ0FBQztJQUNuQixNQUFNLDZFQUFFRCwwREFBTTs7Ozs7QUFDaEIsQ0FBQztBQUVNLGVBQWVFLGtCQUFrQixDQUFDQyxPQUFPLEVBQUUsQ0FBQztJQUNqRCxFQUFtRDtJQUVuRCxLQUFLLENBQUMsQ0FBQyxDQUFDQyxJQUFJLEVBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQ0wsZ0VBQWUsQ0FBQ0ksT0FBTyxFQUFFRSxHQUFHLENBQUMsQ0FBd0I7SUFFNUUsTUFBTSxDQUFDLENBQUM7UUFDTkMsS0FBSyxFQUFFLENBQUM7WUFDTkMsV0FBVyxFQUFFSCxJQUFJLENBQUNHLFdBQVc7UUFDL0IsQ0FBQztJQUNILENBQUM7QUFDSCxDQUFDO0FBRUQsaUVBQWVOLEtBQUssRUFBQyIsInNvdXJjZXMiOlsid2VicGFjazovL2NsaWVudC8uL3BhZ2VzL2luZGV4LmpzP2JlZTciXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGluZ3Jlc3NJbnN0YW5jZSBmcm9tIFwiLi4vYXBpL2luZ3Jlc3NJbnN0YW5jZVwiO1xyXG5pbXBvcnQgTGF5b3V0IGZyb20gXCIuLi9jb21wb25lbnRzL0xheW91dFwiO1xyXG5cclxuY29uc3QgaW5kZXggPSAoKSA9PiB7XHJcbiAgcmV0dXJuIDxMYXlvdXQ+PC9MYXlvdXQ+O1xyXG59O1xyXG5cclxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGdldFNlcnZlclNpZGVQcm9wcyhjb250ZXh0KSB7XHJcbiAgLy8gJ2h0dHA6Ly9TRVJWSUNFTkFNRS5OQU1FU1BBQ0Uuc3ZjLmNsdXRzZXIubG9jYWwnXHJcblxyXG4gIGNvbnN0IHsgZGF0YSB9ID0gYXdhaXQgaW5ncmVzc0luc3RhbmNlKGNvbnRleHQpLmdldChcIi9hcGkvdXNlcnMvY3VycmVudHVzZXJcIik7XHJcblxyXG4gIHJldHVybiB7XHJcbiAgICBwcm9wczoge1xyXG4gICAgICBjdXJyZW50VXNlcjogZGF0YS5jdXJyZW50VXNlcixcclxuICAgIH0sXHJcbiAgfTtcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgaW5kZXg7XHJcbiJdLCJuYW1lcyI6WyJpbmdyZXNzSW5zdGFuY2UiLCJMYXlvdXQiLCJpbmRleCIsImdldFNlcnZlclNpZGVQcm9wcyIsImNvbnRleHQiLCJkYXRhIiwiZ2V0IiwicHJvcHMiLCJjdXJyZW50VXNlciJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./pages/index.js\n");

/***/ }),

/***/ "axios":
/*!************************!*\
  !*** external "axios" ***!
  \************************/
/***/ ((module) => {

module.exports = require("axios");

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "react" ***!
  \************************/
/***/ ((module) => {

module.exports = require("react");

/***/ }),

/***/ "react-bootstrap":
/*!**********************************!*\
  !*** external "react-bootstrap" ***!
  \**********************************/
/***/ ((module) => {

module.exports = require("react-bootstrap");

/***/ }),

/***/ "react/jsx-dev-runtime":
/*!****************************************!*\
  !*** external "react/jsx-dev-runtime" ***!
  \****************************************/
/***/ ((module) => {

module.exports = require("react/jsx-dev-runtime");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__("./pages/index.js"));
module.exports = __webpack_exports__;

})();
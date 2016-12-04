(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["tones"] = factory();
	else
		root["tones"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(1);
	module.exports = __webpack_require__(1);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;
	exports.util = exports.default = undefined;

	var _Library = __webpack_require__(2);

	var _Library2 = _interopRequireDefault(_Library);

	var _util2 = __webpack_require__(3);

	var _util3 = _interopRequireDefault(_util2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = _Library2.default;
	exports.util = _util3.default;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	exports.__esModule = true;

	var _classCallCheck2 = __webpack_require__(4);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var Library = function () {
	  function Library() {
	    var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	    (0, _classCallCheck3.default)(this, Library);

	    this.id = props.id;
	  }

	  Library.prototype.foo = function foo() {
	    return "foo " + this.id;
	  };

	  return Library;
	}();

	exports.default = Library;

/***/ },
/* 3 */
/***/ function(module, exports) {

	"use strict";

	exports.__esModule = true;
	exports.default = util;
	function util(foo) {
	  return { foo: foo };
	}

/***/ },
/* 4 */
/***/ function(module, exports) {

	"use strict";

	exports.__esModule = true;

	exports.default = function (instance, Constructor) {
	  if (!(instance instanceof Constructor)) {
	    throw new TypeError("Cannot call a class as a function");
	  }
	};

/***/ }
/******/ ])
});
;
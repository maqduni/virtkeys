/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/*!********************************!*\
  !*** ./src/virtualkeyboard.js ***!
  \********************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _helpers = __webpack_require__(/*! ./extensions/helpers */ 1);
	
	__webpack_require__(/*! ./extensions/ext/array */ 2);
	
	__webpack_require__(/*! ./extensions/ext/object */ 3);
	
	__webpack_require__(/*! ./extensions/ext/regexp */ 4);
	
	__webpack_require__(/*! ./extensions/ext/string */ 5);
	
	var _documentselection = __webpack_require__(/*! ./extensions/documentselection */ 6);
	
	var _dom = __webpack_require__(/*! ./extensions/dom */ 7);
	
	var _eventmanager = __webpack_require__(/*! ./extensions/eventmanager */ 8);
	
	var _ime = __webpack_require__(/*! ./ime */ 9);
	
	__webpack_require__(/*! ./extensions/DOMEventsLevel3.shim */ 10);
	
	var VirtualKeyboard = new function () {
	    var self = this;
	    self.$VERSION$ = "3.6.1.585";
	
	    var options = {
	        'layout': null,
	        'showKeyboardMaps': true,
	        'showKeyboardLayouts': true
	    };
	
	    var idPrefix = 'kb_b';
	
	    var animate = true;
	
	    var controlKeys = {
	        14: 'backspace',
	        15: 'tab',
	        28: 'enter',
	        29: 'caps',
	        41: 'shift_left',
	        52: 'shift_right',
	        53: 'del',
	        54: 'ctrl_left',
	        55: 'alt_left',
	        56: 'space',
	        57: 'alt_right',
	        58: 'ctrl_right'
	    };
	
	    var KEY = {
	        'SHIFT': 'shift',
	        'ALT': 'alt',
	        'CTRL': 'ctrl',
	        'CAPS': 'caps'
	    };
	
	    var keymap;
	
	    var keymaps = {
	        'QWERTY Standard': "À1234567890m=ÜQWERTYUIOPÛÝASDFGHJKL;ÞZXCVBNM¼¾¿",
	        'QWERTY Canadian': "Þ1234567890m=ÜQWERTYUIOPÛÝASDFGHJKL;ÀZXCVBNM¼¾¿",
	        'QWERTY Dutch': "Þ1234567890Û¿ÜQWERTYUIOPÝ;ASDFGHJKL=ÀZXCVBNM¼¾m",
	        'QWERTY Estonian': "¿1234567890m=ÜQWERTYUIOPÞÛASDFGHJKL;ÀZXCVBNM¼¾Ý",
	        'QWERTY Greek (220)': "À1234567890¿ÛÜQWERTYUIOP=ÝASDFGHJKL;ÞZXCVBNM¼¾m",
	        'QWERTY Greek (319)': "À1234567890¿=ÜQWERTYUIOPÛÝASDFGHJKL;ÞZXCVBNM¼¾m",
	        'QWERTY Gujarati': "À1234567890m=XQWERTYUIOPÛÝASDFGHJKL;ÜZXCVBNM¼¾¿",
	        'QWERTY Italian': "Ü1234567890ÛÝ¿QWERTYUIOP;=ASDFGHJKLÀÞZXCVBNM¼¾m",
	        'QWERTY Kannada': "À1234567890m=ZQWERTYUIOPÛÝASDFGHJKL;ÞZXCVBNM¼¾¿",
	        'QWERTY Portuguese': "À1234567890ÛÝ¿QWERTYUIOP=;ASDFGHJKLÞÜZXCVBNM¼¾m",
	        'QWERTY Scandinavian': "Ü1234567890=Û¿QWERTYUIOPÝ;ASDFGHJKLÀÞZXCVBNM¼¾m",
	        'QWERTY Spanish': "Ü1234567890mÛ¿QWERTYUIOPÝ;ASDFGHJKLÀÞZXCVBNM¼¾ß",
	        'QWERTY Tamil': "À1234567890m =ZQWERTYUIOPÛÝASDFGHJKL;ÞCVBNM¼¾ ¿",
	        'QWERTY Turkish': "À1234567890ßm¼QWERTYUIOPÛÝASDFGHJKL;ÞZXCVBNM¿Ü¾",
	        'QWERTY UK': "ß1234567890m=ÞQWERTYUIOPÛÝASDFGHJKL;ÀZXCVBNM¼¾¿",
	        'QWERTZ Albanian': "À1234567890m=ÜQWERTZUIOPÛÝASDFGHJKL;ÞYXCVBNM¼¾¿",
	        'QWERTZ Bosnian': "À1234567890¿=ÜQWERTZUIOPÛÝASDFGHJKL;ÞYXCVBNM¼¾m",
	        'QWERTZ Czech': "À1234567890=¿ÜQWERTZUIOPÛÝASDFGHJKL;ÞYXCVBNM¼¾m",
	        'QWERTZ German': "Ü1234567890ÛÝ¿QWERTZUIOP;=ASDFGHJKLÀÞYXCVBNM¼¾m",
	        'QWERTZ Hungarian': "0123456789À¿=ÜQWERTZUIOPÛÝASDFGHJKL;ÞYXCVBNM¼¾m",
	        'QWERTZ Slovak': "À1234567890¿ßÜQWERTZUIOPÛÝASDFGHJKL;ÞYXCVBNM¼¾m",
	        'QWERTZ Swiss': "Ü1234567890ÛÝßQWERTZUIOP;ÞASDFGHJKLÀ¿YXCVBNM¼¾m",
	        'AZERTY Belgian': "Þ1234567890ÛmÜAZERTYUIOPÝ;QSDFGHJKLMÀWXCVBN¼¾¿=",
	        'AZERTY French': "Þ1234567890Û=ÜAZERTYUIOPÝ;QSDFGHJKLMÀWXCVBN¼¾¿ß",
	        ',WERTY Bulgarian': "À1234567890m¾Ü¼WERTYUIOPÛÝASDFGHJKL;ÞZXCVBNMßQ¿",
	        'QGJRMV Latvian': "À1234567890mFÜQGJRMVNZWXYH;USILDATECÞÛBÝKPOß¼¾¿",
	        '/,.PYF UK-Dvorak': "m1234567890ÛÝÜÀ¼¾PYFGCRL¿=AOEUIDHTNSÞ;QJKXBMWVZ",
	        'FG;IOD Turkish F': "À1234567890=mXFG;IODRNHPQWUÛEAÝTKMLYÞJÜVC¿ZSB¾¼",
	        ';QBYUR US-Dvorak': "7ÛÝ¿PFMLJ4321Ü;QBYURSO¾65=mKCDTHEAZ8ÞÀXGVWNI¼09",
	        '56Q.OR US-Dvorak': "m1234JLMFP¿ÛÝÜ56Q¾ORSUYB;=78ZAEHTDCKÞ90X¼INWVGÀ"
	    };
	
	    var mode = 0,
	        VK_NORMAL = 0,
	        VK_SHIFT = 1,
	        VK_ALT = 2,
	        VK_CTRL = 4,
	        VK_CAPS = 8,
	        VK_CTRL_CAPS = VK_CTRL | VK_CAPS,
	        VK_CTRL_SHIFT = VK_CTRL | VK_SHIFT,
	        VK_ALT_CAPS = VK_ALT | VK_CAPS,
	        VK_ALT_CTRL = VK_ALT | VK_CTRL,
	        VK_ALT_CTRL_CAPS = VK_ALT | VK_CTRL | VK_CAPS,
	        VK_ALT_SHIFT = VK_ALT | VK_SHIFT,
	        VK_SHIFT_ALT_CTRL = VK_SHIFT | VK_ALT | VK_CTRL,
	        VK_SHIFT_CAPS = VK_SHIFT | VK_CAPS,
	        VK_ALL = VK_SHIFT | VK_ALT | VK_CTRL | VK_CAPS;
	
	    var cssClasses = {
	        'buttonUp': 'kbButton',
	        'buttonDown': 'kbButtonDown',
	        'buttonHover': 'kbButtonHover',
	        'hoverShift': 'hoverShift',
	        'hoverAlt': 'hoverAlt',
	        'modeAlt': 'modeAlt',
	        'modeAltCaps': 'modeAltCaps',
	        'modeCaps': 'modeCaps',
	        'modeNormal': 'modeNormal',
	        'modeShift': 'modeShift',
	        'modeShiftAlt': 'modeShiftAlt',
	        'modeShiftAltCaps': 'modeShiftAltCaps',
	        'modeShiftCaps': 'modeShiftCaps',
	        'charNormal': 'charNormal',
	        'charShift': 'charShift',
	        'charAlt': 'charAlt',
	        'charShiftAlt': 'charShiftAlt',
	        'charCaps': 'charCaps',
	        'charShiftCaps': 'charShiftCaps',
	        'hiddenAlt': 'hiddenAlt',
	        'hiddenCaps': 'hiddenCaps',
	        'hiddenShift': 'hiddenShift',
	        'hiddenShiftCaps': 'hiddenShiftCaps',
	        'deadkey': 'deadKey',
	        'noanim': 'VK_no_animate'
	
	    };
	
	    var lang = null;
	
	    var layout = [];
	
	    layout.hash = {};
	
	    layout.codes = {};
	
	    layout.codeFilter = null;
	
	    layout.options = null;
	
	    var nodes = {
	        keyboard: null,
	        desk: null,
	        langbox: null,
	        attachedInput: null // Field, keyboard attached to
	    };
	
	    var newKeyCode = null;
	
	    self.addLayoutList = function () {
	        for (var i = 0, aL = arguments.length; i < aL; i++) {
	            self.addLayout(arguments[i]);
	        }
	    };
	
	    self.addLayout = function (l) {
	
	        var code = l.code.entityDecode().split("-"),
	            name = l.name.entityDecode(),
	            alpha = __doParse(l.normal);
	
	        if (!(0, _helpers.isArray)(alpha) || 47 != alpha.length) throw new Error('VirtualKeyboard requires \'keys\' property to be an array with 47 items, ' + alpha.length + ' detected. Layout code: ' + code + ', layout name: ' + name);
	
	        l.code = code[1] || code[0];
	        l.name = name;
	        l.normal = alpha;
	        l.domain = code[0];
	
	        if (layout.hash.hasOwnProperty(l.code + " " + l.name)) return;
	
	        if (!layout.codes.hasOwnProperty(l.code)) layout.codes[l.code] = l.code;
	
	        l.toString = function () {
	            return this.code + " " + this.name;
	        };
	
	        layout.push(l);
	
	        layout.options = null;
	    };
	
	    self.switchLayout = function (code) {
	
	        __buildOptionsList();
	
	        if (!layout.options.hasOwnProperty(code)) return false;
	
	        self.IME.hide();
	
	        nodes.langbox.options[layout.options[code]].selected = true;
	
	        lang = layout[layout.hash[code]];
	        if (!(0, _helpers.isArray)(lang)) lang = layout[layout.hash[code]] = __prepareLayout(lang);
	
	        if (!(0, _helpers.isArray)(lang)) {
	            lang = layout[layout.hash[code]] = __prepareLayout(lang);
	        }
	        if (!lang.html) {
	            lang.html = __getKeyboardHtml(lang);
	        }
	
	        nodes.desk.innerHTML = lang.html;
	
	        nodes.keyboard.className = lang.domain;
	        self.IME.css = lang.domain;
	
	        mode = VK_NORMAL;
	        __updateLayout();
	
	        if ((0, _helpers.isFunction)(lang.activate)) {
	            lang.activate();
	        }
	
	        __toggleInputDir();
	
	        return true;
	    };
	
	    self.getLayouts = function () {
	        var lts = [];
	        for (var i = 0, lL = layout.length; i < lL; i++) {
	            lts[lts.length] = [layout[i].code, layout[i].name];
	        }
	        return lts.sort();
	    };
	
	    self.setVisibleLayoutCodes = function () {
	        var codes = (0, _helpers.isArray)(arguments[0]) ? arguments[0] : arguments,
	            filter = null,
	            code;
	
	        for (var i = 0, cL = codes.length; i < cL; i++) {
	            code = codes[i].toUpperCase();
	            if (!layout.codes.hasOwnProperty(code)) continue;
	            if (!filter) filter = {};
	            filter[code] = code;
	        }
	        layout.codeFilter = filter;
	
	        layout.options = null;
	
	        if (!self.switchLayout(nodes.langbox.value)) {
	
	            self.switchLayout(nodes.langbox.value);
	        }
	    };
	
	    self.getLayoutCodes = function () {
	        var codes = [];
	        for (var i in layout.codes) {
	            if (!layout.codes.hasOwnProperty(i)) continue;
	            codes.push(i);
	        }
	        return codes.heapSort();
	    };
	
	    var _keyClicker_ = function _keyClicker_(key, evt) {
	        var chr = "",
	            ret = false;
	        key = key.replace(idPrefix, "");
	        switch (key) {
	            case KEY.CAPS:
	            case KEY.SHIFT:
	            case "shift_left":
	            case "shift_right":
	            case KEY.ALT:
	            case "alt_left":
	            case "alt_right":
	                return true;
	            case 'backspace':
	
	                if ((0, _helpers.isFunction)(lang.charProcessor) && _documentselection.DocumentSelection.getSelection(nodes.attachedInput).length) {
	                    chr = "\x08";
	                } else if (evt) {
	                    self.IME.hide(true);
	                    return true;
	                } else {
	                    _documentselection.DocumentSelection.deleteAtCursor(nodes.attachedInput, false);
	                    self.IME.hide(true);
	                }
	                break;
	            case 'del':
	                self.IME.hide(true);
	                if (evt) return true;
	                _documentselection.DocumentSelection.deleteAtCursor(nodes.attachedInput, true);
	                break;
	            case 'space':
	                chr = " ";
	                break;
	            case 'tab':
	                chr = "\t";
	                break;
	            case 'enter':
	                chr = "\n";
	                break;
	            default:
	                var el = document.getElementById(idPrefix + key);
	                chr = lang[key][mode];
	                break;
	        }
	        if (chr) {
	
	            if (!(chr = __charProcessor(chr, _documentselection.DocumentSelection.getSelection(nodes.attachedInput)))) return ret;
	
	            try {
	
	                if (chr[1] || chr[0].length > 1 || chr[0].charCodeAt(0) > 0x7fff || nodes.attachedInput.contentDocument || '\t' == chr[0]) {
	                    throw new Error();
	                }
	                var ck = chr[0].charCodeAt(0);
	
	                if ((0, _helpers.isFunction)(document.createEvent)) {
	                    var evt = new KeyboardEvent('keypress', { key: key, char: chr[0], bubbles: true, cancelable: true });
	                    evt.VK_bypass = true;
	
	                    _eventmanager.EM.addOneTimeEventListener(nodes.attachedInput, 'keypress', function (e) {
	                        _documentselection.DocumentSelection.insertAtCursor(nodes.attachedInput, chr[0]);
	
	                        if (chr[1]) {
	                            _documentselection.DocumentSelection.setRange(nodes.attachedInput, -chr[1], 0, true);
	                        }
	                    });
	
	                    nodes.attachedInput.dispatchEvent(evt);
	
	                    var inputEvt = new Event('input', { bubbles: true, cancelable: false, composed: false });
	                    nodes.attachedInput.dispatchEvent(inputEvt);
	                } else {
	                    evt.keyCode = 10 == ck ? 13 : ck;
	                    ret = true;
	                }
	            } catch (e) {
	                console.error(e);
	            }
	        }
	        return ret;
	    };
	
	    var _keydownHandler_ = function _keydownHandler_(e) {
	
	        if (!self.isOpen()) return;
	
	        var newMode = mode;
	
	        var keyCode = e.getKeyCode();
	        switch (e.type) {
	            case 'keydown':
	                switch (keyCode) {
	                    case 37:
	                        if (self.IME.isOpen()) {
	                            self.IME.prevPage(e);
	                            return;
	                        }
	                        break;
	                    case 39:
	                        if (self.IME.isOpen()) {
	                            self.IME.nextPage(e);
	                            return;
	                        }
	                        break;
	                    case 8:
	                    case 9:
	                    case 46:
	                        var el = nodes.desk.childNodes[keymap[keyCode]];
	
	                        if (animate && !e.getRepeat()) _dom.DOM.CSS(el).addClass(cssClasses.buttonDown);
	                        if (!_keyClicker_(el.id, e)) e.preventDefault();
	
	                        break;
	                    case 20:
	                        if (!e.getRepeat()) {
	                            newMode = newMode ^ VK_CAPS;
	                        }
	                        break;
	                    case 27:
	                        if (self.IME.isOpen()) {
	                            self.IME.hide();
	                        } else {
	                            var start = _documentselection.DocumentSelection.getStart(nodes.attachedInput);
	                            _documentselection.DocumentSelection.setRange(nodes.attachedInput, start, start);
	                        }
	                        return false;
	                    default:
	                        if (!e.getRepeat()) {
	                            newMode = newMode | e.shiftKey | e.ctrlKey << 2 | e.altKey << 1;
	                        }
	                        if (keymap.hasOwnProperty(keyCode)) {
	                            if (!(e.altKey ^ e.ctrlKey)) {
	                                var el = nodes.desk.childNodes[keymap[keyCode]];
	                                if (animate) _dom.DOM.CSS(el).addClass(cssClasses.buttonDown);
	
	                                newKeyCode = el.id;
	                            }
	                            if (e.altKey && e.ctrlKey) {
	                                e.preventDefault();
	
	                                if (e.srcElement) {
	                                    _keyClicker_(nodes.desk.childNodes[keymap[keyCode]].id, e);
	                                    newKeyCode = "";
	                                }
	                            }
	                        } else {
	                            self.IME.hide();
	                        }
	                        break;
	                }
	                break;
	            case 'keyup':
	                switch (keyCode) {
	                    case 20:
	                        break;
	                    default:
	                        if (!e.getRepeat()) {
	                            newMode = mode & (VK_ALL ^ (!e.shiftKey | !e.ctrlKey << 2 | !e.altKey << 1));
	                        }
	                        if (animate && keymap.hasOwnProperty(keyCode)) {
	                            _dom.DOM.CSS(nodes.desk.childNodes[keymap[keyCode]]).removeClass(cssClasses.buttonDown);
	                        }
	                }
	                break;
	            case 'keypress':
	
	                if (newKeyCode && !e.VK_bypass) {
	                    if (!_keyClicker_(newKeyCode, e)) {
	                        e.stopPropagation();
	
	                        e.preventDefault();
	                    }
	
	                    newKeyCode = null;
	                }
	                if (!mode ^ VK_ALT_CTRL && (e.altKey || e.ctrlKey)) {
	                    self.IME.hide();
	                }
	                if (0 == keyCode && !newKeyCode && !e.VK_bypass && !e.ctrlKey && !e.altKey && !e.shiftKey) {
	                    e.preventDefault();
	                }
	        }
	
	        if (newMode != mode) {
	            __updateControlKeys(newMode);
	            __updateLayout();
	        }
	    };
	
	    var _btnClick_ = function _btnClick_(e) {
	
	        var el = _dom.DOM.getParent(e.srcElement || e.target, 'a');
	
	        if (!el || el.parentNode.id.indexOf(idPrefix) < 0) return;
	        el = el.parentNode;
	
	        switch (el.id.substring(idPrefix.length)) {
	            case "caps":
	            case "shift_left":
	            case "shift_right":
	            case "alt_left":
	            case "alt_right":
	            case "ctrl_left":
	            case "ctrl_right":
	                return;
	        }
	
	        if (_dom.DOM.CSS(el).hasClass(cssClasses.buttonDown) || !animate) {
	            _keyClicker_(el.id);
	        }
	        if (animate) {
	            _dom.DOM.CSS(el).removeClass(cssClasses.buttonDown);
	        }
	
	        var newMode = mode & (VK_CAPS | e.shiftKey | e.altKey << 1 | e.ctrlKey << 2);
	        if (mode != newMode) {
	            __updateControlKeys(newMode);
	            __updateLayout();
	        }
	    };
	
	    var _btnMousedown_ = function _btnMousedown_(e) {
	
	        var el = _dom.DOM.getParent(e.srcElement || e.target, 'a');
	
	        if (!el || el.parentNode.id.indexOf(idPrefix) < 0) return;
	        el = el.parentNode;
	
	        var newMode = mode;
	
	        var key = el.id.substring(idPrefix.length);
	        switch (key) {
	            case "caps":
	                newMode = newMode ^ VK_CAPS;
	                break;
	            case "shift_left":
	            case "shift_right":
	
	                if (e.shiftKey) break;
	                newMode = newMode ^ VK_SHIFT;
	                break;
	            case "alt_left":
	            case "alt_right":
	            case "ctrl_left":
	            case "ctrl_right":
	                newMode = newMode ^ (e.altKey << 1 ^ VK_ALT) ^ (e.ctrlKey << 2 ^ VK_CTRL);
	                break;
	
	            default:
	                if (animate) _dom.DOM.CSS(el).addClass(cssClasses.buttonDown);
	                break;
	        }
	
	        if (mode != newMode) {
	            __updateControlKeys(newMode);
	            __updateLayout();
	        }
	
	        e.preventDefault();
	        e.stopPropagation();
	    };
	
	    var _btnMouseInOut_ = function _btnMouseInOut_(e) {
	
	        var el = _dom.DOM.getParent(e.srcElement || e.target, 'a'),
	            mtd = { 'mouseover': 2, 'mouseout': 3 };
	
	        if (!el || el.parentNode.id.indexOf(idPrefix) < 0) return;
	        el = el.parentNode;
	
	        if (el.id.indexOf('shift') > -1) {
	
	            __toggleControlKeysState(mtd[e.type], KEY.SHIFT);
	        } else if (el.id.indexOf('alt') > -1 || el.id.indexOf('ctrl') > -1) {
	
	            __toggleControlKeysState(mtd[e.type], KEY.CTRL);
	            __toggleControlKeysState(mtd[e.type], KEY.ALT);
	        } else if (el.id.indexOf('caps') > -1) {
	            __toggleKeyState(mtd[e.type], null, el.id);
	        } else if (animate) {
	            __toggleKeyState(mtd[e.type], null, el.id);
	            if ('mouseout' == e.type.toLowerCase()) {
	
	                __toggleKeyState(0, null, el.id);
	            }
	        }
	        e.preventDefault();
	        e.stopPropagation();
	    };
	
	    var switchMapping = function switchMapping(e) {
	
	        keymap = keymaps[e.target.value];
	    };
	
	    self.attachInput = function (el) {
	
	        if (!el) return nodes.attachedInput;
	        if ((0, _helpers.isString)(el)) el = document.getElementById(el);
	
	        if (el == nodes.attachedInput) return nodes.attachedInput;
	
	        if (!self.switchLayout(options.layout) && !self.switchLayout(nodes.langbox.value)) {
	
	            throw new Error('No layouts available');
	        }
	
	        self.detachInput();
	
	        if (!el || !el.tagName) {
	            nodes.attachedInput = null;
	        } else {
	
	            animate = !_dom.DOM.CSS(el).hasClass(cssClasses.noanim);
	
	            nodes.attachedInput = el;
	
	            __toggleInputDir();
	            if (el.contentWindow) {
	                el = el.contentWindow.document.body.parentNode;
	            }
	            _eventmanager.EM.addEventListener(el, 'keydown', _keydownHandler_);
	            _eventmanager.EM.addEventListener(el, 'keyup', _keydownHandler_);
	            _eventmanager.EM.addEventListener(el, 'keypress', _keydownHandler_);
	            _eventmanager.EM.addEventListener(el, 'mousedown', self.IME.blurHandler);
	        }
	        return nodes.attachedInput;
	    };
	
	    self.detachInput = function () {
	        if (!nodes.attachedInput) return false;
	
	        __toggleInputDir(true);
	
	        self.IME.hide();
	
	        if (nodes.attachedInput) {
	            var oe = nodes.attachedInput;
	            if (oe.contentWindow) {
	                oe = oe.contentWindow.document.body.parentNode;
	            }
	            _eventmanager.EM.removeEventListener(oe, 'keydown', _keydownHandler_);
	            _eventmanager.EM.removeEventListener(oe, 'keypress', _keydownHandler_);
	            _eventmanager.EM.removeEventListener(oe, 'keyup', _keydownHandler_);
	            _eventmanager.EM.removeEventListener(oe, 'mousedown', self.IME.blurHandler);
	        }
	        nodes.attachedInput = null;
	        return true;
	    };
	
	    self.getAttachedInput = function (el) {
	        return nodes.attachedInput;
	    };
	
	    self.open = self.show = function (input, holder, kpTarget) {
	        if (!(input = self.attachInput(nodes.attachedInput || input)) || !nodes.keyboard || !document.body) return false;
	
	        if (!nodes.keyboard.parentNode || nodes.keyboard.parentNode.nodeType == 11) {
	            if ((0, _helpers.isString)(holder)) holder = document.getElementById(holder);
	            if (!holder.appendChild) return false;
	            holder.appendChild(nodes.keyboard);
	
	            if (!(0, _helpers.isUndefined)(kpTarget) && input != kpTarget && kpTarget.appendChild) {
	                _eventmanager.EM.addEventListener(kpTarget, 'keydown', _keydownHandler_);
	                _eventmanager.EM.addEventListener(kpTarget, 'keyup', _keydownHandler_);
	                _eventmanager.EM.addEventListener(kpTarget, 'keypress', _keydownHandler_);
	            }
	        }
	
	        return true;
	    };
	
	    self.close = self.hide = function () {
	        if (!nodes.keyboard || !self.isOpen()) return false;
	        self.detachInput();
	        nodes.keyboard.parentNode.removeChild(nodes.keyboard);
	        return true;
	    };
	
	    self.toggle = function (input, holder, kpTarget) {
	        self.isOpen() ? self.close() : self.show(input, holder, kpTarget);
	    };
	
	    self.isOpen = function () {
	        return !!nodes.keyboard.parentNode && nodes.keyboard.parentNode.nodeType == 1;
	    };
	
	    var __toggleInputDir = function __toggleInputDir(reset) {
	        if (nodes.attachedInput) {
	            var mode = reset ? "" : lang.rtl ? 'rtl' : 'ltr';
	            if (nodes.attachedInput.contentWindow) nodes.attachedInput.contentWindow.document.body.dir = mode;else nodes.attachedInput.dir = mode;
	        }
	    };
	
	    var __buildOptionsList = function __buildOptionsList() {
	        if (null != layout.options) return;
	
	        var s = layout.heapSort(),
	            l,
	            o,
	            n,
	            cc = {};
	        layout.options = {};
	
	        nodes.langbox.innerHTML = "";
	        for (var i = 0, sL = s.length, z = 0; i < sL; i++) {
	            l = layout[i];
	            n = l.code + " " + l.name;
	            layout.hash[n] = i;
	
	            if (layout.codeFilter && !layout.codeFilter.hasOwnProperty(l.code)) continue;
	
	            if (cc.label != l.code) {
	                cc = document.createElement('optgroup');
	                cc.label = l.code;
	                nodes.langbox.appendChild(cc);
	            }
	            o = document.createElement('option');
	            o.value = n;
	            o.appendChild(document.createTextNode(l.name));
	            o.label = l.name;
	            cc.appendChild(o);
	
	            layout.options[n] = z++;
	        }
	    };
	
	    var __doParse = function __doParse(s) {
	        if ((0, _helpers.isString)(s)) return s.match(/\x01.+?\x01|[\ud800-\udbff][\udc00-\udfff]|./g).map(function (a) {
	            return a.replace(/[\x01\x02]/g, "");
	        });else return s.map(function (a) {
	            return (0, _helpers.isArray)(a) ? a.map(function (s) {
	                String.fromCharCodeExt(s);
	            }).join("") : String.fromCharCodeExt(a).replace(/[\x01\x02]/g, "");
	        });
	    };
	
	    var __prepareLayout = function __prepareLayout(l) {
	
	        var alpha = l.normal,
	            shift = l.shift || {},
	            alt = l.alt || {},
	            shift_alt = l.shift_alt || {},
	            caps = l.caps || {},
	            shift_caps = l.shift_caps || {},
	            dk = l.dk,
	            cbk = l.cbk,
	            cs,
	            ca,
	            csa,
	            cc,
	            csc = null,
	            ics,
	            ica,
	            icsa,
	            icc,
	            icsc = -1,
	            lt = [];
	
	        lt.name = l.name;
	        lt.code = l.code;
	        lt.toString = l.toString;
	
	        for (var i = 0, aL = alpha.length; i < aL; i++) {
	            var char_normal = alpha[i],
	                char_alt = null,
	                char_caps = null,
	                char_shift = null,
	                char = [char_normal];
	
	            if (shift.hasOwnProperty(i)) {
	                cs = __doParse(shift[i]);
	                ics = i;
	            }
	            if (ics > -1 && cs[i - ics]) {
	                char_shift = cs[i - ics];
	                char[VK_SHIFT] = char_shift;
	            } else if (char_normal && char_normal != (char_normal = char_normal.toUpperCase())) {
	                char[VK_SHIFT] = char_normal;
	                char_shift = char_normal;
	            }
	
	            if (alt.hasOwnProperty(i)) {
	                ca = __doParse(alt[i]);
	                ica = i;
	            }
	            if (ica > -1 && ca[i - ica]) {
	                char_alt = ca[i - ica];
	                char[VK_ALT_CTRL] = char_alt;
	            }
	
	            if (shift_alt.hasOwnProperty(i)) {
	                csa = __doParse(shift_alt[i]);
	                icsa = i;
	            }
	            if (icsa > -1 && csa[i - icsa]) {
	                char[VK_SHIFT_ALT_CTRL] = csa[i - icsa];
	            } else if (char_alt && char_alt != (char_alt = char_alt.toUpperCase())) {
	                char[VK_SHIFT_ALT_CTRL] = char_alt;
	            }
	
	            if (caps.hasOwnProperty(i)) {
	                cc = __doParse(caps[i]);
	                icc = i;
	            }
	            if (icc > -1 && cc[i - icc]) {
	                char_caps = cc[i - icc];
	            }
	            if (char_caps) {
	                char[VK_CAPS] = char_caps;
	            } else if (char_shift && char_shift.toUpperCase() != char_shift.toLowerCase()) {
	                char[VK_CAPS] = char_shift;
	            } else if (char_normal) {
	                char[VK_CAPS] = char_normal.toUpperCase();
	            }
	
	            if (shift_caps.hasOwnProperty(i)) {
	                csc = __doParse(shift_caps[i]);
	                icsc = i;
	            }
	            if (icsc > -1 && csc[i - icsc]) {
	                char[VK_SHIFT_CAPS] = csc[i - icsc];
	            } else if (char_shift) {
	                char[VK_SHIFT_CAPS] = char_shift.toLowerCase();
	            } else if (char_normal) {
	                char[VK_SHIFT_CAPS] = char_normal;
	            }
	
	            lt[i] = char;
	        }
	
	        if (dk) {
	            lt.dk = {};
	            for (var i in dk) {
	                if (dk.hasOwnProperty(i)) {
	                    var key = i;
	                    if (parseInt(i) && i > 9) {
	                        key = String.fromCharCode(i);
	                    }
	
	                    lt.dk[key] = __doParse(dk[i]).join("").replace(key, key + key);
	                }
	            }
	        }
	
	        lt.rtl = !!lt.join("").match(/[\u05b0-\u06ff]/);
	
	        lt.domain = l.domain;
	
	        if ((0, _helpers.isFunction)(cbk)) {
	            lt.charProcessor = cbk;
	        } else if (cbk) {
	            lt.activate = cbk.activate;
	            lt.charProcessor = cbk.charProcessor;
	        }
	        return lt;
	    };
	
	    var __updateLayout = function __updateLayout() {
	        var ca = [];
	        ca[VK_NORMAL] = cssClasses.modeNormal;
	        ca[VK_SHIFT] = cssClasses.modeShift;
	        ca[VK_ALT_CTRL] = cssClasses.modeAlt;
	        ca[VK_SHIFT_ALT_CTRL] = cssClasses.modeShiftAlt;
	        ca[VK_CAPS] = cssClasses.modeCaps;
	        ca[VK_SHIFT_CAPS] = cssClasses.modeShiftCaps;
	
	        ca[VK_ALT] = cssClasses.modeNormal;
	        ca[VK_CTRL] = cssClasses.modeNormal;
	        ca[VK_ALT_SHIFT] = cssClasses.modeShift;
	        ca[VK_CTRL_SHIFT] = cssClasses.modeShift;
	        ca[VK_ALT_CAPS] = cssClasses.modeCaps;
	        ca[VK_CTRL_CAPS] = cssClasses.modeCaps;
	
	        ca[VK_ALT_CTRL_CAPS] = cssClasses.modeShiftAltCaps;
	        ca[VK_ALL] = cssClasses.modeShiftAltCaps;
	
	        _dom.DOM.CSS(nodes.desk).removeClass(ca).addClass(ca[mode]);
	    };
	
	    var __updateControlKeys = function __updateControlKeys(newMode) {
	
	        var changes = mode ^ newMode;
	        if (changes & VK_SHIFT) {
	            __toggleControlKeysState(!!(newMode & VK_SHIFT), KEY.SHIFT);
	        }
	        if (changes & VK_ALT) {
	            __toggleControlKeysState(!!(newMode & VK_ALT), KEY.ALT);
	        }
	        if (changes & VK_CTRL) {
	            __toggleControlKeysState(!!(newMode & VK_CTRL), KEY.CTRL);
	        }
	        if (changes & VK_CAPS) {
	            __toggleKeyState(!!(newMode & VK_CAPS), KEY.CAPS);
	        }
	        mode = newMode;
	    };
	
	    var __toggleControlKeysState = function __toggleControlKeysState(state, prefix) {
	        var s1 = document.getElementById(idPrefix + prefix + '_left'),
	            s2 = document.getElementById(idPrefix + prefix + '_right');
	        switch (0 + state) {
	            case 0:
	                s1.className = _dom.DOM.CSS(s2).removeClass(cssClasses.buttonDown).getClass();
	                break;
	            case 1:
	                _dom.DOM.CSS(nodes.desk).removeClass([cssClasses.hoverShift, cssClasses.hoverAlt]);
	                s1.className = _dom.DOM.CSS(s2).addClass(cssClasses.buttonDown).getClass();
	                break;
	            case 2:
	                if (KEY.SHIFT == prefix && mode & VK_SHIFT ^ VK_SHIFT) {
	                    _dom.DOM.CSS(nodes.desk).addClass(cssClasses.hoverShift);
	                } else if (KEY.ALT == prefix && mode ^ VK_ALT_CTRL) {
	                    _dom.DOM.CSS(nodes.desk).addClass(cssClasses.hoverAlt);
	                }
	                s1.className = _dom.DOM.CSS(s2).addClass(cssClasses.buttonHover).getClass();
	                break;
	            case 3:
	                if (KEY.SHIFT == prefix) {
	                    _dom.DOM.CSS(nodes.desk).removeClass(cssClasses.hoverShift);
	                } else if (KEY.ALT == prefix) {
	                    _dom.DOM.CSS(nodes.desk).removeClass(cssClasses.hoverAlt);
	                }
	                s1.className = _dom.DOM.CSS(s2).removeClass(cssClasses.buttonHover).getClass();
	                break;
	        }
	    };
	
	    var __toggleKeyState = function __toggleKeyState(state, suffix, name) {
	        var s = document.getElementById(suffix ? idPrefix + suffix : name);
	        if (s) {
	            switch (0 + state) {
	                case 0:
	                    _dom.DOM.CSS(s).removeClass(cssClasses.buttonDown);
	                    break;
	                case 1:
	                    _dom.DOM.CSS(s).addClass(cssClasses.buttonDown);
	                    break;
	                case 2:
	                    _dom.DOM.CSS(s).addClass(cssClasses.buttonHover);
	                    break;
	                case 3:
	                    _dom.DOM.CSS(s).removeClass(cssClasses.buttonHover);
	                    break;
	            }
	        }
	    };
	
	    var __charProcessor = function __charProcessor(tchr, buf) {
	        var res = [tchr, 0];
	        if ((0, _helpers.isFunction)(lang.charProcessor)) {
	
	            res = lang.charProcessor(tchr, buf);
	        } else if (tchr == "\x08") {
	            res = ['', 0];
	        } else if (lang.dk && buf.length <= 1) {
	
	            if (lang.dk.hasOwnProperty(buf)) {
	
	                res[1] = 0;
	                var dks = lang.dk[buf],
	                    idx = dks.indexOf(tchr) + 1;
	                res[0] = idx ? dks.charAt(idx) : tchr;
	            } else if (lang.dk.hasOwnProperty(tchr)) {
	
	                res[1] = 1;
	                res[0] = tchr;
	            }
	        }
	        return res;
	    };
	
	    var __getKeyboardHtml = function __getKeyboardHtml(lang) {
	        var inp = document.createElement('span');
	
	        document.body.appendChild(inp);
	        inp.style.position = 'absolute';
	        inp.style.left = '-1000px';
	
	        for (var i = 0, aL = lang.length, btns = [], chr, title; i < aL; i++) {
	            chr = lang[i];
	            btns.push(["<div id='", idPrefix, i, "' class='", cssClasses.buttonUp, "'><a>", __getCharHtmlForKey(lang, chr, VK_NORMAL, cssClasses.charNormal, inp), __getCharHtmlForKey(lang, chr, VK_SHIFT, cssClasses.charShift, inp), __getCharHtmlForKey(lang, chr, VK_ALT_CTRL, cssClasses.charAlt, inp), __getCharHtmlForKey(lang, chr, VK_SHIFT_ALT_CTRL, cssClasses.charShiftAlt, inp), __getCharHtmlForKey(lang, chr, VK_CAPS, cssClasses.charCaps, inp), __getCharHtmlForKey(lang, chr, VK_SHIFT_CAPS, cssClasses.charShiftCaps, inp), "</a></div>"].join(""));
	        }
	        for (var i in controlKeys) {
	            if (controlKeys.hasOwnProperty(i)) {
	                chr = controlKeys[i];
	                title = chr.replace(/_.+/, '');
	                btns.splice(i, 0, ["<div id='", idPrefix, chr, "' class='", cssClasses.buttonUp, "'><a title='", title, "'", "><span class='title'>", title, "</span>", "</a></div>"].join(""));
	            }
	        }
	        document.body.removeChild(inp);
	        return btns.join("").replace(/(<\w+)/g, "$1 unselectable='on' ");
	    };
	
	    var __getCharHtmlForKey = function __getCharHtmlForKey(lyt, chr, mode, css, inp) {
	        var html = [],
	            dk = lyt.dk && lyt.dk.hasOwnProperty(chr[mode]),
	            char = chr[mode] || "";
	
	        if (dk) css += " " + cssClasses.deadkey;
	
	        if (mode == VK_SHIFT_CAPS && chr[VK_CAPS] && char.toLowerCase() == chr[VK_CAPS].toLowerCase() || mode == VK_CAPS && chr[VK_SHIFT_CAPS] && char.toLowerCase() == chr[VK_SHIFT_CAPS].toLowerCase()) {
	            css += " " + cssClasses.hiddenCaps;
	        }
	        if (mode == VK_SHIFT && chr[VK_NORMAL] && char.toLowerCase() == chr[VK_NORMAL].toLowerCase() || mode == VK_NORMAL && chr[VK_SHIFT] && char.toLowerCase() == chr[VK_SHIFT].toLowerCase()) {
	            css += " " + cssClasses.hiddenShift;
	        }
	        if (mode == VK_SHIFT && chr[VK_SHIFT_CAPS] && char.toLowerCase() == chr[VK_SHIFT_CAPS].toLowerCase() || mode == VK_SHIFT_CAPS && chr[VK_SHIFT] && char.toLowerCase() == chr[VK_SHIFT].toLowerCase()) {
	            css += " " + cssClasses.hiddenShiftCaps;
	        }
	        if (mode == VK_CAPS && chr[VK_NORMAL] && char.toLowerCase() == chr[VK_NORMAL].toLowerCase() || mode == VK_NORMAL && chr[VK_CAPS] && char.toLowerCase() == chr[VK_CAPS].toLowerCase()) {
	            css += " " + cssClasses.hiddenCaps;
	        }
	        if (mode == VK_SHIFT_ALT_CTRL && chr[VK_ALT_CTRL] && char.toLowerCase() == chr[VK_ALT_CTRL].toLowerCase() || mode == VK_ALT_CTRL && chr[VK_SHIFT] && char.toLowerCase() == chr[VK_SHIFT].toLowerCase()) {
	            css += " " + cssClasses.hiddenAlt;
	        }
	
	        html.push("<span");
	        if (css) {
	            html.push(" class=\"" + css + "\"");
	        }
	        html.push(" >\xa0" + char + "\xa0</span>");
	        return html.join("");
	    };
	
	    var _initialized = false;
	    self.init = function (opts) {
	        console.log(_initialized);
	        if (_initialized) return;
	        var _opts = (0, _helpers.mergeObject)(options, opts);
	
	        nodes.keyboard = document.createElement('div');
	        nodes.keyboard.unselectable = "on";
	        nodes.keyboard.id = 'virtualKeyboard';
	        nodes.keyboard.innerHTML = ('<div id=\"kbDesk\"><!-- --></div>' + '<select id=\"kb_langselector\" ' + (_opts.showKeyboardLayouts ? '' : 'style=\"display: none;\"') + '></select>' + '<select id=\"kb_mappingselector\" ' + (_opts.showKeyboardMaps ? '' : 'style=\"display: none;\"') + '></select>').replace(/(<\w+)/g, "$1 unselectable='on' ");
	
	        nodes.desk = nodes.keyboard.firstChild;
	
	        var el = nodes.keyboard.childNodes.item(1);
	        _eventmanager.EM.addEventListener(el, 'change', function (e) {
	            self.switchLayout(this.value);
	        });
	        nodes.langbox = el;
	
	        var el = el.nextSibling,
	            mapGroup = "";
	
	        if (!keymaps.hasOwnProperty(keymap)) keymap = 'QWERTY Standard';
	
	        for (var i in keymaps) {
	            var map = keymaps[i].split("").map(function (c) {
	                return c.charCodeAt(0);
	            });
	
	            map.splice(14, 0, 8, 9);
	            map.splice(28, 0, 13, 20);
	            map.splice(41, 0, 16);
	            map.splice(52, 0, 16, 46, 17, 18, 32, 18, 17);
	
	            var tk = map;
	            map = [];
	            for (var z = 0, kL = tk.length; z < kL; z++) {
	                map[tk[z]] = z;
	            }
	            keymaps[i] = map;
	
	            tk = i.split(" ", 2);
	            if (mapGroup.indexOf(mapGroup = tk[0]) != 0) {
	                el.appendChild(document.createElement('optgroup'));
	                el.lastChild.label = mapGroup;
	            }
	            map = document.createElement('option');
	            el.lastChild.appendChild(map);
	            map.value = i;
	            map.innerHTML = tk[1];
	            map.selected = i == keymap;
	        }
	        keymap = keymaps[keymap];
	        _eventmanager.EM.addEventListener(el, 'change', switchMapping);
	
	        _eventmanager.EM.addEventListener(nodes.desk, 'mousedown', _btnMousedown_);
	        _eventmanager.EM.addEventListener(nodes.desk, 'mouseup', _btnClick_);
	        _eventmanager.EM.addEventListener(nodes.desk, 'mouseover', _btnMouseInOut_);
	        _eventmanager.EM.addEventListener(nodes.desk, 'mouseout', _btnMouseInOut_);
	        _eventmanager.EM.addEventListener(nodes.desk, 'click', _eventmanager.EM.preventDefaultAction);
	
	        nodes.keyboard.onmousedown = function (e) {
	            if (!e || !e.target.tagName || 'select' != e.target.tagName.toLowerCase()) return false;
	        };
	
	        options.layout = _opts.layout;
	
	        _initialized = true;
	    };
	}();
	
	VirtualKeyboard.Langs = {};
	
	VirtualKeyboard.IME = _ime.IME;
	
	(function ($) {
	    $.fn.virtkeys = function (opts) {
	        var jqObj = this;
	
	        (function () {
	            VirtualKeyboard.init(opts || {});
	
	            jqObj.VirtualKeyboard = VirtualKeyboard;
	
	            jqObj.open = _open;
	            jqObj.close = _close;
	            jqObj.toggle = _toggle;
	
	            jqObj.getLayoutCodes = _getLayoutCodes;
	            jqObj.switchLayout = _switchLayout;
	            jqObj.addLayouts = _addLayouts;
	            jqObj.getLoadedLayouts = _getLoadedLayouts;
	
	            jqObj.addIMELanguages = _addIMELanguages;
	        })();
	
	        function _open(input) {
	            VirtualKeyboard.open(input instanceof $ ? input.get(0) : input, this.get(0));
	        }
	
	        function _close() {
	            VirtualKeyboard.close();
	        }
	
	        function _toggle(input) {
	            VirtualKeyboard.toggle(input instanceof $ ? input.get(0) : input, this.get(0));
	        }
	
	        function _getLayoutCodes() {
	            return VirtualKeyboard.getLayoutCodes();
	        }
	
	        function _switchLayout(code) {
	            return VirtualKeyboard.switchLayout(code);
	        }
	
	        function _addLayouts(layouts) {
	            for (var i = 0, aL = layouts.length; i < aL; i++) {
	                VirtualKeyboard.addLayout(layouts[i]);
	            }
	        }
	
	        function _getLoadedLayouts() {
	            return $.fn.virtkeys._layouts;
	        }
	
	        function _addIMELanguages(langs) {
	            if (langs === undefined && (langs = $.fn.virtkeys._langs) === undefined) throw 'Object containing IME languages cannot be found.';
	
	            VirtualKeyboard.Langs = langs;
	        }
	
	        return jqObj;
	    };
	
	    $.fn.virtkeys._layouts = {};
	})(jQuery);

/***/ },
/* 1 */
/*!***********************************!*\
  !*** ./src/extensions/helpers.js ***!
  \***********************************/
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	
	function isUndefined(prop) {
	    return typeof prop == 'undefined';
	}
	
	function isFunction(prop) {
	    return typeof prop == 'function';
	}
	
	function isString(prop) {
	    return typeof prop == 'string';
	}
	
	function isNumber(prop) {
	    return typeof prop == 'number';
	}
	
	function isNumeric(prop) {
	    return (isNumber(prop) || isString(prop)) && !isNaN(parseInt(prop)) && isFinite(parseInt(prop));
	}
	
	function isArray(prop) {
	    return prop instanceof Array;
	}
	
	function isRegExp(prop) {
	    return prop instanceof RegExp;
	}
	
	function isBoolean(prop) {
	    return 'boolean' == typeof prop;
	}
	
	function isScalar(prop) {
	    return isNumeric(prop) || isString(prop) || isBoolean(prop);
	}
	
	function isEmpty(prop) {
	    if (isBoolean(prop)) return false;
	    if (isRegExp(prop) && new RegExp("").toString() == prop.toString()) return true;
	    if (isString(prop) || isNumber(prop)) return !prop;
	    if (Boolean(prop) && false != prop) {
	        for (var i in prop) {
	            if (prop.hasOwnProperty(i)) return false;
	        }
	    }
	    return true;
	}
	
	function gluePath() {
	
	    throw 'Commented out because of UglifyJsPlugin and RemoveCommentsLoader';
	}
	
	function findPath(sname) {
	    var h = document.getElementsByTagName('html')[0].innerHTML,
	        sr = new RegExp('<scr' + 'ipt[^>]+?src\s*=\s*["\']?([^>]+?/)' + sname + '[^>]*>.?</scr' + 'ipt>', 'i'),
	        m = h.match(sr);
	    if (m) {
	
	        if (m[1].match(/^((https?|file)\:\/{2,}|\w:[\\])/)) return m[1];
	
	        if (m[1].indexOf("/") == 0) return m[1];
	        b = document.getElementsByTagName('base');
	        if (b[0] && b[0].href) return b[0].href + m[1];
	
	        return (document.location.href.match(/(.*[\/\\])/)[0] + m[1]).replace(/^\/+/, "");
	    }
	    return null;
	}
	
	function getScriptQuery(sname) {
	    var h = document.getElementsByTagName('html')[0].innerHTML,
	        sr = new RegExp('<scr' + 'ipt[^>]+?src\s*[^>]+?/' + sname + '([^#"\']*).+?</scr' + 'ipt>', 'i'),
	        m = h.match(sr);
	    if (m) return parseQuery(m[1].replace(/^[^?]*\?([^#]+)/, "$1"));
	    return {};
	}
	
	function parseQuery(q) {
	    if ('string' != typeof q || q.length < 2) return {};
	    q = q.split(/&amp;|&/g);
	    for (var z = 0, qL = q.length, rs = {}, kv, rkv; z < qL; z++) {
	        kv = q[z].split("=");
	
	        kv[0] = kv[0].replace(/[{}\[\]]*$/, "");
	        rkv = rs[kv[0]];
	
	        kv[1] = unescape(kv[1] ? kv[1].replace("+", " ") : "");
	        if (rkv) {
	            if ('array' == typeof rkv) rs[kv[0]][rs[kv[0]].length] = kv[1];else rs[kv[0]] = [rs[kv[0]], kv[1]];
	        } else rs[kv[0]] = kv[1];
	    }
	    return rs;
	}
	
	function table2array(id, ci, section, subsection) {
	    if (isString(id)) id = document.getElementById(id);
	    if (!id || !DOM.hasTagName(id, ['table', 'tbody,', 'thead', 'tfoot'])) return null;
	    if (!isEmpty(section) && (!isString(section) || !(id = id.getElementsByTagName(section)))) return null;
	    if (!isEmpty(subsection) && (!isNumber(subsection) || subsection < 0 || !(id = id[subsection]))) return null;
	
	    if (isUndefined(id.rows)) return null;
	    var res = [],
	        span = document.createElement('span'),
	        ts = null,
	        ce = null;
	    for (var i = 0, rL = id.rows.length; i < rL; i++) {
	        var tr = [];
	        if (isArray(ci)) {
	            for (var z = 0, cL = ci.length; z < cL; z++) {
	                ce = id.rows[i].cells[ci[z]];
	                if (ce) {
	                    span.innerHTML = ce.innerText ? ce.innerText : ce.innerHTML.replace(/<script\s+(.|\r?\n)*?<\/script>|<[^>]*>/g, "");
	                    span.normalize();
	                    tr[tr.length] = span.firstChild ? span.firstChild.nodeValue.trim(" \xA0") : "";
	                } else {
	                    tr[tr.length] = "";
	                }
	            }
	        } else {
	            for (var z = 0, tL = id.rows[i].cells.length; z < tL; z++) {
	                cd = id.rows[i].cells[z];
	                span.innerHTML = ce.innerText ? ce.innerText : ce.innerHTML.replace(/<script\s+(.|\r?\n)*?<\/script>|<[^>]*>/g, "");
	                span.normalize();
	                tr[tr.length] = span.firstChild ? span.firstChild.nodeValue.trim(" \xA0") : "";
	            }
	        }
	        if (!isEmpty(tr)) res[res.length] = tr;
	    }
	    return res;
	}
	
	document.createElementExt = function (tag, p) {
	    var L,
	        i,
	        k,
	        el = document.createElement(tag);
	    if (!el) return null;
	    for (i in p) {
	        if (!p.hasOwnProperty(i)) continue;
	        switch (i) {
	            case "class":
	                el.setAttribute('className', p[i]);el.setAttribute('class', p[i]);break;
	            case "style":
	                for (k in p[i]) {
	                    if (!p[i].hasOwnProperty(k)) continue;el.style[k] = p[i][k];
	                }break;
	            case "event":
	                for (k in p[i]) {
	                    if (!p[i].hasOwnProperty(k)) continue;el.attachEvent(k, p[i][k]);
	                }break;
	            case "child":
	                L = p[i].length;for (k = 0; k < L; k++) {
	                    el.appendChild(p[i][k]);
	                }break;
	            case "param":
	                for (k in p[i]) {
	                    if (!p[i].hasOwnProperty(k)) continue;try {
	                        el[k] = p[i][k];
	                    } catch (e) {}
	                }break;
	        }
	    }
	    return el;
	};
	
	function playInterval(f, i, o) {
	    return setInterval(function () {
	        o instanceof Array ? f.apply(this, o) : f.call(this, o);
	    }, i);
	}
	function playTimeout(f, i, o) {
	    return setTimeout(function () {
	        o instanceof Array ? f.apply(this, o) : f.call(this, o);
	    }, i);
	}
	
	function cloneObject(obj) {
	    if (isScalar(obj) || isFunction(obj) || null == obj) return obj;
	    try {
	        var newObject = new obj.constructor();
	    } catch (e) {
	        return null;
	    }
	    if (isArray(newObject)) {
	        for (var i = 0, oL = obj.length; i < oL; i++) {
	            newObject[i] = cloneObject(obj[i]);
	        }
	    } else {
	        for (var i in obj) {
	            if (!obj.hasOwnProperty(i)) continue;
	            newObject[i] = cloneObject(obj[i]);
	        }
	    }
	    return newObject;
	}
	
	function mergeObject() {
	    var res = {},
	        oi,
	        obj;
	    for (var z = 0, aL = arguments.length; z < aL; z++) {
	        obj = arguments[z];
	        for (var i in obj) {
	            if (!obj.hasOwnProperty(i)) continue;
	            oi = obj[i];
	            if (null == oi) {
	                if (!res.hasOwnProperty(i)) res[i] = oi;
	            } else if (isArray(oi)) {
	                if (isArray(res[i])) res[i] = res[i].concat(oi).unique();else res[i] = oi.slice(0);
	            } else if (isScalar(oi) || isFunction(oi)) {
	                res[i] = oi;
	            } else {
	                if (res.hasOwnProperty(i)) res[i] = mergeObject(res[i], oi);else res[i] = cloneObject(oi);
	            }
	        }
	    }
	    return res;
	}
	
	function loadStyleSheet(sn) {
	    if (!hasStyleSheet(sn)) {
	        var head = document.getElementsByTagName('head')[0],
	            link = document.createElement('link');
	        link.rel = 'stylesheet';
	        link.type = 'text/css';
	        link.href = sn;
	        head.appendChild(link);
	    }
	}
	
	function hasStyleSheet(path) {
	    var h = document.getElementsByTagName('html')[0].innerHTML,
	        sr = new RegExp('<link[^>]+?src\s*=\s*["\']?([^>]+?/)' + sn + '[^>]*>', 'i');
	    return sr.test(h);
	}
	
	exports.isUndefined = isUndefined;
	exports.isFunction = isFunction;
	exports.isString = isString;
	exports.isNumber = isNumber;
	exports.isNumeric = isNumeric;
	exports.isArray = isArray;
	exports.isRegExp = isRegExp;
	exports.isBoolean = isBoolean;
	exports.isScalar = isScalar;
	exports.isEmpty = isEmpty;
	exports.gluePath = gluePath;
	exports.findPath = findPath;
	exports.getScriptQuery = getScriptQuery;
	exports.parseQuery = parseQuery;
	exports.table2array = table2array;
	exports.playInterval = playInterval;
	exports.playTimeout = playTimeout;
	exports.cloneObject = cloneObject;
	exports.mergeObject = mergeObject;
	exports.loadStyleSheet = loadStyleSheet;
	exports.hasStyleSheet = hasStyleSheet;

/***/ },
/* 2 */
/*!*************************************!*\
  !*** ./src/extensions/ext/array.js ***!
  \*************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _helpers = __webpack_require__(/*! ./../helpers */ 1);
	
	if ((0, _helpers.isUndefined)(Array.prototype.copy)) {
	    Array.prototype.copy = function () {
	        var copy = new Array();
	        for (var i = 0, tL = this.length; i < tL; i++) {
	            copy[i] = this[i];
	        }
	        return copy;
	    };
	}
	
	if ((0, _helpers.isUndefined)(Array.prototype.unique)) {
	
	    Array.prototype.unique = function () {
	        var tmp = [];
	        for (var i = 0, tL = this.length; i < tL; i++) {
	            if (tmp.indexOf(this[i]) < 0) tmp[tmp.length] = this[i];
	        }
	        return tmp;
	    };
	}
	
	if ((0, _helpers.isUndefined)(Array.prototype.flatten)) {
	
	    Array.prototype.flatten = function (cols, cd) {
	        if (this.length < 1) return [];
	        if (isNumeric(cols)) cols = [cols];
	        var idx = false;
	        if (isArray(cols)) {
	            idx = {};
	            for (var i = 0, cL = cols.length; i < cL; i++) {
	                idx[cols[i]] = true;
	            }
	        }
	        var tmp = [];
	        for (var i = 0, tL = this.length; i < tL; i++) {
	            if ((0, _helpers.isUndefined)(this[i])) continue;
	            if (!isArray(this[i])) {
	                if (false === idx) tmp[tmp.length] = this[i];
	            } else {
	                for (var k = 0, cL = this[i].length; k < cL; k++) {
	                    if (false === idx || idx.hasOwnProperty(k)) tmp[tmp.length] = this[i][k];
	                }
	            }
	        }
	        return tmp;
	    };
	}
	
	if ((0, _helpers.isUndefined)(Array.prototype.binSearch)) {
	
	    Array.prototype.binSearch = function (el, key) {
	        var l = 0,
	            r = this.length,
	            len = Math.max(r - 1, 0),
	            c = Math.ceil(r / 2),
	            cnt = 0;
	        if (null != key) while ((!this[c] || el != this[c][key]) && r >= l) {
	            if (this[c] && el > this[c][key]) l = c + 1;else r = c - 1;
	            c = Math.max(0, Math.ceil((r + l) / 2));
	        } else while (el != this[c] && r >= l) {
	            if (el > this[c]) l = c + 1;else r = c - 1;
	            c = Math.max(0, Math.ceil((r + l) / 2));
	        }
	        return c;
	    };
	}
	
	Array.prototype.heapSort = function () {
	
	    var sift = function sift(arr, low, up) {
	        var c,
	            tmp = arr[low];
	
	        while (true) {
	            c = (low << 1) + 1;
	            if (c > up) break;
	            if (c < up && arr[c + 1] > arr[c]) c++;
	            if (tmp >= arr[c]) break;
	            arr[low] = arr[c];
	            low = c;
	        }
	        arr[low] = tmp;
	    },
	        tmp,
	        maximal = this.length - 1,
	        i = maximal >> 1;
	
	    while (i >= 0) {
	        sift(this, i--, maximal);
	    }i = maximal;
	    while (i > 0) {
	
	        tmp = this[0];
	        this[0] = this[i];
	        this[i] = tmp;
	        sift(this, 0, --i);
	    }
	    return this;
	};
	
	if ((0, _helpers.isUndefined)(Array.range)) {
	
	    Array.range = function (end, start, inc) {
	        if (!isNumber(end)) return null;
	        if (!isNumber(inc)) inc = 1;
	        if (!isNumber(start)) start = 0;
	        var tmp = [],
	            mn = Math.min(start, end),
	            mx = Math.max(start, end),
	            i = Math.abs(inc),
	            cnt = -1;
	        do {
	            cnt++;
	            tmp[cnt] = mn;
	            mn += i;
	        } while (mn <= mx);
	        return inc > 0 ? tmp : tmp.reverse();
	    };
	}

/***/ },
/* 3 */
/*!**************************************!*\
  !*** ./src/extensions/ext/object.js ***!
  \**************************************/
/***/ function(module, exports) {

	'use strict';
	
	if ('undefined' == typeof Object.hasOwnProperty) {
	  Object.prototype.hasOwnProperty = function (prop) {
	    return !('undefined' == typeof this[prop] || this.constructor && this.constructor.prototype[prop] && this[prop] === this.constructor.prototype[prop]);
	  };
	}

/***/ },
/* 4 */
/*!**************************************!*\
  !*** ./src/extensions/ext/regexp.js ***!
  \**************************************/
/***/ function(module, exports) {

	'use strict';
	
	RegExp.escape = function escape(text) {
	  if (!escape.sRE) {
	    var specials = ['/', '.', '*', '+', '?', '|', '(', ')', '[', ']', '{', '}', '$', '^', '\\'];
	    escape.sRE = new RegExp('(\\' + specials.join('|\\') + ')', 'g');
	  }
	  return isString(text) ? text.replace(escape.sRE, '\\$1') : isArray(text) ? text.map(RegExp.escape).join("|") : "";
	};

/***/ },
/* 5 */
/*!**************************************!*\
  !*** ./src/extensions/ext/string.js ***!
  \**************************************/
/***/ function(module, exports) {

	"use strict";
	
	String.fromCharCodeExt = function (code) {
	    if (code < 0x10000) {
	        return String.fromCharCode(code);
	    }
	    code -= 0x10000;
	    return String.fromCharCode(code >> 10 | 0xD800) + String.fromCharCode(code & 0x3FF | 0xDC00);
	};
	
	String.prototype.entityDecode = function entityDecode() {
	    if (!entityDecode.span) entityDecode.span = document.createElement('span');
	    var s = entityDecode.span;
	    s.innerHTML = this;
	    return s.firstChild ? s.firstChild.nodeValue : "";
	};
	
	String.prototype.ltrim = function (c) {
	    if (isString(c)) c = c.split("");
	    if (isArray(c) || isUndefined(c)) {
	        c = isEmpty(c) ? "\\s" : RegExp.escape(c);
	        c = new RegExp("^(?:" + c + ")+", "g");
	        return this.replace(c, "");
	    }
	    return this;
	};
	
	String.prototype.rtrim = function (c) {
	    if (isString(c)) c = c.split("");
	    if (isArray(c) || isUndefined(c)) {
	        c = isEmpty(c) ? "\\s" : RegExp.escape(c);
	        c = new RegExp("(?:" + c + ")+$", "g");
	        return this.replace(c, "");
	    }
	    return this;
	};
	
	String.prototype.dup = function () {
	    var val = this.valueOf();
	    return [val, val].join("");
	};
	
	String.prototype.repeat = function (n) {
	    if (isNaN(n = parseInt(n)) || n < 0) return "";
	    return Array(n + 1).join(this.valueOf());
	};
	
	String.prototype.padding = function (n, c) {
	    var val = this.valueOf();
	    n = parseInt(n);
	    if (!n) return val;
	    if (isUndefined(c)) c = " ";
	    var pad = String(c).charAt(0).repeat(Math.abs(n) - this.length);
	    return n < 0 ? pad + val : val + pad;
	};
	
	String.prototype.padLeft = function (n, c) {
	    return this.padding(-Math.abs(n), c);
	};
	
	String.prototype.padRight = function (n, c) {
	    return this.padding(Math.abs(n), c);
	};
	
	String.prototype.sprintf = function () {
	    var args = isArray(arguments[0]) ? arguments[0] : arguments,
	        index = 0,
	        frmt = this.replace(/%%/g, "\0\0"),
	        re = /%((?:\d+\$)?)((?:[-0+# ])?)((?:\d+|\*(?:\d+\$)?)?)((?:.(?:\d+|\*(?:\d+\$)?))?)([bcdeEfosuxX])/g;
	
	    frmt = frmt.replace(re, function () {
	        var x = arguments,
	            sign = false,
	            ins;
	
	        if (!isUndefined(x[3]) && x[3].indexOf("*") == 0) {
	            x[3] = parseInt(x[3].replace(/\D/g, ""));
	            if (isNaN(x[3])) {
	                x[3] = args[index];
	
	                index++;
	            } else {
	                x[3] = args[x[3]];
	            }
	        }
	
	        if ("" != x[4]) {
	            if (x[4].indexOf("*") == 1) {
	                x[4] = parseInt(x[4].replace(/\D/g, ""));
	                if (isNaN(x[4])) {
	                    x[4] = args[index];
	
	                    index++;
	                } else {
	                    x[4] = args[x[4]];
	                }
	            } else {
	                x[4] = x[4].replace(/\D/, "");
	            }
	            x[4] = Math.abs(x[4]);
	        }
	
	        x[1] = parseInt(x[1]);
	        var ins;
	        if (isNumeric(x[1])) {
	            ins = args[x[1]];
	        } else {
	            ins = args[index];
	
	            index++;
	        }
	        switch (x[5]) {
	            case "b":
	                if (ins < 0) ins = 0x10000000000000000 + parseInt(ins);
	                ins = Number(ins).bin(x[4]);
	                if (x[4]) ins = ins.substr(0, x[4]);
	                if (x[2] == '#') ins = '0b' + ins;
	                break;
	            case "c":
	                ins = String.fromCharCode(ins);
	                break;
	            case "u":
	                ins = Math.abs(ins);
	            case "d":
	                ins = Math.round(ins);
	                if (ins < 0) {
	                    ins = "-" + Math.abs(ins).dec(x[4]);
	                } else {
	                    ins = Number(ins).dec(x[4]);
	                    sign = x[2] == ' ' || x[2] == '+';
	                }
	                break;
	            case "e":
	            case "E":
	                if (ins > 0) {
	                    sign = x[2] == ' ' || x[2] == '+';
	                }
	                ins = Number(ins).toExponential(x[4] ? x[4] : 6);
	                if (x[5] == 'E') ins = ins.toUpperCase();
	                break;
	            case "f":
	                if (ins > 0) {
	                    sign = x[2] == ' ' || x[2] == '+';
	                }
	                ins = Number(ins).toFixed(isNumeric(x[4]) ? x[4] : 6);
	                break;
	            case "o":
	                if (ins < 0) ins = 0x10000000000000000 + parseInt(ins);
	                ins = Number(ins).toString(8);
	                if (x[4]) ins = ins.substr(0, x[4]);
	                if (x[2] == '#' && ins != 0) ins = '0' + ins;
	                break;
	            case "s":
	                ins = String(ins);
	                if (x[4]) ins = ins.substr(0, x[4]);
	                break;
	            case "x":
	            case "X":
	                if (ins < 0) ins = 0x10000000000000000 + parseInt(ins);
	                ins = Number(ins).hex(-x[4]);
	                if (x[4]) ins = ins.substr(0, x[4]);
	                if (x[2] == '#') ins = '0x' + ins;
	                if (x[5] == 'X') ins = ins.toUpperCase();
	                break;
	        }
	        if (sign) ins = x[2] + ins;
	        if (x[3]) ins = x[2] == '-' || x[3] < 0 ? ins.padRight(x[3]) : ins.padLeft(x[3], x[2] == '0' ? 0 : " ");
	        return ins;
	    });
	    return frmt.replace(/\0\0/g, "%");
	};

/***/ },
/* 6 */
/*!*********************************************!*\
  !*** ./src/extensions/documentselection.js ***!
  \*********************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.DocumentSelection = undefined;
	
	var _dom = __webpack_require__(/*! ./dom */ 7);
	
	var DocumentSelection = new function () {
	    var self = this;
	
	    var keys = {
	        'prevCalcNode': '__prevCalcNode'
	    };
	
	    var callMethod = function callMethod(m, arg) {
	        var el = arg[0],
	            id,
	            module = "";
	        if (!el || !el.tagName) return false;
	        switch (arg[0].tagName.toLowerCase()) {
	            case 'input':
	                if (el.type && el.type != 'text' && el.type != 'password') return false;
	            case 'textarea':
	                module = "input";
	                break;
	            case 'iframe':
	                module = "frame";
	                arg[0] = el.contentWindow;
	                break;
	            default:
	                return false;
	        }
	
	        if ('function' == typeof self.module[module]) self.module[module] = new self.module[module](keys);
	
	        if (!self.module[module] || !self.module[module][m]) throw new Error('Method \'' + m + '\' is not implemented for DocumentSelection \'' + module + '\' module.');
	
	        return self.module[module][m].apply(self, arg);
	    };
	
	    var keepScroll = function keepScroll(el, ot, ol) {
	        if (window.getSelection && 'iframe' != el.tagName.toLowerCase()) {
	            var q = self.getSelectionOffset(el);
	            if (el.contentWindow) el = el.contentWindow.document.body;
	
	            if (ot > q.y) el.scrollTop = q.y;else if (ot + el.clientHeight > q.y) el.scrollTop = ot;else el.scrollTop = q.y - el.clientHeight / 2;
	
	            if (ol > q.x) el.scrollLeft = q.x;else if (ol + el.clientWidth > q.x) el.scrollLeft = ol;else el.scrollLeft = q.x - el.clientWidth / 2;
	        }
	    };
	
	    self.setRange = function (el, start, end, related) {
	        var ot = el.scrollTop,
	            ol = el.scrollLeft;
	
	        if (related) {
	            var st = self.getStart(el);
	            end = st + end;
	            start = st + start;
	        }
	        if (start < 0) start = 0;
	        if (end < start) end = start;
	
	        callMethod('setRange', [el, start, end]);
	
	        keepScroll(el, ot, ol);
	    };
	
	    self.getSelection = function (el) {
	        return callMethod('getSelection', [el]);
	    };
	
	    self.getStart = function (el) {
	        return callMethod('getPos', [el])[0];
	    };
	
	    self.getEnd = function (el) {
	        return callMethod('getPos', [el])[0];
	    };
	
	    self.getCursorPosition = function (el) {
	        return self.getStart(el);
	    };
	
	    self.insertAtCursor = function (el, val, keep) {
	        var ot = el.scrollTop,
	            ol = el.scrollLeft;
	        if (!keep) {
	            callMethod('del', [el]);
	        }
	        var pos = callMethod('ins', [el, val]);
	        keepScroll(el, ot, ol);
	        return pos;
	    };
	
	    self.wrapSelection = function (el, start, end) {
	        var s = self.getCursorPosition(el),
	            e = self.getEnd(el);
	        if (s == e) {
	            self.insertAtCursor(el, start + end);
	        } else {
	            self.insertAtCursor(el, start, true);
	            self.setRange(el, e + start.length, e + start.length);
	            self.insertAtCursor(el, end, true);
	        }
	    };
	
	    self.deleteAtCursor = function (el, after) {
	        if (!self.getSelection(el)) {
	            if (after) self.setRange(el, 0, 1, true);else self.setRange(el, -1, 0, true);
	        }
	        return self.deleteSelection(el);
	    };
	
	    self.deleteSelection = function (el) {
	        var ol = el.scrollLeft,
	            ot = el.scrollTop,
	            ret = callMethod('del', [el]);
	        keepScroll(el, ot, ol);
	        return ret;
	    };
	
	    self.getSelectionOffset = function (el) {
	        return callMethod('getSelectionOffset', [el], true);
	    };
	
	    self.getContext = function (el) {
	        return callMethod('getContext', [el]);
	    };
	}();
	DocumentSelection.module = {
	
	    'input': function input(keys) {
	        var self = this;
	
	        var offsetCalculator = null;
	
	        self.getContext = function (el) {
	            var pos = self.getPos(el),
	                val = el.value,
	                r1 = val.match(new RegExp("(?:.|[\\r\\n]){0," + (pos[0] - 1) + "}(?:^|\\s)", "m")) || "",
	                r2 = val.match(new RegExp("(?:.|[\\r\\n]){" + pos[0] + "}", "m"))[0],
	                r3 = val.replace(r2, ""),
	                r4 = r3.substring(0, pos[1] - pos[0]),
	                r5 = r3.replace(r4, "").match(/(?:\S|$)*/);
	            return [r2.replace(r1, ""), r4, r5];
	        };
	
	        self.getPos = function (el) {
	            var pos = [0, 0];
	            if ('function' == typeof window.getSelection) {
	                try {
	                    pos = [el.selectionStart, el.selectionEnd];
	                } catch (e) {}
	            } else {
	                el.setActive();
	                pos = [Math.abs(el.document.selection.createRange().moveStart("character", -100000000)), Math.abs(el.document.selection.createRange().moveEnd("character", -100000000))];
	
	                if (el.tagName.toLowerCase() != 'input') {
	
	                    var r = el.document.body.createTextRange();
	                    r.moveToElementText(el);
	                    var sTest = Math.abs(r.moveStart("character", -100000000));
	                    pos[0] -= sTest;
	                    pos[1] -= sTest;
	                }
	            }
	            return pos;
	        };
	
	        self.del = function (el) {
	            var ret = "",
	                p = self.getPos(el),
	                s = p[0],
	                e = p[1];
	            if (s != e) {
	
	                var tmp = document.selection && !window.opera ? el.value.replace(/\r/g, "") : el.value;
	                ret = tmp.substring(s, e);
	                el.value = tmp.substring(0, s) + tmp.substring(e, tmp.length);
	                self.setRange(el, s, s);
	            }
	            return ret;
	        };
	
	        self.ins = function (el, val) {
	            var ret = "",
	                s = self.getPos(el)[0];
	
	            var tmp = document.selection && !window.opera ? el.value.replace(/\r/g, "") : el.value;
	            el.value = tmp.substring(0, s) + val + tmp.substring(s, tmp.length);
	            s += val.length;
	            self.setRange(el, s, s);
	            return s;
	        };
	
	        self.getSelection = function (el) {
	            var p = self.getPos(el),
	                s = p[0],
	                e = p[1];
	
	            if (e < s) e = s;
	
	            var tmp = document.selection && !window.opera ? el.value.replace(/\r/g, "") : el.value;
	            return tmp.substring(s, e);
	        };
	
	        self.setRange = function (el, start, end) {
	            if ('function' == typeof el.setSelectionRange) {
	
	                try {
	                    el.setSelectionRange(start, end);
	                } catch (e) {}
	            } else {
	
	                var range;
	
	                try {
	                    range = el.createTextRange();
	                } catch (e) {
	                    try {
	                        range = el.document.body.createTextRange();
	                        range.moveToElementText(el);
	                    } catch (e) {
	                        return false;
	                    }
	                }
	                el.setActive();
	                range.collapse(true);
	                range.moveStart("character", start);
	                range.moveEnd("character", end - start);
	                range.select();
	            }
	        };
	
	        self.getSelectionOffset = function (el) {
	            var range,
	                doc = _dom.DOM.getWindow(el).document;
	            if ('function' == typeof el.setSelectionRange) {
	
	                if (!offsetCalculator) {
	
	                    offsetCalculator = doc.createElement('td');
	
	                    doc.body.appendChild(offsetCalculator);
	                }
	
	                if (offsetCalculator[keys.prevCalcNode] != el) {
	                    offsetCalculator[keys.prevCalcNode] = el;
	                    var cs = doc.defaultView.getComputedStyle(el, null);
	                    for (var i in cs) {
	                        try {
	                            if (cs[i]) offsetCalculator.style[i] = cs[i];
	                        } catch (e) {}
	                    }
	                    offsetCalculator.style.overflow = 'auto';
	                    offsetCalculator.style.position = 'absolute';
	                    offsetCalculator.style.visibility = 'hidden';
	                    offsetCalculator.style.zIndex = '-10';
	                    offsetCalculator.style.left = "-10000px";
	                    offsetCalculator.style.top = "-10000px";
	                    offsetCalculator.style.backgroundColor = 'yellow';
	                }
	
	                var range = doc.createRange(),
	                    val = el.value || " ";
	
	                if ('input' == el.tagName.toLowerCase()) {
	                    offsetCalculator.style.width = 'auto';
	                    offsetCalculator.style.whiteSpace = 'nowrap';
	                } else {
	                    offsetCalculator.style.whiteSpace = 'off' == el.getAttribute('wrap') ? "pre" : "";
	                }
	
	                val = val.replace(/\x20\x20/g, "\x20\xa0").replace(/</g, "&lt;").replace(/>/g, "&gt");
	                offsetCalculator.innerHTML = (val.substring(0, el.selectionStart - 1) + "<span>" + val.substring(el.selectionStart - 1, el.selectionStart) + "</span>" + val.substring(el.selectionStart)).replace(/\n/g, "<br />").replace(/\t/g, "<em style=\"white-space:pre\">\t</em>");
	
	                var span = offsetCalculator.getElementsByTagName('span')[0];
	                span.style.border = '1px solid red';
	                range.offsetLeft = span.offsetLeft; // - el.scrollLeft + span.clientWidth;
	                range.offsetTop = span.offsetTop; // - el.scrollTop;
	                range.offsetHeight = span.offsetHeight;
	                if ("\n" == val.charAt(el.selectionStart - 1)) range.offsetTop += range.offsetHeight * 2;
	                span = null;
	            } else if (doc.selection && doc.selection.createRange) {
	
	                range = doc.selection.createRange();
	
	                range.offsetHeight = Math.round(range.boundingHeight / (range.text.replace(/[^\n]/g, "").length + 1));
	                if (el.tagName && 'textarea' == el.tagName.toLowerCase()) {
	                    var xy = _dom.DOM.getOffset(el);
	                    range = {
	                        'offsetTop': range.offsetTop - xy.y + _dom.DOM.getBodyScrollTop(el),
	                        'offsetLeft': range.offsetLeft - xy.x + _dom.DOM.getBodyScrollLeft(el),
	                        'offsetHeight': range.offsetHeight
	                    };
	                }
	            }
	            if (range) {
	                return { 'x': range.offsetLeft, 'y': range.offsetTop, 'h': range.offsetHeight };
	            }
	            return { 'x': 0, 'y': 0, 'h': 0 };
	        };
	    },
	    'frame': function frame() {
	        var self = this;
	
	        self.getContext = function (el) {
	            if ('function' == typeof el.getSelection) {
	                var pos = self.getPos(el),
	                    val = el.document.body.innerText || el.document.body.innerHTML.replace(/<\/?[a-z:]+[^>]*>/ig, "").replace("&nbsp;", " "),
	                    r1 = val.match(new RegExp("(?:.|[\\r\\n]){0," + (pos[0] - 1) + "}(?:^|\\s)", "m")) || "",
	                    r2 = val.match(new RegExp("(?:.|[\\r\\n]){" + pos[0] + "}", "m")) || "",
	                    r3 = val.replace(r2, ""),
	                    r4 = r3.substring(0, pos[1] - pos[0]),
	                    r5 = r3.replace(r4, "").match(/(?:\S|$)*/);
	                return [r2.toString().replace(r1, ""), r4, r5];
	            } else {
	                var s1 = el.document.selection.createRange(),
	                    s2 = el.document.selection.createRange(),
	                    s3 = el.document.selection.createRange();
	                s1.moveStart("word", -1);
	                s3.moveEnd("word", 1);
	
	                return [s1.text.replace(new RegExp(RegExp.escape(s2.text) + "$"), ""), s2.text, s3.text.replace(new RegExp("^" + RegExp.escape(s2.text)), "")];
	            }
	        };
	
	        self.getPos = function (el) {
	            var pos = [0, 0];
	            if ('function' == typeof el.getSelection) {
	
	                var sel = el.getSelection(),
	                    sn = sel.anchorNode,
	                    so = sel.anchorOffset,
	                    en = sel.focusNode,
	                    eo = sel.focusOffset,
	                    ss = false,
	                    es = false,
	                    sc = 0,
	                    ec = 0,
	                    cn,
	                    tw = el.document.createTreeWalker(el.document.body, NodeFilter.SHOW_TEXT, null, false);
	                while (sn && sn.nodeType != 3) {
	                    sn = sn.childNodes[so];
	                    so = 0;
	                }
	                while (en && en.nodeType != 3) {
	                    en = en.childNodes[eo];
	                    eo = 0;
	                }
	                while (cn = tw.nextNode()) {
	                    if (cn == en) {
	                        ec += eo;
	                        es = true;
	                    }
	                    if (cn == sn) {
	                        sc += so;
	                        ss = true;
	                    }
	                    if (!es) ec += cn.nodeValue.length;
	                    if (!ss) sc += cn.nodeValue.length;
	                    if (es && ss) break;
	                }
	                pos = [Math.min(ec, sc), Math.max(ec, sc)];
	            } else {
	                el.document.body.setActive();
	                pos = [Math.abs(el.document.selection.createRange().moveStart("character", -100000000)), Math.abs(el.document.selection.createRange().moveEnd("character", -100000000))];
	            }
	            return pos;
	        };
	
	        self.del = function (el) {
	            if ('function' == typeof el.getSelection) {
	                var s = el.getSelection(),
	                    i = s.rangeCount;
	                while (--i > -1) {
	                    s.getRangeAt(i).deleteContents();
	                }var r = s.getRangeAt(s.rangeCount - 1);
	                r.insertNode(el.document.createTextNode(""));
	                s.addRange(r);
	            } else if (el.document && el.document.selection) {
	                el.document.selection.createRange().text = "";
	                el.document.selection.createRange().select();
	            }
	        };
	
	        self.ins = function (el, val) {
	            if ('function' == typeof el.getSelection) {
	                val = val.replace(/&/, "&amp;").replace(/</, "&lt;").replace(/>/, "&gt;").replace(/\x20/, "&nbsp;").replace(/[\r\n]/, "<br />");
	                var n = el.document.createElement('span'),
	                    s = el.getSelection(),
	                    r = s.getRangeAt(0),
	                    ln;
	                n.innerHTML = val;
	                r.insertNode(n);
	                r.selectNodeContents(n);
	
	                var pn = n.parentNode,
	                    ln = n.nextSibling;
	
	                n.parentNode.replaceChild(r.extractContents(), n);
	
	                if (!ln) ln = pn.lastChild;
	
	                var r1 = el.document.createRange();
	
	                if (ln.nodeValue) {
	
	                    r1.setStart(ln, 0);
	                } else {
	
	                    r1.setStartAfter(ln);
	                }
	
	                s.removeAllRanges();
	                s.addRange(r1);
	            } else if (el.document && el.document.selection) {
	                el.document.body.setActive();
	                var r = el.document.selection.createRange();
	                r.text = val;
	
	                if (r.moveStart("character", 1)) {
	                    r.moveStart("character", -1);
	                    r.moveEnd("character", -1);
	                    r.select();
	                }
	            }
	            return self.getPos(el)[0];
	        };
	
	        self.getSelection = function (el, s, e) {
	            if ('function' == typeof el.getSelection) {
	                var s = el.getSelection();
	                return s ? s.toString() : "";
	            } else if (el.document && el.document.selection) {
	                return el.document.selection.createRange().text;
	            }
	        };
	
	        self.setRange = function (el, start, end) {
	            if ('function' == typeof el.getSelection) {
	                var sel = el.getSelection();
	                sel.removeAllRanges();
	                var r = el.document.createRange(),
	                    cnt = 0,
	                    cl = 0,
	                    cn,
	                    pn,
	                    tw = el.document.createTreeWalker(el.document.body, NodeFilter.SHOW_TEXT, null, false);
	
	                while ((cn = tw.nextNode()) && (!cn.nodeValue.length || cnt + cn.nodeValue.length <= start)) {
	                    pn = cn;
	                    cnt += cn.nodeValue.length;
	                }
	
	                if (cn || (cn = pn)) {
	                    r.setStart(cn, start - cnt);
	                    r.setEnd(cn, start - cnt);
	                }
	                if (cn) {
	                    do {
	                        if (cn.nodeType != 3) continue;
	                        if (cnt + cn.nodeValue.length < end) {
	                            cnt += cn.nodeValue.length;
	                        } else {
	                            r.setEnd(cn, end - cnt);
	                            break;
	                        }
	                    } while (cn = tw.nextNode());
	                }
	                sel.addRange(r);
	            } else if (el.document && el.document.selection) {
	                el.document.body.setActive();
	                var r = el.document.selection.createRange();
	                r.moveToElementText(el.document.body);
	                r.move("character", start);
	                r.moveEnd("character", end - start);
	                r.select();
	            }
	        };
	
	        self.getSelectionOffset = function (el) {
	            var off = { 'x': 0, 'y': 0, 'h': 0 };
	            if ('function' == typeof el.getSelection) {
	                var r = el.getSelection().getRangeAt(0),
	                    s = el.document.createElement('span'),
	                    contents = r.cloneContents(),
	                    e = r.endOffset,
	                    n = s;
	
	                s.style.borderLeft = '1px solid red';
	                r.surroundContents(s);
	                off.h = n.offsetHeight;
	                while (n.offsetParent) {
	                    off.x += n.offsetLeft;
	                    off.y += n.offsetTop;
	                    n = n.offsetParent;
	                }
	                s.parentNode.removeChild(s);
	
	                var r1 = el.document.createRange();
	                if (contents.childNodes.length > 0) {
	                    for (var i = 0; i < contents.childNodes.length; i++) {
	                        var n = contents.childNodes[i];
	                        r.insertNode(n);
	                        r1.selectNode(n);
	                    }
	                    el.getSelection().addRange(r1);
	                }
	            } else if (el.document && el.document.selection) {
	                var r = el.document.selection.createRange();
	                off.h = r.boundingHeight;
	                off.x = r.offsetLeft;
	                off.y = r.offsetTop;
	            }
	            return off;
	        };
	    }
	};
	
	exports.DocumentSelection = DocumentSelection;

/***/ },
/* 7 */
/*!*******************************!*\
  !*** ./src/extensions/dom.js ***!
  \*******************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.DOM = undefined;
	
	var _helpers = __webpack_require__(/*! ./helpers */ 1);
	
	var DOM = {};
	
	DOM.getParent = function getParent(el, cp, vl) {
	    if (el == null) return null;else if (el.nodeType == 1 && (!(0, _helpers.isUndefined)(vl) && el[cp] == vl || 'string' == typeof cp && DOM.hasTagName(el, cp) || el == cp)) return el;else return getParent(el.parentNode, cp, vl);
	};
	
	DOM.getOffset = function (el) {
	    var fixBrowserQuirks = true,
	        o = el,
	        left = 0,
	        top = 0,
	        width = 0,
	        height = 0,
	        parentNode = null,
	        offsetParent = null;
	
	    if (o == null) return null;
	
	    offsetParent = o.offsetParent;
	    var originalObject = o,
	        el = o;
	    while (el.parentNode != null) {
	        el = el.parentNode;
	        if (el.offsetParent !== null) {
	            var considerScroll = true;
	
	            if (fixBrowserQuirks && window.opera) {
	                if (el == originalObject.parentNode || el.nodeName == "TR") {
	                    considerScroll = false;
	                }
	            }
	            if (considerScroll) {
	                if (el.scrollTop && el.scrollTop > 0) {
	                    top -= el.scrollTop;
	                }
	                if (el.scrollLeft && el.scrollLeft > 0) {
	                    left -= el.scrollLeft;
	                }
	            }
	        }
	
	        if (el == offsetParent) {
	            left += o.offsetLeft;
	            if (el.clientLeft && el.nodeName != "TABLE") {
	                left += el.clientLeft;
	            }
	            top += o.offsetTop;
	            if (el.clientTop && el.nodeName != "TABLE") {
	                top += el.clientTop;
	            }
	            o = el;
	            if (o.offsetParent == null) {
	                if (o.offsetLeft) {
	                    left += o.offsetLeft;
	                }
	                if (o.offsetTop) {
	                    top += o.offsetTop;
	                }
	            }
	            offsetParent = o.offsetParent;
	        }
	    }
	
	    if (originalObject.offsetWidth) {
	        width = originalObject.offsetWidth;
	    }
	    if (originalObject.offsetHeight) {
	        height = originalObject.offsetHeight;
	    }
	
	    return { 'x': left, 'y': top, 'width': width, 'height': height };
	};
	
	DOM.getClientWidth = function (el) {
	    var win = this.getWindow(el),
	        doc = win.document,
	        w = 0;
	    if (win.innerWidth) w = win.innerWidth;else if (doc.documentElement && doc.documentElement.clientWidth) w = doc.documentElement.clientWidth;else if (doc.body) w = doc.body.clientWidth;
	    return w;
	};
	
	DOM.getOffsetWidth = function (el) {
	    var win = this.getWindow(el),
	        doc = win.document,
	        w = 0;
	    if (win.outerWidth) w = win.outerWidth;else if (doc.documentElement && doc.documentElement.clientWidth) w = doc.documentElement.clientWidth;else if (doc.body) w = doc.body.clientWidth;
	    return w;
	};
	
	DOM.getClientHeight = function (el) {
	    var win = this.getWindow(el),
	        doc = win.document,
	        h = 0;
	    if (win.innerHeight) h = win.innerHeight;else if (doc.documentElement && doc.documentElement.clientHeight) h = doc.documentElement.clientHeight;else if (doc.body) h = doc.body.clientHeight;
	    return h;
	};
	
	DOM.getOffsetHeight = function (el) {
	    var win = this.getWindow(el),
	        doc = win.document,
	        h = 0;
	    if (win.outerHeight) h = win.outerHeight;else if (doc.documentElement && doc.documentElement.clientHeight) h = doc.documentElement.clientHeight;else if (doc.body) h = doc.body.clientHeight;
	    return h;
	};
	
	DOM.getBodyScrollTop = function (el) {
	    var win = this.getWindow(el),
	        doc = win.document;
	    return win.pageYOffset || doc.documentElement && doc.documentElement.scrollTop || doc.body && doc.body.scrollTop;
	};
	
	DOM.getBodyScrollLeft = function (el) {
	    var win = this.getWindow(el),
	        doc = win.document;
	    return win.pageXOffset || doc.documentElement && doc.documentElement.scrollLeft || doc.body && doc.body.scrollLeft;
	};
	
	DOM.getWindow = function (el) {
	    var win = window;
	    if (el) {
	        var doc = el.ownerDocument;
	        win = doc.defaultView || doc.parentWindow || doc.window || window;
	    }
	    return win;
	};
	
	DOM.getCursorPosition = function (e) {
	    if (e.pageX || e.pageY) return { 'x': e.pageX, 'y': e.pageY };
	
	    var de = document.documentElement || document.body;
	    return { 'x': e.clientX + de.scrollLeft - (de.clientLeft || 0),
	        'y': e.clientY + de.scrollTop - (de.clientTop || 0) };
	};
	
	DOM.hasTagName = function (prop, tags) {
	    if ((0, _helpers.isString)(tags)) tags = [tags];
	    if (!(0, _helpers.isArray)(tags) || (0, _helpers.isEmpty)(tags) || (0, _helpers.isUndefined)(prop) || (0, _helpers.isEmpty)(prop.tagName)) return false;
	    var t = prop.tagName.toLowerCase();
	    for (var i = 0, tL = tags.length; i < tL; i++) {
	        if (tags[i].toLowerCase() == t) return true;
	    }
	    return false;
	};
	
	DOM.color2rgb = function (prop) {
	    var e;
	
	    if (/^([a-z]+)($|\s[a-z]+)/i.test(prop)) {
	        var d = document.body,
	            ov = d.vLink;
	        d.vLink = prop.split(" ")[0];
	        prop = d.vLink;
	        d.vLink = ov;
	    }
	    try {
	        if (e = prop.match(/^#([\da-f]{6})$/i)) {
	            return e = parseInt(e[1], 16), [(e & 0xff0000) >> 16, (e & 0xff00) >> 8, e & 0xff];
	        } else if (e = prop.match(/^#([\da-f]{3})$/i)) {
	            return e = parseInt(e[1], 16), [((e & 0xf00) >> 8) * 0x11, ((e & 0xf0) >> 4) * 0x11, (e & 0xf) * 0x11];
	        } else return prop.match(/([\d%]+)/g).splice(0, 3).map(function (a) {
	            return (/%/.test(a) ? (parseInt(a) * 2.55).toFixed(0) : parseInt(a)
	            );
	        });
	    } catch (err) {
	        return;
	    }
	};
	DOM.setOpacity = function (el, opacity) {
	    if (el.style.opacity != opacity) {
	        el.style.opacity = el.style.KhtmOpacity = el.style.MozOpacity = opacity;
	        el.style.filter = "alpha(opacity=" + opacity * 100 + ")";
	    }
	};
	
	DOM.CSS = function (el) {
	    var self = this;
	
	    self.addClass = function () {
	        var arg = (0, _helpers.isArray)(arguments[0]) ? arguments[0] : Array.prototype.slice.call(arguments);
	        self.removeClass(arg);
	        el.className = el.className + " " + Array.prototype.join.call(arg, " ");
	        return self;
	    };
	
	    self.removeClass = function removeClass() {
	        var arg = (0, _helpers.isArray)(arguments[0]) ? arguments[0] : arguments;
	        if (!removeClass.cache) removeClass.cache = {};
	        var c = removeClass.cache;
	        for (var i = 0, aL = arg.length; i < aL; i++) {
	            if (!c.hasOwnProperty(arg[i])) c[arg[i]] = new RegExp("(^|\\s+)" + arg[i] + "(\\s+|$)");
	            el.className = el.className.replace(c[arg[i]], " ");
	        }
	        el.className = el.className.replace(/\s{2,}/, " ");
	        return self;
	    };
	
	    self.hasClass = function (c) {
	        var re = new RegExp("(^|\\s+)" + c + "(\\s+|$)");
	        return el.className.match(re, " " + c + " ");
	    };
	
	    self.getClass = function () {
	        return el.className;
	    };
	
	    self.getClassValue = function (c) {
	        var vals = el.className.match(new RegExp("(^|\\s)" + c + ":([^\\s]+)"));
	
	        return vals ? vals[2].indexOf(":") + 1 ? vals[2].split(":") : vals[2] : null;
	    };
	
	    self.getComputedStyle = function (prop) {
	        var y;
	        if (el.currentStyle) y = prop ? el.currentStyle[prop] : el.currentStyle;else if (window.getComputedStyle) {
	            y = document.defaultView.getComputedStyle(el, null);
	            if (prop) y = y[prop];
	        } else {
	            y = null;
	        }
	        return y;
	    };
	    return this;
	};
	
	exports.DOM = DOM;

/***/ },
/* 8 */
/*!****************************************!*\
  !*** ./src/extensions/eventmanager.js ***!
  \****************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.EM = undefined;
	
	var _helpers = __webpack_require__(/*! ./helpers */ 1);
	
	var _dom = __webpack_require__(/*! ./dom */ 7);
	
	var EM = new function () {
	    var self = this;
	
	    var pool = [];
	
	    var UID = 0;
	
	    var keys = {
	        'UEID': '__eventManagerUniqueElementId'
	
	    };
	
	    var rootEventHandler = function rootEventHandler(e) {
	        unifyEvent(e);
	        var id = null,
	            hid = null,
	            el = e.target,
	            fe = true,
	            res = true;
	
	        if (!e.currentTarget || !(id = e.currentTarget[keys.UEID]) || !(hid = pool[id].handler[e.type])) return;
	
	        try {
	            for (var i = 0, hL = hid.length; i < hL; i++) {
	                if ((0, _helpers.isFunction)(hid[i])) res = res && !(false === hid[i].call(e.currentTarget, e));
	            }
	        } catch (err) {
	            setTimeout(function () {
	                throw new Error("Event handler for [" + e.type + "] has failed with exception: \"" + err.message + "\"");
	            }, 10);
	        }
	
	        return res;
	    };
	
	    var unloadEventHandler = function unloadEventHandler(e) {
	        for (var i = pool.length - 1, pid = null, el = null; i >= 0; i--) {
	            if (pool[i] && (el = (pid = pool[i]).node)) {
	                for (var z in pid.handler) {
	                    if (!pid.handler.hasOwnProperty(z)) continue;
	                    try {
	                        if (el.removeEventListener) {
	                            el.removeEventListener(z, pid.rootEHCaller ? pid.rootEHCaller : rootEventHandler, false);
	                        } else if (el.detachEvent) {
	                            el.detachEvent('on' + z, pid.rootEHCaller ? pid.rootEHCaller : rootEventHandler);
	                        }
	                    } catch (e) {}
	                    pid.handler[z].length = 0;
	                }
	            }
	            el = pid.node = null;
	        }
	        if (window.removeEventListener) {
	            window.removeEventListener(z, unloadEventHandler, false);
	        } else {
	            window.detachEvent('on' + z, unloadEventHandler);
	        }
	    };
	
	    var unifyEvent = function unifyEvent(e) {
	        var i = self.EU.length,
	            cur,
	            cur1,
	            k,
	            init;
	        while (i--) {
	            cur = self.EU[i];
	            if (cur[0].test(e.type)) {
	                k = cur[1].length;
	                init = null;
	                while (k--) {
	                    cur1 = cur[1][k];
	                    if ('init' == cur1[0]) init = cur1[1];else if (!e[cur1[0]]) e[cur1[0]] = cur1[1];
	                }
	                if (init) init.call(e);
	            }
	        }
	        if (!e.target && e.type != 'unload') e.target = e.srcElement;
	        return e;
	    };
	
	    var getUEID = function getUEID(el, f) {
	        return el[keys.UEID] || f && (el[keys.UEID] = ++UID);
	    };
	
	    self.addEventListener = function (el, et, h) {
	        if (!el || !(0, _helpers.isFunction)(h)) return false;
	
	        var id = getUEID(el, true),
	            pid = null,
	            hid = null;
	
	        if (!pool[id]) {
	            pool[id] = {
	                'node': el,
	                'handler': {}
	            };
	        };
	        pid = pool[id];
	
	        if (!pid.handler.hasOwnProperty(et)) {
	            pid.handler[et] = [];
	
	            if (el.addEventListener) {
	                el.addEventListener(et, rootEventHandler, false);
	            } else if (el.attachEvent) {
	
	                pid.rootEHCaller = function (e) {
	                    e.currentTarget = pid.node; //pool[id].node;
	                    var res = rootEventHandler(e);
	                    e.currentTarget = null;
	                    return res;
	                };
	                el.attachEvent('on' + et, pid.rootEHCaller);
	            }
	        };
	        hid = pid.handler[et];
	
	        if (hid.indexOf(h) == -1) {
	            hid[hid.length] = h;
	            return true;
	        }
	        return false;
	    };
	
	    self.addOneTimeEventListener = function (el, et, h) {
	
	        self.addEventListener(el, et, function oneTimeEventHandler(e) {
	
	            self.removeEventListener(el, e.type, oneTimeEventHandler);
	
	            return h(e);
	        });
	    };
	
	    self.removeEventListener = function (el, et, h) {
	        if (!el || !(0, _helpers.isFunction)(h)) return false;
	        var id = getUEID(el),
	            pid = pool[id],
	            eid = null;
	        if (pid && (eid = pid.handler[et])) {
	
	            eid.splice(eid.indexOf(h), 1);
	            if (0 == eid.length) {
	                delete pid.handler[et];
	
	                if (el.removeEventListener) {
	                    el.removeEventListener(et, pid.rootEHCaller ? pid.rootEHCaller : rootEventHandler, false);
	                } else if (el.detachEvent) {
	                    el.detachEvent('on' + et, pid.rootEHCaller ? pid.rootEHCaller : rootEventHandler);
	                }
	            }
	            return true;
	        }
	        return false;
	    };
	
	    self.dispatchEvent = function (e) {
	        var res = rootEventHandler(e);
	        return res;
	    };
	
	    self.registerEvent = function (o, n, b, d) {
	        var id = getUEID(o, true);
	        if (!pool[id]) {
	            pool[id] = {
	                'node': o,
	                'handler': []
	            };
	        } else {
	            pool[id].node = o;
	        }
	        return new EM.EventTarget(o, n, b, d);
	    };
	
	    var __construct = function __construct() {
	
	        if (window.attachEvent && !window.addEventListener) {
	            window.attachEvent('onunload', unloadEventHandler);
	        }
	    };
	    __construct();
	}();
	
	EM.preventDefaultAction = function (e) {
	    e.preventDefault();
	};
	EM.stopPropagationAction = function (e) {
	    e.stopPropagation();
	};
	
	EM.EventTarget = function (obj, name, bubble, def) {
	    var self = this;
	
	    var canBubble = !!bubble;
	
	    var defaultAction = (0, _helpers.isFunction)(def) ? def : null;
	
	    self.trigger = function (el, data) {
	        if (!(arguments.length - 1) && el != obj) {
	            data = el;
	            el = null;
	        }
	        if (!el) el = obj;
	        var e = {},
	            res = true,
	            undef = true,
	            tmp = null;
	        for (var i in data) {
	            if (data.hasOwnProperty(i)) e[i] = data[i];
	        }
	
	        canBubble = !!bubble;
	        defaultAction = def;
	
	        do {
	            e.preventDefault = preventDefault;
	            e.stopPropagation = stopPropagation;
	            e.target = el;
	            e.currentTarget = el;
	            e.type = name;
	            tmp = EM.dispatchEvent(e);
	            undef &= (0, _helpers.isUndefined)(tmp);
	            res &= !(false === tmp);
	        } while ((el = el.parentNode) && canBubble);
	
	        if ((0, _helpers.isFunction)(defaultAction) && res && !undef) {
	            defaultAction(e);
	        }
	        return defaultAction && res && !undef;
	    };
	
	    var preventDefault = function preventDefault() {
	        defaultAction = null;
	    };
	
	    var stopPropagation = function stopPropagation() {
	        canBubble = false;
	    };
	};
	
	EM.EU = [[/./, [['preventDefault', function () {
	    this.returnValue = false;
	}], ['stopPropagation', function () {
	    this.cancelBubble = true;
	}]]], [/^mouse(over|out|down|up)/, [['getButton', function () {
	    return this.button == 2 ? 2 : 1;
	}], ['EM_MB_LEFT', '1'], ['EM_MB_RIGHT', '2']]], [/^key(down|up|press)/, [['getKeyCode', function () {
	    switch (this.keyCode) {
	        case 189:
	            return 109;
	        case 187:
	            return 61;
	        case 107:
	            return 61;
	        case 186:
	            return 59;
	        default:
	            return this.keyCode;
	    }
	}], ['getRepeat', function getRepeat() {
	    return getRepeat.repeat;
	}], ['init', function () {
	    var ac = this.getRepeat;
	    if ('keyup' == this.type) {
	        ac.repeat = 0;
	        ac.keyCode = 0;
	    } else if ('keydown' == this.type) {
	        ac.repeat = ac.keyCode == this.keyCode;
	        ac.keyCode = this.keyCode;
	    }
	}]]]];
	
	(function () {
	
	    var evt = EM.registerEvent(window, 'domload'),
	        executed = false,
	        clearEvents = function clearEvents() {
	
	        EM.removeEventListener(document, 'propertychange', handlers.ie);
	
	        EM.removeEventListener(document, 'DOMContentLoaded', handlers.mz);
	
	        EM.removeEventListener(window, 'load', handlers.mz);
	    },
	        handlers = {
	        'ie': function ie(e) {
	            if (window.event.propertyName == 'activeElement' && !executed) {
	                evt.trigger(window);
	                clearEvents();
	                executed = true;
	            }
	        },
	        'mz': function mz(e) {
	            if (!executed) evt.trigger(window);executed = true;
	        }
	    };
	
	    EM.addEventListener(document, 'propertychange', handlers.ie);
	
	    EM.addEventListener(document, 'DOMContentLoaded', handlers.mz);
	
	    if (/WebKit|Khtml/i.test(navigator.userAgent) || window.opera && parseInt(window.opera.version()) < 9) (function argumentsCalleeFixFn() {
	        if (!executed) /loaded|complete/.test(document.readyState) ? (evt.trigger(window), executed = true) : setTimeout(argumentsCalleeFixFn, 100);
	    })();
	
	    EM.addEventListener(window, 'load', handlers.mz);
	})();
	
	exports.EM = EM;

/***/ },
/* 9 */
/*!********************!*\
  !*** ./src/ime.js ***!
  \********************/
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	var IME = new function () {
	    var self = this;
	    var html = "<div id=\"VirtualKeyboardIME\"><table><tr><td class=\"IMEControl\"><div class=\"left\"><!-- --></div></td>" + "<td class=\"IMEControl IMEContent\"></td>" + "<td class=\"IMEControl\"><div class=\"right\"><!-- --></div></td></tr>" + "<tr><td class=\"IMEControl IMEInfo\" colspan=\"3\"><div class=\"showAll\"><div class=\"IMEPageCounter\"></div><div class=\"arrow\"></div></div></td></tr></div>";
	    var ime = null;
	    var chars = "";
	    var page = 0;
	    var showAll = false;
	    var sg = [];
	    var target = null;
	    var targetWindow = null;
	
	    self.show = function (s) {
	        target = VirtualKeyboard.getAttachedInput();
	        var win = DOM.getWindow(target);
	        if (targetWindow != win) {
	            if (ime && ime.parentNode) {
	                ime.parentNode.removeChild(ime);
	            }
	            targetWindow = win;
	            __createImeToolbar();
	            targetWindow.document.body.appendChild(ime);
	        }
	        ime.className = self.css;
	
	        if (s) self.setSuggestions(s);
	        if (target && ime && sg.length > 0) {
	            EM.addEventListener(target, 'blur', self.blurHandler);
	            ime.style.display = "block";
	            self.updatePosition(target);
	        } else if ('none' != ime.style.display) {
	            self.hide();
	        }
	    };
	
	    self.hide = function (keep) {
	        if (ime && 'none' != ime.style.display) {
	            ime.style.display = "none";
	            EM.removeEventListener(target, 'blur', self.blurHandler);
	            if (target && DocumentSelection.getSelection(target) && !keep) DocumentSelection.deleteSelection(target);
	            target = null;
	            sg = [];
	        }
	    };
	    self.updatePosition = function () {
	        var xy = DOM.getOffset(target);
	        ime.style.left = xy.x + 'px';
	        var co = DocumentSelection.getSelectionOffset(target);
	        ime.style.top = xy.y + co.y + co.h + 'px';
	    };
	    self.setSuggestions = function (arr) {
	        if (!isArray(arr)) return false;
	        sg = arr;
	        page = 0;
	        showPage();
	        self.updatePosition(target);
	    };
	    self.getSuggestions = function (idx) {
	        return isNumber(idx) ? sg[idx] : sg;
	    };
	    self.nextPage = function (e) {
	        page = Math.max(Math.min(page + 1, Math.ceil(sg.length / 10) - 1), 0);
	        showPage();
	    };
	    self.prevPage = function (e) {
	        page = Math.max(page - 1, 0);
	        showPage();
	    };
	    self.getPage = function () {
	        return page;
	    };
	    self.getChar = function (n) {
	        n = --n < 0 ? 9 : n;
	        return sg[self.getPage() * 10 + n];
	    };
	    self.isOpen = function () {
	        return ime && 'block' == ime.style.display;
	    };
	    self.blurHandler = function (e) {
	        self.hide();
	    };
	    self.toggleShowAll = function (e) {
	        var sa = ime.firstChild.rows[1].cells[0].lastChild;
	        if (showAll = !showAll) {
	            page = 0;
	            sa.className = 'showPage';
	        } else {
	            sa.className = 'showAll';
	        }
	        showPage();
	    };
	    var showPage = function showPage() {
	        var s = ['<table>'];
	        for (var z = 0, pL = Math.ceil(sg.length / 10); z < pL; z++) {
	            if (showAll || z == page) {
	                s.push('<tr>');
	                for (var i = 0, p = z * 10; i < 10 && !isUndefined(sg[p + i]); i++) {
	                    s.push("<td><a href=''>");
	                    if (z == page) {
	                        s.push("<b>&nbsp;" + (i + 1) % 10 + ": </b>");
	                    } else {
	                        s.push("<b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</b>");
	                    }
	                    s.push(sg[p + i] + "</a></td>");
	                }
	                s.push('</tr>');
	            }
	        }
	        s.push('</table>');
	        ime.firstChild.rows[0].cells[1].innerHTML = s.join("");
	
	        ime.firstChild.rows[1].cells[0].firstChild.firstChild.innerHTML = page + 1 + "/" + (0 + showAll || Math.ceil(sg.length / 10));
	
	        var els = ime.getElementsByTagName("*");
	        for (var i = 0, eL = els.length; i < eL; i++) {
	            els[i].unselectable = "on";
	        }
	    };
	    var pasteSuggestion = function pasteSuggestion(e) {
	        var el = DOM.getParent(e.target, 'a');
	        if (el) {
	            DocumentSelection.insertAtCursor(target, el.lastChild.nodeValue);
	            self.hide();
	        }
	        e.preventDefault();
	    };
	
	    var __createImeToolbar = function __createImeToolbar() {
	        var el = targetWindow.document.createElement('div');
	        el.innerHTML = html;
	        ime = el.firstChild;
	        ime.style.display = 'none';
	        var arrl = ime.firstChild.rows[0].cells[0],
	            arrr = ime.firstChild.rows[0].cells[2],
	            arrd = ime.firstChild.rows[1].cells[0].lastChild;
	        EM.addEventListener(arrl, 'mousedown', self.prevPage);
	        EM.addEventListener(arrl, 'mousedown', EM.preventDefaultAction);
	        EM.addEventListener(arrl, 'mousedown', EM.stopPropagationAction);
	        EM.addEventListener(arrr, 'mousedown', self.nextPage);
	        EM.addEventListener(arrr, 'mousedown', EM.preventDefaultAction);
	        EM.addEventListener(arrr, 'mousedown', EM.stopPropagationAction);
	        EM.addEventListener(arrd, 'mousedown', self.toggleShowAll);
	        EM.addEventListener(arrd, 'mousedown', EM.preventDefaultAction);
	        EM.addEventListener(arrd, 'mousedown', EM.stopPropagationAction);
	        ime.unselectable = "on";
	        var els = ime.getElementsByTagName("*");
	        for (var i = 0, eL = els.length; i < eL; i++) {
	            els[i].unselectable = "on";
	        }
	
	        EM.addEventListener(ime, 'mousedown', pasteSuggestion);
	    };
	}();
	
	exports.IME = IME;

/***/ },
/* 10 */
/*!************************************************!*\
  !*** ./src/extensions/DOMEventsLevel3.shim.js ***!
  \************************************************/
/***/ function(module, exports) {

	"use strict";
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };
	
	var __GCC__ECMA_SCRIPT_SHIMS__ = false;
	
	var __GCC__NEW_KEYBOARD_EVENTS_PROPOSAL__ = true;
	
	if (!function (global) {
		try {
			return new global["KeyboardEvent"]("keyup", { "key": "a" })["key"] == "a";
		} catch (__e__) {
			return false;
		}
	}(undefined)) void function () {
	
		var global = this,
		    _DOM_KEY_LOCATION_STANDARD = 0x00,
		    _DOM_KEY_LOCATION_LEFT = 0x01,
		    _DOM_KEY_LOCATION_RIGHT = 0x02,
		    _DOM_KEY_LOCATION_NUMPAD = 0x03,
		    _DOM_KEY_LOCATION_MOBILE = 0x04,
		    _DOM_KEY_LOCATION_JOYSTICK = 0x05,
		    _Event_prototype = global["Event"].prototype,
		    _KeyboardEvent_prototype = global["KeyboardEvent"] && global["KeyboardEvent"].prototype || _Event_prototype,
		    _Event_prototype__native_key_getter,
		    _Event_prototype__native_char_getter,
		    _Event_prototype__native_location_getter,
		    _Event_prototype__native_keyCode_getter,
		    _Object_defineProperty = Object.defineProperty || function (obj, prop, val) {
			if ("value" in val) {
				obj[prop] = val["value"];
				return;
			}
	
			if ("get" in val) {
				obj.__defineGetter__(prop, val["get"]);
			}
			if ("set" in val) {
				obj.__defineSetter__(prop, val["set"]);
			}
		},
		    _Object_getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor,
		    getObjectPropertyGetter = function getObjectPropertyGetter(obj, prop) {
			return "__lookupGetter__" in obj ? obj.__lookupGetter__(prop) : _Object_getOwnPropertyDescriptor ? (_Object_getOwnPropertyDescriptor(obj, prop) || {})["get"] : void 0;
		},
		    KEYBOARD_EVENTS = {
			"keydown": null,
			"keyup": null,
			"keypress": null
		},
		    UUID = 1,
		    _event_handleUUID = "_h_9e2",
		    _event_eventsUUID = "_e_8vj",
		    _shim_event_keyCodeUUID = _event_handleUUID + "__keyCode",
		    _keyboardEvent_properties_dictionary = {
			"char": "",
			"key": "",
			"location": _DOM_KEY_LOCATION_STANDARD,
			"ctrlKey": false,
			"shiftKey": false,
			"altKey": false,
			"metaKey": false,
			"repeat": false,
			"locale": "",
	
			"detail": 0,
			"bubbles": false,
			"cancelable": false
		},
		    _Event_has_stopImmediatePropagation = "stopImmediatePropagation" in document.createEvent("Event"),
		    _Array_slice = Array.prototype.slice,
		    _unSafeBind = Function.prototype.bind || function (object, var_args) {
			var __method = this,
			    args = _Array_slice.call(arguments, 1);
			return function () {
				return __method.apply(object, args.concat(_Array_slice.call(arguments)));
			};
		},
		    _hasOwnProperty = _unSafeBind.call(Function.prototype.call, Object.prototype.hasOwnProperty),
		    _try_initKeyboardEvent = true,
		    _getter_KeyboardEvent_location,
		    _initKeyboardEvent_type = function (_createEvent) {
			try {
				var e = _createEvent.call(document, "KeyboardEvent"); //Old browsers unsupported "KeyboardEvent"
	
				e.initKeyboardEvent("keyup", false, false, global, "+", 3, true, false, true, false, false);
				return (e["keyIdentifier"] || e["key"]) == "+" && (e["keyLocation"] || e["location"]) == 3 && (e.ctrlKey ? e.altKey ? 1 : 3 : e.shiftKey ? 2 : 4) || e["char"] == "+" && 5 || 9;
			} catch (__e__) {
				return 0;
			}
		}(document.createEvent),
		    canOverwrite_keyCode,
		    canOverwrite_which,
		    testKeyboardEvent = function () {
			try {
				return this && new this("keyup", { "key": "a", "char": "b" }) || {};
			} catch (e) {
				return {};
			}
		}.call(global["KeyboardEvent"]),
		    newKeyboadrEvent_key_property_proposal__getKey_,
		    __Property_descriptor__ = {
			"enumerable": false,
			"configurable": true,
			"writable": true
		};
	
		if (_Object_getOwnPropertyDescriptor) {
			//Modern browser
	
			_Event_prototype__native_key_getter = getObjectPropertyGetter(_KeyboardEvent_prototype, "key") || getObjectPropertyGetter(testKeyboardEvent, "key");
	
			_Event_prototype__native_char_getter = getObjectPropertyGetter(_KeyboardEvent_prototype, "char") || getObjectPropertyGetter(testKeyboardEvent, "char");
	
			_Event_prototype__native_location_getter = getObjectPropertyGetter(_KeyboardEvent_prototype, "location") || getObjectPropertyGetter(testKeyboardEvent, "location");
	
			_Event_prototype__native_keyCode_getter = getObjectPropertyGetter(_KeyboardEvent_prototype, "keyCode");
		}
	
		var VK__NON_CHARACTER_KEYS = {
			3: 'Cancel',
			6: 'Help',
			8: 'Backspace',
			9: 'Tab',
			12: 'Clear',
			13: 'Enter',
	
			16: 'Shift',
			17: 'Control',
			18: 'Alt',
			19: 'Pause',
			20: 'CapsLock',
	
			21: 'KanaMode',
			22: 'HangulMode',
			23: 'JunjaMode',
			24: 'FinalMode',
			25: 'HanjaMode',
	
			27: 'Esc',
	
			28: 'Convert',
			29: 'Nonconvert',
			30: 'Accept',
			31: 'ModeChange',
	
			32: 'Spacebar',
			33: 'PageUp',
			34: 'PageDown',
			35: 'End',
			36: 'Home',
			37: 'Left',
			38: 'Up',
			39: 'Right',
			40: 'Down',
			41: 'Select',
	
			43: 'Execute',
			44: 'PrintScreen',
			45: 'Insert',
			46: 'Del',
			47: 'Help',
	
			91: { _key: 'OS', _char: false, _location: _DOM_KEY_LOCATION_LEFT },
			92: { _key: 'OS', _char: false, _location: _DOM_KEY_LOCATION_RIGHT },
			93: 'Menu',
	
			106: { _key: 'Multiply', _char: '*', _location: _DOM_KEY_LOCATION_NUMPAD },
			107: { _key: 'Add', _char: '+', _location: _DOM_KEY_LOCATION_NUMPAD },
			108: { _key: 'Separator', _char: false, _location: _DOM_KEY_LOCATION_NUMPAD },
			109: { _key: 'Subtract', _char: '-', _location: _DOM_KEY_LOCATION_NUMPAD },
			110: { _key: 'Decimal', _char: '.', _location: _DOM_KEY_LOCATION_NUMPAD },
			111: { _key: 'Divide', _char: '/', _location: _DOM_KEY_LOCATION_NUMPAD },
	
			144: { _key: 'NumLock', _char: false, _location: _DOM_KEY_LOCATION_NUMPAD },
			145: 'ScrollLock',
	
			180: 'LaunchMail',
			181: 'SelectMedia',
			182: 'LaunchApplication1',
			183: 'LaunchApplication2',
	
			224: 'Meta',
			229: 'Process',
	
			246: 'Attn',
			247: 'Crsel',
			248: 'Exsel',
			249: 'EraseEof',
			251: 'Zoom',
			254: 'Clear'
		},
		    VK__CHARACTER_KEYS__DOWN_UP = __GCC__NEW_KEYBOARD_EVENTS_PROPOSAL__ ? {
			186: ';' // 'ж', ';', ':'
			, 187: '=',
			188: ',' // 'б', ',', '<'
			, 189: '-',
			190: '.' // 'ю', '.', '>'
			, 191: '/' // '.', '/', '?'
			, 192: '`' // 'ё', '`', '~'
			, 219: '[' // 'х', '[', '{'
			, 220: '\\' //'\', '\', '|'
			, 221: ']' // 'ъ', '[', '{'
			, 222: "'" // 'э', '"', '''
			, 226: '\\' // '\', '|', '/'
		} : {},
		    _userAgent_ = global.navigator.userAgent.toLowerCase(),
		    _IS_MAC = !!~(global.navigator.platform + "").indexOf("Mac"),
		    _BROWSER = {},
		    __i,
		    IS_NEED_KEYCODE_BUGFIX,
		    IS_OPERA_DOUBBLE_KEYPRESS_BUG,
		    tmp,
		    _KEYPRESS_VK__CHARACTER_KEYS__DOWN_UP_DELTA = 999;
	
		for (__i = 105; __i > 95; --__i) {
	
			tmp = __i - 96;
			VK__CHARACTER_KEYS__DOWN_UP[tmp + 48] = _Event_prototype__native_key_getter ? tmp + "" : { _key: tmp + "" }; //48, 49, 50 ... 57
	
	
			VK__CHARACTER_KEYS__DOWN_UP[__i] = { _key: tmp + "", _location: _DOM_KEY_LOCATION_NUMPAD }; //96, 97, 98 .. 105
		}
	
		if (!_Event_prototype__native_key_getter) {
			for (__i in VK__CHARACTER_KEYS__DOWN_UP) {
				if (_hasOwnProperty(VK__CHARACTER_KEYS__DOWN_UP, __i) && _typeof(VK__CHARACTER_KEYS__DOWN_UP[__i]) != "object") {
					VK__CHARACTER_KEYS__DOWN_UP[__i] = { _key: VK__CHARACTER_KEYS__DOWN_UP[__i] };
				}
			}
		}
	
		for (__i = 135; __i > 111; --__i) {
			VK__NON_CHARACTER_KEYS[__i] = "F" + (__i - 111);
		}
	
		if (global["opera"]) {
			// Opera special cases
			if (!_Event_prototype__native_char_getter) {
	
				IS_NEED_KEYCODE_BUGFIX = true;
				IS_OPERA_DOUBBLE_KEYPRESS_BUG = true; //TODO:: avoid Opera double keypress bug
	
				VK__NON_CHARACTER_KEYS[57351] = VK__NON_CHARACTER_KEYS[93];
				VK__CHARACTER_KEYS__DOWN_UP[187] = VK__CHARACTER_KEYS__DOWN_UP[61] = { _key: 0, _keyCode: 187 };
				VK__CHARACTER_KEYS__DOWN_UP[189] = VK__CHARACTER_KEYS__DOWN_UP[109] = { _key: 0, _keyCode: 189, _location: 3 }; //TODO: location=3 only for win?
				if (_IS_MAC) {}
			}
		} else {
	
			_BROWSER["names"] = _userAgent_.match(/(mozilla|compatible|chrome|webkit|safari)/gi);
			__i = _BROWSER["names"] && _BROWSER["names"].length || 0;
			while (__i-- > 0) {
				_BROWSER[_BROWSER["names"][__i]] = true;
			}if (_BROWSER["mozilla"] && !_BROWSER["compatible"] && !_BROWSER["webkit"]) {
				// Mozilla special cases
	
				IS_NEED_KEYCODE_BUGFIX = true;
	
				_BROWSER._version = +(_userAgent_.match(/firefox\/([0-9]+)/) || [])[1];
	
				tmp = VK__CHARACTER_KEYS__DOWN_UP[61] = VK__CHARACTER_KEYS__DOWN_UP[187]; //US Standard
				tmp._keyCode = 187;
				tmp = VK__CHARACTER_KEYS__DOWN_UP[173] = VK__CHARACTER_KEYS__DOWN_UP[189]; //US Standard
				tmp._keyCode = 189;
				tmp = VK__CHARACTER_KEYS__DOWN_UP[59] = VK__CHARACTER_KEYS__DOWN_UP[186]; //US Standard
				tmp._keyCode = 186;
				if (_BROWSER._version < 15) {
					VK__NON_CHARACTER_KEYS[107] = VK__NON_CHARACTER_KEYS[61];
					VK__CHARACTER_KEYS__DOWN_UP[109] = VK__CHARACTER_KEYS__DOWN_UP[173];
				}
			} else if (_BROWSER["safari"] && !_BROWSER["chrome"]) {
				// Safari WebKit special cases
				if (_IS_MAC) {}
			} else if (_BROWSER["chrome"]) {
				// Chrome WebKit special cases
				if (_IS_MAC) {}
			}
		}
	
		var VK__FAILED_KEYIDENTIFIER = { //webkit 'keyIdentifier' or Opera12.10/IE9 'key'
	
	
			'Escape': null,
			'Win': null,
			'Scroll': null,
			'Apps': null,
	
			'Delete': null,
			'Window': null,
			'ContextMenu': null,
			'Mul': null
		};
	
		function _KeyboardEvent(type, dict) {
			// KeyboardEvent  constructor
			var e;
			try {
				e = document.createEvent("KeyboardEvent");
			} catch (err) {
				e = document.createEvent("Event");
			}
	
			dict = dict || {};
	
			var localDict = {},
			    _prop_name,
			    _prop_value;
	
			for (_prop_name in _keyboardEvent_properties_dictionary) {
				if (_hasOwnProperty(_keyboardEvent_properties_dictionary, _prop_name)) {
					localDict[_prop_name] = _prop_name in dict && (_prop_value = dict[_prop_name]) !== void 0 ? _prop_value : _keyboardEvent_properties_dictionary[_prop_name];
				}
			}var _ctrlKey = localDict["ctrlKey"] || false,
			    _shiftKey = localDict["shiftKey"] || false,
			    _altKey = localDict["altKey"] || false,
			    _metaKey = localDict["metaKey"] || false,
			    _altGraphKey = localDict["altGraphKey"] || false,
			    modifiersListArg = _initKeyboardEvent_type > 3 ? ((_ctrlKey ? "Control" : "") + (_shiftKey ? " Shift" : "") + (_altKey ? " Alt" : "") + (_metaKey ? " Meta" : "") + (_altGraphKey ? " AltGraph" : "")).trim() : null,
			    _key = (localDict["key"] || "") + "",
			    _char = (localDict["char"] || "") + "",
			    _location = localDict["location"],
			    _keyCode = _key && _key.charCodeAt(0) || 0,
			    _bubbles = localDict["bubbles"],
			    _cancelable = localDict["cancelable"],
			    _repeat = localDict["repeat"],
			    _locale = localDict["locale"],
			    success_init = false;
	
			_keyCode = localDict["keyCode"] = localDict["keyCode"] || _keyCode;
			localDict["which"] = localDict["which"] || _keyCode;
	
			if (!canOverwrite_keyCode) {
				//IE9
				e["__keyCode"] = _keyCode;
				e["__charCode"] = _keyCode;
				e["__which"] = _keyCode;
			}
	
			if ("initKeyEvent" in e) {
				//FF
	
	
				e.initKeyEvent(type, _bubbles, _cancelable, global, _ctrlKey, _altKey, _shiftKey, _metaKey, _keyCode, _keyCode);
				success_init = true;
			} else if ("initKeyboardEvent" in e) {
	
				if (_try_initKeyboardEvent) {
					try {
						if (_initKeyboardEvent_type == 1) {
							e.initKeyboardEvent(type, _bubbles, _cancelable, global, _key, _location, _ctrlKey, _shiftKey, _altKey, _metaKey, _altGraphKey);
							e["__char"] = _char;
						} else if (_initKeyboardEvent_type == 2) {
							e.initKeyboardEvent(type, _bubbles, _cancelable, global, _ctrlKey, _altKey, _shiftKey, _metaKey, _keyCode, _keyCode);
						} else if (_initKeyboardEvent_type == 3) {
							e.initKeyboardEvent(type, _bubbles, _cancelable, global, _key, _location, _ctrlKey, _altKey, _shiftKey, _metaKey, _altGraphKey);
							e["__char"] = _char;
						} else if (_initKeyboardEvent_type == 4) {
							e.initKeyboardEvent(type, _bubbles, _cancelable, global, _key, _location, modifiersListArg, _repeat, _locale);
							e["__char"] = _char;
						} else if (_initKeyboardEvent_type == 5) {
							e.initKeyboardEvent(type, _bubbles, _cancelable, global, _char, _key, _location, modifiersListArg, _repeat, _locale);
						} else {
							e.initKeyboardEvent(type, _bubbles, _cancelable, global, _key, _location, modifiersListArg, _repeat, _locale);
						}
						success_init = true;
					} catch (__e__) {
						_try_initKeyboardEvent = false;
					}
				}
			}
	
			if (!success_init) {
				e.initEvent(type, _bubbles, _cancelable, global);
				e["__char"] = _char;
				e["__key"] = _key;
				e["__location"] = _location;
			}
	
			for (_prop_name in _keyboardEvent_properties_dictionary) {
				if (_hasOwnProperty(_keyboardEvent_properties_dictionary, _prop_name)) {
					if (e[_prop_name] != localDict[_prop_name]) {
						delete e[_prop_name];
						_Object_defineProperty(e, _prop_name, { writable: true, "value": localDict[_prop_name] });
					}
				}
			}if (!("isTrusted" in e)) e.isTrusted = false;
	
			return e;
		}
	
		_KeyboardEvent["DOM_KEY_LOCATION_STANDARD"] = _DOM_KEY_LOCATION_STANDARD;
		_KeyboardEvent["DOM_KEY_LOCATION_LEFT"] = _DOM_KEY_LOCATION_LEFT;
		_KeyboardEvent["DOM_KEY_LOCATION_RIGHT"] = _DOM_KEY_LOCATION_RIGHT;
		_KeyboardEvent["DOM_KEY_LOCATION_NUMPAD"] = _DOM_KEY_LOCATION_NUMPAD;
		_KeyboardEvent["DOM_KEY_LOCATION_MOBILE"] = _DOM_KEY_LOCATION_MOBILE;
		_KeyboardEvent["DOM_KEY_LOCATION_JOYSTICK"] = _DOM_KEY_LOCATION_JOYSTICK;
		_KeyboardEvent.prototype = _KeyboardEvent_prototype;
	
		tmp = new _KeyboardEvent("keyup");
	
		try {
			delete tmp["keyCode"];
			_Object_defineProperty(tmp, "keyCode", { "writable": true, "value": 9 });
			delete tmp["which"];
			_Object_defineProperty(tmp, "which", { "writable": true, "value": 9 });
		} catch (e) {}
	
		canOverwrite_which = tmp.which === 9;
	
		if (!(canOverwrite_keyCode = tmp.keyCode == 9) && _Event_prototype__native_keyCode_getter) {
			_Object_defineProperty(_KeyboardEvent_prototype, "keyCode", {
				"enumerable": true,
				"configurable": true,
				"get": function get() {
					if ("__keyCode" in this) return this["__keyCode"];
	
					return _Event_prototype__native_keyCode_getter.call(this);
				},
				"set": function set(newValue) {
					return this["__keyCode"] = isNaN(newValue) ? 0 : newValue;
				}
			});
			_Object_defineProperty(_KeyboardEvent_prototype, "charCode", {
				"enumerable": true,
				"configurable": true,
				"get": function get() {
					if ("__charCode" in this) return this["__charCode"];
	
					return _Event_prototype__native_keyCode_getter.call(this);
				},
				"set": function set(newValue) {
					return this["__charCode"] = isNaN(newValue) ? 0 : newValue;
				}
			});
		} else {
			_Event_prototype__native_keyCode_getter = void 0;
		}
	
		if (__GCC__NEW_KEYBOARD_EVENTS_PROPOSAL__) {
			newKeyboadrEvent_key_property_proposal__getKey_ = function newKeyboadrEvent_key_property_proposal__getKey_(originalKey) {
				originalKey = originalKey || "";
				if (originalKey.length > 1) {
					//fast IS SPECIAL KEY
					return originalKey;
				}
	
				var eventKeyCode = this.which || this.keyCode;
	
				if (this.type == "keypress") {
	
					eventKeyCode += _KEYPRESS_VK__CHARACTER_KEYS__DOWN_UP_DELTA;
				}
	
				var vkCharacterKey = VK__CHARACTER_KEYS__DOWN_UP[eventKeyCode],
				    value_is_object = vkCharacterKey && (typeof vkCharacterKey === "undefined" ? "undefined" : _typeof(vkCharacterKey)) == "object",
				    _key = value_is_object ? vkCharacterKey._key : vkCharacterKey,
				    _keyCode;
	
				if (_key) return _key;
	
				_keyCode = vkCharacterKey && vkCharacterKey._keyCode || eventKeyCode > 64 && eventKeyCode < 91 && eventKeyCode //a-z
				;
	
				return (_keyCode && String.fromCharCode(_keyCode) || originalKey).toLowerCase();
			};
		}
	
		function _helper_isRight_keyIdentifier(_keyIdentifier) {
			return _keyIdentifier && !(_keyIdentifier in VK__FAILED_KEYIDENTIFIER) && _keyIdentifier.substring(0, 2) !== "U+";
		}
	
		_Object_defineProperty(_KeyboardEvent_prototype, "key", {
			"enumerable": true,
			"configurable": true,
			"get": function get() {
				var thisObj = this,
				    value;
	
				if (_Event_prototype__native_key_getter) {
					//IE9 & Opera
					value = _Event_prototype__native_key_getter.call(thisObj);
	
					if (value && value.length < 2 || _helper_isRight_keyIdentifier(value)) {
						if (__GCC__NEW_KEYBOARD_EVENTS_PROPOSAL__) {
							return newKeyboadrEvent_key_property_proposal__getKey_.call(this, value);
						} else {
							return value;
						}
					}
				}
	
				if ("__key" in thisObj) return thisObj["__key"];
	
				if (!(thisObj.type in KEYBOARD_EVENTS)) return;
	
				var _keyCode = thisObj.which || thisObj.keyCode,
				    notKeyPress = thisObj.type != "keypress",
				    value_is_object;
	
				if (notKeyPress) {
					if ("keyIdentifier" in thisObj && _helper_isRight_keyIdentifier(thisObj["keyIdentifier"])) {
						value = thisObj["keyIdentifier"];
					} else if (!__GCC__NEW_KEYBOARD_EVENTS_PROPOSAL__ || !notKeyPress || (value = VK__NON_CHARACTER_KEYS[_keyCode])) {
						value = value || VK__CHARACTER_KEYS__DOWN_UP[_keyCode];
						value_is_object = value && (typeof value === "undefined" ? "undefined" : _typeof(value)) == "object";
						value = (value_is_object ? value._key : value) || thisObj["char"] //char getter
						;
					} else {
						value = newKeyboadrEvent_key_property_proposal__getKey_.call(this, value);
					}
				} else {
					value = thisObj["char"]; //char getter
				}
	
				__Property_descriptor__["value"] = value;
				_Object_defineProperty(thisObj, "__key", __Property_descriptor__);
				return value;
			}
		});
		_Object_defineProperty(_KeyboardEvent_prototype, "char", {
			"enumerable": true,
			"configurable": true,
			"get": function get() {
				var thisObj = this;
	
				if (!(thisObj.type in KEYBOARD_EVENTS)) return;
	
				if (thisObj.ctrlKey || thisObj.altKey || thisObj.metaKey) {
					return "";
				}
	
				if ("__char" in thisObj) return thisObj["__char"];
	
				var value,
				    notKeyPress = thisObj.type != "keypress",
				    _keyCode = !notKeyPress && thisObj["__keyCode"] || thisObj.which || thisObj.keyCode,
				    value_is_object;
	
				if (notKeyPress && (value = VK__NON_CHARACTER_KEYS[_keyCode]) && !((typeof value === "undefined" ? "undefined" : _typeof(value)) == "object")) {
	
					return "";
				}
	
				if (_Event_prototype__native_char_getter && (value = _Event_prototype__native_char_getter.call(thisObj)) !== null) {//IE9 & Opera
	
	
				} else {
					value = VK__CHARACTER_KEYS__DOWN_UP[_keyCode] || VK__NON_CHARACTER_KEYS[_keyCode];
					value_is_object = value && (typeof value === "undefined" ? "undefined" : _typeof(value)) == "object";
	
					if (!value_is_object || value._char === false) {
	
						value = "";
					} else if (value_is_object && value._char !== void 0) {
						value = value._char || "";
					} else {
						if ("keyIdentifier" in thisObj && _helper_isRight_keyIdentifier(thisObj["keyIdentifier"])) {
							//webkit
							value = "";
						} else {
							value = String.fromCharCode(_keyCode);
							if (notKeyPress && !thisObj.shiftKey) {
								value = value.toLowerCase();
							}
						}
					}
				}
	
				__Property_descriptor__["value"] = value;
				_Object_defineProperty(thisObj, "__char", __Property_descriptor__);
				return value;
			}
		});
		_getter_KeyboardEvent_location = function _getter_KeyboardEvent_location() {
			var thisObj = this;
	
			if (_Event_prototype__native_location_getter) {
				//IE9
				return _Event_prototype__native_location_getter.call(this);
			}
	
			if ("__location" in thisObj) return thisObj["__location"];
	
			if (!(thisObj.type in KEYBOARD_EVENTS)) return;
	
			var _keyCode = thisObj.which || thisObj.keyCode,
			    notKeyPress = thisObj.type != "keypress",
			    value;
	
			if ("keyLocation" in thisObj) {
				//webkit
				value = thisObj["keyLocation"];
			} else {
				value = notKeyPress && (VK__NON_CHARACTER_KEYS[_keyCode] || VK__CHARACTER_KEYS__DOWN_UP[_keyCode]);
				value = (typeof value === "undefined" ? "undefined" : _typeof(value)) == "object" && value._location || _DOM_KEY_LOCATION_STANDARD;
			}
	
			__Property_descriptor__["value"] = value;
			_Object_defineProperty(thisObj, "__location", __Property_descriptor__);
			return value;
		};
		_Object_defineProperty(_KeyboardEvent_prototype, "location", {
			"enumerable": true,
			"configurable": true,
			"get": _getter_KeyboardEvent_location
		});
	
		function _keyDownHandler(e) {
			var _keyCode = e.which || e.keyCode,
			    thisObj = this._this,
			    listener,
			    _,
			    vkNonCharacter;
	
			if (e.ctrlKey || e.altKey || e.metaKey //Special events
			|| (vkNonCharacter = VK__NON_CHARACTER_KEYS[_keyCode]) && vkNonCharacter._key !== 0 || e["__key"] || e.isTrusted === false) {
				listener = this._listener;
	
				if ((typeof listener === "undefined" ? "undefined" : _typeof(listener)) === "object") {
					if ("handleEvent" in listener) {
						thisObj = listener;
						listener = listener.handleEvent;
					}
				}
	
				if (listener && listener.apply) {
					listener.apply(thisObj, arguments);
				}
			} else {
				_ = thisObj["_"] || (thisObj["_"] = {});
				_[_shim_event_keyCodeUUID] = _keyCode;
	
				if ("keyLocation" in e) {
					//TODO:: tests
					_["_keyLocation"] = e.keyLocation;
				}
			}
		}
	
		function _keyDown_via_keyPress_Handler(e) {
			var _keyCode,
			    _charCode = e.which || e.keyCode,
			    thisObj = this,
			    _ = thisObj["_"],
			    _event,
			    need__stopImmediatePropagation__and__preventDefault,
			    vkCharacterKey,
			    __key;
	
			if (e["__stopNow"]) return;
	
			if (_ && _shim_event_keyCodeUUID in _) {
				_keyCode = _[_shim_event_keyCodeUUID];
				delete _[_shim_event_keyCodeUUID];
	
				e["__keyCode"] = _keyCode; //save keyCode from 'keydown' and 'keyup' for 'keypress'
	
				if (vkCharacterKey = VK__CHARACTER_KEYS__DOWN_UP[_keyCode]) {
					if (IS_NEED_KEYCODE_BUGFIX && vkCharacterKey._keyCode) {
						_keyCode = vkCharacterKey._keyCode;
					}
				}
	
				if ("keyLocation" in e && "_keyLocation" in _) {
					//webkit//TODO:: tests
					delete e.keyLocation;
					e.keyLocation = _["_keyLocation"];
				}
	
				if (__GCC__NEW_KEYBOARD_EVENTS_PROPOSAL__) {
					if (_keyCode < 91 && _keyCode > 64 && _charCode != _keyCode && !VK__CHARACTER_KEYS__DOWN_UP[_keyCode]) {
						vkCharacterKey = vkCharacterKey || (VK__CHARACTER_KEYS__DOWN_UP[_keyCode] = {});
						vkCharacterKey._keyCode = _keyCode;
					}
				}
	
				__key = vkCharacterKey && vkCharacterKey._key || String.fromCharCode(_keyCode).toLowerCase();
	
				e["__key"] = __key;
				e["__char"] = String.fromCharCode(_charCode);
	
				_event = new global["KeyboardEvent"]("keydown", e);
	
				delete _event["keyLocation"]; //webkit
				delete _event["__location"];
	
				if (canOverwrite_which) {
					//Not Safari
					delete _event["which"];
					_Object_defineProperty(_event, "which", { "value": _keyCode });
				} else {
					_event["__which"] = _keyCode;
				}
				if (canOverwrite_keyCode) {
					//Not IE9 | Not Safari
					delete _event["keyCode"];
					_Object_defineProperty(_event, "keyCode", { "value": _keyCode });
				}
				_event["__location"] = _getter_KeyboardEvent_location.call(_event);
	
				if (!_Event_prototype__native_key_getter) {
					//Not IE9 & Opera 12
					vkCharacterKey = vkCharacterKey || (vkCharacterKey = VK__CHARACTER_KEYS__DOWN_UP[_charCode] = VK__CHARACTER_KEYS__DOWN_UP[_keyCode] = {});
	
					vkCharacterKey._char = _event["char"];
	
					if (!__GCC__NEW_KEYBOARD_EVENTS_PROPOSAL__) {
						vkCharacterKey._key = vkCharacterKey._char;
					}
				}
	
				need__stopImmediatePropagation__and__preventDefault = !(e.target || thisObj).dispatchEvent(_event);
			} else {
	
				need__stopImmediatePropagation__and__preventDefault = !e.ctrlKey && (_ = VK__CHARACTER_KEYS__DOWN_UP[_charCode]) && ((typeof _ === "undefined" ? "undefined" : _typeof(_)) == "object" ? _._key || "" : _).length > 1 ? 2 //Only stopImmediatePropagation
				: 0 //Nothing
				;
			}
	
			if (need__stopImmediatePropagation__and__preventDefault) {
				if (need__stopImmediatePropagation__and__preventDefault === true) {
					e.preventDefault();
				}
	
				if (_Event_has_stopImmediatePropagation) {
					e.stopImmediatePropagation();
				} else {
					e["__stopNow"] = true;
					e.stopPropagation();
				}
			}
		}
	
		if (!_Event_prototype__native_char_getter) {
			[(tmp = global["Document"]) && tmp.prototype || global["document"], (tmp = global["HTMLDocument"]) && tmp.prototype, (tmp = global["Window"]) && tmp.prototype || global, (tmp = global["Node"]) && tmp.prototype, (tmp = global["Element"]) && tmp.prototype].forEach(function (prototypeToFix) {
				if (!prototypeToFix || !_hasOwnProperty(prototypeToFix, "addEventListener")) return;
	
				var old_addEventListener = prototypeToFix.addEventListener,
				    old_removeEventListener = prototypeToFix.removeEventListener;
	
				if (old_addEventListener) {
					prototypeToFix.addEventListener = function (type, listener, useCapture) {
						var thisObj = this,
						    _,
						    _eventsUUID,
						    _event_UUID,
						    _events_countUUID;
	
						if ((type + "").toLowerCase() === "keydown") {
	
							_eventsUUID = _event_eventsUUID + (useCapture ? "-" : "") + type;
							_event_UUID = _eventsUUID + (listener[_event_handleUUID] || (listener[_event_handleUUID] = ++UUID));
							_events_countUUID = _eventsUUID + "__count";
	
							if (!(_ = this["_"])) _ = this["_"] = {};
	
							if (_event_UUID in _) return;
	
							if (_[_events_countUUID] === void 0) {
								old_addEventListener.call(thisObj, "keypress", _keyDown_via_keyPress_Handler, true);
							}
	
							_[_events_countUUID] = (_[_events_countUUID] || 0) + 1;
	
							arguments[1] = _[_event_UUID] = _unSafeBind.call(_keyDownHandler, { _listener: listener, _this: this });
						}
	
						return old_addEventListener.apply(thisObj, arguments);
					};
	
					if (old_removeEventListener) prototypeToFix.removeEventListener = function (type, listener, useCapture) {
						var thisObj = this,
						    _,
						    _eventsUUID,
						    _event_UUID,
						    _events_countUUID;
	
						if ((type + "").toLowerCase() === "keydown") {
							_eventsUUID = _event_eventsUUID + (useCapture ? "-" : "") + type;
							_event_UUID = _eventsUUID + listener[_event_handleUUID];
							_events_countUUID = _eventsUUID + "__count";
							_ = thisObj["_"];
	
							if (_event_UUID && _ && _[_events_countUUID]) {
								--_[_events_countUUID];
	
								if (arguments[1] = _[_event_UUID]) {
									delete _[_event_UUID];
								}
							}
						}
	
						return old_removeEventListener.apply(thisObj, arguments);
					};
				}
			});
		} else {
			document.addEventListener("keydown", function (e) {
				var _char = _Event_prototype__native_char_getter ? _Event_prototype__native_char_getter.call(e) : e["char"],
				    _charCode = _char && _char.charCodeAt(0),
				    _keyCode,
				    vkCharacter,
				    vkCharacter_key;
				if (_charCode && !VK__CHARACTER_KEYS__DOWN_UP[_charCode += _KEYPRESS_VK__CHARACTER_KEYS__DOWN_UP_DELTA]) {
					vkCharacter = VK__CHARACTER_KEYS__DOWN_UP[_charCode] = {};
					_keyCode = e.keyCode;
					if (vkCharacter_key = VK__CHARACTER_KEYS__DOWN_UP[_keyCode]) {
						_char = (typeof vkCharacter_key === "undefined" ? "undefined" : _typeof(vkCharacter_key)) == "object" && vkCharacter_key._key || vkCharacter_key;
					} else {
						_char = String.fromCharCode(_keyCode);
					}
					if (_keyCode > 64 && _keyCode < 91 && _keyCode) {
						//a-z
						_char = _char.toLowerCase();
					}
					vkCharacter._key = _char;
				}
			}, true);
		}
	
		global["KeyboardEvent"] = _KeyboardEvent;
	
		_DOM_KEY_LOCATION_LEFT = _DOM_KEY_LOCATION_RIGHT = _DOM_KEY_LOCATION_NUMPAD = _DOM_KEY_LOCATION_MOBILE = _DOM_KEY_LOCATION_JOYSTICK = _Object_getOwnPropertyDescriptor = getObjectPropertyGetter = tmp = testKeyboardEvent = _KeyboardEvent = _KeyboardEvent_prototype = __i = _Event_prototype = _userAgent_ = _BROWSER = _IS_MAC = null;
	}.call(window);

/***/ }
/******/ ]);
//# sourceMappingURL=virtkeys.js.map
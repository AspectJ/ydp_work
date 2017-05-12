/**
 * Mini YUI base on YUI 3.3
 * ====================================================
 * Copyright (c) 2010, Yahoo! Inc. All rights reserved.
 * Code licensed under the BSD License:
 * http://developer.yahoo.com/yui/license.html
 *  Download by http://www.codefans.net
 */
if (typeof YUI === 'undefined' || !YUI) {
	var YUI = {
		Env:{
		    mods:{},
			interpret: function(value){
				return value == null ? '' : String(value);
			},
			_uidx: 0,
			_guidp: 'yui-',
			_sbid: 0
		},
		K: function(v){
			return v;
		},
		/**
         * Registers a module with the YUI global.  The easiest way to create a
         * first-class YUI module is to use the YUI component build tool.
         * 
         * 
         * The build system will produce the YUI.add wrapper for you module, along
         * with any configuration info required for the module.
         * 
         * <code>
         * <pre>
         *      YUI.add('Windows',function(S){},'1.1.0',{requires:'Message'})
         * </pre>
         * </code>
         * 
         * @method add
         * @static
         * @param {String}   name   module name
         * @param {Function} fn     entry point into the module that
         *                          is used to bind module to the YUI instance
         * @param {String} version  version string
         * @param {Object} details  optional config data:
         * requires: features that must be present before this module can be attached.
         * optional: optional features that should be present if loadOptional is
         *           defined.  Note: modules are not often loaded this way in YUI 3,
         *           but this field is still useful to inform the user that certain
         *           features in the component will require additional dependencies.
         * use:      features that are included within this module which need to be
         *           be attached automatically when this module is attached.  This
         *           supports the YUI 3 rollup system -- a module with submodules
         *           defined will need to have the submodules listed in the 'use'
         *           config.  The YUI component build tool does this for you.
         * @return {YUI} the YUI instance
         *
         */
		add: function(name, fn, version, details){
			details = details || {};
			
			var env = YUI.Env,
            mod  = {
                name: name, 
                fn: fn,
                version: version,
                details: details
            },
            loader,
            i;

            env.mods[name] = mod;
            env.versions[version] = env.versions[version] || {};
            env.versions[version][name] = mod;
			
			return this;
		},
        /**
         * Generate an id that is unique among all YUI instances
         * 
         * <code>
         * <pre>
         *      YUI.guid();
         *      // Returns 'sbi-1'
         *
         *      YUI.guid('$');
         *      // Returns '$sbi-2'
         * </pre>
         * </code>
         * 
         * @method guid
         * @static
         * @param {String} pre  optional guid prefix
         * @return {String} the guid
         */
		guid: function(pre){
			var Env = YUI.Env, id = YUI._guidp + (Env._uidx += 1);
			return (pre) ? (pre + id) : id;
		},
        /**
         * Returns a guid associated with an object.  If the object
         * does not have one, a new one is created unless readOnly
         * is specified.
         * @method stamp
         * @param o The object to stamp
         * @param readOnly {boolean} if true, a valid guid will only
         * be returned if the object has one assigned to it.
         * @return {string} The object's guid or null
         */
		stamp: function(o, readOnly){
			var uid;
			if (!o) {
				return o;
			}
			
			// IE generates its own unique ID for dom nodes
			// The uniqueID property of a document node returns a new ID
			if (o.uniqueID && o.nodeType && o.nodeType !== 9) {
				uid = o.uniqueID;
			}
			else {
				uid = (typeof o === 'string') ? o : o._sbid;
			}
			
			if (!uid) {
				uid = YUI.guid();
				if (!readOnly) {
					try {
						o._sbid = uid;
					} 
					catch (e) {
						uid = null;
					}
				}
			}
			
			return uid;
		},
		/**
         * Returns the namespace specified and creates it if it doesn't exist
         * 
         * <code>
         * <pre>
         *     YUI.namespace("property.package");
         *     YUI.namespace("YUI.property.package");
         * </pre>
         * </code>
         * 
         * Either of the above would create YUI.property, then
         * YUI.property.package (YUI is scrubbed out, this is
         * to remain compatible with YUI Class)
         * 
         * Be careful when naming packages. Reserved words may work in some browsers
         * and not others. For instance, the following will fail in Safari:
         * 
         * <code>
         * <pre>
         *     YUI.namespace("really.long.nested.namespace");
         * </pre>
         * </code>
         * 
         * This fails because "long" is a future reserved word in ECMAScript
         * @method namespace
         * @static
         * @param  {String*} arguments 1-n namespaces to create 
         * @return {Object}  A reference to the last namespace object created
         */
		namespace: function(){
			var a = arguments, o = null, i, j, d;
			for (i = 0; i < a.length; i = i + 1) {
				d = ('' + a[i]).split('.');
				o = this;
				for (j = (d[0] === 'YUI') ? 1 : 0; j < d.length; j = j + 1) {
					o[d[j]] = o[d[j]] || {};
					o = o[d[j]];
				}
			}
			return o;
		}
    };
}			

// ==================== Value Type Detection Stuff ==================== //		
(function(){
	var ARRAY = 'array', 
	    BOOLEAN = 'boolean', 
		DATE = 'date', 
		ERROR = 'error', 
		FUNCTION = 'function', 
		NUMBER = 'number', 
		NULL = 'null', 
		OBJECT = 'object', 
		REGEX = 'regexp', 
		STRING = 'string', 
		UNDEFINED = 'undefined', 
		TYPES = {
			'undefined': UNDEFINED,
			'number': NUMBER,
			'boolean': BOOLEAN,
			'string': STRING,
			'[object Function]': FUNCTION,
			'[object RegExp]': REGEX,
			'[object Array]': ARRAY,
			'[object Date]': DATE,
			'[object Error]': ERROR
		}, 
		OP = Object.prototype, 
		TOSTRING = OP.toString;
	
	YUI.getType = function(o){
			return TYPES[typeof o] || TYPES[TOSTRING.call(o)] || (o ? OBJECT : NULL);
	};
	
    /**
     * Determines wheather or not the provided object is an array.
     * <code>
     * <pre>
     *      YUI.isArray(['yao',1]);
     *      // Returns true
     * </pre>
     * </code>
     * @method isArray
     * @static
     * @private
     * @param {any} arr The object being testing
     * @return {boolean} the result
     */
	YUI.isArray = function(obj){
		return YUI.getType(obj) === ARRAY;
	};
	
    /**
     * 检测对象是否为类似数组类型
     * <code>
     * <pre>
     *      YUI.isArrayLike(document.getElementsByTagName('div'));
     *      // Returns true
     * </pre>
     * </code>
     * @param {Object} v
     */
	YUI.isArrayLike = function(v){
		if (YUI.isArray(v) || v.callee) {
			return true;
		}
		
		if (/NodeList|HTMLCollection/.test(TOSTRING.call(v))) {
			return true;
		}
		
		return ((!YUI.isUndefined(v.nextNode) || v.item) && YUI.isNumber(v.length));
	};
		
	YUI.isPrimitive = function(v){
		return YUI.isString(v) || YUI.isNumber(v) || YUI.isBoolean(v);
	};
	
    /**
     * Determines whether or not the provided object is a string
     * <code>
     * <pre>
     *      YUI.isString(document.getElementsByTagName('div'));
     *      // Returns false
     *
     *      YUI.isString('div');
     *      // Returns true
     * </pre>
     * </code>
     * @method isString
     * @static
     * @param {any} str The object being testing
     * @return {boolean} the result
     */
	YUI.isString = function(s){
		return typeof s === 'string';
	};
		
    /**
     * Determines whether or not the provided object is a boolean
     * <code>
     * <pre>
     *      YUI.isBoolean(document.getElementsByTagName('div'));
     *      // Returns false
     *
     *      YUI.isBoolean(0);
     *      // Returns true
     *
     *      YUI.isBoolean(false);
     *      // Returns true
     * </pre>
     * </code>
     * @method isBoolean
     * @static
     * @param {any} bln The object being testing
     * @return {boolean} the result
     */
	YUI.isBoolean = function(b){
		return typeof b === 'boolean';
	};
		
    /**
     * Determines whether or not the provided object is a function.
     * Note: Internet Explorer thinks certain functions are objects:
     *
     * <pre>
     * var obj = document.createElement("object");
     * YUI.isFunction(obj.getAttribute) // reports false in IE
     *
     * var input = document.createElement("input"); // append to body
     * YUI.isFunction(input.focus) // reports false in IE
     * </pre>
     *
     * You will have to implement additional tests if these functions
     * matter to you.
     *
     * @method isFunction
     * @static
     * @param {any} fn The object being testing
     * @return {boolean} the result
     */
	YUI.isFunction = function(fn){
		return YUI.getType(fn) === FUNCTION;
	};
		
    /**
     * Returns true if the passed object is a JavaScript date object, otherwise false.
     *
     * <pre>
     *     YUI.isDate('2011-03-09');
     *     // Returns false
     *
     *     YUI.isDate(new Date('2011-03-09'));
     *     // Returns true
     * </pre>
     *
     * @method isData
     * @static
     * @param {Object} object The object to test
     * @return {Boolean}
     */
	YUI.isDate = function(o){
		return YUI.getType(o) === DATE && o.toString() !== 'Invalid Date' && !isNaN(o);
	};
		
    /**
     * Determines whether or not the provided object is a null
     *
     * <code>
     * <pre>
     *     YUI.isNull('2011-03-09');
     *     // Returns false
     *
     *     YUI.isNull('');
     *     // Returns false
     *
     *     YUI.isNull(null);
     *     // Returns true
     * </pre>
     * </code>
     *
     * @method isNull
     * @static
     * @param {Object} obj - an object
     * @return {Boolean}
     */
	YUI.isNull = function(obj){
		return obj === null;
	};
		
    /**
     * Determines whether or not the provided item is a legal number
     *
     * <code>
     * <pre>
     *     YUI.isNumber('2011-03-09');
     *     // Returns false
     *
     *     YUI.isNumber(2011);
     *     // Returns true
     * </pre>
     * </code>
     *
     * @method isNumber
     * @static
     * @param o The object to test
     * @return {boolean} true if o is a number
     */
	YUI.isNumber = function(num){
		return typeof num === NUMBER && isFinite(num);
	};
		
    /**
     * Determines whether or not the provided item is of type object
     * or function
     *
     * <code>
     * <pre>
     *     YUI.isObject('2011-03-09');
     *     // Returns false
     *
     *     YUI.isObject(new Date('2011-03-09'));
     *     // Returns true
     *
     *     YUI.isObject([]);
     *     // Returns true
     *
     *     YUI.isObject(function(){});
     *     // Returns true
     *
     *     YUI.isObject({});
     *     // Returns true
     * </pre>
     * </code>
     *
     * @method isObject
     * @static
     * @param o The object to test
     * @param failfn {boolean} fail if the input is a function
     * @return {boolean} true if o is an object
     */
	YUI.isObject = function(o, failfn){
		var t = typeof o;
		return (o && (t === OBJECT || (!failfn && (t === FUNCTION || YUI.isFunction(o))))) || false;
	};
		
    /**
     * 检测对象是否为纯粹的Object类型
     *
     * <code>
     * <pre>
     *      YUI.isPlainObject(document.getElementById('side'));
     *      // Returns false
     * </pre>
     * </code>
     *
     * @method isPlainObject
     * @static
     * @param {Object} obj
     * @return {Boolean}
     */
	YUI.isPlainObject = function(obj){
		var key, hasOwn = OP.hasOwnProperty;
		
		if (!obj || TOSTRING.call(obj) !== '[object Object]' || obj.nodeType || obj.setInterval) {
			return false;
		}
		
		if (obj.constructor && !hasOwn.call(obj, "constructor") && !hasOwn.call(obj.constructor.prototype, 'isPrototypeOf')) {
			return false;
		}
		
		for (key in obj) {
		}
		
		return key === undefined || hasOwn.call(obj, key);
	};
		
    /**
     * 检测对象是否为空对象
     *
     * <code>
     * <pre>
     *     var emptyObject = {};
     *     YUI.isEmptyObject(emptyObject);
     *     // Returns true
     * </pre>
     * </code>
     *
     * @method isEmptyObject
     * @static
     * @param {Object} o
     * @return {Boolean} true if the object is empty
     */
	YUI.isEmptyObject = function(o){
		if (YUI.isObject(o)) {
			var i;
			for (i in o) {
				if (YUI.hasOwnProperty(o, i)) {
					return false;
				}
			}
			return true;
		}
	};
		
    /**
     * Determines whether or not the provided object is undefined
     *
     * <code>
     * <pre>
     *     var emptyObject;
     *     YUI.isUndefined(emptyObject);
     *     // Returns true
     * </pre>
     * </code>
     *
     * @method isUndefined
     * @static
     * @param {any} obj The object being testing
     * @return {boolean} the result
     */
	YUI.isUndefined = function(obj){
		return typeof obj === UNDEFINED;
	};
		
    /**
     * A convenience method for detecting a legitimate non-null value.
     * Returns false for null/undefined/NaN, true for other values,
     * including 0/false/''
     *
     * <code>
     * <pre>
     *     YUI.isValue([]);
     *     // Returns true
     * </pre>
     * </code>
     *
     * @method isValue
     * @static
     * @param o The item to test
     * @return {boolean} true if it is not null/undefined/NaN || false
     */
	YUI.isValue = function(o){
		var t = YUI.getType(o);
		switch (t) {
			case NUMBER:
				return isFinite(o);
			case NULL:
			case UNDEFINED:
				return false;
			default:
				return !!(t);
		}
	};
		
    /**
     * <p>Returns true if the passed value is empty.</p>
     * <p>The value is deemed to be empty if it is</p>
     * <div class="mdetail-params">
     * <ul>
     * <li>null</li>
     * <li>undefined</li>
     * <li>an empty array</li>
     * <li>a zero length string (Unless the <tt>allowBlank</tt> parameter is <tt>true</tt>)</li>
     * </ul>
     * </div>
     * @method isEmptyValue
     * @static
     * @param {Mixed} value The value to test
     * @param {Boolean} allowBlank (optional) true to allow empty strings (defaults to false)
     * @return {Boolean}
     */
	YUI.isEmptyValue = function(v, allowBlank){
		return v === null || v === undefined || ((YUI.isArray(v) && !v.length)) || (!allowBlank ? v === '' : false);
	};
		
    /**
     * Determines whether or not the provided object is a legal XML formatd data
     * @method isXML
     * @static
     * @param {Object} xmlDoc - the Data to test
     * @return {Boolean}
     */
	YUI.isXML = function(xmlDoc){
		var documentElement = (xmlDoc ? xmlDoc.ownerDocument || xmlDoc : 0).documentElement;
		return documentElement ? documentElement.nodeName !== 'HTML' : false;
	};
		
    /**
     * Determines whether or not the provided object is a legal JSON formatd data
     * @method isJSON
     * @static
     * @param {Object} json - the Data to test
     * @return {Boolean}
     */
	YUI.isJSON = function(json){
		json = json.replace(/\\./g, '@').replace(/"[^"\\\n\r]*"/g, '');
		return /^[,:{}\[\]0-9.\-+Eaeflnr-u \n\r\t]*$/.test(json);
	};
		
    /**
     * Determines whether or not the provided object is a legal HTMLElement element node
     * @method isHTMLElement
     * @static
     * @param {HTMLElement | Object} obj
     * @return {Boolean}
     */
	YUI.isHTMLElement = function(node){
		return node && node.nodeType === 1;
	};
		
    /**
     * Determines whether or not the provided object is a legal hash
     * @method isHash
     * @static
     * @param {Hash | Object} obj
     * @return {Boolean}
     */
	YUI.isHash = function(obj){
		return obj instanceof Hash;
	};
		
    /**
     * Determines whether or not the property was added
     * to the object instance.  Returns false if the property is not present
     * in the object, or was inherited from the prototype.
     * This abstraction is provided to enable hasOwnProperty for Safari 1.3.x.
     * There is a discrepancy between YUI.hasOwnProperty and
     * Object.prototype.hasOwnProperty when the property is a primitive added to
     * both the instance AND prototype with the same value:
     *
     * <code>
     * <pre>
     *     var A = function() {};
     *         A.prototype.foo = 'foo';
     *     var a = new A();
     *         a.foo = 'foo';
     *     alert(a.hasOwnProperty('foo')); // true
     *     alert(YUI.hasOwnProperty(a, 'foo')); // false when using fallback
     * </pre>
     * </code>
     *
     * @method hasOwnProperty
     * @static
     * @param {any} o The object being testing
     * @param prop {string} the name of the property to test
     * @return {boolean} the result
     */
	YUI.hasOwnProperty = function(obj, prper){
		return obj && obj.hasOwnProperty && obj.hasOwnProperty(prper);
	};
})();


// ==================== Browser user agent detection Stuff ==================== //
/**
 * YUI user agent detection.
 * Do not fork for a browser if it can be avoided.  Use feature detection when
 * you can.  Use the user agent as a last resort.  ua stores a version
 * number for the browser engine, 0 otherwise.  This value may or may not map
 * to the version number of the browser using the engine.  The value is
 * presented as a float so that it can easily be used for boolean evaluation
 * as well as for looking for a particular range of versions.  Because of this,
 * some of the granularity of the version info may be lost (e.g., Gecko 1.8.0.9
 * reports 1.8).
 * @class ua
 */
(function(){
	var win = window, 
	    doc = win && win.document, 
		nav = win && win.navigator, 
		ua = nav.userAgent, 
		pf = nav.platform.toLowerCase(), 
		loc = window && window.location, 
		href = loc && loc.href, 
		numberify = function(str){
			var c = 0;
			return parseFloat(str.replace(/\./g, function(){
				return (c++ == 1) ? '' : '.';
			}));
		}, 
		m, 
		ie = 0, 
		opera = 0, 
		gecko = 0, 
		webkit = 0, 
		chrome = 0, 
		mobile = null, 
		air = 0, 
		ipad = 0, 
		iphone = 0, 
		ipod = 0, 
		ios = null, 
		android = 0, 
		caja = nav && nav.cajaVersion, 
		secure = false, 
		os = null;
	
	secure = href && (href.toLowerCase().indexOf("https") === 0);
	
	if (ua) {
		if ((/windows|win32/i).test(ua)) {
			os = 'windows';
		}
		else {
			if ((/macintosh/i).test(ua)) {
				os = 'macintosh';
			}
			else {
				if ((/rhino/i).test(ua)) {
					os = 'rhino';
				}
				else {
					if ((/x11|liunx/i.test(pf))) {
						os = 'linux';
					}
					else {
						if ((/Wii/i).test(ua)) {
							os = 'Wii';
						}
						else {
							if ((/playstation/i.test(ua))) {
								os = 'playstation';
							}
						}
					}
				}
			}
		}
		
		// Modern KHTML browsers should qualify as Safari X-Grade
		if ((/KHTML/).test(ua)) {
			webkit = 1;
		}
		// Modern WebKit browsers are at least X-Grade
		m = ua.match(/AppleWebKit\/([^\s]*)/);
		if (m && m[1]) {
			webkit = numberify(m[1]);
			
			// Mobile browser check
			if (/ Mobile\//.test(ua)) {
				mobile = "Apple"; // iPhone or iPod Touch
				m = ua.match(/OS ([^\s]*)/);
				if (m && m[1]) {
					m = numberify(m[1].replace('_', '.'));
				}
				ipad = (pf === 'ipad') ? m : 0;
				ipod = (pf == 'ipod') ? m : 0;
				iphone = (pf === 'iphone') ? m : 0;
				ios = ipad || iphone || ipod;
			}
			else {
				m = ua.match(/NokiaN[^\/]*|Android \d\.\d|webOS\/\d\.\d/);
				if (m) {
					mobile = m[0]; // Nokia N-series, Android, webOS, ex: NokiaN95
				}
				if (/ Android/.test(ua)) {
					mobile = 'Android';
					m = ua.match(/Android ([^\s]*);/);
					if (m && m[1]) {
						android = numberify(m[1]);
					}
					
				}
			}
			
			m = ua.match(/Chrome\/([^\s]*)/);
			if (m && m[1]) {
				chrome = numberify(m[1]); // Chrome
			}
			else {
				m = ua.match(/AdobeAIR\/([^\s]*)/);
				if (m) {
					air = m[0]; // Adobe AIR 1.0 or better
				}
			}
		}
		
		if (!webkit) { // not webkit
			// @todo check Opera/8.01 (J2ME/MIDP; Opera Mini/2.0.4509/1316; fi; U; ssr)
			m = ua.match(/Opera[\s\/]([^\s]*)/);
			if (m && m[1]) {
				opera = numberify(m[1]);
				m = ua.match(/Opera Mini[^;]*/);
				if (m) {
					mobile = m[0]; // ex: Opera Mini/2.0.4509/1316
				}
			}
			else { // not opera or webkit
				m = ua.match(/MSIE\s([^;]*)/);
				if (m && m[1]) {
					ie = numberify(m[1]);
				}
				else { // not opera, webkit, or ie
					m = ua.match(/Gecko\/([^\s]*)/);
					if (m) {
						gecko = 1; // Gecko detected, look for revision
						m = ua.match(/rv:([^\s\)]*)/);
						if (m && m[1]) {
							gecko = numberify(m[1]);
						}
					}
				}
			}
		}
	}
	
	// remove CSS image flicker
	if (ie === 6) {
		try {
			doc.execCommand("BackgroundImageCache", false, true);
		} 
		catch (e) {
		}
	}
	
	YUI.ua = {
		ie: ie,
		opera: opera,
		gecko: gecko,
		webkit: webkit,
		chrome: chrome,
		mobile: mobile,
		air: air,
		ipad: ipad,
		iphone: iphone,
		ipod: ipod,
		ios: ios,
		android: android,
		caja: caja,
		secure: secure,
		os: os
	};
	
	YUI.isIE = ie;
	YUI.isIE6 = (ie===6);
	YUI.isOpera = opera;
	YUI.isGecko = gecko;
	YUI.isWebKit = webkit;
	YUI.isSafari = webkit;
	YUI.isChrome = chrome;
	YUI.isMobile = mobile;
	YUI.isAir = air;
	YUI.isiPad = ipad;
	YUI.isiPhone = iphone;
	YUI.isiPod = ipod;
	YUI.isiOS = ios;
	YUI.isAndroid = android;
	YUI.isCaja = caja;
	YUI.isSecure = secure;
	YUI.isWindows = (os === 'windows');
	YUI.isMac = (os === 'macintosh');
	YUI.isRhino = (os === 'rhino');
	YUI.isLinux = (os === 'linux');
	YUI.isWii = (os === 'Wii');
	YUI.isPlayStation = (os === 'playstation');
})();


// ==================== Core Object Extend Stuff ==================== //
(function(){
    var Native = Array.prototype;
    /**
     * Returns a (css property) string camel style formatted.
     * @method toCamel
     * @param {String} property
     * @return {String}
     */
    YUI.toCamel = function(property){
        var x = {}, G = function(y, z){
            return z.toUpperCase();
        };
        return x[property] || (x[property] = property.indexOf("-") === -1 ? property : property.replace(/-([a-z])/gi, G));
    };
	
	/**
     * 返回一个值在数组中的索引值，不存在则返回-1
     * 
     * <code>
     * <pre>
     *     var arr = [0,'4',4,22,'22',{name:'robert',age:26}];
     *     indexOf(arr, '4'); // Returns 1
     *     indexOf(arr, 4);   // Returns 2
     * </pre>
     * </code>
     * 
     * @method indexOf
     * @param {Array} a
     * @param {Any Value} val
     * @return {Number}
     */
    YUI.indexOf = (Native.indexOf) ? function(a, val){
		return Native.indexOf.call(a, val);
	}: function(a, val){
		var i = 0, len;
		for (len = a.length; i < len; i = i + 1) {
			if (a[i] === val) {
				return i;
			}
		}
		
		return -1;
	};
		
		
})();


// ==================== DOM Stuff ==================== //
(function(){		
	var doc = document,
	    body = doc.body,
	    docEl = doc.documentElement, 
	    defaultView = doc.defaultView,
	    NODE_TYPE = 'nodeType',
		
		Y = YUI,		
		isIE = Y.isIE,			
		isString = Y.isString,
		isArray = Y.isArray;
				
		
	// 通过节点id获取节点
	YUI.getEl = function(elem){
		var elemID, E, m, i, k, length, len;
		if (elem) {
			if (elem[NODE_TYPE] || elem.item) {
				return elem;
			}
			if (isString(elem)) {
				elemID = elem;
				elem = doc.getElementById(elem);
				if (elem && elem.id === elemID) {
					return elem;
				}
				else {
					if (elem && elem.all) {
						elem = null;
						E = doc.all[elemID];
						for (i = 0, len = E.length; i < len; i += 1) {
							if (E[i].id === elemID) {
								return E[i];
							}
						}
					}
				}
				return elem;
			}
			else {
				if (elem.DOM_EVENTS) {
					elem = elem.get("element");
				}
				else {
					if (isArray(elem)) {
						m = [];
						for (k = 0, length = elem.length; k < length; k += 1) {
							m[m.length] = arguments.callee(elem[k]);
						}
						return m;
					}
				}
			}
		}
		return null;
	};
	YUI.byId = function(id){
		return Y.getEl(id);
	};
				
				
    /**
     * 通过className获得一个NodeList
     * 
     * @method getElByClassName
     * @static
     * @param {String} className
     * @param {String} tag
     * @param {String|HTMLElement} root
     * @return {NodeList}
     */
	YUI.getElByClassName = function(className, tag, root){
		var elems = [], 
		    tempCnt = Y.getEl(root || doc).getElementsByTagName(tag),
		    i,  
		    len = tempCnt.length;
		
		for (i = 0; i < len; ++i) {
			if (Y.hasClass(tempCnt[i], className)) {
				elems.push(tempCnt[i]);
			}
		}
		
		if (elems.length < 1) {
			return false;
		}
		else {
			return elems;
		}
	};
	YUI.byClass = function(className, tag, root){
		return Y.getElByClassName(className, tag, root);
	};
				
    /**
     * Determines whether a DOM element has the given className.
     * @method hasClass
     * @static
     * @param {HTMLElement} element The DOM element.
     * @param {String} className the class name to search for
     * @return {Boolean} Whether or not the element has the given class.
     */
	YUI.hasClass = function(elem, className){
		var has = new RegExp("(?:^|\\s+)" + className + "(?:\\s+|$)");
		return has.test(elem.className);
	};	
    /**
     * Adds a class name to a given DOM element.
     * @method addClass
     * @static
     * @param {HTMLElement} element The DOM element.
     * @param {String} className the class name to add to the class attribute
     */
	YUI.addClass = function(elem, className){
		if (Y.hasClass(elem, className)) {
			return;
		}
		elem.className = [elem.className, className].join(" ");
	};		
    /**
     * Removes a class name from a given element.
     * @method removeClass
     * @static
     * @param {HTMLElement} element The DOM element.
     * @param {String} className the class name to remove from the class attribute
     */
	YUI.removeClass = function(elem, className){
		var hasClass = Y.hasClass, 
			replace = new RegExp("(?:^|\\s+)" + className + "(?:\\s+|$)", "g"),
			o = null;
			
		if (!hasClass(elem, className)) {
			return;
		}
		
		o = elem.className;
		elem.className = o.replace(replace, " ");
		
		if (hasClass(elem, className)) {
			Y.removeClass(elem, className);
		}
	};
    /**
     * Replace a class with another class for a given element.
     * If no oldClassName is present, the newClassName is simply added.
     * @method replaceClass
     * @static
     * @param {HTMLElement} element The DOM element
     * @param {String} oldClassName the class name to be replaced
     * @param {String} newClassName the class name that will be replacing the old class name
     */
	YUI.replaceClass = function(elem, newClass, oldClass){
		if (newClass === oldClass) {
			return false;
		}
		var hasClass = Y.hasClass, 
		    has = new RegExp("(?:^|\\s+)" + newClass + "(?:\\s+|$)", "g");
		
		if (!hasClass(elem, newClass)) {
			Y.addClass(elem, oldClass);
			return;
		}
		
		elem.className = elem.className.replace(has, " " + oldClass + " ");
		
		if (hasClass(elem, newClass)) {
			Y.replaceClass(elem, newClass, oldClass);
		}
	};
				
    /**
     * Returns the current style value for the given property.
     * @method getStyle
     * @static
     * @param {HTMLElement} An HTMLElement to get the style from.
     * @param {String} property The style property to get.
     */
    YUI.getStyle = function(el, property){
        var value = null, val = 100, toCamel = Y.toCamel;
        
        if (defaultView && defaultView.getComputedStyle) {
            if (property === 'float') {
                property = 'cssFloat';
            }
            var computed = defaultView.getComputedStyle(el, '');
            if (computed) {
                value = computed[toCamel(property)];
            }
            return el.style[property] || value;
        }
        else {
            if (docEl.currentStyle && isIE) {
                switch (toCamel(property)) {
                    case 'opacity':
                        try {
                            val = el.filters['DXImageTransform.Microsoft.Alpha'].opacity;
                        } 
                        catch (e) {
                            try {
                                val = el.filters('alpha').opacity;
                            } 
                            catch (e) {
                            }
                        }
                        return val / 100;
                        break;
                    case 'float':
                        property = 'styleFloat';
                    default:
                        value = el.currentStyle ? el.currentStyle[property] : null;
                        return (el.style[property] || value);
                }
            }
            else {
                return el.style[property];
            }
        }
    };		
    /**
     * Sets a style property for a given element.
     * @method setStyle
     * @param {HTMLElement} el An HTMLElement to apply the style to.
     * @param {String} property The style property to set.
     * @param {String|Number} val The value.
     */
	YUI.setStyle = function(el, property, val){
		if (isIE) {
			switch (property) {
				case 'opacity':
					if (isString(el.style.filter)) {
						el.style.filter = 'alpha(opacity=' + val * 100 + ')';
						if (!el.currentStyle || !el.currentStyle.hasLayout) {
							el.style.zoom = 1;
						}
					}
					break;
				case 'float':
					property = 'styleFloat';
				default:
					el.style[property] = val;
			}
		}
		else {
			if (property === 'float') {
				property = 'cssFloat';
			}
			el.style[property] = val;
		}
	};		
    /**
     * Sets multiple style properties.
     * @method setStyles
     * @static
     * @param {HTMLElement} node An HTMLElement to apply the styles to.
     * @param {Object} hash An object literal of property:value pairs.
     * @return {HTMLELement}
     */
    YUI.setStyles = function(el, propertys){
        var p;
        for (p in propertys) {
            Y.setStyle(el, p, propertys[p]);
        }
    };
	YUI.setOpacity = function(el, val){
		Y.setStyle(el, 'opacity', val);
	};
				
    /**
     * Gets the current position of an element based on page coordinates.
     * Element must be part of the DOM tree to have page coordinates
     * (display:none or elements not appended return false).
     * @method getPageXY
     * @static
     * @param element The target element
     * @return {Array} The XY position of the element
     * @TODO: test inDocument/display?
     */
    YUI.getPageXY = function(el){
        var x = Y.getPageX(el), y = Y.getPageY(el);
        return [x, y];
    };	
    YUI.getXY = function(el){
        return Y.getPageXY(el);
    };		
    /**
     * Gets the current X position of an element based on page coordinates.
     * Element must be part of the DOM tree to have page coordinates
     * (display:none or elements not appended return false).
     * @method getPageX
     * @static 
     * @param element The target element
     * @return {Int} The X position of the element
     */
    YUI.getPageX = function(el){
        var box = null, parentNode = null, left = 0;
        if (el.getBoundingClientRect) {
            box = el.getBoundingClientRect();
            left = box.left + Math.max(docEl.scrollLeft, body.scrollLeft);
        }
        else {
            left = el.offsetLeft;
            parentNode = el.offsetParent;
            if (parentNode != el) {
                while (parentNode) {
                    left += parentNode.offsetLeft;
                    parentNode = parentNode.offsetParent;
                }
            }
        }
        return left;
    };		
    YUI.getX = function(el){
        return Y.getPageX(el);
    };		
    /**
     * Gets the current Y position of an element based on page coordinates.
     * Element must be part of the DOM tree to have page coordinates
     * (display:none or elements not appended return false).
     * @method getPageY
     * @param element The target element
     * @return {Int} The Y position of the element
     */
    YUI.getPageY = function(el){
        var box = null, parentNode = null, top = 0;
        if (el.getBoundingClientRect) {
            box = el.getBoundingClientRect();
            top = box.top + Math.max(docEl.scrollTop, body.scrollTop);
        }
        else {
            top = el.offsetTop;
            parentNode = el.offsetParent;
            if (parentNode != el) {
                while (parentNode) {
                    top += parentNode.offsetTop;
                    parentNode = parentNode.offsetParent;
                }
            }
        }
        return top;
    };	
	YUI.getY = function(el){
		return Y.getPageY(el);
	};
})();				

(function(){
    var Y = YUI,
	    isString = Y.isString,
		
		listeners = [],
		lastError = {};
		
	/**
	 * 给DOM节点添加事件处理函数
	 * @method addListener
	 * @param {HTMLElement} el
	 * @param {Event} sType
	 * @param {Function} fn
	 * @param {Object} obj
	 * @param {Obejct} overrideContext
	 * @param {Boolean} bCapture
	 * @return {Boolean}
	 */
	YUI.addListener = function(el, sType, fn, obj, overrideContext, bCapture){
		var oEl = null, context = null, wrappedFn = null;
		if (isString(el)) {
			oEl = getEl(el);
			el = oEl;
		}
		if (!el || !fn || !fn.call) {
			return false;
		}
		context = el;
		if (overrideContext) {
			if (overrideContext === true) {
				context = obj;
			}
			else {
				context = overrideContext;
			}
		}
		wrappedFn = function(e){
			return fn.call(context, Y.getEvent(e, el), obj);
		};
		try {
			try {
				el.addEventListener(sType, wrappedFn, bCapture);
			} 
			catch (e) {
				try {
					el.attachEvent('on' + sType, wrappedFn);
				} 
				catch (e) {
					el['on' + sType] = wrappedFn;
				}
			}
		} 
		catch (e) {
			lastError = e;
			this.removeListener(el, sType, wrappedFn, bCapture);
			return false;
		}
		if ('unload' != sType) {
			// cache the listener so we can try to automatically unload
			listeners[listeners.length] = [el, sType, fn, wrappedFn, bCapture];
		}
		return true;
	};
	/**
	 * 给DOM节点添加事件处理函数（只触发冒泡事件流）
	 * @method on
	 * @param {Object} el
	 * @param {Object} sType
	 * @param {Object} fn
	 * @param {Object} obj
	 * @param {Object} overrideContext
	 */
	YUI.on = function(el, sType, fn, obj, overrideContext){
		var oEl = obj || el, scope = overrideContext || this;
		return Y.addListener(el, sType, fn, oEl, scope, false);
	};
	
	/**
	 * 给DOM节点移除事件处理函数
	 * @method removeListener
	 * @param {HTMLElement} el
	 * @param {Event} sType
	 * @param {Function} fn
	 * @param {Boolean} bCapture
	 * @return {Boolean}
	 */
	YUI.removeListener = function(el, sType, fn, bCapture){
		try {
			if (window.removeEventListener) {
				return function(el, sType, fn, bCapture){
					el.removeEventListener(sType, fn, (bCapture));
				};
			}
			else {
				if (window.detachEvent) {
					return function(el, sType, fn){
						el.detachEvent("on" + sType, fn);
					};
				}
				else {
					return function(){
					};
				}
			}
		} 
		catch (e) {
			lastError = e;
			return false;
		}
		
		return true;
	};
	
	/**
	 * 停止事件
	 * @method stopEvent
	 * @param {Event} evt
	 */
	YUI.stopEvent = function(evt){
		Y.stopPropagation(evt);
		Y.preventDefault(evt);
	};
	
	/**
	 * 阻止DOM的事件流
	 * @method stopPropagation
	 * @param {Object} evt
	 */
	YUI.stopPropagation = function(evt){
		if (evt.stopPropagation) {
			evt.stopPropagation();
		}
		else {
			evt.cancelBubble = true;
		}
	};
	/**
	 * 阻止DOM的默认事件
	 * @method preventDefault
	 * @param {Object} evt
	 */
	YUI.preventDefault = function(evt){
		if (evt.preventDefault) {
			evt.preventDefault();
		}
		else {
			evt.returnValue = false;
		}
	};
	
	/**
	 * 获得绑定的事件
	 * @method getEvent
	 * @param {Event} e
	 */
	YUI.getEvent = function(e){
		var ev = e || window.event;
		
		if (!ev) {
			var c = arguments.callee.caller;
			while (c) {
				ev = c.arguments[0];
				if (ev && Event == ev.constructor) {
					break;
				}
				c = c.caller;
			}
		}
		
		return ev;
	};
})();


// ==================== Ajax Stuff ==================== //
(function(){
    /**
     * 创建XMLHttpRequest对象
     * @method getXHR
     * @static
     * @return {XMLHttpRequest}
     */
	YUI.getXHR = function(){
		var XHR = null;
		try {
			XHR = new XMLHttpRequest();
		} 
		catch (e) {
			if (window.ActiveXObject) {
				XHR = new ActiveXObject("Microsoft.XMLHTTP");
			}
			else {
				throw new Error("Your browser does not support XMLHTTPRequest Object.");
				return false;
			}
		}
		return XHR;
	};
	
    /**
     * Ajax请求方法
     *
     * <code>
     * <pre>
     *
     * </pre>
     * </code>
     *
     * @method ajaxRequest
     * @static    
     */
	YUI.ajaxRequest = function(serviceId,data,dataType,callback){
		publicAjaxRequest(serviceId,data,dataType,callback);
	};
})();


// ==================== JSON Stuff ==================== //
/**
 * http://www.JSON.org/json2.js
 * 2011-01-18
 * by:Douglas Crockford
 * @class JSON
 */
(function(){
	"use strict";

    var f = function(n){
		return n < 10 ? '0' + n : n;
	},
	cx = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
    escapable = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
    gap,
    indent,
	// table of character substitutions
    meta = {
		'\b': '\\b',
		'\t': '\\t',
		'\n': '\\n',
		'\f': '\\f',
		'\r': '\\r',
		'"': '\\"',
		'\\': '\\\\'
	},
    rep,
	quote = function(string){
	 	escapable.lastIndex = 0;
	 	return escapable.test(string) ? '"' +
	 	string.replace(escapable, function(a){
	 		var c = meta[a];
	 		return typeof c === 'string' ? c : '\\u' + ('0000' + a.charCodeAt(0).toString(16)).slice(-4);
	 	}) +
	 	'"' : '"' + string + '"';
	},
    str = function(key, holder){
        var i, // The loop counter.
            k, // The member key.
            v, // The member value.
            length, 
			mind = gap, 
			partial, 
			value = holder[key];
         
        if (value && typeof value === 'object' && typeof value.toJSON === 'function') {
            value = value.toJSON(key);
        }
         
        if (typeof rep === 'function') {
            value = rep.call(holder, key, value);
        }
         
        switch (typeof value) {
			case 'string':
				return quote(value);
			case 'number':
				return isFinite(value) ? String(value) : 'null';
			case 'boolean':
			case 'null':
				return String(value);
			case 'object':
				if (!value) {
					return 'null';
				}
				
				gap += indent;
				partial = [];
				
				if (Object.prototype.toString.apply(value) === '[object Array]') {
					length = value.length;
					for (i = 0; i < length; i += 1) {
						partial[i] = str(i, value) || 'null';
					}
					
					v = partial.length === 0 ? '[]' : gap ? '[\n' + gap + partial.join(',\n' + gap) + '\n' + mind + ']' : '[' + partial.join(',') + ']';
					gap = mind;
					return v;
				}
				
				if (rep && typeof rep === 'object') {
					length = rep.length;
					for (i = 0; i < length; i += 1) {
						k = rep[i];
						if (typeof k === 'string') {
							v = str(k, value);
							if (v) {
								partial.push(quote(k) + (gap ? ': ' : ':') + v);
							}
						}
					}
				}
				else {
					for (k in value) {
						if (Object.hasOwnProperty.call(value, k)) {
							v = str(k, value);
							if (v) {
								partial.push(quote(k) + (gap ? ': ' : ':') + v);
							}
						}
					}
				}
				
				v = partial.length === 0 ? '{}' : gap ? '{\n' + gap + partial.join(',\n' + gap) + '\n' + mind + '}' : '{' + partial.join(',') + '}';
				gap = mind;
				return v;
		}
    };
    
    if (typeof Date.prototype.toJSON !== 'function') {
        Date.prototype.toJSON = function(key){
            return isFinite(this.valueOf()) ? this.getUTCFullYear() + '-' + f(this.getUTCMonth() + 1) + '-' + f(this.getUTCDate()) + 'T' + f(this.getUTCHours()) + ':' + f(this.getUTCMinutes()) + ':' + f(this.getUTCSeconds()) + 'Z' : null;
        };
        
        String.prototype.toJSON = Number.prototype.toJSON = Boolean.prototype.toJSON = function(key){
            return this.valueOf();
        };
    }
	
	YUI.JSON = {
		stringify: function(value, replacer, space){
			try {// 使用浏览器自带的stringify方法
				return JSON.stringify(value, replacer, space);
			} 
			catch (e) {// 使用自己编写的stringify方法
				var i;
				gap = '';
				indent = '';
				
				if (typeof space === 'number') {
					for (i = 0; i < space; i += 1) {
						indent += ' ';
					}
				}
				else {
					if (typeof space === 'string') {
						indent = space;
					}
				}
				
				rep = replacer;
				if (replacer && typeof replacer !== 'function' && (typeof replacer !== 'object' || typeof replacer.length !== 'number')) {
					throw new Error('JSON.stringify');
				}
				
				return str('', {
					'': value
				});
			}
		},
		
		parse: function(text, reviver){
			try {
				return JSON.parse(text, reviver);
			} 
			catch (e) {
				var j, walk = function(holder, key){
					var k, v, value = holder[key];
					if (value && typeof value === 'object') {
						for (k in value) {
							if (Object.hasOwnProperty.call(value, k)) {
								v = walk(value, k);
								if (v !== undefined) {
									value[k] = v;
								}
								else {
									delete value[k];
								}
							}
						}
					}
					return reviver.call(holder, key, value);
				};
				
				text = String(text);
				cx.lastIndex = 0;
				
				if (cx.test(text)) {
					text = text.replace(cx, function(a){
						return '\\u' + ('0000' + a.charCodeAt(0).toString(16)).slice(-4);
					});
				}
				
				if (/^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, '@').replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']').replace(/(?:^|:|,)(?:\s*\[)+/g, ''))) {
					j = eval('(' + text + ')');
					return typeof reviver === 'function' ? walk({
						'': j
					}, '') : j;
				}
				
				throw new SyntaxError('JSON.parse');
			}
		}
	};
})();
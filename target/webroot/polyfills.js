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
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Because like humans, all browsers are different :)
	 * More info about Polyfills in this cool article (https://remysharp.com/2010/10/08/what-is-a-polyfill)
	 */
	"use strict";
	__webpack_require__(37);
	__webpack_require__(38);
	__webpack_require__(40);


/***/ },
/* 1 */,
/* 2 */,
/* 3 */,
/* 4 */,
/* 5 */,
/* 6 */,
/* 7 */,
/* 8 */,
/* 9 */,
/* 10 */,
/* 11 */,
/* 12 */,
/* 13 */,
/* 14 */,
/* 15 */,
/* 16 */,
/* 17 */,
/* 18 */,
/* 19 */,
/* 20 */,
/* 21 */,
/* 22 */,
/* 23 */,
/* 24 */,
/* 25 */,
/* 26 */,
/* 27 */,
/* 28 */,
/* 29 */,
/* 30 */,
/* 31 */,
/* 32 */,
/* 33 */,
/* 34 */,
/* 35 */,
/* 36 */,
/* 37 */
/***/ function(module, exports) {

	/* WEBPACK VAR INJECTION */(function(global) {/*! *****************************************************************************
	Copyright (C) Microsoft. All rights reserved.
	Licensed under the Apache License, Version 2.0 (the "License"); you may not use
	this file except in compliance with the License. You may obtain a copy of the
	License at http://www.apache.org/licenses/LICENSE-2.0
	
	THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
	KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
	WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
	MERCHANTABLITY OR NON-INFRINGEMENT.
	
	See the Apache Version 2.0 License for specific language governing permissions
	and limitations under the License.
	***************************************************************************** */
	var Reflect;
	(function (Reflect) {
	    "use strict";
	    var hasOwn = Object.prototype.hasOwnProperty;
	    // feature test for Object.create support
	    var supportsCreate = typeof Object.create === "function";
	    // feature test for __proto__ support
	    var supportsProto = (function () {
	        var sentinel = {};
	        function __() { }
	        __.prototype = sentinel;
	        var instance = new __();
	        return instance.__proto__ === sentinel;
	    })();
	    // create an object in dictionary mode (a.k.a. "slow" mode in v8)
	    var createDictionary = supportsCreate ? function () { return MakeDictionary(Object.create(null)); } :
	        supportsProto ? function () { return MakeDictionary({ __proto__: null }); } :
	            function () { return MakeDictionary({}); };
	    var HashMap;
	    (function (HashMap) {
	        var downLevel = !supportsCreate && !supportsProto;
	        HashMap.has = downLevel
	            ? function (map, key) { return hasOwn.call(map, key); }
	            : function (map, key) { return key in map; };
	        HashMap.get = downLevel
	            ? function (map, key) { return hasOwn.call(map, key) ? map[key] : undefined; }
	            : function (map, key) { return map[key]; };
	    })(HashMap || (HashMap = {}));
	    // Load global or shim versions of Map, Set, and WeakMap
	    var functionPrototype = Object.getPrototypeOf(Function);
	    var _Map = typeof Map === "function" ? Map : CreateMapPolyfill();
	    var _Set = typeof Set === "function" ? Set : CreateSetPolyfill();
	    var _WeakMap = typeof WeakMap === "function" ? WeakMap : CreateWeakMapPolyfill();
	    // [[Metadata]] internal slot
	    var Metadata = new _WeakMap();
	    /**
	      * Applies a set of decorators to a property of a target object.
	      * @param decorators An array of decorators.
	      * @param target The target object.
	      * @param targetKey (Optional) The property key to decorate.
	      * @param targetDescriptor (Optional) The property descriptor for the target key
	      * @remarks Decorators are applied in reverse order.
	      * @example
	      *
	      *     class Example {
	      *         // property declarations are not part of ES6, though they are valid in TypeScript:
	      *         // static staticProperty;
	      *         // property;
	      *
	      *         constructor(p) { }
	      *         static staticMethod(p) { }
	      *         method(p) { }
	      *     }
	      *
	      *     // constructor
	      *     Example = Reflect.decorate(decoratorsArray, Example);
	      *
	      *     // property (on constructor)
	      *     Reflect.decorate(decoratorsArray, Example, "staticProperty");
	      *
	      *     // property (on prototype)
	      *     Reflect.decorate(decoratorsArray, Example.prototype, "property");
	      *
	      *     // method (on constructor)
	      *     Object.defineProperty(Example, "staticMethod",
	      *         Reflect.decorate(decoratorsArray, Example, "staticMethod",
	      *             Object.getOwnPropertyDescriptor(Example, "staticMethod")));
	      *
	      *     // method (on prototype)
	      *     Object.defineProperty(Example.prototype, "method",
	      *         Reflect.decorate(decoratorsArray, Example.prototype, "method",
	      *             Object.getOwnPropertyDescriptor(Example.prototype, "method")));
	      *
	      */
	    function decorate(decorators, target, targetKey, targetDescriptor) {
	        if (!IsUndefined(targetDescriptor)) {
	            if (!IsArray(decorators))
	                throw new TypeError();
	            if (!IsObject(target))
	                throw new TypeError();
	            if (IsUndefined(targetKey))
	                throw new TypeError();
	            if (!IsObject(targetDescriptor))
	                throw new TypeError();
	            targetKey = ToPropertyKey(targetKey);
	            return DecoratePropertyWithDescriptor(decorators, target, targetKey, targetDescriptor);
	        }
	        else if (!IsUndefined(targetKey)) {
	            if (!IsArray(decorators))
	                throw new TypeError();
	            if (!IsObject(target))
	                throw new TypeError();
	            targetKey = ToPropertyKey(targetKey);
	            return DecoratePropertyWithoutDescriptor(decorators, target, targetKey);
	        }
	        else {
	            if (!IsArray(decorators))
	                throw new TypeError();
	            if (!IsConstructor(target))
	                throw new TypeError();
	            return DecorateConstructor(decorators, target);
	        }
	    }
	    Reflect.decorate = decorate;
	    /**
	      * A default metadata decorator factory that can be used on a class, class member, or parameter.
	      * @param metadataKey The key for the metadata entry.
	      * @param metadataValue The value for the metadata entry.
	      * @returns A decorator function.
	      * @remarks
	      * If `metadataKey` is already defined for the target and target key, the
	      * metadataValue for that key will be overwritten.
	      * @example
	      *
	      *     // constructor
	      *     @Reflect.metadata(key, value)
	      *     class Example {
	      *     }
	      *
	      *     // property (on constructor, TypeScript only)
	      *     class Example {
	      *         @Reflect.metadata(key, value)
	      *         static staticProperty;
	      *     }
	      *
	      *     // property (on prototype, TypeScript only)
	      *     class Example {
	      *         @Reflect.metadata(key, value)
	      *         property;
	      *     }
	      *
	      *     // method (on constructor)
	      *     class Example {
	      *         @Reflect.metadata(key, value)
	      *         static staticMethod() { }
	      *     }
	      *
	      *     // method (on prototype)
	      *     class Example {
	      *         @Reflect.metadata(key, value)
	      *         method() { }
	      *     }
	      *
	      */
	    function metadata(metadataKey, metadataValue) {
	        function decorator(target, targetKey) {
	            if (!IsUndefined(targetKey)) {
	                if (!IsObject(target))
	                    throw new TypeError();
	                targetKey = ToPropertyKey(targetKey);
	                OrdinaryDefineOwnMetadata(metadataKey, metadataValue, target, targetKey);
	            }
	            else {
	                if (!IsConstructor(target))
	                    throw new TypeError();
	                OrdinaryDefineOwnMetadata(metadataKey, metadataValue, target, /*targetKey*/ undefined);
	            }
	        }
	        return decorator;
	    }
	    Reflect.metadata = metadata;
	    /**
	      * Define a unique metadata entry on the target.
	      * @param metadataKey A key used to store and retrieve metadata.
	      * @param metadataValue A value that contains attached metadata.
	      * @param target The target object on which to define metadata.
	      * @param targetKey (Optional) The property key for the target.
	      * @example
	      *
	      *     class Example {
	      *         // property declarations are not part of ES6, though they are valid in TypeScript:
	      *         // static staticProperty;
	      *         // property;
	      *
	      *         constructor(p) { }
	      *         static staticMethod(p) { }
	      *         method(p) { }
	      *     }
	      *
	      *     // constructor
	      *     Reflect.defineMetadata("custom:annotation", options, Example);
	      *
	      *     // property (on constructor)
	      *     Reflect.defineMetadata("custom:annotation", options, Example, "staticProperty");
	      *
	      *     // property (on prototype)
	      *     Reflect.defineMetadata("custom:annotation", options, Example.prototype, "property");
	      *
	      *     // method (on constructor)
	      *     Reflect.defineMetadata("custom:annotation", options, Example, "staticMethod");
	      *
	      *     // method (on prototype)
	      *     Reflect.defineMetadata("custom:annotation", options, Example.prototype, "method");
	      *
	      *     // decorator factory as metadata-producing annotation.
	      *     function MyAnnotation(options): Decorator {
	      *         return (target, key?) => Reflect.defineMetadata("custom:annotation", options, target, key);
	      *     }
	      *
	      */
	    function defineMetadata(metadataKey, metadataValue, target, targetKey) {
	        if (!IsObject(target))
	            throw new TypeError();
	        if (!IsUndefined(targetKey))
	            targetKey = ToPropertyKey(targetKey);
	        return OrdinaryDefineOwnMetadata(metadataKey, metadataValue, target, targetKey);
	    }
	    Reflect.defineMetadata = defineMetadata;
	    /**
	      * Gets a value indicating whether the target object or its prototype chain has the provided metadata key defined.
	      * @param metadataKey A key used to store and retrieve metadata.
	      * @param target The target object on which the metadata is defined.
	      * @param targetKey (Optional) The property key for the target.
	      * @returns `true` if the metadata key was defined on the target object or its prototype chain; otherwise, `false`.
	      * @example
	      *
	      *     class Example {
	      *         // property declarations are not part of ES6, though they are valid in TypeScript:
	      *         // static staticProperty;
	      *         // property;
	      *
	      *         constructor(p) { }
	      *         static staticMethod(p) { }
	      *         method(p) { }
	      *     }
	      *
	      *     // constructor
	      *     result = Reflect.hasMetadata("custom:annotation", Example);
	      *
	      *     // property (on constructor)
	      *     result = Reflect.hasMetadata("custom:annotation", Example, "staticProperty");
	      *
	      *     // property (on prototype)
	      *     result = Reflect.hasMetadata("custom:annotation", Example.prototype, "property");
	      *
	      *     // method (on constructor)
	      *     result = Reflect.hasMetadata("custom:annotation", Example, "staticMethod");
	      *
	      *     // method (on prototype)
	      *     result = Reflect.hasMetadata("custom:annotation", Example.prototype, "method");
	      *
	      */
	    function hasMetadata(metadataKey, target, targetKey) {
	        if (!IsObject(target))
	            throw new TypeError();
	        if (!IsUndefined(targetKey))
	            targetKey = ToPropertyKey(targetKey);
	        return OrdinaryHasMetadata(metadataKey, target, targetKey);
	    }
	    Reflect.hasMetadata = hasMetadata;
	    /**
	      * Gets a value indicating whether the target object has the provided metadata key defined.
	      * @param metadataKey A key used to store and retrieve metadata.
	      * @param target The target object on which the metadata is defined.
	      * @param targetKey (Optional) The property key for the target.
	      * @returns `true` if the metadata key was defined on the target object; otherwise, `false`.
	      * @example
	      *
	      *     class Example {
	      *         // property declarations are not part of ES6, though they are valid in TypeScript:
	      *         // static staticProperty;
	      *         // property;
	      *
	      *         constructor(p) { }
	      *         static staticMethod(p) { }
	      *         method(p) { }
	      *     }
	      *
	      *     // constructor
	      *     result = Reflect.hasOwnMetadata("custom:annotation", Example);
	      *
	      *     // property (on constructor)
	      *     result = Reflect.hasOwnMetadata("custom:annotation", Example, "staticProperty");
	      *
	      *     // property (on prototype)
	      *     result = Reflect.hasOwnMetadata("custom:annotation", Example.prototype, "property");
	      *
	      *     // method (on constructor)
	      *     result = Reflect.hasOwnMetadata("custom:annotation", Example, "staticMethod");
	      *
	      *     // method (on prototype)
	      *     result = Reflect.hasOwnMetadata("custom:annotation", Example.prototype, "method");
	      *
	      */
	    function hasOwnMetadata(metadataKey, target, targetKey) {
	        if (!IsObject(target))
	            throw new TypeError();
	        if (!IsUndefined(targetKey))
	            targetKey = ToPropertyKey(targetKey);
	        return OrdinaryHasOwnMetadata(metadataKey, target, targetKey);
	    }
	    Reflect.hasOwnMetadata = hasOwnMetadata;
	    /**
	      * Gets the metadata value for the provided metadata key on the target object or its prototype chain.
	      * @param metadataKey A key used to store and retrieve metadata.
	      * @param target The target object on which the metadata is defined.
	      * @param targetKey (Optional) The property key for the target.
	      * @returns The metadata value for the metadata key if found; otherwise, `undefined`.
	      * @example
	      *
	      *     class Example {
	      *         // property declarations are not part of ES6, though they are valid in TypeScript:
	      *         // static staticProperty;
	      *         // property;
	      *
	      *         constructor(p) { }
	      *         static staticMethod(p) { }
	      *         method(p) { }
	      *     }
	      *
	      *     // constructor
	      *     result = Reflect.getMetadata("custom:annotation", Example);
	      *
	      *     // property (on constructor)
	      *     result = Reflect.getMetadata("custom:annotation", Example, "staticProperty");
	      *
	      *     // property (on prototype)
	      *     result = Reflect.getMetadata("custom:annotation", Example.prototype, "property");
	      *
	      *     // method (on constructor)
	      *     result = Reflect.getMetadata("custom:annotation", Example, "staticMethod");
	      *
	      *     // method (on prototype)
	      *     result = Reflect.getMetadata("custom:annotation", Example.prototype, "method");
	      *
	      */
	    function getMetadata(metadataKey, target, targetKey) {
	        if (!IsObject(target))
	            throw new TypeError();
	        if (!IsUndefined(targetKey))
	            targetKey = ToPropertyKey(targetKey);
	        return OrdinaryGetMetadata(metadataKey, target, targetKey);
	    }
	    Reflect.getMetadata = getMetadata;
	    /**
	      * Gets the metadata value for the provided metadata key on the target object.
	      * @param metadataKey A key used to store and retrieve metadata.
	      * @param target The target object on which the metadata is defined.
	      * @param targetKey (Optional) The property key for the target.
	      * @returns The metadata value for the metadata key if found; otherwise, `undefined`.
	      * @example
	      *
	      *     class Example {
	      *         // property declarations are not part of ES6, though they are valid in TypeScript:
	      *         // static staticProperty;
	      *         // property;
	      *
	      *         constructor(p) { }
	      *         static staticMethod(p) { }
	      *         method(p) { }
	      *     }
	      *
	      *     // constructor
	      *     result = Reflect.getOwnMetadata("custom:annotation", Example);
	      *
	      *     // property (on constructor)
	      *     result = Reflect.getOwnMetadata("custom:annotation", Example, "staticProperty");
	      *
	      *     // property (on prototype)
	      *     result = Reflect.getOwnMetadata("custom:annotation", Example.prototype, "property");
	      *
	      *     // method (on constructor)
	      *     result = Reflect.getOwnMetadata("custom:annotation", Example, "staticMethod");
	      *
	      *     // method (on prototype)
	      *     result = Reflect.getOwnMetadata("custom:annotation", Example.prototype, "method");
	      *
	      */
	    function getOwnMetadata(metadataKey, target, targetKey) {
	        if (!IsObject(target))
	            throw new TypeError();
	        if (!IsUndefined(targetKey))
	            targetKey = ToPropertyKey(targetKey);
	        return OrdinaryGetOwnMetadata(metadataKey, target, targetKey);
	    }
	    Reflect.getOwnMetadata = getOwnMetadata;
	    /**
	      * Gets the metadata keys defined on the target object or its prototype chain.
	      * @param target The target object on which the metadata is defined.
	      * @param targetKey (Optional) The property key for the target.
	      * @returns An array of unique metadata keys.
	      * @example
	      *
	      *     class Example {
	      *         // property declarations are not part of ES6, though they are valid in TypeScript:
	      *         // static staticProperty;
	      *         // property;
	      *
	      *         constructor(p) { }
	      *         static staticMethod(p) { }
	      *         method(p) { }
	      *     }
	      *
	      *     // constructor
	      *     result = Reflect.getMetadataKeys(Example);
	      *
	      *     // property (on constructor)
	      *     result = Reflect.getMetadataKeys(Example, "staticProperty");
	      *
	      *     // property (on prototype)
	      *     result = Reflect.getMetadataKeys(Example.prototype, "property");
	      *
	      *     // method (on constructor)
	      *     result = Reflect.getMetadataKeys(Example, "staticMethod");
	      *
	      *     // method (on prototype)
	      *     result = Reflect.getMetadataKeys(Example.prototype, "method");
	      *
	      */
	    function getMetadataKeys(target, targetKey) {
	        if (!IsObject(target))
	            throw new TypeError();
	        if (!IsUndefined(targetKey))
	            targetKey = ToPropertyKey(targetKey);
	        return OrdinaryMetadataKeys(target, targetKey);
	    }
	    Reflect.getMetadataKeys = getMetadataKeys;
	    /**
	      * Gets the unique metadata keys defined on the target object.
	      * @param target The target object on which the metadata is defined.
	      * @param targetKey (Optional) The property key for the target.
	      * @returns An array of unique metadata keys.
	      * @example
	      *
	      *     class Example {
	      *         // property declarations are not part of ES6, though they are valid in TypeScript:
	      *         // static staticProperty;
	      *         // property;
	      *
	      *         constructor(p) { }
	      *         static staticMethod(p) { }
	      *         method(p) { }
	      *     }
	      *
	      *     // constructor
	      *     result = Reflect.getOwnMetadataKeys(Example);
	      *
	      *     // property (on constructor)
	      *     result = Reflect.getOwnMetadataKeys(Example, "staticProperty");
	      *
	      *     // property (on prototype)
	      *     result = Reflect.getOwnMetadataKeys(Example.prototype, "property");
	      *
	      *     // method (on constructor)
	      *     result = Reflect.getOwnMetadataKeys(Example, "staticMethod");
	      *
	      *     // method (on prototype)
	      *     result = Reflect.getOwnMetadataKeys(Example.prototype, "method");
	      *
	      */
	    function getOwnMetadataKeys(target, targetKey) {
	        if (!IsObject(target))
	            throw new TypeError();
	        if (!IsUndefined(targetKey))
	            targetKey = ToPropertyKey(targetKey);
	        return OrdinaryOwnMetadataKeys(target, targetKey);
	    }
	    Reflect.getOwnMetadataKeys = getOwnMetadataKeys;
	    /**
	      * Deletes the metadata entry from the target object with the provided key.
	      * @param metadataKey A key used to store and retrieve metadata.
	      * @param target The target object on which the metadata is defined.
	      * @param targetKey (Optional) The property key for the target.
	      * @returns `true` if the metadata entry was found and deleted; otherwise, false.
	      * @example
	      *
	      *     class Example {
	      *         // property declarations are not part of ES6, though they are valid in TypeScript:
	      *         // static staticProperty;
	      *         // property;
	      *
	      *         constructor(p) { }
	      *         static staticMethod(p) { }
	      *         method(p) { }
	      *     }
	      *
	      *     // constructor
	      *     result = Reflect.deleteMetadata("custom:annotation", Example);
	      *
	      *     // property (on constructor)
	      *     result = Reflect.deleteMetadata("custom:annotation", Example, "staticProperty");
	      *
	      *     // property (on prototype)
	      *     result = Reflect.deleteMetadata("custom:annotation", Example.prototype, "property");
	      *
	      *     // method (on constructor)
	      *     result = Reflect.deleteMetadata("custom:annotation", Example, "staticMethod");
	      *
	      *     // method (on prototype)
	      *     result = Reflect.deleteMetadata("custom:annotation", Example.prototype, "method");
	      *
	      */
	    function deleteMetadata(metadataKey, target, targetKey) {
	        // https://github.com/rbuckton/ReflectDecorators/blob/master/spec/metadata.md#deletemetadata-metadatakey-p-
	        if (!IsObject(target))
	            throw new TypeError();
	        if (!IsUndefined(targetKey))
	            targetKey = ToPropertyKey(targetKey);
	        var metadataMap = GetOrCreateMetadataMap(target, targetKey, /*create*/ false);
	        if (IsUndefined(metadataMap))
	            return false;
	        if (!metadataMap.delete(metadataKey))
	            return false;
	        if (metadataMap.size > 0)
	            return true;
	        var targetMetadata = Metadata.get(target);
	        targetMetadata.delete(targetKey);
	        if (targetMetadata.size > 0)
	            return true;
	        Metadata.delete(target);
	        return true;
	    }
	    Reflect.deleteMetadata = deleteMetadata;
	    function DecorateConstructor(decorators, target) {
	        for (var i = decorators.length - 1; i >= 0; --i) {
	            var decorator = decorators[i];
	            var decorated = decorator(target);
	            if (!IsUndefined(decorated)) {
	                if (!IsConstructor(decorated))
	                    throw new TypeError();
	                target = decorated;
	            }
	        }
	        return target;
	    }
	    function DecoratePropertyWithDescriptor(decorators, target, propertyKey, descriptor) {
	        for (var i = decorators.length - 1; i >= 0; --i) {
	            var decorator = decorators[i];
	            var decorated = decorator(target, propertyKey, descriptor);
	            if (!IsUndefined(decorated)) {
	                if (!IsObject(decorated))
	                    throw new TypeError();
	                descriptor = decorated;
	            }
	        }
	        return descriptor;
	    }
	    function DecoratePropertyWithoutDescriptor(decorators, target, propertyKey) {
	        for (var i = decorators.length - 1; i >= 0; --i) {
	            var decorator = decorators[i];
	            decorator(target, propertyKey);
	        }
	    }
	    // https://github.com/rbuckton/ReflectDecorators/blob/master/spec/metadata.md#getorcreatemetadatamap--o-p-create-
	    function GetOrCreateMetadataMap(target, targetKey, create) {
	        var targetMetadata = Metadata.get(target);
	        if (!targetMetadata) {
	            if (!create)
	                return undefined;
	            targetMetadata = new _Map();
	            Metadata.set(target, targetMetadata);
	        }
	        var keyMetadata = targetMetadata.get(targetKey);
	        if (!keyMetadata) {
	            if (!create)
	                return undefined;
	            keyMetadata = new _Map();
	            targetMetadata.set(targetKey, keyMetadata);
	        }
	        return keyMetadata;
	    }
	    // https://github.com/rbuckton/ReflectDecorators/blob/master/spec/metadata.md#ordinaryhasmetadata--metadatakey-o-p-
	    function OrdinaryHasMetadata(MetadataKey, O, P) {
	        var hasOwn = OrdinaryHasOwnMetadata(MetadataKey, O, P);
	        if (hasOwn)
	            return true;
	        var parent = GetPrototypeOf(O);
	        return parent !== null ? OrdinaryHasMetadata(MetadataKey, parent, P) : false;
	    }
	    // https://github.com/rbuckton/ReflectDecorators/blob/master/spec/metadata.md#ordinaryhasownmetadata--metadatakey-o-p-
	    function OrdinaryHasOwnMetadata(MetadataKey, O, P) {
	        var metadataMap = GetOrCreateMetadataMap(O, P, /*create*/ false);
	        return metadataMap !== undefined && Boolean(metadataMap.has(MetadataKey));
	    }
	    // https://github.com/rbuckton/ReflectDecorators/blob/master/spec/metadata.md#ordinarygetmetadata--metadatakey-o-p-
	    function OrdinaryGetMetadata(MetadataKey, O, P) {
	        var hasOwn = OrdinaryHasOwnMetadata(MetadataKey, O, P);
	        if (hasOwn)
	            return OrdinaryGetOwnMetadata(MetadataKey, O, P);
	        var parent = GetPrototypeOf(O);
	        return parent !== null ? OrdinaryGetMetadata(MetadataKey, parent, P) : undefined;
	    }
	    // https://github.com/rbuckton/ReflectDecorators/blob/master/spec/metadata.md#ordinarygetownmetadata--metadatakey-o-p-
	    function OrdinaryGetOwnMetadata(MetadataKey, O, P) {
	        var metadataMap = GetOrCreateMetadataMap(O, P, /*create*/ false);
	        return metadataMap === undefined ? undefined : metadataMap.get(MetadataKey);
	    }
	    // https://github.com/rbuckton/ReflectDecorators/blob/master/spec/metadata.md#ordinarydefineownmetadata--metadatakey-metadatavalue-o-p-
	    function OrdinaryDefineOwnMetadata(MetadataKey, MetadataValue, O, P) {
	        var metadataMap = GetOrCreateMetadataMap(O, P, /*create*/ true);
	        metadataMap.set(MetadataKey, MetadataValue);
	    }
	    // https://github.com/rbuckton/ReflectDecorators/blob/master/spec/metadata.md#ordinarymetadatakeys--o-p-
	    function OrdinaryMetadataKeys(O, P) {
	        var ownKeys = OrdinaryOwnMetadataKeys(O, P);
	        var parent = GetPrototypeOf(O);
	        if (parent === null)
	            return ownKeys;
	        var parentKeys = OrdinaryMetadataKeys(parent, P);
	        if (parentKeys.length <= 0)
	            return ownKeys;
	        if (ownKeys.length <= 0)
	            return parentKeys;
	        var keys = new _Set();
	        for (var _i = 0; _i < ownKeys.length; _i++) {
	            var key = ownKeys[_i];
	            keys.add(key);
	        }
	        for (var _a = 0; _a < parentKeys.length; _a++) {
	            var key = parentKeys[_a];
	            keys.add(key);
	        }
	        return getKeys(keys);
	    }
	    // https://github.com/rbuckton/ReflectDecorators/blob/master/spec/metadata.md#ordinaryownmetadatakeys--o-p-
	    function OrdinaryOwnMetadataKeys(target, targetKey) {
	        var metadataMap = GetOrCreateMetadataMap(target, targetKey, /*create*/ false);
	        var keys = [];
	        if (metadataMap)
	            forEach(metadataMap, function (_, key) { return keys.push(key); });
	        return keys;
	    }
	    // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-ecmascript-language-types-undefined-type
	    function IsUndefined(x) {
	        return x === undefined;
	    }
	    // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-isarray
	    function IsArray(x) {
	        return Array.isArray ? Array.isArray(x) : x instanceof Array || Object.prototype.toString.call(x) === "[object Array]";
	    }
	    // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-object-type
	    function IsObject(x) {
	        return typeof x === "object" ? x !== null : typeof x === "function";
	    }
	    // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-isconstructor
	    function IsConstructor(x) {
	        return typeof x === "function";
	    }
	    // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-ecmascript-language-types-symbol-type
	    function IsSymbol(x) {
	        return typeof x === "symbol";
	    }
	    // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-topropertykey
	    function ToPropertyKey(value) {
	        return IsSymbol(value) ? value : String(value);
	    }
	    function GetPrototypeOf(O) {
	        var proto = Object.getPrototypeOf(O);
	        if (typeof O !== "function" || O === functionPrototype)
	            return proto;
	        // TypeScript doesn't set __proto__ in ES5, as it's non-standard.
	        // Try to determine the superclass Exampleonstructor. Compatible implementations
	        // must either set __proto__ on a subclass Exampleonstructor to the superclass Exampleonstructor,
	        // or ensure each class has a valid `constructor` property on its prototype that
	        // points back to the constructor.
	        // If this is not the same as Function.[[Prototype]], then this is definately inherited.
	        // This is the case when in ES6 or when using __proto__ in a compatible browser.
	        if (proto !== functionPrototype)
	            return proto;
	        // If the super prototype is Object.prototype, null, or undefined, then we cannot determine the heritage.
	        var prototype = O.prototype;
	        var prototypeProto = prototype && Object.getPrototypeOf(prototype);
	        if (prototypeProto == null || prototypeProto === Object.prototype)
	            return proto;
	        // If the constructor was not a function, then we cannot determine the heritage.
	        var constructor = prototypeProto.constructor;
	        if (typeof constructor !== "function")
	            return proto;
	        // If we have some kind of self-reference, then we cannot determine the heritage.
	        if (constructor === O)
	            return proto;
	        // we have a pretty good guess at the heritage.
	        return constructor;
	    }
	    function IteratorStep(iterator) {
	        var result = iterator.next();
	        return result.done ? undefined : result;
	    }
	    function IteratorClose(iterator) {
	        var f = iterator["return"];
	        if (f)
	            f.call(iterator);
	    }
	    function forEach(source, callback, thisArg) {
	        var entries = source.entries;
	        if (typeof entries === "function") {
	            var iterator = entries.call(source);
	            var result;
	            try {
	                while (result = IteratorStep(iterator)) {
	                    var _a = result.value, key = _a[0], value = _a[1];
	                    callback.call(thisArg, value, key, source);
	                }
	            }
	            finally {
	                if (result)
	                    IteratorClose(iterator);
	            }
	        }
	        else {
	            var forEach_1 = source.forEach;
	            if (typeof forEach_1 === "function") {
	                forEach_1.call(source, callback, thisArg);
	            }
	        }
	    }
	    function getKeys(source) {
	        var keys = [];
	        forEach(source, function (_, key) { keys.push(key); });
	        return keys;
	    }
	    // naive MapIterator shim
	    function CreateMapIterator(keys, values, kind) {
	        var index = 0;
	        return {
	            next: function () {
	                if ((keys || values) && index < (keys || values).length) {
	                    var current = index++;
	                    switch (kind) {
	                        case "key": return { value: keys[current], done: false };
	                        case "value": return { value: values[current], done: false };
	                        case "key+value": return { value: [keys[current], values[current]], done: false };
	                    }
	                }
	                keys = undefined;
	                values = undefined;
	                return { value: undefined, done: true };
	            },
	            "throw": function (error) {
	                if (keys || values) {
	                    keys = undefined;
	                    values = undefined;
	                }
	                throw error;
	            },
	            "return": function (value) {
	                if (keys || values) {
	                    keys = undefined;
	                    values = undefined;
	                }
	                return { value: value, done: true };
	            }
	        };
	    }
	    // naive Map shim
	    function CreateMapPolyfill() {
	        var cacheSentinel = {};
	        return (function () {
	            function Map() {
	                this._keys = [];
	                this._values = [];
	                this._cacheKey = cacheSentinel;
	                this._cacheIndex = -2;
	            }
	            Object.defineProperty(Map.prototype, "size", {
	                get: function () { return this._keys.length; },
	                enumerable: true,
	                configurable: true
	            });
	            Map.prototype.has = function (key) { return this._find(key, /*insert*/ false) >= 0; };
	            Map.prototype.get = function (key) {
	                var index = this._find(key, /*insert*/ false);
	                return index >= 0 ? this._values[index] : undefined;
	            };
	            Map.prototype.set = function (key, value) {
	                var index = this._find(key, /*insert*/ true);
	                this._values[index] = value;
	                return this;
	            };
	            Map.prototype.delete = function (key) {
	                var index = this._find(key, /*insert*/ false);
	                if (index >= 0) {
	                    var size = this._keys.length;
	                    for (var i = index + 1; i < size; i++) {
	                        this._keys[i - 1] = this._keys[i];
	                        this._values[i - 1] = this._values[i];
	                    }
	                    this._keys.length--;
	                    this._values.length--;
	                    this._cacheKey = cacheSentinel;
	                    this._cacheIndex = -2;
	                    return true;
	                }
	                return false;
	            };
	            Map.prototype.clear = function () {
	                this._keys.length = 0;
	                this._values.length = 0;
	                this._cacheKey = cacheSentinel;
	                this._cacheIndex = -2;
	            };
	            Map.prototype.keys = function () { return CreateMapIterator(this._keys, /*values*/ undefined, "key"); };
	            Map.prototype.values = function () { return CreateMapIterator(/*keys*/ undefined, this._values, "value"); };
	            Map.prototype.entries = function () { return CreateMapIterator(this._keys, this._values, "key+value"); };
	            Map.prototype._find = function (key, insert) {
	                if (this._cacheKey === key)
	                    return this._cacheIndex;
	                var index = this._keys.indexOf(key);
	                if (index < 0 && insert) {
	                    index = this._keys.length;
	                    this._keys.push(key);
	                    this._values.push(undefined);
	                }
	                return this._cacheKey = key, this._cacheIndex = index;
	            };
	            return Map;
	        })();
	    }
	    // naive Set shim
	    function CreateSetPolyfill() {
	        return (function () {
	            function Set() {
	                this._map = new _Map();
	            }
	            Object.defineProperty(Set.prototype, "size", {
	                get: function () { return this._map.size; },
	                enumerable: true,
	                configurable: true
	            });
	            Set.prototype.has = function (value) { return this._map.has(value); };
	            Set.prototype.add = function (value) { return this._map.set(value, value), this; };
	            Set.prototype.delete = function (value) { return this._map.delete(value); };
	            Set.prototype.clear = function () { this._map.clear(); };
	            Set.prototype.keys = function () { return this._map.keys(); };
	            Set.prototype.values = function () { return this._map.values(); };
	            Set.prototype.entries = function () { return this._map.entries(); };
	            return Set;
	        })();
	    }
	    // naive WeakMap shim
	    function CreateWeakMapPolyfill() {
	        var UUID_SIZE = 16;
	        var keys = createDictionary();
	        var rootKey = CreateUniqueKey();
	        return (function () {
	            function WeakMap() {
	                this._key = CreateUniqueKey();
	            }
	            WeakMap.prototype.has = function (target) {
	                var table = GetOrCreateWeakMapTable(target, /*create*/ false);
	                return table !== undefined ? HashMap.has(table, this._key) : false;
	            };
	            WeakMap.prototype.get = function (target) {
	                var table = GetOrCreateWeakMapTable(target, /*create*/ false);
	                return table !== undefined ? HashMap.get(table, this._key) : undefined;
	            };
	            WeakMap.prototype.set = function (target, value) {
	                var table = GetOrCreateWeakMapTable(target, /*create*/ true);
	                table[this._key] = value;
	                return this;
	            };
	            WeakMap.prototype.delete = function (target) {
	                var table = GetOrCreateWeakMapTable(target, /*create*/ false);
	                return table !== undefined ? delete table[this._key] : false;
	            };
	            WeakMap.prototype.clear = function () {
	                // NOTE: not a real clear, just makes the previous data unreachable
	                this._key = CreateUniqueKey();
	            };
	            return WeakMap;
	        })();
	        function FillRandomBytes(buffer, size) {
	            for (var i = 0; i < size; ++i)
	                buffer[i] = Math.random() * 0xff | 0;
	            return buffer;
	        }
	        function GenRandomBytes(size) {
	            if (typeof Uint8Array === "function") {
	                if (typeof crypto !== "undefined")
	                    return crypto.getRandomValues(new Uint8Array(size));
	                if (typeof msCrypto !== "undefined")
	                    return msCrypto.getRandomValues(new Uint8Array(size));
	                return FillRandomBytes(new Uint8Array(size), size);
	            }
	            return FillRandomBytes(new Array(size), size);
	        }
	        function CreateUUID() {
	            var data = GenRandomBytes(UUID_SIZE);
	            // mark as random - RFC 4122 § 4.4
	            data[6] = data[6] & 0x4f | 0x40;
	            data[8] = data[8] & 0xbf | 0x80;
	            var result = "";
	            for (var offset = 0; offset < UUID_SIZE; ++offset) {
	                var byte = data[offset];
	                if (offset === 4 || offset === 6 || offset === 8)
	                    result += "-";
	                if (byte < 16)
	                    result += "0";
	                result += byte.toString(16).toLowerCase();
	            }
	            return result;
	        }
	        function CreateUniqueKey() {
	            var key;
	            do
	                key = "@@WeakMap@@" + CreateUUID();
	            while (HashMap.has(keys, key));
	            keys[key] = true;
	            return key;
	        }
	        function GetOrCreateWeakMapTable(target, create) {
	            if (!hasOwn.call(target, rootKey)) {
	                if (!create)
	                    return undefined;
	                Object.defineProperty(target, rootKey, { value: createDictionary() });
	            }
	            return target[rootKey];
	        }
	    }
	    // uses a heuristic used by v8 and chakra to force an object into dictionary mode.
	    function MakeDictionary(obj) {
	        obj.__DICTIONARY_MODE__ = 1;
	        delete obj.____DICTIONARY_MODE__;
	        return obj;
	    }
	    // patch global Reflect
	    (function (__global) {
	        if (typeof __global.Reflect !== "undefined") {
	            if (__global.Reflect !== Reflect) {
	                for (var p in Reflect) {
	                    if (hasOwn.call(Reflect, p)) {
	                        __global.Reflect[p] = Reflect[p];
	                    }
	                }
	            }
	        }
	        else {
	            __global.Reflect = Reflect;
	        }
	    })(typeof window !== "undefined" ? window :
	        typeof WorkerGlobalScope !== "undefined" ? self :
	            typeof global !== "undefined" ? global :
	                Function("return this;")());
	})(Reflect || (Reflect = {}));
	//# sourceMappingURL=Reflect.js.map
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global, process) {;
	;
	var Zone$1 = (function (global) {
	    if (global.Zone) {
	        throw new Error('Zone already loaded.');
	    }
	    var Zone = (function () {
	        function Zone(parent, zoneSpec) {
	            this._properties = null;
	            this._parent = parent;
	            this._name = zoneSpec ? zoneSpec.name || 'unnamed' : '<root>';
	            this._properties = zoneSpec && zoneSpec.properties || {};
	            this._zoneDelegate = new ZoneDelegate(this, this._parent && this._parent._zoneDelegate, zoneSpec);
	        }
	        Zone.assertZonePatched = function () {
	            if (global.Promise !== ZoneAwarePromise) {
	                throw new Error("Zone.js has detected that ZoneAwarePromise `(window|global).Promise` " +
	                    "has been overwritten.\n" +
	                    "Most likely cause is that a Promise polyfill has been loaded " +
	                    "after Zone.js (Polyfilling Promise api is not necessary when zone.js is loaded. " +
	                    "If you must load one, do so before loading zone.js.)");
	            }
	        };
	        Object.defineProperty(Zone, "current", {
	            get: function () { return _currentZone; },
	            enumerable: true,
	            configurable: true
	        });
	        ;
	        Object.defineProperty(Zone, "currentTask", {
	            get: function () { return _currentTask; },
	            enumerable: true,
	            configurable: true
	        });
	        ;
	        Object.defineProperty(Zone.prototype, "parent", {
	            get: function () { return this._parent; },
	            enumerable: true,
	            configurable: true
	        });
	        ;
	        Object.defineProperty(Zone.prototype, "name", {
	            get: function () { return this._name; },
	            enumerable: true,
	            configurable: true
	        });
	        ;
	        Zone.prototype.get = function (key) {
	            var zone = this.getZoneWith(key);
	            if (zone)
	                return zone._properties[key];
	        };
	        Zone.prototype.getZoneWith = function (key) {
	            var current = this;
	            while (current) {
	                if (current._properties.hasOwnProperty(key)) {
	                    return current;
	                }
	                current = current._parent;
	            }
	            return null;
	        };
	        Zone.prototype.fork = function (zoneSpec) {
	            if (!zoneSpec)
	                throw new Error('ZoneSpec required!');
	            return this._zoneDelegate.fork(this, zoneSpec);
	        };
	        Zone.prototype.wrap = function (callback, source) {
	            if (typeof callback !== 'function') {
	                throw new Error('Expecting function got: ' + callback);
	            }
	            var _callback = this._zoneDelegate.intercept(this, callback, source);
	            var zone = this;
	            return function () {
	                return zone.runGuarded(_callback, this, arguments, source);
	            };
	        };
	        Zone.prototype.run = function (callback, applyThis, applyArgs, source) {
	            if (applyThis === void 0) { applyThis = null; }
	            if (applyArgs === void 0) { applyArgs = null; }
	            if (source === void 0) { source = null; }
	            var oldZone = _currentZone;
	            _currentZone = this;
	            try {
	                return this._zoneDelegate.invoke(this, callback, applyThis, applyArgs, source);
	            }
	            finally {
	                _currentZone = oldZone;
	            }
	        };
	        Zone.prototype.runGuarded = function (callback, applyThis, applyArgs, source) {
	            if (applyThis === void 0) { applyThis = null; }
	            if (applyArgs === void 0) { applyArgs = null; }
	            if (source === void 0) { source = null; }
	            var oldZone = _currentZone;
	            _currentZone = this;
	            try {
	                try {
	                    return this._zoneDelegate.invoke(this, callback, applyThis, applyArgs, source);
	                }
	                catch (error) {
	                    if (this._zoneDelegate.handleError(this, error)) {
	                        throw error;
	                    }
	                }
	            }
	            finally {
	                _currentZone = oldZone;
	            }
	        };
	        Zone.prototype.runTask = function (task, applyThis, applyArgs) {
	            task.runCount++;
	            if (task.zone != this)
	                throw new Error('A task can only be run in the zone which created it! (Creation: ' +
	                    task.zone.name + '; Execution: ' + this.name + ')');
	            var previousTask = _currentTask;
	            _currentTask = task;
	            var oldZone = _currentZone;
	            _currentZone = this;
	            try {
	                if (task.type == 'macroTask' && task.data && !task.data.isPeriodic) {
	                    task.cancelFn = null;
	                }
	                try {
	                    return this._zoneDelegate.invokeTask(this, task, applyThis, applyArgs);
	                }
	                catch (error) {
	                    if (this._zoneDelegate.handleError(this, error)) {
	                        throw error;
	                    }
	                }
	            }
	            finally {
	                _currentZone = oldZone;
	                _currentTask = previousTask;
	            }
	        };
	        Zone.prototype.scheduleMicroTask = function (source, callback, data, customSchedule) {
	            return this._zoneDelegate.scheduleTask(this, new ZoneTask('microTask', this, source, callback, data, customSchedule, null));
	        };
	        Zone.prototype.scheduleMacroTask = function (source, callback, data, customSchedule, customCancel) {
	            return this._zoneDelegate.scheduleTask(this, new ZoneTask('macroTask', this, source, callback, data, customSchedule, customCancel));
	        };
	        Zone.prototype.scheduleEventTask = function (source, callback, data, customSchedule, customCancel) {
	            return this._zoneDelegate.scheduleTask(this, new ZoneTask('eventTask', this, source, callback, data, customSchedule, customCancel));
	        };
	        Zone.prototype.cancelTask = function (task) {
	            var value = this._zoneDelegate.cancelTask(this, task);
	            task.runCount = -1;
	            task.cancelFn = null;
	            return value;
	        };
	        Zone.__symbol__ = __symbol__;
	        return Zone;
	    }());
	    ;
	    var ZoneDelegate = (function () {
	        function ZoneDelegate(zone, parentDelegate, zoneSpec) {
	            this._taskCounts = { microTask: 0, macroTask: 0, eventTask: 0 };
	            this.zone = zone;
	            this._parentDelegate = parentDelegate;
	            this._forkZS = zoneSpec && (zoneSpec && zoneSpec.onFork ? zoneSpec : parentDelegate._forkZS);
	            this._forkDlgt = zoneSpec && (zoneSpec.onFork ? parentDelegate : parentDelegate._forkDlgt);
	            this._interceptZS = zoneSpec && (zoneSpec.onIntercept ? zoneSpec : parentDelegate._interceptZS);
	            this._interceptDlgt = zoneSpec && (zoneSpec.onIntercept ? parentDelegate : parentDelegate._interceptDlgt);
	            this._invokeZS = zoneSpec && (zoneSpec.onInvoke ? zoneSpec : parentDelegate._invokeZS);
	            this._invokeDlgt = zoneSpec && (zoneSpec.onInvoke ? parentDelegate : parentDelegate._invokeDlgt);
	            this._handleErrorZS = zoneSpec && (zoneSpec.onHandleError ? zoneSpec : parentDelegate._handleErrorZS);
	            this._handleErrorDlgt = zoneSpec && (zoneSpec.onHandleError ? parentDelegate : parentDelegate._handleErrorDlgt);
	            this._scheduleTaskZS = zoneSpec && (zoneSpec.onScheduleTask ? zoneSpec : parentDelegate._scheduleTaskZS);
	            this._scheduleTaskDlgt = zoneSpec && (zoneSpec.onScheduleTask ? parentDelegate : parentDelegate._scheduleTaskDlgt);
	            this._invokeTaskZS = zoneSpec && (zoneSpec.onInvokeTask ? zoneSpec : parentDelegate._invokeTaskZS);
	            this._invokeTaskDlgt = zoneSpec && (zoneSpec.onInvokeTask ? parentDelegate : parentDelegate._invokeTaskDlgt);
	            this._cancelTaskZS = zoneSpec && (zoneSpec.onCancelTask ? zoneSpec : parentDelegate._cancelTaskZS);
	            this._cancelTaskDlgt = zoneSpec && (zoneSpec.onCancelTask ? parentDelegate : parentDelegate._cancelTaskDlgt);
	            this._hasTaskZS = zoneSpec && (zoneSpec.onHasTask ? zoneSpec : parentDelegate._hasTaskZS);
	            this._hasTaskDlgt = zoneSpec && (zoneSpec.onHasTask ? parentDelegate : parentDelegate._hasTaskDlgt);
	        }
	        ZoneDelegate.prototype.fork = function (targetZone, zoneSpec) {
	            return this._forkZS
	                ? this._forkZS.onFork(this._forkDlgt, this.zone, targetZone, zoneSpec)
	                : new Zone(targetZone, zoneSpec);
	        };
	        ZoneDelegate.prototype.intercept = function (targetZone, callback, source) {
	            return this._interceptZS
	                ? this._interceptZS.onIntercept(this._interceptDlgt, this.zone, targetZone, callback, source)
	                : callback;
	        };
	        ZoneDelegate.prototype.invoke = function (targetZone, callback, applyThis, applyArgs, source) {
	            return this._invokeZS
	                ? this._invokeZS.onInvoke(this._invokeDlgt, this.zone, targetZone, callback, applyThis, applyArgs, source)
	                : callback.apply(applyThis, applyArgs);
	        };
	        ZoneDelegate.prototype.handleError = function (targetZone, error) {
	            return this._handleErrorZS
	                ? this._handleErrorZS.onHandleError(this._handleErrorDlgt, this.zone, targetZone, error)
	                : true;
	        };
	        ZoneDelegate.prototype.scheduleTask = function (targetZone, task) {
	            try {
	                if (this._scheduleTaskZS) {
	                    return this._scheduleTaskZS.onScheduleTask(this._scheduleTaskDlgt, this.zone, targetZone, task);
	                }
	                else if (task.scheduleFn) {
	                    task.scheduleFn(task);
	                }
	                else if (task.type == 'microTask') {
	                    scheduleMicroTask(task);
	                }
	                else {
	                    throw new Error('Task is missing scheduleFn.');
	                }
	                return task;
	            }
	            finally {
	                if (targetZone == this.zone) {
	                    this._updateTaskCount(task.type, 1);
	                }
	            }
	        };
	        ZoneDelegate.prototype.invokeTask = function (targetZone, task, applyThis, applyArgs) {
	            try {
	                return this._invokeTaskZS
	                    ? this._invokeTaskZS.onInvokeTask(this._invokeTaskDlgt, this.zone, targetZone, task, applyThis, applyArgs)
	                    : task.callback.apply(applyThis, applyArgs);
	            }
	            finally {
	                if (targetZone == this.zone && (task.type != 'eventTask') && !(task.data && task.data.isPeriodic)) {
	                    this._updateTaskCount(task.type, -1);
	                }
	            }
	        };
	        ZoneDelegate.prototype.cancelTask = function (targetZone, task) {
	            var value;
	            if (this._cancelTaskZS) {
	                value = this._cancelTaskZS.onCancelTask(this._cancelTaskDlgt, this.zone, targetZone, task);
	            }
	            else if (!task.cancelFn) {
	                throw new Error('Task does not support cancellation, or is already canceled.');
	            }
	            else {
	                value = task.cancelFn(task);
	            }
	            if (targetZone == this.zone) {
	                // this should not be in the finally block, because exceptions assume not canceled.
	                this._updateTaskCount(task.type, -1);
	            }
	            return value;
	        };
	        ZoneDelegate.prototype.hasTask = function (targetZone, isEmpty) {
	            return this._hasTaskZS && this._hasTaskZS.onHasTask(this._hasTaskDlgt, this.zone, targetZone, isEmpty);
	        };
	        ZoneDelegate.prototype._updateTaskCount = function (type, count) {
	            var counts = this._taskCounts;
	            var prev = counts[type];
	            var next = counts[type] = prev + count;
	            if (next < 0) {
	                throw new Error('More tasks executed then were scheduled.');
	            }
	            if (prev == 0 || next == 0) {
	                var isEmpty = {
	                    microTask: counts.microTask > 0,
	                    macroTask: counts.macroTask > 0,
	                    eventTask: counts.eventTask > 0,
	                    change: type
	                };
	                try {
	                    this.hasTask(this.zone, isEmpty);
	                }
	                finally {
	                    if (this._parentDelegate) {
	                        this._parentDelegate._updateTaskCount(type, count);
	                    }
	                }
	            }
	        };
	        return ZoneDelegate;
	    }());
	    var ZoneTask = (function () {
	        function ZoneTask(type, zone, source, callback, options, scheduleFn, cancelFn) {
	            this.runCount = 0;
	            this.type = type;
	            this.zone = zone;
	            this.source = source;
	            this.data = options;
	            this.scheduleFn = scheduleFn;
	            this.cancelFn = cancelFn;
	            this.callback = callback;
	            var self = this;
	            this.invoke = function () {
	                _numberOfNestedTaskFrames++;
	                try {
	                    return zone.runTask(self, this, arguments);
	                }
	                finally {
	                    if (_numberOfNestedTaskFrames == 1) {
	                        drainMicroTaskQueue();
	                    }
	                    _numberOfNestedTaskFrames--;
	                }
	            };
	        }
	        ZoneTask.prototype.toString = function () {
	            if (this.data && typeof this.data.handleId !== 'undefined') {
	                return this.data.handleId;
	            }
	            else {
	                return this.toString();
	            }
	        };
	        return ZoneTask;
	    }());
	    function __symbol__(name) { return '__zone_symbol__' + name; }
	    ;
	    var symbolSetTimeout = __symbol__('setTimeout');
	    var symbolPromise = __symbol__('Promise');
	    var symbolThen = __symbol__('then');
	    var _currentZone = new Zone(null, null);
	    var _currentTask = null;
	    var _microTaskQueue = [];
	    var _isDrainingMicrotaskQueue = false;
	    var _uncaughtPromiseErrors = [];
	    var _numberOfNestedTaskFrames = 0;
	    function scheduleQueueDrain() {
	        // if we are not running in any task, and there has not been anything scheduled
	        // we must bootstrap the initial task creation by manually scheduling the drain
	        if (_numberOfNestedTaskFrames == 0 && _microTaskQueue.length == 0) {
	            // We are not running in Task, so we need to kickstart the microtask queue.
	            if (global[symbolPromise]) {
	                global[symbolPromise].resolve(0)[symbolThen](drainMicroTaskQueue);
	            }
	            else {
	                global[symbolSetTimeout](drainMicroTaskQueue, 0);
	            }
	        }
	    }
	    function scheduleMicroTask(task) {
	        scheduleQueueDrain();
	        _microTaskQueue.push(task);
	    }
	    function consoleError(e) {
	        var rejection = e && e.rejection;
	        if (rejection) {
	            console.error('Unhandled Promise rejection:', rejection instanceof Error ? rejection.message : rejection, '; Zone:', e.zone.name, '; Task:', e.task && e.task.source, '; Value:', rejection, rejection instanceof Error ? rejection.stack : undefined);
	        }
	        console.error(e);
	    }
	    function drainMicroTaskQueue() {
	        if (!_isDrainingMicrotaskQueue) {
	            _isDrainingMicrotaskQueue = true;
	            while (_microTaskQueue.length) {
	                var queue = _microTaskQueue;
	                _microTaskQueue = [];
	                for (var i = 0; i < queue.length; i++) {
	                    var task = queue[i];
	                    try {
	                        task.zone.runTask(task, null, null);
	                    }
	                    catch (e) {
	                        consoleError(e);
	                    }
	                }
	            }
	            while (_uncaughtPromiseErrors.length) {
	                var _loop_1 = function() {
	                    var uncaughtPromiseError = _uncaughtPromiseErrors.shift();
	                    try {
	                        uncaughtPromiseError.zone.runGuarded(function () { throw uncaughtPromiseError; });
	                    }
	                    catch (e) {
	                        consoleError(e);
	                    }
	                };
	                while (_uncaughtPromiseErrors.length) {
	                    _loop_1();
	                }
	            }
	            _isDrainingMicrotaskQueue = false;
	        }
	    }
	    function isThenable(value) {
	        return value && value.then;
	    }
	    function forwardResolution(value) { return value; }
	    function forwardRejection(rejection) { return ZoneAwarePromise.reject(rejection); }
	    var symbolState = __symbol__('state');
	    var symbolValue = __symbol__('value');
	    var source = 'Promise.then';
	    var UNRESOLVED = null;
	    var RESOLVED = true;
	    var REJECTED = false;
	    var REJECTED_NO_CATCH = 0;
	    function makeResolver(promise, state) {
	        return function (v) {
	            resolvePromise(promise, state, v);
	            // Do not return value or you will break the Promise spec.
	        };
	    }
	    function resolvePromise(promise, state, value) {
	        if (promise[symbolState] === UNRESOLVED) {
	            if (value instanceof ZoneAwarePromise && value[symbolState] !== UNRESOLVED) {
	                clearRejectedNoCatch(value);
	                resolvePromise(promise, value[symbolState], value[symbolValue]);
	            }
	            else if (isThenable(value)) {
	                value.then(makeResolver(promise, state), makeResolver(promise, false));
	            }
	            else {
	                promise[symbolState] = state;
	                var queue = promise[symbolValue];
	                promise[symbolValue] = value;
	                for (var i = 0; i < queue.length;) {
	                    scheduleResolveOrReject(promise, queue[i++], queue[i++], queue[i++], queue[i++]);
	                }
	                if (queue.length == 0 && state == REJECTED) {
	                    promise[symbolState] = REJECTED_NO_CATCH;
	                    try {
	                        throw new Error("Uncaught (in promise): " + value);
	                    }
	                    catch (e) {
	                        var error = e;
	                        error.rejection = value;
	                        error.promise = promise;
	                        error.zone = Zone.current;
	                        error.task = Zone.currentTask;
	                        _uncaughtPromiseErrors.push(error);
	                        scheduleQueueDrain();
	                    }
	                }
	            }
	        }
	        // Resolving an already resolved promise is a noop.
	        return promise;
	    }
	    function clearRejectedNoCatch(promise) {
	        if (promise[symbolState] === REJECTED_NO_CATCH) {
	            promise[symbolState] = REJECTED;
	            for (var i = 0; i < _uncaughtPromiseErrors.length; i++) {
	                if (promise === _uncaughtPromiseErrors[i].promise) {
	                    _uncaughtPromiseErrors.splice(i, 1);
	                    break;
	                }
	            }
	        }
	    }
	    function scheduleResolveOrReject(promise, zone, chainPromise, onFulfilled, onRejected) {
	        clearRejectedNoCatch(promise);
	        var delegate = promise[symbolState] ? onFulfilled || forwardResolution : onRejected || forwardRejection;
	        zone.scheduleMicroTask(source, function () {
	            try {
	                resolvePromise(chainPromise, true, zone.run(delegate, null, [promise[symbolValue]]));
	            }
	            catch (error) {
	                resolvePromise(chainPromise, false, error);
	            }
	        });
	    }
	    var ZoneAwarePromise = (function () {
	        function ZoneAwarePromise(executor) {
	            var promise = this;
	            if (!(promise instanceof ZoneAwarePromise)) {
	                throw new Error('Must be an instanceof Promise.');
	            }
	            promise[symbolState] = UNRESOLVED;
	            promise[symbolValue] = []; // queue;
	            try {
	                executor && executor(makeResolver(promise, RESOLVED), makeResolver(promise, REJECTED));
	            }
	            catch (e) {
	                resolvePromise(promise, false, e);
	            }
	        }
	        ZoneAwarePromise.resolve = function (value) {
	            return resolvePromise(new this(null), RESOLVED, value);
	        };
	        ZoneAwarePromise.reject = function (error) {
	            return resolvePromise(new this(null), REJECTED, error);
	        };
	        ZoneAwarePromise.race = function (values) {
	            var resolve;
	            var reject;
	            var promise = new this(function (res, rej) { resolve = res; reject = rej; });
	            function onResolve(value) { promise && (promise = null || resolve(value)); }
	            function onReject(error) { promise && (promise = null || reject(error)); }
	            for (var _i = 0, values_1 = values; _i < values_1.length; _i++) {
	                var value = values_1[_i];
	                if (!isThenable(value)) {
	                    value = this.resolve(value);
	                }
	                value.then(onResolve, onReject);
	            }
	            return promise;
	        };
	        ZoneAwarePromise.all = function (values) {
	            var resolve;
	            var reject;
	            var promise = new this(function (res, rej) { resolve = res; reject = rej; });
	            var count = 0;
	            var resolvedValues = [];
	            for (var _i = 0, values_2 = values; _i < values_2.length; _i++) {
	                var value = values_2[_i];
	                if (!isThenable(value)) {
	                    value = this.resolve(value);
	                }
	                value.then((function (index) { return function (value) {
	                    resolvedValues[index] = value;
	                    count--;
	                    if (!count) {
	                        resolve(resolvedValues);
	                    }
	                }; })(count), reject);
	                count++;
	            }
	            if (!count)
	                resolve(resolvedValues);
	            return promise;
	        };
	        ZoneAwarePromise.prototype.then = function (onFulfilled, onRejected) {
	            var chainPromise = new this.constructor(null);
	            var zone = Zone.current;
	            if (this[symbolState] == UNRESOLVED) {
	                this[symbolValue].push(zone, chainPromise, onFulfilled, onRejected);
	            }
	            else {
	                scheduleResolveOrReject(this, zone, chainPromise, onFulfilled, onRejected);
	            }
	            return chainPromise;
	        };
	        ZoneAwarePromise.prototype.catch = function (onRejected) {
	            return this.then(null, onRejected);
	        };
	        return ZoneAwarePromise;
	    }());
	    // Protect against aggressive optimizers dropping seemingly unused properties.
	    // E.g. Closure Compiler in advanced mode.
	    ZoneAwarePromise['resolve'] = ZoneAwarePromise.resolve;
	    ZoneAwarePromise['reject'] = ZoneAwarePromise.reject;
	    ZoneAwarePromise['race'] = ZoneAwarePromise.race;
	    ZoneAwarePromise['all'] = ZoneAwarePromise.all;
	    var NativePromise = global[__symbol__('Promise')] = global.Promise;
	    global.Promise = ZoneAwarePromise;
	    function patchThen(NativePromise) {
	        var NativePromiseProtototype = NativePromise.prototype;
	        var NativePromiseThen = NativePromiseProtototype[__symbol__('then')]
	            = NativePromiseProtototype.then;
	        NativePromiseProtototype.then = function (onResolve, onReject) {
	            var nativePromise = this;
	            return new ZoneAwarePromise(function (resolve, reject) {
	                NativePromiseThen.call(nativePromise, resolve, reject);
	            }).then(onResolve, onReject);
	        };
	    }
	    if (NativePromise) {
	        patchThen(NativePromise);
	        if (typeof global['fetch'] !== 'undefined') {
	            var fetchPromise = void 0;
	            try {
	                // In MS Edge this throws
	                fetchPromise = global['fetch']();
	            }
	            catch (e) {
	                // In Chrome this throws instead.
	                fetchPromise = global['fetch']('about:blank');
	            }
	            // ignore output to prevent error;
	            fetchPromise.then(function () { return null; }, function () { return null; });
	            if (fetchPromise.constructor != NativePromise) {
	                patchThen(fetchPromise.constructor);
	            }
	        }
	    }
	    // This is not part of public API, but it is usefull for tests, so we expose it.
	    Promise[Zone.__symbol__('uncaughtPromiseErrors')] = _uncaughtPromiseErrors;
	    return global.Zone = Zone;
	})(typeof window === 'object' && window || typeof self === 'object' && self || global);
	
	/**
	 * Suppress closure compiler errors about unknown 'process' variable
	 * @fileoverview
	 * @suppress {undefinedVars}
	 */
	var zoneSymbol = Zone['__symbol__'];
	var _global$1 = typeof window === 'object' && window || typeof self === 'object' && self || global;
	function bindArguments(args, source) {
	    for (var i = args.length - 1; i >= 0; i--) {
	        if (typeof args[i] === 'function') {
	            args[i] = Zone.current.wrap(args[i], source + '_' + i);
	        }
	    }
	    return args;
	}
	;
	function patchPrototype(prototype, fnNames) {
	    var source = prototype.constructor['name'];
	    var _loop_1 = function(i) {
	        var name_1 = fnNames[i];
	        var delegate = prototype[name_1];
	        if (delegate) {
	            prototype[name_1] = (function (delegate) {
	                return function () {
	                    return delegate.apply(this, bindArguments(arguments, source + '.' + name_1));
	                };
	            })(delegate);
	        }
	    };
	    for (var i = 0; i < fnNames.length; i++) {
	        _loop_1(i);
	    }
	}
	;
	var isWebWorker = (typeof WorkerGlobalScope !== 'undefined' && self instanceof WorkerGlobalScope);
	var isNode = (typeof process !== 'undefined' && {}.toString.call(process) === '[object process]');
	var isBrowser = !isNode && !isWebWorker && !!(typeof window !== 'undefined' && window['HTMLElement']);
	function patchProperty(obj, prop) {
	    var desc = Object.getOwnPropertyDescriptor(obj, prop) || {
	        enumerable: true,
	        configurable: true
	    };
	    // A property descriptor cannot have getter/setter and be writable
	    // deleting the writable and value properties avoids this error:
	    //
	    // TypeError: property descriptors must not specify a value or be writable when a
	    // getter or setter has been specified
	    delete desc.writable;
	    delete desc.value;
	    // substr(2) cuz 'onclick' -> 'click', etc
	    var eventName = prop.substr(2);
	    var _prop = '_' + prop;
	    desc.set = function (fn) {
	        if (this[_prop]) {
	            this.removeEventListener(eventName, this[_prop]);
	        }
	        if (typeof fn === 'function') {
	            var wrapFn = function (event) {
	                var result;
	                result = fn.apply(this, arguments);
	                if (result != undefined && !result)
	                    event.preventDefault();
	            };
	            this[_prop] = wrapFn;
	            this.addEventListener(eventName, wrapFn, false);
	        }
	        else {
	            this[_prop] = null;
	        }
	    };
	    // The getter would return undefined for unassigned properties but the default value of an unassigned property is null
	    desc.get = function () {
	        return this[_prop] || null;
	    };
	    Object.defineProperty(obj, prop, desc);
	}
	;
	function patchOnProperties(obj, properties) {
	    var onProperties = [];
	    for (var prop in obj) {
	        if (prop.substr(0, 2) == 'on') {
	            onProperties.push(prop);
	        }
	    }
	    for (var j = 0; j < onProperties.length; j++) {
	        patchProperty(obj, onProperties[j]);
	    }
	    if (properties) {
	        for (var i = 0; i < properties.length; i++) {
	            patchProperty(obj, 'on' + properties[i]);
	        }
	    }
	}
	;
	var EVENT_TASKS = zoneSymbol('eventTasks');
	// For EventTarget
	var ADD_EVENT_LISTENER = 'addEventListener';
	var REMOVE_EVENT_LISTENER = 'removeEventListener';
	function findExistingRegisteredTask(target, handler, name, capture, remove) {
	    var eventTasks = target[EVENT_TASKS];
	    if (eventTasks) {
	        for (var i = 0; i < eventTasks.length; i++) {
	            var eventTask = eventTasks[i];
	            var data = eventTask.data;
	            if (data.handler === handler
	                && data.useCapturing === capture
	                && data.eventName === name) {
	                if (remove) {
	                    eventTasks.splice(i, 1);
	                }
	                return eventTask;
	            }
	        }
	    }
	    return null;
	}
	function attachRegisteredEvent(target, eventTask) {
	    var eventTasks = target[EVENT_TASKS];
	    if (!eventTasks) {
	        eventTasks = target[EVENT_TASKS] = [];
	    }
	    eventTasks.push(eventTask);
	}
	function makeZoneAwareAddListener(addFnName, removeFnName, useCapturingParam, allowDuplicates) {
	    if (useCapturingParam === void 0) { useCapturingParam = true; }
	    if (allowDuplicates === void 0) { allowDuplicates = false; }
	    var addFnSymbol = zoneSymbol(addFnName);
	    var removeFnSymbol = zoneSymbol(removeFnName);
	    var defaultUseCapturing = useCapturingParam ? false : undefined;
	    function scheduleEventListener(eventTask) {
	        var meta = eventTask.data;
	        attachRegisteredEvent(meta.target, eventTask);
	        return meta.target[addFnSymbol](meta.eventName, eventTask.invoke, meta.useCapturing);
	    }
	    function cancelEventListener(eventTask) {
	        var meta = eventTask.data;
	        findExistingRegisteredTask(meta.target, eventTask.invoke, meta.eventName, meta.useCapturing, true);
	        meta.target[removeFnSymbol](meta.eventName, eventTask.invoke, meta.useCapturing);
	    }
	    return function zoneAwareAddListener(self, args) {
	        var eventName = args[0];
	        var handler = args[1];
	        var useCapturing = args[2] || defaultUseCapturing;
	        // - Inside a Web Worker, `this` is undefined, the context is `global`
	        // - When `addEventListener` is called on the global context in strict mode, `this` is undefined
	        // see https://github.com/angular/zone.js/issues/190
	        var target = self || _global$1;
	        var delegate = null;
	        if (typeof handler == 'function') {
	            delegate = handler;
	        }
	        else if (handler && handler.handleEvent) {
	            delegate = function (event) { return handler.handleEvent(event); };
	        }
	        var validZoneHandler = false;
	        try {
	            // In cross site contexts (such as WebDriver frameworks like Selenium),
	            // accessing the handler object here will cause an exception to be thrown which
	            // will fail tests prematurely.
	            validZoneHandler = handler && handler.toString() === "[object FunctionWrapper]";
	        }
	        catch (e) {
	            // Returning nothing here is fine, because objects in a cross-site context are unusable
	            return;
	        }
	        // Ignore special listeners of IE11 & Edge dev tools, see https://github.com/angular/zone.js/issues/150
	        if (!delegate || validZoneHandler) {
	            return target[addFnSymbol](eventName, handler, useCapturing);
	        }
	        if (!allowDuplicates) {
	            var eventTask = findExistingRegisteredTask(target, handler, eventName, useCapturing, false);
	            if (eventTask) {
	                // we already registered, so this will have noop.
	                return target[addFnSymbol](eventName, eventTask.invoke, useCapturing);
	            }
	        }
	        var zone = Zone.current;
	        var source = target.constructor['name'] + '.' + addFnName + ':' + eventName;
	        var data = {
	            target: target,
	            eventName: eventName,
	            name: eventName,
	            useCapturing: useCapturing,
	            handler: handler
	        };
	        zone.scheduleEventTask(source, delegate, data, scheduleEventListener, cancelEventListener);
	    };
	}
	function makeZoneAwareRemoveListener(fnName, useCapturingParam) {
	    if (useCapturingParam === void 0) { useCapturingParam = true; }
	    var symbol = zoneSymbol(fnName);
	    var defaultUseCapturing = useCapturingParam ? false : undefined;
	    return function zoneAwareRemoveListener(self, args) {
	        var eventName = args[0];
	        var handler = args[1];
	        var useCapturing = args[2] || defaultUseCapturing;
	        // - Inside a Web Worker, `this` is undefined, the context is `global`
	        // - When `addEventListener` is called on the global context in strict mode, `this` is undefined
	        // see https://github.com/angular/zone.js/issues/190
	        var target = self || _global$1;
	        var eventTask = findExistingRegisteredTask(target, handler, eventName, useCapturing, true);
	        if (eventTask) {
	            eventTask.zone.cancelTask(eventTask);
	        }
	        else {
	            target[symbol](eventName, handler, useCapturing);
	        }
	    };
	}
	var zoneAwareAddEventListener = makeZoneAwareAddListener(ADD_EVENT_LISTENER, REMOVE_EVENT_LISTENER);
	var zoneAwareRemoveEventListener = makeZoneAwareRemoveListener(REMOVE_EVENT_LISTENER);
	function patchEventTargetMethods(obj) {
	    if (obj && obj.addEventListener) {
	        patchMethod(obj, ADD_EVENT_LISTENER, function () { return zoneAwareAddEventListener; });
	        patchMethod(obj, REMOVE_EVENT_LISTENER, function () { return zoneAwareRemoveEventListener; });
	        return true;
	    }
	    else {
	        return false;
	    }
	}
	var originalInstanceKey = zoneSymbol('originalInstance');
	// wrap some native API on `window`
	function patchClass(className) {
	    var OriginalClass = _global$1[className];
	    if (!OriginalClass)
	        return;
	    _global$1[className] = function () {
	        var a = bindArguments(arguments, className);
	        switch (a.length) {
	            case 0:
	                this[originalInstanceKey] = new OriginalClass();
	                break;
	            case 1:
	                this[originalInstanceKey] = new OriginalClass(a[0]);
	                break;
	            case 2:
	                this[originalInstanceKey] = new OriginalClass(a[0], a[1]);
	                break;
	            case 3:
	                this[originalInstanceKey] = new OriginalClass(a[0], a[1], a[2]);
	                break;
	            case 4:
	                this[originalInstanceKey] = new OriginalClass(a[0], a[1], a[2], a[3]);
	                break;
	            default: throw new Error('Arg list too long.');
	        }
	    };
	    var instance = new OriginalClass(function () { });
	    var prop;
	    for (prop in instance) {
	        // https://bugs.webkit.org/show_bug.cgi?id=44721
	        if (className === 'XMLHttpRequest' && prop === 'responseBlob')
	            continue;
	        (function (prop) {
	            if (typeof instance[prop] === 'function') {
	                _global$1[className].prototype[prop] = function () {
	                    return this[originalInstanceKey][prop].apply(this[originalInstanceKey], arguments);
	                };
	            }
	            else {
	                Object.defineProperty(_global$1[className].prototype, prop, {
	                    set: function (fn) {
	                        if (typeof fn === 'function') {
	                            this[originalInstanceKey][prop] = Zone.current.wrap(fn, className + '.' + prop);
	                        }
	                        else {
	                            this[originalInstanceKey][prop] = fn;
	                        }
	                    },
	                    get: function () {
	                        return this[originalInstanceKey][prop];
	                    }
	                });
	            }
	        }(prop));
	    }
	    for (prop in OriginalClass) {
	        if (prop !== 'prototype' && OriginalClass.hasOwnProperty(prop)) {
	            _global$1[className][prop] = OriginalClass[prop];
	        }
	    }
	}
	;
	function createNamedFn(name, delegate) {
	    try {
	        return (Function('f', "return function " + name + "(){return f(this, arguments)}"))(delegate);
	    }
	    catch (e) {
	        // if we fail, we must be CSP, just return delegate.
	        return function () {
	            return delegate(this, arguments);
	        };
	    }
	}
	function patchMethod(target, name, patchFn) {
	    var proto = target;
	    while (proto && !proto.hasOwnProperty(name)) {
	        proto = Object.getPrototypeOf(proto);
	    }
	    if (!proto && target[name]) {
	        // somehow we did not find it, but we can see it. This happens on IE for Window properties.
	        proto = target;
	    }
	    var delegateName = zoneSymbol(name);
	    var delegate;
	    if (proto && !(delegate = proto[delegateName])) {
	        delegate = proto[delegateName] = proto[name];
	        proto[name] = createNamedFn(name, patchFn(delegate, delegateName, name));
	    }
	    return delegate;
	}
	
	var WTF_ISSUE_555 = 'Anchor,Area,Audio,BR,Base,BaseFont,Body,Button,Canvas,Content,DList,Directory,Div,Embed,FieldSet,Font,Form,Frame,FrameSet,HR,Head,Heading,Html,IFrame,Image,Input,Keygen,LI,Label,Legend,Link,Map,Marquee,Media,Menu,Meta,Meter,Mod,OList,Object,OptGroup,Option,Output,Paragraph,Pre,Progress,Quote,Script,Select,Source,Span,Style,TableCaption,TableCell,TableCol,Table,TableRow,TableSection,TextArea,Title,Track,UList,Unknown,Video';
	var NO_EVENT_TARGET = 'ApplicationCache,EventSource,FileReader,InputMethodContext,MediaController,MessagePort,Node,Performance,SVGElementInstance,SharedWorker,TextTrack,TextTrackCue,TextTrackList,WebKitNamedFlow,Window,Worker,WorkerGlobalScope,XMLHttpRequest,XMLHttpRequestEventTarget,XMLHttpRequestUpload,IDBRequest,IDBOpenDBRequest,IDBDatabase,IDBTransaction,IDBCursor,DBIndex'.split(',');
	var EVENT_TARGET = 'EventTarget';
	function eventTargetPatch(_global) {
	    var apis = [];
	    var isWtf = _global['wtf'];
	    if (isWtf) {
	        // Workaround for: https://github.com/google/tracing-framework/issues/555
	        apis = WTF_ISSUE_555.split(',').map(function (v) { return 'HTML' + v + 'Element'; }).concat(NO_EVENT_TARGET);
	    }
	    else if (_global[EVENT_TARGET]) {
	        apis.push(EVENT_TARGET);
	    }
	    else {
	        // Note: EventTarget is not available in all browsers,
	        // if it's not available, we instead patch the APIs in the IDL that inherit from EventTarget
	        apis = NO_EVENT_TARGET;
	    }
	    for (var i = 0; i < apis.length; i++) {
	        var type = _global[apis[i]];
	        patchEventTargetMethods(type && type.prototype);
	    }
	}
	
	/*
	 * This is necessary for Chrome and Chrome mobile, to enable
	 * things like redefining `createdCallback` on an element.
	 */
	var _defineProperty = Object[zoneSymbol('defineProperty')] = Object.defineProperty;
	var _getOwnPropertyDescriptor = Object[zoneSymbol('getOwnPropertyDescriptor')] = Object.getOwnPropertyDescriptor;
	var _create = Object.create;
	var unconfigurablesKey = zoneSymbol('unconfigurables');
	function propertyPatch() {
	    Object.defineProperty = function (obj, prop, desc) {
	        if (isUnconfigurable(obj, prop)) {
	            throw new TypeError('Cannot assign to read only property \'' + prop + '\' of ' + obj);
	        }
	        var originalConfigurableFlag = desc.configurable;
	        if (prop !== 'prototype') {
	            desc = rewriteDescriptor(obj, prop, desc);
	        }
	        return _tryDefineProperty(obj, prop, desc, originalConfigurableFlag);
	    };
	    Object.defineProperties = function (obj, props) {
	        Object.keys(props).forEach(function (prop) {
	            Object.defineProperty(obj, prop, props[prop]);
	        });
	        return obj;
	    };
	    Object.create = function (obj, proto) {
	        if (typeof proto === 'object' && !Object.isFrozen(proto)) {
	            Object.keys(proto).forEach(function (prop) {
	                proto[prop] = rewriteDescriptor(obj, prop, proto[prop]);
	            });
	        }
	        return _create(obj, proto);
	    };
	    Object.getOwnPropertyDescriptor = function (obj, prop) {
	        var desc = _getOwnPropertyDescriptor(obj, prop);
	        if (isUnconfigurable(obj, prop)) {
	            desc.configurable = false;
	        }
	        return desc;
	    };
	}
	;
	function _redefineProperty(obj, prop, desc) {
	    var originalConfigurableFlag = desc.configurable;
	    desc = rewriteDescriptor(obj, prop, desc);
	    return _tryDefineProperty(obj, prop, desc, originalConfigurableFlag);
	}
	;
	function isUnconfigurable(obj, prop) {
	    return obj && obj[unconfigurablesKey] && obj[unconfigurablesKey][prop];
	}
	function rewriteDescriptor(obj, prop, desc) {
	    desc.configurable = true;
	    if (!desc.configurable) {
	        if (!obj[unconfigurablesKey]) {
	            _defineProperty(obj, unconfigurablesKey, { writable: true, value: {} });
	        }
	        obj[unconfigurablesKey][prop] = true;
	    }
	    return desc;
	}
	function _tryDefineProperty(obj, prop, desc, originalConfigurableFlag) {
	    try {
	        return _defineProperty(obj, prop, desc);
	    }
	    catch (e) {
	        if (desc.configurable) {
	            // In case of errors, when the configurable flag was likely set by rewriteDescriptor(), let's retry with the original flag value
	            if (typeof originalConfigurableFlag == 'undefined') {
	                delete desc.configurable;
	            }
	            else {
	                desc.configurable = originalConfigurableFlag;
	            }
	            try {
	                return _defineProperty(obj, prop, desc);
	            }
	            catch (e) {
	                var descJson = null;
	                try {
	                    descJson = JSON.stringify(desc);
	                }
	                catch (e) {
	                    descJson = descJson.toString();
	                }
	                console.log("Attempting to configure '" + prop + "' with descriptor '" + descJson + "' on object '" + obj + "' and got error, giving up: " + e);
	            }
	        }
	        else {
	            throw e;
	        }
	    }
	}
	
	function registerElementPatch(_global) {
	    if (!isBrowser || !('registerElement' in _global.document)) {
	        return;
	    }
	    var _registerElement = document.registerElement;
	    var callbacks = [
	        'createdCallback',
	        'attachedCallback',
	        'detachedCallback',
	        'attributeChangedCallback'
	    ];
	    document.registerElement = function (name, opts) {
	        if (opts && opts.prototype) {
	            callbacks.forEach(function (callback) {
	                var source = 'Document.registerElement::' + callback;
	                if (opts.prototype.hasOwnProperty(callback)) {
	                    var descriptor = Object.getOwnPropertyDescriptor(opts.prototype, callback);
	                    if (descriptor && descriptor.value) {
	                        descriptor.value = Zone.current.wrap(descriptor.value, source);
	                        _redefineProperty(opts.prototype, callback, descriptor);
	                    }
	                    else {
	                        opts.prototype[callback] = Zone.current.wrap(opts.prototype[callback], source);
	                    }
	                }
	                else if (opts.prototype[callback]) {
	                    opts.prototype[callback] = Zone.current.wrap(opts.prototype[callback], source);
	                }
	            });
	        }
	        return _registerElement.apply(document, [name, opts]);
	    };
	}
	
	// we have to patch the instance since the proto is non-configurable
	function apply(_global) {
	    var WS = _global.WebSocket;
	    // On Safari window.EventTarget doesn't exist so need to patch WS add/removeEventListener
	    // On older Chrome, no need since EventTarget was already patched
	    if (!_global.EventTarget) {
	        patchEventTargetMethods(WS.prototype);
	    }
	    _global.WebSocket = function (a, b) {
	        var socket = arguments.length > 1 ? new WS(a, b) : new WS(a);
	        var proxySocket;
	        // Safari 7.0 has non-configurable own 'onmessage' and friends properties on the socket instance
	        var onmessageDesc = Object.getOwnPropertyDescriptor(socket, 'onmessage');
	        if (onmessageDesc && onmessageDesc.configurable === false) {
	            proxySocket = Object.create(socket);
	            ['addEventListener', 'removeEventListener', 'send', 'close'].forEach(function (propName) {
	                proxySocket[propName] = function () {
	                    return socket[propName].apply(socket, arguments);
	                };
	            });
	        }
	        else {
	            // we can patch the real socket
	            proxySocket = socket;
	        }
	        patchOnProperties(proxySocket, ['close', 'error', 'message', 'open']);
	        return proxySocket;
	    };
	    for (var prop in WS) {
	        _global.WebSocket[prop] = WS[prop];
	    }
	}
	
	var eventNames = 'copy cut paste abort blur focus canplay canplaythrough change click contextmenu dblclick drag dragend dragenter dragleave dragover dragstart drop durationchange emptied ended input invalid keydown keypress keyup load loadeddata loadedmetadata loadstart message mousedown mouseenter mouseleave mousemove mouseout mouseover mouseup pause play playing progress ratechange reset scroll seeked seeking select show stalled submit suspend timeupdate volumechange waiting mozfullscreenchange mozfullscreenerror mozpointerlockchange mozpointerlockerror error webglcontextrestored webglcontextlost webglcontextcreationerror'.split(' ');
	function propertyDescriptorPatch(_global) {
	    if (isNode) {
	        return;
	    }
	    var supportsWebSocket = typeof WebSocket !== 'undefined';
	    if (canPatchViaPropertyDescriptor()) {
	        // for browsers that we can patch the descriptor:  Chrome & Firefox
	        if (isBrowser) {
	            patchOnProperties(HTMLElement.prototype, eventNames);
	        }
	        patchOnProperties(XMLHttpRequest.prototype, null);
	        if (typeof IDBIndex !== 'undefined') {
	            patchOnProperties(IDBIndex.prototype, null);
	            patchOnProperties(IDBRequest.prototype, null);
	            patchOnProperties(IDBOpenDBRequest.prototype, null);
	            patchOnProperties(IDBDatabase.prototype, null);
	            patchOnProperties(IDBTransaction.prototype, null);
	            patchOnProperties(IDBCursor.prototype, null);
	        }
	        if (supportsWebSocket) {
	            patchOnProperties(WebSocket.prototype, null);
	        }
	    }
	    else {
	        // Safari, Android browsers (Jelly Bean)
	        patchViaCapturingAllTheEvents();
	        patchClass('XMLHttpRequest');
	        if (supportsWebSocket) {
	            apply(_global);
	        }
	    }
	}
	function canPatchViaPropertyDescriptor() {
	    if (isBrowser && !Object.getOwnPropertyDescriptor(HTMLElement.prototype, 'onclick')
	        && typeof Element !== 'undefined') {
	        // WebKit https://bugs.webkit.org/show_bug.cgi?id=134364
	        // IDL interface attributes are not configurable
	        var desc = Object.getOwnPropertyDescriptor(Element.prototype, 'onclick');
	        if (desc && !desc.configurable)
	            return false;
	    }
	    Object.defineProperty(XMLHttpRequest.prototype, 'onreadystatechange', {
	        get: function () {
	            return true;
	        }
	    });
	    var req = new XMLHttpRequest();
	    var result = !!req.onreadystatechange;
	    Object.defineProperty(XMLHttpRequest.prototype, 'onreadystatechange', {});
	    return result;
	}
	;
	var unboundKey = zoneSymbol('unbound');
	// Whenever any eventListener fires, we check the eventListener target and all parents
	// for `onwhatever` properties and replace them with zone-bound functions
	// - Chrome (for now)
	function patchViaCapturingAllTheEvents() {
	    var _loop_1 = function(i) {
	        var property = eventNames[i];
	        var onproperty = 'on' + property;
	        document.addEventListener(property, function (event) {
	            var elt = event.target, bound, source;
	            if (elt) {
	                source = elt.constructor['name'] + '.' + onproperty;
	            }
	            else {
	                source = 'unknown.' + onproperty;
	            }
	            while (elt) {
	                if (elt[onproperty] && !elt[onproperty][unboundKey]) {
	                    bound = Zone.current.wrap(elt[onproperty], source);
	                    bound[unboundKey] = elt[onproperty];
	                    elt[onproperty] = bound;
	                }
	                elt = elt.parentElement;
	            }
	        }, true);
	    };
	    for (var i = 0; i < eventNames.length; i++) {
	        _loop_1(i);
	    }
	    ;
	}
	;
	
	function patchTimer(window, setName, cancelName, nameSuffix) {
	    var setNative = null;
	    var clearNative = null;
	    setName += nameSuffix;
	    cancelName += nameSuffix;
	    function scheduleTask(task) {
	        var data = task.data;
	        data.args[0] = task.invoke;
	        data.handleId = setNative.apply(window, data.args);
	        return task;
	    }
	    function clearTask(task) {
	        return clearNative(task.data.handleId);
	    }
	    setNative = patchMethod(window, setName, function (delegate) { return function (self, args) {
	        if (typeof args[0] === 'function') {
	            var zone = Zone.current;
	            var options = {
	                handleId: null,
	                isPeriodic: nameSuffix === 'Interval',
	                delay: (nameSuffix === 'Timeout' || nameSuffix === 'Interval') ? args[1] || 0 : null,
	                args: args
	            };
	            var task = zone.scheduleMacroTask(setName, args[0], options, scheduleTask, clearTask);
	            if (!task) {
	                return task;
	            }
	            // Node.js must additionally support the ref and unref functions.
	            var handle = task.data.handleId;
	            if (handle.ref && handle.unref) {
	                task.ref = handle.ref.bind(handle);
	                task.unref = handle.unref.bind(handle);
	            }
	            return task;
	        }
	        else {
	            // cause an error by calling it directly.
	            return delegate.apply(window, args);
	        }
	    }; });
	    clearNative = patchMethod(window, cancelName, function (delegate) { return function (self, args) {
	        var task = args[0];
	        if (task && typeof task.type === 'string') {
	            if (task.cancelFn && task.data.isPeriodic || task.runCount === 0) {
	                // Do not cancel already canceled functions
	                task.zone.cancelTask(task);
	            }
	        }
	        else {
	            // cause an error by calling it directly.
	            delegate.apply(window, args);
	        }
	    }; });
	}
	
	var set = 'set';
	var clear = 'clear';
	var blockingMethods = ['alert', 'prompt', 'confirm'];
	var _global = typeof window === 'object' && window || typeof self === 'object' && self || global;
	patchTimer(_global, set, clear, 'Timeout');
	patchTimer(_global, set, clear, 'Interval');
	patchTimer(_global, set, clear, 'Immediate');
	patchTimer(_global, 'request', 'cancel', 'AnimationFrame');
	patchTimer(_global, 'mozRequest', 'mozCancel', 'AnimationFrame');
	patchTimer(_global, 'webkitRequest', 'webkitCancel', 'AnimationFrame');
	for (var i = 0; i < blockingMethods.length; i++) {
	    var name = blockingMethods[i];
	    patchMethod(_global, name, function (delegate, symbol, name) {
	        return function (s, args) {
	            return Zone.current.run(delegate, _global, args, name);
	        };
	    });
	}
	eventTargetPatch(_global);
	propertyDescriptorPatch(_global);
	patchClass('MutationObserver');
	patchClass('WebKitMutationObserver');
	patchClass('FileReader');
	propertyPatch();
	registerElementPatch(_global);
	// Treat XMLHTTPRequest as a macrotask.
	patchXHR(_global);
	var XHR_TASK = zoneSymbol('xhrTask');
	var XHR_SYNC = zoneSymbol('xhrSync');
	function patchXHR(window) {
	    function findPendingTask(target) {
	        var pendingTask = target[XHR_TASK];
	        return pendingTask;
	    }
	    function scheduleTask(task) {
	        var data = task.data;
	        data.target.addEventListener('readystatechange', function () {
	            if (data.target.readyState === data.target.DONE) {
	                if (!data.aborted) {
	                    task.invoke();
	                }
	            }
	        });
	        var storedTask = data.target[XHR_TASK];
	        if (!storedTask) {
	            data.target[XHR_TASK] = task;
	        }
	        sendNative.apply(data.target, data.args);
	        return task;
	    }
	    function placeholderCallback() {
	    }
	    function clearTask(task) {
	        var data = task.data;
	        // Note - ideally, we would call data.target.removeEventListener here, but it's too late
	        // to prevent it from firing. So instead, we store info for the event listener.
	        data.aborted = true;
	        return abortNative.apply(data.target, data.args);
	    }
	    var openNative = patchMethod(window.XMLHttpRequest.prototype, 'open', function () { return function (self, args) {
	        self[XHR_SYNC] = args[2] == false;
	        return openNative.apply(self, args);
	    }; });
	    var sendNative = patchMethod(window.XMLHttpRequest.prototype, 'send', function () { return function (self, args) {
	        var zone = Zone.current;
	        if (self[XHR_SYNC]) {
	            // if the XHR is sync there is no task to schedule, just execute the code.
	            return sendNative.apply(self, args);
	        }
	        else {
	            var options = {
	                target: self,
	                isPeriodic: false,
	                delay: null,
	                args: args,
	                aborted: false
	            };
	            return zone.scheduleMacroTask('XMLHttpRequest.send', placeholderCallback, options, scheduleTask, clearTask);
	        }
	    }; });
	    var abortNative = patchMethod(window.XMLHttpRequest.prototype, 'abort', function (delegate) { return function (self, args) {
	        var task = findPendingTask(self);
	        if (task && typeof task.type == 'string') {
	            // If the XHR has already completed, do nothing.
	            if (task.cancelFn == null) {
	                return;
	            }
	            task.zone.cancelTask(task);
	        }
	        // Otherwise, we are trying to abort an XHR which has not yet been sent, so there is no task to cancel. Do nothing.
	    }; });
	}
	/// GEO_LOCATION
	if (_global['navigator'] && _global['navigator'].geolocation) {
	    patchPrototype(_global['navigator'].geolocation, [
	        'getCurrentPosition',
	        'watchPosition'
	    ]);
	}
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }()), __webpack_require__(39)))

/***/ },
/* 39 */
/***/ function(module, exports) {

	// shim for using process in browser
	var process = module.exports = {};
	
	// cached from whatever global is present so that test runners that stub it
	// don't break things.  But we need to wrap it in a try catch in case it is
	// wrapped in strict mode code which doesn't define any globals.  It's inside a
	// function because try/catches deoptimize in certain engines.
	
	var cachedSetTimeout;
	var cachedClearTimeout;
	
	function defaultSetTimout() {
	    throw new Error('setTimeout has not been defined');
	}
	function defaultClearTimeout () {
	    throw new Error('clearTimeout has not been defined');
	}
	(function () {
	    try {
	        if (typeof setTimeout === 'function') {
	            cachedSetTimeout = setTimeout;
	        } else {
	            cachedSetTimeout = defaultSetTimout;
	        }
	    } catch (e) {
	        cachedSetTimeout = defaultSetTimout;
	    }
	    try {
	        if (typeof clearTimeout === 'function') {
	            cachedClearTimeout = clearTimeout;
	        } else {
	            cachedClearTimeout = defaultClearTimeout;
	        }
	    } catch (e) {
	        cachedClearTimeout = defaultClearTimeout;
	    }
	} ())
	function runTimeout(fun) {
	    if (cachedSetTimeout === setTimeout) {
	        //normal enviroments in sane situations
	        return setTimeout(fun, 0);
	    }
	    // if setTimeout wasn't available but was latter defined
	    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
	        cachedSetTimeout = setTimeout;
	        return setTimeout(fun, 0);
	    }
	    try {
	        // when when somebody has screwed with setTimeout but no I.E. maddness
	        return cachedSetTimeout(fun, 0);
	    } catch(e){
	        try {
	            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
	            return cachedSetTimeout.call(null, fun, 0);
	        } catch(e){
	            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
	            return cachedSetTimeout.call(this, fun, 0);
	        }
	    }
	
	
	}
	function runClearTimeout(marker) {
	    if (cachedClearTimeout === clearTimeout) {
	        //normal enviroments in sane situations
	        return clearTimeout(marker);
	    }
	    // if clearTimeout wasn't available but was latter defined
	    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
	        cachedClearTimeout = clearTimeout;
	        return clearTimeout(marker);
	    }
	    try {
	        // when when somebody has screwed with setTimeout but no I.E. maddness
	        return cachedClearTimeout(marker);
	    } catch (e){
	        try {
	            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
	            return cachedClearTimeout.call(null, marker);
	        } catch (e){
	            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
	            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
	            return cachedClearTimeout.call(this, marker);
	        }
	    }
	
	
	
	}
	var queue = [];
	var draining = false;
	var currentQueue;
	var queueIndex = -1;
	
	function cleanUpNextTick() {
	    if (!draining || !currentQueue) {
	        return;
	    }
	    draining = false;
	    if (currentQueue.length) {
	        queue = currentQueue.concat(queue);
	    } else {
	        queueIndex = -1;
	    }
	    if (queue.length) {
	        drainQueue();
	    }
	}
	
	function drainQueue() {
	    if (draining) {
	        return;
	    }
	    var timeout = runTimeout(cleanUpNextTick);
	    draining = true;
	
	    var len = queue.length;
	    while(len) {
	        currentQueue = queue;
	        queue = [];
	        while (++queueIndex < len) {
	            if (currentQueue) {
	                currentQueue[queueIndex].run();
	            }
	        }
	        queueIndex = -1;
	        len = queue.length;
	    }
	    currentQueue = null;
	    draining = false;
	    runClearTimeout(timeout);
	}
	
	process.nextTick = function (fun) {
	    var args = new Array(arguments.length - 1);
	    if (arguments.length > 1) {
	        for (var i = 1; i < arguments.length; i++) {
	            args[i - 1] = arguments[i];
	        }
	    }
	    queue.push(new Item(fun, args));
	    if (queue.length === 1 && !draining) {
	        runTimeout(drainQueue);
	    }
	};
	
	// v8 likes predictible objects
	function Item(fun, array) {
	    this.fun = fun;
	    this.array = array;
	}
	Item.prototype.run = function () {
	    this.fun.apply(null, this.array);
	};
	process.title = 'browser';
	process.browser = true;
	process.env = {};
	process.argv = [];
	process.version = ''; // empty string to avoid regexp issues
	process.versions = {};
	
	function noop() {}
	
	process.on = noop;
	process.addListener = noop;
	process.once = noop;
	process.off = noop;
	process.removeListener = noop;
	process.removeAllListeners = noop;
	process.emit = noop;
	process.prependListener = noop;
	process.prependOnceListener = noop;
	
	process.listeners = function (name) { return [] }
	
	process.binding = function (name) {
	    throw new Error('process.binding is not supported');
	};
	
	process.cwd = function () { return '/' };
	process.chdir = function (dir) {
	    throw new Error('process.chdir is not supported');
	};
	process.umask = function() { return 0; };


/***/ },
/* 40 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(41);
	__webpack_require__(60);
	__webpack_require__(79);
	__webpack_require__(80);
	__webpack_require__(83);
	__webpack_require__(87);
	__webpack_require__(90);
	__webpack_require__(91);
	__webpack_require__(92);
	__webpack_require__(93);
	__webpack_require__(94);
	__webpack_require__(98);
	__webpack_require__(99);
	__webpack_require__(100);
	module.exports = __webpack_require__(44).Reflect;

/***/ },
/* 41 */
/***/ function(module, exports, __webpack_require__) {

	// 26.1.1 Reflect.apply(target, thisArgument, argumentsList)
	var $export   = __webpack_require__(42)
	  , aFunction = __webpack_require__(59)
	  , anObject  = __webpack_require__(47)
	  , rApply    = (__webpack_require__(43).Reflect || {}).apply
	  , fApply    = Function.apply;
	// MS Edge argumentsList argument is optional
	$export($export.S + $export.F * !__webpack_require__(51)(function(){
	  rApply(function(){});
	}), 'Reflect', {
	  apply: function apply(target, thisArgument, argumentsList){
	    var T = aFunction(target)
	      , L = anObject(argumentsList);
	    return rApply ? rApply(T, thisArgument, L) : fApply.call(T, thisArgument, L);
	  }
	});

/***/ },
/* 42 */
/***/ function(module, exports, __webpack_require__) {

	var global    = __webpack_require__(43)
	  , core      = __webpack_require__(44)
	  , hide      = __webpack_require__(45)
	  , redefine  = __webpack_require__(55)
	  , ctx       = __webpack_require__(58)
	  , PROTOTYPE = 'prototype';
	
	var $export = function(type, name, source){
	  var IS_FORCED = type & $export.F
	    , IS_GLOBAL = type & $export.G
	    , IS_STATIC = type & $export.S
	    , IS_PROTO  = type & $export.P
	    , IS_BIND   = type & $export.B
	    , target    = IS_GLOBAL ? global : IS_STATIC ? global[name] || (global[name] = {}) : (global[name] || {})[PROTOTYPE]
	    , exports   = IS_GLOBAL ? core : core[name] || (core[name] = {})
	    , expProto  = exports[PROTOTYPE] || (exports[PROTOTYPE] = {})
	    , key, own, out, exp;
	  if(IS_GLOBAL)source = name;
	  for(key in source){
	    // contains in native
	    own = !IS_FORCED && target && target[key] !== undefined;
	    // export native or passed
	    out = (own ? target : source)[key];
	    // bind timers to global for call from export context
	    exp = IS_BIND && own ? ctx(out, global) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
	    // extend global
	    if(target)redefine(target, key, out, type & $export.U);
	    // export
	    if(exports[key] != out)hide(exports, key, exp);
	    if(IS_PROTO && expProto[key] != out)expProto[key] = out;
	  }
	};
	global.core = core;
	// type bitmap
	$export.F = 1;   // forced
	$export.G = 2;   // global
	$export.S = 4;   // static
	$export.P = 8;   // proto
	$export.B = 16;  // bind
	$export.W = 32;  // wrap
	$export.U = 64;  // safe
	$export.R = 128; // real proto method for `library` 
	module.exports = $export;

/***/ },
/* 43 */
/***/ function(module, exports) {

	// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
	var global = module.exports = typeof window != 'undefined' && window.Math == Math
	  ? window : typeof self != 'undefined' && self.Math == Math ? self : Function('return this')();
	if(typeof __g == 'number')__g = global; // eslint-disable-line no-undef

/***/ },
/* 44 */
/***/ function(module, exports) {

	var core = module.exports = {version: '2.4.0'};
	if(typeof __e == 'number')__e = core; // eslint-disable-line no-undef

/***/ },
/* 45 */
/***/ function(module, exports, __webpack_require__) {

	var dP         = __webpack_require__(46)
	  , createDesc = __webpack_require__(54);
	module.exports = __webpack_require__(50) ? function(object, key, value){
	  return dP.f(object, key, createDesc(1, value));
	} : function(object, key, value){
	  object[key] = value;
	  return object;
	};

/***/ },
/* 46 */
/***/ function(module, exports, __webpack_require__) {

	var anObject       = __webpack_require__(47)
	  , IE8_DOM_DEFINE = __webpack_require__(49)
	  , toPrimitive    = __webpack_require__(53)
	  , dP             = Object.defineProperty;
	
	exports.f = __webpack_require__(50) ? Object.defineProperty : function defineProperty(O, P, Attributes){
	  anObject(O);
	  P = toPrimitive(P, true);
	  anObject(Attributes);
	  if(IE8_DOM_DEFINE)try {
	    return dP(O, P, Attributes);
	  } catch(e){ /* empty */ }
	  if('get' in Attributes || 'set' in Attributes)throw TypeError('Accessors not supported!');
	  if('value' in Attributes)O[P] = Attributes.value;
	  return O;
	};

/***/ },
/* 47 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(48);
	module.exports = function(it){
	  if(!isObject(it))throw TypeError(it + ' is not an object!');
	  return it;
	};

/***/ },
/* 48 */
/***/ function(module, exports) {

	module.exports = function(it){
	  return typeof it === 'object' ? it !== null : typeof it === 'function';
	};

/***/ },
/* 49 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = !__webpack_require__(50) && !__webpack_require__(51)(function(){
	  return Object.defineProperty(__webpack_require__(52)('div'), 'a', {get: function(){ return 7; }}).a != 7;
	});

/***/ },
/* 50 */
/***/ function(module, exports, __webpack_require__) {

	// Thank's IE8 for his funny defineProperty
	module.exports = !__webpack_require__(51)(function(){
	  return Object.defineProperty({}, 'a', {get: function(){ return 7; }}).a != 7;
	});

/***/ },
/* 51 */
/***/ function(module, exports) {

	module.exports = function(exec){
	  try {
	    return !!exec();
	  } catch(e){
	    return true;
	  }
	};

/***/ },
/* 52 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(48)
	  , document = __webpack_require__(43).document
	  // in old IE typeof document.createElement is 'object'
	  , is = isObject(document) && isObject(document.createElement);
	module.exports = function(it){
	  return is ? document.createElement(it) : {};
	};

/***/ },
/* 53 */
/***/ function(module, exports, __webpack_require__) {

	// 7.1.1 ToPrimitive(input [, PreferredType])
	var isObject = __webpack_require__(48);
	// instead of the ES6 spec version, we didn't implement @@toPrimitive case
	// and the second argument - flag - preferred type is a string
	module.exports = function(it, S){
	  if(!isObject(it))return it;
	  var fn, val;
	  if(S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it)))return val;
	  if(typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it)))return val;
	  if(!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it)))return val;
	  throw TypeError("Can't convert object to primitive value");
	};

/***/ },
/* 54 */
/***/ function(module, exports) {

	module.exports = function(bitmap, value){
	  return {
	    enumerable  : !(bitmap & 1),
	    configurable: !(bitmap & 2),
	    writable    : !(bitmap & 4),
	    value       : value
	  };
	};

/***/ },
/* 55 */
/***/ function(module, exports, __webpack_require__) {

	var global    = __webpack_require__(43)
	  , hide      = __webpack_require__(45)
	  , has       = __webpack_require__(56)
	  , SRC       = __webpack_require__(57)('src')
	  , TO_STRING = 'toString'
	  , $toString = Function[TO_STRING]
	  , TPL       = ('' + $toString).split(TO_STRING);
	
	__webpack_require__(44).inspectSource = function(it){
	  return $toString.call(it);
	};
	
	(module.exports = function(O, key, val, safe){
	  var isFunction = typeof val == 'function';
	  if(isFunction)has(val, 'name') || hide(val, 'name', key);
	  if(O[key] === val)return;
	  if(isFunction)has(val, SRC) || hide(val, SRC, O[key] ? '' + O[key] : TPL.join(String(key)));
	  if(O === global){
	    O[key] = val;
	  } else {
	    if(!safe){
	      delete O[key];
	      hide(O, key, val);
	    } else {
	      if(O[key])O[key] = val;
	      else hide(O, key, val);
	    }
	  }
	// add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
	})(Function.prototype, TO_STRING, function toString(){
	  return typeof this == 'function' && this[SRC] || $toString.call(this);
	});

/***/ },
/* 56 */
/***/ function(module, exports) {

	var hasOwnProperty = {}.hasOwnProperty;
	module.exports = function(it, key){
	  return hasOwnProperty.call(it, key);
	};

/***/ },
/* 57 */
/***/ function(module, exports) {

	var id = 0
	  , px = Math.random();
	module.exports = function(key){
	  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
	};

/***/ },
/* 58 */
/***/ function(module, exports, __webpack_require__) {

	// optional / simple context binding
	var aFunction = __webpack_require__(59);
	module.exports = function(fn, that, length){
	  aFunction(fn);
	  if(that === undefined)return fn;
	  switch(length){
	    case 1: return function(a){
	      return fn.call(that, a);
	    };
	    case 2: return function(a, b){
	      return fn.call(that, a, b);
	    };
	    case 3: return function(a, b, c){
	      return fn.call(that, a, b, c);
	    };
	  }
	  return function(/* ...args */){
	    return fn.apply(that, arguments);
	  };
	};

/***/ },
/* 59 */
/***/ function(module, exports) {

	module.exports = function(it){
	  if(typeof it != 'function')throw TypeError(it + ' is not a function!');
	  return it;
	};

/***/ },
/* 60 */
/***/ function(module, exports, __webpack_require__) {

	// 26.1.2 Reflect.construct(target, argumentsList [, newTarget])
	var $export    = __webpack_require__(42)
	  , create     = __webpack_require__(61)
	  , aFunction  = __webpack_require__(59)
	  , anObject   = __webpack_require__(47)
	  , isObject   = __webpack_require__(48)
	  , fails      = __webpack_require__(51)
	  , bind       = __webpack_require__(77)
	  , rConstruct = (__webpack_require__(43).Reflect || {}).construct;
	
	// MS Edge supports only 2 arguments and argumentsList argument is optional
	// FF Nightly sets third argument as `new.target`, but does not create `this` from it
	var NEW_TARGET_BUG = fails(function(){
	  function F(){}
	  return !(rConstruct(function(){}, [], F) instanceof F);
	});
	var ARGS_BUG = !fails(function(){
	  rConstruct(function(){});
	});
	
	$export($export.S + $export.F * (NEW_TARGET_BUG || ARGS_BUG), 'Reflect', {
	  construct: function construct(Target, args /*, newTarget*/){
	    aFunction(Target);
	    anObject(args);
	    var newTarget = arguments.length < 3 ? Target : aFunction(arguments[2]);
	    if(ARGS_BUG && !NEW_TARGET_BUG)return rConstruct(Target, args, newTarget);
	    if(Target == newTarget){
	      // w/o altered newTarget, optimization for 0-4 arguments
	      switch(args.length){
	        case 0: return new Target;
	        case 1: return new Target(args[0]);
	        case 2: return new Target(args[0], args[1]);
	        case 3: return new Target(args[0], args[1], args[2]);
	        case 4: return new Target(args[0], args[1], args[2], args[3]);
	      }
	      // w/o altered newTarget, lot of arguments case
	      var $args = [null];
	      $args.push.apply($args, args);
	      return new (bind.apply(Target, $args));
	    }
	    // with altered newTarget, not support built-in constructors
	    var proto    = newTarget.prototype
	      , instance = create(isObject(proto) ? proto : Object.prototype)
	      , result   = Function.apply.call(Target, instance, args);
	    return isObject(result) ? result : instance;
	  }
	});

/***/ },
/* 61 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
	var anObject    = __webpack_require__(47)
	  , dPs         = __webpack_require__(62)
	  , enumBugKeys = __webpack_require__(75)
	  , IE_PROTO    = __webpack_require__(73)('IE_PROTO')
	  , Empty       = function(){ /* empty */ }
	  , PROTOTYPE   = 'prototype';
	
	// Create object with fake `null` prototype: use iframe Object with cleared prototype
	var createDict = function(){
	  // Thrash, waste and sodomy: IE GC bug
	  var iframe = __webpack_require__(52)('iframe')
	    , i      = enumBugKeys.length
	    , lt     = '<'
	    , gt     = '>'
	    , iframeDocument;
	  iframe.style.display = 'none';
	  __webpack_require__(76).appendChild(iframe);
	  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
	  // createDict = iframe.contentWindow.Object;
	  // html.removeChild(iframe);
	  iframeDocument = iframe.contentWindow.document;
	  iframeDocument.open();
	  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
	  iframeDocument.close();
	  createDict = iframeDocument.F;
	  while(i--)delete createDict[PROTOTYPE][enumBugKeys[i]];
	  return createDict();
	};
	
	module.exports = Object.create || function create(O, Properties){
	  var result;
	  if(O !== null){
	    Empty[PROTOTYPE] = anObject(O);
	    result = new Empty;
	    Empty[PROTOTYPE] = null;
	    // add "__proto__" for Object.getPrototypeOf polyfill
	    result[IE_PROTO] = O;
	  } else result = createDict();
	  return Properties === undefined ? result : dPs(result, Properties);
	};


/***/ },
/* 62 */
/***/ function(module, exports, __webpack_require__) {

	var dP       = __webpack_require__(46)
	  , anObject = __webpack_require__(47)
	  , getKeys  = __webpack_require__(63);
	
	module.exports = __webpack_require__(50) ? Object.defineProperties : function defineProperties(O, Properties){
	  anObject(O);
	  var keys   = getKeys(Properties)
	    , length = keys.length
	    , i = 0
	    , P;
	  while(length > i)dP.f(O, P = keys[i++], Properties[P]);
	  return O;
	};

/***/ },
/* 63 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.14 / 15.2.3.14 Object.keys(O)
	var $keys       = __webpack_require__(64)
	  , enumBugKeys = __webpack_require__(75);
	
	module.exports = Object.keys || function keys(O){
	  return $keys(O, enumBugKeys);
	};

/***/ },
/* 64 */
/***/ function(module, exports, __webpack_require__) {

	var has          = __webpack_require__(56)
	  , toIObject    = __webpack_require__(65)
	  , arrayIndexOf = __webpack_require__(69)(false)
	  , IE_PROTO     = __webpack_require__(73)('IE_PROTO');
	
	module.exports = function(object, names){
	  var O      = toIObject(object)
	    , i      = 0
	    , result = []
	    , key;
	  for(key in O)if(key != IE_PROTO)has(O, key) && result.push(key);
	  // Don't enum bug & hidden keys
	  while(names.length > i)if(has(O, key = names[i++])){
	    ~arrayIndexOf(result, key) || result.push(key);
	  }
	  return result;
	};

/***/ },
/* 65 */
/***/ function(module, exports, __webpack_require__) {

	// to indexed object, toObject with fallback for non-array-like ES3 strings
	var IObject = __webpack_require__(66)
	  , defined = __webpack_require__(68);
	module.exports = function(it){
	  return IObject(defined(it));
	};

/***/ },
/* 66 */
/***/ function(module, exports, __webpack_require__) {

	// fallback for non-array-like ES3 and non-enumerable old V8 strings
	var cof = __webpack_require__(67);
	module.exports = Object('z').propertyIsEnumerable(0) ? Object : function(it){
	  return cof(it) == 'String' ? it.split('') : Object(it);
	};

/***/ },
/* 67 */
/***/ function(module, exports) {

	var toString = {}.toString;
	
	module.exports = function(it){
	  return toString.call(it).slice(8, -1);
	};

/***/ },
/* 68 */
/***/ function(module, exports) {

	// 7.2.1 RequireObjectCoercible(argument)
	module.exports = function(it){
	  if(it == undefined)throw TypeError("Can't call method on  " + it);
	  return it;
	};

/***/ },
/* 69 */
/***/ function(module, exports, __webpack_require__) {

	// false -> Array#indexOf
	// true  -> Array#includes
	var toIObject = __webpack_require__(65)
	  , toLength  = __webpack_require__(70)
	  , toIndex   = __webpack_require__(72);
	module.exports = function(IS_INCLUDES){
	  return function($this, el, fromIndex){
	    var O      = toIObject($this)
	      , length = toLength(O.length)
	      , index  = toIndex(fromIndex, length)
	      , value;
	    // Array#includes uses SameValueZero equality algorithm
	    if(IS_INCLUDES && el != el)while(length > index){
	      value = O[index++];
	      if(value != value)return true;
	    // Array#toIndex ignores holes, Array#includes - not
	    } else for(;length > index; index++)if(IS_INCLUDES || index in O){
	      if(O[index] === el)return IS_INCLUDES || index || 0;
	    } return !IS_INCLUDES && -1;
	  };
	};

/***/ },
/* 70 */
/***/ function(module, exports, __webpack_require__) {

	// 7.1.15 ToLength
	var toInteger = __webpack_require__(71)
	  , min       = Math.min;
	module.exports = function(it){
	  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
	};

/***/ },
/* 71 */
/***/ function(module, exports) {

	// 7.1.4 ToInteger
	var ceil  = Math.ceil
	  , floor = Math.floor;
	module.exports = function(it){
	  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
	};

/***/ },
/* 72 */
/***/ function(module, exports, __webpack_require__) {

	var toInteger = __webpack_require__(71)
	  , max       = Math.max
	  , min       = Math.min;
	module.exports = function(index, length){
	  index = toInteger(index);
	  return index < 0 ? max(index + length, 0) : min(index, length);
	};

/***/ },
/* 73 */
/***/ function(module, exports, __webpack_require__) {

	var shared = __webpack_require__(74)('keys')
	  , uid    = __webpack_require__(57);
	module.exports = function(key){
	  return shared[key] || (shared[key] = uid(key));
	};

/***/ },
/* 74 */
/***/ function(module, exports, __webpack_require__) {

	var global = __webpack_require__(43)
	  , SHARED = '__core-js_shared__'
	  , store  = global[SHARED] || (global[SHARED] = {});
	module.exports = function(key){
	  return store[key] || (store[key] = {});
	};

/***/ },
/* 75 */
/***/ function(module, exports) {

	// IE 8- don't enum bug keys
	module.exports = (
	  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
	).split(',');

/***/ },
/* 76 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(43).document && document.documentElement;

/***/ },
/* 77 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var aFunction  = __webpack_require__(59)
	  , isObject   = __webpack_require__(48)
	  , invoke     = __webpack_require__(78)
	  , arraySlice = [].slice
	  , factories  = {};
	
	var construct = function(F, len, args){
	  if(!(len in factories)){
	    for(var n = [], i = 0; i < len; i++)n[i] = 'a[' + i + ']';
	    factories[len] = Function('F,a', 'return new F(' + n.join(',') + ')');
	  } return factories[len](F, args);
	};
	
	module.exports = Function.bind || function bind(that /*, args... */){
	  var fn       = aFunction(this)
	    , partArgs = arraySlice.call(arguments, 1);
	  var bound = function(/* args... */){
	    var args = partArgs.concat(arraySlice.call(arguments));
	    return this instanceof bound ? construct(fn, args.length, args) : invoke(fn, args, that);
	  };
	  if(isObject(fn.prototype))bound.prototype = fn.prototype;
	  return bound;
	};

/***/ },
/* 78 */
/***/ function(module, exports) {

	// fast apply, http://jsperf.lnkit.com/fast-apply/5
	module.exports = function(fn, args, that){
	  var un = that === undefined;
	  switch(args.length){
	    case 0: return un ? fn()
	                      : fn.call(that);
	    case 1: return un ? fn(args[0])
	                      : fn.call(that, args[0]);
	    case 2: return un ? fn(args[0], args[1])
	                      : fn.call(that, args[0], args[1]);
	    case 3: return un ? fn(args[0], args[1], args[2])
	                      : fn.call(that, args[0], args[1], args[2]);
	    case 4: return un ? fn(args[0], args[1], args[2], args[3])
	                      : fn.call(that, args[0], args[1], args[2], args[3]);
	  } return              fn.apply(that, args);
	};

/***/ },
/* 79 */
/***/ function(module, exports, __webpack_require__) {

	// 26.1.3 Reflect.defineProperty(target, propertyKey, attributes)
	var dP          = __webpack_require__(46)
	  , $export     = __webpack_require__(42)
	  , anObject    = __webpack_require__(47)
	  , toPrimitive = __webpack_require__(53);
	
	// MS Edge has broken Reflect.defineProperty - throwing instead of returning false
	$export($export.S + $export.F * __webpack_require__(51)(function(){
	  Reflect.defineProperty(dP.f({}, 1, {value: 1}), 1, {value: 2});
	}), 'Reflect', {
	  defineProperty: function defineProperty(target, propertyKey, attributes){
	    anObject(target);
	    propertyKey = toPrimitive(propertyKey, true);
	    anObject(attributes);
	    try {
	      dP.f(target, propertyKey, attributes);
	      return true;
	    } catch(e){
	      return false;
	    }
	  }
	});

/***/ },
/* 80 */
/***/ function(module, exports, __webpack_require__) {

	// 26.1.4 Reflect.deleteProperty(target, propertyKey)
	var $export  = __webpack_require__(42)
	  , gOPD     = __webpack_require__(81).f
	  , anObject = __webpack_require__(47);
	
	$export($export.S, 'Reflect', {
	  deleteProperty: function deleteProperty(target, propertyKey){
	    var desc = gOPD(anObject(target), propertyKey);
	    return desc && !desc.configurable ? false : delete target[propertyKey];
	  }
	});

/***/ },
/* 81 */
/***/ function(module, exports, __webpack_require__) {

	var pIE            = __webpack_require__(82)
	  , createDesc     = __webpack_require__(54)
	  , toIObject      = __webpack_require__(65)
	  , toPrimitive    = __webpack_require__(53)
	  , has            = __webpack_require__(56)
	  , IE8_DOM_DEFINE = __webpack_require__(49)
	  , gOPD           = Object.getOwnPropertyDescriptor;
	
	exports.f = __webpack_require__(50) ? gOPD : function getOwnPropertyDescriptor(O, P){
	  O = toIObject(O);
	  P = toPrimitive(P, true);
	  if(IE8_DOM_DEFINE)try {
	    return gOPD(O, P);
	  } catch(e){ /* empty */ }
	  if(has(O, P))return createDesc(!pIE.f.call(O, P), O[P]);
	};

/***/ },
/* 82 */
/***/ function(module, exports) {

	exports.f = {}.propertyIsEnumerable;

/***/ },
/* 83 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// 26.1.5 Reflect.enumerate(target)
	var $export  = __webpack_require__(42)
	  , anObject = __webpack_require__(47);
	var Enumerate = function(iterated){
	  this._t = anObject(iterated); // target
	  this._i = 0;                  // next index
	  var keys = this._k = []       // keys
	    , key;
	  for(key in iterated)keys.push(key);
	};
	__webpack_require__(84)(Enumerate, 'Object', function(){
	  var that = this
	    , keys = that._k
	    , key;
	  do {
	    if(that._i >= keys.length)return {value: undefined, done: true};
	  } while(!((key = keys[that._i++]) in that._t));
	  return {value: key, done: false};
	});
	
	$export($export.S, 'Reflect', {
	  enumerate: function enumerate(target){
	    return new Enumerate(target);
	  }
	});

/***/ },
/* 84 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var create         = __webpack_require__(61)
	  , descriptor     = __webpack_require__(54)
	  , setToStringTag = __webpack_require__(85)
	  , IteratorPrototype = {};
	
	// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
	__webpack_require__(45)(IteratorPrototype, __webpack_require__(86)('iterator'), function(){ return this; });
	
	module.exports = function(Constructor, NAME, next){
	  Constructor.prototype = create(IteratorPrototype, {next: descriptor(1, next)});
	  setToStringTag(Constructor, NAME + ' Iterator');
	};

/***/ },
/* 85 */
/***/ function(module, exports, __webpack_require__) {

	var def = __webpack_require__(46).f
	  , has = __webpack_require__(56)
	  , TAG = __webpack_require__(86)('toStringTag');
	
	module.exports = function(it, tag, stat){
	  if(it && !has(it = stat ? it : it.prototype, TAG))def(it, TAG, {configurable: true, value: tag});
	};

/***/ },
/* 86 */
/***/ function(module, exports, __webpack_require__) {

	var store      = __webpack_require__(74)('wks')
	  , uid        = __webpack_require__(57)
	  , Symbol     = __webpack_require__(43).Symbol
	  , USE_SYMBOL = typeof Symbol == 'function';
	
	var $exports = module.exports = function(name){
	  return store[name] || (store[name] =
	    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
	};
	
	$exports.store = store;

/***/ },
/* 87 */
/***/ function(module, exports, __webpack_require__) {

	// 26.1.6 Reflect.get(target, propertyKey [, receiver])
	var gOPD           = __webpack_require__(81)
	  , getPrototypeOf = __webpack_require__(88)
	  , has            = __webpack_require__(56)
	  , $export        = __webpack_require__(42)
	  , isObject       = __webpack_require__(48)
	  , anObject       = __webpack_require__(47);
	
	function get(target, propertyKey/*, receiver*/){
	  var receiver = arguments.length < 3 ? target : arguments[2]
	    , desc, proto;
	  if(anObject(target) === receiver)return target[propertyKey];
	  if(desc = gOPD.f(target, propertyKey))return has(desc, 'value')
	    ? desc.value
	    : desc.get !== undefined
	      ? desc.get.call(receiver)
	      : undefined;
	  if(isObject(proto = getPrototypeOf(target)))return get(proto, propertyKey, receiver);
	}
	
	$export($export.S, 'Reflect', {get: get});

/***/ },
/* 88 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
	var has         = __webpack_require__(56)
	  , toObject    = __webpack_require__(89)
	  , IE_PROTO    = __webpack_require__(73)('IE_PROTO')
	  , ObjectProto = Object.prototype;
	
	module.exports = Object.getPrototypeOf || function(O){
	  O = toObject(O);
	  if(has(O, IE_PROTO))return O[IE_PROTO];
	  if(typeof O.constructor == 'function' && O instanceof O.constructor){
	    return O.constructor.prototype;
	  } return O instanceof Object ? ObjectProto : null;
	};

/***/ },
/* 89 */
/***/ function(module, exports, __webpack_require__) {

	// 7.1.13 ToObject(argument)
	var defined = __webpack_require__(68);
	module.exports = function(it){
	  return Object(defined(it));
	};

/***/ },
/* 90 */
/***/ function(module, exports, __webpack_require__) {

	// 26.1.7 Reflect.getOwnPropertyDescriptor(target, propertyKey)
	var gOPD     = __webpack_require__(81)
	  , $export  = __webpack_require__(42)
	  , anObject = __webpack_require__(47);
	
	$export($export.S, 'Reflect', {
	  getOwnPropertyDescriptor: function getOwnPropertyDescriptor(target, propertyKey){
	    return gOPD.f(anObject(target), propertyKey);
	  }
	});

/***/ },
/* 91 */
/***/ function(module, exports, __webpack_require__) {

	// 26.1.8 Reflect.getPrototypeOf(target)
	var $export  = __webpack_require__(42)
	  , getProto = __webpack_require__(88)
	  , anObject = __webpack_require__(47);
	
	$export($export.S, 'Reflect', {
	  getPrototypeOf: function getPrototypeOf(target){
	    return getProto(anObject(target));
	  }
	});

/***/ },
/* 92 */
/***/ function(module, exports, __webpack_require__) {

	// 26.1.9 Reflect.has(target, propertyKey)
	var $export = __webpack_require__(42);
	
	$export($export.S, 'Reflect', {
	  has: function has(target, propertyKey){
	    return propertyKey in target;
	  }
	});

/***/ },
/* 93 */
/***/ function(module, exports, __webpack_require__) {

	// 26.1.10 Reflect.isExtensible(target)
	var $export       = __webpack_require__(42)
	  , anObject      = __webpack_require__(47)
	  , $isExtensible = Object.isExtensible;
	
	$export($export.S, 'Reflect', {
	  isExtensible: function isExtensible(target){
	    anObject(target);
	    return $isExtensible ? $isExtensible(target) : true;
	  }
	});

/***/ },
/* 94 */
/***/ function(module, exports, __webpack_require__) {

	// 26.1.11 Reflect.ownKeys(target)
	var $export = __webpack_require__(42);
	
	$export($export.S, 'Reflect', {ownKeys: __webpack_require__(95)});

/***/ },
/* 95 */
/***/ function(module, exports, __webpack_require__) {

	// all object keys, includes non-enumerable and symbols
	var gOPN     = __webpack_require__(96)
	  , gOPS     = __webpack_require__(97)
	  , anObject = __webpack_require__(47)
	  , Reflect  = __webpack_require__(43).Reflect;
	module.exports = Reflect && Reflect.ownKeys || function ownKeys(it){
	  var keys       = gOPN.f(anObject(it))
	    , getSymbols = gOPS.f;
	  return getSymbols ? keys.concat(getSymbols(it)) : keys;
	};

/***/ },
/* 96 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)
	var $keys      = __webpack_require__(64)
	  , hiddenKeys = __webpack_require__(75).concat('length', 'prototype');
	
	exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O){
	  return $keys(O, hiddenKeys);
	};

/***/ },
/* 97 */
/***/ function(module, exports) {

	exports.f = Object.getOwnPropertySymbols;

/***/ },
/* 98 */
/***/ function(module, exports, __webpack_require__) {

	// 26.1.12 Reflect.preventExtensions(target)
	var $export            = __webpack_require__(42)
	  , anObject           = __webpack_require__(47)
	  , $preventExtensions = Object.preventExtensions;
	
	$export($export.S, 'Reflect', {
	  preventExtensions: function preventExtensions(target){
	    anObject(target);
	    try {
	      if($preventExtensions)$preventExtensions(target);
	      return true;
	    } catch(e){
	      return false;
	    }
	  }
	});

/***/ },
/* 99 */
/***/ function(module, exports, __webpack_require__) {

	// 26.1.13 Reflect.set(target, propertyKey, V [, receiver])
	var dP             = __webpack_require__(46)
	  , gOPD           = __webpack_require__(81)
	  , getPrototypeOf = __webpack_require__(88)
	  , has            = __webpack_require__(56)
	  , $export        = __webpack_require__(42)
	  , createDesc     = __webpack_require__(54)
	  , anObject       = __webpack_require__(47)
	  , isObject       = __webpack_require__(48);
	
	function set(target, propertyKey, V/*, receiver*/){
	  var receiver = arguments.length < 4 ? target : arguments[3]
	    , ownDesc  = gOPD.f(anObject(target), propertyKey)
	    , existingDescriptor, proto;
	  if(!ownDesc){
	    if(isObject(proto = getPrototypeOf(target))){
	      return set(proto, propertyKey, V, receiver);
	    }
	    ownDesc = createDesc(0);
	  }
	  if(has(ownDesc, 'value')){
	    if(ownDesc.writable === false || !isObject(receiver))return false;
	    existingDescriptor = gOPD.f(receiver, propertyKey) || createDesc(0);
	    existingDescriptor.value = V;
	    dP.f(receiver, propertyKey, existingDescriptor);
	    return true;
	  }
	  return ownDesc.set === undefined ? false : (ownDesc.set.call(receiver, V), true);
	}
	
	$export($export.S, 'Reflect', {set: set});

/***/ },
/* 100 */
/***/ function(module, exports, __webpack_require__) {

	// 26.1.14 Reflect.setPrototypeOf(target, proto)
	var $export  = __webpack_require__(42)
	  , setProto = __webpack_require__(101);
	
	if(setProto)$export($export.S, 'Reflect', {
	  setPrototypeOf: function setPrototypeOf(target, proto){
	    setProto.check(target, proto);
	    try {
	      setProto.set(target, proto);
	      return true;
	    } catch(e){
	      return false;
	    }
	  }
	});

/***/ },
/* 101 */
/***/ function(module, exports, __webpack_require__) {

	// Works with __proto__ only. Old v8 can't work with null proto objects.
	/* eslint-disable no-proto */
	var isObject = __webpack_require__(48)
	  , anObject = __webpack_require__(47);
	var check = function(O, proto){
	  anObject(O);
	  if(!isObject(proto) && proto !== null)throw TypeError(proto + ": can't set as prototype!");
	};
	module.exports = {
	  set: Object.setPrototypeOf || ('__proto__' in {} ? // eslint-disable-line
	    function(test, buggy, set){
	      try {
	        set = __webpack_require__(58)(Function.call, __webpack_require__(81).f(Object.prototype, '__proto__').set, 2);
	        set(test, []);
	        buggy = !(test instanceof Array);
	      } catch(e){ buggy = true; }
	      return function setPrototypeOf(O, proto){
	        check(O, proto);
	        if(buggy)O.__proto__ = proto;
	        else set(O, proto);
	        return O;
	      };
	    }({}, false) : undefined),
	  check: check
	};

/***/ }
/******/ ]);
//# sourceMappingURL=polyfills.js.map
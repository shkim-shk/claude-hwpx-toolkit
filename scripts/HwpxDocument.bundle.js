"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// node_modules/process-nextick-args/index.js
var require_process_nextick_args = __commonJS({
  "node_modules/process-nextick-args/index.js"(exports2, module2) {
    "use strict";
    if (typeof process === "undefined" || !process.version || process.version.indexOf("v0.") === 0 || process.version.indexOf("v1.") === 0 && process.version.indexOf("v1.8.") !== 0) {
      module2.exports = { nextTick };
    } else {
      module2.exports = process;
    }
    function nextTick(fn, arg1, arg2, arg3) {
      if (typeof fn !== "function") {
        throw new TypeError('"callback" argument must be a function');
      }
      var len = arguments.length;
      var args, i;
      switch (len) {
        case 0:
        case 1:
          return process.nextTick(fn);
        case 2:
          return process.nextTick(function afterTickOne() {
            fn.call(null, arg1);
          });
        case 3:
          return process.nextTick(function afterTickTwo() {
            fn.call(null, arg1, arg2);
          });
        case 4:
          return process.nextTick(function afterTickThree() {
            fn.call(null, arg1, arg2, arg3);
          });
        default:
          args = new Array(len - 1);
          i = 0;
          while (i < args.length) {
            args[i++] = arguments[i];
          }
          return process.nextTick(function afterTick() {
            fn.apply(null, args);
          });
      }
    }
  }
});

// node_modules/isarray/index.js
var require_isarray = __commonJS({
  "node_modules/isarray/index.js"(exports2, module2) {
    var toString2 = {}.toString;
    module2.exports = Array.isArray || function(arr) {
      return toString2.call(arr) == "[object Array]";
    };
  }
});

// node_modules/readable-stream/lib/internal/streams/stream.js
var require_stream = __commonJS({
  "node_modules/readable-stream/lib/internal/streams/stream.js"(exports2, module2) {
    module2.exports = require("stream");
  }
});

// node_modules/safe-buffer/index.js
var require_safe_buffer = __commonJS({
  "node_modules/safe-buffer/index.js"(exports2, module2) {
    var buffer = require("buffer");
    var Buffer2 = buffer.Buffer;
    function copyProps(src, dst) {
      for (var key in src) {
        dst[key] = src[key];
      }
    }
    if (Buffer2.from && Buffer2.alloc && Buffer2.allocUnsafe && Buffer2.allocUnsafeSlow) {
      module2.exports = buffer;
    } else {
      copyProps(buffer, exports2);
      exports2.Buffer = SafeBuffer;
    }
    function SafeBuffer(arg, encodingOrOffset, length) {
      return Buffer2(arg, encodingOrOffset, length);
    }
    copyProps(Buffer2, SafeBuffer);
    SafeBuffer.from = function(arg, encodingOrOffset, length) {
      if (typeof arg === "number") {
        throw new TypeError("Argument must not be a number");
      }
      return Buffer2(arg, encodingOrOffset, length);
    };
    SafeBuffer.alloc = function(size, fill, encoding) {
      if (typeof size !== "number") {
        throw new TypeError("Argument must be a number");
      }
      var buf = Buffer2(size);
      if (fill !== void 0) {
        if (typeof encoding === "string") {
          buf.fill(fill, encoding);
        } else {
          buf.fill(fill);
        }
      } else {
        buf.fill(0);
      }
      return buf;
    };
    SafeBuffer.allocUnsafe = function(size) {
      if (typeof size !== "number") {
        throw new TypeError("Argument must be a number");
      }
      return Buffer2(size);
    };
    SafeBuffer.allocUnsafeSlow = function(size) {
      if (typeof size !== "number") {
        throw new TypeError("Argument must be a number");
      }
      return buffer.SlowBuffer(size);
    };
  }
});

// node_modules/core-util-is/lib/util.js
var require_util = __commonJS({
  "node_modules/core-util-is/lib/util.js"(exports2) {
    function isArray(arg) {
      if (Array.isArray) {
        return Array.isArray(arg);
      }
      return objectToString(arg) === "[object Array]";
    }
    exports2.isArray = isArray;
    function isBoolean(arg) {
      return typeof arg === "boolean";
    }
    exports2.isBoolean = isBoolean;
    function isNull(arg) {
      return arg === null;
    }
    exports2.isNull = isNull;
    function isNullOrUndefined(arg) {
      return arg == null;
    }
    exports2.isNullOrUndefined = isNullOrUndefined;
    function isNumber(arg) {
      return typeof arg === "number";
    }
    exports2.isNumber = isNumber;
    function isString(arg) {
      return typeof arg === "string";
    }
    exports2.isString = isString;
    function isSymbol(arg) {
      return typeof arg === "symbol";
    }
    exports2.isSymbol = isSymbol;
    function isUndefined(arg) {
      return arg === void 0;
    }
    exports2.isUndefined = isUndefined;
    function isRegExp(re) {
      return objectToString(re) === "[object RegExp]";
    }
    exports2.isRegExp = isRegExp;
    function isObject(arg) {
      return typeof arg === "object" && arg !== null;
    }
    exports2.isObject = isObject;
    function isDate(d) {
      return objectToString(d) === "[object Date]";
    }
    exports2.isDate = isDate;
    function isError(e) {
      return objectToString(e) === "[object Error]" || e instanceof Error;
    }
    exports2.isError = isError;
    function isFunction(arg) {
      return typeof arg === "function";
    }
    exports2.isFunction = isFunction;
    function isPrimitive(arg) {
      return arg === null || typeof arg === "boolean" || typeof arg === "number" || typeof arg === "string" || typeof arg === "symbol" || // ES6 symbol
      typeof arg === "undefined";
    }
    exports2.isPrimitive = isPrimitive;
    exports2.isBuffer = require("buffer").Buffer.isBuffer;
    function objectToString(o) {
      return Object.prototype.toString.call(o);
    }
  }
});

// node_modules/inherits/inherits_browser.js
var require_inherits_browser = __commonJS({
  "node_modules/inherits/inherits_browser.js"(exports2, module2) {
    if (typeof Object.create === "function") {
      module2.exports = function inherits(ctor, superCtor) {
        if (superCtor) {
          ctor.super_ = superCtor;
          ctor.prototype = Object.create(superCtor.prototype, {
            constructor: {
              value: ctor,
              enumerable: false,
              writable: true,
              configurable: true
            }
          });
        }
      };
    } else {
      module2.exports = function inherits(ctor, superCtor) {
        if (superCtor) {
          ctor.super_ = superCtor;
          var TempCtor = function() {
          };
          TempCtor.prototype = superCtor.prototype;
          ctor.prototype = new TempCtor();
          ctor.prototype.constructor = ctor;
        }
      };
    }
  }
});

// node_modules/inherits/inherits.js
var require_inherits = __commonJS({
  "node_modules/inherits/inherits.js"(exports2, module2) {
    try {
      util = require("util");
      if (typeof util.inherits !== "function") throw "";
      module2.exports = util.inherits;
    } catch (e) {
      module2.exports = require_inherits_browser();
    }
    var util;
  }
});

// node_modules/readable-stream/lib/internal/streams/BufferList.js
var require_BufferList = __commonJS({
  "node_modules/readable-stream/lib/internal/streams/BufferList.js"(exports2, module2) {
    "use strict";
    function _classCallCheck(instance, Constructor) {
      if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
      }
    }
    var Buffer2 = require_safe_buffer().Buffer;
    var util = require("util");
    function copyBuffer(src, target, offset) {
      src.copy(target, offset);
    }
    module2.exports = (function() {
      function BufferList() {
        _classCallCheck(this, BufferList);
        this.head = null;
        this.tail = null;
        this.length = 0;
      }
      BufferList.prototype.push = function push(v) {
        var entry = { data: v, next: null };
        if (this.length > 0) this.tail.next = entry;
        else this.head = entry;
        this.tail = entry;
        ++this.length;
      };
      BufferList.prototype.unshift = function unshift(v) {
        var entry = { data: v, next: this.head };
        if (this.length === 0) this.tail = entry;
        this.head = entry;
        ++this.length;
      };
      BufferList.prototype.shift = function shift() {
        if (this.length === 0) return;
        var ret = this.head.data;
        if (this.length === 1) this.head = this.tail = null;
        else this.head = this.head.next;
        --this.length;
        return ret;
      };
      BufferList.prototype.clear = function clear() {
        this.head = this.tail = null;
        this.length = 0;
      };
      BufferList.prototype.join = function join(s) {
        if (this.length === 0) return "";
        var p = this.head;
        var ret = "" + p.data;
        while (p = p.next) {
          ret += s + p.data;
        }
        return ret;
      };
      BufferList.prototype.concat = function concat(n) {
        if (this.length === 0) return Buffer2.alloc(0);
        var ret = Buffer2.allocUnsafe(n >>> 0);
        var p = this.head;
        var i = 0;
        while (p) {
          copyBuffer(p.data, ret, i);
          i += p.data.length;
          p = p.next;
        }
        return ret;
      };
      return BufferList;
    })();
    if (util && util.inspect && util.inspect.custom) {
      module2.exports.prototype[util.inspect.custom] = function() {
        var obj = util.inspect({ length: this.length });
        return this.constructor.name + " " + obj;
      };
    }
  }
});

// node_modules/readable-stream/lib/internal/streams/destroy.js
var require_destroy = __commonJS({
  "node_modules/readable-stream/lib/internal/streams/destroy.js"(exports2, module2) {
    "use strict";
    var pna = require_process_nextick_args();
    function destroy(err2, cb) {
      var _this = this;
      var readableDestroyed = this._readableState && this._readableState.destroyed;
      var writableDestroyed = this._writableState && this._writableState.destroyed;
      if (readableDestroyed || writableDestroyed) {
        if (cb) {
          cb(err2);
        } else if (err2) {
          if (!this._writableState) {
            pna.nextTick(emitErrorNT, this, err2);
          } else if (!this._writableState.errorEmitted) {
            this._writableState.errorEmitted = true;
            pna.nextTick(emitErrorNT, this, err2);
          }
        }
        return this;
      }
      if (this._readableState) {
        this._readableState.destroyed = true;
      }
      if (this._writableState) {
        this._writableState.destroyed = true;
      }
      this._destroy(err2 || null, function(err3) {
        if (!cb && err3) {
          if (!_this._writableState) {
            pna.nextTick(emitErrorNT, _this, err3);
          } else if (!_this._writableState.errorEmitted) {
            _this._writableState.errorEmitted = true;
            pna.nextTick(emitErrorNT, _this, err3);
          }
        } else if (cb) {
          cb(err3);
        }
      });
      return this;
    }
    function undestroy() {
      if (this._readableState) {
        this._readableState.destroyed = false;
        this._readableState.reading = false;
        this._readableState.ended = false;
        this._readableState.endEmitted = false;
      }
      if (this._writableState) {
        this._writableState.destroyed = false;
        this._writableState.ended = false;
        this._writableState.ending = false;
        this._writableState.finalCalled = false;
        this._writableState.prefinished = false;
        this._writableState.finished = false;
        this._writableState.errorEmitted = false;
      }
    }
    function emitErrorNT(self2, err2) {
      self2.emit("error", err2);
    }
    module2.exports = {
      destroy,
      undestroy
    };
  }
});

// node_modules/util-deprecate/node.js
var require_node = __commonJS({
  "node_modules/util-deprecate/node.js"(exports2, module2) {
    module2.exports = require("util").deprecate;
  }
});

// node_modules/readable-stream/lib/_stream_writable.js
var require_stream_writable = __commonJS({
  "node_modules/readable-stream/lib/_stream_writable.js"(exports2, module2) {
    "use strict";
    var pna = require_process_nextick_args();
    module2.exports = Writable;
    function CorkedRequest(state) {
      var _this = this;
      this.next = null;
      this.entry = null;
      this.finish = function() {
        onCorkedFinish(_this, state);
      };
    }
    var asyncWrite = !process.browser && ["v0.10", "v0.9."].indexOf(process.version.slice(0, 5)) > -1 ? setImmediate : pna.nextTick;
    var Duplex;
    Writable.WritableState = WritableState;
    var util = Object.create(require_util());
    util.inherits = require_inherits();
    var internalUtil = {
      deprecate: require_node()
    };
    var Stream = require_stream();
    var Buffer2 = require_safe_buffer().Buffer;
    var OurUint8Array = (typeof global !== "undefined" ? global : typeof window !== "undefined" ? window : typeof self !== "undefined" ? self : {}).Uint8Array || function() {
    };
    function _uint8ArrayToBuffer(chunk) {
      return Buffer2.from(chunk);
    }
    function _isUint8Array(obj) {
      return Buffer2.isBuffer(obj) || obj instanceof OurUint8Array;
    }
    var destroyImpl = require_destroy();
    util.inherits(Writable, Stream);
    function nop() {
    }
    function WritableState(options, stream) {
      Duplex = Duplex || require_stream_duplex();
      options = options || {};
      var isDuplex = stream instanceof Duplex;
      this.objectMode = !!options.objectMode;
      if (isDuplex) this.objectMode = this.objectMode || !!options.writableObjectMode;
      var hwm = options.highWaterMark;
      var writableHwm = options.writableHighWaterMark;
      var defaultHwm = this.objectMode ? 16 : 16 * 1024;
      if (hwm || hwm === 0) this.highWaterMark = hwm;
      else if (isDuplex && (writableHwm || writableHwm === 0)) this.highWaterMark = writableHwm;
      else this.highWaterMark = defaultHwm;
      this.highWaterMark = Math.floor(this.highWaterMark);
      this.finalCalled = false;
      this.needDrain = false;
      this.ending = false;
      this.ended = false;
      this.finished = false;
      this.destroyed = false;
      var noDecode = options.decodeStrings === false;
      this.decodeStrings = !noDecode;
      this.defaultEncoding = options.defaultEncoding || "utf8";
      this.length = 0;
      this.writing = false;
      this.corked = 0;
      this.sync = true;
      this.bufferProcessing = false;
      this.onwrite = function(er) {
        onwrite(stream, er);
      };
      this.writecb = null;
      this.writelen = 0;
      this.bufferedRequest = null;
      this.lastBufferedRequest = null;
      this.pendingcb = 0;
      this.prefinished = false;
      this.errorEmitted = false;
      this.bufferedRequestCount = 0;
      this.corkedRequestsFree = new CorkedRequest(this);
    }
    WritableState.prototype.getBuffer = function getBuffer() {
      var current = this.bufferedRequest;
      var out = [];
      while (current) {
        out.push(current);
        current = current.next;
      }
      return out;
    };
    (function() {
      try {
        Object.defineProperty(WritableState.prototype, "buffer", {
          get: internalUtil.deprecate(function() {
            return this.getBuffer();
          }, "_writableState.buffer is deprecated. Use _writableState.getBuffer instead.", "DEP0003")
        });
      } catch (_) {
      }
    })();
    var realHasInstance;
    if (typeof Symbol === "function" && Symbol.hasInstance && typeof Function.prototype[Symbol.hasInstance] === "function") {
      realHasInstance = Function.prototype[Symbol.hasInstance];
      Object.defineProperty(Writable, Symbol.hasInstance, {
        value: function(object) {
          if (realHasInstance.call(this, object)) return true;
          if (this !== Writable) return false;
          return object && object._writableState instanceof WritableState;
        }
      });
    } else {
      realHasInstance = function(object) {
        return object instanceof this;
      };
    }
    function Writable(options) {
      Duplex = Duplex || require_stream_duplex();
      if (!realHasInstance.call(Writable, this) && !(this instanceof Duplex)) {
        return new Writable(options);
      }
      this._writableState = new WritableState(options, this);
      this.writable = true;
      if (options) {
        if (typeof options.write === "function") this._write = options.write;
        if (typeof options.writev === "function") this._writev = options.writev;
        if (typeof options.destroy === "function") this._destroy = options.destroy;
        if (typeof options.final === "function") this._final = options.final;
      }
      Stream.call(this);
    }
    Writable.prototype.pipe = function() {
      this.emit("error", new Error("Cannot pipe, not readable"));
    };
    function writeAfterEnd(stream, cb) {
      var er = new Error("write after end");
      stream.emit("error", er);
      pna.nextTick(cb, er);
    }
    function validChunk(stream, state, chunk, cb) {
      var valid = true;
      var er = false;
      if (chunk === null) {
        er = new TypeError("May not write null values to stream");
      } else if (typeof chunk !== "string" && chunk !== void 0 && !state.objectMode) {
        er = new TypeError("Invalid non-string/buffer chunk");
      }
      if (er) {
        stream.emit("error", er);
        pna.nextTick(cb, er);
        valid = false;
      }
      return valid;
    }
    Writable.prototype.write = function(chunk, encoding, cb) {
      var state = this._writableState;
      var ret = false;
      var isBuf = !state.objectMode && _isUint8Array(chunk);
      if (isBuf && !Buffer2.isBuffer(chunk)) {
        chunk = _uint8ArrayToBuffer(chunk);
      }
      if (typeof encoding === "function") {
        cb = encoding;
        encoding = null;
      }
      if (isBuf) encoding = "buffer";
      else if (!encoding) encoding = state.defaultEncoding;
      if (typeof cb !== "function") cb = nop;
      if (state.ended) writeAfterEnd(this, cb);
      else if (isBuf || validChunk(this, state, chunk, cb)) {
        state.pendingcb++;
        ret = writeOrBuffer(this, state, isBuf, chunk, encoding, cb);
      }
      return ret;
    };
    Writable.prototype.cork = function() {
      var state = this._writableState;
      state.corked++;
    };
    Writable.prototype.uncork = function() {
      var state = this._writableState;
      if (state.corked) {
        state.corked--;
        if (!state.writing && !state.corked && !state.bufferProcessing && state.bufferedRequest) clearBuffer(this, state);
      }
    };
    Writable.prototype.setDefaultEncoding = function setDefaultEncoding(encoding) {
      if (typeof encoding === "string") encoding = encoding.toLowerCase();
      if (!(["hex", "utf8", "utf-8", "ascii", "binary", "base64", "ucs2", "ucs-2", "utf16le", "utf-16le", "raw"].indexOf((encoding + "").toLowerCase()) > -1)) throw new TypeError("Unknown encoding: " + encoding);
      this._writableState.defaultEncoding = encoding;
      return this;
    };
    function decodeChunk(state, chunk, encoding) {
      if (!state.objectMode && state.decodeStrings !== false && typeof chunk === "string") {
        chunk = Buffer2.from(chunk, encoding);
      }
      return chunk;
    }
    Object.defineProperty(Writable.prototype, "writableHighWaterMark", {
      // making it explicit this property is not enumerable
      // because otherwise some prototype manipulation in
      // userland will fail
      enumerable: false,
      get: function() {
        return this._writableState.highWaterMark;
      }
    });
    function writeOrBuffer(stream, state, isBuf, chunk, encoding, cb) {
      if (!isBuf) {
        var newChunk = decodeChunk(state, chunk, encoding);
        if (chunk !== newChunk) {
          isBuf = true;
          encoding = "buffer";
          chunk = newChunk;
        }
      }
      var len = state.objectMode ? 1 : chunk.length;
      state.length += len;
      var ret = state.length < state.highWaterMark;
      if (!ret) state.needDrain = true;
      if (state.writing || state.corked) {
        var last = state.lastBufferedRequest;
        state.lastBufferedRequest = {
          chunk,
          encoding,
          isBuf,
          callback: cb,
          next: null
        };
        if (last) {
          last.next = state.lastBufferedRequest;
        } else {
          state.bufferedRequest = state.lastBufferedRequest;
        }
        state.bufferedRequestCount += 1;
      } else {
        doWrite(stream, state, false, len, chunk, encoding, cb);
      }
      return ret;
    }
    function doWrite(stream, state, writev, len, chunk, encoding, cb) {
      state.writelen = len;
      state.writecb = cb;
      state.writing = true;
      state.sync = true;
      if (writev) stream._writev(chunk, state.onwrite);
      else stream._write(chunk, encoding, state.onwrite);
      state.sync = false;
    }
    function onwriteError(stream, state, sync, er, cb) {
      --state.pendingcb;
      if (sync) {
        pna.nextTick(cb, er);
        pna.nextTick(finishMaybe, stream, state);
        stream._writableState.errorEmitted = true;
        stream.emit("error", er);
      } else {
        cb(er);
        stream._writableState.errorEmitted = true;
        stream.emit("error", er);
        finishMaybe(stream, state);
      }
    }
    function onwriteStateUpdate(state) {
      state.writing = false;
      state.writecb = null;
      state.length -= state.writelen;
      state.writelen = 0;
    }
    function onwrite(stream, er) {
      var state = stream._writableState;
      var sync = state.sync;
      var cb = state.writecb;
      onwriteStateUpdate(state);
      if (er) onwriteError(stream, state, sync, er, cb);
      else {
        var finished = needFinish(state);
        if (!finished && !state.corked && !state.bufferProcessing && state.bufferedRequest) {
          clearBuffer(stream, state);
        }
        if (sync) {
          asyncWrite(afterWrite, stream, state, finished, cb);
        } else {
          afterWrite(stream, state, finished, cb);
        }
      }
    }
    function afterWrite(stream, state, finished, cb) {
      if (!finished) onwriteDrain(stream, state);
      state.pendingcb--;
      cb();
      finishMaybe(stream, state);
    }
    function onwriteDrain(stream, state) {
      if (state.length === 0 && state.needDrain) {
        state.needDrain = false;
        stream.emit("drain");
      }
    }
    function clearBuffer(stream, state) {
      state.bufferProcessing = true;
      var entry = state.bufferedRequest;
      if (stream._writev && entry && entry.next) {
        var l = state.bufferedRequestCount;
        var buffer = new Array(l);
        var holder = state.corkedRequestsFree;
        holder.entry = entry;
        var count = 0;
        var allBuffers = true;
        while (entry) {
          buffer[count] = entry;
          if (!entry.isBuf) allBuffers = false;
          entry = entry.next;
          count += 1;
        }
        buffer.allBuffers = allBuffers;
        doWrite(stream, state, true, state.length, buffer, "", holder.finish);
        state.pendingcb++;
        state.lastBufferedRequest = null;
        if (holder.next) {
          state.corkedRequestsFree = holder.next;
          holder.next = null;
        } else {
          state.corkedRequestsFree = new CorkedRequest(state);
        }
        state.bufferedRequestCount = 0;
      } else {
        while (entry) {
          var chunk = entry.chunk;
          var encoding = entry.encoding;
          var cb = entry.callback;
          var len = state.objectMode ? 1 : chunk.length;
          doWrite(stream, state, false, len, chunk, encoding, cb);
          entry = entry.next;
          state.bufferedRequestCount--;
          if (state.writing) {
            break;
          }
        }
        if (entry === null) state.lastBufferedRequest = null;
      }
      state.bufferedRequest = entry;
      state.bufferProcessing = false;
    }
    Writable.prototype._write = function(chunk, encoding, cb) {
      cb(new Error("_write() is not implemented"));
    };
    Writable.prototype._writev = null;
    Writable.prototype.end = function(chunk, encoding, cb) {
      var state = this._writableState;
      if (typeof chunk === "function") {
        cb = chunk;
        chunk = null;
        encoding = null;
      } else if (typeof encoding === "function") {
        cb = encoding;
        encoding = null;
      }
      if (chunk !== null && chunk !== void 0) this.write(chunk, encoding);
      if (state.corked) {
        state.corked = 1;
        this.uncork();
      }
      if (!state.ending) endWritable(this, state, cb);
    };
    function needFinish(state) {
      return state.ending && state.length === 0 && state.bufferedRequest === null && !state.finished && !state.writing;
    }
    function callFinal(stream, state) {
      stream._final(function(err2) {
        state.pendingcb--;
        if (err2) {
          stream.emit("error", err2);
        }
        state.prefinished = true;
        stream.emit("prefinish");
        finishMaybe(stream, state);
      });
    }
    function prefinish(stream, state) {
      if (!state.prefinished && !state.finalCalled) {
        if (typeof stream._final === "function") {
          state.pendingcb++;
          state.finalCalled = true;
          pna.nextTick(callFinal, stream, state);
        } else {
          state.prefinished = true;
          stream.emit("prefinish");
        }
      }
    }
    function finishMaybe(stream, state) {
      var need = needFinish(state);
      if (need) {
        prefinish(stream, state);
        if (state.pendingcb === 0) {
          state.finished = true;
          stream.emit("finish");
        }
      }
      return need;
    }
    function endWritable(stream, state, cb) {
      state.ending = true;
      finishMaybe(stream, state);
      if (cb) {
        if (state.finished) pna.nextTick(cb);
        else stream.once("finish", cb);
      }
      state.ended = true;
      stream.writable = false;
    }
    function onCorkedFinish(corkReq, state, err2) {
      var entry = corkReq.entry;
      corkReq.entry = null;
      while (entry) {
        var cb = entry.callback;
        state.pendingcb--;
        cb(err2);
        entry = entry.next;
      }
      state.corkedRequestsFree.next = corkReq;
    }
    Object.defineProperty(Writable.prototype, "destroyed", {
      get: function() {
        if (this._writableState === void 0) {
          return false;
        }
        return this._writableState.destroyed;
      },
      set: function(value) {
        if (!this._writableState) {
          return;
        }
        this._writableState.destroyed = value;
      }
    });
    Writable.prototype.destroy = destroyImpl.destroy;
    Writable.prototype._undestroy = destroyImpl.undestroy;
    Writable.prototype._destroy = function(err2, cb) {
      this.end();
      cb(err2);
    };
  }
});

// node_modules/readable-stream/lib/_stream_duplex.js
var require_stream_duplex = __commonJS({
  "node_modules/readable-stream/lib/_stream_duplex.js"(exports2, module2) {
    "use strict";
    var pna = require_process_nextick_args();
    var objectKeys = Object.keys || function(obj) {
      var keys2 = [];
      for (var key in obj) {
        keys2.push(key);
      }
      return keys2;
    };
    module2.exports = Duplex;
    var util = Object.create(require_util());
    util.inherits = require_inherits();
    var Readable = require_stream_readable();
    var Writable = require_stream_writable();
    util.inherits(Duplex, Readable);
    {
      keys = objectKeys(Writable.prototype);
      for (v = 0; v < keys.length; v++) {
        method = keys[v];
        if (!Duplex.prototype[method]) Duplex.prototype[method] = Writable.prototype[method];
      }
    }
    var keys;
    var method;
    var v;
    function Duplex(options) {
      if (!(this instanceof Duplex)) return new Duplex(options);
      Readable.call(this, options);
      Writable.call(this, options);
      if (options && options.readable === false) this.readable = false;
      if (options && options.writable === false) this.writable = false;
      this.allowHalfOpen = true;
      if (options && options.allowHalfOpen === false) this.allowHalfOpen = false;
      this.once("end", onend);
    }
    Object.defineProperty(Duplex.prototype, "writableHighWaterMark", {
      // making it explicit this property is not enumerable
      // because otherwise some prototype manipulation in
      // userland will fail
      enumerable: false,
      get: function() {
        return this._writableState.highWaterMark;
      }
    });
    function onend() {
      if (this.allowHalfOpen || this._writableState.ended) return;
      pna.nextTick(onEndNT, this);
    }
    function onEndNT(self2) {
      self2.end();
    }
    Object.defineProperty(Duplex.prototype, "destroyed", {
      get: function() {
        if (this._readableState === void 0 || this._writableState === void 0) {
          return false;
        }
        return this._readableState.destroyed && this._writableState.destroyed;
      },
      set: function(value) {
        if (this._readableState === void 0 || this._writableState === void 0) {
          return;
        }
        this._readableState.destroyed = value;
        this._writableState.destroyed = value;
      }
    });
    Duplex.prototype._destroy = function(err2, cb) {
      this.push(null);
      this.end();
      pna.nextTick(cb, err2);
    };
  }
});

// node_modules/string_decoder/lib/string_decoder.js
var require_string_decoder = __commonJS({
  "node_modules/string_decoder/lib/string_decoder.js"(exports2) {
    "use strict";
    var Buffer2 = require_safe_buffer().Buffer;
    var isEncoding = Buffer2.isEncoding || function(encoding) {
      encoding = "" + encoding;
      switch (encoding && encoding.toLowerCase()) {
        case "hex":
        case "utf8":
        case "utf-8":
        case "ascii":
        case "binary":
        case "base64":
        case "ucs2":
        case "ucs-2":
        case "utf16le":
        case "utf-16le":
        case "raw":
          return true;
        default:
          return false;
      }
    };
    function _normalizeEncoding(enc) {
      if (!enc) return "utf8";
      var retried;
      while (true) {
        switch (enc) {
          case "utf8":
          case "utf-8":
            return "utf8";
          case "ucs2":
          case "ucs-2":
          case "utf16le":
          case "utf-16le":
            return "utf16le";
          case "latin1":
          case "binary":
            return "latin1";
          case "base64":
          case "ascii":
          case "hex":
            return enc;
          default:
            if (retried) return;
            enc = ("" + enc).toLowerCase();
            retried = true;
        }
      }
    }
    function normalizeEncoding(enc) {
      var nenc = _normalizeEncoding(enc);
      if (typeof nenc !== "string" && (Buffer2.isEncoding === isEncoding || !isEncoding(enc))) throw new Error("Unknown encoding: " + enc);
      return nenc || enc;
    }
    exports2.StringDecoder = StringDecoder;
    function StringDecoder(encoding) {
      this.encoding = normalizeEncoding(encoding);
      var nb;
      switch (this.encoding) {
        case "utf16le":
          this.text = utf16Text;
          this.end = utf16End;
          nb = 4;
          break;
        case "utf8":
          this.fillLast = utf8FillLast;
          nb = 4;
          break;
        case "base64":
          this.text = base64Text;
          this.end = base64End;
          nb = 3;
          break;
        default:
          this.write = simpleWrite;
          this.end = simpleEnd;
          return;
      }
      this.lastNeed = 0;
      this.lastTotal = 0;
      this.lastChar = Buffer2.allocUnsafe(nb);
    }
    StringDecoder.prototype.write = function(buf) {
      if (buf.length === 0) return "";
      var r;
      var i;
      if (this.lastNeed) {
        r = this.fillLast(buf);
        if (r === void 0) return "";
        i = this.lastNeed;
        this.lastNeed = 0;
      } else {
        i = 0;
      }
      if (i < buf.length) return r ? r + this.text(buf, i) : this.text(buf, i);
      return r || "";
    };
    StringDecoder.prototype.end = utf8End;
    StringDecoder.prototype.text = utf8Text;
    StringDecoder.prototype.fillLast = function(buf) {
      if (this.lastNeed <= buf.length) {
        buf.copy(this.lastChar, this.lastTotal - this.lastNeed, 0, this.lastNeed);
        return this.lastChar.toString(this.encoding, 0, this.lastTotal);
      }
      buf.copy(this.lastChar, this.lastTotal - this.lastNeed, 0, buf.length);
      this.lastNeed -= buf.length;
    };
    function utf8CheckByte(byte) {
      if (byte <= 127) return 0;
      else if (byte >> 5 === 6) return 2;
      else if (byte >> 4 === 14) return 3;
      else if (byte >> 3 === 30) return 4;
      return byte >> 6 === 2 ? -1 : -2;
    }
    function utf8CheckIncomplete(self2, buf, i) {
      var j = buf.length - 1;
      if (j < i) return 0;
      var nb = utf8CheckByte(buf[j]);
      if (nb >= 0) {
        if (nb > 0) self2.lastNeed = nb - 1;
        return nb;
      }
      if (--j < i || nb === -2) return 0;
      nb = utf8CheckByte(buf[j]);
      if (nb >= 0) {
        if (nb > 0) self2.lastNeed = nb - 2;
        return nb;
      }
      if (--j < i || nb === -2) return 0;
      nb = utf8CheckByte(buf[j]);
      if (nb >= 0) {
        if (nb > 0) {
          if (nb === 2) nb = 0;
          else self2.lastNeed = nb - 3;
        }
        return nb;
      }
      return 0;
    }
    function utf8CheckExtraBytes(self2, buf, p) {
      if ((buf[0] & 192) !== 128) {
        self2.lastNeed = 0;
        return "\uFFFD";
      }
      if (self2.lastNeed > 1 && buf.length > 1) {
        if ((buf[1] & 192) !== 128) {
          self2.lastNeed = 1;
          return "\uFFFD";
        }
        if (self2.lastNeed > 2 && buf.length > 2) {
          if ((buf[2] & 192) !== 128) {
            self2.lastNeed = 2;
            return "\uFFFD";
          }
        }
      }
    }
    function utf8FillLast(buf) {
      var p = this.lastTotal - this.lastNeed;
      var r = utf8CheckExtraBytes(this, buf, p);
      if (r !== void 0) return r;
      if (this.lastNeed <= buf.length) {
        buf.copy(this.lastChar, p, 0, this.lastNeed);
        return this.lastChar.toString(this.encoding, 0, this.lastTotal);
      }
      buf.copy(this.lastChar, p, 0, buf.length);
      this.lastNeed -= buf.length;
    }
    function utf8Text(buf, i) {
      var total = utf8CheckIncomplete(this, buf, i);
      if (!this.lastNeed) return buf.toString("utf8", i);
      this.lastTotal = total;
      var end = buf.length - (total - this.lastNeed);
      buf.copy(this.lastChar, 0, end);
      return buf.toString("utf8", i, end);
    }
    function utf8End(buf) {
      var r = buf && buf.length ? this.write(buf) : "";
      if (this.lastNeed) return r + "\uFFFD";
      return r;
    }
    function utf16Text(buf, i) {
      if ((buf.length - i) % 2 === 0) {
        var r = buf.toString("utf16le", i);
        if (r) {
          var c = r.charCodeAt(r.length - 1);
          if (c >= 55296 && c <= 56319) {
            this.lastNeed = 2;
            this.lastTotal = 4;
            this.lastChar[0] = buf[buf.length - 2];
            this.lastChar[1] = buf[buf.length - 1];
            return r.slice(0, -1);
          }
        }
        return r;
      }
      this.lastNeed = 1;
      this.lastTotal = 2;
      this.lastChar[0] = buf[buf.length - 1];
      return buf.toString("utf16le", i, buf.length - 1);
    }
    function utf16End(buf) {
      var r = buf && buf.length ? this.write(buf) : "";
      if (this.lastNeed) {
        var end = this.lastTotal - this.lastNeed;
        return r + this.lastChar.toString("utf16le", 0, end);
      }
      return r;
    }
    function base64Text(buf, i) {
      var n = (buf.length - i) % 3;
      if (n === 0) return buf.toString("base64", i);
      this.lastNeed = 3 - n;
      this.lastTotal = 3;
      if (n === 1) {
        this.lastChar[0] = buf[buf.length - 1];
      } else {
        this.lastChar[0] = buf[buf.length - 2];
        this.lastChar[1] = buf[buf.length - 1];
      }
      return buf.toString("base64", i, buf.length - n);
    }
    function base64End(buf) {
      var r = buf && buf.length ? this.write(buf) : "";
      if (this.lastNeed) return r + this.lastChar.toString("base64", 0, 3 - this.lastNeed);
      return r;
    }
    function simpleWrite(buf) {
      return buf.toString(this.encoding);
    }
    function simpleEnd(buf) {
      return buf && buf.length ? this.write(buf) : "";
    }
  }
});

// node_modules/readable-stream/lib/_stream_readable.js
var require_stream_readable = __commonJS({
  "node_modules/readable-stream/lib/_stream_readable.js"(exports2, module2) {
    "use strict";
    var pna = require_process_nextick_args();
    module2.exports = Readable;
    var isArray = require_isarray();
    var Duplex;
    Readable.ReadableState = ReadableState;
    var EE = require("events").EventEmitter;
    var EElistenerCount = function(emitter, type) {
      return emitter.listeners(type).length;
    };
    var Stream = require_stream();
    var Buffer2 = require_safe_buffer().Buffer;
    var OurUint8Array = (typeof global !== "undefined" ? global : typeof window !== "undefined" ? window : typeof self !== "undefined" ? self : {}).Uint8Array || function() {
    };
    function _uint8ArrayToBuffer(chunk) {
      return Buffer2.from(chunk);
    }
    function _isUint8Array(obj) {
      return Buffer2.isBuffer(obj) || obj instanceof OurUint8Array;
    }
    var util = Object.create(require_util());
    util.inherits = require_inherits();
    var debugUtil = require("util");
    var debug = void 0;
    if (debugUtil && debugUtil.debuglog) {
      debug = debugUtil.debuglog("stream");
    } else {
      debug = function() {
      };
    }
    var BufferList = require_BufferList();
    var destroyImpl = require_destroy();
    var StringDecoder;
    util.inherits(Readable, Stream);
    var kProxyEvents = ["error", "close", "destroy", "pause", "resume"];
    function prependListener(emitter, event, fn) {
      if (typeof emitter.prependListener === "function") return emitter.prependListener(event, fn);
      if (!emitter._events || !emitter._events[event]) emitter.on(event, fn);
      else if (isArray(emitter._events[event])) emitter._events[event].unshift(fn);
      else emitter._events[event] = [fn, emitter._events[event]];
    }
    function ReadableState(options, stream) {
      Duplex = Duplex || require_stream_duplex();
      options = options || {};
      var isDuplex = stream instanceof Duplex;
      this.objectMode = !!options.objectMode;
      if (isDuplex) this.objectMode = this.objectMode || !!options.readableObjectMode;
      var hwm = options.highWaterMark;
      var readableHwm = options.readableHighWaterMark;
      var defaultHwm = this.objectMode ? 16 : 16 * 1024;
      if (hwm || hwm === 0) this.highWaterMark = hwm;
      else if (isDuplex && (readableHwm || readableHwm === 0)) this.highWaterMark = readableHwm;
      else this.highWaterMark = defaultHwm;
      this.highWaterMark = Math.floor(this.highWaterMark);
      this.buffer = new BufferList();
      this.length = 0;
      this.pipes = null;
      this.pipesCount = 0;
      this.flowing = null;
      this.ended = false;
      this.endEmitted = false;
      this.reading = false;
      this.sync = true;
      this.needReadable = false;
      this.emittedReadable = false;
      this.readableListening = false;
      this.resumeScheduled = false;
      this.destroyed = false;
      this.defaultEncoding = options.defaultEncoding || "utf8";
      this.awaitDrain = 0;
      this.readingMore = false;
      this.decoder = null;
      this.encoding = null;
      if (options.encoding) {
        if (!StringDecoder) StringDecoder = require_string_decoder().StringDecoder;
        this.decoder = new StringDecoder(options.encoding);
        this.encoding = options.encoding;
      }
    }
    function Readable(options) {
      Duplex = Duplex || require_stream_duplex();
      if (!(this instanceof Readable)) return new Readable(options);
      this._readableState = new ReadableState(options, this);
      this.readable = true;
      if (options) {
        if (typeof options.read === "function") this._read = options.read;
        if (typeof options.destroy === "function") this._destroy = options.destroy;
      }
      Stream.call(this);
    }
    Object.defineProperty(Readable.prototype, "destroyed", {
      get: function() {
        if (this._readableState === void 0) {
          return false;
        }
        return this._readableState.destroyed;
      },
      set: function(value) {
        if (!this._readableState) {
          return;
        }
        this._readableState.destroyed = value;
      }
    });
    Readable.prototype.destroy = destroyImpl.destroy;
    Readable.prototype._undestroy = destroyImpl.undestroy;
    Readable.prototype._destroy = function(err2, cb) {
      this.push(null);
      cb(err2);
    };
    Readable.prototype.push = function(chunk, encoding) {
      var state = this._readableState;
      var skipChunkCheck;
      if (!state.objectMode) {
        if (typeof chunk === "string") {
          encoding = encoding || state.defaultEncoding;
          if (encoding !== state.encoding) {
            chunk = Buffer2.from(chunk, encoding);
            encoding = "";
          }
          skipChunkCheck = true;
        }
      } else {
        skipChunkCheck = true;
      }
      return readableAddChunk(this, chunk, encoding, false, skipChunkCheck);
    };
    Readable.prototype.unshift = function(chunk) {
      return readableAddChunk(this, chunk, null, true, false);
    };
    function readableAddChunk(stream, chunk, encoding, addToFront, skipChunkCheck) {
      var state = stream._readableState;
      if (chunk === null) {
        state.reading = false;
        onEofChunk(stream, state);
      } else {
        var er;
        if (!skipChunkCheck) er = chunkInvalid(state, chunk);
        if (er) {
          stream.emit("error", er);
        } else if (state.objectMode || chunk && chunk.length > 0) {
          if (typeof chunk !== "string" && !state.objectMode && Object.getPrototypeOf(chunk) !== Buffer2.prototype) {
            chunk = _uint8ArrayToBuffer(chunk);
          }
          if (addToFront) {
            if (state.endEmitted) stream.emit("error", new Error("stream.unshift() after end event"));
            else addChunk(stream, state, chunk, true);
          } else if (state.ended) {
            stream.emit("error", new Error("stream.push() after EOF"));
          } else {
            state.reading = false;
            if (state.decoder && !encoding) {
              chunk = state.decoder.write(chunk);
              if (state.objectMode || chunk.length !== 0) addChunk(stream, state, chunk, false);
              else maybeReadMore(stream, state);
            } else {
              addChunk(stream, state, chunk, false);
            }
          }
        } else if (!addToFront) {
          state.reading = false;
        }
      }
      return needMoreData(state);
    }
    function addChunk(stream, state, chunk, addToFront) {
      if (state.flowing && state.length === 0 && !state.sync) {
        stream.emit("data", chunk);
        stream.read(0);
      } else {
        state.length += state.objectMode ? 1 : chunk.length;
        if (addToFront) state.buffer.unshift(chunk);
        else state.buffer.push(chunk);
        if (state.needReadable) emitReadable(stream);
      }
      maybeReadMore(stream, state);
    }
    function chunkInvalid(state, chunk) {
      var er;
      if (!_isUint8Array(chunk) && typeof chunk !== "string" && chunk !== void 0 && !state.objectMode) {
        er = new TypeError("Invalid non-string/buffer chunk");
      }
      return er;
    }
    function needMoreData(state) {
      return !state.ended && (state.needReadable || state.length < state.highWaterMark || state.length === 0);
    }
    Readable.prototype.isPaused = function() {
      return this._readableState.flowing === false;
    };
    Readable.prototype.setEncoding = function(enc) {
      if (!StringDecoder) StringDecoder = require_string_decoder().StringDecoder;
      this._readableState.decoder = new StringDecoder(enc);
      this._readableState.encoding = enc;
      return this;
    };
    var MAX_HWM = 8388608;
    function computeNewHighWaterMark(n) {
      if (n >= MAX_HWM) {
        n = MAX_HWM;
      } else {
        n--;
        n |= n >>> 1;
        n |= n >>> 2;
        n |= n >>> 4;
        n |= n >>> 8;
        n |= n >>> 16;
        n++;
      }
      return n;
    }
    function howMuchToRead(n, state) {
      if (n <= 0 || state.length === 0 && state.ended) return 0;
      if (state.objectMode) return 1;
      if (n !== n) {
        if (state.flowing && state.length) return state.buffer.head.data.length;
        else return state.length;
      }
      if (n > state.highWaterMark) state.highWaterMark = computeNewHighWaterMark(n);
      if (n <= state.length) return n;
      if (!state.ended) {
        state.needReadable = true;
        return 0;
      }
      return state.length;
    }
    Readable.prototype.read = function(n) {
      debug("read", n);
      n = parseInt(n, 10);
      var state = this._readableState;
      var nOrig = n;
      if (n !== 0) state.emittedReadable = false;
      if (n === 0 && state.needReadable && (state.length >= state.highWaterMark || state.ended)) {
        debug("read: emitReadable", state.length, state.ended);
        if (state.length === 0 && state.ended) endReadable(this);
        else emitReadable(this);
        return null;
      }
      n = howMuchToRead(n, state);
      if (n === 0 && state.ended) {
        if (state.length === 0) endReadable(this);
        return null;
      }
      var doRead = state.needReadable;
      debug("need readable", doRead);
      if (state.length === 0 || state.length - n < state.highWaterMark) {
        doRead = true;
        debug("length less than watermark", doRead);
      }
      if (state.ended || state.reading) {
        doRead = false;
        debug("reading or ended", doRead);
      } else if (doRead) {
        debug("do read");
        state.reading = true;
        state.sync = true;
        if (state.length === 0) state.needReadable = true;
        this._read(state.highWaterMark);
        state.sync = false;
        if (!state.reading) n = howMuchToRead(nOrig, state);
      }
      var ret;
      if (n > 0) ret = fromList(n, state);
      else ret = null;
      if (ret === null) {
        state.needReadable = true;
        n = 0;
      } else {
        state.length -= n;
      }
      if (state.length === 0) {
        if (!state.ended) state.needReadable = true;
        if (nOrig !== n && state.ended) endReadable(this);
      }
      if (ret !== null) this.emit("data", ret);
      return ret;
    };
    function onEofChunk(stream, state) {
      if (state.ended) return;
      if (state.decoder) {
        var chunk = state.decoder.end();
        if (chunk && chunk.length) {
          state.buffer.push(chunk);
          state.length += state.objectMode ? 1 : chunk.length;
        }
      }
      state.ended = true;
      emitReadable(stream);
    }
    function emitReadable(stream) {
      var state = stream._readableState;
      state.needReadable = false;
      if (!state.emittedReadable) {
        debug("emitReadable", state.flowing);
        state.emittedReadable = true;
        if (state.sync) pna.nextTick(emitReadable_, stream);
        else emitReadable_(stream);
      }
    }
    function emitReadable_(stream) {
      debug("emit readable");
      stream.emit("readable");
      flow(stream);
    }
    function maybeReadMore(stream, state) {
      if (!state.readingMore) {
        state.readingMore = true;
        pna.nextTick(maybeReadMore_, stream, state);
      }
    }
    function maybeReadMore_(stream, state) {
      var len = state.length;
      while (!state.reading && !state.flowing && !state.ended && state.length < state.highWaterMark) {
        debug("maybeReadMore read 0");
        stream.read(0);
        if (len === state.length)
          break;
        else len = state.length;
      }
      state.readingMore = false;
    }
    Readable.prototype._read = function(n) {
      this.emit("error", new Error("_read() is not implemented"));
    };
    Readable.prototype.pipe = function(dest, pipeOpts) {
      var src = this;
      var state = this._readableState;
      switch (state.pipesCount) {
        case 0:
          state.pipes = dest;
          break;
        case 1:
          state.pipes = [state.pipes, dest];
          break;
        default:
          state.pipes.push(dest);
          break;
      }
      state.pipesCount += 1;
      debug("pipe count=%d opts=%j", state.pipesCount, pipeOpts);
      var doEnd = (!pipeOpts || pipeOpts.end !== false) && dest !== process.stdout && dest !== process.stderr;
      var endFn = doEnd ? onend : unpipe;
      if (state.endEmitted) pna.nextTick(endFn);
      else src.once("end", endFn);
      dest.on("unpipe", onunpipe);
      function onunpipe(readable, unpipeInfo) {
        debug("onunpipe");
        if (readable === src) {
          if (unpipeInfo && unpipeInfo.hasUnpiped === false) {
            unpipeInfo.hasUnpiped = true;
            cleanup();
          }
        }
      }
      function onend() {
        debug("onend");
        dest.end();
      }
      var ondrain = pipeOnDrain(src);
      dest.on("drain", ondrain);
      var cleanedUp = false;
      function cleanup() {
        debug("cleanup");
        dest.removeListener("close", onclose);
        dest.removeListener("finish", onfinish);
        dest.removeListener("drain", ondrain);
        dest.removeListener("error", onerror);
        dest.removeListener("unpipe", onunpipe);
        src.removeListener("end", onend);
        src.removeListener("end", unpipe);
        src.removeListener("data", ondata);
        cleanedUp = true;
        if (state.awaitDrain && (!dest._writableState || dest._writableState.needDrain)) ondrain();
      }
      var increasedAwaitDrain = false;
      src.on("data", ondata);
      function ondata(chunk) {
        debug("ondata");
        increasedAwaitDrain = false;
        var ret = dest.write(chunk);
        if (false === ret && !increasedAwaitDrain) {
          if ((state.pipesCount === 1 && state.pipes === dest || state.pipesCount > 1 && indexOf(state.pipes, dest) !== -1) && !cleanedUp) {
            debug("false write response, pause", state.awaitDrain);
            state.awaitDrain++;
            increasedAwaitDrain = true;
          }
          src.pause();
        }
      }
      function onerror(er) {
        debug("onerror", er);
        unpipe();
        dest.removeListener("error", onerror);
        if (EElistenerCount(dest, "error") === 0) dest.emit("error", er);
      }
      prependListener(dest, "error", onerror);
      function onclose() {
        dest.removeListener("finish", onfinish);
        unpipe();
      }
      dest.once("close", onclose);
      function onfinish() {
        debug("onfinish");
        dest.removeListener("close", onclose);
        unpipe();
      }
      dest.once("finish", onfinish);
      function unpipe() {
        debug("unpipe");
        src.unpipe(dest);
      }
      dest.emit("pipe", src);
      if (!state.flowing) {
        debug("pipe resume");
        src.resume();
      }
      return dest;
    };
    function pipeOnDrain(src) {
      return function() {
        var state = src._readableState;
        debug("pipeOnDrain", state.awaitDrain);
        if (state.awaitDrain) state.awaitDrain--;
        if (state.awaitDrain === 0 && EElistenerCount(src, "data")) {
          state.flowing = true;
          flow(src);
        }
      };
    }
    Readable.prototype.unpipe = function(dest) {
      var state = this._readableState;
      var unpipeInfo = { hasUnpiped: false };
      if (state.pipesCount === 0) return this;
      if (state.pipesCount === 1) {
        if (dest && dest !== state.pipes) return this;
        if (!dest) dest = state.pipes;
        state.pipes = null;
        state.pipesCount = 0;
        state.flowing = false;
        if (dest) dest.emit("unpipe", this, unpipeInfo);
        return this;
      }
      if (!dest) {
        var dests = state.pipes;
        var len = state.pipesCount;
        state.pipes = null;
        state.pipesCount = 0;
        state.flowing = false;
        for (var i = 0; i < len; i++) {
          dests[i].emit("unpipe", this, { hasUnpiped: false });
        }
        return this;
      }
      var index = indexOf(state.pipes, dest);
      if (index === -1) return this;
      state.pipes.splice(index, 1);
      state.pipesCount -= 1;
      if (state.pipesCount === 1) state.pipes = state.pipes[0];
      dest.emit("unpipe", this, unpipeInfo);
      return this;
    };
    Readable.prototype.on = function(ev, fn) {
      var res = Stream.prototype.on.call(this, ev, fn);
      if (ev === "data") {
        if (this._readableState.flowing !== false) this.resume();
      } else if (ev === "readable") {
        var state = this._readableState;
        if (!state.endEmitted && !state.readableListening) {
          state.readableListening = state.needReadable = true;
          state.emittedReadable = false;
          if (!state.reading) {
            pna.nextTick(nReadingNextTick, this);
          } else if (state.length) {
            emitReadable(this);
          }
        }
      }
      return res;
    };
    Readable.prototype.addListener = Readable.prototype.on;
    function nReadingNextTick(self2) {
      debug("readable nexttick read 0");
      self2.read(0);
    }
    Readable.prototype.resume = function() {
      var state = this._readableState;
      if (!state.flowing) {
        debug("resume");
        state.flowing = true;
        resume(this, state);
      }
      return this;
    };
    function resume(stream, state) {
      if (!state.resumeScheduled) {
        state.resumeScheduled = true;
        pna.nextTick(resume_, stream, state);
      }
    }
    function resume_(stream, state) {
      if (!state.reading) {
        debug("resume read 0");
        stream.read(0);
      }
      state.resumeScheduled = false;
      state.awaitDrain = 0;
      stream.emit("resume");
      flow(stream);
      if (state.flowing && !state.reading) stream.read(0);
    }
    Readable.prototype.pause = function() {
      debug("call pause flowing=%j", this._readableState.flowing);
      if (false !== this._readableState.flowing) {
        debug("pause");
        this._readableState.flowing = false;
        this.emit("pause");
      }
      return this;
    };
    function flow(stream) {
      var state = stream._readableState;
      debug("flow", state.flowing);
      while (state.flowing && stream.read() !== null) {
      }
    }
    Readable.prototype.wrap = function(stream) {
      var _this = this;
      var state = this._readableState;
      var paused = false;
      stream.on("end", function() {
        debug("wrapped end");
        if (state.decoder && !state.ended) {
          var chunk = state.decoder.end();
          if (chunk && chunk.length) _this.push(chunk);
        }
        _this.push(null);
      });
      stream.on("data", function(chunk) {
        debug("wrapped data");
        if (state.decoder) chunk = state.decoder.write(chunk);
        if (state.objectMode && (chunk === null || chunk === void 0)) return;
        else if (!state.objectMode && (!chunk || !chunk.length)) return;
        var ret = _this.push(chunk);
        if (!ret) {
          paused = true;
          stream.pause();
        }
      });
      for (var i in stream) {
        if (this[i] === void 0 && typeof stream[i] === "function") {
          this[i] = /* @__PURE__ */ (function(method) {
            return function() {
              return stream[method].apply(stream, arguments);
            };
          })(i);
        }
      }
      for (var n = 0; n < kProxyEvents.length; n++) {
        stream.on(kProxyEvents[n], this.emit.bind(this, kProxyEvents[n]));
      }
      this._read = function(n2) {
        debug("wrapped _read", n2);
        if (paused) {
          paused = false;
          stream.resume();
        }
      };
      return this;
    };
    Object.defineProperty(Readable.prototype, "readableHighWaterMark", {
      // making it explicit this property is not enumerable
      // because otherwise some prototype manipulation in
      // userland will fail
      enumerable: false,
      get: function() {
        return this._readableState.highWaterMark;
      }
    });
    Readable._fromList = fromList;
    function fromList(n, state) {
      if (state.length === 0) return null;
      var ret;
      if (state.objectMode) ret = state.buffer.shift();
      else if (!n || n >= state.length) {
        if (state.decoder) ret = state.buffer.join("");
        else if (state.buffer.length === 1) ret = state.buffer.head.data;
        else ret = state.buffer.concat(state.length);
        state.buffer.clear();
      } else {
        ret = fromListPartial(n, state.buffer, state.decoder);
      }
      return ret;
    }
    function fromListPartial(n, list, hasStrings) {
      var ret;
      if (n < list.head.data.length) {
        ret = list.head.data.slice(0, n);
        list.head.data = list.head.data.slice(n);
      } else if (n === list.head.data.length) {
        ret = list.shift();
      } else {
        ret = hasStrings ? copyFromBufferString(n, list) : copyFromBuffer(n, list);
      }
      return ret;
    }
    function copyFromBufferString(n, list) {
      var p = list.head;
      var c = 1;
      var ret = p.data;
      n -= ret.length;
      while (p = p.next) {
        var str = p.data;
        var nb = n > str.length ? str.length : n;
        if (nb === str.length) ret += str;
        else ret += str.slice(0, n);
        n -= nb;
        if (n === 0) {
          if (nb === str.length) {
            ++c;
            if (p.next) list.head = p.next;
            else list.head = list.tail = null;
          } else {
            list.head = p;
            p.data = str.slice(nb);
          }
          break;
        }
        ++c;
      }
      list.length -= c;
      return ret;
    }
    function copyFromBuffer(n, list) {
      var ret = Buffer2.allocUnsafe(n);
      var p = list.head;
      var c = 1;
      p.data.copy(ret);
      n -= p.data.length;
      while (p = p.next) {
        var buf = p.data;
        var nb = n > buf.length ? buf.length : n;
        buf.copy(ret, ret.length - n, 0, nb);
        n -= nb;
        if (n === 0) {
          if (nb === buf.length) {
            ++c;
            if (p.next) list.head = p.next;
            else list.head = list.tail = null;
          } else {
            list.head = p;
            p.data = buf.slice(nb);
          }
          break;
        }
        ++c;
      }
      list.length -= c;
      return ret;
    }
    function endReadable(stream) {
      var state = stream._readableState;
      if (state.length > 0) throw new Error('"endReadable()" called on non-empty stream');
      if (!state.endEmitted) {
        state.ended = true;
        pna.nextTick(endReadableNT, state, stream);
      }
    }
    function endReadableNT(state, stream) {
      if (!state.endEmitted && state.length === 0) {
        state.endEmitted = true;
        stream.readable = false;
        stream.emit("end");
      }
    }
    function indexOf(xs, x) {
      for (var i = 0, l = xs.length; i < l; i++) {
        if (xs[i] === x) return i;
      }
      return -1;
    }
  }
});

// node_modules/readable-stream/lib/_stream_transform.js
var require_stream_transform = __commonJS({
  "node_modules/readable-stream/lib/_stream_transform.js"(exports2, module2) {
    "use strict";
    module2.exports = Transform;
    var Duplex = require_stream_duplex();
    var util = Object.create(require_util());
    util.inherits = require_inherits();
    util.inherits(Transform, Duplex);
    function afterTransform(er, data) {
      var ts = this._transformState;
      ts.transforming = false;
      var cb = ts.writecb;
      if (!cb) {
        return this.emit("error", new Error("write callback called multiple times"));
      }
      ts.writechunk = null;
      ts.writecb = null;
      if (data != null)
        this.push(data);
      cb(er);
      var rs = this._readableState;
      rs.reading = false;
      if (rs.needReadable || rs.length < rs.highWaterMark) {
        this._read(rs.highWaterMark);
      }
    }
    function Transform(options) {
      if (!(this instanceof Transform)) return new Transform(options);
      Duplex.call(this, options);
      this._transformState = {
        afterTransform: afterTransform.bind(this),
        needTransform: false,
        transforming: false,
        writecb: null,
        writechunk: null,
        writeencoding: null
      };
      this._readableState.needReadable = true;
      this._readableState.sync = false;
      if (options) {
        if (typeof options.transform === "function") this._transform = options.transform;
        if (typeof options.flush === "function") this._flush = options.flush;
      }
      this.on("prefinish", prefinish);
    }
    function prefinish() {
      var _this = this;
      if (typeof this._flush === "function") {
        this._flush(function(er, data) {
          done(_this, er, data);
        });
      } else {
        done(this, null, null);
      }
    }
    Transform.prototype.push = function(chunk, encoding) {
      this._transformState.needTransform = false;
      return Duplex.prototype.push.call(this, chunk, encoding);
    };
    Transform.prototype._transform = function(chunk, encoding, cb) {
      throw new Error("_transform() is not implemented");
    };
    Transform.prototype._write = function(chunk, encoding, cb) {
      var ts = this._transformState;
      ts.writecb = cb;
      ts.writechunk = chunk;
      ts.writeencoding = encoding;
      if (!ts.transforming) {
        var rs = this._readableState;
        if (ts.needTransform || rs.needReadable || rs.length < rs.highWaterMark) this._read(rs.highWaterMark);
      }
    };
    Transform.prototype._read = function(n) {
      var ts = this._transformState;
      if (ts.writechunk !== null && ts.writecb && !ts.transforming) {
        ts.transforming = true;
        this._transform(ts.writechunk, ts.writeencoding, ts.afterTransform);
      } else {
        ts.needTransform = true;
      }
    };
    Transform.prototype._destroy = function(err2, cb) {
      var _this2 = this;
      Duplex.prototype._destroy.call(this, err2, function(err22) {
        cb(err22);
        _this2.emit("close");
      });
    };
    function done(stream, er, data) {
      if (er) return stream.emit("error", er);
      if (data != null)
        stream.push(data);
      if (stream._writableState.length) throw new Error("Calling transform done when ws.length != 0");
      if (stream._transformState.transforming) throw new Error("Calling transform done when still transforming");
      return stream.push(null);
    }
  }
});

// node_modules/readable-stream/lib/_stream_passthrough.js
var require_stream_passthrough = __commonJS({
  "node_modules/readable-stream/lib/_stream_passthrough.js"(exports2, module2) {
    "use strict";
    module2.exports = PassThrough;
    var Transform = require_stream_transform();
    var util = Object.create(require_util());
    util.inherits = require_inherits();
    util.inherits(PassThrough, Transform);
    function PassThrough(options) {
      if (!(this instanceof PassThrough)) return new PassThrough(options);
      Transform.call(this, options);
    }
    PassThrough.prototype._transform = function(chunk, encoding, cb) {
      cb(null, chunk);
    };
  }
});

// node_modules/readable-stream/readable.js
var require_readable = __commonJS({
  "node_modules/readable-stream/readable.js"(exports2, module2) {
    var Stream = require("stream");
    if (process.env.READABLE_STREAM === "disable" && Stream) {
      module2.exports = Stream;
      exports2 = module2.exports = Stream.Readable;
      exports2.Readable = Stream.Readable;
      exports2.Writable = Stream.Writable;
      exports2.Duplex = Stream.Duplex;
      exports2.Transform = Stream.Transform;
      exports2.PassThrough = Stream.PassThrough;
      exports2.Stream = Stream;
    } else {
      exports2 = module2.exports = require_stream_readable();
      exports2.Stream = Stream || exports2;
      exports2.Readable = exports2;
      exports2.Writable = require_stream_writable();
      exports2.Duplex = require_stream_duplex();
      exports2.Transform = require_stream_transform();
      exports2.PassThrough = require_stream_passthrough();
    }
  }
});

// node_modules/jszip/lib/support.js
var require_support = __commonJS({
  "node_modules/jszip/lib/support.js"(exports2) {
    "use strict";
    exports2.base64 = true;
    exports2.array = true;
    exports2.string = true;
    exports2.arraybuffer = typeof ArrayBuffer !== "undefined" && typeof Uint8Array !== "undefined";
    exports2.nodebuffer = typeof Buffer !== "undefined";
    exports2.uint8array = typeof Uint8Array !== "undefined";
    if (typeof ArrayBuffer === "undefined") {
      exports2.blob = false;
    } else {
      buffer = new ArrayBuffer(0);
      try {
        exports2.blob = new Blob([buffer], {
          type: "application/zip"
        }).size === 0;
      } catch (e) {
        try {
          Builder = self.BlobBuilder || self.WebKitBlobBuilder || self.MozBlobBuilder || self.MSBlobBuilder;
          builder = new Builder();
          builder.append(buffer);
          exports2.blob = builder.getBlob("application/zip").size === 0;
        } catch (e2) {
          exports2.blob = false;
        }
      }
    }
    var buffer;
    var Builder;
    var builder;
    try {
      exports2.nodestream = !!require_readable().Readable;
    } catch (e) {
      exports2.nodestream = false;
    }
  }
});

// node_modules/jszip/lib/base64.js
var require_base64 = __commonJS({
  "node_modules/jszip/lib/base64.js"(exports2) {
    "use strict";
    var utils = require_utils();
    var support = require_support();
    var _keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
    exports2.encode = function(input) {
      var output = [];
      var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
      var i = 0, len = input.length, remainingBytes = len;
      var isArray = utils.getTypeOf(input) !== "string";
      while (i < input.length) {
        remainingBytes = len - i;
        if (!isArray) {
          chr1 = input.charCodeAt(i++);
          chr2 = i < len ? input.charCodeAt(i++) : 0;
          chr3 = i < len ? input.charCodeAt(i++) : 0;
        } else {
          chr1 = input[i++];
          chr2 = i < len ? input[i++] : 0;
          chr3 = i < len ? input[i++] : 0;
        }
        enc1 = chr1 >> 2;
        enc2 = (chr1 & 3) << 4 | chr2 >> 4;
        enc3 = remainingBytes > 1 ? (chr2 & 15) << 2 | chr3 >> 6 : 64;
        enc4 = remainingBytes > 2 ? chr3 & 63 : 64;
        output.push(_keyStr.charAt(enc1) + _keyStr.charAt(enc2) + _keyStr.charAt(enc3) + _keyStr.charAt(enc4));
      }
      return output.join("");
    };
    exports2.decode = function(input) {
      var chr1, chr2, chr3;
      var enc1, enc2, enc3, enc4;
      var i = 0, resultIndex = 0;
      var dataUrlPrefix = "data:";
      if (input.substr(0, dataUrlPrefix.length) === dataUrlPrefix) {
        throw new Error("Invalid base64 input, it looks like a data url.");
      }
      input = input.replace(/[^A-Za-z0-9+/=]/g, "");
      var totalLength = input.length * 3 / 4;
      if (input.charAt(input.length - 1) === _keyStr.charAt(64)) {
        totalLength--;
      }
      if (input.charAt(input.length - 2) === _keyStr.charAt(64)) {
        totalLength--;
      }
      if (totalLength % 1 !== 0) {
        throw new Error("Invalid base64 input, bad content length.");
      }
      var output;
      if (support.uint8array) {
        output = new Uint8Array(totalLength | 0);
      } else {
        output = new Array(totalLength | 0);
      }
      while (i < input.length) {
        enc1 = _keyStr.indexOf(input.charAt(i++));
        enc2 = _keyStr.indexOf(input.charAt(i++));
        enc3 = _keyStr.indexOf(input.charAt(i++));
        enc4 = _keyStr.indexOf(input.charAt(i++));
        chr1 = enc1 << 2 | enc2 >> 4;
        chr2 = (enc2 & 15) << 4 | enc3 >> 2;
        chr3 = (enc3 & 3) << 6 | enc4;
        output[resultIndex++] = chr1;
        if (enc3 !== 64) {
          output[resultIndex++] = chr2;
        }
        if (enc4 !== 64) {
          output[resultIndex++] = chr3;
        }
      }
      return output;
    };
  }
});

// node_modules/jszip/lib/nodejsUtils.js
var require_nodejsUtils = __commonJS({
  "node_modules/jszip/lib/nodejsUtils.js"(exports2, module2) {
    "use strict";
    module2.exports = {
      /**
       * True if this is running in Nodejs, will be undefined in a browser.
       * In a browser, browserify won't include this file and the whole module
       * will be resolved an empty object.
       */
      isNode: typeof Buffer !== "undefined",
      /**
       * Create a new nodejs Buffer from an existing content.
       * @param {Object} data the data to pass to the constructor.
       * @param {String} encoding the encoding to use.
       * @return {Buffer} a new Buffer.
       */
      newBufferFrom: function(data, encoding) {
        if (Buffer.from && Buffer.from !== Uint8Array.from) {
          return Buffer.from(data, encoding);
        } else {
          if (typeof data === "number") {
            throw new Error('The "data" argument must not be a number');
          }
          return new Buffer(data, encoding);
        }
      },
      /**
       * Create a new nodejs Buffer with the specified size.
       * @param {Integer} size the size of the buffer.
       * @return {Buffer} a new Buffer.
       */
      allocBuffer: function(size) {
        if (Buffer.alloc) {
          return Buffer.alloc(size);
        } else {
          var buf = new Buffer(size);
          buf.fill(0);
          return buf;
        }
      },
      /**
       * Find out if an object is a Buffer.
       * @param {Object} b the object to test.
       * @return {Boolean} true if the object is a Buffer, false otherwise.
       */
      isBuffer: function(b) {
        return Buffer.isBuffer(b);
      },
      isStream: function(obj) {
        return obj && typeof obj.on === "function" && typeof obj.pause === "function" && typeof obj.resume === "function";
      }
    };
  }
});

// node_modules/immediate/lib/index.js
var require_lib = __commonJS({
  "node_modules/immediate/lib/index.js"(exports2, module2) {
    "use strict";
    var Mutation = global.MutationObserver || global.WebKitMutationObserver;
    var scheduleDrain;
    if (process.browser) {
      if (Mutation) {
        called = 0;
        observer = new Mutation(nextTick);
        element = global.document.createTextNode("");
        observer.observe(element, {
          characterData: true
        });
        scheduleDrain = function() {
          element.data = called = ++called % 2;
        };
      } else if (!global.setImmediate && typeof global.MessageChannel !== "undefined") {
        channel = new global.MessageChannel();
        channel.port1.onmessage = nextTick;
        scheduleDrain = function() {
          channel.port2.postMessage(0);
        };
      } else if ("document" in global && "onreadystatechange" in global.document.createElement("script")) {
        scheduleDrain = function() {
          var scriptEl = global.document.createElement("script");
          scriptEl.onreadystatechange = function() {
            nextTick();
            scriptEl.onreadystatechange = null;
            scriptEl.parentNode.removeChild(scriptEl);
            scriptEl = null;
          };
          global.document.documentElement.appendChild(scriptEl);
        };
      } else {
        scheduleDrain = function() {
          setTimeout(nextTick, 0);
        };
      }
    } else {
      scheduleDrain = function() {
        process.nextTick(nextTick);
      };
    }
    var called;
    var observer;
    var element;
    var channel;
    var draining;
    var queue = [];
    function nextTick() {
      draining = true;
      var i, oldQueue;
      var len = queue.length;
      while (len) {
        oldQueue = queue;
        queue = [];
        i = -1;
        while (++i < len) {
          oldQueue[i]();
        }
        len = queue.length;
      }
      draining = false;
    }
    module2.exports = immediate;
    function immediate(task) {
      if (queue.push(task) === 1 && !draining) {
        scheduleDrain();
      }
    }
  }
});

// node_modules/lie/lib/index.js
var require_lib2 = __commonJS({
  "node_modules/lie/lib/index.js"(exports2, module2) {
    "use strict";
    var immediate = require_lib();
    function INTERNAL() {
    }
    var handlers = {};
    var REJECTED = ["REJECTED"];
    var FULFILLED = ["FULFILLED"];
    var PENDING = ["PENDING"];
    if (!process.browser) {
      UNHANDLED = ["UNHANDLED"];
    }
    var UNHANDLED;
    module2.exports = Promise2;
    function Promise2(resolver) {
      if (typeof resolver !== "function") {
        throw new TypeError("resolver must be a function");
      }
      this.state = PENDING;
      this.queue = [];
      this.outcome = void 0;
      if (!process.browser) {
        this.handled = UNHANDLED;
      }
      if (resolver !== INTERNAL) {
        safelyResolveThenable(this, resolver);
      }
    }
    Promise2.prototype.finally = function(callback) {
      if (typeof callback !== "function") {
        return this;
      }
      var p = this.constructor;
      return this.then(resolve2, reject2);
      function resolve2(value) {
        function yes() {
          return value;
        }
        return p.resolve(callback()).then(yes);
      }
      function reject2(reason) {
        function no() {
          throw reason;
        }
        return p.resolve(callback()).then(no);
      }
    };
    Promise2.prototype.catch = function(onRejected) {
      return this.then(null, onRejected);
    };
    Promise2.prototype.then = function(onFulfilled, onRejected) {
      if (typeof onFulfilled !== "function" && this.state === FULFILLED || typeof onRejected !== "function" && this.state === REJECTED) {
        return this;
      }
      var promise = new this.constructor(INTERNAL);
      if (!process.browser) {
        if (this.handled === UNHANDLED) {
          this.handled = null;
        }
      }
      if (this.state !== PENDING) {
        var resolver = this.state === FULFILLED ? onFulfilled : onRejected;
        unwrap(promise, resolver, this.outcome);
      } else {
        this.queue.push(new QueueItem(promise, onFulfilled, onRejected));
      }
      return promise;
    };
    function QueueItem(promise, onFulfilled, onRejected) {
      this.promise = promise;
      if (typeof onFulfilled === "function") {
        this.onFulfilled = onFulfilled;
        this.callFulfilled = this.otherCallFulfilled;
      }
      if (typeof onRejected === "function") {
        this.onRejected = onRejected;
        this.callRejected = this.otherCallRejected;
      }
    }
    QueueItem.prototype.callFulfilled = function(value) {
      handlers.resolve(this.promise, value);
    };
    QueueItem.prototype.otherCallFulfilled = function(value) {
      unwrap(this.promise, this.onFulfilled, value);
    };
    QueueItem.prototype.callRejected = function(value) {
      handlers.reject(this.promise, value);
    };
    QueueItem.prototype.otherCallRejected = function(value) {
      unwrap(this.promise, this.onRejected, value);
    };
    function unwrap(promise, func, value) {
      immediate(function() {
        var returnValue;
        try {
          returnValue = func(value);
        } catch (e) {
          return handlers.reject(promise, e);
        }
        if (returnValue === promise) {
          handlers.reject(promise, new TypeError("Cannot resolve promise with itself"));
        } else {
          handlers.resolve(promise, returnValue);
        }
      });
    }
    handlers.resolve = function(self2, value) {
      var result = tryCatch(getThen, value);
      if (result.status === "error") {
        return handlers.reject(self2, result.value);
      }
      var thenable = result.value;
      if (thenable) {
        safelyResolveThenable(self2, thenable);
      } else {
        self2.state = FULFILLED;
        self2.outcome = value;
        var i = -1;
        var len = self2.queue.length;
        while (++i < len) {
          self2.queue[i].callFulfilled(value);
        }
      }
      return self2;
    };
    handlers.reject = function(self2, error) {
      self2.state = REJECTED;
      self2.outcome = error;
      if (!process.browser) {
        if (self2.handled === UNHANDLED) {
          immediate(function() {
            if (self2.handled === UNHANDLED) {
              process.emit("unhandledRejection", error, self2);
            }
          });
        }
      }
      var i = -1;
      var len = self2.queue.length;
      while (++i < len) {
        self2.queue[i].callRejected(error);
      }
      return self2;
    };
    function getThen(obj) {
      var then = obj && obj.then;
      if (obj && (typeof obj === "object" || typeof obj === "function") && typeof then === "function") {
        return function appyThen() {
          then.apply(obj, arguments);
        };
      }
    }
    function safelyResolveThenable(self2, thenable) {
      var called = false;
      function onError(value) {
        if (called) {
          return;
        }
        called = true;
        handlers.reject(self2, value);
      }
      function onSuccess(value) {
        if (called) {
          return;
        }
        called = true;
        handlers.resolve(self2, value);
      }
      function tryToUnwrap() {
        thenable(onSuccess, onError);
      }
      var result = tryCatch(tryToUnwrap);
      if (result.status === "error") {
        onError(result.value);
      }
    }
    function tryCatch(func, value) {
      var out = {};
      try {
        out.value = func(value);
        out.status = "success";
      } catch (e) {
        out.status = "error";
        out.value = e;
      }
      return out;
    }
    Promise2.resolve = resolve;
    function resolve(value) {
      if (value instanceof this) {
        return value;
      }
      return handlers.resolve(new this(INTERNAL), value);
    }
    Promise2.reject = reject;
    function reject(reason) {
      var promise = new this(INTERNAL);
      return handlers.reject(promise, reason);
    }
    Promise2.all = all;
    function all(iterable) {
      var self2 = this;
      if (Object.prototype.toString.call(iterable) !== "[object Array]") {
        return this.reject(new TypeError("must be an array"));
      }
      var len = iterable.length;
      var called = false;
      if (!len) {
        return this.resolve([]);
      }
      var values = new Array(len);
      var resolved = 0;
      var i = -1;
      var promise = new this(INTERNAL);
      while (++i < len) {
        allResolver(iterable[i], i);
      }
      return promise;
      function allResolver(value, i2) {
        self2.resolve(value).then(resolveFromAll, function(error) {
          if (!called) {
            called = true;
            handlers.reject(promise, error);
          }
        });
        function resolveFromAll(outValue) {
          values[i2] = outValue;
          if (++resolved === len && !called) {
            called = true;
            handlers.resolve(promise, values);
          }
        }
      }
    }
    Promise2.race = race;
    function race(iterable) {
      var self2 = this;
      if (Object.prototype.toString.call(iterable) !== "[object Array]") {
        return this.reject(new TypeError("must be an array"));
      }
      var len = iterable.length;
      var called = false;
      if (!len) {
        return this.resolve([]);
      }
      var i = -1;
      var promise = new this(INTERNAL);
      while (++i < len) {
        resolver(iterable[i]);
      }
      return promise;
      function resolver(value) {
        self2.resolve(value).then(function(response) {
          if (!called) {
            called = true;
            handlers.resolve(promise, response);
          }
        }, function(error) {
          if (!called) {
            called = true;
            handlers.reject(promise, error);
          }
        });
      }
    }
  }
});

// node_modules/jszip/lib/external.js
var require_external = __commonJS({
  "node_modules/jszip/lib/external.js"(exports2, module2) {
    "use strict";
    var ES6Promise = null;
    if (typeof Promise !== "undefined") {
      ES6Promise = Promise;
    } else {
      ES6Promise = require_lib2();
    }
    module2.exports = {
      Promise: ES6Promise
    };
  }
});

// node_modules/setimmediate/setImmediate.js
var require_setImmediate = __commonJS({
  "node_modules/setimmediate/setImmediate.js"(exports2) {
    (function(global2, undefined2) {
      "use strict";
      if (global2.setImmediate) {
        return;
      }
      var nextHandle = 1;
      var tasksByHandle = {};
      var currentlyRunningATask = false;
      var doc = global2.document;
      var registerImmediate;
      function setImmediate2(callback) {
        if (typeof callback !== "function") {
          callback = new Function("" + callback);
        }
        var args = new Array(arguments.length - 1);
        for (var i = 0; i < args.length; i++) {
          args[i] = arguments[i + 1];
        }
        var task = { callback, args };
        tasksByHandle[nextHandle] = task;
        registerImmediate(nextHandle);
        return nextHandle++;
      }
      function clearImmediate(handle) {
        delete tasksByHandle[handle];
      }
      function run(task) {
        var callback = task.callback;
        var args = task.args;
        switch (args.length) {
          case 0:
            callback();
            break;
          case 1:
            callback(args[0]);
            break;
          case 2:
            callback(args[0], args[1]);
            break;
          case 3:
            callback(args[0], args[1], args[2]);
            break;
          default:
            callback.apply(undefined2, args);
            break;
        }
      }
      function runIfPresent(handle) {
        if (currentlyRunningATask) {
          setTimeout(runIfPresent, 0, handle);
        } else {
          var task = tasksByHandle[handle];
          if (task) {
            currentlyRunningATask = true;
            try {
              run(task);
            } finally {
              clearImmediate(handle);
              currentlyRunningATask = false;
            }
          }
        }
      }
      function installNextTickImplementation() {
        registerImmediate = function(handle) {
          process.nextTick(function() {
            runIfPresent(handle);
          });
        };
      }
      function canUsePostMessage() {
        if (global2.postMessage && !global2.importScripts) {
          var postMessageIsAsynchronous = true;
          var oldOnMessage = global2.onmessage;
          global2.onmessage = function() {
            postMessageIsAsynchronous = false;
          };
          global2.postMessage("", "*");
          global2.onmessage = oldOnMessage;
          return postMessageIsAsynchronous;
        }
      }
      function installPostMessageImplementation() {
        var messagePrefix = "setImmediate$" + Math.random() + "$";
        var onGlobalMessage = function(event) {
          if (event.source === global2 && typeof event.data === "string" && event.data.indexOf(messagePrefix) === 0) {
            runIfPresent(+event.data.slice(messagePrefix.length));
          }
        };
        if (global2.addEventListener) {
          global2.addEventListener("message", onGlobalMessage, false);
        } else {
          global2.attachEvent("onmessage", onGlobalMessage);
        }
        registerImmediate = function(handle) {
          global2.postMessage(messagePrefix + handle, "*");
        };
      }
      function installMessageChannelImplementation() {
        var channel = new MessageChannel();
        channel.port1.onmessage = function(event) {
          var handle = event.data;
          runIfPresent(handle);
        };
        registerImmediate = function(handle) {
          channel.port2.postMessage(handle);
        };
      }
      function installReadyStateChangeImplementation() {
        var html = doc.documentElement;
        registerImmediate = function(handle) {
          var script = doc.createElement("script");
          script.onreadystatechange = function() {
            runIfPresent(handle);
            script.onreadystatechange = null;
            html.removeChild(script);
            script = null;
          };
          html.appendChild(script);
        };
      }
      function installSetTimeoutImplementation() {
        registerImmediate = function(handle) {
          setTimeout(runIfPresent, 0, handle);
        };
      }
      var attachTo = Object.getPrototypeOf && Object.getPrototypeOf(global2);
      attachTo = attachTo && attachTo.setTimeout ? attachTo : global2;
      if ({}.toString.call(global2.process) === "[object process]") {
        installNextTickImplementation();
      } else if (canUsePostMessage()) {
        installPostMessageImplementation();
      } else if (global2.MessageChannel) {
        installMessageChannelImplementation();
      } else if (doc && "onreadystatechange" in doc.createElement("script")) {
        installReadyStateChangeImplementation();
      } else {
        installSetTimeoutImplementation();
      }
      attachTo.setImmediate = setImmediate2;
      attachTo.clearImmediate = clearImmediate;
    })(typeof self === "undefined" ? typeof global === "undefined" ? exports2 : global : self);
  }
});

// node_modules/jszip/lib/utils.js
var require_utils = __commonJS({
  "node_modules/jszip/lib/utils.js"(exports2) {
    "use strict";
    var support = require_support();
    var base64 = require_base64();
    var nodejsUtils = require_nodejsUtils();
    var external = require_external();
    require_setImmediate();
    function string2binary(str) {
      var result = null;
      if (support.uint8array) {
        result = new Uint8Array(str.length);
      } else {
        result = new Array(str.length);
      }
      return stringToArrayLike(str, result);
    }
    exports2.newBlob = function(part, type) {
      exports2.checkSupport("blob");
      try {
        return new Blob([part], {
          type
        });
      } catch (e) {
        try {
          var Builder = self.BlobBuilder || self.WebKitBlobBuilder || self.MozBlobBuilder || self.MSBlobBuilder;
          var builder = new Builder();
          builder.append(part);
          return builder.getBlob(type);
        } catch (e2) {
          throw new Error("Bug : can't construct the Blob.");
        }
      }
    };
    function identity(input) {
      return input;
    }
    function stringToArrayLike(str, array) {
      for (var i = 0; i < str.length; ++i) {
        array[i] = str.charCodeAt(i) & 255;
      }
      return array;
    }
    var arrayToStringHelper = {
      /**
       * Transform an array of int into a string, chunk by chunk.
       * See the performances notes on arrayLikeToString.
       * @param {Array|ArrayBuffer|Uint8Array|Buffer} array the array to transform.
       * @param {String} type the type of the array.
       * @param {Integer} chunk the chunk size.
       * @return {String} the resulting string.
       * @throws Error if the chunk is too big for the stack.
       */
      stringifyByChunk: function(array, type, chunk) {
        var result = [], k = 0, len = array.length;
        if (len <= chunk) {
          return String.fromCharCode.apply(null, array);
        }
        while (k < len) {
          if (type === "array" || type === "nodebuffer") {
            result.push(String.fromCharCode.apply(null, array.slice(k, Math.min(k + chunk, len))));
          } else {
            result.push(String.fromCharCode.apply(null, array.subarray(k, Math.min(k + chunk, len))));
          }
          k += chunk;
        }
        return result.join("");
      },
      /**
       * Call String.fromCharCode on every item in the array.
       * This is the naive implementation, which generate A LOT of intermediate string.
       * This should be used when everything else fail.
       * @param {Array|ArrayBuffer|Uint8Array|Buffer} array the array to transform.
       * @return {String} the result.
       */
      stringifyByChar: function(array) {
        var resultStr = "";
        for (var i = 0; i < array.length; i++) {
          resultStr += String.fromCharCode(array[i]);
        }
        return resultStr;
      },
      applyCanBeUsed: {
        /**
         * true if the browser accepts to use String.fromCharCode on Uint8Array
         */
        uint8array: (function() {
          try {
            return support.uint8array && String.fromCharCode.apply(null, new Uint8Array(1)).length === 1;
          } catch (e) {
            return false;
          }
        })(),
        /**
         * true if the browser accepts to use String.fromCharCode on nodejs Buffer.
         */
        nodebuffer: (function() {
          try {
            return support.nodebuffer && String.fromCharCode.apply(null, nodejsUtils.allocBuffer(1)).length === 1;
          } catch (e) {
            return false;
          }
        })()
      }
    };
    function arrayLikeToString(array) {
      var chunk = 65536, type = exports2.getTypeOf(array), canUseApply = true;
      if (type === "uint8array") {
        canUseApply = arrayToStringHelper.applyCanBeUsed.uint8array;
      } else if (type === "nodebuffer") {
        canUseApply = arrayToStringHelper.applyCanBeUsed.nodebuffer;
      }
      if (canUseApply) {
        while (chunk > 1) {
          try {
            return arrayToStringHelper.stringifyByChunk(array, type, chunk);
          } catch (e) {
            chunk = Math.floor(chunk / 2);
          }
        }
      }
      return arrayToStringHelper.stringifyByChar(array);
    }
    exports2.applyFromCharCode = arrayLikeToString;
    function arrayLikeToArrayLike(arrayFrom, arrayTo) {
      for (var i = 0; i < arrayFrom.length; i++) {
        arrayTo[i] = arrayFrom[i];
      }
      return arrayTo;
    }
    var transform = {};
    transform["string"] = {
      "string": identity,
      "array": function(input) {
        return stringToArrayLike(input, new Array(input.length));
      },
      "arraybuffer": function(input) {
        return transform["string"]["uint8array"](input).buffer;
      },
      "uint8array": function(input) {
        return stringToArrayLike(input, new Uint8Array(input.length));
      },
      "nodebuffer": function(input) {
        return stringToArrayLike(input, nodejsUtils.allocBuffer(input.length));
      }
    };
    transform["array"] = {
      "string": arrayLikeToString,
      "array": identity,
      "arraybuffer": function(input) {
        return new Uint8Array(input).buffer;
      },
      "uint8array": function(input) {
        return new Uint8Array(input);
      },
      "nodebuffer": function(input) {
        return nodejsUtils.newBufferFrom(input);
      }
    };
    transform["arraybuffer"] = {
      "string": function(input) {
        return arrayLikeToString(new Uint8Array(input));
      },
      "array": function(input) {
        return arrayLikeToArrayLike(new Uint8Array(input), new Array(input.byteLength));
      },
      "arraybuffer": identity,
      "uint8array": function(input) {
        return new Uint8Array(input);
      },
      "nodebuffer": function(input) {
        return nodejsUtils.newBufferFrom(new Uint8Array(input));
      }
    };
    transform["uint8array"] = {
      "string": arrayLikeToString,
      "array": function(input) {
        return arrayLikeToArrayLike(input, new Array(input.length));
      },
      "arraybuffer": function(input) {
        return input.buffer;
      },
      "uint8array": identity,
      "nodebuffer": function(input) {
        return nodejsUtils.newBufferFrom(input);
      }
    };
    transform["nodebuffer"] = {
      "string": arrayLikeToString,
      "array": function(input) {
        return arrayLikeToArrayLike(input, new Array(input.length));
      },
      "arraybuffer": function(input) {
        return transform["nodebuffer"]["uint8array"](input).buffer;
      },
      "uint8array": function(input) {
        return arrayLikeToArrayLike(input, new Uint8Array(input.length));
      },
      "nodebuffer": identity
    };
    exports2.transformTo = function(outputType, input) {
      if (!input) {
        input = "";
      }
      if (!outputType) {
        return input;
      }
      exports2.checkSupport(outputType);
      var inputType = exports2.getTypeOf(input);
      var result = transform[inputType][outputType](input);
      return result;
    };
    exports2.resolve = function(path) {
      var parts = path.split("/");
      var result = [];
      for (var index = 0; index < parts.length; index++) {
        var part = parts[index];
        if (part === "." || part === "" && index !== 0 && index !== parts.length - 1) {
          continue;
        } else if (part === "..") {
          result.pop();
        } else {
          result.push(part);
        }
      }
      return result.join("/");
    };
    exports2.getTypeOf = function(input) {
      if (typeof input === "string") {
        return "string";
      }
      if (Object.prototype.toString.call(input) === "[object Array]") {
        return "array";
      }
      if (support.nodebuffer && nodejsUtils.isBuffer(input)) {
        return "nodebuffer";
      }
      if (support.uint8array && input instanceof Uint8Array) {
        return "uint8array";
      }
      if (support.arraybuffer && input instanceof ArrayBuffer) {
        return "arraybuffer";
      }
    };
    exports2.checkSupport = function(type) {
      var supported = support[type.toLowerCase()];
      if (!supported) {
        throw new Error(type + " is not supported by this platform");
      }
    };
    exports2.MAX_VALUE_16BITS = 65535;
    exports2.MAX_VALUE_32BITS = -1;
    exports2.pretty = function(str) {
      var res = "", code, i;
      for (i = 0; i < (str || "").length; i++) {
        code = str.charCodeAt(i);
        res += "\\x" + (code < 16 ? "0" : "") + code.toString(16).toUpperCase();
      }
      return res;
    };
    exports2.delay = function(callback, args, self2) {
      setImmediate(function() {
        callback.apply(self2 || null, args || []);
      });
    };
    exports2.inherits = function(ctor, superCtor) {
      var Obj = function() {
      };
      Obj.prototype = superCtor.prototype;
      ctor.prototype = new Obj();
    };
    exports2.extend = function() {
      var result = {}, i, attr;
      for (i = 0; i < arguments.length; i++) {
        for (attr in arguments[i]) {
          if (Object.prototype.hasOwnProperty.call(arguments[i], attr) && typeof result[attr] === "undefined") {
            result[attr] = arguments[i][attr];
          }
        }
      }
      return result;
    };
    exports2.prepareContent = function(name, inputData, isBinary, isOptimizedBinaryString, isBase64) {
      var promise = external.Promise.resolve(inputData).then(function(data) {
        var isBlob = support.blob && (data instanceof Blob || ["[object File]", "[object Blob]"].indexOf(Object.prototype.toString.call(data)) !== -1);
        if (isBlob && typeof FileReader !== "undefined") {
          return new external.Promise(function(resolve, reject) {
            var reader = new FileReader();
            reader.onload = function(e) {
              resolve(e.target.result);
            };
            reader.onerror = function(e) {
              reject(e.target.error);
            };
            reader.readAsArrayBuffer(data);
          });
        } else {
          return data;
        }
      });
      return promise.then(function(data) {
        var dataType = exports2.getTypeOf(data);
        if (!dataType) {
          return external.Promise.reject(
            new Error("Can't read the data of '" + name + "'. Is it in a supported JavaScript type (String, Blob, ArrayBuffer, etc) ?")
          );
        }
        if (dataType === "arraybuffer") {
          data = exports2.transformTo("uint8array", data);
        } else if (dataType === "string") {
          if (isBase64) {
            data = base64.decode(data);
          } else if (isBinary) {
            if (isOptimizedBinaryString !== true) {
              data = string2binary(data);
            }
          }
        }
        return data;
      });
    };
  }
});

// node_modules/jszip/lib/stream/GenericWorker.js
var require_GenericWorker = __commonJS({
  "node_modules/jszip/lib/stream/GenericWorker.js"(exports2, module2) {
    "use strict";
    function GenericWorker(name) {
      this.name = name || "default";
      this.streamInfo = {};
      this.generatedError = null;
      this.extraStreamInfo = {};
      this.isPaused = true;
      this.isFinished = false;
      this.isLocked = false;
      this._listeners = {
        "data": [],
        "end": [],
        "error": []
      };
      this.previous = null;
    }
    GenericWorker.prototype = {
      /**
       * Push a chunk to the next workers.
       * @param {Object} chunk the chunk to push
       */
      push: function(chunk) {
        this.emit("data", chunk);
      },
      /**
       * End the stream.
       * @return {Boolean} true if this call ended the worker, false otherwise.
       */
      end: function() {
        if (this.isFinished) {
          return false;
        }
        this.flush();
        try {
          this.emit("end");
          this.cleanUp();
          this.isFinished = true;
        } catch (e) {
          this.emit("error", e);
        }
        return true;
      },
      /**
       * End the stream with an error.
       * @param {Error} e the error which caused the premature end.
       * @return {Boolean} true if this call ended the worker with an error, false otherwise.
       */
      error: function(e) {
        if (this.isFinished) {
          return false;
        }
        if (this.isPaused) {
          this.generatedError = e;
        } else {
          this.isFinished = true;
          this.emit("error", e);
          if (this.previous) {
            this.previous.error(e);
          }
          this.cleanUp();
        }
        return true;
      },
      /**
       * Add a callback on an event.
       * @param {String} name the name of the event (data, end, error)
       * @param {Function} listener the function to call when the event is triggered
       * @return {GenericWorker} the current object for chainability
       */
      on: function(name, listener) {
        this._listeners[name].push(listener);
        return this;
      },
      /**
       * Clean any references when a worker is ending.
       */
      cleanUp: function() {
        this.streamInfo = this.generatedError = this.extraStreamInfo = null;
        this._listeners = [];
      },
      /**
       * Trigger an event. This will call registered callback with the provided arg.
       * @param {String} name the name of the event (data, end, error)
       * @param {Object} arg the argument to call the callback with.
       */
      emit: function(name, arg) {
        if (this._listeners[name]) {
          for (var i = 0; i < this._listeners[name].length; i++) {
            this._listeners[name][i].call(this, arg);
          }
        }
      },
      /**
       * Chain a worker with an other.
       * @param {Worker} next the worker receiving events from the current one.
       * @return {worker} the next worker for chainability
       */
      pipe: function(next) {
        return next.registerPrevious(this);
      },
      /**
       * Same as `pipe` in the other direction.
       * Using an API with `pipe(next)` is very easy.
       * Implementing the API with the point of view of the next one registering
       * a source is easier, see the ZipFileWorker.
       * @param {Worker} previous the previous worker, sending events to this one
       * @return {Worker} the current worker for chainability
       */
      registerPrevious: function(previous) {
        if (this.isLocked) {
          throw new Error("The stream '" + this + "' has already been used.");
        }
        this.streamInfo = previous.streamInfo;
        this.mergeStreamInfo();
        this.previous = previous;
        var self2 = this;
        previous.on("data", function(chunk) {
          self2.processChunk(chunk);
        });
        previous.on("end", function() {
          self2.end();
        });
        previous.on("error", function(e) {
          self2.error(e);
        });
        return this;
      },
      /**
       * Pause the stream so it doesn't send events anymore.
       * @return {Boolean} true if this call paused the worker, false otherwise.
       */
      pause: function() {
        if (this.isPaused || this.isFinished) {
          return false;
        }
        this.isPaused = true;
        if (this.previous) {
          this.previous.pause();
        }
        return true;
      },
      /**
       * Resume a paused stream.
       * @return {Boolean} true if this call resumed the worker, false otherwise.
       */
      resume: function() {
        if (!this.isPaused || this.isFinished) {
          return false;
        }
        this.isPaused = false;
        var withError = false;
        if (this.generatedError) {
          this.error(this.generatedError);
          withError = true;
        }
        if (this.previous) {
          this.previous.resume();
        }
        return !withError;
      },
      /**
       * Flush any remaining bytes as the stream is ending.
       */
      flush: function() {
      },
      /**
       * Process a chunk. This is usually the method overridden.
       * @param {Object} chunk the chunk to process.
       */
      processChunk: function(chunk) {
        this.push(chunk);
      },
      /**
       * Add a key/value to be added in the workers chain streamInfo once activated.
       * @param {String} key the key to use
       * @param {Object} value the associated value
       * @return {Worker} the current worker for chainability
       */
      withStreamInfo: function(key, value) {
        this.extraStreamInfo[key] = value;
        this.mergeStreamInfo();
        return this;
      },
      /**
       * Merge this worker's streamInfo into the chain's streamInfo.
       */
      mergeStreamInfo: function() {
        for (var key in this.extraStreamInfo) {
          if (!Object.prototype.hasOwnProperty.call(this.extraStreamInfo, key)) {
            continue;
          }
          this.streamInfo[key] = this.extraStreamInfo[key];
        }
      },
      /**
       * Lock the stream to prevent further updates on the workers chain.
       * After calling this method, all calls to pipe will fail.
       */
      lock: function() {
        if (this.isLocked) {
          throw new Error("The stream '" + this + "' has already been used.");
        }
        this.isLocked = true;
        if (this.previous) {
          this.previous.lock();
        }
      },
      /**
       *
       * Pretty print the workers chain.
       */
      toString: function() {
        var me = "Worker " + this.name;
        if (this.previous) {
          return this.previous + " -> " + me;
        } else {
          return me;
        }
      }
    };
    module2.exports = GenericWorker;
  }
});

// node_modules/jszip/lib/utf8.js
var require_utf8 = __commonJS({
  "node_modules/jszip/lib/utf8.js"(exports2) {
    "use strict";
    var utils = require_utils();
    var support = require_support();
    var nodejsUtils = require_nodejsUtils();
    var GenericWorker = require_GenericWorker();
    var _utf8len2 = new Array(256);
    for (i = 0; i < 256; i++) {
      _utf8len2[i] = i >= 252 ? 6 : i >= 248 ? 5 : i >= 240 ? 4 : i >= 224 ? 3 : i >= 192 ? 2 : 1;
    }
    var i;
    _utf8len2[254] = _utf8len2[254] = 1;
    var string2buf2 = function(str) {
      var buf, c, c2, m_pos, i2, str_len = str.length, buf_len = 0;
      for (m_pos = 0; m_pos < str_len; m_pos++) {
        c = str.charCodeAt(m_pos);
        if ((c & 64512) === 55296 && m_pos + 1 < str_len) {
          c2 = str.charCodeAt(m_pos + 1);
          if ((c2 & 64512) === 56320) {
            c = 65536 + (c - 55296 << 10) + (c2 - 56320);
            m_pos++;
          }
        }
        buf_len += c < 128 ? 1 : c < 2048 ? 2 : c < 65536 ? 3 : 4;
      }
      if (support.uint8array) {
        buf = new Uint8Array(buf_len);
      } else {
        buf = new Array(buf_len);
      }
      for (i2 = 0, m_pos = 0; i2 < buf_len; m_pos++) {
        c = str.charCodeAt(m_pos);
        if ((c & 64512) === 55296 && m_pos + 1 < str_len) {
          c2 = str.charCodeAt(m_pos + 1);
          if ((c2 & 64512) === 56320) {
            c = 65536 + (c - 55296 << 10) + (c2 - 56320);
            m_pos++;
          }
        }
        if (c < 128) {
          buf[i2++] = c;
        } else if (c < 2048) {
          buf[i2++] = 192 | c >>> 6;
          buf[i2++] = 128 | c & 63;
        } else if (c < 65536) {
          buf[i2++] = 224 | c >>> 12;
          buf[i2++] = 128 | c >>> 6 & 63;
          buf[i2++] = 128 | c & 63;
        } else {
          buf[i2++] = 240 | c >>> 18;
          buf[i2++] = 128 | c >>> 12 & 63;
          buf[i2++] = 128 | c >>> 6 & 63;
          buf[i2++] = 128 | c & 63;
        }
      }
      return buf;
    };
    var utf8border2 = function(buf, max) {
      var pos;
      max = max || buf.length;
      if (max > buf.length) {
        max = buf.length;
      }
      pos = max - 1;
      while (pos >= 0 && (buf[pos] & 192) === 128) {
        pos--;
      }
      if (pos < 0) {
        return max;
      }
      if (pos === 0) {
        return max;
      }
      return pos + _utf8len2[buf[pos]] > max ? pos : max;
    };
    var buf2string2 = function(buf) {
      var i2, out, c, c_len;
      var len = buf.length;
      var utf16buf = new Array(len * 2);
      for (out = 0, i2 = 0; i2 < len; ) {
        c = buf[i2++];
        if (c < 128) {
          utf16buf[out++] = c;
          continue;
        }
        c_len = _utf8len2[c];
        if (c_len > 4) {
          utf16buf[out++] = 65533;
          i2 += c_len - 1;
          continue;
        }
        c &= c_len === 2 ? 31 : c_len === 3 ? 15 : 7;
        while (c_len > 1 && i2 < len) {
          c = c << 6 | buf[i2++] & 63;
          c_len--;
        }
        if (c_len > 1) {
          utf16buf[out++] = 65533;
          continue;
        }
        if (c < 65536) {
          utf16buf[out++] = c;
        } else {
          c -= 65536;
          utf16buf[out++] = 55296 | c >> 10 & 1023;
          utf16buf[out++] = 56320 | c & 1023;
        }
      }
      if (utf16buf.length !== out) {
        if (utf16buf.subarray) {
          utf16buf = utf16buf.subarray(0, out);
        } else {
          utf16buf.length = out;
        }
      }
      return utils.applyFromCharCode(utf16buf);
    };
    exports2.utf8encode = function utf8encode(str) {
      if (support.nodebuffer) {
        return nodejsUtils.newBufferFrom(str, "utf-8");
      }
      return string2buf2(str);
    };
    exports2.utf8decode = function utf8decode(buf) {
      if (support.nodebuffer) {
        return utils.transformTo("nodebuffer", buf).toString("utf-8");
      }
      buf = utils.transformTo(support.uint8array ? "uint8array" : "array", buf);
      return buf2string2(buf);
    };
    function Utf8DecodeWorker() {
      GenericWorker.call(this, "utf-8 decode");
      this.leftOver = null;
    }
    utils.inherits(Utf8DecodeWorker, GenericWorker);
    Utf8DecodeWorker.prototype.processChunk = function(chunk) {
      var data = utils.transformTo(support.uint8array ? "uint8array" : "array", chunk.data);
      if (this.leftOver && this.leftOver.length) {
        if (support.uint8array) {
          var previousData = data;
          data = new Uint8Array(previousData.length + this.leftOver.length);
          data.set(this.leftOver, 0);
          data.set(previousData, this.leftOver.length);
        } else {
          data = this.leftOver.concat(data);
        }
        this.leftOver = null;
      }
      var nextBoundary = utf8border2(data);
      var usableData = data;
      if (nextBoundary !== data.length) {
        if (support.uint8array) {
          usableData = data.subarray(0, nextBoundary);
          this.leftOver = data.subarray(nextBoundary, data.length);
        } else {
          usableData = data.slice(0, nextBoundary);
          this.leftOver = data.slice(nextBoundary, data.length);
        }
      }
      this.push({
        data: exports2.utf8decode(usableData),
        meta: chunk.meta
      });
    };
    Utf8DecodeWorker.prototype.flush = function() {
      if (this.leftOver && this.leftOver.length) {
        this.push({
          data: exports2.utf8decode(this.leftOver),
          meta: {}
        });
        this.leftOver = null;
      }
    };
    exports2.Utf8DecodeWorker = Utf8DecodeWorker;
    function Utf8EncodeWorker() {
      GenericWorker.call(this, "utf-8 encode");
    }
    utils.inherits(Utf8EncodeWorker, GenericWorker);
    Utf8EncodeWorker.prototype.processChunk = function(chunk) {
      this.push({
        data: exports2.utf8encode(chunk.data),
        meta: chunk.meta
      });
    };
    exports2.Utf8EncodeWorker = Utf8EncodeWorker;
  }
});

// node_modules/jszip/lib/stream/ConvertWorker.js
var require_ConvertWorker = __commonJS({
  "node_modules/jszip/lib/stream/ConvertWorker.js"(exports2, module2) {
    "use strict";
    var GenericWorker = require_GenericWorker();
    var utils = require_utils();
    function ConvertWorker(destType) {
      GenericWorker.call(this, "ConvertWorker to " + destType);
      this.destType = destType;
    }
    utils.inherits(ConvertWorker, GenericWorker);
    ConvertWorker.prototype.processChunk = function(chunk) {
      this.push({
        data: utils.transformTo(this.destType, chunk.data),
        meta: chunk.meta
      });
    };
    module2.exports = ConvertWorker;
  }
});

// node_modules/jszip/lib/nodejs/NodejsStreamOutputAdapter.js
var require_NodejsStreamOutputAdapter = __commonJS({
  "node_modules/jszip/lib/nodejs/NodejsStreamOutputAdapter.js"(exports2, module2) {
    "use strict";
    var Readable = require_readable().Readable;
    var utils = require_utils();
    utils.inherits(NodejsStreamOutputAdapter, Readable);
    function NodejsStreamOutputAdapter(helper, options, updateCb) {
      Readable.call(this, options);
      this._helper = helper;
      var self2 = this;
      helper.on("data", function(data, meta) {
        if (!self2.push(data)) {
          self2._helper.pause();
        }
        if (updateCb) {
          updateCb(meta);
        }
      }).on("error", function(e) {
        self2.emit("error", e);
      }).on("end", function() {
        self2.push(null);
      });
    }
    NodejsStreamOutputAdapter.prototype._read = function() {
      this._helper.resume();
    };
    module2.exports = NodejsStreamOutputAdapter;
  }
});

// node_modules/jszip/lib/stream/StreamHelper.js
var require_StreamHelper = __commonJS({
  "node_modules/jszip/lib/stream/StreamHelper.js"(exports2, module2) {
    "use strict";
    var utils = require_utils();
    var ConvertWorker = require_ConvertWorker();
    var GenericWorker = require_GenericWorker();
    var base64 = require_base64();
    var support = require_support();
    var external = require_external();
    var NodejsStreamOutputAdapter = null;
    if (support.nodestream) {
      try {
        NodejsStreamOutputAdapter = require_NodejsStreamOutputAdapter();
      } catch (e) {
      }
    }
    function transformZipOutput(type, content, mimeType) {
      switch (type) {
        case "blob":
          return utils.newBlob(utils.transformTo("arraybuffer", content), mimeType);
        case "base64":
          return base64.encode(content);
        default:
          return utils.transformTo(type, content);
      }
    }
    function concat(type, dataArray) {
      var i, index = 0, res = null, totalLength = 0;
      for (i = 0; i < dataArray.length; i++) {
        totalLength += dataArray[i].length;
      }
      switch (type) {
        case "string":
          return dataArray.join("");
        case "array":
          return Array.prototype.concat.apply([], dataArray);
        case "uint8array":
          res = new Uint8Array(totalLength);
          for (i = 0; i < dataArray.length; i++) {
            res.set(dataArray[i], index);
            index += dataArray[i].length;
          }
          return res;
        case "nodebuffer":
          return Buffer.concat(dataArray);
        default:
          throw new Error("concat : unsupported type '" + type + "'");
      }
    }
    function accumulate(helper, updateCallback) {
      return new external.Promise(function(resolve, reject) {
        var dataArray = [];
        var chunkType = helper._internalType, resultType = helper._outputType, mimeType = helper._mimeType;
        helper.on("data", function(data, meta) {
          dataArray.push(data);
          if (updateCallback) {
            updateCallback(meta);
          }
        }).on("error", function(err2) {
          dataArray = [];
          reject(err2);
        }).on("end", function() {
          try {
            var result = transformZipOutput(resultType, concat(chunkType, dataArray), mimeType);
            resolve(result);
          } catch (e) {
            reject(e);
          }
          dataArray = [];
        }).resume();
      });
    }
    function StreamHelper(worker, outputType, mimeType) {
      var internalType = outputType;
      switch (outputType) {
        case "blob":
        case "arraybuffer":
          internalType = "uint8array";
          break;
        case "base64":
          internalType = "string";
          break;
      }
      try {
        this._internalType = internalType;
        this._outputType = outputType;
        this._mimeType = mimeType;
        utils.checkSupport(internalType);
        this._worker = worker.pipe(new ConvertWorker(internalType));
        worker.lock();
      } catch (e) {
        this._worker = new GenericWorker("error");
        this._worker.error(e);
      }
    }
    StreamHelper.prototype = {
      /**
       * Listen a StreamHelper, accumulate its content and concatenate it into a
       * complete block.
       * @param {Function} updateCb the update callback.
       * @return Promise the promise for the accumulation.
       */
      accumulate: function(updateCb) {
        return accumulate(this, updateCb);
      },
      /**
       * Add a listener on an event triggered on a stream.
       * @param {String} evt the name of the event
       * @param {Function} fn the listener
       * @return {StreamHelper} the current helper.
       */
      on: function(evt, fn) {
        var self2 = this;
        if (evt === "data") {
          this._worker.on(evt, function(chunk) {
            fn.call(self2, chunk.data, chunk.meta);
          });
        } else {
          this._worker.on(evt, function() {
            utils.delay(fn, arguments, self2);
          });
        }
        return this;
      },
      /**
       * Resume the flow of chunks.
       * @return {StreamHelper} the current helper.
       */
      resume: function() {
        utils.delay(this._worker.resume, [], this._worker);
        return this;
      },
      /**
       * Pause the flow of chunks.
       * @return {StreamHelper} the current helper.
       */
      pause: function() {
        this._worker.pause();
        return this;
      },
      /**
       * Return a nodejs stream for this helper.
       * @param {Function} updateCb the update callback.
       * @return {NodejsStreamOutputAdapter} the nodejs stream.
       */
      toNodejsStream: function(updateCb) {
        utils.checkSupport("nodestream");
        if (this._outputType !== "nodebuffer") {
          throw new Error(this._outputType + " is not supported by this method");
        }
        return new NodejsStreamOutputAdapter(this, {
          objectMode: this._outputType !== "nodebuffer"
        }, updateCb);
      }
    };
    module2.exports = StreamHelper;
  }
});

// node_modules/jszip/lib/defaults.js
var require_defaults = __commonJS({
  "node_modules/jszip/lib/defaults.js"(exports2) {
    "use strict";
    exports2.base64 = false;
    exports2.binary = false;
    exports2.dir = false;
    exports2.createFolders = true;
    exports2.date = null;
    exports2.compression = null;
    exports2.compressionOptions = null;
    exports2.comment = null;
    exports2.unixPermissions = null;
    exports2.dosPermissions = null;
  }
});

// node_modules/jszip/lib/stream/DataWorker.js
var require_DataWorker = __commonJS({
  "node_modules/jszip/lib/stream/DataWorker.js"(exports2, module2) {
    "use strict";
    var utils = require_utils();
    var GenericWorker = require_GenericWorker();
    var DEFAULT_BLOCK_SIZE = 16 * 1024;
    function DataWorker(dataP) {
      GenericWorker.call(this, "DataWorker");
      var self2 = this;
      this.dataIsReady = false;
      this.index = 0;
      this.max = 0;
      this.data = null;
      this.type = "";
      this._tickScheduled = false;
      dataP.then(function(data) {
        self2.dataIsReady = true;
        self2.data = data;
        self2.max = data && data.length || 0;
        self2.type = utils.getTypeOf(data);
        if (!self2.isPaused) {
          self2._tickAndRepeat();
        }
      }, function(e) {
        self2.error(e);
      });
    }
    utils.inherits(DataWorker, GenericWorker);
    DataWorker.prototype.cleanUp = function() {
      GenericWorker.prototype.cleanUp.call(this);
      this.data = null;
    };
    DataWorker.prototype.resume = function() {
      if (!GenericWorker.prototype.resume.call(this)) {
        return false;
      }
      if (!this._tickScheduled && this.dataIsReady) {
        this._tickScheduled = true;
        utils.delay(this._tickAndRepeat, [], this);
      }
      return true;
    };
    DataWorker.prototype._tickAndRepeat = function() {
      this._tickScheduled = false;
      if (this.isPaused || this.isFinished) {
        return;
      }
      this._tick();
      if (!this.isFinished) {
        utils.delay(this._tickAndRepeat, [], this);
        this._tickScheduled = true;
      }
    };
    DataWorker.prototype._tick = function() {
      if (this.isPaused || this.isFinished) {
        return false;
      }
      var size = DEFAULT_BLOCK_SIZE;
      var data = null, nextIndex = Math.min(this.max, this.index + size);
      if (this.index >= this.max) {
        return this.end();
      } else {
        switch (this.type) {
          case "string":
            data = this.data.substring(this.index, nextIndex);
            break;
          case "uint8array":
            data = this.data.subarray(this.index, nextIndex);
            break;
          case "array":
          case "nodebuffer":
            data = this.data.slice(this.index, nextIndex);
            break;
        }
        this.index = nextIndex;
        return this.push({
          data,
          meta: {
            percent: this.max ? this.index / this.max * 100 : 0
          }
        });
      }
    };
    module2.exports = DataWorker;
  }
});

// node_modules/jszip/lib/crc32.js
var require_crc32 = __commonJS({
  "node_modules/jszip/lib/crc32.js"(exports2, module2) {
    "use strict";
    var utils = require_utils();
    function makeTable2() {
      var c, table = [];
      for (var n = 0; n < 256; n++) {
        c = n;
        for (var k = 0; k < 8; k++) {
          c = c & 1 ? 3988292384 ^ c >>> 1 : c >>> 1;
        }
        table[n] = c;
      }
      return table;
    }
    var crcTable2 = makeTable2();
    function crc322(crc, buf, len, pos) {
      var t = crcTable2, end = pos + len;
      crc = crc ^ -1;
      for (var i = pos; i < end; i++) {
        crc = crc >>> 8 ^ t[(crc ^ buf[i]) & 255];
      }
      return crc ^ -1;
    }
    function crc32str(crc, str, len, pos) {
      var t = crcTable2, end = pos + len;
      crc = crc ^ -1;
      for (var i = pos; i < end; i++) {
        crc = crc >>> 8 ^ t[(crc ^ str.charCodeAt(i)) & 255];
      }
      return crc ^ -1;
    }
    module2.exports = function crc32wrapper(input, crc) {
      if (typeof input === "undefined" || !input.length) {
        return 0;
      }
      var isArray = utils.getTypeOf(input) !== "string";
      if (isArray) {
        return crc322(crc | 0, input, input.length, 0);
      } else {
        return crc32str(crc | 0, input, input.length, 0);
      }
    };
  }
});

// node_modules/jszip/lib/stream/Crc32Probe.js
var require_Crc32Probe = __commonJS({
  "node_modules/jszip/lib/stream/Crc32Probe.js"(exports2, module2) {
    "use strict";
    var GenericWorker = require_GenericWorker();
    var crc322 = require_crc32();
    var utils = require_utils();
    function Crc32Probe() {
      GenericWorker.call(this, "Crc32Probe");
      this.withStreamInfo("crc32", 0);
    }
    utils.inherits(Crc32Probe, GenericWorker);
    Crc32Probe.prototype.processChunk = function(chunk) {
      this.streamInfo.crc32 = crc322(chunk.data, this.streamInfo.crc32 || 0);
      this.push(chunk);
    };
    module2.exports = Crc32Probe;
  }
});

// node_modules/jszip/lib/stream/DataLengthProbe.js
var require_DataLengthProbe = __commonJS({
  "node_modules/jszip/lib/stream/DataLengthProbe.js"(exports2, module2) {
    "use strict";
    var utils = require_utils();
    var GenericWorker = require_GenericWorker();
    function DataLengthProbe(propName) {
      GenericWorker.call(this, "DataLengthProbe for " + propName);
      this.propName = propName;
      this.withStreamInfo(propName, 0);
    }
    utils.inherits(DataLengthProbe, GenericWorker);
    DataLengthProbe.prototype.processChunk = function(chunk) {
      if (chunk) {
        var length = this.streamInfo[this.propName] || 0;
        this.streamInfo[this.propName] = length + chunk.data.length;
      }
      GenericWorker.prototype.processChunk.call(this, chunk);
    };
    module2.exports = DataLengthProbe;
  }
});

// node_modules/jszip/lib/compressedObject.js
var require_compressedObject = __commonJS({
  "node_modules/jszip/lib/compressedObject.js"(exports2, module2) {
    "use strict";
    var external = require_external();
    var DataWorker = require_DataWorker();
    var Crc32Probe = require_Crc32Probe();
    var DataLengthProbe = require_DataLengthProbe();
    function CompressedObject(compressedSize, uncompressedSize, crc322, compression, data) {
      this.compressedSize = compressedSize;
      this.uncompressedSize = uncompressedSize;
      this.crc32 = crc322;
      this.compression = compression;
      this.compressedContent = data;
    }
    CompressedObject.prototype = {
      /**
       * Create a worker to get the uncompressed content.
       * @return {GenericWorker} the worker.
       */
      getContentWorker: function() {
        var worker = new DataWorker(external.Promise.resolve(this.compressedContent)).pipe(this.compression.uncompressWorker()).pipe(new DataLengthProbe("data_length"));
        var that = this;
        worker.on("end", function() {
          if (this.streamInfo["data_length"] !== that.uncompressedSize) {
            throw new Error("Bug : uncompressed data size mismatch");
          }
        });
        return worker;
      },
      /**
       * Create a worker to get the compressed content.
       * @return {GenericWorker} the worker.
       */
      getCompressedWorker: function() {
        return new DataWorker(external.Promise.resolve(this.compressedContent)).withStreamInfo("compressedSize", this.compressedSize).withStreamInfo("uncompressedSize", this.uncompressedSize).withStreamInfo("crc32", this.crc32).withStreamInfo("compression", this.compression);
      }
    };
    CompressedObject.createWorkerFrom = function(uncompressedWorker, compression, compressionOptions) {
      return uncompressedWorker.pipe(new Crc32Probe()).pipe(new DataLengthProbe("uncompressedSize")).pipe(compression.compressWorker(compressionOptions)).pipe(new DataLengthProbe("compressedSize")).withStreamInfo("compression", compression);
    };
    module2.exports = CompressedObject;
  }
});

// node_modules/jszip/lib/zipObject.js
var require_zipObject = __commonJS({
  "node_modules/jszip/lib/zipObject.js"(exports2, module2) {
    "use strict";
    var StreamHelper = require_StreamHelper();
    var DataWorker = require_DataWorker();
    var utf8 = require_utf8();
    var CompressedObject = require_compressedObject();
    var GenericWorker = require_GenericWorker();
    var ZipObject = function(name, data, options) {
      this.name = name;
      this.dir = options.dir;
      this.date = options.date;
      this.comment = options.comment;
      this.unixPermissions = options.unixPermissions;
      this.dosPermissions = options.dosPermissions;
      this._data = data;
      this._dataBinary = options.binary;
      this.options = {
        compression: options.compression,
        compressionOptions: options.compressionOptions
      };
    };
    ZipObject.prototype = {
      /**
       * Create an internal stream for the content of this object.
       * @param {String} type the type of each chunk.
       * @return StreamHelper the stream.
       */
      internalStream: function(type) {
        var result = null, outputType = "string";
        try {
          if (!type) {
            throw new Error("No output type specified.");
          }
          outputType = type.toLowerCase();
          var askUnicodeString = outputType === "string" || outputType === "text";
          if (outputType === "binarystring" || outputType === "text") {
            outputType = "string";
          }
          result = this._decompressWorker();
          var isUnicodeString = !this._dataBinary;
          if (isUnicodeString && !askUnicodeString) {
            result = result.pipe(new utf8.Utf8EncodeWorker());
          }
          if (!isUnicodeString && askUnicodeString) {
            result = result.pipe(new utf8.Utf8DecodeWorker());
          }
        } catch (e) {
          result = new GenericWorker("error");
          result.error(e);
        }
        return new StreamHelper(result, outputType, "");
      },
      /**
       * Prepare the content in the asked type.
       * @param {String} type the type of the result.
       * @param {Function} onUpdate a function to call on each internal update.
       * @return Promise the promise of the result.
       */
      async: function(type, onUpdate) {
        return this.internalStream(type).accumulate(onUpdate);
      },
      /**
       * Prepare the content as a nodejs stream.
       * @param {String} type the type of each chunk.
       * @param {Function} onUpdate a function to call on each internal update.
       * @return Stream the stream.
       */
      nodeStream: function(type, onUpdate) {
        return this.internalStream(type || "nodebuffer").toNodejsStream(onUpdate);
      },
      /**
       * Return a worker for the compressed content.
       * @private
       * @param {Object} compression the compression object to use.
       * @param {Object} compressionOptions the options to use when compressing.
       * @return Worker the worker.
       */
      _compressWorker: function(compression, compressionOptions) {
        if (this._data instanceof CompressedObject && this._data.compression.magic === compression.magic) {
          return this._data.getCompressedWorker();
        } else {
          var result = this._decompressWorker();
          if (!this._dataBinary) {
            result = result.pipe(new utf8.Utf8EncodeWorker());
          }
          return CompressedObject.createWorkerFrom(result, compression, compressionOptions);
        }
      },
      /**
       * Return a worker for the decompressed content.
       * @private
       * @return Worker the worker.
       */
      _decompressWorker: function() {
        if (this._data instanceof CompressedObject) {
          return this._data.getContentWorker();
        } else if (this._data instanceof GenericWorker) {
          return this._data;
        } else {
          return new DataWorker(this._data);
        }
      }
    };
    var removedMethods = ["asText", "asBinary", "asNodeBuffer", "asUint8Array", "asArrayBuffer"];
    var removedFn = function() {
      throw new Error("This method has been removed in JSZip 3.0, please check the upgrade guide.");
    };
    for (i = 0; i < removedMethods.length; i++) {
      ZipObject.prototype[removedMethods[i]] = removedFn;
    }
    var i;
    module2.exports = ZipObject;
  }
});

// node_modules/jszip/node_modules/pako/lib/utils/common.js
var require_common = __commonJS({
  "node_modules/jszip/node_modules/pako/lib/utils/common.js"(exports2) {
    "use strict";
    var TYPED_OK = typeof Uint8Array !== "undefined" && typeof Uint16Array !== "undefined" && typeof Int32Array !== "undefined";
    function _has2(obj, key) {
      return Object.prototype.hasOwnProperty.call(obj, key);
    }
    exports2.assign = function(obj) {
      var sources = Array.prototype.slice.call(arguments, 1);
      while (sources.length) {
        var source = sources.shift();
        if (!source) {
          continue;
        }
        if (typeof source !== "object") {
          throw new TypeError(source + "must be non-object");
        }
        for (var p in source) {
          if (_has2(source, p)) {
            obj[p] = source[p];
          }
        }
      }
      return obj;
    };
    exports2.shrinkBuf = function(buf, size) {
      if (buf.length === size) {
        return buf;
      }
      if (buf.subarray) {
        return buf.subarray(0, size);
      }
      buf.length = size;
      return buf;
    };
    var fnTyped = {
      arraySet: function(dest, src, src_offs, len, dest_offs) {
        if (src.subarray && dest.subarray) {
          dest.set(src.subarray(src_offs, src_offs + len), dest_offs);
          return;
        }
        for (var i = 0; i < len; i++) {
          dest[dest_offs + i] = src[src_offs + i];
        }
      },
      // Join array of chunks to single array.
      flattenChunks: function(chunks) {
        var i, l, len, pos, chunk, result;
        len = 0;
        for (i = 0, l = chunks.length; i < l; i++) {
          len += chunks[i].length;
        }
        result = new Uint8Array(len);
        pos = 0;
        for (i = 0, l = chunks.length; i < l; i++) {
          chunk = chunks[i];
          result.set(chunk, pos);
          pos += chunk.length;
        }
        return result;
      }
    };
    var fnUntyped = {
      arraySet: function(dest, src, src_offs, len, dest_offs) {
        for (var i = 0; i < len; i++) {
          dest[dest_offs + i] = src[src_offs + i];
        }
      },
      // Join array of chunks to single array.
      flattenChunks: function(chunks) {
        return [].concat.apply([], chunks);
      }
    };
    exports2.setTyped = function(on) {
      if (on) {
        exports2.Buf8 = Uint8Array;
        exports2.Buf16 = Uint16Array;
        exports2.Buf32 = Int32Array;
        exports2.assign(exports2, fnTyped);
      } else {
        exports2.Buf8 = Array;
        exports2.Buf16 = Array;
        exports2.Buf32 = Array;
        exports2.assign(exports2, fnUntyped);
      }
    };
    exports2.setTyped(TYPED_OK);
  }
});

// node_modules/jszip/node_modules/pako/lib/zlib/trees.js
var require_trees = __commonJS({
  "node_modules/jszip/node_modules/pako/lib/zlib/trees.js"(exports2) {
    "use strict";
    var utils = require_common();
    var Z_FIXED2 = 4;
    var Z_BINARY2 = 0;
    var Z_TEXT2 = 1;
    var Z_UNKNOWN2 = 2;
    function zero2(buf) {
      var len = buf.length;
      while (--len >= 0) {
        buf[len] = 0;
      }
    }
    var STORED_BLOCK2 = 0;
    var STATIC_TREES2 = 1;
    var DYN_TREES2 = 2;
    var MIN_MATCH2 = 3;
    var MAX_MATCH2 = 258;
    var LENGTH_CODES2 = 29;
    var LITERALS2 = 256;
    var L_CODES2 = LITERALS2 + 1 + LENGTH_CODES2;
    var D_CODES2 = 30;
    var BL_CODES2 = 19;
    var HEAP_SIZE2 = 2 * L_CODES2 + 1;
    var MAX_BITS2 = 15;
    var Buf_size2 = 16;
    var MAX_BL_BITS2 = 7;
    var END_BLOCK2 = 256;
    var REP_3_62 = 16;
    var REPZ_3_102 = 17;
    var REPZ_11_1382 = 18;
    var extra_lbits2 = (
      /* extra bits for each length code */
      [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 0]
    );
    var extra_dbits2 = (
      /* extra bits for each distance code */
      [0, 0, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12, 13, 13]
    );
    var extra_blbits2 = (
      /* extra bits for each bit length code */
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 3, 7]
    );
    var bl_order2 = [16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15];
    var DIST_CODE_LEN2 = 512;
    var static_ltree2 = new Array((L_CODES2 + 2) * 2);
    zero2(static_ltree2);
    var static_dtree2 = new Array(D_CODES2 * 2);
    zero2(static_dtree2);
    var _dist_code2 = new Array(DIST_CODE_LEN2);
    zero2(_dist_code2);
    var _length_code2 = new Array(MAX_MATCH2 - MIN_MATCH2 + 1);
    zero2(_length_code2);
    var base_length2 = new Array(LENGTH_CODES2);
    zero2(base_length2);
    var base_dist2 = new Array(D_CODES2);
    zero2(base_dist2);
    function StaticTreeDesc2(static_tree, extra_bits, extra_base, elems, max_length) {
      this.static_tree = static_tree;
      this.extra_bits = extra_bits;
      this.extra_base = extra_base;
      this.elems = elems;
      this.max_length = max_length;
      this.has_stree = static_tree && static_tree.length;
    }
    var static_l_desc2;
    var static_d_desc2;
    var static_bl_desc2;
    function TreeDesc2(dyn_tree, stat_desc) {
      this.dyn_tree = dyn_tree;
      this.max_code = 0;
      this.stat_desc = stat_desc;
    }
    function d_code2(dist) {
      return dist < 256 ? _dist_code2[dist] : _dist_code2[256 + (dist >>> 7)];
    }
    function put_short2(s, w) {
      s.pending_buf[s.pending++] = w & 255;
      s.pending_buf[s.pending++] = w >>> 8 & 255;
    }
    function send_bits2(s, value, length) {
      if (s.bi_valid > Buf_size2 - length) {
        s.bi_buf |= value << s.bi_valid & 65535;
        put_short2(s, s.bi_buf);
        s.bi_buf = value >> Buf_size2 - s.bi_valid;
        s.bi_valid += length - Buf_size2;
      } else {
        s.bi_buf |= value << s.bi_valid & 65535;
        s.bi_valid += length;
      }
    }
    function send_code2(s, c, tree) {
      send_bits2(
        s,
        tree[c * 2],
        tree[c * 2 + 1]
        /*.Len*/
      );
    }
    function bi_reverse2(code, len) {
      var res = 0;
      do {
        res |= code & 1;
        code >>>= 1;
        res <<= 1;
      } while (--len > 0);
      return res >>> 1;
    }
    function bi_flush2(s) {
      if (s.bi_valid === 16) {
        put_short2(s, s.bi_buf);
        s.bi_buf = 0;
        s.bi_valid = 0;
      } else if (s.bi_valid >= 8) {
        s.pending_buf[s.pending++] = s.bi_buf & 255;
        s.bi_buf >>= 8;
        s.bi_valid -= 8;
      }
    }
    function gen_bitlen2(s, desc) {
      var tree = desc.dyn_tree;
      var max_code = desc.max_code;
      var stree = desc.stat_desc.static_tree;
      var has_stree = desc.stat_desc.has_stree;
      var extra = desc.stat_desc.extra_bits;
      var base = desc.stat_desc.extra_base;
      var max_length = desc.stat_desc.max_length;
      var h;
      var n, m;
      var bits;
      var xbits;
      var f;
      var overflow = 0;
      for (bits = 0; bits <= MAX_BITS2; bits++) {
        s.bl_count[bits] = 0;
      }
      tree[s.heap[s.heap_max] * 2 + 1] = 0;
      for (h = s.heap_max + 1; h < HEAP_SIZE2; h++) {
        n = s.heap[h];
        bits = tree[tree[n * 2 + 1] * 2 + 1] + 1;
        if (bits > max_length) {
          bits = max_length;
          overflow++;
        }
        tree[n * 2 + 1] = bits;
        if (n > max_code) {
          continue;
        }
        s.bl_count[bits]++;
        xbits = 0;
        if (n >= base) {
          xbits = extra[n - base];
        }
        f = tree[n * 2];
        s.opt_len += f * (bits + xbits);
        if (has_stree) {
          s.static_len += f * (stree[n * 2 + 1] + xbits);
        }
      }
      if (overflow === 0) {
        return;
      }
      do {
        bits = max_length - 1;
        while (s.bl_count[bits] === 0) {
          bits--;
        }
        s.bl_count[bits]--;
        s.bl_count[bits + 1] += 2;
        s.bl_count[max_length]--;
        overflow -= 2;
      } while (overflow > 0);
      for (bits = max_length; bits !== 0; bits--) {
        n = s.bl_count[bits];
        while (n !== 0) {
          m = s.heap[--h];
          if (m > max_code) {
            continue;
          }
          if (tree[m * 2 + 1] !== bits) {
            s.opt_len += (bits - tree[m * 2 + 1]) * tree[m * 2];
            tree[m * 2 + 1] = bits;
          }
          n--;
        }
      }
    }
    function gen_codes2(tree, max_code, bl_count) {
      var next_code = new Array(MAX_BITS2 + 1);
      var code = 0;
      var bits;
      var n;
      for (bits = 1; bits <= MAX_BITS2; bits++) {
        next_code[bits] = code = code + bl_count[bits - 1] << 1;
      }
      for (n = 0; n <= max_code; n++) {
        var len = tree[n * 2 + 1];
        if (len === 0) {
          continue;
        }
        tree[n * 2] = bi_reverse2(next_code[len]++, len);
      }
    }
    function tr_static_init2() {
      var n;
      var bits;
      var length;
      var code;
      var dist;
      var bl_count = new Array(MAX_BITS2 + 1);
      length = 0;
      for (code = 0; code < LENGTH_CODES2 - 1; code++) {
        base_length2[code] = length;
        for (n = 0; n < 1 << extra_lbits2[code]; n++) {
          _length_code2[length++] = code;
        }
      }
      _length_code2[length - 1] = code;
      dist = 0;
      for (code = 0; code < 16; code++) {
        base_dist2[code] = dist;
        for (n = 0; n < 1 << extra_dbits2[code]; n++) {
          _dist_code2[dist++] = code;
        }
      }
      dist >>= 7;
      for (; code < D_CODES2; code++) {
        base_dist2[code] = dist << 7;
        for (n = 0; n < 1 << extra_dbits2[code] - 7; n++) {
          _dist_code2[256 + dist++] = code;
        }
      }
      for (bits = 0; bits <= MAX_BITS2; bits++) {
        bl_count[bits] = 0;
      }
      n = 0;
      while (n <= 143) {
        static_ltree2[n * 2 + 1] = 8;
        n++;
        bl_count[8]++;
      }
      while (n <= 255) {
        static_ltree2[n * 2 + 1] = 9;
        n++;
        bl_count[9]++;
      }
      while (n <= 279) {
        static_ltree2[n * 2 + 1] = 7;
        n++;
        bl_count[7]++;
      }
      while (n <= 287) {
        static_ltree2[n * 2 + 1] = 8;
        n++;
        bl_count[8]++;
      }
      gen_codes2(static_ltree2, L_CODES2 + 1, bl_count);
      for (n = 0; n < D_CODES2; n++) {
        static_dtree2[n * 2 + 1] = 5;
        static_dtree2[n * 2] = bi_reverse2(n, 5);
      }
      static_l_desc2 = new StaticTreeDesc2(static_ltree2, extra_lbits2, LITERALS2 + 1, L_CODES2, MAX_BITS2);
      static_d_desc2 = new StaticTreeDesc2(static_dtree2, extra_dbits2, 0, D_CODES2, MAX_BITS2);
      static_bl_desc2 = new StaticTreeDesc2(new Array(0), extra_blbits2, 0, BL_CODES2, MAX_BL_BITS2);
    }
    function init_block2(s) {
      var n;
      for (n = 0; n < L_CODES2; n++) {
        s.dyn_ltree[n * 2] = 0;
      }
      for (n = 0; n < D_CODES2; n++) {
        s.dyn_dtree[n * 2] = 0;
      }
      for (n = 0; n < BL_CODES2; n++) {
        s.bl_tree[n * 2] = 0;
      }
      s.dyn_ltree[END_BLOCK2 * 2] = 1;
      s.opt_len = s.static_len = 0;
      s.last_lit = s.matches = 0;
    }
    function bi_windup2(s) {
      if (s.bi_valid > 8) {
        put_short2(s, s.bi_buf);
      } else if (s.bi_valid > 0) {
        s.pending_buf[s.pending++] = s.bi_buf;
      }
      s.bi_buf = 0;
      s.bi_valid = 0;
    }
    function copy_block(s, buf, len, header) {
      bi_windup2(s);
      if (header) {
        put_short2(s, len);
        put_short2(s, ~len);
      }
      utils.arraySet(s.pending_buf, s.window, buf, len, s.pending);
      s.pending += len;
    }
    function smaller2(tree, n, m, depth) {
      var _n2 = n * 2;
      var _m2 = m * 2;
      return tree[_n2] < tree[_m2] || tree[_n2] === tree[_m2] && depth[n] <= depth[m];
    }
    function pqdownheap2(s, tree, k) {
      var v = s.heap[k];
      var j = k << 1;
      while (j <= s.heap_len) {
        if (j < s.heap_len && smaller2(tree, s.heap[j + 1], s.heap[j], s.depth)) {
          j++;
        }
        if (smaller2(tree, v, s.heap[j], s.depth)) {
          break;
        }
        s.heap[k] = s.heap[j];
        k = j;
        j <<= 1;
      }
      s.heap[k] = v;
    }
    function compress_block2(s, ltree, dtree) {
      var dist;
      var lc;
      var lx = 0;
      var code;
      var extra;
      if (s.last_lit !== 0) {
        do {
          dist = s.pending_buf[s.d_buf + lx * 2] << 8 | s.pending_buf[s.d_buf + lx * 2 + 1];
          lc = s.pending_buf[s.l_buf + lx];
          lx++;
          if (dist === 0) {
            send_code2(s, lc, ltree);
          } else {
            code = _length_code2[lc];
            send_code2(s, code + LITERALS2 + 1, ltree);
            extra = extra_lbits2[code];
            if (extra !== 0) {
              lc -= base_length2[code];
              send_bits2(s, lc, extra);
            }
            dist--;
            code = d_code2(dist);
            send_code2(s, code, dtree);
            extra = extra_dbits2[code];
            if (extra !== 0) {
              dist -= base_dist2[code];
              send_bits2(s, dist, extra);
            }
          }
        } while (lx < s.last_lit);
      }
      send_code2(s, END_BLOCK2, ltree);
    }
    function build_tree2(s, desc) {
      var tree = desc.dyn_tree;
      var stree = desc.stat_desc.static_tree;
      var has_stree = desc.stat_desc.has_stree;
      var elems = desc.stat_desc.elems;
      var n, m;
      var max_code = -1;
      var node;
      s.heap_len = 0;
      s.heap_max = HEAP_SIZE2;
      for (n = 0; n < elems; n++) {
        if (tree[n * 2] !== 0) {
          s.heap[++s.heap_len] = max_code = n;
          s.depth[n] = 0;
        } else {
          tree[n * 2 + 1] = 0;
        }
      }
      while (s.heap_len < 2) {
        node = s.heap[++s.heap_len] = max_code < 2 ? ++max_code : 0;
        tree[node * 2] = 1;
        s.depth[node] = 0;
        s.opt_len--;
        if (has_stree) {
          s.static_len -= stree[node * 2 + 1];
        }
      }
      desc.max_code = max_code;
      for (n = s.heap_len >> 1; n >= 1; n--) {
        pqdownheap2(s, tree, n);
      }
      node = elems;
      do {
        n = s.heap[
          1
          /*SMALLEST*/
        ];
        s.heap[
          1
          /*SMALLEST*/
        ] = s.heap[s.heap_len--];
        pqdownheap2(
          s,
          tree,
          1
          /*SMALLEST*/
        );
        m = s.heap[
          1
          /*SMALLEST*/
        ];
        s.heap[--s.heap_max] = n;
        s.heap[--s.heap_max] = m;
        tree[node * 2] = tree[n * 2] + tree[m * 2];
        s.depth[node] = (s.depth[n] >= s.depth[m] ? s.depth[n] : s.depth[m]) + 1;
        tree[n * 2 + 1] = tree[m * 2 + 1] = node;
        s.heap[
          1
          /*SMALLEST*/
        ] = node++;
        pqdownheap2(
          s,
          tree,
          1
          /*SMALLEST*/
        );
      } while (s.heap_len >= 2);
      s.heap[--s.heap_max] = s.heap[
        1
        /*SMALLEST*/
      ];
      gen_bitlen2(s, desc);
      gen_codes2(tree, max_code, s.bl_count);
    }
    function scan_tree2(s, tree, max_code) {
      var n;
      var prevlen = -1;
      var curlen;
      var nextlen = tree[0 * 2 + 1];
      var count = 0;
      var max_count = 7;
      var min_count = 4;
      if (nextlen === 0) {
        max_count = 138;
        min_count = 3;
      }
      tree[(max_code + 1) * 2 + 1] = 65535;
      for (n = 0; n <= max_code; n++) {
        curlen = nextlen;
        nextlen = tree[(n + 1) * 2 + 1];
        if (++count < max_count && curlen === nextlen) {
          continue;
        } else if (count < min_count) {
          s.bl_tree[curlen * 2] += count;
        } else if (curlen !== 0) {
          if (curlen !== prevlen) {
            s.bl_tree[curlen * 2]++;
          }
          s.bl_tree[REP_3_62 * 2]++;
        } else if (count <= 10) {
          s.bl_tree[REPZ_3_102 * 2]++;
        } else {
          s.bl_tree[REPZ_11_1382 * 2]++;
        }
        count = 0;
        prevlen = curlen;
        if (nextlen === 0) {
          max_count = 138;
          min_count = 3;
        } else if (curlen === nextlen) {
          max_count = 6;
          min_count = 3;
        } else {
          max_count = 7;
          min_count = 4;
        }
      }
    }
    function send_tree2(s, tree, max_code) {
      var n;
      var prevlen = -1;
      var curlen;
      var nextlen = tree[0 * 2 + 1];
      var count = 0;
      var max_count = 7;
      var min_count = 4;
      if (nextlen === 0) {
        max_count = 138;
        min_count = 3;
      }
      for (n = 0; n <= max_code; n++) {
        curlen = nextlen;
        nextlen = tree[(n + 1) * 2 + 1];
        if (++count < max_count && curlen === nextlen) {
          continue;
        } else if (count < min_count) {
          do {
            send_code2(s, curlen, s.bl_tree);
          } while (--count !== 0);
        } else if (curlen !== 0) {
          if (curlen !== prevlen) {
            send_code2(s, curlen, s.bl_tree);
            count--;
          }
          send_code2(s, REP_3_62, s.bl_tree);
          send_bits2(s, count - 3, 2);
        } else if (count <= 10) {
          send_code2(s, REPZ_3_102, s.bl_tree);
          send_bits2(s, count - 3, 3);
        } else {
          send_code2(s, REPZ_11_1382, s.bl_tree);
          send_bits2(s, count - 11, 7);
        }
        count = 0;
        prevlen = curlen;
        if (nextlen === 0) {
          max_count = 138;
          min_count = 3;
        } else if (curlen === nextlen) {
          max_count = 6;
          min_count = 3;
        } else {
          max_count = 7;
          min_count = 4;
        }
      }
    }
    function build_bl_tree2(s) {
      var max_blindex;
      scan_tree2(s, s.dyn_ltree, s.l_desc.max_code);
      scan_tree2(s, s.dyn_dtree, s.d_desc.max_code);
      build_tree2(s, s.bl_desc);
      for (max_blindex = BL_CODES2 - 1; max_blindex >= 3; max_blindex--) {
        if (s.bl_tree[bl_order2[max_blindex] * 2 + 1] !== 0) {
          break;
        }
      }
      s.opt_len += 3 * (max_blindex + 1) + 5 + 5 + 4;
      return max_blindex;
    }
    function send_all_trees2(s, lcodes, dcodes, blcodes) {
      var rank2;
      send_bits2(s, lcodes - 257, 5);
      send_bits2(s, dcodes - 1, 5);
      send_bits2(s, blcodes - 4, 4);
      for (rank2 = 0; rank2 < blcodes; rank2++) {
        send_bits2(s, s.bl_tree[bl_order2[rank2] * 2 + 1], 3);
      }
      send_tree2(s, s.dyn_ltree, lcodes - 1);
      send_tree2(s, s.dyn_dtree, dcodes - 1);
    }
    function detect_data_type2(s) {
      var black_mask = 4093624447;
      var n;
      for (n = 0; n <= 31; n++, black_mask >>>= 1) {
        if (black_mask & 1 && s.dyn_ltree[n * 2] !== 0) {
          return Z_BINARY2;
        }
      }
      if (s.dyn_ltree[9 * 2] !== 0 || s.dyn_ltree[10 * 2] !== 0 || s.dyn_ltree[13 * 2] !== 0) {
        return Z_TEXT2;
      }
      for (n = 32; n < LITERALS2; n++) {
        if (s.dyn_ltree[n * 2] !== 0) {
          return Z_TEXT2;
        }
      }
      return Z_BINARY2;
    }
    var static_init_done2 = false;
    function _tr_init2(s) {
      if (!static_init_done2) {
        tr_static_init2();
        static_init_done2 = true;
      }
      s.l_desc = new TreeDesc2(s.dyn_ltree, static_l_desc2);
      s.d_desc = new TreeDesc2(s.dyn_dtree, static_d_desc2);
      s.bl_desc = new TreeDesc2(s.bl_tree, static_bl_desc2);
      s.bi_buf = 0;
      s.bi_valid = 0;
      init_block2(s);
    }
    function _tr_stored_block2(s, buf, stored_len, last) {
      send_bits2(s, (STORED_BLOCK2 << 1) + (last ? 1 : 0), 3);
      copy_block(s, buf, stored_len, true);
    }
    function _tr_align2(s) {
      send_bits2(s, STATIC_TREES2 << 1, 3);
      send_code2(s, END_BLOCK2, static_ltree2);
      bi_flush2(s);
    }
    function _tr_flush_block2(s, buf, stored_len, last) {
      var opt_lenb, static_lenb;
      var max_blindex = 0;
      if (s.level > 0) {
        if (s.strm.data_type === Z_UNKNOWN2) {
          s.strm.data_type = detect_data_type2(s);
        }
        build_tree2(s, s.l_desc);
        build_tree2(s, s.d_desc);
        max_blindex = build_bl_tree2(s);
        opt_lenb = s.opt_len + 3 + 7 >>> 3;
        static_lenb = s.static_len + 3 + 7 >>> 3;
        if (static_lenb <= opt_lenb) {
          opt_lenb = static_lenb;
        }
      } else {
        opt_lenb = static_lenb = stored_len + 5;
      }
      if (stored_len + 4 <= opt_lenb && buf !== -1) {
        _tr_stored_block2(s, buf, stored_len, last);
      } else if (s.strategy === Z_FIXED2 || static_lenb === opt_lenb) {
        send_bits2(s, (STATIC_TREES2 << 1) + (last ? 1 : 0), 3);
        compress_block2(s, static_ltree2, static_dtree2);
      } else {
        send_bits2(s, (DYN_TREES2 << 1) + (last ? 1 : 0), 3);
        send_all_trees2(s, s.l_desc.max_code + 1, s.d_desc.max_code + 1, max_blindex + 1);
        compress_block2(s, s.dyn_ltree, s.dyn_dtree);
      }
      init_block2(s);
      if (last) {
        bi_windup2(s);
      }
    }
    function _tr_tally2(s, dist, lc) {
      s.pending_buf[s.d_buf + s.last_lit * 2] = dist >>> 8 & 255;
      s.pending_buf[s.d_buf + s.last_lit * 2 + 1] = dist & 255;
      s.pending_buf[s.l_buf + s.last_lit] = lc & 255;
      s.last_lit++;
      if (dist === 0) {
        s.dyn_ltree[lc * 2]++;
      } else {
        s.matches++;
        dist--;
        s.dyn_ltree[(_length_code2[lc] + LITERALS2 + 1) * 2]++;
        s.dyn_dtree[d_code2(dist) * 2]++;
      }
      return s.last_lit === s.lit_bufsize - 1;
    }
    exports2._tr_init = _tr_init2;
    exports2._tr_stored_block = _tr_stored_block2;
    exports2._tr_flush_block = _tr_flush_block2;
    exports2._tr_tally = _tr_tally2;
    exports2._tr_align = _tr_align2;
  }
});

// node_modules/jszip/node_modules/pako/lib/zlib/adler32.js
var require_adler32 = __commonJS({
  "node_modules/jszip/node_modules/pako/lib/zlib/adler32.js"(exports2, module2) {
    "use strict";
    function adler322(adler, buf, len, pos) {
      var s1 = adler & 65535 | 0, s2 = adler >>> 16 & 65535 | 0, n = 0;
      while (len !== 0) {
        n = len > 2e3 ? 2e3 : len;
        len -= n;
        do {
          s1 = s1 + buf[pos++] | 0;
          s2 = s2 + s1 | 0;
        } while (--n);
        s1 %= 65521;
        s2 %= 65521;
      }
      return s1 | s2 << 16 | 0;
    }
    module2.exports = adler322;
  }
});

// node_modules/jszip/node_modules/pako/lib/zlib/crc32.js
var require_crc322 = __commonJS({
  "node_modules/jszip/node_modules/pako/lib/zlib/crc32.js"(exports2, module2) {
    "use strict";
    function makeTable2() {
      var c, table = [];
      for (var n = 0; n < 256; n++) {
        c = n;
        for (var k = 0; k < 8; k++) {
          c = c & 1 ? 3988292384 ^ c >>> 1 : c >>> 1;
        }
        table[n] = c;
      }
      return table;
    }
    var crcTable2 = makeTable2();
    function crc322(crc, buf, len, pos) {
      var t = crcTable2, end = pos + len;
      crc ^= -1;
      for (var i = pos; i < end; i++) {
        crc = crc >>> 8 ^ t[(crc ^ buf[i]) & 255];
      }
      return crc ^ -1;
    }
    module2.exports = crc322;
  }
});

// node_modules/jszip/node_modules/pako/lib/zlib/messages.js
var require_messages = __commonJS({
  "node_modules/jszip/node_modules/pako/lib/zlib/messages.js"(exports2, module2) {
    "use strict";
    module2.exports = {
      2: "need dictionary",
      /* Z_NEED_DICT       2  */
      1: "stream end",
      /* Z_STREAM_END      1  */
      0: "",
      /* Z_OK              0  */
      "-1": "file error",
      /* Z_ERRNO         (-1) */
      "-2": "stream error",
      /* Z_STREAM_ERROR  (-2) */
      "-3": "data error",
      /* Z_DATA_ERROR    (-3) */
      "-4": "insufficient memory",
      /* Z_MEM_ERROR     (-4) */
      "-5": "buffer error",
      /* Z_BUF_ERROR     (-5) */
      "-6": "incompatible version"
      /* Z_VERSION_ERROR (-6) */
    };
  }
});

// node_modules/jszip/node_modules/pako/lib/zlib/deflate.js
var require_deflate = __commonJS({
  "node_modules/jszip/node_modules/pako/lib/zlib/deflate.js"(exports2) {
    "use strict";
    var utils = require_common();
    var trees2 = require_trees();
    var adler322 = require_adler32();
    var crc322 = require_crc322();
    var msg = require_messages();
    var Z_NO_FLUSH2 = 0;
    var Z_PARTIAL_FLUSH2 = 1;
    var Z_FULL_FLUSH2 = 3;
    var Z_FINISH2 = 4;
    var Z_BLOCK2 = 5;
    var Z_OK2 = 0;
    var Z_STREAM_END2 = 1;
    var Z_STREAM_ERROR2 = -2;
    var Z_DATA_ERROR2 = -3;
    var Z_BUF_ERROR2 = -5;
    var Z_DEFAULT_COMPRESSION2 = -1;
    var Z_FILTERED2 = 1;
    var Z_HUFFMAN_ONLY2 = 2;
    var Z_RLE2 = 3;
    var Z_FIXED2 = 4;
    var Z_DEFAULT_STRATEGY2 = 0;
    var Z_UNKNOWN2 = 2;
    var Z_DEFLATED2 = 8;
    var MAX_MEM_LEVEL2 = 9;
    var MAX_WBITS2 = 15;
    var DEF_MEM_LEVEL2 = 8;
    var LENGTH_CODES2 = 29;
    var LITERALS2 = 256;
    var L_CODES2 = LITERALS2 + 1 + LENGTH_CODES2;
    var D_CODES2 = 30;
    var BL_CODES2 = 19;
    var HEAP_SIZE2 = 2 * L_CODES2 + 1;
    var MAX_BITS2 = 15;
    var MIN_MATCH2 = 3;
    var MAX_MATCH2 = 258;
    var MIN_LOOKAHEAD2 = MAX_MATCH2 + MIN_MATCH2 + 1;
    var PRESET_DICT2 = 32;
    var INIT_STATE2 = 42;
    var EXTRA_STATE2 = 69;
    var NAME_STATE2 = 73;
    var COMMENT_STATE2 = 91;
    var HCRC_STATE2 = 103;
    var BUSY_STATE2 = 113;
    var FINISH_STATE2 = 666;
    var BS_NEED_MORE2 = 1;
    var BS_BLOCK_DONE2 = 2;
    var BS_FINISH_STARTED2 = 3;
    var BS_FINISH_DONE2 = 4;
    var OS_CODE2 = 3;
    function err2(strm, errorCode) {
      strm.msg = msg[errorCode];
      return errorCode;
    }
    function rank2(f) {
      return (f << 1) - (f > 4 ? 9 : 0);
    }
    function zero2(buf) {
      var len = buf.length;
      while (--len >= 0) {
        buf[len] = 0;
      }
    }
    function flush_pending2(strm) {
      var s = strm.state;
      var len = s.pending;
      if (len > strm.avail_out) {
        len = strm.avail_out;
      }
      if (len === 0) {
        return;
      }
      utils.arraySet(strm.output, s.pending_buf, s.pending_out, len, strm.next_out);
      strm.next_out += len;
      s.pending_out += len;
      strm.total_out += len;
      strm.avail_out -= len;
      s.pending -= len;
      if (s.pending === 0) {
        s.pending_out = 0;
      }
    }
    function flush_block_only2(s, last) {
      trees2._tr_flush_block(s, s.block_start >= 0 ? s.block_start : -1, s.strstart - s.block_start, last);
      s.block_start = s.strstart;
      flush_pending2(s.strm);
    }
    function put_byte2(s, b) {
      s.pending_buf[s.pending++] = b;
    }
    function putShortMSB2(s, b) {
      s.pending_buf[s.pending++] = b >>> 8 & 255;
      s.pending_buf[s.pending++] = b & 255;
    }
    function read_buf2(strm, buf, start, size) {
      var len = strm.avail_in;
      if (len > size) {
        len = size;
      }
      if (len === 0) {
        return 0;
      }
      strm.avail_in -= len;
      utils.arraySet(buf, strm.input, strm.next_in, len, start);
      if (strm.state.wrap === 1) {
        strm.adler = adler322(strm.adler, buf, len, start);
      } else if (strm.state.wrap === 2) {
        strm.adler = crc322(strm.adler, buf, len, start);
      }
      strm.next_in += len;
      strm.total_in += len;
      return len;
    }
    function longest_match2(s, cur_match) {
      var chain_length = s.max_chain_length;
      var scan = s.strstart;
      var match;
      var len;
      var best_len = s.prev_length;
      var nice_match = s.nice_match;
      var limit = s.strstart > s.w_size - MIN_LOOKAHEAD2 ? s.strstart - (s.w_size - MIN_LOOKAHEAD2) : 0;
      var _win = s.window;
      var wmask = s.w_mask;
      var prev = s.prev;
      var strend = s.strstart + MAX_MATCH2;
      var scan_end1 = _win[scan + best_len - 1];
      var scan_end = _win[scan + best_len];
      if (s.prev_length >= s.good_match) {
        chain_length >>= 2;
      }
      if (nice_match > s.lookahead) {
        nice_match = s.lookahead;
      }
      do {
        match = cur_match;
        if (_win[match + best_len] !== scan_end || _win[match + best_len - 1] !== scan_end1 || _win[match] !== _win[scan] || _win[++match] !== _win[scan + 1]) {
          continue;
        }
        scan += 2;
        match++;
        do {
        } while (_win[++scan] === _win[++match] && _win[++scan] === _win[++match] && _win[++scan] === _win[++match] && _win[++scan] === _win[++match] && _win[++scan] === _win[++match] && _win[++scan] === _win[++match] && _win[++scan] === _win[++match] && _win[++scan] === _win[++match] && scan < strend);
        len = MAX_MATCH2 - (strend - scan);
        scan = strend - MAX_MATCH2;
        if (len > best_len) {
          s.match_start = cur_match;
          best_len = len;
          if (len >= nice_match) {
            break;
          }
          scan_end1 = _win[scan + best_len - 1];
          scan_end = _win[scan + best_len];
        }
      } while ((cur_match = prev[cur_match & wmask]) > limit && --chain_length !== 0);
      if (best_len <= s.lookahead) {
        return best_len;
      }
      return s.lookahead;
    }
    function fill_window2(s) {
      var _w_size = s.w_size;
      var p, n, m, more, str;
      do {
        more = s.window_size - s.lookahead - s.strstart;
        if (s.strstart >= _w_size + (_w_size - MIN_LOOKAHEAD2)) {
          utils.arraySet(s.window, s.window, _w_size, _w_size, 0);
          s.match_start -= _w_size;
          s.strstart -= _w_size;
          s.block_start -= _w_size;
          n = s.hash_size;
          p = n;
          do {
            m = s.head[--p];
            s.head[p] = m >= _w_size ? m - _w_size : 0;
          } while (--n);
          n = _w_size;
          p = n;
          do {
            m = s.prev[--p];
            s.prev[p] = m >= _w_size ? m - _w_size : 0;
          } while (--n);
          more += _w_size;
        }
        if (s.strm.avail_in === 0) {
          break;
        }
        n = read_buf2(s.strm, s.window, s.strstart + s.lookahead, more);
        s.lookahead += n;
        if (s.lookahead + s.insert >= MIN_MATCH2) {
          str = s.strstart - s.insert;
          s.ins_h = s.window[str];
          s.ins_h = (s.ins_h << s.hash_shift ^ s.window[str + 1]) & s.hash_mask;
          while (s.insert) {
            s.ins_h = (s.ins_h << s.hash_shift ^ s.window[str + MIN_MATCH2 - 1]) & s.hash_mask;
            s.prev[str & s.w_mask] = s.head[s.ins_h];
            s.head[s.ins_h] = str;
            str++;
            s.insert--;
            if (s.lookahead + s.insert < MIN_MATCH2) {
              break;
            }
          }
        }
      } while (s.lookahead < MIN_LOOKAHEAD2 && s.strm.avail_in !== 0);
    }
    function deflate_stored2(s, flush) {
      var max_block_size = 65535;
      if (max_block_size > s.pending_buf_size - 5) {
        max_block_size = s.pending_buf_size - 5;
      }
      for (; ; ) {
        if (s.lookahead <= 1) {
          fill_window2(s);
          if (s.lookahead === 0 && flush === Z_NO_FLUSH2) {
            return BS_NEED_MORE2;
          }
          if (s.lookahead === 0) {
            break;
          }
        }
        s.strstart += s.lookahead;
        s.lookahead = 0;
        var max_start = s.block_start + max_block_size;
        if (s.strstart === 0 || s.strstart >= max_start) {
          s.lookahead = s.strstart - max_start;
          s.strstart = max_start;
          flush_block_only2(s, false);
          if (s.strm.avail_out === 0) {
            return BS_NEED_MORE2;
          }
        }
        if (s.strstart - s.block_start >= s.w_size - MIN_LOOKAHEAD2) {
          flush_block_only2(s, false);
          if (s.strm.avail_out === 0) {
            return BS_NEED_MORE2;
          }
        }
      }
      s.insert = 0;
      if (flush === Z_FINISH2) {
        flush_block_only2(s, true);
        if (s.strm.avail_out === 0) {
          return BS_FINISH_STARTED2;
        }
        return BS_FINISH_DONE2;
      }
      if (s.strstart > s.block_start) {
        flush_block_only2(s, false);
        if (s.strm.avail_out === 0) {
          return BS_NEED_MORE2;
        }
      }
      return BS_NEED_MORE2;
    }
    function deflate_fast2(s, flush) {
      var hash_head;
      var bflush;
      for (; ; ) {
        if (s.lookahead < MIN_LOOKAHEAD2) {
          fill_window2(s);
          if (s.lookahead < MIN_LOOKAHEAD2 && flush === Z_NO_FLUSH2) {
            return BS_NEED_MORE2;
          }
          if (s.lookahead === 0) {
            break;
          }
        }
        hash_head = 0;
        if (s.lookahead >= MIN_MATCH2) {
          s.ins_h = (s.ins_h << s.hash_shift ^ s.window[s.strstart + MIN_MATCH2 - 1]) & s.hash_mask;
          hash_head = s.prev[s.strstart & s.w_mask] = s.head[s.ins_h];
          s.head[s.ins_h] = s.strstart;
        }
        if (hash_head !== 0 && s.strstart - hash_head <= s.w_size - MIN_LOOKAHEAD2) {
          s.match_length = longest_match2(s, hash_head);
        }
        if (s.match_length >= MIN_MATCH2) {
          bflush = trees2._tr_tally(s, s.strstart - s.match_start, s.match_length - MIN_MATCH2);
          s.lookahead -= s.match_length;
          if (s.match_length <= s.max_lazy_match && s.lookahead >= MIN_MATCH2) {
            s.match_length--;
            do {
              s.strstart++;
              s.ins_h = (s.ins_h << s.hash_shift ^ s.window[s.strstart + MIN_MATCH2 - 1]) & s.hash_mask;
              hash_head = s.prev[s.strstart & s.w_mask] = s.head[s.ins_h];
              s.head[s.ins_h] = s.strstart;
            } while (--s.match_length !== 0);
            s.strstart++;
          } else {
            s.strstart += s.match_length;
            s.match_length = 0;
            s.ins_h = s.window[s.strstart];
            s.ins_h = (s.ins_h << s.hash_shift ^ s.window[s.strstart + 1]) & s.hash_mask;
          }
        } else {
          bflush = trees2._tr_tally(s, 0, s.window[s.strstart]);
          s.lookahead--;
          s.strstart++;
        }
        if (bflush) {
          flush_block_only2(s, false);
          if (s.strm.avail_out === 0) {
            return BS_NEED_MORE2;
          }
        }
      }
      s.insert = s.strstart < MIN_MATCH2 - 1 ? s.strstart : MIN_MATCH2 - 1;
      if (flush === Z_FINISH2) {
        flush_block_only2(s, true);
        if (s.strm.avail_out === 0) {
          return BS_FINISH_STARTED2;
        }
        return BS_FINISH_DONE2;
      }
      if (s.last_lit) {
        flush_block_only2(s, false);
        if (s.strm.avail_out === 0) {
          return BS_NEED_MORE2;
        }
      }
      return BS_BLOCK_DONE2;
    }
    function deflate_slow2(s, flush) {
      var hash_head;
      var bflush;
      var max_insert;
      for (; ; ) {
        if (s.lookahead < MIN_LOOKAHEAD2) {
          fill_window2(s);
          if (s.lookahead < MIN_LOOKAHEAD2 && flush === Z_NO_FLUSH2) {
            return BS_NEED_MORE2;
          }
          if (s.lookahead === 0) {
            break;
          }
        }
        hash_head = 0;
        if (s.lookahead >= MIN_MATCH2) {
          s.ins_h = (s.ins_h << s.hash_shift ^ s.window[s.strstart + MIN_MATCH2 - 1]) & s.hash_mask;
          hash_head = s.prev[s.strstart & s.w_mask] = s.head[s.ins_h];
          s.head[s.ins_h] = s.strstart;
        }
        s.prev_length = s.match_length;
        s.prev_match = s.match_start;
        s.match_length = MIN_MATCH2 - 1;
        if (hash_head !== 0 && s.prev_length < s.max_lazy_match && s.strstart - hash_head <= s.w_size - MIN_LOOKAHEAD2) {
          s.match_length = longest_match2(s, hash_head);
          if (s.match_length <= 5 && (s.strategy === Z_FILTERED2 || s.match_length === MIN_MATCH2 && s.strstart - s.match_start > 4096)) {
            s.match_length = MIN_MATCH2 - 1;
          }
        }
        if (s.prev_length >= MIN_MATCH2 && s.match_length <= s.prev_length) {
          max_insert = s.strstart + s.lookahead - MIN_MATCH2;
          bflush = trees2._tr_tally(s, s.strstart - 1 - s.prev_match, s.prev_length - MIN_MATCH2);
          s.lookahead -= s.prev_length - 1;
          s.prev_length -= 2;
          do {
            if (++s.strstart <= max_insert) {
              s.ins_h = (s.ins_h << s.hash_shift ^ s.window[s.strstart + MIN_MATCH2 - 1]) & s.hash_mask;
              hash_head = s.prev[s.strstart & s.w_mask] = s.head[s.ins_h];
              s.head[s.ins_h] = s.strstart;
            }
          } while (--s.prev_length !== 0);
          s.match_available = 0;
          s.match_length = MIN_MATCH2 - 1;
          s.strstart++;
          if (bflush) {
            flush_block_only2(s, false);
            if (s.strm.avail_out === 0) {
              return BS_NEED_MORE2;
            }
          }
        } else if (s.match_available) {
          bflush = trees2._tr_tally(s, 0, s.window[s.strstart - 1]);
          if (bflush) {
            flush_block_only2(s, false);
          }
          s.strstart++;
          s.lookahead--;
          if (s.strm.avail_out === 0) {
            return BS_NEED_MORE2;
          }
        } else {
          s.match_available = 1;
          s.strstart++;
          s.lookahead--;
        }
      }
      if (s.match_available) {
        bflush = trees2._tr_tally(s, 0, s.window[s.strstart - 1]);
        s.match_available = 0;
      }
      s.insert = s.strstart < MIN_MATCH2 - 1 ? s.strstart : MIN_MATCH2 - 1;
      if (flush === Z_FINISH2) {
        flush_block_only2(s, true);
        if (s.strm.avail_out === 0) {
          return BS_FINISH_STARTED2;
        }
        return BS_FINISH_DONE2;
      }
      if (s.last_lit) {
        flush_block_only2(s, false);
        if (s.strm.avail_out === 0) {
          return BS_NEED_MORE2;
        }
      }
      return BS_BLOCK_DONE2;
    }
    function deflate_rle2(s, flush) {
      var bflush;
      var prev;
      var scan, strend;
      var _win = s.window;
      for (; ; ) {
        if (s.lookahead <= MAX_MATCH2) {
          fill_window2(s);
          if (s.lookahead <= MAX_MATCH2 && flush === Z_NO_FLUSH2) {
            return BS_NEED_MORE2;
          }
          if (s.lookahead === 0) {
            break;
          }
        }
        s.match_length = 0;
        if (s.lookahead >= MIN_MATCH2 && s.strstart > 0) {
          scan = s.strstart - 1;
          prev = _win[scan];
          if (prev === _win[++scan] && prev === _win[++scan] && prev === _win[++scan]) {
            strend = s.strstart + MAX_MATCH2;
            do {
            } while (prev === _win[++scan] && prev === _win[++scan] && prev === _win[++scan] && prev === _win[++scan] && prev === _win[++scan] && prev === _win[++scan] && prev === _win[++scan] && prev === _win[++scan] && scan < strend);
            s.match_length = MAX_MATCH2 - (strend - scan);
            if (s.match_length > s.lookahead) {
              s.match_length = s.lookahead;
            }
          }
        }
        if (s.match_length >= MIN_MATCH2) {
          bflush = trees2._tr_tally(s, 1, s.match_length - MIN_MATCH2);
          s.lookahead -= s.match_length;
          s.strstart += s.match_length;
          s.match_length = 0;
        } else {
          bflush = trees2._tr_tally(s, 0, s.window[s.strstart]);
          s.lookahead--;
          s.strstart++;
        }
        if (bflush) {
          flush_block_only2(s, false);
          if (s.strm.avail_out === 0) {
            return BS_NEED_MORE2;
          }
        }
      }
      s.insert = 0;
      if (flush === Z_FINISH2) {
        flush_block_only2(s, true);
        if (s.strm.avail_out === 0) {
          return BS_FINISH_STARTED2;
        }
        return BS_FINISH_DONE2;
      }
      if (s.last_lit) {
        flush_block_only2(s, false);
        if (s.strm.avail_out === 0) {
          return BS_NEED_MORE2;
        }
      }
      return BS_BLOCK_DONE2;
    }
    function deflate_huff2(s, flush) {
      var bflush;
      for (; ; ) {
        if (s.lookahead === 0) {
          fill_window2(s);
          if (s.lookahead === 0) {
            if (flush === Z_NO_FLUSH2) {
              return BS_NEED_MORE2;
            }
            break;
          }
        }
        s.match_length = 0;
        bflush = trees2._tr_tally(s, 0, s.window[s.strstart]);
        s.lookahead--;
        s.strstart++;
        if (bflush) {
          flush_block_only2(s, false);
          if (s.strm.avail_out === 0) {
            return BS_NEED_MORE2;
          }
        }
      }
      s.insert = 0;
      if (flush === Z_FINISH2) {
        flush_block_only2(s, true);
        if (s.strm.avail_out === 0) {
          return BS_FINISH_STARTED2;
        }
        return BS_FINISH_DONE2;
      }
      if (s.last_lit) {
        flush_block_only2(s, false);
        if (s.strm.avail_out === 0) {
          return BS_NEED_MORE2;
        }
      }
      return BS_BLOCK_DONE2;
    }
    function Config2(good_length, max_lazy, nice_length, max_chain, func) {
      this.good_length = good_length;
      this.max_lazy = max_lazy;
      this.nice_length = nice_length;
      this.max_chain = max_chain;
      this.func = func;
    }
    var configuration_table2;
    configuration_table2 = [
      /*      good lazy nice chain */
      new Config2(0, 0, 0, 0, deflate_stored2),
      /* 0 store only */
      new Config2(4, 4, 8, 4, deflate_fast2),
      /* 1 max speed, no lazy matches */
      new Config2(4, 5, 16, 8, deflate_fast2),
      /* 2 */
      new Config2(4, 6, 32, 32, deflate_fast2),
      /* 3 */
      new Config2(4, 4, 16, 16, deflate_slow2),
      /* 4 lazy matches */
      new Config2(8, 16, 32, 32, deflate_slow2),
      /* 5 */
      new Config2(8, 16, 128, 128, deflate_slow2),
      /* 6 */
      new Config2(8, 32, 128, 256, deflate_slow2),
      /* 7 */
      new Config2(32, 128, 258, 1024, deflate_slow2),
      /* 8 */
      new Config2(32, 258, 258, 4096, deflate_slow2)
      /* 9 max compression */
    ];
    function lm_init2(s) {
      s.window_size = 2 * s.w_size;
      zero2(s.head);
      s.max_lazy_match = configuration_table2[s.level].max_lazy;
      s.good_match = configuration_table2[s.level].good_length;
      s.nice_match = configuration_table2[s.level].nice_length;
      s.max_chain_length = configuration_table2[s.level].max_chain;
      s.strstart = 0;
      s.block_start = 0;
      s.lookahead = 0;
      s.insert = 0;
      s.match_length = s.prev_length = MIN_MATCH2 - 1;
      s.match_available = 0;
      s.ins_h = 0;
    }
    function DeflateState2() {
      this.strm = null;
      this.status = 0;
      this.pending_buf = null;
      this.pending_buf_size = 0;
      this.pending_out = 0;
      this.pending = 0;
      this.wrap = 0;
      this.gzhead = null;
      this.gzindex = 0;
      this.method = Z_DEFLATED2;
      this.last_flush = -1;
      this.w_size = 0;
      this.w_bits = 0;
      this.w_mask = 0;
      this.window = null;
      this.window_size = 0;
      this.prev = null;
      this.head = null;
      this.ins_h = 0;
      this.hash_size = 0;
      this.hash_bits = 0;
      this.hash_mask = 0;
      this.hash_shift = 0;
      this.block_start = 0;
      this.match_length = 0;
      this.prev_match = 0;
      this.match_available = 0;
      this.strstart = 0;
      this.match_start = 0;
      this.lookahead = 0;
      this.prev_length = 0;
      this.max_chain_length = 0;
      this.max_lazy_match = 0;
      this.level = 0;
      this.strategy = 0;
      this.good_match = 0;
      this.nice_match = 0;
      this.dyn_ltree = new utils.Buf16(HEAP_SIZE2 * 2);
      this.dyn_dtree = new utils.Buf16((2 * D_CODES2 + 1) * 2);
      this.bl_tree = new utils.Buf16((2 * BL_CODES2 + 1) * 2);
      zero2(this.dyn_ltree);
      zero2(this.dyn_dtree);
      zero2(this.bl_tree);
      this.l_desc = null;
      this.d_desc = null;
      this.bl_desc = null;
      this.bl_count = new utils.Buf16(MAX_BITS2 + 1);
      this.heap = new utils.Buf16(2 * L_CODES2 + 1);
      zero2(this.heap);
      this.heap_len = 0;
      this.heap_max = 0;
      this.depth = new utils.Buf16(2 * L_CODES2 + 1);
      zero2(this.depth);
      this.l_buf = 0;
      this.lit_bufsize = 0;
      this.last_lit = 0;
      this.d_buf = 0;
      this.opt_len = 0;
      this.static_len = 0;
      this.matches = 0;
      this.insert = 0;
      this.bi_buf = 0;
      this.bi_valid = 0;
    }
    function deflateResetKeep2(strm) {
      var s;
      if (!strm || !strm.state) {
        return err2(strm, Z_STREAM_ERROR2);
      }
      strm.total_in = strm.total_out = 0;
      strm.data_type = Z_UNKNOWN2;
      s = strm.state;
      s.pending = 0;
      s.pending_out = 0;
      if (s.wrap < 0) {
        s.wrap = -s.wrap;
      }
      s.status = s.wrap ? INIT_STATE2 : BUSY_STATE2;
      strm.adler = s.wrap === 2 ? 0 : 1;
      s.last_flush = Z_NO_FLUSH2;
      trees2._tr_init(s);
      return Z_OK2;
    }
    function deflateReset2(strm) {
      var ret = deflateResetKeep2(strm);
      if (ret === Z_OK2) {
        lm_init2(strm.state);
      }
      return ret;
    }
    function deflateSetHeader2(strm, head) {
      if (!strm || !strm.state) {
        return Z_STREAM_ERROR2;
      }
      if (strm.state.wrap !== 2) {
        return Z_STREAM_ERROR2;
      }
      strm.state.gzhead = head;
      return Z_OK2;
    }
    function deflateInit22(strm, level, method, windowBits, memLevel, strategy) {
      if (!strm) {
        return Z_STREAM_ERROR2;
      }
      var wrap = 1;
      if (level === Z_DEFAULT_COMPRESSION2) {
        level = 6;
      }
      if (windowBits < 0) {
        wrap = 0;
        windowBits = -windowBits;
      } else if (windowBits > 15) {
        wrap = 2;
        windowBits -= 16;
      }
      if (memLevel < 1 || memLevel > MAX_MEM_LEVEL2 || method !== Z_DEFLATED2 || windowBits < 8 || windowBits > 15 || level < 0 || level > 9 || strategy < 0 || strategy > Z_FIXED2) {
        return err2(strm, Z_STREAM_ERROR2);
      }
      if (windowBits === 8) {
        windowBits = 9;
      }
      var s = new DeflateState2();
      strm.state = s;
      s.strm = strm;
      s.wrap = wrap;
      s.gzhead = null;
      s.w_bits = windowBits;
      s.w_size = 1 << s.w_bits;
      s.w_mask = s.w_size - 1;
      s.hash_bits = memLevel + 7;
      s.hash_size = 1 << s.hash_bits;
      s.hash_mask = s.hash_size - 1;
      s.hash_shift = ~~((s.hash_bits + MIN_MATCH2 - 1) / MIN_MATCH2);
      s.window = new utils.Buf8(s.w_size * 2);
      s.head = new utils.Buf16(s.hash_size);
      s.prev = new utils.Buf16(s.w_size);
      s.lit_bufsize = 1 << memLevel + 6;
      s.pending_buf_size = s.lit_bufsize * 4;
      s.pending_buf = new utils.Buf8(s.pending_buf_size);
      s.d_buf = 1 * s.lit_bufsize;
      s.l_buf = (1 + 2) * s.lit_bufsize;
      s.level = level;
      s.strategy = strategy;
      s.method = method;
      return deflateReset2(strm);
    }
    function deflateInit3(strm, level) {
      return deflateInit22(strm, level, Z_DEFLATED2, MAX_WBITS2, DEF_MEM_LEVEL2, Z_DEFAULT_STRATEGY2);
    }
    function deflate2(strm, flush) {
      var old_flush, s;
      var beg, val;
      if (!strm || !strm.state || flush > Z_BLOCK2 || flush < 0) {
        return strm ? err2(strm, Z_STREAM_ERROR2) : Z_STREAM_ERROR2;
      }
      s = strm.state;
      if (!strm.output || !strm.input && strm.avail_in !== 0 || s.status === FINISH_STATE2 && flush !== Z_FINISH2) {
        return err2(strm, strm.avail_out === 0 ? Z_BUF_ERROR2 : Z_STREAM_ERROR2);
      }
      s.strm = strm;
      old_flush = s.last_flush;
      s.last_flush = flush;
      if (s.status === INIT_STATE2) {
        if (s.wrap === 2) {
          strm.adler = 0;
          put_byte2(s, 31);
          put_byte2(s, 139);
          put_byte2(s, 8);
          if (!s.gzhead) {
            put_byte2(s, 0);
            put_byte2(s, 0);
            put_byte2(s, 0);
            put_byte2(s, 0);
            put_byte2(s, 0);
            put_byte2(s, s.level === 9 ? 2 : s.strategy >= Z_HUFFMAN_ONLY2 || s.level < 2 ? 4 : 0);
            put_byte2(s, OS_CODE2);
            s.status = BUSY_STATE2;
          } else {
            put_byte2(
              s,
              (s.gzhead.text ? 1 : 0) + (s.gzhead.hcrc ? 2 : 0) + (!s.gzhead.extra ? 0 : 4) + (!s.gzhead.name ? 0 : 8) + (!s.gzhead.comment ? 0 : 16)
            );
            put_byte2(s, s.gzhead.time & 255);
            put_byte2(s, s.gzhead.time >> 8 & 255);
            put_byte2(s, s.gzhead.time >> 16 & 255);
            put_byte2(s, s.gzhead.time >> 24 & 255);
            put_byte2(s, s.level === 9 ? 2 : s.strategy >= Z_HUFFMAN_ONLY2 || s.level < 2 ? 4 : 0);
            put_byte2(s, s.gzhead.os & 255);
            if (s.gzhead.extra && s.gzhead.extra.length) {
              put_byte2(s, s.gzhead.extra.length & 255);
              put_byte2(s, s.gzhead.extra.length >> 8 & 255);
            }
            if (s.gzhead.hcrc) {
              strm.adler = crc322(strm.adler, s.pending_buf, s.pending, 0);
            }
            s.gzindex = 0;
            s.status = EXTRA_STATE2;
          }
        } else {
          var header = Z_DEFLATED2 + (s.w_bits - 8 << 4) << 8;
          var level_flags = -1;
          if (s.strategy >= Z_HUFFMAN_ONLY2 || s.level < 2) {
            level_flags = 0;
          } else if (s.level < 6) {
            level_flags = 1;
          } else if (s.level === 6) {
            level_flags = 2;
          } else {
            level_flags = 3;
          }
          header |= level_flags << 6;
          if (s.strstart !== 0) {
            header |= PRESET_DICT2;
          }
          header += 31 - header % 31;
          s.status = BUSY_STATE2;
          putShortMSB2(s, header);
          if (s.strstart !== 0) {
            putShortMSB2(s, strm.adler >>> 16);
            putShortMSB2(s, strm.adler & 65535);
          }
          strm.adler = 1;
        }
      }
      if (s.status === EXTRA_STATE2) {
        if (s.gzhead.extra) {
          beg = s.pending;
          while (s.gzindex < (s.gzhead.extra.length & 65535)) {
            if (s.pending === s.pending_buf_size) {
              if (s.gzhead.hcrc && s.pending > beg) {
                strm.adler = crc322(strm.adler, s.pending_buf, s.pending - beg, beg);
              }
              flush_pending2(strm);
              beg = s.pending;
              if (s.pending === s.pending_buf_size) {
                break;
              }
            }
            put_byte2(s, s.gzhead.extra[s.gzindex] & 255);
            s.gzindex++;
          }
          if (s.gzhead.hcrc && s.pending > beg) {
            strm.adler = crc322(strm.adler, s.pending_buf, s.pending - beg, beg);
          }
          if (s.gzindex === s.gzhead.extra.length) {
            s.gzindex = 0;
            s.status = NAME_STATE2;
          }
        } else {
          s.status = NAME_STATE2;
        }
      }
      if (s.status === NAME_STATE2) {
        if (s.gzhead.name) {
          beg = s.pending;
          do {
            if (s.pending === s.pending_buf_size) {
              if (s.gzhead.hcrc && s.pending > beg) {
                strm.adler = crc322(strm.adler, s.pending_buf, s.pending - beg, beg);
              }
              flush_pending2(strm);
              beg = s.pending;
              if (s.pending === s.pending_buf_size) {
                val = 1;
                break;
              }
            }
            if (s.gzindex < s.gzhead.name.length) {
              val = s.gzhead.name.charCodeAt(s.gzindex++) & 255;
            } else {
              val = 0;
            }
            put_byte2(s, val);
          } while (val !== 0);
          if (s.gzhead.hcrc && s.pending > beg) {
            strm.adler = crc322(strm.adler, s.pending_buf, s.pending - beg, beg);
          }
          if (val === 0) {
            s.gzindex = 0;
            s.status = COMMENT_STATE2;
          }
        } else {
          s.status = COMMENT_STATE2;
        }
      }
      if (s.status === COMMENT_STATE2) {
        if (s.gzhead.comment) {
          beg = s.pending;
          do {
            if (s.pending === s.pending_buf_size) {
              if (s.gzhead.hcrc && s.pending > beg) {
                strm.adler = crc322(strm.adler, s.pending_buf, s.pending - beg, beg);
              }
              flush_pending2(strm);
              beg = s.pending;
              if (s.pending === s.pending_buf_size) {
                val = 1;
                break;
              }
            }
            if (s.gzindex < s.gzhead.comment.length) {
              val = s.gzhead.comment.charCodeAt(s.gzindex++) & 255;
            } else {
              val = 0;
            }
            put_byte2(s, val);
          } while (val !== 0);
          if (s.gzhead.hcrc && s.pending > beg) {
            strm.adler = crc322(strm.adler, s.pending_buf, s.pending - beg, beg);
          }
          if (val === 0) {
            s.status = HCRC_STATE2;
          }
        } else {
          s.status = HCRC_STATE2;
        }
      }
      if (s.status === HCRC_STATE2) {
        if (s.gzhead.hcrc) {
          if (s.pending + 2 > s.pending_buf_size) {
            flush_pending2(strm);
          }
          if (s.pending + 2 <= s.pending_buf_size) {
            put_byte2(s, strm.adler & 255);
            put_byte2(s, strm.adler >> 8 & 255);
            strm.adler = 0;
            s.status = BUSY_STATE2;
          }
        } else {
          s.status = BUSY_STATE2;
        }
      }
      if (s.pending !== 0) {
        flush_pending2(strm);
        if (strm.avail_out === 0) {
          s.last_flush = -1;
          return Z_OK2;
        }
      } else if (strm.avail_in === 0 && rank2(flush) <= rank2(old_flush) && flush !== Z_FINISH2) {
        return err2(strm, Z_BUF_ERROR2);
      }
      if (s.status === FINISH_STATE2 && strm.avail_in !== 0) {
        return err2(strm, Z_BUF_ERROR2);
      }
      if (strm.avail_in !== 0 || s.lookahead !== 0 || flush !== Z_NO_FLUSH2 && s.status !== FINISH_STATE2) {
        var bstate = s.strategy === Z_HUFFMAN_ONLY2 ? deflate_huff2(s, flush) : s.strategy === Z_RLE2 ? deflate_rle2(s, flush) : configuration_table2[s.level].func(s, flush);
        if (bstate === BS_FINISH_STARTED2 || bstate === BS_FINISH_DONE2) {
          s.status = FINISH_STATE2;
        }
        if (bstate === BS_NEED_MORE2 || bstate === BS_FINISH_STARTED2) {
          if (strm.avail_out === 0) {
            s.last_flush = -1;
          }
          return Z_OK2;
        }
        if (bstate === BS_BLOCK_DONE2) {
          if (flush === Z_PARTIAL_FLUSH2) {
            trees2._tr_align(s);
          } else if (flush !== Z_BLOCK2) {
            trees2._tr_stored_block(s, 0, 0, false);
            if (flush === Z_FULL_FLUSH2) {
              zero2(s.head);
              if (s.lookahead === 0) {
                s.strstart = 0;
                s.block_start = 0;
                s.insert = 0;
              }
            }
          }
          flush_pending2(strm);
          if (strm.avail_out === 0) {
            s.last_flush = -1;
            return Z_OK2;
          }
        }
      }
      if (flush !== Z_FINISH2) {
        return Z_OK2;
      }
      if (s.wrap <= 0) {
        return Z_STREAM_END2;
      }
      if (s.wrap === 2) {
        put_byte2(s, strm.adler & 255);
        put_byte2(s, strm.adler >> 8 & 255);
        put_byte2(s, strm.adler >> 16 & 255);
        put_byte2(s, strm.adler >> 24 & 255);
        put_byte2(s, strm.total_in & 255);
        put_byte2(s, strm.total_in >> 8 & 255);
        put_byte2(s, strm.total_in >> 16 & 255);
        put_byte2(s, strm.total_in >> 24 & 255);
      } else {
        putShortMSB2(s, strm.adler >>> 16);
        putShortMSB2(s, strm.adler & 65535);
      }
      flush_pending2(strm);
      if (s.wrap > 0) {
        s.wrap = -s.wrap;
      }
      return s.pending !== 0 ? Z_OK2 : Z_STREAM_END2;
    }
    function deflateEnd2(strm) {
      var status;
      if (!strm || !strm.state) {
        return Z_STREAM_ERROR2;
      }
      status = strm.state.status;
      if (status !== INIT_STATE2 && status !== EXTRA_STATE2 && status !== NAME_STATE2 && status !== COMMENT_STATE2 && status !== HCRC_STATE2 && status !== BUSY_STATE2 && status !== FINISH_STATE2) {
        return err2(strm, Z_STREAM_ERROR2);
      }
      strm.state = null;
      return status === BUSY_STATE2 ? err2(strm, Z_DATA_ERROR2) : Z_OK2;
    }
    function deflateSetDictionary2(strm, dictionary) {
      var dictLength = dictionary.length;
      var s;
      var str, n;
      var wrap;
      var avail;
      var next;
      var input;
      var tmpDict;
      if (!strm || !strm.state) {
        return Z_STREAM_ERROR2;
      }
      s = strm.state;
      wrap = s.wrap;
      if (wrap === 2 || wrap === 1 && s.status !== INIT_STATE2 || s.lookahead) {
        return Z_STREAM_ERROR2;
      }
      if (wrap === 1) {
        strm.adler = adler322(strm.adler, dictionary, dictLength, 0);
      }
      s.wrap = 0;
      if (dictLength >= s.w_size) {
        if (wrap === 0) {
          zero2(s.head);
          s.strstart = 0;
          s.block_start = 0;
          s.insert = 0;
        }
        tmpDict = new utils.Buf8(s.w_size);
        utils.arraySet(tmpDict, dictionary, dictLength - s.w_size, s.w_size, 0);
        dictionary = tmpDict;
        dictLength = s.w_size;
      }
      avail = strm.avail_in;
      next = strm.next_in;
      input = strm.input;
      strm.avail_in = dictLength;
      strm.next_in = 0;
      strm.input = dictionary;
      fill_window2(s);
      while (s.lookahead >= MIN_MATCH2) {
        str = s.strstart;
        n = s.lookahead - (MIN_MATCH2 - 1);
        do {
          s.ins_h = (s.ins_h << s.hash_shift ^ s.window[str + MIN_MATCH2 - 1]) & s.hash_mask;
          s.prev[str & s.w_mask] = s.head[s.ins_h];
          s.head[s.ins_h] = str;
          str++;
        } while (--n);
        s.strstart = str;
        s.lookahead = MIN_MATCH2 - 1;
        fill_window2(s);
      }
      s.strstart += s.lookahead;
      s.block_start = s.strstart;
      s.insert = s.lookahead;
      s.lookahead = 0;
      s.match_length = s.prev_length = MIN_MATCH2 - 1;
      s.match_available = 0;
      strm.next_in = next;
      strm.input = input;
      strm.avail_in = avail;
      s.wrap = wrap;
      return Z_OK2;
    }
    exports2.deflateInit = deflateInit3;
    exports2.deflateInit2 = deflateInit22;
    exports2.deflateReset = deflateReset2;
    exports2.deflateResetKeep = deflateResetKeep2;
    exports2.deflateSetHeader = deflateSetHeader2;
    exports2.deflate = deflate2;
    exports2.deflateEnd = deflateEnd2;
    exports2.deflateSetDictionary = deflateSetDictionary2;
    exports2.deflateInfo = "pako deflate (from Nodeca project)";
  }
});

// node_modules/jszip/node_modules/pako/lib/utils/strings.js
var require_strings = __commonJS({
  "node_modules/jszip/node_modules/pako/lib/utils/strings.js"(exports2) {
    "use strict";
    var utils = require_common();
    var STR_APPLY_OK = true;
    var STR_APPLY_UIA_OK2 = true;
    try {
      String.fromCharCode.apply(null, [0]);
    } catch (__) {
      STR_APPLY_OK = false;
    }
    try {
      String.fromCharCode.apply(null, new Uint8Array(1));
    } catch (__) {
      STR_APPLY_UIA_OK2 = false;
    }
    var _utf8len2 = new utils.Buf8(256);
    for (q = 0; q < 256; q++) {
      _utf8len2[q] = q >= 252 ? 6 : q >= 248 ? 5 : q >= 240 ? 4 : q >= 224 ? 3 : q >= 192 ? 2 : 1;
    }
    var q;
    _utf8len2[254] = _utf8len2[254] = 1;
    exports2.string2buf = function(str) {
      var buf, c, c2, m_pos, i, str_len = str.length, buf_len = 0;
      for (m_pos = 0; m_pos < str_len; m_pos++) {
        c = str.charCodeAt(m_pos);
        if ((c & 64512) === 55296 && m_pos + 1 < str_len) {
          c2 = str.charCodeAt(m_pos + 1);
          if ((c2 & 64512) === 56320) {
            c = 65536 + (c - 55296 << 10) + (c2 - 56320);
            m_pos++;
          }
        }
        buf_len += c < 128 ? 1 : c < 2048 ? 2 : c < 65536 ? 3 : 4;
      }
      buf = new utils.Buf8(buf_len);
      for (i = 0, m_pos = 0; i < buf_len; m_pos++) {
        c = str.charCodeAt(m_pos);
        if ((c & 64512) === 55296 && m_pos + 1 < str_len) {
          c2 = str.charCodeAt(m_pos + 1);
          if ((c2 & 64512) === 56320) {
            c = 65536 + (c - 55296 << 10) + (c2 - 56320);
            m_pos++;
          }
        }
        if (c < 128) {
          buf[i++] = c;
        } else if (c < 2048) {
          buf[i++] = 192 | c >>> 6;
          buf[i++] = 128 | c & 63;
        } else if (c < 65536) {
          buf[i++] = 224 | c >>> 12;
          buf[i++] = 128 | c >>> 6 & 63;
          buf[i++] = 128 | c & 63;
        } else {
          buf[i++] = 240 | c >>> 18;
          buf[i++] = 128 | c >>> 12 & 63;
          buf[i++] = 128 | c >>> 6 & 63;
          buf[i++] = 128 | c & 63;
        }
      }
      return buf;
    };
    function buf2binstring2(buf, len) {
      if (len < 65534) {
        if (buf.subarray && STR_APPLY_UIA_OK2 || !buf.subarray && STR_APPLY_OK) {
          return String.fromCharCode.apply(null, utils.shrinkBuf(buf, len));
        }
      }
      var result = "";
      for (var i = 0; i < len; i++) {
        result += String.fromCharCode(buf[i]);
      }
      return result;
    }
    exports2.buf2binstring = function(buf) {
      return buf2binstring2(buf, buf.length);
    };
    exports2.binstring2buf = function(str) {
      var buf = new utils.Buf8(str.length);
      for (var i = 0, len = buf.length; i < len; i++) {
        buf[i] = str.charCodeAt(i);
      }
      return buf;
    };
    exports2.buf2string = function(buf, max) {
      var i, out, c, c_len;
      var len = max || buf.length;
      var utf16buf = new Array(len * 2);
      for (out = 0, i = 0; i < len; ) {
        c = buf[i++];
        if (c < 128) {
          utf16buf[out++] = c;
          continue;
        }
        c_len = _utf8len2[c];
        if (c_len > 4) {
          utf16buf[out++] = 65533;
          i += c_len - 1;
          continue;
        }
        c &= c_len === 2 ? 31 : c_len === 3 ? 15 : 7;
        while (c_len > 1 && i < len) {
          c = c << 6 | buf[i++] & 63;
          c_len--;
        }
        if (c_len > 1) {
          utf16buf[out++] = 65533;
          continue;
        }
        if (c < 65536) {
          utf16buf[out++] = c;
        } else {
          c -= 65536;
          utf16buf[out++] = 55296 | c >> 10 & 1023;
          utf16buf[out++] = 56320 | c & 1023;
        }
      }
      return buf2binstring2(utf16buf, out);
    };
    exports2.utf8border = function(buf, max) {
      var pos;
      max = max || buf.length;
      if (max > buf.length) {
        max = buf.length;
      }
      pos = max - 1;
      while (pos >= 0 && (buf[pos] & 192) === 128) {
        pos--;
      }
      if (pos < 0) {
        return max;
      }
      if (pos === 0) {
        return max;
      }
      return pos + _utf8len2[buf[pos]] > max ? pos : max;
    };
  }
});

// node_modules/jszip/node_modules/pako/lib/zlib/zstream.js
var require_zstream = __commonJS({
  "node_modules/jszip/node_modules/pako/lib/zlib/zstream.js"(exports2, module2) {
    "use strict";
    function ZStream2() {
      this.input = null;
      this.next_in = 0;
      this.avail_in = 0;
      this.total_in = 0;
      this.output = null;
      this.next_out = 0;
      this.avail_out = 0;
      this.total_out = 0;
      this.msg = "";
      this.state = null;
      this.data_type = 2;
      this.adler = 0;
    }
    module2.exports = ZStream2;
  }
});

// node_modules/jszip/node_modules/pako/lib/deflate.js
var require_deflate2 = __commonJS({
  "node_modules/jszip/node_modules/pako/lib/deflate.js"(exports2) {
    "use strict";
    var zlib_deflate = require_deflate();
    var utils = require_common();
    var strings2 = require_strings();
    var msg = require_messages();
    var ZStream2 = require_zstream();
    var toString2 = Object.prototype.toString;
    var Z_NO_FLUSH2 = 0;
    var Z_FINISH2 = 4;
    var Z_OK2 = 0;
    var Z_STREAM_END2 = 1;
    var Z_SYNC_FLUSH2 = 2;
    var Z_DEFAULT_COMPRESSION2 = -1;
    var Z_DEFAULT_STRATEGY2 = 0;
    var Z_DEFLATED2 = 8;
    function Deflate2(options) {
      if (!(this instanceof Deflate2)) return new Deflate2(options);
      this.options = utils.assign({
        level: Z_DEFAULT_COMPRESSION2,
        method: Z_DEFLATED2,
        chunkSize: 16384,
        windowBits: 15,
        memLevel: 8,
        strategy: Z_DEFAULT_STRATEGY2,
        to: ""
      }, options || {});
      var opt = this.options;
      if (opt.raw && opt.windowBits > 0) {
        opt.windowBits = -opt.windowBits;
      } else if (opt.gzip && opt.windowBits > 0 && opt.windowBits < 16) {
        opt.windowBits += 16;
      }
      this.err = 0;
      this.msg = "";
      this.ended = false;
      this.chunks = [];
      this.strm = new ZStream2();
      this.strm.avail_out = 0;
      var status = zlib_deflate.deflateInit2(
        this.strm,
        opt.level,
        opt.method,
        opt.windowBits,
        opt.memLevel,
        opt.strategy
      );
      if (status !== Z_OK2) {
        throw new Error(msg[status]);
      }
      if (opt.header) {
        zlib_deflate.deflateSetHeader(this.strm, opt.header);
      }
      if (opt.dictionary) {
        var dict;
        if (typeof opt.dictionary === "string") {
          dict = strings2.string2buf(opt.dictionary);
        } else if (toString2.call(opt.dictionary) === "[object ArrayBuffer]") {
          dict = new Uint8Array(opt.dictionary);
        } else {
          dict = opt.dictionary;
        }
        status = zlib_deflate.deflateSetDictionary(this.strm, dict);
        if (status !== Z_OK2) {
          throw new Error(msg[status]);
        }
        this._dict_set = true;
      }
    }
    Deflate2.prototype.push = function(data, mode) {
      var strm = this.strm;
      var chunkSize = this.options.chunkSize;
      var status, _mode;
      if (this.ended) {
        return false;
      }
      _mode = mode === ~~mode ? mode : mode === true ? Z_FINISH2 : Z_NO_FLUSH2;
      if (typeof data === "string") {
        strm.input = strings2.string2buf(data);
      } else if (toString2.call(data) === "[object ArrayBuffer]") {
        strm.input = new Uint8Array(data);
      } else {
        strm.input = data;
      }
      strm.next_in = 0;
      strm.avail_in = strm.input.length;
      do {
        if (strm.avail_out === 0) {
          strm.output = new utils.Buf8(chunkSize);
          strm.next_out = 0;
          strm.avail_out = chunkSize;
        }
        status = zlib_deflate.deflate(strm, _mode);
        if (status !== Z_STREAM_END2 && status !== Z_OK2) {
          this.onEnd(status);
          this.ended = true;
          return false;
        }
        if (strm.avail_out === 0 || strm.avail_in === 0 && (_mode === Z_FINISH2 || _mode === Z_SYNC_FLUSH2)) {
          if (this.options.to === "string") {
            this.onData(strings2.buf2binstring(utils.shrinkBuf(strm.output, strm.next_out)));
          } else {
            this.onData(utils.shrinkBuf(strm.output, strm.next_out));
          }
        }
      } while ((strm.avail_in > 0 || strm.avail_out === 0) && status !== Z_STREAM_END2);
      if (_mode === Z_FINISH2) {
        status = zlib_deflate.deflateEnd(this.strm);
        this.onEnd(status);
        this.ended = true;
        return status === Z_OK2;
      }
      if (_mode === Z_SYNC_FLUSH2) {
        this.onEnd(Z_OK2);
        strm.avail_out = 0;
        return true;
      }
      return true;
    };
    Deflate2.prototype.onData = function(chunk) {
      this.chunks.push(chunk);
    };
    Deflate2.prototype.onEnd = function(status) {
      if (status === Z_OK2) {
        if (this.options.to === "string") {
          this.result = this.chunks.join("");
        } else {
          this.result = utils.flattenChunks(this.chunks);
        }
      }
      this.chunks = [];
      this.err = status;
      this.msg = this.strm.msg;
    };
    function deflate2(input, options) {
      var deflator = new Deflate2(options);
      deflator.push(input, true);
      if (deflator.err) {
        throw deflator.msg || msg[deflator.err];
      }
      return deflator.result;
    }
    function deflateRaw2(input, options) {
      options = options || {};
      options.raw = true;
      return deflate2(input, options);
    }
    function gzip2(input, options) {
      options = options || {};
      options.gzip = true;
      return deflate2(input, options);
    }
    exports2.Deflate = Deflate2;
    exports2.deflate = deflate2;
    exports2.deflateRaw = deflateRaw2;
    exports2.gzip = gzip2;
  }
});

// node_modules/jszip/node_modules/pako/lib/zlib/inffast.js
var require_inffast = __commonJS({
  "node_modules/jszip/node_modules/pako/lib/zlib/inffast.js"(exports2, module2) {
    "use strict";
    var BAD2 = 30;
    var TYPE2 = 12;
    module2.exports = function inflate_fast2(strm, start) {
      var state;
      var _in;
      var last;
      var _out;
      var beg;
      var end;
      var dmax;
      var wsize;
      var whave;
      var wnext;
      var s_window;
      var hold;
      var bits;
      var lcode;
      var dcode;
      var lmask;
      var dmask;
      var here;
      var op;
      var len;
      var dist;
      var from;
      var from_source;
      var input, output;
      state = strm.state;
      _in = strm.next_in;
      input = strm.input;
      last = _in + (strm.avail_in - 5);
      _out = strm.next_out;
      output = strm.output;
      beg = _out - (start - strm.avail_out);
      end = _out + (strm.avail_out - 257);
      dmax = state.dmax;
      wsize = state.wsize;
      whave = state.whave;
      wnext = state.wnext;
      s_window = state.window;
      hold = state.hold;
      bits = state.bits;
      lcode = state.lencode;
      dcode = state.distcode;
      lmask = (1 << state.lenbits) - 1;
      dmask = (1 << state.distbits) - 1;
      top:
        do {
          if (bits < 15) {
            hold += input[_in++] << bits;
            bits += 8;
            hold += input[_in++] << bits;
            bits += 8;
          }
          here = lcode[hold & lmask];
          dolen:
            for (; ; ) {
              op = here >>> 24;
              hold >>>= op;
              bits -= op;
              op = here >>> 16 & 255;
              if (op === 0) {
                output[_out++] = here & 65535;
              } else if (op & 16) {
                len = here & 65535;
                op &= 15;
                if (op) {
                  if (bits < op) {
                    hold += input[_in++] << bits;
                    bits += 8;
                  }
                  len += hold & (1 << op) - 1;
                  hold >>>= op;
                  bits -= op;
                }
                if (bits < 15) {
                  hold += input[_in++] << bits;
                  bits += 8;
                  hold += input[_in++] << bits;
                  bits += 8;
                }
                here = dcode[hold & dmask];
                dodist:
                  for (; ; ) {
                    op = here >>> 24;
                    hold >>>= op;
                    bits -= op;
                    op = here >>> 16 & 255;
                    if (op & 16) {
                      dist = here & 65535;
                      op &= 15;
                      if (bits < op) {
                        hold += input[_in++] << bits;
                        bits += 8;
                        if (bits < op) {
                          hold += input[_in++] << bits;
                          bits += 8;
                        }
                      }
                      dist += hold & (1 << op) - 1;
                      if (dist > dmax) {
                        strm.msg = "invalid distance too far back";
                        state.mode = BAD2;
                        break top;
                      }
                      hold >>>= op;
                      bits -= op;
                      op = _out - beg;
                      if (dist > op) {
                        op = dist - op;
                        if (op > whave) {
                          if (state.sane) {
                            strm.msg = "invalid distance too far back";
                            state.mode = BAD2;
                            break top;
                          }
                        }
                        from = 0;
                        from_source = s_window;
                        if (wnext === 0) {
                          from += wsize - op;
                          if (op < len) {
                            len -= op;
                            do {
                              output[_out++] = s_window[from++];
                            } while (--op);
                            from = _out - dist;
                            from_source = output;
                          }
                        } else if (wnext < op) {
                          from += wsize + wnext - op;
                          op -= wnext;
                          if (op < len) {
                            len -= op;
                            do {
                              output[_out++] = s_window[from++];
                            } while (--op);
                            from = 0;
                            if (wnext < len) {
                              op = wnext;
                              len -= op;
                              do {
                                output[_out++] = s_window[from++];
                              } while (--op);
                              from = _out - dist;
                              from_source = output;
                            }
                          }
                        } else {
                          from += wnext - op;
                          if (op < len) {
                            len -= op;
                            do {
                              output[_out++] = s_window[from++];
                            } while (--op);
                            from = _out - dist;
                            from_source = output;
                          }
                        }
                        while (len > 2) {
                          output[_out++] = from_source[from++];
                          output[_out++] = from_source[from++];
                          output[_out++] = from_source[from++];
                          len -= 3;
                        }
                        if (len) {
                          output[_out++] = from_source[from++];
                          if (len > 1) {
                            output[_out++] = from_source[from++];
                          }
                        }
                      } else {
                        from = _out - dist;
                        do {
                          output[_out++] = output[from++];
                          output[_out++] = output[from++];
                          output[_out++] = output[from++];
                          len -= 3;
                        } while (len > 2);
                        if (len) {
                          output[_out++] = output[from++];
                          if (len > 1) {
                            output[_out++] = output[from++];
                          }
                        }
                      }
                    } else if ((op & 64) === 0) {
                      here = dcode[(here & 65535) + (hold & (1 << op) - 1)];
                      continue dodist;
                    } else {
                      strm.msg = "invalid distance code";
                      state.mode = BAD2;
                      break top;
                    }
                    break;
                  }
              } else if ((op & 64) === 0) {
                here = lcode[(here & 65535) + (hold & (1 << op) - 1)];
                continue dolen;
              } else if (op & 32) {
                state.mode = TYPE2;
                break top;
              } else {
                strm.msg = "invalid literal/length code";
                state.mode = BAD2;
                break top;
              }
              break;
            }
        } while (_in < last && _out < end);
      len = bits >> 3;
      _in -= len;
      bits -= len << 3;
      hold &= (1 << bits) - 1;
      strm.next_in = _in;
      strm.next_out = _out;
      strm.avail_in = _in < last ? 5 + (last - _in) : 5 - (_in - last);
      strm.avail_out = _out < end ? 257 + (end - _out) : 257 - (_out - end);
      state.hold = hold;
      state.bits = bits;
      return;
    };
  }
});

// node_modules/jszip/node_modules/pako/lib/zlib/inftrees.js
var require_inftrees = __commonJS({
  "node_modules/jszip/node_modules/pako/lib/zlib/inftrees.js"(exports2, module2) {
    "use strict";
    var utils = require_common();
    var MAXBITS2 = 15;
    var ENOUGH_LENS2 = 852;
    var ENOUGH_DISTS2 = 592;
    var CODES2 = 0;
    var LENS2 = 1;
    var DISTS2 = 2;
    var lbase2 = [
      /* Length codes 257..285 base */
      3,
      4,
      5,
      6,
      7,
      8,
      9,
      10,
      11,
      13,
      15,
      17,
      19,
      23,
      27,
      31,
      35,
      43,
      51,
      59,
      67,
      83,
      99,
      115,
      131,
      163,
      195,
      227,
      258,
      0,
      0
    ];
    var lext2 = [
      /* Length codes 257..285 extra */
      16,
      16,
      16,
      16,
      16,
      16,
      16,
      16,
      17,
      17,
      17,
      17,
      18,
      18,
      18,
      18,
      19,
      19,
      19,
      19,
      20,
      20,
      20,
      20,
      21,
      21,
      21,
      21,
      16,
      72,
      78
    ];
    var dbase2 = [
      /* Distance codes 0..29 base */
      1,
      2,
      3,
      4,
      5,
      7,
      9,
      13,
      17,
      25,
      33,
      49,
      65,
      97,
      129,
      193,
      257,
      385,
      513,
      769,
      1025,
      1537,
      2049,
      3073,
      4097,
      6145,
      8193,
      12289,
      16385,
      24577,
      0,
      0
    ];
    var dext2 = [
      /* Distance codes 0..29 extra */
      16,
      16,
      16,
      16,
      17,
      17,
      18,
      18,
      19,
      19,
      20,
      20,
      21,
      21,
      22,
      22,
      23,
      23,
      24,
      24,
      25,
      25,
      26,
      26,
      27,
      27,
      28,
      28,
      29,
      29,
      64,
      64
    ];
    module2.exports = function inflate_table2(type, lens, lens_index, codes, table, table_index, work, opts) {
      var bits = opts.bits;
      var len = 0;
      var sym = 0;
      var min = 0, max = 0;
      var root = 0;
      var curr = 0;
      var drop = 0;
      var left = 0;
      var used = 0;
      var huff = 0;
      var incr;
      var fill;
      var low;
      var mask;
      var next;
      var base = null;
      var base_index = 0;
      var end;
      var count = new utils.Buf16(MAXBITS2 + 1);
      var offs = new utils.Buf16(MAXBITS2 + 1);
      var extra = null;
      var extra_index = 0;
      var here_bits, here_op, here_val;
      for (len = 0; len <= MAXBITS2; len++) {
        count[len] = 0;
      }
      for (sym = 0; sym < codes; sym++) {
        count[lens[lens_index + sym]]++;
      }
      root = bits;
      for (max = MAXBITS2; max >= 1; max--) {
        if (count[max] !== 0) {
          break;
        }
      }
      if (root > max) {
        root = max;
      }
      if (max === 0) {
        table[table_index++] = 1 << 24 | 64 << 16 | 0;
        table[table_index++] = 1 << 24 | 64 << 16 | 0;
        opts.bits = 1;
        return 0;
      }
      for (min = 1; min < max; min++) {
        if (count[min] !== 0) {
          break;
        }
      }
      if (root < min) {
        root = min;
      }
      left = 1;
      for (len = 1; len <= MAXBITS2; len++) {
        left <<= 1;
        left -= count[len];
        if (left < 0) {
          return -1;
        }
      }
      if (left > 0 && (type === CODES2 || max !== 1)) {
        return -1;
      }
      offs[1] = 0;
      for (len = 1; len < MAXBITS2; len++) {
        offs[len + 1] = offs[len] + count[len];
      }
      for (sym = 0; sym < codes; sym++) {
        if (lens[lens_index + sym] !== 0) {
          work[offs[lens[lens_index + sym]]++] = sym;
        }
      }
      if (type === CODES2) {
        base = extra = work;
        end = 19;
      } else if (type === LENS2) {
        base = lbase2;
        base_index -= 257;
        extra = lext2;
        extra_index -= 257;
        end = 256;
      } else {
        base = dbase2;
        extra = dext2;
        end = -1;
      }
      huff = 0;
      sym = 0;
      len = min;
      next = table_index;
      curr = root;
      drop = 0;
      low = -1;
      used = 1 << root;
      mask = used - 1;
      if (type === LENS2 && used > ENOUGH_LENS2 || type === DISTS2 && used > ENOUGH_DISTS2) {
        return 1;
      }
      for (; ; ) {
        here_bits = len - drop;
        if (work[sym] < end) {
          here_op = 0;
          here_val = work[sym];
        } else if (work[sym] > end) {
          here_op = extra[extra_index + work[sym]];
          here_val = base[base_index + work[sym]];
        } else {
          here_op = 32 + 64;
          here_val = 0;
        }
        incr = 1 << len - drop;
        fill = 1 << curr;
        min = fill;
        do {
          fill -= incr;
          table[next + (huff >> drop) + fill] = here_bits << 24 | here_op << 16 | here_val | 0;
        } while (fill !== 0);
        incr = 1 << len - 1;
        while (huff & incr) {
          incr >>= 1;
        }
        if (incr !== 0) {
          huff &= incr - 1;
          huff += incr;
        } else {
          huff = 0;
        }
        sym++;
        if (--count[len] === 0) {
          if (len === max) {
            break;
          }
          len = lens[lens_index + work[sym]];
        }
        if (len > root && (huff & mask) !== low) {
          if (drop === 0) {
            drop = root;
          }
          next += min;
          curr = len - drop;
          left = 1 << curr;
          while (curr + drop < max) {
            left -= count[curr + drop];
            if (left <= 0) {
              break;
            }
            curr++;
            left <<= 1;
          }
          used += 1 << curr;
          if (type === LENS2 && used > ENOUGH_LENS2 || type === DISTS2 && used > ENOUGH_DISTS2) {
            return 1;
          }
          low = huff & mask;
          table[low] = root << 24 | curr << 16 | next - table_index | 0;
        }
      }
      if (huff !== 0) {
        table[next + huff] = len - drop << 24 | 64 << 16 | 0;
      }
      opts.bits = root;
      return 0;
    };
  }
});

// node_modules/jszip/node_modules/pako/lib/zlib/inflate.js
var require_inflate = __commonJS({
  "node_modules/jszip/node_modules/pako/lib/zlib/inflate.js"(exports2) {
    "use strict";
    var utils = require_common();
    var adler322 = require_adler32();
    var crc322 = require_crc322();
    var inflate_fast2 = require_inffast();
    var inflate_table2 = require_inftrees();
    var CODES2 = 0;
    var LENS2 = 1;
    var DISTS2 = 2;
    var Z_FINISH2 = 4;
    var Z_BLOCK2 = 5;
    var Z_TREES2 = 6;
    var Z_OK2 = 0;
    var Z_STREAM_END2 = 1;
    var Z_NEED_DICT2 = 2;
    var Z_STREAM_ERROR2 = -2;
    var Z_DATA_ERROR2 = -3;
    var Z_MEM_ERROR2 = -4;
    var Z_BUF_ERROR2 = -5;
    var Z_DEFLATED2 = 8;
    var HEAD2 = 1;
    var FLAGS2 = 2;
    var TIME2 = 3;
    var OS2 = 4;
    var EXLEN2 = 5;
    var EXTRA2 = 6;
    var NAME2 = 7;
    var COMMENT2 = 8;
    var HCRC2 = 9;
    var DICTID2 = 10;
    var DICT2 = 11;
    var TYPE2 = 12;
    var TYPEDO2 = 13;
    var STORED2 = 14;
    var COPY_2 = 15;
    var COPY2 = 16;
    var TABLE2 = 17;
    var LENLENS2 = 18;
    var CODELENS2 = 19;
    var LEN_2 = 20;
    var LEN2 = 21;
    var LENEXT2 = 22;
    var DIST2 = 23;
    var DISTEXT2 = 24;
    var MATCH2 = 25;
    var LIT2 = 26;
    var CHECK2 = 27;
    var LENGTH2 = 28;
    var DONE2 = 29;
    var BAD2 = 30;
    var MEM2 = 31;
    var SYNC2 = 32;
    var ENOUGH_LENS2 = 852;
    var ENOUGH_DISTS2 = 592;
    var MAX_WBITS2 = 15;
    var DEF_WBITS2 = MAX_WBITS2;
    function zswap322(q) {
      return (q >>> 24 & 255) + (q >>> 8 & 65280) + ((q & 65280) << 8) + ((q & 255) << 24);
    }
    function InflateState2() {
      this.mode = 0;
      this.last = false;
      this.wrap = 0;
      this.havedict = false;
      this.flags = 0;
      this.dmax = 0;
      this.check = 0;
      this.total = 0;
      this.head = null;
      this.wbits = 0;
      this.wsize = 0;
      this.whave = 0;
      this.wnext = 0;
      this.window = null;
      this.hold = 0;
      this.bits = 0;
      this.length = 0;
      this.offset = 0;
      this.extra = 0;
      this.lencode = null;
      this.distcode = null;
      this.lenbits = 0;
      this.distbits = 0;
      this.ncode = 0;
      this.nlen = 0;
      this.ndist = 0;
      this.have = 0;
      this.next = null;
      this.lens = new utils.Buf16(320);
      this.work = new utils.Buf16(288);
      this.lendyn = null;
      this.distdyn = null;
      this.sane = 0;
      this.back = 0;
      this.was = 0;
    }
    function inflateResetKeep2(strm) {
      var state;
      if (!strm || !strm.state) {
        return Z_STREAM_ERROR2;
      }
      state = strm.state;
      strm.total_in = strm.total_out = state.total = 0;
      strm.msg = "";
      if (state.wrap) {
        strm.adler = state.wrap & 1;
      }
      state.mode = HEAD2;
      state.last = 0;
      state.havedict = 0;
      state.dmax = 32768;
      state.head = null;
      state.hold = 0;
      state.bits = 0;
      state.lencode = state.lendyn = new utils.Buf32(ENOUGH_LENS2);
      state.distcode = state.distdyn = new utils.Buf32(ENOUGH_DISTS2);
      state.sane = 1;
      state.back = -1;
      return Z_OK2;
    }
    function inflateReset3(strm) {
      var state;
      if (!strm || !strm.state) {
        return Z_STREAM_ERROR2;
      }
      state = strm.state;
      state.wsize = 0;
      state.whave = 0;
      state.wnext = 0;
      return inflateResetKeep2(strm);
    }
    function inflateReset22(strm, windowBits) {
      var wrap;
      var state;
      if (!strm || !strm.state) {
        return Z_STREAM_ERROR2;
      }
      state = strm.state;
      if (windowBits < 0) {
        wrap = 0;
        windowBits = -windowBits;
      } else {
        wrap = (windowBits >> 4) + 1;
        if (windowBits < 48) {
          windowBits &= 15;
        }
      }
      if (windowBits && (windowBits < 8 || windowBits > 15)) {
        return Z_STREAM_ERROR2;
      }
      if (state.window !== null && state.wbits !== windowBits) {
        state.window = null;
      }
      state.wrap = wrap;
      state.wbits = windowBits;
      return inflateReset3(strm);
    }
    function inflateInit22(strm, windowBits) {
      var ret;
      var state;
      if (!strm) {
        return Z_STREAM_ERROR2;
      }
      state = new InflateState2();
      strm.state = state;
      state.window = null;
      ret = inflateReset22(strm, windowBits);
      if (ret !== Z_OK2) {
        strm.state = null;
      }
      return ret;
    }
    function inflateInit3(strm) {
      return inflateInit22(strm, DEF_WBITS2);
    }
    var virgin2 = true;
    var lenfix2;
    var distfix2;
    function fixedtables2(state) {
      if (virgin2) {
        var sym;
        lenfix2 = new utils.Buf32(512);
        distfix2 = new utils.Buf32(32);
        sym = 0;
        while (sym < 144) {
          state.lens[sym++] = 8;
        }
        while (sym < 256) {
          state.lens[sym++] = 9;
        }
        while (sym < 280) {
          state.lens[sym++] = 7;
        }
        while (sym < 288) {
          state.lens[sym++] = 8;
        }
        inflate_table2(LENS2, state.lens, 0, 288, lenfix2, 0, state.work, { bits: 9 });
        sym = 0;
        while (sym < 32) {
          state.lens[sym++] = 5;
        }
        inflate_table2(DISTS2, state.lens, 0, 32, distfix2, 0, state.work, { bits: 5 });
        virgin2 = false;
      }
      state.lencode = lenfix2;
      state.lenbits = 9;
      state.distcode = distfix2;
      state.distbits = 5;
    }
    function updatewindow2(strm, src, end, copy) {
      var dist;
      var state = strm.state;
      if (state.window === null) {
        state.wsize = 1 << state.wbits;
        state.wnext = 0;
        state.whave = 0;
        state.window = new utils.Buf8(state.wsize);
      }
      if (copy >= state.wsize) {
        utils.arraySet(state.window, src, end - state.wsize, state.wsize, 0);
        state.wnext = 0;
        state.whave = state.wsize;
      } else {
        dist = state.wsize - state.wnext;
        if (dist > copy) {
          dist = copy;
        }
        utils.arraySet(state.window, src, end - copy, dist, state.wnext);
        copy -= dist;
        if (copy) {
          utils.arraySet(state.window, src, end - copy, copy, 0);
          state.wnext = copy;
          state.whave = state.wsize;
        } else {
          state.wnext += dist;
          if (state.wnext === state.wsize) {
            state.wnext = 0;
          }
          if (state.whave < state.wsize) {
            state.whave += dist;
          }
        }
      }
      return 0;
    }
    function inflate2(strm, flush) {
      var state;
      var input, output;
      var next;
      var put;
      var have, left;
      var hold;
      var bits;
      var _in, _out;
      var copy;
      var from;
      var from_source;
      var here = 0;
      var here_bits, here_op, here_val;
      var last_bits, last_op, last_val;
      var len;
      var ret;
      var hbuf = new utils.Buf8(4);
      var opts;
      var n;
      var order = (
        /* permutation of code lengths */
        [16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15]
      );
      if (!strm || !strm.state || !strm.output || !strm.input && strm.avail_in !== 0) {
        return Z_STREAM_ERROR2;
      }
      state = strm.state;
      if (state.mode === TYPE2) {
        state.mode = TYPEDO2;
      }
      put = strm.next_out;
      output = strm.output;
      left = strm.avail_out;
      next = strm.next_in;
      input = strm.input;
      have = strm.avail_in;
      hold = state.hold;
      bits = state.bits;
      _in = have;
      _out = left;
      ret = Z_OK2;
      inf_leave:
        for (; ; ) {
          switch (state.mode) {
            case HEAD2:
              if (state.wrap === 0) {
                state.mode = TYPEDO2;
                break;
              }
              while (bits < 16) {
                if (have === 0) {
                  break inf_leave;
                }
                have--;
                hold += input[next++] << bits;
                bits += 8;
              }
              if (state.wrap & 2 && hold === 35615) {
                state.check = 0;
                hbuf[0] = hold & 255;
                hbuf[1] = hold >>> 8 & 255;
                state.check = crc322(state.check, hbuf, 2, 0);
                hold = 0;
                bits = 0;
                state.mode = FLAGS2;
                break;
              }
              state.flags = 0;
              if (state.head) {
                state.head.done = false;
              }
              if (!(state.wrap & 1) || /* check if zlib header allowed */
              (((hold & 255) << 8) + (hold >> 8)) % 31) {
                strm.msg = "incorrect header check";
                state.mode = BAD2;
                break;
              }
              if ((hold & 15) !== Z_DEFLATED2) {
                strm.msg = "unknown compression method";
                state.mode = BAD2;
                break;
              }
              hold >>>= 4;
              bits -= 4;
              len = (hold & 15) + 8;
              if (state.wbits === 0) {
                state.wbits = len;
              } else if (len > state.wbits) {
                strm.msg = "invalid window size";
                state.mode = BAD2;
                break;
              }
              state.dmax = 1 << len;
              strm.adler = state.check = 1;
              state.mode = hold & 512 ? DICTID2 : TYPE2;
              hold = 0;
              bits = 0;
              break;
            case FLAGS2:
              while (bits < 16) {
                if (have === 0) {
                  break inf_leave;
                }
                have--;
                hold += input[next++] << bits;
                bits += 8;
              }
              state.flags = hold;
              if ((state.flags & 255) !== Z_DEFLATED2) {
                strm.msg = "unknown compression method";
                state.mode = BAD2;
                break;
              }
              if (state.flags & 57344) {
                strm.msg = "unknown header flags set";
                state.mode = BAD2;
                break;
              }
              if (state.head) {
                state.head.text = hold >> 8 & 1;
              }
              if (state.flags & 512) {
                hbuf[0] = hold & 255;
                hbuf[1] = hold >>> 8 & 255;
                state.check = crc322(state.check, hbuf, 2, 0);
              }
              hold = 0;
              bits = 0;
              state.mode = TIME2;
            /* falls through */
            case TIME2:
              while (bits < 32) {
                if (have === 0) {
                  break inf_leave;
                }
                have--;
                hold += input[next++] << bits;
                bits += 8;
              }
              if (state.head) {
                state.head.time = hold;
              }
              if (state.flags & 512) {
                hbuf[0] = hold & 255;
                hbuf[1] = hold >>> 8 & 255;
                hbuf[2] = hold >>> 16 & 255;
                hbuf[3] = hold >>> 24 & 255;
                state.check = crc322(state.check, hbuf, 4, 0);
              }
              hold = 0;
              bits = 0;
              state.mode = OS2;
            /* falls through */
            case OS2:
              while (bits < 16) {
                if (have === 0) {
                  break inf_leave;
                }
                have--;
                hold += input[next++] << bits;
                bits += 8;
              }
              if (state.head) {
                state.head.xflags = hold & 255;
                state.head.os = hold >> 8;
              }
              if (state.flags & 512) {
                hbuf[0] = hold & 255;
                hbuf[1] = hold >>> 8 & 255;
                state.check = crc322(state.check, hbuf, 2, 0);
              }
              hold = 0;
              bits = 0;
              state.mode = EXLEN2;
            /* falls through */
            case EXLEN2:
              if (state.flags & 1024) {
                while (bits < 16) {
                  if (have === 0) {
                    break inf_leave;
                  }
                  have--;
                  hold += input[next++] << bits;
                  bits += 8;
                }
                state.length = hold;
                if (state.head) {
                  state.head.extra_len = hold;
                }
                if (state.flags & 512) {
                  hbuf[0] = hold & 255;
                  hbuf[1] = hold >>> 8 & 255;
                  state.check = crc322(state.check, hbuf, 2, 0);
                }
                hold = 0;
                bits = 0;
              } else if (state.head) {
                state.head.extra = null;
              }
              state.mode = EXTRA2;
            /* falls through */
            case EXTRA2:
              if (state.flags & 1024) {
                copy = state.length;
                if (copy > have) {
                  copy = have;
                }
                if (copy) {
                  if (state.head) {
                    len = state.head.extra_len - state.length;
                    if (!state.head.extra) {
                      state.head.extra = new Array(state.head.extra_len);
                    }
                    utils.arraySet(
                      state.head.extra,
                      input,
                      next,
                      // extra field is limited to 65536 bytes
                      // - no need for additional size check
                      copy,
                      /*len + copy > state.head.extra_max - len ? state.head.extra_max : copy,*/
                      len
                    );
                  }
                  if (state.flags & 512) {
                    state.check = crc322(state.check, input, copy, next);
                  }
                  have -= copy;
                  next += copy;
                  state.length -= copy;
                }
                if (state.length) {
                  break inf_leave;
                }
              }
              state.length = 0;
              state.mode = NAME2;
            /* falls through */
            case NAME2:
              if (state.flags & 2048) {
                if (have === 0) {
                  break inf_leave;
                }
                copy = 0;
                do {
                  len = input[next + copy++];
                  if (state.head && len && state.length < 65536) {
                    state.head.name += String.fromCharCode(len);
                  }
                } while (len && copy < have);
                if (state.flags & 512) {
                  state.check = crc322(state.check, input, copy, next);
                }
                have -= copy;
                next += copy;
                if (len) {
                  break inf_leave;
                }
              } else if (state.head) {
                state.head.name = null;
              }
              state.length = 0;
              state.mode = COMMENT2;
            /* falls through */
            case COMMENT2:
              if (state.flags & 4096) {
                if (have === 0) {
                  break inf_leave;
                }
                copy = 0;
                do {
                  len = input[next + copy++];
                  if (state.head && len && state.length < 65536) {
                    state.head.comment += String.fromCharCode(len);
                  }
                } while (len && copy < have);
                if (state.flags & 512) {
                  state.check = crc322(state.check, input, copy, next);
                }
                have -= copy;
                next += copy;
                if (len) {
                  break inf_leave;
                }
              } else if (state.head) {
                state.head.comment = null;
              }
              state.mode = HCRC2;
            /* falls through */
            case HCRC2:
              if (state.flags & 512) {
                while (bits < 16) {
                  if (have === 0) {
                    break inf_leave;
                  }
                  have--;
                  hold += input[next++] << bits;
                  bits += 8;
                }
                if (hold !== (state.check & 65535)) {
                  strm.msg = "header crc mismatch";
                  state.mode = BAD2;
                  break;
                }
                hold = 0;
                bits = 0;
              }
              if (state.head) {
                state.head.hcrc = state.flags >> 9 & 1;
                state.head.done = true;
              }
              strm.adler = state.check = 0;
              state.mode = TYPE2;
              break;
            case DICTID2:
              while (bits < 32) {
                if (have === 0) {
                  break inf_leave;
                }
                have--;
                hold += input[next++] << bits;
                bits += 8;
              }
              strm.adler = state.check = zswap322(hold);
              hold = 0;
              bits = 0;
              state.mode = DICT2;
            /* falls through */
            case DICT2:
              if (state.havedict === 0) {
                strm.next_out = put;
                strm.avail_out = left;
                strm.next_in = next;
                strm.avail_in = have;
                state.hold = hold;
                state.bits = bits;
                return Z_NEED_DICT2;
              }
              strm.adler = state.check = 1;
              state.mode = TYPE2;
            /* falls through */
            case TYPE2:
              if (flush === Z_BLOCK2 || flush === Z_TREES2) {
                break inf_leave;
              }
            /* falls through */
            case TYPEDO2:
              if (state.last) {
                hold >>>= bits & 7;
                bits -= bits & 7;
                state.mode = CHECK2;
                break;
              }
              while (bits < 3) {
                if (have === 0) {
                  break inf_leave;
                }
                have--;
                hold += input[next++] << bits;
                bits += 8;
              }
              state.last = hold & 1;
              hold >>>= 1;
              bits -= 1;
              switch (hold & 3) {
                case 0:
                  state.mode = STORED2;
                  break;
                case 1:
                  fixedtables2(state);
                  state.mode = LEN_2;
                  if (flush === Z_TREES2) {
                    hold >>>= 2;
                    bits -= 2;
                    break inf_leave;
                  }
                  break;
                case 2:
                  state.mode = TABLE2;
                  break;
                case 3:
                  strm.msg = "invalid block type";
                  state.mode = BAD2;
              }
              hold >>>= 2;
              bits -= 2;
              break;
            case STORED2:
              hold >>>= bits & 7;
              bits -= bits & 7;
              while (bits < 32) {
                if (have === 0) {
                  break inf_leave;
                }
                have--;
                hold += input[next++] << bits;
                bits += 8;
              }
              if ((hold & 65535) !== (hold >>> 16 ^ 65535)) {
                strm.msg = "invalid stored block lengths";
                state.mode = BAD2;
                break;
              }
              state.length = hold & 65535;
              hold = 0;
              bits = 0;
              state.mode = COPY_2;
              if (flush === Z_TREES2) {
                break inf_leave;
              }
            /* falls through */
            case COPY_2:
              state.mode = COPY2;
            /* falls through */
            case COPY2:
              copy = state.length;
              if (copy) {
                if (copy > have) {
                  copy = have;
                }
                if (copy > left) {
                  copy = left;
                }
                if (copy === 0) {
                  break inf_leave;
                }
                utils.arraySet(output, input, next, copy, put);
                have -= copy;
                next += copy;
                left -= copy;
                put += copy;
                state.length -= copy;
                break;
              }
              state.mode = TYPE2;
              break;
            case TABLE2:
              while (bits < 14) {
                if (have === 0) {
                  break inf_leave;
                }
                have--;
                hold += input[next++] << bits;
                bits += 8;
              }
              state.nlen = (hold & 31) + 257;
              hold >>>= 5;
              bits -= 5;
              state.ndist = (hold & 31) + 1;
              hold >>>= 5;
              bits -= 5;
              state.ncode = (hold & 15) + 4;
              hold >>>= 4;
              bits -= 4;
              if (state.nlen > 286 || state.ndist > 30) {
                strm.msg = "too many length or distance symbols";
                state.mode = BAD2;
                break;
              }
              state.have = 0;
              state.mode = LENLENS2;
            /* falls through */
            case LENLENS2:
              while (state.have < state.ncode) {
                while (bits < 3) {
                  if (have === 0) {
                    break inf_leave;
                  }
                  have--;
                  hold += input[next++] << bits;
                  bits += 8;
                }
                state.lens[order[state.have++]] = hold & 7;
                hold >>>= 3;
                bits -= 3;
              }
              while (state.have < 19) {
                state.lens[order[state.have++]] = 0;
              }
              state.lencode = state.lendyn;
              state.lenbits = 7;
              opts = { bits: state.lenbits };
              ret = inflate_table2(CODES2, state.lens, 0, 19, state.lencode, 0, state.work, opts);
              state.lenbits = opts.bits;
              if (ret) {
                strm.msg = "invalid code lengths set";
                state.mode = BAD2;
                break;
              }
              state.have = 0;
              state.mode = CODELENS2;
            /* falls through */
            case CODELENS2:
              while (state.have < state.nlen + state.ndist) {
                for (; ; ) {
                  here = state.lencode[hold & (1 << state.lenbits) - 1];
                  here_bits = here >>> 24;
                  here_op = here >>> 16 & 255;
                  here_val = here & 65535;
                  if (here_bits <= bits) {
                    break;
                  }
                  if (have === 0) {
                    break inf_leave;
                  }
                  have--;
                  hold += input[next++] << bits;
                  bits += 8;
                }
                if (here_val < 16) {
                  hold >>>= here_bits;
                  bits -= here_bits;
                  state.lens[state.have++] = here_val;
                } else {
                  if (here_val === 16) {
                    n = here_bits + 2;
                    while (bits < n) {
                      if (have === 0) {
                        break inf_leave;
                      }
                      have--;
                      hold += input[next++] << bits;
                      bits += 8;
                    }
                    hold >>>= here_bits;
                    bits -= here_bits;
                    if (state.have === 0) {
                      strm.msg = "invalid bit length repeat";
                      state.mode = BAD2;
                      break;
                    }
                    len = state.lens[state.have - 1];
                    copy = 3 + (hold & 3);
                    hold >>>= 2;
                    bits -= 2;
                  } else if (here_val === 17) {
                    n = here_bits + 3;
                    while (bits < n) {
                      if (have === 0) {
                        break inf_leave;
                      }
                      have--;
                      hold += input[next++] << bits;
                      bits += 8;
                    }
                    hold >>>= here_bits;
                    bits -= here_bits;
                    len = 0;
                    copy = 3 + (hold & 7);
                    hold >>>= 3;
                    bits -= 3;
                  } else {
                    n = here_bits + 7;
                    while (bits < n) {
                      if (have === 0) {
                        break inf_leave;
                      }
                      have--;
                      hold += input[next++] << bits;
                      bits += 8;
                    }
                    hold >>>= here_bits;
                    bits -= here_bits;
                    len = 0;
                    copy = 11 + (hold & 127);
                    hold >>>= 7;
                    bits -= 7;
                  }
                  if (state.have + copy > state.nlen + state.ndist) {
                    strm.msg = "invalid bit length repeat";
                    state.mode = BAD2;
                    break;
                  }
                  while (copy--) {
                    state.lens[state.have++] = len;
                  }
                }
              }
              if (state.mode === BAD2) {
                break;
              }
              if (state.lens[256] === 0) {
                strm.msg = "invalid code -- missing end-of-block";
                state.mode = BAD2;
                break;
              }
              state.lenbits = 9;
              opts = { bits: state.lenbits };
              ret = inflate_table2(LENS2, state.lens, 0, state.nlen, state.lencode, 0, state.work, opts);
              state.lenbits = opts.bits;
              if (ret) {
                strm.msg = "invalid literal/lengths set";
                state.mode = BAD2;
                break;
              }
              state.distbits = 6;
              state.distcode = state.distdyn;
              opts = { bits: state.distbits };
              ret = inflate_table2(DISTS2, state.lens, state.nlen, state.ndist, state.distcode, 0, state.work, opts);
              state.distbits = opts.bits;
              if (ret) {
                strm.msg = "invalid distances set";
                state.mode = BAD2;
                break;
              }
              state.mode = LEN_2;
              if (flush === Z_TREES2) {
                break inf_leave;
              }
            /* falls through */
            case LEN_2:
              state.mode = LEN2;
            /* falls through */
            case LEN2:
              if (have >= 6 && left >= 258) {
                strm.next_out = put;
                strm.avail_out = left;
                strm.next_in = next;
                strm.avail_in = have;
                state.hold = hold;
                state.bits = bits;
                inflate_fast2(strm, _out);
                put = strm.next_out;
                output = strm.output;
                left = strm.avail_out;
                next = strm.next_in;
                input = strm.input;
                have = strm.avail_in;
                hold = state.hold;
                bits = state.bits;
                if (state.mode === TYPE2) {
                  state.back = -1;
                }
                break;
              }
              state.back = 0;
              for (; ; ) {
                here = state.lencode[hold & (1 << state.lenbits) - 1];
                here_bits = here >>> 24;
                here_op = here >>> 16 & 255;
                here_val = here & 65535;
                if (here_bits <= bits) {
                  break;
                }
                if (have === 0) {
                  break inf_leave;
                }
                have--;
                hold += input[next++] << bits;
                bits += 8;
              }
              if (here_op && (here_op & 240) === 0) {
                last_bits = here_bits;
                last_op = here_op;
                last_val = here_val;
                for (; ; ) {
                  here = state.lencode[last_val + ((hold & (1 << last_bits + last_op) - 1) >> last_bits)];
                  here_bits = here >>> 24;
                  here_op = here >>> 16 & 255;
                  here_val = here & 65535;
                  if (last_bits + here_bits <= bits) {
                    break;
                  }
                  if (have === 0) {
                    break inf_leave;
                  }
                  have--;
                  hold += input[next++] << bits;
                  bits += 8;
                }
                hold >>>= last_bits;
                bits -= last_bits;
                state.back += last_bits;
              }
              hold >>>= here_bits;
              bits -= here_bits;
              state.back += here_bits;
              state.length = here_val;
              if (here_op === 0) {
                state.mode = LIT2;
                break;
              }
              if (here_op & 32) {
                state.back = -1;
                state.mode = TYPE2;
                break;
              }
              if (here_op & 64) {
                strm.msg = "invalid literal/length code";
                state.mode = BAD2;
                break;
              }
              state.extra = here_op & 15;
              state.mode = LENEXT2;
            /* falls through */
            case LENEXT2:
              if (state.extra) {
                n = state.extra;
                while (bits < n) {
                  if (have === 0) {
                    break inf_leave;
                  }
                  have--;
                  hold += input[next++] << bits;
                  bits += 8;
                }
                state.length += hold & (1 << state.extra) - 1;
                hold >>>= state.extra;
                bits -= state.extra;
                state.back += state.extra;
              }
              state.was = state.length;
              state.mode = DIST2;
            /* falls through */
            case DIST2:
              for (; ; ) {
                here = state.distcode[hold & (1 << state.distbits) - 1];
                here_bits = here >>> 24;
                here_op = here >>> 16 & 255;
                here_val = here & 65535;
                if (here_bits <= bits) {
                  break;
                }
                if (have === 0) {
                  break inf_leave;
                }
                have--;
                hold += input[next++] << bits;
                bits += 8;
              }
              if ((here_op & 240) === 0) {
                last_bits = here_bits;
                last_op = here_op;
                last_val = here_val;
                for (; ; ) {
                  here = state.distcode[last_val + ((hold & (1 << last_bits + last_op) - 1) >> last_bits)];
                  here_bits = here >>> 24;
                  here_op = here >>> 16 & 255;
                  here_val = here & 65535;
                  if (last_bits + here_bits <= bits) {
                    break;
                  }
                  if (have === 0) {
                    break inf_leave;
                  }
                  have--;
                  hold += input[next++] << bits;
                  bits += 8;
                }
                hold >>>= last_bits;
                bits -= last_bits;
                state.back += last_bits;
              }
              hold >>>= here_bits;
              bits -= here_bits;
              state.back += here_bits;
              if (here_op & 64) {
                strm.msg = "invalid distance code";
                state.mode = BAD2;
                break;
              }
              state.offset = here_val;
              state.extra = here_op & 15;
              state.mode = DISTEXT2;
            /* falls through */
            case DISTEXT2:
              if (state.extra) {
                n = state.extra;
                while (bits < n) {
                  if (have === 0) {
                    break inf_leave;
                  }
                  have--;
                  hold += input[next++] << bits;
                  bits += 8;
                }
                state.offset += hold & (1 << state.extra) - 1;
                hold >>>= state.extra;
                bits -= state.extra;
                state.back += state.extra;
              }
              if (state.offset > state.dmax) {
                strm.msg = "invalid distance too far back";
                state.mode = BAD2;
                break;
              }
              state.mode = MATCH2;
            /* falls through */
            case MATCH2:
              if (left === 0) {
                break inf_leave;
              }
              copy = _out - left;
              if (state.offset > copy) {
                copy = state.offset - copy;
                if (copy > state.whave) {
                  if (state.sane) {
                    strm.msg = "invalid distance too far back";
                    state.mode = BAD2;
                    break;
                  }
                }
                if (copy > state.wnext) {
                  copy -= state.wnext;
                  from = state.wsize - copy;
                } else {
                  from = state.wnext - copy;
                }
                if (copy > state.length) {
                  copy = state.length;
                }
                from_source = state.window;
              } else {
                from_source = output;
                from = put - state.offset;
                copy = state.length;
              }
              if (copy > left) {
                copy = left;
              }
              left -= copy;
              state.length -= copy;
              do {
                output[put++] = from_source[from++];
              } while (--copy);
              if (state.length === 0) {
                state.mode = LEN2;
              }
              break;
            case LIT2:
              if (left === 0) {
                break inf_leave;
              }
              output[put++] = state.length;
              left--;
              state.mode = LEN2;
              break;
            case CHECK2:
              if (state.wrap) {
                while (bits < 32) {
                  if (have === 0) {
                    break inf_leave;
                  }
                  have--;
                  hold |= input[next++] << bits;
                  bits += 8;
                }
                _out -= left;
                strm.total_out += _out;
                state.total += _out;
                if (_out) {
                  strm.adler = state.check = /*UPDATE(state.check, put - _out, _out);*/
                  state.flags ? crc322(state.check, output, _out, put - _out) : adler322(state.check, output, _out, put - _out);
                }
                _out = left;
                if ((state.flags ? hold : zswap322(hold)) !== state.check) {
                  strm.msg = "incorrect data check";
                  state.mode = BAD2;
                  break;
                }
                hold = 0;
                bits = 0;
              }
              state.mode = LENGTH2;
            /* falls through */
            case LENGTH2:
              if (state.wrap && state.flags) {
                while (bits < 32) {
                  if (have === 0) {
                    break inf_leave;
                  }
                  have--;
                  hold += input[next++] << bits;
                  bits += 8;
                }
                if (hold !== (state.total & 4294967295)) {
                  strm.msg = "incorrect length check";
                  state.mode = BAD2;
                  break;
                }
                hold = 0;
                bits = 0;
              }
              state.mode = DONE2;
            /* falls through */
            case DONE2:
              ret = Z_STREAM_END2;
              break inf_leave;
            case BAD2:
              ret = Z_DATA_ERROR2;
              break inf_leave;
            case MEM2:
              return Z_MEM_ERROR2;
            case SYNC2:
            /* falls through */
            default:
              return Z_STREAM_ERROR2;
          }
        }
      strm.next_out = put;
      strm.avail_out = left;
      strm.next_in = next;
      strm.avail_in = have;
      state.hold = hold;
      state.bits = bits;
      if (state.wsize || _out !== strm.avail_out && state.mode < BAD2 && (state.mode < CHECK2 || flush !== Z_FINISH2)) {
        if (updatewindow2(strm, strm.output, strm.next_out, _out - strm.avail_out)) {
          state.mode = MEM2;
          return Z_MEM_ERROR2;
        }
      }
      _in -= strm.avail_in;
      _out -= strm.avail_out;
      strm.total_in += _in;
      strm.total_out += _out;
      state.total += _out;
      if (state.wrap && _out) {
        strm.adler = state.check = /*UPDATE(state.check, strm.next_out - _out, _out);*/
        state.flags ? crc322(state.check, output, _out, strm.next_out - _out) : adler322(state.check, output, _out, strm.next_out - _out);
      }
      strm.data_type = state.bits + (state.last ? 64 : 0) + (state.mode === TYPE2 ? 128 : 0) + (state.mode === LEN_2 || state.mode === COPY_2 ? 256 : 0);
      if ((_in === 0 && _out === 0 || flush === Z_FINISH2) && ret === Z_OK2) {
        ret = Z_BUF_ERROR2;
      }
      return ret;
    }
    function inflateEnd2(strm) {
      if (!strm || !strm.state) {
        return Z_STREAM_ERROR2;
      }
      var state = strm.state;
      if (state.window) {
        state.window = null;
      }
      strm.state = null;
      return Z_OK2;
    }
    function inflateGetHeader2(strm, head) {
      var state;
      if (!strm || !strm.state) {
        return Z_STREAM_ERROR2;
      }
      state = strm.state;
      if ((state.wrap & 2) === 0) {
        return Z_STREAM_ERROR2;
      }
      state.head = head;
      head.done = false;
      return Z_OK2;
    }
    function inflateSetDictionary2(strm, dictionary) {
      var dictLength = dictionary.length;
      var state;
      var dictid;
      var ret;
      if (!strm || !strm.state) {
        return Z_STREAM_ERROR2;
      }
      state = strm.state;
      if (state.wrap !== 0 && state.mode !== DICT2) {
        return Z_STREAM_ERROR2;
      }
      if (state.mode === DICT2) {
        dictid = 1;
        dictid = adler322(dictid, dictionary, dictLength, 0);
        if (dictid !== state.check) {
          return Z_DATA_ERROR2;
        }
      }
      ret = updatewindow2(strm, dictionary, dictLength, dictLength);
      if (ret) {
        state.mode = MEM2;
        return Z_MEM_ERROR2;
      }
      state.havedict = 1;
      return Z_OK2;
    }
    exports2.inflateReset = inflateReset3;
    exports2.inflateReset2 = inflateReset22;
    exports2.inflateResetKeep = inflateResetKeep2;
    exports2.inflateInit = inflateInit3;
    exports2.inflateInit2 = inflateInit22;
    exports2.inflate = inflate2;
    exports2.inflateEnd = inflateEnd2;
    exports2.inflateGetHeader = inflateGetHeader2;
    exports2.inflateSetDictionary = inflateSetDictionary2;
    exports2.inflateInfo = "pako inflate (from Nodeca project)";
  }
});

// node_modules/jszip/node_modules/pako/lib/zlib/constants.js
var require_constants = __commonJS({
  "node_modules/jszip/node_modules/pako/lib/zlib/constants.js"(exports2, module2) {
    "use strict";
    module2.exports = {
      /* Allowed flush values; see deflate() and inflate() below for details */
      Z_NO_FLUSH: 0,
      Z_PARTIAL_FLUSH: 1,
      Z_SYNC_FLUSH: 2,
      Z_FULL_FLUSH: 3,
      Z_FINISH: 4,
      Z_BLOCK: 5,
      Z_TREES: 6,
      /* Return codes for the compression/decompression functions. Negative values
      * are errors, positive values are used for special but normal events.
      */
      Z_OK: 0,
      Z_STREAM_END: 1,
      Z_NEED_DICT: 2,
      Z_ERRNO: -1,
      Z_STREAM_ERROR: -2,
      Z_DATA_ERROR: -3,
      //Z_MEM_ERROR:     -4,
      Z_BUF_ERROR: -5,
      //Z_VERSION_ERROR: -6,
      /* compression levels */
      Z_NO_COMPRESSION: 0,
      Z_BEST_SPEED: 1,
      Z_BEST_COMPRESSION: 9,
      Z_DEFAULT_COMPRESSION: -1,
      Z_FILTERED: 1,
      Z_HUFFMAN_ONLY: 2,
      Z_RLE: 3,
      Z_FIXED: 4,
      Z_DEFAULT_STRATEGY: 0,
      /* Possible values of the data_type field (though see inflate()) */
      Z_BINARY: 0,
      Z_TEXT: 1,
      //Z_ASCII:                1, // = Z_TEXT (deprecated)
      Z_UNKNOWN: 2,
      /* The deflate compression method */
      Z_DEFLATED: 8
      //Z_NULL:                 null // Use -1 or null inline, depending on var type
    };
  }
});

// node_modules/jszip/node_modules/pako/lib/zlib/gzheader.js
var require_gzheader = __commonJS({
  "node_modules/jszip/node_modules/pako/lib/zlib/gzheader.js"(exports2, module2) {
    "use strict";
    function GZheader2() {
      this.text = 0;
      this.time = 0;
      this.xflags = 0;
      this.os = 0;
      this.extra = null;
      this.extra_len = 0;
      this.name = "";
      this.comment = "";
      this.hcrc = 0;
      this.done = false;
    }
    module2.exports = GZheader2;
  }
});

// node_modules/jszip/node_modules/pako/lib/inflate.js
var require_inflate2 = __commonJS({
  "node_modules/jszip/node_modules/pako/lib/inflate.js"(exports2) {
    "use strict";
    var zlib_inflate = require_inflate();
    var utils = require_common();
    var strings2 = require_strings();
    var c = require_constants();
    var msg = require_messages();
    var ZStream2 = require_zstream();
    var GZheader2 = require_gzheader();
    var toString2 = Object.prototype.toString;
    function Inflate2(options) {
      if (!(this instanceof Inflate2)) return new Inflate2(options);
      this.options = utils.assign({
        chunkSize: 16384,
        windowBits: 0,
        to: ""
      }, options || {});
      var opt = this.options;
      if (opt.raw && opt.windowBits >= 0 && opt.windowBits < 16) {
        opt.windowBits = -opt.windowBits;
        if (opt.windowBits === 0) {
          opt.windowBits = -15;
        }
      }
      if (opt.windowBits >= 0 && opt.windowBits < 16 && !(options && options.windowBits)) {
        opt.windowBits += 32;
      }
      if (opt.windowBits > 15 && opt.windowBits < 48) {
        if ((opt.windowBits & 15) === 0) {
          opt.windowBits |= 15;
        }
      }
      this.err = 0;
      this.msg = "";
      this.ended = false;
      this.chunks = [];
      this.strm = new ZStream2();
      this.strm.avail_out = 0;
      var status = zlib_inflate.inflateInit2(
        this.strm,
        opt.windowBits
      );
      if (status !== c.Z_OK) {
        throw new Error(msg[status]);
      }
      this.header = new GZheader2();
      zlib_inflate.inflateGetHeader(this.strm, this.header);
      if (opt.dictionary) {
        if (typeof opt.dictionary === "string") {
          opt.dictionary = strings2.string2buf(opt.dictionary);
        } else if (toString2.call(opt.dictionary) === "[object ArrayBuffer]") {
          opt.dictionary = new Uint8Array(opt.dictionary);
        }
        if (opt.raw) {
          status = zlib_inflate.inflateSetDictionary(this.strm, opt.dictionary);
          if (status !== c.Z_OK) {
            throw new Error(msg[status]);
          }
        }
      }
    }
    Inflate2.prototype.push = function(data, mode) {
      var strm = this.strm;
      var chunkSize = this.options.chunkSize;
      var dictionary = this.options.dictionary;
      var status, _mode;
      var next_out_utf8, tail, utf8str;
      var allowBufError = false;
      if (this.ended) {
        return false;
      }
      _mode = mode === ~~mode ? mode : mode === true ? c.Z_FINISH : c.Z_NO_FLUSH;
      if (typeof data === "string") {
        strm.input = strings2.binstring2buf(data);
      } else if (toString2.call(data) === "[object ArrayBuffer]") {
        strm.input = new Uint8Array(data);
      } else {
        strm.input = data;
      }
      strm.next_in = 0;
      strm.avail_in = strm.input.length;
      do {
        if (strm.avail_out === 0) {
          strm.output = new utils.Buf8(chunkSize);
          strm.next_out = 0;
          strm.avail_out = chunkSize;
        }
        status = zlib_inflate.inflate(strm, c.Z_NO_FLUSH);
        if (status === c.Z_NEED_DICT && dictionary) {
          status = zlib_inflate.inflateSetDictionary(this.strm, dictionary);
        }
        if (status === c.Z_BUF_ERROR && allowBufError === true) {
          status = c.Z_OK;
          allowBufError = false;
        }
        if (status !== c.Z_STREAM_END && status !== c.Z_OK) {
          this.onEnd(status);
          this.ended = true;
          return false;
        }
        if (strm.next_out) {
          if (strm.avail_out === 0 || status === c.Z_STREAM_END || strm.avail_in === 0 && (_mode === c.Z_FINISH || _mode === c.Z_SYNC_FLUSH)) {
            if (this.options.to === "string") {
              next_out_utf8 = strings2.utf8border(strm.output, strm.next_out);
              tail = strm.next_out - next_out_utf8;
              utf8str = strings2.buf2string(strm.output, next_out_utf8);
              strm.next_out = tail;
              strm.avail_out = chunkSize - tail;
              if (tail) {
                utils.arraySet(strm.output, strm.output, next_out_utf8, tail, 0);
              }
              this.onData(utf8str);
            } else {
              this.onData(utils.shrinkBuf(strm.output, strm.next_out));
            }
          }
        }
        if (strm.avail_in === 0 && strm.avail_out === 0) {
          allowBufError = true;
        }
      } while ((strm.avail_in > 0 || strm.avail_out === 0) && status !== c.Z_STREAM_END);
      if (status === c.Z_STREAM_END) {
        _mode = c.Z_FINISH;
      }
      if (_mode === c.Z_FINISH) {
        status = zlib_inflate.inflateEnd(this.strm);
        this.onEnd(status);
        this.ended = true;
        return status === c.Z_OK;
      }
      if (_mode === c.Z_SYNC_FLUSH) {
        this.onEnd(c.Z_OK);
        strm.avail_out = 0;
        return true;
      }
      return true;
    };
    Inflate2.prototype.onData = function(chunk) {
      this.chunks.push(chunk);
    };
    Inflate2.prototype.onEnd = function(status) {
      if (status === c.Z_OK) {
        if (this.options.to === "string") {
          this.result = this.chunks.join("");
        } else {
          this.result = utils.flattenChunks(this.chunks);
        }
      }
      this.chunks = [];
      this.err = status;
      this.msg = this.strm.msg;
    };
    function inflate2(input, options) {
      var inflator = new Inflate2(options);
      inflator.push(input, true);
      if (inflator.err) {
        throw inflator.msg || msg[inflator.err];
      }
      return inflator.result;
    }
    function inflateRaw2(input, options) {
      options = options || {};
      options.raw = true;
      return inflate2(input, options);
    }
    exports2.Inflate = Inflate2;
    exports2.inflate = inflate2;
    exports2.inflateRaw = inflateRaw2;
    exports2.ungzip = inflate2;
  }
});

// node_modules/jszip/node_modules/pako/index.js
var require_pako = __commonJS({
  "node_modules/jszip/node_modules/pako/index.js"(exports2, module2) {
    "use strict";
    var assign2 = require_common().assign;
    var deflate2 = require_deflate2();
    var inflate2 = require_inflate2();
    var constants2 = require_constants();
    var pako = {};
    assign2(pako, deflate2, inflate2, constants2);
    module2.exports = pako;
  }
});

// node_modules/jszip/lib/flate.js
var require_flate = __commonJS({
  "node_modules/jszip/lib/flate.js"(exports2) {
    "use strict";
    var USE_TYPEDARRAY = typeof Uint8Array !== "undefined" && typeof Uint16Array !== "undefined" && typeof Uint32Array !== "undefined";
    var pako = require_pako();
    var utils = require_utils();
    var GenericWorker = require_GenericWorker();
    var ARRAY_TYPE = USE_TYPEDARRAY ? "uint8array" : "array";
    exports2.magic = "\b\0";
    function FlateWorker(action, options) {
      GenericWorker.call(this, "FlateWorker/" + action);
      this._pako = null;
      this._pakoAction = action;
      this._pakoOptions = options;
      this.meta = {};
    }
    utils.inherits(FlateWorker, GenericWorker);
    FlateWorker.prototype.processChunk = function(chunk) {
      this.meta = chunk.meta;
      if (this._pako === null) {
        this._createPako();
      }
      this._pako.push(utils.transformTo(ARRAY_TYPE, chunk.data), false);
    };
    FlateWorker.prototype.flush = function() {
      GenericWorker.prototype.flush.call(this);
      if (this._pako === null) {
        this._createPako();
      }
      this._pako.push([], true);
    };
    FlateWorker.prototype.cleanUp = function() {
      GenericWorker.prototype.cleanUp.call(this);
      this._pako = null;
    };
    FlateWorker.prototype._createPako = function() {
      this._pako = new pako[this._pakoAction]({
        raw: true,
        level: this._pakoOptions.level || -1
        // default compression
      });
      var self2 = this;
      this._pako.onData = function(data) {
        self2.push({
          data,
          meta: self2.meta
        });
      };
    };
    exports2.compressWorker = function(compressionOptions) {
      return new FlateWorker("Deflate", compressionOptions);
    };
    exports2.uncompressWorker = function() {
      return new FlateWorker("Inflate", {});
    };
  }
});

// node_modules/jszip/lib/compressions.js
var require_compressions = __commonJS({
  "node_modules/jszip/lib/compressions.js"(exports2) {
    "use strict";
    var GenericWorker = require_GenericWorker();
    exports2.STORE = {
      magic: "\0\0",
      compressWorker: function() {
        return new GenericWorker("STORE compression");
      },
      uncompressWorker: function() {
        return new GenericWorker("STORE decompression");
      }
    };
    exports2.DEFLATE = require_flate();
  }
});

// node_modules/jszip/lib/signature.js
var require_signature = __commonJS({
  "node_modules/jszip/lib/signature.js"(exports2) {
    "use strict";
    exports2.LOCAL_FILE_HEADER = "PK";
    exports2.CENTRAL_FILE_HEADER = "PK";
    exports2.CENTRAL_DIRECTORY_END = "PK";
    exports2.ZIP64_CENTRAL_DIRECTORY_LOCATOR = "PK\x07";
    exports2.ZIP64_CENTRAL_DIRECTORY_END = "PK";
    exports2.DATA_DESCRIPTOR = "PK\x07\b";
  }
});

// node_modules/jszip/lib/generate/ZipFileWorker.js
var require_ZipFileWorker = __commonJS({
  "node_modules/jszip/lib/generate/ZipFileWorker.js"(exports2, module2) {
    "use strict";
    var utils = require_utils();
    var GenericWorker = require_GenericWorker();
    var utf8 = require_utf8();
    var crc322 = require_crc32();
    var signature = require_signature();
    var decToHex = function(dec, bytes) {
      var hex = "", i;
      for (i = 0; i < bytes; i++) {
        hex += String.fromCharCode(dec & 255);
        dec = dec >>> 8;
      }
      return hex;
    };
    var generateUnixExternalFileAttr = function(unixPermissions, isDir) {
      var result = unixPermissions;
      if (!unixPermissions) {
        result = isDir ? 16893 : 33204;
      }
      return (result & 65535) << 16;
    };
    var generateDosExternalFileAttr = function(dosPermissions) {
      return (dosPermissions || 0) & 63;
    };
    var generateZipParts = function(streamInfo, streamedContent, streamingEnded, offset, platform, encodeFileName) {
      var file = streamInfo["file"], compression = streamInfo["compression"], useCustomEncoding = encodeFileName !== utf8.utf8encode, encodedFileName = utils.transformTo("string", encodeFileName(file.name)), utfEncodedFileName = utils.transformTo("string", utf8.utf8encode(file.name)), comment = file.comment, encodedComment = utils.transformTo("string", encodeFileName(comment)), utfEncodedComment = utils.transformTo("string", utf8.utf8encode(comment)), useUTF8ForFileName = utfEncodedFileName.length !== file.name.length, useUTF8ForComment = utfEncodedComment.length !== comment.length, dosTime, dosDate, extraFields = "", unicodePathExtraField = "", unicodeCommentExtraField = "", dir = file.dir, date = file.date;
      var dataInfo = {
        crc32: 0,
        compressedSize: 0,
        uncompressedSize: 0
      };
      if (!streamedContent || streamingEnded) {
        dataInfo.crc32 = streamInfo["crc32"];
        dataInfo.compressedSize = streamInfo["compressedSize"];
        dataInfo.uncompressedSize = streamInfo["uncompressedSize"];
      }
      var bitflag = 0;
      if (streamedContent) {
        bitflag |= 8;
      }
      if (!useCustomEncoding && (useUTF8ForFileName || useUTF8ForComment)) {
        bitflag |= 2048;
      }
      var extFileAttr = 0;
      var versionMadeBy = 0;
      if (dir) {
        extFileAttr |= 16;
      }
      if (platform === "UNIX") {
        versionMadeBy = 798;
        extFileAttr |= generateUnixExternalFileAttr(file.unixPermissions, dir);
      } else {
        versionMadeBy = 20;
        extFileAttr |= generateDosExternalFileAttr(file.dosPermissions, dir);
      }
      dosTime = date.getUTCHours();
      dosTime = dosTime << 6;
      dosTime = dosTime | date.getUTCMinutes();
      dosTime = dosTime << 5;
      dosTime = dosTime | date.getUTCSeconds() / 2;
      dosDate = date.getUTCFullYear() - 1980;
      dosDate = dosDate << 4;
      dosDate = dosDate | date.getUTCMonth() + 1;
      dosDate = dosDate << 5;
      dosDate = dosDate | date.getUTCDate();
      if (useUTF8ForFileName) {
        unicodePathExtraField = // Version
        decToHex(1, 1) + // NameCRC32
        decToHex(crc322(encodedFileName), 4) + // UnicodeName
        utfEncodedFileName;
        extraFields += // Info-ZIP Unicode Path Extra Field
        "up" + // size
        decToHex(unicodePathExtraField.length, 2) + // content
        unicodePathExtraField;
      }
      if (useUTF8ForComment) {
        unicodeCommentExtraField = // Version
        decToHex(1, 1) + // CommentCRC32
        decToHex(crc322(encodedComment), 4) + // UnicodeName
        utfEncodedComment;
        extraFields += // Info-ZIP Unicode Path Extra Field
        "uc" + // size
        decToHex(unicodeCommentExtraField.length, 2) + // content
        unicodeCommentExtraField;
      }
      var header = "";
      header += "\n\0";
      header += decToHex(bitflag, 2);
      header += compression.magic;
      header += decToHex(dosTime, 2);
      header += decToHex(dosDate, 2);
      header += decToHex(dataInfo.crc32, 4);
      header += decToHex(dataInfo.compressedSize, 4);
      header += decToHex(dataInfo.uncompressedSize, 4);
      header += decToHex(encodedFileName.length, 2);
      header += decToHex(extraFields.length, 2);
      var fileRecord = signature.LOCAL_FILE_HEADER + header + encodedFileName + extraFields;
      var dirRecord = signature.CENTRAL_FILE_HEADER + // version made by (00: DOS)
      decToHex(versionMadeBy, 2) + // file header (common to file and central directory)
      header + // file comment length
      decToHex(encodedComment.length, 2) + // disk number start
      "\0\0\0\0" + // external file attributes
      decToHex(extFileAttr, 4) + // relative offset of local header
      decToHex(offset, 4) + // file name
      encodedFileName + // extra field
      extraFields + // file comment
      encodedComment;
      return {
        fileRecord,
        dirRecord
      };
    };
    var generateCentralDirectoryEnd = function(entriesCount, centralDirLength, localDirLength, comment, encodeFileName) {
      var dirEnd = "";
      var encodedComment = utils.transformTo("string", encodeFileName(comment));
      dirEnd = signature.CENTRAL_DIRECTORY_END + // number of this disk
      "\0\0\0\0" + // total number of entries in the central directory on this disk
      decToHex(entriesCount, 2) + // total number of entries in the central directory
      decToHex(entriesCount, 2) + // size of the central directory   4 bytes
      decToHex(centralDirLength, 4) + // offset of start of central directory with respect to the starting disk number
      decToHex(localDirLength, 4) + // .ZIP file comment length
      decToHex(encodedComment.length, 2) + // .ZIP file comment
      encodedComment;
      return dirEnd;
    };
    var generateDataDescriptors = function(streamInfo) {
      var descriptor = "";
      descriptor = signature.DATA_DESCRIPTOR + // crc-32                          4 bytes
      decToHex(streamInfo["crc32"], 4) + // compressed size                 4 bytes
      decToHex(streamInfo["compressedSize"], 4) + // uncompressed size               4 bytes
      decToHex(streamInfo["uncompressedSize"], 4);
      return descriptor;
    };
    function ZipFileWorker(streamFiles, comment, platform, encodeFileName) {
      GenericWorker.call(this, "ZipFileWorker");
      this.bytesWritten = 0;
      this.zipComment = comment;
      this.zipPlatform = platform;
      this.encodeFileName = encodeFileName;
      this.streamFiles = streamFiles;
      this.accumulate = false;
      this.contentBuffer = [];
      this.dirRecords = [];
      this.currentSourceOffset = 0;
      this.entriesCount = 0;
      this.currentFile = null;
      this._sources = [];
    }
    utils.inherits(ZipFileWorker, GenericWorker);
    ZipFileWorker.prototype.push = function(chunk) {
      var currentFilePercent = chunk.meta.percent || 0;
      var entriesCount = this.entriesCount;
      var remainingFiles = this._sources.length;
      if (this.accumulate) {
        this.contentBuffer.push(chunk);
      } else {
        this.bytesWritten += chunk.data.length;
        GenericWorker.prototype.push.call(this, {
          data: chunk.data,
          meta: {
            currentFile: this.currentFile,
            percent: entriesCount ? (currentFilePercent + 100 * (entriesCount - remainingFiles - 1)) / entriesCount : 100
          }
        });
      }
    };
    ZipFileWorker.prototype.openedSource = function(streamInfo) {
      this.currentSourceOffset = this.bytesWritten;
      this.currentFile = streamInfo["file"].name;
      var streamedContent = this.streamFiles && !streamInfo["file"].dir;
      if (streamedContent) {
        var record = generateZipParts(streamInfo, streamedContent, false, this.currentSourceOffset, this.zipPlatform, this.encodeFileName);
        this.push({
          data: record.fileRecord,
          meta: { percent: 0 }
        });
      } else {
        this.accumulate = true;
      }
    };
    ZipFileWorker.prototype.closedSource = function(streamInfo) {
      this.accumulate = false;
      var streamedContent = this.streamFiles && !streamInfo["file"].dir;
      var record = generateZipParts(streamInfo, streamedContent, true, this.currentSourceOffset, this.zipPlatform, this.encodeFileName);
      this.dirRecords.push(record.dirRecord);
      if (streamedContent) {
        this.push({
          data: generateDataDescriptors(streamInfo),
          meta: { percent: 100 }
        });
      } else {
        this.push({
          data: record.fileRecord,
          meta: { percent: 0 }
        });
        while (this.contentBuffer.length) {
          this.push(this.contentBuffer.shift());
        }
      }
      this.currentFile = null;
    };
    ZipFileWorker.prototype.flush = function() {
      var localDirLength = this.bytesWritten;
      for (var i = 0; i < this.dirRecords.length; i++) {
        this.push({
          data: this.dirRecords[i],
          meta: { percent: 100 }
        });
      }
      var centralDirLength = this.bytesWritten - localDirLength;
      var dirEnd = generateCentralDirectoryEnd(this.dirRecords.length, centralDirLength, localDirLength, this.zipComment, this.encodeFileName);
      this.push({
        data: dirEnd,
        meta: { percent: 100 }
      });
    };
    ZipFileWorker.prototype.prepareNextSource = function() {
      this.previous = this._sources.shift();
      this.openedSource(this.previous.streamInfo);
      if (this.isPaused) {
        this.previous.pause();
      } else {
        this.previous.resume();
      }
    };
    ZipFileWorker.prototype.registerPrevious = function(previous) {
      this._sources.push(previous);
      var self2 = this;
      previous.on("data", function(chunk) {
        self2.processChunk(chunk);
      });
      previous.on("end", function() {
        self2.closedSource(self2.previous.streamInfo);
        if (self2._sources.length) {
          self2.prepareNextSource();
        } else {
          self2.end();
        }
      });
      previous.on("error", function(e) {
        self2.error(e);
      });
      return this;
    };
    ZipFileWorker.prototype.resume = function() {
      if (!GenericWorker.prototype.resume.call(this)) {
        return false;
      }
      if (!this.previous && this._sources.length) {
        this.prepareNextSource();
        return true;
      }
      if (!this.previous && !this._sources.length && !this.generatedError) {
        this.end();
        return true;
      }
    };
    ZipFileWorker.prototype.error = function(e) {
      var sources = this._sources;
      if (!GenericWorker.prototype.error.call(this, e)) {
        return false;
      }
      for (var i = 0; i < sources.length; i++) {
        try {
          sources[i].error(e);
        } catch (e2) {
        }
      }
      return true;
    };
    ZipFileWorker.prototype.lock = function() {
      GenericWorker.prototype.lock.call(this);
      var sources = this._sources;
      for (var i = 0; i < sources.length; i++) {
        sources[i].lock();
      }
    };
    module2.exports = ZipFileWorker;
  }
});

// node_modules/jszip/lib/generate/index.js
var require_generate = __commonJS({
  "node_modules/jszip/lib/generate/index.js"(exports2) {
    "use strict";
    var compressions = require_compressions();
    var ZipFileWorker = require_ZipFileWorker();
    var getCompression = function(fileCompression, zipCompression) {
      var compressionName = fileCompression || zipCompression;
      var compression = compressions[compressionName];
      if (!compression) {
        throw new Error(compressionName + " is not a valid compression method !");
      }
      return compression;
    };
    exports2.generateWorker = function(zip, options, comment) {
      var zipFileWorker = new ZipFileWorker(options.streamFiles, comment, options.platform, options.encodeFileName);
      var entriesCount = 0;
      try {
        zip.forEach(function(relativePath, file) {
          entriesCount++;
          var compression = getCompression(file.options.compression, options.compression);
          var compressionOptions = file.options.compressionOptions || options.compressionOptions || {};
          var dir = file.dir, date = file.date;
          file._compressWorker(compression, compressionOptions).withStreamInfo("file", {
            name: relativePath,
            dir,
            date,
            comment: file.comment || "",
            unixPermissions: file.unixPermissions,
            dosPermissions: file.dosPermissions
          }).pipe(zipFileWorker);
        });
        zipFileWorker.entriesCount = entriesCount;
      } catch (e) {
        zipFileWorker.error(e);
      }
      return zipFileWorker;
    };
  }
});

// node_modules/jszip/lib/nodejs/NodejsStreamInputAdapter.js
var require_NodejsStreamInputAdapter = __commonJS({
  "node_modules/jszip/lib/nodejs/NodejsStreamInputAdapter.js"(exports2, module2) {
    "use strict";
    var utils = require_utils();
    var GenericWorker = require_GenericWorker();
    function NodejsStreamInputAdapter(filename, stream) {
      GenericWorker.call(this, "Nodejs stream input adapter for " + filename);
      this._upstreamEnded = false;
      this._bindStream(stream);
    }
    utils.inherits(NodejsStreamInputAdapter, GenericWorker);
    NodejsStreamInputAdapter.prototype._bindStream = function(stream) {
      var self2 = this;
      this._stream = stream;
      stream.pause();
      stream.on("data", function(chunk) {
        self2.push({
          data: chunk,
          meta: {
            percent: 0
          }
        });
      }).on("error", function(e) {
        if (self2.isPaused) {
          this.generatedError = e;
        } else {
          self2.error(e);
        }
      }).on("end", function() {
        if (self2.isPaused) {
          self2._upstreamEnded = true;
        } else {
          self2.end();
        }
      });
    };
    NodejsStreamInputAdapter.prototype.pause = function() {
      if (!GenericWorker.prototype.pause.call(this)) {
        return false;
      }
      this._stream.pause();
      return true;
    };
    NodejsStreamInputAdapter.prototype.resume = function() {
      if (!GenericWorker.prototype.resume.call(this)) {
        return false;
      }
      if (this._upstreamEnded) {
        this.end();
      } else {
        this._stream.resume();
      }
      return true;
    };
    module2.exports = NodejsStreamInputAdapter;
  }
});

// node_modules/jszip/lib/object.js
var require_object = __commonJS({
  "node_modules/jszip/lib/object.js"(exports2, module2) {
    "use strict";
    var utf8 = require_utf8();
    var utils = require_utils();
    var GenericWorker = require_GenericWorker();
    var StreamHelper = require_StreamHelper();
    var defaults = require_defaults();
    var CompressedObject = require_compressedObject();
    var ZipObject = require_zipObject();
    var generate = require_generate();
    var nodejsUtils = require_nodejsUtils();
    var NodejsStreamInputAdapter = require_NodejsStreamInputAdapter();
    var fileAdd = function(name, data, originalOptions) {
      var dataType = utils.getTypeOf(data), parent;
      var o = utils.extend(originalOptions || {}, defaults);
      o.date = o.date || /* @__PURE__ */ new Date();
      if (o.compression !== null) {
        o.compression = o.compression.toUpperCase();
      }
      if (typeof o.unixPermissions === "string") {
        o.unixPermissions = parseInt(o.unixPermissions, 8);
      }
      if (o.unixPermissions && o.unixPermissions & 16384) {
        o.dir = true;
      }
      if (o.dosPermissions && o.dosPermissions & 16) {
        o.dir = true;
      }
      if (o.dir) {
        name = forceTrailingSlash(name);
      }
      if (o.createFolders && (parent = parentFolder(name))) {
        folderAdd.call(this, parent, true);
      }
      var isUnicodeString = dataType === "string" && o.binary === false && o.base64 === false;
      if (!originalOptions || typeof originalOptions.binary === "undefined") {
        o.binary = !isUnicodeString;
      }
      var isCompressedEmpty = data instanceof CompressedObject && data.uncompressedSize === 0;
      if (isCompressedEmpty || o.dir || !data || data.length === 0) {
        o.base64 = false;
        o.binary = true;
        data = "";
        o.compression = "STORE";
        dataType = "string";
      }
      var zipObjectContent = null;
      if (data instanceof CompressedObject || data instanceof GenericWorker) {
        zipObjectContent = data;
      } else if (nodejsUtils.isNode && nodejsUtils.isStream(data)) {
        zipObjectContent = new NodejsStreamInputAdapter(name, data);
      } else {
        zipObjectContent = utils.prepareContent(name, data, o.binary, o.optimizedBinaryString, o.base64);
      }
      var object = new ZipObject(name, zipObjectContent, o);
      this.files[name] = object;
    };
    var parentFolder = function(path) {
      if (path.slice(-1) === "/") {
        path = path.substring(0, path.length - 1);
      }
      var lastSlash = path.lastIndexOf("/");
      return lastSlash > 0 ? path.substring(0, lastSlash) : "";
    };
    var forceTrailingSlash = function(path) {
      if (path.slice(-1) !== "/") {
        path += "/";
      }
      return path;
    };
    var folderAdd = function(name, createFolders) {
      createFolders = typeof createFolders !== "undefined" ? createFolders : defaults.createFolders;
      name = forceTrailingSlash(name);
      if (!this.files[name]) {
        fileAdd.call(this, name, null, {
          dir: true,
          createFolders
        });
      }
      return this.files[name];
    };
    function isRegExp(object) {
      return Object.prototype.toString.call(object) === "[object RegExp]";
    }
    var out = {
      /**
       * @see loadAsync
       */
      load: function() {
        throw new Error("This method has been removed in JSZip 3.0, please check the upgrade guide.");
      },
      /**
       * Call a callback function for each entry at this folder level.
       * @param {Function} cb the callback function:
       * function (relativePath, file) {...}
       * It takes 2 arguments : the relative path and the file.
       */
      forEach: function(cb) {
        var filename, relativePath, file;
        for (filename in this.files) {
          file = this.files[filename];
          relativePath = filename.slice(this.root.length, filename.length);
          if (relativePath && filename.slice(0, this.root.length) === this.root) {
            cb(relativePath, file);
          }
        }
      },
      /**
       * Filter nested files/folders with the specified function.
       * @param {Function} search the predicate to use :
       * function (relativePath, file) {...}
       * It takes 2 arguments : the relative path and the file.
       * @return {Array} An array of matching elements.
       */
      filter: function(search) {
        var result = [];
        this.forEach(function(relativePath, entry) {
          if (search(relativePath, entry)) {
            result.push(entry);
          }
        });
        return result;
      },
      /**
       * Add a file to the zip file, or search a file.
       * @param   {string|RegExp} name The name of the file to add (if data is defined),
       * the name of the file to find (if no data) or a regex to match files.
       * @param   {String|ArrayBuffer|Uint8Array|Buffer} data  The file data, either raw or base64 encoded
       * @param   {Object} o     File options
       * @return  {JSZip|Object|Array} this JSZip object (when adding a file),
       * a file (when searching by string) or an array of files (when searching by regex).
       */
      file: function(name, data, o) {
        if (arguments.length === 1) {
          if (isRegExp(name)) {
            var regexp = name;
            return this.filter(function(relativePath, file) {
              return !file.dir && regexp.test(relativePath);
            });
          } else {
            var obj = this.files[this.root + name];
            if (obj && !obj.dir) {
              return obj;
            } else {
              return null;
            }
          }
        } else {
          name = this.root + name;
          fileAdd.call(this, name, data, o);
        }
        return this;
      },
      /**
       * Add a directory to the zip file, or search.
       * @param   {String|RegExp} arg The name of the directory to add, or a regex to search folders.
       * @return  {JSZip} an object with the new directory as the root, or an array containing matching folders.
       */
      folder: function(arg) {
        if (!arg) {
          return this;
        }
        if (isRegExp(arg)) {
          return this.filter(function(relativePath, file) {
            return file.dir && arg.test(relativePath);
          });
        }
        var name = this.root + arg;
        var newFolder = folderAdd.call(this, name);
        var ret = this.clone();
        ret.root = newFolder.name;
        return ret;
      },
      /**
       * Delete a file, or a directory and all sub-files, from the zip
       * @param {string} name the name of the file to delete
       * @return {JSZip} this JSZip object
       */
      remove: function(name) {
        name = this.root + name;
        var file = this.files[name];
        if (!file) {
          if (name.slice(-1) !== "/") {
            name += "/";
          }
          file = this.files[name];
        }
        if (file && !file.dir) {
          delete this.files[name];
        } else {
          var kids = this.filter(function(relativePath, file2) {
            return file2.name.slice(0, name.length) === name;
          });
          for (var i = 0; i < kids.length; i++) {
            delete this.files[kids[i].name];
          }
        }
        return this;
      },
      /**
       * @deprecated This method has been removed in JSZip 3.0, please check the upgrade guide.
       */
      generate: function() {
        throw new Error("This method has been removed in JSZip 3.0, please check the upgrade guide.");
      },
      /**
       * Generate the complete zip file as an internal stream.
       * @param {Object} options the options to generate the zip file :
       * - compression, "STORE" by default.
       * - type, "base64" by default. Values are : string, base64, uint8array, arraybuffer, blob.
       * @return {StreamHelper} the streamed zip file.
       */
      generateInternalStream: function(options) {
        var worker, opts = {};
        try {
          opts = utils.extend(options || {}, {
            streamFiles: false,
            compression: "STORE",
            compressionOptions: null,
            type: "",
            platform: "DOS",
            comment: null,
            mimeType: "application/zip",
            encodeFileName: utf8.utf8encode
          });
          opts.type = opts.type.toLowerCase();
          opts.compression = opts.compression.toUpperCase();
          if (opts.type === "binarystring") {
            opts.type = "string";
          }
          if (!opts.type) {
            throw new Error("No output type specified.");
          }
          utils.checkSupport(opts.type);
          if (opts.platform === "darwin" || opts.platform === "freebsd" || opts.platform === "linux" || opts.platform === "sunos") {
            opts.platform = "UNIX";
          }
          if (opts.platform === "win32") {
            opts.platform = "DOS";
          }
          var comment = opts.comment || this.comment || "";
          worker = generate.generateWorker(this, opts, comment);
        } catch (e) {
          worker = new GenericWorker("error");
          worker.error(e);
        }
        return new StreamHelper(worker, opts.type || "string", opts.mimeType);
      },
      /**
       * Generate the complete zip file asynchronously.
       * @see generateInternalStream
       */
      generateAsync: function(options, onUpdate) {
        return this.generateInternalStream(options).accumulate(onUpdate);
      },
      /**
       * Generate the complete zip file asynchronously.
       * @see generateInternalStream
       */
      generateNodeStream: function(options, onUpdate) {
        options = options || {};
        if (!options.type) {
          options.type = "nodebuffer";
        }
        return this.generateInternalStream(options).toNodejsStream(onUpdate);
      }
    };
    module2.exports = out;
  }
});

// node_modules/jszip/lib/reader/DataReader.js
var require_DataReader = __commonJS({
  "node_modules/jszip/lib/reader/DataReader.js"(exports2, module2) {
    "use strict";
    var utils = require_utils();
    function DataReader(data) {
      this.data = data;
      this.length = data.length;
      this.index = 0;
      this.zero = 0;
    }
    DataReader.prototype = {
      /**
       * Check that the offset will not go too far.
       * @param {string} offset the additional offset to check.
       * @throws {Error} an Error if the offset is out of bounds.
       */
      checkOffset: function(offset) {
        this.checkIndex(this.index + offset);
      },
      /**
       * Check that the specified index will not be too far.
       * @param {string} newIndex the index to check.
       * @throws {Error} an Error if the index is out of bounds.
       */
      checkIndex: function(newIndex) {
        if (this.length < this.zero + newIndex || newIndex < 0) {
          throw new Error("End of data reached (data length = " + this.length + ", asked index = " + newIndex + "). Corrupted zip ?");
        }
      },
      /**
       * Change the index.
       * @param {number} newIndex The new index.
       * @throws {Error} if the new index is out of the data.
       */
      setIndex: function(newIndex) {
        this.checkIndex(newIndex);
        this.index = newIndex;
      },
      /**
       * Skip the next n bytes.
       * @param {number} n the number of bytes to skip.
       * @throws {Error} if the new index is out of the data.
       */
      skip: function(n) {
        this.setIndex(this.index + n);
      },
      /**
       * Get the byte at the specified index.
       * @param {number} i the index to use.
       * @return {number} a byte.
       */
      byteAt: function() {
      },
      /**
       * Get the next number with a given byte size.
       * @param {number} size the number of bytes to read.
       * @return {number} the corresponding number.
       */
      readInt: function(size) {
        var result = 0, i;
        this.checkOffset(size);
        for (i = this.index + size - 1; i >= this.index; i--) {
          result = (result << 8) + this.byteAt(i);
        }
        this.index += size;
        return result;
      },
      /**
       * Get the next string with a given byte size.
       * @param {number} size the number of bytes to read.
       * @return {string} the corresponding string.
       */
      readString: function(size) {
        return utils.transformTo("string", this.readData(size));
      },
      /**
       * Get raw data without conversion, <size> bytes.
       * @param {number} size the number of bytes to read.
       * @return {Object} the raw data, implementation specific.
       */
      readData: function() {
      },
      /**
       * Find the last occurrence of a zip signature (4 bytes).
       * @param {string} sig the signature to find.
       * @return {number} the index of the last occurrence, -1 if not found.
       */
      lastIndexOfSignature: function() {
      },
      /**
       * Read the signature (4 bytes) at the current position and compare it with sig.
       * @param {string} sig the expected signature
       * @return {boolean} true if the signature matches, false otherwise.
       */
      readAndCheckSignature: function() {
      },
      /**
       * Get the next date.
       * @return {Date} the date.
       */
      readDate: function() {
        var dostime = this.readInt(4);
        return new Date(Date.UTC(
          (dostime >> 25 & 127) + 1980,
          // year
          (dostime >> 21 & 15) - 1,
          // month
          dostime >> 16 & 31,
          // day
          dostime >> 11 & 31,
          // hour
          dostime >> 5 & 63,
          // minute
          (dostime & 31) << 1
        ));
      }
    };
    module2.exports = DataReader;
  }
});

// node_modules/jszip/lib/reader/ArrayReader.js
var require_ArrayReader = __commonJS({
  "node_modules/jszip/lib/reader/ArrayReader.js"(exports2, module2) {
    "use strict";
    var DataReader = require_DataReader();
    var utils = require_utils();
    function ArrayReader(data) {
      DataReader.call(this, data);
      for (var i = 0; i < this.data.length; i++) {
        data[i] = data[i] & 255;
      }
    }
    utils.inherits(ArrayReader, DataReader);
    ArrayReader.prototype.byteAt = function(i) {
      return this.data[this.zero + i];
    };
    ArrayReader.prototype.lastIndexOfSignature = function(sig) {
      var sig0 = sig.charCodeAt(0), sig1 = sig.charCodeAt(1), sig2 = sig.charCodeAt(2), sig3 = sig.charCodeAt(3);
      for (var i = this.length - 4; i >= 0; --i) {
        if (this.data[i] === sig0 && this.data[i + 1] === sig1 && this.data[i + 2] === sig2 && this.data[i + 3] === sig3) {
          return i - this.zero;
        }
      }
      return -1;
    };
    ArrayReader.prototype.readAndCheckSignature = function(sig) {
      var sig0 = sig.charCodeAt(0), sig1 = sig.charCodeAt(1), sig2 = sig.charCodeAt(2), sig3 = sig.charCodeAt(3), data = this.readData(4);
      return sig0 === data[0] && sig1 === data[1] && sig2 === data[2] && sig3 === data[3];
    };
    ArrayReader.prototype.readData = function(size) {
      this.checkOffset(size);
      if (size === 0) {
        return [];
      }
      var result = this.data.slice(this.zero + this.index, this.zero + this.index + size);
      this.index += size;
      return result;
    };
    module2.exports = ArrayReader;
  }
});

// node_modules/jszip/lib/reader/StringReader.js
var require_StringReader = __commonJS({
  "node_modules/jszip/lib/reader/StringReader.js"(exports2, module2) {
    "use strict";
    var DataReader = require_DataReader();
    var utils = require_utils();
    function StringReader(data) {
      DataReader.call(this, data);
    }
    utils.inherits(StringReader, DataReader);
    StringReader.prototype.byteAt = function(i) {
      return this.data.charCodeAt(this.zero + i);
    };
    StringReader.prototype.lastIndexOfSignature = function(sig) {
      return this.data.lastIndexOf(sig) - this.zero;
    };
    StringReader.prototype.readAndCheckSignature = function(sig) {
      var data = this.readData(4);
      return sig === data;
    };
    StringReader.prototype.readData = function(size) {
      this.checkOffset(size);
      var result = this.data.slice(this.zero + this.index, this.zero + this.index + size);
      this.index += size;
      return result;
    };
    module2.exports = StringReader;
  }
});

// node_modules/jszip/lib/reader/Uint8ArrayReader.js
var require_Uint8ArrayReader = __commonJS({
  "node_modules/jszip/lib/reader/Uint8ArrayReader.js"(exports2, module2) {
    "use strict";
    var ArrayReader = require_ArrayReader();
    var utils = require_utils();
    function Uint8ArrayReader(data) {
      ArrayReader.call(this, data);
    }
    utils.inherits(Uint8ArrayReader, ArrayReader);
    Uint8ArrayReader.prototype.readData = function(size) {
      this.checkOffset(size);
      if (size === 0) {
        return new Uint8Array(0);
      }
      var result = this.data.subarray(this.zero + this.index, this.zero + this.index + size);
      this.index += size;
      return result;
    };
    module2.exports = Uint8ArrayReader;
  }
});

// node_modules/jszip/lib/reader/NodeBufferReader.js
var require_NodeBufferReader = __commonJS({
  "node_modules/jszip/lib/reader/NodeBufferReader.js"(exports2, module2) {
    "use strict";
    var Uint8ArrayReader = require_Uint8ArrayReader();
    var utils = require_utils();
    function NodeBufferReader(data) {
      Uint8ArrayReader.call(this, data);
    }
    utils.inherits(NodeBufferReader, Uint8ArrayReader);
    NodeBufferReader.prototype.readData = function(size) {
      this.checkOffset(size);
      var result = this.data.slice(this.zero + this.index, this.zero + this.index + size);
      this.index += size;
      return result;
    };
    module2.exports = NodeBufferReader;
  }
});

// node_modules/jszip/lib/reader/readerFor.js
var require_readerFor = __commonJS({
  "node_modules/jszip/lib/reader/readerFor.js"(exports2, module2) {
    "use strict";
    var utils = require_utils();
    var support = require_support();
    var ArrayReader = require_ArrayReader();
    var StringReader = require_StringReader();
    var NodeBufferReader = require_NodeBufferReader();
    var Uint8ArrayReader = require_Uint8ArrayReader();
    module2.exports = function(data) {
      var type = utils.getTypeOf(data);
      utils.checkSupport(type);
      if (type === "string" && !support.uint8array) {
        return new StringReader(data);
      }
      if (type === "nodebuffer") {
        return new NodeBufferReader(data);
      }
      if (support.uint8array) {
        return new Uint8ArrayReader(utils.transformTo("uint8array", data));
      }
      return new ArrayReader(utils.transformTo("array", data));
    };
  }
});

// node_modules/jszip/lib/zipEntry.js
var require_zipEntry = __commonJS({
  "node_modules/jszip/lib/zipEntry.js"(exports2, module2) {
    "use strict";
    var readerFor = require_readerFor();
    var utils = require_utils();
    var CompressedObject = require_compressedObject();
    var crc32fn = require_crc32();
    var utf8 = require_utf8();
    var compressions = require_compressions();
    var support = require_support();
    var MADE_BY_DOS = 0;
    var MADE_BY_UNIX = 3;
    var findCompression = function(compressionMethod) {
      for (var method in compressions) {
        if (!Object.prototype.hasOwnProperty.call(compressions, method)) {
          continue;
        }
        if (compressions[method].magic === compressionMethod) {
          return compressions[method];
        }
      }
      return null;
    };
    function ZipEntry(options, loadOptions) {
      this.options = options;
      this.loadOptions = loadOptions;
    }
    ZipEntry.prototype = {
      /**
       * say if the file is encrypted.
       * @return {boolean} true if the file is encrypted, false otherwise.
       */
      isEncrypted: function() {
        return (this.bitFlag & 1) === 1;
      },
      /**
       * say if the file has utf-8 filename/comment.
       * @return {boolean} true if the filename/comment is in utf-8, false otherwise.
       */
      useUTF8: function() {
        return (this.bitFlag & 2048) === 2048;
      },
      /**
       * Read the local part of a zip file and add the info in this object.
       * @param {DataReader} reader the reader to use.
       */
      readLocalPart: function(reader) {
        var compression, localExtraFieldsLength;
        reader.skip(22);
        this.fileNameLength = reader.readInt(2);
        localExtraFieldsLength = reader.readInt(2);
        this.fileName = reader.readData(this.fileNameLength);
        reader.skip(localExtraFieldsLength);
        if (this.compressedSize === -1 || this.uncompressedSize === -1) {
          throw new Error("Bug or corrupted zip : didn't get enough information from the central directory (compressedSize === -1 || uncompressedSize === -1)");
        }
        compression = findCompression(this.compressionMethod);
        if (compression === null) {
          throw new Error("Corrupted zip : compression " + utils.pretty(this.compressionMethod) + " unknown (inner file : " + utils.transformTo("string", this.fileName) + ")");
        }
        this.decompressed = new CompressedObject(this.compressedSize, this.uncompressedSize, this.crc32, compression, reader.readData(this.compressedSize));
      },
      /**
       * Read the central part of a zip file and add the info in this object.
       * @param {DataReader} reader the reader to use.
       */
      readCentralPart: function(reader) {
        this.versionMadeBy = reader.readInt(2);
        reader.skip(2);
        this.bitFlag = reader.readInt(2);
        this.compressionMethod = reader.readString(2);
        this.date = reader.readDate();
        this.crc32 = reader.readInt(4);
        this.compressedSize = reader.readInt(4);
        this.uncompressedSize = reader.readInt(4);
        var fileNameLength = reader.readInt(2);
        this.extraFieldsLength = reader.readInt(2);
        this.fileCommentLength = reader.readInt(2);
        this.diskNumberStart = reader.readInt(2);
        this.internalFileAttributes = reader.readInt(2);
        this.externalFileAttributes = reader.readInt(4);
        this.localHeaderOffset = reader.readInt(4);
        if (this.isEncrypted()) {
          throw new Error("Encrypted zip are not supported");
        }
        reader.skip(fileNameLength);
        this.readExtraFields(reader);
        this.parseZIP64ExtraField(reader);
        this.fileComment = reader.readData(this.fileCommentLength);
      },
      /**
       * Parse the external file attributes and get the unix/dos permissions.
       */
      processAttributes: function() {
        this.unixPermissions = null;
        this.dosPermissions = null;
        var madeBy = this.versionMadeBy >> 8;
        this.dir = this.externalFileAttributes & 16 ? true : false;
        if (madeBy === MADE_BY_DOS) {
          this.dosPermissions = this.externalFileAttributes & 63;
        }
        if (madeBy === MADE_BY_UNIX) {
          this.unixPermissions = this.externalFileAttributes >> 16 & 65535;
        }
        if (!this.dir && this.fileNameStr.slice(-1) === "/") {
          this.dir = true;
        }
      },
      /**
       * Parse the ZIP64 extra field and merge the info in the current ZipEntry.
       * @param {DataReader} reader the reader to use.
       */
      parseZIP64ExtraField: function() {
        if (!this.extraFields[1]) {
          return;
        }
        var extraReader = readerFor(this.extraFields[1].value);
        if (this.uncompressedSize === utils.MAX_VALUE_32BITS) {
          this.uncompressedSize = extraReader.readInt(8);
        }
        if (this.compressedSize === utils.MAX_VALUE_32BITS) {
          this.compressedSize = extraReader.readInt(8);
        }
        if (this.localHeaderOffset === utils.MAX_VALUE_32BITS) {
          this.localHeaderOffset = extraReader.readInt(8);
        }
        if (this.diskNumberStart === utils.MAX_VALUE_32BITS) {
          this.diskNumberStart = extraReader.readInt(4);
        }
      },
      /**
       * Read the central part of a zip file and add the info in this object.
       * @param {DataReader} reader the reader to use.
       */
      readExtraFields: function(reader) {
        var end = reader.index + this.extraFieldsLength, extraFieldId, extraFieldLength, extraFieldValue;
        if (!this.extraFields) {
          this.extraFields = {};
        }
        while (reader.index + 4 < end) {
          extraFieldId = reader.readInt(2);
          extraFieldLength = reader.readInt(2);
          extraFieldValue = reader.readData(extraFieldLength);
          this.extraFields[extraFieldId] = {
            id: extraFieldId,
            length: extraFieldLength,
            value: extraFieldValue
          };
        }
        reader.setIndex(end);
      },
      /**
       * Apply an UTF8 transformation if needed.
       */
      handleUTF8: function() {
        var decodeParamType = support.uint8array ? "uint8array" : "array";
        if (this.useUTF8()) {
          this.fileNameStr = utf8.utf8decode(this.fileName);
          this.fileCommentStr = utf8.utf8decode(this.fileComment);
        } else {
          var upath = this.findExtraFieldUnicodePath();
          if (upath !== null) {
            this.fileNameStr = upath;
          } else {
            var fileNameByteArray = utils.transformTo(decodeParamType, this.fileName);
            this.fileNameStr = this.loadOptions.decodeFileName(fileNameByteArray);
          }
          var ucomment = this.findExtraFieldUnicodeComment();
          if (ucomment !== null) {
            this.fileCommentStr = ucomment;
          } else {
            var commentByteArray = utils.transformTo(decodeParamType, this.fileComment);
            this.fileCommentStr = this.loadOptions.decodeFileName(commentByteArray);
          }
        }
      },
      /**
       * Find the unicode path declared in the extra field, if any.
       * @return {String} the unicode path, null otherwise.
       */
      findExtraFieldUnicodePath: function() {
        var upathField = this.extraFields[28789];
        if (upathField) {
          var extraReader = readerFor(upathField.value);
          if (extraReader.readInt(1) !== 1) {
            return null;
          }
          if (crc32fn(this.fileName) !== extraReader.readInt(4)) {
            return null;
          }
          return utf8.utf8decode(extraReader.readData(upathField.length - 5));
        }
        return null;
      },
      /**
       * Find the unicode comment declared in the extra field, if any.
       * @return {String} the unicode comment, null otherwise.
       */
      findExtraFieldUnicodeComment: function() {
        var ucommentField = this.extraFields[25461];
        if (ucommentField) {
          var extraReader = readerFor(ucommentField.value);
          if (extraReader.readInt(1) !== 1) {
            return null;
          }
          if (crc32fn(this.fileComment) !== extraReader.readInt(4)) {
            return null;
          }
          return utf8.utf8decode(extraReader.readData(ucommentField.length - 5));
        }
        return null;
      }
    };
    module2.exports = ZipEntry;
  }
});

// node_modules/jszip/lib/zipEntries.js
var require_zipEntries = __commonJS({
  "node_modules/jszip/lib/zipEntries.js"(exports2, module2) {
    "use strict";
    var readerFor = require_readerFor();
    var utils = require_utils();
    var sig = require_signature();
    var ZipEntry = require_zipEntry();
    var support = require_support();
    function ZipEntries(loadOptions) {
      this.files = [];
      this.loadOptions = loadOptions;
    }
    ZipEntries.prototype = {
      /**
       * Check that the reader is on the specified signature.
       * @param {string} expectedSignature the expected signature.
       * @throws {Error} if it is an other signature.
       */
      checkSignature: function(expectedSignature) {
        if (!this.reader.readAndCheckSignature(expectedSignature)) {
          this.reader.index -= 4;
          var signature = this.reader.readString(4);
          throw new Error("Corrupted zip or bug: unexpected signature (" + utils.pretty(signature) + ", expected " + utils.pretty(expectedSignature) + ")");
        }
      },
      /**
       * Check if the given signature is at the given index.
       * @param {number} askedIndex the index to check.
       * @param {string} expectedSignature the signature to expect.
       * @return {boolean} true if the signature is here, false otherwise.
       */
      isSignature: function(askedIndex, expectedSignature) {
        var currentIndex = this.reader.index;
        this.reader.setIndex(askedIndex);
        var signature = this.reader.readString(4);
        var result = signature === expectedSignature;
        this.reader.setIndex(currentIndex);
        return result;
      },
      /**
       * Read the end of the central directory.
       */
      readBlockEndOfCentral: function() {
        this.diskNumber = this.reader.readInt(2);
        this.diskWithCentralDirStart = this.reader.readInt(2);
        this.centralDirRecordsOnThisDisk = this.reader.readInt(2);
        this.centralDirRecords = this.reader.readInt(2);
        this.centralDirSize = this.reader.readInt(4);
        this.centralDirOffset = this.reader.readInt(4);
        this.zipCommentLength = this.reader.readInt(2);
        var zipComment = this.reader.readData(this.zipCommentLength);
        var decodeParamType = support.uint8array ? "uint8array" : "array";
        var decodeContent = utils.transformTo(decodeParamType, zipComment);
        this.zipComment = this.loadOptions.decodeFileName(decodeContent);
      },
      /**
       * Read the end of the Zip 64 central directory.
       * Not merged with the method readEndOfCentral :
       * The end of central can coexist with its Zip64 brother,
       * I don't want to read the wrong number of bytes !
       */
      readBlockZip64EndOfCentral: function() {
        this.zip64EndOfCentralSize = this.reader.readInt(8);
        this.reader.skip(4);
        this.diskNumber = this.reader.readInt(4);
        this.diskWithCentralDirStart = this.reader.readInt(4);
        this.centralDirRecordsOnThisDisk = this.reader.readInt(8);
        this.centralDirRecords = this.reader.readInt(8);
        this.centralDirSize = this.reader.readInt(8);
        this.centralDirOffset = this.reader.readInt(8);
        this.zip64ExtensibleData = {};
        var extraDataSize = this.zip64EndOfCentralSize - 44, index = 0, extraFieldId, extraFieldLength, extraFieldValue;
        while (index < extraDataSize) {
          extraFieldId = this.reader.readInt(2);
          extraFieldLength = this.reader.readInt(4);
          extraFieldValue = this.reader.readData(extraFieldLength);
          this.zip64ExtensibleData[extraFieldId] = {
            id: extraFieldId,
            length: extraFieldLength,
            value: extraFieldValue
          };
        }
      },
      /**
       * Read the end of the Zip 64 central directory locator.
       */
      readBlockZip64EndOfCentralLocator: function() {
        this.diskWithZip64CentralDirStart = this.reader.readInt(4);
        this.relativeOffsetEndOfZip64CentralDir = this.reader.readInt(8);
        this.disksCount = this.reader.readInt(4);
        if (this.disksCount > 1) {
          throw new Error("Multi-volumes zip are not supported");
        }
      },
      /**
       * Read the local files, based on the offset read in the central part.
       */
      readLocalFiles: function() {
        var i, file;
        for (i = 0; i < this.files.length; i++) {
          file = this.files[i];
          this.reader.setIndex(file.localHeaderOffset);
          this.checkSignature(sig.LOCAL_FILE_HEADER);
          file.readLocalPart(this.reader);
          file.handleUTF8();
          file.processAttributes();
        }
      },
      /**
       * Read the central directory.
       */
      readCentralDir: function() {
        var file;
        this.reader.setIndex(this.centralDirOffset);
        while (this.reader.readAndCheckSignature(sig.CENTRAL_FILE_HEADER)) {
          file = new ZipEntry({
            zip64: this.zip64
          }, this.loadOptions);
          file.readCentralPart(this.reader);
          this.files.push(file);
        }
        if (this.centralDirRecords !== this.files.length) {
          if (this.centralDirRecords !== 0 && this.files.length === 0) {
            throw new Error("Corrupted zip or bug: expected " + this.centralDirRecords + " records in central dir, got " + this.files.length);
          } else {
          }
        }
      },
      /**
       * Read the end of central directory.
       */
      readEndOfCentral: function() {
        var offset = this.reader.lastIndexOfSignature(sig.CENTRAL_DIRECTORY_END);
        if (offset < 0) {
          var isGarbage = !this.isSignature(0, sig.LOCAL_FILE_HEADER);
          if (isGarbage) {
            throw new Error("Can't find end of central directory : is this a zip file ? If it is, see https://stuk.github.io/jszip/documentation/howto/read_zip.html");
          } else {
            throw new Error("Corrupted zip: can't find end of central directory");
          }
        }
        this.reader.setIndex(offset);
        var endOfCentralDirOffset = offset;
        this.checkSignature(sig.CENTRAL_DIRECTORY_END);
        this.readBlockEndOfCentral();
        if (this.diskNumber === utils.MAX_VALUE_16BITS || this.diskWithCentralDirStart === utils.MAX_VALUE_16BITS || this.centralDirRecordsOnThisDisk === utils.MAX_VALUE_16BITS || this.centralDirRecords === utils.MAX_VALUE_16BITS || this.centralDirSize === utils.MAX_VALUE_32BITS || this.centralDirOffset === utils.MAX_VALUE_32BITS) {
          this.zip64 = true;
          offset = this.reader.lastIndexOfSignature(sig.ZIP64_CENTRAL_DIRECTORY_LOCATOR);
          if (offset < 0) {
            throw new Error("Corrupted zip: can't find the ZIP64 end of central directory locator");
          }
          this.reader.setIndex(offset);
          this.checkSignature(sig.ZIP64_CENTRAL_DIRECTORY_LOCATOR);
          this.readBlockZip64EndOfCentralLocator();
          if (!this.isSignature(this.relativeOffsetEndOfZip64CentralDir, sig.ZIP64_CENTRAL_DIRECTORY_END)) {
            this.relativeOffsetEndOfZip64CentralDir = this.reader.lastIndexOfSignature(sig.ZIP64_CENTRAL_DIRECTORY_END);
            if (this.relativeOffsetEndOfZip64CentralDir < 0) {
              throw new Error("Corrupted zip: can't find the ZIP64 end of central directory");
            }
          }
          this.reader.setIndex(this.relativeOffsetEndOfZip64CentralDir);
          this.checkSignature(sig.ZIP64_CENTRAL_DIRECTORY_END);
          this.readBlockZip64EndOfCentral();
        }
        var expectedEndOfCentralDirOffset = this.centralDirOffset + this.centralDirSize;
        if (this.zip64) {
          expectedEndOfCentralDirOffset += 20;
          expectedEndOfCentralDirOffset += 12 + this.zip64EndOfCentralSize;
        }
        var extraBytes = endOfCentralDirOffset - expectedEndOfCentralDirOffset;
        if (extraBytes > 0) {
          if (this.isSignature(endOfCentralDirOffset, sig.CENTRAL_FILE_HEADER)) {
          } else {
            this.reader.zero = extraBytes;
          }
        } else if (extraBytes < 0) {
          throw new Error("Corrupted zip: missing " + Math.abs(extraBytes) + " bytes.");
        }
      },
      prepareReader: function(data) {
        this.reader = readerFor(data);
      },
      /**
       * Read a zip file and create ZipEntries.
       * @param {String|ArrayBuffer|Uint8Array|Buffer} data the binary string representing a zip file.
       */
      load: function(data) {
        this.prepareReader(data);
        this.readEndOfCentral();
        this.readCentralDir();
        this.readLocalFiles();
      }
    };
    module2.exports = ZipEntries;
  }
});

// node_modules/jszip/lib/load.js
var require_load = __commonJS({
  "node_modules/jszip/lib/load.js"(exports2, module2) {
    "use strict";
    var utils = require_utils();
    var external = require_external();
    var utf8 = require_utf8();
    var ZipEntries = require_zipEntries();
    var Crc32Probe = require_Crc32Probe();
    var nodejsUtils = require_nodejsUtils();
    function checkEntryCRC32(zipEntry) {
      return new external.Promise(function(resolve, reject) {
        var worker = zipEntry.decompressed.getContentWorker().pipe(new Crc32Probe());
        worker.on("error", function(e) {
          reject(e);
        }).on("end", function() {
          if (worker.streamInfo.crc32 !== zipEntry.decompressed.crc32) {
            reject(new Error("Corrupted zip : CRC32 mismatch"));
          } else {
            resolve();
          }
        }).resume();
      });
    }
    module2.exports = function(data, options) {
      var zip = this;
      options = utils.extend(options || {}, {
        base64: false,
        checkCRC32: false,
        optimizedBinaryString: false,
        createFolders: false,
        decodeFileName: utf8.utf8decode
      });
      if (nodejsUtils.isNode && nodejsUtils.isStream(data)) {
        return external.Promise.reject(new Error("JSZip can't accept a stream when loading a zip file."));
      }
      return utils.prepareContent("the loaded zip file", data, true, options.optimizedBinaryString, options.base64).then(function(data2) {
        var zipEntries = new ZipEntries(options);
        zipEntries.load(data2);
        return zipEntries;
      }).then(function checkCRC32(zipEntries) {
        var promises = [external.Promise.resolve(zipEntries)];
        var files = zipEntries.files;
        if (options.checkCRC32) {
          for (var i = 0; i < files.length; i++) {
            promises.push(checkEntryCRC32(files[i]));
          }
        }
        return external.Promise.all(promises);
      }).then(function addFiles(results) {
        var zipEntries = results.shift();
        var files = zipEntries.files;
        for (var i = 0; i < files.length; i++) {
          var input = files[i];
          var unsafeName = input.fileNameStr;
          var safeName = utils.resolve(input.fileNameStr);
          zip.file(safeName, input.decompressed, {
            binary: true,
            optimizedBinaryString: true,
            date: input.date,
            dir: input.dir,
            comment: input.fileCommentStr.length ? input.fileCommentStr : null,
            unixPermissions: input.unixPermissions,
            dosPermissions: input.dosPermissions,
            createFolders: options.createFolders
          });
          if (!input.dir) {
            zip.file(safeName).unsafeOriginalName = unsafeName;
          }
        }
        if (zipEntries.zipComment.length) {
          zip.comment = zipEntries.zipComment;
        }
        return zip;
      });
    };
  }
});

// node_modules/jszip/lib/index.js
var require_lib3 = __commonJS({
  "node_modules/jszip/lib/index.js"(exports2, module2) {
    "use strict";
    function JSZip2() {
      if (!(this instanceof JSZip2)) {
        return new JSZip2();
      }
      if (arguments.length) {
        throw new Error("The constructor with parameters has been removed in JSZip 3.0, please check the upgrade guide.");
      }
      this.files = /* @__PURE__ */ Object.create(null);
      this.comment = null;
      this.root = "";
      this.clone = function() {
        var newObj = new JSZip2();
        for (var i in this) {
          if (typeof this[i] !== "function") {
            newObj[i] = this[i];
          }
        }
        return newObj;
      };
    }
    JSZip2.prototype = require_object();
    JSZip2.prototype.loadAsync = require_load();
    JSZip2.support = require_support();
    JSZip2.defaults = require_defaults();
    JSZip2.version = "3.10.1";
    JSZip2.loadAsync = function(content, options) {
      return new JSZip2().loadAsync(content, options);
    };
    JSZip2.external = require_external();
    module2.exports = JSZip2;
  }
});

// node_modules/cfb/cfb.js
var require_cfb = __commonJS({
  "node_modules/cfb/cfb.js"(exports2, module2) {
    var Base64_map = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
    function Base64_encode(input) {
      var o = "";
      var c1 = 0, c2 = 0, c3 = 0, e1 = 0, e2 = 0, e3 = 0, e4 = 0;
      for (var i = 0; i < input.length; ) {
        c1 = input.charCodeAt(i++);
        e1 = c1 >> 2;
        c2 = input.charCodeAt(i++);
        e2 = (c1 & 3) << 4 | c2 >> 4;
        c3 = input.charCodeAt(i++);
        e3 = (c2 & 15) << 2 | c3 >> 6;
        e4 = c3 & 63;
        if (isNaN(c2)) e3 = e4 = 64;
        else if (isNaN(c3)) e4 = 64;
        o += Base64_map.charAt(e1) + Base64_map.charAt(e2) + Base64_map.charAt(e3) + Base64_map.charAt(e4);
      }
      return o;
    }
    function Base64_decode(input) {
      var o = "";
      var c1 = 0, c2 = 0, c3 = 0, e1 = 0, e2 = 0, e3 = 0, e4 = 0;
      input = input.replace(/[^\w\+\/\=]/g, "");
      for (var i = 0; i < input.length; ) {
        e1 = Base64_map.indexOf(input.charAt(i++));
        e2 = Base64_map.indexOf(input.charAt(i++));
        c1 = e1 << 2 | e2 >> 4;
        o += String.fromCharCode(c1);
        e3 = Base64_map.indexOf(input.charAt(i++));
        c2 = (e2 & 15) << 4 | e3 >> 2;
        if (e3 !== 64) o += String.fromCharCode(c2);
        e4 = Base64_map.indexOf(input.charAt(i++));
        c3 = (e3 & 3) << 6 | e4;
        if (e4 !== 64) o += String.fromCharCode(c3);
      }
      return o;
    }
    var has_buf = (function() {
      return typeof Buffer !== "undefined" && typeof process !== "undefined" && typeof process.versions !== "undefined" && !!process.versions.node;
    })();
    var Buffer_from = (function() {
      if (typeof Buffer !== "undefined") {
        var nbfs = !Buffer.from;
        if (!nbfs) try {
          Buffer.from("foo", "utf8");
        } catch (e) {
          nbfs = true;
        }
        return nbfs ? function(buf, enc) {
          return enc ? new Buffer(buf, enc) : new Buffer(buf);
        } : Buffer.from.bind(Buffer);
      }
      return function() {
      };
    })();
    function new_raw_buf(len) {
      if (has_buf) {
        if (Buffer.alloc) return Buffer.alloc(len);
        var b = new Buffer(len);
        b.fill(0);
        return b;
      }
      return typeof Uint8Array != "undefined" ? new Uint8Array(len) : new Array(len);
    }
    function new_unsafe_buf(len) {
      if (has_buf) return Buffer.allocUnsafe ? Buffer.allocUnsafe(len) : new Buffer(len);
      return typeof Uint8Array != "undefined" ? new Uint8Array(len) : new Array(len);
    }
    var s2a = function s2a2(s) {
      if (has_buf) return Buffer_from(s, "binary");
      return s.split("").map(function(x) {
        return x.charCodeAt(0) & 255;
      });
    };
    var chr0 = /\u0000/g;
    var chr1 = /[\u0001-\u0006]/g;
    var __toBuffer = function(bufs) {
      var x = [];
      for (var i = 0; i < bufs[0].length; ++i) {
        x.push.apply(x, bufs[0][i]);
      }
      return x;
    };
    var ___toBuffer = __toBuffer;
    var __utf16le = function(b, s, e) {
      var ss = [];
      for (var i = s; i < e; i += 2) ss.push(String.fromCharCode(__readUInt16LE(b, i)));
      return ss.join("").replace(chr0, "");
    };
    var ___utf16le = __utf16le;
    var __hexlify = function(b, s, l) {
      var ss = [];
      for (var i = s; i < s + l; ++i) ss.push(("0" + b[i].toString(16)).slice(-2));
      return ss.join("");
    };
    var ___hexlify = __hexlify;
    var __bconcat = function(bufs) {
      if (Array.isArray(bufs[0])) return [].concat.apply([], bufs);
      var maxlen = 0, i = 0;
      for (i = 0; i < bufs.length; ++i) maxlen += bufs[i].length;
      var o = new Uint8Array(maxlen);
      for (i = 0, maxlen = 0; i < bufs.length; maxlen += bufs[i].length, ++i) o.set(bufs[i], maxlen);
      return o;
    };
    var bconcat = __bconcat;
    if (has_buf) {
      __utf16le = function(b, s, e) {
        if (!Buffer.isBuffer(b)) return ___utf16le(b, s, e);
        return b.toString("utf16le", s, e).replace(chr0, "");
      };
      __hexlify = function(b, s, l) {
        return Buffer.isBuffer(b) ? b.toString("hex", s, s + l) : ___hexlify(b, s, l);
      };
      __toBuffer = function(bufs) {
        return bufs[0].length > 0 && Buffer.isBuffer(bufs[0][0]) ? Buffer.concat(bufs[0]) : ___toBuffer(bufs);
      };
      s2a = function(s) {
        return Buffer_from(s, "binary");
      };
      bconcat = function(bufs) {
        return Buffer.isBuffer(bufs[0]) ? Buffer.concat(bufs) : __bconcat(bufs);
      };
    }
    var __readUInt8 = function(b, idx) {
      return b[idx];
    };
    var __readUInt16LE = function(b, idx) {
      return b[idx + 1] * (1 << 8) + b[idx];
    };
    var __readInt16LE = function(b, idx) {
      var u = b[idx + 1] * (1 << 8) + b[idx];
      return u < 32768 ? u : (65535 - u + 1) * -1;
    };
    var __readUInt32LE = function(b, idx) {
      return b[idx + 3] * (1 << 24) + (b[idx + 2] << 16) + (b[idx + 1] << 8) + b[idx];
    };
    var __readInt32LE = function(b, idx) {
      return (b[idx + 3] << 24) + (b[idx + 2] << 16) + (b[idx + 1] << 8) + b[idx];
    };
    function ReadShift(size, t) {
      var oI, oS, type = 0;
      switch (size) {
        case 1:
          oI = __readUInt8(this, this.l);
          break;
        case 2:
          oI = (t !== "i" ? __readUInt16LE : __readInt16LE)(this, this.l);
          break;
        case 4:
          oI = __readInt32LE(this, this.l);
          break;
        case 16:
          type = 2;
          oS = __hexlify(this, this.l, size);
      }
      this.l += size;
      if (type === 0) return oI;
      return oS;
    }
    var __writeUInt32LE = function(b, val, idx) {
      b[idx] = val & 255;
      b[idx + 1] = val >>> 8 & 255;
      b[idx + 2] = val >>> 16 & 255;
      b[idx + 3] = val >>> 24 & 255;
    };
    var __writeInt32LE = function(b, val, idx) {
      b[idx] = val & 255;
      b[idx + 1] = val >> 8 & 255;
      b[idx + 2] = val >> 16 & 255;
      b[idx + 3] = val >> 24 & 255;
    };
    function WriteShift(t, val, f) {
      var size = 0, i = 0;
      switch (f) {
        case "hex":
          for (; i < t; ++i) {
            this[this.l++] = parseInt(val.slice(2 * i, 2 * i + 2), 16) || 0;
          }
          return this;
        case "utf16le":
          var end = this.l + t;
          for (i = 0; i < Math.min(val.length, t); ++i) {
            var cc = val.charCodeAt(i);
            this[this.l++] = cc & 255;
            this[this.l++] = cc >> 8;
          }
          while (this.l < end) this[this.l++] = 0;
          return this;
      }
      switch (t) {
        case 1:
          size = 1;
          this[this.l] = val & 255;
          break;
        case 2:
          size = 2;
          this[this.l] = val & 255;
          val >>>= 8;
          this[this.l + 1] = val & 255;
          break;
        case 4:
          size = 4;
          __writeUInt32LE(this, val, this.l);
          break;
        case -4:
          size = 4;
          __writeInt32LE(this, val, this.l);
          break;
      }
      this.l += size;
      return this;
    }
    function CheckField(hexstr, fld) {
      var m = __hexlify(this, this.l, hexstr.length >> 1);
      if (m !== hexstr) throw new Error(fld + "Expected " + hexstr + " saw " + m);
      this.l += hexstr.length >> 1;
    }
    function prep_blob(blob, pos) {
      blob.l = pos;
      blob.read_shift = ReadShift;
      blob.chk = CheckField;
      blob.write_shift = WriteShift;
    }
    function new_buf(sz) {
      var o = new_raw_buf(sz);
      prep_blob(o, 0);
      return o;
    }
    var CRC32 = (function() {
      var CRC322 = {};
      CRC322.version = "1.2.1";
      function signed_crc_table() {
        var c = 0, table = new Array(256);
        for (var n = 0; n != 256; ++n) {
          c = n;
          c = c & 1 ? -306674912 ^ c >>> 1 : c >>> 1;
          c = c & 1 ? -306674912 ^ c >>> 1 : c >>> 1;
          c = c & 1 ? -306674912 ^ c >>> 1 : c >>> 1;
          c = c & 1 ? -306674912 ^ c >>> 1 : c >>> 1;
          c = c & 1 ? -306674912 ^ c >>> 1 : c >>> 1;
          c = c & 1 ? -306674912 ^ c >>> 1 : c >>> 1;
          c = c & 1 ? -306674912 ^ c >>> 1 : c >>> 1;
          c = c & 1 ? -306674912 ^ c >>> 1 : c >>> 1;
          table[n] = c;
        }
        return typeof Int32Array !== "undefined" ? new Int32Array(table) : table;
      }
      var T0 = signed_crc_table();
      function slice_by_16_tables(T) {
        var c = 0, v = 0, n = 0, table = typeof Int32Array !== "undefined" ? new Int32Array(4096) : new Array(4096);
        for (n = 0; n != 256; ++n) table[n] = T[n];
        for (n = 0; n != 256; ++n) {
          v = T[n];
          for (c = 256 + n; c < 4096; c += 256) v = table[c] = v >>> 8 ^ T[v & 255];
        }
        var out = [];
        for (n = 1; n != 16; ++n) out[n - 1] = typeof Int32Array !== "undefined" ? table.subarray(n * 256, n * 256 + 256) : table.slice(n * 256, n * 256 + 256);
        return out;
      }
      var TT = slice_by_16_tables(T0);
      var T1 = TT[0], T2 = TT[1], T3 = TT[2], T4 = TT[3], T5 = TT[4];
      var T6 = TT[5], T7 = TT[6], T8 = TT[7], T9 = TT[8], Ta = TT[9];
      var Tb = TT[10], Tc = TT[11], Td = TT[12], Te = TT[13], Tf = TT[14];
      function crc32_bstr(bstr, seed) {
        var C = seed ^ -1;
        for (var i = 0, L = bstr.length; i < L; ) C = C >>> 8 ^ T0[(C ^ bstr.charCodeAt(i++)) & 255];
        return ~C;
      }
      function crc32_buf(B, seed) {
        var C = seed ^ -1, L = B.length - 15, i = 0;
        for (; i < L; ) C = Tf[B[i++] ^ C & 255] ^ Te[B[i++] ^ C >> 8 & 255] ^ Td[B[i++] ^ C >> 16 & 255] ^ Tc[B[i++] ^ C >>> 24] ^ Tb[B[i++]] ^ Ta[B[i++]] ^ T9[B[i++]] ^ T8[B[i++]] ^ T7[B[i++]] ^ T6[B[i++]] ^ T5[B[i++]] ^ T4[B[i++]] ^ T3[B[i++]] ^ T2[B[i++]] ^ T1[B[i++]] ^ T0[B[i++]];
        L += 15;
        while (i < L) C = C >>> 8 ^ T0[(C ^ B[i++]) & 255];
        return ~C;
      }
      function crc32_str(str, seed) {
        var C = seed ^ -1;
        for (var i = 0, L = str.length, c = 0, d = 0; i < L; ) {
          c = str.charCodeAt(i++);
          if (c < 128) {
            C = C >>> 8 ^ T0[(C ^ c) & 255];
          } else if (c < 2048) {
            C = C >>> 8 ^ T0[(C ^ (192 | c >> 6 & 31)) & 255];
            C = C >>> 8 ^ T0[(C ^ (128 | c & 63)) & 255];
          } else if (c >= 55296 && c < 57344) {
            c = (c & 1023) + 64;
            d = str.charCodeAt(i++) & 1023;
            C = C >>> 8 ^ T0[(C ^ (240 | c >> 8 & 7)) & 255];
            C = C >>> 8 ^ T0[(C ^ (128 | c >> 2 & 63)) & 255];
            C = C >>> 8 ^ T0[(C ^ (128 | d >> 6 & 15 | (c & 3) << 4)) & 255];
            C = C >>> 8 ^ T0[(C ^ (128 | d & 63)) & 255];
          } else {
            C = C >>> 8 ^ T0[(C ^ (224 | c >> 12 & 15)) & 255];
            C = C >>> 8 ^ T0[(C ^ (128 | c >> 6 & 63)) & 255];
            C = C >>> 8 ^ T0[(C ^ (128 | c & 63)) & 255];
          }
        }
        return ~C;
      }
      CRC322.table = T0;
      CRC322.bstr = crc32_bstr;
      CRC322.buf = crc32_buf;
      CRC322.str = crc32_str;
      return CRC322;
    })();
    var CFB2 = (function _CFB() {
      var exports3 = {};
      exports3.version = "1.2.2";
      function namecmp(l, r) {
        var L = l.split("/"), R = r.split("/");
        for (var i2 = 0, c = 0, Z = Math.min(L.length, R.length); i2 < Z; ++i2) {
          if (c = L[i2].length - R[i2].length) return c;
          if (L[i2] != R[i2]) return L[i2] < R[i2] ? -1 : 1;
        }
        return L.length - R.length;
      }
      function dirname(p) {
        if (p.charAt(p.length - 1) == "/") return p.slice(0, -1).indexOf("/") === -1 ? p : dirname(p.slice(0, -1));
        var c = p.lastIndexOf("/");
        return c === -1 ? p : p.slice(0, c + 1);
      }
      function filename(p) {
        if (p.charAt(p.length - 1) == "/") return filename(p.slice(0, -1));
        var c = p.lastIndexOf("/");
        return c === -1 ? p : p.slice(c + 1);
      }
      function write_dos_date(buf, date) {
        if (typeof date === "string") date = new Date(date);
        var hms = date.getHours();
        hms = hms << 6 | date.getMinutes();
        hms = hms << 5 | date.getSeconds() >>> 1;
        buf.write_shift(2, hms);
        var ymd = date.getFullYear() - 1980;
        ymd = ymd << 4 | date.getMonth() + 1;
        ymd = ymd << 5 | date.getDate();
        buf.write_shift(2, ymd);
      }
      function parse_dos_date(buf) {
        var hms = buf.read_shift(2) & 65535;
        var ymd = buf.read_shift(2) & 65535;
        var val = /* @__PURE__ */ new Date();
        var d = ymd & 31;
        ymd >>>= 5;
        var m = ymd & 15;
        ymd >>>= 4;
        val.setMilliseconds(0);
        val.setFullYear(ymd + 1980);
        val.setMonth(m - 1);
        val.setDate(d);
        var S = hms & 31;
        hms >>>= 5;
        var M = hms & 63;
        hms >>>= 6;
        val.setHours(hms);
        val.setMinutes(M);
        val.setSeconds(S << 1);
        return val;
      }
      function parse_extra_field(blob) {
        prep_blob(blob, 0);
        var o = {};
        var flags = 0;
        while (blob.l <= blob.length - 4) {
          var type = blob.read_shift(2);
          var sz = blob.read_shift(2), tgt = blob.l + sz;
          var p = {};
          switch (type) {
            /* UNIX-style Timestamps */
            case 21589:
              {
                flags = blob.read_shift(1);
                if (flags & 1) p.mtime = blob.read_shift(4);
                if (sz > 5) {
                  if (flags & 2) p.atime = blob.read_shift(4);
                  if (flags & 4) p.ctime = blob.read_shift(4);
                }
                if (p.mtime) p.mt = new Date(p.mtime * 1e3);
              }
              break;
          }
          blob.l = tgt;
          o[type] = p;
        }
        return o;
      }
      var fs;
      function get_fs() {
        return fs || (fs = require("fs"));
      }
      function parse(file, options) {
        if (file[0] == 80 && file[1] == 75) return parse_zip(file, options);
        if ((file[0] | 32) == 109 && (file[1] | 32) == 105) return parse_mad(file, options);
        if (file.length < 512) throw new Error("CFB file size " + file.length + " < 512");
        var mver = 3;
        var ssz = 512;
        var nmfs = 0;
        var difat_sec_cnt = 0;
        var dir_start = 0;
        var minifat_start = 0;
        var difat_start = 0;
        var fat_addrs = [];
        var blob = file.slice(0, 512);
        prep_blob(blob, 0);
        var mv = check_get_mver(blob);
        mver = mv[0];
        switch (mver) {
          case 3:
            ssz = 512;
            break;
          case 4:
            ssz = 4096;
            break;
          case 0:
            if (mv[1] == 0) return parse_zip(file, options);
          /* falls through */
          default:
            throw new Error("Major Version: Expected 3 or 4 saw " + mver);
        }
        if (ssz !== 512) {
          blob = file.slice(0, ssz);
          prep_blob(
            blob,
            28
            /* blob.l */
          );
        }
        var header = file.slice(0, ssz);
        check_shifts(blob, mver);
        var dir_cnt = blob.read_shift(4, "i");
        if (mver === 3 && dir_cnt !== 0) throw new Error("# Directory Sectors: Expected 0 saw " + dir_cnt);
        blob.l += 4;
        dir_start = blob.read_shift(4, "i");
        blob.l += 4;
        blob.chk("00100000", "Mini Stream Cutoff Size: ");
        minifat_start = blob.read_shift(4, "i");
        nmfs = blob.read_shift(4, "i");
        difat_start = blob.read_shift(4, "i");
        difat_sec_cnt = blob.read_shift(4, "i");
        for (var q2 = -1, j = 0; j < 109; ++j) {
          q2 = blob.read_shift(4, "i");
          if (q2 < 0) break;
          fat_addrs[j] = q2;
        }
        var sectors = sectorify(file, ssz);
        sleuth_fat(difat_start, difat_sec_cnt, sectors, ssz, fat_addrs);
        var sector_list = make_sector_list(sectors, dir_start, fat_addrs, ssz);
        sector_list[dir_start].name = "!Directory";
        if (nmfs > 0 && minifat_start !== ENDOFCHAIN) sector_list[minifat_start].name = "!MiniFAT";
        sector_list[fat_addrs[0]].name = "!FAT";
        sector_list.fat_addrs = fat_addrs;
        sector_list.ssz = ssz;
        var files = {}, Paths = [], FileIndex = [], FullPaths = [];
        read_directory(dir_start, sector_list, sectors, Paths, nmfs, files, FileIndex, minifat_start);
        build_full_paths(FileIndex, FullPaths, Paths);
        Paths.shift();
        var o = {
          FileIndex,
          FullPaths
        };
        if (options && options.raw) o.raw = { header, sectors };
        return o;
      }
      function check_get_mver(blob) {
        if (blob[blob.l] == 80 && blob[blob.l + 1] == 75) return [0, 0];
        blob.chk(HEADER_SIGNATURE, "Header Signature: ");
        blob.l += 16;
        var mver = blob.read_shift(2, "u");
        return [blob.read_shift(2, "u"), mver];
      }
      function check_shifts(blob, mver) {
        var shift = 9;
        blob.l += 2;
        switch (shift = blob.read_shift(2)) {
          case 9:
            if (mver != 3) throw new Error("Sector Shift: Expected 9 saw " + shift);
            break;
          case 12:
            if (mver != 4) throw new Error("Sector Shift: Expected 12 saw " + shift);
            break;
          default:
            throw new Error("Sector Shift: Expected 9 or 12 saw " + shift);
        }
        blob.chk("0600", "Mini Sector Shift: ");
        blob.chk("000000000000", "Reserved: ");
      }
      function sectorify(file, ssz) {
        var nsectors = Math.ceil(file.length / ssz) - 1;
        var sectors = [];
        for (var i2 = 1; i2 < nsectors; ++i2) sectors[i2 - 1] = file.slice(i2 * ssz, (i2 + 1) * ssz);
        sectors[nsectors - 1] = file.slice(nsectors * ssz);
        return sectors;
      }
      function build_full_paths(FI, FP, Paths) {
        var i2 = 0, L = 0, R = 0, C = 0, j = 0, pl = Paths.length;
        var dad = [], q2 = [];
        for (; i2 < pl; ++i2) {
          dad[i2] = q2[i2] = i2;
          FP[i2] = Paths[i2];
        }
        for (; j < q2.length; ++j) {
          i2 = q2[j];
          L = FI[i2].L;
          R = FI[i2].R;
          C = FI[i2].C;
          if (dad[i2] === i2) {
            if (L !== -1 && dad[L] !== L) dad[i2] = dad[L];
            if (R !== -1 && dad[R] !== R) dad[i2] = dad[R];
          }
          if (C !== -1) dad[C] = i2;
          if (L !== -1 && i2 != dad[i2]) {
            dad[L] = dad[i2];
            if (q2.lastIndexOf(L) < j) q2.push(L);
          }
          if (R !== -1 && i2 != dad[i2]) {
            dad[R] = dad[i2];
            if (q2.lastIndexOf(R) < j) q2.push(R);
          }
        }
        for (i2 = 1; i2 < pl; ++i2) if (dad[i2] === i2) {
          if (R !== -1 && dad[R] !== R) dad[i2] = dad[R];
          else if (L !== -1 && dad[L] !== L) dad[i2] = dad[L];
        }
        for (i2 = 1; i2 < pl; ++i2) {
          if (FI[i2].type === 0) continue;
          j = i2;
          if (j != dad[j]) do {
            j = dad[j];
            FP[i2] = FP[j] + "/" + FP[i2];
          } while (j !== 0 && -1 !== dad[j] && j != dad[j]);
          dad[i2] = -1;
        }
        FP[0] += "/";
        for (i2 = 1; i2 < pl; ++i2) {
          if (FI[i2].type !== 2) FP[i2] += "/";
        }
      }
      function get_mfat_entry(entry, payload, mini) {
        var start = entry.start, size = entry.size;
        var o = [];
        var idx = start;
        while (mini && size > 0 && idx >= 0) {
          o.push(payload.slice(idx * MSSZ, idx * MSSZ + MSSZ));
          size -= MSSZ;
          idx = __readInt32LE(mini, idx * 4);
        }
        if (o.length === 0) return new_buf(0);
        return bconcat(o).slice(0, entry.size);
      }
      function sleuth_fat(idx, cnt, sectors, ssz, fat_addrs) {
        var q2 = ENDOFCHAIN;
        if (idx === ENDOFCHAIN) {
          if (cnt !== 0) throw new Error("DIFAT chain shorter than expected");
        } else if (idx !== -1) {
          var sector = sectors[idx], m = (ssz >>> 2) - 1;
          if (!sector) return;
          for (var i2 = 0; i2 < m; ++i2) {
            if ((q2 = __readInt32LE(sector, i2 * 4)) === ENDOFCHAIN) break;
            fat_addrs.push(q2);
          }
          if (cnt >= 1) sleuth_fat(__readInt32LE(sector, ssz - 4), cnt - 1, sectors, ssz, fat_addrs);
        }
      }
      function get_sector_list(sectors, start, fat_addrs, ssz, chkd) {
        var buf = [], buf_chain = [];
        if (!chkd) chkd = [];
        var modulus = ssz - 1, j = 0, jj = 0;
        for (j = start; j >= 0; ) {
          chkd[j] = true;
          buf[buf.length] = j;
          buf_chain.push(sectors[j]);
          var addr = fat_addrs[Math.floor(j * 4 / ssz)];
          jj = j * 4 & modulus;
          if (ssz < 4 + jj) throw new Error("FAT boundary crossed: " + j + " 4 " + ssz);
          if (!sectors[addr]) break;
          j = __readInt32LE(sectors[addr], jj);
        }
        return { nodes: buf, data: __toBuffer([buf_chain]) };
      }
      function make_sector_list(sectors, dir_start, fat_addrs, ssz) {
        var sl = sectors.length, sector_list = [];
        var chkd = [], buf = [], buf_chain = [];
        var modulus = ssz - 1, i2 = 0, j = 0, k = 0, jj = 0;
        for (i2 = 0; i2 < sl; ++i2) {
          buf = [];
          k = i2 + dir_start;
          if (k >= sl) k -= sl;
          if (chkd[k]) continue;
          buf_chain = [];
          var seen = [];
          for (j = k; j >= 0; ) {
            seen[j] = true;
            chkd[j] = true;
            buf[buf.length] = j;
            buf_chain.push(sectors[j]);
            var addr = fat_addrs[Math.floor(j * 4 / ssz)];
            jj = j * 4 & modulus;
            if (ssz < 4 + jj) throw new Error("FAT boundary crossed: " + j + " 4 " + ssz);
            if (!sectors[addr]) break;
            j = __readInt32LE(sectors[addr], jj);
            if (seen[j]) break;
          }
          sector_list[k] = { nodes: buf, data: __toBuffer([buf_chain]) };
        }
        return sector_list;
      }
      function read_directory(dir_start, sector_list, sectors, Paths, nmfs, files, FileIndex, mini) {
        var minifat_store = 0, pl = Paths.length ? 2 : 0;
        var sector = sector_list[dir_start].data;
        var i2 = 0, namelen = 0, name;
        for (; i2 < sector.length; i2 += 128) {
          var blob = sector.slice(i2, i2 + 128);
          prep_blob(blob, 64);
          namelen = blob.read_shift(2);
          name = __utf16le(blob, 0, namelen - pl);
          Paths.push(name);
          var o = {
            name,
            type: blob.read_shift(1),
            color: blob.read_shift(1),
            L: blob.read_shift(4, "i"),
            R: blob.read_shift(4, "i"),
            C: blob.read_shift(4, "i"),
            clsid: blob.read_shift(16),
            state: blob.read_shift(4, "i"),
            start: 0,
            size: 0
          };
          var ctime = blob.read_shift(2) + blob.read_shift(2) + blob.read_shift(2) + blob.read_shift(2);
          if (ctime !== 0) o.ct = read_date(blob, blob.l - 8);
          var mtime = blob.read_shift(2) + blob.read_shift(2) + blob.read_shift(2) + blob.read_shift(2);
          if (mtime !== 0) o.mt = read_date(blob, blob.l - 8);
          o.start = blob.read_shift(4, "i");
          o.size = blob.read_shift(4, "i");
          if (o.size < 0 && o.start < 0) {
            o.size = o.type = 0;
            o.start = ENDOFCHAIN;
            o.name = "";
          }
          if (o.type === 5) {
            minifat_store = o.start;
            if (nmfs > 0 && minifat_store !== ENDOFCHAIN) sector_list[minifat_store].name = "!StreamData";
          } else if (o.size >= 4096) {
            o.storage = "fat";
            if (sector_list[o.start] === void 0) sector_list[o.start] = get_sector_list(sectors, o.start, sector_list.fat_addrs, sector_list.ssz);
            sector_list[o.start].name = o.name;
            o.content = sector_list[o.start].data.slice(0, o.size);
          } else {
            o.storage = "minifat";
            if (o.size < 0) o.size = 0;
            else if (minifat_store !== ENDOFCHAIN && o.start !== ENDOFCHAIN && sector_list[minifat_store]) {
              o.content = get_mfat_entry(o, sector_list[minifat_store].data, (sector_list[mini] || {}).data);
            }
          }
          if (o.content) prep_blob(o.content, 0);
          files[name] = o;
          FileIndex.push(o);
        }
      }
      function read_date(blob, offset) {
        return new Date((__readUInt32LE(blob, offset + 4) / 1e7 * Math.pow(2, 32) + __readUInt32LE(blob, offset) / 1e7 - 11644473600) * 1e3);
      }
      function read_file(filename2, options) {
        get_fs();
        return parse(fs.readFileSync(filename2), options);
      }
      function read2(blob, options) {
        var type = options && options.type;
        if (!type) {
          if (has_buf && Buffer.isBuffer(blob)) type = "buffer";
        }
        switch (type || "base64") {
          case "file":
            return read_file(blob, options);
          case "base64":
            return parse(s2a(Base64_decode(blob)), options);
          case "binary":
            return parse(s2a(blob), options);
        }
        return parse(blob, options);
      }
      function init_cfb(cfb, opts) {
        var o = opts || {}, root = o.root || "Root Entry";
        if (!cfb.FullPaths) cfb.FullPaths = [];
        if (!cfb.FileIndex) cfb.FileIndex = [];
        if (cfb.FullPaths.length !== cfb.FileIndex.length) throw new Error("inconsistent CFB structure");
        if (cfb.FullPaths.length === 0) {
          cfb.FullPaths[0] = root + "/";
          cfb.FileIndex[0] = { name: root, type: 5 };
        }
        if (o.CLSID) cfb.FileIndex[0].clsid = o.CLSID;
        seed_cfb(cfb);
      }
      function seed_cfb(cfb) {
        var nm = "Sh33tJ5";
        if (CFB2.find(cfb, "/" + nm)) return;
        var p = new_buf(4);
        p[0] = 55;
        p[1] = p[3] = 50;
        p[2] = 54;
        cfb.FileIndex.push({ name: nm, type: 2, content: p, size: 4, L: 69, R: 69, C: 69 });
        cfb.FullPaths.push(cfb.FullPaths[0] + nm);
        rebuild_cfb(cfb);
      }
      function rebuild_cfb(cfb, f) {
        init_cfb(cfb);
        var gc = false, s = false;
        for (var i2 = cfb.FullPaths.length - 1; i2 >= 0; --i2) {
          var _file = cfb.FileIndex[i2];
          switch (_file.type) {
            case 0:
              if (s) gc = true;
              else {
                cfb.FileIndex.pop();
                cfb.FullPaths.pop();
              }
              break;
            case 1:
            case 2:
            case 5:
              s = true;
              if (isNaN(_file.R * _file.L * _file.C)) gc = true;
              if (_file.R > -1 && _file.L > -1 && _file.R == _file.L) gc = true;
              break;
            default:
              gc = true;
              break;
          }
        }
        if (!gc && !f) return;
        var now = new Date(1987, 1, 19), j = 0;
        var fullPaths = Object.create ? /* @__PURE__ */ Object.create(null) : {};
        var data = [];
        for (i2 = 0; i2 < cfb.FullPaths.length; ++i2) {
          fullPaths[cfb.FullPaths[i2]] = true;
          if (cfb.FileIndex[i2].type === 0) continue;
          data.push([cfb.FullPaths[i2], cfb.FileIndex[i2]]);
        }
        for (i2 = 0; i2 < data.length; ++i2) {
          var dad = dirname(data[i2][0]);
          s = fullPaths[dad];
          while (!s) {
            while (dirname(dad) && !fullPaths[dirname(dad)]) dad = dirname(dad);
            data.push([dad, {
              name: filename(dad).replace("/", ""),
              type: 1,
              clsid: HEADER_CLSID,
              ct: now,
              mt: now,
              content: null
            }]);
            fullPaths[dad] = true;
            dad = dirname(data[i2][0]);
            s = fullPaths[dad];
          }
        }
        data.sort(function(x, y) {
          return namecmp(x[0], y[0]);
        });
        cfb.FullPaths = [];
        cfb.FileIndex = [];
        for (i2 = 0; i2 < data.length; ++i2) {
          cfb.FullPaths[i2] = data[i2][0];
          cfb.FileIndex[i2] = data[i2][1];
        }
        for (i2 = 0; i2 < data.length; ++i2) {
          var elt = cfb.FileIndex[i2];
          var nm = cfb.FullPaths[i2];
          elt.name = filename(nm).replace("/", "");
          elt.L = elt.R = elt.C = -(elt.color = 1);
          elt.size = elt.content ? elt.content.length : 0;
          elt.start = 0;
          elt.clsid = elt.clsid || HEADER_CLSID;
          if (i2 === 0) {
            elt.C = data.length > 1 ? 1 : -1;
            elt.size = 0;
            elt.type = 5;
          } else if (nm.slice(-1) == "/") {
            for (j = i2 + 1; j < data.length; ++j) if (dirname(cfb.FullPaths[j]) == nm) break;
            elt.C = j >= data.length ? -1 : j;
            for (j = i2 + 1; j < data.length; ++j) if (dirname(cfb.FullPaths[j]) == dirname(nm)) break;
            elt.R = j >= data.length ? -1 : j;
            elt.type = 1;
          } else {
            if (dirname(cfb.FullPaths[i2 + 1] || "") == dirname(nm)) elt.R = i2 + 1;
            elt.type = 2;
          }
        }
      }
      function _write(cfb, options) {
        var _opts = options || {};
        if (_opts.fileType == "mad") return write_mad(cfb, _opts);
        rebuild_cfb(cfb);
        switch (_opts.fileType) {
          case "zip":
            return write_zip(cfb, _opts);
        }
        var L = (function(cfb2) {
          var mini_size = 0, fat_size = 0;
          for (var i3 = 0; i3 < cfb2.FileIndex.length; ++i3) {
            var file2 = cfb2.FileIndex[i3];
            if (!file2.content) continue;
            var flen2 = file2.content.length;
            if (flen2 > 0) {
              if (flen2 < 4096) mini_size += flen2 + 63 >> 6;
              else fat_size += flen2 + 511 >> 9;
            }
          }
          var dir_cnt = cfb2.FullPaths.length + 3 >> 2;
          var mini_cnt = mini_size + 7 >> 3;
          var mfat_cnt = mini_size + 127 >> 7;
          var fat_base = mini_cnt + fat_size + dir_cnt + mfat_cnt;
          var fat_cnt = fat_base + 127 >> 7;
          var difat_cnt = fat_cnt <= 109 ? 0 : Math.ceil((fat_cnt - 109) / 127);
          while (fat_base + fat_cnt + difat_cnt + 127 >> 7 > fat_cnt) difat_cnt = ++fat_cnt <= 109 ? 0 : Math.ceil((fat_cnt - 109) / 127);
          var L2 = [1, difat_cnt, fat_cnt, mfat_cnt, dir_cnt, fat_size, mini_size, 0];
          cfb2.FileIndex[0].size = mini_size << 6;
          L2[7] = (cfb2.FileIndex[0].start = L2[0] + L2[1] + L2[2] + L2[3] + L2[4] + L2[5]) + (L2[6] + 7 >> 3);
          return L2;
        })(cfb);
        var o = new_buf(L[7] << 9);
        var i2 = 0, T = 0;
        {
          for (i2 = 0; i2 < 8; ++i2) o.write_shift(1, HEADER_SIG[i2]);
          for (i2 = 0; i2 < 8; ++i2) o.write_shift(2, 0);
          o.write_shift(2, 62);
          o.write_shift(2, 3);
          o.write_shift(2, 65534);
          o.write_shift(2, 9);
          o.write_shift(2, 6);
          for (i2 = 0; i2 < 3; ++i2) o.write_shift(2, 0);
          o.write_shift(4, 0);
          o.write_shift(4, L[2]);
          o.write_shift(4, L[0] + L[1] + L[2] + L[3] - 1);
          o.write_shift(4, 0);
          o.write_shift(4, 1 << 12);
          o.write_shift(4, L[3] ? L[0] + L[1] + L[2] - 1 : ENDOFCHAIN);
          o.write_shift(4, L[3]);
          o.write_shift(-4, L[1] ? L[0] - 1 : ENDOFCHAIN);
          o.write_shift(4, L[1]);
          for (i2 = 0; i2 < 109; ++i2) o.write_shift(-4, i2 < L[2] ? L[1] + i2 : -1);
        }
        if (L[1]) {
          for (T = 0; T < L[1]; ++T) {
            for (; i2 < 236 + T * 127; ++i2) o.write_shift(-4, i2 < L[2] ? L[1] + i2 : -1);
            o.write_shift(-4, T === L[1] - 1 ? ENDOFCHAIN : T + 1);
          }
        }
        var chainit = function(w) {
          for (T += w; i2 < T - 1; ++i2) o.write_shift(-4, i2 + 1);
          if (w) {
            ++i2;
            o.write_shift(-4, ENDOFCHAIN);
          }
        };
        T = i2 = 0;
        for (T += L[1]; i2 < T; ++i2) o.write_shift(-4, consts.DIFSECT);
        for (T += L[2]; i2 < T; ++i2) o.write_shift(-4, consts.FATSECT);
        chainit(L[3]);
        chainit(L[4]);
        var j = 0, flen = 0;
        var file = cfb.FileIndex[0];
        for (; j < cfb.FileIndex.length; ++j) {
          file = cfb.FileIndex[j];
          if (!file.content) continue;
          flen = file.content.length;
          if (flen < 4096) continue;
          file.start = T;
          chainit(flen + 511 >> 9);
        }
        chainit(L[6] + 7 >> 3);
        while (o.l & 511) o.write_shift(-4, consts.ENDOFCHAIN);
        T = i2 = 0;
        for (j = 0; j < cfb.FileIndex.length; ++j) {
          file = cfb.FileIndex[j];
          if (!file.content) continue;
          flen = file.content.length;
          if (!flen || flen >= 4096) continue;
          file.start = T;
          chainit(flen + 63 >> 6);
        }
        while (o.l & 511) o.write_shift(-4, consts.ENDOFCHAIN);
        for (i2 = 0; i2 < L[4] << 2; ++i2) {
          var nm = cfb.FullPaths[i2];
          if (!nm || nm.length === 0) {
            for (j = 0; j < 17; ++j) o.write_shift(4, 0);
            for (j = 0; j < 3; ++j) o.write_shift(4, -1);
            for (j = 0; j < 12; ++j) o.write_shift(4, 0);
            continue;
          }
          file = cfb.FileIndex[i2];
          if (i2 === 0) file.start = file.size ? file.start - 1 : ENDOFCHAIN;
          var _nm = i2 === 0 && _opts.root || file.name;
          if (_nm.length > 32) {
            console.error("Name " + _nm + " will be truncated to " + _nm.slice(0, 32));
            _nm = _nm.slice(0, 32);
          }
          flen = 2 * (_nm.length + 1);
          o.write_shift(64, _nm, "utf16le");
          o.write_shift(2, flen);
          o.write_shift(1, file.type);
          o.write_shift(1, file.color);
          o.write_shift(-4, file.L);
          o.write_shift(-4, file.R);
          o.write_shift(-4, file.C);
          if (!file.clsid) for (j = 0; j < 4; ++j) o.write_shift(4, 0);
          else o.write_shift(16, file.clsid, "hex");
          o.write_shift(4, file.state || 0);
          o.write_shift(4, 0);
          o.write_shift(4, 0);
          o.write_shift(4, 0);
          o.write_shift(4, 0);
          o.write_shift(4, file.start);
          o.write_shift(4, file.size);
          o.write_shift(4, 0);
        }
        for (i2 = 1; i2 < cfb.FileIndex.length; ++i2) {
          file = cfb.FileIndex[i2];
          if (file.size >= 4096) {
            o.l = file.start + 1 << 9;
            if (has_buf && Buffer.isBuffer(file.content)) {
              file.content.copy(o, o.l, 0, file.size);
              o.l += file.size + 511 & -512;
            } else {
              for (j = 0; j < file.size; ++j) o.write_shift(1, file.content[j]);
              for (; j & 511; ++j) o.write_shift(1, 0);
            }
          }
        }
        for (i2 = 1; i2 < cfb.FileIndex.length; ++i2) {
          file = cfb.FileIndex[i2];
          if (file.size > 0 && file.size < 4096) {
            if (has_buf && Buffer.isBuffer(file.content)) {
              file.content.copy(o, o.l, 0, file.size);
              o.l += file.size + 63 & -64;
            } else {
              for (j = 0; j < file.size; ++j) o.write_shift(1, file.content[j]);
              for (; j & 63; ++j) o.write_shift(1, 0);
            }
          }
        }
        if (has_buf) {
          o.l = o.length;
        } else {
          while (o.l < o.length) o.write_shift(1, 0);
        }
        return o;
      }
      function find2(cfb, path) {
        var UCFullPaths = cfb.FullPaths.map(function(x) {
          return x.toUpperCase();
        });
        var UCPaths = UCFullPaths.map(function(x) {
          var y = x.split("/");
          return y[y.length - (x.slice(-1) == "/" ? 2 : 1)];
        });
        var k = false;
        if (path.charCodeAt(0) === 47) {
          k = true;
          path = UCFullPaths[0].slice(0, -1) + path;
        } else k = path.indexOf("/") !== -1;
        var UCPath = path.toUpperCase();
        var w = k === true ? UCFullPaths.indexOf(UCPath) : UCPaths.indexOf(UCPath);
        if (w !== -1) return cfb.FileIndex[w];
        var m = !UCPath.match(chr1);
        UCPath = UCPath.replace(chr0, "");
        if (m) UCPath = UCPath.replace(chr1, "!");
        for (w = 0; w < UCFullPaths.length; ++w) {
          if ((m ? UCFullPaths[w].replace(chr1, "!") : UCFullPaths[w]).replace(chr0, "") == UCPath) return cfb.FileIndex[w];
          if ((m ? UCPaths[w].replace(chr1, "!") : UCPaths[w]).replace(chr0, "") == UCPath) return cfb.FileIndex[w];
        }
        return null;
      }
      var MSSZ = 64;
      var ENDOFCHAIN = -2;
      var HEADER_SIGNATURE = "d0cf11e0a1b11ae1";
      var HEADER_SIG = [208, 207, 17, 224, 161, 177, 26, 225];
      var HEADER_CLSID = "00000000000000000000000000000000";
      var consts = {
        /* 2.1 Compund File Sector Numbers and Types */
        MAXREGSECT: -6,
        DIFSECT: -4,
        FATSECT: -3,
        ENDOFCHAIN,
        FREESECT: -1,
        /* 2.2 Compound File Header */
        HEADER_SIGNATURE,
        HEADER_MINOR_VERSION: "3e00",
        MAXREGSID: -6,
        NOSTREAM: -1,
        HEADER_CLSID,
        /* 2.6.1 Compound File Directory Entry */
        EntryTypes: ["unknown", "storage", "stream", "lockbytes", "property", "root"]
      };
      function write_file(cfb, filename2, options) {
        get_fs();
        var o = _write(cfb, options);
        fs.writeFileSync(filename2, o);
      }
      function a2s(o) {
        var out = new Array(o.length);
        for (var i2 = 0; i2 < o.length; ++i2) out[i2] = String.fromCharCode(o[i2]);
        return out.join("");
      }
      function write(cfb, options) {
        var o = _write(cfb, options);
        switch (options && options.type || "buffer") {
          case "file":
            get_fs();
            fs.writeFileSync(options.filename, o);
            return o;
          case "binary":
            return typeof o == "string" ? o : a2s(o);
          case "base64":
            return Base64_encode(typeof o == "string" ? o : a2s(o));
          case "buffer":
            if (has_buf) return Buffer.isBuffer(o) ? o : Buffer_from(o);
          /* falls through */
          case "array":
            return typeof o == "string" ? s2a(o) : o;
        }
        return o;
      }
      var _zlib;
      function use_zlib(zlib) {
        try {
          var InflateRaw = zlib.InflateRaw;
          var InflRaw = new InflateRaw();
          InflRaw._processChunk(new Uint8Array([3, 0]), InflRaw._finishFlushFlag);
          if (InflRaw.bytesRead) _zlib = zlib;
          else throw new Error("zlib does not expose bytesRead");
        } catch (e) {
          console.error("cannot use native zlib: " + (e.message || e));
        }
      }
      function _inflateRawSync(payload, usz) {
        if (!_zlib) return _inflate(payload, usz);
        var InflateRaw = _zlib.InflateRaw;
        var InflRaw = new InflateRaw();
        var out = InflRaw._processChunk(payload.slice(payload.l), InflRaw._finishFlushFlag);
        payload.l += InflRaw.bytesRead;
        return out;
      }
      function _deflateRawSync(payload) {
        return _zlib ? _zlib.deflateRawSync(payload) : _deflate(payload);
      }
      var CLEN_ORDER = [16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15];
      var LEN_LN = [3, 4, 5, 6, 7, 8, 9, 10, 11, 13, 15, 17, 19, 23, 27, 31, 35, 43, 51, 59, 67, 83, 99, 115, 131, 163, 195, 227, 258];
      var DST_LN = [1, 2, 3, 4, 5, 7, 9, 13, 17, 25, 33, 49, 65, 97, 129, 193, 257, 385, 513, 769, 1025, 1537, 2049, 3073, 4097, 6145, 8193, 12289, 16385, 24577];
      function bit_swap_8(n) {
        var t = (n << 1 | n << 11) & 139536 | (n << 5 | n << 15) & 558144;
        return (t >> 16 | t >> 8 | t) & 255;
      }
      var use_typed_arrays = typeof Uint8Array !== "undefined";
      var bitswap8 = use_typed_arrays ? new Uint8Array(1 << 8) : [];
      for (var q = 0; q < 1 << 8; ++q) bitswap8[q] = bit_swap_8(q);
      function bit_swap_n(n, b) {
        var rev = bitswap8[n & 255];
        if (b <= 8) return rev >>> 8 - b;
        rev = rev << 8 | bitswap8[n >> 8 & 255];
        if (b <= 16) return rev >>> 16 - b;
        rev = rev << 8 | bitswap8[n >> 16 & 255];
        return rev >>> 24 - b;
      }
      function read_bits_2(buf, bl) {
        var w = bl & 7, h = bl >>> 3;
        return (buf[h] | (w <= 6 ? 0 : buf[h + 1] << 8)) >>> w & 3;
      }
      function read_bits_3(buf, bl) {
        var w = bl & 7, h = bl >>> 3;
        return (buf[h] | (w <= 5 ? 0 : buf[h + 1] << 8)) >>> w & 7;
      }
      function read_bits_4(buf, bl) {
        var w = bl & 7, h = bl >>> 3;
        return (buf[h] | (w <= 4 ? 0 : buf[h + 1] << 8)) >>> w & 15;
      }
      function read_bits_5(buf, bl) {
        var w = bl & 7, h = bl >>> 3;
        return (buf[h] | (w <= 3 ? 0 : buf[h + 1] << 8)) >>> w & 31;
      }
      function read_bits_7(buf, bl) {
        var w = bl & 7, h = bl >>> 3;
        return (buf[h] | (w <= 1 ? 0 : buf[h + 1] << 8)) >>> w & 127;
      }
      function read_bits_n(buf, bl, n) {
        var w = bl & 7, h = bl >>> 3, f = (1 << n) - 1;
        var v = buf[h] >>> w;
        if (n < 8 - w) return v & f;
        v |= buf[h + 1] << 8 - w;
        if (n < 16 - w) return v & f;
        v |= buf[h + 2] << 16 - w;
        if (n < 24 - w) return v & f;
        v |= buf[h + 3] << 24 - w;
        return v & f;
      }
      function write_bits_3(buf, bl, v) {
        var w = bl & 7, h = bl >>> 3;
        if (w <= 5) buf[h] |= (v & 7) << w;
        else {
          buf[h] |= v << w & 255;
          buf[h + 1] = (v & 7) >> 8 - w;
        }
        return bl + 3;
      }
      function write_bits_1(buf, bl, v) {
        var w = bl & 7, h = bl >>> 3;
        v = (v & 1) << w;
        buf[h] |= v;
        return bl + 1;
      }
      function write_bits_8(buf, bl, v) {
        var w = bl & 7, h = bl >>> 3;
        v <<= w;
        buf[h] |= v & 255;
        v >>>= 8;
        buf[h + 1] = v;
        return bl + 8;
      }
      function write_bits_16(buf, bl, v) {
        var w = bl & 7, h = bl >>> 3;
        v <<= w;
        buf[h] |= v & 255;
        v >>>= 8;
        buf[h + 1] = v & 255;
        buf[h + 2] = v >>> 8;
        return bl + 16;
      }
      function realloc(b, sz) {
        var L = b.length, M = 2 * L > sz ? 2 * L : sz + 5, i2 = 0;
        if (L >= sz) return b;
        if (has_buf) {
          var o = new_unsafe_buf(M);
          if (b.copy) b.copy(o);
          else for (; i2 < b.length; ++i2) o[i2] = b[i2];
          return o;
        } else if (use_typed_arrays) {
          var a = new Uint8Array(M);
          if (a.set) a.set(b);
          else for (; i2 < L; ++i2) a[i2] = b[i2];
          return a;
        }
        b.length = M;
        return b;
      }
      function zero_fill_array(n) {
        var o = new Array(n);
        for (var i2 = 0; i2 < n; ++i2) o[i2] = 0;
        return o;
      }
      function build_tree2(clens, cmap, MAX) {
        var maxlen = 1, w = 0, i2 = 0, j = 0, ccode = 0, L = clens.length;
        var bl_count = use_typed_arrays ? new Uint16Array(32) : zero_fill_array(32);
        for (i2 = 0; i2 < 32; ++i2) bl_count[i2] = 0;
        for (i2 = L; i2 < MAX; ++i2) clens[i2] = 0;
        L = clens.length;
        var ctree = use_typed_arrays ? new Uint16Array(L) : zero_fill_array(L);
        for (i2 = 0; i2 < L; ++i2) {
          bl_count[w = clens[i2]]++;
          if (maxlen < w) maxlen = w;
          ctree[i2] = 0;
        }
        bl_count[0] = 0;
        for (i2 = 1; i2 <= maxlen; ++i2) bl_count[i2 + 16] = ccode = ccode + bl_count[i2 - 1] << 1;
        for (i2 = 0; i2 < L; ++i2) {
          ccode = clens[i2];
          if (ccode != 0) ctree[i2] = bl_count[ccode + 16]++;
        }
        var cleni = 0;
        for (i2 = 0; i2 < L; ++i2) {
          cleni = clens[i2];
          if (cleni != 0) {
            ccode = bit_swap_n(ctree[i2], maxlen) >> maxlen - cleni;
            for (j = (1 << maxlen + 4 - cleni) - 1; j >= 0; --j)
              cmap[ccode | j << cleni] = cleni & 15 | i2 << 4;
          }
        }
        return maxlen;
      }
      var fix_lmap = use_typed_arrays ? new Uint16Array(512) : zero_fill_array(512);
      var fix_dmap = use_typed_arrays ? new Uint16Array(32) : zero_fill_array(32);
      if (!use_typed_arrays) {
        for (var i = 0; i < 512; ++i) fix_lmap[i] = 0;
        for (i = 0; i < 32; ++i) fix_dmap[i] = 0;
      }
      (function() {
        var dlens = [];
        var i2 = 0;
        for (; i2 < 32; i2++) dlens.push(5);
        build_tree2(dlens, fix_dmap, 32);
        var clens = [];
        i2 = 0;
        for (; i2 <= 143; i2++) clens.push(8);
        for (; i2 <= 255; i2++) clens.push(9);
        for (; i2 <= 279; i2++) clens.push(7);
        for (; i2 <= 287; i2++) clens.push(8);
        build_tree2(clens, fix_lmap, 288);
      })();
      var _deflateRaw = (function _deflateRawIIFE() {
        var DST_LN_RE = use_typed_arrays ? new Uint8Array(32768) : [];
        var j = 0, k = 0;
        for (; j < DST_LN.length - 1; ++j) {
          for (; k < DST_LN[j + 1]; ++k) DST_LN_RE[k] = j;
        }
        for (; k < 32768; ++k) DST_LN_RE[k] = 29;
        var LEN_LN_RE = use_typed_arrays ? new Uint8Array(259) : [];
        for (j = 0, k = 0; j < LEN_LN.length - 1; ++j) {
          for (; k < LEN_LN[j + 1]; ++k) LEN_LN_RE[k] = j;
        }
        function write_stored(data, out) {
          var boff = 0;
          while (boff < data.length) {
            var L = Math.min(65535, data.length - boff);
            var h = boff + L == data.length;
            out.write_shift(1, +h);
            out.write_shift(2, L);
            out.write_shift(2, ~L & 65535);
            while (L-- > 0) out[out.l++] = data[boff++];
          }
          return out.l;
        }
        function write_huff_fixed(data, out) {
          var bl = 0;
          var boff = 0;
          var addrs = use_typed_arrays ? new Uint16Array(32768) : [];
          while (boff < data.length) {
            var L = (
              /* data.length - boff; */
              Math.min(65535, data.length - boff)
            );
            if (L < 10) {
              bl = write_bits_3(out, bl, +!!(boff + L == data.length));
              if (bl & 7) bl += 8 - (bl & 7);
              out.l = bl / 8 | 0;
              out.write_shift(2, L);
              out.write_shift(2, ~L & 65535);
              while (L-- > 0) out[out.l++] = data[boff++];
              bl = out.l * 8;
              continue;
            }
            bl = write_bits_3(out, bl, +!!(boff + L == data.length) + 2);
            var hash = 0;
            while (L-- > 0) {
              var d = data[boff];
              hash = (hash << 5 ^ d) & 32767;
              var match = -1, mlen = 0;
              if (match = addrs[hash]) {
                match |= boff & ~32767;
                if (match > boff) match -= 32768;
                if (match < boff) while (data[match + mlen] == data[boff + mlen] && mlen < 250) ++mlen;
              }
              if (mlen > 2) {
                d = LEN_LN_RE[mlen];
                if (d <= 22) bl = write_bits_8(out, bl, bitswap8[d + 1] >> 1) - 1;
                else {
                  write_bits_8(out, bl, 3);
                  bl += 5;
                  write_bits_8(out, bl, bitswap8[d - 23] >> 5);
                  bl += 3;
                }
                var len_eb = d < 8 ? 0 : d - 4 >> 2;
                if (len_eb > 0) {
                  write_bits_16(out, bl, mlen - LEN_LN[d]);
                  bl += len_eb;
                }
                d = DST_LN_RE[boff - match];
                bl = write_bits_8(out, bl, bitswap8[d] >> 3);
                bl -= 3;
                var dst_eb = d < 4 ? 0 : d - 2 >> 1;
                if (dst_eb > 0) {
                  write_bits_16(out, bl, boff - match - DST_LN[d]);
                  bl += dst_eb;
                }
                for (var q2 = 0; q2 < mlen; ++q2) {
                  addrs[hash] = boff & 32767;
                  hash = (hash << 5 ^ data[boff]) & 32767;
                  ++boff;
                }
                L -= mlen - 1;
              } else {
                if (d <= 143) d = d + 48;
                else bl = write_bits_1(out, bl, 1);
                bl = write_bits_8(out, bl, bitswap8[d]);
                addrs[hash] = boff & 32767;
                ++boff;
              }
            }
            bl = write_bits_8(out, bl, 0) - 1;
          }
          out.l = (bl + 7) / 8 | 0;
          return out.l;
        }
        return function _deflateRaw2(data, out) {
          if (data.length < 8) return write_stored(data, out);
          return write_huff_fixed(data, out);
        };
      })();
      function _deflate(data) {
        var buf = new_buf(50 + Math.floor(data.length * 1.1));
        var off = _deflateRaw(data, buf);
        return buf.slice(0, off);
      }
      var dyn_lmap = use_typed_arrays ? new Uint16Array(32768) : zero_fill_array(32768);
      var dyn_dmap = use_typed_arrays ? new Uint16Array(32768) : zero_fill_array(32768);
      var dyn_cmap = use_typed_arrays ? new Uint16Array(128) : zero_fill_array(128);
      var dyn_len_1 = 1, dyn_len_2 = 1;
      function dyn(data, boff) {
        var _HLIT = read_bits_5(data, boff) + 257;
        boff += 5;
        var _HDIST = read_bits_5(data, boff) + 1;
        boff += 5;
        var _HCLEN = read_bits_4(data, boff) + 4;
        boff += 4;
        var w = 0;
        var clens = use_typed_arrays ? new Uint8Array(19) : zero_fill_array(19);
        var ctree = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        var maxlen = 1;
        var bl_count = use_typed_arrays ? new Uint8Array(8) : zero_fill_array(8);
        var next_code = use_typed_arrays ? new Uint8Array(8) : zero_fill_array(8);
        var L = clens.length;
        for (var i2 = 0; i2 < _HCLEN; ++i2) {
          clens[CLEN_ORDER[i2]] = w = read_bits_3(data, boff);
          if (maxlen < w) maxlen = w;
          bl_count[w]++;
          boff += 3;
        }
        var ccode = 0;
        bl_count[0] = 0;
        for (i2 = 1; i2 <= maxlen; ++i2) next_code[i2] = ccode = ccode + bl_count[i2 - 1] << 1;
        for (i2 = 0; i2 < L; ++i2) if ((ccode = clens[i2]) != 0) ctree[i2] = next_code[ccode]++;
        var cleni = 0;
        for (i2 = 0; i2 < L; ++i2) {
          cleni = clens[i2];
          if (cleni != 0) {
            ccode = bitswap8[ctree[i2]] >> 8 - cleni;
            for (var j = (1 << 7 - cleni) - 1; j >= 0; --j) dyn_cmap[ccode | j << cleni] = cleni & 7 | i2 << 3;
          }
        }
        var hcodes = [];
        maxlen = 1;
        for (; hcodes.length < _HLIT + _HDIST; ) {
          ccode = dyn_cmap[read_bits_7(data, boff)];
          boff += ccode & 7;
          switch (ccode >>>= 3) {
            case 16:
              w = 3 + read_bits_2(data, boff);
              boff += 2;
              ccode = hcodes[hcodes.length - 1];
              while (w-- > 0) hcodes.push(ccode);
              break;
            case 17:
              w = 3 + read_bits_3(data, boff);
              boff += 3;
              while (w-- > 0) hcodes.push(0);
              break;
            case 18:
              w = 11 + read_bits_7(data, boff);
              boff += 7;
              while (w-- > 0) hcodes.push(0);
              break;
            default:
              hcodes.push(ccode);
              if (maxlen < ccode) maxlen = ccode;
              break;
          }
        }
        var h1 = hcodes.slice(0, _HLIT), h2 = hcodes.slice(_HLIT);
        for (i2 = _HLIT; i2 < 286; ++i2) h1[i2] = 0;
        for (i2 = _HDIST; i2 < 30; ++i2) h2[i2] = 0;
        dyn_len_1 = build_tree2(h1, dyn_lmap, 286);
        dyn_len_2 = build_tree2(h2, dyn_dmap, 30);
        return boff;
      }
      function inflate2(data, usz) {
        if (data[0] == 3 && !(data[1] & 3)) {
          return [new_raw_buf(usz), 2];
        }
        var boff = 0;
        var header = 0;
        var outbuf = new_unsafe_buf(usz ? usz : 1 << 18);
        var woff = 0;
        var OL = outbuf.length >>> 0;
        var max_len_1 = 0, max_len_2 = 0;
        while ((header & 1) == 0) {
          header = read_bits_3(data, boff);
          boff += 3;
          if (header >>> 1 == 0) {
            if (boff & 7) boff += 8 - (boff & 7);
            var sz = data[boff >>> 3] | data[(boff >>> 3) + 1] << 8;
            boff += 32;
            if (sz > 0) {
              if (!usz && OL < woff + sz) {
                outbuf = realloc(outbuf, woff + sz);
                OL = outbuf.length;
              }
              while (sz-- > 0) {
                outbuf[woff++] = data[boff >>> 3];
                boff += 8;
              }
            }
            continue;
          } else if (header >> 1 == 1) {
            max_len_1 = 9;
            max_len_2 = 5;
          } else {
            boff = dyn(data, boff);
            max_len_1 = dyn_len_1;
            max_len_2 = dyn_len_2;
          }
          for (; ; ) {
            if (!usz && OL < woff + 32767) {
              outbuf = realloc(outbuf, woff + 32767);
              OL = outbuf.length;
            }
            var bits = read_bits_n(data, boff, max_len_1);
            var code = header >>> 1 == 1 ? fix_lmap[bits] : dyn_lmap[bits];
            boff += code & 15;
            code >>>= 4;
            if ((code >>> 8 & 255) === 0) outbuf[woff++] = code;
            else if (code == 256) break;
            else {
              code -= 257;
              var len_eb = code < 8 ? 0 : code - 4 >> 2;
              if (len_eb > 5) len_eb = 0;
              var tgt = woff + LEN_LN[code];
              if (len_eb > 0) {
                tgt += read_bits_n(data, boff, len_eb);
                boff += len_eb;
              }
              bits = read_bits_n(data, boff, max_len_2);
              code = header >>> 1 == 1 ? fix_dmap[bits] : dyn_dmap[bits];
              boff += code & 15;
              code >>>= 4;
              var dst_eb = code < 4 ? 0 : code - 2 >> 1;
              var dst = DST_LN[code];
              if (dst_eb > 0) {
                dst += read_bits_n(data, boff, dst_eb);
                boff += dst_eb;
              }
              if (!usz && OL < tgt) {
                outbuf = realloc(outbuf, tgt + 100);
                OL = outbuf.length;
              }
              while (woff < tgt) {
                outbuf[woff] = outbuf[woff - dst];
                ++woff;
              }
            }
          }
        }
        if (usz) return [outbuf, boff + 7 >>> 3];
        return [outbuf.slice(0, woff), boff + 7 >>> 3];
      }
      function _inflate(payload, usz) {
        var data = payload.slice(payload.l || 0);
        var out = inflate2(data, usz);
        payload.l += out[1];
        return out[0];
      }
      function warn_or_throw(wrn, msg) {
        if (wrn) {
          if (typeof console !== "undefined") console.error(msg);
        } else throw new Error(msg);
      }
      function parse_zip(file, options) {
        var blob = file;
        prep_blob(blob, 0);
        var FileIndex = [], FullPaths = [];
        var o = {
          FileIndex,
          FullPaths
        };
        init_cfb(o, { root: options.root });
        var i2 = blob.length - 4;
        while ((blob[i2] != 80 || blob[i2 + 1] != 75 || blob[i2 + 2] != 5 || blob[i2 + 3] != 6) && i2 >= 0) --i2;
        blob.l = i2 + 4;
        blob.l += 4;
        var fcnt = blob.read_shift(2);
        blob.l += 6;
        var start_cd = blob.read_shift(4);
        blob.l = start_cd;
        for (i2 = 0; i2 < fcnt; ++i2) {
          blob.l += 20;
          var csz = blob.read_shift(4);
          var usz = blob.read_shift(4);
          var namelen = blob.read_shift(2);
          var efsz = blob.read_shift(2);
          var fcsz = blob.read_shift(2);
          blob.l += 8;
          var offset = blob.read_shift(4);
          var EF = parse_extra_field(blob.slice(blob.l + namelen, blob.l + namelen + efsz));
          blob.l += namelen + efsz + fcsz;
          var L = blob.l;
          blob.l = offset + 4;
          parse_local_file(blob, csz, usz, o, EF);
          blob.l = L;
        }
        return o;
      }
      function parse_local_file(blob, csz, usz, o, EF) {
        blob.l += 2;
        var flags = blob.read_shift(2);
        var meth = blob.read_shift(2);
        var date = parse_dos_date(blob);
        if (flags & 8257) throw new Error("Unsupported ZIP encryption");
        var crc322 = blob.read_shift(4);
        var _csz = blob.read_shift(4);
        var _usz = blob.read_shift(4);
        var namelen = blob.read_shift(2);
        var efsz = blob.read_shift(2);
        var name = "";
        for (var i2 = 0; i2 < namelen; ++i2) name += String.fromCharCode(blob[blob.l++]);
        if (efsz) {
          var ef = parse_extra_field(blob.slice(blob.l, blob.l + efsz));
          if ((ef[21589] || {}).mt) date = ef[21589].mt;
          if (((EF || {})[21589] || {}).mt) date = EF[21589].mt;
        }
        blob.l += efsz;
        var data = blob.slice(blob.l, blob.l + _csz);
        switch (meth) {
          case 8:
            data = _inflateRawSync(blob, _usz);
            break;
          case 0:
            break;
          // TODO: scan for magic number
          default:
            throw new Error("Unsupported ZIP Compression method " + meth);
        }
        var wrn = false;
        if (flags & 8) {
          crc322 = blob.read_shift(4);
          if (crc322 == 134695760) {
            crc322 = blob.read_shift(4);
            wrn = true;
          }
          _csz = blob.read_shift(4);
          _usz = blob.read_shift(4);
        }
        if (_csz != csz) warn_or_throw(wrn, "Bad compressed size: " + csz + " != " + _csz);
        if (_usz != usz) warn_or_throw(wrn, "Bad uncompressed size: " + usz + " != " + _usz);
        var _crc32 = CRC32.buf(data, 0);
        if (crc322 >> 0 != _crc32 >> 0) warn_or_throw(wrn, "Bad CRC32 checksum: " + crc322 + " != " + _crc32);
        cfb_add(o, name, data, { unsafe: true, mt: date });
      }
      function write_zip(cfb, options) {
        var _opts = options || {};
        var out = [], cdirs = [];
        var o = new_buf(1);
        var method = _opts.compression ? 8 : 0, flags = 0;
        var desc = false;
        if (desc) flags |= 8;
        var i2 = 0, j = 0;
        var start_cd = 0, fcnt = 0;
        var root = cfb.FullPaths[0], fp = root, fi = cfb.FileIndex[0];
        var crcs = [];
        var sz_cd = 0;
        for (i2 = 1; i2 < cfb.FullPaths.length; ++i2) {
          fp = cfb.FullPaths[i2].slice(root.length);
          fi = cfb.FileIndex[i2];
          if (!fi.size || !fi.content || fp == "Sh33tJ5") continue;
          var start = start_cd;
          var namebuf = new_buf(fp.length);
          for (j = 0; j < fp.length; ++j) namebuf.write_shift(1, fp.charCodeAt(j) & 127);
          namebuf = namebuf.slice(0, namebuf.l);
          crcs[fcnt] = CRC32.buf(fi.content, 0);
          var outbuf = fi.content;
          if (method == 8) outbuf = _deflateRawSync(outbuf);
          o = new_buf(30);
          o.write_shift(4, 67324752);
          o.write_shift(2, 20);
          o.write_shift(2, flags);
          o.write_shift(2, method);
          if (fi.mt) write_dos_date(o, fi.mt);
          else o.write_shift(4, 0);
          o.write_shift(-4, flags & 8 ? 0 : crcs[fcnt]);
          o.write_shift(4, flags & 8 ? 0 : outbuf.length);
          o.write_shift(4, flags & 8 ? 0 : fi.content.length);
          o.write_shift(2, namebuf.length);
          o.write_shift(2, 0);
          start_cd += o.length;
          out.push(o);
          start_cd += namebuf.length;
          out.push(namebuf);
          start_cd += outbuf.length;
          out.push(outbuf);
          if (flags & 8) {
            o = new_buf(12);
            o.write_shift(-4, crcs[fcnt]);
            o.write_shift(4, outbuf.length);
            o.write_shift(4, fi.content.length);
            start_cd += o.l;
            out.push(o);
          }
          o = new_buf(46);
          o.write_shift(4, 33639248);
          o.write_shift(2, 0);
          o.write_shift(2, 20);
          o.write_shift(2, flags);
          o.write_shift(2, method);
          o.write_shift(4, 0);
          o.write_shift(-4, crcs[fcnt]);
          o.write_shift(4, outbuf.length);
          o.write_shift(4, fi.content.length);
          o.write_shift(2, namebuf.length);
          o.write_shift(2, 0);
          o.write_shift(2, 0);
          o.write_shift(2, 0);
          o.write_shift(2, 0);
          o.write_shift(4, 0);
          o.write_shift(4, start);
          sz_cd += o.l;
          cdirs.push(o);
          sz_cd += namebuf.length;
          cdirs.push(namebuf);
          ++fcnt;
        }
        o = new_buf(22);
        o.write_shift(4, 101010256);
        o.write_shift(2, 0);
        o.write_shift(2, 0);
        o.write_shift(2, fcnt);
        o.write_shift(2, fcnt);
        o.write_shift(4, sz_cd);
        o.write_shift(4, start_cd);
        o.write_shift(2, 0);
        return bconcat([bconcat(out), bconcat(cdirs), o]);
      }
      var ContentTypeMap = {
        "htm": "text/html",
        "xml": "text/xml",
        "gif": "image/gif",
        "jpg": "image/jpeg",
        "png": "image/png",
        "mso": "application/x-mso",
        "thmx": "application/vnd.ms-officetheme",
        "sh33tj5": "application/octet-stream"
      };
      function get_content_type(fi, fp) {
        if (fi.ctype) return fi.ctype;
        var ext = fi.name || "", m = ext.match(/\.([^\.]+)$/);
        if (m && ContentTypeMap[m[1]]) return ContentTypeMap[m[1]];
        if (fp) {
          m = (ext = fp).match(/[\.\\]([^\.\\])+$/);
          if (m && ContentTypeMap[m[1]]) return ContentTypeMap[m[1]];
        }
        return "application/octet-stream";
      }
      function write_base64_76(bstr) {
        var data = Base64_encode(bstr);
        var o = [];
        for (var i2 = 0; i2 < data.length; i2 += 76) o.push(data.slice(i2, i2 + 76));
        return o.join("\r\n") + "\r\n";
      }
      function write_quoted_printable(text) {
        var encoded = text.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7E-\xFF=]/g, function(c) {
          var w = c.charCodeAt(0).toString(16).toUpperCase();
          return "=" + (w.length == 1 ? "0" + w : w);
        });
        encoded = encoded.replace(/ $/mg, "=20").replace(/\t$/mg, "=09");
        if (encoded.charAt(0) == "\n") encoded = "=0D" + encoded.slice(1);
        encoded = encoded.replace(/\r(?!\n)/mg, "=0D").replace(/\n\n/mg, "\n=0A").replace(/([^\r\n])\n/mg, "$1=0A");
        var o = [], split = encoded.split("\r\n");
        for (var si = 0; si < split.length; ++si) {
          var str = split[si];
          if (str.length == 0) {
            o.push("");
            continue;
          }
          for (var i2 = 0; i2 < str.length; ) {
            var end = 76;
            var tmp = str.slice(i2, i2 + end);
            if (tmp.charAt(end - 1) == "=") end--;
            else if (tmp.charAt(end - 2) == "=") end -= 2;
            else if (tmp.charAt(end - 3) == "=") end -= 3;
            tmp = str.slice(i2, i2 + end);
            i2 += end;
            if (i2 < str.length) tmp += "=";
            o.push(tmp);
          }
        }
        return o.join("\r\n");
      }
      function parse_quoted_printable(data) {
        var o = [];
        for (var di = 0; di < data.length; ++di) {
          var line = data[di];
          while (di <= data.length && line.charAt(line.length - 1) == "=") line = line.slice(0, line.length - 1) + data[++di];
          o.push(line);
        }
        for (var oi = 0; oi < o.length; ++oi) o[oi] = o[oi].replace(/[=][0-9A-Fa-f]{2}/g, function($$) {
          return String.fromCharCode(parseInt($$.slice(1), 16));
        });
        return s2a(o.join("\r\n"));
      }
      function parse_mime(cfb, data, root) {
        var fname = "", cte = "", ctype = "", fdata;
        var di = 0;
        for (; di < 10; ++di) {
          var line = data[di];
          if (!line || line.match(/^\s*$/)) break;
          var m = line.match(/^(.*?):\s*([^\s].*)$/);
          if (m) switch (m[1].toLowerCase()) {
            case "content-location":
              fname = m[2].trim();
              break;
            case "content-type":
              ctype = m[2].trim();
              break;
            case "content-transfer-encoding":
              cte = m[2].trim();
              break;
          }
        }
        ++di;
        switch (cte.toLowerCase()) {
          case "base64":
            fdata = s2a(Base64_decode(data.slice(di).join("")));
            break;
          case "quoted-printable":
            fdata = parse_quoted_printable(data.slice(di));
            break;
          default:
            throw new Error("Unsupported Content-Transfer-Encoding " + cte);
        }
        var file = cfb_add(cfb, fname.slice(root.length), fdata, { unsafe: true });
        if (ctype) file.ctype = ctype;
      }
      function parse_mad(file, options) {
        if (a2s(file.slice(0, 13)).toLowerCase() != "mime-version:") throw new Error("Unsupported MAD header");
        var root = options && options.root || "";
        var data = (has_buf && Buffer.isBuffer(file) ? file.toString("binary") : a2s(file)).split("\r\n");
        var di = 0, row = "";
        for (di = 0; di < data.length; ++di) {
          row = data[di];
          if (!/^Content-Location:/i.test(row)) continue;
          row = row.slice(row.indexOf("file"));
          if (!root) root = row.slice(0, row.lastIndexOf("/") + 1);
          if (row.slice(0, root.length) == root) continue;
          while (root.length > 0) {
            root = root.slice(0, root.length - 1);
            root = root.slice(0, root.lastIndexOf("/") + 1);
            if (row.slice(0, root.length) == root) break;
          }
        }
        var mboundary = (data[1] || "").match(/boundary="(.*?)"/);
        if (!mboundary) throw new Error("MAD cannot find boundary");
        var boundary = "--" + (mboundary[1] || "");
        var FileIndex = [], FullPaths = [];
        var o = {
          FileIndex,
          FullPaths
        };
        init_cfb(o);
        var start_di, fcnt = 0;
        for (di = 0; di < data.length; ++di) {
          var line = data[di];
          if (line !== boundary && line !== boundary + "--") continue;
          if (fcnt++) parse_mime(o, data.slice(start_di, di), root);
          start_di = di;
        }
        return o;
      }
      function write_mad(cfb, options) {
        var opts = options || {};
        var boundary = opts.boundary || "SheetJS";
        boundary = "------=" + boundary;
        var out = [
          "MIME-Version: 1.0",
          'Content-Type: multipart/related; boundary="' + boundary.slice(2) + '"',
          "",
          "",
          ""
        ];
        var root = cfb.FullPaths[0], fp = root, fi = cfb.FileIndex[0];
        for (var i2 = 1; i2 < cfb.FullPaths.length; ++i2) {
          fp = cfb.FullPaths[i2].slice(root.length);
          fi = cfb.FileIndex[i2];
          if (!fi.size || !fi.content || fp == "Sh33tJ5") continue;
          fp = fp.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7E-\xFF]/g, function(c) {
            return "_x" + c.charCodeAt(0).toString(16) + "_";
          }).replace(/[\u0080-\uFFFF]/g, function(u) {
            return "_u" + u.charCodeAt(0).toString(16) + "_";
          });
          var ca = fi.content;
          var cstr = has_buf && Buffer.isBuffer(ca) ? ca.toString("binary") : a2s(ca);
          var dispcnt = 0, L = Math.min(1024, cstr.length), cc = 0;
          for (var csl = 0; csl <= L; ++csl) if ((cc = cstr.charCodeAt(csl)) >= 32 && cc < 128) ++dispcnt;
          var qp = dispcnt >= L * 4 / 5;
          out.push(boundary);
          out.push("Content-Location: " + (opts.root || "file:///C:/SheetJS/") + fp);
          out.push("Content-Transfer-Encoding: " + (qp ? "quoted-printable" : "base64"));
          out.push("Content-Type: " + get_content_type(fi, fp));
          out.push("");
          out.push(qp ? write_quoted_printable(cstr) : write_base64_76(cstr));
        }
        out.push(boundary + "--\r\n");
        return out.join("\r\n");
      }
      function cfb_new(opts) {
        var o = {};
        init_cfb(o, opts);
        return o;
      }
      function cfb_add(cfb, name, content, opts) {
        var unsafe = opts && opts.unsafe;
        if (!unsafe) init_cfb(cfb);
        var file = !unsafe && CFB2.find(cfb, name);
        if (!file) {
          var fpath = cfb.FullPaths[0];
          if (name.slice(0, fpath.length) == fpath) fpath = name;
          else {
            if (fpath.slice(-1) != "/") fpath += "/";
            fpath = (fpath + name).replace("//", "/");
          }
          file = { name: filename(name), type: 2 };
          cfb.FileIndex.push(file);
          cfb.FullPaths.push(fpath);
          if (!unsafe) CFB2.utils.cfb_gc(cfb);
        }
        file.content = content;
        file.size = content ? content.length : 0;
        if (opts) {
          if (opts.CLSID) file.clsid = opts.CLSID;
          if (opts.mt) file.mt = opts.mt;
          if (opts.ct) file.ct = opts.ct;
        }
        return file;
      }
      function cfb_del(cfb, name) {
        init_cfb(cfb);
        var file = CFB2.find(cfb, name);
        if (file) {
          for (var j = 0; j < cfb.FileIndex.length; ++j) if (cfb.FileIndex[j] == file) {
            cfb.FileIndex.splice(j, 1);
            cfb.FullPaths.splice(j, 1);
            return true;
          }
        }
        return false;
      }
      function cfb_mov(cfb, old_name, new_name) {
        init_cfb(cfb);
        var file = CFB2.find(cfb, old_name);
        if (file) {
          for (var j = 0; j < cfb.FileIndex.length; ++j) if (cfb.FileIndex[j] == file) {
            cfb.FileIndex[j].name = filename(new_name);
            cfb.FullPaths[j] = new_name;
            return true;
          }
        }
        return false;
      }
      function cfb_gc(cfb) {
        rebuild_cfb(cfb, true);
      }
      exports3.find = find2;
      exports3.read = read2;
      exports3.parse = parse;
      exports3.write = write;
      exports3.writeFile = write_file;
      exports3.utils = {
        cfb_new,
        cfb_add,
        cfb_del,
        cfb_mov,
        cfb_gc,
        ReadShift,
        CheckField,
        prep_blob,
        bconcat,
        use_zlib,
        _deflateRaw: _deflate,
        _inflateRaw: _inflate,
        consts
      };
      return exports3;
    })();
    if (typeof require !== "undefined" && typeof module2 !== "undefined" && typeof DO_NOT_EXPORT_CFB === "undefined") {
      module2.exports = CFB2;
    }
  }
});

// src/HwpxDocument.ts
var HwpxDocument_exports = {};
__export(HwpxDocument_exports, {
  HwpxDocument: () => HwpxDocument
});
module.exports = __toCommonJS(HwpxDocument_exports);
var import_jszip = __toESM(require_lib3());

// src/HwpxParser.ts
function generateId() {
  return Math.random().toString(36).substring(2, 11);
}
var HwpxParser = class {
  static {
    this.styles = {
      charShapes: /* @__PURE__ */ new Map(),
      paraShapes: /* @__PURE__ */ new Map(),
      fonts: /* @__PURE__ */ new Map(),
      fontsByLang: /* @__PURE__ */ new Map(),
      borderFills: /* @__PURE__ */ new Map(),
      tabDefs: /* @__PURE__ */ new Map(),
      numberings: /* @__PURE__ */ new Map(),
      bullets: /* @__PURE__ */ new Map(),
      styles: /* @__PURE__ */ new Map(),
      memoShapes: /* @__PURE__ */ new Map()
    };
  }
  static async parse(zip) {
    const content = {
      metadata: {},
      sections: [],
      images: /* @__PURE__ */ new Map(),
      binItems: /* @__PURE__ */ new Map(),
      binData: /* @__PURE__ */ new Map(),
      footnotes: [],
      endnotes: []
    };
    this.styles = {
      charShapes: /* @__PURE__ */ new Map(),
      paraShapes: /* @__PURE__ */ new Map(),
      fonts: /* @__PURE__ */ new Map(),
      fontsByLang: /* @__PURE__ */ new Map(),
      borderFills: /* @__PURE__ */ new Map(),
      tabDefs: /* @__PURE__ */ new Map(),
      numberings: /* @__PURE__ */ new Map(),
      bullets: /* @__PURE__ */ new Map(),
      styles: /* @__PURE__ */ new Map(),
      memoShapes: /* @__PURE__ */ new Map()
    };
    const headerXml = await this.readXmlFile(zip, "Contents/header.xml");
    if (headerXml) {
      content.metadata = this.parseMetadata(headerXml);
      content.docSetting = this.parseDocSetting(headerXml);
      this.parseStyles(headerXml);
      this.parseMemoShapes(headerXml);
      content.compatibleDocument = this.parseCompatibleDocument(headerXml);
      content.styles = this.styles;
    }
    await this.parseImages(zip, content);
    await this.parseBinDataStorage(zip, content);
    let sectionIndex = 0;
    while (true) {
      const sectionPath = `Contents/section${sectionIndex}.xml`;
      const sectionXml = await this.readXmlFile(zip, sectionPath);
      if (!sectionXml) break;
      const section = this.parseSection(sectionXml, content);
      content.sections.push(section);
      sectionIndex++;
    }
    const scriptCode = await this.parseScriptCode(zip);
    if (scriptCode) {
      content.scriptCode = scriptCode;
    }
    const xmlTemplate = await this.parseXmlTemplate(zip);
    if (xmlTemplate) {
      content.xmlTemplate = xmlTemplate;
    }
    return content;
  }
  static async parseScriptCode(zip) {
    const scriptsFolder = zip.folder("Scripts");
    if (!scriptsFolder) return void 0;
    const scriptCode = {};
    const defaultJScript = await this.readXmlFile(zip, "Scripts/DefaultJScript");
    if (defaultJScript) {
      scriptCode.source = defaultJScript;
      scriptCode.type = "JScript";
    }
    const versionFile = await this.readXmlFile(zip, "Scripts/JScriptVersion");
    if (versionFile) {
      scriptCode.version = versionFile.trim();
    }
    const headerScript = await this.readXmlFile(zip, "Scripts/Header");
    if (headerScript) {
      scriptCode.header = headerScript;
    }
    const preScriptNames = Object.keys(zip.files).filter((f) => f.startsWith("Scripts/PreScript"));
    if (preScriptNames.length > 0) {
      scriptCode.preScript = [];
      for (const name of preScriptNames) {
        const code = await this.readXmlFile(zip, name);
        if (code) {
          scriptCode.preScript.push({ name: name.replace("Scripts/", ""), code });
        }
      }
    }
    const postScriptNames = Object.keys(zip.files).filter((f) => f.startsWith("Scripts/PostScript"));
    if (postScriptNames.length > 0) {
      scriptCode.postScript = [];
      for (const name of postScriptNames) {
        const code = await this.readXmlFile(zip, name);
        if (code) {
          scriptCode.postScript.push({ name: name.replace("Scripts/", ""), code });
        }
      }
    }
    return Object.keys(scriptCode).length > 0 ? scriptCode : void 0;
  }
  static async parseXmlTemplate(zip) {
    const xmlTemplate = {};
    const schema = await this.readXmlFile(zip, "XMLTemplate/Schema");
    if (schema) {
      xmlTemplate.schema = schema;
    }
    const instance = await this.readXmlFile(zip, "XMLTemplate/Instance");
    if (instance) {
      xmlTemplate.instance = instance;
    }
    return xmlTemplate.schema || xmlTemplate.instance ? xmlTemplate : void 0;
  }
  static async readXmlFile(zip, path) {
    const file = zip.file(path);
    if (!file) return null;
    return await file.async("string");
  }
  static parseMetadata(xml) {
    const metadata = {};
    const extract = (tag) => {
      const regex = new RegExp(`<(?:hh:)?${tag}[^>]*>([^<]*)</(?:hh:)?${tag}>`);
      const match = xml.match(regex);
      return match?.[1];
    };
    metadata.title = extract("title");
    metadata.creator = extract("creator");
    metadata.createdDate = extract("createdDate");
    metadata.modifiedDate = extract("modifiedDate");
    metadata.description = extract("description");
    metadata.subject = extract("subject");
    const keywordsMatch = xml.match(/<(?:hh:)?keywords[^>]*>([^<]*)<\/(?:hh:)?keywords>/i);
    if (keywordsMatch) {
      metadata.keywords = keywordsMatch[1].split(",").map((k) => k.trim()).filter((k) => k);
    }
    const commentsMatch = xml.match(/<(?:hh:)?comments[^>]*>([^<]*)<\/(?:hh:)?comments>/i);
    if (commentsMatch) {
      metadata.comments = commentsMatch[1];
    }
    const forbiddenRegex = /<(?:hh:)?forbidden[^>]*>([^<]*)<\/(?:hh:)?forbidden>/gi;
    const forbiddenStrings = [];
    let forbiddenMatch;
    while ((forbiddenMatch = forbiddenRegex.exec(xml)) !== null) {
      forbiddenStrings.push(forbiddenMatch[1]);
    }
    if (forbiddenStrings.length > 0) {
      metadata.forbiddenStrings = forbiddenStrings;
    }
    return metadata;
  }
  static parseDocSetting(xml) {
    const docSetting = {};
    const beginNumMatch = xml.match(/<(?:hh:)?beginNum[^>]*>([\s\S]*?)<\/(?:hh:)?beginNum>|<(?:hh:)?beginNum([^>]*)\/>/i);
    if (beginNumMatch) {
      const content = beginNumMatch[1] || beginNumMatch[2] || "";
      docSetting.beginNumber = {};
      const pageMatch = content.match(/page="(\d+)"/);
      if (pageMatch) docSetting.beginNumber.page = parseInt(pageMatch[1]);
      const footnoteMatch = content.match(/footnote="(\d+)"/);
      if (footnoteMatch) docSetting.beginNumber.footnote = parseInt(footnoteMatch[1]);
      const endnoteMatch = content.match(/endnote="(\d+)"/);
      if (endnoteMatch) docSetting.beginNumber.endnote = parseInt(endnoteMatch[1]);
      const pictureMatch = content.match(/(?:picture|pic)="(\d+)"/);
      if (pictureMatch) docSetting.beginNumber.picture = parseInt(pictureMatch[1]);
      const tableMatch = content.match(/(?:table|tbl)="(\d+)"/);
      if (tableMatch) docSetting.beginNumber.table = parseInt(tableMatch[1]);
      const equationMatch = content.match(/equation="(\d+)"/);
      if (equationMatch) docSetting.beginNumber.equation = parseInt(equationMatch[1]);
      const totalPageMatch = content.match(/totalPage="(\d+)"/);
      if (totalPageMatch) docSetting.beginNumber.totalPage = parseInt(totalPageMatch[1]);
    }
    const caretPosMatch = xml.match(/<(?:hh:)?caretPos[^>]*>([\s\S]*?)<\/(?:hh:)?caretPos>|<(?:hh:)?caretPos([^>]*)\/>/i);
    if (caretPosMatch) {
      const content = caretPosMatch[1] || caretPosMatch[2] || "";
      docSetting.caretPos = {};
      const listMatch = content.match(/list="([^"]*)"/);
      if (listMatch) docSetting.caretPos.list = listMatch[1];
      const paraMatch = content.match(/para="([^"]*)"/);
      if (paraMatch) docSetting.caretPos.para = paraMatch[1];
      const posMatch = content.match(/pos="([^"]*)"/);
      if (posMatch) docSetting.caretPos.pos = posMatch[1];
    }
    return Object.keys(docSetting).length > 0 ? docSetting : void 0;
  }
  static parseMemoShapes(xml) {
    const memoShapeRegex = /<(?:hh:)?memoShape[^>]*>([\s\S]*?)<\/(?:hh:)?memoShape>|<(?:hh:)?memoShape([^>]*)\/>/gi;
    let match;
    while ((match = memoShapeRegex.exec(xml)) !== null) {
      const content = match[1] || match[2] || "";
      const idMatch = content.match(/id="(\d+)"/);
      const id = idMatch ? parseInt(idMatch[1]) : this.styles.memoShapes.size;
      const memoShape = { id };
      const widthMatch = content.match(/width="(\d+)"/);
      if (widthMatch) memoShape.width = parseInt(widthMatch[1]);
      const lineTypeMatch = content.match(/lineType="([^"]*)"/);
      if (lineTypeMatch) memoShape.lineType = lineTypeMatch[1];
      const lineColorMatch = content.match(/lineColor="([^"]*)"/);
      if (lineColorMatch) memoShape.lineColor = lineColorMatch[1];
      const fillColorMatch = content.match(/fillColor="([^"]*)"/);
      if (fillColorMatch) memoShape.fillColor = fillColorMatch[1];
      const activeColorMatch = content.match(/activeColor="([^"]*)"/);
      if (activeColorMatch) memoShape.activeColor = activeColorMatch[1];
      const memoTypeMatch = content.match(/memoType="([^"]*)"/);
      if (memoTypeMatch) memoShape.memoType = memoTypeMatch[1];
      this.styles.memoShapes.set(id, memoShape);
    }
  }
  static parseStyles(xml) {
    this.parseFonts(xml);
    this.parseCharShapes(xml);
    this.parseParaShapes(xml);
    this.parseBorderFills(xml);
    this.parseTabDefs(xml);
    this.parseNumberings(xml);
    this.parseBullets(xml);
    this.parseStyleDefs(xml);
  }
  static parseFonts(xml) {
    const languages = ["HANGUL", "LATIN", "HANJA", "JAPANESE", "OTHER", "SYMBOL", "USER"];
    for (const lang of languages) {
      const fontFaceRegex = new RegExp(`<hh:fontface[^>]*lang="${lang}"[^>]*>([\\s\\S]*?)<\\/hh:fontface>`, "i");
      const fontFaceMatch = xml.match(fontFaceRegex);
      if (fontFaceMatch) {
        const fontRegex = /<hh:font[^>]*id="(\d+)"[^>]*face="([^"]*)"/gi;
        let match;
        while ((match = fontRegex.exec(fontFaceMatch[1])) !== null) {
          const fontId = parseInt(match[1]);
          const fontName = match[2];
          const key = `${lang.toLowerCase()}_${fontId}`;
          this.styles.fontsByLang.set(key, fontName);
          if (lang === "HANGUL" || !this.styles.fonts.has(fontId)) {
            this.styles.fonts.set(fontId, fontName);
          }
        }
      }
    }
    if (this.styles.fonts.size === 0) {
      const fontRegex = /<(?:hh:)?font[^>]*face="([^"]*)"[^>]*>/gi;
      let match;
      let fontId = 0;
      while ((match = fontRegex.exec(xml)) !== null) {
        this.styles.fonts.set(fontId, match[1]);
        fontId++;
      }
    }
  }
  static parseCharShapes(xml) {
    const charShapeRegex = /<(?:hh:)?(?:charShape|charPr)[^>]*>([\s\S]*?)<\/(?:hh:)?(?:charShape|charPr)>/gi;
    const charShapeRegexSelfClosing = /<(?:hh:)?(?:charShape|charPr)[^/>]*\/>/gi;
    let match;
    let shapeId = 0;
    const parseCharShape = (shapeContent) => {
      const charShape = { id: shapeId };
      const idMatch = shapeContent.match(/\bid="(\d+)"/);
      if (idMatch) {
        shapeId = parseInt(idMatch[1]);
        charShape.id = shapeId;
      }
      const heightMatch = shapeContent.match(/height="(\d+)"/);
      if (heightMatch) {
        charShape.fontSize = parseInt(heightMatch[1]) / 100;
      }
      const boldTagMatch = shapeContent.match(/<(?:hh:)?bold\s*\/>/i);
      const boldAttrMatch = shapeContent.match(/bold="([^"]*)"/);
      charShape.bold = !!boldTagMatch || boldAttrMatch?.[1] === "1" || boldAttrMatch?.[1] === "true";
      const italicTagMatch = shapeContent.match(/<(?:hh:)?italic\s*\/>/i);
      const italicAttrMatch = shapeContent.match(/italic="([^"]*)"/);
      charShape.italic = !!italicTagMatch || italicAttrMatch?.[1] === "1" || italicAttrMatch?.[1] === "true";
      const underlineMatch = shapeContent.match(/<(?:hh:)?underline[^>]*type="([^"]*)"[^>]*(?:shape="([^"]*)")?[^>]*(?:color="([^"]*)")?/i);
      if (underlineMatch && underlineMatch[1] !== "NONE") {
        const underlineTypeMap = {
          "BOTTOM": "Bottom",
          "CENTER": "Center",
          "TOP": "Top",
          "NONE": "None"
        };
        const shapeMap = {
          "SOLID": "Solid",
          "DASH": "Dash",
          "DOT": "Dot",
          "DASH_DOT": "DashDot",
          "DASH_DOT_DOT": "DashDotDot",
          "LONG_DASH": "LongDash",
          "CIRCLE_DOT": "CircleDot",
          "DOUBLE_SLIM": "DoubleSlim",
          "SLIM_THICK": "SlimThick",
          "THICK_SLIM": "ThickSlim",
          "SLIM_THICK_SLIM": "SlimThickSlim",
          "NONE": "None"
        };
        charShape.underline = {
          type: underlineTypeMap[underlineMatch[1]?.toUpperCase()] || "Bottom",
          shape: shapeMap[underlineMatch[2]?.toUpperCase()] || "Solid",
          color: underlineMatch[3] || "#000000"
        };
      }
      const strikeMatch = shapeContent.match(/<(?:hh:)?strikeout[^>]*type="([^"]*)"[^>]*(?:shape="([^"]*)")?[^>]*(?:color="([^"]*)")?/i);
      if (strikeMatch && strikeMatch[1] !== "NONE") {
        const strikeTypeMap = {
          "NONE": "None",
          "CONTINUOUS": "Continuous"
        };
        const shapeMap = {
          "SOLID": "Solid",
          "DASH": "Dash",
          "DOT": "Dot",
          "DASH_DOT": "DashDot",
          "DASH_DOT_DOT": "DashDotDot",
          "LONG_DASH": "LongDash",
          "NONE": "None"
        };
        charShape.strikeout = {
          type: strikeTypeMap[strikeMatch[1]?.toUpperCase()] || "Continuous",
          shape: shapeMap[strikeMatch[2]?.toUpperCase()] || "Solid",
          color: strikeMatch[3] || "#000000"
        };
      }
      const colorMatch = shapeContent.match(/textColor="([^"]*)"/);
      if (colorMatch && colorMatch[1] !== "#000000") {
        charShape.color = colorMatch[1];
      }
      const bgColorMatch = shapeContent.match(/shadeColor="([^"]*)"/);
      if (bgColorMatch && bgColorMatch[1] !== "none") {
        charShape.backgroundColor = bgColorMatch[1];
      }
      const fontRefMatch = shapeContent.match(/<(?:hh:)?fontRef[^>]*/i);
      if (fontRefMatch) {
        const fontRefContent = fontRefMatch[0];
        charShape.fontRefs = {};
        charShape.fontNames = {};
        const hangulMatch = fontRefContent.match(/hangul="(\d+)"/);
        if (hangulMatch) {
          charShape.fontRefs.hangul = parseInt(hangulMatch[1]);
          charShape.fontNames.hangul = this.styles.fontsByLang.get(`hangul_${hangulMatch[1]}`) || this.styles.fonts.get(parseInt(hangulMatch[1]));
          charShape.fontName = charShape.fontNames.hangul;
        }
        const latinMatch = fontRefContent.match(/latin="(\d+)"/);
        if (latinMatch) {
          charShape.fontRefs.latin = parseInt(latinMatch[1]);
          charShape.fontNames.latin = this.styles.fontsByLang.get(`latin_${latinMatch[1]}`) || this.styles.fonts.get(parseInt(latinMatch[1]));
        }
        const hanjaMatch = fontRefContent.match(/hanja="(\d+)"/);
        if (hanjaMatch) {
          charShape.fontRefs.hanja = parseInt(hanjaMatch[1]);
          charShape.fontNames.hanja = this.styles.fontsByLang.get(`hanja_${hanjaMatch[1]}`) || this.styles.fonts.get(parseInt(hanjaMatch[1]));
        }
        const japaneseMatch = fontRefContent.match(/japanese="(\d+)"/);
        if (japaneseMatch) {
          charShape.fontRefs.japanese = parseInt(japaneseMatch[1]);
          charShape.fontNames.japanese = this.styles.fontsByLang.get(`japanese_${japaneseMatch[1]}`) || this.styles.fonts.get(parseInt(japaneseMatch[1]));
        }
        const otherMatch = fontRefContent.match(/other="(\d+)"/);
        if (otherMatch) {
          charShape.fontRefs.other = parseInt(otherMatch[1]);
          charShape.fontNames.other = this.styles.fontsByLang.get(`other_${otherMatch[1]}`) || this.styles.fonts.get(parseInt(otherMatch[1]));
        }
        const symbolMatch = fontRefContent.match(/symbol="(\d+)"/);
        if (symbolMatch) {
          charShape.fontRefs.symbol = parseInt(symbolMatch[1]);
          charShape.fontNames.symbol = this.styles.fontsByLang.get(`symbol_${symbolMatch[1]}`) || this.styles.fonts.get(parseInt(symbolMatch[1]));
        }
        const userMatch = fontRefContent.match(/user="(\d+)"/);
        if (userMatch) {
          charShape.fontRefs.user = parseInt(userMatch[1]);
          charShape.fontNames.user = this.styles.fontsByLang.get(`user_${userMatch[1]}`) || this.styles.fonts.get(parseInt(userMatch[1]));
        }
      }
      const charSpacingAttrMatch = shapeContent.match(/spacing="(-?\d+)"/);
      const charSpacingElemMatch = shapeContent.match(/<(?:hh:)?spacing[^>]*hangul="(-?\d+)"[^>]*latin="(-?\d+)"[^>]*hanja="(-?\d+)"[^>]*japanese="(-?\d+)"[^>]*other="(-?\d+)"[^>]*symbol="(-?\d+)"[^>]*user="(-?\d+)"/i);
      if (charSpacingElemMatch) {
        charShape.charSpacing = {
          hangul: parseInt(charSpacingElemMatch[1]),
          latin: parseInt(charSpacingElemMatch[2]),
          hanja: parseInt(charSpacingElemMatch[3]),
          japanese: parseInt(charSpacingElemMatch[4]),
          other: parseInt(charSpacingElemMatch[5]),
          symbol: parseInt(charSpacingElemMatch[6]),
          user: parseInt(charSpacingElemMatch[7])
        };
      } else if (charSpacingAttrMatch) {
        const spacingValue = parseInt(charSpacingAttrMatch[1]);
        charShape.charSpacing = {
          hangul: spacingValue,
          latin: spacingValue,
          hanja: spacingValue,
          japanese: spacingValue,
          other: spacingValue,
          symbol: spacingValue,
          user: spacingValue
        };
      }
      const relSzAttrMatch = shapeContent.match(/relSz="(\d+)"/);
      const relSzElemMatch = shapeContent.match(/<(?:hh:)?relSz[^>]*hangul="(\d+)"[^>]*latin="(\d+)"[^>]*hanja="(\d+)"[^>]*japanese="(\d+)"[^>]*other="(\d+)"[^>]*symbol="(\d+)"[^>]*user="(\d+)"/i);
      if (relSzElemMatch) {
        charShape.relSize = {
          hangul: parseInt(relSzElemMatch[1]),
          latin: parseInt(relSzElemMatch[2]),
          hanja: parseInt(relSzElemMatch[3]),
          japanese: parseInt(relSzElemMatch[4]),
          other: parseInt(relSzElemMatch[5]),
          symbol: parseInt(relSzElemMatch[6]),
          user: parseInt(relSzElemMatch[7])
        };
      } else if (relSzAttrMatch) {
        const relSzValue = parseInt(relSzAttrMatch[1]);
        charShape.relSize = {
          hangul: relSzValue,
          latin: relSzValue,
          hanja: relSzValue,
          japanese: relSzValue,
          other: relSzValue,
          symbol: relSzValue,
          user: relSzValue
        };
      }
      const charOffsetAttrMatch = shapeContent.match(/offset="(-?\d+)"/);
      const charOffsetElemMatch = shapeContent.match(/<(?:hh:)?offset[^>]*hangul="(-?\d+)"[^>]*latin="(-?\d+)"[^>]*hanja="(-?\d+)"[^>]*japanese="(-?\d+)"[^>]*other="(-?\d+)"[^>]*symbol="(-?\d+)"[^>]*user="(-?\d+)"/i);
      if (charOffsetElemMatch) {
        charShape.charOffset = {
          hangul: parseInt(charOffsetElemMatch[1]),
          latin: parseInt(charOffsetElemMatch[2]),
          hanja: parseInt(charOffsetElemMatch[3]),
          japanese: parseInt(charOffsetElemMatch[4]),
          other: parseInt(charOffsetElemMatch[5]),
          symbol: parseInt(charOffsetElemMatch[6]),
          user: parseInt(charOffsetElemMatch[7])
        };
      } else if (charOffsetAttrMatch) {
        const offsetValue = parseInt(charOffsetAttrMatch[1]);
        charShape.charOffset = {
          hangul: offsetValue,
          latin: offsetValue,
          hanja: offsetValue,
          japanese: offsetValue,
          other: offsetValue,
          symbol: offsetValue,
          user: offsetValue
        };
      }
      const ratioElemMatch = shapeContent.match(/<(?:hh:)?ratio[^>]*hangul="(\d+)"[^>]*latin="(\d+)"[^>]*hanja="(\d+)"[^>]*japanese="(\d+)"[^>]*other="(\d+)"[^>]*symbol="(\d+)"[^>]*user="(\d+)"/i);
      if (ratioElemMatch) {
        charShape.ratio = {
          hangul: parseInt(ratioElemMatch[1]),
          latin: parseInt(ratioElemMatch[2]),
          hanja: parseInt(ratioElemMatch[3]),
          japanese: parseInt(ratioElemMatch[4]),
          other: parseInt(ratioElemMatch[5]),
          symbol: parseInt(ratioElemMatch[6]),
          user: parseInt(ratioElemMatch[7])
        };
      }
      const symMarkMatch = shapeContent.match(/<(?:hh:)?symMark[^>]*symMarkType="([^"]*)"/i);
      if (symMarkMatch && symMarkMatch[1] !== "NONE") {
        const symMarkMap = {
          "DOT": "Dot",
          "CIRCLE": "Circle",
          "RING": "Ring",
          "CARON": "Caron",
          "UNDER_DOT": "UnderDot",
          "UNDER_LINE": "UnderLine",
          "TRIANGLE": "Triangle",
          "NONE": "None"
        };
        charShape.symMark = symMarkMap[symMarkMatch[1].toUpperCase()] || "None";
      }
      const useFontSpaceMatch = shapeContent.match(/useFontSpace="([^"]*)"/);
      if (useFontSpaceMatch) {
        charShape.useFontSpace = useFontSpaceMatch[1] === "1" || useFontSpaceMatch[1] === "true";
      }
      const useKerningMatch = shapeContent.match(/useKerning="([^"]*)"/);
      if (useKerningMatch) {
        charShape.useKerning = useKerningMatch[1] === "1" || useKerningMatch[1] === "true";
      }
      const outlineMatch = shapeContent.match(/<(?:hh:)?outline[^>]*type="([^"]*)"/i);
      if (outlineMatch && outlineMatch[1] !== "NONE") {
        const outlineMap = {
          "SOLID": "Solid",
          "DOT": "Dot",
          "DASH": "Dash",
          "DASH_DOT": "DashDot",
          "DASH_DOT_DOT": "DashDotDot",
          "THICK": "Thick"
        };
        charShape.outline = {
          type: outlineMap[outlineMatch[1].toUpperCase()] || "Solid"
        };
      }
      const shadowMatch = shapeContent.match(/<(?:hh:)?shadow[^>]*type="([^"]*)"[^>]*(?:offsetX="(-?\d+)")?[^>]*(?:offsetY="(-?\d+)")?[^>]*(?:color="([^"]*)")?/i);
      if (shadowMatch && shadowMatch[1] !== "NONE") {
        const shadowMap = {
          "DROP": "Drop",
          "CONTINUOUS": "Cont",
          "NONE": "None"
        };
        charShape.shadow = {
          type: shadowMap[shadowMatch[1].toUpperCase()] || "None",
          offsetX: shadowMatch[2] ? parseInt(shadowMatch[2]) / 100 : void 0,
          offsetY: shadowMatch[3] ? parseInt(shadowMatch[3]) / 100 : void 0,
          color: shadowMatch[4] || void 0
        };
      }
      const embossMatch = shapeContent.match(/<(?:hh:)?emboss\s*\/>/i);
      charShape.emboss = !!embossMatch;
      const engraveMatch = shapeContent.match(/<(?:hh:)?engrave\s*\/>/i);
      charShape.engrave = !!engraveMatch;
      const borderFillIdMatch = shapeContent.match(/borderFillIDRef="(\d+)"/);
      if (borderFillIdMatch) {
        charShape.borderFillId = parseInt(borderFillIdMatch[1]);
      }
      this.styles.charShapes.set(charShape.id, charShape);
      shapeId++;
    };
    while ((match = charShapeRegex.exec(xml)) !== null) {
      parseCharShape(match[0]);
    }
    while ((match = charShapeRegexSelfClosing.exec(xml)) !== null) {
      parseCharShape(match[0]);
    }
  }
  static parseParaShapes(xml) {
    const paraShapeRegex = /<(?:hh:)?(?:paraShape|paraPr)[^>]*>([\s\S]*?)<\/(?:hh:)?(?:paraShape|paraPr)>/gi;
    let match;
    let shapeId = 0;
    while ((match = paraShapeRegex.exec(xml)) !== null) {
      const shapeContent = match[0];
      const paraShape = { id: shapeId };
      const idMatch = shapeContent.match(/\bid="(\d+)"/);
      if (idMatch) {
        shapeId = parseInt(idMatch[1]);
        paraShape.id = shapeId;
      }
      const alignMatch = shapeContent.match(/<(?:hh:)?align[^>]*horizontal="([^"]*)"/i);
      if (alignMatch) {
        const alignVal = alignMatch[1].toUpperCase();
        if (alignVal === "JUSTIFY") paraShape.align = "Justify";
        else if (alignVal === "CENTER") paraShape.align = "Center";
        else if (alignVal === "RIGHT") paraShape.align = "Right";
        else if (alignVal === "DISTRIBUTE") paraShape.align = "Distribute";
        else if (alignVal === "DISTRIBUTE_SPACE") paraShape.align = "DistributeSpace";
        else paraShape.align = "Left";
      }
      let lineSpaceMatch = shapeContent.match(/<(?:hh:)?lineSpacing[^>]*type="([^"]*)"[^>]*value="(\d+)"/i);
      if (!lineSpaceMatch) {
        lineSpaceMatch = shapeContent.match(/<(?:hh:)?lineSpacing[^>]*value="(\d+)"[^>]*type="([^"]*)"/i);
        if (lineSpaceMatch) {
          lineSpaceMatch = [lineSpaceMatch[0], lineSpaceMatch[2], lineSpaceMatch[1]];
        }
      }
      if (lineSpaceMatch) {
        paraShape.lineSpacing = parseInt(lineSpaceMatch[2]);
        const typeMap = {
          "PERCENT": "percent",
          "FIXED": "fixed",
          "BETWEEN_LINES": "betweenLines",
          "AT_LEAST": "atLeast"
        };
        paraShape.lineSpacingType = typeMap[lineSpaceMatch[1]?.toUpperCase()] || "percent";
      }
      const defaultMatch = shapeContent.match(/<hp:default[^>]*>([\s\S]*?)<\/hp:default>/i);
      const marginSource = defaultMatch ? defaultMatch[1] : shapeContent;
      const leftMatch = marginSource.match(/<(?:hc:)?left[^>]*value="(-?\d+)"/i);
      if (leftMatch) {
        paraShape.marginLeft = parseInt(leftMatch[1]) / 100;
      }
      const rightMatch = marginSource.match(/<(?:hc:)?right[^>]*value="(-?\d+)"/i);
      if (rightMatch) {
        paraShape.marginRight = parseInt(rightMatch[1]) / 100;
      }
      const prevMatch = marginSource.match(/<(?:hc:)?prev[^>]*value="(-?\d+)"/i);
      if (prevMatch) {
        paraShape.marginTop = parseInt(prevMatch[1]) / 100;
      }
      const nextMatch = marginSource.match(/<(?:hc:)?next[^>]*value="(-?\d+)"/i);
      if (nextMatch) {
        paraShape.marginBottom = parseInt(nextMatch[1]) / 100;
      }
      const intentMatch = marginSource.match(/<(?:hc:)?intent[^>]*value="(-?\d+)"/i);
      if (intentMatch) {
        paraShape.firstLineIndent = parseInt(intentMatch[1]) / 100;
      }
      const tabDefMatch = shapeContent.match(/tabPrIDRef="(\d+)"/);
      if (tabDefMatch) {
        paraShape.tabDefId = parseInt(tabDefMatch[1]);
      }
      const condenseMatch = shapeContent.match(/condense="(-?\d+)"/);
      if (condenseMatch) {
        paraShape.condense = parseInt(condenseMatch[1]);
      }
      const breakLatinMatch = shapeContent.match(/breakLatinWord="([^"]*)"/);
      if (breakLatinMatch) {
        const breakMap = {
          "KEEP_WORD": "normal",
          "HYPHENATION": "hyphenation",
          "BREAK_WORD": "breakWord"
        };
        paraShape.breakLatinWord = breakMap[breakLatinMatch[1].toUpperCase()] || "normal";
      }
      const breakNonLatinMatch = shapeContent.match(/breakNonLatinWord="([^"]*)"/);
      if (breakNonLatinMatch) {
        paraShape.breakNonLatinWord = breakNonLatinMatch[1] === "1" || breakNonLatinMatch[1] === "true";
      }
      const snapToGridMatch = shapeContent.match(/snapToGrid="([^"]*)"/);
      if (snapToGridMatch) {
        paraShape.snapToGrid = snapToGridMatch[1] === "1" || snapToGridMatch[1] === "true";
      }
      const suppressLineNumMatch = shapeContent.match(/suppressLineNumbers="([^"]*)"/);
      if (suppressLineNumMatch) {
        paraShape.suppressLineNumbers = suppressLineNumMatch[1] === "1" || suppressLineNumMatch[1] === "true";
      }
      const headingMatch = shapeContent.match(/<(?:hh:)?heading[^>]*type="([^"]*)"[^>]*(?:level="(\d+)")?/i);
      if (headingMatch) {
        const headingMap = {
          "NONE": "none",
          "OUTLINE": "outline",
          "NUMBER": "number",
          "BULLET": "bullet"
        };
        paraShape.headingType = headingMap[headingMatch[1]?.toUpperCase()] || "none";
        if (headingMatch[2]) {
          paraShape.headingLevel = parseInt(headingMatch[2]);
        }
      }
      const borderFillMatch = shapeContent.match(/borderFillIDRef="(\d+)"/);
      if (borderFillMatch) {
        paraShape.borderFillId = parseInt(borderFillMatch[1]);
      }
      const autoSpaceEAEngMatch = shapeContent.match(/autoSpaceEAsianEng="([^"]*)"/);
      if (autoSpaceEAEngMatch) {
        paraShape.autoSpaceEAsianEng = autoSpaceEAEngMatch[1] === "1" || autoSpaceEAEngMatch[1] === "true";
      }
      const autoSpaceEANumMatch = shapeContent.match(/autoSpaceEAsianNum="([^"]*)"/);
      if (autoSpaceEANumMatch) {
        paraShape.autoSpaceEAsianNum = autoSpaceEANumMatch[1] === "1" || autoSpaceEANumMatch[1] === "true";
      }
      const keepWithNextMatch = shapeContent.match(/keepWithNext="([^"]*)"/);
      if (keepWithNextMatch) {
        paraShape.keepWithNext = keepWithNextMatch[1] === "1" || keepWithNextMatch[1] === "true";
      }
      const keepLinesMatch = shapeContent.match(/keepLines="([^"]*)"/);
      if (keepLinesMatch) {
        paraShape.keepLines = keepLinesMatch[1] === "1" || keepLinesMatch[1] === "true";
      }
      const pageBreakBeforeMatch = shapeContent.match(/pageBreakBefore="([^"]*)"/);
      if (pageBreakBeforeMatch) {
        paraShape.pageBreakBefore = pageBreakBeforeMatch[1] === "1" || pageBreakBeforeMatch[1] === "true";
      }
      const widowControlMatch = shapeContent.match(/widowOrphan="([^"]*)"/);
      if (widowControlMatch) {
        paraShape.widowControl = widowControlMatch[1] === "1" || widowControlMatch[1] === "true";
      }
      this.styles.paraShapes.set(paraShape.id, paraShape);
      shapeId++;
    }
  }
  static parseBorderFills(xml) {
    const borderFillRegex = /<hh:borderFill\s+id="(\d+)"[^>]*>([\s\S]*?)<\/hh:borderFill>/gi;
    let match;
    while ((match = borderFillRegex.exec(xml)) !== null) {
      const id = parseInt(match[1]);
      const content = match[0];
      const tagAttrs = match[0].match(/<hh:borderFill[^>]*>/)?.[0] || "";
      const borderFill = { id };
      const parseBorder = (name) => {
        const regex = new RegExp(`<hh:${name}Border[^>]*type="([^"]*)"[^>]*width="([^"]*)"[^>]*color="([^"]*)"`, "i");
        const borderMatch = content.match(regex);
        if (borderMatch) {
          const typeMap = {
            "NONE": "none",
            "SOLID": "solid",
            "DASHED": "dashed",
            "DASH": "dashed",
            "DOTTED": "dotted",
            "DOUBLE": "double"
          };
          const widthStr = borderMatch[2];
          let widthPt = 0.5;
          const widthNumMatch = widthStr.match(/([\d.]+)\s*(mm|pt|cm)?/);
          if (widthNumMatch) {
            const num = parseFloat(widthNumMatch[1]);
            const unit = widthNumMatch[2]?.toLowerCase() || "mm";
            if (unit === "mm") widthPt = num * 2.83465;
            else if (unit === "cm") widthPt = num * 28.3465;
            else widthPt = num;
          }
          return {
            style: typeMap[borderMatch[1].toUpperCase()] || "solid",
            width: widthPt,
            color: borderMatch[3]
          };
        }
        return void 0;
      };
      borderFill.leftBorder = parseBorder("left");
      borderFill.rightBorder = parseBorder("right");
      borderFill.topBorder = parseBorder("top");
      borderFill.bottomBorder = parseBorder("bottom");
      borderFill.diagonalBorder = parseBorder("diagonal");
      borderFill.antiDiagonalBorder = parseBorder("antiDiagonal");
      const threeDMatch = tagAttrs.match(/threeD="([^"]*)"/);
      if (threeDMatch) {
        borderFill.threeD = threeDMatch[1] === "1" || threeDMatch[1] === "true";
      }
      const shadowMatch = tagAttrs.match(/shadow="([^"]*)"/);
      if (shadowMatch) {
        borderFill.shadow = shadowMatch[1] === "1" || shadowMatch[1] === "true";
      }
      const centerLineMatch = tagAttrs.match(/centerLine="([^"]*)"/);
      if (centerLineMatch) {
        borderFill.centerLine = centerLineMatch[1] === "1" || centerLineMatch[1] === "true";
      }
      const fillBrushMatch = content.match(/<(?:hh|hc):fillBrush[^>]*>([\s\S]*?)<\/(?:hh|hc):fillBrush>/i);
      if (fillBrushMatch) {
        const fillContent = fillBrushMatch[1];
        const windowColorMatch = fillContent.match(/<(?:hh|hc):winBrush[^>]*faceColor="([^"]*)"/i);
        if (windowColorMatch && windowColorMatch[1] !== "none") {
          borderFill.fillColor = windowColorMatch[1];
          borderFill.fillType = "color";
        }
        const gradationMatch = fillContent.match(/<(?:hh|hc):gradation[^>]*type="([^"]*)"[^>]*(?:angle="([^"]*)")?[^>]*(?:centerX="([^"]*)")?[^>]*(?:centerY="([^"]*)")?[^>]*(?:step="([^"]*)")?[^>]*>([\s\S]*?)<\/(?:hh|hc):gradation>/i);
        if (gradationMatch) {
          const typeMap = {
            "LINEAR": "linear",
            "RADIAL": "radial",
            "CONICAL": "conical",
            "SQUARE": "square"
          };
          borderFill.fillType = "gradation";
          borderFill.gradation = {
            type: typeMap[gradationMatch[1]?.toUpperCase()] || "linear",
            colors: []
          };
          if (gradationMatch[2]) borderFill.gradation.angle = parseInt(gradationMatch[2]);
          if (gradationMatch[3]) borderFill.gradation.centerX = parseInt(gradationMatch[3]);
          if (gradationMatch[4]) borderFill.gradation.centerY = parseInt(gradationMatch[4]);
          if (gradationMatch[5]) borderFill.gradation.step = parseInt(gradationMatch[5]);
          const colorRegex = /<(?:hh|hc):color[^>]*value="([^"]*)"/gi;
          let colorMatch;
          while ((colorMatch = colorRegex.exec(gradationMatch[6])) !== null) {
            borderFill.gradation.colors.push(colorMatch[1]);
          }
        }
        const imgBrushMatch = fillContent.match(/<(?:hh|hc):imgBrush[^>]*mode="([^"]*)"[^>]*(?:alpha="([^"]*)")?[^>]*(?:binaryItemIDRef="([^"]*)")?/i);
        if (imgBrushMatch) {
          const modeMap = {
            "TILE": "tile",
            "TILE_HORZ": "tileHorz",
            "TILE_VERT": "tileVert",
            "TOTAL_FIT": "totalFit",
            "FIT": "fit",
            "CENTER": "center",
            "ONCE_ABSOLUTE_SCALE": "onceAbsoluteScale"
          };
          borderFill.fillType = "image";
          borderFill.imageFill = {
            mode: modeMap[imgBrushMatch[1]?.toUpperCase()] || "tile"
          };
          if (imgBrushMatch[2]) {
            borderFill.imageFill.alpha = parseInt(imgBrushMatch[2]) / 255;
          }
          if (imgBrushMatch[3]) {
            borderFill.imageFill.binaryItemId = imgBrushMatch[3];
          }
        }
      }
      if (!borderFill.fillColor) {
        const fillMatch = content.match(/faceColor="([^"]*)"/);
        if (fillMatch && fillMatch[1] !== "none") {
          borderFill.fillColor = fillMatch[1];
          borderFill.fillType = "color";
        }
      }
      this.styles.borderFills.set(id, borderFill);
    }
  }
  static parseTabDefs(xml) {
    const tabPrRegex = /<hh:tabPr\s+id="(\d+)"[^>]*>([\s\S]*?)<\/hh:tabPr>|<hh:tabPr\s+id="(\d+)"[^>]*\/>/gi;
    let match;
    while ((match = tabPrRegex.exec(xml)) !== null) {
      const id = parseInt(match[1] || match[3]);
      const content = match[0];
      const tabDef = { id, items: [] };
      const autoLeftMatch = content.match(/autoTabLeft="([^"]*)"/);
      if (autoLeftMatch) {
        tabDef.autoTabLeft = autoLeftMatch[1] === "1" || autoLeftMatch[1] === "true";
      }
      const autoRightMatch = content.match(/autoTabRight="([^"]*)"/);
      if (autoRightMatch) {
        tabDef.autoTabRight = autoRightMatch[1] === "1" || autoRightMatch[1] === "true";
      }
      const tabItemRegex = /<hh:tabItem[^>]*pos="(\d+)"[^>]*type="([^"]*)"[^>]*leader="([^"]*)"/gi;
      let itemMatch;
      while ((itemMatch = tabItemRegex.exec(content)) !== null) {
        const typeMap = {
          "LEFT": "left",
          "RIGHT": "right",
          "CENTER": "center",
          "DECIMAL": "decimal"
        };
        const leaderMap = {
          "NONE": "none",
          "SOLID": "solid",
          "DASH": "dash",
          "DOT": "dot",
          "DASH_DOT": "dashDot",
          "DASH_DOT_DOT": "dashDotDot"
        };
        tabDef.items.push({
          pos: parseInt(itemMatch[1]) / 100,
          type: typeMap[itemMatch[2].toUpperCase()] || "left",
          leader: leaderMap[itemMatch[3].toUpperCase()] || "none"
        });
      }
      this.styles.tabDefs.set(id, tabDef);
    }
  }
  static parseNumberings(xml) {
    const numberingRegex = /<hh:numbering\s+id="(\d+)"[^>]*>([\s\S]*?)<\/hh:numbering>/gi;
    let match;
    while ((match = numberingRegex.exec(xml)) !== null) {
      const id = parseInt(match[1]);
      const content = match[0];
      const numberingDef = { id, paraHeads: [] };
      const startMatch = content.match(/\bstart="(\d+)"/);
      if (startMatch) {
        numberingDef.start = parseInt(startMatch[1]);
      }
      const paraHeadRegex = /<hh:paraHead[^>]*level="(\d+)"[^>]*numFormat="([^"]*)"[^>]*>([^<]*)<\/hh:paraHead>|<hh:paraHead[^>]*level="(\d+)"[^>]*numFormat="([^"]*)"[^>]*\/>/gi;
      let headMatch;
      while ((headMatch = paraHeadRegex.exec(content)) !== null) {
        const level = parseInt(headMatch[1] || headMatch[4]);
        const numFormatStr = headMatch[2] || headMatch[5];
        const text = headMatch[3] || "";
        const formatMap = {
          "DIGIT": "digit",
          "ROMAN_CAPITAL": "romanCapital",
          "ROMAN_SMALL": "romanSmall",
          "LATIN_CAPITAL": "latinCapital",
          "LATIN_SMALL": "latinSmall",
          "HANGUL_SYLLABLE": "hangulSyllable",
          "HANGUL_JAMO": "hangulJamo",
          "CIRCLED_DIGIT": "circledDigit"
        };
        numberingDef.paraHeads.push({
          level,
          numFormat: formatMap[numFormatStr?.toUpperCase()] || "digit",
          text: text || void 0
        });
      }
      this.styles.numberings.set(id, numberingDef);
    }
  }
  static parseBullets(xml) {
    const bulletRegex = /<hh:bullet\s+id="(\d+)"[^>]*>([\s\S]*?)<\/hh:bullet>|<hh:bullet\s+id="(\d+)"[^>]*\/>/gi;
    let match;
    while ((match = bulletRegex.exec(xml)) !== null) {
      const id = parseInt(match[1] || match[3]);
      const content = match[0];
      const bulletDef = { id };
      const charMatch = content.match(/\bchar="([^"]*)"/);
      if (charMatch) {
        bulletDef.char = charMatch[1];
      }
      const useImageMatch = content.match(/useImage="([^"]*)"/);
      if (useImageMatch) {
        bulletDef.useImage = useImageMatch[1] === "1" || useImageMatch[1] === "true";
      }
      this.styles.bullets.set(id, bulletDef);
    }
  }
  static parseStyleDefs(xml) {
    const styleRegex = /<hh:style\s+[^>]*id="(\d+)"[^>]*>([\s\S]*?)<\/hh:style>|<hh:style\s+[^>]*id="(\d+)"[^>]*\/>/gi;
    let match;
    while ((match = styleRegex.exec(xml)) !== null) {
      const id = parseInt(match[1] || match[3]);
      const content = match[0];
      const styleDef = { id };
      const typeMatch = content.match(/\btype="([^"]*)"/);
      if (typeMatch) {
        styleDef.type = typeMatch[1].toLowerCase() === "char" ? "char" : "para";
      }
      const nameMatch = content.match(/\bname="([^"]*)"/);
      if (nameMatch) {
        styleDef.name = nameMatch[1];
      }
      const engNameMatch = content.match(/engName="([^"]*)"/);
      if (engNameMatch) {
        styleDef.engName = engNameMatch[1];
      }
      const paraPrMatch = content.match(/paraPrIDRef="(\d+)"/);
      if (paraPrMatch) {
        styleDef.paraPrIdRef = parseInt(paraPrMatch[1]);
      }
      const charPrMatch = content.match(/charPrIDRef="(\d+)"/);
      if (charPrMatch) {
        styleDef.charPrIdRef = parseInt(charPrMatch[1]);
      }
      const nextStyleMatch = content.match(/nextStyleIDRef="(\d+)"/);
      if (nextStyleMatch) {
        styleDef.nextStyleIdRef = parseInt(nextStyleMatch[1]);
      }
      this.styles.styles.set(id, styleDef);
    }
  }
  static async parseImages(zip, content) {
    const binDataFolder = zip.folder("BinData");
    if (!binDataFolder) return;
    const imageFiles = Object.keys(zip.files).filter(
      (f) => f.startsWith("BinData/") && !f.endsWith("/")
    );
    for (const imagePath of imageFiles) {
      const file = zip.file(imagePath);
      if (!file) continue;
      const data = await file.async("base64");
      const fileName = imagePath.split("/").pop() || "";
      const ext = fileName.split(".").pop()?.toLowerCase() || "";
      let mimeType = "image/png";
      if (ext === "jpg" || ext === "jpeg") mimeType = "image/jpeg";
      else if (ext === "gif") mimeType = "image/gif";
      else if (ext === "bmp") mimeType = "image/bmp";
      else if (ext === "svg") mimeType = "image/svg+xml";
      const imageId = fileName.replace(/\.[^.]+$/, "");
      content.images.set(imageId, {
        id: imageId,
        binaryId: imagePath,
        width: 0,
        height: 0,
        data: `data:${mimeType};base64,${data}`,
        mimeType
      });
    }
  }
  static parseSection(xml, content) {
    const section = {
      elements: [],
      pageSettings: this.parsePageSettings(xml),
      sectionProperties: this.parseSectionProperties(xml),
      memos: []
      // Store memo data for sidebar display
    };
    const memoFullRegex = /<hp:fieldBegin[^>]*id="([^"]*)"[^>]*type="MEMO"[^>]*>([\s\S]*?)<\/hp:fieldBegin>([\s\S]*?)<hp:ctrl>\s*<hp:fieldEnd/gi;
    let memoMatch;
    while ((memoMatch = memoFullRegex.exec(xml)) !== null) {
      const memoId = memoMatch[1];
      const memoContent = memoMatch[2];
      const linkedSection = memoMatch[3];
      const memo = {
        id: memoId,
        author: memoContent.match(/<hp:stringParam[^>]*name="Author"[^>]*>([^<]*)<\/hp:stringParam>/i)?.[1] || "Unknown",
        date: memoContent.match(/<hp:stringParam[^>]*name="CreateDateTime"[^>]*>([^<]*)<\/hp:stringParam>/i)?.[1] || "",
        content: []
      };
      const textMatches = memoContent.matchAll(/<hp:t[^>]*>([^<]*)<\/hp:t>/gi);
      for (const textMatch of textMatches) {
        if (textMatch[1]) memo.content.push(textMatch[1]);
      }
      const linkedTexts = linkedSection.match(/<hp:t[^>]*>([^<]*)<\/hp:t>/gi);
      if (linkedTexts) {
        const texts = linkedTexts.map((t) => t.replace(/<[^>]+>/g, "")).filter((t) => t);
        memo.linkedText = texts.join("");
      }
      section.memos.push(memo);
    }
    const simpleMemoRegex = /<hp:memo\s+id="([^"]*)"(?:\s+author="([^"]*)")?(?:\s+date="([^"]*)")?[^>]*>([\s\S]*?)<\/hp:memo>/gi;
    let simpleMemoMatch;
    while ((simpleMemoMatch = simpleMemoRegex.exec(xml)) !== null) {
      const memoId = simpleMemoMatch[1];
      if (section.memos.some((m) => m.id === memoId)) continue;
      const memo = {
        id: memoId,
        author: simpleMemoMatch[2] || "Unknown",
        date: simpleMemoMatch[3] || "",
        content: []
      };
      const memoBody = simpleMemoMatch[4];
      const textMatches = memoBody.matchAll(/<hp:t[^>]*>([^<]*)<\/hp:t>/gi);
      for (const textMatch of textMatches) {
        if (textMatch[1]) memo.content.push(textMatch[1]);
      }
      section.memos.push(memo);
    }
    let cleanedXml = xml.replace(/<hp:fieldBegin[^>]*type="MEMO"[^>]*>[\s\S]*?<\/hp:fieldBegin>/gi, "");
    cleanedXml = cleanedXml.replace(/<hp:memo\b[^>]*>[\s\S]*?<\/hp:memo>/gi, "");
    const footnoteRefPositions = [];
    const fnPosRegex = /<hp:footNote\b[^>]*number="(\d+)"[^>]*>/gi;
    let fnPosMatch;
    while ((fnPosMatch = fnPosRegex.exec(cleanedXml)) !== null) {
      footnoteRefPositions.push({
        position: fnPosMatch.index,
        number: parseInt(fnPosMatch[1]),
        type: "footnote"
      });
    }
    const enPosRegex = /<hp:endNote\b[^>]*number="(\d+)"[^>]*>/gi;
    let enPosMatch;
    while ((enPosMatch = enPosRegex.exec(cleanedXml)) !== null) {
      footnoteRefPositions.push({
        position: enPosMatch.index,
        number: parseInt(enPosMatch[1]),
        type: "endnote"
      });
    }
    cleanedXml = cleanedXml.replace(/<hp:footNote\b[^>]*>[\s\S]*?<\/hp:footNote>/gi, "");
    cleanedXml = cleanedXml.replace(/<hp:endNote\b[^>]*>[\s\S]*?<\/hp:endNote>/gi, "");
    cleanedXml = cleanedXml.replace(/<hp:header\b[^>]*>[\s\S]*?<\/hp:header>/gi, "");
    cleanedXml = cleanedXml.replace(/<hp:footer\b[^>]*>[\s\S]*?<\/hp:footer>/gi, "");
    const elements = [];
    const paragraphs = this.extractAllParagraphs(cleanedXml);
    const tables = this.extractBalancedTags(cleanedXml, "hp:tbl");
    const tableRanges = [];
    for (const tableXml of tables) {
      const tableIndex = cleanedXml.indexOf(tableXml);
      let parentLinesegs;
      for (const para of paragraphs) {
        if (tableIndex >= para.start && tableIndex < para.start + para.xml.length) {
          const linesegArrayRegex = /<hp:linesegarray>([\s\S]*?)<\/hp:linesegarray>/g;
          let lastLinesegArray = null;
          let arrayMatch;
          while ((arrayMatch = linesegArrayRegex.exec(para.xml)) !== null) {
            lastLinesegArray = arrayMatch[1];
          }
          if (lastLinesegArray) {
            const linesegRegex = /<hp:lineseg[^>]*vertpos="(\d+)"[^>]*vertsize="(\d+)"[^>]*textheight="(\d+)"[^>]*baseline="(\d+)"[^>]*spacing="(\d+)"/g;
            let linesegMatch;
            const linesegs = [];
            while ((linesegMatch = linesegRegex.exec(lastLinesegArray)) !== null) {
              linesegs.push({
                vertpos: parseInt(linesegMatch[1]) / 100,
                vertsize: parseInt(linesegMatch[2]) / 100,
                textheight: parseInt(linesegMatch[3]) / 100,
                baseline: parseInt(linesegMatch[4]) / 100,
                spacing: parseInt(linesegMatch[5]) / 100
              });
            }
            if (linesegs.length > 0) {
              parentLinesegs = linesegs;
            }
          }
          break;
        }
      }
      elements.push({ index: tableIndex, type: "tbl", xml: tableXml, parentLinesegs });
      tableRanges.push({ start: tableIndex, end: tableIndex + tableXml.length });
    }
    for (const para of paragraphs) {
      const isInsideTable = tableRanges.some(
        (range) => para.start > range.start && para.start < range.end
      );
      const containsTable = tableRanges.some(
        (range) => range.start >= para.start && range.end <= para.end
      );
      if (!isInsideTable) {
        if (containsTable) {
          let paraXmlWithoutTable = para.xml;
          for (const range of tableRanges) {
            if (range.start >= para.start && range.end <= para.start + para.xml.length) {
              const tableStartInPara = range.start - para.start;
              const tableEndInPara = range.end - para.start;
              const tableXmlInPara = para.xml.substring(tableStartInPara, tableEndInPara);
              paraXmlWithoutTable = paraXmlWithoutTable.replace(tableXmlInPara, "");
            }
          }
          const hasTextContent = /<hp:t\b[^>]*>/.test(paraXmlWithoutTable);
          if (hasTextContent) {
            elements.push({ index: para.start, type: "p", xml: paraXmlWithoutTable });
          }
        } else {
          elements.push({ index: para.start, type: "p", xml: para.xml });
        }
      }
    }
    const lineRegex = /<hp:line\b[^>]*(?:\/>|>[\s\S]*?<\/hp:line>)/g;
    let lineMatch;
    while ((lineMatch = lineRegex.exec(cleanedXml)) !== null) {
      elements.push({ index: lineMatch.index, type: "line", xml: lineMatch[0] });
    }
    const rectRegex = /<hp:rect\b[^>]*(?:\/>|>[\s\S]*?<\/hp:rect>)/g;
    let rectMatch;
    while ((rectMatch = rectRegex.exec(cleanedXml)) !== null) {
      elements.push({ index: rectMatch.index, type: "rect", xml: rectMatch[0] });
    }
    const ellipseRegex = /<hp:ellipse\b[^>]*(?:\/>|>[\s\S]*?<\/hp:ellipse>)/g;
    let ellipseMatch;
    while ((ellipseMatch = ellipseRegex.exec(cleanedXml)) !== null) {
      elements.push({ index: ellipseMatch.index, type: "ellipse", xml: ellipseMatch[0] });
    }
    const arcRegex = /<hp:arc\b[^>]*(?:\/>|>[\s\S]*?<\/hp:arc>)/g;
    let arcMatch;
    while ((arcMatch = arcRegex.exec(cleanedXml)) !== null) {
      elements.push({ index: arcMatch.index, type: "arc", xml: arcMatch[0] });
    }
    const polygonRegex = /<hp:polygon\b[^>]*(?:\/>|>[\s\S]*?<\/hp:polygon>)/g;
    let polygonMatch;
    while ((polygonMatch = polygonRegex.exec(cleanedXml)) !== null) {
      elements.push({ index: polygonMatch.index, type: "polygon", xml: polygonMatch[0] });
    }
    const curveRegex = /<hp:curve\b[^>]*(?:\/>|>[\s\S]*?<\/hp:curve>)/g;
    let curveMatch;
    while ((curveMatch = curveRegex.exec(cleanedXml)) !== null) {
      elements.push({ index: curveMatch.index, type: "curve", xml: curveMatch[0] });
    }
    const connectLineRegex = /<hp:connectLine\b[^>]*(?:\/>|>[\s\S]*?<\/hp:connectLine>)/g;
    let connectLineMatch;
    while ((connectLineMatch = connectLineRegex.exec(cleanedXml)) !== null) {
      elements.push({ index: connectLineMatch.index, type: "connectline", xml: connectLineMatch[0] });
    }
    const containerXmls = this.extractBalancedTags(cleanedXml, "hp:container");
    let containerSearchPos = 0;
    for (const containerXml of containerXmls) {
      const containerIdx = cleanedXml.indexOf(containerXml, containerSearchPos);
      if (containerIdx >= 0) {
        elements.push({ index: containerIdx, type: "container", xml: containerXml });
        containerSearchPos = containerIdx + containerXml.length;
      }
    }
    const oleRegex = /<hp:ole\b[^>]*(?:\/>|>[\s\S]*?<\/hp:ole>)/g;
    let oleMatch;
    while ((oleMatch = oleRegex.exec(cleanedXml)) !== null) {
      elements.push({ index: oleMatch.index, type: "ole", xml: oleMatch[0] });
    }
    const equationRegex = /<hp:equation\b[^>]*(?:\/>|>[\s\S]*?<\/hp:equation>)/g;
    let equationMatch;
    while ((equationMatch = equationRegex.exec(cleanedXml)) !== null) {
      elements.push({ index: equationMatch.index, type: "equation", xml: equationMatch[0] });
    }
    const textArtRegex = /<hp:textArt\b[^>]*(?:\/>|>[\s\S]*?<\/hp:textArt>)/g;
    let textArtMatch;
    while ((textArtMatch = textArtRegex.exec(cleanedXml)) !== null) {
      elements.push({ index: textArtMatch.index, type: "textart", xml: textArtMatch[0] });
    }
    const unknownObjRegex = /<hp:unknownObj\b[^>]*(?:\/>|>[\s\S]*?<\/hp:unknownObj>)/g;
    let unknownObjMatch;
    while ((unknownObjMatch = unknownObjRegex.exec(cleanedXml)) !== null) {
      elements.push({ index: unknownObjMatch.index, type: "unknownobject", xml: unknownObjMatch[0] });
    }
    const buttonRegex = /<hp:button\b[^>]*(?:\/>|>[\s\S]*?<\/hp:button>)/g;
    let buttonMatch;
    while ((buttonMatch = buttonRegex.exec(cleanedXml)) !== null) {
      elements.push({ index: buttonMatch.index, type: "button", xml: buttonMatch[0] });
    }
    const radioButtonRegex = /<hp:radioButton\b[^>]*(?:\/>|>[\s\S]*?<\/hp:radioButton>)/g;
    let radioButtonMatch;
    while ((radioButtonMatch = radioButtonRegex.exec(cleanedXml)) !== null) {
      elements.push({ index: radioButtonMatch.index, type: "radiobutton", xml: radioButtonMatch[0] });
    }
    const checkButtonRegex = /<hp:checkButton\b[^>]*(?:\/>|>[\s\S]*?<\/hp:checkButton>)/g;
    let checkButtonMatch;
    while ((checkButtonMatch = checkButtonRegex.exec(cleanedXml)) !== null) {
      elements.push({ index: checkButtonMatch.index, type: "checkbutton", xml: checkButtonMatch[0] });
    }
    const comboBoxRegex = /<hp:comboBox\b[^>]*(?:\/>|>[\s\S]*?<\/hp:comboBox>)/g;
    let comboBoxMatch;
    while ((comboBoxMatch = comboBoxRegex.exec(cleanedXml)) !== null) {
      elements.push({ index: comboBoxMatch.index, type: "combobox", xml: comboBoxMatch[0] });
    }
    const editRegex = /<hp:edit\b[^>]*(?:\/>|>[\s\S]*?<\/hp:edit>)/g;
    let editMatch;
    while ((editMatch = editRegex.exec(cleanedXml)) !== null) {
      elements.push({ index: editMatch.index, type: "edit", xml: editMatch[0] });
    }
    const listBoxRegex = /<hp:listBox\b[^>]*(?:\/>|>[\s\S]*?<\/hp:listBox>)/g;
    let listBoxMatch;
    while ((listBoxMatch = listBoxRegex.exec(cleanedXml)) !== null) {
      elements.push({ index: listBoxMatch.index, type: "listbox", xml: listBoxMatch[0] });
    }
    const scrollBarRegex = /<hp:scrollBar\b[^>]*(?:\/>|>[\s\S]*?<\/hp:scrollBar>)/g;
    let scrollBarMatch;
    while ((scrollBarMatch = scrollBarRegex.exec(cleanedXml)) !== null) {
      elements.push({ index: scrollBarMatch.index, type: "scrollbar", xml: scrollBarMatch[0] });
    }
    const picXmls = this.extractBalancedTags(cleanedXml, "hp:pic");
    let picSearchPos = 0;
    for (const picXml of picXmls) {
      const picIdx = cleanedXml.indexOf(picXml, picSearchPos);
      if (picIdx >= 0) {
        elements.push({ index: picIdx, type: "pic", xml: picXml });
        const nestedPics = this.extractBalancedTags(picXml.substring("<hp:pic".length), "hp:pic");
        for (const nestedPic of nestedPics) {
          const nestedIdx = cleanedXml.indexOf(nestedPic, picIdx);
          if (nestedIdx >= 0) {
            elements.push({ index: nestedIdx, type: "pic", xml: nestedPic });
          }
        }
        picSearchPos = picIdx + picXml.length;
      }
    }
    const videoRegex = /<hp:video\b[^>]*(?:\/>|>[\s\S]*?<\/hp:video>)/g;
    let videoMatch;
    while ((videoMatch = videoRegex.exec(cleanedXml)) !== null) {
      elements.push({ index: videoMatch.index, type: "video", xml: videoMatch[0] });
    }
    const chartRegex = /<hp:chart\b[^>]*(?:\/>|>[\s\S]*?<\/hp:chart>)/g;
    let chartMatch;
    while ((chartMatch = chartRegex.exec(cleanedXml)) !== null) {
      elements.push({ index: chartMatch.index, type: "chart", xml: chartMatch[0] });
    }
    elements.sort((a, b) => a.index - b.index);
    for (const el of elements) {
      if (el.type === "p") {
        const paragraph = this.parseParagraph(el.xml);
        for (const fnRef of footnoteRefPositions) {
          if (fnRef.position >= el.index && fnRef.position < el.index + el.xml.length + 500) {
            paragraph.runs.push({
              text: `${fnRef.number})`,
              footnoteRef: fnRef.type === "footnote" ? fnRef.number : void 0,
              endnoteRef: fnRef.type === "endnote" ? fnRef.number : void 0,
              charStyle: { superscript: true, fontSize: 7 }
            });
            const idx = footnoteRefPositions.indexOf(fnRef);
            if (idx > -1) footnoteRefPositions.splice(idx, 1);
            break;
          }
        }
        section.elements.push({ type: "paragraph", data: paragraph });
      } else if (el.type === "tbl") {
        const table = this.parseTable(el.xml);
        if (el.parentLinesegs && el.parentLinesegs.length > 0) {
          table.linesegs = el.parentLinesegs;
        }
        section.elements.push({ type: "table", data: table });
      } else if (el.type === "pic") {
        const image = this.parseImageElement(el.xml, content);
        if (image) {
          section.elements.push({ type: "image", data: image });
        }
      } else if (el.type === "line") {
        const line = this.parseLine(el.xml);
        section.elements.push({ type: "line", data: line });
      } else if (el.type === "rect") {
        const rect = this.parseRect(el.xml);
        section.elements.push({ type: "rect", data: rect });
      } else if (el.type === "ellipse") {
        const ellipse = this.parseEllipse(el.xml);
        section.elements.push({ type: "ellipse", data: ellipse });
      } else if (el.type === "arc") {
        const arc = this.parseArc(el.xml);
        section.elements.push({ type: "arc", data: arc });
      } else if (el.type === "polygon") {
        const polygon = this.parsePolygon(el.xml);
        section.elements.push({ type: "polygon", data: polygon });
      } else if (el.type === "curve") {
        const curve = this.parseCurve(el.xml);
        section.elements.push({ type: "curve", data: curve });
      } else if (el.type === "connectline") {
        const connectLine = this.parseConnectLine(el.xml);
        section.elements.push({ type: "connectline", data: connectLine });
      } else if (el.type === "container") {
        const container = this.parseContainer(el.xml, content);
        section.elements.push({ type: "container", data: container });
      } else if (el.type === "ole") {
        const ole = this.parseOle(el.xml);
        section.elements.push({ type: "ole", data: ole });
      } else if (el.type === "equation") {
        const equation = this.parseEquation(el.xml);
        section.elements.push({ type: "equation", data: equation });
      } else if (el.type === "textart") {
        const textArt = this.parseTextArt(el.xml);
        section.elements.push({ type: "textart", data: textArt });
      } else if (el.type === "unknownobject") {
        const unknownObj = this.parseUnknownObject(el.xml);
        section.elements.push({ type: "unknownobject", data: unknownObj });
      } else if (el.type === "button") {
        const button = this.parseButton(el.xml);
        section.elements.push({ type: "button", data: button });
      } else if (el.type === "radiobutton") {
        const radioButton = this.parseRadioButton(el.xml);
        section.elements.push({ type: "radiobutton", data: radioButton });
      } else if (el.type === "checkbutton") {
        const checkButton = this.parseCheckButton(el.xml);
        section.elements.push({ type: "checkbutton", data: checkButton });
      } else if (el.type === "combobox") {
        const comboBox = this.parseComboBox(el.xml);
        section.elements.push({ type: "combobox", data: comboBox });
      } else if (el.type === "edit") {
        const edit = this.parseEdit(el.xml);
        section.elements.push({ type: "edit", data: edit });
      } else if (el.type === "listbox") {
        const listBox = this.parseListBox(el.xml);
        section.elements.push({ type: "listbox", data: listBox });
      } else if (el.type === "scrollbar") {
        const scrollBar = this.parseScrollBar(el.xml);
        section.elements.push({ type: "scrollbar", data: scrollBar });
      }
    }
    this.parseHorizontalRules(xml, section);
    if (section.elements.length === 0) {
      const paragraphs2 = this.parseParagraphsSimple(cleanedXml);
      for (const p of paragraphs2) {
        section.elements.push({ type: "paragraph", data: p });
      }
    }
    section.header = this.parseHeaderFooter(xml, "header");
    section.footer = this.parseHeaderFooter(xml, "footer");
    this.parseFootnotes(xml, content);
    this.parseEndnotes(xml, content);
    this.parseHiddenComments(xml, section);
    return section;
  }
  static parseEndnotes(xml, content) {
    const endnoteRegex = /<hp:endnote[^>]*>([\s\S]*?)<\/hp:endnote>/gi;
    let match;
    let endnoteIndex = 0;
    while ((match = endnoteRegex.exec(xml)) !== null) {
      const endnoteContent = match[0];
      const paragraphs = [];
      const paraRegex = /<hp:p\b[^>]*>[\s\S]*?<\/hp:p>/g;
      let paraMatch;
      while ((paraMatch = paraRegex.exec(endnoteContent)) !== null) {
        paragraphs.push(this.parseParagraph(paraMatch[0]));
      }
      if (paragraphs.length > 0) {
        content.endnotes.push({
          id: `endnote_${endnoteIndex++}`,
          paragraphs
        });
      }
    }
  }
  static parseHiddenComments(xml, section) {
    const hiddenCommentRegex = /<hp:hiddenComment[^>]*>([\s\S]*?)<\/hp:hiddenComment>/gi;
    let match;
    while ((match = hiddenCommentRegex.exec(xml)) !== null) {
      const commentContent = match[0];
      const paragraphs = [];
      const paraRegex = /<hp:p\b[^>]*>[\s\S]*?<\/hp:p>/g;
      let paraMatch;
      while ((paraMatch = paraRegex.exec(commentContent)) !== null) {
        paragraphs.push(this.parseParagraph(paraMatch[0]));
      }
    }
  }
  static parseHeaderFooter(xml, type) {
    const tagName = type === "header" ? "hp:header" : "hp:footer";
    const headerBlocks = this.extractBalancedTags(xml, tagName);
    if (headerBlocks.length === 0) return void 0;
    const content = headerBlocks[0];
    const paragraphs = [];
    const elements = [];
    const tables = this.extractBalancedTags(content, "hp:tbl");
    const tableRanges = [];
    for (const tableXml of tables) {
      const tableIndex = content.indexOf(tableXml);
      if (tableIndex >= 0) {
        const table = this.parseTable(tableXml);
        elements.push({ type: "table", data: table });
        tableRanges.push({ start: tableIndex, end: tableIndex + tableXml.length });
      }
    }
    const allParagraphs = this.extractAllParagraphs(content);
    for (const para of allParagraphs) {
      const isInsideTable = tableRanges.some(
        (range) => para.start > range.start && para.start < range.end
      );
      if (!isInsideTable) {
        const paragraph = this.parseParagraph(para.xml);
        paragraphs.push(paragraph);
        elements.push({ type: "paragraph", data: paragraph });
      }
    }
    if (elements.length === 0 && paragraphs.length === 0) return void 0;
    return { paragraphs, elements };
  }
  static parseFootnotes(xml, content) {
    const footnoteRegex = /<hp:footNote\b[^>]*>([\s\S]*?)<\/hp:footNote>/gi;
    let match;
    let footnoteIndex = 0;
    while ((match = footnoteRegex.exec(xml)) !== null) {
      const footnoteContent = match[0];
      const paragraphs = [];
      const numberMatch = footnoteContent.match(/number="(\d+)"/);
      const footnoteNumber = numberMatch ? parseInt(numberMatch[1]) : footnoteIndex + 1;
      const paraRegex = /<hp:p\b[^>]*>[\s\S]*?<\/hp:p>/g;
      let paraMatch;
      while ((paraMatch = paraRegex.exec(footnoteContent)) !== null) {
        paragraphs.push(this.parseParagraph(paraMatch[0]));
      }
      if (paragraphs.length > 0) {
        content.footnotes.push({
          id: `footnote_${footnoteIndex}`,
          number: footnoteNumber,
          type: "footnote",
          paragraphs
        });
        footnoteIndex++;
      }
    }
    const endnoteRegex = /<hp:endNote\b[^>]*>([\s\S]*?)<\/hp:endNote>/gi;
    while ((match = endnoteRegex.exec(xml)) !== null) {
      const endnoteContent = match[0];
      const paragraphs = [];
      const numberMatch = endnoteContent.match(/number="(\d+)"/);
      const endnoteNumber = numberMatch ? parseInt(numberMatch[1]) : footnoteIndex + 1;
      const paraRegex = /<hp:p\b[^>]*>[\s\S]*?<\/hp:p>/g;
      let paraMatch;
      while ((paraMatch = paraRegex.exec(endnoteContent)) !== null) {
        paragraphs.push(this.parseParagraph(paraMatch[0]));
      }
      if (paragraphs.length > 0) {
        content.footnotes.push({
          id: `endnote_${footnoteIndex}`,
          number: endnoteNumber,
          type: "endnote",
          paragraphs
        });
        footnoteIndex++;
      }
    }
  }
  static parsePageSettings(xml) {
    const defaults = {
      width: 595,
      height: 842,
      marginTop: 56.7,
      marginBottom: 56.7,
      marginLeft: 56.7,
      marginRight: 56.7,
      orientation: "portrait"
    };
    const pagePrMatch = xml.match(/<hp:pagePr[^>]*>([\s\S]*?)<\/hp:pagePr>/);
    if (pagePrMatch) {
      const pagePr = pagePrMatch[0];
      const widthMatch = pagePr.match(/width="(\d+)"/);
      const heightMatch = pagePr.match(/height="(\d+)"/);
      if (widthMatch) defaults.width = parseInt(widthMatch[1]) / 100;
      if (heightMatch) defaults.height = parseInt(heightMatch[1]) / 100;
      const landscapeMatch = pagePr.match(/landscape="([^"]*)"/);
      if (landscapeMatch) {
        const val = landscapeMatch[1].toUpperCase();
        if (val === "WIDELY" || val === "1" || val === "TRUE" || val === "LANDSCAPE") {
          defaults.orientation = "landscape";
        }
      }
      const marginMatch = pagePr.match(/<hp:margin[^>]*left="(\d+)"[^>]*right="(\d+)"[^>]*top="(\d+)"[^>]*bottom="(\d+)"/);
      if (marginMatch) {
        defaults.marginLeft = parseInt(marginMatch[1]) / 100;
        defaults.marginRight = parseInt(marginMatch[2]) / 100;
        defaults.marginTop = parseInt(marginMatch[3]) / 100;
        defaults.marginBottom = parseInt(marginMatch[4]) / 100;
      }
      const marginTag = pagePr.match(/<hp:margin[^>]*>/);
      if (marginTag) {
        const headerMatch = marginTag[0].match(/header="(\d+)"/);
        const footerMatch = marginTag[0].match(/footer="(\d+)"/);
        const gutterMatch = marginTag[0].match(/gutter="(\d+)"/);
        if (headerMatch) defaults.headerMargin = parseInt(headerMatch[1]) / 100;
        if (footerMatch) defaults.footerMargin = parseInt(footerMatch[1]) / 100;
        if (gutterMatch) defaults.gutterMargin = parseInt(gutterMatch[1]) / 100;
      }
    }
    const pageDefMatch = xml.match(/<hp:pageDef[^>]*>/);
    if (pageDefMatch && defaults.width === 595) {
      const pageDef = pageDefMatch[0];
      const widthMatch = pageDef.match(/width="(\d+)"/);
      const heightMatch = pageDef.match(/height="(\d+)"/);
      if (widthMatch) defaults.width = parseInt(widthMatch[1]) / 100;
      if (heightMatch) defaults.height = parseInt(heightMatch[1]) / 100;
      const landscapeMatch = pageDef.match(/landscape="([^"]*)"/);
      if (landscapeMatch?.[1] === "1" || landscapeMatch?.[1] === "true") {
        defaults.orientation = "landscape";
      }
    }
    return defaults;
  }
  static parseSectionProperties(xml) {
    const secPrMatch = xml.match(/<hp:secPr[^>]*>([\s\S]*?)<\/hp:secPr>/);
    if (!secPrMatch) return void 0;
    const content = secPrMatch[0];
    const props = {};
    const textDirMatch = content.match(/textDirection="([^"]*)"/);
    if (textDirMatch) {
      props.textDirection = textDirMatch[1].toLowerCase() === "vertical" ? "vertical" : "horizontal";
    }
    const spaceColsMatch = content.match(/spaceColumns="(\d+)"/);
    if (spaceColsMatch) {
      props.spaceColumns = parseInt(spaceColsMatch[1]) / 100;
    }
    const tabStopMatch = content.match(/tabStop="(\d+)"/);
    if (tabStopMatch) {
      props.tabStop = parseInt(tabStopMatch[1]) / 100;
    }
    const masterPageCntMatch = content.match(/masterPageCnt="(\d+)"/);
    if (masterPageCntMatch) {
      props.masterPageCnt = parseInt(masterPageCntMatch[1]);
    }
    const gridMatch = content.match(/<hp:grid[^>]*lineGrid="(\d+)"[^>]*charGrid="(\d+)"/);
    if (gridMatch) {
      props.grid = {
        lineGrid: parseInt(gridMatch[1]),
        charGrid: parseInt(gridMatch[2])
      };
    }
    const startNumMatch = content.match(/<hp:startNum[^>]*pageStartsOn="([^"]*)"[^>]*page="(\d+)"/);
    if (startNumMatch) {
      props.startNum = {
        pageStartsOn: startNumMatch[1].toLowerCase(),
        page: parseInt(startNumMatch[2])
      };
    }
    const visMatch = content.match(/<hp:visibility[^>]*/);
    if (visMatch) {
      const vis = visMatch[0];
      props.visibility = {
        hideFirstHeader: vis.includes('hideFirstHeader="1"') || vis.includes('hideFirstHeader="true"'),
        hideFirstFooter: vis.includes('hideFirstFooter="1"') || vis.includes('hideFirstFooter="true"'),
        hideFirstMasterPage: vis.includes('hideFirstMasterPage="1"') || vis.includes('hideFirstMasterPage="true"'),
        hideFirstPageNum: vis.includes('hideFirstPageNum="1"') || vis.includes('hideFirstPageNum="true"'),
        showLineNumber: vis.includes('showLineNumber="1"') || vis.includes('showLineNumber="true"')
      };
      const borderMatch = vis.match(/border="([^"]*)"/);
      if (borderMatch) {
        const borderMap = {
          "SHOW_ALL": "showAll",
          "HIDE_ALL": "hideAll",
          "SHOW_FIRST_PAGE_ONLY": "showFirstPageOnly",
          "SHOW_ALL_BUT_FIRST_PAGE": "showAllButFirstPage"
        };
        props.visibility.border = borderMap[borderMatch[1].toUpperCase()] || "showAll";
      }
    }
    const pageBorderFills = [];
    const pbfRegex = /<hp:pageBorderFill[^>]*type="([^"]*)"[^>]*borderFillIDRef="(\d+)"[^>]*>([\s\S]*?)<\/hp:pageBorderFill>/gi;
    let pbfMatch;
    while ((pbfMatch = pbfRegex.exec(content)) !== null) {
      const pbf = {
        type: pbfMatch[1].toLowerCase(),
        borderFillIdRef: parseInt(pbfMatch[2])
      };
      const offsetMatch = pbfMatch[3].match(/<hp:offset[^>]*left="(\d+)"[^>]*right="(\d+)"[^>]*top="(\d+)"[^>]*bottom="(\d+)"/);
      if (offsetMatch) {
        pbf.offset = {
          left: parseInt(offsetMatch[1]) / 100,
          right: parseInt(offsetMatch[2]) / 100,
          top: parseInt(offsetMatch[3]) / 100,
          bottom: parseInt(offsetMatch[4]) / 100
        };
      }
      pageBorderFills.push(pbf);
    }
    if (pageBorderFills.length > 0) {
      props.pageBorderFill = pageBorderFills;
    }
    const masterPages = this.parseMasterPages(content);
    if (masterPages && masterPages.length > 0) {
      props.masterPage = masterPages;
    }
    return props;
  }
  static parseMasterPages(xml) {
    const masterPages = [];
    const masterPageRegex = /<hp:masterPage[^>]*>([\s\S]*?)<\/hp:masterPage>/gi;
    let match;
    while ((match = masterPageRegex.exec(xml)) !== null) {
      const content = match[0];
      const masterPage = {};
      const typeMatch = content.match(/type="([^"]*)"/);
      if (typeMatch) masterPage.type = typeMatch[1].toLowerCase();
      const textWidthMatch = content.match(/textWidth="(\d+)"/);
      if (textWidthMatch) masterPage.textWidth = parseInt(textWidthMatch[1]);
      const textHeightMatch = content.match(/textHeight="(\d+)"/);
      if (textHeightMatch) masterPage.textHeight = parseInt(textHeightMatch[1]);
      const hasTextRefMatch = content.match(/hasTextRef="(true|false|1|0)"/i);
      if (hasTextRefMatch) masterPage.hasTextRef = hasTextRefMatch[1] === "true" || hasTextRefMatch[1] === "1";
      const hasNumRefMatch = content.match(/hasNumRef="(true|false|1|0)"/i);
      if (hasNumRefMatch) masterPage.hasNumRef = hasNumRefMatch[1] === "true" || hasNumRefMatch[1] === "1";
      const paragraphs = [];
      const paraRegex = /<hp:p\b[^>]*>[\s\S]*?<\/hp:p>/g;
      let paraMatch;
      while ((paraMatch = paraRegex.exec(content)) !== null) {
        paragraphs.push(this.parseParagraph(paraMatch[0]));
      }
      if (paragraphs.length > 0) {
        masterPage.paragraphs = paragraphs;
      }
      masterPages.push(masterPage);
    }
    const extMasterPageRegex = /<hp:extMasterPage[^>]*>([\s\S]*?)<\/hp:extMasterPage>/gi;
    while ((match = extMasterPageRegex.exec(xml)) !== null) {
      const content = match[0];
      const masterPage = { isExtended: true };
      const typeMatch = content.match(/type="([^"]*)"/);
      if (typeMatch) masterPage.type = typeMatch[1].toLowerCase();
      const pageNumberMatch = content.match(/pageNumber="(\d+)"/);
      if (pageNumberMatch) masterPage.pageNumber = parseInt(pageNumberMatch[1]);
      const pageDuplicateMatch = content.match(/pageDuplicate="(true|false|1|0)"/i);
      if (pageDuplicateMatch) masterPage.pageDuplicate = pageDuplicateMatch[1] === "true" || pageDuplicateMatch[1] === "1";
      const pageFrontMatch = content.match(/pageFront="(true|false|1|0)"/i);
      if (pageFrontMatch) masterPage.pageFront = pageFrontMatch[1] === "true" || pageFrontMatch[1] === "1";
      const paragraphs = [];
      const paraRegex = /<hp:p\b[^>]*>[\s\S]*?<\/hp:p>/g;
      let paraMatch;
      while ((paraMatch = paraRegex.exec(content)) !== null) {
        paragraphs.push(this.parseParagraph(paraMatch[0]));
      }
      if (paragraphs.length > 0) {
        masterPage.paragraphs = paragraphs;
      }
      masterPages.push(masterPage);
    }
    return masterPages.length > 0 ? masterPages : void 0;
  }
  static parseColumnDef(xml) {
    const colDefMatch = xml.match(/<hp:colDef[^>]*>([\s\S]*?)<\/hp:colDef>/i);
    if (!colDefMatch) return void 0;
    const content = colDefMatch[0];
    const colDef = {};
    const typeMatch = content.match(/type="([^"]*)"/);
    if (typeMatch) colDef.type = typeMatch[1].toLowerCase();
    const countMatch = content.match(/count="(\d+)"/);
    if (countMatch) colDef.count = parseInt(countMatch[1]);
    const layoutMatch = content.match(/layout="([^"]*)"/);
    if (layoutMatch) colDef.layout = layoutMatch[1].toLowerCase();
    const sameSizeMatch = content.match(/sameSize="(true|false|1|0)"/i);
    if (sameSizeMatch) colDef.sameSize = sameSizeMatch[1] === "true" || sameSizeMatch[1] === "1";
    const sameGapMatch = content.match(/sameGap="(\d+)"/);
    if (sameGapMatch) colDef.sameGap = parseInt(sameGapMatch[1]);
    const columnLineMatch = content.match(/<hp:columnLine[^>]*type="([^"]*)"[^>]*width="([^"]*)"[^>]*color="([^"]*)"/i);
    if (columnLineMatch) {
      colDef.columnLine = {
        type: columnLineMatch[1].toLowerCase(),
        width: columnLineMatch[2],
        color: columnLineMatch[3]
      };
    }
    const columns = [];
    const columnRegex = /<hp:column[^>]*width="(\d+)"[^>]*gap="(\d+)"/gi;
    let columnMatch;
    while ((columnMatch = columnRegex.exec(content)) !== null) {
      columns.push({
        width: parseInt(columnMatch[1]),
        gap: parseInt(columnMatch[2])
      });
    }
    if (columns.length > 0) {
      colDef.columns = columns;
    }
    return colDef;
  }
  static parseImageEffects(xml) {
    const effectsMatch = xml.match(/<hp:effects[^>]*>([\s\S]*?)<\/hp:effects>/i);
    if (!effectsMatch) return void 0;
    const content = effectsMatch[1];
    const effects = {};
    const shadowMatch = content.match(/<hp:shadowEffect[^>]*>([\s\S]*?)<\/hp:shadowEffect>/i);
    if (shadowMatch) {
      const shadowContent = shadowMatch[0];
      effects.shadow = {};
      const styleMatch = shadowContent.match(/style="([^"]*)"/);
      if (styleMatch) effects.shadow.style = styleMatch[1];
      const alphaMatch = shadowContent.match(/alpha="([^"]*)"/);
      if (alphaMatch) effects.shadow.alpha = parseFloat(alphaMatch[1]);
      const radiusMatch = shadowContent.match(/radius="([^"]*)"/);
      if (radiusMatch) effects.shadow.radius = parseFloat(radiusMatch[1]);
      const directionMatch = shadowContent.match(/direction="([^"]*)"/);
      if (directionMatch) effects.shadow.direction = parseFloat(directionMatch[1]);
      const distanceMatch = shadowContent.match(/distance="([^"]*)"/);
      if (distanceMatch) effects.shadow.distance = parseFloat(distanceMatch[1]);
      const colorMatch = shadowContent.match(/<hp:effectsColor[^>]*colorR="(\d+)"[^>]*colorG="(\d+)"[^>]*colorB="(\d+)"/i);
      if (colorMatch) {
        effects.shadow.color = `rgb(${colorMatch[1]},${colorMatch[2]},${colorMatch[3]})`;
      }
    }
    const glowMatch = content.match(/<hp:glow[^>]*>([\s\S]*?)<\/hp:glow>/i);
    if (glowMatch) {
      const glowContent = glowMatch[0];
      effects.glow = {};
      const alphaMatch = glowContent.match(/alpha="([^"]*)"/);
      if (alphaMatch) effects.glow.alpha = parseFloat(alphaMatch[1]);
      const radiusMatch = glowContent.match(/radius="([^"]*)"/);
      if (radiusMatch) effects.glow.radius = parseFloat(radiusMatch[1]);
      const colorMatch = glowContent.match(/<hp:effectsColor[^>]*colorR="(\d+)"[^>]*colorG="(\d+)"[^>]*colorB="(\d+)"/i);
      if (colorMatch) {
        effects.glow.color = `rgb(${colorMatch[1]},${colorMatch[2]},${colorMatch[3]})`;
      }
    }
    const softEdgeMatch = content.match(/<hp:softEdge[^>]*radius="([^"]*)"/i);
    if (softEdgeMatch) {
      effects.softEdge = { radius: parseFloat(softEdgeMatch[1]) };
    }
    const reflectionMatch = content.match(/<hp:reflection[^>]*>([\s\S]*?)<\/hp:reflection>|<hp:reflection([^>]*)\/>/i);
    if (reflectionMatch) {
      const refContent = reflectionMatch[0];
      effects.reflection = {};
      const radiusMatch = refContent.match(/radius="([^"]*)"/);
      if (radiusMatch) effects.reflection.radius = parseFloat(radiusMatch[1]);
      const directionMatch = refContent.match(/direction="([^"]*)"/);
      if (directionMatch) effects.reflection.direction = parseFloat(directionMatch[1]);
      const distanceMatch = refContent.match(/distance="([^"]*)"/);
      if (distanceMatch) effects.reflection.distance = parseFloat(distanceMatch[1]);
      const startAlphaMatch = refContent.match(/startAlpha="([^"]*)"/);
      if (startAlphaMatch) effects.reflection.startAlpha = parseFloat(startAlphaMatch[1]);
      const endAlphaMatch = refContent.match(/endAlpha="([^"]*)"/);
      if (endAlphaMatch) effects.reflection.endAlpha = parseFloat(endAlphaMatch[1]);
    }
    return Object.keys(effects).length > 0 ? effects : void 0;
  }
  static parseParagraphsSimple(xml) {
    const paragraphs = [];
    const paragraphRegex = /<hp:p[^>]*>([\s\S]*?)<\/hp:p>/g;
    let match;
    while ((match = paragraphRegex.exec(xml)) !== null) {
      const paragraph = this.parseParagraph(match[0]);
      paragraphs.push(paragraph);
    }
    return paragraphs;
  }
  static parseParagraph(xml) {
    const paragraph = {
      id: generateId(),
      runs: []
    };
    const pTagMatch = xml.match(/^<hp:p\s+([^>]*)>/);
    const pTagAttrs = pTagMatch ? pTagMatch[1] : "";
    const pageBreakMatch = pTagAttrs.match(/pageBreak="([^"]*)"/);
    if (pageBreakMatch && pageBreakMatch[1] === "1") {
      paragraph.pageBreak = true;
    }
    const paraShapeRefMatch = pTagAttrs.match(/paraPrIDRef="(\d+)"/);
    if (paraShapeRefMatch) {
      const paraShape = this.styles.paraShapes.get(parseInt(paraShapeRefMatch[1]));
      if (paraShape) {
        paragraph.paraStyle = {
          align: paraShape.align,
          lineSpacing: paraShape.lineSpacing,
          marginTop: paraShape.marginTop,
          marginBottom: paraShape.marginBottom,
          marginLeft: paraShape.marginLeft,
          marginRight: paraShape.marginRight,
          firstLineIndent: paraShape.firstLineIndent,
          keepWithNext: paraShape.keepWithNext,
          keepLines: paraShape.keepLines
        };
        if (paraShape.pageBreakBefore) {
          paragraph.pageBreak = true;
        }
      }
    }
    let runSearchXml = xml;
    const shapeTagNames = ["hp:pic", "hp:container", "hp:tbl", "hp:drawText"];
    for (const shapeName of shapeTagNames) {
      const shapeBlocks = this.extractBalancedTags(runSearchXml, shapeName);
      for (const block of shapeBlocks) {
        runSearchXml = runSearchXml.replace(block, "");
      }
    }
    const runRegex = /<hp:run[^>]*>([\s\S]*?)<\/hp:run>/g;
    let runMatch;
    while ((runMatch = runRegex.exec(runSearchXml)) !== null) {
      const runContent = runMatch[0];
      const parsedRuns = this.parseRun(runContent);
      paragraph.runs.push(...parsedRuns);
    }
    if (paragraph.runs.length === 0) {
      const textRegex = /<hp:t[^>]*>([^<]*)<\/hp:t>/g;
      let textMatch;
      while ((textMatch = textRegex.exec(xml)) !== null) {
        paragraph.runs.push({ text: this.decodeXmlEntities(textMatch[1]) });
      }
    }
    const listMatch = xml.match(/<hp:lineseg[^>]*listLevel="(\d+)"/);
    if (listMatch) {
      paragraph.listLevel = parseInt(listMatch[1]);
      paragraph.listType = "bullet";
    }
    const linesegRegex = /<hp:lineseg[^>]*vertpos="(\d+)"[^>]*vertsize="(\d+)"[^>]*textheight="(\d+)"[^>]*baseline="(\d+)"[^>]*spacing="(\d+)"/g;
    let linesegMatch;
    const linesegs = [];
    while ((linesegMatch = linesegRegex.exec(xml)) !== null) {
      linesegs.push({
        vertpos: parseInt(linesegMatch[1]) / 100,
        vertsize: parseInt(linesegMatch[2]) / 100,
        textheight: parseInt(linesegMatch[3]) / 100,
        baseline: parseInt(linesegMatch[4]) / 100,
        spacing: parseInt(linesegMatch[5]) / 100
      });
    }
    if (linesegs.length > 0) {
      paragraph.linesegs = linesegs;
    }
    return paragraph;
  }
  static parseRun(xml) {
    const runs = [];
    let charStyle;
    const charShapeRefMatch = xml.match(/charPrIDRef="(\d+)"/);
    if (charShapeRefMatch) {
      const charShape = this.styles.charShapes.get(parseInt(charShapeRefMatch[1]));
      if (charShape) {
        charStyle = {
          fontName: charShape.fontName,
          fontSize: charShape.fontSize,
          bold: charShape.bold,
          italic: charShape.italic,
          underline: charShape.underline,
          underlineType: charShape.underlineType,
          underlineShape: charShape.underlineShape,
          underlineColor: charShape.underlineColor,
          strikethrough: charShape.strikeout ? true : charShape.strikethrough,
          strikeoutShape: charShape.strikeoutShape,
          strikeoutColor: charShape.strikeoutColor,
          fontColor: charShape.color,
          backgroundColor: charShape.backgroundColor,
          charSpacing: charShape.charSpacing,
          relativeSize: charShape.relativeSize ?? charShape.relSize,
          charOffset: charShape.charOffset,
          emphasisMark: charShape.emphasisMark ?? charShape.symMark,
          useFontSpace: charShape.useFontSpace,
          useKerning: charShape.useKerning,
          outline: charShape.outline,
          shadow: charShape.shadow,
          shadowX: charShape.shadowX,
          shadowY: charShape.shadowY,
          shadowColor: charShape.shadowColor,
          emboss: charShape.emboss,
          engrave: charShape.engrave,
          smallCaps: charShape.smallCaps
        };
      }
    }
    let hyperlink;
    let field;
    const fieldBeginMatch = xml.match(/<hp:fieldBegin[^>]*type="([^"]*)"[^>]*>([\s\S]*?)<\/hp:fieldBegin>/i);
    if (fieldBeginMatch) {
      const fieldType = fieldBeginMatch[1].toUpperCase();
      const fieldContent = fieldBeginMatch[2];
      if (fieldType === "HYPERLINK") {
        const paramMatch = fieldContent.match(/<hp:stringParam[^>]*name="URL"[^>]*>([^<]*)<\/hp:stringParam>/i);
        if (paramMatch) {
          hyperlink = {
            fieldType: "hyperlink",
            url: this.decodeXmlEntities(paramMatch[1].trim())
          };
        } else {
          const commandMatch = fieldContent.match(/<hp:stringParam[^>]*name="Command"[^>]*>([^<]*)<\/hp:stringParam>/i);
          if (commandMatch) {
            const urlPart = commandMatch[1].split(";")[0] || commandMatch[1];
            hyperlink = {
              fieldType: "hyperlink",
              url: this.decodeXmlEntities(urlPart.trim())
            };
          }
        }
      } else if (fieldType === "MEMO") {
        const memoField = { fieldType: "memo" };
        const authorMatch = fieldContent.match(/<hp:stringParam[^>]*name="Author"[^>]*>([^<]*)<\/hp:stringParam>/i);
        if (authorMatch) memoField.author = authorMatch[1];
        const dateMatch = fieldContent.match(/<hp:stringParam[^>]*name="CreateDateTime"[^>]*>([^<]*)<\/hp:stringParam>/i);
        if (dateMatch) memoField.date = dateMatch[1];
        const memoTextMatch = fieldContent.match(/<hp:subList[^>]*>[\s\S]*?<hp:t[^>]*>([^<]*)<\/hp:t>/i);
        if (memoTextMatch) memoField.memoContent = memoTextMatch[1];
        field = memoField;
      } else if (fieldType === "FORMULA") {
        const formulaField = { fieldType: "formula" };
        const scriptMatch = fieldContent.match(/<hp:stringParam[^>]*name="(?:Script|Command)"[^>]*>([^<]*)<\/hp:stringParam>/i);
        if (scriptMatch) formulaField.formulaScript = scriptMatch[1];
        field = formulaField;
      } else if (fieldType === "BOOKMARK") {
        const bookmarkField = { fieldType: "bookmark", bookmarkName: "" };
        const nameMatch = fieldContent.match(/<hp:stringParam[^>]*name="(?:Name|BookmarkName)"[^>]*>([^<]*)<\/hp:stringParam>/i);
        if (nameMatch) bookmarkField.bookmarkName = nameMatch[1];
        field = bookmarkField;
      } else {
        const fieldTypeMap = {
          "DATE": "date",
          "DOCDATE": "docDate",
          "PATH": "path",
          "MAILMERGE": "mailMerge",
          "CROSSREF": "crossRef",
          "CLICKHERE": "clickHere",
          "SUMMARY": "summary",
          "USERINFO": "userInfo",
          "REVISIONSIGN": "revisionSign",
          "PRIVATETXT": "privateTxt",
          "TABLEOFCONTENTS": "tableOfContents"
        };
        field = {
          fieldType: fieldTypeMap[fieldType] || "unknown",
          name: fieldBeginMatch[0].match(/name="([^"]*)"/)?.[1]
        };
      }
    }
    if (!hyperlink) {
      const hyperlinkMatch = xml.match(/<hp:ctrl[^>]*>[\s\S]*?<hp:fieldBegin[^>]*type="HYPERLINK"[^>]*(?:param="([^"]*)")?/i);
      if (hyperlinkMatch) {
        const paramStr = hyperlinkMatch[1] || "";
        const urlMatch = paramStr.match(/url:([^;]*)/i) || paramStr.match(/^([^;]+)/);
        if (urlMatch) {
          hyperlink = {
            fieldType: "hyperlink",
            url: this.decodeXmlEntities(urlMatch[1].trim())
          };
        }
      }
    }
    const hasMemo = /<hp:fieldBegin[^>]*type="MEMO"/i.test(xml);
    let memoId;
    if (hasMemo) {
      const memoIdMatch = xml.match(/<hp:fieldBegin[^>]*type="MEMO"[^>]*id="([^"]*)"/i);
      if (memoIdMatch) memoId = memoIdMatch[1];
    }
    if (!memoId) {
      const runMemoIdMatch = xml.match(/<hp:run[^>]*\smemoId="([^"]*)"/i);
      if (runMemoIdMatch) {
        memoId = runMemoIdMatch[1];
      }
    }
    let textSearchXml = xml.replace(/<hp:fieldBegin[^>]*type="MEMO"[^>]*>[\s\S]*?<\/hp:fieldBegin>/gi, "");
    const footnoteMatch = xml.match(/<hp:footNote\b[^>]*number="(\d+)"[^>]*>/i);
    const endnoteMatch = xml.match(/<hp:endNote\b[^>]*number="(\d+)"[^>]*>/i);
    const footnoteNumber = footnoteMatch ? parseInt(footnoteMatch[1]) : null;
    const endnoteNumber = endnoteMatch ? parseInt(endnoteMatch[1]) : null;
    textSearchXml = textSearchXml.replace(/<hp:footNote\b[^>]*>[\s\S]*?<\/hp:footNote>/gi, "");
    textSearchXml = textSearchXml.replace(/<hp:endNote\b[^>]*>[\s\S]*?<\/hp:endNote>/gi, "");
    const allTextTagsRegex = /<hp:t(?:\s[^>]*)?>(?:([\s\S]*?)<\/hp:t>)?|<hp:t\s*\/>/g;
    let tMatch;
    let foundTextTags = false;
    while ((tMatch = allTextTagsRegex.exec(textSearchXml)) !== null) {
      foundTextTags = true;
      const tContent = tMatch[1] || "";
      this.processTextContent(tContent, charStyle, runs, hyperlink, field);
    }
    if (!foundTextTags && !field && !hyperlink) {
      return runs;
    }
    if (runs.length === 0) {
      runs.push({ text: "", charStyle, hyperlink, field });
    }
    if (hasMemo || memoId) {
      for (const run of runs) {
        run.hasMemo = true;
        if (memoId) run.memoId = memoId;
      }
    }
    if (footnoteNumber !== null) {
      runs.push({
        text: `${footnoteNumber})`,
        footnoteRef: footnoteNumber,
        charStyle: { ...charStyle, superscript: true, fontSize: charStyle?.fontSize ? charStyle.fontSize * 0.7 : 7 }
      });
    }
    if (endnoteNumber !== null) {
      runs.push({
        text: `${endnoteNumber})`,
        endnoteRef: endnoteNumber,
        charStyle: { ...charStyle, superscript: true, fontSize: charStyle?.fontSize ? charStyle.fontSize * 0.7 : 7 }
      });
    }
    return runs;
  }
  static processTextContent(tContent, charStyle, runs, hyperlink, field) {
    const specialElementRegex = /<hp:(tab|lineBreak|hypen|nbSpace|fwSpace|titleMark|markPenBegin|markPenEnd|autoNum|newNum|compose|dutmal|indexMark|pageHiding|pageNumCtrl|pageNum)(?:\s+([^>]*))?\s*(?:\/>|>([\s\S]*?)<\/hp:\1>)/gi;
    let lastIndex = 0;
    let specialMatch;
    let currentMarkPenColor;
    while ((specialMatch = specialElementRegex.exec(tContent)) !== null) {
      if (specialMatch.index > lastIndex) {
        const textBefore = tContent.substring(lastIndex, specialMatch.index);
        const cleanText = textBefore.replace(/<[^>]+>/g, "");
        if (cleanText) {
          const run = { text: this.decodeXmlEntities(cleanText), charStyle, hyperlink, field };
          if (currentMarkPenColor) {
            run.markPen = { color: currentMarkPenColor };
          }
          runs.push(run);
        }
      }
      const elementType = specialMatch[1].toLowerCase();
      const attrs = specialMatch[2] || "";
      switch (elementType) {
        case "tab": {
          const widthMatch = attrs.match(/width="(\d+)"/);
          const width = widthMatch ? parseInt(widthMatch[1]) / 100 : 0;
          const leaderMatch = attrs.match(/leader="(\d+)"/);
          const leaderType = leaderMatch ? parseInt(leaderMatch[1]) : 0;
          let leader = "none";
          if (leaderType === 1) leader = "solid";
          else if (leaderType === 2) leader = "dash";
          else if (leaderType === 3) leader = "dot";
          else if (leaderType === 4) leader = "dashDot";
          else if (leaderType === 5) leader = "dashDotDot";
          runs.push({ text: "", charStyle, tab: { width, leader }, hyperlink, field });
          break;
        }
        case "linebreak": {
          runs.push({ text: "\n", charStyle, hyperlink, field });
          break;
        }
        case "hypen": {
          runs.push({ text: "\xAD", charStyle, hyperlink, field });
          break;
        }
        case "nbspace": {
          runs.push({ text: "\xA0", charStyle, hyperlink, field });
          break;
        }
        case "fwspace": {
          runs.push({ text: "\u3000", charStyle, hyperlink, field });
          break;
        }
        case "titlemark": {
          const ignoreMatch = attrs.match(/ignore="(true|false|1|0)"/i);
          const ignore = ignoreMatch ? ignoreMatch[1] === "true" || ignoreMatch[1] === "1" : false;
          runs.push({ text: "", charStyle, hyperlink, field });
          break;
        }
        case "markpenbegin": {
          const colorMatch = attrs.match(/color="([^"]*)"/);
          currentMarkPenColor = colorMatch ? colorMatch[1] : "#FFFF00";
          break;
        }
        case "markpenend": {
          currentMarkPenColor = void 0;
          break;
        }
        case "autonum": {
          const numTypeMatch = attrs.match(/numType="([^"]*)"/);
          const numType = numTypeMatch ? numTypeMatch[1] : "Page";
          runs.push({ text: "", charStyle, hyperlink, field });
          break;
        }
        case "newnum": {
          const numTypeMatch = attrs.match(/numType="([^"]*)"/);
          const numMatch = attrs.match(/num="(\d+)"/);
          runs.push({ text: "", charStyle, hyperlink, field });
          break;
        }
        case "compose": {
          const innerContent = specialMatch[3] || "";
          const composeText = innerContent.replace(/<[^>]+>/g, "");
          if (composeText) {
            runs.push({ text: this.decodeXmlEntities(composeText), charStyle, hyperlink, field });
          }
          break;
        }
        case "dutmal": {
          const mainTextMatch = attrs.match(/mainText="([^"]*)"/);
          const subTextMatch = attrs.match(/subText="([^"]*)"/);
          const mainText = mainTextMatch ? mainTextMatch[1] : "";
          const subText = subTextMatch ? subTextMatch[1] : "";
          if (mainText) {
            runs.push({ text: this.decodeXmlEntities(mainText), charStyle, hyperlink, field });
          }
          break;
        }
        case "indexmark": {
          const keyFirstMatch = attrs.match(/keyFirst="([^"]*)"/);
          const keySecondMatch = attrs.match(/keySecond="([^"]*)"/);
          runs.push({ text: "", charStyle, hyperlink, field });
          break;
        }
        case "pagehiding": {
          runs.push({ text: "", charStyle, hyperlink, field });
          break;
        }
        case "pagenumctrl": {
          runs.push({ text: "", charStyle, hyperlink, field });
          break;
        }
        case "pagenum": {
          runs.push({ text: "#", charStyle, hyperlink, field });
          break;
        }
      }
      lastIndex = specialMatch.index + specialMatch[0].length;
    }
    if (lastIndex < tContent.length) {
      const remainingText = tContent.substring(lastIndex);
      const cleanText = remainingText.replace(/<[^>]+>/g, "");
      if (cleanText) {
        const run = { text: this.decodeXmlEntities(cleanText), charStyle, hyperlink, field };
        if (currentMarkPenColor) {
          run.markPen = { color: currentMarkPenColor };
        }
        runs.push(run);
      }
    } else if (lastIndex === 0 && tContent.length > 0) {
      const cleanText = tContent.replace(/<[^>]+>/g, "");
      if (cleanText) {
        runs.push({ text: this.decodeXmlEntities(cleanText), charStyle, hyperlink, field });
      }
    }
  }
  static parseTable(xml) {
    const table = {
      id: generateId(),
      rows: [],
      columnWidths: []
    };
    const tblTagMatch = xml.match(/<hp:tbl[^>]*>/);
    if (tblTagMatch) {
      const tblAttrs = tblTagMatch[0];
      const idMatch = tblAttrs.match(/\bid="(\d+)"/);
      if (idMatch) table.id = idMatch[1];
      const zOrderMatch = tblAttrs.match(/zOrder="(\d+)"/);
      if (zOrderMatch) table.zOrder = parseInt(zOrderMatch[1]);
      const numTypeMatch = tblAttrs.match(/numberingType="([^"]*)"/);
      if (numTypeMatch) {
        const map = {
          "NONE": "none",
          "PICTURE": "picture",
          "TABLE": "table",
          "EQUATION": "equation"
        };
        table.numberingType = map[numTypeMatch[1].toUpperCase()] || "none";
      }
      const textWrapMatch = tblAttrs.match(/textWrap="([^"]*)"/);
      if (textWrapMatch) {
        const map = {
          "SQUARE": "square",
          "TIGHT": "tight",
          "THROUGH": "through",
          "TOP_AND_BOTTOM": "topAndBottom",
          "BEHIND_TEXT": "behindText",
          "IN_FRONT_OF_TEXT": "inFrontOfText"
        };
        table.textWrap = map[textWrapMatch[1].toUpperCase()] || "square";
      }
      const textFlowMatch = tblAttrs.match(/textFlow="([^"]*)"/);
      if (textFlowMatch) {
        const map = {
          "BOTH_SIDES": "bothSides",
          "LEFT_ONLY": "leftOnly",
          "RIGHT_ONLY": "rightOnly",
          "LARGEST_ONLY": "largestOnly"
        };
        table.textFlow = map[textFlowMatch[1].toUpperCase()] || "bothSides";
      }
      const pageBreakMatch = tblAttrs.match(/pageBreak="([^"]*)"/);
      if (pageBreakMatch) {
        const map = {
          "CELL": "cell",
          "NONE": "none",
          "TABLE": "table"
        };
        table.pageBreak = map[pageBreakMatch[1].toUpperCase()] || "none";
      }
      const repeatHeaderMatch = tblAttrs.match(/repeatHeader="([^"]*)"/);
      if (repeatHeaderMatch) {
        table.repeatHeader = repeatHeaderMatch[1] === "1" || repeatHeaderMatch[1] === "true";
      }
      const rowCntMatch = tblAttrs.match(/rowCnt="(\d+)"/);
      if (rowCntMatch) {
        table.rowCnt = parseInt(rowCntMatch[1]);
        table.rowCount = table.rowCnt;
      }
      const colCntMatch = tblAttrs.match(/colCnt="(\d+)"/);
      if (colCntMatch) {
        table.colCnt = parseInt(colCntMatch[1]);
        table.colCount = table.colCnt;
      }
      const lockMatch = tblAttrs.match(/lock="([^"]*)"/);
      if (lockMatch) {
        table.lock = lockMatch[1] === "1" || lockMatch[1] === "true";
      }
    }
    const szMatch = xml.match(/<hp:sz\s+width="(\d+)"[^>]*height="(\d+)"/);
    if (szMatch) {
      table.width = parseInt(szMatch[1]) / 100;
      table.height = parseInt(szMatch[2]) / 100;
    }
    const cellSpacingMatch = xml.match(/cellSpacing="(\d+)"/);
    if (cellSpacingMatch) {
      table.cellSpacing = parseInt(cellSpacingMatch[1]) / 100;
    }
    const borderFillMatch = xml.match(/borderFillIDRef="(\d+)"/);
    if (borderFillMatch) {
      table.borderFillId = parseInt(borderFillMatch[1]);
    }
    const cellZoneListMatch = xml.match(/<hp:cellzoneList[^>]*>([\s\S]*?)<\/hp:cellzoneList>/i);
    if (cellZoneListMatch) {
      const cellZones = [];
      const cellZoneRegex = /<hp:cellzone[^>]*startRowAddr="(\d+)"[^>]*startColAddr="(\d+)"[^>]*endRowAddr="(\d+)"[^>]*endColAddr="(\d+)"(?:[^>]*borderFillIDRef="(\d+)")?/gi;
      let czMatch;
      while ((czMatch = cellZoneRegex.exec(cellZoneListMatch[1])) !== null) {
        const cellZone = {
          startRowAddr: parseInt(czMatch[1]),
          startColAddr: parseInt(czMatch[2]),
          endRowAddr: parseInt(czMatch[3]),
          endColAddr: parseInt(czMatch[4])
        };
        if (czMatch[5]) cellZone.borderFill = parseInt(czMatch[5]);
        cellZones.push(cellZone);
      }
      if (cellZones.length > 0) {
        table.cellZoneList = cellZones;
      }
    }
    const posMatch = xml.match(/<hp:pos[^>]*>/);
    if (posMatch) {
      const pos = posMatch[0];
      table.position = {};
      if (pos.includes('treatAsChar="1"') || pos.includes('treatAsChar="true"')) {
        table.position.treatAsChar = true;
      }
      if (pos.includes('flowWithText="1"') || pos.includes('flowWithText="true"')) {
        table.position.flowWithText = true;
      }
      const vertRelMatch = pos.match(/vertRelTo="([^"]*)"/);
      if (vertRelMatch) {
        const map = {
          "PAPER": "paper",
          "PAGE": "page",
          "PARA": "para"
        };
        table.position.vertRelTo = map[vertRelMatch[1].toUpperCase()];
      }
      const horzRelMatch = pos.match(/horzRelTo="([^"]*)"/);
      if (horzRelMatch) {
        const map = {
          "PAPER": "paper",
          "PAGE": "page",
          "COLUMN": "column",
          "PARA": "para"
        };
        table.position.horzRelTo = map[horzRelMatch[1].toUpperCase()];
      }
      const vertAlignMatch = pos.match(/vertAlign="([^"]*)"/);
      if (vertAlignMatch) {
        const map = {
          "TOP": "top",
          "CENTER": "center",
          "BOTTOM": "bottom"
        };
        table.position.vertAlign = map[vertAlignMatch[1].toUpperCase()];
      }
      const horzAlignMatch = pos.match(/horzAlign="([^"]*)"/);
      if (horzAlignMatch) {
        const map = {
          "LEFT": "left",
          "CENTER": "center",
          "RIGHT": "right"
        };
        table.position.horzAlign = map[horzAlignMatch[1].toUpperCase()];
      }
      const vertOffsetMatch = pos.match(/vertOffset="(-?\d+)"/);
      if (vertOffsetMatch) {
        table.position.vertOffset = parseInt(vertOffsetMatch[1]) / 100;
      }
      const horzOffsetMatch = pos.match(/horzOffset="(-?\d+)"/);
      if (horzOffsetMatch) {
        table.position.horzOffset = parseInt(horzOffsetMatch[1]) / 100;
      }
    }
    const outMarginTagMatch = xml.match(/<hp:outMargin\s+([^>]*)\/?\s*>/);
    if (outMarginTagMatch) {
      const attrs = outMarginTagMatch[1];
      const leftMatch = attrs.match(/left="(\d+)"/);
      const rightMatch = attrs.match(/right="(\d+)"/);
      const topMatch = attrs.match(/top="(\d+)"/);
      const bottomMatch = attrs.match(/bottom="(\d+)"/);
      table.outMargin = {
        left: leftMatch ? parseInt(leftMatch[1]) / 100 : 0,
        right: rightMatch ? parseInt(rightMatch[1]) / 100 : 0,
        top: topMatch ? parseInt(topMatch[1]) / 100 : 0,
        bottom: bottomMatch ? parseInt(bottomMatch[1]) / 100 : 0
      };
    }
    const inMarginTagMatch = xml.match(/<hp:inMargin\s+([^>]*)\/?\s*>/);
    if (inMarginTagMatch) {
      const attrs = inMarginTagMatch[1];
      const leftMatch = attrs.match(/left="(\d+)"/);
      const rightMatch = attrs.match(/right="(\d+)"/);
      const topMatch = attrs.match(/top="(\d+)"/);
      const bottomMatch = attrs.match(/bottom="(\d+)"/);
      table.inMargin = {
        left: leftMatch ? parseInt(leftMatch[1]) / 100 : 0,
        right: rightMatch ? parseInt(rightMatch[1]) / 100 : 0,
        top: topMatch ? parseInt(topMatch[1]) / 100 : 0,
        bottom: bottomMatch ? parseInt(bottomMatch[1]) / 100 : 0
      };
    }
    const colWidthsMatch = xml.match(/<hp:colSz[^>]*>([\s\S]*?)<\/hp:colSz>/);
    if (colWidthsMatch) {
      const widthRegex = /(\d+)/g;
      let widthMatch;
      while ((widthMatch = widthRegex.exec(colWidthsMatch[1])) !== null) {
        table.columnWidths.push(parseInt(widthMatch[1]) / 100);
      }
    }
    const rows = this.extractBalancedTags(xml, "hp:tr");
    for (const rowXml of rows) {
      const row = this.parseTableRow(rowXml);
      table.rows.push(row);
    }
    const caption = this.parseCaption(xml);
    if (caption) {
      table.caption = caption;
    }
    return table;
  }
  static parseTableRow(xml) {
    const row = { cells: [] };
    const heightMatch = xml.match(/height="(\d+)"/);
    if (heightMatch) {
      row.height = parseInt(heightMatch[1]) / 100;
    }
    const cells = this.extractBalancedTags(xml, "hp:tc");
    for (const cellXml of cells) {
      const cell = this.parseTableCell(cellXml);
      row.cells.push(cell);
    }
    return row;
  }
  static extractBalancedTags(xml, tagName) {
    const results = [];
    const openTag = `<${tagName}`;
    const closeTag = `</${tagName}>`;
    const openTagLen = openTag.length;
    const isExactTagAt = (xml2, idx) => {
      const ch = xml2.charCodeAt(idx + openTagLen);
      return ch === 62 || ch === 32 || ch === 47 || ch === 9 || ch === 10 || ch === 13;
    };
    const findNextExactOpen = (xml2, from) => {
      let p = from;
      while (p < xml2.length) {
        const idx = xml2.indexOf(openTag, p);
        if (idx === -1) return -1;
        if (isExactTagAt(xml2, idx)) return idx;
        p = idx + 1;
      }
      return -1;
    };
    let pos = 0;
    while (pos < xml.length) {
      const startIdx = findNextExactOpen(xml, pos);
      if (startIdx === -1) break;
      let depth = 1;
      let searchPos = startIdx + openTagLen;
      while (depth > 0 && searchPos < xml.length) {
        const nextOpen = findNextExactOpen(xml, searchPos);
        const nextClose = xml.indexOf(closeTag, searchPos);
        if (nextClose === -1) break;
        if (nextOpen !== -1 && nextOpen < nextClose) {
          depth++;
          searchPos = nextOpen + openTagLen;
        } else {
          depth--;
          if (depth === 0) {
            results.push(xml.substring(startIdx, nextClose + closeTag.length));
          }
          searchPos = nextClose + closeTag.length;
        }
      }
      pos = searchPos;
    }
    return results;
  }
  // Extract ALL paragraphs including nested ones (not just top-level)
  static extractAllParagraphs(xml) {
    const results = [];
    const closeTag = "</hp:p>";
    const pOpenRegex = /<hp:p\b[^>]*>/g;
    const pOpenSearchRegex = /<hp:p[\s>]/g;
    let match;
    while ((match = pOpenRegex.exec(xml)) !== null) {
      const startPos = match.index;
      let depth = 1;
      let searchPos = startPos + match[0].length;
      while (depth > 0 && searchPos < xml.length) {
        pOpenSearchRegex.lastIndex = searchPos;
        const nextOpenMatch = pOpenSearchRegex.exec(xml);
        const nextOpen = nextOpenMatch ? nextOpenMatch.index : -1;
        const nextClose = xml.indexOf(closeTag, searchPos);
        if (nextClose === -1) break;
        if (nextOpen !== -1 && nextOpen < nextClose) {
          depth++;
          searchPos = nextOpen + 6;
        } else {
          depth--;
          if (depth === 0) {
            const endPos = nextClose + closeTag.length;
            results.push({
              xml: xml.substring(startPos, endPos),
              start: startPos,
              end: endPos
            });
          }
          searchPos = nextClose + closeTag.length;
        }
      }
    }
    return results;
  }
  static parseTableCell(xml) {
    const cell = { paragraphs: [] };
    const tcTagMatch = xml.match(/<hp:tc[^>]*>/);
    if (tcTagMatch) {
      const tcAttrs = tcTagMatch[0];
      let rowAddrMatch = tcAttrs.match(/rowAddr="(\d+)"/);
      let colAddrMatch = tcAttrs.match(/colAddr="(\d+)"/);
      if (!rowAddrMatch || !colAddrMatch) {
        const cellAddrMatch = xml.match(/<hp:cellAddr[^>]*colAddr="(\d+)"[^>]*rowAddr="(\d+)"/);
        if (cellAddrMatch) {
          cell.colAddr = parseInt(cellAddrMatch[1]);
          cell.rowAddr = parseInt(cellAddrMatch[2]);
        }
      } else {
        if (rowAddrMatch) cell.rowAddr = parseInt(rowAddrMatch[1]);
        if (colAddrMatch) cell.colAddr = parseInt(colAddrMatch[1]);
      }
      const headerMatch = tcAttrs.match(/header="([^"]*)"/);
      if (headerMatch) {
        cell.header = headerMatch[1] === "1" || headerMatch[1] === "true";
      }
      const protectMatch = tcAttrs.match(/protect="([^"]*)"/);
      if (protectMatch) {
        cell.protect = protectMatch[1] === "1" || protectMatch[1] === "true";
      }
      const editableMatch = tcAttrs.match(/editable="([^"]*)"/);
      if (editableMatch) {
        cell.editable = editableMatch[1] === "1" || editableMatch[1] === "true";
      }
      const hasMarginMatch = tcAttrs.match(/hasMargin="([^"]*)"/);
      if (hasMarginMatch) {
        cell.hasMargin = hasMarginMatch[1] === "1" || hasMarginMatch[1] === "true";
      }
    }
    const subListMatch = xml.match(/<hp:subList[^>]*>/);
    const textDirSource = subListMatch ? subListMatch[0] : tcTagMatch ? tcTagMatch[0] : "";
    const textDirMatch = textDirSource.match(/textDirection="([^"]*)"/);
    if (textDirMatch) {
      const dir = textDirMatch[1].toUpperCase();
      if (dir === "VERTICAL" || dir === "VERT") {
        cell.textDirection = "vertical";
      } else {
        cell.textDirection = "horizontal";
      }
    }
    const lineWrapMatch = textDirSource.match(/lineWrap="([^"]*)"/);
    if (lineWrapMatch) {
      const wrapMap = {
        "BREAK": "break",
        "SQUEEZE": "squeeze",
        "KEEP": "keep"
      };
      cell.lineWrap = wrapMap[lineWrapMatch[1].toUpperCase()] || "break";
    }
    if (subListMatch) {
      const vertAlignMatch2 = subListMatch[0].match(/vertAlign="([^"]*)"/);
      if (vertAlignMatch2 && !cell.verticalAlign) {
        const align = vertAlignMatch2[1].toLowerCase();
        if (align === "center" || align === "middle") {
          cell.verticalAlign = "middle";
        } else if (align === "bottom") {
          cell.verticalAlign = "bottom";
        } else {
          cell.verticalAlign = "top";
        }
      }
    }
    const cellSzTagMatch = xml.match(/<hp:cellSz\s+([^>]*)\/?\s*>/);
    if (cellSzTagMatch) {
      const attrs = cellSzTagMatch[1];
      const widthMatch = attrs.match(/width="(\d+)"/);
      const heightMatch = attrs.match(/height="(\d+)"/);
      if (widthMatch) cell.width = parseInt(widthMatch[1]) / 100;
      if (heightMatch) cell.height = parseInt(heightMatch[1]) / 100;
    }
    const cellSpanTagMatch = xml.match(/<hp:cellSpan\s+([^>]*)\/?\s*>/);
    if (cellSpanTagMatch) {
      const attrs = cellSpanTagMatch[1];
      const colSpanMatch = attrs.match(/colSpan="(\d+)"/);
      const rowSpanMatch = attrs.match(/rowSpan="(\d+)"/);
      if (colSpanMatch) cell.colSpan = parseInt(colSpanMatch[1]);
      if (rowSpanMatch) cell.rowSpan = parseInt(rowSpanMatch[1]);
    } else {
      const rowSpanMatch = xml.match(/rowSpan="(\d+)"/);
      if (rowSpanMatch) cell.rowSpan = parseInt(rowSpanMatch[1]);
      const colSpanMatch = xml.match(/colSpan="(\d+)"/);
      if (colSpanMatch) cell.colSpan = parseInt(colSpanMatch[1]);
    }
    const cellMarginTagMatch = xml.match(/<hp:cellMargin\s+([^>]*)\/?\s*>/);
    if (cellMarginTagMatch) {
      const attrs = cellMarginTagMatch[1];
      const leftMatch = attrs.match(/left="(\d+)"/);
      const rightMatch = attrs.match(/right="(\d+)"/);
      const topMatch = attrs.match(/top="(\d+)"/);
      const bottomMatch = attrs.match(/bottom="(\d+)"/);
      if (leftMatch) cell.marginLeft = parseInt(leftMatch[1]) / 100;
      if (rightMatch) cell.marginRight = parseInt(rightMatch[1]) / 100;
      if (topMatch) cell.marginTop = parseInt(topMatch[1]) / 100;
      if (bottomMatch) cell.marginBottom = parseInt(bottomMatch[1]) / 100;
    }
    const vertAlignMatch = xml.match(/vertAlign="([^"]*)"/);
    if (vertAlignMatch) {
      const align = vertAlignMatch[1].toLowerCase();
      if (align === "center" || align === "middle") {
        cell.verticalAlign = "middle";
      } else if (align === "bottom") {
        cell.verticalAlign = "bottom";
      } else {
        cell.verticalAlign = "top";
      }
    }
    const borderFillRefMatch = xml.match(/borderFillIDRef="(\d+)"/);
    if (borderFillRefMatch) {
      const borderFillId = parseInt(borderFillRefMatch[1]);
      cell.borderFillId = borderFillId;
      const borderFill = this.styles.borderFills.get(borderFillId);
      if (borderFill) {
        if (borderFill.fillColor) {
          cell.backgroundColor = borderFill.fillColor;
        }
        if (borderFill.gradation && borderFill.gradation.colors.length > 0) {
          cell.backgroundGradation = {
            type: borderFill.gradation.type,
            angle: borderFill.gradation.angle,
            colors: borderFill.gradation.colors
          };
        }
        if (borderFill.leftBorder) {
          cell.borderLeft = borderFill.leftBorder;
        }
        if (borderFill.rightBorder) {
          cell.borderRight = borderFill.rightBorder;
        }
        if (borderFill.topBorder) {
          cell.borderTop = borderFill.topBorder;
        }
        if (borderFill.bottomBorder) {
          cell.borderBottom = borderFill.bottomBorder;
        }
      }
    }
    if (!cell.backgroundColor) {
      const bgColorMatch = xml.match(/faceColor="([^"]*)"/);
      if (bgColorMatch && bgColorMatch[1] !== "none") {
        cell.backgroundColor = bgColorMatch[1];
      }
    }
    const subLists = this.extractBalancedTags(xml, "hp:subList");
    const contentXml = subLists.length > 0 ? subLists[0].replace(/^<hp:subList[^>]*>/, "").replace(/<\/hp:subList>$/, "") : xml;
    this.parseCellContent(contentXml, cell);
    return cell;
  }
  static parseCellContent(contentXml, cell) {
    const cleanedXml = contentXml.replace(/<hp:fieldBegin[^>]*type="MEMO"[^>]*>[\s\S]*?<\/hp:fieldBegin>/gi, "");
    const nestedTables = this.extractBalancedTags(cleanedXml, "hp:tbl");
    const nestedImages = this.extractBalancedTags(cleanedXml, "hp:pic");
    const excludeRanges = [];
    for (const tableXml of nestedTables) {
      const tableIndex = cleanedXml.indexOf(tableXml);
      if (tableIndex >= 0) {
        excludeRanges.push({ start: tableIndex, end: tableIndex + tableXml.length, type: "tbl", xml: tableXml });
      }
    }
    for (const picXml of nestedImages) {
      const picIndex = cleanedXml.indexOf(picXml);
      if (picIndex >= 0) {
        const isInsideTable = excludeRanges.some(
          (range) => range.type === "tbl" && picIndex > range.start && picIndex < range.end
        );
        if (!isInsideTable) {
          excludeRanges.push({ start: picIndex, end: picIndex + picXml.length, type: "pic", xml: picXml });
        }
      }
    }
    if (nestedTables.length > 0 || nestedImages.length > 0) {
      cell.nestedTables = [];
      cell.elements = [];
      const allParagraphs = this.extractAllParagraphs(cleanedXml);
      const elements = [];
      for (const para of allParagraphs) {
        const isInsideExcluded = excludeRanges.some(
          (range) => para.start > range.start && para.start < range.end
        );
        if (isInsideExcluded) continue;
        const containsExcluded = excludeRanges.some(
          (range) => range.start >= para.start && range.end <= para.end
        );
        if (containsExcluded) {
          let paraXmlWithoutExcluded = para.xml;
          for (const range of excludeRanges) {
            if (range.start >= para.start && range.end <= para.end) {
              const startInPara = range.start - para.start;
              const endInPara = range.end - para.start;
              const excludedXmlInPara = para.xml.substring(startInPara, endInPara);
              paraXmlWithoutExcluded = paraXmlWithoutExcluded.replace(excludedXmlInPara, "");
            }
          }
          const hasTextContent = /<hp:t\b[^>]*>/.test(paraXmlWithoutExcluded);
          if (hasTextContent) {
            elements.push({ index: para.start, type: "p", xml: paraXmlWithoutExcluded });
          }
        } else {
          elements.push({ index: para.start, type: "p", xml: para.xml });
        }
      }
      for (const range of excludeRanges) {
        elements.push({ index: range.start, type: range.type, xml: range.xml });
      }
      elements.sort((a, b) => a.index - b.index);
      for (const el of elements) {
        if (el.type === "p") {
          const paragraph = this.parseParagraph(el.xml);
          cell.paragraphs.push(paragraph);
          cell.elements.push({ type: "paragraph", data: paragraph });
        } else if (el.type === "tbl") {
          const nestedTable = this.parseTable(el.xml);
          cell.nestedTables.push(nestedTable);
          cell.elements.push({ type: "table", data: nestedTable });
        } else if (el.type === "pic") {
          const caption = this.parseCaption(el.xml);
          if (caption) {
            const image = { id: generateId(), binaryId: "", width: 0, height: 0, caption };
            cell.elements.push({ type: "image", data: image });
          }
        }
      }
    } else {
      cell.elements = [];
      const paragraphs = this.extractBalancedTags(cleanedXml, "hp:p");
      for (const pXml of paragraphs) {
        const paragraph = this.parseParagraph(pXml);
        cell.paragraphs.push(paragraph);
        cell.elements.push({ type: "paragraph", data: paragraph });
      }
    }
  }
  static parseImageElement(xml, content) {
    let binaryRefMatch = xml.match(/<hc:img[^>]*binaryItemIDRef="([^"]*)"/);
    if (!binaryRefMatch) {
      binaryRefMatch = xml.match(/binaryItemIDRef="([^"]*)"/);
    }
    if (!binaryRefMatch) return null;
    const imageId = binaryRefMatch[1];
    const existingImage = content.images.get(imageId);
    const image = {
      id: generateId(),
      binaryId: imageId,
      width: 100,
      height: 100,
      data: existingImage?.data,
      mimeType: existingImage?.mimeType
    };
    const szMatch = xml.match(/<hp:sz\s+width="(\d+)"[^>]*height="(\d+)"/);
    if (szMatch) {
      image.width = parseInt(szMatch[1]) / 100;
      image.height = parseInt(szMatch[2]) / 100;
    }
    const orgSzMatch = xml.match(/<hp:orgSz\s+width="(\d+)"[^>]*height="(\d+)"/);
    if (orgSzMatch) {
      image.orgWidth = parseInt(orgSzMatch[1]) / 100;
      image.orgHeight = parseInt(orgSzMatch[2]) / 100;
      if (!szMatch) {
        image.width = image.orgWidth;
        image.height = image.orgHeight;
      }
    }
    const picTagMatch = xml.match(/<hp:pic[^>]*>/);
    if (picTagMatch) {
      const picAttrs = picTagMatch[0];
      const zOrderMatch = picAttrs.match(/zOrder="(\d+)"/);
      if (zOrderMatch) image.zOrder = parseInt(zOrderMatch[1]);
      const numTypeMatch = picAttrs.match(/numberingType="([^"]*)"/);
      if (numTypeMatch) {
        const map = {
          "NONE": "none",
          "PICTURE": "picture",
          "TABLE": "table",
          "EQUATION": "equation"
        };
        image.numberingType = map[numTypeMatch[1].toUpperCase()] || "none";
      }
      const textWrapMatch = picAttrs.match(/textWrap="([^"]*)"/);
      if (textWrapMatch) {
        const map = {
          "SQUARE": "square",
          "TIGHT": "tight",
          "THROUGH": "through",
          "TOP_AND_BOTTOM": "topAndBottom",
          "BEHIND_TEXT": "behindText",
          "IN_FRONT_OF_TEXT": "inFrontOfText"
        };
        image.textWrap = map[textWrapMatch[1].toUpperCase()] || "square";
      }
      const textFlowMatch = picAttrs.match(/textFlow="([^"]*)"/);
      if (textFlowMatch) {
        const map = {
          "BOTH_SIDES": "bothSides",
          "LEFT_ONLY": "leftOnly",
          "RIGHT_ONLY": "rightOnly",
          "LARGEST_ONLY": "largestOnly"
        };
        image.textFlow = map[textFlowMatch[1].toUpperCase()] || "bothSides";
      }
    }
    const posMatch = xml.match(/<hp:pos[^>]*>/);
    if (posMatch) {
      const pos = posMatch[0];
      image.position = {};
      if (pos.includes('treatAsChar="1"') || pos.includes('treatAsChar="true"')) {
        image.position.treatAsChar = true;
      }
      if (pos.includes('affectLSpacing="1"') || pos.includes('affectLSpacing="true"')) {
        image.position.affectLSpacing = true;
      }
      if (pos.includes('flowWithText="1"') || pos.includes('flowWithText="true"')) {
        image.position.flowWithText = true;
      }
      if (pos.includes('allowOverlap="1"') || pos.includes('allowOverlap="true"')) {
        image.position.allowOverlap = true;
      }
      if (pos.includes('holdAnchorAndSO="1"') || pos.includes('holdAnchorAndSO="true"')) {
        image.position.holdAnchorAndSO = true;
      }
      const vertRelMatch = pos.match(/vertRelTo="([^"]*)"/);
      if (vertRelMatch) {
        const map = {
          "PAPER": "paper",
          "PAGE": "page",
          "PARA": "para"
        };
        image.position.vertRelTo = map[vertRelMatch[1].toUpperCase()];
      }
      const horzRelMatch = pos.match(/horzRelTo="([^"]*)"/);
      if (horzRelMatch) {
        const map = {
          "PAPER": "paper",
          "PAGE": "page",
          "COLUMN": "column",
          "PARA": "para"
        };
        image.position.horzRelTo = map[horzRelMatch[1].toUpperCase()];
      }
      const vertAlignMatch = pos.match(/vertAlign="([^"]*)"/);
      if (vertAlignMatch) {
        const map = {
          "TOP": "top",
          "CENTER": "center",
          "BOTTOM": "bottom",
          "INSIDE": "inside",
          "OUTSIDE": "outside"
        };
        image.position.vertAlign = map[vertAlignMatch[1].toUpperCase()];
      }
      const horzAlignMatch = pos.match(/horzAlign="([^"]*)"/);
      if (horzAlignMatch) {
        const map = {
          "LEFT": "left",
          "CENTER": "center",
          "RIGHT": "right",
          "INSIDE": "inside",
          "OUTSIDE": "outside"
        };
        image.position.horzAlign = map[horzAlignMatch[1].toUpperCase()];
      }
      const vertOffsetMatch = pos.match(/vertOffset="(-?\d+)"/);
      if (vertOffsetMatch) {
        image.position.vertOffset = parseInt(vertOffsetMatch[1]) / 100;
      }
      const horzOffsetMatch = pos.match(/horzOffset="(-?\d+)"/);
      if (horzOffsetMatch) {
        image.position.horzOffset = parseInt(horzOffsetMatch[1]) / 100;
      }
    }
    const outMarginMatch = xml.match(/<hp:outMargin[^>]*left="(\d+)"[^>]*right="(\d+)"[^>]*top="(\d+)"[^>]*bottom="(\d+)"/);
    if (outMarginMatch) {
      image.outMargin = {
        left: parseInt(outMarginMatch[1]) / 100,
        right: parseInt(outMarginMatch[2]) / 100,
        top: parseInt(outMarginMatch[3]) / 100,
        bottom: parseInt(outMarginMatch[4]) / 100
      };
    }
    const flipMatch = xml.match(/<hc:flip[^>]*horizontal="([^"]*)"[^>]*vertical="([^"]*)"/);
    if (flipMatch) {
      image.flip = {
        horizontal: flipMatch[1] === "1" || flipMatch[1] === "true",
        vertical: flipMatch[2] === "1" || flipMatch[2] === "true"
      };
    }
    const rotationMatch = xml.match(/<hp:rotationInfo[^>]*angle="(-?\d+)"(?:[^>]*centerX="(\d+)")?(?:[^>]*centerY="(\d+)")?/);
    if (rotationMatch) {
      image.rotation = {
        angle: parseInt(rotationMatch[1]),
        centerX: rotationMatch[2] ? parseInt(rotationMatch[2]) / 100 : void 0,
        centerY: rotationMatch[3] ? parseInt(rotationMatch[3]) / 100 : void 0
      };
    }
    const imgEffectMatch = xml.match(/<hc:imgEffect[^>]*>/);
    if (imgEffectMatch) {
      const effect = imgEffectMatch[0];
      const brightnessMatch = effect.match(/brightness="(-?\d+)"/);
      if (brightnessMatch) {
        image.brightness = parseInt(brightnessMatch[1]);
      }
      const contrastMatch = effect.match(/contrast="(-?\d+)"/);
      if (contrastMatch) {
        image.contrast = parseInt(contrastMatch[1]);
      }
    }
    const alphaMatch = xml.match(/<hc:img[^>]*alpha="(\d+)"/);
    if (alphaMatch) {
      image.alpha = parseInt(alphaMatch[1]) / 255;
    }
    const shapeCommentMatch = xml.match(/<hp:shapeComment>([^<]*)<\/hp:shapeComment>/);
    if (shapeCommentMatch) {
      image.shapeComment = shapeCommentMatch[1];
    }
    const caption = this.parseCaption(xml);
    if (caption) {
      image.caption = caption;
    }
    return image;
  }
  static parseCaption(xml) {
    const captionBlocks = this.extractBalancedTags(xml, "hp:caption");
    if (captionBlocks.length === 0) return void 0;
    const captionXml = captionBlocks[0];
    const caption = {};
    const sideMatch = captionXml.match(/<hp:caption[^>]*side="([^"]*)"/);
    if (sideMatch) {
      const sideMap = {
        "LEFT": "Left",
        "RIGHT": "Right",
        "TOP": "Top",
        "BOTTOM": "Bottom"
      };
      caption.side = sideMap[sideMatch[1].toUpperCase()] || "Bottom";
    }
    const paragraphs = [];
    const pBlocks = this.extractBalancedTags(captionXml, "hp:p");
    for (const pXml of pBlocks) {
      const para = this.parseParagraph(pXml);
      if (para.runs.length > 0) {
        paragraphs.push(para);
      }
    }
    for (const shapeName of ["hp:pic", "hp:tbl"]) {
      const nestedShapes = this.extractBalancedTags(captionXml, shapeName);
      for (const shapeXml of nestedShapes) {
        const nestedCaption = this.parseCaption(shapeXml);
        if (nestedCaption?.paragraphs) {
          paragraphs.push(...nestedCaption.paragraphs);
        }
      }
    }
    if (paragraphs.length > 0) {
      caption.paragraphs = paragraphs;
    }
    return caption.paragraphs ? caption : void 0;
  }
  static decodeXmlEntities(text) {
    return text.replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"').replace(/&apos;/g, "'");
  }
  static async updateZip(zip, content) {
    for (let sectionIndex = 0; sectionIndex < content.sections.length; sectionIndex++) {
      const sectionPath = `Contents/section${sectionIndex}.xml`;
      const existingXml = await this.readXmlFile(zip, sectionPath);
      if (existingXml) {
        const updatedXml = this.updateSectionXml(existingXml, content.sections[sectionIndex]);
        zip.file(sectionPath, updatedXml);
      }
    }
  }
  static updateSectionXml(xml, section) {
    let updatedXml = xml;
    let elementIndex = 0;
    const paragraphElements = section.elements.filter((e) => e.type === "paragraph");
    const paragraphRegex = /<hp:p[^>]*>([\s\S]*?)<\/hp:p>/g;
    updatedXml = xml.replace(paragraphRegex, (match) => {
      if (elementIndex < paragraphElements.length) {
        const paragraph = paragraphElements[elementIndex].data;
        elementIndex++;
        return this.updateParagraphXml(match, paragraph);
      }
      elementIndex++;
      return match;
    });
    return updatedXml;
  }
  static updateParagraphXml(xml, paragraph) {
    const fullText = paragraph.runs.map((r) => r.text).join("");
    const textTagRegex = /(<hp:t[^>]*>)[^<]*(<\/hp:t>)/;
    if (textTagRegex.test(xml)) {
      return xml.replace(textTagRegex, `$1${this.escapeXml(fullText)}$2`);
    }
    return xml;
  }
  static escapeXml(text) {
    return text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&apos;");
  }
  static parseLine(xml) {
    const x1 = this.parseNumber(xml, /x1="([^"]*)"/) || this.parseNumber(xml, /startX="([^"]*)"/);
    const y1 = this.parseNumber(xml, /y1="([^"]*)"/) || this.parseNumber(xml, /startY="([^"]*)"/);
    const x2 = this.parseNumber(xml, /x2="([^"]*)"/) || this.parseNumber(xml, /endX="([^"]*)"/);
    const y2 = this.parseNumber(xml, /y2="([^"]*)"/) || this.parseNumber(xml, /endY="([^"]*)"/);
    const strokeColor = xml.match(/(?:stroke|lineColor)="([^"]*)"/)?.[1];
    const strokeWidth = this.parseNumber(xml, /(?:strokeWidth|lineWidth)="([^"]*)"/);
    return {
      id: generateId(),
      x1: x1 || 0,
      y1: y1 || 0,
      x2: x2 || 100,
      y2: y2 || 0,
      strokeColor: strokeColor || "#000000",
      strokeWidth: strokeWidth || 1,
      strokeStyle: "solid"
    };
  }
  static parseRect(xml) {
    const x = this.parseNumber(xml, /(?:x|left)="([^"]*)"/);
    const y = this.parseNumber(xml, /(?:y|top)="([^"]*)"/);
    const width = this.parseNumber(xml, /width="([^"]*)"/);
    const height = this.parseNumber(xml, /height="([^"]*)"/);
    const fillColor = xml.match(/(?:fill|fillColor)="([^"]*)"/)?.[1];
    const strokeColor = xml.match(/(?:stroke|lineColor)="([^"]*)"/)?.[1];
    const cornerRadius = this.parseNumber(xml, /(?:rx|cornerRadius)="([^"]*)"/);
    return {
      id: generateId(),
      x: x || 0,
      y: y || 0,
      width: width || 100,
      height: height || 50,
      fillColor,
      strokeColor: strokeColor || "#000000",
      strokeWidth: 1,
      cornerRadius
    };
  }
  static parseEllipse(xml) {
    const cx = this.parseNumber(xml, /(?:cx|centerX)="([^"]*)"/);
    const cy = this.parseNumber(xml, /(?:cy|centerY)="([^"]*)"/);
    const rx = this.parseNumber(xml, /(?:rx|radiusX)="([^"]*)"/);
    const ry = this.parseNumber(xml, /(?:ry|radiusY)="([^"]*)"/);
    const fillColor = xml.match(/(?:fill|fillColor)="([^"]*)"/)?.[1];
    const strokeColor = xml.match(/(?:stroke|lineColor)="([^"]*)"/)?.[1];
    return {
      id: generateId(),
      cx: cx || 50,
      cy: cy || 50,
      rx: rx || 50,
      ry: ry || 50,
      fillColor,
      strokeColor: strokeColor || "#000000",
      strokeWidth: 1
    };
  }
  static parseTextBox(xml) {
    const x = this.parseNumber(xml, /(?:x|left)="([^"]*)"/);
    const y = this.parseNumber(xml, /(?:y|top)="([^"]*)"/);
    const width = this.parseNumber(xml, /width="([^"]*)"/);
    const height = this.parseNumber(xml, /height="([^"]*)"/);
    const fillColor = xml.match(/(?:fill|fillColor)="([^"]*)"/)?.[1];
    const strokeColor = xml.match(/(?:stroke|lineColor)="([^"]*)"/)?.[1];
    const paragraphs = [];
    const paragraphRegex = /<hp:p[^>]*>([\s\S]*?)<\/hp:p>/g;
    let match;
    while ((match = paragraphRegex.exec(xml)) !== null) {
      paragraphs.push(this.parseParagraph(match[0]));
    }
    return {
      id: generateId(),
      x: x || 0,
      y: y || 0,
      width: width || 200,
      height: height || 100,
      paragraphs,
      fillColor,
      strokeColor,
      strokeWidth: strokeColor ? 1 : 0
    };
  }
  static parseHorizontalRules(xml, section) {
    const hrOnlyPatterns = [
      /^[\s]*[─]{10,}[\s]*$/,
      /^[\s]*[━]{10,}[\s]*$/,
      /^[\s]*[═]{10,}[\s]*$/,
      /^[\s]*[▬]{10,}[\s]*$/,
      /^[\s]*[-]{20,}[\s]*$/
    ];
    for (let i = 0; i < section.elements.length; i++) {
      const el = section.elements[i];
      if (el.type === "paragraph") {
        const text = el.data.runs.map((r) => r.text).join("").trim();
        const isHrOnly = hrOnlyPatterns.some((pattern) => pattern.test(text));
        if (isHrOnly) {
          section.elements[i] = {
            type: "hr",
            data: {
              id: generateId(),
              width: "full",
              height: 1,
              color: "#000000",
              style: "solid",
              align: "center"
            }
          };
        }
      }
    }
  }
  static parseNumber(xml, regex) {
    const match = xml.match(regex);
    if (match) {
      const val = parseFloat(match[1]);
      return isNaN(val) ? void 0 : val / 100;
    }
    return void 0;
  }
  static parseShapeObject(xml) {
    const szMatch = xml.match(/<hp:sz\s+width="(\d+)"[^>]*height="(\d+)"/);
    const posMatch = xml.match(/<hp:pos[^>]*>/);
    if (!szMatch && !posMatch) return void 0;
    const shapeObject = {};
    if (szMatch) {
      shapeObject.size = {
        width: parseInt(szMatch[1]) / 100,
        height: parseInt(szMatch[2]) / 100
      };
    }
    if (posMatch) {
      const pos = posMatch[0];
      shapeObject.position = {};
      if (pos.includes('treatAsChar="1"') || pos.includes('treatAsChar="true"')) {
        shapeObject.position.treatAsChar = true;
      }
      const vertRelMatch = pos.match(/vertRelTo="([^"]*)"/);
      if (vertRelMatch) {
        const map = {
          "PAPER": "paper",
          "PAGE": "page",
          "PARA": "para"
        };
        shapeObject.position.vertRelTo = map[vertRelMatch[1].toUpperCase()];
      }
      const horzRelMatch = pos.match(/horzRelTo="([^"]*)"/);
      if (horzRelMatch) {
        const map = {
          "PAPER": "paper",
          "PAGE": "page",
          "COLUMN": "column",
          "PARA": "para"
        };
        shapeObject.position.horzRelTo = map[horzRelMatch[1].toUpperCase()];
      }
      const vertOffsetMatch = pos.match(/vertOffset="(-?\d+)"/);
      if (vertOffsetMatch) {
        shapeObject.position.vertOffset = parseInt(vertOffsetMatch[1]) / 100;
      }
      const horzOffsetMatch = pos.match(/horzOffset="(-?\d+)"/);
      if (horzOffsetMatch) {
        shapeObject.position.horzOffset = parseInt(horzOffsetMatch[1]) / 100;
      }
    }
    const instIdMatch = xml.match(/instId="([^"]*)"/);
    if (instIdMatch) shapeObject.instId = instIdMatch[1];
    const zOrderMatch = xml.match(/zOrder="(\d+)"/);
    if (zOrderMatch) shapeObject.zOrder = parseInt(zOrderMatch[1]);
    return shapeObject;
  }
  static parseDrawingObject(xml) {
    const drawingObject = {};
    const lineShapeMatch = xml.match(/<hc:lineShape[^>]*(?:\/>|>([\s\S]*?)<\/hc:lineShape>)/);
    if (lineShapeMatch) {
      const content = lineShapeMatch[0];
      drawingObject.lineShape = {
        color: content.match(/color="([^"]*)"/)?.[1],
        width: this.parseNumber(content, /width="([^"]*)"/)
      };
      const styleMatch = content.match(/style="([^"]*)"/);
      if (styleMatch) {
        const styleMap = {
          "SOLID": "Solid",
          "DASH": "Dash",
          "DOT": "Dot",
          "DASH_DOT": "DashDot"
        };
        drawingObject.lineShape.style = styleMap[styleMatch[1].toUpperCase()] || "Solid";
      }
    }
    const fillBrushMatch = xml.match(/<hc:fillBrush[^>]*>([\s\S]*?)<\/hc:fillBrush>/);
    if (fillBrushMatch) {
      drawingObject.fillBrush = {};
      const fillContent = fillBrushMatch[1];
      const winBrushMatch = fillContent.match(/<hc:winBrush[^>]*faceColor="([^"]*)"/);
      if (winBrushMatch) {
        drawingObject.fillBrush.windowBrush = { faceColor: winBrushMatch[1] };
      }
    }
    return Object.keys(drawingObject).length > 0 ? drawingObject : void 0;
  }
  static parseArc(xml) {
    const arc = {
      id: generateId(),
      centerX: 0,
      centerY: 0
    };
    const typeMatch = xml.match(/\btype="([^"]*)"/);
    if (typeMatch) {
      const typeMap = {
        "NORMAL": "Normal",
        "PIE": "Pie",
        "CHORD": "Chord"
      };
      arc.type = typeMap[typeMatch[1].toUpperCase()] || "Normal";
    }
    const centerXMatch = xml.match(/centerX="(-?\d+)"/);
    if (centerXMatch) arc.centerX = parseInt(centerXMatch[1]) / 100;
    const centerYMatch = xml.match(/centerY="(-?\d+)"/);
    if (centerYMatch) arc.centerY = parseInt(centerYMatch[1]) / 100;
    const axis1XMatch = xml.match(/axis1X="(-?\d+)"/);
    if (axis1XMatch) arc.axis1X = parseInt(axis1XMatch[1]) / 100;
    const axis1YMatch = xml.match(/axis1Y="(-?\d+)"/);
    if (axis1YMatch) arc.axis1Y = parseInt(axis1YMatch[1]) / 100;
    const axis2XMatch = xml.match(/axis2X="(-?\d+)"/);
    if (axis2XMatch) arc.axis2X = parseInt(axis2XMatch[1]) / 100;
    const axis2YMatch = xml.match(/axis2Y="(-?\d+)"/);
    if (axis2YMatch) arc.axis2Y = parseInt(axis2YMatch[1]) / 100;
    arc.shapeObject = this.parseShapeObject(xml);
    arc.drawingObject = this.parseDrawingObject(xml);
    return arc;
  }
  static parsePolygon(xml) {
    const polygon = {
      id: generateId(),
      points: []
    };
    const pointRegex = /<(?:hp:|hc:)?pt[^>]*x="(-?\d+)"[^>]*y="(-?\d+)"/gi;
    let pointMatch;
    while ((pointMatch = pointRegex.exec(xml)) !== null) {
      polygon.points.push({
        x: parseInt(pointMatch[1]) / 100,
        y: parseInt(pointMatch[2]) / 100
      });
    }
    if (polygon.points.length === 0) {
      const altPointRegex = /<(?:hp:|hc:)?point[^>]*x="(-?\d+)"[^>]*y="(-?\d+)"/gi;
      while ((pointMatch = altPointRegex.exec(xml)) !== null) {
        polygon.points.push({
          x: parseInt(pointMatch[1]) / 100,
          y: parseInt(pointMatch[2]) / 100
        });
      }
    }
    polygon.shapeObject = this.parseShapeObject(xml);
    polygon.drawingObject = this.parseDrawingObject(xml);
    return polygon;
  }
  static parseCurve(xml) {
    const curve = {
      id: generateId(),
      segments: []
    };
    const segmentRegex = /<(?:hp:|hc:)?seg[^>]*type="([^"]*)"[^>]*x1="(-?\d+)"[^>]*y1="(-?\d+)"[^>]*x2="(-?\d+)"[^>]*y2="(-?\d+)"/gi;
    let segMatch;
    while ((segMatch = segmentRegex.exec(xml)) !== null) {
      const segment = {
        type: segMatch[1].toUpperCase() === "CURVE" ? "Curve" : "Line",
        x1: parseInt(segMatch[2]) / 100,
        y1: parseInt(segMatch[3]) / 100,
        x2: parseInt(segMatch[4]) / 100,
        y2: parseInt(segMatch[5]) / 100
      };
      curve.segments.push(segment);
    }
    curve.shapeObject = this.parseShapeObject(xml);
    curve.drawingObject = this.parseDrawingObject(xml);
    return curve;
  }
  static parseConnectLine(xml) {
    const connectLine = {
      id: generateId()
    };
    const typeMatch = xml.match(/\btype="([^"]*)"/);
    if (typeMatch) connectLine.type = typeMatch[1];
    const startXMatch = xml.match(/startX="(-?\d+)"/);
    if (startXMatch) connectLine.startX = parseInt(startXMatch[1]) / 100;
    const startYMatch = xml.match(/startY="(-?\d+)"/);
    if (startYMatch) connectLine.startY = parseInt(startYMatch[1]) / 100;
    const endXMatch = xml.match(/endX="(-?\d+)"/);
    if (endXMatch) connectLine.endX = parseInt(endXMatch[1]) / 100;
    const endYMatch = xml.match(/endY="(-?\d+)"/);
    if (endYMatch) connectLine.endY = parseInt(endYMatch[1]) / 100;
    const startSubjectIDMatch = xml.match(/startSubjectID="([^"]*)"/);
    if (startSubjectIDMatch) connectLine.startSubjectID = startSubjectIDMatch[1];
    const startSubjectIndexMatch = xml.match(/startSubjectIndex="(\d+)"/);
    if (startSubjectIndexMatch) connectLine.startSubjectIndex = parseInt(startSubjectIndexMatch[1]);
    const endSubjectIDMatch = xml.match(/endSubjectID="([^"]*)"/);
    if (endSubjectIDMatch) connectLine.endSubjectID = endSubjectIDMatch[1];
    const endSubjectIndexMatch = xml.match(/endSubjectIndex="(\d+)"/);
    if (endSubjectIndexMatch) connectLine.endSubjectIndex = parseInt(endSubjectIndexMatch[1]);
    connectLine.shapeObject = this.parseShapeObject(xml);
    connectLine.drawingObject = this.parseDrawingObject(xml);
    return connectLine;
  }
  static parseContainer(xml, content) {
    const container = {
      id: generateId(),
      children: []
    };
    container.shapeObject = this.parseShapeObject(xml);
    const lineMatches = xml.matchAll(/<hp:line\b[^>]*(?:\/>|>[\s\S]*?<\/hp:line>)/g);
    for (const match of lineMatches) {
      container.children.push(this.parseLine(match[0]));
    }
    const rectMatches = xml.matchAll(/<hp:rect\b[^>]*(?:\/>|>[\s\S]*?<\/hp:rect>)/g);
    for (const match of rectMatches) {
      container.children.push(this.parseRect(match[0]));
    }
    const ellipseMatches = xml.matchAll(/<hp:ellipse\b[^>]*(?:\/>|>[\s\S]*?<\/hp:ellipse>)/g);
    for (const match of ellipseMatches) {
      container.children.push(this.parseEllipse(match[0]));
    }
    const arcMatches = xml.matchAll(/<hp:arc\b[^>]*(?:\/>|>[\s\S]*?<\/hp:arc>)/g);
    for (const match of arcMatches) {
      container.children.push(this.parseArc(match[0]));
    }
    const polygonMatches = xml.matchAll(/<hp:polygon\b[^>]*(?:\/>|>[\s\S]*?<\/hp:polygon>)/g);
    for (const match of polygonMatches) {
      container.children.push(this.parsePolygon(match[0]));
    }
    const curveMatches = xml.matchAll(/<hp:curve\b[^>]*(?:\/>|>[\s\S]*?<\/hp:curve>)/g);
    for (const match of curveMatches) {
      container.children.push(this.parseCurve(match[0]));
    }
    const picMatches = xml.matchAll(/<hp:pic\b[^>]*>[\s\S]*?<\/hp:pic>/g);
    for (const match of picMatches) {
      const image = this.parseImageElement(match[0], content);
      if (image) container.children.push(image);
    }
    const nestedContainerMatches = xml.matchAll(/<hp:container\b[^>]*>[\s\S]*?<\/hp:container>/g);
    for (const match of nestedContainerMatches) {
      if (match[0] !== xml) {
        container.children.push(this.parseContainer(match[0], content));
      }
    }
    const caption = this.parseCaption(xml);
    if (caption) {
      container.caption = caption;
    }
    return container;
  }
  static parseOle(xml) {
    const ole = {
      id: generateId()
    };
    const objectTypeMatch = xml.match(/objectType="([^"]*)"/);
    if (objectTypeMatch) {
      const typeMap = {
        "UNKNOWN": "Unknown",
        "EMBEDDED": "Embedded",
        "LINK": "Link",
        "STATIC": "Static",
        "EQUATION": "Equation"
      };
      ole.objectType = typeMap[objectTypeMatch[1].toUpperCase()] || "Unknown";
    }
    const extentXMatch = xml.match(/extentX="(\d+)"/);
    if (extentXMatch) ole.extentX = parseInt(extentXMatch[1]) / 100;
    const extentYMatch = xml.match(/extentY="(\d+)"/);
    if (extentYMatch) ole.extentY = parseInt(extentYMatch[1]) / 100;
    const binItemMatch = xml.match(/binaryItemIDRef="([^"]*)"/);
    if (binItemMatch) ole.binItem = binItemMatch[1];
    const drawAspectMatch = xml.match(/drawAspect="([^"]*)"/);
    if (drawAspectMatch) {
      const aspectMap = {
        "CONTENT": "Content",
        "THUMBNAIL": "ThumbNail",
        "ICON": "Icon",
        "DOCPRINT": "DocPrint"
      };
      ole.drawAspect = aspectMap[drawAspectMatch[1].toUpperCase()] || "Content";
    }
    const hasMonikerMatch = xml.match(/hasMoniker="([^"]*)"/);
    if (hasMonikerMatch) {
      ole.hasMoniker = hasMonikerMatch[1] === "1" || hasMonikerMatch[1] === "true";
    }
    const eqBaseLineMatch = xml.match(/eqBaseLine="(-?\d+)"/);
    if (eqBaseLineMatch) ole.eqBaseLine = parseInt(eqBaseLineMatch[1]) / 100;
    ole.shapeObject = this.parseShapeObject(xml);
    return ole;
  }
  static parseEquation(xml) {
    const equation = {
      id: generateId()
    };
    const lineModeMatch = xml.match(/lineMode="([^"]*)"/);
    if (lineModeMatch) {
      equation.lineMode = lineModeMatch[1] === "1" || lineModeMatch[1] === "true";
    }
    const baseUnitMatch = xml.match(/baseUnit="(\d+)"/);
    if (baseUnitMatch) equation.baseUnit = parseInt(baseUnitMatch[1]);
    const textColorMatch = xml.match(/textColor="([^"]*)"/);
    if (textColorMatch) equation.textColor = textColorMatch[1];
    const baseLineMatch = xml.match(/baseLine="(-?\d+)"/);
    if (baseLineMatch) equation.baseLine = parseInt(baseLineMatch[1]) / 100;
    const versionMatch = xml.match(/version="([^"]*)"/);
    if (versionMatch) equation.version = versionMatch[1];
    const scriptMatch = xml.match(/<hp:script[^>]*>([^<]*)<\/hp:script>/i);
    if (scriptMatch) {
      equation.script = this.decodeXmlEntities(scriptMatch[1]);
    }
    equation.shapeObject = this.parseShapeObject(xml);
    return equation;
  }
  static parseTextArt(xml) {
    const textArt = {
      id: generateId()
    };
    const textMatch = xml.match(/<hp:textArt[^>]*>[\s\S]*?<hp:text>([^<]*)<\/hp:text>/i);
    if (textMatch) {
      textArt.text = this.decodeXmlEntities(textMatch[1]);
    }
    const x0Match = xml.match(/x0="(-?\d+)"/);
    if (x0Match) textArt.x0 = parseInt(x0Match[1]) / 100;
    const y0Match = xml.match(/y0="(-?\d+)"/);
    if (y0Match) textArt.y0 = parseInt(y0Match[1]) / 100;
    const x1Match = xml.match(/x1="(-?\d+)"/);
    if (x1Match) textArt.x1 = parseInt(x1Match[1]) / 100;
    const y1Match = xml.match(/y1="(-?\d+)"/);
    if (y1Match) textArt.y1 = parseInt(y1Match[1]) / 100;
    const x2Match = xml.match(/x2="(-?\d+)"/);
    if (x2Match) textArt.x2 = parseInt(x2Match[1]) / 100;
    const y2Match = xml.match(/y2="(-?\d+)"/);
    if (y2Match) textArt.y2 = parseInt(y2Match[1]) / 100;
    const x3Match = xml.match(/x3="(-?\d+)"/);
    if (x3Match) textArt.x3 = parseInt(x3Match[1]) / 100;
    const y3Match = xml.match(/y3="(-?\d+)"/);
    if (y3Match) textArt.y3 = parseInt(y3Match[1]) / 100;
    const shapeMatch = xml.match(/<hp:textArtShape[^>]*>([\s\S]*?)<\/hp:textArtShape>/i);
    if (shapeMatch) {
      textArt.shape = {};
      const shapeContent = shapeMatch[0];
      const fontNameMatch = shapeContent.match(/fontName="([^"]*)"/);
      if (fontNameMatch) textArt.shape.fontName = fontNameMatch[1];
      const fontStyleMatch = shapeContent.match(/fontStyle="([^"]*)"/);
      if (fontStyleMatch) textArt.shape.fontStyle = fontStyleMatch[1];
      const textShapeMatch = shapeContent.match(/textShape="(\d+)"/);
      if (textShapeMatch) textArt.shape.textShape = parseInt(textShapeMatch[1]);
      const lineSpacingMatch = shapeContent.match(/lineSpacing="(\d+)"/);
      if (lineSpacingMatch) textArt.shape.lineSpacing = parseInt(lineSpacingMatch[1]);
      const charSpacingMatch = shapeContent.match(/charSpacing="(-?\d+)"/);
      if (charSpacingMatch) textArt.shape.charSpacing = parseInt(charSpacingMatch[1]);
    }
    const outlineDataMatch = xml.match(/<hp:outlineData[^>]*>([\s\S]*?)<\/hp:outlineData>/i);
    if (outlineDataMatch) {
      textArt.outlineData = [];
      const pointRegex = /<(?:hp:|hc:)?pt[^>]*x="(-?\d+)"[^>]*y="(-?\d+)"/gi;
      let pointMatch;
      while ((pointMatch = pointRegex.exec(outlineDataMatch[1])) !== null) {
        textArt.outlineData.push({
          x: parseInt(pointMatch[1]) / 100,
          y: parseInt(pointMatch[2]) / 100
        });
      }
    }
    return textArt;
  }
  static parseUnknownObject(xml) {
    const unknownObj = {
      id: generateId()
    };
    const ctrlIdMatch = xml.match(/ctrlId="([^"]*)"/);
    if (ctrlIdMatch) unknownObj.ctrlId = ctrlIdMatch[1];
    const x0Match = xml.match(/x0="(-?\d+)"/);
    if (x0Match) unknownObj.x0 = parseInt(x0Match[1]) / 100;
    const y0Match = xml.match(/y0="(-?\d+)"/);
    if (y0Match) unknownObj.y0 = parseInt(y0Match[1]) / 100;
    const x1Match = xml.match(/x1="(-?\d+)"/);
    if (x1Match) unknownObj.x1 = parseInt(x1Match[1]) / 100;
    const y1Match = xml.match(/y1="(-?\d+)"/);
    if (y1Match) unknownObj.y1 = parseInt(y1Match[1]) / 100;
    const x2Match = xml.match(/x2="(-?\d+)"/);
    if (x2Match) unknownObj.x2 = parseInt(x2Match[1]) / 100;
    const y2Match = xml.match(/y2="(-?\d+)"/);
    if (y2Match) unknownObj.y2 = parseInt(y2Match[1]) / 100;
    const x3Match = xml.match(/x3="(-?\d+)"/);
    if (x3Match) unknownObj.x3 = parseInt(x3Match[1]) / 100;
    const y3Match = xml.match(/y3="(-?\d+)"/);
    if (y3Match) unknownObj.y3 = parseInt(y3Match[1]) / 100;
    unknownObj.shapeObject = this.parseShapeObject(xml);
    unknownObj.drawingObject = this.parseDrawingObject(xml);
    return unknownObj;
  }
  static parseFormObject(xml) {
    const formObject = {};
    const nameMatch = xml.match(/\bname="([^"]*)"/);
    if (nameMatch) formObject.name = nameMatch[1];
    const foreColorMatch = xml.match(/foreColor="([^"]*)"/);
    if (foreColorMatch) formObject.foreColor = foreColorMatch[1];
    const backColorMatch = xml.match(/backColor="([^"]*)"/);
    if (backColorMatch) formObject.backColor = backColorMatch[1];
    const groupNameMatch = xml.match(/groupName="([^"]*)"/);
    if (groupNameMatch) formObject.groupName = groupNameMatch[1];
    const tabStopMatch = xml.match(/tabStop="([^"]*)"/);
    if (tabStopMatch) {
      formObject.tabStop = tabStopMatch[1] === "1" || tabStopMatch[1] === "true";
    }
    const tabOrderMatch = xml.match(/tabOrder="(\d+)"/);
    if (tabOrderMatch) formObject.tabOrder = parseInt(tabOrderMatch[1]);
    const enabledMatch = xml.match(/enabled="([^"]*)"/);
    if (enabledMatch) {
      formObject.enabled = enabledMatch[1] === "1" || enabledMatch[1] === "true";
    }
    const borderTypeMatch = xml.match(/borderType="(\d+)"/);
    if (borderTypeMatch) formObject.borderType = parseInt(borderTypeMatch[1]);
    const drawFrameMatch = xml.match(/drawFrame="([^"]*)"/);
    if (drawFrameMatch) {
      formObject.drawFrame = drawFrameMatch[1] === "1" || drawFrameMatch[1] === "true";
    }
    const printableMatch = xml.match(/printable="([^"]*)"/);
    if (printableMatch) {
      formObject.printable = printableMatch[1] === "1" || printableMatch[1] === "true";
    }
    const formCharShapeMatch = xml.match(/<(?:hp:|hc:)?formCharShape[^>]*>/i);
    if (formCharShapeMatch) {
      const fcs = formCharShapeMatch[0];
      formObject.formCharShape = {};
      const charShapeMatch = fcs.match(/charPrIDRef="(\d+)"/);
      if (charShapeMatch) formObject.formCharShape.charShape = parseInt(charShapeMatch[1]);
      const followContextMatch = fcs.match(/followContext="([^"]*)"/);
      if (followContextMatch) {
        formObject.formCharShape.followContext = followContextMatch[1] === "1" || followContextMatch[1] === "true";
      }
      const autoSizeMatch = fcs.match(/autoSize="([^"]*)"/);
      if (autoSizeMatch) {
        formObject.formCharShape.autoSize = autoSizeMatch[1] === "1" || autoSizeMatch[1] === "true";
      }
      const wordWrapMatch = fcs.match(/wordWrap="([^"]*)"/);
      if (wordWrapMatch) {
        formObject.formCharShape.wordWrap = wordWrapMatch[1] === "1" || wordWrapMatch[1] === "true";
      }
    }
    const buttonSetMatch = xml.match(/<(?:hp:|hc:)?buttonSet[^>]*>([\s\S]*?)<\/(?:hp:|hc:)?buttonSet>/i);
    if (buttonSetMatch) {
      formObject.buttonSet = {};
      const bsContent = buttonSetMatch[0];
      const captionMatch = bsContent.match(/caption="([^"]*)"/);
      if (captionMatch) formObject.buttonSet.caption = captionMatch[1];
      const valueMatch = bsContent.match(/\bvalue="([^"]*)"/);
      if (valueMatch) formObject.buttonSet.value = valueMatch[1];
      const radioGroupNameMatch = bsContent.match(/radioGroupName="([^"]*)"/);
      if (radioGroupNameMatch) formObject.buttonSet.radioGroupName = radioGroupNameMatch[1];
      const triStateMatch = bsContent.match(/triState="([^"]*)"/);
      if (triStateMatch) {
        formObject.buttonSet.triState = triStateMatch[1] === "1" || triStateMatch[1] === "true";
      }
      const backStyleMatch = bsContent.match(/backStyle="([^"]*)"/);
      if (backStyleMatch) formObject.buttonSet.backStyle = backStyleMatch[1];
    }
    return formObject;
  }
  static parseButton(xml) {
    const button = {
      id: generateId()
    };
    button.shapeObject = this.parseShapeObject(xml);
    button.formObject = this.parseFormObject(xml);
    return button;
  }
  static parseRadioButton(xml) {
    const radioButton = {
      id: generateId()
    };
    radioButton.shapeObject = this.parseShapeObject(xml);
    radioButton.formObject = this.parseFormObject(xml);
    return radioButton;
  }
  static parseCheckButton(xml) {
    const checkButton = {
      id: generateId()
    };
    checkButton.shapeObject = this.parseShapeObject(xml);
    checkButton.formObject = this.parseFormObject(xml);
    return checkButton;
  }
  static parseComboBox(xml) {
    const comboBox = {
      id: generateId()
    };
    const listBoxRowsMatch = xml.match(/listBoxRows="(\d+)"/);
    if (listBoxRowsMatch) comboBox.listBoxRows = parseInt(listBoxRowsMatch[1]);
    const listBoxWidthMatch = xml.match(/listBoxWidth="(\d+)"/);
    if (listBoxWidthMatch) comboBox.listBoxWidth = parseInt(listBoxWidthMatch[1]) / 100;
    const textMatch = xml.match(/\btext="([^"]*)"/);
    if (textMatch) comboBox.text = textMatch[1];
    const editEnableMatch = xml.match(/editEnable="([^"]*)"/);
    if (editEnableMatch) {
      comboBox.editEnable = editEnableMatch[1] === "1" || editEnableMatch[1] === "true";
    }
    comboBox.shapeObject = this.parseShapeObject(xml);
    comboBox.formObject = this.parseFormObject(xml);
    return comboBox;
  }
  static parseEdit(xml) {
    const edit = {
      id: generateId()
    };
    const multiLineMatch = xml.match(/multiLine="([^"]*)"/);
    if (multiLineMatch) {
      edit.multiLine = multiLineMatch[1] === "1" || multiLineMatch[1] === "true";
    }
    const passwordCharMatch = xml.match(/passwordChar="([^"]*)"/);
    if (passwordCharMatch) edit.passwordChar = passwordCharMatch[1];
    const maxLengthMatch = xml.match(/maxLength="(\d+)"/);
    if (maxLengthMatch) edit.maxLength = parseInt(maxLengthMatch[1]);
    const scrollBarsMatch = xml.match(/scrollBars="([^"]*)"/);
    if (scrollBarsMatch) {
      edit.scrollBars = scrollBarsMatch[1] === "1" || scrollBarsMatch[1] === "true";
    }
    const tabKeyBehaviorMatch = xml.match(/tabKeyBehavior="([^"]*)"/);
    if (tabKeyBehaviorMatch) edit.tabKeyBehavior = tabKeyBehaviorMatch[1];
    const numberMatch = xml.match(/\bnumber="([^"]*)"/);
    if (numberMatch) {
      edit.number = numberMatch[1] === "1" || numberMatch[1] === "true";
    }
    const readOnlyMatch = xml.match(/readOnly="([^"]*)"/);
    if (readOnlyMatch) {
      edit.readOnly = readOnlyMatch[1] === "1" || readOnlyMatch[1] === "true";
    }
    const alignTextMatch = xml.match(/alignText="([^"]*)"/);
    if (alignTextMatch) edit.alignText = alignTextMatch[1];
    const editTextMatch = xml.match(/<(?:hp:|hc:)?editText[^>]*>([^<]*)<\/(?:hp:|hc:)?editText>/i);
    if (editTextMatch) {
      edit.text = this.decodeXmlEntities(editTextMatch[1]);
    }
    edit.shapeObject = this.parseShapeObject(xml);
    edit.formObject = this.parseFormObject(xml);
    return edit;
  }
  static parseListBox(xml) {
    const listBox = {
      id: generateId()
    };
    const textMatch = xml.match(/\btext="([^"]*)"/);
    if (textMatch) listBox.text = textMatch[1];
    const itemHeightMatch = xml.match(/itemHeight="(\d+)"/);
    if (itemHeightMatch) listBox.itemHeight = parseInt(itemHeightMatch[1]) / 100;
    const topIndexMatch = xml.match(/topIndex="(\d+)"/);
    if (topIndexMatch) listBox.topIndex = parseInt(topIndexMatch[1]);
    listBox.shapeObject = this.parseShapeObject(xml);
    listBox.formObject = this.parseFormObject(xml);
    return listBox;
  }
  static parseScrollBar(xml) {
    const scrollBar = {
      id: generateId()
    };
    const delayMatch = xml.match(/delay="(\d+)"/);
    if (delayMatch) scrollBar.delay = parseInt(delayMatch[1]);
    const largeChangeMatch = xml.match(/largeChange="(\d+)"/);
    if (largeChangeMatch) scrollBar.largeChange = parseInt(largeChangeMatch[1]);
    const smallChangeMatch = xml.match(/smallChange="(\d+)"/);
    if (smallChangeMatch) scrollBar.smallChange = parseInt(smallChangeMatch[1]);
    const minMatch = xml.match(/\bmin="(\d+)"/);
    if (minMatch) scrollBar.min = parseInt(minMatch[1]);
    const maxMatch = xml.match(/\bmax="(\d+)"/);
    if (maxMatch) scrollBar.max = parseInt(maxMatch[1]);
    const pageMatch = xml.match(/\bpage="(\d+)"/);
    if (pageMatch) scrollBar.page = parseInt(pageMatch[1]);
    const valueMatch = xml.match(/\bvalue="(\d+)"/);
    if (valueMatch) scrollBar.value = parseInt(valueMatch[1]);
    const typeMatch = xml.match(/\btype="([^"]*)"/);
    if (typeMatch) scrollBar.type = typeMatch[1];
    scrollBar.shapeObject = this.parseShapeObject(xml);
    scrollBar.formObject = this.parseFormObject(xml);
    return scrollBar;
  }
  static parseCompatibleDocument(xml) {
    const compatDocMatch = xml.match(/<hh:compatibleDocument[^>]*>([\s\S]*?)<\/hh:compatibleDocument>/i);
    if (!compatDocMatch) return void 0;
    const content = compatDocMatch[0];
    const compatDoc = {};
    const targetProgramMatch = content.match(/targetProgram="([^"]*)"/);
    if (targetProgramMatch) {
      const progMap = {
        "NONE": "None",
        "HWP70": "Hwp70",
        "WORD": "Word"
      };
      compatDoc.targetProgram = progMap[targetProgramMatch[1].toUpperCase()] || "None";
    }
    const layoutCompatMatch = content.match(/<hh:layoutCompatibility[^>]*(?:\/>|([\s\S]*?)<\/hh:layoutCompatibility>)/i);
    if (layoutCompatMatch) {
      const lcContent = layoutCompatMatch[0];
      const lc = {};
      const boolFlags = [
        "applyFontWeightToBold",
        "useInnerUnderline",
        "fixedUnderlineWidth",
        "doNotApplyStrikeout",
        "useLowercaseStrikeout",
        "extendLineheightToOffset",
        "treatQuotationAsLatin",
        "doNotAlignWhitespaceOnRight",
        "doNotAdjustWordInJustify",
        "baseCharUnitOnEAsian",
        "baseCharUnitOfIndentOnFirstChar",
        "adjustLineheightToFont",
        "adjustBaselineInFixedLinespacing",
        "excludeOverlappingParaSpacing",
        "applyNextspacingOfLastPara",
        "applyAtLeastToPercent100Pct",
        "doNotApplyAutoSpaceEAsianEng",
        "doNotApplyAutoSpaceEAsianNum",
        "adjustParaBorderfillToSpacing",
        "connectParaBorderfillOfEqualBorder",
        "adjustParaBorderOffsetWithBorder",
        "extendLineheightToParaBorderOffset",
        "applyParaBorderToOutside",
        "baseLinespacingOnLinegrid",
        "applyCharSpacingToCharGrid",
        "doNotApplyGridInHeaderfooter",
        "extendHeaderfooterToBody",
        "adjustEndnotePositionToFootnote",
        "doNotApplyImageEffect",
        "doNotApplyShapeComment",
        "doNotAdjustEmptyAnchorLine",
        "overlapBothAllowOverlap",
        "doNotApplyVertOffsetOfForward",
        "extendVertLimitToPageMargins",
        "doNotHoldAnchorOfTable",
        "doNotFormattingAtBeneathAnchor",
        "doNotApplyExtensionCharCompose"
      ];
      for (const flag of boolFlags) {
        const regex = new RegExp(`${flag}="([^"]*)"`, "i");
        const match = lcContent.match(regex);
        if (match) {
          lc[flag] = match[1] === "1" || match[1] === "true";
        }
      }
      compatDoc.layoutCompatibility = lc;
    }
    return compatDoc;
  }
  static async parseBinDataStorage(zip, content) {
    const binDataPath = "Contents/content.hpf";
    const binDataXml = await this.readXmlFile(zip, binDataPath);
    if (binDataXml) {
      const binDataRegex = /<(?:hp:|hpf:)?binData[^>]*id="([^"]*)"[^>]*>([\s\S]*?)<\/(?:hp:|hpf:)?binData>/gi;
      let match;
      while ((match = binDataRegex.exec(binDataXml)) !== null) {
        const binData = {
          id: match[1],
          data: match[2].trim()
        };
        const sizeMatch = match[0].match(/size="(\d+)"/);
        if (sizeMatch) binData.size = parseInt(sizeMatch[1]);
        const encodingMatch = match[0].match(/encoding="([^"]*)"/);
        if (encodingMatch && encodingMatch[1].toUpperCase() === "BASE64") {
          binData.encoding = "Base64";
        }
        const compressMatch = match[0].match(/compress="([^"]*)"/);
        if (compressMatch) {
          binData.compress = compressMatch[1] === "1" || compressMatch[1] === "true";
        }
        content.binData.set(binData.id, binData);
      }
    }
    const binDataFolder = zip.folder("BinData");
    if (binDataFolder) {
      const binFiles = Object.keys(zip.files).filter(
        (f) => f.startsWith("BinData/") && !f.endsWith("/")
      );
      for (const binPath of binFiles) {
        const file = zip.file(binPath);
        if (!file) continue;
        const data = await file.async("base64");
        const fileName = binPath.split("/").pop() || "";
        const fileId = fileName.replace(/\.[^.]+$/, "");
        if (!content.binData.has(fileId)) {
          content.binData.set(fileId, {
            id: fileId,
            data,
            encoding: "Base64"
          });
        }
      }
    }
  }
};

// src/HwpParser.standalone.ts
var CFB = __toESM(require_cfb());

// node_modules/pako/dist/pako.esm.mjs
var Z_FIXED$1 = 4;
var Z_BINARY = 0;
var Z_TEXT = 1;
var Z_UNKNOWN$1 = 2;
function zero$1(buf) {
  let len = buf.length;
  while (--len >= 0) {
    buf[len] = 0;
  }
}
var STORED_BLOCK = 0;
var STATIC_TREES = 1;
var DYN_TREES = 2;
var MIN_MATCH$1 = 3;
var MAX_MATCH$1 = 258;
var LENGTH_CODES$1 = 29;
var LITERALS$1 = 256;
var L_CODES$1 = LITERALS$1 + 1 + LENGTH_CODES$1;
var D_CODES$1 = 30;
var BL_CODES$1 = 19;
var HEAP_SIZE$1 = 2 * L_CODES$1 + 1;
var MAX_BITS$1 = 15;
var Buf_size = 16;
var MAX_BL_BITS = 7;
var END_BLOCK = 256;
var REP_3_6 = 16;
var REPZ_3_10 = 17;
var REPZ_11_138 = 18;
var extra_lbits = (
  /* extra bits for each length code */
  new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 0])
);
var extra_dbits = (
  /* extra bits for each distance code */
  new Uint8Array([0, 0, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12, 13, 13])
);
var extra_blbits = (
  /* extra bits for each bit length code */
  new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 3, 7])
);
var bl_order = new Uint8Array([16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15]);
var DIST_CODE_LEN = 512;
var static_ltree = new Array((L_CODES$1 + 2) * 2);
zero$1(static_ltree);
var static_dtree = new Array(D_CODES$1 * 2);
zero$1(static_dtree);
var _dist_code = new Array(DIST_CODE_LEN);
zero$1(_dist_code);
var _length_code = new Array(MAX_MATCH$1 - MIN_MATCH$1 + 1);
zero$1(_length_code);
var base_length = new Array(LENGTH_CODES$1);
zero$1(base_length);
var base_dist = new Array(D_CODES$1);
zero$1(base_dist);
function StaticTreeDesc(static_tree, extra_bits, extra_base, elems, max_length) {
  this.static_tree = static_tree;
  this.extra_bits = extra_bits;
  this.extra_base = extra_base;
  this.elems = elems;
  this.max_length = max_length;
  this.has_stree = static_tree && static_tree.length;
}
var static_l_desc;
var static_d_desc;
var static_bl_desc;
function TreeDesc(dyn_tree, stat_desc) {
  this.dyn_tree = dyn_tree;
  this.max_code = 0;
  this.stat_desc = stat_desc;
}
var d_code = (dist) => {
  return dist < 256 ? _dist_code[dist] : _dist_code[256 + (dist >>> 7)];
};
var put_short = (s, w) => {
  s.pending_buf[s.pending++] = w & 255;
  s.pending_buf[s.pending++] = w >>> 8 & 255;
};
var send_bits = (s, value, length) => {
  if (s.bi_valid > Buf_size - length) {
    s.bi_buf |= value << s.bi_valid & 65535;
    put_short(s, s.bi_buf);
    s.bi_buf = value >> Buf_size - s.bi_valid;
    s.bi_valid += length - Buf_size;
  } else {
    s.bi_buf |= value << s.bi_valid & 65535;
    s.bi_valid += length;
  }
};
var send_code = (s, c, tree) => {
  send_bits(
    s,
    tree[c * 2],
    tree[c * 2 + 1]
    /*.Len*/
  );
};
var bi_reverse = (code, len) => {
  let res = 0;
  do {
    res |= code & 1;
    code >>>= 1;
    res <<= 1;
  } while (--len > 0);
  return res >>> 1;
};
var bi_flush = (s) => {
  if (s.bi_valid === 16) {
    put_short(s, s.bi_buf);
    s.bi_buf = 0;
    s.bi_valid = 0;
  } else if (s.bi_valid >= 8) {
    s.pending_buf[s.pending++] = s.bi_buf & 255;
    s.bi_buf >>= 8;
    s.bi_valid -= 8;
  }
};
var gen_bitlen = (s, desc) => {
  const tree = desc.dyn_tree;
  const max_code = desc.max_code;
  const stree = desc.stat_desc.static_tree;
  const has_stree = desc.stat_desc.has_stree;
  const extra = desc.stat_desc.extra_bits;
  const base = desc.stat_desc.extra_base;
  const max_length = desc.stat_desc.max_length;
  let h;
  let n, m;
  let bits;
  let xbits;
  let f;
  let overflow = 0;
  for (bits = 0; bits <= MAX_BITS$1; bits++) {
    s.bl_count[bits] = 0;
  }
  tree[s.heap[s.heap_max] * 2 + 1] = 0;
  for (h = s.heap_max + 1; h < HEAP_SIZE$1; h++) {
    n = s.heap[h];
    bits = tree[tree[n * 2 + 1] * 2 + 1] + 1;
    if (bits > max_length) {
      bits = max_length;
      overflow++;
    }
    tree[n * 2 + 1] = bits;
    if (n > max_code) {
      continue;
    }
    s.bl_count[bits]++;
    xbits = 0;
    if (n >= base) {
      xbits = extra[n - base];
    }
    f = tree[n * 2];
    s.opt_len += f * (bits + xbits);
    if (has_stree) {
      s.static_len += f * (stree[n * 2 + 1] + xbits);
    }
  }
  if (overflow === 0) {
    return;
  }
  do {
    bits = max_length - 1;
    while (s.bl_count[bits] === 0) {
      bits--;
    }
    s.bl_count[bits]--;
    s.bl_count[bits + 1] += 2;
    s.bl_count[max_length]--;
    overflow -= 2;
  } while (overflow > 0);
  for (bits = max_length; bits !== 0; bits--) {
    n = s.bl_count[bits];
    while (n !== 0) {
      m = s.heap[--h];
      if (m > max_code) {
        continue;
      }
      if (tree[m * 2 + 1] !== bits) {
        s.opt_len += (bits - tree[m * 2 + 1]) * tree[m * 2];
        tree[m * 2 + 1] = bits;
      }
      n--;
    }
  }
};
var gen_codes = (tree, max_code, bl_count) => {
  const next_code = new Array(MAX_BITS$1 + 1);
  let code = 0;
  let bits;
  let n;
  for (bits = 1; bits <= MAX_BITS$1; bits++) {
    code = code + bl_count[bits - 1] << 1;
    next_code[bits] = code;
  }
  for (n = 0; n <= max_code; n++) {
    let len = tree[n * 2 + 1];
    if (len === 0) {
      continue;
    }
    tree[n * 2] = bi_reverse(next_code[len]++, len);
  }
};
var tr_static_init = () => {
  let n;
  let bits;
  let length;
  let code;
  let dist;
  const bl_count = new Array(MAX_BITS$1 + 1);
  length = 0;
  for (code = 0; code < LENGTH_CODES$1 - 1; code++) {
    base_length[code] = length;
    for (n = 0; n < 1 << extra_lbits[code]; n++) {
      _length_code[length++] = code;
    }
  }
  _length_code[length - 1] = code;
  dist = 0;
  for (code = 0; code < 16; code++) {
    base_dist[code] = dist;
    for (n = 0; n < 1 << extra_dbits[code]; n++) {
      _dist_code[dist++] = code;
    }
  }
  dist >>= 7;
  for (; code < D_CODES$1; code++) {
    base_dist[code] = dist << 7;
    for (n = 0; n < 1 << extra_dbits[code] - 7; n++) {
      _dist_code[256 + dist++] = code;
    }
  }
  for (bits = 0; bits <= MAX_BITS$1; bits++) {
    bl_count[bits] = 0;
  }
  n = 0;
  while (n <= 143) {
    static_ltree[n * 2 + 1] = 8;
    n++;
    bl_count[8]++;
  }
  while (n <= 255) {
    static_ltree[n * 2 + 1] = 9;
    n++;
    bl_count[9]++;
  }
  while (n <= 279) {
    static_ltree[n * 2 + 1] = 7;
    n++;
    bl_count[7]++;
  }
  while (n <= 287) {
    static_ltree[n * 2 + 1] = 8;
    n++;
    bl_count[8]++;
  }
  gen_codes(static_ltree, L_CODES$1 + 1, bl_count);
  for (n = 0; n < D_CODES$1; n++) {
    static_dtree[n * 2 + 1] = 5;
    static_dtree[n * 2] = bi_reverse(n, 5);
  }
  static_l_desc = new StaticTreeDesc(static_ltree, extra_lbits, LITERALS$1 + 1, L_CODES$1, MAX_BITS$1);
  static_d_desc = new StaticTreeDesc(static_dtree, extra_dbits, 0, D_CODES$1, MAX_BITS$1);
  static_bl_desc = new StaticTreeDesc(new Array(0), extra_blbits, 0, BL_CODES$1, MAX_BL_BITS);
};
var init_block = (s) => {
  let n;
  for (n = 0; n < L_CODES$1; n++) {
    s.dyn_ltree[n * 2] = 0;
  }
  for (n = 0; n < D_CODES$1; n++) {
    s.dyn_dtree[n * 2] = 0;
  }
  for (n = 0; n < BL_CODES$1; n++) {
    s.bl_tree[n * 2] = 0;
  }
  s.dyn_ltree[END_BLOCK * 2] = 1;
  s.opt_len = s.static_len = 0;
  s.sym_next = s.matches = 0;
};
var bi_windup = (s) => {
  if (s.bi_valid > 8) {
    put_short(s, s.bi_buf);
  } else if (s.bi_valid > 0) {
    s.pending_buf[s.pending++] = s.bi_buf;
  }
  s.bi_buf = 0;
  s.bi_valid = 0;
};
var smaller = (tree, n, m, depth) => {
  const _n2 = n * 2;
  const _m2 = m * 2;
  return tree[_n2] < tree[_m2] || tree[_n2] === tree[_m2] && depth[n] <= depth[m];
};
var pqdownheap = (s, tree, k) => {
  const v = s.heap[k];
  let j = k << 1;
  while (j <= s.heap_len) {
    if (j < s.heap_len && smaller(tree, s.heap[j + 1], s.heap[j], s.depth)) {
      j++;
    }
    if (smaller(tree, v, s.heap[j], s.depth)) {
      break;
    }
    s.heap[k] = s.heap[j];
    k = j;
    j <<= 1;
  }
  s.heap[k] = v;
};
var compress_block = (s, ltree, dtree) => {
  let dist;
  let lc;
  let sx = 0;
  let code;
  let extra;
  if (s.sym_next !== 0) {
    do {
      dist = s.pending_buf[s.sym_buf + sx++] & 255;
      dist += (s.pending_buf[s.sym_buf + sx++] & 255) << 8;
      lc = s.pending_buf[s.sym_buf + sx++];
      if (dist === 0) {
        send_code(s, lc, ltree);
      } else {
        code = _length_code[lc];
        send_code(s, code + LITERALS$1 + 1, ltree);
        extra = extra_lbits[code];
        if (extra !== 0) {
          lc -= base_length[code];
          send_bits(s, lc, extra);
        }
        dist--;
        code = d_code(dist);
        send_code(s, code, dtree);
        extra = extra_dbits[code];
        if (extra !== 0) {
          dist -= base_dist[code];
          send_bits(s, dist, extra);
        }
      }
    } while (sx < s.sym_next);
  }
  send_code(s, END_BLOCK, ltree);
};
var build_tree = (s, desc) => {
  const tree = desc.dyn_tree;
  const stree = desc.stat_desc.static_tree;
  const has_stree = desc.stat_desc.has_stree;
  const elems = desc.stat_desc.elems;
  let n, m;
  let max_code = -1;
  let node;
  s.heap_len = 0;
  s.heap_max = HEAP_SIZE$1;
  for (n = 0; n < elems; n++) {
    if (tree[n * 2] !== 0) {
      s.heap[++s.heap_len] = max_code = n;
      s.depth[n] = 0;
    } else {
      tree[n * 2 + 1] = 0;
    }
  }
  while (s.heap_len < 2) {
    node = s.heap[++s.heap_len] = max_code < 2 ? ++max_code : 0;
    tree[node * 2] = 1;
    s.depth[node] = 0;
    s.opt_len--;
    if (has_stree) {
      s.static_len -= stree[node * 2 + 1];
    }
  }
  desc.max_code = max_code;
  for (n = s.heap_len >> 1; n >= 1; n--) {
    pqdownheap(s, tree, n);
  }
  node = elems;
  do {
    n = s.heap[
      1
      /*SMALLEST*/
    ];
    s.heap[
      1
      /*SMALLEST*/
    ] = s.heap[s.heap_len--];
    pqdownheap(
      s,
      tree,
      1
      /*SMALLEST*/
    );
    m = s.heap[
      1
      /*SMALLEST*/
    ];
    s.heap[--s.heap_max] = n;
    s.heap[--s.heap_max] = m;
    tree[node * 2] = tree[n * 2] + tree[m * 2];
    s.depth[node] = (s.depth[n] >= s.depth[m] ? s.depth[n] : s.depth[m]) + 1;
    tree[n * 2 + 1] = tree[m * 2 + 1] = node;
    s.heap[
      1
      /*SMALLEST*/
    ] = node++;
    pqdownheap(
      s,
      tree,
      1
      /*SMALLEST*/
    );
  } while (s.heap_len >= 2);
  s.heap[--s.heap_max] = s.heap[
    1
    /*SMALLEST*/
  ];
  gen_bitlen(s, desc);
  gen_codes(tree, max_code, s.bl_count);
};
var scan_tree = (s, tree, max_code) => {
  let n;
  let prevlen = -1;
  let curlen;
  let nextlen = tree[0 * 2 + 1];
  let count = 0;
  let max_count = 7;
  let min_count = 4;
  if (nextlen === 0) {
    max_count = 138;
    min_count = 3;
  }
  tree[(max_code + 1) * 2 + 1] = 65535;
  for (n = 0; n <= max_code; n++) {
    curlen = nextlen;
    nextlen = tree[(n + 1) * 2 + 1];
    if (++count < max_count && curlen === nextlen) {
      continue;
    } else if (count < min_count) {
      s.bl_tree[curlen * 2] += count;
    } else if (curlen !== 0) {
      if (curlen !== prevlen) {
        s.bl_tree[curlen * 2]++;
      }
      s.bl_tree[REP_3_6 * 2]++;
    } else if (count <= 10) {
      s.bl_tree[REPZ_3_10 * 2]++;
    } else {
      s.bl_tree[REPZ_11_138 * 2]++;
    }
    count = 0;
    prevlen = curlen;
    if (nextlen === 0) {
      max_count = 138;
      min_count = 3;
    } else if (curlen === nextlen) {
      max_count = 6;
      min_count = 3;
    } else {
      max_count = 7;
      min_count = 4;
    }
  }
};
var send_tree = (s, tree, max_code) => {
  let n;
  let prevlen = -1;
  let curlen;
  let nextlen = tree[0 * 2 + 1];
  let count = 0;
  let max_count = 7;
  let min_count = 4;
  if (nextlen === 0) {
    max_count = 138;
    min_count = 3;
  }
  for (n = 0; n <= max_code; n++) {
    curlen = nextlen;
    nextlen = tree[(n + 1) * 2 + 1];
    if (++count < max_count && curlen === nextlen) {
      continue;
    } else if (count < min_count) {
      do {
        send_code(s, curlen, s.bl_tree);
      } while (--count !== 0);
    } else if (curlen !== 0) {
      if (curlen !== prevlen) {
        send_code(s, curlen, s.bl_tree);
        count--;
      }
      send_code(s, REP_3_6, s.bl_tree);
      send_bits(s, count - 3, 2);
    } else if (count <= 10) {
      send_code(s, REPZ_3_10, s.bl_tree);
      send_bits(s, count - 3, 3);
    } else {
      send_code(s, REPZ_11_138, s.bl_tree);
      send_bits(s, count - 11, 7);
    }
    count = 0;
    prevlen = curlen;
    if (nextlen === 0) {
      max_count = 138;
      min_count = 3;
    } else if (curlen === nextlen) {
      max_count = 6;
      min_count = 3;
    } else {
      max_count = 7;
      min_count = 4;
    }
  }
};
var build_bl_tree = (s) => {
  let max_blindex;
  scan_tree(s, s.dyn_ltree, s.l_desc.max_code);
  scan_tree(s, s.dyn_dtree, s.d_desc.max_code);
  build_tree(s, s.bl_desc);
  for (max_blindex = BL_CODES$1 - 1; max_blindex >= 3; max_blindex--) {
    if (s.bl_tree[bl_order[max_blindex] * 2 + 1] !== 0) {
      break;
    }
  }
  s.opt_len += 3 * (max_blindex + 1) + 5 + 5 + 4;
  return max_blindex;
};
var send_all_trees = (s, lcodes, dcodes, blcodes) => {
  let rank2;
  send_bits(s, lcodes - 257, 5);
  send_bits(s, dcodes - 1, 5);
  send_bits(s, blcodes - 4, 4);
  for (rank2 = 0; rank2 < blcodes; rank2++) {
    send_bits(s, s.bl_tree[bl_order[rank2] * 2 + 1], 3);
  }
  send_tree(s, s.dyn_ltree, lcodes - 1);
  send_tree(s, s.dyn_dtree, dcodes - 1);
};
var detect_data_type = (s) => {
  let block_mask = 4093624447;
  let n;
  for (n = 0; n <= 31; n++, block_mask >>>= 1) {
    if (block_mask & 1 && s.dyn_ltree[n * 2] !== 0) {
      return Z_BINARY;
    }
  }
  if (s.dyn_ltree[9 * 2] !== 0 || s.dyn_ltree[10 * 2] !== 0 || s.dyn_ltree[13 * 2] !== 0) {
    return Z_TEXT;
  }
  for (n = 32; n < LITERALS$1; n++) {
    if (s.dyn_ltree[n * 2] !== 0) {
      return Z_TEXT;
    }
  }
  return Z_BINARY;
};
var static_init_done = false;
var _tr_init$1 = (s) => {
  if (!static_init_done) {
    tr_static_init();
    static_init_done = true;
  }
  s.l_desc = new TreeDesc(s.dyn_ltree, static_l_desc);
  s.d_desc = new TreeDesc(s.dyn_dtree, static_d_desc);
  s.bl_desc = new TreeDesc(s.bl_tree, static_bl_desc);
  s.bi_buf = 0;
  s.bi_valid = 0;
  init_block(s);
};
var _tr_stored_block$1 = (s, buf, stored_len, last) => {
  send_bits(s, (STORED_BLOCK << 1) + (last ? 1 : 0), 3);
  bi_windup(s);
  put_short(s, stored_len);
  put_short(s, ~stored_len);
  if (stored_len) {
    s.pending_buf.set(s.window.subarray(buf, buf + stored_len), s.pending);
  }
  s.pending += stored_len;
};
var _tr_align$1 = (s) => {
  send_bits(s, STATIC_TREES << 1, 3);
  send_code(s, END_BLOCK, static_ltree);
  bi_flush(s);
};
var _tr_flush_block$1 = (s, buf, stored_len, last) => {
  let opt_lenb, static_lenb;
  let max_blindex = 0;
  if (s.level > 0) {
    if (s.strm.data_type === Z_UNKNOWN$1) {
      s.strm.data_type = detect_data_type(s);
    }
    build_tree(s, s.l_desc);
    build_tree(s, s.d_desc);
    max_blindex = build_bl_tree(s);
    opt_lenb = s.opt_len + 3 + 7 >>> 3;
    static_lenb = s.static_len + 3 + 7 >>> 3;
    if (static_lenb <= opt_lenb) {
      opt_lenb = static_lenb;
    }
  } else {
    opt_lenb = static_lenb = stored_len + 5;
  }
  if (stored_len + 4 <= opt_lenb && buf !== -1) {
    _tr_stored_block$1(s, buf, stored_len, last);
  } else if (s.strategy === Z_FIXED$1 || static_lenb === opt_lenb) {
    send_bits(s, (STATIC_TREES << 1) + (last ? 1 : 0), 3);
    compress_block(s, static_ltree, static_dtree);
  } else {
    send_bits(s, (DYN_TREES << 1) + (last ? 1 : 0), 3);
    send_all_trees(s, s.l_desc.max_code + 1, s.d_desc.max_code + 1, max_blindex + 1);
    compress_block(s, s.dyn_ltree, s.dyn_dtree);
  }
  init_block(s);
  if (last) {
    bi_windup(s);
  }
};
var _tr_tally$1 = (s, dist, lc) => {
  s.pending_buf[s.sym_buf + s.sym_next++] = dist;
  s.pending_buf[s.sym_buf + s.sym_next++] = dist >> 8;
  s.pending_buf[s.sym_buf + s.sym_next++] = lc;
  if (dist === 0) {
    s.dyn_ltree[lc * 2]++;
  } else {
    s.matches++;
    dist--;
    s.dyn_ltree[(_length_code[lc] + LITERALS$1 + 1) * 2]++;
    s.dyn_dtree[d_code(dist) * 2]++;
  }
  return s.sym_next === s.sym_end;
};
var _tr_init_1 = _tr_init$1;
var _tr_stored_block_1 = _tr_stored_block$1;
var _tr_flush_block_1 = _tr_flush_block$1;
var _tr_tally_1 = _tr_tally$1;
var _tr_align_1 = _tr_align$1;
var trees = {
  _tr_init: _tr_init_1,
  _tr_stored_block: _tr_stored_block_1,
  _tr_flush_block: _tr_flush_block_1,
  _tr_tally: _tr_tally_1,
  _tr_align: _tr_align_1
};
var adler32 = (adler, buf, len, pos) => {
  let s1 = adler & 65535 | 0, s2 = adler >>> 16 & 65535 | 0, n = 0;
  while (len !== 0) {
    n = len > 2e3 ? 2e3 : len;
    len -= n;
    do {
      s1 = s1 + buf[pos++] | 0;
      s2 = s2 + s1 | 0;
    } while (--n);
    s1 %= 65521;
    s2 %= 65521;
  }
  return s1 | s2 << 16 | 0;
};
var adler32_1 = adler32;
var makeTable = () => {
  let c, table = [];
  for (var n = 0; n < 256; n++) {
    c = n;
    for (var k = 0; k < 8; k++) {
      c = c & 1 ? 3988292384 ^ c >>> 1 : c >>> 1;
    }
    table[n] = c;
  }
  return table;
};
var crcTable = new Uint32Array(makeTable());
var crc32 = (crc, buf, len, pos) => {
  const t = crcTable;
  const end = pos + len;
  crc ^= -1;
  for (let i = pos; i < end; i++) {
    crc = crc >>> 8 ^ t[(crc ^ buf[i]) & 255];
  }
  return crc ^ -1;
};
var crc32_1 = crc32;
var messages = {
  2: "need dictionary",
  /* Z_NEED_DICT       2  */
  1: "stream end",
  /* Z_STREAM_END      1  */
  0: "",
  /* Z_OK              0  */
  "-1": "file error",
  /* Z_ERRNO         (-1) */
  "-2": "stream error",
  /* Z_STREAM_ERROR  (-2) */
  "-3": "data error",
  /* Z_DATA_ERROR    (-3) */
  "-4": "insufficient memory",
  /* Z_MEM_ERROR     (-4) */
  "-5": "buffer error",
  /* Z_BUF_ERROR     (-5) */
  "-6": "incompatible version"
  /* Z_VERSION_ERROR (-6) */
};
var constants$2 = {
  /* Allowed flush values; see deflate() and inflate() below for details */
  Z_NO_FLUSH: 0,
  Z_PARTIAL_FLUSH: 1,
  Z_SYNC_FLUSH: 2,
  Z_FULL_FLUSH: 3,
  Z_FINISH: 4,
  Z_BLOCK: 5,
  Z_TREES: 6,
  /* Return codes for the compression/decompression functions. Negative values
  * are errors, positive values are used for special but normal events.
  */
  Z_OK: 0,
  Z_STREAM_END: 1,
  Z_NEED_DICT: 2,
  Z_ERRNO: -1,
  Z_STREAM_ERROR: -2,
  Z_DATA_ERROR: -3,
  Z_MEM_ERROR: -4,
  Z_BUF_ERROR: -5,
  //Z_VERSION_ERROR: -6,
  /* compression levels */
  Z_NO_COMPRESSION: 0,
  Z_BEST_SPEED: 1,
  Z_BEST_COMPRESSION: 9,
  Z_DEFAULT_COMPRESSION: -1,
  Z_FILTERED: 1,
  Z_HUFFMAN_ONLY: 2,
  Z_RLE: 3,
  Z_FIXED: 4,
  Z_DEFAULT_STRATEGY: 0,
  /* Possible values of the data_type field (though see inflate()) */
  Z_BINARY: 0,
  Z_TEXT: 1,
  //Z_ASCII:                1, // = Z_TEXT (deprecated)
  Z_UNKNOWN: 2,
  /* The deflate compression method */
  Z_DEFLATED: 8
  //Z_NULL:                 null // Use -1 or null inline, depending on var type
};
var { _tr_init, _tr_stored_block, _tr_flush_block, _tr_tally, _tr_align } = trees;
var {
  Z_NO_FLUSH: Z_NO_FLUSH$2,
  Z_PARTIAL_FLUSH,
  Z_FULL_FLUSH: Z_FULL_FLUSH$1,
  Z_FINISH: Z_FINISH$3,
  Z_BLOCK: Z_BLOCK$1,
  Z_OK: Z_OK$3,
  Z_STREAM_END: Z_STREAM_END$3,
  Z_STREAM_ERROR: Z_STREAM_ERROR$2,
  Z_DATA_ERROR: Z_DATA_ERROR$2,
  Z_BUF_ERROR: Z_BUF_ERROR$1,
  Z_DEFAULT_COMPRESSION: Z_DEFAULT_COMPRESSION$1,
  Z_FILTERED,
  Z_HUFFMAN_ONLY,
  Z_RLE,
  Z_FIXED,
  Z_DEFAULT_STRATEGY: Z_DEFAULT_STRATEGY$1,
  Z_UNKNOWN,
  Z_DEFLATED: Z_DEFLATED$2
} = constants$2;
var MAX_MEM_LEVEL = 9;
var MAX_WBITS$1 = 15;
var DEF_MEM_LEVEL = 8;
var LENGTH_CODES = 29;
var LITERALS = 256;
var L_CODES = LITERALS + 1 + LENGTH_CODES;
var D_CODES = 30;
var BL_CODES = 19;
var HEAP_SIZE = 2 * L_CODES + 1;
var MAX_BITS = 15;
var MIN_MATCH = 3;
var MAX_MATCH = 258;
var MIN_LOOKAHEAD = MAX_MATCH + MIN_MATCH + 1;
var PRESET_DICT = 32;
var INIT_STATE = 42;
var GZIP_STATE = 57;
var EXTRA_STATE = 69;
var NAME_STATE = 73;
var COMMENT_STATE = 91;
var HCRC_STATE = 103;
var BUSY_STATE = 113;
var FINISH_STATE = 666;
var BS_NEED_MORE = 1;
var BS_BLOCK_DONE = 2;
var BS_FINISH_STARTED = 3;
var BS_FINISH_DONE = 4;
var OS_CODE = 3;
var err = (strm, errorCode) => {
  strm.msg = messages[errorCode];
  return errorCode;
};
var rank = (f) => {
  return f * 2 - (f > 4 ? 9 : 0);
};
var zero = (buf) => {
  let len = buf.length;
  while (--len >= 0) {
    buf[len] = 0;
  }
};
var slide_hash = (s) => {
  let n, m;
  let p;
  let wsize = s.w_size;
  n = s.hash_size;
  p = n;
  do {
    m = s.head[--p];
    s.head[p] = m >= wsize ? m - wsize : 0;
  } while (--n);
  n = wsize;
  p = n;
  do {
    m = s.prev[--p];
    s.prev[p] = m >= wsize ? m - wsize : 0;
  } while (--n);
};
var HASH_ZLIB = (s, prev, data) => (prev << s.hash_shift ^ data) & s.hash_mask;
var HASH = HASH_ZLIB;
var flush_pending = (strm) => {
  const s = strm.state;
  let len = s.pending;
  if (len > strm.avail_out) {
    len = strm.avail_out;
  }
  if (len === 0) {
    return;
  }
  strm.output.set(s.pending_buf.subarray(s.pending_out, s.pending_out + len), strm.next_out);
  strm.next_out += len;
  s.pending_out += len;
  strm.total_out += len;
  strm.avail_out -= len;
  s.pending -= len;
  if (s.pending === 0) {
    s.pending_out = 0;
  }
};
var flush_block_only = (s, last) => {
  _tr_flush_block(s, s.block_start >= 0 ? s.block_start : -1, s.strstart - s.block_start, last);
  s.block_start = s.strstart;
  flush_pending(s.strm);
};
var put_byte = (s, b) => {
  s.pending_buf[s.pending++] = b;
};
var putShortMSB = (s, b) => {
  s.pending_buf[s.pending++] = b >>> 8 & 255;
  s.pending_buf[s.pending++] = b & 255;
};
var read_buf = (strm, buf, start, size) => {
  let len = strm.avail_in;
  if (len > size) {
    len = size;
  }
  if (len === 0) {
    return 0;
  }
  strm.avail_in -= len;
  buf.set(strm.input.subarray(strm.next_in, strm.next_in + len), start);
  if (strm.state.wrap === 1) {
    strm.adler = adler32_1(strm.adler, buf, len, start);
  } else if (strm.state.wrap === 2) {
    strm.adler = crc32_1(strm.adler, buf, len, start);
  }
  strm.next_in += len;
  strm.total_in += len;
  return len;
};
var longest_match = (s, cur_match) => {
  let chain_length = s.max_chain_length;
  let scan = s.strstart;
  let match;
  let len;
  let best_len = s.prev_length;
  let nice_match = s.nice_match;
  const limit = s.strstart > s.w_size - MIN_LOOKAHEAD ? s.strstart - (s.w_size - MIN_LOOKAHEAD) : 0;
  const _win = s.window;
  const wmask = s.w_mask;
  const prev = s.prev;
  const strend = s.strstart + MAX_MATCH;
  let scan_end1 = _win[scan + best_len - 1];
  let scan_end = _win[scan + best_len];
  if (s.prev_length >= s.good_match) {
    chain_length >>= 2;
  }
  if (nice_match > s.lookahead) {
    nice_match = s.lookahead;
  }
  do {
    match = cur_match;
    if (_win[match + best_len] !== scan_end || _win[match + best_len - 1] !== scan_end1 || _win[match] !== _win[scan] || _win[++match] !== _win[scan + 1]) {
      continue;
    }
    scan += 2;
    match++;
    do {
    } while (_win[++scan] === _win[++match] && _win[++scan] === _win[++match] && _win[++scan] === _win[++match] && _win[++scan] === _win[++match] && _win[++scan] === _win[++match] && _win[++scan] === _win[++match] && _win[++scan] === _win[++match] && _win[++scan] === _win[++match] && scan < strend);
    len = MAX_MATCH - (strend - scan);
    scan = strend - MAX_MATCH;
    if (len > best_len) {
      s.match_start = cur_match;
      best_len = len;
      if (len >= nice_match) {
        break;
      }
      scan_end1 = _win[scan + best_len - 1];
      scan_end = _win[scan + best_len];
    }
  } while ((cur_match = prev[cur_match & wmask]) > limit && --chain_length !== 0);
  if (best_len <= s.lookahead) {
    return best_len;
  }
  return s.lookahead;
};
var fill_window = (s) => {
  const _w_size = s.w_size;
  let n, more, str;
  do {
    more = s.window_size - s.lookahead - s.strstart;
    if (s.strstart >= _w_size + (_w_size - MIN_LOOKAHEAD)) {
      s.window.set(s.window.subarray(_w_size, _w_size + _w_size - more), 0);
      s.match_start -= _w_size;
      s.strstart -= _w_size;
      s.block_start -= _w_size;
      if (s.insert > s.strstart) {
        s.insert = s.strstart;
      }
      slide_hash(s);
      more += _w_size;
    }
    if (s.strm.avail_in === 0) {
      break;
    }
    n = read_buf(s.strm, s.window, s.strstart + s.lookahead, more);
    s.lookahead += n;
    if (s.lookahead + s.insert >= MIN_MATCH) {
      str = s.strstart - s.insert;
      s.ins_h = s.window[str];
      s.ins_h = HASH(s, s.ins_h, s.window[str + 1]);
      while (s.insert) {
        s.ins_h = HASH(s, s.ins_h, s.window[str + MIN_MATCH - 1]);
        s.prev[str & s.w_mask] = s.head[s.ins_h];
        s.head[s.ins_h] = str;
        str++;
        s.insert--;
        if (s.lookahead + s.insert < MIN_MATCH) {
          break;
        }
      }
    }
  } while (s.lookahead < MIN_LOOKAHEAD && s.strm.avail_in !== 0);
};
var deflate_stored = (s, flush) => {
  let min_block = s.pending_buf_size - 5 > s.w_size ? s.w_size : s.pending_buf_size - 5;
  let len, left, have, last = 0;
  let used = s.strm.avail_in;
  do {
    len = 65535;
    have = s.bi_valid + 42 >> 3;
    if (s.strm.avail_out < have) {
      break;
    }
    have = s.strm.avail_out - have;
    left = s.strstart - s.block_start;
    if (len > left + s.strm.avail_in) {
      len = left + s.strm.avail_in;
    }
    if (len > have) {
      len = have;
    }
    if (len < min_block && (len === 0 && flush !== Z_FINISH$3 || flush === Z_NO_FLUSH$2 || len !== left + s.strm.avail_in)) {
      break;
    }
    last = flush === Z_FINISH$3 && len === left + s.strm.avail_in ? 1 : 0;
    _tr_stored_block(s, 0, 0, last);
    s.pending_buf[s.pending - 4] = len;
    s.pending_buf[s.pending - 3] = len >> 8;
    s.pending_buf[s.pending - 2] = ~len;
    s.pending_buf[s.pending - 1] = ~len >> 8;
    flush_pending(s.strm);
    if (left) {
      if (left > len) {
        left = len;
      }
      s.strm.output.set(s.window.subarray(s.block_start, s.block_start + left), s.strm.next_out);
      s.strm.next_out += left;
      s.strm.avail_out -= left;
      s.strm.total_out += left;
      s.block_start += left;
      len -= left;
    }
    if (len) {
      read_buf(s.strm, s.strm.output, s.strm.next_out, len);
      s.strm.next_out += len;
      s.strm.avail_out -= len;
      s.strm.total_out += len;
    }
  } while (last === 0);
  used -= s.strm.avail_in;
  if (used) {
    if (used >= s.w_size) {
      s.matches = 2;
      s.window.set(s.strm.input.subarray(s.strm.next_in - s.w_size, s.strm.next_in), 0);
      s.strstart = s.w_size;
      s.insert = s.strstart;
    } else {
      if (s.window_size - s.strstart <= used) {
        s.strstart -= s.w_size;
        s.window.set(s.window.subarray(s.w_size, s.w_size + s.strstart), 0);
        if (s.matches < 2) {
          s.matches++;
        }
        if (s.insert > s.strstart) {
          s.insert = s.strstart;
        }
      }
      s.window.set(s.strm.input.subarray(s.strm.next_in - used, s.strm.next_in), s.strstart);
      s.strstart += used;
      s.insert += used > s.w_size - s.insert ? s.w_size - s.insert : used;
    }
    s.block_start = s.strstart;
  }
  if (s.high_water < s.strstart) {
    s.high_water = s.strstart;
  }
  if (last) {
    return BS_FINISH_DONE;
  }
  if (flush !== Z_NO_FLUSH$2 && flush !== Z_FINISH$3 && s.strm.avail_in === 0 && s.strstart === s.block_start) {
    return BS_BLOCK_DONE;
  }
  have = s.window_size - s.strstart;
  if (s.strm.avail_in > have && s.block_start >= s.w_size) {
    s.block_start -= s.w_size;
    s.strstart -= s.w_size;
    s.window.set(s.window.subarray(s.w_size, s.w_size + s.strstart), 0);
    if (s.matches < 2) {
      s.matches++;
    }
    have += s.w_size;
    if (s.insert > s.strstart) {
      s.insert = s.strstart;
    }
  }
  if (have > s.strm.avail_in) {
    have = s.strm.avail_in;
  }
  if (have) {
    read_buf(s.strm, s.window, s.strstart, have);
    s.strstart += have;
    s.insert += have > s.w_size - s.insert ? s.w_size - s.insert : have;
  }
  if (s.high_water < s.strstart) {
    s.high_water = s.strstart;
  }
  have = s.bi_valid + 42 >> 3;
  have = s.pending_buf_size - have > 65535 ? 65535 : s.pending_buf_size - have;
  min_block = have > s.w_size ? s.w_size : have;
  left = s.strstart - s.block_start;
  if (left >= min_block || (left || flush === Z_FINISH$3) && flush !== Z_NO_FLUSH$2 && s.strm.avail_in === 0 && left <= have) {
    len = left > have ? have : left;
    last = flush === Z_FINISH$3 && s.strm.avail_in === 0 && len === left ? 1 : 0;
    _tr_stored_block(s, s.block_start, len, last);
    s.block_start += len;
    flush_pending(s.strm);
  }
  return last ? BS_FINISH_STARTED : BS_NEED_MORE;
};
var deflate_fast = (s, flush) => {
  let hash_head;
  let bflush;
  for (; ; ) {
    if (s.lookahead < MIN_LOOKAHEAD) {
      fill_window(s);
      if (s.lookahead < MIN_LOOKAHEAD && flush === Z_NO_FLUSH$2) {
        return BS_NEED_MORE;
      }
      if (s.lookahead === 0) {
        break;
      }
    }
    hash_head = 0;
    if (s.lookahead >= MIN_MATCH) {
      s.ins_h = HASH(s, s.ins_h, s.window[s.strstart + MIN_MATCH - 1]);
      hash_head = s.prev[s.strstart & s.w_mask] = s.head[s.ins_h];
      s.head[s.ins_h] = s.strstart;
    }
    if (hash_head !== 0 && s.strstart - hash_head <= s.w_size - MIN_LOOKAHEAD) {
      s.match_length = longest_match(s, hash_head);
    }
    if (s.match_length >= MIN_MATCH) {
      bflush = _tr_tally(s, s.strstart - s.match_start, s.match_length - MIN_MATCH);
      s.lookahead -= s.match_length;
      if (s.match_length <= s.max_lazy_match && s.lookahead >= MIN_MATCH) {
        s.match_length--;
        do {
          s.strstart++;
          s.ins_h = HASH(s, s.ins_h, s.window[s.strstart + MIN_MATCH - 1]);
          hash_head = s.prev[s.strstart & s.w_mask] = s.head[s.ins_h];
          s.head[s.ins_h] = s.strstart;
        } while (--s.match_length !== 0);
        s.strstart++;
      } else {
        s.strstart += s.match_length;
        s.match_length = 0;
        s.ins_h = s.window[s.strstart];
        s.ins_h = HASH(s, s.ins_h, s.window[s.strstart + 1]);
      }
    } else {
      bflush = _tr_tally(s, 0, s.window[s.strstart]);
      s.lookahead--;
      s.strstart++;
    }
    if (bflush) {
      flush_block_only(s, false);
      if (s.strm.avail_out === 0) {
        return BS_NEED_MORE;
      }
    }
  }
  s.insert = s.strstart < MIN_MATCH - 1 ? s.strstart : MIN_MATCH - 1;
  if (flush === Z_FINISH$3) {
    flush_block_only(s, true);
    if (s.strm.avail_out === 0) {
      return BS_FINISH_STARTED;
    }
    return BS_FINISH_DONE;
  }
  if (s.sym_next) {
    flush_block_only(s, false);
    if (s.strm.avail_out === 0) {
      return BS_NEED_MORE;
    }
  }
  return BS_BLOCK_DONE;
};
var deflate_slow = (s, flush) => {
  let hash_head;
  let bflush;
  let max_insert;
  for (; ; ) {
    if (s.lookahead < MIN_LOOKAHEAD) {
      fill_window(s);
      if (s.lookahead < MIN_LOOKAHEAD && flush === Z_NO_FLUSH$2) {
        return BS_NEED_MORE;
      }
      if (s.lookahead === 0) {
        break;
      }
    }
    hash_head = 0;
    if (s.lookahead >= MIN_MATCH) {
      s.ins_h = HASH(s, s.ins_h, s.window[s.strstart + MIN_MATCH - 1]);
      hash_head = s.prev[s.strstart & s.w_mask] = s.head[s.ins_h];
      s.head[s.ins_h] = s.strstart;
    }
    s.prev_length = s.match_length;
    s.prev_match = s.match_start;
    s.match_length = MIN_MATCH - 1;
    if (hash_head !== 0 && s.prev_length < s.max_lazy_match && s.strstart - hash_head <= s.w_size - MIN_LOOKAHEAD) {
      s.match_length = longest_match(s, hash_head);
      if (s.match_length <= 5 && (s.strategy === Z_FILTERED || s.match_length === MIN_MATCH && s.strstart - s.match_start > 4096)) {
        s.match_length = MIN_MATCH - 1;
      }
    }
    if (s.prev_length >= MIN_MATCH && s.match_length <= s.prev_length) {
      max_insert = s.strstart + s.lookahead - MIN_MATCH;
      bflush = _tr_tally(s, s.strstart - 1 - s.prev_match, s.prev_length - MIN_MATCH);
      s.lookahead -= s.prev_length - 1;
      s.prev_length -= 2;
      do {
        if (++s.strstart <= max_insert) {
          s.ins_h = HASH(s, s.ins_h, s.window[s.strstart + MIN_MATCH - 1]);
          hash_head = s.prev[s.strstart & s.w_mask] = s.head[s.ins_h];
          s.head[s.ins_h] = s.strstart;
        }
      } while (--s.prev_length !== 0);
      s.match_available = 0;
      s.match_length = MIN_MATCH - 1;
      s.strstart++;
      if (bflush) {
        flush_block_only(s, false);
        if (s.strm.avail_out === 0) {
          return BS_NEED_MORE;
        }
      }
    } else if (s.match_available) {
      bflush = _tr_tally(s, 0, s.window[s.strstart - 1]);
      if (bflush) {
        flush_block_only(s, false);
      }
      s.strstart++;
      s.lookahead--;
      if (s.strm.avail_out === 0) {
        return BS_NEED_MORE;
      }
    } else {
      s.match_available = 1;
      s.strstart++;
      s.lookahead--;
    }
  }
  if (s.match_available) {
    bflush = _tr_tally(s, 0, s.window[s.strstart - 1]);
    s.match_available = 0;
  }
  s.insert = s.strstart < MIN_MATCH - 1 ? s.strstart : MIN_MATCH - 1;
  if (flush === Z_FINISH$3) {
    flush_block_only(s, true);
    if (s.strm.avail_out === 0) {
      return BS_FINISH_STARTED;
    }
    return BS_FINISH_DONE;
  }
  if (s.sym_next) {
    flush_block_only(s, false);
    if (s.strm.avail_out === 0) {
      return BS_NEED_MORE;
    }
  }
  return BS_BLOCK_DONE;
};
var deflate_rle = (s, flush) => {
  let bflush;
  let prev;
  let scan, strend;
  const _win = s.window;
  for (; ; ) {
    if (s.lookahead <= MAX_MATCH) {
      fill_window(s);
      if (s.lookahead <= MAX_MATCH && flush === Z_NO_FLUSH$2) {
        return BS_NEED_MORE;
      }
      if (s.lookahead === 0) {
        break;
      }
    }
    s.match_length = 0;
    if (s.lookahead >= MIN_MATCH && s.strstart > 0) {
      scan = s.strstart - 1;
      prev = _win[scan];
      if (prev === _win[++scan] && prev === _win[++scan] && prev === _win[++scan]) {
        strend = s.strstart + MAX_MATCH;
        do {
        } while (prev === _win[++scan] && prev === _win[++scan] && prev === _win[++scan] && prev === _win[++scan] && prev === _win[++scan] && prev === _win[++scan] && prev === _win[++scan] && prev === _win[++scan] && scan < strend);
        s.match_length = MAX_MATCH - (strend - scan);
        if (s.match_length > s.lookahead) {
          s.match_length = s.lookahead;
        }
      }
    }
    if (s.match_length >= MIN_MATCH) {
      bflush = _tr_tally(s, 1, s.match_length - MIN_MATCH);
      s.lookahead -= s.match_length;
      s.strstart += s.match_length;
      s.match_length = 0;
    } else {
      bflush = _tr_tally(s, 0, s.window[s.strstart]);
      s.lookahead--;
      s.strstart++;
    }
    if (bflush) {
      flush_block_only(s, false);
      if (s.strm.avail_out === 0) {
        return BS_NEED_MORE;
      }
    }
  }
  s.insert = 0;
  if (flush === Z_FINISH$3) {
    flush_block_only(s, true);
    if (s.strm.avail_out === 0) {
      return BS_FINISH_STARTED;
    }
    return BS_FINISH_DONE;
  }
  if (s.sym_next) {
    flush_block_only(s, false);
    if (s.strm.avail_out === 0) {
      return BS_NEED_MORE;
    }
  }
  return BS_BLOCK_DONE;
};
var deflate_huff = (s, flush) => {
  let bflush;
  for (; ; ) {
    if (s.lookahead === 0) {
      fill_window(s);
      if (s.lookahead === 0) {
        if (flush === Z_NO_FLUSH$2) {
          return BS_NEED_MORE;
        }
        break;
      }
    }
    s.match_length = 0;
    bflush = _tr_tally(s, 0, s.window[s.strstart]);
    s.lookahead--;
    s.strstart++;
    if (bflush) {
      flush_block_only(s, false);
      if (s.strm.avail_out === 0) {
        return BS_NEED_MORE;
      }
    }
  }
  s.insert = 0;
  if (flush === Z_FINISH$3) {
    flush_block_only(s, true);
    if (s.strm.avail_out === 0) {
      return BS_FINISH_STARTED;
    }
    return BS_FINISH_DONE;
  }
  if (s.sym_next) {
    flush_block_only(s, false);
    if (s.strm.avail_out === 0) {
      return BS_NEED_MORE;
    }
  }
  return BS_BLOCK_DONE;
};
function Config(good_length, max_lazy, nice_length, max_chain, func) {
  this.good_length = good_length;
  this.max_lazy = max_lazy;
  this.nice_length = nice_length;
  this.max_chain = max_chain;
  this.func = func;
}
var configuration_table = [
  /*      good lazy nice chain */
  new Config(0, 0, 0, 0, deflate_stored),
  /* 0 store only */
  new Config(4, 4, 8, 4, deflate_fast),
  /* 1 max speed, no lazy matches */
  new Config(4, 5, 16, 8, deflate_fast),
  /* 2 */
  new Config(4, 6, 32, 32, deflate_fast),
  /* 3 */
  new Config(4, 4, 16, 16, deflate_slow),
  /* 4 lazy matches */
  new Config(8, 16, 32, 32, deflate_slow),
  /* 5 */
  new Config(8, 16, 128, 128, deflate_slow),
  /* 6 */
  new Config(8, 32, 128, 256, deflate_slow),
  /* 7 */
  new Config(32, 128, 258, 1024, deflate_slow),
  /* 8 */
  new Config(32, 258, 258, 4096, deflate_slow)
  /* 9 max compression */
];
var lm_init = (s) => {
  s.window_size = 2 * s.w_size;
  zero(s.head);
  s.max_lazy_match = configuration_table[s.level].max_lazy;
  s.good_match = configuration_table[s.level].good_length;
  s.nice_match = configuration_table[s.level].nice_length;
  s.max_chain_length = configuration_table[s.level].max_chain;
  s.strstart = 0;
  s.block_start = 0;
  s.lookahead = 0;
  s.insert = 0;
  s.match_length = s.prev_length = MIN_MATCH - 1;
  s.match_available = 0;
  s.ins_h = 0;
};
function DeflateState() {
  this.strm = null;
  this.status = 0;
  this.pending_buf = null;
  this.pending_buf_size = 0;
  this.pending_out = 0;
  this.pending = 0;
  this.wrap = 0;
  this.gzhead = null;
  this.gzindex = 0;
  this.method = Z_DEFLATED$2;
  this.last_flush = -1;
  this.w_size = 0;
  this.w_bits = 0;
  this.w_mask = 0;
  this.window = null;
  this.window_size = 0;
  this.prev = null;
  this.head = null;
  this.ins_h = 0;
  this.hash_size = 0;
  this.hash_bits = 0;
  this.hash_mask = 0;
  this.hash_shift = 0;
  this.block_start = 0;
  this.match_length = 0;
  this.prev_match = 0;
  this.match_available = 0;
  this.strstart = 0;
  this.match_start = 0;
  this.lookahead = 0;
  this.prev_length = 0;
  this.max_chain_length = 0;
  this.max_lazy_match = 0;
  this.level = 0;
  this.strategy = 0;
  this.good_match = 0;
  this.nice_match = 0;
  this.dyn_ltree = new Uint16Array(HEAP_SIZE * 2);
  this.dyn_dtree = new Uint16Array((2 * D_CODES + 1) * 2);
  this.bl_tree = new Uint16Array((2 * BL_CODES + 1) * 2);
  zero(this.dyn_ltree);
  zero(this.dyn_dtree);
  zero(this.bl_tree);
  this.l_desc = null;
  this.d_desc = null;
  this.bl_desc = null;
  this.bl_count = new Uint16Array(MAX_BITS + 1);
  this.heap = new Uint16Array(2 * L_CODES + 1);
  zero(this.heap);
  this.heap_len = 0;
  this.heap_max = 0;
  this.depth = new Uint16Array(2 * L_CODES + 1);
  zero(this.depth);
  this.sym_buf = 0;
  this.lit_bufsize = 0;
  this.sym_next = 0;
  this.sym_end = 0;
  this.opt_len = 0;
  this.static_len = 0;
  this.matches = 0;
  this.insert = 0;
  this.bi_buf = 0;
  this.bi_valid = 0;
}
var deflateStateCheck = (strm) => {
  if (!strm) {
    return 1;
  }
  const s = strm.state;
  if (!s || s.strm !== strm || s.status !== INIT_STATE && //#ifdef GZIP
  s.status !== GZIP_STATE && //#endif
  s.status !== EXTRA_STATE && s.status !== NAME_STATE && s.status !== COMMENT_STATE && s.status !== HCRC_STATE && s.status !== BUSY_STATE && s.status !== FINISH_STATE) {
    return 1;
  }
  return 0;
};
var deflateResetKeep = (strm) => {
  if (deflateStateCheck(strm)) {
    return err(strm, Z_STREAM_ERROR$2);
  }
  strm.total_in = strm.total_out = 0;
  strm.data_type = Z_UNKNOWN;
  const s = strm.state;
  s.pending = 0;
  s.pending_out = 0;
  if (s.wrap < 0) {
    s.wrap = -s.wrap;
  }
  s.status = //#ifdef GZIP
  s.wrap === 2 ? GZIP_STATE : (
    //#endif
    s.wrap ? INIT_STATE : BUSY_STATE
  );
  strm.adler = s.wrap === 2 ? 0 : 1;
  s.last_flush = -2;
  _tr_init(s);
  return Z_OK$3;
};
var deflateReset = (strm) => {
  const ret = deflateResetKeep(strm);
  if (ret === Z_OK$3) {
    lm_init(strm.state);
  }
  return ret;
};
var deflateSetHeader = (strm, head) => {
  if (deflateStateCheck(strm) || strm.state.wrap !== 2) {
    return Z_STREAM_ERROR$2;
  }
  strm.state.gzhead = head;
  return Z_OK$3;
};
var deflateInit2 = (strm, level, method, windowBits, memLevel, strategy) => {
  if (!strm) {
    return Z_STREAM_ERROR$2;
  }
  let wrap = 1;
  if (level === Z_DEFAULT_COMPRESSION$1) {
    level = 6;
  }
  if (windowBits < 0) {
    wrap = 0;
    windowBits = -windowBits;
  } else if (windowBits > 15) {
    wrap = 2;
    windowBits -= 16;
  }
  if (memLevel < 1 || memLevel > MAX_MEM_LEVEL || method !== Z_DEFLATED$2 || windowBits < 8 || windowBits > 15 || level < 0 || level > 9 || strategy < 0 || strategy > Z_FIXED || windowBits === 8 && wrap !== 1) {
    return err(strm, Z_STREAM_ERROR$2);
  }
  if (windowBits === 8) {
    windowBits = 9;
  }
  const s = new DeflateState();
  strm.state = s;
  s.strm = strm;
  s.status = INIT_STATE;
  s.wrap = wrap;
  s.gzhead = null;
  s.w_bits = windowBits;
  s.w_size = 1 << s.w_bits;
  s.w_mask = s.w_size - 1;
  s.hash_bits = memLevel + 7;
  s.hash_size = 1 << s.hash_bits;
  s.hash_mask = s.hash_size - 1;
  s.hash_shift = ~~((s.hash_bits + MIN_MATCH - 1) / MIN_MATCH);
  s.window = new Uint8Array(s.w_size * 2);
  s.head = new Uint16Array(s.hash_size);
  s.prev = new Uint16Array(s.w_size);
  s.lit_bufsize = 1 << memLevel + 6;
  s.pending_buf_size = s.lit_bufsize * 4;
  s.pending_buf = new Uint8Array(s.pending_buf_size);
  s.sym_buf = s.lit_bufsize;
  s.sym_end = (s.lit_bufsize - 1) * 3;
  s.level = level;
  s.strategy = strategy;
  s.method = method;
  return deflateReset(strm);
};
var deflateInit = (strm, level) => {
  return deflateInit2(strm, level, Z_DEFLATED$2, MAX_WBITS$1, DEF_MEM_LEVEL, Z_DEFAULT_STRATEGY$1);
};
var deflate$2 = (strm, flush) => {
  if (deflateStateCheck(strm) || flush > Z_BLOCK$1 || flush < 0) {
    return strm ? err(strm, Z_STREAM_ERROR$2) : Z_STREAM_ERROR$2;
  }
  const s = strm.state;
  if (!strm.output || strm.avail_in !== 0 && !strm.input || s.status === FINISH_STATE && flush !== Z_FINISH$3) {
    return err(strm, strm.avail_out === 0 ? Z_BUF_ERROR$1 : Z_STREAM_ERROR$2);
  }
  const old_flush = s.last_flush;
  s.last_flush = flush;
  if (s.pending !== 0) {
    flush_pending(strm);
    if (strm.avail_out === 0) {
      s.last_flush = -1;
      return Z_OK$3;
    }
  } else if (strm.avail_in === 0 && rank(flush) <= rank(old_flush) && flush !== Z_FINISH$3) {
    return err(strm, Z_BUF_ERROR$1);
  }
  if (s.status === FINISH_STATE && strm.avail_in !== 0) {
    return err(strm, Z_BUF_ERROR$1);
  }
  if (s.status === INIT_STATE && s.wrap === 0) {
    s.status = BUSY_STATE;
  }
  if (s.status === INIT_STATE) {
    let header = Z_DEFLATED$2 + (s.w_bits - 8 << 4) << 8;
    let level_flags = -1;
    if (s.strategy >= Z_HUFFMAN_ONLY || s.level < 2) {
      level_flags = 0;
    } else if (s.level < 6) {
      level_flags = 1;
    } else if (s.level === 6) {
      level_flags = 2;
    } else {
      level_flags = 3;
    }
    header |= level_flags << 6;
    if (s.strstart !== 0) {
      header |= PRESET_DICT;
    }
    header += 31 - header % 31;
    putShortMSB(s, header);
    if (s.strstart !== 0) {
      putShortMSB(s, strm.adler >>> 16);
      putShortMSB(s, strm.adler & 65535);
    }
    strm.adler = 1;
    s.status = BUSY_STATE;
    flush_pending(strm);
    if (s.pending !== 0) {
      s.last_flush = -1;
      return Z_OK$3;
    }
  }
  if (s.status === GZIP_STATE) {
    strm.adler = 0;
    put_byte(s, 31);
    put_byte(s, 139);
    put_byte(s, 8);
    if (!s.gzhead) {
      put_byte(s, 0);
      put_byte(s, 0);
      put_byte(s, 0);
      put_byte(s, 0);
      put_byte(s, 0);
      put_byte(s, s.level === 9 ? 2 : s.strategy >= Z_HUFFMAN_ONLY || s.level < 2 ? 4 : 0);
      put_byte(s, OS_CODE);
      s.status = BUSY_STATE;
      flush_pending(strm);
      if (s.pending !== 0) {
        s.last_flush = -1;
        return Z_OK$3;
      }
    } else {
      put_byte(
        s,
        (s.gzhead.text ? 1 : 0) + (s.gzhead.hcrc ? 2 : 0) + (!s.gzhead.extra ? 0 : 4) + (!s.gzhead.name ? 0 : 8) + (!s.gzhead.comment ? 0 : 16)
      );
      put_byte(s, s.gzhead.time & 255);
      put_byte(s, s.gzhead.time >> 8 & 255);
      put_byte(s, s.gzhead.time >> 16 & 255);
      put_byte(s, s.gzhead.time >> 24 & 255);
      put_byte(s, s.level === 9 ? 2 : s.strategy >= Z_HUFFMAN_ONLY || s.level < 2 ? 4 : 0);
      put_byte(s, s.gzhead.os & 255);
      if (s.gzhead.extra && s.gzhead.extra.length) {
        put_byte(s, s.gzhead.extra.length & 255);
        put_byte(s, s.gzhead.extra.length >> 8 & 255);
      }
      if (s.gzhead.hcrc) {
        strm.adler = crc32_1(strm.adler, s.pending_buf, s.pending, 0);
      }
      s.gzindex = 0;
      s.status = EXTRA_STATE;
    }
  }
  if (s.status === EXTRA_STATE) {
    if (s.gzhead.extra) {
      let beg = s.pending;
      let left = (s.gzhead.extra.length & 65535) - s.gzindex;
      while (s.pending + left > s.pending_buf_size) {
        let copy = s.pending_buf_size - s.pending;
        s.pending_buf.set(s.gzhead.extra.subarray(s.gzindex, s.gzindex + copy), s.pending);
        s.pending = s.pending_buf_size;
        if (s.gzhead.hcrc && s.pending > beg) {
          strm.adler = crc32_1(strm.adler, s.pending_buf, s.pending - beg, beg);
        }
        s.gzindex += copy;
        flush_pending(strm);
        if (s.pending !== 0) {
          s.last_flush = -1;
          return Z_OK$3;
        }
        beg = 0;
        left -= copy;
      }
      let gzhead_extra = new Uint8Array(s.gzhead.extra);
      s.pending_buf.set(gzhead_extra.subarray(s.gzindex, s.gzindex + left), s.pending);
      s.pending += left;
      if (s.gzhead.hcrc && s.pending > beg) {
        strm.adler = crc32_1(strm.adler, s.pending_buf, s.pending - beg, beg);
      }
      s.gzindex = 0;
    }
    s.status = NAME_STATE;
  }
  if (s.status === NAME_STATE) {
    if (s.gzhead.name) {
      let beg = s.pending;
      let val;
      do {
        if (s.pending === s.pending_buf_size) {
          if (s.gzhead.hcrc && s.pending > beg) {
            strm.adler = crc32_1(strm.adler, s.pending_buf, s.pending - beg, beg);
          }
          flush_pending(strm);
          if (s.pending !== 0) {
            s.last_flush = -1;
            return Z_OK$3;
          }
          beg = 0;
        }
        if (s.gzindex < s.gzhead.name.length) {
          val = s.gzhead.name.charCodeAt(s.gzindex++) & 255;
        } else {
          val = 0;
        }
        put_byte(s, val);
      } while (val !== 0);
      if (s.gzhead.hcrc && s.pending > beg) {
        strm.adler = crc32_1(strm.adler, s.pending_buf, s.pending - beg, beg);
      }
      s.gzindex = 0;
    }
    s.status = COMMENT_STATE;
  }
  if (s.status === COMMENT_STATE) {
    if (s.gzhead.comment) {
      let beg = s.pending;
      let val;
      do {
        if (s.pending === s.pending_buf_size) {
          if (s.gzhead.hcrc && s.pending > beg) {
            strm.adler = crc32_1(strm.adler, s.pending_buf, s.pending - beg, beg);
          }
          flush_pending(strm);
          if (s.pending !== 0) {
            s.last_flush = -1;
            return Z_OK$3;
          }
          beg = 0;
        }
        if (s.gzindex < s.gzhead.comment.length) {
          val = s.gzhead.comment.charCodeAt(s.gzindex++) & 255;
        } else {
          val = 0;
        }
        put_byte(s, val);
      } while (val !== 0);
      if (s.gzhead.hcrc && s.pending > beg) {
        strm.adler = crc32_1(strm.adler, s.pending_buf, s.pending - beg, beg);
      }
    }
    s.status = HCRC_STATE;
  }
  if (s.status === HCRC_STATE) {
    if (s.gzhead.hcrc) {
      if (s.pending + 2 > s.pending_buf_size) {
        flush_pending(strm);
        if (s.pending !== 0) {
          s.last_flush = -1;
          return Z_OK$3;
        }
      }
      put_byte(s, strm.adler & 255);
      put_byte(s, strm.adler >> 8 & 255);
      strm.adler = 0;
    }
    s.status = BUSY_STATE;
    flush_pending(strm);
    if (s.pending !== 0) {
      s.last_flush = -1;
      return Z_OK$3;
    }
  }
  if (strm.avail_in !== 0 || s.lookahead !== 0 || flush !== Z_NO_FLUSH$2 && s.status !== FINISH_STATE) {
    let bstate = s.level === 0 ? deflate_stored(s, flush) : s.strategy === Z_HUFFMAN_ONLY ? deflate_huff(s, flush) : s.strategy === Z_RLE ? deflate_rle(s, flush) : configuration_table[s.level].func(s, flush);
    if (bstate === BS_FINISH_STARTED || bstate === BS_FINISH_DONE) {
      s.status = FINISH_STATE;
    }
    if (bstate === BS_NEED_MORE || bstate === BS_FINISH_STARTED) {
      if (strm.avail_out === 0) {
        s.last_flush = -1;
      }
      return Z_OK$3;
    }
    if (bstate === BS_BLOCK_DONE) {
      if (flush === Z_PARTIAL_FLUSH) {
        _tr_align(s);
      } else if (flush !== Z_BLOCK$1) {
        _tr_stored_block(s, 0, 0, false);
        if (flush === Z_FULL_FLUSH$1) {
          zero(s.head);
          if (s.lookahead === 0) {
            s.strstart = 0;
            s.block_start = 0;
            s.insert = 0;
          }
        }
      }
      flush_pending(strm);
      if (strm.avail_out === 0) {
        s.last_flush = -1;
        return Z_OK$3;
      }
    }
  }
  if (flush !== Z_FINISH$3) {
    return Z_OK$3;
  }
  if (s.wrap <= 0) {
    return Z_STREAM_END$3;
  }
  if (s.wrap === 2) {
    put_byte(s, strm.adler & 255);
    put_byte(s, strm.adler >> 8 & 255);
    put_byte(s, strm.adler >> 16 & 255);
    put_byte(s, strm.adler >> 24 & 255);
    put_byte(s, strm.total_in & 255);
    put_byte(s, strm.total_in >> 8 & 255);
    put_byte(s, strm.total_in >> 16 & 255);
    put_byte(s, strm.total_in >> 24 & 255);
  } else {
    putShortMSB(s, strm.adler >>> 16);
    putShortMSB(s, strm.adler & 65535);
  }
  flush_pending(strm);
  if (s.wrap > 0) {
    s.wrap = -s.wrap;
  }
  return s.pending !== 0 ? Z_OK$3 : Z_STREAM_END$3;
};
var deflateEnd = (strm) => {
  if (deflateStateCheck(strm)) {
    return Z_STREAM_ERROR$2;
  }
  const status = strm.state.status;
  strm.state = null;
  return status === BUSY_STATE ? err(strm, Z_DATA_ERROR$2) : Z_OK$3;
};
var deflateSetDictionary = (strm, dictionary) => {
  let dictLength = dictionary.length;
  if (deflateStateCheck(strm)) {
    return Z_STREAM_ERROR$2;
  }
  const s = strm.state;
  const wrap = s.wrap;
  if (wrap === 2 || wrap === 1 && s.status !== INIT_STATE || s.lookahead) {
    return Z_STREAM_ERROR$2;
  }
  if (wrap === 1) {
    strm.adler = adler32_1(strm.adler, dictionary, dictLength, 0);
  }
  s.wrap = 0;
  if (dictLength >= s.w_size) {
    if (wrap === 0) {
      zero(s.head);
      s.strstart = 0;
      s.block_start = 0;
      s.insert = 0;
    }
    let tmpDict = new Uint8Array(s.w_size);
    tmpDict.set(dictionary.subarray(dictLength - s.w_size, dictLength), 0);
    dictionary = tmpDict;
    dictLength = s.w_size;
  }
  const avail = strm.avail_in;
  const next = strm.next_in;
  const input = strm.input;
  strm.avail_in = dictLength;
  strm.next_in = 0;
  strm.input = dictionary;
  fill_window(s);
  while (s.lookahead >= MIN_MATCH) {
    let str = s.strstart;
    let n = s.lookahead - (MIN_MATCH - 1);
    do {
      s.ins_h = HASH(s, s.ins_h, s.window[str + MIN_MATCH - 1]);
      s.prev[str & s.w_mask] = s.head[s.ins_h];
      s.head[s.ins_h] = str;
      str++;
    } while (--n);
    s.strstart = str;
    s.lookahead = MIN_MATCH - 1;
    fill_window(s);
  }
  s.strstart += s.lookahead;
  s.block_start = s.strstart;
  s.insert = s.lookahead;
  s.lookahead = 0;
  s.match_length = s.prev_length = MIN_MATCH - 1;
  s.match_available = 0;
  strm.next_in = next;
  strm.input = input;
  strm.avail_in = avail;
  s.wrap = wrap;
  return Z_OK$3;
};
var deflateInit_1 = deflateInit;
var deflateInit2_1 = deflateInit2;
var deflateReset_1 = deflateReset;
var deflateResetKeep_1 = deflateResetKeep;
var deflateSetHeader_1 = deflateSetHeader;
var deflate_2$1 = deflate$2;
var deflateEnd_1 = deflateEnd;
var deflateSetDictionary_1 = deflateSetDictionary;
var deflateInfo = "pako deflate (from Nodeca project)";
var deflate_1$2 = {
  deflateInit: deflateInit_1,
  deflateInit2: deflateInit2_1,
  deflateReset: deflateReset_1,
  deflateResetKeep: deflateResetKeep_1,
  deflateSetHeader: deflateSetHeader_1,
  deflate: deflate_2$1,
  deflateEnd: deflateEnd_1,
  deflateSetDictionary: deflateSetDictionary_1,
  deflateInfo
};
var _has = (obj, key) => {
  return Object.prototype.hasOwnProperty.call(obj, key);
};
var assign = function(obj) {
  const sources = Array.prototype.slice.call(arguments, 1);
  while (sources.length) {
    const source = sources.shift();
    if (!source) {
      continue;
    }
    if (typeof source !== "object") {
      throw new TypeError(source + "must be non-object");
    }
    for (const p in source) {
      if (_has(source, p)) {
        obj[p] = source[p];
      }
    }
  }
  return obj;
};
var flattenChunks = (chunks) => {
  let len = 0;
  for (let i = 0, l = chunks.length; i < l; i++) {
    len += chunks[i].length;
  }
  const result = new Uint8Array(len);
  for (let i = 0, pos = 0, l = chunks.length; i < l; i++) {
    let chunk = chunks[i];
    result.set(chunk, pos);
    pos += chunk.length;
  }
  return result;
};
var common = {
  assign,
  flattenChunks
};
var STR_APPLY_UIA_OK = true;
try {
  String.fromCharCode.apply(null, new Uint8Array(1));
} catch (__) {
  STR_APPLY_UIA_OK = false;
}
var _utf8len = new Uint8Array(256);
for (let q = 0; q < 256; q++) {
  _utf8len[q] = q >= 252 ? 6 : q >= 248 ? 5 : q >= 240 ? 4 : q >= 224 ? 3 : q >= 192 ? 2 : 1;
}
_utf8len[254] = _utf8len[254] = 1;
var string2buf = (str) => {
  if (typeof TextEncoder === "function" && TextEncoder.prototype.encode) {
    return new TextEncoder().encode(str);
  }
  let buf, c, c2, m_pos, i, str_len = str.length, buf_len = 0;
  for (m_pos = 0; m_pos < str_len; m_pos++) {
    c = str.charCodeAt(m_pos);
    if ((c & 64512) === 55296 && m_pos + 1 < str_len) {
      c2 = str.charCodeAt(m_pos + 1);
      if ((c2 & 64512) === 56320) {
        c = 65536 + (c - 55296 << 10) + (c2 - 56320);
        m_pos++;
      }
    }
    buf_len += c < 128 ? 1 : c < 2048 ? 2 : c < 65536 ? 3 : 4;
  }
  buf = new Uint8Array(buf_len);
  for (i = 0, m_pos = 0; i < buf_len; m_pos++) {
    c = str.charCodeAt(m_pos);
    if ((c & 64512) === 55296 && m_pos + 1 < str_len) {
      c2 = str.charCodeAt(m_pos + 1);
      if ((c2 & 64512) === 56320) {
        c = 65536 + (c - 55296 << 10) + (c2 - 56320);
        m_pos++;
      }
    }
    if (c < 128) {
      buf[i++] = c;
    } else if (c < 2048) {
      buf[i++] = 192 | c >>> 6;
      buf[i++] = 128 | c & 63;
    } else if (c < 65536) {
      buf[i++] = 224 | c >>> 12;
      buf[i++] = 128 | c >>> 6 & 63;
      buf[i++] = 128 | c & 63;
    } else {
      buf[i++] = 240 | c >>> 18;
      buf[i++] = 128 | c >>> 12 & 63;
      buf[i++] = 128 | c >>> 6 & 63;
      buf[i++] = 128 | c & 63;
    }
  }
  return buf;
};
var buf2binstring = (buf, len) => {
  if (len < 65534) {
    if (buf.subarray && STR_APPLY_UIA_OK) {
      return String.fromCharCode.apply(null, buf.length === len ? buf : buf.subarray(0, len));
    }
  }
  let result = "";
  for (let i = 0; i < len; i++) {
    result += String.fromCharCode(buf[i]);
  }
  return result;
};
var buf2string = (buf, max) => {
  const len = max || buf.length;
  if (typeof TextDecoder === "function" && TextDecoder.prototype.decode) {
    return new TextDecoder().decode(buf.subarray(0, max));
  }
  let i, out;
  const utf16buf = new Array(len * 2);
  for (out = 0, i = 0; i < len; ) {
    let c = buf[i++];
    if (c < 128) {
      utf16buf[out++] = c;
      continue;
    }
    let c_len = _utf8len[c];
    if (c_len > 4) {
      utf16buf[out++] = 65533;
      i += c_len - 1;
      continue;
    }
    c &= c_len === 2 ? 31 : c_len === 3 ? 15 : 7;
    while (c_len > 1 && i < len) {
      c = c << 6 | buf[i++] & 63;
      c_len--;
    }
    if (c_len > 1) {
      utf16buf[out++] = 65533;
      continue;
    }
    if (c < 65536) {
      utf16buf[out++] = c;
    } else {
      c -= 65536;
      utf16buf[out++] = 55296 | c >> 10 & 1023;
      utf16buf[out++] = 56320 | c & 1023;
    }
  }
  return buf2binstring(utf16buf, out);
};
var utf8border = (buf, max) => {
  max = max || buf.length;
  if (max > buf.length) {
    max = buf.length;
  }
  let pos = max - 1;
  while (pos >= 0 && (buf[pos] & 192) === 128) {
    pos--;
  }
  if (pos < 0) {
    return max;
  }
  if (pos === 0) {
    return max;
  }
  return pos + _utf8len[buf[pos]] > max ? pos : max;
};
var strings = {
  string2buf,
  buf2string,
  utf8border
};
function ZStream() {
  this.input = null;
  this.next_in = 0;
  this.avail_in = 0;
  this.total_in = 0;
  this.output = null;
  this.next_out = 0;
  this.avail_out = 0;
  this.total_out = 0;
  this.msg = "";
  this.state = null;
  this.data_type = 2;
  this.adler = 0;
}
var zstream = ZStream;
var toString$1 = Object.prototype.toString;
var {
  Z_NO_FLUSH: Z_NO_FLUSH$1,
  Z_SYNC_FLUSH,
  Z_FULL_FLUSH,
  Z_FINISH: Z_FINISH$2,
  Z_OK: Z_OK$2,
  Z_STREAM_END: Z_STREAM_END$2,
  Z_DEFAULT_COMPRESSION,
  Z_DEFAULT_STRATEGY,
  Z_DEFLATED: Z_DEFLATED$1
} = constants$2;
function Deflate$1(options) {
  this.options = common.assign({
    level: Z_DEFAULT_COMPRESSION,
    method: Z_DEFLATED$1,
    chunkSize: 16384,
    windowBits: 15,
    memLevel: 8,
    strategy: Z_DEFAULT_STRATEGY
  }, options || {});
  let opt = this.options;
  if (opt.raw && opt.windowBits > 0) {
    opt.windowBits = -opt.windowBits;
  } else if (opt.gzip && opt.windowBits > 0 && opt.windowBits < 16) {
    opt.windowBits += 16;
  }
  this.err = 0;
  this.msg = "";
  this.ended = false;
  this.chunks = [];
  this.strm = new zstream();
  this.strm.avail_out = 0;
  let status = deflate_1$2.deflateInit2(
    this.strm,
    opt.level,
    opt.method,
    opt.windowBits,
    opt.memLevel,
    opt.strategy
  );
  if (status !== Z_OK$2) {
    throw new Error(messages[status]);
  }
  if (opt.header) {
    deflate_1$2.deflateSetHeader(this.strm, opt.header);
  }
  if (opt.dictionary) {
    let dict;
    if (typeof opt.dictionary === "string") {
      dict = strings.string2buf(opt.dictionary);
    } else if (toString$1.call(opt.dictionary) === "[object ArrayBuffer]") {
      dict = new Uint8Array(opt.dictionary);
    } else {
      dict = opt.dictionary;
    }
    status = deflate_1$2.deflateSetDictionary(this.strm, dict);
    if (status !== Z_OK$2) {
      throw new Error(messages[status]);
    }
    this._dict_set = true;
  }
}
Deflate$1.prototype.push = function(data, flush_mode) {
  const strm = this.strm;
  const chunkSize = this.options.chunkSize;
  let status, _flush_mode;
  if (this.ended) {
    return false;
  }
  if (flush_mode === ~~flush_mode) _flush_mode = flush_mode;
  else _flush_mode = flush_mode === true ? Z_FINISH$2 : Z_NO_FLUSH$1;
  if (typeof data === "string") {
    strm.input = strings.string2buf(data);
  } else if (toString$1.call(data) === "[object ArrayBuffer]") {
    strm.input = new Uint8Array(data);
  } else {
    strm.input = data;
  }
  strm.next_in = 0;
  strm.avail_in = strm.input.length;
  for (; ; ) {
    if (strm.avail_out === 0) {
      strm.output = new Uint8Array(chunkSize);
      strm.next_out = 0;
      strm.avail_out = chunkSize;
    }
    if ((_flush_mode === Z_SYNC_FLUSH || _flush_mode === Z_FULL_FLUSH) && strm.avail_out <= 6) {
      this.onData(strm.output.subarray(0, strm.next_out));
      strm.avail_out = 0;
      continue;
    }
    status = deflate_1$2.deflate(strm, _flush_mode);
    if (status === Z_STREAM_END$2) {
      if (strm.next_out > 0) {
        this.onData(strm.output.subarray(0, strm.next_out));
      }
      status = deflate_1$2.deflateEnd(this.strm);
      this.onEnd(status);
      this.ended = true;
      return status === Z_OK$2;
    }
    if (strm.avail_out === 0) {
      this.onData(strm.output);
      continue;
    }
    if (_flush_mode > 0 && strm.next_out > 0) {
      this.onData(strm.output.subarray(0, strm.next_out));
      strm.avail_out = 0;
      continue;
    }
    if (strm.avail_in === 0) break;
  }
  return true;
};
Deflate$1.prototype.onData = function(chunk) {
  this.chunks.push(chunk);
};
Deflate$1.prototype.onEnd = function(status) {
  if (status === Z_OK$2) {
    this.result = common.flattenChunks(this.chunks);
  }
  this.chunks = [];
  this.err = status;
  this.msg = this.strm.msg;
};
function deflate$1(input, options) {
  const deflator = new Deflate$1(options);
  deflator.push(input, true);
  if (deflator.err) {
    throw deflator.msg || messages[deflator.err];
  }
  return deflator.result;
}
function deflateRaw$1(input, options) {
  options = options || {};
  options.raw = true;
  return deflate$1(input, options);
}
function gzip$1(input, options) {
  options = options || {};
  options.gzip = true;
  return deflate$1(input, options);
}
var Deflate_1$1 = Deflate$1;
var deflate_2 = deflate$1;
var deflateRaw_1$1 = deflateRaw$1;
var gzip_1$1 = gzip$1;
var constants$1 = constants$2;
var deflate_1$1 = {
  Deflate: Deflate_1$1,
  deflate: deflate_2,
  deflateRaw: deflateRaw_1$1,
  gzip: gzip_1$1,
  constants: constants$1
};
var BAD$1 = 16209;
var TYPE$1 = 16191;
var inffast = function inflate_fast(strm, start) {
  let _in;
  let last;
  let _out;
  let beg;
  let end;
  let dmax;
  let wsize;
  let whave;
  let wnext;
  let s_window;
  let hold;
  let bits;
  let lcode;
  let dcode;
  let lmask;
  let dmask;
  let here;
  let op;
  let len;
  let dist;
  let from;
  let from_source;
  let input, output;
  const state = strm.state;
  _in = strm.next_in;
  input = strm.input;
  last = _in + (strm.avail_in - 5);
  _out = strm.next_out;
  output = strm.output;
  beg = _out - (start - strm.avail_out);
  end = _out + (strm.avail_out - 257);
  dmax = state.dmax;
  wsize = state.wsize;
  whave = state.whave;
  wnext = state.wnext;
  s_window = state.window;
  hold = state.hold;
  bits = state.bits;
  lcode = state.lencode;
  dcode = state.distcode;
  lmask = (1 << state.lenbits) - 1;
  dmask = (1 << state.distbits) - 1;
  top:
    do {
      if (bits < 15) {
        hold += input[_in++] << bits;
        bits += 8;
        hold += input[_in++] << bits;
        bits += 8;
      }
      here = lcode[hold & lmask];
      dolen:
        for (; ; ) {
          op = here >>> 24;
          hold >>>= op;
          bits -= op;
          op = here >>> 16 & 255;
          if (op === 0) {
            output[_out++] = here & 65535;
          } else if (op & 16) {
            len = here & 65535;
            op &= 15;
            if (op) {
              if (bits < op) {
                hold += input[_in++] << bits;
                bits += 8;
              }
              len += hold & (1 << op) - 1;
              hold >>>= op;
              bits -= op;
            }
            if (bits < 15) {
              hold += input[_in++] << bits;
              bits += 8;
              hold += input[_in++] << bits;
              bits += 8;
            }
            here = dcode[hold & dmask];
            dodist:
              for (; ; ) {
                op = here >>> 24;
                hold >>>= op;
                bits -= op;
                op = here >>> 16 & 255;
                if (op & 16) {
                  dist = here & 65535;
                  op &= 15;
                  if (bits < op) {
                    hold += input[_in++] << bits;
                    bits += 8;
                    if (bits < op) {
                      hold += input[_in++] << bits;
                      bits += 8;
                    }
                  }
                  dist += hold & (1 << op) - 1;
                  if (dist > dmax) {
                    strm.msg = "invalid distance too far back";
                    state.mode = BAD$1;
                    break top;
                  }
                  hold >>>= op;
                  bits -= op;
                  op = _out - beg;
                  if (dist > op) {
                    op = dist - op;
                    if (op > whave) {
                      if (state.sane) {
                        strm.msg = "invalid distance too far back";
                        state.mode = BAD$1;
                        break top;
                      }
                    }
                    from = 0;
                    from_source = s_window;
                    if (wnext === 0) {
                      from += wsize - op;
                      if (op < len) {
                        len -= op;
                        do {
                          output[_out++] = s_window[from++];
                        } while (--op);
                        from = _out - dist;
                        from_source = output;
                      }
                    } else if (wnext < op) {
                      from += wsize + wnext - op;
                      op -= wnext;
                      if (op < len) {
                        len -= op;
                        do {
                          output[_out++] = s_window[from++];
                        } while (--op);
                        from = 0;
                        if (wnext < len) {
                          op = wnext;
                          len -= op;
                          do {
                            output[_out++] = s_window[from++];
                          } while (--op);
                          from = _out - dist;
                          from_source = output;
                        }
                      }
                    } else {
                      from += wnext - op;
                      if (op < len) {
                        len -= op;
                        do {
                          output[_out++] = s_window[from++];
                        } while (--op);
                        from = _out - dist;
                        from_source = output;
                      }
                    }
                    while (len > 2) {
                      output[_out++] = from_source[from++];
                      output[_out++] = from_source[from++];
                      output[_out++] = from_source[from++];
                      len -= 3;
                    }
                    if (len) {
                      output[_out++] = from_source[from++];
                      if (len > 1) {
                        output[_out++] = from_source[from++];
                      }
                    }
                  } else {
                    from = _out - dist;
                    do {
                      output[_out++] = output[from++];
                      output[_out++] = output[from++];
                      output[_out++] = output[from++];
                      len -= 3;
                    } while (len > 2);
                    if (len) {
                      output[_out++] = output[from++];
                      if (len > 1) {
                        output[_out++] = output[from++];
                      }
                    }
                  }
                } else if ((op & 64) === 0) {
                  here = dcode[(here & 65535) + (hold & (1 << op) - 1)];
                  continue dodist;
                } else {
                  strm.msg = "invalid distance code";
                  state.mode = BAD$1;
                  break top;
                }
                break;
              }
          } else if ((op & 64) === 0) {
            here = lcode[(here & 65535) + (hold & (1 << op) - 1)];
            continue dolen;
          } else if (op & 32) {
            state.mode = TYPE$1;
            break top;
          } else {
            strm.msg = "invalid literal/length code";
            state.mode = BAD$1;
            break top;
          }
          break;
        }
    } while (_in < last && _out < end);
  len = bits >> 3;
  _in -= len;
  bits -= len << 3;
  hold &= (1 << bits) - 1;
  strm.next_in = _in;
  strm.next_out = _out;
  strm.avail_in = _in < last ? 5 + (last - _in) : 5 - (_in - last);
  strm.avail_out = _out < end ? 257 + (end - _out) : 257 - (_out - end);
  state.hold = hold;
  state.bits = bits;
  return;
};
var MAXBITS = 15;
var ENOUGH_LENS$1 = 852;
var ENOUGH_DISTS$1 = 592;
var CODES$1 = 0;
var LENS$1 = 1;
var DISTS$1 = 2;
var lbase = new Uint16Array([
  /* Length codes 257..285 base */
  3,
  4,
  5,
  6,
  7,
  8,
  9,
  10,
  11,
  13,
  15,
  17,
  19,
  23,
  27,
  31,
  35,
  43,
  51,
  59,
  67,
  83,
  99,
  115,
  131,
  163,
  195,
  227,
  258,
  0,
  0
]);
var lext = new Uint8Array([
  /* Length codes 257..285 extra */
  16,
  16,
  16,
  16,
  16,
  16,
  16,
  16,
  17,
  17,
  17,
  17,
  18,
  18,
  18,
  18,
  19,
  19,
  19,
  19,
  20,
  20,
  20,
  20,
  21,
  21,
  21,
  21,
  16,
  72,
  78
]);
var dbase = new Uint16Array([
  /* Distance codes 0..29 base */
  1,
  2,
  3,
  4,
  5,
  7,
  9,
  13,
  17,
  25,
  33,
  49,
  65,
  97,
  129,
  193,
  257,
  385,
  513,
  769,
  1025,
  1537,
  2049,
  3073,
  4097,
  6145,
  8193,
  12289,
  16385,
  24577,
  0,
  0
]);
var dext = new Uint8Array([
  /* Distance codes 0..29 extra */
  16,
  16,
  16,
  16,
  17,
  17,
  18,
  18,
  19,
  19,
  20,
  20,
  21,
  21,
  22,
  22,
  23,
  23,
  24,
  24,
  25,
  25,
  26,
  26,
  27,
  27,
  28,
  28,
  29,
  29,
  64,
  64
]);
var inflate_table = (type, lens, lens_index, codes, table, table_index, work, opts) => {
  const bits = opts.bits;
  let len = 0;
  let sym = 0;
  let min = 0, max = 0;
  let root = 0;
  let curr = 0;
  let drop = 0;
  let left = 0;
  let used = 0;
  let huff = 0;
  let incr;
  let fill;
  let low;
  let mask;
  let next;
  let base = null;
  let match;
  const count = new Uint16Array(MAXBITS + 1);
  const offs = new Uint16Array(MAXBITS + 1);
  let extra = null;
  let here_bits, here_op, here_val;
  for (len = 0; len <= MAXBITS; len++) {
    count[len] = 0;
  }
  for (sym = 0; sym < codes; sym++) {
    count[lens[lens_index + sym]]++;
  }
  root = bits;
  for (max = MAXBITS; max >= 1; max--) {
    if (count[max] !== 0) {
      break;
    }
  }
  if (root > max) {
    root = max;
  }
  if (max === 0) {
    table[table_index++] = 1 << 24 | 64 << 16 | 0;
    table[table_index++] = 1 << 24 | 64 << 16 | 0;
    opts.bits = 1;
    return 0;
  }
  for (min = 1; min < max; min++) {
    if (count[min] !== 0) {
      break;
    }
  }
  if (root < min) {
    root = min;
  }
  left = 1;
  for (len = 1; len <= MAXBITS; len++) {
    left <<= 1;
    left -= count[len];
    if (left < 0) {
      return -1;
    }
  }
  if (left > 0 && (type === CODES$1 || max !== 1)) {
    return -1;
  }
  offs[1] = 0;
  for (len = 1; len < MAXBITS; len++) {
    offs[len + 1] = offs[len] + count[len];
  }
  for (sym = 0; sym < codes; sym++) {
    if (lens[lens_index + sym] !== 0) {
      work[offs[lens[lens_index + sym]]++] = sym;
    }
  }
  if (type === CODES$1) {
    base = extra = work;
    match = 20;
  } else if (type === LENS$1) {
    base = lbase;
    extra = lext;
    match = 257;
  } else {
    base = dbase;
    extra = dext;
    match = 0;
  }
  huff = 0;
  sym = 0;
  len = min;
  next = table_index;
  curr = root;
  drop = 0;
  low = -1;
  used = 1 << root;
  mask = used - 1;
  if (type === LENS$1 && used > ENOUGH_LENS$1 || type === DISTS$1 && used > ENOUGH_DISTS$1) {
    return 1;
  }
  for (; ; ) {
    here_bits = len - drop;
    if (work[sym] + 1 < match) {
      here_op = 0;
      here_val = work[sym];
    } else if (work[sym] >= match) {
      here_op = extra[work[sym] - match];
      here_val = base[work[sym] - match];
    } else {
      here_op = 32 + 64;
      here_val = 0;
    }
    incr = 1 << len - drop;
    fill = 1 << curr;
    min = fill;
    do {
      fill -= incr;
      table[next + (huff >> drop) + fill] = here_bits << 24 | here_op << 16 | here_val | 0;
    } while (fill !== 0);
    incr = 1 << len - 1;
    while (huff & incr) {
      incr >>= 1;
    }
    if (incr !== 0) {
      huff &= incr - 1;
      huff += incr;
    } else {
      huff = 0;
    }
    sym++;
    if (--count[len] === 0) {
      if (len === max) {
        break;
      }
      len = lens[lens_index + work[sym]];
    }
    if (len > root && (huff & mask) !== low) {
      if (drop === 0) {
        drop = root;
      }
      next += min;
      curr = len - drop;
      left = 1 << curr;
      while (curr + drop < max) {
        left -= count[curr + drop];
        if (left <= 0) {
          break;
        }
        curr++;
        left <<= 1;
      }
      used += 1 << curr;
      if (type === LENS$1 && used > ENOUGH_LENS$1 || type === DISTS$1 && used > ENOUGH_DISTS$1) {
        return 1;
      }
      low = huff & mask;
      table[low] = root << 24 | curr << 16 | next - table_index | 0;
    }
  }
  if (huff !== 0) {
    table[next + huff] = len - drop << 24 | 64 << 16 | 0;
  }
  opts.bits = root;
  return 0;
};
var inftrees = inflate_table;
var CODES = 0;
var LENS = 1;
var DISTS = 2;
var {
  Z_FINISH: Z_FINISH$1,
  Z_BLOCK,
  Z_TREES,
  Z_OK: Z_OK$1,
  Z_STREAM_END: Z_STREAM_END$1,
  Z_NEED_DICT: Z_NEED_DICT$1,
  Z_STREAM_ERROR: Z_STREAM_ERROR$1,
  Z_DATA_ERROR: Z_DATA_ERROR$1,
  Z_MEM_ERROR: Z_MEM_ERROR$1,
  Z_BUF_ERROR,
  Z_DEFLATED
} = constants$2;
var HEAD = 16180;
var FLAGS = 16181;
var TIME = 16182;
var OS = 16183;
var EXLEN = 16184;
var EXTRA = 16185;
var NAME = 16186;
var COMMENT = 16187;
var HCRC = 16188;
var DICTID = 16189;
var DICT = 16190;
var TYPE = 16191;
var TYPEDO = 16192;
var STORED = 16193;
var COPY_ = 16194;
var COPY = 16195;
var TABLE = 16196;
var LENLENS = 16197;
var CODELENS = 16198;
var LEN_ = 16199;
var LEN = 16200;
var LENEXT = 16201;
var DIST = 16202;
var DISTEXT = 16203;
var MATCH = 16204;
var LIT = 16205;
var CHECK = 16206;
var LENGTH = 16207;
var DONE = 16208;
var BAD = 16209;
var MEM = 16210;
var SYNC = 16211;
var ENOUGH_LENS = 852;
var ENOUGH_DISTS = 592;
var MAX_WBITS = 15;
var DEF_WBITS = MAX_WBITS;
var zswap32 = (q) => {
  return (q >>> 24 & 255) + (q >>> 8 & 65280) + ((q & 65280) << 8) + ((q & 255) << 24);
};
function InflateState() {
  this.strm = null;
  this.mode = 0;
  this.last = false;
  this.wrap = 0;
  this.havedict = false;
  this.flags = 0;
  this.dmax = 0;
  this.check = 0;
  this.total = 0;
  this.head = null;
  this.wbits = 0;
  this.wsize = 0;
  this.whave = 0;
  this.wnext = 0;
  this.window = null;
  this.hold = 0;
  this.bits = 0;
  this.length = 0;
  this.offset = 0;
  this.extra = 0;
  this.lencode = null;
  this.distcode = null;
  this.lenbits = 0;
  this.distbits = 0;
  this.ncode = 0;
  this.nlen = 0;
  this.ndist = 0;
  this.have = 0;
  this.next = null;
  this.lens = new Uint16Array(320);
  this.work = new Uint16Array(288);
  this.lendyn = null;
  this.distdyn = null;
  this.sane = 0;
  this.back = 0;
  this.was = 0;
}
var inflateStateCheck = (strm) => {
  if (!strm) {
    return 1;
  }
  const state = strm.state;
  if (!state || state.strm !== strm || state.mode < HEAD || state.mode > SYNC) {
    return 1;
  }
  return 0;
};
var inflateResetKeep = (strm) => {
  if (inflateStateCheck(strm)) {
    return Z_STREAM_ERROR$1;
  }
  const state = strm.state;
  strm.total_in = strm.total_out = state.total = 0;
  strm.msg = "";
  if (state.wrap) {
    strm.adler = state.wrap & 1;
  }
  state.mode = HEAD;
  state.last = 0;
  state.havedict = 0;
  state.flags = -1;
  state.dmax = 32768;
  state.head = null;
  state.hold = 0;
  state.bits = 0;
  state.lencode = state.lendyn = new Int32Array(ENOUGH_LENS);
  state.distcode = state.distdyn = new Int32Array(ENOUGH_DISTS);
  state.sane = 1;
  state.back = -1;
  return Z_OK$1;
};
var inflateReset = (strm) => {
  if (inflateStateCheck(strm)) {
    return Z_STREAM_ERROR$1;
  }
  const state = strm.state;
  state.wsize = 0;
  state.whave = 0;
  state.wnext = 0;
  return inflateResetKeep(strm);
};
var inflateReset2 = (strm, windowBits) => {
  let wrap;
  if (inflateStateCheck(strm)) {
    return Z_STREAM_ERROR$1;
  }
  const state = strm.state;
  if (windowBits < 0) {
    wrap = 0;
    windowBits = -windowBits;
  } else {
    wrap = (windowBits >> 4) + 5;
    if (windowBits < 48) {
      windowBits &= 15;
    }
  }
  if (windowBits && (windowBits < 8 || windowBits > 15)) {
    return Z_STREAM_ERROR$1;
  }
  if (state.window !== null && state.wbits !== windowBits) {
    state.window = null;
  }
  state.wrap = wrap;
  state.wbits = windowBits;
  return inflateReset(strm);
};
var inflateInit2 = (strm, windowBits) => {
  if (!strm) {
    return Z_STREAM_ERROR$1;
  }
  const state = new InflateState();
  strm.state = state;
  state.strm = strm;
  state.window = null;
  state.mode = HEAD;
  const ret = inflateReset2(strm, windowBits);
  if (ret !== Z_OK$1) {
    strm.state = null;
  }
  return ret;
};
var inflateInit = (strm) => {
  return inflateInit2(strm, DEF_WBITS);
};
var virgin = true;
var lenfix;
var distfix;
var fixedtables = (state) => {
  if (virgin) {
    lenfix = new Int32Array(512);
    distfix = new Int32Array(32);
    let sym = 0;
    while (sym < 144) {
      state.lens[sym++] = 8;
    }
    while (sym < 256) {
      state.lens[sym++] = 9;
    }
    while (sym < 280) {
      state.lens[sym++] = 7;
    }
    while (sym < 288) {
      state.lens[sym++] = 8;
    }
    inftrees(LENS, state.lens, 0, 288, lenfix, 0, state.work, { bits: 9 });
    sym = 0;
    while (sym < 32) {
      state.lens[sym++] = 5;
    }
    inftrees(DISTS, state.lens, 0, 32, distfix, 0, state.work, { bits: 5 });
    virgin = false;
  }
  state.lencode = lenfix;
  state.lenbits = 9;
  state.distcode = distfix;
  state.distbits = 5;
};
var updatewindow = (strm, src, end, copy) => {
  let dist;
  const state = strm.state;
  if (state.window === null) {
    state.wsize = 1 << state.wbits;
    state.wnext = 0;
    state.whave = 0;
    state.window = new Uint8Array(state.wsize);
  }
  if (copy >= state.wsize) {
    state.window.set(src.subarray(end - state.wsize, end), 0);
    state.wnext = 0;
    state.whave = state.wsize;
  } else {
    dist = state.wsize - state.wnext;
    if (dist > copy) {
      dist = copy;
    }
    state.window.set(src.subarray(end - copy, end - copy + dist), state.wnext);
    copy -= dist;
    if (copy) {
      state.window.set(src.subarray(end - copy, end), 0);
      state.wnext = copy;
      state.whave = state.wsize;
    } else {
      state.wnext += dist;
      if (state.wnext === state.wsize) {
        state.wnext = 0;
      }
      if (state.whave < state.wsize) {
        state.whave += dist;
      }
    }
  }
  return 0;
};
var inflate$2 = (strm, flush) => {
  let state;
  let input, output;
  let next;
  let put;
  let have, left;
  let hold;
  let bits;
  let _in, _out;
  let copy;
  let from;
  let from_source;
  let here = 0;
  let here_bits, here_op, here_val;
  let last_bits, last_op, last_val;
  let len;
  let ret;
  const hbuf = new Uint8Array(4);
  let opts;
  let n;
  const order = (
    /* permutation of code lengths */
    new Uint8Array([16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15])
  );
  if (inflateStateCheck(strm) || !strm.output || !strm.input && strm.avail_in !== 0) {
    return Z_STREAM_ERROR$1;
  }
  state = strm.state;
  if (state.mode === TYPE) {
    state.mode = TYPEDO;
  }
  put = strm.next_out;
  output = strm.output;
  left = strm.avail_out;
  next = strm.next_in;
  input = strm.input;
  have = strm.avail_in;
  hold = state.hold;
  bits = state.bits;
  _in = have;
  _out = left;
  ret = Z_OK$1;
  inf_leave:
    for (; ; ) {
      switch (state.mode) {
        case HEAD:
          if (state.wrap === 0) {
            state.mode = TYPEDO;
            break;
          }
          while (bits < 16) {
            if (have === 0) {
              break inf_leave;
            }
            have--;
            hold += input[next++] << bits;
            bits += 8;
          }
          if (state.wrap & 2 && hold === 35615) {
            if (state.wbits === 0) {
              state.wbits = 15;
            }
            state.check = 0;
            hbuf[0] = hold & 255;
            hbuf[1] = hold >>> 8 & 255;
            state.check = crc32_1(state.check, hbuf, 2, 0);
            hold = 0;
            bits = 0;
            state.mode = FLAGS;
            break;
          }
          if (state.head) {
            state.head.done = false;
          }
          if (!(state.wrap & 1) || /* check if zlib header allowed */
          (((hold & 255) << 8) + (hold >> 8)) % 31) {
            strm.msg = "incorrect header check";
            state.mode = BAD;
            break;
          }
          if ((hold & 15) !== Z_DEFLATED) {
            strm.msg = "unknown compression method";
            state.mode = BAD;
            break;
          }
          hold >>>= 4;
          bits -= 4;
          len = (hold & 15) + 8;
          if (state.wbits === 0) {
            state.wbits = len;
          }
          if (len > 15 || len > state.wbits) {
            strm.msg = "invalid window size";
            state.mode = BAD;
            break;
          }
          state.dmax = 1 << state.wbits;
          state.flags = 0;
          strm.adler = state.check = 1;
          state.mode = hold & 512 ? DICTID : TYPE;
          hold = 0;
          bits = 0;
          break;
        case FLAGS:
          while (bits < 16) {
            if (have === 0) {
              break inf_leave;
            }
            have--;
            hold += input[next++] << bits;
            bits += 8;
          }
          state.flags = hold;
          if ((state.flags & 255) !== Z_DEFLATED) {
            strm.msg = "unknown compression method";
            state.mode = BAD;
            break;
          }
          if (state.flags & 57344) {
            strm.msg = "unknown header flags set";
            state.mode = BAD;
            break;
          }
          if (state.head) {
            state.head.text = hold >> 8 & 1;
          }
          if (state.flags & 512 && state.wrap & 4) {
            hbuf[0] = hold & 255;
            hbuf[1] = hold >>> 8 & 255;
            state.check = crc32_1(state.check, hbuf, 2, 0);
          }
          hold = 0;
          bits = 0;
          state.mode = TIME;
        /* falls through */
        case TIME:
          while (bits < 32) {
            if (have === 0) {
              break inf_leave;
            }
            have--;
            hold += input[next++] << bits;
            bits += 8;
          }
          if (state.head) {
            state.head.time = hold;
          }
          if (state.flags & 512 && state.wrap & 4) {
            hbuf[0] = hold & 255;
            hbuf[1] = hold >>> 8 & 255;
            hbuf[2] = hold >>> 16 & 255;
            hbuf[3] = hold >>> 24 & 255;
            state.check = crc32_1(state.check, hbuf, 4, 0);
          }
          hold = 0;
          bits = 0;
          state.mode = OS;
        /* falls through */
        case OS:
          while (bits < 16) {
            if (have === 0) {
              break inf_leave;
            }
            have--;
            hold += input[next++] << bits;
            bits += 8;
          }
          if (state.head) {
            state.head.xflags = hold & 255;
            state.head.os = hold >> 8;
          }
          if (state.flags & 512 && state.wrap & 4) {
            hbuf[0] = hold & 255;
            hbuf[1] = hold >>> 8 & 255;
            state.check = crc32_1(state.check, hbuf, 2, 0);
          }
          hold = 0;
          bits = 0;
          state.mode = EXLEN;
        /* falls through */
        case EXLEN:
          if (state.flags & 1024) {
            while (bits < 16) {
              if (have === 0) {
                break inf_leave;
              }
              have--;
              hold += input[next++] << bits;
              bits += 8;
            }
            state.length = hold;
            if (state.head) {
              state.head.extra_len = hold;
            }
            if (state.flags & 512 && state.wrap & 4) {
              hbuf[0] = hold & 255;
              hbuf[1] = hold >>> 8 & 255;
              state.check = crc32_1(state.check, hbuf, 2, 0);
            }
            hold = 0;
            bits = 0;
          } else if (state.head) {
            state.head.extra = null;
          }
          state.mode = EXTRA;
        /* falls through */
        case EXTRA:
          if (state.flags & 1024) {
            copy = state.length;
            if (copy > have) {
              copy = have;
            }
            if (copy) {
              if (state.head) {
                len = state.head.extra_len - state.length;
                if (!state.head.extra) {
                  state.head.extra = new Uint8Array(state.head.extra_len);
                }
                state.head.extra.set(
                  input.subarray(
                    next,
                    // extra field is limited to 65536 bytes
                    // - no need for additional size check
                    next + copy
                  ),
                  /*len + copy > state.head.extra_max - len ? state.head.extra_max : copy,*/
                  len
                );
              }
              if (state.flags & 512 && state.wrap & 4) {
                state.check = crc32_1(state.check, input, copy, next);
              }
              have -= copy;
              next += copy;
              state.length -= copy;
            }
            if (state.length) {
              break inf_leave;
            }
          }
          state.length = 0;
          state.mode = NAME;
        /* falls through */
        case NAME:
          if (state.flags & 2048) {
            if (have === 0) {
              break inf_leave;
            }
            copy = 0;
            do {
              len = input[next + copy++];
              if (state.head && len && state.length < 65536) {
                state.head.name += String.fromCharCode(len);
              }
            } while (len && copy < have);
            if (state.flags & 512 && state.wrap & 4) {
              state.check = crc32_1(state.check, input, copy, next);
            }
            have -= copy;
            next += copy;
            if (len) {
              break inf_leave;
            }
          } else if (state.head) {
            state.head.name = null;
          }
          state.length = 0;
          state.mode = COMMENT;
        /* falls through */
        case COMMENT:
          if (state.flags & 4096) {
            if (have === 0) {
              break inf_leave;
            }
            copy = 0;
            do {
              len = input[next + copy++];
              if (state.head && len && state.length < 65536) {
                state.head.comment += String.fromCharCode(len);
              }
            } while (len && copy < have);
            if (state.flags & 512 && state.wrap & 4) {
              state.check = crc32_1(state.check, input, copy, next);
            }
            have -= copy;
            next += copy;
            if (len) {
              break inf_leave;
            }
          } else if (state.head) {
            state.head.comment = null;
          }
          state.mode = HCRC;
        /* falls through */
        case HCRC:
          if (state.flags & 512) {
            while (bits < 16) {
              if (have === 0) {
                break inf_leave;
              }
              have--;
              hold += input[next++] << bits;
              bits += 8;
            }
            if (state.wrap & 4 && hold !== (state.check & 65535)) {
              strm.msg = "header crc mismatch";
              state.mode = BAD;
              break;
            }
            hold = 0;
            bits = 0;
          }
          if (state.head) {
            state.head.hcrc = state.flags >> 9 & 1;
            state.head.done = true;
          }
          strm.adler = state.check = 0;
          state.mode = TYPE;
          break;
        case DICTID:
          while (bits < 32) {
            if (have === 0) {
              break inf_leave;
            }
            have--;
            hold += input[next++] << bits;
            bits += 8;
          }
          strm.adler = state.check = zswap32(hold);
          hold = 0;
          bits = 0;
          state.mode = DICT;
        /* falls through */
        case DICT:
          if (state.havedict === 0) {
            strm.next_out = put;
            strm.avail_out = left;
            strm.next_in = next;
            strm.avail_in = have;
            state.hold = hold;
            state.bits = bits;
            return Z_NEED_DICT$1;
          }
          strm.adler = state.check = 1;
          state.mode = TYPE;
        /* falls through */
        case TYPE:
          if (flush === Z_BLOCK || flush === Z_TREES) {
            break inf_leave;
          }
        /* falls through */
        case TYPEDO:
          if (state.last) {
            hold >>>= bits & 7;
            bits -= bits & 7;
            state.mode = CHECK;
            break;
          }
          while (bits < 3) {
            if (have === 0) {
              break inf_leave;
            }
            have--;
            hold += input[next++] << bits;
            bits += 8;
          }
          state.last = hold & 1;
          hold >>>= 1;
          bits -= 1;
          switch (hold & 3) {
            case 0:
              state.mode = STORED;
              break;
            case 1:
              fixedtables(state);
              state.mode = LEN_;
              if (flush === Z_TREES) {
                hold >>>= 2;
                bits -= 2;
                break inf_leave;
              }
              break;
            case 2:
              state.mode = TABLE;
              break;
            case 3:
              strm.msg = "invalid block type";
              state.mode = BAD;
          }
          hold >>>= 2;
          bits -= 2;
          break;
        case STORED:
          hold >>>= bits & 7;
          bits -= bits & 7;
          while (bits < 32) {
            if (have === 0) {
              break inf_leave;
            }
            have--;
            hold += input[next++] << bits;
            bits += 8;
          }
          if ((hold & 65535) !== (hold >>> 16 ^ 65535)) {
            strm.msg = "invalid stored block lengths";
            state.mode = BAD;
            break;
          }
          state.length = hold & 65535;
          hold = 0;
          bits = 0;
          state.mode = COPY_;
          if (flush === Z_TREES) {
            break inf_leave;
          }
        /* falls through */
        case COPY_:
          state.mode = COPY;
        /* falls through */
        case COPY:
          copy = state.length;
          if (copy) {
            if (copy > have) {
              copy = have;
            }
            if (copy > left) {
              copy = left;
            }
            if (copy === 0) {
              break inf_leave;
            }
            output.set(input.subarray(next, next + copy), put);
            have -= copy;
            next += copy;
            left -= copy;
            put += copy;
            state.length -= copy;
            break;
          }
          state.mode = TYPE;
          break;
        case TABLE:
          while (bits < 14) {
            if (have === 0) {
              break inf_leave;
            }
            have--;
            hold += input[next++] << bits;
            bits += 8;
          }
          state.nlen = (hold & 31) + 257;
          hold >>>= 5;
          bits -= 5;
          state.ndist = (hold & 31) + 1;
          hold >>>= 5;
          bits -= 5;
          state.ncode = (hold & 15) + 4;
          hold >>>= 4;
          bits -= 4;
          if (state.nlen > 286 || state.ndist > 30) {
            strm.msg = "too many length or distance symbols";
            state.mode = BAD;
            break;
          }
          state.have = 0;
          state.mode = LENLENS;
        /* falls through */
        case LENLENS:
          while (state.have < state.ncode) {
            while (bits < 3) {
              if (have === 0) {
                break inf_leave;
              }
              have--;
              hold += input[next++] << bits;
              bits += 8;
            }
            state.lens[order[state.have++]] = hold & 7;
            hold >>>= 3;
            bits -= 3;
          }
          while (state.have < 19) {
            state.lens[order[state.have++]] = 0;
          }
          state.lencode = state.lendyn;
          state.lenbits = 7;
          opts = { bits: state.lenbits };
          ret = inftrees(CODES, state.lens, 0, 19, state.lencode, 0, state.work, opts);
          state.lenbits = opts.bits;
          if (ret) {
            strm.msg = "invalid code lengths set";
            state.mode = BAD;
            break;
          }
          state.have = 0;
          state.mode = CODELENS;
        /* falls through */
        case CODELENS:
          while (state.have < state.nlen + state.ndist) {
            for (; ; ) {
              here = state.lencode[hold & (1 << state.lenbits) - 1];
              here_bits = here >>> 24;
              here_op = here >>> 16 & 255;
              here_val = here & 65535;
              if (here_bits <= bits) {
                break;
              }
              if (have === 0) {
                break inf_leave;
              }
              have--;
              hold += input[next++] << bits;
              bits += 8;
            }
            if (here_val < 16) {
              hold >>>= here_bits;
              bits -= here_bits;
              state.lens[state.have++] = here_val;
            } else {
              if (here_val === 16) {
                n = here_bits + 2;
                while (bits < n) {
                  if (have === 0) {
                    break inf_leave;
                  }
                  have--;
                  hold += input[next++] << bits;
                  bits += 8;
                }
                hold >>>= here_bits;
                bits -= here_bits;
                if (state.have === 0) {
                  strm.msg = "invalid bit length repeat";
                  state.mode = BAD;
                  break;
                }
                len = state.lens[state.have - 1];
                copy = 3 + (hold & 3);
                hold >>>= 2;
                bits -= 2;
              } else if (here_val === 17) {
                n = here_bits + 3;
                while (bits < n) {
                  if (have === 0) {
                    break inf_leave;
                  }
                  have--;
                  hold += input[next++] << bits;
                  bits += 8;
                }
                hold >>>= here_bits;
                bits -= here_bits;
                len = 0;
                copy = 3 + (hold & 7);
                hold >>>= 3;
                bits -= 3;
              } else {
                n = here_bits + 7;
                while (bits < n) {
                  if (have === 0) {
                    break inf_leave;
                  }
                  have--;
                  hold += input[next++] << bits;
                  bits += 8;
                }
                hold >>>= here_bits;
                bits -= here_bits;
                len = 0;
                copy = 11 + (hold & 127);
                hold >>>= 7;
                bits -= 7;
              }
              if (state.have + copy > state.nlen + state.ndist) {
                strm.msg = "invalid bit length repeat";
                state.mode = BAD;
                break;
              }
              while (copy--) {
                state.lens[state.have++] = len;
              }
            }
          }
          if (state.mode === BAD) {
            break;
          }
          if (state.lens[256] === 0) {
            strm.msg = "invalid code -- missing end-of-block";
            state.mode = BAD;
            break;
          }
          state.lenbits = 9;
          opts = { bits: state.lenbits };
          ret = inftrees(LENS, state.lens, 0, state.nlen, state.lencode, 0, state.work, opts);
          state.lenbits = opts.bits;
          if (ret) {
            strm.msg = "invalid literal/lengths set";
            state.mode = BAD;
            break;
          }
          state.distbits = 6;
          state.distcode = state.distdyn;
          opts = { bits: state.distbits };
          ret = inftrees(DISTS, state.lens, state.nlen, state.ndist, state.distcode, 0, state.work, opts);
          state.distbits = opts.bits;
          if (ret) {
            strm.msg = "invalid distances set";
            state.mode = BAD;
            break;
          }
          state.mode = LEN_;
          if (flush === Z_TREES) {
            break inf_leave;
          }
        /* falls through */
        case LEN_:
          state.mode = LEN;
        /* falls through */
        case LEN:
          if (have >= 6 && left >= 258) {
            strm.next_out = put;
            strm.avail_out = left;
            strm.next_in = next;
            strm.avail_in = have;
            state.hold = hold;
            state.bits = bits;
            inffast(strm, _out);
            put = strm.next_out;
            output = strm.output;
            left = strm.avail_out;
            next = strm.next_in;
            input = strm.input;
            have = strm.avail_in;
            hold = state.hold;
            bits = state.bits;
            if (state.mode === TYPE) {
              state.back = -1;
            }
            break;
          }
          state.back = 0;
          for (; ; ) {
            here = state.lencode[hold & (1 << state.lenbits) - 1];
            here_bits = here >>> 24;
            here_op = here >>> 16 & 255;
            here_val = here & 65535;
            if (here_bits <= bits) {
              break;
            }
            if (have === 0) {
              break inf_leave;
            }
            have--;
            hold += input[next++] << bits;
            bits += 8;
          }
          if (here_op && (here_op & 240) === 0) {
            last_bits = here_bits;
            last_op = here_op;
            last_val = here_val;
            for (; ; ) {
              here = state.lencode[last_val + ((hold & (1 << last_bits + last_op) - 1) >> last_bits)];
              here_bits = here >>> 24;
              here_op = here >>> 16 & 255;
              here_val = here & 65535;
              if (last_bits + here_bits <= bits) {
                break;
              }
              if (have === 0) {
                break inf_leave;
              }
              have--;
              hold += input[next++] << bits;
              bits += 8;
            }
            hold >>>= last_bits;
            bits -= last_bits;
            state.back += last_bits;
          }
          hold >>>= here_bits;
          bits -= here_bits;
          state.back += here_bits;
          state.length = here_val;
          if (here_op === 0) {
            state.mode = LIT;
            break;
          }
          if (here_op & 32) {
            state.back = -1;
            state.mode = TYPE;
            break;
          }
          if (here_op & 64) {
            strm.msg = "invalid literal/length code";
            state.mode = BAD;
            break;
          }
          state.extra = here_op & 15;
          state.mode = LENEXT;
        /* falls through */
        case LENEXT:
          if (state.extra) {
            n = state.extra;
            while (bits < n) {
              if (have === 0) {
                break inf_leave;
              }
              have--;
              hold += input[next++] << bits;
              bits += 8;
            }
            state.length += hold & (1 << state.extra) - 1;
            hold >>>= state.extra;
            bits -= state.extra;
            state.back += state.extra;
          }
          state.was = state.length;
          state.mode = DIST;
        /* falls through */
        case DIST:
          for (; ; ) {
            here = state.distcode[hold & (1 << state.distbits) - 1];
            here_bits = here >>> 24;
            here_op = here >>> 16 & 255;
            here_val = here & 65535;
            if (here_bits <= bits) {
              break;
            }
            if (have === 0) {
              break inf_leave;
            }
            have--;
            hold += input[next++] << bits;
            bits += 8;
          }
          if ((here_op & 240) === 0) {
            last_bits = here_bits;
            last_op = here_op;
            last_val = here_val;
            for (; ; ) {
              here = state.distcode[last_val + ((hold & (1 << last_bits + last_op) - 1) >> last_bits)];
              here_bits = here >>> 24;
              here_op = here >>> 16 & 255;
              here_val = here & 65535;
              if (last_bits + here_bits <= bits) {
                break;
              }
              if (have === 0) {
                break inf_leave;
              }
              have--;
              hold += input[next++] << bits;
              bits += 8;
            }
            hold >>>= last_bits;
            bits -= last_bits;
            state.back += last_bits;
          }
          hold >>>= here_bits;
          bits -= here_bits;
          state.back += here_bits;
          if (here_op & 64) {
            strm.msg = "invalid distance code";
            state.mode = BAD;
            break;
          }
          state.offset = here_val;
          state.extra = here_op & 15;
          state.mode = DISTEXT;
        /* falls through */
        case DISTEXT:
          if (state.extra) {
            n = state.extra;
            while (bits < n) {
              if (have === 0) {
                break inf_leave;
              }
              have--;
              hold += input[next++] << bits;
              bits += 8;
            }
            state.offset += hold & (1 << state.extra) - 1;
            hold >>>= state.extra;
            bits -= state.extra;
            state.back += state.extra;
          }
          if (state.offset > state.dmax) {
            strm.msg = "invalid distance too far back";
            state.mode = BAD;
            break;
          }
          state.mode = MATCH;
        /* falls through */
        case MATCH:
          if (left === 0) {
            break inf_leave;
          }
          copy = _out - left;
          if (state.offset > copy) {
            copy = state.offset - copy;
            if (copy > state.whave) {
              if (state.sane) {
                strm.msg = "invalid distance too far back";
                state.mode = BAD;
                break;
              }
            }
            if (copy > state.wnext) {
              copy -= state.wnext;
              from = state.wsize - copy;
            } else {
              from = state.wnext - copy;
            }
            if (copy > state.length) {
              copy = state.length;
            }
            from_source = state.window;
          } else {
            from_source = output;
            from = put - state.offset;
            copy = state.length;
          }
          if (copy > left) {
            copy = left;
          }
          left -= copy;
          state.length -= copy;
          do {
            output[put++] = from_source[from++];
          } while (--copy);
          if (state.length === 0) {
            state.mode = LEN;
          }
          break;
        case LIT:
          if (left === 0) {
            break inf_leave;
          }
          output[put++] = state.length;
          left--;
          state.mode = LEN;
          break;
        case CHECK:
          if (state.wrap) {
            while (bits < 32) {
              if (have === 0) {
                break inf_leave;
              }
              have--;
              hold |= input[next++] << bits;
              bits += 8;
            }
            _out -= left;
            strm.total_out += _out;
            state.total += _out;
            if (state.wrap & 4 && _out) {
              strm.adler = state.check = /*UPDATE_CHECK(state.check, put - _out, _out);*/
              state.flags ? crc32_1(state.check, output, _out, put - _out) : adler32_1(state.check, output, _out, put - _out);
            }
            _out = left;
            if (state.wrap & 4 && (state.flags ? hold : zswap32(hold)) !== state.check) {
              strm.msg = "incorrect data check";
              state.mode = BAD;
              break;
            }
            hold = 0;
            bits = 0;
          }
          state.mode = LENGTH;
        /* falls through */
        case LENGTH:
          if (state.wrap && state.flags) {
            while (bits < 32) {
              if (have === 0) {
                break inf_leave;
              }
              have--;
              hold += input[next++] << bits;
              bits += 8;
            }
            if (state.wrap & 4 && hold !== (state.total & 4294967295)) {
              strm.msg = "incorrect length check";
              state.mode = BAD;
              break;
            }
            hold = 0;
            bits = 0;
          }
          state.mode = DONE;
        /* falls through */
        case DONE:
          ret = Z_STREAM_END$1;
          break inf_leave;
        case BAD:
          ret = Z_DATA_ERROR$1;
          break inf_leave;
        case MEM:
          return Z_MEM_ERROR$1;
        case SYNC:
        /* falls through */
        default:
          return Z_STREAM_ERROR$1;
      }
    }
  strm.next_out = put;
  strm.avail_out = left;
  strm.next_in = next;
  strm.avail_in = have;
  state.hold = hold;
  state.bits = bits;
  if (state.wsize || _out !== strm.avail_out && state.mode < BAD && (state.mode < CHECK || flush !== Z_FINISH$1)) {
    if (updatewindow(strm, strm.output, strm.next_out, _out - strm.avail_out)) ;
  }
  _in -= strm.avail_in;
  _out -= strm.avail_out;
  strm.total_in += _in;
  strm.total_out += _out;
  state.total += _out;
  if (state.wrap & 4 && _out) {
    strm.adler = state.check = /*UPDATE_CHECK(state.check, strm.next_out - _out, _out);*/
    state.flags ? crc32_1(state.check, output, _out, strm.next_out - _out) : adler32_1(state.check, output, _out, strm.next_out - _out);
  }
  strm.data_type = state.bits + (state.last ? 64 : 0) + (state.mode === TYPE ? 128 : 0) + (state.mode === LEN_ || state.mode === COPY_ ? 256 : 0);
  if ((_in === 0 && _out === 0 || flush === Z_FINISH$1) && ret === Z_OK$1) {
    ret = Z_BUF_ERROR;
  }
  return ret;
};
var inflateEnd = (strm) => {
  if (inflateStateCheck(strm)) {
    return Z_STREAM_ERROR$1;
  }
  let state = strm.state;
  if (state.window) {
    state.window = null;
  }
  strm.state = null;
  return Z_OK$1;
};
var inflateGetHeader = (strm, head) => {
  if (inflateStateCheck(strm)) {
    return Z_STREAM_ERROR$1;
  }
  const state = strm.state;
  if ((state.wrap & 2) === 0) {
    return Z_STREAM_ERROR$1;
  }
  state.head = head;
  head.done = false;
  return Z_OK$1;
};
var inflateSetDictionary = (strm, dictionary) => {
  const dictLength = dictionary.length;
  let state;
  let dictid;
  let ret;
  if (inflateStateCheck(strm)) {
    return Z_STREAM_ERROR$1;
  }
  state = strm.state;
  if (state.wrap !== 0 && state.mode !== DICT) {
    return Z_STREAM_ERROR$1;
  }
  if (state.mode === DICT) {
    dictid = 1;
    dictid = adler32_1(dictid, dictionary, dictLength, 0);
    if (dictid !== state.check) {
      return Z_DATA_ERROR$1;
    }
  }
  ret = updatewindow(strm, dictionary, dictLength, dictLength);
  if (ret) {
    state.mode = MEM;
    return Z_MEM_ERROR$1;
  }
  state.havedict = 1;
  return Z_OK$1;
};
var inflateReset_1 = inflateReset;
var inflateReset2_1 = inflateReset2;
var inflateResetKeep_1 = inflateResetKeep;
var inflateInit_1 = inflateInit;
var inflateInit2_1 = inflateInit2;
var inflate_2$1 = inflate$2;
var inflateEnd_1 = inflateEnd;
var inflateGetHeader_1 = inflateGetHeader;
var inflateSetDictionary_1 = inflateSetDictionary;
var inflateInfo = "pako inflate (from Nodeca project)";
var inflate_1$2 = {
  inflateReset: inflateReset_1,
  inflateReset2: inflateReset2_1,
  inflateResetKeep: inflateResetKeep_1,
  inflateInit: inflateInit_1,
  inflateInit2: inflateInit2_1,
  inflate: inflate_2$1,
  inflateEnd: inflateEnd_1,
  inflateGetHeader: inflateGetHeader_1,
  inflateSetDictionary: inflateSetDictionary_1,
  inflateInfo
};
function GZheader() {
  this.text = 0;
  this.time = 0;
  this.xflags = 0;
  this.os = 0;
  this.extra = null;
  this.extra_len = 0;
  this.name = "";
  this.comment = "";
  this.hcrc = 0;
  this.done = false;
}
var gzheader = GZheader;
var toString = Object.prototype.toString;
var {
  Z_NO_FLUSH,
  Z_FINISH,
  Z_OK,
  Z_STREAM_END,
  Z_NEED_DICT,
  Z_STREAM_ERROR,
  Z_DATA_ERROR,
  Z_MEM_ERROR
} = constants$2;
function Inflate$1(options) {
  this.options = common.assign({
    chunkSize: 1024 * 64,
    windowBits: 15,
    to: ""
  }, options || {});
  const opt = this.options;
  if (opt.raw && opt.windowBits >= 0 && opt.windowBits < 16) {
    opt.windowBits = -opt.windowBits;
    if (opt.windowBits === 0) {
      opt.windowBits = -15;
    }
  }
  if (opt.windowBits >= 0 && opt.windowBits < 16 && !(options && options.windowBits)) {
    opt.windowBits += 32;
  }
  if (opt.windowBits > 15 && opt.windowBits < 48) {
    if ((opt.windowBits & 15) === 0) {
      opt.windowBits |= 15;
    }
  }
  this.err = 0;
  this.msg = "";
  this.ended = false;
  this.chunks = [];
  this.strm = new zstream();
  this.strm.avail_out = 0;
  let status = inflate_1$2.inflateInit2(
    this.strm,
    opt.windowBits
  );
  if (status !== Z_OK) {
    throw new Error(messages[status]);
  }
  this.header = new gzheader();
  inflate_1$2.inflateGetHeader(this.strm, this.header);
  if (opt.dictionary) {
    if (typeof opt.dictionary === "string") {
      opt.dictionary = strings.string2buf(opt.dictionary);
    } else if (toString.call(opt.dictionary) === "[object ArrayBuffer]") {
      opt.dictionary = new Uint8Array(opt.dictionary);
    }
    if (opt.raw) {
      status = inflate_1$2.inflateSetDictionary(this.strm, opt.dictionary);
      if (status !== Z_OK) {
        throw new Error(messages[status]);
      }
    }
  }
}
Inflate$1.prototype.push = function(data, flush_mode) {
  const strm = this.strm;
  const chunkSize = this.options.chunkSize;
  const dictionary = this.options.dictionary;
  let status, _flush_mode, last_avail_out;
  if (this.ended) return false;
  if (flush_mode === ~~flush_mode) _flush_mode = flush_mode;
  else _flush_mode = flush_mode === true ? Z_FINISH : Z_NO_FLUSH;
  if (toString.call(data) === "[object ArrayBuffer]") {
    strm.input = new Uint8Array(data);
  } else {
    strm.input = data;
  }
  strm.next_in = 0;
  strm.avail_in = strm.input.length;
  for (; ; ) {
    if (strm.avail_out === 0) {
      strm.output = new Uint8Array(chunkSize);
      strm.next_out = 0;
      strm.avail_out = chunkSize;
    }
    status = inflate_1$2.inflate(strm, _flush_mode);
    if (status === Z_NEED_DICT && dictionary) {
      status = inflate_1$2.inflateSetDictionary(strm, dictionary);
      if (status === Z_OK) {
        status = inflate_1$2.inflate(strm, _flush_mode);
      } else if (status === Z_DATA_ERROR) {
        status = Z_NEED_DICT;
      }
    }
    while (strm.avail_in > 0 && status === Z_STREAM_END && strm.state.wrap > 0 && data[strm.next_in] !== 0) {
      inflate_1$2.inflateReset(strm);
      status = inflate_1$2.inflate(strm, _flush_mode);
    }
    switch (status) {
      case Z_STREAM_ERROR:
      case Z_DATA_ERROR:
      case Z_NEED_DICT:
      case Z_MEM_ERROR:
        this.onEnd(status);
        this.ended = true;
        return false;
    }
    last_avail_out = strm.avail_out;
    if (strm.next_out) {
      if (strm.avail_out === 0 || status === Z_STREAM_END) {
        if (this.options.to === "string") {
          let next_out_utf8 = strings.utf8border(strm.output, strm.next_out);
          let tail = strm.next_out - next_out_utf8;
          let utf8str = strings.buf2string(strm.output, next_out_utf8);
          strm.next_out = tail;
          strm.avail_out = chunkSize - tail;
          if (tail) strm.output.set(strm.output.subarray(next_out_utf8, next_out_utf8 + tail), 0);
          this.onData(utf8str);
        } else {
          this.onData(strm.output.length === strm.next_out ? strm.output : strm.output.subarray(0, strm.next_out));
        }
      }
    }
    if (status === Z_OK && last_avail_out === 0) continue;
    if (status === Z_STREAM_END) {
      status = inflate_1$2.inflateEnd(this.strm);
      this.onEnd(status);
      this.ended = true;
      return true;
    }
    if (strm.avail_in === 0) break;
  }
  return true;
};
Inflate$1.prototype.onData = function(chunk) {
  this.chunks.push(chunk);
};
Inflate$1.prototype.onEnd = function(status) {
  if (status === Z_OK) {
    if (this.options.to === "string") {
      this.result = this.chunks.join("");
    } else {
      this.result = common.flattenChunks(this.chunks);
    }
  }
  this.chunks = [];
  this.err = status;
  this.msg = this.strm.msg;
};
function inflate$1(input, options) {
  const inflator = new Inflate$1(options);
  inflator.push(input);
  if (inflator.err) throw inflator.msg || messages[inflator.err];
  return inflator.result;
}
function inflateRaw$1(input, options) {
  options = options || {};
  options.raw = true;
  return inflate$1(input, options);
}
var Inflate_1$1 = Inflate$1;
var inflate_2 = inflate$1;
var inflateRaw_1$1 = inflateRaw$1;
var ungzip$1 = inflate$1;
var constants = constants$2;
var inflate_1$1 = {
  Inflate: Inflate_1$1,
  inflate: inflate_2,
  inflateRaw: inflateRaw_1$1,
  ungzip: ungzip$1,
  constants
};
var { Deflate, deflate, deflateRaw, gzip } = deflate_1$1;
var { Inflate, inflate, inflateRaw, ungzip } = inflate_1$1;
var inflateRaw_1 = inflateRaw;

// src/HwpParser.standalone.ts
var HWP_TAGS = {
  HWPTAG_DOCUMENT_PROPERTIES: 16,
  HWPTAG_ID_MAPPINGS: 17,
  HWPTAG_BIN_DATA: 18,
  HWPTAG_FACE_NAME: 19,
  HWPTAG_BORDER_FILL: 20,
  HWPTAG_CHAR_SHAPE: 21,
  HWPTAG_TAB_DEF: 22,
  HWPTAG_NUMBERING: 23,
  HWPTAG_BULLET: 24,
  HWPTAG_PARA_SHAPE: 25,
  HWPTAG_STYLE: 26,
  HWPTAG_PARA_HEADER: 66,
  HWPTAG_PARA_TEXT: 67,
  HWPTAG_PARA_CHAR_SHAPE: 68,
  HWPTAG_PARA_LINE_SEG: 69,
  HWPTAG_PARA_RANGE_TAG: 70,
  HWPTAG_CTRL_HEADER: 71,
  HWPTAG_LIST_HEADER: 72,
  HWPTAG_PAGE_DEF: 73,
  HWPTAG_FOOTNOTE_SHAPE: 74,
  HWPTAG_PAGE_BORDER_FILL: 75,
  HWPTAG_SHAPE_COMPONENT: 76,
  HWPTAG_TABLE: 77,
  HWPTAG_SHAPE_COMPONENT_LINE: 78,
  HWPTAG_SHAPE_COMPONENT_RECTANGLE: 79,
  HWPTAG_SHAPE_COMPONENT_ELLIPSE: 80,
  HWPTAG_SHAPE_COMPONENT_ARC: 81,
  HWPTAG_SHAPE_COMPONENT_POLYGON: 82,
  HWPTAG_SHAPE_COMPONENT_CURVE: 83,
  HWPTAG_SHAPE_COMPONENT_OLE: 84,
  HWPTAG_SHAPE_COMPONENT_PICTURE: 85,
  HWPTAG_SHAPE_COMPONENT_CONTAINER: 86,
  HWPTAG_SHAPE_COMPONENT_TEXTBOX: 87,
  HWPTAG_SHAPE_COMPONENT_FORM_OBJECT: 88,
  HWPTAG_MEMO_SHAPE: 92,
  HWPTAG_MEMO_LIST: 93
};
var CTRL_ID = {
  TABLE: 1952607264,
  // 'tbl ' in ASCII
  PICTURE: 611346787,
  // '$pic' in ASCII
  SECTION: 1936024420,
  // 'secd' in ASCII
  COLUMN: 1668246628,
  // 'cold' in ASCII
  FORM: 1718579821,
  // 'form' in ASCII
  GSO: 1735618336,
  // 'gso ' in ASCII
  FOOTER: 1718579060,
  // 'foot' in ASCII
  HEADER: 1751474532,
  // 'head' in ASCII
  FOOTNOTE: 1718493216,
  // 'fn  ' in ASCII
  ENDNOTE: 1701716e3,
  // 'en  ' in ASCII
  FIELD_MEMO: 610676748,
  AUTO_NUMBER: 1635020399,
  PAGE_NUMBER_POS: 1885826672,
  EQUATION: 1701930340,
  BOOKMARK: 1651470187,
  TCPS: 1952673907,
  LINE: 611084654,
  RECTANGLE: 611476835,
  ELLIPSE: 610626668,
  ARC: 610366051,
  POLYGON: 611348332,
  CURVE: 610497142,
  CONTAINER: 610497646,
  OLE: 611282021,
  TEXTBOX: 611612788
};
var CTRL_CHAR = {
  SPACE: 32,
  TAB: 9,
  PAGE_BREAK: 12,
  LINE_BREAK: 10,
  SOFT_LINE_BREAK: 27,
  TABLE_DRAWING: 7,
  EXTENDED: 9,
  FIELD_START: 19,
  FIELD_END: 20,
  INLINE: 21,
  BOOKMARK_START: 1,
  BOOKMARK_END: 2,
  SHAPE_DRAWING: 6,
  SECTION_COLUMN_DEF: 3
};
function generateId2() {
  return Math.random().toString(36).substring(2, 11);
}
function readUint16(data, offset) {
  return data[offset] | data[offset + 1] << 8;
}
function readUint32(data, offset) {
  return data[offset] | data[offset + 1] << 8 | data[offset + 2] << 16 | data[offset + 3] << 24;
}
function readInt32(data, offset) {
  const val = readUint32(data, offset);
  return val > 2147483647 ? val - 4294967296 : val;
}
function readInt8(data, offset) {
  const val = data[offset];
  return val > 127 ? val - 256 : val;
}
function readInt16(data, offset) {
  const val = readUint16(data, offset);
  return val > 32767 ? val - 65536 : val;
}
function colorrefToHex(colorref) {
  const r = colorref & 255;
  const g = colorref >> 8 & 255;
  const b = colorref >> 16 & 255;
  return `#${r.toString(16).padStart(2, "0")}${g.toString(16).padStart(2, "0")}${b.toString(16).padStart(2, "0")}`;
}
function hwpunitToPt(hwpunit) {
  return hwpunit / 7200 * 72;
}
function charShapeToStyleStandalone(charShape, faceNames) {
  const fontId = charShape.fontIds[0];
  const faceName = faceNames.get(fontId);
  const langKeys = ["hangul", "latin", "hanja", "japanese", "other", "symbol", "user"];
  const charSpacing = {};
  const charOffset = {};
  for (let i = 0; i < 7; i++) {
    charSpacing[langKeys[i]] = charShape.spacings[i];
    charOffset[langKeys[i]] = charShape.charPositions[i];
  }
  return {
    fontName: faceName?.name,
    fontSize: charShape.baseSize / 100,
    bold: charShape.bold,
    italic: charShape.italic,
    underline: charShape.underlineType === 1 || charShape.underlineType === 3,
    strikethrough: charShape.strikethrough >= 2,
    fontColor: colorrefToHex(charShape.textColor),
    superscript: charShape.superscript,
    subscript: charShape.subscript,
    emboss: charShape.emboss,
    engrave: charShape.engrave,
    useFontSpace: charShape.useFontSpacing,
    useKerning: charShape.kerning,
    charSpacing,
    charOffset
  };
}
function uint8ArrayToBase64(bytes) {
  const chunkSize = 32768;
  const chunks = [];
  for (let i = 0; i < bytes.length; i += chunkSize) {
    const chunk = bytes.subarray(i, i + chunkSize);
    chunks.push(String.fromCharCode.apply(null, chunk));
  }
  return btoa(chunks.join(""));
}
function parseFaceNameStandalone(data) {
  if (data.length < 3) return null;
  const props = data[0];
  const hasSubstitute = (props & 128) !== 0;
  const hasFontTypeInfo = (props & 64) !== 0;
  const hasDefaultFont = (props & 32) !== 0;
  const nameLen = readUint16(data, 1);
  if (data.length < 3 + nameLen * 2) return null;
  const name = new TextDecoder("utf-16le").decode(data.slice(3, 3 + nameLen * 2));
  const result = {
    name,
    hasSubstitute,
    hasFontTypeInfo,
    hasDefaultFont
  };
  let pos = 3 + nameLen * 2;
  if (hasSubstitute && pos + 3 <= data.length) {
    const substType = data[pos];
    pos++;
    const substNameLen = readUint16(data, pos);
    pos += 2;
    if (pos + substNameLen * 2 <= data.length) {
      const substName = new TextDecoder("utf-16le").decode(data.slice(pos, pos + substNameLen * 2));
      result.substitute = {
        type: substType === 1 ? "truetype" : substType === 2 ? "hwp" : "unknown",
        name: substName
      };
      pos += substNameLen * 2;
    }
  }
  if (hasFontTypeInfo && pos + 10 <= data.length) {
    pos += 10;
  }
  if (hasDefaultFont && pos + 2 <= data.length) {
    const defaultNameLen = readUint16(data, pos);
    pos += 2;
    if (pos + defaultNameLen * 2 <= data.length) {
      result.defaultFont = new TextDecoder("utf-16le").decode(data.slice(pos, pos + defaultNameLen * 2));
    }
  }
  return result;
}
function parseCharShapeStandalone(data) {
  if (data.length < 72) return null;
  const fontIds = [];
  for (let i = 0; i < 7; i++) {
    fontIds.push(readUint16(data, i * 2));
  }
  const widthRatios = [];
  for (let i = 0; i < 7; i++) {
    widthRatios.push(data[14 + i]);
  }
  const spacings = [];
  for (let i = 0; i < 7; i++) {
    spacings.push(readInt8(data, 21 + i));
  }
  const relativeSizes = [];
  for (let i = 0; i < 7; i++) {
    relativeSizes.push(data[28 + i]);
  }
  const charPositions = [];
  for (let i = 0; i < 7; i++) {
    charPositions.push(readInt8(data, 35 + i));
  }
  const baseSize = readInt32(data, 42);
  const props = readUint32(data, 46);
  const italic = (props & 1) !== 0;
  const bold = (props & 2) !== 0;
  const underlineType = props >> 2 & 3;
  const underlineShape = props >> 4 & 15;
  const outlineType = props >> 8 & 7;
  const shadowType = props >> 11 & 3;
  const emboss = (props & 1 << 13) !== 0;
  const engrave = (props & 1 << 14) !== 0;
  const superscript = (props & 1 << 15) !== 0;
  const subscript = (props & 1 << 16) !== 0;
  const strikethrough = props >> 18 & 7;
  const emphasisMark = props >> 21 & 15;
  const useFontSpacing = (props & 1 << 25) !== 0;
  const strikethroughShape = props >> 26 & 15;
  const kerning = (props & 1 << 30) !== 0;
  const shadowOffsetX = readInt8(data, 50);
  const shadowOffsetY = readInt8(data, 51);
  const textColor = readUint32(data, 52);
  const underlineColor = readUint32(data, 56);
  const shadeColor = readUint32(data, 60);
  const shadowColor = readUint32(data, 64);
  const result = {
    fontIds,
    widthRatios,
    spacings,
    relativeSizes,
    charPositions,
    baseSize,
    italic,
    bold,
    underlineType,
    underlineShape,
    outlineType,
    shadowType,
    emboss,
    engrave,
    superscript,
    subscript,
    strikethrough,
    emphasisMark,
    useFontSpacing,
    strikethroughShape,
    kerning,
    shadowOffsetX,
    shadowOffsetY,
    textColor,
    underlineColor,
    shadeColor,
    shadowColor
  };
  if (data.length >= 70) {
    result.borderFillId = readUint16(data, 68);
  }
  if (data.length >= 74) {
    result.strikethroughColor = readUint32(data, 70);
  }
  return result;
}
function parseParaShapeStandalone(data) {
  if (data.length < 42) return null;
  const props1 = readUint32(data, 0);
  const lineSpacingTypeOld = props1 & 3;
  const alignment = props1 >> 2 & 7;
  const wordBreakEnglish = props1 >> 5 & 3;
  const wordBreakKorean = props1 >> 7 & 1;
  const useGrid = (props1 & 1 << 8) !== 0;
  const minSpace = props1 >> 9 & 127;
  const widowOrphan = (props1 & 1 << 16) !== 0;
  const keepWithNext = (props1 & 1 << 17) !== 0;
  const keepTogether = (props1 & 1 << 18) !== 0;
  const pageBreakBefore = (props1 & 1 << 19) !== 0;
  const verticalAlign = props1 >> 20 & 3;
  const headType = props1 >> 23 & 3;
  const level = props1 >> 25 & 7;
  const leftMargin = readInt32(data, 4);
  const rightMargin = readInt32(data, 8);
  const indent = readInt32(data, 12);
  const spacingBefore = readInt32(data, 16);
  const spacingAfter = readInt32(data, 20);
  let lineSpacing = readInt32(data, 24);
  const tabDefId = readUint16(data, 28);
  const numberingId = readUint16(data, 30);
  const borderFillId = readUint16(data, 32);
  const borderLeft = readInt16(data, 34);
  const borderRight = readInt16(data, 36);
  const borderTop = readInt16(data, 38);
  const borderBottom = readInt16(data, 40);
  let lineSpacingType = lineSpacingTypeOld;
  let autoSpaceKoreanEnglish = false;
  let autoSpaceKoreanNumber = false;
  if (data.length >= 46) {
    const props2 = readUint32(data, 42);
    autoSpaceKoreanEnglish = (props2 & 1 << 4) !== 0;
    autoSpaceKoreanNumber = (props2 & 1 << 5) !== 0;
  }
  if (data.length >= 54) {
    const props3 = readUint32(data, 46);
    lineSpacingType = props3 & 31;
    lineSpacing = readUint32(data, 50);
  }
  return {
    alignment,
    leftMargin,
    rightMargin,
    indent,
    spacingBefore,
    spacingAfter,
    lineSpacing,
    lineSpacingType,
    tabDefId,
    numberingId,
    borderFillId,
    borderSpacing: { left: borderLeft, right: borderRight, top: borderTop, bottom: borderBottom },
    wordBreakEnglish,
    wordBreakKorean,
    widowOrphan,
    keepWithNext,
    keepTogether,
    pageBreakBefore,
    verticalAlign,
    headType,
    level,
    useGrid,
    minSpace,
    autoSpaceKoreanEnglish,
    autoSpaceKoreanNumber
  };
}
function parseBorderFillStandalone(data) {
  if (data.length < 32) return null;
  const props = readUint16(data, 0);
  const effect3d = (props & 1) !== 0;
  const shadow = (props & 2) !== 0;
  const slashDiagonal = props >> 2 & 7;
  const backslashDiagonal = props >> 5 & 7;
  const borderTypes = [data[2], data[3], data[4], data[5]];
  const borderWidths = [data[6], data[7], data[8], data[9]];
  const borderColors = [
    readUint32(data, 10),
    readUint32(data, 14),
    readUint32(data, 18),
    readUint32(data, 22)
  ];
  const diagonalType = data[26];
  const diagonalWidth = data[27];
  const diagonalColor = readUint32(data, 28);
  const result = {
    effect3d,
    shadow,
    slashDiagonal,
    backslashDiagonal,
    borders: {
      left: { type: borderTypes[0], width: borderWidths[0], color: borderColors[0] },
      right: { type: borderTypes[1], width: borderWidths[1], color: borderColors[1] },
      top: { type: borderTypes[2], width: borderWidths[2], color: borderColors[2] },
      bottom: { type: borderTypes[3], width: borderWidths[3], color: borderColors[3] }
    }
  };
  if (diagonalType !== 0) {
    result.diagonal = { type: diagonalType, width: diagonalWidth, color: diagonalColor };
  }
  if (data.length >= 36) {
    const fillType = readUint32(data, 32);
    let fillOffset = 36;
    if (fillType & 1) {
      if (data.length >= fillOffset + 12) {
        result.fill = {
          fillType: "solid",
          backgroundColor: readUint32(data, fillOffset),
          patternColor: readUint32(data, fillOffset + 4),
          patternType: readInt32(data, fillOffset + 8)
        };
        fillOffset += 12;
      }
    } else if (fillType & 4) {
      if (data.length >= fillOffset + 12) {
        const gradientType = readInt16(data, fillOffset);
        const angle = readInt16(data, fillOffset + 2);
        const centerX = readInt16(data, fillOffset + 4);
        const centerY = readInt16(data, fillOffset + 6);
        const blur = readInt16(data, fillOffset + 8);
        const numColors = readInt16(data, fillOffset + 10);
        fillOffset += 12;
        const colors = [];
        const positionsCount = Math.max(0, numColors - 2);
        fillOffset += positionsCount * 4;
        for (let i = 0; i < numColors && fillOffset + 4 <= data.length; i++) {
          colors.push({ color: readUint32(data, fillOffset) });
          fillOffset += 4;
        }
        result.fill = {
          fillType: "gradient",
          gradientType,
          angle,
          centerX,
          centerY,
          blur,
          colors
        };
      }
    } else if (fillType & 2) {
      if (data.length >= fillOffset + 6) {
        result.fill = {
          fillType: "image",
          imageType: data[fillOffset],
          brightness: readInt8(data, fillOffset + 1),
          contrast: readInt8(data, fillOffset + 2),
          effect: data[fillOffset + 3],
          binItemId: readUint16(data, fillOffset + 4)
        };
      }
    }
  }
  return result;
}
function parseSectionData(data, images, faceNames = /* @__PURE__ */ new Map(), charShapes = /* @__PURE__ */ new Map(), paraShapes = /* @__PURE__ */ new Map(), borderFills = /* @__PURE__ */ new Map()) {
  const section = {
    elements: [],
    pageSettings: { width: 595, height: 842, marginTop: 56.7, marginBottom: 56.7, marginLeft: 56.7, marginRight: 56.7 }
  };
  const ctx = {
    currentParagraph: null,
    currentCharShapeId: 0,
    currentParaShapeId: 0,
    currentStyleId: 0,
    charShapePositions: [],
    pendingTextSegments: [],
    pendingLineSegs: [],
    pendingRangeTags: [],
    currentTable: null,
    currentTableRow: 0,
    currentTableCol: 0,
    currentCtrlId: 0,
    inTableCell: false,
    cellParagraphs: [],
    tableRowCount: 0,
    tableColCount: 0,
    tableCells: [],
    pendingImage: null,
    faceNames,
    charShapes,
    paraShapes,
    borderFills,
    inHeaderFooter: false,
    currentHeaderFooter: null,
    headerFooterParagraphs: [],
    inFootnoteEndnote: false,
    currentFootnoteEndnote: null,
    footnoteEndnoteParagraphs: [],
    currentSectionDef: null,
    currentColumnDef: null,
    nestedLevel: 0,
    pendingShape: null,
    pendingField: null,
    inMemo: false,
    currentMemo: null,
    memoParagraphs: [],
    memos: [],
    inShapeText: false,
    shapeTextParagraphs: []
  };
  let offset = 0;
  let prevLevel = 0;
  let currentParagraphLevel = 0;
  let memoListActive = false;
  let memoListLevel = -1;
  let discardCurrentParagraph = false;
  let paraTextHadInlineControls = false;
  let paraTextWasPresent = false;
  const flushPendingTextSegments = () => {
    if (!ctx.currentParagraph || ctx.pendingTextSegments.length === 0) return;
    for (const segment of ctx.pendingTextSegments) {
      let applicableCharShapeId = ctx.currentCharShapeId;
      for (const pos of ctx.charShapePositions) {
        if (pos.startPos <= segment.start) {
          applicableCharShapeId = pos.charShapeId;
        }
      }
      const charShape = ctx.charShapes.get(applicableCharShapeId);
      const charStyle = charShape ? charShapeToStyleStandalone(charShape, ctx.faceNames) : void 0;
      ctx.currentParagraph.runs.push({ text: segment.text, charStyle });
    }
    ctx.pendingTextSegments = [];
  };
  const pushCurrentParagraph = () => {
    if (!ctx.currentParagraph) return;
    if (discardCurrentParagraph) {
      discardCurrentParagraph = false;
      ctx.currentParagraph = null;
      return;
    }
    flushPendingTextSegments();
    if (ctx.currentParagraph.runs.length === 0) {
      const emptyCS = ctx.charShapePositions.length > 0 ? ctx.charShapes.get(ctx.charShapePositions[0].charShapeId) : ctx.charShapes.get(ctx.currentCharShapeId);
      const emptyStyle = emptyCS ? charShapeToStyleStandalone(emptyCS, ctx.faceNames) : void 0;
      ctx.currentParagraph.runs.push({ text: "", charStyle: emptyStyle });
    }
    if (ctx.inTableCell) {
      if (ctx.inShapeText && currentParagraphLevel >= shapeTextLevel) {
        ctx.shapeTextParagraphs.push(ctx.currentParagraph);
      } else {
        ctx.cellParagraphs.push(ctx.currentParagraph);
      }
    } else if (ctx.inHeaderFooter && currentParagraphLevel > headerFooterLevel) {
      ctx.headerFooterParagraphs.push(ctx.currentParagraph);
    } else if (ctx.inFootnoteEndnote && currentParagraphLevel > footnoteEndnoteLevel) {
      ctx.footnoteEndnoteParagraphs.push(ctx.currentParagraph);
    } else if (ctx.inMemo && currentParagraphLevel > memoLevel) {
      ctx.memoParagraphs.push(ctx.currentParagraph);
    } else if (ctx.inShapeText && currentParagraphLevel >= shapeTextLevel) {
      ctx.shapeTextParagraphs.push(ctx.currentParagraph);
    } else if (currentParagraphLevel === 0) {
      section.elements.push({ type: "paragraph", data: ctx.currentParagraph });
    }
    ctx.currentParagraph = null;
  };
  const tableStack = [];
  const shapeTextStack = [];
  let currentTableLevel = 0;
  let cellContentLevel = -1;
  let headerFooterLevel = -1;
  let footnoteEndnoteLevel = -1;
  let memoLevel = -1;
  let shapeTextLevel = -1;
  let _traceTableCount = 0;
  const finishCurrentTable = () => {
    if (!ctx.currentTable) return;
    if (ctx.inTableCell && ctx.currentParagraph) {
      flushPendingTextSegments();
      if (ctx.currentParagraph.runs.length === 0) {
        ctx.currentParagraph.runs.push({ text: "" });
      }
      if (ctx.inShapeText && currentParagraphLevel >= shapeTextLevel) {
        ctx.shapeTextParagraphs.push(ctx.currentParagraph);
      } else {
        ctx.cellParagraphs.push(ctx.currentParagraph);
      }
      ctx.currentParagraph = null;
    }
    const row = ctx.currentTableRow;
    const col = ctx.currentTableCol;
    if (row < ctx.tableRowCount && col < ctx.tableColCount && ctx.tableCells[row]) {
      ctx.tableCells[row][col].paragraphs = [...ctx.cellParagraphs];
    }
    const coveredCells = /* @__PURE__ */ new Set();
    for (let r = 0; r < ctx.tableRowCount; r++) {
      for (let c = 0; c < ctx.tableColCount; c++) {
        const cell = ctx.tableCells[r]?.[c];
        if (cell && ((cell.colSpan || 1) > 1 || (cell.rowSpan || 1) > 1)) {
          for (let dr = 0; dr < (cell.rowSpan || 1); dr++) {
            for (let dc = 0; dc < (cell.colSpan || 1); dc++) {
              if (dr !== 0 || dc !== 0) {
                coveredCells.add(`${r + dr},${c + dc}`);
              }
            }
          }
        }
      }
    }
    const rows = [];
    for (let r = 0; r < ctx.tableRowCount; r++) {
      const cells = [];
      for (let c = 0; c < ctx.tableColCount; c++) {
        if (coveredCells.has(`${r},${c}`)) continue;
        const cell = ctx.tableCells[r]?.[c];
        if (cell) {
          if (cell.paragraphs.length === 0) cell.paragraphs.push({ id: generateId2(), runs: [{ text: "" }] });
          cells.push(cell);
        }
      }
      if (cells.length > 0) rows.push({ cells });
    }
    ctx.currentTable.rows = rows;
    const isNested = tableStack.length > 0;
    if (isNested) {
      const parent = tableStack[tableStack.length - 1];
      const parentRow = parent.currentRow;
      const parentCol = parent.currentCol;
      if (parentRow < parent.rowCount && parentCol < parent.colCount && parent.cells[parentRow]) {
        if (!parent.cells[parentRow][parentCol].elements) {
          parent.cells[parentRow][parentCol].elements = [];
        }
        parent.cells[parentRow][parentCol].elements.push({ type: "table", data: ctx.currentTable });
      }
    } else if (!ctx.inHeaderFooter && !ctx.inFootnoteEndnote) {
      section.elements.push({ type: "table", data: ctx.currentTable });
    }
    if (global.__HWP_TRACE_ACTIVE && !isNested) {
      global.__HWP_TRACE_ACTIVE = false;
      console.log(`=== TABLE END ===
`);
    }
    ctx.currentTable = null;
    ctx.inTableCell = false;
    ctx.cellParagraphs = [];
  };
  const restoreParentTable = () => {
    if (tableStack.length === 0) return;
    const parent = tableStack.pop();
    ctx.currentTable = parent.table;
    ctx.tableCells = parent.cells;
    ctx.tableRowCount = parent.rowCount;
    ctx.tableColCount = parent.colCount;
    ctx.currentTableRow = parent.currentRow;
    ctx.currentTableCol = parent.currentCol;
    ctx.inTableCell = parent.inCell;
    ctx.cellParagraphs = parent.cellParagraphs;
    cellContentLevel = parent.cellContentLevel;
  };
  while (offset < data.length) {
    if (offset + 4 > data.length) break;
    const header = readUint32(data, offset);
    const tagId = header & 1023;
    const level = header >>> 10 & 1023;
    let size = header >>> 20 & 4095;
    let nextOffset = offset + 4;
    if (size === 4095) {
      if (nextOffset + 4 > data.length) break;
      size = readUint32(data, nextOffset);
      nextOffset += 4;
    }
    prevLevel = level;
    const recordData = data.slice(nextOffset, nextOffset + size);
    if (global.__HWP_TRACE_TAGS && global.__HWP_TRACE_ACTIVE) {
      const _tn = { 66: "PARA_HDR", 67: "PARA_TXT", 68: "PARA_CS", 69: "PARA_LS", 70: "PARA_RT", 71: "CTRL_HDR", 72: "LIST_HDR", 73: "PAGE_DEF", 77: "TABLE", 76: "SHAPE_COMP", 85: "SHAPE_PIC", 87: "SHAPE_TBOX" };
      const _t = _tn[tagId] || `TAG_${tagId}`;
      let extra = "";
      if (tagId === 71 && recordData.length >= 4) {
        const cid = readUint32(recordData, 0);
        const cn = { 1818386804: "TABLE", 1685286759: "GSO", 1667854372: "PIC", 1852929381: "EQU", 1684104552: "HEADER", 1953460070: "FOOTER" };
        extra = ` (${cn[cid] || "0x" + cid.toString(16)})`;
      }
      if (tagId === 72) extra = ` [inCell=${ctx.inTableCell} tblLvl=${currentTableLevel}]`;
      console.log(`${"  ".repeat(level)}[L${level}] ${_t}${extra} | shp=${ctx.inShapeText}:${shapeTextLevel} stk=${shapeTextStack.length} cellLvl=${cellContentLevel}`);
    }
    while (ctx.currentTable && level <= currentTableLevel) {
      finishCurrentTable();
      if (tableStack.length > 0) {
        const parent = tableStack[tableStack.length - 1];
        restoreParentTable();
        currentTableLevel = parent.level;
      } else {
        break;
      }
    }
    const _isParaSubTag = tagId >= HWP_TAGS.HWPTAG_PARA_HEADER && tagId <= HWP_TAGS.HWPTAG_PARA_RANGE_TAG;
    if (ctx.inHeaderFooter && headerFooterLevel >= 0 && level <= headerFooterLevel && !_isParaSubTag) {
      pushCurrentParagraph();
      ctx.inHeaderFooter = false;
      headerFooterLevel = -1;
    }
    if (ctx.inFootnoteEndnote && footnoteEndnoteLevel >= 0 && level <= footnoteEndnoteLevel && !_isParaSubTag) {
      pushCurrentParagraph();
      ctx.inFootnoteEndnote = false;
      footnoteEndnoteLevel = -1;
    }
    if (ctx.inMemo && memoLevel >= 0 && level <= memoLevel && !_isParaSubTag) {
      pushCurrentParagraph();
      ctx.inMemo = false;
      memoLevel = -1;
    }
    const _isBodySectionTag = tagId >= HWP_TAGS.HWPTAG_PARA_HEADER;
    if (ctx.inShapeText && shapeTextLevel >= 0 && level <= shapeTextLevel && _isBodySectionTag) {
      if (level < shapeTextLevel || !_isParaSubTag) {
        const isShapeInternalPara = _isParaSubTag && level < shapeTextLevel && ctx.inTableCell && level !== cellContentLevel && level > currentTableLevel;
        if (!isShapeInternalPara) {
          pushCurrentParagraph();
          if (shapeTextStack.length > 0) {
            const parent = shapeTextStack.pop();
            shapeTextLevel = parent.level;
            ctx.shapeTextParagraphs = parent.paragraphs;
          } else {
            ctx.inShapeText = false;
            shapeTextLevel = -1;
          }
        }
      }
    }
    if (memoListActive && level < memoListLevel) {
      memoListActive = false;
      memoListLevel = -1;
    }
    switch (tagId) {
      case HWP_TAGS.HWPTAG_PARA_HEADER:
        pushCurrentParagraph();
        ctx.currentParagraph = { id: generateId2(), runs: [] };
        currentParagraphLevel = level;
        ctx.charShapePositions = [];
        ctx.pendingTextSegments = [];
        paraTextHadInlineControls = false;
        paraTextWasPresent = false;
        if (memoListActive && level >= memoListLevel) {
          discardCurrentParagraph = true;
        }
        if (recordData.length >= 12) {
          const paraShapeId = readUint16(recordData, 8);
          const paraShape = ctx.paraShapes.get(paraShapeId);
          if (paraShape) {
            const alignMap = {
              0: "justify",
              1: "left",
              2: "right",
              3: "center",
              4: "distribute",
              5: "distribute"
            };
            ctx.currentParagraph.paraStyle = {
              align: alignMap[paraShape.alignment] || "justify",
              marginLeft: hwpunitToPt(paraShape.leftMargin),
              marginRight: hwpunitToPt(paraShape.rightMargin),
              firstLineIndent: hwpunitToPt(paraShape.indent),
              marginTop: hwpunitToPt(paraShape.spacingBefore),
              marginBottom: hwpunitToPt(paraShape.spacingAfter),
              lineSpacing: paraShape.lineSpacingType === 0 ? paraShape.lineSpacing : paraShape.lineSpacing / 100,
              lineSpacingType: paraShape.lineSpacingType === 0 ? "percent" : "fixed",
              keepWithNext: paraShape.keepWithNext,
              keepLines: paraShape.keepTogether
            };
          }
        }
        break;
      case HWP_TAGS.HWPTAG_PARA_CHAR_SHAPE:
        ctx.charShapePositions = [];
        for (let j = 0; j + 8 <= recordData.length; j += 8) {
          const startPos = readUint32(recordData, j);
          const charShapeId = readUint32(recordData, j + 4);
          ctx.charShapePositions.push({ startPos, charShapeId });
        }
        if (ctx.charShapePositions.length > 0) {
          ctx.currentCharShapeId = ctx.charShapePositions[0].charShapeId;
        }
        break;
      case HWP_TAGS.HWPTAG_PARA_TEXT:
        paraTextWasPresent = true;
        if (ctx.currentParagraph) {
          let currentStart = 0;
          let currentText = "";
          let charIndex = 0;
          let i = 0;
          while (i < recordData.length - 1) {
            const charCode = readUint16(recordData, i);
            i += 2;
            if (charCode === 0) {
              charIndex++;
              continue;
            }
            if (charCode < 32) {
              if (currentText) {
                ctx.pendingTextSegments.push({ start: currentStart, end: charIndex, text: currentText });
                currentText = "";
              }
              if (charCode === CTRL_CHAR.LINE_BREAK) {
                ctx.pendingTextSegments.push({ start: charIndex, end: charIndex + 1, text: "\n" });
                charIndex++;
              } else if (charCode === 9) {
                ctx.pendingTextSegments.push({ start: charIndex, end: charIndex + 8, text: "	" });
                i += 14;
                charIndex += 8;
              } else if (charCode >= 2 && charCode <= 8) {
                paraTextHadInlineControls = true;
                i += 14;
                charIndex += 8;
              } else if (charCode === 11 || charCode === 12 || charCode === 14 || charCode === 15 || charCode === 16 || charCode === 17 || charCode === 18 || charCode === 19 || charCode === 21 || charCode === 22 || charCode === 23) {
                paraTextHadInlineControls = true;
                i += 14;
                charIndex += 8;
              } else if (charCode === 13) {
                break;
              } else if (charCode === 30) {
                ctx.pendingTextSegments.push({ start: charIndex, end: charIndex + 1, text: "\xA0" });
                charIndex++;
              } else if (charCode === 31) {
                ctx.pendingTextSegments.push({ start: charIndex, end: charIndex + 1, text: "\u3000" });
                charIndex++;
              } else {
                charIndex++;
              }
              currentStart = charIndex;
              continue;
            }
            currentText += String.fromCharCode(charCode);
            charIndex++;
          }
          if (currentText) {
            ctx.pendingTextSegments.push({ start: currentStart, end: charIndex, text: currentText });
          }
        }
        break;
      case HWP_TAGS.HWPTAG_CTRL_HEADER:
        if (recordData.length >= 4) {
          ctx.currentCtrlId = readUint32(recordData, 0);
          if (ctx.currentCtrlId === CTRL_ID.TABLE) {
            if (global.__HWP_TRACE_TAGS) {
              const _tt = global.__HWP_TRACE_TARGET_TABLE;
              if (_traceTableCount === _tt) {
                global.__HWP_TRACE_ACTIVE = true;
                console.log(`
=== TABLE ${_traceTableCount} START (level=${level}) ===`);
              }
              _traceTableCount++;
            }
            if (ctx.currentParagraph && !ctx.inHeaderFooter && !ctx.inFootnoteEndnote && !ctx.inMemo && !ctx.inShapeText && !ctx.inTableCell && !discardCurrentParagraph) {
              pushCurrentParagraph();
            }
            if (ctx.currentTable) {
              tableStack.push({
                table: ctx.currentTable,
                cells: ctx.tableCells,
                rowCount: ctx.tableRowCount,
                colCount: ctx.tableColCount,
                currentRow: ctx.currentTableRow,
                currentCol: ctx.currentTableCol,
                inCell: ctx.inTableCell,
                cellParagraphs: ctx.cellParagraphs,
                level: currentTableLevel,
                cellContentLevel
              });
            }
            ctx.currentTable = { id: generateId2(), rows: [], rowCount: 0, colCount: 0 };
            ctx.tableCells = [];
            ctx.inTableCell = false;
            ctx.cellParagraphs = [];
            currentTableLevel = level;
          } else if (ctx.currentCtrlId === CTRL_ID.PICTURE || ctx.currentCtrlId === CTRL_ID.GSO) {
            if (ctx.currentParagraph && !ctx.inHeaderFooter && !ctx.inFootnoteEndnote && !ctx.inMemo && !ctx.inShapeText && !ctx.inTableCell && paraTextWasPresent && paraTextHadInlineControls && ctx.pendingTextSegments.length === 0 && ctx.currentParagraph.runs.length === 0) {
              discardCurrentParagraph = true;
            }
            ctx.pendingImage = { width: 200, height: 150 };
            if (recordData.length >= 46) {
              const w = readUint32(recordData, 16);
              const h = readUint32(recordData, 20);
              if (w > 0) ctx.pendingImage.width = w / 7200 * 72;
              if (h > 0) ctx.pendingImage.height = h / 7200 * 72;
            }
            if (ctx.inShapeText && shapeTextLevel >= 0) {
              shapeTextStack.push({ level: shapeTextLevel, paragraphs: ctx.shapeTextParagraphs });
            }
            ctx.inShapeText = true;
            ctx.shapeTextParagraphs = [];
            shapeTextLevel = level;
          } else if (ctx.currentCtrlId === CTRL_ID.HEADER || ctx.currentCtrlId === CTRL_ID.FOOTER) {
            ctx.inHeaderFooter = true;
            ctx.headerFooterParagraphs = [];
            headerFooterLevel = level;
          } else if (ctx.currentCtrlId === CTRL_ID.FOOTNOTE || ctx.currentCtrlId === CTRL_ID.ENDNOTE) {
            ctx.inFootnoteEndnote = true;
            ctx.footnoteEndnoteParagraphs = [];
            footnoteEndnoteLevel = level;
          } else if (ctx.currentCtrlId === CTRL_ID.FIELD_MEMO) {
            ctx.inMemo = true;
            ctx.memoParagraphs = [];
            memoLevel = level;
          } else if (ctx.currentCtrlId !== CTRL_ID.SECTION && ctx.currentCtrlId !== CTRL_ID.COLUMN && ctx.currentCtrlId !== CTRL_ID.AUTO_NUMBER && ctx.currentCtrlId !== CTRL_ID.PAGE_NUMBER_POS && ctx.currentCtrlId !== CTRL_ID.BOOKMARK && ctx.currentCtrlId !== CTRL_ID.TCPS && ctx.currentCtrlId !== CTRL_ID.FORM && (ctx.currentCtrlId >> 24 & 255) !== 37) {
            if (ctx.inShapeText && shapeTextLevel >= 0) {
              shapeTextStack.push({ level: shapeTextLevel, paragraphs: ctx.shapeTextParagraphs });
            }
            ctx.inShapeText = true;
            ctx.shapeTextParagraphs = [];
            shapeTextLevel = level;
          }
        }
        break;
      case HWP_TAGS.HWPTAG_TABLE:
        if (ctx.currentTable && recordData.length >= 8) {
          const rowCount = readUint16(recordData, 4);
          const colCount = readUint16(recordData, 6);
          ctx.currentTable.rowCount = rowCount;
          ctx.currentTable.colCount = colCount;
          ctx.tableRowCount = rowCount;
          ctx.tableColCount = colCount;
          ctx.tableCells = [];
          for (let r = 0; r < rowCount; r++) {
            ctx.tableCells[r] = [];
            for (let c = 0; c < colCount; c++) {
              ctx.tableCells[r][c] = { paragraphs: [], colAddr: c, rowAddr: r, colSpan: 1, rowSpan: 1 };
            }
          }
          const cellSpacing = recordData.length >= 10 ? readUint16(recordData, 8) / 7200 * 72 : 0;
          ctx.currentTable.cellSpacing = cellSpacing;
          ctx.currentTableRow = 0;
          ctx.currentTableCol = 0;
        }
        break;
      case HWP_TAGS.HWPTAG_LIST_HEADER:
        if (ctx.currentTable && recordData.length >= 34 && level === currentTableLevel + 1) {
          const headerSize = 8;
          const cellCol = readUint16(recordData, headerSize);
          const cellRow = readUint16(recordData, headerSize + 2);
          if (cellRow >= ctx.tableRowCount || cellCol >= ctx.tableColCount) {
            break;
          }
          if (ctx.inTableCell) {
            if (ctx.currentParagraph) {
              flushPendingTextSegments();
              if (ctx.currentParagraph.runs.length === 0) {
                ctx.currentParagraph.runs.push({ text: "" });
              }
              if (ctx.inShapeText && currentParagraphLevel >= shapeTextLevel) {
                ctx.shapeTextParagraphs.push(ctx.currentParagraph);
              } else {
                ctx.cellParagraphs.push(ctx.currentParagraph);
              }
            }
            const prevRow = ctx.currentTableRow;
            const prevCol = ctx.currentTableCol;
            if (prevRow < ctx.tableRowCount && prevCol < ctx.tableColCount && ctx.tableCells[prevRow]) {
              ctx.tableCells[prevRow][prevCol].paragraphs = [...ctx.cellParagraphs];
            }
          }
          const colSpan = readUint16(recordData, headerSize + 4);
          const rowSpan = readUint16(recordData, headerSize + 6);
          const cellWidth = readUint32(recordData, headerSize + 8) / 7200 * 72;
          const cellHeight = readUint32(recordData, headerSize + 12) / 7200 * 72;
          const marginLeft = readUint16(recordData, headerSize + 16) / 7200 * 72;
          const marginRight = readUint16(recordData, headerSize + 18) / 7200 * 72;
          const marginTop = readUint16(recordData, headerSize + 20) / 7200 * 72;
          const marginBottom = readUint16(recordData, headerSize + 22) / 7200 * 72;
          const borderFillId = recordData.length > headerSize + 24 ? readUint16(recordData, headerSize + 24) : 0;
          ctx.currentTableCol = cellCol;
          ctx.currentTableRow = cellRow;
          if (cellRow < ctx.tableRowCount && cellCol < ctx.tableColCount && ctx.tableCells[cellRow]) {
            const cell = ctx.tableCells[cellRow][cellCol];
            cell.colSpan = colSpan || 1;
            cell.rowSpan = rowSpan || 1;
            cell.width = cellWidth;
            cell.height = cellHeight;
            cell.marginLeft = marginLeft;
            cell.marginRight = marginRight;
            cell.marginTop = marginTop;
            cell.marginBottom = marginBottom;
            cell.borderFillId = borderFillId;
            const borderFill = ctx.borderFills.get(borderFillId);
            if (borderFill) {
              const fill = borderFill.fill;
              if (fill && fill.fillType === "solid" && fill.backgroundColor !== void 0) {
                cell.backgroundColor = colorrefToHex(fill.backgroundColor);
              }
              if (borderFill.borders) {
                const mapBorder = (b) => ({
                  width: b.width * 0.1,
                  style: b.type === 0 ? "none" : "solid",
                  color: colorrefToHex(b.color)
                });
                cell.borderTop = mapBorder(borderFill.borders.top);
                cell.borderBottom = mapBorder(borderFill.borders.bottom);
                cell.borderLeft = mapBorder(borderFill.borders.left);
                cell.borderRight = mapBorder(borderFill.borders.right);
              }
            }
          }
          ctx.inTableCell = true;
          cellContentLevel = level + 1;
          ctx.cellParagraphs = [];
          ctx.currentParagraph = null;
          ctx.inShapeText = false;
          shapeTextLevel = -1;
          shapeTextStack.length = 0;
          ctx.shapeTextParagraphs = [];
          if (global.__HWP_TRACE_ACTIVE) console.log(`--- Cell [${cellRow},${cellCol}] cellContentLevel=${cellContentLevel} ---`);
        }
        break;
      case HWP_TAGS.HWPTAG_SHAPE_COMPONENT:
        if (ctx.pendingImage && recordData.length >= 24) {
          const w = readInt32(recordData, 16);
          const h = readInt32(recordData, 20);
          if (w > 0) ctx.pendingImage.width = w / 7200 * 72;
          if (h > 0) ctx.pendingImage.height = h / 7200 * 72;
        }
        break;
      case HWP_TAGS.HWPTAG_SHAPE_COMPONENT_PICTURE:
        if (recordData.length >= 73) {
          const binItemId = readUint16(recordData, 71);
          const idStr = `BIN${String(binItemId).padStart(4, "0")}`;
          const existingImage = images.get(idStr);
          const image = {
            id: generateId2(),
            binaryId: idStr,
            width: ctx.pendingImage?.width || 200,
            height: ctx.pendingImage?.height || 150,
            data: existingImage?.data,
            mimeType: existingImage?.mimeType
          };
          if (ctx.inTableCell) {
            const row = ctx.currentTableRow;
            const col = ctx.currentTableCol;
            if (row < ctx.tableRowCount && col < ctx.tableColCount && ctx.tableCells[row]?.[col]) {
              if (!ctx.tableCells[row][col].elements) ctx.tableCells[row][col].elements = [];
              ctx.tableCells[row][col].elements.push({ type: "image", data: image });
            }
          } else if (!ctx.inHeaderFooter && !ctx.inFootnoteEndnote) {
            section.elements.push({ type: "image", data: image });
          }
          ctx.pendingImage = null;
        }
        break;
      case HWP_TAGS.HWPTAG_MEMO_LIST:
        memoListActive = true;
        memoListLevel = level;
        break;
      case HWP_TAGS.HWPTAG_PAGE_DEF:
        if (recordData.length >= 40) {
          section.pageSettings = {
            width: readUint32(recordData, 0) / 100,
            height: readUint32(recordData, 4) / 100,
            marginLeft: readUint32(recordData, 8) / 100,
            marginRight: readUint32(recordData, 12) / 100,
            marginTop: readUint32(recordData, 16) / 100,
            marginBottom: readUint32(recordData, 20) / 100,
            orientation: readUint32(recordData, 36) & 1 ? "landscape" : "portrait"
          };
        }
        break;
    }
    offset = nextOffset + size;
  }
  if (ctx.currentTable) {
    finishCurrentTable();
    while (tableStack.length > 0) {
      restoreParentTable();
      if (ctx.currentTable) finishCurrentTable();
    }
  }
  if (ctx.currentParagraph) {
    pushCurrentParagraph();
  }
  if (section.elements.length === 0) {
    section.elements.push({ type: "paragraph", data: { id: generateId2(), runs: [{ text: "" }] } });
  }
  return section;
}
function parseHwpContent(data) {
  const cfb = CFB.read(data, { type: "array" });
  const content = {
    metadata: {},
    sections: [],
    images: /* @__PURE__ */ new Map(),
    binItems: /* @__PURE__ */ new Map(),
    binData: /* @__PURE__ */ new Map(),
    footnotes: [],
    endnotes: []
  };
  const headerData = CFB.find(cfb, "/FileHeader")?.content;
  if (!headerData || headerData.length < 256) {
    throw new Error("Invalid HWP file");
  }
  const headerBytes = headerData instanceof Uint8Array ? headerData : new Uint8Array(headerData);
  const props = readUint32(headerBytes, 36);
  const compressed = (props & 1) !== 0;
  const decompress = (d) => {
    if (!compressed) return d;
    try {
      return inflateRaw_1(d);
    } catch {
      return d;
    }
  };
  const getEntryData = (path) => {
    const entry = CFB.find(cfb, path);
    if (!entry?.content) return null;
    const raw = entry.content instanceof Uint8Array ? entry.content : new Uint8Array(entry.content);
    return decompress(raw);
  };
  const binDataInfos = /* @__PURE__ */ new Map();
  const faceNames = /* @__PURE__ */ new Map();
  const charShapes = /* @__PURE__ */ new Map();
  const paraShapes = /* @__PURE__ */ new Map();
  const borderFills = /* @__PURE__ */ new Map();
  let docInfoData = getEntryData("/DocInfo");
  if (docInfoData) {
    let offset = 0;
    let binDataId = 1;
    let faceNameId = 0;
    let charShapeId = 0;
    let paraShapeId = 0;
    let borderFillId = 1;
    while (offset < docInfoData.length) {
      if (offset + 4 > docInfoData.length) break;
      const header = readUint32(docInfoData, offset);
      const tagId = header & 1023;
      let size = header >>> 20 & 4095;
      let nextOffset = offset + 4;
      if (size === 4095) {
        if (nextOffset + 4 > docInfoData.length) break;
        size = readUint32(docInfoData, nextOffset);
        nextOffset += 4;
      }
      const recordData = docInfoData.slice(nextOffset, nextOffset + size);
      if (tagId === HWP_TAGS.HWPTAG_BIN_DATA && recordData.length >= 2) {
        const p = readUint16(recordData, 0);
        const type = p & 15;
        let ext = "";
        if (type === 1 && recordData.length > 10) {
          let extOffset = 2;
          if (recordData.length > extOffset + 2) extOffset += 2 + readUint16(recordData, extOffset) * 2;
          if (recordData.length > extOffset + 2) extOffset += 2 + readUint16(recordData, extOffset) * 2;
          extOffset += 2;
          if (recordData.length > extOffset + 2) {
            const extLen = readUint16(recordData, extOffset);
            extOffset += 2;
            if (recordData.length >= extOffset + extLen * 2) {
              ext = new TextDecoder("utf-16le").decode(recordData.slice(extOffset, extOffset + extLen * 2));
            }
          }
        }
        binDataInfos.set(binDataId, { id: binDataId, type: type === 0 ? "LINK" : type === 1 ? "EMBEDDING" : "STORAGE", extension: ext.toLowerCase() });
        binDataId++;
      } else if (tagId === HWP_TAGS.HWPTAG_FACE_NAME && recordData.length >= 3) {
        const faceName = parseFaceNameStandalone(recordData);
        if (faceName) {
          faceNames.set(faceNameId, faceName);
        }
        faceNameId++;
      } else if (tagId === HWP_TAGS.HWPTAG_CHAR_SHAPE && recordData.length >= 72) {
        const charShape = parseCharShapeStandalone(recordData);
        if (charShape) {
          charShapes.set(charShapeId, charShape);
        }
        charShapeId++;
      } else if (tagId === HWP_TAGS.HWPTAG_PARA_SHAPE && recordData.length >= 42) {
        const paraShape = parseParaShapeStandalone(recordData);
        if (paraShape) {
          paraShapes.set(paraShapeId, paraShape);
        }
        paraShapeId++;
      } else if (tagId === HWP_TAGS.HWPTAG_BORDER_FILL && recordData.length >= 32) {
        const borderFill = parseBorderFillStandalone(recordData);
        if (borderFill) {
          borderFills.set(borderFillId, borderFill);
        }
        borderFillId++;
      }
      offset = nextOffset + size;
    }
  }
  for (const entry of cfb.FileIndex) {
    const fullPath = entry.name;
    if (!fullPath.startsWith("BIN") || !entry.content) continue;
    const match = fullPath.match(/BIN(\d+)/i);
    if (!match) continue;
    const binId = parseInt(match[1], 10);
    const binInfo = binDataInfos.get(binId);
    let imageData = entry.content instanceof Uint8Array ? entry.content : new Uint8Array(entry.content);
    if (compressed) {
      try {
        imageData = inflateRaw_1(imageData);
      } catch {
      }
    }
    let mimeType = "image/png";
    if (imageData[0] === 255 && imageData[1] === 216) mimeType = "image/jpeg";
    else if (imageData[0] === 137 && imageData[1] === 80) mimeType = "image/png";
    else if (imageData[0] === 71 && imageData[1] === 73) mimeType = "image/gif";
    else if (imageData[0] === 66 && imageData[1] === 77) mimeType = "image/bmp";
    else if (binInfo?.extension) {
      const extMap = { jpg: "image/jpeg", jpeg: "image/jpeg", png: "image/png", gif: "image/gif", bmp: "image/bmp" };
      mimeType = extMap[binInfo.extension] || mimeType;
    }
    const base64 = uint8ArrayToBase64(imageData);
    const dataUrl = `data:${mimeType};base64,${base64}`;
    const idStr = `BIN${String(binId).padStart(4, "0")}`;
    content.images.set(idStr, { id: idStr, binaryId: idStr, width: 200, height: 150, data: dataUrl, mimeType });
    content.binData.set(idStr, { id: idStr, data: dataUrl });
  }
  let sectionIndex = 0;
  while (true) {
    const sectionData = getEntryData(`/BodyText/Section${sectionIndex}`);
    if (!sectionData) break;
    content.sections.push(parseSectionData(sectionData, content.images, faceNames, charShapes, paraShapes, borderFills));
    sectionIndex++;
  }
  if (content.sections.length === 0) {
    content.sections.push({
      elements: [{ type: "paragraph", data: { id: generateId2(), runs: [{ text: "" }] } }],
      pageSettings: { width: 595, height: 842, marginTop: 56.7, marginBottom: 56.7, marginLeft: 56.7, marginRight: 56.7 }
    });
  }
  return content;
}

// src/HwpParser.ts
var HwpParser = class {
  static parse(data) {
    return parseHwpContent(data);
  }
};

// src/HwpxDocument.ts
var MAX_UNDO_STACK_SIZE = 50;
var HwpxDocument = class _HwpxDocument {
  constructor(id, path, zip, content, format) {
    this._isDirty = false;
    this._undoStack = [];
    this._redoStack = [];
    this._pendingTextReplacements = [];
    this._pendingDirectTextUpdates = [];
    this._pendingTableRowInserts = [];
    this._pendingTableRowDeletes = [];
    this._pendingTableColumnInserts = [];
    this._pendingTableColumnDeletes = [];
    this._pendingCellMerges = [];
    this._pendingHeaderFooter = [];
    this._pendingImageInserts = [];
    this._pendingImageDeletes = [];
    this._pendingImageSizeUpdates = [];
    this._hasStructuralChanges = false;
    this._nextInstId = Math.floor(Math.random() * 1e9) + 1e9;
    this._id = id;
    this._path = path;
    this._zip = zip;
    this._content = content;
    this._format = format;
  }
  static async createFromBuffer(id, path, data) {
    const extension = path.toLowerCase();
    if (extension.endsWith(".hwp")) {
      const content = HwpParser.parse(new Uint8Array(data));
      return new _HwpxDocument(id, path, null, content, "hwp");
    } else {
      const zip = await import_jszip.default.loadAsync(data);
      const content = await HwpxParser.parse(zip);
      return new _HwpxDocument(id, path, zip, content, "hwpx");
    }
  }
  static createNew(id, title, creator) {
    const now = (/* @__PURE__ */ new Date()).toISOString();
    const content = {
      metadata: {
        title: title || "Untitled",
        creator: creator || "Unknown",
        createdDate: now,
        modifiedDate: now
      },
      sections: [{
        id: Math.random().toString(36).substring(2, 11),
        elements: [{
          type: "paragraph",
          data: {
            id: Math.random().toString(36).substring(2, 11),
            runs: [{ text: "" }]
          }
        }],
        pageSettings: {
          width: 59528,
          height: 84188,
          marginTop: 4252,
          marginBottom: 4252,
          marginLeft: 4252,
          marginRight: 4252
        }
      }],
      images: /* @__PURE__ */ new Map(),
      binItems: /* @__PURE__ */ new Map(),
      binData: /* @__PURE__ */ new Map(),
      footnotes: [],
      endnotes: []
    };
    const zip = new import_jszip.default();
    zip.file("mimetype", "application/hwp+zip");
    zip.file("Contents/header.xml", `<?xml version="1.0" encoding="UTF-8"?>
<hh:head xmlns:hh="http://www.hancom.co.kr/hwpml/2011/head">
  <hh:title>${title || "Untitled"}</hh:title>
  <hh:creator>${creator || "Unknown"}</hh:creator>
  <hh:createdDate>${now}</hh:createdDate>
  <hh:modifiedDate>${now}</hh:modifiedDate>
</hh:head>`);
    zip.file("Contents/section0.xml", `<?xml version="1.0" encoding="UTF-8"?>
<hp:sec xmlns:hp="http://www.hancom.co.kr/hwpml/2011/paragraph">
  <hp:p>
    <hp:run>
      <hp:t></hp:t>
    </hp:run>
  </hp:p>
</hp:sec>`);
    zip.file("Contents/content.hpf", `<?xml version="1.0" encoding="UTF-8" standalone="yes" ?><opf:package xmlns:hp="http://www.hancom.co.kr/hwpml/2011/paragraph" xmlns:hc="http://www.hancom.co.kr/hwpml/2011/core" xmlns:hh="http://www.hancom.co.kr/hwpml/2011/head" xmlns:hpf="http://www.hancom.co.kr/schema/2011/hpf" xmlns:opf="http://www.idpf.org/2007/opf/" version="" unique-identifier="" id=""><opf:metadata><opf:title>${title || "Untitled"}</opf:title><opf:language>ko</opf:language><opf:meta name="creator" content="text">${creator || "Unknown"}</opf:meta><opf:meta name="CreatedDate" content="text">${now}</opf:meta><opf:meta name="ModifiedDate" content="text">${now}</opf:meta></opf:metadata><opf:manifest><opf:item id="header" href="Contents/header.xml" media-type="application/xml"/><opf:item id="section0" href="Contents/section0.xml" media-type="application/xml"/></opf:manifest><opf:spine><opf:itemref idref="header" linear="yes"/><opf:itemref idref="section0" linear="yes"/></opf:spine></opf:package>`);
    return new _HwpxDocument(id, "new-document.hwpx", zip, content, "hwpx");
  }
  get id() {
    return this._id;
  }
  get path() {
    return this._path;
  }
  get format() {
    return this._format;
  }
  get isDirty() {
    return this._isDirty;
  }
  get zip() {
    return this._zip;
  }
  get content() {
    return this._content;
  }
  // ============================================================
  // Undo/Redo
  // ============================================================
  saveState() {
    const state = this.serializeContent();
    this._undoStack.push(state);
    if (this._undoStack.length > MAX_UNDO_STACK_SIZE) {
      this._undoStack.shift();
    }
    this._redoStack = [];
  }
  serializeContent() {
    return JSON.stringify({
      sections: this._content.sections,
      metadata: this._content.metadata
    });
  }
  deserializeContent(state) {
    const parsed = JSON.parse(state);
    this._content.sections = parsed.sections;
    this._content.metadata = parsed.metadata;
  }
  canUndo() {
    return this._undoStack.length > 0;
  }
  canRedo() {
    return this._redoStack.length > 0;
  }
  undo() {
    if (!this.canUndo()) return false;
    const currentState = this.serializeContent();
    this._redoStack.push(currentState);
    const previousState = this._undoStack.pop();
    this.deserializeContent(previousState);
    this._isDirty = true;
    return true;
  }
  redo() {
    if (!this.canRedo()) return false;
    const currentState = this.serializeContent();
    this._undoStack.push(currentState);
    const nextState = this._redoStack.pop();
    this.deserializeContent(nextState);
    this._isDirty = true;
    return true;
  }
  // ============================================================
  // Content Access
  // ============================================================
  getSerializableContent() {
    return {
      metadata: this._content.metadata,
      sections: this._content.sections,
      images: Array.from(this._content.images.entries()),
      footnotes: this._content.footnotes,
      endnotes: this._content.endnotes
    };
  }
  getAllText() {
    let text = "";
    for (const section of this._content.sections) {
      text += this.extractHeaderFooterText(section.header);
      for (const element of section.elements) {
        if (element.type === "paragraph") {
          if (!element.data?.runs) continue;
          text += element.data.runs.map((r) => r.text || "").join("") + "\n";
        } else if (element.type === "table") {
          text += this.extractTableText(element.data) + "\n";
        } else if (element.type === "image") {
          const captionText = this.extractCaptionText(element.data?.caption);
          if (captionText) {
            text += captionText + "\n";
          }
        } else if (element.type === "container") {
          const captionText = this.extractCaptionText(element.data?.caption);
          if (captionText) {
            text += captionText + "\n";
          }
        } else if (element.type === "textbox") {
          const tbText = this.extractParagraphsText(element.data?.paragraphs);
          if (tbText) {
            text += tbText + "\n";
          }
        } else if (element.type === "rect" || element.type === "ellipse" || element.type === "arc" || element.type === "polygon" || element.type === "curve" || element.type === "connectline") {
          const drawText = this.extractDrawTextParagraphs(element.data);
          if (drawText) {
            text += drawText + "\n";
          }
        }
      }
      text += this.extractHeaderFooterText(section.footer);
    }
    return text;
  }
  extractHeaderFooterText(hf) {
    if (!hf) return "";
    let text = "";
    if (hf.elements && hf.elements.length > 0) {
      for (const element of hf.elements) {
        if (element.type === "paragraph") {
          if (!element.data?.runs) continue;
          const paraText = element.data.runs.map((r) => r.text || "").join("");
          if (paraText.trim()) text += paraText + "\n";
        } else if (element.type === "table") {
          const tableText = this.extractTableText(element.data);
          if (tableText.trim()) text += tableText + "\n";
        }
      }
    } else if (hf.paragraphs) {
      for (const para of hf.paragraphs) {
        if (!para?.runs) continue;
        const paraText = para.runs.map((r) => r.text || "").join("");
        if (paraText.trim()) text += paraText + "\n";
      }
    }
    return text;
  }
  extractTableText(table) {
    if (!table?.rows) return "";
    const lines = [];
    const captionText = this.extractCaptionText(table.caption);
    if (captionText) {
      lines.push(captionText);
    }
    for (const row of table.rows) {
      if (!row?.cells) continue;
      const cellTexts = [];
      for (const cell of row.cells) {
        const cellText = this.extractCellText(cell);
        if (cellText) {
          cellTexts.push(cellText);
        }
      }
      if (cellTexts.length > 0) {
        lines.push(cellTexts.join("	"));
      }
    }
    return lines.join("\n");
  }
  extractCellText(cell) {
    if (!cell) return "";
    const parts = [];
    if (cell.elements && cell.elements.length > 0) {
      for (const el of cell.elements) {
        if (el.type === "paragraph") {
          if (!el.data?.runs) continue;
          const paraText = el.data.runs.map((r) => r.text || "").join("");
          if (paraText) {
            parts.push(paraText);
          }
        } else if (el.type === "table") {
          const nestedText = this.extractTableText(el.data);
          if (nestedText) {
            parts.push(nestedText);
          }
        } else if (el.type === "image") {
          const captionText = this.extractCaptionText(el.data?.caption);
          if (captionText) {
            parts.push(captionText);
          }
        }
      }
    } else {
      if (cell.paragraphs) {
        for (const para of cell.paragraphs) {
          if (!para?.runs) continue;
          const paraText = para.runs.map((r) => r.text || "").join("");
          if (paraText) {
            parts.push(paraText);
          }
        }
      }
      if (cell.nestedTables) {
        for (const nestedTable of cell.nestedTables) {
          const nestedText = this.extractTableText(nestedTable);
          if (nestedText) {
            parts.push(nestedText);
          }
        }
      }
    }
    return parts.join("\n");
  }
  extractCaptionText(caption) {
    if (!caption?.paragraphs) return "";
    return this.extractParagraphsText(caption.paragraphs);
  }
  extractParagraphsText(paragraphs) {
    if (!paragraphs) return "";
    const parts = [];
    for (const para of paragraphs) {
      if (!para?.runs) continue;
      const paraText = para.runs.map((r) => r.text || "").join("");
      if (paraText) {
        parts.push(paraText);
      }
    }
    return parts.join("\n");
  }
  extractDrawTextParagraphs(data) {
    if (!data?.drawingObject?.drawText?.paragraphs) return "";
    return this.extractParagraphsText(data.drawingObject.drawText.paragraphs);
  }
  getStructure() {
    return {
      format: this._format,
      sections: this._content.sections.map((s, i) => {
        let paragraphs = 0, tables = 0, images = 0;
        for (const el of s.elements) {
          if (el.type === "paragraph") paragraphs++;
          if (el.type === "table") tables++;
          if (el.type === "image") images++;
        }
        return { section: i, paragraphs, tables, images };
      })
    };
  }
  // ============================================================
  // Paragraph Operations
  // ============================================================
  findParagraphByPath(sectionIndex, elementIndex) {
    const si = Number(sectionIndex);
    const ei = Number(elementIndex);
    if (isNaN(si) || isNaN(ei)) return null;
    const section = this._content.sections[si];
    if (!section) return null;
    if (ei < 0 || ei >= section.elements.length) return null;
    const el = section.elements[ei];
    if (el.type !== "paragraph") return null;
    return el.data;
  }
  getParagraphs(sectionIndex) {
    const paragraphs = [];
    const sections = sectionIndex !== void 0 ? [{ section: this._content.sections[sectionIndex], idx: sectionIndex }] : this._content.sections.map((s, i) => ({ section: s, idx: i }));
    for (const { section, idx } of sections) {
      if (!section) continue;
      for (let elementIndex = 0; elementIndex < section.elements.length; elementIndex++) {
        const el = section.elements[elementIndex];
        if (el.type === "paragraph") {
          if (el.data?.runs) {
            paragraphs.push({
              section: idx,
              index: elementIndex,
              text: el.data.runs.map((r) => r.text || "").join(""),
              style: el.data.paraStyle
            });
          }
        }
      }
    }
    return paragraphs;
  }
  getParagraph(sectionIndex, paragraphIndex) {
    const para = this.findParagraphByPath(sectionIndex, paragraphIndex);
    if (!para) return null;
    const runs = para.runs || [];
    return {
      text: runs.map((r) => r.text || "").join(""),
      runs,
      style: para.paraStyle
    };
  }
  updateParagraphText(sectionIndex, elementIndex, runIndex, text) {
    const paragraph = this.findParagraphByPath(sectionIndex, elementIndex);
    if (!paragraph || !paragraph.runs[runIndex]) return;
    const oldText = paragraph.runs[runIndex].text;
    if (oldText && oldText !== text && this._zip) {
      this._pendingDirectTextUpdates.push({ oldText, newText: text });
    }
    this.saveState();
    paragraph.runs[runIndex].text = text;
    this._isDirty = true;
  }
  updateParagraphRuns(sectionIndex, elementIndex, runs) {
    const paragraph = this.findParagraphByPath(sectionIndex, elementIndex);
    if (!paragraph) return;
    this.saveState();
    paragraph.runs = runs;
    this._isDirty = true;
  }
  insertParagraph(sectionIndex, afterElementIndex, text = "") {
    const section = this._content.sections[sectionIndex];
    if (!section) return -1;
    this.saveState();
    const newParagraph = {
      id: Math.random().toString(36).substring(2, 11),
      runs: [{ text }]
    };
    const newElement = { type: "paragraph", data: newParagraph };
    section.elements.splice(afterElementIndex + 1, 0, newElement);
    this._isDirty = true;
    this._hasStructuralChanges = true;
    return afterElementIndex + 1;
  }
  deleteParagraph(sectionIndex, elementIndex) {
    const section = this._content.sections[sectionIndex];
    if (!section) return false;
    if (elementIndex < 0 || elementIndex >= section.elements.length) return false;
    if (section.elements[elementIndex].type !== "paragraph") return false;
    this.saveState();
    section.elements.splice(elementIndex, 1);
    this._isDirty = true;
    this._hasStructuralChanges = true;
    return true;
  }
  createBulletedList(sectionIndex, items, afterElementIndex, bulletChar = "\u2022") {
    const section = this._content.sections[sectionIndex];
    if (!section) return [];
    this.saveState();
    const insertIndex = afterElementIndex !== void 0 ? afterElementIndex + 1 : section.elements.length;
    const insertedIndices = [];
    for (let i = 0; i < items.length; i++) {
      const newParagraph = {
        id: Math.random().toString(36).substring(2, 11),
        runs: [{ text: `${bulletChar} ${items[i]}` }],
        listType: "bullet",
        listLevel: 0
      };
      const newElement = { type: "paragraph", data: newParagraph };
      section.elements.splice(insertIndex + i, 0, newElement);
      insertedIndices.push(insertIndex + i);
    }
    this._isDirty = true;
    this._hasStructuralChanges = true;
    return insertedIndices;
  }
  createNumberedList(sectionIndex, items, afterElementIndex, startNumber = 1, format = "decimal") {
    const section = this._content.sections[sectionIndex];
    if (!section) return [];
    this.saveState();
    const insertIndex = afterElementIndex !== void 0 ? afterElementIndex + 1 : section.elements.length;
    const insertedIndices = [];
    for (let i = 0; i < items.length; i++) {
      const number = startNumber + i;
      let prefix;
      switch (format) {
        case "roman":
          prefix = this.toRoman(number);
          break;
        case "alpha":
          prefix = String.fromCharCode(96 + number);
          break;
        default:
          prefix = number.toString();
      }
      const newParagraph = {
        id: Math.random().toString(36).substring(2, 11),
        runs: [{ text: `${prefix}. ${items[i]}` }],
        listType: "number",
        listLevel: 0
      };
      const newElement = { type: "paragraph", data: newParagraph };
      section.elements.splice(insertIndex + i, 0, newElement);
      insertedIndices.push(insertIndex + i);
    }
    this._isDirty = true;
    this._hasStructuralChanges = true;
    return insertedIndices;
  }
  toRoman(num) {
    const romanNumerals = [
      [1e3, "M"],
      [900, "CM"],
      [500, "D"],
      [400, "CD"],
      [100, "C"],
      [90, "XC"],
      [50, "L"],
      [40, "XL"],
      [10, "X"],
      [9, "IX"],
      [5, "V"],
      [4, "IV"],
      [1, "I"]
    ];
    let result = "";
    for (const [value, symbol] of romanNumerals) {
      while (num >= value) {
        result += symbol;
        num -= value;
      }
    }
    return result.toLowerCase();
  }
  setParagraphNumbering(sectionIndex, paragraphIndex, type, level = 0) {
    const paragraph = this.findParagraphByPath(sectionIndex, paragraphIndex);
    if (!paragraph) return false;
    this.saveState();
    if (type === "none") {
      paragraph.listType = void 0;
      paragraph.listLevel = void 0;
    } else if (type === "bullet") {
      paragraph.listType = "bullet";
      paragraph.listLevel = level;
    } else {
      paragraph.listType = "number";
      paragraph.listLevel = level;
    }
    this._isDirty = true;
    return true;
  }
  appendTextToParagraph(sectionIndex, elementIndex, text) {
    const paragraph = this.findParagraphByPath(sectionIndex, elementIndex);
    if (!paragraph) return;
    this.saveState();
    paragraph.runs.push({ text });
    this._isDirty = true;
  }
  // ============================================================
  // Character Style Operations
  // ============================================================
  applyCharacterStyle(sectionIndex, elementIndex, runIndex, style) {
    const paragraph = this.findParagraphByPath(sectionIndex, elementIndex);
    if (!paragraph || !paragraph.runs[runIndex]) return;
    this.saveState();
    const run = paragraph.runs[runIndex];
    run.charStyle = { ...run.charStyle, ...style };
    this._isDirty = true;
  }
  getCharacterStyle(sectionIndex, elementIndex, runIndex) {
    const paragraph = this.findParagraphByPath(sectionIndex, elementIndex);
    if (!paragraph) return null;
    if (runIndex !== void 0) {
      return paragraph.runs[runIndex]?.charStyle || null;
    }
    return paragraph.runs.map((r) => r.charStyle || {});
  }
  // ============================================================
  // Paragraph Style Operations
  // ============================================================
  applyParagraphStyle(sectionIndex, elementIndex, style) {
    const paragraph = this.findParagraphByPath(sectionIndex, elementIndex);
    if (!paragraph) return;
    this.saveState();
    paragraph.paraStyle = { ...paragraph.paraStyle, ...style };
    this._isDirty = true;
  }
  getParagraphStyle(sectionIndex, elementIndex) {
    const paragraph = this.findParagraphByPath(sectionIndex, elementIndex);
    return paragraph?.paraStyle || null;
  }
  // ============================================================
  // Table Operations
  // ============================================================
  findTable(sectionIndex, tableIndex) {
    const si = Number(sectionIndex ?? 0);
    const ti = Number(tableIndex ?? 0);
    if (isNaN(si) || isNaN(ti)) return null;
    const section = this._content.sections[si];
    if (!section) return null;
    const tables = section.elements.filter((el2) => el2.type === "table");
    const el = tables[ti];
    if (!el) return null;
    return el.data ?? null;
  }
  getTables() {
    const tables = [];
    this._content.sections.forEach((section, si) => {
      let tableIndex = 0;
      section.elements.forEach((el) => {
        if (el.type === "table") {
          const table = el.data;
          tables.push({
            section_index: si,
            table_index: tableIndex++,
            rows: table.rows.length,
            cols: table.rows[0]?.cells.length || 0
          });
        }
      });
    });
    return tables;
  }
  getTable(sectionIndex, tableIndex) {
    const table = this.findTable(sectionIndex, tableIndex);
    if (!table) return null;
    return {
      rows: table.rows.length,
      cols: table.rows[0]?.cells.length || 0,
      data: table.rows.map((row) => row.cells.map((cell) => ({
        text: this.extractCellText(cell),
        style: cell
      })))
    };
  }
  getTableCell(sectionIndex, tableIndex, row, col) {
    const table = this.findTable(sectionIndex, tableIndex);
    if (!table) return null;
    const cell = table.rows[row]?.cells[col];
    if (!cell) return null;
    return {
      text: this.extractCellText(cell),
      cell
    };
  }
  updateTableCell(sectionIndex, tableIndex, row, col, text) {
    const table = this.findTable(sectionIndex, tableIndex);
    if (!table) return false;
    const cell = table.rows[row]?.cells[col];
    if (!cell) return false;
    if (cell.paragraphs.length > 0 && cell.paragraphs[0].runs.length > 0) {
      const oldText = cell.paragraphs[0].runs[0].text;
      if (oldText && oldText !== text && this._zip) {
        this._pendingDirectTextUpdates.push({ oldText, newText: text });
      }
    }
    this.saveState();
    if (cell.paragraphs.length > 0 && cell.paragraphs[0].runs.length > 0) {
      cell.paragraphs[0].runs[0].text = text;
    } else {
      cell.paragraphs = [{ id: Math.random().toString(36).substring(2, 11), runs: [{ text }] }];
    }
    this._isDirty = true;
    return true;
  }
  setCellProperties(sectionIndex, tableIndex, row, col, props) {
    const table = this.findTable(sectionIndex, tableIndex);
    if (!table) return false;
    const cell = table.rows[row]?.cells[col];
    if (!cell) return false;
    this.saveState();
    Object.assign(cell, props);
    this._isDirty = true;
    return true;
  }
  mergeCells(sectionIndex, tableIndex, startRow, startCol, endRow, endCol) {
    const table = this.findTable(sectionIndex, tableIndex);
    if (!table) return false;
    if (startRow < 0 || startCol < 0 || endRow >= table.rows.length || endCol >= (table.rows[0]?.cells.length || 0)) {
      return false;
    }
    if (startRow > endRow || startCol > endCol) return false;
    this.saveState();
    const rowSpan = endRow - startRow + 1;
    const colSpan = endCol - startCol + 1;
    const topLeftCell = table.rows[startRow]?.cells[startCol];
    if (!topLeftCell) return false;
    topLeftCell.rowSpan = rowSpan;
    topLeftCell.colSpan = colSpan;
    for (let r = startRow; r <= endRow; r++) {
      for (let c = startCol; c <= endCol; c++) {
        if (r === startRow && c === startCol) continue;
        const cell = table.rows[r]?.cells[c];
        if (cell) {
          cell.rowSpan = 0;
          cell.colSpan = 0;
        }
      }
    }
    this._pendingCellMerges.push({ tableIndex, startRow, startCol, endRow, endCol });
    this._isDirty = true;
    return true;
  }
  insertTableRow(sectionIndex, tableIndex, afterRowIndex, cellTexts) {
    const table = this.findTable(sectionIndex, tableIndex);
    if (!table || !table.rows[afterRowIndex]) return false;
    this.saveState();
    const templateRow = table.rows[afterRowIndex];
    const colCount = templateRow.cells.length;
    const newRow = {
      cells: Array.from({ length: colCount }, (_, i) => ({
        paragraphs: [{
          id: Math.random().toString(36).substring(2, 11),
          runs: [{ text: cellTexts?.[i] || "" }]
        }],
        colAddr: i,
        rowAddr: afterRowIndex + 1,
        colSpan: 1,
        rowSpan: 1
      }))
    };
    table.rows.splice(afterRowIndex + 1, 0, newRow);
    this._pendingTableRowInserts.push({ tableIndex, afterRowIndex, cellTexts });
    this._isDirty = true;
    return true;
  }
  deleteTableRow(sectionIndex, tableIndex, rowIndex) {
    const table = this.findTable(sectionIndex, tableIndex);
    if (!table || table.rows.length <= 1) return false;
    this.saveState();
    table.rows.splice(rowIndex, 1);
    this._pendingTableRowDeletes.push({ tableIndex, rowIndex });
    this._isDirty = true;
    return true;
  }
  insertTableColumn(sectionIndex, tableIndex, afterColIndex) {
    const table = this.findTable(sectionIndex, tableIndex);
    if (!table) return false;
    this.saveState();
    for (const row of table.rows) {
      row.cells.splice(afterColIndex + 1, 0, {
        paragraphs: [{
          id: Math.random().toString(36).substring(2, 11),
          runs: [{ text: "" }]
        }],
        colAddr: afterColIndex + 1,
        rowAddr: 0,
        colSpan: 1,
        rowSpan: 1
      });
    }
    this._pendingTableColumnInserts.push({ tableIndex, afterColIndex });
    this._isDirty = true;
    return true;
  }
  deleteTableColumn(sectionIndex, tableIndex, colIndex) {
    const table = this.findTable(sectionIndex, tableIndex);
    if (!table || (table.rows[0]?.cells.length || 0) <= 1) return false;
    this.saveState();
    for (const row of table.rows) {
      row.cells.splice(colIndex, 1);
    }
    this._pendingTableColumnDeletes.push({ tableIndex, colIndex });
    this._isDirty = true;
    return true;
  }
  getTableAsCsv(sectionIndex, tableIndex, delimiter = ",") {
    const table = this.findTable(sectionIndex, tableIndex);
    if (!table) return null;
    return table.rows.map(
      (row) => row.cells.map((cell) => {
        const text = (cell.paragraphs || []).map((p) => (p.runs || []).map((r) => r.text || "").join("")).join(" ");
        if (text.includes(delimiter) || text.includes('"') || text.includes("\n")) {
          return `"${text.replace(/"/g, '""')}"`;
        }
        return text;
      }).join(delimiter)
    ).join("\n");
  }
  // ============================================================
  // Search & Replace
  // ============================================================
  searchText(query, options = {}) {
    const { caseSensitive = false, regex = false } = options;
    let pattern;
    if (regex) {
      pattern = new RegExp(query, caseSensitive ? "g" : "gi");
    } else {
      const escaped = query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      pattern = new RegExp(escaped, caseSensitive ? "g" : "gi");
    }
    const results = [];
    if (!this._content?.sections) return results;
    this._content.sections.forEach((section, si) => {
      if (!section?.elements) return;
      section.elements.forEach((el, ei) => {
        if (el.type === "paragraph") {
          if (!el.data?.runs) return;
          const text = el.data.runs.map((r) => r?.text || "").join("");
          const found = text.match(pattern);
          if (found) {
            results.push({
              section: si,
              element: ei,
              text,
              matches: found,
              count: found.length
            });
          }
        }
        if (el.type === "table") {
          const table = el.data;
          if (!table?.rows) return;
          for (const row of table.rows) {
            if (!row?.cells) continue;
            for (const cell of row.cells) {
              if (!cell?.paragraphs) continue;
              for (const para of cell.paragraphs) {
                if (!para?.runs) continue;
                const text = para.runs.map((r) => r?.text || "").join("");
                const found = text.match(pattern);
                if (found) {
                  results.push({
                    section: si,
                    element: ei,
                    text,
                    matches: found,
                    count: found.length
                  });
                }
              }
            }
          }
        }
      });
    });
    return results;
  }
  replaceText(oldText, newText, options = {}) {
    if (!oldText) return 0;
    if (newText == null) newText = "";
    const { caseSensitive = false, regex = false, replaceAll = true } = options;
    let pattern;
    if (regex) {
      pattern = new RegExp(oldText, caseSensitive ? replaceAll ? "g" : "" : replaceAll ? "gi" : "i");
    } else {
      const escaped = oldText.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      pattern = new RegExp(escaped, caseSensitive ? replaceAll ? "g" : "" : replaceAll ? "gi" : "i");
    }
    this.saveState();
    let count = 0;
    if (!this._content?.sections) return count;
    for (const section of this._content.sections) {
      if (!section?.elements) continue;
      for (const element of section.elements) {
        if (element.type === "paragraph") {
          if (!element.data?.runs) continue;
          for (const run of element.data.runs) {
            if (!run || typeof run.text !== "string") continue;
            const matches = run.text.match(pattern);
            if (matches) {
              count += matches.length;
              run.text = run.text.replace(pattern, newText);
            }
          }
        }
        if (element.type === "table") {
          const table = element.data;
          if (!table?.rows) continue;
          for (const row of table.rows) {
            if (!row?.cells) continue;
            for (const cell of row.cells) {
              count += this.replaceInParagraphs(cell.paragraphs, pattern, newText);
              if (cell.elements) {
                for (const cellEl of cell.elements) {
                  if (cellEl.type === "paragraph") {
                    if (!cellEl.data?.runs) continue;
                    for (const run of cellEl.data.runs) {
                      if (!run || typeof run.text !== "string") continue;
                      const matches = run.text.match(pattern);
                      if (matches) {
                        count += matches.length;
                        run.text = run.text.replace(pattern, newText);
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
    if (count > 0 && this._zip) {
      this._pendingTextReplacements = this._pendingTextReplacements || [];
      this._pendingTextReplacements.push({ oldText, newText, options });
      this._isDirty = true;
    }
    return count;
  }
  replaceInParagraphs(paragraphs, pattern, newText) {
    if (!paragraphs) return 0;
    let count = 0;
    for (const para of paragraphs) {
      if (!para?.runs) continue;
      for (const run of para.runs) {
        if (!run || typeof run.text !== "string") continue;
        const matches = run.text.match(pattern);
        if (matches) {
          count += matches.length;
          run.text = run.text.replace(pattern, newText);
        }
      }
    }
    return count;
  }
  // ============================================================
  // Metadata
  // ============================================================
  getMetadata() {
    return this._content.metadata;
  }
  setMetadata(metadata) {
    this.saveState();
    this._content.metadata = { ...this._content.metadata, ...metadata };
    this._isDirty = true;
  }
  // ============================================================
  // Page Settings
  // ============================================================
  getPageSettings(sectionIndex = 0) {
    const section = this._content.sections[sectionIndex];
    return section?.pageSettings || null;
  }
  setPageSettings(sectionIndex, settings) {
    const section = this._content.sections[sectionIndex];
    if (!section) return false;
    this.saveState();
    section.pageSettings = { ...section.pageSettings, ...settings };
    this._isDirty = true;
    return true;
  }
  // ============================================================
  // Statistics
  // ============================================================
  getWordCount() {
    let characters = 0;
    let charactersNoSpaces = 0;
    let words = 0;
    let paragraphs = 0;
    for (const section of this._content.sections) {
      for (const element of section.elements) {
        if (element.type === "paragraph") {
          paragraphs++;
          if (!element.data?.runs) continue;
          const text = element.data.runs.map((r) => r.text || "").join("");
          characters += text.length;
          charactersNoSpaces += text.replace(/\s/g, "").length;
          words += text.trim().split(/\s+/).filter((w) => w.length > 0).length;
        }
      }
    }
    return { characters, charactersNoSpaces, words, paragraphs };
  }
  // ============================================================
  // Copy/Move Operations
  // ============================================================
  copyParagraph(sourceSection, sourceParagraph, targetSection, targetAfter) {
    if (isNaN(sourceSection) || isNaN(sourceParagraph) || isNaN(targetSection) || isNaN(targetAfter)) return false;
    const srcSection = this._content.sections[sourceSection];
    const tgtSection = this._content.sections[targetSection];
    if (!srcSection || !tgtSection) return false;
    if (sourceParagraph < 0 || sourceParagraph >= srcSection.elements.length) return false;
    const srcElement = srcSection.elements[sourceParagraph];
    if (!srcElement || srcElement.type !== "paragraph") return false;
    if (targetAfter < -1) targetAfter = -1;
    if (targetAfter >= tgtSection.elements.length) targetAfter = tgtSection.elements.length - 1;
    this.saveState();
    const copy = JSON.parse(JSON.stringify(srcElement));
    copy.data.id = Math.random().toString(36).substring(2, 11);
    tgtSection.elements.splice(targetAfter + 1, 0, copy);
    this._isDirty = true;
    this._hasStructuralChanges = true;
    return true;
  }
  moveParagraph(sourceSection, sourceParagraph, targetSection, targetAfter) {
    if (isNaN(sourceSection) || isNaN(sourceParagraph) || isNaN(targetSection) || isNaN(targetAfter)) return false;
    const srcSection = this._content.sections[sourceSection];
    const tgtSection = this._content.sections[targetSection];
    if (!srcSection || !tgtSection) return false;
    if (sourceParagraph < 0 || sourceParagraph >= srcSection.elements.length) return false;
    const srcElement = srcSection.elements[sourceParagraph];
    if (!srcElement || srcElement.type !== "paragraph") return false;
    if (targetAfter < -1) targetAfter = -1;
    if (targetAfter >= tgtSection.elements.length) targetAfter = tgtSection.elements.length - 1;
    this.saveState();
    srcSection.elements.splice(sourceParagraph, 1);
    let insertAt = targetAfter + 1;
    if (sourceSection === targetSection && sourceParagraph < insertAt) {
      insertAt--;
    }
    tgtSection.elements.splice(insertAt, 0, srcElement);
    this._isDirty = true;
    this._hasStructuralChanges = true;
    return true;
  }
  // ============================================================
  // Images
  // ============================================================
  getImages() {
    return Array.from(this._content.images.values()).map((img) => ({
      id: img.id,
      width: img.width,
      height: img.height
    }));
  }
  // ============================================================
  // Table Creation
  // ============================================================
  insertTable(sectionIndex, afterElementIndex, rows, cols, options) {
    const section = this._content.sections[sectionIndex];
    if (!section) return null;
    if (!section.elements) section.elements = [];
    if (rows <= 0 || cols <= 0) return null;
    const insertAfter = Math.min(afterElementIndex, section.elements.length - 1);
    this.saveState();
    const tableId = Math.random().toString(36).substring(2, 11);
    const defaultWidth = options?.width || 42520;
    const cellWidth = options?.cellWidth || Math.floor(defaultWidth / cols);
    const tableRows = [];
    for (let r = 0; r < rows; r++) {
      const cells = [];
      for (let c = 0; c < cols; c++) {
        cells.push({
          colAddr: c,
          rowAddr: r,
          colSpan: 1,
          rowSpan: 1,
          width: cellWidth,
          paragraphs: [{
            id: Math.random().toString(36).substring(2, 11),
            runs: [{ text: "" }]
          }]
        });
      }
      tableRows.push({ cells });
    }
    const newTable = {
      id: tableId,
      rowCount: rows,
      colCount: cols,
      rows: tableRows,
      width: defaultWidth
    };
    const insertIndex = insertAfter + 1;
    const newElement = { type: "table", data: newTable };
    section.elements.splice(insertIndex, 0, newElement);
    let tableIndex = 0;
    for (let i = 0; i < insertIndex; i++) {
      if (section.elements[i]?.type === "table") {
        tableIndex++;
      }
    }
    this._isDirty = true;
    this._hasStructuralChanges = true;
    return { tableIndex };
  }
  // ============================================================
  // Header/Footer Operations
  // ============================================================
  getHeader(sectionIndex) {
    const section = this._content.sections[sectionIndex];
    if (!section || !section.header) return null;
    return {
      paragraphs: (section.header.paragraphs || []).map((p) => ({
        id: p.id,
        text: (p.runs || []).map((r) => r.text || "").join(""),
        runs: p.runs || []
      }))
    };
  }
  setHeader(sectionIndex, text, align = "center") {
    const section = this._content.sections[sectionIndex];
    if (!section) return false;
    this.saveState();
    const headerParagraph = {
      id: Math.random().toString(36).substring(2, 11),
      runs: [{ text }],
      paraStyle: { align }
    };
    if (!section.header) {
      section.header = {
        paragraphs: [headerParagraph]
      };
    } else {
      section.header.paragraphs = [headerParagraph];
    }
    this._pendingHeaderFooter.push({ sectionIndex, type: "header", text, includePageNumber: false, align });
    this._isDirty = true;
    return true;
  }
  getFooter(sectionIndex) {
    const section = this._content.sections[sectionIndex];
    if (!section || !section.footer) return null;
    return {
      paragraphs: (section.footer.paragraphs || []).map((p) => ({
        id: p.id,
        text: (p.runs || []).map((r) => r.text || "").join(""),
        runs: p.runs || []
      }))
    };
  }
  setFooter(sectionIndex, text, includePageNumber = false, align = "center") {
    const section = this._content.sections[sectionIndex];
    if (!section) return false;
    this.saveState();
    const runs = [];
    if (text) {
      runs.push({ text });
    }
    if (includePageNumber) {
      runs.push({ text: "", pageNumber: true });
    }
    const footerParagraph = {
      id: Math.random().toString(36).substring(2, 11),
      runs,
      paraStyle: { align }
    };
    if (!section.footer) {
      section.footer = {
        paragraphs: [footerParagraph]
      };
    } else {
      section.footer.paragraphs = [footerParagraph];
    }
    this._pendingHeaderFooter.push({ sectionIndex, type: "footer", text, includePageNumber, align });
    this._isDirty = true;
    return true;
  }
  // ============================================================
  // Footnote/Endnote Operations
  // ============================================================
  getFootnotes() {
    return this._content.footnotes || [];
  }
  insertFootnote(sectionIndex, paragraphIndex, text) {
    const paragraph = this.findParagraphByPath(sectionIndex, paragraphIndex);
    if (!paragraph) return null;
    this.saveState();
    const footnoteId = Math.random().toString(36).substring(2, 11);
    const footnoteNumber = (this._content.footnotes?.length || 0) + 1;
    const footnote = {
      id: footnoteId,
      number: footnoteNumber,
      type: "footnote",
      paragraphs: [{
        id: Math.random().toString(36).substring(2, 11),
        runs: [{ text }]
      }]
    };
    if (!this._content.footnotes) {
      this._content.footnotes = [];
    }
    this._content.footnotes.push(footnote);
    if (!paragraph.runs) {
      paragraph.runs = [];
    }
    paragraph.runs.push({
      text: "",
      footnoteRef: footnoteNumber
    });
    this._isDirty = true;
    this._hasStructuralChanges = true;
    return { id: footnoteId };
  }
  getEndnotes() {
    return this._content.endnotes || [];
  }
  insertEndnote(sectionIndex, paragraphIndex, text) {
    const paragraph = this.findParagraphByPath(sectionIndex, paragraphIndex);
    if (!paragraph) return null;
    this.saveState();
    const endnoteId = Math.random().toString(36).substring(2, 11);
    const endnoteNumber = (this._content.endnotes?.length || 0) + 1;
    const endnote = {
      id: endnoteId,
      number: endnoteNumber,
      paragraphs: [{
        id: Math.random().toString(36).substring(2, 11),
        runs: [{ text }]
      }]
    };
    if (!this._content.endnotes) {
      this._content.endnotes = [];
    }
    this._content.endnotes.push(endnote);
    if (!paragraph.runs) {
      paragraph.runs = [];
    }
    paragraph.runs.push({
      text: "",
      endnoteRef: endnoteNumber
    });
    this._isDirty = true;
    this._hasStructuralChanges = true;
    return { id: endnoteId };
  }
  // ============================================================
  // Bookmark/Hyperlink Operations
  // ============================================================
  getBookmarks() {
    const bookmarks = [];
    this._content.sections.forEach((section, si) => {
      section.elements.forEach((el, ei) => {
        if (el.type === "paragraph") {
          for (const run of el.data.runs) {
            if (run.field?.fieldType === "Bookmark" || run.field?.fieldType === "bookmark") {
              bookmarks.push({
                name: run.field.name || run.field.bookmarkName || "",
                section: si,
                paragraph: ei
              });
            }
          }
        }
      });
    });
    return bookmarks;
  }
  insertBookmark(sectionIndex, paragraphIndex, name) {
    if (!name) return false;
    const paragraph = this.findParagraphByPath(sectionIndex, paragraphIndex);
    if (!paragraph) return false;
    this.saveState();
    if (!paragraph.runs) paragraph.runs = [];
    paragraph.runs.push({
      text: "",
      field: {
        fieldType: "Bookmark",
        name
      }
    });
    this._isDirty = true;
    this._hasStructuralChanges = true;
    return true;
  }
  getHyperlinks() {
    const hyperlinks = [];
    this._content.sections.forEach((section, si) => {
      section.elements.forEach((el, ei) => {
        if (el.type === "paragraph") {
          for (const run of el.data.runs) {
            if (run.hyperlink) {
              hyperlinks.push({
                url: run.hyperlink.url,
                text: run.text || run.hyperlink.name || "",
                section: si,
                paragraph: ei
              });
            }
          }
        }
      });
    });
    return hyperlinks;
  }
  insertHyperlink(sectionIndex, paragraphIndex, url, text) {
    const paragraph = this.findParagraphByPath(sectionIndex, paragraphIndex);
    if (!paragraph) return false;
    this.saveState();
    if (!paragraph.runs) paragraph.runs = [];
    paragraph.runs.push({
      text,
      hyperlink: {
        fieldType: "Hyperlink",
        url,
        name: text
      }
    });
    this._isDirty = true;
    this._hasStructuralChanges = true;
    return true;
  }
  // ============================================================
  // Image Operations
  // ============================================================
  getImagesBySectionIndex(sectionIndex) {
    const section = this._content.sections[sectionIndex];
    if (!section) return [];
    const results = [];
    for (const el of section.elements) {
      if (el.type === "image") {
        const img = el.data;
        results.push({ id: img.id, width: img.width, height: img.height, binaryId: img.binaryId });
      }
    }
    return results;
  }
  generateNumericId() {
    return String(this._nextInstId++);
  }
  insertImage(sectionIndex, afterElementIndex, imageData) {
    const section = this._content.sections[sectionIndex];
    if (!section) return null;
    if (!section.elements) section.elements = [];
    this.saveState();
    let rawBase64 = imageData.data;
    let detectedMimeType = imageData.mimeType;
    const dataUriMatch = rawBase64.match(/^data:([^;]+);base64,(.+)$/s);
    if (dataUriMatch) {
      detectedMimeType = detectedMimeType || dataUriMatch[1];
      rawBase64 = dataUriMatch[2];
    }
    const imageId = this.generateNumericId();
    const instId = this.generateNumericId();
    const binaryId = `image${Date.now()}`;
    const extMap = {
      "image/png": "png",
      "image/jpeg": "jpg",
      "image/gif": "gif",
      "image/bmp": "bmp"
    };
    const ext = extMap[detectedMimeType] || "png";
    const internalWidth = imageData.width / 100;
    const internalHeight = imageData.height / 100;
    const newImage = {
      id: imageId,
      binaryId,
      width: internalWidth,
      height: internalHeight,
      orgWidth: internalWidth,
      orgHeight: internalHeight,
      data: rawBase64,
      mimeType: detectedMimeType,
      position: {
        treatAsChar: true,
        affectLSpacing: false,
        flowWithText: true,
        allowOverlap: false,
        holdAnchorAndSO: false,
        vertRelTo: "para",
        horzRelTo: "para",
        vertAlign: "top",
        horzAlign: "left",
        vertOffset: 0,
        horzOffset: 0
      },
      shapeComponent: {
        instId,
        oriWidth: internalWidth,
        oriHeight: internalHeight,
        curWidth: internalWidth,
        curHeight: internalHeight,
        horzFlip: false,
        vertFlip: false,
        groupLevel: 0
      }
    };
    this._content.images.set(imageId, newImage);
    this._content.binData.set(binaryId, {
      id: binaryId,
      encoding: "Base64",
      data: rawBase64
    });
    this._content.binItems.set(binaryId, {
      type: "Embedding",
      rPath: `BinData/${binaryId}.${ext}`,
      format: ext
    });
    if (this._zip) {
      const binaryBuffer = Buffer.from(rawBase64, "base64");
      this._zip.file(`BinData/${binaryId}.${ext}`, binaryBuffer);
    }
    const insertAfter = Math.min(afterElementIndex, section.elements.length - 1);
    const newElement = { type: "image", data: newImage };
    section.elements.splice(insertAfter + 1, 0, newElement);
    this._pendingImageInserts.push({ sectionIndex, afterElementIndex: insertAfter, image: newImage });
    this._isDirty = true;
    return { id: imageId };
  }
  updateImageSize(imageId, width, height) {
    const internalWidth = width / 100;
    const internalHeight = height / 100;
    let found = false;
    let binaryId;
    for (const section of this._content.sections) {
      for (const el of section.elements) {
        if (el.type === "image" && el.data.id === imageId) {
          this.saveState();
          const img = el.data;
          img.width = internalWidth;
          img.height = internalHeight;
          binaryId = img.binaryId;
          found = true;
          break;
        }
      }
      if (found) break;
    }
    if (!found) return false;
    const image = this._content.images.get(imageId);
    if (image) {
      image.width = internalWidth;
      image.height = internalHeight;
    }
    if (binaryId) {
      this._pendingImageSizeUpdates.push({ binaryId, width, height });
    }
    this._isDirty = true;
    return true;
  }
  deleteImage(imageId) {
    this.saveState();
    let removed = false;
    let binaryId;
    let sectionIndex = -1;
    for (let si = 0; si < this._content.sections.length; si++) {
      const section = this._content.sections[si];
      const index = section.elements.findIndex((el) => el.type === "image" && el.data.id === imageId);
      if (index !== -1) {
        binaryId = section.elements[index].data.binaryId;
        sectionIndex = si;
        section.elements.splice(index, 1);
        removed = true;
        break;
      }
    }
    if (!removed) return false;
    const image = this._content.images.get(imageId);
    if (image) {
      binaryId = binaryId || image.binaryId;
      this._content.images.delete(imageId);
    }
    if (binaryId) {
      this._content.binData.delete(binaryId);
      this._content.binItems.delete(binaryId);
      if (this._zip) {
        const binFiles = Object.keys(this._zip.files).filter((f) => f.startsWith(`BinData/${binaryId}`));
        for (const f of binFiles) {
          this._zip.remove(f);
        }
      }
      const pendingIdx = this._pendingImageInserts.findIndex(
        (ins) => ins.image.binaryId === binaryId
      );
      if (pendingIdx !== -1) {
        this._pendingImageInserts.splice(pendingIdx, 1);
      } else {
        this._pendingImageDeletes.push({ sectionIndex, binaryId });
      }
    }
    this._isDirty = true;
    return true;
  }
  // ============================================================
  // Drawing Objects (Line, Rect, Ellipse)
  // ============================================================
  insertLine(sectionIndex, x1, y1, x2, y2, options) {
    const section = this._content.sections[sectionIndex];
    if (!section) return null;
    this.saveState();
    const lineId = Math.random().toString(36).substring(2, 11);
    const newLine = {
      id: lineId,
      x1,
      y1,
      x2,
      y2,
      strokeColor: options?.color || "#000000",
      strokeWidth: options?.width || 1
    };
    const newElement = { type: "line", data: newLine };
    section.elements.push(newElement);
    this._isDirty = true;
    return { id: lineId };
  }
  insertRect(sectionIndex, x, y, width, height, options) {
    const section = this._content.sections[sectionIndex];
    if (!section) return null;
    this.saveState();
    const rectId = Math.random().toString(36).substring(2, 11);
    const newRect = {
      id: rectId,
      x,
      y,
      width,
      height,
      fillColor: options?.fillColor,
      strokeColor: options?.strokeColor || "#000000"
    };
    const newElement = { type: "rect", data: newRect };
    section.elements.push(newElement);
    this._isDirty = true;
    return { id: rectId };
  }
  insertEllipse(sectionIndex, cx, cy, rx, ry, options) {
    const section = this._content.sections[sectionIndex];
    if (!section) return null;
    this.saveState();
    const ellipseId = Math.random().toString(36).substring(2, 11);
    const newEllipse = {
      id: ellipseId,
      cx,
      cy,
      rx,
      ry,
      fillColor: options?.fillColor,
      strokeColor: options?.strokeColor || "#000000"
    };
    const newElement = { type: "ellipse", data: newEllipse };
    section.elements.push(newElement);
    this._isDirty = true;
    return { id: ellipseId };
  }
  insertTextBox(sectionIndex, x, y, width, height, text, options) {
    const section = this._content.sections[sectionIndex];
    if (!section) return null;
    this.saveState();
    const textBoxId = Math.random().toString(36).substring(2, 11);
    const newTextBox = {
      id: textBoxId,
      x,
      y,
      width,
      height,
      paragraphs: [{
        id: Math.random().toString(36).substring(2, 11),
        runs: [{ text }]
      }],
      fillColor: options?.fillColor,
      strokeColor: options?.strokeColor || "#000000",
      strokeWidth: options?.strokeWidth ?? 1
    };
    const newElement = { type: "textbox", data: newTextBox };
    section.elements.push(newElement);
    this._isDirty = true;
    this._hasStructuralChanges = true;
    return { id: textBoxId };
  }
  getTextBoxes() {
    const textBoxes = [];
    for (const section of this._content.sections) {
      for (const element of section.elements) {
        if (element.type === "textbox") {
          const tb = element.data;
          textBoxes.push({
            id: tb.id,
            x: tb.x,
            y: tb.y,
            width: tb.width,
            height: tb.height,
            text: (tb.paragraphs || []).map((p) => (p.runs || []).map((r) => r.text || "").join("")).join("\n")
          });
        }
      }
    }
    return textBoxes;
  }
  updateTextBoxText(textBoxId, text) {
    for (const section of this._content.sections) {
      for (const element of section.elements) {
        if (element.type === "textbox" && element.data.id === textBoxId) {
          this.saveState();
          const tb = element.data;
          if (tb.paragraphs.length > 0 && tb.paragraphs[0].runs.length > 0) {
            tb.paragraphs[0].runs[0].text = text;
          } else {
            tb.paragraphs = [{
              id: Math.random().toString(36).substring(2, 11),
              runs: [{ text }]
            }];
          }
          this._isDirty = true;
          this._hasStructuralChanges = true;
          return true;
        }
      }
    }
    return false;
  }
  deleteTextBox(textBoxId) {
    for (const section of this._content.sections) {
      for (let i = 0; i < section.elements.length; i++) {
        const element = section.elements[i];
        if (element.type === "textbox" && element.data.id === textBoxId) {
          this.saveState();
          section.elements.splice(i, 1);
          this._isDirty = true;
          this._hasStructuralChanges = true;
          return true;
        }
      }
    }
    return false;
  }
  // ============================================================
  // Equation Operations
  // ============================================================
  insertEquation(sectionIndex, afterElementIndex, script) {
    const section = this._content.sections[sectionIndex];
    if (!section) return null;
    this.saveState();
    const equationId = Math.random().toString(36).substring(2, 11);
    const newEquation = {
      id: equationId,
      script,
      lineMode: false,
      baseUnit: 1e3
    };
    const newElement = { type: "equation", data: newEquation };
    section.elements.splice(afterElementIndex + 1, 0, newElement);
    this._isDirty = true;
    return { id: equationId };
  }
  getEquations() {
    const equations = [];
    for (const section of this._content.sections) {
      for (const element of section.elements) {
        if (element.type === "equation") {
          equations.push({
            id: element.data.id,
            script: element.data.script || ""
          });
        }
      }
    }
    return equations;
  }
  // ============================================================
  // Memo Operations
  // ============================================================
  getMemos() {
    const memos = [];
    for (const section of this._content.sections) {
      if (section.memos) {
        memos.push(...section.memos);
      }
    }
    return memos;
  }
  insertMemo(sectionIndex, paragraphIndex, content, author) {
    const section = this._content.sections[sectionIndex];
    if (!section) return null;
    const paragraph = this.findParagraphByPath(sectionIndex, paragraphIndex);
    if (!paragraph) return null;
    this.saveState();
    const memoId = Math.random().toString(36).substring(2, 11);
    const memo = {
      id: memoId,
      author: author || "Unknown",
      date: (/* @__PURE__ */ new Date()).toISOString(),
      content: [content]
    };
    if (!section.memos) {
      section.memos = [];
    }
    section.memos.push(memo);
    if (!paragraph.runs || paragraph.runs.length === 0) {
      paragraph.runs = [{ text: "" }];
    }
    paragraph.runs[paragraph.runs.length - 1].hasMemo = true;
    paragraph.runs[paragraph.runs.length - 1].memoId = memoId;
    this._isDirty = true;
    this._hasStructuralChanges = true;
    return { id: memoId };
  }
  deleteMemo(memoId) {
    let found = false;
    for (const section of this._content.sections) {
      if (section.memos) {
        const index = section.memos.findIndex((m) => m.id === memoId);
        if (index !== -1) {
          this.saveState();
          section.memos.splice(index, 1);
          found = true;
          break;
        }
      }
    }
    if (found) {
      for (const section of this._content.sections) {
        for (const element of section.elements) {
          if (element.type === "paragraph") {
            for (const run of element.data.runs || []) {
              if (run.memoId === memoId) {
                run.hasMemo = false;
                run.memoId = void 0;
              }
            }
          }
        }
      }
      this._isDirty = true;
      this._hasStructuralChanges = true;
    }
    return found;
  }
  // ============================================================
  // Section Operations
  // ============================================================
  getSections() {
    return this._content.sections.map((section, index) => ({
      index,
      pageSettings: section.pageSettings || {
        width: 59528,
        height: 84188,
        marginTop: 4252,
        marginBottom: 4252,
        marginLeft: 4252,
        marginRight: 4252
      }
    }));
  }
  insertSection(afterSectionIndex) {
    this.saveState();
    const newSection = {
      id: Math.random().toString(36).substring(2, 11),
      elements: [{
        type: "paragraph",
        data: {
          id: Math.random().toString(36).substring(2, 11),
          runs: [{ text: "" }]
        }
      }],
      pageSettings: {
        width: 59528,
        height: 84188,
        marginTop: 4252,
        marginBottom: 4252,
        marginLeft: 4252,
        marginRight: 4252
      }
    };
    const insertIndex = afterSectionIndex + 1;
    this._content.sections.splice(insertIndex, 0, newSection);
    this._isDirty = true;
    this._hasStructuralChanges = true;
    return insertIndex;
  }
  deleteSection(sectionIndex) {
    if (sectionIndex < 0 || sectionIndex >= this._content.sections.length) return false;
    if (this._content.sections.length <= 1) return false;
    this.saveState();
    this._content.sections.splice(sectionIndex, 1);
    this._isDirty = true;
    this._hasStructuralChanges = true;
    return true;
  }
  // ============================================================
  // Style Operations
  // ============================================================
  getStyles() {
    if (!this._content.styles?.styles) return [];
    return Array.from(this._content.styles.styles.values()).map((style) => ({
      id: style.id,
      name: style.name || "",
      type: style.type || "Para"
    }));
  }
  getCharShapes() {
    if (!this._content.styles?.charShapes) return [];
    return Array.from(this._content.styles.charShapes.values());
  }
  getParaShapes() {
    if (!this._content.styles?.paraShapes) return [];
    return Array.from(this._content.styles.paraShapes.values());
  }
  applyStyle(sectionIndex, paragraphIndex, styleId) {
    const paragraph = this.findParagraphByPath(sectionIndex, paragraphIndex);
    if (!paragraph) return false;
    if (!this._content.styles?.styles) return false;
    const style = this._content.styles.styles.get(styleId);
    if (!style) return false;
    this.saveState();
    paragraph.style = styleId;
    if (style.paraPrIdRef !== void 0 && this._content.styles.paraShapes) {
      const paraShape = this._content.styles.paraShapes.get(style.paraPrIdRef);
      if (paraShape) {
        paragraph.paraStyle = {
          align: paraShape.align?.toLowerCase(),
          lineSpacing: paraShape.lineSpacing,
          marginTop: paraShape.marginTop,
          marginBottom: paraShape.marginBottom,
          marginLeft: paraShape.marginLeft,
          marginRight: paraShape.marginRight,
          firstLineIndent: paraShape.firstLineIndent
        };
      }
    }
    if (style.charPrIdRef !== void 0 && this._content.styles.charShapes) {
      const charShape = this._content.styles.charShapes.get(style.charPrIdRef);
      if (charShape) {
        for (const run of paragraph.runs) {
          run.charStyle = {
            bold: charShape.bold,
            italic: charShape.italic,
            underline: charShape.underline,
            fontSize: charShape.height ? charShape.height / 100 : void 0,
            fontColor: charShape.textColor
          };
        }
      }
    }
    this._isDirty = true;
    return true;
  }
  // ============================================================
  // Column Definition Operations
  // ============================================================
  getColumnDef(sectionIndex) {
    const section = this._content.sections[sectionIndex];
    if (!section) return null;
    return section.columnDef || null;
  }
  setColumnDef(sectionIndex, columns, gap) {
    const section = this._content.sections[sectionIndex];
    if (!section) return false;
    if (columns < 1) return false;
    this.saveState();
    const defaultGap = gap || 850;
    section.columnDef = {
      type: "Newspaper",
      count: columns,
      sameSize: true,
      sameGap: defaultGap,
      columns: Array.from({ length: columns }, () => ({
        width: 0,
        // Will be calculated based on page width
        gap: defaultGap
      }))
    };
    this._isDirty = true;
    return true;
  }
  // ============================================================
  // Save
  // ============================================================
  async save() {
    if (!this._zip) throw new Error("Cannot save HWP files");
    await this.syncContentToZip();
    return await this._zip.generateAsync({ type: "nodebuffer" });
  }
  async syncContentToZip() {
    if (!this._zip) return;
    const hasTextReplacements = this._pendingTextReplacements && this._pendingTextReplacements.length > 0;
    const hasDirectTextUpdates = this._pendingDirectTextUpdates && this._pendingDirectTextUpdates.length > 0;
    const hasTableRowInserts = this._pendingTableRowInserts && this._pendingTableRowInserts.length > 0;
    const hasTableRowDeletes = this._pendingTableRowDeletes && this._pendingTableRowDeletes.length > 0;
    const hasTableColumnInserts = this._pendingTableColumnInserts && this._pendingTableColumnInserts.length > 0;
    const hasTableColumnDeletes = this._pendingTableColumnDeletes && this._pendingTableColumnDeletes.length > 0;
    const hasCellMerges = this._pendingCellMerges && this._pendingCellMerges.length > 0;
    const hasHeaderFooter = this._pendingHeaderFooter && this._pendingHeaderFooter.length > 0;
    const hasImageInserts = this._pendingImageInserts && this._pendingImageInserts.length > 0;
    const hasImageDeletes = this._pendingImageDeletes && this._pendingImageDeletes.length > 0;
    const hasImageSizeUpdates = this._pendingImageSizeUpdates && this._pendingImageSizeUpdates.length > 0;
    const hasTableStructuralChanges = hasTableRowInserts || hasTableRowDeletes || hasTableColumnInserts || hasTableColumnDeletes || hasCellMerges;
    const hasImageChanges = hasImageInserts || hasImageDeletes || hasImageSizeUpdates;
    const hasOnlyTextChanges = (hasTextReplacements || hasDirectTextUpdates) && !this._hasStructuralChanges && !hasTableStructuralChanges && !hasHeaderFooter && !hasImageChanges;
    if (!hasOnlyTextChanges && !hasTableStructuralChanges && !hasHeaderFooter && !hasImageChanges) {
      await this.syncStructuralChangesToZip();
    }
    if (hasImageChanges) {
      await this.applyImageChangesToXml();
      this._pendingImageInserts = [];
      this._pendingImageDeletes = [];
      this._pendingImageSizeUpdates = [];
    }
    if (hasTableStructuralChanges) {
      await this.applyTableStructuralChangesToXml();
      this._pendingTableRowInserts = [];
      this._pendingTableRowDeletes = [];
      this._pendingTableColumnInserts = [];
      this._pendingTableColumnDeletes = [];
    }
    if (hasHeaderFooter) {
      await this.applyHeaderFooterToXml();
      this._pendingHeaderFooter = [];
    }
    if (hasDirectTextUpdates) {
      await this.applyDirectTextUpdatesToXml();
      this._pendingDirectTextUpdates = [];
    }
    if (hasTextReplacements) {
      await this.applyTextReplacementsToXml();
      this._pendingTextReplacements = [];
    }
    await this.syncMetadataToZip();
    await this.syncBinDataToHpf();
    this._isDirty = false;
    this._hasStructuralChanges = false;
  }
  async applyHeaderFooterToXml() {
    if (!this._zip) return;
    for (const item of this._pendingHeaderFooter) {
      const sectionPath = `Contents/section${item.sectionIndex}.xml`;
      const file = this._zip.file(sectionPath);
      if (!file) continue;
      let xml = await file.async("string");
      const tagName = item.type === "header" ? "hp:header" : "hp:footer";
      const existingTagRegex = new RegExp(`<${tagName}[^>]*>[\\s\\S]*?<\\/${tagName}>`, "g");
      xml = xml.replace(existingTagRegex, "");
      let content = "";
      if (item.text) {
        content += `<hp:t>${this.escapeXml(item.text)}</hp:t>`;
      }
      if (item.includePageNumber) {
        content += `<hp:pageNum/>`;
      }
      const alignAttr = item.align !== "left" ? ` align="${item.align}"` : "";
      const headerFooterXml = `<${tagName}><hp:p${alignAttr}><hp:run>${content}</hp:run></hp:p></${tagName}>`;
      const closingSecTag = "</hs:sec>";
      const closingSecTagAlt = "</hp:sec>";
      if (xml.includes(closingSecTag)) {
        xml = xml.replace(closingSecTag, headerFooterXml + closingSecTag);
      } else if (xml.includes(closingSecTagAlt)) {
        xml = xml.replace(closingSecTagAlt, headerFooterXml + closingSecTagAlt);
      }
      this._zip.file(sectionPath, xml);
    }
  }
  async applyImageChangesToXml() {
    if (!this._zip) return;
    const affectedSections = /* @__PURE__ */ new Set();
    for (const ins of this._pendingImageInserts) affectedSections.add(ins.sectionIndex);
    for (const del of this._pendingImageDeletes) affectedSections.add(del.sectionIndex);
    if (this._pendingImageSizeUpdates.length > 0) {
      for (let i = 0; i < this._content.sections.length; i++) affectedSections.add(i);
    }
    for (const sectionIndex of affectedSections) {
      const sectionPath = `Contents/section${sectionIndex}.xml`;
      const file = this._zip.file(sectionPath);
      if (!file) continue;
      let xml = await file.async("string");
      const insertsForSection = this._pendingImageInserts.filter((i) => i.sectionIndex === sectionIndex);
      if (insertsForSection.length > 0 && !xml.includes("xmlns:hc=")) {
        xml = xml.replace(
          /(<(?:hs|hp):sec\b[^>]*?)(>)/,
          `$1 xmlns:hc="http://www.hancom.co.kr/hwpml/2011/core"$2`
        );
      }
      for (const del of this._pendingImageDeletes.filter((d) => d.sectionIndex === sectionIndex)) {
        const escapedId = this.escapeRegex(del.binaryId);
        const simpleDeleteRegex = new RegExp(
          `<hp:p\\b[^>]*>\\s*<hp:run[^>]*>\\s*<hp:pic\\b[^>]*>[\\s\\S]*?binaryItemIDRef="${escapedId}"[\\s\\S]*?</hp:pic>\\s*</hp:run>\\s*</hp:p>`,
          "g"
        );
        const xmlAfterSimple = xml.replace(simpleDeleteRegex, "");
        if (xmlAfterSimple !== xml) {
          xml = xmlAfterSimple;
          continue;
        }
        const picDeleteRegex = new RegExp(
          `<hp:pic\\b[^>]*>[\\s\\S]*?binaryItemIDRef="${escapedId}"[\\s\\S]*?</hp:pic>`,
          "g"
        );
        xml = xml.replace(picDeleteRegex, "");
      }
      for (const upd of this._pendingImageSizeUpdates) {
        const picBlockRegex = new RegExp(
          `(<hp:pic\\b[^>]*>[\\s\\S]*?binaryItemIDRef="${this.escapeRegex(upd.binaryId)}"[\\s\\S]*?</hp:pic>)`,
          "g"
        );
        xml = xml.replace(picBlockRegex, (picBlock) => {
          let updated = picBlock;
          const w = upd.width;
          const h = upd.height;
          updated = updated.replace(/<hp:curSz\s+width="\d+"[^>]*height="\d+"[^/]*\/>/, `<hp:curSz width="${w}" height="${h}"/>`);
          updated = updated.replace(
            /<hp:sz\s+width="\d+"([^>]*?)height="\d+"([^/]*?)\/>/,
            `<hp:sz width="${w}"$1height="${h}"$2/>`
          );
          return updated;
        });
      }
      for (const ins of insertsForSection) {
        const imageXml = this.generateImageXml(ins.image);
        const closingTag = xml.includes("</hs:sec>") ? "</hs:sec>" : "</hp:sec>";
        const headerMatch = xml.match(/<hp:header\b/);
        const footerMatch = xml.match(/<hp:footer\b/);
        if (headerMatch || footerMatch) {
          const firstSpecialIdx = Math.min(
            headerMatch ? headerMatch.index ?? xml.length : xml.length,
            footerMatch ? footerMatch.index ?? xml.length : xml.length
          );
          xml = xml.slice(0, firstSpecialIdx) + imageXml + xml.slice(firstSpecialIdx);
        } else {
          xml = xml.replace(closingTag, imageXml + closingTag);
        }
      }
      this._zip.file(sectionPath, xml);
    }
  }
  async applyTableStructuralChangesToXml() {
    if (!this._zip) return;
    let sectionIndex = 0;
    while (true) {
      const sectionPath = `Contents/section${sectionIndex}.xml`;
      const file = this._zip.file(sectionPath);
      if (!file) break;
      let xml = await file.async("string");
      for (const insert of this._pendingTableRowInserts) {
        xml = this.insertTableRowInXml(xml, insert.tableIndex, insert.afterRowIndex, insert.cellTexts);
      }
      for (const del of this._pendingTableRowDeletes) {
        xml = this.deleteTableRowInXml(xml, del.tableIndex, del.rowIndex);
      }
      for (const insert of this._pendingTableColumnInserts) {
        xml = this.insertTableColumnInXml(xml, insert.tableIndex, insert.afterColIndex);
      }
      for (const del of this._pendingTableColumnDeletes) {
        xml = this.deleteTableColumnInXml(xml, del.tableIndex, del.colIndex);
      }
      for (const merge of this._pendingCellMerges) {
        xml = this.mergeCellsInXml(xml, merge.tableIndex, merge.startRow, merge.startCol, merge.endRow, merge.endCol);
      }
      this._zip.file(sectionPath, xml);
      sectionIndex++;
    }
    this._pendingCellMerges = [];
  }
  insertTableRowInXml(xml, tableIndex, afterRowIndex, cellTexts) {
    const tableRegex = /<hp:tbl\b[^>]*>[\s\S]*?<\/hp:tbl>/g;
    let currentTableIndex = 0;
    return xml.replace(tableRegex, (tableMatch) => {
      if (currentTableIndex !== tableIndex) {
        currentTableIndex++;
        return tableMatch;
      }
      currentTableIndex++;
      const rowRegex = /<hp:tr[^>]*>[\s\S]*?<\/hp:tr>/g;
      const rows = [];
      let rowMatch;
      while ((rowMatch = rowRegex.exec(tableMatch)) !== null) {
        rows.push(rowMatch[0]);
      }
      if (afterRowIndex >= rows.length) return tableMatch;
      const templateRow = rows[afterRowIndex];
      const newRow = this.createNewRowFromTemplate(templateRow, afterRowIndex + 1, cellTexts);
      rows.splice(afterRowIndex + 1, 0, newRow);
      const newRowCount = rows.length;
      let updatedTable = tableMatch.replace(/rowCnt="(\d+)"/, `rowCnt="${newRowCount}"`);
      const rowsStart = updatedTable.indexOf("<hp:tr");
      const rowsEnd = updatedTable.lastIndexOf("</hp:tr>") + "</hp:tr>".length;
      if (rowsStart !== -1 && rowsEnd > rowsStart) {
        updatedTable = updatedTable.substring(0, rowsStart) + rows.join("") + updatedTable.substring(rowsEnd);
      }
      return updatedTable;
    });
  }
  createNewRowFromTemplate(templateRow, newRowAddr, cellTexts) {
    let newRow = templateRow;
    newRow = newRow.replace(/rowAddr="(\d+)"/g, `rowAddr="${newRowAddr}"`);
    let cellIndex = 0;
    newRow = newRow.replace(/<hp:tc\b([^>]*)>([\s\S]*?)<\/hp:tc>/g, (cellMatch, attrs, content) => {
      const newText = cellTexts?.[cellIndex] || "";
      cellIndex++;
      const simplifiedContent = content.replace(
        /<hp:subList[^>]*>[\s\S]*?<\/hp:subList>/,
        `<hp:subList id="" textDirection="HORIZONTAL" lineWrap="BREAK" vertAlign="CENTER" linkListIDRef="0" linkListNextIDRef="0" textWidth="0" textHeight="0" hasTextRef="0" hasNumRef="0"><hp:p id="0" paraPrIDRef="0" styleIDRef="0" pageBreak="0" columnBreak="0" merged="0"><hp:run charPrIDRef="0"><hp:t>${this.escapeXml(newText)}</hp:t></hp:run></hp:p></hp:subList>`
      );
      return `<hp:tc${attrs}>${simplifiedContent}</hp:tc>`;
    });
    return newRow;
  }
  deleteTableRowInXml(xml, tableIndex, rowIndex) {
    const tableRegex = /<hp:tbl\b[^>]*>[\s\S]*?<\/hp:tbl>/g;
    let currentTableIndex = 0;
    return xml.replace(tableRegex, (tableMatch) => {
      if (currentTableIndex !== tableIndex) {
        currentTableIndex++;
        return tableMatch;
      }
      currentTableIndex++;
      const rowRegex = /<hp:tr[^>]*>[\s\S]*?<\/hp:tr>/g;
      const rows = [];
      let rowMatch;
      while ((rowMatch = rowRegex.exec(tableMatch)) !== null) {
        rows.push(rowMatch[0]);
      }
      if (rowIndex >= rows.length || rows.length <= 1) return tableMatch;
      rows.splice(rowIndex, 1);
      const newRowCount = rows.length;
      let updatedTable = tableMatch.replace(/rowCnt="(\d+)"/, `rowCnt="${newRowCount}"`);
      const rowsStart = updatedTable.indexOf("<hp:tr");
      const rowsEnd = updatedTable.lastIndexOf("</hp:tr>") + "</hp:tr>".length;
      if (rowsStart !== -1 && rowsEnd > rowsStart) {
        updatedTable = updatedTable.substring(0, rowsStart) + rows.join("") + updatedTable.substring(rowsEnd);
      }
      return updatedTable;
    });
  }
  insertTableColumnInXml(xml, tableIndex, afterColIndex) {
    const tableRegex = /<hp:tbl\b[^>]*>[\s\S]*?<\/hp:tbl>/g;
    let currentTableIndex = 0;
    return xml.replace(tableRegex, (tableMatch) => {
      if (currentTableIndex !== tableIndex) {
        currentTableIndex++;
        return tableMatch;
      }
      currentTableIndex++;
      let updatedTable = tableMatch.replace(/colCnt="(\d+)"/, (_match, oldCount) => {
        return `colCnt="${parseInt(oldCount) + 1}"`;
      });
      updatedTable = updatedTable.replace(/<hp:tr[^>]*>[\s\S]*?<\/hp:tr>/g, (rowMatch) => {
        const cellRegex = /<hp:tc\b[^>]*>[\s\S]*?<\/hp:tc>/g;
        const cells = [];
        let cellMatch;
        while ((cellMatch = cellRegex.exec(rowMatch)) !== null) {
          cells.push(cellMatch[0]);
        }
        if (afterColIndex >= cells.length) return rowMatch;
        const templateCell = cells[afterColIndex];
        const newCell = this.createNewCellFromTemplate(templateCell, afterColIndex + 1);
        cells.splice(afterColIndex + 1, 0, newCell);
        const cellsStart = rowMatch.indexOf("<hp:tc");
        const cellsEnd = rowMatch.lastIndexOf("</hp:tc>") + "</hp:tc>".length;
        if (cellsStart !== -1 && cellsEnd > cellsStart) {
          return rowMatch.substring(0, cellsStart) + cells.join("") + rowMatch.substring(cellsEnd);
        }
        return rowMatch;
      });
      return updatedTable;
    });
  }
  createNewCellFromTemplate(templateCell, newColAddr) {
    let newCell = templateCell;
    newCell = newCell.replace(/colAddr="(\d+)"/, `colAddr="${newColAddr}"`);
    newCell = newCell.replace(/<hp:t>([^<]*)<\/hp:t>/g, "<hp:t></hp:t>");
    return newCell;
  }
  deleteTableColumnInXml(xml, tableIndex, colIndex) {
    const tableRegex = /<hp:tbl\b[^>]*>[\s\S]*?<\/hp:tbl>/g;
    let currentTableIndex = 0;
    return xml.replace(tableRegex, (tableMatch) => {
      if (currentTableIndex !== tableIndex) {
        currentTableIndex++;
        return tableMatch;
      }
      currentTableIndex++;
      let updatedTable = tableMatch.replace(/colCnt="(\d+)"/, (_match, oldCount) => {
        const newCount = parseInt(oldCount) - 1;
        return newCount > 0 ? `colCnt="${newCount}"` : `colCnt="1"`;
      });
      updatedTable = updatedTable.replace(/<hp:tr[^>]*>[\s\S]*?<\/hp:tr>/g, (rowMatch) => {
        const cellRegex = /<hp:tc\b[^>]*>[\s\S]*?<\/hp:tc>/g;
        const cells = [];
        let cellMatch;
        while ((cellMatch = cellRegex.exec(rowMatch)) !== null) {
          cells.push(cellMatch[0]);
        }
        if (colIndex >= cells.length || cells.length <= 1) return rowMatch;
        cells.splice(colIndex, 1);
        const cellsStart = rowMatch.indexOf("<hp:tc");
        const cellsEnd = rowMatch.lastIndexOf("</hp:tc>") + "</hp:tc>".length;
        if (cellsStart !== -1 && cellsEnd > cellsStart) {
          return rowMatch.substring(0, cellsStart) + cells.join("") + rowMatch.substring(cellsEnd);
        }
        return rowMatch;
      });
      return updatedTable;
    });
  }
  mergeCellsInXml(xml, tableIndex, startRow, startCol, endRow, endCol) {
    const tableRegex = /<hp:tbl\b[^>]*>[\s\S]*?<\/hp:tbl>/g;
    let currentTableIndex = 0;
    return xml.replace(tableRegex, (tableMatch) => {
      if (currentTableIndex !== tableIndex) {
        currentTableIndex++;
        return tableMatch;
      }
      currentTableIndex++;
      const rowSpan = endRow - startRow + 1;
      const colSpan = endCol - startCol + 1;
      let rowIndex = 0;
      return tableMatch.replace(/<hp:tr[^>]*>([\s\S]*?)<\/hp:tr>/g, (rowMatch, rowContent) => {
        const currentRow = rowIndex;
        rowIndex++;
        if (currentRow < startRow || currentRow > endRow) return rowMatch;
        let colIndex = 0;
        const updatedRowContent = rowContent.replace(/<hp:tc\b([^>]*)>([\s\S]*?)<\/hp:tc>/g, (cellMatch, attrs, content) => {
          const currentCol = colIndex;
          colIndex++;
          if (currentCol < startCol || currentCol > endCol) return cellMatch;
          if (currentRow === startRow && currentCol === startCol) {
            let updatedAttrs = attrs;
            updatedAttrs = updatedAttrs.replace(/rowSpan="(\d+)"/, `rowSpan="${rowSpan}"`);
            updatedAttrs = updatedAttrs.replace(/colSpan="(\d+)"/, `colSpan="${colSpan}"`);
            if (!updatedAttrs.includes("rowSpan=")) {
              updatedAttrs += ` rowSpan="${rowSpan}"`;
            }
            if (!updatedAttrs.includes("colSpan=")) {
              updatedAttrs += ` colSpan="${colSpan}"`;
            }
            return `<hp:tc${updatedAttrs}>${content}</hp:tc>`;
          } else {
            return "";
          }
        });
        return `<hp:tr>${updatedRowContent}</hp:tr>`;
      });
    });
  }
  async applyDirectTextUpdatesToXml() {
    if (!this._zip) return;
    let sectionIndex = 0;
    while (true) {
      const sectionPath = `Contents/section${sectionIndex}.xml`;
      const file = this._zip.file(sectionPath);
      if (!file) break;
      let xml = await file.async("string");
      for (const update of this._pendingDirectTextUpdates) {
        if (!update?.oldText) continue;
        const escapedOld = this.escapeXml(update.oldText);
        const escapedNew = this.escapeXml(update.newText ?? "");
        const pattern1 = new RegExp(`(<hp:t[^>]*>)${this.escapeRegex(escapedOld)}`, "g");
        xml = xml.replace(pattern1, `$1${escapedNew}`);
        xml = xml.replace(new RegExp(`>${this.escapeRegex(escapedOld)}<`, "g"), `>${escapedNew}<`);
      }
      this._zip.file(sectionPath, xml);
      sectionIndex++;
    }
  }
  escapeRegex(str) {
    if (!str) return "";
    return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  }
  /**
   * Apply text replacements directly to XML files.
   * This is the safest approach as it preserves the original XML structure.
   */
  async applyTextReplacementsToXml() {
    if (!this._zip) return;
    let sectionIndex = 0;
    while (true) {
      const sectionPath = `Contents/section${sectionIndex}.xml`;
      const file = this._zip.file(sectionPath);
      if (!file) break;
      let xml = await file.async("string");
      for (const replacement of this._pendingTextReplacements) {
        const { oldText, newText, options } = replacement;
        if (!oldText) continue;
        const safeNewText = newText ?? "";
        const { caseSensitive = false, regex = false, replaceAll = true } = options || {};
        let searchPattern;
        if (regex) {
          searchPattern = new RegExp(oldText, caseSensitive ? replaceAll ? "g" : "" : replaceAll ? "gi" : "i");
        } else {
          const escaped = oldText.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
          searchPattern = new RegExp(escaped, caseSensitive ? replaceAll ? "g" : "" : replaceAll ? "gi" : "i");
        }
        xml = xml.replace(/<hp:t([^>]*)>([^<]*)<\/hp:t>/g, (_match, attrs, textContent) => {
          if (!textContent) return `<hp:t${attrs}></hp:t>`;
          const newTextContent = textContent.replace(searchPattern, this.escapeXml(safeNewText));
          return `<hp:t${attrs}>${newTextContent}</hp:t>`;
        });
      }
      this._zip.file(sectionPath, xml);
      sectionIndex++;
    }
    await this.syncMetadataToZip();
  }
  /**
   * Sync structural changes (paragraph text, table cells, etc.)
   * Regenerates section XML from _content to handle new elements.
   */
  async syncStructuralChangesToZip() {
    if (!this._zip) return;
    for (let sectionIndex = 0; sectionIndex < this._content.sections.length; sectionIndex++) {
      const sectionPath = `Contents/section${sectionIndex}.xml`;
      const section = this._content.sections[sectionIndex];
      const newXml = this.generateSectionXml(section);
      this._zip.file(sectionPath, newXml);
    }
    await this.syncMetadataToZip();
  }
  generateSectionXml(section) {
    const hasImages = section.elements.some((el) => el.type === "image");
    let xml = `<?xml version="1.0" encoding="UTF-8"?>
`;
    xml += `<hp:sec xmlns:hp="http://www.hancom.co.kr/hwpml/2011/paragraph"`;
    if (hasImages) {
      xml += ` xmlns:hc="http://www.hancom.co.kr/hwpml/2011/core"`;
    }
    xml += `>
`;
    for (const element of section.elements) {
      if (element.type === "paragraph") {
        xml += this.generateParagraphXml(element.data);
      } else if (element.type === "table") {
        xml += this.generateTableXml(element.data);
      } else if (element.type === "textbox") {
        xml += this.generateTextBoxXml(element.data);
      } else if (element.type === "image") {
        xml += this.generateImageXml(element.data);
      }
    }
    if (section.header) {
      xml += this.generateHeaderFooterXml(section.header, "header");
    }
    if (section.footer) {
      xml += this.generateHeaderFooterXml(section.footer, "footer");
    }
    if (section.memos && section.memos.length > 0) {
      for (const memo of section.memos) {
        xml += `  <hp:memo id="${this.escapeXml(memo.id)}" author="${this.escapeXml(memo.author)}" date="${this.escapeXml(memo.date)}">
`;
        for (const line of memo.content) {
          xml += `    <hp:p><hp:run><hp:t>${this.escapeXml(line)}</hp:t></hp:run></hp:p>
`;
        }
        xml += `  </hp:memo>
`;
      }
    }
    xml += `</hp:sec>`;
    return xml;
  }
  generateHeaderFooterXml(hf, type) {
    let xml = `  <hp:${type}>
`;
    for (const para of hf.paragraphs) {
      xml += this.generateParagraphXml(para, 4);
    }
    xml += `  </hp:${type}>
`;
    return xml;
  }
  generateParagraphXml(paragraph, indentSpaces = 2) {
    const indent = " ".repeat(indentSpaces);
    const align = paragraph.paraStyle?.align || "left";
    let xml = `${indent}<hp:p`;
    if (align !== "left") {
      xml += ` align="${align}"`;
    }
    xml += `>
`;
    for (const run of paragraph.runs || []) {
      const memoAttr = run.hasMemo && run.memoId ? ` memoId="${this.escapeXml(run.memoId)}"` : "";
      xml += `${indent}  <hp:run${memoAttr}>
`;
      if (run.field && (run.field.fieldType === "Bookmark" || run.field.fieldType === "bookmark")) {
        const bookmarkName = run.field.name || run.field.bookmarkName || "";
        xml += `${indent}    <hp:ctrl>
`;
        xml += `${indent}      <hp:fieldBegin type="BOOKMARK">
`;
        xml += `${indent}        <hp:stringParam name="Name">${this.escapeXml(bookmarkName)}</hp:stringParam>
`;
        xml += `${indent}      </hp:fieldBegin>
`;
        xml += `${indent}    </hp:ctrl>
`;
      } else if (run.hyperlink) {
        const url = run.hyperlink.url || "";
        xml += `${indent}    <hp:ctrl>
`;
        xml += `${indent}      <hp:fieldBegin type="HYPERLINK">
`;
        xml += `${indent}        <hp:stringParam name="URL">${this.escapeXml(url)}</hp:stringParam>
`;
        xml += `${indent}      </hp:fieldBegin>
`;
        xml += `${indent}    </hp:ctrl>
`;
        if (run.text) {
          xml += `${indent}    <hp:t>${this.escapeXml(run.text)}</hp:t>
`;
        }
        xml += `${indent}    <hp:ctrl>
`;
        xml += `${indent}      <hp:fieldEnd type="HYPERLINK"/>
`;
        xml += `${indent}    </hp:ctrl>
`;
      } else if (run.pageNumber) {
        xml += `${indent}    <hp:pageNum/>
`;
      } else {
        xml += `${indent}    <hp:t>${this.escapeXml(run.text || "")}</hp:t>
`;
      }
      xml += `${indent}  </hp:run>
`;
      if (run.footnoteRef != null) {
        const footnote = this._content.footnotes?.find((f) => f.number === run.footnoteRef);
        if (footnote) {
          xml += `${indent}  <hp:footNote number="${run.footnoteRef}">
`;
          for (const para of footnote.paragraphs) {
            xml += this.generateParagraphXml(para, indentSpaces + 4);
          }
          xml += `${indent}  </hp:footNote>
`;
        }
      }
      if (run.endnoteRef != null) {
        const endnote = this._content.endnotes?.find((f) => f.number === run.endnoteRef);
        if (endnote) {
          xml += `${indent}  <hp:endNote number="${run.endnoteRef}">
`;
          for (const para of endnote.paragraphs) {
            xml += this.generateParagraphXml(para, indentSpaces + 4);
          }
          xml += `${indent}  </hp:endNote>
`;
        }
      }
    }
    xml += `${indent}</hp:p>
`;
    return xml;
  }
  /**
   * Generate table XML from HwpxTable.
   */
  generateTableXml(table) {
    let xml = `  <hp:tbl rowCount="${table.rowCount}" colCount="${table.colCount}">
`;
    if (table.rows) {
      for (const row of table.rows) {
        if (!row?.cells) continue;
        xml += `    <hp:tr>
`;
        for (const cell of row.cells) {
          xml += `      <hp:tc colAddr="${cell.colAddr}" rowAddr="${cell.rowAddr}" colSpan="${cell.colSpan}" rowSpan="${cell.rowSpan}">
`;
          for (const para of cell.paragraphs || []) {
            xml += `        <hp:p>
`;
            for (const run of para.runs || []) {
              xml += `          <hp:run>
`;
              xml += `            <hp:t>${this.escapeXml(run.text || "")}</hp:t>
`;
              xml += `          </hp:run>
`;
            }
            xml += `        </hp:p>
`;
          }
          xml += `      </hp:tc>
`;
        }
        xml += `    </hp:tr>
`;
      }
    }
    xml += `  </hp:tbl>
`;
    return xml;
  }
  generateTextBoxXml(textBox) {
    const xHwpunit = Math.round(textBox.x * 100);
    const yHwpunit = Math.round(textBox.y * 100);
    const widthHwpunit = Math.round(textBox.width * 100);
    const heightHwpunit = Math.round(textBox.height * 100);
    let xml = `  <hp:p>
`;
    xml += `    <hp:run>
`;
    xml += `      <hp:rect id="${textBox.id}" zOrder="0">
`;
    xml += `        <hp:sz width="${widthHwpunit}" height="${heightHwpunit}" widthRelTo="ABSOLUTE" heightRelTo="ABSOLUTE"/>
`;
    xml += `        <hp:pos vertRelTo="PARA" horzRelTo="PARA" vertAlign="TOP" horzAlign="LEFT" vertOffset="${yHwpunit}" horzOffset="${xHwpunit}"/>
`;
    if (textBox.fillColor) {
      xml += `        <hp:fillBrush><hp:winBrush faceColor="${textBox.fillColor}"/></hp:fillBrush>
`;
    }
    if (textBox.strokeColor && textBox.strokeWidth) {
      xml += `        <hp:lineShape color="${textBox.strokeColor}" width="${textBox.strokeWidth}"/>
`;
    }
    xml += `        <hp:textbox>
`;
    for (const para of textBox.paragraphs) {
      xml += this.generateParagraphXml(para, 10);
    }
    xml += `        </hp:textbox>
`;
    xml += `      </hp:rect>
`;
    xml += `    </hp:run>
`;
    xml += `  </hp:p>
`;
    return xml;
  }
  toHwpxEnumValue(value) {
    return value.replace(/([a-z])([A-Z])/g, "$1_$2").toUpperCase();
  }
  generateImageXml(image) {
    const widthHwpunit = Math.round(image.width * 100);
    const heightHwpunit = Math.round(image.height * 100);
    const orgWidth = image.orgWidth ? Math.round(image.orgWidth * 100) : widthHwpunit;
    const orgHeight = image.orgHeight ? Math.round(image.orgHeight * 100) : heightHwpunit;
    const numType = this.toHwpxEnumValue(image.numberingType || "picture");
    const textWrap = this.toHwpxEnumValue(image.textWrap || "topAndBottom");
    const textFlow = this.toHwpxEnumValue(image.textFlow || "bothSides");
    const instId = image.shapeComponent?.instId || image.id;
    const lock = "0";
    const reverse = image.reverse ? "1" : "0";
    let xml = `  <hp:p>
`;
    xml += `    <hp:run>
`;
    xml += `      <hp:pic id="${image.id}" zOrder="${image.zOrder ?? 0}" numberingType="${numType}" textWrap="${textWrap}" textFlow="${textFlow}" lock="${lock}" dropcapstyle="None" href="" groupLevel="${image.shapeComponent?.groupLevel ?? 0}" instid="${instId}" reverse="${reverse}">
`;
    xml += `        <hp:offset x="0" y="0"/>
`;
    xml += `        <hp:orgSz width="${orgWidth}" height="${orgHeight}"/>
`;
    xml += `        <hp:curSz width="${widthHwpunit}" height="${heightHwpunit}"/>
`;
    const hFlip = image.flip?.horizontal || image.shapeComponent?.horzFlip ? "1" : "0";
    const vFlip = image.flip?.vertical || image.shapeComponent?.vertFlip ? "1" : "0";
    xml += `        <hp:flip horizontal="${hFlip}" vertical="${vFlip}"/>
`;
    const angle = image.rotation?.angle ?? 0;
    const centerX = image.rotation?.centerX != null ? Math.round(image.rotation.centerX * 100) : Math.round(widthHwpunit / 2);
    const centerY = image.rotation?.centerY != null ? Math.round(image.rotation.centerY * 100) : Math.round(heightHwpunit / 2);
    xml += `        <hp:rotationInfo angle="${angle}" centerX="${centerX}" centerY="${centerY}" rotateimage="0"/>
`;
    const scaleX = orgWidth > 0 ? (widthHwpunit / orgWidth).toFixed(6) : "1";
    const scaleY = orgHeight > 0 ? (heightHwpunit / orgHeight).toFixed(6) : "1";
    xml += `        <hp:renderingInfo>
`;
    xml += `          <hc:transMatrix e1="1" e2="0" e3="0" e4="0" e5="1" e6="0"/>
`;
    xml += `          <hc:scaMatrix e1="${scaleX}" e2="0" e3="0" e4="0" e5="${scaleY}" e6="0"/>
`;
    xml += `          <hc:rotMatrix e1="1" e2="0" e3="0" e4="0" e5="1" e6="0"/>
`;
    xml += `        </hp:renderingInfo>
`;
    const bright = image.brightness ?? 0;
    const contrast = image.contrast ?? 0;
    const alpha = image.alpha != null ? Math.round(image.alpha * 255) : 0;
    xml += `        <hc:img binaryItemIDRef="${image.binaryId}" bright="${bright}" contrast="${contrast}" effect="REAL_PIC" alpha="${alpha}"/>
`;
    xml += `        <hp:imgRect>
`;
    xml += `          <hc:pt0 x="0" y="0"/>
`;
    xml += `          <hc:pt1 x="${orgWidth}" y="0"/>
`;
    xml += `          <hc:pt2 x="${orgWidth}" y="${orgHeight}"/>
`;
    xml += `          <hc:pt3 x="0" y="${orgHeight}"/>
`;
    xml += `        </hp:imgRect>
`;
    if (image.imageClip) {
      xml += `        <hp:imgClip left="${Math.round(image.imageClip.left * 100)}" right="${Math.round(image.imageClip.right * 100)}" top="${Math.round(image.imageClip.top * 100)}" bottom="${Math.round(image.imageClip.bottom * 100)}"/>
`;
    } else {
      xml += `        <hp:imgClip left="0" right="${orgWidth}" top="0" bottom="${orgHeight}"/>
`;
    }
    const inM = image.inMargin;
    xml += `        <hp:inMargin left="${inM ? Math.round(inM.left * 100) : 0}" right="${inM ? Math.round(inM.right * 100) : 0}" top="${inM ? Math.round(inM.top * 100) : 0}" bottom="${inM ? Math.round(inM.bottom * 100) : 0}"/>
`;
    xml += `        <hp:imgDim dimwidth="${orgWidth}" dimheight="${orgHeight}"/>
`;
    xml += `        <hp:effects/>
`;
    xml += `        <hp:sz width="${widthHwpunit}" widthRelTo="ABSOLUTE" height="${heightHwpunit}" heightRelTo="ABSOLUTE" protect="0"/>
`;
    if (image.position) {
      const pos = image.position;
      xml += `        <hp:pos`;
      xml += ` treatAsChar="${pos.treatAsChar ? "1" : "0"}"`;
      xml += ` affectLSpacing="${pos.affectLSpacing ? "1" : "0"}"`;
      xml += ` flowWithText="${pos.flowWithText ? "1" : "0"}"`;
      xml += ` allowOverlap="${pos.allowOverlap ? "1" : "0"}"`;
      xml += ` holdAnchorAndSO="${pos.holdAnchorAndSO ? "1" : "0"}"`;
      xml += ` vertRelTo="${(pos.vertRelTo || "para").toUpperCase()}"`;
      xml += ` horzRelTo="${(pos.horzRelTo || "para").toUpperCase()}"`;
      xml += ` vertAlign="${(pos.vertAlign || "top").toUpperCase()}"`;
      xml += ` horzAlign="${(pos.horzAlign || "left").toUpperCase()}"`;
      xml += ` vertOffset="${pos.vertOffset != null ? Math.round(pos.vertOffset * 100) : 0}"`;
      xml += ` horzOffset="${pos.horzOffset != null ? Math.round(pos.horzOffset * 100) : 0}"`;
      xml += `/>
`;
    } else {
      xml += `        <hp:pos treatAsChar="1" affectLSpacing="0" flowWithText="1" allowOverlap="0" holdAnchorAndSO="0" vertRelTo="PARA" horzRelTo="PARA" vertAlign="TOP" horzAlign="LEFT" vertOffset="0" horzOffset="0"/>
`;
    }
    const outM = image.outMargin;
    xml += `        <hp:outMargin left="${outM ? Math.round(outM.left * 100) : 0}" right="${outM ? Math.round(outM.right * 100) : 0}" top="${outM ? Math.round(outM.top * 100) : 0}" bottom="${outM ? Math.round(outM.bottom * 100) : 0}"/>
`;
    if (image.shapeComment) {
      xml += `        <hp:shapeComment>${this.escapeXml(image.shapeComment)}</hp:shapeComment>
`;
    }
    xml += `      </hp:pic>
`;
    xml += `    </hp:run>
`;
    xml += `  </hp:p>
`;
    return xml;
  }
  updateSectionXml(xml, section) {
    let updatedXml = xml;
    const paragraphMap = /* @__PURE__ */ new Map();
    const tableMap = /* @__PURE__ */ new Map();
    let paragraphCount = 0;
    let tableCount = 0;
    for (const element of section.elements) {
      if (element.type === "paragraph") {
        paragraphMap.set(paragraphCount, element.data);
        paragraphCount++;
      } else if (element.type === "table") {
        tableMap.set(tableCount, element.data);
        tableCount++;
      }
    }
    const tablePositions = [];
    const tableRegex = /<hp:tbl\b[^>]*>[\s\S]*?<\/hp:tbl>/g;
    let tableMatch;
    while ((tableMatch = tableRegex.exec(xml)) !== null) {
      tablePositions.push({ start: tableMatch.index, end: tableMatch.index + tableMatch[0].length });
    }
    let paragraphIndex = 0;
    const paragraphRegex = /<hp:p\b[^>]*>([\s\S]*?)<\/hp:p>/g;
    updatedXml = xml.replace(paragraphRegex, (match, _inner, offset) => {
      const isInTable = tablePositions.some((pos) => offset >= pos.start && offset < pos.end);
      if (isInTable) {
        return match;
      }
      const paragraph = paragraphMap.get(paragraphIndex);
      paragraphIndex++;
      if (paragraph) {
        return this.updateParagraphXml(match, paragraph);
      }
      return match;
    });
    let tableIndex = 0;
    updatedXml = updatedXml.replace(/<hp:tbl\b[^>]*>([\s\S]*?)<\/hp:tbl>/g, (tblMatch) => {
      const table = tableMap.get(tableIndex);
      tableIndex++;
      if (!table) {
        return tblMatch;
      }
      let rowIndex = 0;
      return tblMatch.replace(/<hp:tr[^>]*>([\s\S]*?)<\/hp:tr>/g, (rowMatch) => {
        if (rowIndex >= table.rows.length) {
          rowIndex++;
          return rowMatch;
        }
        const row = table.rows[rowIndex];
        rowIndex++;
        let cellIndex = 0;
        return rowMatch.replace(/<hp:tc\b([^>]*)>([\s\S]*?)<\/hp:tc>/g, (cellMatch, cellAttrs, cellContent) => {
          if (cellIndex >= row.cells.length) {
            cellIndex++;
            return cellMatch;
          }
          const cell = row.cells[cellIndex];
          cellIndex++;
          let updatedCellContent = cellContent;
          if (cell.paragraphs && cell.paragraphs.length > 0) {
            let cellParaIndex = 0;
            updatedCellContent = cellContent.replace(/<hp:p\b[^>]*>([\s\S]*?)<\/hp:p>/g, (paraMatch) => {
              if (cellParaIndex < cell.paragraphs.length) {
                const para = cell.paragraphs[cellParaIndex];
                cellParaIndex++;
                return this.updateParagraphXml(paraMatch, para);
              }
              cellParaIndex++;
              return paraMatch;
            });
          }
          return `<hp:tc${cellAttrs}>${updatedCellContent}</hp:tc>`;
        });
      });
    });
    if (section.memos && section.memos.length > 0) {
      updatedXml = updatedXml.replace(/<hp:memo\b[^>]*>[\s\S]*?<\/hp:memo>\s*/g, "");
      let memoXml = "";
      for (const memo of section.memos) {
        memoXml += `  <hp:memo id="${this.escapeXml(memo.id)}" author="${this.escapeXml(memo.author)}" date="${this.escapeXml(memo.date)}">
`;
        for (const line of memo.content) {
          memoXml += `    <hp:p><hp:run><hp:t>${this.escapeXml(line)}</hp:t></hp:run></hp:p>
`;
        }
        memoXml += `  </hp:memo>
`;
      }
      updatedXml = updatedXml.replace(/<\/hp:sec>\s*$/, memoXml + "</hp:sec>");
    }
    return updatedXml;
  }
  /**
   * Update paragraph XML with new text content.
   */
  updateParagraphXml(xml, paragraph) {
    const fullText = (paragraph.runs || []).map((r) => r.text || "").join("");
    let firstTextTag = true;
    return xml.replace(/<hp:t([^>]*)>([^<]*)<\/hp:t>/g, (_match, attrs, _oldText) => {
      if (firstTextTag) {
        firstTextTag = false;
        return `<hp:t${attrs}>${this.escapeXml(fullText)}</hp:t>`;
      }
      return `<hp:t${attrs}></hp:t>`;
    });
  }
  /**
   * Sync metadata to header.xml
   */
  async syncMetadataToZip() {
    if (!this._zip) return;
    const headerPath = "Contents/header.xml";
    let headerXml = await this._zip.file(headerPath)?.async("string");
    if (headerXml && this._content.metadata) {
      const meta = this._content.metadata;
      if (meta.title) {
        headerXml = headerXml.replace(
          /<hh:title[^>]*>[^<]*<\/hh:title>/,
          `<hh:title>${this.escapeXml(meta.title)}</hh:title>`
        );
      }
      if (meta.creator) {
        headerXml = headerXml.replace(
          /<hh:creator[^>]*>[^<]*<\/hh:creator>/,
          `<hh:creator>${this.escapeXml(meta.creator)}</hh:creator>`
        );
      }
      if (meta.subject) {
        headerXml = headerXml.replace(
          /<hh:subject[^>]*>[^<]*<\/hh:subject>/,
          `<hh:subject>${this.escapeXml(meta.subject)}</hh:subject>`
        );
      }
      if (meta.description) {
        headerXml = headerXml.replace(
          /<hh:description[^>]*>[^<]*<\/hh:description>/,
          `<hh:description>${this.escapeXml(meta.description)}</hh:description>`
        );
      }
      this._zip.file(headerPath, headerXml);
    }
  }
  /**
   * Sync binary data references to Contents/content.hpf (OPF manifest).
   * Ensures all images in BinData/ are registered as <opf:item> entries.
   */
  async syncBinDataToHpf() {
    if (!this._zip) return;
    const hpfPath = "Contents/content.hpf";
    let hpfXml = await this._zip.file(hpfPath)?.async("string");
    if (!hpfXml) return;
    const binFiles = Object.keys(this._zip.files).filter(
      (f) => f.startsWith("BinData/") && !f.endsWith("/")
    );
    const existingItemIds = /* @__PURE__ */ new Set();
    const itemRegex = /<opf:item[^>]*id="([^"]*)"[^>]*href="([^"]*)"[^>]*\/>/g;
    let match;
    while ((match = itemRegex.exec(hpfXml)) !== null) {
      existingItemIds.add(match[1]);
    }
    const mimeTypeMap = {
      "png": "image/png",
      "jpg": "image/jpg",
      "jpeg": "image/jpeg",
      "gif": "image/gif",
      "bmp": "image/bmp",
      "tiff": "image/tiff"
    };
    let newItems = "";
    for (const binPath of binFiles) {
      const fileName = binPath.split("/").pop() || "";
      const fileId = fileName.replace(/\.[^.]+$/, "");
      if (existingItemIds.has(fileId)) continue;
      const ext = (fileName.split(".").pop() || "png").toLowerCase();
      const mediaType = mimeTypeMap[ext] || "application/octet-stream";
      newItems += `<opf:item id="${fileId}" href="${binPath}" media-type="${mediaType}" isEmbeded="1"/>`;
    }
    if (newItems) {
      hpfXml = hpfXml.replace("</opf:manifest>", newItems + "</opf:manifest>");
      this._zip.file(hpfPath, hpfXml);
    }
    const currentBinFileIds = new Set(
      binFiles.map((f) => (f.split("/").pop() || "").replace(/\.[^.]+$/, ""))
    );
    let modified = false;
    hpfXml = await this._zip.file(hpfPath).async("string");
    const removeRegex = /<opf:item[^>]*id="([^"]*)"[^>]*href="BinData\/[^"]*"[^>]*\/>/g;
    hpfXml = hpfXml.replace(removeRegex, (fullMatch, itemId) => {
      if (!currentBinFileIds.has(itemId)) {
        modified = true;
        return "";
      }
      return fullMatch;
    });
    if (modified) {
      this._zip.file(hpfPath, hpfXml);
    }
  }
  escapeXml(text) {
    if (!text) return "";
    return text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&apos;");
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  HwpxDocument
});
/*! Bundled license information:

cfb/cfb.js:
  (*! crc32.js (C) 2014-present SheetJS -- http://sheetjs.com *)

pako/dist/pako.esm.mjs:
  (*! pako 2.1.0 https://github.com/nodeca/pako @license (MIT AND Zlib) *)
*/

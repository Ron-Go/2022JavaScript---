"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, defineProperty = Object.defineProperty || function (obj, key, desc) { obj[key] = desc.value; }, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return defineProperty(generator, "_invoke", { value: makeInvokeMethod(innerFn, self, context) }), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; defineProperty(this, "_invoke", { value: function value(method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; } function maybeInvokeDelegate(delegate, context) { var method = delegate.iterator[context.method]; if (undefined === method) { if (context.delegate = null, "throw" === context.method) { if (delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method)) return ContinueSentinel; context.method = "throw", context.arg = new TypeError("The iterator does not provide a 'throw' method"); } return ContinueSentinel; } var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) { if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; } return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), defineProperty(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (val) { var object = Object(val), keys = []; for (var key in object) { keys.push(key); } return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) { "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); } }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
var data;

/*-----選擇器部分-----*/
// order區塊
var orderPageSection = document.querySelector('.orderPage-list');

// order清單區塊
var orderPageTable = document.querySelector('.orderPage-table');

// order狀態
var orderStatus = document.querySelector('.orderStatus');

// 清除全部訂單btn
var discardAllBtn = document.querySelector('.discardAllBtn');

/*----- 監聽部分-----*/

// 改變訂單狀態
orderPageTable.addEventListener('click', function (e) {
  e.preventDefault();
  if (e.target.tagName !== 'A') return;
  var _e$target$dataset = e.target.dataset,
    id = _e$target$dataset.id,
    paid = _e$target$dataset.paid;
  var putData = {
    "data": {
      "id": id,
      "paid": paid === 'true' ? false : true
    }
  };
  changeOrder(putData);
});

// 刪除單項訂單
orderPageTable.addEventListener('click', function (e) {
  if (e.target.value !== '刪除') return;
  var id = e.target.dataset.id;
  deleteOrder(id);
});

// 清除全部訂單
discardAllBtn.addEventListener('click', function (e) {
  if (e.target.textContent !== '清除全部訂單') return;
  deleteAllOrder();
});

/*----- 渲染部分-----*/

// 訂單渲染
function renderOrder(orders) {
  var thead = "\n  <thead>\n    <tr>\n      <th>\u8A02\u55AE\u7DE8\u865F</th>\n      <th>\u806F\u7D61\u4EBA</th>\n      <th>\u806F\u7D61\u5730\u5740</th>\n      <th>\u96FB\u5B50\u90F5\u4EF6</th>\n      <th>\u8A02\u55AE\u54C1\u9805</th>\n      <th>\u8A02\u55AE\u65E5\u671F</th>\n      <th>\u8A02\u55AE\u72C0\u614B</th>\n      <th>\u64CD\u4F5C</th>\n    </tr>\n  </thead>";
  var tbody = "";
  orders.forEach(function () {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : item,
      user = _ref.user,
      paid = _ref.paid,
      id = _ref.id,
      products = _ref.products,
      createdAt = _ref.createdAt;
    var name = user.name,
      tel = user.tel,
      address = user.address,
      email = user.email;
    tbody += "\n      <tr>\n        <td>".concat(createdAt, "</td>\n        <td>\n          <p>").concat(name, "</p>\n          <p>").concat(tel, "</p>\n        </td>\n        <td>").concat(address, "</td>\n        <td>").concat(email, "</td>\n        <td>\n          ").concat(takeoutOrderItem(products), "\n        </td>\n        <td>").concat(convertDate(createdAt), "</td>\n        <td class=\"orderStatus\">\n          <a href=\"#\" data-id=\"").concat(id, "\" data-paid=\"").concat(paid, "\" style=\"color:").concat(paid ? 'green' : 'red', "\">").concat(paid ? '已處理' : '未處理', "</a>\n        </td>\n        <td>\n          <input type=\"button\" class=\"delSingleOrder-Btn\" value=\"\u522A\u9664\"  data-id=\"").concat(id, "\">\n        </td>\n      </tr>");
  });
  orders.length ? orderPageTable.innerHTML = thead + tbody : orderPageSection.innerHTML = "<h1 style=\"font-size:32px; text-align:center\">\u76EE\u524D\u5F8C\u53F0\u7121\u8A02\u55AE</h1>";
}

/*----- 其他部分-----*/

// 轉換日期
function convertDate(code) {
  var time = new Date(code * 1000);
  var months = "1月,2月,3月,4月,5月,6月,7月,8月,9月,10月,11月,12月".split(",");
  var weekdays = "星期日,星期一,星期二,星期三,星期四,星期五,星期六".split(",");
  return "".concat(time.getFullYear(), "\u5E74/").concat(months[time.getMonth()], "/").concat(time.getDate(), "/").concat(weekdays[time.getDay()]);
}
;

// 訂單品項
function takeoutOrderItem(products) {
  var titleStr = "";
  var _iterator = _createForOfIteratorHelper(products),
    _step;
  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var _item = _step.value;
      titleStr += "<p>".concat(_item.title, " / \u6578\u91CF:").concat(_item.quantity, "</p>");
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }
  ;
  return titleStr;
}
;

// 建立c3圖表需要的資料
function createChartData(data) {
  var saleItem = {};
  var chartData = {
    color: {},
    data: []
  };
  var otherAcc = 0;
  // 將購物車所有品項列出，並計算數量，放置在物件saleItem
  data.forEach(function () {
    var _ref2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : item,
      products = _ref2.products;
    products.forEach(function () {
      var _ref3 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : item,
        title = _ref3.title,
        quantity = _ref3.quantity;
      if (saleItem[title] === undefined) {
        saleItem[title] = quantity;
      } else {
        saleItem[title] += quantity;
      }
      ;
    });
  });
  // 將物件saleItem的屬性、值，轉為陣列
  Object.keys(saleItem).forEach(function (item) {
    var ary = [];
    ary[0] = item;
    ary[1] = saleItem[item];
    chartData.data.push(ary);
  });
  // 依照陣列chartData.data的item[1]去排列順序由大到小
  chartData.data.sort(function (a, b) {
    // 由大到小排列
    return b[1] - a[1];
  });
  // 把chartData.data index[3]含以後的值累加起來，再push回chartData.data
  chartData.data.forEach(function (item, index) {
    index >= 3 ? otherAcc += item[1] : '';
  });
  chartData.data.push(['其他', otherAcc]);
  // 只取前三位和最後一位的資料（保留chartData.data的index[0]~index[2]還有index[chartData.data.length]）
  // chartData.data的index[3]~index[chartData.data.length - 4]刪除
  chartData.data.splice(3, chartData.data.length - 4);
  // 圖表顏色
  chartData.data.forEach(function (item, index) {
    index === 0 ? chartData.color[item[0]] = '#5151D3' : index === 1 ? chartData.color[item[0]] = '#26C0C7' : index === 2 ? chartData.color[item[0]] = '#E68618' : index === 3 ? chartData.color[item[0]] = '#E6b618' : "";
  });
  chartData.chartTitle = '全品項營收比重';
  renderC3(chartData);
}
;

// 渲染C3圖表
function renderC3(c3Data) {
  // 解構賦值
  var data = c3Data.data,
    color = c3Data.color,
    chartTitle = c3Data.chartTitle;
  var chart = c3.generate({
    bindto: '#chart',
    data: {
      type: 'donut',
      columns: data,
      colors: color
    },
    donut: {
      title: chartTitle
    }
  });
}

/*----- API部分-----*/

// API資訊
var api = {
  address: 'https://livejs-api.hexschool.io/api/livejs/v1',
  apiPath: 'ron812',
  token: 'cFphZ0CBhIMnEIvowFRtlwNKvso1'
};

// 改變訂單狀態
function changeOrder(obj) {
  var address = api.address,
    apiPath = api.apiPath;
  axios.put("".concat(address, "/admin/").concat(apiPath, "/orders"), obj).then(function (res) {
    var orders = res.data.orders;
    renderOrder(orders);
    jumpAlert('已更改訂單狀態', 'success');
  })["catch"](function (err) {
    console.log(err);
  });
}
;

// 刪除單項訂單
function deleteOrder(id) {
  var address = api.address,
    apiPath = api.apiPath;
  axios["delete"]("".concat(address, "/admin/").concat(apiPath, "/orders/").concat(id)).then(function (res) {
    var orders = res.data.orders;
    renderOrder(orders);
    createChartData(orders);
    jumpAlert('已刪除訂單', 'warning');
  })["catch"](function (err) {
    console.log(err);
  });
}
;

// 刪除全部訂單
function deleteAllOrder() {
  var address = api.address,
    apiPath = api.apiPath;
  axios["delete"]("".concat(address, "/admin/").concat(apiPath, "/orders")).then(function (res) {
    var _res$data = res.data,
      orders = _res$data.orders,
      message = _res$data.message;
    renderOrder(orders);
    createChartData(orders);
    jumpAlert(message, 'warning');
  })["catch"](function (err) {
    console.log(err);
  });
}
;

// init
_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
  var address, apiPath, token, getOrders, orders;
  return _regeneratorRuntime().wrap(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          address = api.address, apiPath = api.apiPath, token = api.token;
          _context.prev = 1;
          axios.defaults.headers.common['Authorization'] = token;
          _context.next = 5;
          return axios.get("".concat(address, "/admin/").concat(apiPath, "/orders"));
        case 5:
          getOrders = _context.sent;
          orders = getOrders.data.orders;
          console.log(orders);
          data = orders;
          createChartData(orders);
          renderOrder(orders);
          _context.next = 16;
          break;
        case 13:
          _context.prev = 13;
          _context.t0 = _context["catch"](1);
          console.log(_context.t0);
        case 16:
          ;
        case 17:
        case "end":
          return _context.stop();
      }
    }
  }, _callee, null, [[1, 13]]);
}))();
//# sourceMappingURL=admin.js.map

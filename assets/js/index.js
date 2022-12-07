"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, defineProperty = Object.defineProperty || function (obj, key, desc) { obj[key] = desc.value; }, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return defineProperty(generator, "_invoke", { value: makeInvokeMethod(innerFn, self, context) }), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; defineProperty(this, "_invoke", { value: function value(method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; } function maybeInvokeDelegate(delegate, context) { var method = delegate.iterator[context.method]; if (undefined === method) { if (context.delegate = null, "throw" === context.method) { if (delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method)) return ContinueSentinel; context.method = "throw", context.arg = new TypeError("The iterator does not provide a 'throw' method"); } return ContinueSentinel; } var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) { if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; } return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), defineProperty(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (val) { var object = Object(val), keys = []; for (var key in object) { keys.push(key); } return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) { "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); } }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
var productsData = [];

/*-----選擇器部分-----*/
// 產品篩選<select>
var productSelect = document.getElementsByClassName('productSelect')[0];

// 全部產品清單
var productWrap = document.getElementsByClassName('productWrap')[0];

// 購物車區塊
var shoppingCartTable = document.getElementsByClassName('shoppingCart-table')[0];

// 加入購物車
var productCard = document.getElementsByClassName('productCard');

// 加入購物車Dialog
var dialog = document.getElementsByTagName("dialog")[0];

// 購物車單項清除
var discardBtn = {};

// 彈跳視窗
var cartDailog = document.getElementsByTagName('dialog')[0];

// form區塊
var form = document.querySelector('.orderInfo-form');

// form input collection
var formInput = document.querySelectorAll('.orderInfo-input');

/*-----監聽部分-----*/

// 產品篩選<select>
productSelect.addEventListener('change', function (e) {
  console.log(e.target.value);
  var resultProduct = productsData.filter(function (item) {
    return e.target.value === item.category || e.target.value === '';
  });
  renderProducts(resultProduct);
});

// 加入購物車
productWrap.addEventListener('click', function (e) {
  e.preventDefault();
  if (e.target.textContent !== '加入購物車') return;
  var id = e.target.dataset.id;
  var addCartData = {
    data: {
      productId: id,
      quantity: 1
    }
  };
  addCart(addCartData);
  getCarts();
});

// 購物車單項、全部清除
shoppingCartTable.addEventListener('click', function (e) {
  e.preventDefault();
  if (e.target.innerText !== 'clear' && e.target.innerText !== '刪除所有品項') return;
  console.log(e.target.innerText);
  var productId = e.target.getAttribute('data-id'); // 取得id
  e.target.innerText === 'clear' ? deleteProduct(productId) : e.target.innerText === '刪除所有品項' ? deleteAllProduct() : "";
});

// 修改購物車數量
shoppingCartTable.addEventListener('change', function (e) {
  if (e.target.value !== 0 && e.target.innerText === 'clear' && e.target.innerText === '刪除所有品項') return;
  var targetId = e.target.getAttribute('data-id');
  var targetNum = +e.target.value;
  var patchData = {
    data: {
      id: targetId,
      quantity: targetNum
    }
  };
  console.log(targetId, targetNum, patchData);
  patchCartProduct(patchData);
});

// 送出訂單
form.addEventListener('click', function (e) {
  e.preventDefault();
  // validate驗證表單輸入有異常，return跳出監聽
  if (inputValidate('boolean')) return;
  if (e.target.type === 'submit') {
    var objOrder = {
      data: {
        user: {}
      }
    };
    ['name', 'tel', 'email', 'address', 'payment'].forEach(function (item, index) {
      objOrder.data.user[item] = formInput[index].value;
    });
    postOrder(objOrder);
  }
  ;
});

/*----- 渲染部分-----*/

// 渲染產品
function renderProducts(productsData) {
  // 帶入參數為undefined，或帶入參數資料長度為0就return跳出
  if (productsData === undefined || productsData.length === 0) {
    productWrap.innerHTML = "<h1>\u7121\u6CD5\u53D6\u5F97\u5546\u54C1\u8CC7\u6599</h1>";
    return;
  }
  ;
  var str = '';
  productsData.forEach(function () {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : item,
      category = _ref.category,
      images = _ref.images,
      title = _ref.title,
      price = _ref.price,
      origin_price = _ref.origin_price,
      id = _ref.id;
    var index = arguments.length > 1 ? arguments[1] : undefined;
    str += "<li class=\"productCard\">\n        <h4 class=\"productType\">".concat(category, "</h4>\n        <img src=\"").concat(images, "\" alt=\"img-").concat(index, "\">\n        <a href=\"#\" data-id=\"").concat(id, "\" class=\"addCardBtn\">\u52A0\u5165\u8CFC\u7269\u8ECA</a>\n        <h3>").concat(title, "</h3>\n        <del class=\"originPrice\">NT$").concat(thousandths(origin_price), "</del>\n        <p class=\"nowPrice\">NT$").concat(thousandths(price), "</p>\n      </li>");
  });
  productWrap.innerHTML = str;
}
;

// 渲染購物車商品
function renderCart(cartData) {
  if (cartData === undefined) {
    shoppingCartTable.innerHTML = "<h1>\u7121\u6CD5\u53D6\u5F97\u8CFC\u7269\u8ECA\u8CC7\u6599</h1>";
    return;
  } else if (cartData.carts.length === 0) {
    shoppingCartTable.innerHTML = "<h1>\u8CFC\u7269\u8ECA\u5DF2\u6E05\u7A7A</h1>";
    return;
  }
  ;
  // 購物車清單開頭
  var tableStart = "<tr>\n          <th width=\"40%\">\u54C1\u9805</th>\n          <th width=\"15%\">\u55AE\u50F9</th>\n          <th width=\"15%\">\u6578\u91CF</th>\n          <th width=\"15%\">\u91D1\u984D</th>\n          <th width=\"15%\"></th>\n        </tr>";
  var tableBody = '';
  var carts = cartData.carts,
    finalTotal = cartData.finalTotal;
  // 跑forEach把購物車商品渲染出來
  carts.forEach(function () {
    var _ref2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : item,
      product = _ref2.product,
      quantity = _ref2.quantity,
      id = _ref2.id;
    var index = arguments.length > 1 ? arguments[1] : undefined;
    // 購物車產品項目，樣板字面值累加forEach結果
    tableBody += "<tr>\n      <td>\n        <div class=\"cardItem-title\">\n          <img src=\"".concat(product.images, "\" alt=\"cart-").concat(index, "\">\n          <p>").concat(product.title, "</p>\n        </div>\n      </td>\n      <td>NT$").concat(thousandths(product.price), "</td>\n      <td>\n        <select name=\"\" class=\"numSelect\" id=\"numSelect\" value=\"").concat(quantity, "\" data-id=\"").concat(id, "\"> \n          <option value=\"1\">1</option>\n          <option value=\"2\">2</option>\n          <option value=\"3\">3</option>\n          <option value=\"4\">4</option>\n          <option value=\"5\">5</option>\n        </select>\n      </td>\n      <td>NT$").concat(thousandths(product.price * quantity), "</td>\n      <td class=\"discardBtn\">\n        <a href=\"#\" class=\"material-icons\" data-num=\"").concat(index, "\" data-id=\"").concat(id, "\">clear</a>\n      </td>\n    </tr>");
  });
  // 購物車清單結尾
  var tableEnd = "<tr>\n          <td>\n            <a href=\"#\" class=\"discardAllBtn\">\u522A\u9664\u6240\u6709\u54C1\u9805</a>\n          </td>\n          <td></td>\n          <td></td>\n          <td>\n            <p>\u7E3D\u91D1\u984D</p>\n          </td>\n          <td>NT$".concat(thousandths(finalTotal), "</td>\n        </tr>");
  shoppingCartTable.innerHTML = tableStart + tableBody + tableEnd;
  // 購物車渲染完成後，選擇所有商品的數量<select>
  var numSelect = document.querySelectorAll('.numSelect');
  // forEach再把購物車資料內，每項商品數量賦予給數量<select>的value
  carts.forEach(function () {
    var _ref3 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : item,
      quantity = _ref3.quantity;
    var index = arguments.length > 1 ? arguments[1] : undefined;
    numSelect[index].value = quantity;
  });
}
;

/*----- 其他部分-----*/

// 千分位
function thousandths(price) {
  var arrayPrice = price.toString().split('');
  if (arrayPrice.length < 4) return price;
  if (arrayPrice.length >= 4) {
    arrayPrice.splice(-3, 0, ',');
    return arrayPrice.join('');
  }
  ;
}
;

// 回傳validate驗證
// 帶入參數'boolean'回傳true/false。
// 帶入參數'obj'回傳validate的結果。
function inputValidate(select) {
  // 把validate的結果取key值，有key值回傳true，無key值回傳false
  // validate的結果若沒回傳，用空物件取代避免 Object.keys()異常
  var length = Object.keys(validate(form, constraints) || {}).length ? true : false;
  return select === 'boolean' ? length : select === 'obj' ? validate(form, constraints) : false;
}
;

/*----- Validators 輸入驗證-----*/
var constraints = {
  姓名: {
    presence: {
      message: "是必填欄位"
    },
    length: {
      minimum: 2,
      message: "輸入至少2個字"
    }
  },
  電話: {
    presence: {
      message: "是必填欄位"
    },
    length: {
      minimum: 8,
      message: "號碼需超過 8 碼"
    }
  },
  Email: {
    presence: {
      message: "是必填欄位"
    },
    email: {
      message: "格式有誤"
    }
  },
  寄送地址: {
    presence: {
      message: "是必填欄位"
    }
  }
};
formInput.forEach(function (item) {
  item.addEventListener('blur', function (e) {
    // validate的結果賦予給變數errors
    var errors = inputValidate('obj');
    item.nextElementSibling.textContent = '';
    // 若errors無資料，return跳出
    if (!errors) return;
    Object.keys(errors).forEach(function (key) {
      // 選擇器選取(data-message)屬性，及屬性值（errors的key值
      // 並賦予errors對應key值的值
      document.querySelector("[data-message=\"".concat(key, "\"]")).textContent = errors[key];
    });
  });
});
/*----- API部分-----*/

// API資訊
var api = {
  address: 'https://livejs-api.hexschool.io/api/livejs/v1',
  apiPath: 'ron812',
  token: 'cFphZ0CBhIMnEIvowFRtlwNKvso1'
};

// 從API取得購物車資訊
function getCarts() {
  var address = api.address,
    apiPath = api.apiPath;
  return axios.get("".concat(address, "/customer/").concat(apiPath, "/carts")).then(function (res) {
    renderCart(res.data);
  })["catch"](function (err) {
    console.log(err.response.data.message);
  });
}
;

// 增加到購物車
function addCart(obj) {
  var address = api.address,
    apiPath = api.apiPath;
  axios.post("".concat(address, "/customer/").concat(apiPath, "/carts"), obj).then(function (res) {
    renderCart(res.data);
    jumpAlert('已加入購物車', 'success');
  })["catch"](function (err) {
    console.log(err);
  });
}
;

// 刪除購物車單項產品
function deleteProduct(id) {
  var address = api.address,
    apiPath = api.apiPath;
  axios["delete"]("".concat(address, "/customer/").concat(apiPath, "/carts/").concat(id)).then(function (res) {
    renderCart(res.data);
    jumpAlert('已刪除', 'warning');
  })["catch"](function (err) {
    console.log(err);
  });
}
;

// 刪除購物車全部產品
function deleteAllProduct() {
  var address = api.address,
    apiPath = api.apiPath;
  axios["delete"]("".concat(address, "/customer/").concat(apiPath, "/carts")).then(function (res) {
    console.log(res.data);
    renderCart(res.data);
    jumpAlert(res.data.message, 'warning');
  })["catch"](function (err) {
    console.log(err);
  });
}
;

// 購物車商品數量修改
function patchCartProduct(obj) {
  var address = api.address,
    apiPath = api.apiPath;
  axios.patch("".concat(address, "/customer/").concat(apiPath, "/carts"), obj).then(function (res) {
    console.log(res.data);
    renderCart(res.data);
    jumpAlert('商品數量修改完成', 'success');
  })["catch"](function (err) {
    console.log(err);
  });
}
;

// 送出訂單
function postOrder(obj) {
  var address = api.address,
    apiPath = api.apiPath;
  axios.post("".concat(address, "/customer/").concat(apiPath, "/orders"), obj).then(function (res) {
    console.log(res);
    console.log(res.data);
    // 清除表單input
    form.reset();
    // 取得購物車資料，並渲染
    getCarts();
    jumpAlert('訂單送出完成', 'success');
  })["catch"](function (err) {
    console.log(err);
  });
}
;

// init
_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
  var address, apiPath, getProducts, result;
  return _regeneratorRuntime().wrap(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          address = api.address, apiPath = api.apiPath;
          _context.prev = 1;
          _context.next = 4;
          return axios.get("".concat(address, "/customer/").concat(apiPath, "/products"));
        case 4:
          getProducts = _context.sent;
          result = getProducts.data;
          productsData = result === null || result === void 0 ? void 0 : result.products;
          renderProducts(productsData);
          _context.next = 10;
          return getCarts();
        case 10:
          _context.next = 15;
          break;
        case 12:
          _context.prev = 12;
          _context.t0 = _context["catch"](1);
          throw _context.t0;
        case 15:
        case "end":
          return _context.stop();
      }
    }
  }, _callee, null, [[1, 12]]);
}))();
//# sourceMappingURL=index.js.map

let productsData = [];

/*-----選擇器部分-----*/
// 產品篩選<select>
const productSelect = document.getElementsByClassName('productSelect')[0];

// 全部產品清單
const productWrap = document.getElementsByClassName('productWrap')[0];

// 購物車區塊
const shoppingCartTable = document.getElementsByClassName('shoppingCart-table')[0];

// 加入購物車
const productCard = document.getElementsByClassName('productCard');

// 加入購物車Dialog
const dialog = document.getElementsByTagName("dialog")[0];

// 購物車單項清除
const discardBtn = {}; 

// 彈跳視窗
const cartDailog = document.getElementsByTagName('dialog')[0];

// form區塊
const form = document.querySelector('.orderInfo-form');

// form input collection
const formInput = document.querySelectorAll('.orderInfo-input');


/*-----監聽部分-----*/

// 產品篩選<select>
productSelect.addEventListener('change', (e) => {
  console.log(e.target.value);
  const resultProduct = productsData.filter(item => e.target.value === item.category || e.target.value === '');
  renderProducts(resultProduct);
});

// 加入購物車
productWrap.addEventListener('click', (e) => {
  const ProductTitle = e.target.nextElementSibling.innerText;
  e.preventDefault();
  const resultID = productsData.filter(item => ProductTitle === item.title )[0].id;
  console.log(resultID);
  const addCartData = { data: { productId: resultID, quantity: 1 } };
  console.log(addCartData);
  addCart(addCartData);
  getCarts();
});

// 購物車單項、全部清除
shoppingCartTable.addEventListener('click', (e) => {
  e.preventDefault(); 
  if (e.target.innerText !== 'clear' && e.target.innerText !== '刪除所有品項') return;
  console.log(e.target.innerText);
  const productId = e.target.getAttribute('data-id'); // 取得id
  e.target.innerText === 'clear' ? deleteProduct(productId) : e.target.innerText === '刪除所有品項' ? deleteAllProduct() : ``;
});

// 修改購物車數量
shoppingCartTable.addEventListener('change', (e) => {
  if (e.target.value !== 0 && e.target.innerText === 'clear' && e.target.innerText === '刪除所有品項') return;
  const targetId = e.target.getAttribute('data-id');
  const targetNum = +e.target.value;
  const patchData = { data: { id: targetId, quantity: targetNum } };
  console.log(targetId, targetNum, patchData);
  patchCartProduct(patchData);
});

// 送出訂單
form.addEventListener('click', (e) => {
  e.preventDefault();
  // validate驗證表單輸入有異常，return跳出監聽
  if (inputValidate('boolean')) return;
  if (e.target.type === 'submit') {
    let objOrder = { data: { user: {} } };
    ['name', 'tel', 'email', 'address', 'payment'].forEach((item, index) => {
      objOrder.data.user[item] = formInput[index].value;
    });
    postOrder(objOrder);
  };
})

/*----- 渲染部分-----*/

// 渲染產品
function renderProducts(productsData) {
  // 帶入參數為undefined，或帶入參數資料長度為0就return跳出
  if (productsData === undefined || productsData.length === 0) {
    productWrap.innerHTML = `<h1>無法取得商品資料</h1>`;
    return;    
  };
  let str = '';
  productsData.forEach(({category, images, title, price, origin_price} = item, index) => {
    str += `<li class="productCard">
        <h4 class="productType">${category}</h4>
        <img src="${images}" alt="img-${index}">
        <a href="#" class="addCardBtn">加入購物車</a>
        <h3>${title}</h3>
        <del class="originPrice">NT$${ thousandths(origin_price) }</del>
        <p class="nowPrice">NT$${ thousandths(price) }</p>
      </li>`;
    });
  productWrap.innerHTML = str;
};

// 渲染購物車商品
function renderCart(cartData) {
  if (cartData === undefined) {
    shoppingCartTable.innerHTML = `<h1>無法取得購物車資料</h1>`;
    return;
  } else if (cartData.carts.length === 0 ) {
    shoppingCartTable.innerHTML = `<h1>購物車已清空</h1>`;
    return;
  };
  // 購物車清單開頭
  const tableStart = `<tr>
          <th width="40%">品項</th>
          <th width="15%">單價</th>
          <th width="15%">數量</th>
          <th width="15%">金額</th>
          <th width="15%"></th>
        </tr>`;
  let tableBody = '';
  const { carts, finalTotal } = cartData;
  // 跑forEach把購物車商品渲染出來
  carts.forEach(({ product, quantity, id } = item, index) => {
    // 購物車產品項目，樣板字面值累加forEach結果
    tableBody += 
    `<tr>
      <td>
        <div class="cardItem-title">
          <img src="${ product.images}" alt="cart-${index}">
          <p>${product.title}</p>
        </div>
      </td>
      <td>NT$${thousandths(product.price)}</td>
      <td>
        <select name="" class="numSelect" id="numSelect" value="${quantity}" data-id="${id}"> 
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>
      </td>
      <td>NT$${thousandths(product.price * quantity)}</td>
      <td class="discardBtn">
        <a href="#" class="material-icons" data-num="${index}" data-id="${id}">clear</a>
      </td>
    </tr>`;
  });
  // 購物車清單結尾
  const tableEnd = `<tr>
          <td>
            <a href="#" class="discardAllBtn">刪除所有品項</a>
          </td>
          <td></td>
          <td></td>
          <td>
            <p>總金額</p>
          </td>
          <td>NT$${thousandths(finalTotal)}</td>
        </tr>`;
  shoppingCartTable.innerHTML = tableStart + tableBody + tableEnd;
  // 購物車渲染完成後，選擇所有商品的數量<select>
  const numSelect = document.querySelectorAll('.numSelect');
  // forEach再把購物車資料內，每項商品數量賦予給數量<select>的value
  carts.forEach(({ quantity } = item, index) => {
    numSelect[index].value = quantity;
  });
};


/*----- 其他部分-----*/

// 千分位
function thousandths(price) {
  let arrayPrice = price.toString().split('');
  if (arrayPrice.length < 4) return price;
  if (arrayPrice.length >= 4) {
    arrayPrice.splice(-3, 0, ',');
    return arrayPrice.join('');
  };
};

// 回傳validate驗證
// 帶入參數'boolean'回傳true/false。
// 帶入參數'obj'回傳validate的結果。
function inputValidate(select) {
  // 把validate的結果取key值，有key值回傳true，無key值回傳false
  // validate的結果若沒回傳，用空物件取代避免 Object.keys()異常
  const length = Object.keys(validate(form, constraints) || {}).length ? true : false;
  return select === 'boolean' ? length : select === 'obj' ? validate(form, constraints) : false;
};

/*----- Validators 輸入驗證-----*/
var constraints = {
  姓名: {
    presence: {
      message: "是必填欄位",
    },
    length: {
      minimum: 2,
      message: "輸入至少2個字",
    },
  },
  電話: {
    presence: {
      message: "是必填欄位",
    },
    length: {
      minimum: 8,
      message: "號碼需超過 8 碼",
    },
  },
  Email: {
    presence: {
      message: "是必填欄位",
    },
    email: {
      message: "格式有誤",
    },
  },
  寄送地址: {
    presence: {
      message: "是必填欄位",
    },
  },
};

formInput.forEach(item => {
  item.addEventListener('blur', (e) => {
    // validate的結果賦予給變數errors
    let errors = inputValidate('obj');
    item.nextElementSibling.textContent = '';
    // 若errors無資料，return跳出
    if (!errors) return;  
    Object.keys(errors).forEach(key => {
      // 選擇器選取(data-message)屬性，及屬性值（errors的key值
      // 並賦予errors對應key值的值
      document.querySelector(`[data-message="${key}"]`).textContent = errors[key];
    });
  })
});
/*----- API部分-----*/

// API資訊
const api = {
  address: 'https://livejs-api.hexschool.io/api/livejs/v1',
  apiPath: 'ron812',
  token: 'cFphZ0CBhIMnEIvowFRtlwNKvso1',
};

// 從API取得購物車資訊
function getCarts() {
  const { address, apiPath } = api;
  return axios.get(`${address}/customer/${apiPath}/carts`)
    .then((res) => {
      renderCart(res.data);
    })
    .catch((err) => {
      console.log(err.response.data.message);
    });
};

// 增加到購物車
function addCart(obj) {
  const { address, apiPath } = api;
  axios.post(`${address}/customer/${apiPath}/carts`, obj)
    .then((res) => {
      renderCart(res.data);
      jumpAlert('已加入購物車', 'success');
    })
    .catch((err) => {
      console.log(err);
    });
};

// 刪除購物車單項產品
function deleteProduct(id) {
  const { address, apiPath } = api;
  axios.delete(`${address}/customer/${apiPath}/carts/${id}`)
    .then((res) => {
      renderCart(res.data);
      jumpAlert('已刪除', 'warning');
    })
    .catch((err) => {
      console.log(err);
    });
};

// 刪除購物車全部產品
function deleteAllProduct() {
  const { address, apiPath } = api;
  axios.delete(`${address}/customer/${apiPath}/carts`)
    .then((res) => {
      console.log(res.data);
      renderCart(res.data);
      jumpAlert(res.data.message, 'warning');
    })
    .catch((err) => {
      console.log(err);
    });
};

// 購物車商品數量修改
function patchCartProduct(obj) {
  const { address, apiPath } = api;
  axios.patch(`${address}/customer/${apiPath}/carts`, obj)
    .then((res) => {
      console.log(res.data);
      renderCart(res.data)
      jumpAlert('商品數量修改完成', 'success');
    })
    .catch((err) => {
      console.log(err);
    });
};

// 送出訂單
function postOrder(obj) {
  const { address, apiPath } = api;
  axios.post(`${address}/customer/${apiPath}/orders`, obj)
    .then((res) => {
      console.log(res);
      console.log(res.data);
      // 清除表單input
      form.reset();
      // 取得購物車資料，並渲染
      getCarts();
      jumpAlert('訂單送出完成', 'success');
    })
    .catch((err) => {
      console.log(err);
    });
};



// init
(async () => {
  const { address, apiPath } = api;
  try {
    const getProducts = await axios.get(`${address}/customer/${apiPath}/products`);
    const { data: result } = getProducts;
    productsData = result?.products;
    renderProducts(productsData);
    await getCarts();
  } catch (error) {
    throw (error);
  }
})();
let data;


/*-----選擇器部分-----*/
// order區塊
const orderPageSection = document.querySelector('.orderPage-list');

// order清單區塊
const orderPageTable = document.querySelector('.orderPage-table');

// order狀態
const orderStatus = document.querySelector('.orderStatus');

// 清除全部訂單btn
const discardAllBtn = document.querySelector('.discardAllBtn');


/*----- 監聽部分-----*/

// 改變訂單狀態
orderPageTable.addEventListener('click', e => {
  e.preventDefault();
  if (e.target.tagName !== 'A') return;
  let { id, paid } = e.target.dataset;
  let putData = {
    "data": {
      "id": id,
      "paid": paid === 'true' ? false : true,
    },
  };
  changeOrder(putData); 
});

// 刪除單項訂單
orderPageTable.addEventListener('click', e => {
  if (e.target.value !== '刪除') return;
  const { id } = e.target.dataset;
  deleteOrder(id);
});

// 清除全部訂單
discardAllBtn.addEventListener('click', e => {
  if (e.target.textContent !== '清除全部訂單') return;
  deleteAllOrder();
});

/*----- 渲染部分-----*/

// 訂單渲染
function renderOrder(orders) {
  const thead = `
  <thead>
    <tr>
      <th>訂單編號</th>
      <th>聯絡人</th>
      <th>聯絡地址</th>
      <th>電子郵件</th>
      <th>訂單品項</th>
      <th>訂單日期</th>
      <th>訂單狀態</th>
      <th>操作</th>
    </tr>
  </thead>`;
  let tbody = ``;
  orders.forEach(({ user, paid, id, products, createdAt } = item) => {
    const {name, tel, address, email} = user;
    tbody += `
      <tr>
        <td>${ createdAt }</td>
        <td>
          <p>${ name }</p>
          <p>${ tel }</p>
        </td>
        <td>${ address }</td>
        <td>${ email }</td>
        <td>
          ${ takeoutOrderItem(products) }
        </td>
        <td>${ convertDate(createdAt) }</td>
        <td class="orderStatus">
          <a href="#" data-id="${id}" data-paid="${paid}" style="color:${paid ? 'green' : 'red'}">${paid ? '已處理' : '未處理'}</a>
        </td>
        <td>
          <input type="button" class="delSingleOrder-Btn" value="刪除"  data-id="${id}">
        </td>
      </tr>`;
	});
  orders.length ? 
  orderPageTable.innerHTML = thead + tbody : orderPageSection.innerHTML = `<h1 style="font-size:32px; text-align:center">目前後台無訂單</h1>`;
  
}

/*----- 其他部分-----*/

// 轉換日期
function convertDate(code) {
	const time = new Date(code * 1000);
	let months = "1月,2月,3月,4月,5月,6月,7月,8月,9月,10月,11月,12月".split(",");
	let weekdays = "星期日,星期一,星期二,星期三,星期四,星期五,星期六".split(",");
	return `${time.getFullYear()}年/${months[time.getMonth()]}/${time.getDate()}/${weekdays[time.getDay()]}`;
};

// 訂單品項
function takeoutOrderItem(products) {
  let titleStr = ``;
  for (const item of products) {
    titleStr += `<p>${item.title} / 數量:${item.quantity}</p>`;
  };
  return titleStr;
};

// 建立c3圖表需要的資料
function createChartData(data) {
  let saleItem = {};
  let chartData = {
    color: {},
    data: [],
  };
  let otherAcc = 0;
  // 將購物車所有品項列出，並計算數量，放置在物件saleItem
  data.forEach(({ products } = item) => {
    products.forEach(({title, quantity} = item) => {
      if (saleItem[title] === undefined) {
        saleItem[title] = quantity;
      } else {
        saleItem[title] += quantity;
      };
    });
  });
  // 將物件saleItem的屬性、值，轉為陣列
  Object.keys(saleItem).forEach(item => {
    let ary = [];
    ary[0] = item;
    ary[1] = saleItem[item];
    chartData.data.push(ary);
  });
  // 依照陣列chartData.data的item[1]去排列順序由大到小
  chartData.data.sort((a, b) => {
    // 由大到小排列
    return b[1] - a[1];
  });
  // 把chartData.data index[3]含以後的值累加起來，再push回chartData.data
  chartData.data.forEach((item, index) => {
    index >= 3 ? otherAcc += item[1] : '';
  });
  chartData.data.push(['其他', otherAcc]);
  // 只取前三位和最後一位的資料（保留chartData.data的index[0]~index[2]還有index[chartData.data.length]）
  // chartData.data的index[3]~index[chartData.data.length - 4]刪除
  chartData.data.splice(3, chartData.data.length - 4);
  // 圖表顏色
  chartData.data.forEach((item, index) => {
    index === 0 ? chartData.color[item[0]] = '#5151D3' : index === 1 ? chartData.color[item[0]] = '#26C0C7' : index === 2 ? chartData.color[item[0]] = '#E68618' : index === 3 ? chartData.color[item[0]] = '#E6b618' : ``;
  });
  chartData.chartTitle = '全品項營收比重';
  renderC3(chartData);
};

// 渲染C3圖表
function renderC3(c3Data) {
  // 解構賦值
  const { data, color, chartTitle } = c3Data;
  let chart = c3.generate({
    bindto: '#chart',
    data: {
      type: 'donut',
      columns: data,
      colors: color,
    },
    donut: {
      title: chartTitle,
    },
  });
}

/*----- API部分-----*/

// API資訊
const api = {
	address: 'https://livejs-api.hexschool.io/api/livejs/v1',
	apiPath: 'ron812',
	token: 'cFphZ0CBhIMnEIvowFRtlwNKvso1',
};

// 改變訂單狀態
function changeOrder(obj) {
  const { address, apiPath } = api;
  axios.put(`${address}/admin/${apiPath}/orders`, obj)
    .then((res) => {
      const { orders } = res.data;
      renderOrder(orders);
      jumpAlert('已更改訂單狀態', 'success');
    })
    .catch((err) => {
      console.log(err);
    });
};


// 刪除單項訂單
function deleteOrder(id) {
  const { address, apiPath } = api;
  axios.delete(`${address}/admin/${apiPath}/orders/${id}`)
    .then((res) => {
      const { orders } = res.data;
      renderOrder(orders);
      createChartData(orders);
      jumpAlert('已刪除訂單', 'warning');
    })
    .catch((err) => {
      console.log(err);
    });
};


// 刪除全部訂單
function deleteAllOrder() {
  const { address, apiPath } = api;
  axios.delete(`${address}/admin/${apiPath}/orders`)
    .then((res) => {
      const { orders, message } = res.data;
      renderOrder(orders);
      createChartData(orders);
      jumpAlert(message, 'warning');
    })
    .catch((err) => {
      console.log(err);
    });
};

// init
(async () => {
	const { address, apiPath, token } = api;
	try {
		axios.defaults.headers.common['Authorization'] = token;
		const getOrders = await axios.get(`${address}/admin/${apiPath}/orders`);
		const { data:{orders} } = getOrders;
    console.log(orders);
    data = orders;
    createChartData(orders);
    renderOrder(orders);
	} catch (error) {
    console.log(error);
	};
})();

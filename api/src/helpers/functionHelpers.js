/* eslint-disable no-continue */
/* eslint-disable max-len */
/* eslint-disable no-restricted-globals */
/* eslint-disable radix */
const verifyNumber = (params, type = 'numero') => {
  if (!params) {
    return {
      veracity: false, msg: `${type} no encontrado/a`,
    };
  }
  if (parseInt(params) === 'NaN' || isNaN(params)) {
    return {
      veracity: false, msg: `${type} no es válido/a`,
    };
  }
  const number = parseInt(params);
  if (number < 0) {
    return {
      veracity: false, msg: `${type} debe ser positivo/a`,
    };
  }
  return {
    veracity: true,
  };
};

const verifyArray = (params) => {
  if (!params || !params.length || params[0] === '') return false;
  return true;
};

const verifyString = (param) => {
  const string = param.trim();

  if (string.length === 0) {
    return false;
  }
  return true;
};

const sortOrdersForAnalytics = (dbArray) => {
  const sortedArray = [];
  for (let i = 0; i < dbArray.length; i += 1) {
    if (dbArray[i]) {
      const ordersOfSameDate = {
        total: 0,
        endTimestamp: dbArray[i].endTimestamp.toISOString().substr(0, 10),
      };
      for (let j = i; j < dbArray.length; j += 1) {
        if (dbArray[j] !== null
          && dbArray[j].endTimestamp.toISOString().substr(0, 10) === ordersOfSameDate.endTimestamp) {
          ordersOfSameDate.total += dbArray[j].total;
          dbArray[j] = null;
        }
      }
      sortedArray.push(ordersOfSameDate);
    }
  }
  return sortedArray;
};

const sortOrdersByProductsForAnalytics = (dbArray) => {
  const sortedArray = [];
  for (let i = 0; i < dbArray.length; i += 1) {
    if (dbArray[i]) {
      const ordersOfSameDate = {
        products: [],
        endTimestamp: dbArray[i].endTimestamp.toISOString().substr(0, 10),
      };
      for (let j = i; j < dbArray.length; j += 1) {
        if (dbArray[j] !== null
          && dbArray[j].endTimestamp.toISOString().substr(0, 10) === ordersOfSameDate.endTimestamp) {
          ordersOfSameDate.products = ordersOfSameDate.products.concat(dbArray[j].products);
          dbArray[j] = null;
        }
      }
      sortedArray.push(ordersOfSameDate);
    }
  }

  const productsByIdByDate = [];
  for (let i = 0; i < sortedArray.length; i += 1) {
    const productsByDate = {
      products: [],
      endTimestamp: sortedArray[i].endTimestamp,
    };
    for (let j = 0; j < sortedArray[i].products.length; j += 1) {
      if (sortedArray[i].products[j]) {
        const productByDate = {
          id: sortedArray[i].products[j].id,
          name: sortedArray[i].products[j].name,
          total: 0,
        };
        for (let k = j; k < sortedArray[i].products.length; k += 1) {
          if (sortedArray[i].products[k] && sortedArray[i].products[k].id === productByDate.id) {
            productByDate.total += sortedArray[i].products[k].orderline.subtotal;
            sortedArray[i].products[k] = null;
          }
        }
        productsByDate.products.push(productByDate);
      }
    }
    productsByIdByDate.push(productsByDate);
  }
  const productsByIdByDateSorted = productsByIdByDate.sort((x, y) => {
    if (Number(x.endTimestamp.substr(8, 10)) > Number(y.endTimestamp.substr(8, 10))) return 1;
    if (Number(x.endTimestamp.substr(8, 10)) < Number(y.endTimestamp.substr(8, 10))) return -1;
    return 0;
  });
  return productsByIdByDateSorted;
};

module.exports = {
  verifyNumber,
  verifyArray,
  verifyString,
  sortOrdersForAnalytics,
  sortOrdersByProductsForAnalytics,
};

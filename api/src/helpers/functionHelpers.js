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
  const ordersGroupedByDate = [];
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
      ordersGroupedByDate.push(ordersOfSameDate);
    }
  }
  const ordersSortedByDate = ordersGroupedByDate.sort((x, y) => {
    if (Number(x.endTimestamp.substr(8, 10)) > Number(y.endTimestamp.substr(8, 10))) return 1;
    if (Number(x.endTimestamp.substr(8, 10)) < Number(y.endTimestamp.substr(8, 10))) return -1;
    return 0;
  });
  return ordersSortedByDate;
};

module.exports = {
  verifyNumber,
  verifyArray,
  verifyString,
  sortOrdersForAnalytics,
};

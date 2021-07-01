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

const verifyDate = (param) => {
  const paramSplit = param.split('-');
  console.log(param);
  console.log(paramSplit);
  const response = {
    veracity: false,
  };
  if (!paramSplit.length || param.split.length > 2) {
    response.msg = 'El formato fecha es inválido';
    return response;
  }
  if (parseInt(paramSplit[0]) === 'NaN' || isNaN(paramSplit[0])
  || paramSplit[0].length !== 4
  || parseInt(paramSplit[0]) < 2021 || parseInt(paramSplit[0]) > 9999) {
    response.msg = 'El formato año es inválido';
    return response;
  }
  if (parseInt(paramSplit[1]) === 'NaN' || isNaN(paramSplit[1])
  || paramSplit[1].length !== 2
  || parseInt(paramSplit[1]) < 1 || parseInt(paramSplit[1]) > 12) {
    response.msg = 'El formato mes es inválido';
    return response;
  }
  response.veracity = true;
  return response;
};

const sortOrdersForAnalytics = (dbArray, date) => {
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

  const ordersFilteredByDate = ordersGroupedByDate.filter(
    (order) => order.endTimestamp.substr(0, 7) === date,
  );
  const ordersSortedByMinMaxDate = ordersFilteredByDate.sort((x, y) => {
    if (Number(x.endTimestamp.substr(8, 2)) > Number(y.endTimestamp.substr(8, 2))) return 1;
    if (Number(x.endTimestamp.substr(8, 2)) < Number(y.endTimestamp.substr(8, 2))) return -1;
    return 0;
  });
  return ordersSortedByMinMaxDate;
};

module.exports = {
  verifyNumber,
  verifyArray,
  verifyString,
  verifyDate,
  sortOrdersForAnalytics,
};

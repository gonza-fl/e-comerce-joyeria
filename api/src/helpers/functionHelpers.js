/* eslint-disable no-restricted-globals */
/* eslint-disable radix */
const verifyNumber = (params, type = 'numero') => {
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
module.exports = {
  verifyNumber,
  verifyArray,
};

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

module.exports = {
  verifyNumber,
  verifyArray,
  verifyString,
};

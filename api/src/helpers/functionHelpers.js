/* eslint-disable no-restricted-globals */
/* eslint-disable radix */
const verifyNumber = (params) => {
  if (parseInt(params) === 'NaN' || isNaN(params)) return false;
  const number = parseInt(params);
  if (number < 0) return false;
  return true;
};
const verifyArray = (params) => {
  if (!params || !params.length || params[0] === '') return false;
  return true;
};
module.exports = {
  verifyNumber,
  verifyArray,
};

/* eslint linebreak-style: ["error", "windows"] */

export const sortNameAsc = (arr) => arr.sort((a, b) => {
  if (a.name.toUpperCase() > b.name.toUpperCase()) return 1;
  if (a.name.toUpperCase() < b.name.toUpperCase()) return -1;
  return 0;
});

export const sortNameDesc = (arr) => arr.sort((a, b) => {
  if (a.name.toUpperCase() < b.name.toUpperCase()) return 1;
  if (a.name.toUpperCase() > b.name.toUpperCase()) return -1;
  return 0;
});

export const sortAscending = (arr, prop) => arr.sort((a, b) => {
  if (Number(a[prop]) > Number(b[prop])) return 1;
  if (Number(a[prop]) < Number(b[prop])) return -1;
  return 0;
});

export const sortDescending = (arr, prop) => arr.sort((a, b) => {
  if (Number(a[prop]) < Number(b[prop])) return 1;
  if (Number(a[prop]) > Number(b[prop])) return -1;
  return 0;
});

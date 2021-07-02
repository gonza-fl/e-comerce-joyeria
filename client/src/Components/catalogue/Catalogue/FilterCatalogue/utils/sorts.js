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

const calculateReview = (reviews) => {
  if (!reviews.length) return 0;
  return Math.floor(
    reviews.map(
      (rev) => rev.calification,
    ).reduce((a, b) => a + b, 0) / reviews.length,
  );
};

export const sortStarAscending = (arr) => arr.sort((a, b) => {
  if (calculateReview(a.reviews) > calculateReview(b.reviews)) return 1;
  if (calculateReview(a.reviews) < calculateReview(b.reviews)) return -1;
  return 0;
});

export const sortStarDescending = (arr) => arr.sort((a, b) => {
  if (calculateReview(a.reviews) < calculateReview(b.reviews)) return 1;
  if (calculateReview(a.reviews) > calculateReview(b.reviews)) return -1;
  return 0;
});

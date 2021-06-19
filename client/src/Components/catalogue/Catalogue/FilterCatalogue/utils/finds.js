/* eslint linebreak-style: ["error", "windows"] */
export const findByPrice = (arr, max, min) => {
  arr.filter(
    (product) => (Number(product.price) >= Number(min) && Number(product.price) <= Number(max)),
  );
};

export const findByStars = (arr, stars) => {
  arr.filter((product) => Number(product.review) === stars);
};

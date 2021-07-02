/* eslint-disable arrow-body-style */
/* eslint-disable arrow-parens */
/* eslint-disable padded-blocks */
/* eslint-disable semi */
/* eslint-disable max-len */

export const findByPrice = (arr, max, min) => {

  return arr.filter(product => (Number(product.price) >= Number(min) && Number(product.price) <= Number(max)))
}

export const findByStars = (arr, stars) => {

  return arr.filter((product) => Math.floor(product.reviews.map((rev) => rev.calification).reduce((a, b) => a + b, 0) / product.reviews.length) === stars)
}

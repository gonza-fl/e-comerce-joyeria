
export const findByPrice = (arr,max,min) => {

   return arr.filter(product => (Number(product.price) >= Number(min) && Number(product.price) <= Number(max) ) )
}

export const findByStars = (arr,stars) =>{
    
    return arr.filter(product => Number(product.review) === stars)
}
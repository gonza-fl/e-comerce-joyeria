export function addToCart(product) {
  const prodAmount = { ...product, amount: 1 };
  if (localStorage.getItem('cart')) {
    const sinJson = JSON.parse(localStorage.getItem('cart'));
    const equal = sinJson;
    const sinProductAmount = equal.map((p) => {
      const container = { ...p, amount: 1 }; return container;
    });
    //
    if (sinProductAmount.some((p) => p.id === prodAmount.id)) {
      const sinJson2 = sinJson;
      const posic = sinProductAmount.map((el) => el.id);
      const indx = posic.indexOf(prodAmount.id);
      sinJson2[indx].amount += 1;
      localStorage.setItem('cart', JSON.stringify(sinJson2));
    } else { localStorage.setItem('cart', JSON.stringify(sinJson.concat(prodAmount))); }
  } else {
    const arr = [];
    const array = arr.concat(prodAmount);
    localStorage.setItem('cart', JSON.stringify(array));
  }
}

export function takeFromCart(product) {
  const sinJson = JSON.parse(localStorage.getItem('cart'));
  const prodAmount = { ...product, amount: 1 };
  const equal = sinJson;
  const sinProductAmount = equal.map((p) => {
    const container = { ...p, amount: 1 }; return container;
  });
  const posic = sinProductAmount.map((el) => el.id);
  const indx = posic.indexOf(prodAmount.id);
  if (sinJson[indx].amount > 1) {
    sinJson[indx].aumount -= 1;
    localStorage.setItem('cart', JSON.stringify(sinJson));
  } else { localStorage.setItem('cart', JSON.stringify(sinJson.splice(indx, 1))); }
}

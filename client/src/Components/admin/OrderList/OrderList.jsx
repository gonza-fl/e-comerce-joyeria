import React from 'react';
import './orderList.css';
// lista deberia traer el axios.get para traer las ordenes de compra previa

function OrderList() {
  function handleClick(id) {
    const modal = document.getElementById(`${id}`);
    if (modal.style.display === 'none') { (modal.style.display = 'block'); } else { modal.style.display = 'none'; }
  }

  const lista = [{
    productos: [{ name: 'pulserita', precio: 200, amount: 3 }, { name: 'collar', precio: 3000, amount: 1 }, { name: 'arete', precio: 2003, amount: 2 }], precioFinal: 7603, userId: 1, userName: 'pamela', status: 'Pago Confirmado',
  },
  {
    productos: [{ name: 'collar', precio: 3000, amount: 1 }], precioFinal: 3000, userId: 2, userName: 'Franchesca', status: 'Pago Confirmado',
  },
  {
    productos: [{ name: 'pulsera', precio: 200, amount: 1 }], precioFinal: 200, userId: 3, userName: 'Carla', status: 'entregado',
  },
  {
    productos: [{ name: 'blusa', precio: 900, amount: 2 }], precioFinal: 1800, userId: 5, userName: 'pamela', status: 'entregado',
  },

  ];
  return (
    <div className="containerDiv">
      {lista.map((o) => (
        <div className="orderContainer">
          <p>{o.userName}</p>
          <span>
            $
            {' '}
            {o.precioFinal}
            {', '}
          </span>
          <span>{o.status}</span>
          <button type="button" onClick={() => handleClick(o.userId)}> ver detalle </button>
          <div id={o.userId} className="hidden">
            {o.productos.map((p) => (
              <div>
                <span className="span">
                  {' '}
                  {p.name}
                  {' - '}
                </span>
                <span className="span">
                  {' '}
                  cantidad
                  {' '}
                  {p.amount}
                </span>
                <span className="span">
                  {' - '}
                  subtotal
                  {' '}
                  {p.precio * p.amount}
                </span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
export default OrderList;

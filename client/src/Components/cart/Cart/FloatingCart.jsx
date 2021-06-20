import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { showFloatingCart } from '../../../redux/actions/actions';

function FloatingCart() {
  const dispatch = useDispatch();
  const showCart = useSelector((state) => state.floatingCart);
  const [cartProducts, setCartProducts] = useState([]);
  useEffect(() => {
    setCartProducts(JSON.parse(localStorage.getItem('cart')));
  }, [JSON.parse(localStorage.getItem('cart'))]);

  function removeFromCart(id) {
    const updatedCart = cartProducts.filter((p) => p.id !== id);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  }

  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }

  if (cartProducts && cartProducts.length !== 0) {
    return (
      <MainContainer
        style={{ display: showCart }}
        className="bg-color-six"
        onMouseEnter={() => dispatch(showFloatingCart('inline'))}
        onMouseLeave={() => dispatch(showFloatingCart('none'))}
      >
        <div>
          {cartProducts.map((p) => (
            <ProductCardCart>
              <img src={p.images[0].url} alt="Not found" height="50px" width="50px" />
              <div style={{ textAlign: 'left', marginLeft: '15px', flexGrow: 2 }}>
                <span>{p.name}</span>
                <span>{`  x ${p.amount}`}</span>
                <br />
                <b>{numberWithCommas(p.price * p.amount)}</b>
              </div>
              <div style={{ flexGrow: 1, textAlign: 'right' }}>

                <RemoveButton type="button" onClick={() => removeFromCart(p.id)}>
                  <a href="/products" className="link-without-styles">
                    x
                  </a>
                </RemoveButton>

              </div>
            </ProductCardCart>
          ))}
        </div>
        <SubTotal className="bg-color-three">
          <b>
            SUBTOTAL:
            {' '}
            {`$${numberWithCommas(cartProducts.map((product) => product.price).reduce((sum, p) => sum + p))}`}
          </b>
        </SubTotal>
        <a href="/cart" className="link-without-styles">
          <GotoCart type="button" className="bg-color-three">Ir al carrito</GotoCart>
        </a>
      </MainContainer>
    );
  }
  return (
    <MainContainer
      style={{ display: showCart }}
      className="bg-color-six"
      onMouseEnter={() => dispatch(showFloatingCart('inline'))}
      onMouseLeave={() => dispatch(showFloatingCart('none'))}
    >
      <div>
        <h4>No tienes productos agregados al carrito</h4>
      </div>
      <SubTotal className="bg-color-three">
        <b>
          SUBTOTAL: $ 0
        </b>
      </SubTotal>
      <a href="/cart" className="link-without-styles">
        <GotoCart type="button" className="bg-color-three">
          Ir al carrito
        </GotoCart>
      </a>
    </MainContainer>
  );
}

const MainContainer = styled.div`
    position: absolute;
    top: 10vh;
    right: 3vw;
    padding: 5px 10px;
    box-shadow: -2px 3px 13px -2px #000000;
    animation: transitionIn 600ms;
    z-index: 10;

    @keyframes transitionIn {
        from {
            opacity: 0;
            transform: rotateX(-10deg);
        }
    
        to {
            opacity: 1;
            transform: rotateX(0);
        }
    }
`;

const SubTotal = styled.div`
    padding: 10px 5px;
`;

const ProductCardCart = styled.div`
    display: flex;
    align-items: center;
    width: 250px;
    margin-bottom: 10px;

    &:hover {
        background-color: #dfdcd1;
    }
`;

const RemoveButton = styled.button`
    border-style: none;
    font-size: 15px;
    background-color: inherit;
    &:hover {
        cursor: pointer;
    }
`;

const GotoCart = styled.button`
    width: 100%;
    border-style: none;
    padding: 10px 20px;
    margin-top: 10px;
    font-size: 18px;
    font-weight: bold;

    &:hover {
        cursor: pointer;
    }

`;

export default FloatingCart;

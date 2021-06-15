/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FaUserAlt, FaShoppingCart } from 'react-icons/fa';
import styled from 'styled-components';
import SearchBar from './SearchBar/SearchBar';
import Logo from '../../StyledComponents/Logo';
import { getCategories } from '../../../redux/actions/actions';
import './Nav.css';

export default function Nav() {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.categories);

  const [menu, setMenu] = useState('none');

  function showMenu() {
    setMenu('inline');
  }

  function hideMenu() {
    setMenu('none');
  }

  useEffect(() => {
    dispatch(getCategories());
  }, []);

  return (
    <div className="ctnNav bg-color-three">
      <div className="nav bg-color-three">
        <div style={{
          display: 'flex', fontWeight: 'bold', fontSize: '13px', flexGrow: 3,
        }}
        >
          <MenuDiv onMouseEnter={showMenu} onMouseLeave={hideMenu}>
            CATEGORIAS
            <Menu
              data={categories}
              display={menu}
              x="-89px"
              y="28px"
            />
          </MenuDiv>
          <MenuDiv>TIPS</MenuDiv>
          <MenuDiv>ARTE</MenuDiv>
          <MenuDiv>
            NUEVO
          </MenuDiv>

          <MenuDiv>NOSOTROS</MenuDiv>
        </div>
        <div style={{ flexGrow: 1 }}>
          <Logo width="200px" height="150px" style={{ flexGrow: 1 }} />
        </div>
        <div style={{ flexGrow: 1 }}>
          <SearchBar />
        </div>
        <div style={{ flexGrow: 0.1, fontSize: '120%' }}>
          <FaUserAlt />
&ensp;&ensp;
          <FaShoppingCart />
        </div>
      </div>
    </div>
  );
}

function Menu({
  data, display, x, y,
}) {
  return (
    <OptionDiv
      className="bg-color-six"
      style={{ display, transform: `translate(${x}, ${y})` }}
    >
      {data.map((d) => (
        <a href={`/products/${d.id}`} className="link-without-styles" key={d.id}>
          <p style={{ padding: '10px 0px 10px 0px' }}>
            {d.name.toUpperCase()}
            <br />
          </p>
        </a>
      ))}
    </OptionDiv>
  );
}

const MenuDiv = styled.div`
            margin-right: 10px;
            padding: 10px 10px 10px 10px;
            

            &:hover {
                cursor: pointer;
                background-color: #f1eee3;
            }
`;

const OptionDiv = styled.div`
            position: absolute;
            padding: 0px 16px 0px 16px;
            z-index: 99;

            & p:hover{
                color: white;
            }
`;

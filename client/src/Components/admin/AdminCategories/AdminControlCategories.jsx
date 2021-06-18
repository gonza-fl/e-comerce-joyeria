import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { getCategories } from '../../../redux/actions/actions';
import AddCategoryForm from '../AddCategoryForm';
import { deleteCategory } from '../AdminProducts/utils/request';

function AdminControlCategories() {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.categories);

  useEffect(() => {
    dispatch(getCategories());
  }, [categories.length]);
  return (
    <Container>
      <div style={{ marginRight: '50px' }}>
        <h2>Categorías</h2>
        <table style={{ width: '300px' }}>
          <tr>
            <th>ID</th>
            <th>NOMBRE</th>
          </tr>
          {categories.map((c) => (
            <tr className="bg-color-three">
              <td>{c.id}</td>
              <td>{c.name}</td>
              <a href="/admin/controlcategories"><button type="button" onClick={() => deleteCategory(c)}>X</button></a>
            </tr>
          ))}
        </table>
      </div>
      <div>
        <h2>Agregar categoría</h2>
        <AddCategoryForm />
      </div>
    </Container>
  );
}

const Container = styled.div`
    display: flex;
`;

export default AdminControlCategories;

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import swal from 'sweetalert';
import { getCategories, getProducts } from '../../../redux/actions/actions';
import AddCategoryForm from '../AddCategoryForm';
import { deleteCategory } from '../AdminProducts/utils/request';
import './adminCategories.css';

function AdminControlCategories() {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.categories);
  const products = useSelector((state) => state.products);
  const user = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(getCategories());
    dispatch(getProducts());
  }, []);

  function eraseCategory(category) {
    if (!products.filter((p) => p.categories.filter((c) => c.id === category.id)[0])[0]) {
      return deleteCategory(category, user.id);
    }
    return swal('Lo sentimos', 'Esta categoría tiene productos asociados.  Elimina estos productos primero si quieres eliminar la categoría', 'warning');
  }

  return (
    <div className="containner">
      <div className="formulario">
        <h2>Agregar categoría</h2>
        <AddCategoryForm />
      </div>

      <div className="categories">
        <h2>Categorías</h2>
        <table>
          <tr>
            <th>ID</th>
            <th>NOMBRE</th>
          </tr>
          {categories.map((c) => (
            <tr className="bg-color-three" key={c.id}>
              <td>{c.id}</td>
              <td>{c.name}</td>
              <button type="button" onClick={() => eraseCategory(c)}>X</button>
            </tr>
          ))}
        </table>
      </div>
    </div>
  );
}

export default AdminControlCategories;

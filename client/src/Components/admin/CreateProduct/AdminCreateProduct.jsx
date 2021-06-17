import React from 'react';
import styled from 'styled-components';

function AdminCreateProduct() {
  return (
    <CreateProduct>
      <b>Nombre &ensp;&ensp;</b>
      <input name="name" />
      <br />
      <b>Precio &ensp;&ensp;</b>
      <input name="price" />
      <br />
      <b>Número de unidades &ensp;&ensp;</b>
      <input name="stockAmount" />
      <br />
      <input
        type="file"
        name="image"
        accept="image/*"
      />
      <br />
      <b>Descripción &ensp;&ensp;</b>
      <br />
      <textarea name="description" />
      <br />
    </CreateProduct>
  );
}

const CreateProduct = styled.form` 
    justify-content: left;
    text-align: left;
`;

export default AdminCreateProduct;

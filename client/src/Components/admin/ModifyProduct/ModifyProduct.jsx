/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-prototype-builtins */
/* eslint-disable react/prop-types */
/* eslint linebreak-style: ["error", "windows"] */
import React, { useEffect, useState } from 'react';
import swal from 'sweetalert';
import { useSelector } from 'react-redux';
import './modifyProduct.css';
import axios from 'axios';
import { URL_PRODUCTS } from '../../../constants';

function ModifyProduct(props) {
  const [selectedFile, setSelectedFile] = useState([]);
  const [previewSource, setPreviewSource] = useState('');
  const [newProduct, setNewProduct] = useState({
    categories: [],
  });
  const [filled, setFilled] = useState('conEspacio');

  const categories = useSelector((state) => state.categories);

  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewSource(reader.result);
    };
  };

  useEffect(() => {
    setNewProduct({ ...newProduct, image: selectedFile });
  }, [selectedFile]);
  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      if (selectedFile.length < 3) {
        previewFile(file);
        setSelectedFile(selectedFile.concat(reader.result));
      } else {
        setFilled('lleno');
      }
    };
  };

  // const limpiarImagen = () => {
  //   const elemento = document.getElementById('flexQuery');
  //   elemento.style.flexDirection = 'column';
  //   setSelectedFile();
  //   setPreviewSource('');
  // };

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === 'categories') { setNewProduct({ ...newProduct, categories: newProduct.categories.find((e) => e === value) ? newProduct.categories.filter((item) => item !== value) : newProduct.categories.concat(value) }); } else setNewProduct({ ...newProduct, [name]: value });
  };

  const uploadProduct = async () => {
    axios.put(`${URL_PRODUCTS}${props.id}`, newProduct)
      .then((res) => {
        if (res.data.hasOwnProperty('err')) {
          swal('Error', res.data.err, 'warning');
        } else {
          swal('Success', 'Producto modificado!');
        }
      })
      .catch(() => {
        swal('Error', 'Ocurrió un error. No se modificó el producto. Intente nuevamente');
      });
  };

  function enviar(e) {
    e.preventDefault();
    setNewProduct({ ...newProduct, image: selectedFile });

    uploadProduct();
  }

  return (

    <div className="containerModify">
      <div className="divForm bg-color-six">
        <form method="POST" onSubmit={(e) => enviar(e)}>
          <p>Solo se actualizaran los campos rellenados</p>
          <div className="divsInputs">
            <span className="spans">Modificar nombre</span>
            <input type="text" id="nombre" name="name" style={{ marginLeft: '10px', width: '220px' }} onChange={handleChange} />
          </div>
          <div className="divsInputs">
            <span className="spans">Modificar precio:</span>
            <input type="text" id="precio" name="price" style={{ marginLeft: '10px', width: '220px' }} onChange={handleChange} />
          </div>
          <div className="divsInputs">
            <span className="spans">Cantidad de unidades a ingresar:</span>
            <input type="text" id="stockAmount" name="stockAmount" style={{ marginLeft: '10px', width: '220px' }} onChange={handleChange} />
          </div>

          <div className="divsInputs">
            <p className="spanImagen">Nuevas imagenes(debera modificar todas): </p>
            <p className={filled}>maximo de 3 imagenes alcanzado!</p>
            <button type="button" className="imgLabel">

              <label htmlFor="image">insert image </label>

            </button>
            <input type="file" id="image" name="image" accept="image/*" className="insertImg" onChange={handleFileInputChange} />
            <div className="cont">
              <div className="divImg">
                <img id="preview" src={previewSource} alt="" className="imagen image-preview__image" width="200px" />
              </div>
            </div>
          </div>

          <div>
            <p>Nuevas Categorias:</p>
            {categories.map((g) => (
              <div>
                <label htmlFor={g.id} className="gname">{g.name}</label>
                <input type="checkbox" id={g.id} name="categories" value={g.id} className="checkbox" onChange={handleChange} />
              </div>
            ))}
          </div>

          <p className="span">Modificar Descripción</p>

          <textarea placeholder="  Descripcion del producto" id="descripcion" name="description" className="description" onChange={handleChange} />
          <div className="aceptar">
            <input type="submit" value="Aceptar" className="boton bg-color-three" />
          </div>
        </form>
      </div>
    </div>

  );
}

export default ModifyProduct;

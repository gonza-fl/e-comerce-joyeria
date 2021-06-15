/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-prototype-builtins */
import React, { useEffect, useState } from 'react';
import swal from 'sweetalert';
import { useSelector } from 'react-redux';
import './createProduct.css';
import axios from 'axios';
import { URL_PRODUCTS } from '../../../constants';

function CreateProduct() {
  const [selectedFile, setSelectedFile] = useState([]);
  const [previewSource, setPreviewSource] = useState('');
  const [newProduct, setNewProduct] = useState({
    name: '',
    price: 0,
    stockAmount: 0,
    description: '',
    image: [],
    categories: [],
  });
  const [filled, setFilled] = useState('conEspacio');

  const categories = useSelector((state) => state.categories);

  useEffect(() => {
    setNewProduct({ ...newProduct, image: selectedFile });
  }, [selectedFile]);
  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewSource(reader.result);
    };
  };

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      if (selectedFile.length < 3) {
        previewFile(file);
        setSelectedFile((selected) => [...selected, reader.result]);
      } else { setFilled('lleno'); }
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
    axios.post(URL_PRODUCTS, newProduct)
      .then((res) => {
        if (res.data.hasOwnProperty('err')) {
          swal('Error', res.data.err, 'warning');
        } else {
          swal('Success', 'Se creo el producto!');
        }
      })
      .catch(() => {
        swal('Error', 'Ocurrió un error. No se creó el producto. Intente nuevamente');
      });
  };

  function enviar(e) {
    e.preventDefault();

    if (!selectedFile) return swal('Error', 'Debes ingresar una imagen', 'warning');
    if (newProduct.stockAmount.length === 0) {
      return swal('Error', 'El campo del stock debe ser completado', 'warning');
    }
    if (newProduct.price.length === 0) {
      return swal('Error', 'El campo del precio debe ser completado', 'warning');
    }
    if (newProduct.name.length === 0) {
      return swal('Error', 'El campo del nombre debe ser completado', 'warning');
    }
    if (newProduct.categories.length === 0) {
      return swal('Error', 'debe seleccionar almenos una categoria!', 'warning');
    }
    if (newProduct.description.length === 0) {
      return swal('Error', 'El campo descripcion debe ser completado', 'warning');
    }

    return uploadProduct();
  }

  return (
    <div className="container">
      <div className="divForm bg-color-six">
        <form method="POST" onSubmit={(e) => enviar(e)}>
          <div className="divsInputs">
            <span className="spans">Nombre del Producto</span>
            <input type="text" id="nombre" name="name" style={{ marginLeft: '10px', width: '220px' }} onChange={handleChange} />
          </div>
          <div className="divsInputs">
            <span className="spans">Precio del producto:</span>
            <input type="text" id="precio" name="price" style={{ marginLeft: '10px', width: '220px' }} onChange={handleChange} />
          </div>
          <div className="divsInputs">
            <span className="spans">Cantidad de unidades:</span>
            <input type="text" id="stockAmount" name="stockAmount" style={{ marginLeft: '10px', width: '220px' }} onChange={handleChange} />
          </div>

          <div className="divsInputs">
            <p className="spanImagen">ingresar imagen: </p>
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
            <p>Elige las Categorias:</p>
            {categories.map((g) => (
              <div key={g.id}>
                <label htmlFor={g.id} className="gname">{g.name}</label>
                <input type="checkbox" id={g.id} name="categories" value={g.id} className="checkbox" onChange={handleChange} />
              </div>
            ))}
          </div>

          <p className="span">Descripción</p>

          <textarea placeholder="  Descripcion del producto" id="descripcion" name="description" className="description" onChange={handleChange} />
          <div className="aceptar">
            <input type="submit" value="Aceptar" className="boton bg-color-three" />
          </div>
        </form>
      </div>
    </div>

  );
}

export default CreateProduct;

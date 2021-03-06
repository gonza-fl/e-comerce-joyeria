/* eslint-disable no-prototype-builtins */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState } from 'react';
import swal from 'sweetalert';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { URL_CATEGORIES } from '../../constants';
import './AddCategoryForms.css';

function AddCategoryForm() {
  const [selectedFile, setSelectedFile] = useState();
  const [fileInputState, setFileInputState] = useState('');
  const [previewSource, setPreviewSource] = useState('');
  const [loading, setLoading] = useState(false);
  const user = useSelector((state) => state.user);

  const uploadImage = async (base64EncodedImage, valor, description) => {
    axios.post(URL_CATEGORIES, {
      name: valor,
      description,
      img: base64EncodedImage,
    }, {
      headers: {
        'access-token': user.id,
      },
    }).then((res) => {
      if (res.data.hasOwnProperty('err')) {
        swal('Error', res.data.err, 'warning');
      }
      setSelectedFile();
      setPreviewSource('');
      setFileInputState('');
      const elemento = document.getElementById('flexQuery');
      elemento.style.flexDirection = 'column';
      document.getElementById('categoria').value = '';
      document.getElementById('descripcion').value = '';
      setLoading(false);
      swal('¡Muy bien!', 'La categoría se creó correctamente', 'success')
        .then(() => {
          window.location.href = '/admin/controlcategories';
        });
    }).catch((err) => {
      swal('Error', err.response.data, 'warning');
    });
  };

  function enviar(e) {
    e.preventDefault();
    setLoading(!loading);
    const valor = document.getElementById('categoria').value;
    const description = document.getElementById('descripcion').value;

    const valor2 = valor.trim().length;
    const description2 = description.trim().length;

    if (valor2 === 0) {
      swal('Error', 'El campo nombre no puede ser vacio', 'warning');
      return;
    }
    if (description2 === 0) {
      swal('Error', 'El campo descripcion no puede ser vacio', 'warning');
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(selectedFile);
    reader.onloadend = () => {
      uploadImage(reader.result, valor, description);
    };
  }
  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      const elemento = document.getElementById('flexQuery');
      elemento.style.flexDirection = 'row';
      setPreviewSource(reader.result);
    };
  };

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    previewFile(file);
    setSelectedFile(file);
    setFileInputState(e.target.value);
  };

  const limpiarImagen = () => {
    const elemento = document.getElementById('flexQuery');
    elemento.style.flexDirection = 'column';
    setSelectedFile();
    setPreviewSource('');
    setFileInputState('');
  };

  return (
    <div className="divPrincipal">
      <div className="form">
        <form method="POST" onSubmit={enviar}>
          <div style={{ marginTop: '15px' }}>
            <span>Nombre</span>
            <input type="text" id="categoria" style={{ marginLeft: '10px', width: '220px' }} />
          </div>

          <p>Descripción</p>

          <div id="flexQuery" style={{ display: 'flex', flexDirection: 'column', flexWrap: 'wrap' }}>

            <textarea
              id="descripcion"
              style={{
                width: '300px', minWidth: '300px', minHeight: '200px', margin: '0px 20px',
              }}
            />

            <div style={{ display: 'flex', flexDirection: 'column', position: 'relative' }}>
              {previewSource && (
              <img
                src={previewSource}
                alt="chosen"
                style={{ height: '200px', width: '200px', marginBottom: '15px' }}
              />
              )}
              {
                previewSource && (
                <div
                  className="botonEliminarImagenCategoria"
                  style={{
                    display: 'inline', backgroundColor: '#F55046', color: 'white', border: '1px solid white', borderRadius: '100px', position: 'absolute', top: '10px', right: '30px', zIndex: '1', height: '23px', width: '23px', fontWeight: 'bold',
                  }}
                  onClick={limpiarImagen}
                >
                  X
                </div>
                )
              }

              <input type="file" name="image" onChange={handleFileInputChange} value={fileInputState} style={{ marginLeft: '20px', marginTop: '15px' }} />

            </div>

          </div>

          <div style={{ display: 'flex', justifyContent: 'center', margin: '15px 0px' }}>

            <input
              className="submit-button"
              type="submit"
              value="Aceptar"
              style={{
                backgroundColor: '#f0ddd8', color: 'black', fontSize: '16px', fontWeight: '600', padding: '10px 20px 10px 20px', borderStyle: 'none',
              }}
            />

          </div>
        </form>
      </div>
    </div>
  );
}

export default AddCategoryForm;

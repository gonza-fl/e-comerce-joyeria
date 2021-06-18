/* eslint-disable no-prototype-builtins */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */

import React, { useState } from 'react';
import swal from 'sweetalert';
import axios from 'axios';
import { URL_CATEGORIES } from '../../constants';
import './AddCategoryForms.css';

function AddCategoryForm() {
  const [selectedFile, setSelectedFile] = useState();
  const [fileInputState, setFileInputState] = useState('');
  const [previewSource, setPreviewSource] = useState('');
  const [loading, setLoading] = useState(false);

  function loadingIcon() {
    return (
      <div
        className="lds-facebook"
        style={{
          display: `${loading ? 'inline' : 'none'}`, position: 'absolute', top: '50', left: '50',
        }}
      >
        <div />
        <div />
        <div />
      </div>
    );
  }

  const uploadImage = async (base64EncodedImage, valor, description) => {
    try {
      axios.post(URL_CATEGORIES, {
        name: valor,
        description,
        img: base64EncodedImage,
      }).then((res) => {
        if (res.data.hasOwnProperty('err')) {
          swal('Error', res.data.err, 'warning');
        }
        if (res.data.hasOwnProperty('success')) {
          setSelectedFile();
          setPreviewSource('');
          setFileInputState('');
          const elemento = document.getElementById('flexQuery');
          elemento.style.flexDirection = 'column';
          document.getElementById('categoria').value = '';
          document.getElementById('descripcion').value = '';
          swal('Success', res.data.success, 'success');
          setLoading(false);
        }
      }).catch(() => {
        swal('Error', 'Ocurrio un error inesperado', 'warning');
      });
    } catch (err) {
      swal('Error', 'Ocurrio un error inesperado', 'warning');
    }
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
    <div style={{
      height: '100%',
      justifyContent: 'center',
      alignItems: 'center',
      display: 'flex',
      padding: '10px 10px',
      transform: 'translate(0px,-60px)',
      width: '700px',
    }}
    >
      <div style={{
        width: '100%', margin: '15px 15px', borderRadius: '20px', border: '1px solid gray',
      }}
      >
        <form method="POST" onSubmit={enviar}>
          <div style={{ marginTop: '15px' }}>
            <span>Name</span>
            <input type="text" id="categoria" style={{ marginLeft: '10px', width: '220px' }} />
          </div>

          <p>Description</p>

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
      {loadingIcon()}
    </div>
  );
}

export default AddCategoryForm;

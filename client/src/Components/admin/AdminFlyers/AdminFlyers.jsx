import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import swal from 'sweetalert';
import { URL_BANNER } from '../../../constants';
import './AdminFlyers.css';

function AdminFlyers() {
  const [imgSelected, setImgSelected] = useState([]);
  const imgInput = useRef();

  useEffect(() => {
    axios.get(URL_BANNER)
      .then((res) => setImgSelected(res.data.map((img) => img.url)));
  }, []);
  function loadImg() {
    imgInput.current.click();
  }

  const previewFile = (file) => {
    const reader = new FileReader();
    if (file.size) {
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        if (imgSelected.length < 5) {
          setImgSelected([...imgSelected, reader.result]);
        } else {
          swal('Lo sentimos', 'No puedes agregar más de cinco imágenes', 'warning');
        }
      };
    }
  };

  const handleImgLoad = (e) => {
    const img = e.target.files[0];
    previewFile(img);
  };

  function closeImg(img) {
    setImgSelected(imgSelected.filter((i) => i !== img || i.url !== img.url));
  }

  function onSubmitImages(e) {
    e.preventDefault();
    axios.post(URL_BANNER, { images: imgSelected })
      .then(() => swal('¡Muy bien!', 'Se agregó la imagen correctament', 'success'))
      .catch(() => swal('¡Lo sentimos!', 'No se pudo agregar la imagen', 'warning'));
  }

  return (
    <div>
      <form onSubmit={onSubmitImages}>
        <h1>PROMOCIONES</h1>
        <button type="button" className="add-image-button-af" onClick={loadImg}>+</button>
        <input
          type="file"
          name="image"
          accept="image/*"
          style={{ display: 'none' }}
          ref={imgInput}
          onChange={handleImgLoad}
        />
        <div className="image-container-af">
          {imgSelected.length > 0 ? imgSelected.map((image) => (
            <div>
              <button type="button" className="button-delete-img" onClick={() => closeImg(image)}>x</button>
              <img src={image} alt="Not found" width="350px" height="350px" />
            </div>
          )) : <b>Actualmente no tienes imágenes agregadas. Agrega una imagen</b>}
        </div>
        <button type="submit">Aceptar</button>
      </form>
    </div>
  );
}

export default AdminFlyers;

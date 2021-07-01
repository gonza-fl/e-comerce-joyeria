/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import swal from 'sweetalert';
import { URL_BANNER } from '../../../constants';
import './AdminFlyers.css';

function AdminFlyers() {
  const [imgSelected, setImgSelected] = useState([]);
  const [banner, setBanner] = useState(0);
  const [loading, setLoading] = useState(false);
  const imgInput = useRef();

  function loadingIcon() {
    return (
      <div
        className="lds-facebook"
        style={{
          display: `${loading ? 'block' : 'none'}`,
          position: 'absolute',
          transform: 'translate(365px, 150px)',
          zIndex: '10',
        }}
      >
        <div />
        <div />
        <div />
      </div>
    );
  }

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
    if (imgSelected.length > 1) {
      return setImgSelected(imgSelected.filter((i) => i !== img || i.url !== img.url));
    }

    return swal('¡Lo sentimos!', 'Debes tener al menos una imagen en el banner de publicidad', 'warning');
  }

  function onSubmitImages() {
    setLoading(true);
    axios.post(URL_BANNER, { images: imgSelected })
      .then(() => { setLoading(false); swal('¡Muy bien!', 'El banner de imágenes fue actualizado correctamente', 'success'); })
      .catch(() => { setLoading(false); swal('¡Lo sentimos!', 'No se pudo agregar la imagen', 'warning'); });
  }

  return (
    <div>
      <h1>PROMOCIONES</h1>
      <button type="submit" className="button-apply-changes bg-color-three" onClick={onSubmitImages}>Aplicar cambios</button>
      <div className="main-container-af">
        <ul className="nav-banners">
          <li onClick={() => setBanner(0)} className="li-nav-banner" style={{ backgroundColor: banner === 0 ? '#CF988C' : '' }}>BANNER 1</li>
          <li onClick={() => setBanner(1)} className="li-nav-banner" style={{ backgroundColor: banner === 1 ? '#CF988C' : '' }}>BANNER 2</li>
          <li onClick={() => setBanner(2)} className="li-nav-banner" style={{ backgroundColor: banner === 2 ? '#CF988C' : '' }}>BANNER 3</li>
          <li onClick={() => setBanner(3)} className="li-nav-banner" style={{ backgroundColor: banner === 3 ? '#CF988C' : '' }}>BANNER 4</li>
          <li onClick={() => setBanner(4)} className="li-nav-banner" style={{ backgroundColor: banner === 4 ? '#CF988C' : '' }}>BANNER 5</li>
        </ul>
        {loadingIcon()}
        <div style={{ opacity: `${loading ? 0.7 : 1}` }}>
          {!imgSelected[banner]
            ? (
              <div className="noimg-container">
                <button type="button" className="add-image-button-af" onClick={loadImg}>+</button>
                <input
                  type="file"
                  name="image"
                  accept="image/*"
                  style={{ display: 'none' }}
                  ref={imgInput}
                  onChange={handleImgLoad}
                />
                <br />
                <br />
                <b>Agrega una imagen</b>
              </div>
            )
            : (
              <div>
                <button type="button" className="button-delete-img" onClick={() => closeImg(imgSelected[banner])}>x</button>
                <img src={imgSelected[banner]} alt="Not found" width="700px" height="500px" />
              </div>
            )}
        </div>
      </div>
      {/* <form onSubmit={onSubmitImages}>

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
              <img src={image} alt="Not found" width="200px" height="200px" />
            </div>
          )) : <b>Actualmente no tienes imágenes agregadas. Agrega una imagen</b>}
        </div>
        <button type="submit">Aplicar cambios</button>
      </form> */}
    </div>
  );
}

export default AdminFlyers;

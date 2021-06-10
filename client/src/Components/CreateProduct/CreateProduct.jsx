import React from "react"
import swal from 'sweetalert';
import {useSelector, useDispatch} from "react-redux"
import {useEffect, useState} from "react"
import {getCategories} from "../../actions/actions"
import "./createProduct.css"
import axios from "axios"



//import dotenv from 'dotenv';
const REACT_APP_API = process.env.REACT_APP_API

function CreateProduct(){
    const categories = useSelector((state) => state.categories)
    const [newProduct, setNewProduct] = useState({name:"",
    price:0,
    stockAmount:0,
    description:"",
    image:[],
    categories: [],
})


const handleChangeImage = event =>  {
    const previewImage = document.querySelector(".image-preview__image")
    const file = event.target.files[0]
    if(file){
        const reader = new FileReader();
        previewImage.style.display = "block";
        reader.addEventListener("load", function(){
            console.log(this)
            previewImage.setAttribute("src", this.result);
        });
        reader.readAsDataURL(file)
    }
    const imagen = event.target.files[0]
    const fd = new FormData();
    fd.append("image", imagen, imagen.name)
    setNewProduct({...newProduct, image: newProduct.image.concat(fd)})
}

const handleChange = event => {
    const {name, value} = event.target;
    if(name === "categories"){setNewProduct({...newProduct,   categories: newProduct.categories.find(e => e === value)? newProduct.categories.filter(item => item !== value) :  newProduct.categories.concat(value)})}
    else setNewProduct({...newProduct, [name]: value});
}
   
    function enviar(e){
        e.preventDefault()
        console.log(newProduct)
        if(newProduct.stockAmount.length === 0){
            swal("Error","El campo del stock debe ser completado","warning")
            return;
        }
        if(newProduct.price.length === 0){
            swal("Error","El campo del precio debe ser completado","warning")
            return;
        }
        if(newProduct.name.length === 0){
            swal("Error","El campo del nombre debe ser completado","warning")
            return;
        }
        if(newProduct.categories.length === 0){
            swal("Error","debe seleccionar almenos una categoria!","warning")
            return;
        }
        if(newProduct.description.length === 0){
            swal("Error","El campo descripcion debe ser completado","warning")
            return;
        }

        axios.post(`http://localhost:3001/api/products`, newProduct)
        
        .then((res)=>{
            console.log(res)
            if(res.data.hasOwnProperty("err")){
                swal("Error",res.data.err,"warning")
            }
            else {
                swal("Success","Se creo el producto!")
            }
        })
    }
    return(
        <div className="container" >
        <div className="divForm bg-color-six">
            <form method="POST" onSubmit={(e)=> enviar(e)}>
                <div className="divsInputs">
                    <span className="spans">Nombre del Producto</span><input type="text" id="nombre" name="name" style={{marginLeft:"10px",width:"220px"}} onChange={handleChange}></input>
                </div>
                <div  className="divsInputs">
                    <span className="spans">Precio del producto:</span><input type="text" id="precio"  name="price" style={{marginLeft:"10px",width:"220px"}} onChange={handleChange}></input>
                </div>
                <div  className="divsInputs">
                    <span className="spans">Cantidad de unidades:</span><input type="text" id="stockAmount" name="stockAmount" style={{marginLeft:"10px",width:"220px"}} onChange={handleChange}></input>
                </div>


                <div  className="divsInputs">
                    <span className="spans">ingresar imagen:   </span> <input type="file" id="image" name="image" accept="image/*" className="insertImg" visbility="hidden" onChange={handleChangeImage}></input>
                    <div  className="cont">
                        <div className="divImg">    
                            <img id="preview" src="" alt="vista previa de la imagen" className="imagen" class="image-preview__image" width="200px"></img>
                        </div>
                    </div>
                </div>

                <div>
                <p>Elige las Categorias:</p>
                {categories.map((g) => {
                return  <div > 
                  <label className="gname">{g.name}</label>
                  <input type="checkbox" id={g.id} name="categories" value={g.id} className="checkbox" onChange={handleChange}></input> 
                  </div>;
              })}    
              </div>
              
                <p className="span">Descripción</p>
                
                <textarea placeholder="  Descripcion del producto" id="descripcion" name="description" className="description" onChange={handleChange}></textarea>
                <div className="aceptar">
                    <input type="submit" value="Aceptar" className="boton"></input>
                </div>
                
                   
               
            </form>
        </div>
    </div>
    )
}

export default CreateProduct
import React from "react"
import swal from 'sweetalert';
import {useSelector, useDispatch} from "react-redux"
import {useEffect, useState} from "react"
import {getCategories} from "../../actions/actions"


const axios = require('axios');


//import dotenv from 'dotenv';
const REACT_APP_API = process.env.REACT_APP_API

function CreateProduct(){
    const categories = useSelector((state) => state.categories)
    const [newProduct, setNewProduct] = useState({name:"",
    price:"",
    stockAmount:"",
    description:"",
    image:null,
    categories: [],
})



const handleChangeImage = event =>  {
    const imagen = event.target.files[0]
    const fd = new FormData();
    fd.append("image", imagen, imagen.name)
    setNewProduct({...newProduct, image: fd})
}

const handleChange = event => {
    const {name, value} = event.target;
    if(name === "categories"){setNewProduct({...newProduct, categories: newProduct.categories.concat(value)})}
    setNewProduct({...newProduct, [name]: value});
}
   
    function enviar(e){
        e.preventDefault()

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

        axios.post(`${process.env.REACT_APP_API}api/products`, newProduct)
        .then(res=> {console.log(res)})
        .then((res)=>{
            if(res.data.hasOwnProperty("err")){
                swal("Error",res.data.err,"warning")
            }
            if(res.data.hasOwnProperty("success")){
                swal("Success",res.data.success,"success")
            }
        }).catch(err=>{
            swal("Error","Ocurrio un error inesperado","warning")
        })
    }
    return(
        <div style={{height:"100%",justifyContent:"center",alignItems:"center",display:"flex",marginTop:"50px"}}>
        <div style={{width:"50%",margin:"15px 15px",borderRadius:"20px",border:"1px solid gray"}}>
            <form method="POST" onSubmit={(e)=> enviar(e)}>
                <div style={{marginTop:"15px"}}>
                    <span style={{color:"#F589DF"}}>Nombre del Producto</span><input type="text" id="nombre" name="name" style={{marginLeft:"10px",width:"220px"}} onChange={handleChange}></input>
                </div>
                <div style={{marginTop:"15px"}}>
                    <span style={{color:"#F589DF"}}>Precio del producto:</span><input type="text" id="precio"  name="price" style={{marginLeft:"10px",width:"220px"}} onChange={handleChange}></input>
                </div>
                <div style={{marginTop:"15px"}}>
                    <span style={{color:"#F589DF"}}>Cantidad de unidades:</span><input type="text" id="stockAmount" name="stockAmount" style={{marginLeft:"10px",width:"220px"}} onChange={handleChange}></input>
                </div>
                <div style={{marginTop:"15px"}}>
                    <span style={{color:"#F589DF"}}>ingresar imagen:</span><input type="file" id="image" name="image" accept="image/png, image/jpeg" style={{marginLeft:"10px",width:"220px"}} onChange={handleChangeImage}></input>
                </div>
                {categories.map((g) => {
                return  <div > 
                  <label className="gname">{g.name}</label>
                  <input type="checkbox" id={g.id} name="categories" value={g.id} className="checkbox" onClick={handleChange}></input> 
                  </div>;
              })}              
                <p style={{color:"#F589DF"}}>Descripción</p>
                
                <textarea id="descripcion" name="description" style={{width:"200px",minWidth:"200px",minHeight:"100px"}} onChange={handleChange}></textarea>
                <div style={{display:"flex",justifyContent:"center",margin:"15px 0px"}}>
                    <input type="submit" value="Aceptar" style={{backgroundColor:"transparent",color:"#F589DF",fontSize:"16px",fontWeight:"600",padding:"5px 10px",border:"1px solid #F589DF",borderRadius:"10px"}}></input>
                </div>
                <div>
                    <img src={newProduct.image}></img>
                </div>
            </form>
        </div>
    </div>
    )
}

export default CreateProduct
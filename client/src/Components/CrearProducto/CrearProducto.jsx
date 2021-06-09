import React from "react"
import swal from 'sweetalert';
const axios = require('axios');
import {useSelector} from "react-redux"
//import dotenv from 'dotenv';
const REACT_APP_API = process.env.REACT_APP_API

function CrearProducto(){
    const categories = useSelector((state) => state.categories)


    function enviar(e){
        e.preventDefault()
        let name=document.getElementById("nombre").value
        let price=document.getElementById("precio").value
        let stockAmount=document.getElementById("stockAmount").value
        let description=document.getElementById("descripcion").value
        let image=document.getElementById("image").value
        let categories = []

        let name2=name.trim().length
        let description2=description.trim().length
        let price2=price.trim().length
        let stockAmount2=stockAmount.trim().length


       
        if(stockAmount2==0){
            swal("Error","El campo del stock debe ser completado","warning")
            return;
        }
        if(price2==0){
            swal("Error","El campo del precio debe ser completado","warning")
            return;
        }
        if(name2==0){
            swal("Error","El campo del nombre debe ser completado","warning")
            return;
        }
        if(categories.length === 0){
            swal("Error","debe seleccionar almenos una categoria!","warning")
            return;
        }
        if(description2==0){
            swal("Error","El campo descripcion debe ser completado","warning")
            return;
        }

        axios.post(`${process.env.REACT_APP_API}api/products`,{
            name:valor,
            description:description,
            price: price,
            stockAmount: stockAmount,
            image:image,
            categories: categories,
        }).then((res)=>{
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
            <form method="POST" onSubmit={enviar}>
                <div style={{marginTop:"15px"}}>
                    <span style={{color:"#F589DF"}}>Nombre del Producto</span><input type="text" id="nombre" style={{marginLeft:"10px",width:"220px"}}></input>
                </div>
                <div style={{marginTop:"15px"}}>
                    <span style={{color:"#F589DF"}}>Precio del producto:</span><input type="text" id="precio" style={{marginLeft:"10px",width:"220px"}}></input>
                </div>
                <div style={{marginTop:"15px"}}>
                    <span style={{color:"#F589DF"}}>Cantidad de unidades:</span><input type="text" id="stockAmount" style={{marginLeft:"10px",width:"220px"}}></input>
                </div>
                <div style={{marginTop:"15px"}}>
                    <span style={{color:"#F589DF"}}>ingresar imagen:</span><input type="file" id="image" style={{marginLeft:"10px",width:"220px"}}></input>
                </div>
                {categorias.map((g) => {
                return  <div > 
                  <label className="gname">{g.name}</label>
                  <input type="checkbox" id={g.id} name={g.name} value={g.id} className="checkbox" onClick={(e) =>{categories.push(e.target.value)}}></input> 
                  </div>;
              })}              
                <p style={{color:"#F589DF"}}>Descripción</p>
                
                <textarea id="descripcion" style={{width:"200px",minWidth:"200px",minHeight:"100px"}}></textarea>
                <div style={{display:"flex",justifyContent:"center",margin:"15px 0px"}}>
                    <input type="submit" value="Aceptar" style={{backgroundColor:"transparent",color:"#F589DF",fontSize:"16px",fontWeight:"600",padding:"5px 10px",border:"1px solid #F589DF",borderRadius:"10px"}}></input>
                </div>
            </form>
        </div>
    </div>
    )
}

export default CrearProducto
import React from "react"
import Nav from "./Nav/Nav"
import swal from 'sweetalert';
const axios = require('axios');
//import dotenv from 'dotenv';
const REACT_APP_API = process.env.REACT_APP_API

function FormularioAgregarCategoria(){

    function enviar(e){
        e.preventDefault()
        let valor=document.getElementById("categoria").value
        let description=document.getElementById("descripcion").value

        let valor2=valor.trim().length
        let description2=description.trim().length

        if(valor2==0){
            swal("Error","El campo nombre no puede ser vacio","warning")
            return;
        }
        if(description2==0){
            swal("Error","El campo descripcion no puede ser vacio","warning")
            return;
        }

/*
        fetch(`http://localhost:3001/api/products/category?name=${valor}&description=${description}`,{
            method:"POST",
            body:{"name":valor,"description":description}
        }).then(res=>res.json())
        .then(res=>{
            swal("Success!",res.success,"success")
        }).catch(err=>{
            alert("entro en fetch error")
        })
        //swal("test","test","success")*/

        
        axios.post(`${process.env.REACT_APP_API}api/products/category?name=${valor}&description=${description}`,{
            name:valor,
            description:description
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
                    <span style={{color:"#F589DF"}}>Nombre</span><input type="text" id="categoria" style={{marginLeft:"10px",width:"220px"}}></input>
                </div>
                
                <p style={{color:"#F589DF"}}>Descripción</p>
                
                <textarea id="descripcion" style={{width:"300px",minWidth:"300px",minHeight:"200px"}}></textarea>
                <div style={{display:"flex",justifyContent:"center",margin:"15px 0px"}}>
                    <input type="submit" value="Aceptar" style={{backgroundColor:"transparent",color:"#F589DF",fontSize:"16px",fontWeight:"600",padding:"5px 10px",border:"1px solid #F589DF",borderRadius:"10px"}}></input>
                </div>
            </form>
        </div>
    </div>
    )
}

export default FormularioAgregarCategoria

/*


            <Nav/>
            <div style={{height:"100%",justifyContent:"center",alignItems:"center",display:"flex"}}>
                <div style={{width:"50%",margin:"15px 15px",borderRadius:"20px",border:"1px solid gray"}}>
                    <form onSubmit={enviar}>
                        <span>Agregar Categoría</span><input type="text" id="categoria" style={{marginLeft:"10px"}}></input>
                        <p>Descripción</p>
                        <textarea id="descripcion"></textarea>
                        <div style={{display:"flex",justifyContent:"center"}}>
                            <input type="submit" value="Aceptar"></input>
                        </div>
                    </form>
                </div>
            </div>


*/
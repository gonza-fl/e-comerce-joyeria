import React, { useState } from "react"
import Nav from "./Nav/Nav"
import swal from 'sweetalert';
const axios = require('axios');

function AddCategoryForm(){

    const [selectedFile, setSelectedFile] = useState();
    const [fileInputState,setFileInputState] = useState('');
    const [previewSource, setPreviewSource] = useState('');

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

        

    }

    const uploadImage = async (base64EncodedImage,valor,description) => {
        try {
            axios.post(`${process.env.REACT_APP_API}api/category?name=${valor}&description=${description}`,{
                name:valor,
                description:description,
                img: base64EncodedImage
            }).then((res)=>{
                if(res.data.hasOwnProperty("err")){
                    swal("Error",res.data.err,"warning")
                }
                if(res.data.hasOwnProperty("success")){
                    setSelectedFile();
                    setPreviewSource('')
                    setFileInputState('')
                    let elemento = document.getElementById("flexQuery")
                    elemento.style.flexDirection="column"
                    document.getElementById("categoria").value=""
                    document.getElementById("descripcion").value=""
                    swal("Success",res.data.success,"success")
                }
            }).catch(err=>{
                swal("Error","Ocurrio un error inesperado","warning")
            })
        } catch (err) {
            console.error(err);
        }
    };
    
    const handleFileInputChange = (e) => {
        const file = e.target.files[0];
        previewFile(file);
        setSelectedFile(file);
        setFileInputState(e.target.value);
    }

    const previewFile = (file) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            let elemento = document.getElementById("flexQuery")
            elemento.style.flexDirection="row"
            setPreviewSource(reader.result);
        };
    };

    const limpiarImagen = () => {
        let elemento = document.getElementById("flexQuery")
        elemento.style.flexDirection="column"
        setSelectedFile();
        setPreviewSource('')
        setFileInputState('')
    }

    return(
        <div style={{height:"100%",justifyContent:"center",alignItems:"center",display:"flex",marginTop:"50px"}}>
        <div style={{width:"100%",margin:"15px 15px",borderRadius:"20px",border:"1px solid gray"}}>
            <form method="POST" onSubmit={enviar}>
                <div style={{marginTop:"15px"}}>
                    <span style={{color:"#F589DF"}}>Name</span><input type="text" id="categoria" style={{marginLeft:"10px",width:"220px"}}></input>
                </div>
                
                <p style={{color:"#F589DF"}}>Description</p> 

                <div id="flexQuery" style={{display:"flex",flexDirection:"column",flexWrap:"wrap"}}>

                    <textarea id="descripcion" style={{width:"300px",minWidth:"300px",minHeight:"200px",margin:"0px 20px"}}></textarea>
                
                    <div style={{display:"flex",flexDirection:"column", position:"relative"}}>
                    {previewSource && (
                        <img
                        src={previewSource}
                        alt="chosen"
                        style={{ height: '300px' , marginBottom:"15px"}}
                        />
                    )}
                    {
                        previewSource && (
                            <div className="botonEliminarImagenCategoria" style={{display:"inline",backgroundColor:"#F55046",color:"white",border:"1px solid white",borderRadius:"100px",position:"absolute",top:"10px",right:"30px",zIndex:"1",height:"23px",width:"23px",fontWeight:"bold"}} onClick={limpiarImagen}>X</div>
                        )
                    }


                    <input type="file" name="image" onChange={handleFileInputChange} value={fileInputState} style={{marginLeft:"20px",marginTop:"15px"}}/>

                    </div>
                
                </div>



                <div style={{display:"flex",justifyContent:"center",margin:"15px 0px"}}>
                    <input type="submit" value="Aceptar" style={{backgroundColor:"transparent",color:"#F589DF",fontSize:"16px",fontWeight:"600",padding:"5px 10px",border:"1px solid #F589DF",borderRadius:"10px"}}></input>
                </div>
            </form>
        </div>
    </div>
    )
}

export default AddCategoryForm
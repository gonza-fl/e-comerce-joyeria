import React, { useCallback } from "react"
import swal from 'sweetalert';
import {useSelector, useDispatch} from "react-redux"
import {useEffect, useState} from "react"
import {getCategories} from "../../actions/actions"
import "./createProduct.css"
import axios from "axios"

const REACT_APP_API = process.env.REACT_APP_API

function CreateProduct(){

    const UseForceUpdate = () => useState()[1];
    const [selectedFile, setSelectedFile] = useState([]);
    const [previewSource, setPreviewSource] = useState('');
    const [newProduct, setNewProduct] = useState({name:"",
    price:0,
    stockAmount:0,
    description:"",
    image:[],
    categories: [],
})
    const [filled, setFilled] = useState("conEspacio")

    const categories = useSelector((state) => state.categories)
 

    const handleFileInputChange = (e) => {
        const file = e.target.files[0];
        

        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            if(selectedFile.length < 3){previewFile(file);
               setSelectedFile((selected) => [...selected,reader.result],console.log(selectedFile));
              
            }
            else{ setFilled("lleno")}
        };
        
        
    }
    useEffect(()=>{
        setNewProduct({...newProduct, image: selectedFile})
    },[selectedFile])
    const previewFile = (file) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            setPreviewSource(reader.result);
        };
    };

    const limpiarImagen = () => {
        let elemento = document.getElementById("flexQuery")
        elemento.style.flexDirection="column"
        setSelectedFile();
        setPreviewSource('')
    }

    const handleChange = event => {
        const {name, value} = event.target;
        if(name === "categories"){setNewProduct({...newProduct,   categories: newProduct.categories.find(e => e === value)? newProduct.categories.filter(item => item !== value) :  newProduct.categories.concat(value)})}
        else setNewProduct({...newProduct, [name]: value});
    }
    const Forcechange = useCallback(() => {
        
    },[newProduct,selectedFile])
    function enviar(e){

        e.preventDefault()
        console.log(newProduct)

        if (!selectedFile) return swal("Error","Debes ingresar una imagen","warning");
        console.log(selectedFile)
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

        //Forcechange();
        
        uploadProduct();
    }

    const uploadProduct = async () => {
               
        try {
            axios.post(`${REACT_APP_API}api/products`, newProduct ) 
            .then((res)=>{
                console.log(res)
                if(res.data.hasOwnProperty("err")){
                    swal("Error",res.data.err,"warning")
                }
                else {
                    swal("Success","Se creo el producto!")
                }
            })
        } catch (err) {
            console.error(err);
        }
    };

    
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
                    <p className="spanImagen">ingresar imagen: </p> <p className={filled}>maximo de 3 imagenes alcanzado!</p> <button  type="button"  className="imgLabel"> <label htmlFor="image" >insert image </label> </button>  <input type="file" id="image" name="image" accept="image/*" className="insertImg" onChange={handleFileInputChange}></input>
                    <div  className="cont">
                        <div className="divImg">    
                            <img id="preview" src={previewSource} alt="" className="imagen" class="image-preview__image" width="200px"></img>
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
                    <input type="submit" value="Aceptar" className="boton bg-color-three"></input>
                </div>
            </form>
         </div>
        </div>
    
    )
}

export default CreateProduct
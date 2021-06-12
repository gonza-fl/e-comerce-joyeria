import CreateProduct from "../CreateProduct";
import React from "react"
import "./modalcreateProducts.css"



export default function ModalCreatProductos(){
    var modal = document.getElementById("myModal");
    window.onclick = function(event) {
        if (event.target == modal) {
            
          modal.style.display = "none";
        }
      }
    return(<div>
        <button id="myBtn"onClick={() => {const modal = document.getElementById("myModal"); modal.style.display = "block";}}>Agregar nuevo producto</button>
        <div id="myModal" className="modal">
          <div className="modal-content">
            <span className="close" onClick={() => {const modal = document.getElementById("myModal"); modal.style.display = "none";}}>X</span>
            <CreateProduct> </CreateProduct>
          </div>
        </div>
      </div>
      )
}


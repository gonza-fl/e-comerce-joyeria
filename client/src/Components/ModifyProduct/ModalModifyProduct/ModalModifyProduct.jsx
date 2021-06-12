import ModifyProduct from "../ModifyProduct";
import React from "react"
import "./modalModifyProduct.css"



export default function ModalModifyProduct(){
    var modal = document.getElementById("myModal");
    window.onclick = function(event) {
        if (event.target == modal) {
            
          modal.style.display = "none";
        }
      }
    return(<div>
        <button id="myBtn"onClick={() => {const modal = document.getElementById("myModal"); modal.style.display = "block";}}>Modificar producto</button>
        <div id="myModal" className="modal">
          <div className="modal-content">
            <span className="close" onClick={() => {const modal = document.getElementById("myModal"); modal.style.display = "none";}}>X</span>
            <ModifyProduct> </ModifyProduct>
          </div>
        </div>
      </div>
      )
}

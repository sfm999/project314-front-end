import "./Modal.css"

/*The modal used in customer home page and the servicerequestmodal.js*/

const Modal = ({ children }) => {
    return ( 
        <div className="modal-backdrop">
            <div className="modal" style={{
                border: "4px solid black",
                borderColor: "white",
                textAlign: "center"
            }}>
                {children}
            </div>
        </div>
     );
}
 
export default Modal;
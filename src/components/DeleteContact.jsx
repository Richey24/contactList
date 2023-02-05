import "./DeleteContact.css"
import del from "../images/Delete.svg"
import cancel from "../images/cancel.svg"
import { toggleModal } from "../utils/functions"
import { deleteContact } from "../services/contactApi"
import { useState } from "react"

const DeleteContact = ({ contact, fetchContacts }) => {
    const [load, setLoad] = useState(false)
    const delContact = async () => {
        setLoad(true)
        await deleteContact(contact._id)
        fetchContacts()
        setLoad(false)
        toggleModal("deleteModal")
    }
    return (
        <div id="deleteModal" className="deleteModal">
            <div>
                <img src={del} alt="" />
                <img onClick={() => toggleModal("deleteModal")} src={cancel} alt="" />
            </div>
            <h3>Delete contact</h3>
            <p>Are you sure you want to delete this contact? This action cannot be undone.</p>
            <button onClick={delContact}>{load ? "Loading" : "Delete"}</button>
            <button onClick={() => toggleModal("deleteModal")}>Cancel</button>
        </div>
    )
}

export default DeleteContact
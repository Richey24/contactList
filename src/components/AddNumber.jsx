import "./AddNumber.css"
import cancel from "../images/cancel.svg"
import { toggleModal } from "../utils/functions"
import submitContact from "../utils/submitContact"
import { useState } from "react"

const AddNumber = ({ fetchContacts, contact }) => {
    const [load, setLoad] = useState(false)
    return (
        <div className="inputModal" id="inputModal">
            <img onClick={() => toggleModal("inputModal")} src={cancel} alt="" />
            <form onSubmit={(e) => submitContact(e, setLoad, fetchContacts, contact._id)}>
                <input defaultValue={contact.firstName} name="firstName" id="firstName" required type="text" placeholder="First name" />
                <input defaultValue={contact.surname} name="surname" id="surname" type="text" placeholder="Surname" />
                <input defaultValue={contact.phoneNumber} name="phoneNumber" id="phoneNumber" required type="tel" placeholder="Phone number" />
                <input defaultValue={contact.email} name="email" id="email" type="text" placeholder="Email" />
                <button type="submit">{load ? "Loading..." : contact.firstName ? "Update Contact" : "Create Contact"}</button>
            </form>
        </div>
    )
}

export default AddNumber
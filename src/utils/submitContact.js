import { addContact, updateContact } from "../services/contactApi";
import { toggleModal } from "./functions";

const submitContact = async (e, setLoad, fetchContact, id) => {
    e.preventDefault()
    setLoad(true)
    const body = {
        firstName: e.target.firstName.value,
        surname: e.target.surname.value,
        phoneNumber: e.target.phoneNumber.value,
        email: e.target.email.value
    }
    if (id) {
        await updateContact(id, body)
    } else {
        await addContact(body)
    }
    setLoad(false)
    toggleModal("inputModal")
    fetchContact()
}

export default submitContact
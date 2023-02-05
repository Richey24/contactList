import "./ContactPage.css"
import search from "../images/Search.svg"
import dp from "../images/dp.svg"
import edit from "../images/green-edit.svg"
import del from "../images/Delete.svg"
import { checkFile, filterContact, toggleModal } from "../utils/functions"
import cancel from "../images/cancel.svg"
import AddNumber from "../components/AddNumber"
import DeleteContact from "../components/DeleteContact"
import { useEffect, useState } from "react"
import { getContacts, uploadContact } from "../services/contactApi"

const ContactPage = () => {
    const [contacts, setContacts] = useState([])
    const [filterArr, setFilterArr] = useState([])
    const [contact, setContact] = useState({})
    const [load, setLoad] = useState(true)
    const [err, setErr] = useState(false)
    const [upload, setUpload] = useState(false)

    const fetchContacts = async () => {
        const result = await getContacts()
        const sortedByName = result.data.sort((a, b) => a.firstName.localeCompare(b.firstName))
        setContacts(sortedByName)
        setFilterArr(sortedByName)
        setLoad(false)
    }

    useEffect(() => {
        fetchContacts()
    }, [])

    const addNew = () => {
        setContact({})
        toggleModal("addModal")
    }

    const uploadFile = async (e) => {
        setUpload(true)
        setErr(false)
        if (!checkFile(e.target.files[0].name)) {
            setErr(true)
            return
        }
        const file = new FormData()
        file.append("contact", e.target.files[0], "contact")
        await uploadContact(file)
        window.location.reload()
    }

    if (load) {
        return (
            <div className="mainContact">
                <p>Getting all contact...</p>
            </div>
        )
    }

    return (
        <div className="mainContact">
            <div className="innerDiv">
                <h2>My Contact</h2>
                <div className="searchDiv">
                    <img src={search} alt="" />
                    <input onChange={(e) => filterContact(e, filterArr, setContacts)} type="text" placeholder="Search by name or number" />
                </div>
                {
                    contacts.length === 0 ?
                        (
                            <div className="noContact">
                                <p>No contact found</p>
                            </div>
                        ) :
                        (
                            <div className="contactList">
                                {
                                    contacts.map((contact, i) => (
                                        <div key={i}>
                                            <div className="userDetails">
                                                <img src={dp} alt="" />
                                                <p>{contact.firstName} <span>{contact.phoneNumber}</span></p>
                                            </div>
                                            <p onClick={() => { setContact(contact); toggleModal(`optionDiv${i}`) }}>...</p>
                                            <div id={`optionDiv${i}`} className="optionDiv">
                                                <p onClick={() => toggleModal("inputModal")}><img src={edit} alt="" /> Edit</p>
                                                <hr />
                                                <p onClick={() => toggleModal("deleteModal")}><img src={del} alt="" /> Delete</p>
                                            </div>
                                        </div>
                                    ))
                                }
                            </div>
                        )
                }

                <div onClick={addNew} className="addBtn">
                    +
                </div>
                <div id="addModal" className="addModal">
                    <img onClick={() => toggleModal("addModal")} src={cancel} alt="" />
                    <p style={{ visibility: err ? "visible" : "hidden" }}>Invalid file type</p>
                    <button onClick={() => { addNew(); toggleModal("inputModal") }}>Add New Contact</button>
                    <br />
                    <div>
                        <label htmlFor="contact">{upload ? "Loading..." : "Import Contact"}</label>
                    </div>
                    <input onChange={uploadFile} type="file" name="contact" id="contact" hidden />
                </div>
                <AddNumber contact={contact} fetchContacts={fetchContacts} />
                <DeleteContact contact={contact} fetchContacts={fetchContacts} />
            </div>
        </div>
    )
}

export default ContactPage
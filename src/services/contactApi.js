import http from "./http"

/**
 * @returns All the contact in the database
 */
const getContacts = async () => {
    return http.get("contact/get/all")
}

/**
 * @param {An object representation containing all the data for the new contact}
 * @returns 
 */
const addContact = async (body) => {
    return http.post("contact/add", body)
}

/**
 * @param {An file containing all the data for the new contacts}
 * @returns 
 */
const uploadContact = async (body) => {
    return http.post("contact/upload", body, {
        headers: {
            "Content-Type": "multipart/form-data",
        }
    })
}

/**
 * @param {the id of the contact to update} id 
 * @returns 
 */
const updateContact = async (id, body) => {
    return http.put(`contact/update/${id}`, body)
}

/**
 * @param {the id of the contact to delete} id 
 * @returns 
 */

const deleteContact = async (id) => {
    return http.delete(`contact/delete/${id}`)
}

export {
    getContacts,
    addContact,
    updateContact,
    deleteContact,
    uploadContact
}
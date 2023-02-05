// show or hide different modal
const toggleModal = (val) => {
    document.getElementById(val).classList.toggle("show")
}

// filter the contact
const filterContact = (e, filterArr, setContact) => {
    const newArr = filterArr.filter((val) => `${val.firstName} ${val.phoneNumber}`.toLowerCase().includes(e.target.value.toLowerCase()))
    setContact(newArr)
}

const checkFile = (fileName) => {
    const fileType = fileName.split(".")[1]
    if (fileType === "vcf") {
        return true
    } else {
        return false
    }
}

export {
    toggleModal,
    filterContact,
    checkFile
}
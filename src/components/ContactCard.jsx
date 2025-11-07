import React from 'react'
import { Link } from 'react-router-dom'
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen, faTrash, faLocationDot, faPhone, faEnvelope } from "@fortawesome/free-solid-svg-icons";

const ContactCard = ({ information }) => {
    const { store, dispatch } = useGlobalReducer()

    const handleDelete = async () => {
        const confirmDelete = window.confirm(
            `Are you sure you want to delete ${information.name}?`
        );
        if (!confirmDelete) return;

        try {
            const response = await fetch(
                `https://playground.4geeks.com/contact/agendas/bruyi/contacts/${information.id}`,
                {
                    method: "DELETE",
                }
            );

            if (!response.ok) {
                throw new Error(`Failed to delete contact (status ${response.status})`);
            }

            // ✅ Update local store removing the deleted contact
            const updatedList = store.contacts.filter(
                (c) => c.id !== information.id
            );

            dispatch({
                type: "get_contacts",
                payload: updatedList,
            });

            alert("Contact deleted successfully ✅");
        } catch (error) {
            console.error("💥 Error deleting contact:", error);
            alert("There was a problem deleting the contact.");
        }
    };
    const contactInitial = () => {
        const contactName = information.name || "";
        return contactName.charAt(0).toUpperCase();
    };


    return (
        <div>
            <div className='d-block'>
                <div className="card">
                    <div className='row'>
                        <div className='col-2 d-flex justify-content-center align-items-center rounded-circle'>
                            <div
                                className="rounded-circle bg-secondary text-white d-flex justify-content-center align-items-center"
                                style={{
                                    width: "100px",
                                    height: "100px",
                                    fontSize: "70px",
                                    fontWeight: "600",
                                }}
                            >
                                {contactInitial()}
                            </div>
                        </div>
                        <div className=" col-7 card-body d-flex flex-column text-start">
                            <h3 className="card-title">{information.name}</h3>
                            <h6 className="card-text"><FontAwesomeIcon className='me-2' icon={faPhone} /> {information.phone}</h6>
                            <h6 className="card-text"><FontAwesomeIcon className='me-2' icon={faLocationDot} /> {information.address}</h6>
                            <h6 className="card-text"><FontAwesomeIcon className='me-2' icon={faEnvelope} /> {information.email}</h6>
                        </div>
                        <div className='col-2 mt-3'>
                            <Link to={'/edit-contact/' + information.id}>
                                <FontAwesomeIcon className='btn ' icon={faPen} />
                            </Link>
                            <FontAwesomeIcon onClick={handleDelete} className='btn ' icon={faTrash} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ContactCard
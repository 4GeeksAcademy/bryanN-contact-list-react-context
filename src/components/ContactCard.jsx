import React from 'react'
import { Link } from 'react-router-dom'
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen, faTrash, faLocationDot, faPhone, faEnvelope } from "@fortawesome/free-solid-svg-icons";

const ContactCard = ({ information }) => {
    const { store, dispatch } = useGlobalReducer()

    return (
        <div>
            <div className='d-block'>
                <div className="card">
                    <div className='row'>
                        <div className='col-2 d-flex justify-content-center align-items-center ms-3'>
                            <img src="https://th.bing.com/th?q=Personal+Contact+White+Icon.png&w=120&h=120&c=1&rs=1&qlt=70&o=7&cb=1&pid=InlineBlock&rm=3&mkt=en-US&cc=US&setlang=en&adlt=moderate&t=1&mw=247" className="card-img-top" alt="..." />
                        </div>
                        <div className=" col-7 card-body d-flex flex-column text-start ms-4">
                            <h3 className="card-title">{information.name}</h3>
                            <h6 className="card-text"><FontAwesomeIcon className='me-2' icon={faPhone} /> {information.phone}</h6>
                            <h6 className="card-text"><FontAwesomeIcon className='me-2' icon={faLocationDot} /> {information.address}</h6>
                            <h6 className="card-text"><FontAwesomeIcon className='me-2' icon={faEnvelope} /> {information.email}</h6>
                        </div>
                        <div className='col-2 mt-3'>
                            <Link to={'/edit-contact/' + information.id}>
                                <FontAwesomeIcon className='btn ' icon={faPen} />
                            </Link>
                            <FontAwesomeIcon className='btn ' icon={faTrash} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ContactCard
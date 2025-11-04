import React from 'react'

const ContactCard = () => {
    return (
        <div>
            <p>ContactCard</p>
            <div className="card" style={{width: "18rem"}}>
                <img src="..." className="card-img-top" alt="..."/>
                    <div className="card-body">
                        <h5 className="card-title">{props.informacion.name}</h5>
                        <p className="card-text">{props.informacion.phone}</p>
                        <a href="#" className="btn btn-primary">Go somewhere</a>
                    </div>
            </div>

        </div>
    )
}

export default ContactCard
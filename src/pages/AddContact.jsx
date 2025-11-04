import { useState, Link } from "react";

const AddContact = () => {
    return (
        <form className="row gy-2 gx-3 align-items-center  mt-4">
            <div className="col-8 m-auto mb-1">
                <label className="visually-hidden" htmlFor="autoSizingInput">Name</label>
                <input type="text" className="form-control" id="autoSizingInput" placeholder="Jane Doe" />
            </div>
            <div className="col-8 m-auto mb-1">
                <div className="row g-3 align-items-center">
                    <div className="col-1">
                        <label for="inputPassword6" className="col-form-label">Password</label>
                    </div>
                    <div className="col-11">
                        <input type="password" id="inputPassword6" className="form-control" aria-describedby="passwordHelpInline"/>
                    </div>
                </div>
            </div>
        </form>
    )
}
export default AddContact;
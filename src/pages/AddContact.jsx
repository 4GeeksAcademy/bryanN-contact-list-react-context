import React, { useState } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { useNavigate } from "react-router-dom";

const AddContact = () => {
  const { dispatch } = useGlobalReducer();
  const navigate = useNavigate();

  const [data, setData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  const formChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const forSubmit = async (e) => {
    e.preventDefault();

    if (!data.email || !data.name || !data.phone || !data.address) {
      alert("All fields are required");
      return;
    }

    try {
      const response = await fetch(
        "https://playground.4geeks.com/contact/agendas/bruyi/contacts",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...data, agenda_slug: "bruyi" }),
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to create contact (status ${response.status})`);
      }

      const newContact = await response.json();
      console.log("Contact created:", newContact);

      dispatch({
        type: "add_contact",
        payload: newContact,
      });

      alert("Contact created successfully");
      navigate("/");
    } catch (error) {
      console.error("Error creating contact:", error);
      alert("There was a problem creating the contact.");
    }
  };

  return (
    <div className="container">
      <h2>Add Contact</h2>
      <form className="row g-3" onSubmit={forSubmit}>
        <div className="col-md-6">
          <label htmlFor="inputEmail" className="form-label">
            Email
          </label>
          <input
            type="email"
            className="form-control"
            id="inputEmail"
            placeholder="@email"
            value={data.email}
            onChange={formChange}
            name="email"
          />
        </div>

        <div className="col-md-6">
          <label htmlFor="inputName" className="form-label">
            Full Name
          </label>
          <input
            type="text"
            className="form-control"
            id="inputName"
            value={data.name}
            onChange={formChange}
            name="name"
          />
        </div>

        <div className="col-12">
          <label htmlFor="inputAddress" className="form-label">
            Address
          </label>
          <input
            type="text"
            className="form-control"
            id="inputAddress"
            placeholder="1234 Main St"
            value={data.address}
            onChange={formChange}
            name="address"
          />
        </div>

        <div className="col-12">
          <label htmlFor="inputPhone" className="form-label">
            Phone
          </label>
          <input
            type="text"
            className="form-control"
            id="inputPhone"
            value={data.phone}
            onChange={formChange}
            name="phone"
          />
        </div>

        <div className="col-12">
          <button
            type="submit"
            className="btn text-primary-emphasis bg-success-subtle border border-success-subtle"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddContact;

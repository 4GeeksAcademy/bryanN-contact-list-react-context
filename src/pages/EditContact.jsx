import React, { useEffect, useState } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { useNavigate, useParams } from "react-router-dom";

const EditContact = () => {
  const { store, dispatch } = useGlobalReducer();
  const navigate = useNavigate();
  const { contact_id } = useParams();

  const [data, setData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  // 🔹 1️⃣ Load the contact info when the component mounts
  useEffect(() => {
    const contactToEdit = store.contacts.find(
      (contact) => contact.id === parseInt(contact_id)
    );

    if (contactToEdit) {
      setData({
        name: contactToEdit.name || "",
        email: contactToEdit.email || "",
        phone: contactToEdit.phone || "",
        address: contactToEdit.address || "",
      });
    } else {
      console.warn("⚠️ Contact not found in store. Fetching from API...");
      fetch(
        `https://playground.4geeks.com/contact/agendas/bruyi/contacts/${contact_id}`
      )
        .then((res) => res.json())
        .then((contact) => setData(contact))
        .catch((err) => console.error("Error fetching contact:", err));
    }
  }, [contact_id, store.contacts]);

  // 🔹 2️⃣ Handle form input
  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  // 🔹 3️⃣ Save updated contact (PUT request)
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `https://playground.4geeks.com/contact/agendas/bruyi/contacts/${contact_id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...data, agenda_slug: "bruyi" }),
        }
      );

      if (!response.ok) {
        throw new Error(`Error updating contact: ${response.status}`);
      }

      const updatedContact = await response.json();
      console.log("✅ Contact updated:", updatedContact);

      // 🔹 4️⃣ Update global store
      const updatedContacts = store.contacts.map((c) =>
        c.id === updatedContact.id ? updatedContact : c
      );

      dispatch({
        type: "get_contacts",
        payload: updatedContacts,
      });

      alert("Contact updated successfully ✅");
      navigate("/");
    } catch (error) {
      console.error("💥 Error updating contact:", error);
      alert("There was a problem updating the contact.");
    }
  };

  return (
    <div className="container">
      <h2>Edit Contact</h2>
      <form className="row g-3" onSubmit={handleSubmit}>
        <div className="col-md-6">
          <label className="form-label">Name</label>
          <input
            type="text"
            className="form-control"
            name="name"
            value={data.name}
            onChange={handleChange}
          />
        </div>

        <div className="col-md-6">
          <label className="form-label">Email</label>
          <input
            type="email"
            className="form-control"
            name="email"
            value={data.email}
            onChange={handleChange}
          />
        </div>

        <div className="col-md-6">
          <label className="form-label">Phone</label>
          <input
            type="text"
            className="form-control"
            name="phone"
            value={data.phone}
            onChange={handleChange}
          />
        </div>

        <div className="col-md-6">
          <label className="form-label">Address</label>
          <input
            type="text"
            className="form-control"
            name="address"
            value={data.address}
            onChange={handleChange}
          />
        </div>

        <div className="col-12">
          <button
            type="submit"
            className="btn text-primary-emphasis bg-warning-subtle border border-warning-subtle"
          >
            Save Changes
          </button>
          <button
            type="button"
            className="btn btn-secondary ms-2"
            onClick={() => navigate("/")}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditContact;

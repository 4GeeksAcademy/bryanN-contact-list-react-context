import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { useEffect } from "react";
import ContactCard from "../components/ContactCard.jsx";

export const Home = () => {
  const { store, dispatch } = useGlobalReducer();
  const contacts = store.contacts || [];

  const getContacts = async () => {
    try {
      const checkResponse = await fetch("https://playground.4geeks.com/contact/agendas/bruyi");

      if (checkResponse.status === 404) {
        console.log("Agenda not found. Creating one...");

        const createResponse = await fetch("https://playground.4geeks.com/contact/agendas/bruyi", {
          method: "POST",
          headers: { "Content-Type": "application/json" }
        });

        if (!createResponse.ok) {
          throw new Error(`Failed to create agenda (status ${createResponse.status})`);
        }

        console.log("Agenda created successfully");
      }

      const contactResponse = await fetch("https://playground.4geeks.com/contact/agendas/bruyi/contacts");
      if (!contactResponse.ok) {
        throw new Error(`Failed to fetch contacts (status ${contactResponse.status})`);
      }

      const data = await contactResponse.json();
      console.log(`${data.contacts?.length || 0} contacts loaded successfully`);

      dispatch({
        type: "get_contacts",
        payload: data.contacts || []
      });

    } catch (error) {
      console.error("Error fetching contacts:", error);
    }
  };

  useEffect(() => {
    getContacts();
  }, []);

  return (
    <div className="text-center mt-5">
      {contacts.length === 0 ? (
        <p>No contacts yet.</p>
      ) : (
        contacts.map((item) => (
          <ContactCard key={item.id} information={item} />
        ))
      )}
    </div>
  );
};

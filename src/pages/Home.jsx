import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom"
import ContactCard from "../components/ContactCard.jsx";

export const Home = () => {

	const { store, dispatch } = useGlobalReducer()
	const contacts = store.contacts || []


	const getContacts = async () => {
		try {
			const response = await fetch(`https://playground.4geeks.com/contact/agendas/bruyi/contacts`)
			const data = await response.json()

			dispatch({
				type: 'get_contacts',
				payload: data.contacts
			})

		} catch (error) {
			console.error('There was an error getting the contacts', error);
		}
	}

	useEffect(() => {
		getContacts()
	}, [])

	return (
		<div className="text-center mt-5">
			{contacts.map((item) => (
				<ContactCard
					key={item.id}
					information={item}
				/>
			))}
		</div>
	);
}; 
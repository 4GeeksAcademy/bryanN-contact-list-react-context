import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { useEffect, useState } from "react";

export const Home = () => {

  const {store, dispatch} =useGlobalReducer()
	const contact = store.contacts || []


	const getContacts = async() =>{
		try {
			const response = await fetch(`https://playground.4geeks.com/contact/agendas/bruyi/contacts`)
			const data = response.json()

			dispatch({
				type: 'get_contacts',
				payload: data.contacts
			})
			
		} catch (error) {
			console.error('There was an error getting the contacts', error);
		}
	}

	useEffect(()=>{
		getContacts
	}, [])

	return (
		<div className="text-center mt-5">
			<h1>Hello Rigo!!</h1>
			{contact.map((item)=>(
				// key={item.id},
				informacion={item}
			))}
		</div>
	);
}; 
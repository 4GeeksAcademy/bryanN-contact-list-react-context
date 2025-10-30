import { Link } from "react-router-dom";


export const Navbar = () => {

	return (
		<nav className="navbar navbar-light bg-light">
			<div className="container">
				<Link to="/">
					<span className="navbar-brand mb-0 h1">React Boilerplate</span>
				</Link>
				<div className="ml-auto">
					<Link to="/demo">
						<button className="btn btn-primary">Check the Context in action</button>
					</Link>
					<Link to={'/card'}>
						<button className="btn btn-secondary">Check the Context in card</button>
					</Link>
					<Link to={'/add_contact'}>
						<button className="btn btn-danger">Check the Context in add-button</button>
					</Link>
				</div>
			</div>
		</nav>
	);
};
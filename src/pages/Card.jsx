import { Link } from "react-router-dom";
import { Home } from "./Home";

export const Card = () => {
    return (
        <div>
            <Link to="/">
                <button className="btn btn-primary">Back home</button>
            </Link>
            <div className="card" style={{ width: "18rem;" }}>
                <img src="..." className="card-img-top" alt="..." />
                <div className="card-body">
                    <h5 className="card-title">Card title</h5>
                    <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card’s content.</p>
                    <a href="#" className="btn btn-primary">Go somewhere</a>
                </div>
            </div>
        </div>
    )
}
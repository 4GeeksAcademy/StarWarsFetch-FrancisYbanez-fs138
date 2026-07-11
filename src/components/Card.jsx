import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { getImageUrl, PLACEHOLDER_IMAGE } from "../Services/StarWarsServices";

export const Card = ({ item, category }) => {
    const { store, dispatch } = useGlobalReducer();

    const isSaved = store.saved.some(
        (saved) => saved.uid === item.uid && saved.category === category
    );

    const toggleSaved = (event) => {
        event.preventDefault(); 
        if (isSaved) {
            dispatch({ type: "remove_saved", payload: { uid: item.uid, category } });
        } else {
            dispatch({ type: "add_saved", payload: { ...item, category } });
        }
    };

    const subtitle = () => {
        if (category === "people") return `${item.gender || "n/a"} · ${item.birth_year || "n/a"}`;
        if (category === "planets") return `${item.climate || "n/a"} · ${item.terrain || "n/a"}`;
        if (category === "vehicles") return item.model || "n/a";
        return "";
    };

    return (
        <div className="card bg-dark text-white text-align-center border-secondary h-100">
            <Link to={`/single/${category}/${item.uid}`} className="text-decoration-none text-white">
                <img
                    src={getImageUrl(category, item.uid)}
                    className="card-img-top"
                    alt={item.name}
                    style={{ height: "320px", objectFit: "cover" }}
                    onError={(event) => {
                        event.target.onerror = null;
                        event.target.src = PLACEHOLDER_IMAGE;
                    }}
                />
                <div className="d-flex card-body pb-2">
                    <h5 className="card-title text-truncate">{item.name}</h5>
                    <p className="card-text text-secondary small mb-0">{subtitle()}</p>
                </div>
            </Link>
            <div className="card-footer bg-black border-secondary d-flex justify-content-end">
                <button
                    type="button"
                    className={`btn btn-sm ${isSaved ? "btn-warning" : "btn-outline-warning"}`}
                    onClick={toggleSaved}
                >
                    {isSaved ? "★ Guardado" : "☆ Guardar"}
                </button>
            </div>
        </div>
    );
};
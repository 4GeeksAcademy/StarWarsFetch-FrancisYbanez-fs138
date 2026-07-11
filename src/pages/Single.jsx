import { Link, useParams } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { getImageUrl, PLACEHOLDER_IMAGE } from "../Services/StarWarsServices";

const fieldsByCategory = {
  people: [
    ["Gender", "gender"],
    ["Height", "height"],
    ["Mass", "mass"],
    ["Birth year", "birth_year"],
    ["Hair color", "hair_color"],
    ["Eye color", "eye_color"],
  ],
  planets: [
    ["Climate", "climate"],
    ["Terrain", "terrain"],
    ["Population", "population"],
    ["Diameter", "diameter"],
    ["Gravity", "gravity"],
    ["Orbital period", "orbital_period"],
  ],
  vehicles: [
    ["Model", "model"],
    ["Manufacturer", "manufacturer"],
    ["Vehicle class", "vehicle_class"],
    ["Crew", "crew"],
    ["Passengers", "passengers"],
    ["Cost in credits", "cost_in_credits"],
  ],
};

export const Single = () => {
  const { store, dispatch } = useGlobalReducer();
  const { category, theId } = useParams();

  const list = store[category] || [];
  const item = list.find((entry) => entry.uid === theId);

  const isSaved = store.saved.some(
    (saved) => saved.uid === theId && saved.category === category
  );

  const toggleSaved = () => {
    if (isSaved) {
      dispatch({ type: "remove_saved", payload: { uid: theId, category } });
    } else if (item) {
      dispatch({ type: "add_saved", payload: { ...item, category } });
    }
  };

  if (!item) {
    return (
      <div className="container text-center text-white py-5">
        <p>No encontramos esta entidad. Puede que aún se esté cargando.</p>
        <Link to="/" className="btn btn-warning">Back home</Link>
      </div>
    );
  }

  const fields = fieldsByCategory[category] || [];

  return (
    <div className="container py-4 text-white">
      <div className="card bg-dark border-secondary mb-4">
        <div className="row g-0">
          <div className="col-md-5">
            <img
              src={getImageUrl(category, item.uid)}
              className="img-fluid rounded-start h-100 w-100"
              style={{ objectFit: "cover" }}
              alt={item.name}
              onError={(event) => {
                event.target.onerror = null;
                event.target.src = PLACEHOLDER_IMAGE;
              }}
            />
          </div>
          <div className="col-md-7">
            <div className="card-body">
              <h1 className="card-title text-warning">{item.name}</h1>
              <p className="card-text text-secondary">
                {item.description && item.description !== "n/a"
                  ? item.description
                  : "No hay descripción disponible para esta entidad."}
              </p>
              <button
                type="button"
                className={`btn ${isSaved ? "btn-warning" : "btn-outline-warning"}`}
                onClick={toggleSaved}
              >
                {isSaved ? "★ Quitar de guardados" : "☆ Guardar"}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="row text-center g-3">
        {fields.map(([label, key]) => (
          <div className="col-6 col-md-2" key={key}>
            <div className="border border-secondary rounded p-3 h-100">
              <div className="text-uppercase text-warning small mb-1">{label}</div>
              <div>{item[key] || "n/a"}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center mt-5">
        <Link to="/" className="btn btn-outline-light">Back home</Link>
      </div>
    </div>
  );
};
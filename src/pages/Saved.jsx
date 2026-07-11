import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { Card } from "../components/Card";

export const Saved = () => {
  const { store } = useGlobalReducer();

  return (
    <div className="container py-4 text-white">
      <h1 className="text-warning mb-4">Saved</h1>

      {store.saved.length === 0 ? (
        <div className="text-center py-5">
          <p className="text-secondary fs-5">Aún no has guardado nada.</p>
          <Link to="/" className="btn btn-warning">Explorar la galaxia</Link>
        </div>
      ) : (
        <div className="row g-3">
          {store.saved.map((item) => (
            <div className="col-12 col-sm-6 col-md-4 col-lg-3" key={`${item.category}-${item.uid}`}>
              <Card item={item} category={item.category} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
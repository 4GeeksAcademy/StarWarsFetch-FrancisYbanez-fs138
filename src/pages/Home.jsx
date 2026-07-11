import useGlobalReducer from "../hooks/useGlobalReducer";
import { Card } from "../components/Card";

const Row = ({ title, items, category }) => (
  <div className="mb-5" id={category}>
    <h2 className="text-warning border-bottom border-secondary pb-2 mb-3">{title}</h2>
    <div className="row g-3">
      {items.slice(0, 5).map((item) => (
        <div className="col-12 col-sm-6 col-md-4 col-lg-2" key={item.uid}>
          <Card item={item} category={category} />
        </div>
      ))}
    </div>
  </div>
);

export const Home = () => {
  const { store } = useGlobalReducer();

  if (!store.isLoaded) {
    return (
      <div className="container text-center py-5 text-white">
        <div className="spinner-border text-warning" role="status" />
        <p className="mt-3">Cargando datos de la galaxia...</p>
      </div>
    );
  }

  return (
    <div className="container py-4 text-white">
      <Row title="Characters" items={store.people} category="people" />
      <Row title="Planets" items={store.planets} category="planets" />
      <Row title="Vehicles" items={store.vehicles} category="vehicles" />
    </div>
  );
};
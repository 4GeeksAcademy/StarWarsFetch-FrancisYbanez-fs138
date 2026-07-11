import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";

export const SearchBar = () => {
  const { store } = useGlobalReducer();
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const allItems = useMemo(
    () => [
      ...store.people.map((item) => ({ ...item, category: "people" })),
      ...store.planets.map((item) => ({ ...item, category: "planets" })),
      ...store.vehicles.map((item) => ({ ...item, category: "vehicles" })),
    ],
    [store.people, store.planets, store.vehicles]
  );

  const matches = query.trim()
    ? allItems
        .filter((item) => item.name?.toLowerCase().includes(query.trim().toLowerCase()))
        .slice(0, 6)
    : [];

  const handleSelect = (item) => {
    setQuery("");
    navigate(`/single/${item.category}/${item.uid}`);
  };

  return (
    <div className="position-relative">
      <input
        type="text"
        className="form-control bg-dark text-white border-secondary"
        placeholder="Buscar personajes, planetas o vehículos..."
        value={query}
        onChange={(event) => setQuery(event.target.value)}
      />
      {matches.length > 0 && (
        <ul
          className="list-group position-absolute w-100 shadow"
          style={{ zIndex: 1050, top: "100%" }}
        >
          {matches.map((item) => (
            <li
              key={`${item.category}-${item.uid}`}
              className="list-group-item list-group-item-action bg-dark text-white border-secondary d-flex justify-content-between"
              role="button"
              onClick={() => handleSelect(item)}
            >
              <span>{item.name}</span>
              <small className="text-warning text-uppercase">{item.category}</small>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
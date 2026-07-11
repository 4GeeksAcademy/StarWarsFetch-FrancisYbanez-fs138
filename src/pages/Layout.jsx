import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import ScrollToTop from "../components/ScrollToTop";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { getPeople, getPlanets, getVehicles } from "../Services/StarWarsServices";

export const Layout = () => {
  const { store, dispatch } = useGlobalReducer();

  useEffect(() => {
    if (store.isLoaded) return;
    
    const loadData = async () => {
      try {
        const [people, planets, vehicles] = await Promise.all([
          getPeople(),
          getPlanets(),
          getVehicles(),
        ]);
        dispatch({ type: "set_people", payload: people });
        dispatch({ type: "set_planets", payload: planets });
        dispatch({ type: "set_vehicles", payload: vehicles });
        dispatch({ type: "set_loaded" });
      } catch (error) {
        console.error("Error cargando datos de SWAPI:", error.message);
      }
    };

    loadData();
  }, []);

  return (
    <ScrollToTop>
      <Navbar />
      <Outlet />
      <Footer />
    </ScrollToTop>
  );
};
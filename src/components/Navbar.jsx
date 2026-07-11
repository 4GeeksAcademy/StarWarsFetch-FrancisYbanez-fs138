import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { SearchBar } from "./SearchBar";

export const Navbar = () => {
  const { store } = useGlobalReducer();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 80);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <nav className="navbar navbar-dark bg-black sticky-top border-bottom border-secondary py-2">
      <div className="container-fluid d-flex align-items-center justify-content-between">
        <Link
          to="/"
          onClick={scrollToTop}
          className="navbar-brand fw-bold fs-3 text-warning text-decoration-none"
        >
          STAR WARS
        </Link>

        
        {!isScrolled && (
          <div className="flex-grow-1 mx-4 d-none d-md-block" style={{ maxWidth: "500px" }}>
            <SearchBar />
          </div>
        )}

        <Link to="/saved" className="btn btn-outline-warning text-nowrap">
          🔖 Saved ({store.saved.length})
        </Link>
      </div>
    </nav>
  );
};
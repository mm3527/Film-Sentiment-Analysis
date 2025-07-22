import { Route, Routes } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useEffect } from "react";

import "./App.css";
import fetchDataFromApi from "./utils/fetchDataFromApi";
import { getGenres } from "./store/homeSlice";

import Home from "./pages/home/Home";
import Explore from "./pages/explore/Explore";
import Details from "./pages/details/Details";
import Search from "./pages/search/Search";
import PageNotFound from "./pages/pagenotfound/PageNotFound";
import Header from "./components/header";
import Footer from "./components/footer";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const loadGenres = async () => {
      try {
        const data = [];
        // Fetch movie genres
        const movieRes = await fetchDataFromApi("/genre/movie/list");
        if (movieRes?.genres) {
          movieRes.genres.forEach(({ id, name }) =>
            data.push({ value: id, label: name })
          );
        }

        // Fetch TV genres
        const tvRes = await fetchDataFromApi("/genre/tv/list");
        if (tvRes?.genres) {
          tvRes.genres.forEach(({ id, name }) =>
            data.push({ value: id, label: name })
          );
        }

        // Dispatch once with combined genres
        dispatch(getGenres(data));
      } catch (err) {
        console.error("Failed to load genres:", err);
      }
    };

    loadGenres();
  }, [dispatch]);

  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Search/:query" element={<Search />} />
        <Route path="/explore/:mediaType" element={<Explore />} />
        <Route path="/Details/:mediaType/:id" element={<Details />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;

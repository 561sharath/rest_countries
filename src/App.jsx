import React, { useEffect, useState } from "react";
import ThemeProvider from "./context/Context";
import HomePage from "./pages/HomePage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import About from "./pages/AboutPage";
import Header from "./components/Header";
import ErrorPage from "./pages/ErrorPage";
import { getCountriesData } from "./Api";

const App = () => {
  const [countriesData, setCountriesData] = useState([]);
  const [status, setStatus] = useState({ loading: true, error: null });

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getCountriesData();
        setCountriesData(data);
        setStatus({ loading: false, error: null });
      } catch (error) {
        setStatus({ loading: false, error: error.message });
      }
    }

    fetchData();
  }, []);

  if (status.loading) {
    return (
      <div className="m-20">
        <div className="text-4xl">Loading .....</div>
      </div>
    );
  }

  if (status.error) {
    return <div className="text-4xl m-20">{status.error}</div>;
  }

  return (
    <>
      <ThemeProvider>
        <BrowserRouter>
          <Header />
          <Routes>
            <Route
              path="/"
              element={<HomePage countriesData={countriesData} />}
            />
            <Route path="/about/:countryId" element={<About />} />
            <Route path="*" element={<ErrorPage />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </>
  );
};

export default App;

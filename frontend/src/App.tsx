import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./layouts/Layout";
import Register from "./pages/Register";
import SignIn from "./pages/SignIn";
import AddClinic from "./pages/AddClinic";
import MyClinics from "./pages/MyClinics";
import EditClinic from "./pages/EditClinic";
import { useAppContext } from "./contexts/AppContext";
import Search from './pages/Search';
import Detail from './pages/Detail';
import Booking from './pages/Booking'
import React from 'react';

// ✅ Add this line


const App = () => {
  const { isLoggedIn } = useAppContext();
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout> 
          <p>Home Page</p>
        </Layout>} />
        <Route path="/search" element={<Layout> 
          <Search />
        </Layout>} />
        <Route
          path="/detail/:clinicId"
          element={
            <Layout>
              <Detail />
            </Layout>
          }
        />
        <Route
          path="/register"
          element={
            <Layout>
              <Register />
            </Layout>
          }
        />
          <Route
          path="/sign-in"
          element={
            <Layout>
              <SignIn />
            </Layout>
          }
        />
        {isLoggedIn && (
          <>
           <Route
              path="/clinic/:clinicId/booking"
              element={
                <Layout>
                  <Booking />
                </Layout>
              }
            />
         <Route
              path="/add-clinic"
              element={
                <Layout>
                  <AddClinic />
                </Layout>
              }
            />
          <Route
              path="/my-clinics"
              element={
                <Layout>
                  <MyClinics />
                </Layout>
              }
            />
          <Route
              path="/edit-clinic/:clinicId"
              element={
                <Layout>
                  <EditClinic />
                </Layout>
              }
            />
          </>
          
          
          
        )}
        <Route path="*" element={<Navigate to="/" />} />
        </Routes>
 
    </Router>
  );
};

export default App;

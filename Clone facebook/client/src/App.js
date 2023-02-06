import { Navigate, Route, Routes } from 'react-router-dom';
import { Login } from './pages/login/Login';
import { Register } from './pages/register/Register';
import { Profile } from './pages/profile/Profile';
import { Home } from './pages/home/Home';
import MainLayout from './pages/layout/MainLayout';
import { useContext } from 'react';
import { AuthContext } from './context/authContext';

function App() {
  const { currentUser } = useContext(AuthContext);

  const ProtectedRoute = ({ children }) => {
    if (!currentUser) {
      return <Navigate to="/login" />;
    } else {
      return children;
    }
  };
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <MainLayout />
            </ProtectedRoute>
          }
        >
          <Route path="" element={<Home />} />
          <Route path="profile/:id" element={<Profile />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </>
  );
}

export default App;

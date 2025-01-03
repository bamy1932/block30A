import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import NavBar from "./components/Navigations";
import Books from "./components/Books/Books";
import SingleBook from "./components/SingleBook/SingleBook";
import Register from "./components/Register/Register";
import Account from "./components/Account/Account";
import Login from "./components/Login/Login";
import { ProtectedRoute } from "./components/ProtectedRoute";

function App() {
  const [token, setToken] = useState(null);

  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Books />} />
        <Route path="/books/:id" element={<SingleBook />} />
        <Route
          path="/register"
          element={<Register token={token} setToken={setToken} />}
        />
        <Route
          path="/login"
          element={<Login token={token} setToken={setToken} />}
        />
        <Route path="/account" element={<ProtectedRoute />}>
          <Route
            path="/account"
            element={<Account />}
          />
        </Route>
      </Routes>
    </>
  );
}

export default App;

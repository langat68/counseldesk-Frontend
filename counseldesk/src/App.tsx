import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/auth/LoginForm";
import Register from "./components/auth/RegisterForm";
import Layout from "./components/layout/Layout";
import CalendarView from "./components/calendar/CalendarView";

function App() {
  return (
    <Routes>
      {/* Auth routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Layout with nested pages */}
      <Route path="/" element={<Layout />}>
        <Route index element={<CalendarView />} />  {/* Default page inside Layout */}
        {/* You can add more nested routes here */}
        {/* <Route path="clients" element={<ClientList />} /> */}
        {/* <Route path="documents" element={<DocumentList />} /> */}
      </Route>

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MainLayout } from "./components/layout/MainLayout";
import { LandingView } from "./features/landing/LandingView";
import { AuthView } from "./features/auth/AuthView";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route
            path="/"
            element={<LandingView />}
          />
          <Route
            path="/auth"
            element={<AuthView />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

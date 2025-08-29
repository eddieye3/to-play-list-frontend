import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MainLayout } from "./components/layout/MainLayout";
import { LandingView } from "./features/landing/LandingView";
import { AuthProvider } from "./features/auth/context/AuthProvider.tsx";
import { AuthForm } from "./features/auth/AuthForm.tsx";

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
            element={
              <AuthProvider>
                <AuthForm />
              </AuthProvider>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

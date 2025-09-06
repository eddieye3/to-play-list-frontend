import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MainLayout } from "./components/layout/MainLayout";
import { LandingView } from "./features/landing/LandingView";
import { AuthFormProvider } from "./features/auth/context/AuthFormProvider";
import { AuthProvider } from "./contexts/AuthProvider";
import { AuthForm } from "./features/auth/AuthForm";
import { ProtectedRoute } from "./components/routes/ProtectedRoute";
import { PublicRoute } from "./components/routes/PublicRoute";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route element={<MainLayout />}>
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <LandingView />
                </ProtectedRoute>
              }
            />
            <Route
              path="/auth"
              element={
                <PublicRoute>
                  <AuthFormProvider>
                    <AuthForm />
                  </AuthFormProvider>
                </PublicRoute>
              }
            />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MainLayout } from "./components/layout/MainLayout";
import { LandingView } from "./features/landing/LandingView";
import { AuthProvider } from "./features/auth/context/AuthProvider";
import { GlobalAuthProvider } from "./features/auth/context/GlobalAuthProvider";
import { AuthForm } from "./features/auth/AuthForm";
import { ProtectedRoute } from "./components/routes/ProtectedRoute";
import { PublicRoute } from "./components/routes/PublicRoute";

function App() {
  return (
    <BrowserRouter>
      <GlobalAuthProvider>
        <Routes>
          <Route element={<MainLayout />}>
            {/* Protected Routes */}
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <LandingView />
                </ProtectedRoute>
              }
            />

            {/* Public Routes - redirect authenticated users */}
            <Route
              path="/auth"
              element={
                <PublicRoute>
                  <AuthProvider>
                    <AuthForm />
                  </AuthProvider>
                </PublicRoute>
              }
            />
          </Route>
        </Routes>
      </GlobalAuthProvider>
    </BrowserRouter>
  );
}

export default App;

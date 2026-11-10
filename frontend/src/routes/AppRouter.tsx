import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { MainLayout } from '../layouts/MainLayout';

// Guardias
import { AuthGuard } from './AuthGuard';
import { AdminGuard } from './AdminGuard';
import { GuestGuard } from './GuestGuard';

// Páginas Públicas
import { LandingPage } from '../features/landing/LandingPage';
import { CatalogoPage } from '../features/catalogo/CatalogoPage';
import { ProductoDetailPage } from '../features/catalogo/ProductoDetailPage';
import { TalleresPage } from '../features/academia/TalleresPage';
import { PrivacidadPage } from '../features/legal/PrivacidadPage';
import { TerminosPage } from '../features/legal/TerminosPage';
import { CarritoPage } from '../features/checkout/CarritoPage';

// Autenticación (GuestGuard)
import { LoginPage } from '../features/auth/LoginPage';
import { RegisterPage } from '../features/auth/RegisterPage';

// Protegidas Cliente / Alumno (AuthGuard)
import { DashboardPage } from '../features/dashboard/DashboardPage';
import { CheckoutPage } from '../features/checkout/CheckoutPage';
import { CheckoutSuccessPage } from '../features/checkout/CheckoutSuccessPage';
import { MisComprasPage } from '../features/checkout/MisComprasPage';
import { MisClasesPage } from '../features/academia/MisClasesPage';
import { PerfilPage } from '../features/perfil/PerfilPage';

// Protegidas Administrador (AdminGuard)
import { AdminDashboardPage } from '../features/admin/AdminDashboardPage';

// 404
import { NotFoundPage } from '../features/common/NotFoundPage';

export const AppRouter: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          {/* RUTAS PÚBLICAS */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/catalogo" element={<CatalogoPage />} />
          <Route path="/catalogo/:id" element={<ProductoDetailPage />} />
          <Route path="/academia/talleres" element={<TalleresPage />} />
          <Route path="/privacidad" element={<PrivacidadPage />} />
          <Route path="/terminos" element={<TerminosPage />} />
          <Route path="/carrito" element={<CarritoPage />} />

          {/* RUTAS DE INVITADOS (GUEST) */}
          <Route
            path="/login"
            element={
              <GuestGuard>
                <LoginPage />
              </GuestGuard>
            }
          />
          <Route
            path="/registro"
            element={
              <GuestGuard>
                <RegisterPage />
              </GuestGuard>
            }
          />

          {/* RUTAS PROTEGIDAS CLIENTE / ALUMNO */}
          <Route
            path="/dashboard"
            element={
              <AuthGuard>
                <DashboardPage />
              </AuthGuard>
            }
          />
          <Route
            path="/checkout"
            element={
              <AuthGuard>
                <CheckoutPage />
              </AuthGuard>
            }
          />
          <Route
            path="/checkout/exito"
            element={
              <AuthGuard>
                <CheckoutSuccessPage />
              </AuthGuard>
            }
          />
          <Route
            path="/mis-compras"
            element={
              <AuthGuard>
                <MisComprasPage />
              </AuthGuard>
            }
          />
          <Route
            path="/mis-clases"
            element={
              <AuthGuard>
                <MisClasesPage />
              </AuthGuard>
            }
          />
          <Route
            path="/perfil"
            element={
              <AuthGuard>
                <PerfilPage />
              </AuthGuard>
            }
          />

          {/* RUTAS PROTEGIDAS ADMIN */}
          <Route
            path="/admin/dashboard"
            element={
              <AdminGuard>
                <AdminDashboardPage />
              </AdminGuard>
            }
          />

          {/* 404 NOT FOUND */}
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

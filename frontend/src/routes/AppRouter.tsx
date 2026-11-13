import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { MainLayout } from '../layouts/MainLayout';

// Guardias
import { AuthGuard } from './AuthGuard';
import { AdminGuard } from './AdminGuard';
import { GuestGuard } from './GuestGuard';

// Fallback Loader con Glassmorphism & Neón
const PageLoader: React.FC = () => (
  <div
    className="flex-1 flex flex-col items-center justify-center min-h-[60vh] gap-4"
    role="status"
    aria-label="Cargando vista"
  >
    <div className="w-12 h-12 rounded-full border-2 border-neon-cyan/20 border-t-neon-cyan animate-spin shadow-neon-cyan" />
    <span className="text-xs uppercase tracking-widest text-neon-cyan/80 font-mono animate-pulse">
      Cargando SonoraSync...
    </span>
  </div>
);

// ---------------------------------------------------------------------------
// CODE SPLITTING (React.lazy) PARA TODAS LAS RUTAS
// ---------------------------------------------------------------------------

// Páginas Públicas
const LandingPage = React.lazy(() =>
  import('../features/landing/LandingPage').then((m) => ({ default: m.LandingPage }))
);
const CatalogoPage = React.lazy(() =>
  import('../features/catalogo/CatalogoPage').then((m) => ({ default: m.CatalogoPage }))
);
const ProductoDetailPage = React.lazy(() =>
  import('../features/catalogo/ProductoDetailPage').then((m) => ({ default: m.ProductoDetailPage }))
);
const TalleresPage = React.lazy(() =>
  import('../features/academia/TalleresPage').then((m) => ({ default: m.TalleresPage }))
);
const PrivacidadPage = React.lazy(() =>
  import('../features/legal/PrivacidadPage').then((m) => ({ default: m.PrivacidadPage }))
);
const TerminosPage = React.lazy(() =>
  import('../features/legal/TerminosPage').then((m) => ({ default: m.TerminosPage }))
);
const CarritoPage = React.lazy(() =>
  import('../features/checkout/CarritoPage').then((m) => ({ default: m.CarritoPage }))
);

// Autenticación (GuestGuard)
const LoginPage = React.lazy(() =>
  import('../features/auth/LoginPage').then((m) => ({ default: m.LoginPage }))
);
const RegisterPage = React.lazy(() =>
  import('../features/auth/RegisterPage').then((m) => ({ default: m.RegisterPage }))
);

// Protegidas Cliente / Alumno (AuthGuard)
const DashboardPage = React.lazy(() =>
  import('../features/dashboard/DashboardPage').then((m) => ({ default: m.DashboardPage }))
);
const CheckoutPage = React.lazy(() =>
  import('../features/checkout/CheckoutPage').then((m) => ({ default: m.CheckoutPage }))
);
const CheckoutSuccessPage = React.lazy(() =>
  import('../features/checkout/CheckoutSuccessPage').then((m) => ({ default: m.CheckoutSuccessPage }))
);
const MisComprasPage = React.lazy(() =>
  import('../features/checkout/MisComprasPage').then((m) => ({ default: m.MisComprasPage }))
);
const MisClasesPage = React.lazy(() =>
  import('../features/academia/MisClasesPage').then((m) => ({ default: m.MisClasesPage }))
);
const PerfilPage = React.lazy(() =>
  import('../features/perfil/PerfilPage').then((m) => ({ default: m.PerfilPage }))
);

// Protegidas Portal Docente (AuthGuard)
const PaseListaPage = React.lazy(() =>
  import('../features/docente/PaseListaPage').then((m) => ({ default: m.PaseListaPage }))
);
const BitacoraPage = React.lazy(() =>
  import('../features/docente/BitacoraPage').then((m) => ({ default: m.BitacoraPage }))
);
const EvaluacionesPage = React.lazy(() =>
  import('../features/docente/EvaluacionesPage').then((m) => ({ default: m.EvaluacionesPage }))
);

// Protegidas Panel Administrativo (AdminGuard)
const AdminDashboardPage = React.lazy(() =>
  import('../features/admin/AdminDashboardPage').then((m) => ({ default: m.AdminDashboardPage }))
);
const InventarioPage = React.lazy(() =>
  import('../features/admin/InventarioPage').then((m) => ({ default: m.InventarioPage }))
);
const ProveedoresPage = React.lazy(() =>
  import('../features/admin/ProveedoresPage').then((m) => ({ default: m.ProveedoresPage }))
);
const EstadosCuentaPage = React.lazy(() =>
  import('../features/admin/EstadosCuentaPage').then((m) => ({ default: m.EstadosCuentaPage }))
);
const AulasPage = React.lazy(() =>
  import('../features/admin/AulasPage').then((m) => ({ default: m.AulasPage }))
);
const PaseListaAdminPage = React.lazy(() =>
  import('../features/admin/PaseListaAdminPage').then((m) => ({ default: m.PaseListaAdminPage }))
);
const LogsAuditoriaPage = React.lazy(() =>
  import('../features/admin/LogsAuditoriaPage').then((m) => ({ default: m.LogsAuditoriaPage }))
);

// 404 Not Found
const NotFoundPage = React.lazy(() =>
  import('../features/common/NotFoundPage').then((m) => ({ default: m.NotFoundPage }))
);

export const AppRouter: React.FC = () => {
  return (
    <BrowserRouter>
      {/* Enlace accesible para lectores de pantalla y navegación por teclado (WCAG 2.1 AA) */}
      <a href="#main-content" className="skip-to-content">
        Saltar al contenido principal
      </a>

      <Routes>
        <Route element={<MainLayout />}>
          {/* ===============================================================
              RUTAS PÚBLICAS
              =============================================================== */}
          <Route
            path="/"
            element={
              <React.Suspense fallback={<PageLoader />}>
                <LandingPage />
              </React.Suspense>
            }
          />
          <Route
            path="/catalogo"
            element={
              <React.Suspense fallback={<PageLoader />}>
                <CatalogoPage />
              </React.Suspense>
            }
          />
          <Route
            path="/catalogo/:id"
            element={
              <React.Suspense fallback={<PageLoader />}>
                <ProductoDetailPage />
              </React.Suspense>
            }
          />
          <Route
            path="/academia/talleres"
            element={
              <React.Suspense fallback={<PageLoader />}>
                <TalleresPage />
              </React.Suspense>
            }
          />
          <Route
            path="/privacidad"
            element={
              <React.Suspense fallback={<PageLoader />}>
                <PrivacidadPage />
              </React.Suspense>
            }
          />
          <Route
            path="/terminos"
            element={
              <React.Suspense fallback={<PageLoader />}>
                <TerminosPage />
              </React.Suspense>
            }
          />
          <Route
            path="/carrito"
            element={
              <React.Suspense fallback={<PageLoader />}>
                <CarritoPage />
              </React.Suspense>
            }
          />

          {/* ===============================================================
              RUTAS DE INVITADOS (GUEST)
              =============================================================== */}
          <Route
            path="/login"
            element={
              <GuestGuard>
                <React.Suspense fallback={<PageLoader />}>
                  <LoginPage />
                </React.Suspense>
              </GuestGuard>
            }
          />
          <Route
            path="/registro"
            element={
              <GuestGuard>
                <React.Suspense fallback={<PageLoader />}>
                  <RegisterPage />
                </React.Suspense>
              </GuestGuard>
            }
          />

          {/* ===============================================================
              RUTAS PROTEGIDAS CLIENTE / ALUMNO (AuthGuard)
              =============================================================== */}
          <Route
            path="/dashboard"
            element={
              <AuthGuard>
                <React.Suspense fallback={<PageLoader />}>
                  <DashboardPage />
                </React.Suspense>
              </AuthGuard>
            }
          />
          <Route
            path="/checkout"
            element={
              <AuthGuard>
                <React.Suspense fallback={<PageLoader />}>
                  <CheckoutPage />
                </React.Suspense>
              </AuthGuard>
            }
          />
          <Route
            path="/checkout/exito"
            element={
              <AuthGuard>
                <React.Suspense fallback={<PageLoader />}>
                  <CheckoutSuccessPage />
                </React.Suspense>
              </AuthGuard>
            }
          />
          <Route
            path="/mis-compras"
            element={
              <AuthGuard>
                <React.Suspense fallback={<PageLoader />}>
                  <MisComprasPage />
                </React.Suspense>
              </AuthGuard>
            }
          />
          <Route
            path="/mis-clases"
            element={
              <AuthGuard>
                <React.Suspense fallback={<PageLoader />}>
                  <MisClasesPage />
                </React.Suspense>
              </AuthGuard>
            }
          />
          <Route
            path="/perfil"
            element={
              <AuthGuard>
                <React.Suspense fallback={<PageLoader />}>
                  <PerfilPage />
                </React.Suspense>
              </AuthGuard>
            }
          />

          {/* ===============================================================
              RUTAS PROTEGIDAS PORTAL DOCENTE (AuthGuard)
              =============================================================== */}
          <Route
            path="/docente/pase-lista"
            element={
              <AuthGuard>
                <React.Suspense fallback={<PageLoader />}>
                  <PaseListaPage />
                </React.Suspense>
              </AuthGuard>
            }
          />
          <Route
            path="/docente/bitacora"
            element={
              <AuthGuard>
                <React.Suspense fallback={<PageLoader />}>
                  <BitacoraPage />
                </React.Suspense>
              </AuthGuard>
            }
          />
          <Route
            path="/docente/evaluaciones"
            element={
              <AuthGuard>
                <React.Suspense fallback={<PageLoader />}>
                  <EvaluacionesPage />
                </React.Suspense>
              </AuthGuard>
            }
          />

          {/* ===============================================================
              RUTAS PROTEGIDAS ADMINISTRADOR (AdminGuard)
              =============================================================== */}
          <Route
            path="/admin/dashboard"
            element={
              <AdminGuard>
                <React.Suspense fallback={<PageLoader />}>
                  <AdminDashboardPage />
                </React.Suspense>
              </AdminGuard>
            }
          />
          <Route
            path="/admin/inventario"
            element={
              <AdminGuard>
                <React.Suspense fallback={<PageLoader />}>
                  <InventarioPage />
                </React.Suspense>
              </AdminGuard>
            }
          />
          <Route
            path="/admin/proveedores"
            element={
              <AdminGuard>
                <React.Suspense fallback={<PageLoader />}>
                  <ProveedoresPage />
                </React.Suspense>
              </AdminGuard>
            }
          />
          <Route
            path="/admin/estados-cuenta"
            element={
              <AdminGuard>
                <React.Suspense fallback={<PageLoader />}>
                  <EstadosCuentaPage />
                </React.Suspense>
              </AdminGuard>
            }
          />
          <Route
            path="/admin/aulas"
            element={
              <AdminGuard>
                <React.Suspense fallback={<PageLoader />}>
                  <AulasPage />
                </React.Suspense>
              </AdminGuard>
            }
          />
          <Route
            path="/admin/pase-lista"
            element={
              <AdminGuard>
                <React.Suspense fallback={<PageLoader />}>
                  <PaseListaAdminPage />
                </React.Suspense>
              </AdminGuard>
            }
          />
          <Route
            path="/admin/logs"
            element={
              <AdminGuard>
                <React.Suspense fallback={<PageLoader />}>
                  <LogsAuditoriaPage />
                </React.Suspense>
              </AdminGuard>
            }
          />

          {/* ===============================================================
              404 NOT FOUND (CATCH-ALL)
              =============================================================== */}
          <Route
            path="*"
            element={
              <React.Suspense fallback={<PageLoader />}>
                <NotFoundPage />
              </React.Suspense>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

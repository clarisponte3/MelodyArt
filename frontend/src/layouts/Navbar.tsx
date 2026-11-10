import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { useCartStore } from '../store/cartStore';
import { Music, ShoppingBag, User, LogOut, ChevronDown, Menu, X, Shield } from 'lucide-react';
import { NeonButton } from '../components/ui/NeonButton';

export const Navbar: React.FC = () => {
  const { user, isAuthenticated, role, logout } = useAuthStore();
  const { getItemCount, openDrawer } = useCartStore();
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const cartCount = getItemCount();

  const handleLogout = () => {
    logout();
    setIsUserMenuOpen(false);
    navigate('/login');
  };

  return (
    <header className="sticky top-0 z-40 w-full glass-panel border-b border-white/10 backdrop-blur-md">
      <div className="container mx-auto px-6 h-20 flex items-center justify-between">
        {/* LOGO */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl border border-neon-cyan/40 bg-neon-cyan/10 flex items-center justify-center group-hover:shadow-neon-cyan transition-all duration-300">
            <Music className="w-6 h-6 text-neon-cyan" />
          </div>
          <div className="flex flex-col">
            <span className="font-neon text-3xl neon-text-yellow leading-none tracking-wide">
              SonoraSync
            </span>
            <span className="text-[10px] tracking-widest uppercase text-neon-cyan/80 font-medium">
              MelodyArt Enterprise
            </span>
          </div>
        </Link>

        {/* NAVEGACIÓN DESKTOP */}
        <nav className="hidden lg:flex items-center gap-8 text-sm font-medium">
          <Link
            to="/"
            className="text-gray-300 hover:text-neon-cyan transition-colors py-1 hover:neon-text-cyan-sm"
          >
            Inicio
          </Link>
          <Link
            to="/catalogo"
            className="text-gray-300 hover:text-neon-cyan transition-colors py-1 hover:neon-text-cyan-sm"
          >
            Catálogo de Instrumentos
          </Link>
          <Link
            to="/academia/talleres"
            className="text-gray-300 hover:text-neon-pink transition-colors py-1 hover:neon-text-pink-sm"
          >
            Academia Musical
          </Link>
          <Link
            to="/terminos"
            className="text-gray-300 hover:text-neon-green transition-colors py-1 flex items-center gap-1.5"
          >
            <Shield className="w-4 h-4 text-neon-green" />
            PROFECO & Garantías
          </Link>
        </nav>

        {/* ACCIONES DERECHA */}
        <div className="hidden lg:flex items-center gap-4">
          {/* BOTÓN CARRITO */}
          <button
            onClick={openDrawer}
            className="relative p-2.5 rounded-xl border border-white/10 hover:border-neon-pink/40 bg-dark-900/60 hover:bg-dark-850 transition-all duration-300 group"
            title="Ver carrito de compras"
          >
            <ShoppingBag className="w-5 h-5 text-gray-300 group-hover:text-neon-pink transition-colors" />
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-neon-pink text-white font-bold text-[11px] w-5 h-5 rounded-full flex items-center justify-center shadow-neon-pink animate-pulse">
                {cartCount > 99 ? '99+' : cartCount}
              </span>
            )}
          </button>

          {/* PERFIL / LOGIN */}
          {isAuthenticated && user ? (
            <div className="relative">
              <button
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="flex items-center gap-2.5 px-3.5 py-2 rounded-xl border border-neon-cyan/30 bg-neon-cyan/5 hover:bg-neon-cyan/10 transition-all"
              >
                <div className="w-7 h-7 rounded-lg bg-neon-cyan/20 border border-neon-cyan/50 flex items-center justify-center text-neon-cyan text-xs font-bold">
                  {user.nombre.charAt(0).toUpperCase()}
                </div>
                <div className="text-left text-xs">
                  <div className="font-semibold text-white max-w-[120px] truncate">{user.nombre}</div>
                  <div className="text-[10px] text-neon-cyan uppercase tracking-wider">
                    {role === 'ROLE_ADMIN' ? 'Administrador' : 'Alumno'}
                  </div>
                </div>
                <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
              </button>

              {/* DROPDOWN MENU */}
              {isUserMenuOpen && (
                <div className="absolute right-0 mt-2 w-56 rounded-xl glass-panel border border-neon-cyan/30 py-2 shadow-2xl z-50">
                  <div className="px-4 py-2 border-b border-white/10 text-xs">
                    <p className="text-gray-400">Conectado como:</p>
                    <p className="font-medium text-white truncate">{user.correo}</p>
                  </div>

                  <Link
                    to="/perfil"
                    onClick={() => setIsUserMenuOpen(false)}
                    className="flex items-center gap-2 px-4 py-2 text-xs text-gray-300 hover:text-neon-cyan hover:bg-white/5 transition-colors"
                  >
                    <User className="w-4 h-4" />
                    Mi Perfil & Derechos ARCO
                  </Link>

                  <Link
                    to="/mis-compras"
                    onClick={() => setIsUserMenuOpen(false)}
                    className="flex items-center gap-2 px-4 py-2 text-xs text-gray-300 hover:text-neon-pink hover:bg-white/5 transition-colors"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    Mis Compras & Facturas
                  </Link>

                  <Link
                    to="/mis-clases"
                    onClick={() => setIsUserMenuOpen(false)}
                    className="flex items-center gap-2 px-4 py-2 text-xs text-gray-300 hover:text-neon-yellow hover:bg-white/5 transition-colors"
                  >
                    <Music className="w-4 h-4" />
                    Mis Clases & Asistencias
                  </Link>

                  {role === 'ROLE_ADMIN' && (
                    <Link
                      to="/admin/dashboard"
                      onClick={() => setIsUserMenuOpen(false)}
                      className="flex items-center gap-2 px-4 py-2 text-xs text-neon-green hover:bg-white/5 transition-colors border-t border-white/10"
                    >
                      <Shield className="w-4 h-4" />
                      Panel Administrativo
                    </Link>
                  )}

                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-2 px-4 py-2 text-xs text-red-400 hover:bg-red-500/10 transition-colors border-t border-white/10"
                  >
                    <LogOut className="w-4 h-4" />
                    Cerrar Sesión
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Link to="/login">
                <NeonButton variant="cyan" className="py-2 px-4 text-xs">
                  Iniciar Sesión
                </NeonButton>
              </Link>
              <Link to="/registro">
                <NeonButton variant="green" className="py-2 px-4 text-xs">
                  Crear Cuenta
                </NeonButton>
              </Link>
            </div>
          )}
        </div>

        {/* BOTÓN MÓVIL */}
        <div className="lg:hidden flex items-center gap-3">
          <button
            onClick={openDrawer}
            className="relative p-2 text-gray-300 hover:text-neon-pink"
          >
            <ShoppingBag className="w-6 h-6" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-neon-pink text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 text-gray-300 hover:text-white"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* MENÚ MÓVIL DESPLEGABLE */}
      {isMobileMenuOpen && (
        <div className="lg:hidden border-t border-white/10 glass-panel px-6 py-6 flex flex-col gap-4">
          <Link
            to="/"
            onClick={() => setIsMobileMenuOpen(false)}
            className="text-gray-200 hover:text-neon-cyan py-1"
          >
            Inicio
          </Link>
          <Link
            to="/catalogo"
            onClick={() => setIsMobileMenuOpen(false)}
            className="text-gray-200 hover:text-neon-cyan py-1"
          >
            Catálogo de Instrumentos
          </Link>
          <Link
            to="/academia/talleres"
            onClick={() => setIsMobileMenuOpen(false)}
            className="text-gray-200 hover:text-neon-pink py-1"
          >
            Academia Musical
          </Link>
          <Link
            to="/terminos"
            onClick={() => setIsMobileMenuOpen(false)}
            className="text-gray-200 hover:text-neon-green py-1"
          >
            PROFECO & Garantías
          </Link>

          <div className="pt-4 border-t border-white/10 flex flex-col gap-3">
            {isAuthenticated ? (
              <>
                <Link
                  to="/perfil"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-neon-cyan text-sm"
                >
                  Mi Perfil ({user?.nombre})
                </Link>
                <Link
                  to="/mis-compras"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-neon-pink text-sm"
                >
                  Mis Compras
                </Link>
                <button
                  onClick={handleLogout}
                  className="text-red-400 text-left text-sm"
                >
                  Cerrar Sesión
                </button>
              </>
            ) : (
              <div className="flex flex-col gap-2">
                <Link to="/login" onClick={() => setIsMobileMenuOpen(false)}>
                  <NeonButton variant="cyan" className="w-full">
                    Iniciar Sesión
                  </NeonButton>
                </Link>
                <Link to="/registro" onClick={() => setIsMobileMenuOpen(false)}>
                  <NeonButton variant="green" className="w-full">
                    Crear Cuenta
                  </NeonButton>
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

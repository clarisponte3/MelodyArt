import React from 'react';
import { Outlet } from 'react-router-dom';
import { ParallaxContainer } from './ParallaxContainer';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { CartDrawer } from '../features/checkout/CartDrawer';
import { ToastContainer } from '../components/ui/ToastContainer';

export const MainLayout: React.FC = () => {
  return (
    <ParallaxContainer>
      <Navbar />
      <main className="flex-1 flex flex-col">
        <Outlet />
      </main>
      <CartDrawer />
      <ToastContainer />
      <Footer />
    </ParallaxContainer>
  );
};

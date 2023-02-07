import { FC } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { GlobalFeed } from '../modules/feed/pages/GlobalFeed';
import { NotFound } from '../modules/not-found/pages/NotFound';
import { Cart } from '../modules/cart/pages/Cart';

interface RoutersProps {}

export const Routers: FC<RoutersProps> = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to="/ts-pizza" />} />
        <Route path="/*" element={<Navigate to="/ts-pizza" />} />
        <Route path="/ts-pizza" element={<GlobalFeed />} />
        <Route path="/ts-pizza/*" element={<NotFound />} />
        <Route path="/ts-pizza/cart" element={<Cart />} />
      </Routes>
    </>
  );
};

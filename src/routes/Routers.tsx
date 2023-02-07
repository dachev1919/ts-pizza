import { FC } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { GlobalFeed } from '../modules/feed/pages/GlobalFeed';
import { NotFound } from '../modules/not-found/pages/NotFound';

interface RoutersProps {}

export const Routers: FC<RoutersProps> = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to="/fs-pizza" />} />
        <Route path="/*" element={<Navigate to="/fs-pizza" />} />
        <Route path="/fs-pizza" element={<GlobalFeed />} />
        <Route path="/fs-pizza/*" element={<NotFound />} />
      </Routes>
    </>
  );
};
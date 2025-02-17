import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Customeroffers from './pages/customeroffers';
import Sales from './pages/sales';
import ExpiringSubscriptions from './pages/expiringSubscriptions';
import SpecialRequirment from './pages/specialRequirment';

const SalesPage = () => {
  return (
    <Routes>
      <Route path='/' element={<Sales />} />
      <Route path='/customer-offers' element={<Customeroffers />} />
      <Route path='/special-requirements' element={<SpecialRequirment />} />
      <Route path='/expire-subscriptions' element={<ExpiringSubscriptions />} />
    </Routes>
  );
};

export default SalesPage;

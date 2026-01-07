"use client";

import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Discovery from './views/customer/Discovery';
import ProviderDetails from './views/customer/ProviderDetails';
import BookingFlow from './views/customer/BookingFlow';
import PaymentProcess from './views/customer/PaymentProcess';
import BookingHistory from './views/customer/BookingHistory';
import ECommerce from './views/customer/ECommerce';
import ProductDetails from './views/customer/ProductDetails';
import { LanguageProvider } from './context/LanguageContext';


const Placeholder = ({ title }) => (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 flex-col gap-4">
        <h1 className="text-4xl font-bold text-gray-800">{title}</h1>
        <p className="text-gray-500">Feature Implementation in Progress...</p>
        <button onClick={() => window.history.back()} className="px-6 py-2 bg-blue-600 text-white rounded-lg">Go Back</button>
    </div>
);

const App = () => {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    return (
        <LanguageProvider>
            <Router>
                <Routes>
                    {/* Single Portal Structure: Root is Discovery */}
                    <Route path="/" element={<Discovery />} />

                    {/* Customer Routes */}
                    <Route path="/customer/provider/:id" element={<ProviderDetails />} />
                    <Route path="/customer/booking/:id" element={<BookingFlow />} />
                    <Route path="/customer/checkout/:id" element={<PaymentProcess />} />
                    <Route path="/customer/bookings" element={<BookingHistory />} />
                    <Route path="/customer/shop" element={<ECommerce />} />
                    <Route path="/customer/product/:id" element={<ProductDetails />} />
                    <Route path="/customer/login" element={<PaymentProcess forceStep="login" />} />
                    <Route path="/customer/register" element={<PaymentProcess forceStep="register" />} />

                    <Route path="/customer/*" element={<Placeholder title="Customer Portal" />} />
                    <Route path="/provider/*" element={<Placeholder title="Service Provider Portal" />} />
                    <Route path="/department/*" element={<Placeholder title="Department Dashboard" />} />
                    <Route path="/admin/*" element={<Placeholder title="Admin Panel" />} />

                    {/* Legacy Redirects */}
                    <Route path="/customer/discover" element={<Navigate to="/" replace />} />
                </Routes>
            </Router>
        </LanguageProvider>
    );
};

export default App;

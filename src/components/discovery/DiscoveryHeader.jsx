"use client";

import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
    ShoppingBag,
    User,
    Calendar,
    Layout,
    Menu,
    X,
    ChevronDown,
    LogOut
} from 'lucide-react';
import LanguageToggle from '../LanguageToggle';
import useLanguage from '../../hooks/useLanguage';
import localStorageUtil from '../../utils/localStorage';

/**
 * Enhanced DiscoveryHeader with Sign In/Up, Cart, and full navigation.
 * Fully translated, mobile-first, using Poppins.
 */
const DiscoveryHeader = () => {
    const { t } = useLanguage();
    const navigate = useNavigate();
    const location = useLocation();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const isAuthenticated = localStorageUtil.get('isCustomerAuth', false);

    const navItems = [
        { label: t("header.nav.services"), path: '/', icon: Layout },
        { label: t("header.nav.shop"), path: '/customer/shop', icon: ShoppingBag },
        { label: t("header.nav.myBookings"), path: '/customer/bookings', icon: Calendar },
    ];

    const handleLogout = () => {
        localStorageUtil.set('isCustomerAuth', false);
        window.location.reload();
    };

    return (
        <header className="sticky top-0 z-[100] bg-white border-b border-[#e2e8f0] h-16 md:h-20 flex items-center">
            <div className="max-w-[1400px] mx-auto w-full px-4 md:px-8 flex items-center justify-between gap-2">

                {/* Logo Section */}
                <div
                    onClick={() => navigate('/')}
                    className="flex items-center gap-2 md:gap-3 cursor-pointer active:scale-95 transition-transform"
                >
                    <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 flex items-center justify-center overflow-hidden">
                        <img src="/aplogo.png" alt="AP Gov Logo" className="w-full h-full object-contain" />
                    </div>
                    <div className="flex flex-col">
                        <span className="text-[7px] sm:text-[9px] md:text-[10px] font-bold text-[#154a21] leading-none tracking-tight uppercase">{t("header.govt")}</span>
                        <span className="text-xs sm:text-sm md:text-base font-black text-[#154a21] leading-tight">
                            {t("header.portal")}
                        </span>
                    </div>
                </div>

                {/* Desktop Navigation */}
                <nav className="hidden lg:flex items-center gap-1">
                    {navItems.map((item) => (
                        <button
                            key={item.path}
                            onClick={() => navigate(item.path)}
                            className={`px-4 py-2 rounded-xl text-sm font-bold transition-all active:scale-95 flex items-center gap-2 ${location.pathname === item.path || (item.path !== '/' && location.pathname.startsWith(item.path))
                                ? 'bg-[#f1f8f1] text-[#154a21]'
                                : 'text-[#64748b] hover:bg-[#f8fafc]'
                                }`}
                        >
                            <item.icon size={18} />
                            {item.label}
                        </button>
                    ))}
                </nav>

                {/* Right Actions */}
                <div className="flex items-center gap-2 md:gap-4 ml-auto">
                    <div className="hidden sm:block">
                        <LanguageToggle />
                    </div>

                    {/* Mobile Toggle - Before buttons on mobile */}
                    <div className="sm:hidden">
                        <LanguageToggle isMobileMode={true} />
                    </div>

                    <div className="h-6 w-[1px] bg-[#e2e8f0] hidden md:block mx-1" />

                    <div className="flex items-center gap-2">
                        {isAuthenticated ? (
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={() => navigate('/customer/bookings')}
                                    className="w-10 h-10 flex items-center justify-center rounded-xl bg-[#f1f8f1] text-[#154a21] active:scale-95 transition-all"
                                >
                                    <ShoppingBag size={20} />
                                </button>
                                <button
                                    onClick={handleLogout}
                                    className="w-10 h-10 flex items-center justify-center rounded-xl bg-[#fef2f2] text-red-600 active:scale-95 transition-all"
                                >
                                    <LogOut size={20} />
                                </button>
                            </div>
                        ) : (
                            <div className="flex items-center gap-1">
                                <button
                                    onClick={() => navigate('/customer/login')}
                                    className="px-2 py-2 text-[8px] sm:text-[10px] font-black text-[#64748b] uppercase tracking-wider"
                                >
                                    {t("header.auth.signIn")}
                                </button>
                                <button
                                    onClick={() => navigate('/customer/register')}
                                    className="px-2 sm:px-3 py-1.5 sm:py-2 bg-[#154a21] text-white rounded-lg text-[8px] sm:text-[10px] font-black uppercase tracking-widest shadow-lg shadow-green-900/10 active:scale-95 transition-all"
                                >
                                    {t("header.auth.signUp")}
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Mobile Menu Toggle */}
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="lg:hidden w-10 h-10 flex items-center justify-center rounded-xl bg-[#f8fafc] border border-[#e2e8f0] text-[#154a21]"
                    >
                        {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>

            {/* Mobile Navigation Drawer */}
            {isMenuOpen && (
                <div className="lg:hidden fixed inset-0 top-16 z-[90] bg-white animate-fade-in flex flex-col">
                    <div className="p-6 space-y-4 flex-grow">
                        {navItems.map((item) => (
                            <button
                                key={item.path}
                                onClick={() => {
                                    navigate(item.path);
                                    setIsMenuOpen(false);
                                }}
                                className={`w-full p-4 rounded-2xl flex items-center gap-4 text-lg font-bold transition-all ${location.pathname === item.path
                                    ? 'bg-[#f1f8f1] text-[#154a21]'
                                    : 'text-[#64748b]'
                                    }`}
                            >
                                <item.icon size={24} />
                                {item.label}
                            </button>
                        ))}

                        <div className="pt-4 border-t border-[#e2e8f0]">
                            <div className="flex items-center justify-between p-4">
                                <span className="text-sm font-bold text-[#64748b]">{t("portalSelection.settings")}</span>
                                <LanguageToggle />
                            </div>
                        </div>
                    </div>

                    {!isAuthenticated && (
                        <div className="p-6 grid grid-cols-2 gap-4 border-t border-[#e2e8f0]">
                            <button
                                onClick={() => { navigate('/customer/login'); setIsMenuOpen(false); }}
                                className="h-14 rounded-2xl border-2 border-[#e2e8f0] font-black text-xs uppercase tracking-widest text-[#64748b]"
                            >
                                {t("header.auth.signIn")}
                            </button>
                            <button
                                onClick={() => { navigate('/customer/register'); setIsMenuOpen(false); }}
                                className="h-14 rounded-2xl bg-[#154a21] text-white font-black text-xs uppercase tracking-widest"
                            >
                                {t("header.auth.signUp")}
                            </button>
                        </div>
                    )}
                </div>
            )}
        </header>
    );
};

export default DiscoveryHeader;

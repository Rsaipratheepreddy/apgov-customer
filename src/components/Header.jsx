"use client";

import React from 'react';
import LanguageToggle from './LanguageToggle';
import useLanguage from '../hooks/useLanguage';

const Header = () => {
    const { t } = useLanguage();

    return (
        <header className="sticky top-0 z-50 w-full bg-white border-b border-[#e2e8f0] shadow-sm" role="banner">
            <div className="max-w-[1200px] mx-auto px-6 h-20 flex items-center justify-between">
                {/* Left: Emblem/Logo */}
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 flex items-center justify-center bg-[#1e3a8a] rounded-lg">
                        <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="white"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="w-8 h-8"
                            aria-hidden="true"
                        >
                            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                        </svg>
                    </div>
                    <div className="hidden sm:block">
                        <h1 className="text-xl font-bold text-[#1e293b] leading-tight">
                            {t("portalSelection.portalTitle")}
                        </h1>
                    </div>
                </div>

                {/* Center: Title for Tablet/Desktop (if needed, currently logo + title on left) */}
                <div className="sm:hidden">
                    <h1 className="text-lg font-bold text-[#1e293b]">
                        AP Drone
                    </h1>
                </div>

                {/* Right: Language Toggle */}
                <div className="flex items-center">
                    <LanguageToggle />
                </div>
            </div>
        </header>
    );
};

export default Header;

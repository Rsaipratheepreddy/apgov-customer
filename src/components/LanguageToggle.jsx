"use client";

import React from 'react';
import useLanguage from '../hooks/useLanguage';

/**
 * Premium, flat pill-style Language Toggle.
 * Mobile-first, Poppins font, matching brand green.
 * Supports "short" mode for mobile layout.
 */
const LanguageToggle = ({ isMobileMode = false }) => {
    const { currentLanguage, toggleLanguage } = useLanguage();

    return (
        <div
            onClick={toggleLanguage}
            className={`flex items-center bg-[#f8fafc] border border-[#e2e8f0] rounded-xl p-1 cursor-pointer select-none transition-all active:scale-95 ${isMobileMode ? 'w-fit' : ''}`}
            aria-label={`Switch language to ${currentLanguage === 'en' ? 'Telugu' : 'English'}`}
        >
            <div className={`px-3 md:px-4 py-1.5 rounded-lg text-xs font-black transition-all ${currentLanguage === 'en'
                    ? 'bg-[#154a21] text-white'
                    : 'text-[#64748b]'
                }`}>
                {isMobileMode ? 'EN' : 'English'}
            </div>
            <div className={`px-3 md:px-4 py-1.5 rounded-lg text-sm font-bold transition-all ${currentLanguage === 'te'
                    ? 'bg-[#154a21] text-white'
                    : 'text-[#64748b]'
                }`}>
                {isMobileMode ? 'తె' : 'తెలుగు'}
            </div>
        </div>
    );
};

export default LanguageToggle;

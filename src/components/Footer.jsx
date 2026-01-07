"use client";

import React from 'react';
import useLanguage from '../hooks/useLanguage';

const Footer = () => {
    const { t } = useLanguage();

    return (
        <footer className="w-full bg-[#1e293b] text-white py-8 px-6" role="contentinfo">
            <div className="max-w-[1200px] mx-auto flex flex-col items-center gap-2 text-center">
                <p className="text-sm opacity-90">
                    {t("footer.copyright")}
                </p>
                <p className="text-sm opacity-80">
                    {t("footer.poweredBy")}
                </p>
                <div className="mt-4 pt-4 border-t border-white/10 w-full max-w-xs">
                    <p className="text-xs opacity-60">
                        Version 1.0.0
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;

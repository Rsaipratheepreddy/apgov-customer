"use client";

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Briefcase, Building2, Settings } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import PortalCard from '../components/PortalCard';
import useLanguage from '../hooks/useLanguage';

const PortalSelection = () => {
    const { t } = useLanguage();
    const navigate = useNavigate();

    const portals = [
        {
            id: 'customer',
            icon: User,
            titleKey: 'portalSelection.customer.title',
            descriptionKey: 'portalSelection.customer.description',
            featuresKey: 'portalSelection.customer.features',
            path: '/customer/discover',
            delay: '[animation-delay:0ms]'
        },
        {
            id: 'provider',
            icon: Briefcase,
            titleKey: 'portalSelection.provider.title',
            descriptionKey: 'portalSelection.provider.description',
            featuresKey: 'portalSelection.provider.features',
            path: '/provider',
            delay: '[animation-delay:100ms]'
        },
        {
            id: 'department',
            icon: Building2,
            titleKey: 'portalSelection.department.title',
            descriptionKey: 'portalSelection.department.description',
            featuresKey: 'portalSelection.department.features',
            path: '/department',
            delay: '[animation-delay:200ms]'
        },
        {
            id: 'admin',
            icon: Settings,
            titleKey: 'portalSelection.admin.title',
            descriptionKey: 'portalSelection.admin.description',
            featuresKey: 'portalSelection.admin.features',
            path: '/admin',
            delay: '[animation-delay:300ms]'
        }
    ];

    return (
        <div className="min-h-screen flex flex-col bg-[#f8fafc]">
            <Header />

            <main className="flex-grow flex flex-col items-center">
                {/* Hero Section */}
                <div className="w-full text-center px-6 pt-16 pb-8">
                    <p className="text-[#64748b] text-lg mb-4 animate-fade-in-up">
                        {t("portalSelection.subtitle")}
                    </p>
                    <p className="text-[#64748b] max-w-2xl mx-auto mb-8 opacity-80 animate-fade-in-up [animation-delay:100ms]">
                        {t("portalSelection.tagline")}
                    </p>
                    <h2 className="text-3xl font-bold text-[#1e293b] animate-fade-in-up [animation-delay:200ms]">
                        {t("portalSelection.selectPortal")}
                    </h2>
                </div>

                {/* Portals Grid */}
                <div className="max-w-[1200px] w-full px-6 pb-24">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 lg:gap-8">
                        {portals.map((portal) => (
                            <PortalCard
                                key={portal.id}
                                icon={portal.icon}
                                title={t(portal.titleKey)}
                                description={t(portal.descriptionKey)}
                                features={t(portal.featuresKey)}
                                delayClass={portal.delay}
                                onClick={() => navigate(portal.path)}
                            />
                        ))}
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default PortalSelection;

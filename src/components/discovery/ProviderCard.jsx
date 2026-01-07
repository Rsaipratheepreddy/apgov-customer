"use client";

import React from 'react';
import {
    Star,
    MapPin,
    ArrowRight,
    Verified,
    Drones,
    CheckCircle2,
    Calendar,
    ArrowUpRight
} from 'lucide-react';
import useLanguage from '../../hooks/useLanguage';

/**
 * Premium, flat Provider Card.
 * Fully translated, mobile-first, Poppins font.
 */
const ProviderCard = ({ provider, onClick }) => {
    const { t } = useLanguage();

    return (
        <div
            onClick={onClick}
            className="group bg-white border border-[#e2e8f0] rounded-[32px] overflow-hidden transition-all active:scale-[0.98] cursor-pointer flex flex-col h-full"
        >
            {/* Image Section */}
            <div className="relative h-48 md:h-56 overflow-hidden">
                <img
                    src={provider.image}
                    alt={provider.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-active:scale-105"
                />

                {/* Badges */}
                <div className="absolute top-4 left-4 flex flex-col gap-2">
                    {provider.verified && (
                        <div className="bg-[#154a21] text-white px-3 py-1.5 rounded-xl flex items-center gap-1.5 shadow-xl shadow-green-900/20">
                            <Verified size={14} />
                            <span className="text-[10px] font-black uppercase tracking-widest">{t("customer.discovery.providerCard.verified")}</span>
                        </div>
                    )}
                    {provider.availability === 'Available Today' && (
                        <div className="bg-white/90 backdrop-blur-md text-[#154a21] px-3 py-1.5 rounded-xl flex items-center gap-1.5 border border-white">
                            <div className="w-1.5 h-1.5 rounded-full bg-[#154a21] animate-pulse" />
                            <span className="text-[10px] font-black uppercase tracking-widest">{t("customer.discovery.providerCard.availableToday")}</span>
                        </div>
                    )}
                </div>

                {/* Rating - Floating Right */}
                <div className="absolute top-4 right-4 bg-white px-3 py-1.5 rounded-xl flex items-center gap-1 border border-[#e2e8f0] shadow-xl shadow-black/5">
                    <Star size={14} className="fill-[#154a21] text-[#154a21]" />
                    <span className="text-xs font-black text-[#1d1d1f]">{provider.rating}</span>
                </div>
            </div>

            {/* Content Section */}
            <div className="p-6 md:p-8 flex flex-col flex-grow">
                <div className="mb-4">
                    <h3 className="text-xl font-black text-[#154a21] leading-tight mb-2 group-active:text-[#1d1d1f] transition-colors line-clamp-1">
                        {provider.name}
                    </h3>
                    <div className="flex items-center gap-2 text-[#64748b]">
                        <MapPin size={16} className="text-[#154a21]" />
                        <span className="text-xs font-bold">{provider.location.district}</span>
                        <span className="text-[#e2e8f0]">•</span>
                        <span className="text-xs font-bold">{provider.distance} {t("customer.discovery.providerCard.distance")}</span>
                    </div>
                </div>

                {/* Services Tags */}
                <div className="flex flex-wrap gap-2 mb-6">
                    {provider.services.slice(0, 2).map((service, idx) => (
                        <span
                            key={idx}
                            className="bg-[#f8fafc] text-[#154a21] border border-[#e2e8f0] px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-wider"
                        >
                            {service.name}
                        </span>
                    ))}
                    {provider.services.length > 2 && (
                        <span className="text-[10px] font-black text-[#64748b] pt-1.5">
                            +{provider.services.length - 2}
                        </span>
                    )}
                </div>

                {/* Stats Row */}
                <div className="grid grid-cols-2 gap-4 pt-6 border-t border-[#f1f5f9] mt-auto">
                    <div>
                        <p className="text-[9px] font-black text-[#64748b] uppercase tracking-widest mb-1">{t("customer.discovery.providerCard.startsFrom")}</p>
                        <div className="flex items-baseline gap-1 text-[#154a21]">
                            <span className="text-xs font-black italic">₹</span>
                            <span className="text-xl font-black lg:text-2xl">{provider.priceRange.min}</span>
                        </div>
                    </div>
                    <div className="text-right">
                        <p className="text-[9px] font-black text-[#64748b] uppercase tracking-widest mb-1">{t("customer.discovery.providerCard.servicesCompleted")}</p>
                        <p className="text-base font-black text-[#1d1d1f]">{provider.missionsCompleted}</p>
                    </div>
                </div>

                {/* Action - Better Visibility on Mobile */}
                <div className="mt-6 md:mt-8 flex items-center justify-between gap-3">
                    <button
                        onClick={(e) => { e.stopPropagation(); onClick(); }}
                        className="flex-grow md:flex-none h-12 md:h-14 px-6 md:px-8 bg-[#154a21] text-white rounded-2xl font-black text-[10px] md:text-xs uppercase tracking-widest flex items-center justify-center gap-3 active:scale-95 transition-all shadow-xl shadow-green-900/10"
                    >
                        {t("customer.discovery.providerCard.viewDetails")}
                        <ArrowUpRight size={16} />
                    </button>

                    <button className="md:hidden h-12 w-12 shrink-0 bg-[#f8fafc] border border-[#e2e8f0] text-[#154a21] rounded-2xl flex items-center justify-center active:scale-95">
                        <ArrowRight size={20} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProviderCard;

"use client";

import React, { useMemo, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
    ArrowLeft,
    MapPin,
    Star,
    CheckCircle,
    Calendar as CalendarIcon,
    ShieldCheck,
    Award,
    Package,
    ChevronRight,
    Info
} from 'lucide-react';
import useLanguage from '../../hooks/useLanguage';
import DiscoveryHeader from '../../components/discovery/DiscoveryHeader';
import Footer from '../../components/Footer';
import { SERVICE_PROVIDERS } from '../../constants/mockData';

const ProviderDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { t } = useLanguage();

    const provider = useMemo(() => SERVICE_PROVIDERS.find(p => p.id === id), [id]);
    const [selectedService, setSelectedService] = useState(null);

    if (!provider) return null;

    return (
        <div className="min-h-screen flex flex-col bg-white">
            <DiscoveryHeader />

            {/* Breadcrumbs / Back */}
            <div className="bg-white border-b border-[#e2e8f0] h-16 flex items-center">
                <div className="max-w-[1200px] mx-auto w-full px-6 flex items-center justify-between">
                    <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-[#64748b] font-bold active:scale-95">
                        <ArrowLeft size={20} />
                        <span className="text-sm">{t("common.back")}</span>
                    </button>
                    <div className="hidden sm:flex items-center gap-2">
                        <span className="text-xs font-bold text-[#64748b] uppercase tracking-wider">{t("header.nav.services")}</span>
                        <ChevronRight size={14} className="text-[#64748b]" />
                        <span className="text-xs font-bold text-[#154a21] uppercase tracking-wider">{provider.name}</span>
                    </div>
                    <div className="w-10" />
                </div>
            </div>

            <main className="flex-grow max-w-[1200px] mx-auto w-full p-4 sm:p-6 md:p-12 overflow-hidden">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-12">

                    {/* Left Column: Profile & Info */}
                    <div className="lg:col-span-2 space-y-8 animate-fade-in-up">

                        {/* Header Section - No Glass Card */}
                        <div className="bg-white border border-[#e2e8f0] rounded-[24px] md:rounded-[32px] p-6 md:p-12 relative overflow-hidden">
                            <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-start md:items-center relative z-10">
                                <div className="w-24 h-24 md:w-40 md:h-40 rounded-2xl md:rounded-3xl overflow-hidden border-4 border-[#f8fafc] bg-[#f8fafc]">
                                    <img src={provider.image} alt={provider.name} className="w-full h-full object-cover" />
                                </div>

                                <div className="flex-grow">
                                    <div className="flex flex-wrap items-center gap-3 mb-4">
                                        {provider.verified && (
                                            <span className="bg-[#154a21] text-white px-4 py-1.5 rounded-xl text-xs font-black uppercase tracking-widest flex items-center gap-2">
                                                <CheckCircle size={14} fill="white" className="text-[#154a21]" />
                                                {t("customer.providerDetails.verifiedBadge")}
                                            </span>
                                        )}
                                        <div className="flex items-center gap-1.5 bg-[#f1f8f1] px-4 py-1.5 rounded-xl border border-[#154a21]/10">
                                            <Star size={16} fill="#154a21" className="text-[#154a21]" />
                                            <span className="text-sm font-black text-[#154a21]">{provider.rating}</span>
                                            <span className="text-[#64748b] text-xs font-bold">({provider.reviewCount})</span>
                                        </div>
                                    </div>

                                    <h1 className="text-4xl font-black text-[#154a21] leading-tight mb-2 tracking-tight">{provider.name}</h1>
                                    <p className="text-lg font-bold text-[#64748b] flex items-center gap-2">
                                        {provider.businessName}
                                    </p>

                                    <div className="flex flex-wrap items-center gap-6 mt-8">
                                        <div className="flex items-center gap-2 text-[#154a21] font-bold">
                                            <MapPin size={20} />
                                            <span className="text-sm">{provider.location.area}, {provider.location.district}</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-[#154a21] font-bold">
                                            <Package size={20} />
                                            <span className="text-sm">{provider.servicesCompleted}+ {t("customer.providerDetails.missionsDone")}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* About & Certs Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
                            <div className="bg-white border border-[#e2e8f0] rounded-2xl md:rounded-3xl p-6 md:p-8 space-y-4">
                                <h3 className="text-[10px] font-black text-[#154a21] uppercase tracking-[0.2em] flex items-center gap-2">
                                    <Info size={16} />
                                    {t("customer.providerDetails.about")}
                                </h3>
                                <p className="text-sm md:text-base text-[#64748b] leading-relaxed font-semibold">
                                    {provider.description}
                                </p>
                            </div>

                            <div className="bg-white border border-[#e2e8f0] rounded-2xl md:rounded-3xl p-6 md:p-8 space-y-4">
                                <h3 className="text-[10px] font-black text-[#154a21] uppercase tracking-[0.2em] flex items-center gap-2">
                                    <Award size={16} />
                                    {t("customer.providerDetails.certifications")}
                                </h3>
                                <div className="space-y-3">
                                    {provider.certifications.length > 0 ? (
                                        provider.certifications.map((cert, i) => (
                                            <div key={i} className="flex items-center gap-3 text-xs md:text-sm font-bold text-[#154a21] bg-[#f1f8f1] p-3 rounded-lg border border-[#154a21]/5">
                                                <CheckCircle size={14} />
                                                {cert}
                                            </div>
                                        ))
                                    ) : (
                                        <div className="flex items-center gap-3 text-xs md:text-sm font-bold text-[#154a21] bg-[#f1f8f1] p-3 rounded-lg border border-[#154a21]/5">
                                            <CheckCircle size={14} />
                                            DGCA Pilot License Type-A
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Services List - Large Padding */}
                        <div className="space-y-6">
                            <h2 className="text-2xl font-black text-[#154a21] flex items-center gap-3 p-2">
                                <Package className="text-[#154a21]" />
                                {t("customer.providerDetails.selectService")}
                            </h2>

                            <div className="grid grid-cols-1 gap-3 md:gap-4">
                                {provider.services.map((service, idx) => (
                                    <div
                                        key={idx}
                                        onClick={() => setSelectedService(idx === selectedService ? null : idx)}
                                        className={`p-5 md:p-8 rounded-[20px] md:rounded-3xl border-2 transition-all cursor-pointer group flex flex-col md:flex-row md:items-center justify-between gap-4 md:gap-6 ${selectedService === idx
                                            ? 'bg-[#154a21] border-[#154a21] text-white'
                                            : 'bg-white border-[#e2e8f0] text-[#154a21] hover:border-[#154a21]/20'
                                            }`}
                                    >
                                        <div className="flex items-center gap-4 md:gap-6">
                                            <div className={`w-12 h-12 md:w-16 md:h-16 rounded-xl md:rounded-2xl flex items-center justify-center shrink-0 ${selectedService === idx ? 'bg-white/10' : 'bg-[#f8fafc]'
                                                }`}>
                                                <Package size={24} />
                                            </div>
                                            <div>
                                                <h4 className={`text-lg md:text-xl font-black ${selectedService === idx ? 'text-white' : 'text-[#154a21]'}`}>{service.name}</h4>
                                                <p className={`text-xs md:text-sm font-bold ${selectedService === idx ? 'text-white/70' : 'text-[#64748b]'}`}>
                                                    {service.duration} {t("customer.providerDetails.minutes")} • Precision Coverage
                                                </p>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-4 md:gap-6 justify-between md:justify-end">
                                            <div className="text-right">
                                                <span className={`text-[9px] md:text-[10px] font-black uppercase tracking-widest block mb-1 ${selectedService === idx ? 'text-white/60' : 'text-[#64748b]'}`}>{t("customer.shop.price")}</span>
                                                <div className="flex items-baseline gap-0.5">
                                                    <span className="text-xs md:text-sm font-black italic">₹</span>
                                                    <span className="text-xl md:text-2xl font-black">{service.price}</span>
                                                </div>
                                            </div>
                                            <ChevronRight size={20} className={`transition-transform duration-300 ${selectedService === idx ? 'rotate-90' : 'group-hover:translate-x-1'}`} />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Sticky Booking Card - Flatter */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-28 bg-white border border-[#e2e8f0] rounded-[24px] md:rounded-[32px] p-6 md:p-10 space-y-6 md:space-y-8">
                            <h3 className="text-xl md:text-2xl font-black text-[#154a21]">{t("customer.booking.summary")}</h3>

                            <div className="space-y-6">
                                <div className="flex items-start gap-4">
                                    <div className="w-10 h-10 bg-[#f1f8f1] rounded-xl flex items-center justify-center text-[#154a21] shrink-0">
                                        <CalendarIcon size={20} />
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-black text-[#154a21] uppercase tracking-widest">{t("customer.providerDetails.instantBooking")}</p>
                                        <p className="text-xs font-bold text-[#64748b]">{t("customer.booking.selectSlot")}</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="w-10 h-10 bg-[#f1f8f1] rounded-xl flex items-center justify-center text-[#154a21] shrink-0">
                                        <ShieldCheck size={20} />
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-black text-[#154a21] uppercase tracking-widest">{t("customer.providerDetails.safeSecure")}</p>
                                        <p className="text-xs font-bold text-[#64748b]">{t("customer.providerDetails.govVerified")}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="p-6 bg-[#f8fafc] rounded-2xl border border-[#e2e8f0] text-center">
                                <p className="text-[10px] font-bold text-[#64748b] uppercase tracking-widest mb-1">{t("customer.providerDetails.total")}</p>
                                <div className="flex items-center justify-center gap-1 text-[#154a21]">
                                    <span className="text-sm font-black">₹</span>
                                    <p className="text-3xl font-black">
                                        {selectedService !== null ? provider.services[selectedService].price : "0"}
                                    </p>
                                </div>
                            </div>

                            <button
                                disabled={selectedService === null}
                                onClick={() => navigate(`/customer/booking/${provider.id}?service=${provider.services[selectedService].type}`)}
                                className={`w-full h-16 rounded-2xl font-black text-lg flex items-center justify-center gap-3 transition-all ${selectedService === null
                                    ? 'bg-[#f8fafc] text-[#cbd5e1] border border-[#e2e8f0] cursor-not-allowed shadow-none'
                                    : 'bg-[#154a21] text-white active:scale-95'
                                    }`}
                            >
                                {t("customer.providerDetails.continueToSlots")}
                                <ChevronRight size={20} />
                            </button>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default ProviderDetails;

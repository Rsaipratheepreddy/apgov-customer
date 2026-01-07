"use client";

import React, { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    ArrowLeft,
    Clock,
    CheckCircle,
    MapPin,
    FileText,
    ChevronRight,
    Navigation,
    MessageSquare,
    Star,
    Smartphone
} from 'lucide-react';
import useLanguage from '../../hooks/useLanguage';
import DiscoveryHeader from '../../components/discovery/DiscoveryHeader';
import Footer from '../../components/Footer';
import { MOCK_BOOKINGS } from '../../constants/mockData';

/**
 * Flat, minimalist Booking History view.
 * Poppins font, deep green branding, shadow-less UI.
 */
const BookingHistory = () => {
    const navigate = useNavigate();
    const { t } = useLanguage();

    const getStatusStyles = (status) => {
        switch (status) {
            case 'scheduled': return 'bg-[#f1f8f1] text-[#2e7d32] border-[#2e7d32]/10';
            case 'accepted': return 'bg-[#fff9c4] text-[#f57f17] border-[#f57f17]/10';
            case 'in-progress': return 'bg-[#154a21] text-white border-transparent animate-pulse';
            case 'completed': return 'bg-[#f8fafc] text-[#64748b] border-[#e2e8f0]';
            default: return 'bg-[#f8fafc] text-[#64748b] border-[#e2e8f0]';
        }
    };

    const getStatusLabel = (status) => {
        switch (status) {
            case 'scheduled': return t("customer.history.status.scheduled");
            case 'accepted': return t("customer.history.status.accepted");
            case 'in-progress': return t("customer.history.status.in-progress");
            case 'completed': return t("customer.history.status.completed");
            default: return status;
        }
    };

    return (
        <div className="min-h-screen flex flex-col bg-white">
            <DiscoveryHeader />

            <div className="bg-white border-b border-[#e2e8f0] py-8 md:py-16">
                <div className="max-w-[1000px] mx-auto px-6">
                    <div className="flex flex-col gap-3 md:gap-4">
                        <button
                            onClick={() => navigate('/')}
                            className="flex items-center gap-2 text-[#64748b] font-bold active:scale-95 w-fit"
                        >
                            <ArrowLeft size={16} />
                            <span className="text-[10px] font-black uppercase tracking-widest">{t("customer.history.backToDirectory")}</span>
                        </button>
                        <h1 className="text-3xl md:text-5xl font-black text-[#154a21] tracking-tight">{t("customer.history.title")}</h1>
                    </div>
                </div>
            </div>

            <main className="flex-grow max-w-[1000px] mx-auto w-full p-6 md:p-12 mb-12">
                <div className="space-y-6">
                    {MOCK_BOOKINGS.length > 0 ? (
                        MOCK_BOOKINGS.map((booking, idx) => (
                            <div
                                key={booking.id}
                                className="bg-white border border-[#e2e8f0] rounded-[24px] md:rounded-[32px] p-6 md:p-10 flex flex-col md:flex-row gap-6 md:gap-8 md:items-center animate-fade-in-up"
                                style={{ animationDelay: `${idx * 100}ms` }}
                            >
                                {/* Status & ID */}
                                <div className="flex-grow space-y-6">
                                    <div className="flex flex-wrap items-center gap-3">
                                        <span className={`px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest border ${getStatusStyles(booking.status)}`}>
                                            {getStatusLabel(booking.status)}
                                        </span>
                                        <span className="text-[10px] font-black text-[#64748b] bg-[#f8fafc] px-3 py-1.5 rounded-xl border border-[#e2e8f0]">
                                            {t("customer.history.id")}: {booking.id}
                                        </span>
                                    </div>

                                    <div>
                                        <h3 className="text-2xl font-black text-[#154a21] leading-tight mb-2">{booking.serviceName}</h3>
                                        <p className="text-[#64748b] font-bold flex items-center gap-2">
                                            <MapPin size={18} className="text-[#154a21]" />
                                            {booking.providerName}
                                        </p>
                                    </div>

                                    <div className="flex flex-wrap items-center gap-x-8 gap-y-4">
                                        <div className="flex items-center gap-3 text-[#154a21] bg-[#f1f8f1] px-4 py-2 rounded-xl">
                                            <Clock size={18} />
                                            <span className="text-sm font-black">{new Date(booking.date).toLocaleDateString()}</span>
                                            <span className="text-[#154a21]/30">|</span>
                                            <span className="text-sm font-black">{booking.slot}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <span className="text-[10px] font-black text-[#64748b] uppercase tracking-widest">{t("customer.history.fee")}:</span>
                                            <div className="flex items-baseline gap-0.5 text-[#154a21]">
                                                <span className="text-sm font-black italic">₹</span>
                                                <span className="text-xl font-black">{booking.amount}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Actions - Flatter Buttons */}
                                <div className="flex flex-col gap-2 md:gap-3 shrink-0">
                                    {booking.status === 'in-progress' && (
                                        <button className="h-12 md:h-14 px-8 bg-[#154a21] text-white rounded-xl md:rounded-2xl font-black text-xs md:text-sm uppercase tracking-widest flex items-center justify-center gap-3 active:scale-95 transition-all shadow-xl shadow-green-900/10">
                                            <Navigation size={18} />
                                            {t("customer.history.track")}
                                        </button>
                                    )}
                                    {booking.status === 'completed' && (
                                        <div className="flex flex-col gap-2 md:gap-3">
                                            <button className="h-12 md:h-14 px-8 bg-white border border-[#154a21] text-[#154a21] rounded-xl md:rounded-2xl font-black text-xs md:text-sm uppercase tracking-widest flex items-center justify-center gap-3 active:scale-95 transition-all">
                                                <FileText size={18} />
                                                {t("customer.history.report")}
                                            </button>
                                            <button className="h-12 md:h-14 px-8 bg-[#f1f8f1] text-[#154a21] rounded-xl md:rounded-2xl font-black text-xs md:text-sm uppercase tracking-widest flex items-center justify-center gap-3 active:scale-95 transition-all">
                                                <Star size={18} />
                                                {t("customer.history.rate")}
                                            </button>
                                        </div>
                                    )}
                                    {(booking.status === 'scheduled' || booking.status === 'accepted') && (
                                        <div className="flex flex-col gap-2 md:gap-3">
                                            <button className="h-12 md:h-14 px-8 bg-[#154a21] text-white rounded-xl md:rounded-2xl font-black text-xs md:text-sm uppercase tracking-widest flex items-center justify-center gap-3 active:scale-95 transition-all">
                                                <MessageSquare size={18} />
                                                {t("customer.history.contact")}
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="py-24 text-center border-2 border-dashed border-[#e2e8f0] rounded-[40px]">
                            <div className="w-20 h-20 bg-[#f8fafc] rounded-[24px] flex items-center justify-center mx-auto mb-6 text-[#64748b] border border-[#e2e8f0]">
                                <Clock size={40} />
                            </div>
                            <h3 className="text-2xl font-black text-[#154a21] mb-2">No bookings yet</h3>
                            <p className="text-[#64748b] font-bold mb-8">Ready to book your first mission? Our pilots are standing by.</p>
                            <button
                                onClick={() => navigate('/')}
                                className="px-12 py-4 bg-[#154a21] text-white rounded-2xl font-black text-sm uppercase tracking-widest active:scale-95 shadow-xl shadow-green-900/10"
                            >
                                Find Providers
                            </button>
                        </div>
                    )}
                </div>

                {/* Support Card - Flat Design */}
                <div className="mt-20 bg-[#154a21] rounded-[40px] p-10 md:p-16 text-white flex flex-col lg:flex-row items-center justify-between gap-10 relative overflow-hidden">
                    <div className="relative z-10 text-center lg:text-left">
                        <h2 className="text-3xl md:text-4xl font-black mb-4 tracking-tight">{t("customer.history.support.title")}</h2>
                        <p className="text-white/70 max-w-md font-bold text-lg leading-relaxed">
                            {t("customer.history.support.desc")}
                        </p>
                    </div>

                    <div className="relative z-10 flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
                        <button className="h-16 px-10 bg-white text-[#154a21] rounded-2xl font-black text-sm uppercase tracking-widest flex items-center justify-center gap-4 active:scale-95 transition-all shadow-2xl">
                            <Smartphone size={24} />
                            {t("customer.history.support.call")}
                        </button>
                        <button className="h-16 px-10 bg-white/10 border border-white/20 text-white rounded-2xl font-black text-sm uppercase tracking-widest flex items-center justify-center gap-4 active:scale-95 transition-all">
                            <MessageSquare size={24} />
                            {t("customer.history.support.whatsapp")}
                        </button>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default BookingHistory;

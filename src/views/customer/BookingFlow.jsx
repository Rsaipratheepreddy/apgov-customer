"use client";

import React, { useState, useMemo, useEffect } from 'react';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import {
    ArrowLeft,
    Calendar as CalendarIcon,
    Clock,
    CheckCircle,
    ChevronRight,
    ShieldCheck,
    Smartphone,
    Lock,
    ChevronLeft,
    Info
} from 'lucide-react';
import useLanguage from '../../hooks/useLanguage';
import DiscoveryHeader from '../../components/discovery/DiscoveryHeader';
import Footer from '../../components/Footer';
import { SERVICE_PROVIDERS } from '../../constants/mockData';
import localStorageUtil from '../../utils/localStorage';

/**
 * Redesigned Booking Flow: Flat UI, Poppins Font, 
 * No intermediate auth modal (moved to Payment).
 */
const BookingFlow = () => {
    const { id } = useParams();
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const { t, currentLanguage } = useLanguage();

    const provider = useMemo(() => SERVICE_PROVIDERS.find(p => p.id === id), [id]);
    const serviceType = searchParams.get('service') || 'agriculture';
    const service = useMemo(() => provider?.services.find(s => s.type === serviceType), [provider, serviceType]);

    // --- State ---
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedSlot, setSelectedSlot] = useState(null);
    const [hasConsent, setHasConsent] = useState(false);

    // --- Helpers ---
    const dates = useMemo(() => {
        const arr = [];
        for (let i = 0; i < 7; i++) {
            const d = new Date();
            d.setDate(d.getDate() + i);
            arr.push(d);
        }
        return arr;
    }, []);

    const slots = {
        morning: ["08:00 AM", "09:00 AM", "10:00 AM", "11:00 AM"],
        afternoon: ["12:00 PM", "01:00 PM", "02:00 PM", "03:00 PM"],
        evening: ["04:00 PM", "05:00 PM"]
    };

    const handleConfirmBooking = () => {
        if (!hasConsent || !selectedDate || !selectedSlot) return;
        // Proceed to Payment where Auth will be handled
        navigate(`/customer/checkout/${id}?service=${serviceType}&date=${selectedDate?.toISOString()}&slot=${selectedSlot}`);
    };

    if (!provider || !service) return null;

    return (
        <div className="min-h-screen flex flex-col bg-white">
            <DiscoveryHeader />

            <div className="bg-white border-b border-[#e2e8f0] h-16 flex items-center">
                <div className="max-w-[1000px] mx-auto w-full px-6 flex items-center justify-between">
                    <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-[#64748b] font-bold active:scale-95">
                        <ArrowLeft size={20} />
                        <span className="text-sm font-bold">{t("common.back")}</span>
                    </button>
                    <h1 className="text-lg font-black text-[#154a21] uppercase tracking-wider">{t("customer.booking.title")}</h1>
                    <div className="w-10" />
                </div>
            </div>

            <main className="flex-grow max-w-[1000px] mx-auto w-full p-4 sm:p-6 md:p-12 overflow-hidden">
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 md:gap-12 items-start">

                    {/* Main Selectors */}
                    <div className="lg:col-span-3 space-y-12">

                        {/* Step 1: Date */}
                        <section className="animate-fade-in-up">
                            <div className="flex items-center gap-4 mb-8">
                                <div className="w-10 h-10 bg-[#154a21] text-white rounded-2xl flex items-center justify-center font-black text-lg">1</div>
                                <h3 className="text-2xl font-black text-[#154a21] tracking-tight">{t("customer.booking.selectDate")}</h3>
                            </div>
                            <div className="grid grid-cols-4 sm:grid-cols-7 gap-2 md:gap-3">
                                {dates.map((date, i) => {
                                    const isSelected = selectedDate?.toDateString() === date.toDateString();
                                    return (
                                        <button
                                            key={i}
                                            onClick={() => { setSelectedDate(date); setSelectedSlot(null); }}
                                            className={`flex flex-col items-center justify-center p-4 rounded-2xl border-2 transition-all active:scale-90 ${isSelected
                                                ? 'border-[#154a21] bg-[#154a21] text-white'
                                                : 'border-[#e2e8f0] bg-white text-[#64748b] hover:border-[#154a21]/20'
                                                }`}
                                        >
                                            <span className={`text-[10px] font-black uppercase tracking-tighter mb-1 ${isSelected ? 'text-white/70' : 'text-[#64748b]'}`}>
                                                {date.toLocaleDateString(currentLanguage === 'te' ? 'te-IN' : 'en-US', { weekday: 'short' })}
                                            </span>
                                            <span className="text-sm md:text-xl font-black">{date.getDate()}</span>
                                        </button>
                                    );
                                })}
                            </div>
                        </section>

                        {/* Step 2: Slot */}
                        {selectedDate && (
                            <section className="animate-fade-in-up [animation-delay:100ms]">
                                <div className="flex items-center gap-4 mb-8">
                                    <div className="w-10 h-10 bg-[#154a21] text-white rounded-2xl flex items-center justify-center font-black text-lg">2</div>
                                    <h3 className="text-2xl font-black text-[#154a21] tracking-tight">{t("customer.booking.selectSlot")}</h3>
                                </div>

                                <div className="space-y-10">
                                    {Object.entries(slots).map(([timeOfDay, times]) => (
                                        <div key={timeOfDay}>
                                            <h4 className="text-[10px] font-black text-[#64748b] uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
                                                <Clock size={16} className="text-[#154a21]" />
                                                {t(`customer.booking.${timeOfDay}`)}
                                            </h4>
                                            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                                                {times.map((time, idx) => {
                                                    const isSelected = selectedSlot === time;
                                                    const isBooked = idx === 0 && timeOfDay === 'morning'; // Mock occupied
                                                    return (
                                                        <button
                                                            key={time}
                                                            disabled={isBooked}
                                                            onClick={() => setSelectedSlot(time)}
                                                            className={`h-14 rounded-xl border-2 font-black text-sm transition-all active:scale-95 ${isBooked ? 'bg-[#f8fafc] border-[#e2e8f0] text-[#cbd5e1] cursor-not-allowed line-through' :
                                                                isSelected ? 'border-[#154a21] bg-[#154a21] text-white' :
                                                                    'border-[#e2e8f0] bg-white text-[#154a21] hover:border-[#154a21]/20'
                                                                }`}
                                                        >
                                                            {time}
                                                        </button>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}
                    </div>

                    {/* Booking Summary Card - Flatter with White BG */}
                    <div className="lg:col-span-2">
                        <div className="sticky top-28 bg-white border border-[#e2e8f0] rounded-[24px] md:rounded-[32px] p-6 md:p-10 space-y-6 md:space-y-8">
                            <h3 className="text-xl md:text-2xl font-black text-[#154a21] tracking-tight">{t("customer.booking.summary")}</h3>

                            <div className="flex items-start gap-4 p-5 bg-[#f8fafc] rounded-2xl border border-[#e2e8f0]">
                                <div className="w-14 h-14 bg-white rounded-xl overflow-hidden shrink-0 border border-[#e2e8f0]">
                                    <img src={provider.image} alt="" className="w-full h-full object-cover" />
                                </div>
                                <div className="mt-1">
                                    <p className="font-black text-sm text-[#154a21] leading-tight mb-1">{provider.name}</p>
                                    <p className="text-xs font-bold text-[#64748b]">{service.name}</p>
                                </div>
                            </div>

                            <div className="space-y-5">
                                <div className="flex justify-between items-center text-sm">
                                    <span className="text-[#64748b] font-bold uppercase tracking-wider text-[10px]">{t("customer.booking.selectDate")}</span>
                                    <span className="font-black text-[#154a21]">{selectedDate?.toLocaleDateString(currentLanguage === 'te' ? 'te-IN' : 'en-US') || '---'}</span>
                                </div>
                                <div className="flex justify-between items-center text-sm">
                                    <span className="text-[#64748b] font-bold uppercase tracking-wider text-[10px]">{t("customer.booking.selectSlot")}</span>
                                    <span className="font-black text-[#154a21]">{selectedSlot || '---'}</span>
                                </div>
                                <div className="h-[1px] bg-[#e2e8f0]" />
                                <div className="flex justify-between items-center">
                                    <span className="text-[#154a21] font-black">{t("customer.booking.totalAmount")}</span>
                                    <div className="flex items-baseline gap-0.5 text-[#154a21]">
                                        <span className="text-sm font-black italic">₹</span>
                                        <span className="text-3xl font-black">{service.price}</span>
                                    </div>
                                </div>
                            </div>

                            <label className="flex items-start gap-3 cursor-pointer select-none group">
                                <div className="relative flex items-center mt-0.5">
                                    <input
                                        type="checkbox"
                                        checked={hasConsent}
                                        onChange={(e) => setHasConsent(e.target.checked)}
                                        className="appearance-none h-5 w-5 rounded-lg border-2 border-[#e2e8f0] checked:bg-[#154a21] checked:border-[#154a21] transition-all"
                                    />
                                    {hasConsent && <CheckCircle size={14} className="absolute left-0.5 text-white" />}
                                </div>
                                <span className="text-xs text-[#64748b] font-bold leading-relaxed transition-colors group-hover:text-[#154a21]">
                                    {t("customer.booking.privacyNotice")}
                                </span>
                            </label>

                            <button
                                disabled={!selectedDate || !selectedSlot || !hasConsent}
                                onClick={handleConfirmBooking}
                                className={`w-full h-16 rounded-2xl font-black text-lg flex items-center justify-center gap-3 transition-all ${!selectedDate || !selectedSlot || !hasConsent
                                    ? 'bg-[#f8fafc] text-[#cbd5e1] border border-[#e2e8f0] cursor-not-allowed shadow-none'
                                    : 'bg-[#154a21] text-white active:scale-95'
                                    }`}
                            >
                                {t("customer.booking.confirmBooking")}
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

export default BookingFlow;

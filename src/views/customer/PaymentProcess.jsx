"use client";

import React, { useState, useMemo, useEffect } from 'react';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import {
    ArrowLeft,
    CreditCard,
    Smartphone,
    Building2,
    ShieldCheck,
    ChevronRight,
    CheckCircle,
    Lock,
    User
} from 'lucide-react';
import useLanguage from '../../hooks/useLanguage';
import DiscoveryHeader from '../../components/discovery/DiscoveryHeader';
import Footer from '../../components/Footer';
import { SERVICE_PROVIDERS } from '../../constants/mockData';
import localStorageUtil from '../../utils/localStorage';

/**
 * Enhanced Payment Process: 
 * 1. Integrated Auth Check (Login as first step)
 * 2. Flat UI, Poppins Font, White BG
 * 3. Any username/password works (Mock Auth)
 */
const PaymentProcess = ({ forceStep }) => {
    const { id } = useParams();
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const { t } = useLanguage();

    const provider = useMemo(() => SERVICE_PROVIDERS.find(p => p.id === id), [id]);
    const serviceType = searchParams.get('service') || 'agriculture';
    const service = useMemo(() => provider?.services.find(s => s.type === serviceType), [provider, serviceType]);

    // --- State ---
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [authStep, setAuthStep] = useState('login'); // login, payment, success
    const [paymentMethod, setPaymentMethod] = useState('upi');
    const [isProcessing, setIsProcessing] = useState(false);

    // Auth Form State
    const [credentials, setCredentials] = useState({ mobile: '', password: '' });
    const [isSendingOtp, setIsSendingOtp] = useState(false);

    useEffect(() => {
        const auth = localStorageUtil.get('isCustomerAuth', false);
        if (forceStep) {
            setAuthStep(forceStep);
        } else if (auth) {
            setIsAuthenticated(true);
            setAuthStep('payment');
        }
    }, [forceStep]);

    const handleMockLogin = (e) => {
        e.preventDefault();
        setIsSendingOtp(true);
        setTimeout(() => {
            localStorageUtil.set('isCustomerAuth', true);
            setIsAuthenticated(true);
            if (forceStep) {
                navigate('/');
            } else {
                setAuthStep('payment');
            }
            setIsSendingOtp(false);
        }, 1200);
    };

    const handleMockRegister = (e) => {
        e.preventDefault();
        setIsSendingOtp(true);
        setTimeout(() => {
            localStorageUtil.set('isCustomerAuth', true);
            setIsAuthenticated(true);
            if (forceStep) {
                navigate('/');
            } else {
                setAuthStep('payment');
            }
            setIsSendingOtp(false);
        }, 1200);
    };

    const handlePayment = () => {
        setIsProcessing(true);
        setTimeout(() => {
            setIsProcessing(false);
            setAuthStep('success');
        }, 2000);
    };

    // If it's a standalone auth page, we might not have a provider/service
    const isStandalone = !!forceStep;
    if (!isStandalone && (!provider || !service)) return null;

    // --- Success Screen ---
    if (authStep === 'success') {
        return (
            <div className="min-h-screen flex flex-col bg-white">
                <DiscoveryHeader />
                <main className="flex-grow flex items-center justify-center p-4 sm:p-6 bg-[#f8fafc]">
                    <div className="max-w-md w-full bg-white border border-[#e2e8f0] rounded-[32px] md:rounded-[40px] p-8 md:p-10 text-center animate-fade-in-up">
                        <div className="w-24 h-24 bg-[#154a21] text-white rounded-full flex items-center justify-center mx-auto mb-8">
                            <CheckCircle size={56} fill="white" className="text-[#154a21]" />
                        </div>
                        <h2 className="text-3xl font-black text-[#154a21] mb-2 tracking-tight">{t("customer.booking.success")}</h2>
                        <p className="text-[#64748b] font-bold mb-10">{t("customer.checkout.paymentConfirmed").replace('{amount}', service.price)}</p>

                        <div className="bg-[#f8fafc] border border-[#e2e8f0] rounded-2xl p-6 mb-10 text-left space-y-4">
                            <div className="flex justify-between items-center">
                                <span className="text-[10px] font-black text-[#64748b] uppercase tracking-widest">{t("customer.checkout.transactionId")}</span>
                                <span className="text-xs font-mono font-bold text-[#154a21]">TXN-990218821</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-[10px] font-black text-[#64748b] uppercase tracking-widest">{t("customer.checkout.missionId")}</span>
                                <span className="text-xs font-bold text-[#154a21]">AP-DRONE-8821</span>
                            </div>
                        </div>

                        <button
                            onClick={() => navigate('/customer/bookings')}
                            className="w-full h-16 bg-[#154a21] text-white rounded-2xl font-black text-lg active:scale-[0.98] transition-all shadow-xl shadow-green-900/10"
                        >
                            {t("customer.booking.viewBookings")}
                        </button>
                    </div>
                </main>
                <Footer />
            </div>
        );
    }

    return (
        <div className="min-h-screen flex flex-col bg-white">
            <DiscoveryHeader />

            <div className="bg-white border-b border-[#e2e8f0] h-16 flex items-center">
                <div className="max-w-[800px] mx-auto w-full px-6 flex items-center justify-between">
                    <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-[#64748b] font-bold active:scale-95">
                        <ArrowLeft size={20} />
                        <span className="text-sm">{t("customer.checkout.cancel")}</span>
                    </button>
                    <h1 className="text-lg font-black text-[#154a21] uppercase tracking-wider">{t("customer.checkout.title")}</h1>
                    <div className="w-10" />
                </div>
            </div>

            <main className="flex-grow max-w-[800px] mx-auto w-full p-6 md:p-12 overflow-hidden">

                {authStep === 'login' ? (
                    /* Step 1: Integrated Login */
                    <div className="max-w-md mx-auto animate-fade-in-up">
                        <div className="text-center mb-10">
                            <div className="w-16 h-16 bg-[#f1f8f1] rounded-2xl flex items-center justify-center text-[#154a21] mx-auto mb-4">
                                <User size={32} />
                            </div>
                            <h2 className="text-3xl font-black text-[#154a21] tracking-tight mb-2">{t("customer.checkout.signIn")}</h2>
                            <p className="text-[#64748b] font-bold">{t("customer.checkout.signInDesc")}</p>
                        </div>

                        <form onSubmit={handleMockLogin} className="space-y-6">
                            <div className="space-y-4">
                                <div className="relative group">
                                    <Smartphone className="absolute left-4 top-1/2 -translate-y-1/2 text-[#64748b] group-focus-within:text-[#154a21] transition-colors" size={20} />
                                    <input
                                        required
                                        type="tel"
                                        placeholder={t("customer.checkout.mobile")}
                                        value={credentials.mobile}
                                        onChange={(e) => setCredentials({ ...credentials, mobile: e.target.value })}
                                        className="w-full h-14 pl-12 pr-4 bg-[#f8fafc] border border-[#e2e8f0] rounded-xl focus:border-[#154a21] outline-none text-base font-bold transition-all"
                                    />
                                </div>
                                <div className="relative group">
                                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-[#64748b] group-focus-within:text-[#154a21] transition-colors" size={20} />
                                    <input
                                        required
                                        type="password"
                                        placeholder={t("customer.checkout.password")}
                                        value={credentials.password}
                                        onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                                        className="w-full h-14 pl-12 pr-4 bg-[#f8fafc] border border-[#e2e8f0] rounded-xl focus:border-[#154a21] outline-none text-base font-bold transition-all"
                                    />
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={isSendingOtp}
                                className="w-full h-16 bg-[#154a21] text-white rounded-2xl font-black text-lg flex items-center justify-center gap-3 active:scale-95 transition-all shadow-xl shadow-green-900/10"
                            >
                                {isSendingOtp ? t("customer.checkout.verifying") : t("customer.checkout.signInAndPay")}
                                <ChevronRight size={20} />
                            </button>

                            <p className="text-center text-xs font-bold text-[#64748b]">
                                {t("customer.checkout.noAccount")} <button type="button" onClick={() => setAuthStep('register')} className="text-[#154a21] font-black underline underline-offset-4">{t("customer.checkout.createOne")}</button>
                            </p>
                        </form>
                    </div>
                ) : authStep === 'register' ? (
                    /* Step 1b: Integrated Register */
                    <div className="max-w-md mx-auto animate-fade-in-up">
                        <div className="text-center mb-10">
                            <div className="w-16 h-16 bg-[#f1f8f1] rounded-2xl flex items-center justify-center text-[#154a21] mx-auto mb-4">
                                <User size={32} />
                            </div>
                            <h2 className="text-3xl font-black text-[#154a21] tracking-tight mb-2">{t("customer.checkout.createAccount")}</h2>
                            <p className="text-[#64748b] font-bold">{t("customer.checkout.registerDesc")}</p>
                        </div>

                        <form onSubmit={handleMockRegister} className="space-y-6">
                            <div className="space-y-4">
                                <div className="relative group">
                                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-[#64748b] group-focus-within:text-[#154a21] transition-colors" size={20} />
                                    <input
                                        required
                                        type="text"
                                        placeholder={t("customer.checkout.fullName")}
                                        className="w-full h-14 pl-12 pr-4 bg-[#f8fafc] border border-[#e2e8f0] rounded-xl focus:border-[#154a21] outline-none text-base font-bold transition-all"
                                    />
                                </div>
                                <div className="relative group">
                                    <Smartphone className="absolute left-4 top-1/2 -translate-y-1/2 text-[#64748b] group-focus-within:text-[#154a21] transition-colors" size={20} />
                                    <input
                                        required
                                        type="tel"
                                        placeholder={t("customer.checkout.mobile")}
                                        className="w-full h-14 pl-12 pr-4 bg-[#f8fafc] border border-[#e2e8f0] rounded-xl focus:border-[#154a21] outline-none text-base font-bold transition-all"
                                    />
                                </div>
                                <div className="relative group">
                                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-[#64748b] group-focus-within:text-[#154a21] transition-colors" size={20} />
                                    <input
                                        required
                                        type="password"
                                        placeholder={t("customer.checkout.password")}
                                        className="w-full h-14 pl-12 pr-4 bg-[#f8fafc] border border-[#e2e8f0] rounded-xl focus:border-[#154a21] outline-none text-base font-bold transition-all"
                                    />
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={isSendingOtp}
                                className="w-full h-16 bg-[#154a21] text-white rounded-2xl font-black text-lg flex items-center justify-center gap-3 active:scale-95 transition-all shadow-xl shadow-green-900/10"
                            >
                                {isSendingOtp ? t("customer.checkout.verifying") : t("customer.checkout.registerAndPay")}
                                <ChevronRight size={20} />
                            </button>

                            <p className="text-center text-xs font-bold text-[#64748b]">
                                {t("customer.checkout.haveAccount")} <button type="button" onClick={() => setAuthStep('login')} className="text-[#154a21] font-black underline underline-offset-4">{t("customer.checkout.signIn")}</button>
                            </p>
                        </form>
                    </div>
                ) : (
                    /* Step 2: Payment Method Selection */
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 animate-fade-in-up">
                        <div className="space-y-6 md:space-y-8">
                            <h2 className="text-xl md:text-2xl font-black text-[#154a21] tracking-tight">{t("customer.checkout.selectPayment")}</h2>

                            <div className="space-y-4">
                                {[
                                    { id: 'upi', name: t("customer.checkout.methods.upi"), icon: Smartphone },
                                    { id: 'cards', name: t("customer.checkout.methods.cards"), icon: CreditCard },
                                    { id: 'netbanking', name: t("customer.checkout.methods.netbanking"), icon: Building2 }
                                ].map((method) => (
                                    <button
                                        key={method.id}
                                        onClick={() => setPaymentMethod(method.id)}
                                        className={`w-full p-5 rounded-2xl border-2 flex items-center gap-4 transition-all active:scale-[0.98] ${paymentMethod === method.id
                                            ? 'border-[#154a21] bg-[#f1f8f1] text-[#154a21]'
                                            : 'border-[#e2e8f0] bg-white text-[#64748b]'
                                            }`}
                                    >
                                        <div className={`p-2 rounded-xl ${paymentMethod === method.id ? 'bg-[#154a21] text-white' : 'bg-[#f8fafc] text-[#64748b]'}`}>
                                            <method.icon size={24} />
                                        </div>
                                        <span className="font-black text-sm uppercase tracking-tight">{method.name}</span>
                                        {paymentMethod === method.id && <CheckCircle size={20} fill="#154a21" className="ml-auto text-white" />}
                                    </button>
                                ))}
                            </div>

                            <div className="p-6 bg-[#f1f8f1] border border-[#154a21]/10 rounded-2xl flex items-start gap-3">
                                <ShieldCheck className="text-[#154a21] shrink-0 mt-1" size={20} />
                                <p className="text-xs text-[#154a21] leading-relaxed font-bold">
                                    {t("customer.checkout.secureNote")}
                                </p>
                            </div>
                        </div>

                        {/* Order Summary */}
                        <div className="space-y-6 md:space-y-8">
                            <h2 className="text-xl md:text-2xl font-black text-[#154a21] tracking-tight">{t("customer.checkout.summary")}</h2>
                            <div className="bg-white border border-[#e2e8f0] rounded-[24px] md:rounded-[32px] p-6 md:p-8 space-y-6 md:space-y-8">
                                <div className="space-y-5">
                                    <div className="flex justify-between items-center text-sm">
                                        <span className="text-[#64748b] font-bold uppercase tracking-wider text-[10px]">{t("customer.checkout.serviceFee")}</span>
                                        <span className="font-black text-[#154a21]">₹{service.price - 100}</span>
                                    </div>
                                    <div className="flex justify-between items-center text-sm">
                                        <span className="text-[#64748b] font-bold uppercase tracking-wider text-[10px]">{t("customer.checkout.convenienceFee")}</span>
                                        <span className="font-black text-[#154a21]">₹100</span>
                                    </div>
                                    <div className="h-[1px] bg-[#e2e8f0]" />
                                    <div className="flex justify-between items-center pt-2">
                                        <span className="text-[#154a21] font-black uppercase text-xs tracking-widest">Total Amount</span>
                                        <div className="flex items-baseline gap-0.5 text-[#154a21]">
                                            <span className="text-sm font-black italic">₹</span>
                                            <span className="text-3xl font-black">{service.price}</span>
                                        </div>
                                    </div>
                                </div>

                                <button
                                    onClick={handlePayment}
                                    disabled={isProcessing}
                                    className={`w-full h-14 md:h-16 rounded-xl md:rounded-2xl font-black text-base md:text-lg flex items-center justify-center gap-3 transition-all ${isProcessing
                                        ? 'bg-[#f8fafc] text-[#cbd5e1] border border-[#e2e8f0] cursor-not-allowed'
                                        : 'bg-[#154a21] text-white active:scale-95 shadow-xl shadow-green-900/10'
                                        }`}
                                >
                                    {isProcessing ? (
                                        <>
                                            <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                                            {t("common.loading")}
                                        </>
                                    ) : (
                                        <>
                                            {t("customer.checkout.paySecurely") || "Pay Securely"}
                                            <ChevronRight size={20} />
                                        </>
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </main>

            <Footer />
        </div>
    );
};

export default PaymentProcess;

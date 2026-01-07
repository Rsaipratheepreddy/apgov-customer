"use client";

import React, { useState, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
    ArrowLeft,
    ShoppingCart,
    ChevronRight,
    Star,
    ShieldCheck,
    Package,
    Check,
    CheckCircle,
    Truck
} from 'lucide-react';
import { DRONE_PRODUCTS } from '../../constants/mockData';
import DiscoveryHeader from '../../components/discovery/DiscoveryHeader';
import Footer from '../../components/Footer';
import useLanguage from '../../hooks/useLanguage';

const ProductDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { t } = useLanguage();
    const product = useMemo(() => DRONE_PRODUCTS.find(p => p.id === id), [id]);
    const [activeTab, setActiveTab] = useState('specs');

    if (!product) return null;

    return (
        <div className="min-h-screen flex flex-col bg-white">
            <DiscoveryHeader />

            {/* Breadcrumbs / Back - Flatter */}
            <div className="bg-white border-b border-[#e2e8f0] h-14 md:h-16 flex items-center">
                <div className="max-w-[1200px] mx-auto w-full px-4 md:px-8 flex items-center gap-6">
                    <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-[#64748b] font-bold active:scale-95">
                        <ArrowLeft size={18} />
                    </button>
                    <div className="flex items-center gap-2 overflow-hidden">
                        <span className="text-[10px] md:text-xs font-bold text-[#64748b] uppercase tracking-wider">{t("header.nav.shop")}</span>
                        <ChevronRight size={14} className="text-[#64748b]" />
                        <span className="text-[10px] md:text-xs font-bold text-[#154a21] uppercase tracking-wider truncate">{product.name}</span>
                    </div>
                </div>
            </div>

            <main className="flex-grow max-w-[1200px] mx-auto w-full p-4 md:p-8">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-start">

                    {/* Product Image Section */}
                    <div className="lg:col-span-7 space-y-4">
                        <div className="bg-[#f8fafc] border border-[#e2e8f0] rounded-[24px] md:rounded-3xl p-6 md:p-12 aspect-square flex items-center justify-center overflow-hidden">
                            <img
                                src={product.image}
                                alt={product.name}
                                className="w-full h-full object-contain mix-blend-multiply animate-fade-in"
                            />
                        </div>
                        {/* Minimal Gallery Placeholder */}
                        <div className="flex gap-4 overflow-x-auto no-scrollbar">
                            {[1, 2, 3].map(i => (
                                <div key={i} className="w-20 md:w-24 h-20 md:h-24 bg-[#f8fafc] border border-[#e2e8f0] rounded-2xl flex-shrink-0 cursor-pointer p-4">
                                    <img src={product.image} alt="" className="w-full h-full object-contain mix-blend-multiply opacity-50" />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Product Info Section */}
                    <div className="lg:col-span-5 flex flex-col animate-fade-in">
                        <div className="mb-6 md:mb-8">
                            <div className="flex items-center gap-2 mb-2 md:mb-3">
                                <span className="bg-[#f1f8f1] text-[#154a21] border border-[#154a21]/10 px-3 py-1 rounded-lg text-[9px] md:text-[10px] font-black uppercase tracking-widest">{product.brand}</span>
                                <div className="flex items-center gap-1 text-[#154a21]">
                                    <Star size={12} fill="currentColor" />
                                    <span className="text-xs md:text-sm font-black">{product.rating}</span>
                                </div>
                            </div>
                            <h1 className="text-2xl md:text-4xl font-black text-[#154a21] leading-tight mb-3 md:mb-4 tracking-tight">{product.name}</h1>
                            <p className="text-sm md:text-base text-[#64748b] font-medium leading-relaxed">{product.description}</p>
                        </div>

                        <div className="bg-[#f8fafc] border border-[#e2e8f0] rounded-[24px] md:rounded-3xl p-6 md:p-8 mb-6 md:mb-8">
                            <span className="text-[9px] md:text-[10px] font-black text-[#64748b] uppercase tracking-widest block mb-1">{t("customer.product.msrp")}</span>
                            <div className="flex items-baseline gap-1 text-[#154a21] mb-5 md:mb-6">
                                <span className="text-lg md:text-xl font-black italic">₹</span>
                                <span className="text-3xl md:text-5xl font-black">{product.price.toLocaleString()}</span>
                            </div>

                            <div className="space-y-3 md:space-y-4">
                                <button className="w-full h-14 md:h-16 bg-[#154a21] text-white rounded-xl md:rounded-2xl font-black text-base md:text-lg shadow-xl shadow-green-900/10 active:scale-95 transition-all flex items-center justify-center gap-3">
                                    {t("customer.product.buyNow")}
                                    <ChevronRight size={18} />
                                </button>
                                <button className="w-full h-14 md:h-16 bg-white border-2 border-[#154a21] text-[#154a21] rounded-xl md:rounded-2xl font-black text-base md:text-lg active:scale-95 transition-all flex items-center justify-center gap-3">
                                    <ShoppingCart size={18} />
                                    {t("customer.product.addToCart")}
                                </button>
                            </div>
                        </div>

                        {/* Micro-Features */}
                        <div className="grid grid-cols-2 gap-4 mb-8">
                            <div className="flex items-center gap-3 p-4 border border-[#e2e8f0] rounded-2xl bg-white">
                                <Truck size={20} className="text-[#154a21]" />
                                <span className="text-xs font-bold text-[#154a21]">{t("customer.product.fastDelivery")}</span>
                            </div>
                            <div className="flex items-center gap-3 p-4 border border-[#e2e8f0] rounded-2xl bg-white">
                                <ShieldCheck size={20} className="text-[#154a21]" />
                                <span className="text-xs font-bold text-[#154a21]">{t("customer.product.warranty")}</span>
                            </div>
                        </div>

                        {/* Selection/Details Tabs */}
                        <div className="space-y-6">
                            <div className="flex border-b border-[#e2e8f0]">
                                {['specs', 'warranty'].map(tab => (
                                    <button
                                        key={tab}
                                        onClick={() => setActiveTab(tab)}
                                        className={`px-8 py-4 text-xs font-black uppercase tracking-widest relative transition-all ${activeTab === tab ? 'text-[#154a21]' : 'text-[#64748b]'
                                            }`}
                                    >
                                        {t(`customer.product.tabs.${tab}`)}
                                        {activeTab === tab && <div className="absolute bottom-[-1px] left-0 right-0 h-1 bg-[#154a21]" />}
                                    </button>
                                ))}
                            </div>

                            <div className="py-4 animate-fade-in">
                                {activeTab === 'specs' ? (
                                    <div className="grid grid-cols-1 gap-4">
                                        {Object.entries(product.specs).map(([key, val], idx) => (
                                            <div key={idx} className="flex justify-between items-center py-4 border-b border-[#f1f5f9] last:border-0">
                                                <span className="text-xs font-bold text-[#64748b] uppercase tracking-wider">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                                                <span className="text-sm font-black text-[#154a21]">{val}</span>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="text-sm font-medium text-[#64748b] leading-relaxed">
                                        {t("customer.product.tabs.warrantyDesc")}
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default ProductDetails;

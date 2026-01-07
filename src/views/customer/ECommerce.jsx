"use client";

import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Search,
    Filter,
    ShoppingBag,
    ChevronRight,
    Star,
    ArrowLeft,
    Tag,
    Info,
    ShoppingCart
} from 'lucide-react';
import useLanguage from '../../hooks/useLanguage';
import DiscoveryHeader from '../../components/discovery/DiscoveryHeader';
import Footer from '../../components/Footer';
import { DRONE_PRODUCTS } from '../../constants/mockData';

/**
 * Premium Drone Shop Page.
 * Fully translated, flat green design, Poppins font.
 */
const ECommerce = () => {
    const { t } = useLanguage();
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState('');
    const [activeCategory, setActiveCategory] = useState('all');

    const categories = [
        { id: 'all', label: t("customer.shop.categories.all") },
        { id: 'drones', label: t("customer.shop.categories.drones") },
        { id: 'parts', label: t("customer.shop.categories.parts") },
        { id: 'accessories', label: t("customer.shop.categories.accessories") }
    ];

    const filteredProducts = useMemo(() => {
        return DRONE_PRODUCTS.filter(product => {
            const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                product.description.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesCategory = activeCategory === 'all' || product.category === activeCategory;
            return matchesSearch && matchesCategory;
        });
    }, [searchQuery, activeCategory]);

    return (
        <div className="min-h-screen flex flex-col bg-white">
            <DiscoveryHeader />

            {/* Hero / Header Section */}
            <div className="bg-white border-b border-[#e2e8f0] py-12 md:py-20 overflow-hidden relative">
                <div className="max-w-[1400px] mx-auto px-6 md:px-12 relative z-10">
                    <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
                        <div className="max-w-2xl">
                            <div className="inline-flex items-center gap-2 bg-[#f1f8f1] px-4 py-2 rounded-xl text-[#154a21] font-black text-[10px] uppercase tracking-widest mb-6">
                                <Tag size={14} />
                                {t("header.nav.shop")}
                            </div>
                            <h1 className="text-4xl md:text-6xl font-black text-[#154a21] tracking-tight leading-[1.1] mb-6">
                                {t("customer.shop.title")}
                            </h1>
                        </div>

                        {/* Quick Stats or Shop Info */}
                        <div className="flex gap-4 md:gap-8">
                            <div className="p-4 bg-[#f8fafc] border border-[#e2e8f0] rounded-[24px] min-w-[140px]">
                                <p className="text-[10px] font-black text-[#64748b] uppercase tracking-widest mb-1">{t("customer.discovery.results.providers")}</p>
                                <p className="text-2xl font-black text-[#154a21]">24+</p>
                            </div>
                            <div className="p-4 bg-[#f1f8f1] border border-[#154a21]/10 rounded-[24px] min-w-[140px]">
                                <p className="text-[10px] font-black text-[#64748b] uppercase tracking-widest mb-1">{t("customer.product.fastDelivery")}</p>
                                <p className="text-2xl font-black text-[#154a21]">48h</p>
                            </div>
                        </div>
                    </div>

                    {/* Search Controls */}
                    <div className="mt-12 flex flex-col md:flex-row gap-4">
                        <div className="relative flex-grow">
                            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-[#64748b]" size={20} />
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder={t("customer.shop.searchPlaceholder")}
                                className="w-full h-18 pl-16 pr-6 bg-white border-2 border-[#e2e8f0] focus:border-[#154a21] rounded-[28px] text-lg font-bold outline-none transition-all shadow-sm"
                            />
                        </div>

                        <div className="flex gap-2 p-2 bg-[#f8fafc] border-2 border-[#e2e8f0] rounded-[28px] overflow-x-auto no-scrollbar">
                            {categories.map(cat => (
                                <button
                                    key={cat.id}
                                    onClick={() => setActiveCategory(cat.id)}
                                    className={`px-8 py-3 rounded-[22px] font-black text-[10px] uppercase tracking-widest whitespace-nowrap transition-all ${activeCategory === cat.id
                                            ? 'bg-[#154a21] text-white shadow-lg shadow-green-900/10'
                                            : 'text-[#64748b] hover:bg-white'
                                        }`}
                                >
                                    {cat.label}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <main className="flex-grow max-w-[1400px] mx-auto w-full p-6 md:p-12 mb-20">
                {filteredProducts.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                        {filteredProducts.map((product, idx) => (
                            <div
                                key={product.id}
                                onClick={() => navigate(`/customer/product/${product.id}`)}
                                className="group bg-white border border-[#e2e8f0] rounded-[32px] overflow-hidden transition-all active:scale-[0.98] cursor-pointer flex flex-col"
                                style={{ animationDelay: `${idx * 50}ms` }}
                            >
                                <div className="relative h-64 bg-[#f8fafc] flex items-center justify-center p-8">
                                    <img
                                        src={product.image}
                                        alt={product.name}
                                        className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-700"
                                    />
                                    {product.isNew && (
                                        <span className="absolute top-6 left-6 bg-[#154a21] text-white px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest">
                                            NEW
                                        </span>
                                    )}
                                </div>
                                <div className="p-8 flex flex-col flex-grow">
                                    <h3 className="text-xl font-black text-[#154a21] group-hover:text-[#1d1d1f] transition-colors mb-2 line-clamp-1">{product.name}</h3>
                                    <p className="text-sm font-bold text-[#64748b] mb-6 line-clamp-2 leading-relaxed">{product.description}</p>

                                    <div className="mt-auto flex items-center justify-between">
                                        <div className="flex flex-col">
                                            <span className="text-[9px] font-black text-[#64748b] uppercase tracking-widest">{t("customer.shop.price")}</span>
                                            <div className="flex items-baseline gap-0.5 text-[#154a21]">
                                                <span className="text-sm font-black italic">₹</span>
                                                <span className="text-2xl font-black">{product.price.toLocaleString()}</span>
                                            </div>
                                        </div>
                                        <button className="h-12 w-12 bg-[#154a21] text-white rounded-2xl flex items-center justify-center shadow-lg shadow-green-900/10 transition-all group-active:scale-90">
                                            <ShoppingCart size={20} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="py-32 text-center border-2 border-dashed border-[#e2e8f0] rounded-[48px]">
                        <div className="w-24 h-24 bg-[#f8fafc] rounded-3xl flex items-center justify-center mx-auto mb-8 border border-[#e2e8f0]">
                            <Search size={40} className="text-[#94a3b8]" />
                        </div>
                        <h3 className="text-3xl font-black text-[#154a21] mb-2">{t("customer.shop.noProducts")}</h3>
                        <p className="text-[#64748b] font-bold text-lg">{t("customer.shop.noProductsDesc")}</p>
                    </div>
                )}
            </main>

            {/* Sticky Mobile Cart Button */}
            <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 lg:hidden">
                <button className="h-16 px-10 bg-[#154a21] text-white rounded-full font-black text-sm uppercase tracking-widest shadow-2xl shadow-green-900/40 flex items-center gap-4 active:scale-95 transition-all">
                    <ShoppingBag size={24} />
                    {t("customer.shop.viewCart")}
                    <span className="w-6 h-6 rounded-full bg-white text-[#154a21] flex items-center justify-center text-[10px]">0</span>
                </button>
            </div>

            <Footer />
        </div>
    );
};

export default ECommerce;

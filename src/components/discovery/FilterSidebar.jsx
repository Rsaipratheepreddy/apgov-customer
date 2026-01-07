"use client";

import React from 'react';
import {
    X,
    ChevronRight,
    Check,
    Trash2,
    ChevronDown,
    Zap,
    Star,
    LandPlot
} from 'lucide-react';
import useLanguage from '../../hooks/useLanguage';

/**
 * Premium, flat green Filter Sidebar.
 * Fully translated, mobile-aware, Poppins font.
 */
const FilterSidebar = ({
    filters,
    setFilters,
    onClear,
    isOpen,
    onClose
}) => {
    const { t } = useLanguage();

    const districts = [
        "Anantapur", "Chittoor", "East Godavari", "Guntur", "Kadapa",
        "Krishna", "Kurnool", "Prakasam", "Nellore", "Srikakulam",
        "Visakhapatnam", "Vizianagaram", "West Godavari"
    ];

    const serviceTypes = [
        { id: 'agriculture', label: t("customer.discovery.filters.serviceType.agriculture") },
        { id: 'surveillance', label: t("customer.discovery.filters.serviceType.surveillance") },
        { id: 'mapping', label: t("customer.discovery.filters.serviceType.mapping") },
        { id: 'inspection', label: t("customer.discovery.filters.serviceType.inspection") },
        { id: 'photography', label: t("customer.discovery.filters.serviceType.photography") },
        { id: 'delivery', label: t("customer.discovery.filters.serviceType.delivery") },
    ];

    const availabilityOptions = [
        { id: 'all', label: t("customer.discovery.filters.availability.all") },
        { id: 'today', label: t("customer.discovery.filters.availability.availableToday") },
        { id: 'week', label: t("customer.discovery.filters.availability.availableWeek") },
    ];

    const ratingOptions = [
        { value: 0, label: t("customer.discovery.filters.rating.any") },
        { value: 4, label: t("customer.discovery.filters.rating.4plus") },
        { value: 4.5, label: t("customer.discovery.filters.rating.45plus") },
    ];

    const toggleService = (id) => {
        const newServices = filters.serviceTypes.includes(id)
            ? filters.serviceTypes.filter(s => s !== id)
            : [...filters.serviceTypes, id];
        setFilters({ ...filters, serviceTypes: newServices });
    };

    return (
        <>
            {/* Desktop Sidebar / Mobile Overlay */}
            <aside
                className={`
                    fixed inset-y-0 left-0 z-[110] w-[320px] bg-white border-r border-[#e2e8f0] transform transition-transform duration-500 ease-in-out lg:relative lg:translate-x-0 lg:z-0
                    ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
                `}
            >
                <div className="flex flex-col h-full">
                    {/* Header */}
                    <div className="p-6 md:p-8 border-b border-[#e2e8f0] flex items-center justify-between">
                        <div>
                            <h2 className="text-xl md:text-2xl font-black text-[#154a21] tracking-tight">{t("customer.discovery.filters.title")}</h2>
                            <p className="text-[10px] md:text-xs font-bold text-[#64748b] uppercase tracking-widest mt-1">{t("customer.discovery.filters.apply")}</p>
                        </div>
                        <button
                            onClick={onClear}
                            className="p-3 text-[#f43f5e] hover:bg-[#fff1f2] rounded-2xl transition-colors active:scale-95"
                            title={t("customer.discovery.filters.clearAll")}
                        >
                            <Trash2 size={20} />
                        </button>
                    </div>

                    {/* Scrollable Content */}
                    <div className="flex-grow overflow-y-auto p-6 md:p-8 space-y-8 md:space-y-10 custom-scrollbar">

                        {/* Service Types */}
                        <div className="space-y-4">
                            <h3 className="text-xs font-black text-[#64748b] uppercase tracking-widest flex items-center gap-2">
                                <Zap size={14} className="text-[#154a21]" />
                                {t("customer.discovery.filters.serviceType.title")}
                            </h3>
                            <div className="grid grid-cols-1 gap-2">
                                {serviceTypes.map(type => (
                                    <button
                                        key={type.id}
                                        onClick={() => toggleService(type.id)}
                                        className={`flex items-center justify-between p-3.5 md:p-4 rounded-xl md:rounded-2xl transition-all border-2 active:scale-[0.98] ${filters.serviceTypes.includes(type.id)
                                            ? 'bg-[#154a21] border-transparent text-white'
                                            : 'bg-[#f8fafc] border-[#e2e8f0] text-[#64748b]'
                                            }`}
                                    >
                                        <span className="text-xs md:text-sm font-bold">{type.label}</span>
                                        {filters.serviceTypes.includes(type.id) && <Check size={16} />}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Availability */}
                        <div className="space-y-4">
                            <h3 className="text-xs font-black text-[#64748b] uppercase tracking-widest flex items-center gap-2">
                                <Star size={14} className="text-[#154a21]" />
                                {t("customer.discovery.filters.availability.title")}
                            </h3>
                            <div className="flex flex-col gap-2">
                                {availabilityOptions.map(opt => (
                                    <button
                                        key={opt.id}
                                        onClick={() => setFilters({ ...filters, availability: opt.id })}
                                        className={`flex items-center gap-3 p-4 rounded-2xl border-2 transition-all active:scale-[0.98] ${filters.availability === opt.id
                                            ? 'bg-[#154a21] border-transparent text-white'
                                            : 'bg-[#f8fafc] border-[#e2e8f0] text-[#64748b]'
                                            }`}
                                    >
                                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${filters.availability === opt.id ? 'border-white' : 'border-[#e2e8f0]'
                                            }`}>
                                            {filters.availability === opt.id && <div className="w-2.5 h-2.5 rounded-full bg-white" />}
                                        </div>
                                        <span className="text-sm font-bold">{opt.label}</span>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* District */}
                        <div className="space-y-4">
                            <h3 className="text-xs font-black text-[#64748b] uppercase tracking-widest flex items-center gap-2">
                                <LandPlot size={14} className="text-[#154a21]" />
                                {t("customer.discovery.filters.district.title")}
                            </h3>
                            <div className="relative">
                                <select
                                    value={filters.district}
                                    onChange={(e) => setFilters({ ...filters, district: e.target.value })}
                                    className="w-full h-14 pl-4 pr-10 bg-[#f8fafc] border-2 border-[#e2e8f0] rounded-2xl text-sm font-bold text-[#1d1d1f] outline-none appearance-none focus:border-[#154a21] transition-all"
                                >
                                    <option value="all">{t("customer.discovery.filters.district.all")}</option>
                                    {districts.map(d => (
                                        <option key={d} value={d}>{d}</option>
                                    ))}
                                </select>
                                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-[#64748b]" size={18} />
                            </div>
                        </div>
                    </div>

                    {/* Mobile Only: Close Button */}
                    <div className="p-6 border-t border-[#e2e8f0] lg:hidden">
                        <button
                            onClick={onClose}
                            className="w-full h-14 bg-[#154a21] text-white rounded-2xl font-black text-xs uppercase tracking-widest flex items-center justify-center gap-3 active:scale-95 shadow-xl shadow-green-900/10"
                        >
                            {t("customer.discovery.filters.apply")}
                            <ChevronRight size={18} />
                        </button>
                    </div>
                </div>
            </aside>

            {/* Mobile Backdrop */}
            {isOpen && (
                <div
                    className="fixed inset-0 z-[105] bg-black/20 backdrop-blur-sm lg:hidden transition-opacity duration-500"
                    onClick={onClose}
                />
            )}
        </>
    );
};

export default FilterSidebar;

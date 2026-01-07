"use client";

import React from 'react';
import {
    Search,
    X,
    LayoutGrid,
    Map as MapIcon,
    ChevronDown,
    Filter
} from 'lucide-react';
import useLanguage from '../../hooks/useLanguage';

/**
 * Flat green Search Controls.
 * Fully translated, mobile-first, Poppins font.
 */
const SearchControls = ({
    searchQuery,
    setSearchQuery,
    viewMode,
    setViewMode,
    totalResults,
    sortBy,
    setSortBy,
    onShowFilters
}) => {
    const { t } = useLanguage();

    const sortOptions = [
        { value: 'nearest', label: t("customer.discovery.sorting.nearest") },
        { value: 'rating', label: t("customer.discovery.sorting.highestRated") },
        { value: 'price_asc', label: t("customer.discovery.sorting.lowestPrice") },
        { value: 'reviews', label: t("customer.discovery.sorting.mostReviewed") },
        { value: 'experience', label: t("customer.discovery.sorting.mostExperienced") },
    ];

    return (
        <div className="flex flex-col gap-6 mb-8">
            {/* Search Bar Area */}
            <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-grow group">
                    <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none">
                        <Search className="text-[#64748b] group-focus-within:text-[#154a21] transition-colors" size={20} />
                    </div>
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder={t("customer.discovery.search.placeholder")}
                        className="w-full h-14 md:h-16 pl-14 pr-12 bg-white border-2 border-[#e2e8f0] focus:border-[#154a21] rounded-[20px] md:rounded-[24px] text-[#1d1d1f] font-bold text-base md:text-lg outline-none transition-all placeholder:text-[#94a3b8] shadow-sm"
                    />
                    {searchQuery && (
                        <button
                            onClick={() => setSearchQuery('')}
                            className="absolute inset-y-0 right-5 flex items-center text-[#94a3b8] hover:text-[#154a21] transition-colors"
                        >
                            <X size={20} />
                        </button>
                    )}
                </div>

                <div className="flex gap-3">
                    {/* Filter Trigger (Mobile) */}
                    <button
                        onClick={onShowFilters}
                        className="flex-grow md:hidden h-14 px-6 bg-[#154a21] text-white rounded-[20px] font-black text-xs uppercase tracking-widest flex items-center justify-center gap-2 shadow-xl shadow-green-900/10 active:scale-95 transition-all"
                    >
                        <Filter size={18} />
                        {t("customer.discovery.filters.title")}
                    </button>

                    {/* View Toggle */}
                    <div className="flex h-14 md:h-16 p-1 bg-[#f8fafc] border-2 border-[#e2e8f0] rounded-[20px] md:rounded-[24px]">
                        <button
                            onClick={() => setViewMode('grid')}
                            className={`flex items-center gap-2 px-4 md:px-6 rounded-[16px] md:rounded-[24px] font-black text-[10px] md:text-xs uppercase tracking-widest transition-all ${viewMode === 'grid'
                                ? 'bg-white text-[#154a21] shadow-md'
                                : 'text-[#64748b]'
                                }`}
                        >
                            <LayoutGrid size={16} />
                            <span className="hidden sm:inline">{t("customer.discovery.gridView")}</span>
                        </button>
                        <button
                            onClick={() => setViewMode('map')}
                            className={`flex items-center gap-2 px-4 md:px-6 rounded-[16px] md:rounded-[24px] font-black text-[10px] md:text-xs uppercase tracking-widest transition-all ${viewMode === 'map'
                                ? 'bg-white text-[#154a21] shadow-md'
                                : 'text-[#64748b]'
                                }`}
                        >
                            <MapIcon size={16} />
                            <span className="hidden sm:inline">{t("customer.discovery.mapView")}</span>
                        </button>
                    </div>
                </div>
            </div>

            {/* Meta Info Row */}
            <div className="flex flex-wrap items-center justify-between gap-4 px-2">
                <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-[#64748b]">{t("customer.discovery.results.showing")}</span>
                    <span className="text-sm font-black text-[#154a21]">{totalResults}</span>
                    <span className="text-sm font-bold text-[#64748b]">{t("customer.discovery.results.providers")}</span>
                </div>

                <div className="flex items-center gap-3">
                    <span className="text-[10px] font-black text-[#64748b] uppercase tracking-widest hidden sm:inline">{t("customer.discovery.sorting.label")}</span>
                    <div className="relative group">
                        <select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                            className="appearance-none h-12 pl-4 pr-10 bg-white border border-[#e2e8f0] rounded-xl text-sm font-black text-[#154a21] outline-none active:scale-95 transition-all cursor-pointer"
                        >
                            {sortOptions.map(opt => (
                                <option key={opt.value} value={opt.value}>{opt.label}</option>
                            ))}
                        </select>
                        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-[#154a21] pointer-events-none" size={16} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SearchControls;

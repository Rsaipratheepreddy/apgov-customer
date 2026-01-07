"use client";

import React, { useState, useMemo, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { useSearchParams, useNavigate } from 'react-router-dom';
import DiscoveryHeader from '../../components/discovery/DiscoveryHeader';
import SearchControls from '../../components/discovery/SearchControls';
import FilterSidebar from '../../components/discovery/FilterSidebar';
import ProviderCard from '../../components/discovery/ProviderCard';
const MapView = dynamic(() => import('../../components/discovery/MapView'), { ssr: false });
import Footer from '../../components/Footer';
import { SERVICE_PROVIDERS } from '../../constants/mockData';
import { calculateDistance } from '../../utils/geoUtils';
import localStorageUtil from '../../utils/localStorage';
import { Search } from 'lucide-react';
import useLanguage from '../../hooks/useLanguage';

const Discovery = () => {
    const { t } = useLanguage();
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    // --- State ---
    const [viewMode, setViewMode] = useState(localStorageUtil.get('customerViewMode', 'grid'));
    const [searchQuery, setSearchQuery] = useState('');
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [userLocation, setUserLocation] = useState(localStorageUtil.get('userLocation', null));
    const [sortBy, setSortBy] = useState('highestRated');
    const [isLocationEnabled, setIsLocationEnabled] = useState(false);

    const [filters, setFilters] = useState({
        serviceTypes: [],
        availability: 'all',
        rating: 'any',
        priceRange: 'any',
        district: 'all'
    });

    // --- Persistence ---
    useEffect(() => {
        localStorageUtil.set('customerViewMode', viewMode);
    }, [viewMode]);

    const handleEnableLocation = () => {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const mockLocation = {
                        district: "Visakhapatnam",
                        coordinates: { lat: 17.7, lng: 83.3 }
                    };
                    setUserLocation(mockLocation);
                    setIsLocationEnabled(true);
                    localStorageUtil.set('userLocation', mockLocation);
                },
                (error) => {
                    alert("Please enable location services in your browser.");
                }
            );
        }
    };

    // --- Filtering & Sorting Logic ---
    const filteredProviders = useMemo(() => {
        let results = [...SERVICE_PROVIDERS];

        // Search
        if (searchQuery) {
            const q = searchQuery.toLowerCase();
            results = results.filter(p =>
                p.name.toLowerCase().includes(q) ||
                p.location.district.toLowerCase().includes(q) ||
                p.location.area.toLowerCase().includes(q)
            );
        }

        // Service Types
        if (filters.serviceTypes.length > 0) {
            results = results.filter(p =>
                p.services.some(s => filters.serviceTypes.includes(s.type))
            );
        }

        // Availability
        if (filters.availability !== 'all') {
            if (filters.availability === 'availableToday') {
                results = results.filter(p => p.availableToday);
            }
        }

        // District
        if (filters.district !== 'all') {
            results = results.filter(p => p.location.district.toLowerCase() === filters.district.toLowerCase());
        }

        // Sorting
        results.sort((a, b) => {
            if (sortBy === 'highestRated') return b.rating - a.rating;
            if (sortBy === 'lowestPrice') return a.priceRange.min - b.priceRange.min;
            if (sortBy === 'mostExperienced') return b.servicesCompleted - a.servicesCompleted;
            if (sortBy === 'nearest' && userLocation) {
                const distA = calculateDistance(userLocation, a.location.coordinates);
                const distB = calculateDistance(userLocation, b.location.coordinates);
                return distA - distB;
            }
            return 0;
        });

        return results;
    }, [searchQuery, filters, sortBy, userLocation]);

    const clearFilters = () => {
        setFilters({
            serviceTypes: [],
            availability: 'all',
            rating: 'any',
            priceRange: 'any',
            district: 'all'
        });
    };

    return (
        <div className="min-h-screen flex flex-col bg-white">
            <DiscoveryHeader />

            <main className="flex-grow max-w-[1400px] mx-auto w-full px-4 md:px-8 py-6 md:py-12">
                <div className="flex flex-col lg:flex-row gap-6 md:gap-12">

                    {/* Sidebar */}
                    <FilterSidebar
                        isOpen={isFilterOpen}
                        onClose={() => setIsFilterOpen(false)}
                        filters={filters}
                        setFilters={setFilters}
                        onClear={clearFilters}
                    />

                    {/* Content Area */}
                    <div className="flex-grow space-y-8">
                        {/* Hero Titles */}
                        <div className="animate-fade-in mb-4 md:mb-10">
                            <h1 className="text-xl sm:text-3xl md:text-5xl font-black text-[#154a21] mb-1 md:mb-2 leading-tight">
                                {t("customer.discovery.pageTitle")}
                            </h1>
                            <p className="text-[13px] md:text-lg text-[#64748b] font-medium max-w-2xl leading-relaxed">
                                {t("customer.discovery.pageSubtitle")}
                            </p>
                        </div>

                        <SearchControls
                            searchQuery={searchQuery}
                            setSearchQuery={setSearchQuery}
                            viewMode={viewMode}
                            setViewMode={setViewMode}
                            onShowFilters={() => setIsFilterOpen(true)}
                            totalResults={filteredProviders.length}
                            sortBy={sortBy}
                            setSortBy={setSortBy}
                        />

                        {viewMode === 'grid' ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-3 gap-6">
                                {filteredProviders.map((provider, idx) => (
                                    <ProviderCard
                                        key={provider.id}
                                        provider={provider}
                                        delayClass={`[animation-delay:${idx * 50}ms]`}
                                        onClick={() => navigate(`/customer/provider/${provider.id}`)}
                                    />
                                ))}
                            </div>
                        ) : (
                            <div className="h-[600px] md:h-[700px] bg-white border border-[#e2e8f0] rounded-3xl overflow-hidden relative">
                                <MapView
                                    providers={filteredProviders}
                                    userLocation={userLocation}
                                    isLocationEnabled={isLocationEnabled}
                                    onEnableLocation={handleEnableLocation}
                                    onProviderClick={(p) => navigate(`/customer/provider/${p.id}`)}
                                />
                            </div>
                        )}

                        {filteredProviders.length === 0 && (
                            <div className="py-24 text-center border-2 border-dashed border-[#e2e8f0] rounded-3xl">
                                <Search size={48} className="text-[#64748b] mx-auto mb-6" />
                                <h3 className="text-xl font-bold text-[#154a21] mb-2">{t("customer.discovery.results.noResults")}</h3>
                                <p className="text-[#64748b] mb-8">{t("customer.discovery.results.noResultsDesc")}</p>
                                <button
                                    onClick={clearFilters}
                                    className="px-8 py-3 bg-[#154a21] text-white rounded-xl font-bold active:scale-95"
                                >
                                    Clear All Filters
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default Discovery;

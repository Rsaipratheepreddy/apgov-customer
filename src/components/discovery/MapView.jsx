"use client";

import React, { useState } from 'react';
import { MapPin, X, Plus, Minus, Navigation, RotateCcw, Info, Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import useLanguage from '../../hooks/useLanguage';

/**
 * Simplified SVG-based interactive map of Andhra Pradesh
 */
const MapView = ({ providers, userLocation, isLocationEnabled, onEnableLocation, onProviderClick }) => {
    const { t } = useLanguage();
    const navigate = useNavigate();
    const [selectedProvider, setSelectedProvider] = useState(null);
    const [zoom, setZoom] = useState(1);
    const [offset, setOffset] = useState({ x: 0, y: 0 });

    // Simplified District Centers on a 1000x800 coordinate system
    const districtCoords = {
        "Visakhapatnam": { x: 800, y: 200 },
        "Vijayawada": { x: 500, y: 400 },
        "Guntur": { x: 450, y: 450 },
        "Tirupati": { x: 300, y: 700 },
        "Kakinada": { x: 750, y: 300 },
        "Anantapur": { x: 150, y: 650 },
        "Chittoor": { x: 250, y: 750 },
        "East Godavari": { x: 700, y: 250 },
        "Krishna": { x: 550, y: 350 },
        "Kurnool": { x: 200, y: 550 },
        "Prakasam": { x: 350, y: 500 },
        "Nellore": { x: 400, y: 600 },
        "Srikakulam": { x: 900, y: 100 },
        "Vizianagaram": { x: 850, y: 150 },
        "West Godavari": { x: 600, y: 300 },
        "Kadapa": { x: 300, y: 600 }
    };

    const handleReset = () => {
        setZoom(1);
        setOffset({ x: 0, y: 0 });
        setSelectedProvider(null);
    };

    return (
        <div className="relative w-full h-[60vh] md:h-[70vh] bg-[#f8fafc] border border-[#e2e8f0] rounded-xl overflow-hidden group">
            {/* SVG Base Map */}
            <div
                className="w-full h-full cursor-grab active:cursor-grabbing transition-transform"
                style={{ transform: `scale(${zoom}) translate(${offset.x}px, ${offset.y}px)` }}
            >
                <svg viewBox="0 0 1000 800" className="w-full h-full">
                    {/* AP State Boundary - Simplified Shape */}
                    <path
                        d="M900,50 L950,150 L800,300 L750,450 L600,600 L400,750 L200,780 L50,650 L100,500 L250,400 L400,200 L600,100 Z"
                        fill="#ffffff"
                        stroke="#e2e8f0"
                        strokeWidth="2"
                    />

                    {/* Legend helper lines or water bodies */}
                    <rect x="0" y="0" width="1000" height="800" fill="#154a21" fillOpacity="0.03" />

                    {/* User Location Marker */}
                    {isLocationEnabled && userLocation && (
                        <g transform={`translate(${districtCoords[userLocation.district]?.x || 500}, ${districtCoords[userLocation.district]?.y || 400})`}>
                            <circle r="12" fill="#154a21" fillOpacity="0.2">
                                <animate attributeName="r" from="12" to="20" dur="2s" repeatCount="indefinite" />
                                <animate attributeName="opacity" from="0.6" to="0" dur="2s" repeatCount="indefinite" />
                            </circle>
                            <circle r="6" fill="#154a21" stroke="white" strokeWidth="2" />
                        </g>
                    )}

                    {/* Provider Markers */}
                    {providers.map((p) => {
                        const coord = districtCoords[p.location.district] || { x: 500, y: 400 };
                        const isActive = selectedProvider?.id === p.id;

                        return (
                            <g
                                key={p.id}
                                transform={`translate(${coord.x}, ${coord.y})`}
                                onClick={() => setSelectedProvider(p)}
                                className="cursor-pointer"
                            >
                                <path
                                    d="M12,0 C5.37258249,0 0,5.37258249 0,12 C0,21 12,32 12,32 C12,32 24,21 24,12 C24,5.37258249 18.6274175,0 12,0 Z"
                                    fill={isActive ? "#154a21" : "#2e7d32"}
                                    transform="translate(-12, -32)"
                                />
                                <circle cx="0" cy="-20" r="4" fill="white" />
                            </g>
                        );
                    })}
                </svg>
            </div>

            {/* Map Content Overlay (Info) */}
            <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm p-3 rounded-lg border border-[#e2e8f0] shadow-sm max-w-[240px]">
                <div className="flex gap-2 items-start">
                    <Info size={16} className="text-[#154a21] shrink-0 mt-0.5" />
                    <p className="text-xs text-[#1e293b]">
                        {t("customer.discovery.map.clickMarker")}
                    </p>
                </div>
            </div>

            {/* Popover Card */}
            {selectedProvider && (
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 bg-white rounded-xl shadow-2xl border border-[#e2e8f0] p-4 z-50 animate-fade-in-up">
                    <button
                        onClick={() => setSelectedProvider(null)}
                        className="absolute top-3 right-3 text-[#64748b] active:scale-95"
                    >
                        <X size={18} />
                    </button>

                    <h4 className="font-black text-[#1d1d1f] text-sm md:text-base mb-1 line-clamp-1">{selectedProvider.name}</h4>
                    <div className="flex items-center gap-1.5 mb-2">
                        <Star size={14} fill="#154a21" stroke="#154a21" />
                        <span className="text-xs font-black text-[#1d1d1f]">{selectedProvider.rating}</span>
                        <span className="text-[#64748b] text-[10px] md:text-xs font-bold">• {selectedProvider.reviewCount} {t("customer.discovery.providerCard.reviews")}</span>
                    </div>

                    <div className="text-[10px] md:text-xs text-[#64748b] font-bold mb-3">
                        {selectedProvider.services.length} {t("customer.discovery.filters.serviceType.all")} • {t("customer.discovery.providerCard.from")} ₹{selectedProvider.priceRange.min}
                    </div>

                    <button
                        onClick={() => navigate(`/customer/provider/${selectedProvider.id}`)}
                        className="w-full h-10 bg-[#154a21] text-white rounded-lg flex items-center justify-center gap-2 font-semibold text-sm active:scale-95 transition-transform"
                    >
                        {t("customer.discovery.providerCard.viewDetails")}
                    </button>
                </div>
            )}

            {/* Map Controls */}
            <div className="absolute bottom-4 right-4 md:bottom-6 md:right-6 flex flex-col bg-white border border-[#e2e8f0] rounded-xl shadow-md overflow-hidden">
                <button onClick={() => setZoom(z => Math.min(z + 0.2, 3))} className="p-2 md:p-3 border-b border-[#e2e8f0] text-[#1e293b] active:bg-gray-50"><Plus size={18} /></button>
                <button onClick={() => setZoom(z => Math.max(z - 0.2, 0.5))} className="p-2 md:p-3 border-b border-[#e2e8f0] text-[#1e293b] active:bg-gray-50"><Minus size={18} /></button>
                <button onClick={onEnableLocation} className="p-2 md:p-3 border-b border-[#e2e8f0] text-[#154a21] active:bg-gray-50" title={t("customer.discovery.map.myLocation")}><Navigation size={18} /></button>
                <button onClick={handleReset} className="p-2 md:p-3 text-[#64748b] active:bg-gray-50" title={t("customer.discovery.map.resetView")}><RotateCcw size={18} /></button>
            </div>

            {/* Legend */}
            <div className="absolute bottom-6 left-6 bg-white/95 border border-[#e2e8f0] p-4 rounded-lg shadow-sm">
                <h5 className="text-xs font-bold uppercase tracking-wider text-[#1e293b] mb-2">
                    {t("customer.discovery.map.legend")}
                </h5>
                <div className="space-y-2">
                    <div className="flex items-center gap-3">
                        <div className="w-3 h-3 rounded-full bg-[#154a21]" />
                        <span className="text-xs text-[#64748b]">{t("customer.discovery.map.yourLocation")}</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <MapPin size={14} className="text-[#154a21]" />
                        <span className="text-xs text-[#64748b]">Service Providers</span>
                    </div>
                </div>
            </div>

            {/* Location Permission Prompt Overlay */}
            {!isLocationEnabled && (
                <div className="absolute inset-0 bg-white/60 backdrop-blur-[1px] flex items-center justify-center p-6 z-[100]">
                    <div className="bg-white rounded-2xl shadow-2xl border border-[#e2e8f0] p-8 max-w-sm text-center animate-fade-in-up">
                        <div className="mx-auto w-16 h-16 bg-[#f1f8f1] rounded-full flex items-center justify-center text-[#154a21] mb-6">
                            <MapPin size={32} />
                        </div>
                        <h3 className="text-xl font-bold text-[#1e293b] mb-2">{t("customer.discovery.location.title")}</h3>
                        <p className="text-[#64748b] text-sm mb-6 leading-relaxed">{t("customer.discovery.location.description")}</p>
                        <div className="flex flex-col gap-3">
                            <button
                                onClick={onEnableLocation}
                                className="w-full h-12 bg-[#154a21] text-white rounded-lg font-semibold active:scale-[0.98] transition-transform"
                            >
                                {t("customer.discovery.location.allow")}
                            </button>
                            <button
                                onClick={() => { }} // Just close prompt logic (mock)
                                className="w-full h-12 bg-white text-[#64748b] border border-[#e2e8f0] rounded-lg font-medium active:scale-[0.98] transition-transform"
                            >
                                {t("customer.discovery.location.deny")}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MapView;

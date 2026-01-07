"use client";

import React, { useState, useEffect } from 'react';
import { MapPin, X, Navigation, RotateCcw, Info, Star, ExternalLink } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import useLanguage from '../../hooks/useLanguage';

// Fix for default Leaflet icons in Webpack/Next.js
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Custom Green Icon for providers
const createCustomIcon = (isActive) => L.divIcon({
    html: `
        <div class="relative flex flex-col items-center">
            <div class="w-8 h-8 ${isActive ? 'bg-[#154a21] scale-125' : 'bg-[#2e7d32]'} rounded-full border-2 border-white shadow-lg flex items-center justify-center transition-all duration-300">
                <svg viewBox="0 0 24 24" width="16" height="16" stroke="white" stroke-width="3" fill="none" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
                </svg>
            </div>
            <div class="w-1 h-2 bg-[#2e7d32] -mt-0.5"></div>
        </div>
    `,
    className: 'custom-div-icon',
    iconSize: [32, 40],
    iconAnchor: [16, 40],
    popupAnchor: [0, -40]
});

// Component to handle map center changes
const RecenterMap = ({ center, zoom }) => {
    const map = useMap();
    useEffect(() => {
        map.setView(center, zoom);
    }, [center, zoom, map]);
    return null;
};

const MapView = ({ providers, userLocation, isLocationEnabled, onEnableLocation, onProviderClick }) => {
    const { t } = useLanguage();
    const navigate = useNavigate();
    const [selectedProvider, setSelectedProvider] = useState(null);
    const [mapState, setMapState] = useState({
        center: [15.9129, 79.7400], // Center of Andhra Pradesh
        zoom: 7
    });

    const handleReset = () => {
        setMapState({
            center: [15.9129, 79.7400],
            zoom: 7
        });
        setSelectedProvider(null);
    };

    const handleMyLocation = () => {
        if (isLocationEnabled && userLocation?.coordinates) {
            setMapState({
                center: [userLocation.coordinates.lat, userLocation.coordinates.lng],
                zoom: 12
            });
        } else {
            onEnableLocation();
        }
    };

    return (
        <div className="relative w-full h-[60vh] md:h-[70vh] bg-[#f8fafc] border border-[#e2e8f0] rounded-2xl overflow-hidden shadow-inner group">
            {/* Real Map Layer */}
            <MapContainer
                center={mapState.center}
                zoom={mapState.zoom}
                className="w-full h-full z-0"
                zoomControl={false}
                attributionControl={false}
            >
                <TileLayer
                    url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
                />

                <RecenterMap center={mapState.center} zoom={mapState.zoom} />

                {/* Provider Markers */}
                {providers.map((p) => (
                    <Marker
                        key={p.id}
                        position={[p.location.coordinates.lat, p.location.coordinates.lng]}
                        icon={createCustomIcon(selectedProvider?.id === p.id)}
                        eventHandlers={{
                            click: () => setSelectedProvider(p)
                        }}
                    >
                        <Popup className="custom-popup">
                            <div className="w-64 p-1">
                                <div className="flex justify-between items-start mb-2">
                                    <h4 className="font-black text-[#154a21] text-sm m-0 leading-tight">{p.name}</h4>
                                    <div className="flex items-center gap-1 bg-[#f1f8f1] px-1.5 py-0.5 rounded-md">
                                        <Star size={10} fill="#154a21" stroke="#154a21" />
                                        <span className="text-[10px] font-black text-[#154a21]">{p.rating}</span>
                                    </div>
                                </div>
                                <p className="text-[10px] text-[#64748b] font-bold mb-3 line-clamp-2 m-0 leading-normal">
                                    {p.description}
                                </p>
                                <div className="flex items-center justify-between gap-2 border-t border-[#f1f5f9] pt-2">
                                    <div className="text-[10px] font-black text-[#64748b] uppercase tracking-wider">
                                        Starts from <span className="text-[#154a21]">₹{p.priceRange.min}</span>
                                    </div>
                                    <button
                                        onClick={() => navigate(`/customer/provider/${p.id}`)}
                                        className="bg-[#154a21] text-white px-3 py-1.5 rounded-lg text-[10px] font-bold flex items-center gap-1 hover:brightness-110 active:scale-95 transition-all"
                                    >
                                        View <ExternalLink size={10} />
                                    </button>
                                </div>
                            </div>
                        </Popup>
                    </Marker>
                ))}

                {/* User Location Marker */}
                {isLocationEnabled && userLocation?.coordinates && (
                    <Marker
                        position={[userLocation.coordinates.lat, userLocation.coordinates.lng]}
                        icon={L.divIcon({
                            html: `
                                <div class="relative flex items-center justify-center">
                                    <div class="absolute w-10 h-10 bg-[#154a21] rounded-full opacity-20 animate-ping"></div>
                                    <div class="w-4 h-4 bg-[#154a21] rounded-full border-2 border-white shadow-lg"></div>
                                </div>
                            `,
                            className: 'user-location-icon',
                            iconSize: [40, 40],
                            iconAnchor: [20, 20]
                        })}
                    />
                )}
            </MapContainer>

            {/* Map UI Overlays */}
            <div className="absolute top-4 left-4 z-10 space-y-2 pointer-events-none">
                <div className="bg-white/90 backdrop-blur-sm p-3 rounded-xl border border-[#e2e8f0] shadow-sm max-w-[240px] pointer-events-auto">
                    <div className="flex gap-2 items-start">
                        <Info size={16} className="text-[#154a21] shrink-0 mt-0.5" />
                        <p className="text-[10px] md:text-xs font-bold text-[#64748b] leading-tight">
                            {t("customer.discovery.map.clickMarker")}
                        </p>
                    </div>
                </div>
            </div>

            {/* Map Controls */}
            <div className="absolute top-4 right-4 z-10 flex flex-col bg-white border border-[#e2e8f0] rounded-xl shadow-lg overflow-hidden">
                <button
                    onClick={handleMyLocation}
                    className="p-3 border-b border-[#e2e8f0] text-[#154a21] hover:bg-gray-50 active:scale-95 transition-all"
                    title={t("customer.discovery.map.myLocation")}
                >
                    <Navigation size={20} />
                </button>
                <button
                    onClick={handleReset}
                    className="p-3 text-[#64748b] hover:bg-gray-50 active:scale-95 transition-all"
                    title={t("customer.discovery.map.resetView")}
                >
                    <RotateCcw size={20} />
                </button>
            </div>

            {/* Legend - Minimized on mobile */}
            <div className="absolute bottom-6 left-6 z-10 bg-white/95 backdrop-blur-sm border border-[#e2e8f0] p-4 rounded-2xl shadow-xl hidden md:block">
                <h5 className="text-[10px] font-black uppercase tracking-widest text-[#154a21] mb-3">
                    {t("customer.discovery.map.legend")}
                </h5>
                <div className="space-y-3">
                    <div className="flex items-center gap-3">
                        <div className="w-3 h-3 rounded-full bg-[#154a21] shadow-sm" />
                        <span className="text-[10px] font-bold text-[#64748b] uppercase tracking-wider">{t("customer.discovery.map.yourLocation")}</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="w-4 h-4 rounded-full bg-[#2e7d32] flex items-center justify-center shadow-sm">
                            <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                        </div>
                        <span className="text-[10px] font-bold text-[#64748b] uppercase tracking-wider">Service Providers</span>
                    </div>
                </div>
            </div>

            {/* Location Permission Prompt Overlay */}
            {!isLocationEnabled && (
                <div className="absolute inset-0 bg-white/60 backdrop-blur-[2px] flex items-center justify-center p-6 z-[100]">
                    <div className="bg-white rounded-[32px] shadow-2xl border border-[#e2e8f0] p-8 max-w-sm text-center animate-fade-in-up">
                        <div className="mx-auto w-16 h-16 bg-[#f1f8f1] rounded-2xl flex items-center justify-center text-[#154a21] mb-6 rotate-3">
                            <MapPin size={32} />
                        </div>
                        <h3 className="text-2xl font-black text-[#154a21] mb-2 tracking-tight">{t("customer.discovery.location.title")}</h3>
                        <p className="text-[#64748b] text-sm font-bold mb-8 leading-relaxed italic">"{t("customer.discovery.location.description")}"</p>
                        <div className="flex flex-col gap-3">
                            <button
                                onClick={onEnableLocation}
                                className="w-full h-14 bg-[#154a21] text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-lg shadow-green-900/20 active:scale-[0.98] transition-all"
                            >
                                {t("customer.discovery.location.allow")}
                            </button>
                            <button
                                onClick={() => { }} // Close logic
                                className="w-full h-14 bg-white text-[#64748b] border border-[#e2e8f0] rounded-2xl font-black text-xs uppercase tracking-widest active:scale-[0.98] transition-all"
                            >
                                {t("customer.discovery.location.deny")}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <style jsx global>{`
                .custom-popup .leaflet-popup-content-wrapper {
                    border-radius: 16px;
                    padding: 4px;
                    box-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.1);
                }
                .custom-popup .leaflet-popup-tip-container {
                    display: none;
                }
                .custom-popup .leaflet-popup-content {
                    margin: 8px;
                }
            `}</style>
        </div>
    );
};

export default MapView;

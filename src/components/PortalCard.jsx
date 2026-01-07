"use client";

import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';

/**
 * Reusable card component for portal selection
 * @param {Object} props
 * @param {React.ReactNode} props.icon - Lucide icon component
 * @param {string} props.title - Portal title
 * @param {string} props.subtitle - Portal subtitle/description
 * @param {string} props.features - Feature list text
 * @param {string} props.delay - Animation delay (e.g. "delay-0", "delay-100")
 * @param {Function} props.onClick - Click handler
 */
const PortalCard = ({ icon: Icon, title, subtitle, description, features, delayClass, onClick }) => {
    const [isClicked, setIsClicked] = useState(false);

    const handleClick = () => {
        setIsClicked(true);
        setTimeout(() => {
            setIsClicked(false);
            if (onClick) onClick();
        }, 150);
    };

    return (
        <div
            role="button"
            tabIndex={0}
            onClick={handleClick}
            onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    handleClick();
                }
            }}
            className={`
        relative flex flex-col p-10 bg-white border border-[#e2e8f0] rounded-2xl shadow-sm
        min-h-[320px] transition-all duration-150 cursor-pointer focus-ring
        animate-fade-in-up ${delayClass}
        ${isClicked ? 'scale-[0.98] bg-[#f8fafc]' : 'scale-100'}
      `}
            aria-label={`${title}: ${description}`}
        >
            {/* Icon */}
            <div className="w-14 h-14 flex items-center justify-center text-[#3b82f6] mb-6">
                <Icon size={56} strokeWidth={1.5} aria-hidden="true" />
            </div>

            {/* Content */}
            <h2 className="text-2xl font-bold text-[#1e293b] mb-2">
                {title}
            </h2>
            <p className="text-base text-[#64748b] mb-4">
                {description}
            </p>

            <div className="mt-auto pt-4 flex flex-col gap-4">
                <div className="text-xs font-medium text-[#64748b] uppercase tracking-wider">
                    {features}
                </div>

                {/* Arrow Anchor */}
                <div className="self-end text-[#3b82f6]">
                    <ArrowRight size={24} />
                </div>
            </div>
        </div>
    );
};

export default PortalCard;

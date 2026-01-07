"use client";

import { useLanguageContext } from '../context/LanguageContext';

/**
 * Proxy hook for multi-lingual support, now using global Context
 */
export default function useLanguage() {
    return useLanguageContext();
}

"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import translations from '../constants/translations.json';
import localStorageUtil from '../utils/localStorage';

const LANGUAGE_KEY = 'appLanguage';

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
    const [currentLanguage, setCurrentLanguage] = useState('en');

    // Initialize language from localStorage
    useEffect(() => {
        const savedLanguage = localStorageUtil.get(LANGUAGE_KEY, 'en');
        setCurrentLanguage(savedLanguage);
    }, []);

    const t = useCallback((path) => {
        const keys = path.split('.');
        let result = translations[currentLanguage];

        for (const key of keys) {
            if (result && result[key]) {
                result = result[key];
            } else {
                let fallback = translations['en'];
                let found = true;
                for (const fKey of keys) {
                    if (fallback && fallback[fKey]) {
                        fallback = fallback[fKey];
                    } else {
                        found = false;
                        break;
                    }
                }
                return found ? fallback : path;
            }
        }
        return result;
    }, [currentLanguage]);

    const toggleLanguage = useCallback(() => {
        const newLang = currentLanguage === 'en' ? 'te' : 'en';
        setCurrentLanguage(newLang);
        localStorageUtil.set(LANGUAGE_KEY, newLang);
    }, [currentLanguage]);

    const setLanguage = useCallback((lang) => {
        if (lang === 'en' || lang === 'te') {
            setCurrentLanguage(lang);
            localStorageUtil.set(LANGUAGE_KEY, lang);
        }
    }, []);

    const value = {
        currentLanguage,
        t,
        toggleLanguage,
        setLanguage,
        isEnglish: currentLanguage === 'en',
        isTelugu: currentLanguage === 'te'
    };

    return (
        <LanguageContext.Provider value={value}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useLanguageContext = () => {
    const context = useContext(LanguageContext);
    if (!context) {
        throw new Error('useLanguageContext must be used within a LanguageProvider');
    }
    return context;
};

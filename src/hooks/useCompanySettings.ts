export const defaultCompanySettings = {
    name: "Hospitalia Harmony",
    address: "123 Bd de la Santé, Quartier Hôpitaux",
    city: "Casablanca, Maroc",
    phone: "+212 5 22 00 00 00",
    email: "contact@hospitalia.com",
    ice: "1234567890000",
    rc: "12345",
    if: "67890"
};

export type CompanySettings = typeof defaultCompanySettings;

import { useState, useEffect } from "react";

export function useCompanySettings() {
    const [settings, setSettings] = useState<CompanySettings>(defaultCompanySettings);

    useEffect(() => {
        const stored = localStorage.getItem("hospitalia_company_settings");
        if (stored) {
            setSettings(JSON.parse(stored));
        }
    }, []);

    const updateSettings = (newSettings: Partial<CompanySettings>) => {
        const updated = { ...settings, ...newSettings };
        setSettings(updated);
        localStorage.setItem("hospitalia_company_settings", JSON.stringify(updated));
    };

    return { settings, updateSettings };
}

import { useData } from '../context/DataContext';

export const useContent = () => {
    const { siteSettings } = useData();

    const getContent = (ckey: string, fallback: string = '') => {
        const setting = siteSettings.find(s => s.ckey === ckey);
        return setting ? setting.value : fallback;
    };

    const getSetting = (ckey: string) => {
        return siteSettings.find(s => s.ckey === ckey);
    };

    return { getContent, getSetting };
};

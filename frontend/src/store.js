import { create } from 'zustand';

export const useBusinessStore = create((set) => ({
    businessId: localStorage.getItem('businessId') || null,
    setBusiness: (id) => {
        set({ businessId: id });
        localStorage.setItem('businessId', id);
    },
    clearBusiness: () => {
        set({ businessId: null });
        localStorage.removeItem('businessId');
    },
}))

export const useUserStore = create((set) => ({
    userId: null,
    setUser: (userId) => set({ userId })
}))

export default useBusinessStore;
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
    userId: localStorage.getItem('userId') || null,
    userName: localStorage.getItem('userName') || null,
    email: localStorage.getItem('email') || null,
    contactNo: localStorage.getItem('contactNo') || null,
    setUser: (id, username, email, contactno) => {
        set({ userId: id });
        set({ userName: username });
        set({ email: email });
        set({ contactNo: contactno });
        localStorage.setItem('userId', id);
        localStorage.setItem('userName', username);
        localStorage.setItem('email', email);
        localStorage.setItem('contactNo', contactno);
    },
    clearUser: () => {
        set({ userId: null });
        set({ userName: null });
        set({ email: null });
        set({ contactNo: null });
        localStorage.removeItem('userId');
        localStorage.removeItem('userName');
        localStorage.removeItem('email');
        localStorage.removeItem('contactNo');
    },
}));

export default useBusinessStore;
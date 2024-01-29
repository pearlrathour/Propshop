import { create } from 'zustand';

export const useBusinessStore = create((set) => ({
    businessId: localStorage.getItem('businessId') || null,
    businessName: localStorage.getItem('businessName') || null,
    email: localStorage.getItem('email') || null,
    contactNo: localStorage.getItem('contactNo') || null,
    Location: localStorage.getItem('Location') || null,
    Description: localStorage.getItem('Description') || null,
    Image: localStorage.getItem('Image') || null,
    setBusiness: (id, businessname, email, contactno, location, description, image) => {
        set({ businessId: id });
        set({ businessName: businessname });
        set({ email: email });
        set({ contactNo: contactno });
        set({ Location: location });
        set({ Description: description });
        set({ Image: image });
        localStorage.setItem('businessId', id);
        localStorage.setItem('businessName', businessname);
        localStorage.setItem('email', email);
        localStorage.setItem('contactNo', contactno);
        localStorage.setItem('Location', location);
        localStorage.setItem('Description', description);
        localStorage.setItem('Image', image);
    },
    clearBusiness: () => {
        set({ businessId: null });
        set({ businessName: null });
        set({ email: null });
        set({ contactNo: null });
        set({ Location: null });
        set({ Description: null });
        set({ Image: null });
        localStorage.removeItem('businessId');
        localStorage.removeItem('businessName');
        localStorage.removeItem('email');
        localStorage.removeItem('contactNo');
        localStorage.removeItem('Location');
        localStorage.removeItem('Description');
        localStorage.removeItem('Image');
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

export const useFilterStore = create((set) => ({
    sortBy: null,
    searchBy: null,
    setsortBy: (sortByFilter) => {
        set({ sortBy: sortByFilter });
    },
    setsearchBy: (searchByFilter) => {
        set({ searchBy: searchByFilter });
    },
}));

export default useBusinessStore;
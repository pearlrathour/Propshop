import { create } from 'zustand';

export const useBusinessStore = create((set) => ({
    businessId: localStorage.getItem('businessId') || null,
    businessName: localStorage.getItem('businessName') || null,
    businessEmail: localStorage.getItem('businessEmail') || null,
    businessContactNo: localStorage.getItem('businessContactNo') || null,
    Location: localStorage.getItem('Location') || null,
    Image: localStorage.getItem('Image') || null,
    Description: localStorage.getItem('Description') || null,
    setBusiness: (id, businessname, businessEmail, businessContactNo, location, image, description) => {
        set({ businessId: id });
        set({ businessName: businessname });
        set({ businessEmail: businessEmail });
        set({ businessContactNo: businessContactNo });
        set({ Location: location });
        set({ Image: image });
        set({ Description: description });
        localStorage.setItem('businessId', id);
        localStorage.setItem('businessName', businessname);
        localStorage.setItem('businessEmail', businessEmail);
        localStorage.setItem('businessContactNo', businessContactNo);
        localStorage.setItem('Location', location);
        localStorage.setItem('Image', image);
        localStorage.setItem('Description', description);
    },
    clearBusiness: () => {
        set({ businessId: null });
        set({ businessName: null });
        set({ businessEmail: null });
        set({ businessContactNo: null });
        set({ Location: null });
        set({ Description: null });
        set({ Image: null });
        localStorage.removeItem('businessId');
        localStorage.removeItem('businessName');
        localStorage.removeItem('businessEmail');
        localStorage.removeItem('businessContactNo');
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
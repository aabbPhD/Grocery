import { create } from 'zustand';
import type { UserType } from '../types/types';


type AuthStoreType = {
    loggedIn: boolean,
    userData: UserType | null,
    login: (userData: UserType) => void,
    logout: () => void,
}

const useAuthStore = create<AuthStoreType>((set) => ({
    loggedIn: !!localStorage.getItem('loggedIn'),
    userData: JSON.parse(localStorage.getItem('userData') || 'null'),
    login: (userData) => {
        set({loggedIn: true, userData});
        localStorage.setItem('loggedIn', 'true');
        localStorage.setItem('userData', JSON.stringify(userData));
    },
    logout: () => {
        set({loggedIn: false, userData: null});
        localStorage.removeItem('loggedIn');
        localStorage.removeItem('userData');
    },
}));

export default useAuthStore;
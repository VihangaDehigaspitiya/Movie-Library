import create from 'zustand';
import { devtools, persist } from 'zustand/middleware';

const store = (set) => ({
    isAuthenticated: false,
    user: null,
})

const authStore = create(persist(devtools(store), {name: 'user'}))

export default authStore;

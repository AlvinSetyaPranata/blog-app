import { create } from "zustand"
import { persist } from "zustand/middleware"

const useAuthStore = create()(persist(
    set => ({
        setToken: (token) => set({ token: token }),
        setUser: (userData) => set({ user: userData }),
        user: {
            id: "",
            email: "",
            name: "",
            age: "",
            gender: "",
            avatar: "",
            role: {
                id: "",
                name: "",
                date_created: ""
            },
            date_registered: ""
        },
        token: ""
    }),
    {
        name: "auth",
        storage: {
          getItem: (key) => JSON.parse(sessionStorage.getItem(key)),
          setItem: (key, value) => sessionStorage.setItem(key, JSON.stringify(value)),
          removeItem: (key) => sessionStorage.removeItem(key),
        },
      }
))

export default useAuthStore
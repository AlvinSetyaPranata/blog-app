import { create } from "zustand"

const useAuthStore = create(set => ({
 setToken: (token) => set({token: token}),
 token: ""   
}))

export default useAuthStore
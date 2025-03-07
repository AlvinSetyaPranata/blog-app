// store.ts
import { atomWithStorage, createJSONStorage } from 'jotai/utils';

export const profileAtom = atomWithStorage('profile', null, createJSONStorage(() => localStorage))
export const photoAtom = atomWithStorage('profilePhoto', null, createJSONStorage(() => localStorage))
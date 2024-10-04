import { atom } from "jotai";

export const marsPhotosCount = atom<number>(0);
export const marsPhotoLoading = atom<boolean>(false);
export const marsPhotoError = atom<string | null>(null);

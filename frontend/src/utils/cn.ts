import clsx, { ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    // Combine CSS classes using clsx and then mix using twMerge
    return twMerge(clsx(inputs));
}
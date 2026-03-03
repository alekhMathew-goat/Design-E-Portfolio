// Badge.tsx
"use client";
import { ReactNode } from "react";

interface BadgeProps {
    bgClass: string;
    textClass: string;
    children: ReactNode;
}

export const Badge = ({ bgClass, textClass, children }: BadgeProps) => (
    <span className={`px-3 py-1 rounded-full font-bold flex items-center gap-1 ${bgClass} ${textClass}`}>
        {children}
    </span>
);
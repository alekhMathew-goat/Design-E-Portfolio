// IconWithText.tsx
"use client";
import { ReactNode } from "react";

interface Props {
    icon: ReactNode;
    label: ReactNode;
}

export const IconWithText = ({ icon, label }: Props) => (
    <div className="flex items-center gap-3">{icon}{label}</div>
);
// Molecules/RequesterInfo.tsx
"use client";
import { User, Phone } from "lucide-react";
import { Badge } from "@/components/AtomicDesign/Atoms/Badge";

interface Props {
    name: string;
    phone: string;
    role?: string;
}

export const RequesterInfo = ({ name, phone }: Props) => (
    <div className="grid gap-3 p-4 bg-surface rounded-lg border border-border">
        <div className="flex items-center gap-3">
            <User className="w-5 h-5 text-primary flex-shrink-0" />
            <div>
                <div className="text-xs text-muted-text">Name</div>
                <div className="text-text font-medium">{name}</div>
            </div>
        </div>
        <div className="flex items-center gap-3">
            <Phone className="w-5 h-5 text-primary flex-shrink-0" />
            <div>
                <div className="text-xs text-muted-text">Contact Phone</div>
                <div className="text-text font-medium">{phone}</div>
            </div>
        </div>
    </div>
);
// Molecules/LocationCard.tsx
"use client";
import { MapPin } from "lucide-react";
import { Map } from "@/components/map";

interface Props {
    address: string;
    lat: number;
    lng: number;
}

export const LocationCard = ({ address, lat, lng }: Props) => (
    <div className="space-y-3">
        <div className="text-sm text-muted-text font-semibold uppercase tracking-wide">Location Details</div>
        <div className="flex items-start gap-3 p-4 bg-surface rounded-lg border border-border mb-3">
            <MapPin className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
            <div>
                <div className="text-xs text-muted-text mb-1">Address</div>
                <div className="text-text font-medium">{address}</div>
                <div className="text-xs text-muted-text mt-2">
                    Coordinates: {lat.toFixed(4)}, {lng.toFixed(4)}
                </div>
            </div>
        </div>
        <div className="rounded-lg overflow-hidden border-2 border-border">
            <Map
                center={[lat, lng]}
                markers={[{ position: [lat, lng], popup: "Request location" }]}
                height="350px"
            />
        </div>
    </div>
);
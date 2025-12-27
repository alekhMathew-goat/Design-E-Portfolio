"use client"

import type React from "react"

import { useState } from "react"
import { Map } from "./map"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { MapPin } from "lucide-react"

interface LocationPickerProps {
  onLocationSelect: (location: { address: string; lat: number; lng: number }) => void
  initialLocation?: { address: string; lat: number; lng: number }
}

export function LocationPicker({ onLocationSelect, initialLocation }: LocationPickerProps) {
  const [address, setAddress] = useState(initialLocation?.address || "")
  const [location, setLocation] = useState<{ lat: number; lng: number }>(
    initialLocation ? { lat: initialLocation.lat, lng: initialLocation.lng } : { lat: 40.7128, lng: -74.006 },
  )
  const [useCurrentLocation, setUseCurrentLocation] = useState(false)

  const handleUseCurrentLocation = () => {
    if ("geolocation" in navigator) {
      setUseCurrentLocation(true)
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const newLocation = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          }
          setLocation(newLocation)
          setAddress("Your current location")
          onLocationSelect({ address: "Your current location", ...newLocation })
          setUseCurrentLocation(false)
        },
        (error) => {
          setUseCurrentLocation(false)
          alert("Unable to get your location. Please enter an address manually.")
        },
      )
    } else {
      alert("Geolocation is not supported by your browser.")
    }
  }

  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newAddress = e.target.value
    setAddress(newAddress)
    // For demo purposes, use a fixed location. In production, you'd geocode the address
    if (newAddress) {
      onLocationSelect({ address: newAddress, ...location })
    }
  }

  return (
    <div className="space-y-4">
      <div className="space-y-3">
        <Label htmlFor="address" className="text-base font-medium">
          Location
        </Label>
        <div className="flex gap-2">
          <Input
            id="address"
            placeholder="Enter your address"
            value={address}
            onChange={handleAddressChange}
            className="h-12 text-base"
          />
          <Button
            type="button"
            variant="outline"
            size="lg"
            onClick={handleUseCurrentLocation}
            disabled={useCurrentLocation}
            className="shrink-0 bg-transparent"
          >
            <MapPin className="w-5 h-5" />
          </Button>
        </div>
        <p className="text-sm text-muted-text">Click the pin icon to use your current location</p>
      </div>

      <div className="rounded-lg overflow-hidden border-2 border-border">
        <Map center={[location.lat, location.lng]} markers={[{ position: [location.lat, location.lng] }]} />
      </div>
    </div>
  )
}

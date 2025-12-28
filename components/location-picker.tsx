"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Map } from "./map"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { MapPin, Loader } from "lucide-react"

interface LocationPickerProps {
  onLocationSelect: (location: { address: string; lat: number; lng: number }) => void
  initialLocation?: { address: string; lat: number; lng: number }
}

interface MapClickEvent {
  latlng: {
    lat: number
    lng: number
  }
}

export function LocationPicker({ onLocationSelect, initialLocation }: LocationPickerProps) {
  const [address, setAddress] = useState(initialLocation?.address || "")
  const [location, setLocation] = useState<{ lat: number; lng: number }>(
    initialLocation ? { lat: initialLocation.lat, lng: initialLocation.lng } : { lat: 10.8505, lng: 76.2711 },
  )
  const [useCurrentLocation, setUseCurrentLocation] = useState(false)
  const [loading, setLoading] = useState(false)
  const [mapClickable, setMapClickable] = useState(true)
  const [suggestions, setSuggestions] = useState<Array<{ name: string; lat: number; lng: number }>>([])
  const [showSuggestions, setShowSuggestions] = useState(false)
  const mapRef = useRef<any>(null)
  const suggestionsRef = useRef<HTMLDivElement>(null)

  // Mock geocoding suggestions (in production, use a real geocoding API)
  const getMockSuggestions = (input: string): Array<{ name: string; lat: number; lng: number }> => {
    const mockLocations: Record<string, { name: string; lat: number; lng: number }[]> = {
      kochi: [{ name: "Kochi, Kerala", lat: 9.9312, lng: 76.2673 }],
      kottayam: [{ name: "Kottayam, Kerala", lat: 9.5941, lng: 76.8106 }],
      thiruvananthapuram: [{ name: "Thiruvananthapuram, Kerala", lat: 8.5241, lng: 76.9366 }],
      thrissur: [{ name: "Thrissur, Kerala", lat: 10.5276, lng: 76.2144 }],
      ernakulum: [{ name: "Ernakulam, Kerala", lat: 9.9312, lng: 76.2673 }],
      malappuram: [{ name: "Malappuram, Kerala", lat: 11.0052, lng: 76.0549 }],
      kannur: [{ name: "Kannur, Kerala", lat: 12.1816, lng: 75.3707 }],
      kozhikode: [{ name: "Kozhikode, Kerala", lat: 11.2588, lng: 75.78 }],
      idukki: [{ name: "Idukki, Kerala", lat: 10.2005, lng: 76.8714 }],
      pathanamthitta: [{ name: "Pathanamthitta, Kerala", lat: 9.2701, lng: 76.7838 }],
      alappuzha: [{ name: "Alappuzha, Kerala", lat: 9.4981, lng: 76.3388 }],
      wayanad: [{ name: "Wayanad, Kerala", lat: 11.5956, lng: 76.1263 }],
    }

    const lowerInput = input.toLowerCase()
    for (const [key, locations] of Object.entries(mockLocations)) {
      if (key.includes(lowerInput) || lowerInput.includes(key)) {
        return locations
      }
    }
    return []
  }

  const handleUseCurrentLocation = () => {
    if ("geolocation" in navigator) {
      setUseCurrentLocation(true)
      setLoading(true)
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
          setLoading(false)
          setSuggestions([])
          setShowSuggestions(false)
        },
        (error) => {
          setUseCurrentLocation(false)
          setLoading(false)
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

    // Show suggestions as user types
    if (newAddress.length > 1) {
      const sug = getMockSuggestions(newAddress)
      setSuggestions(sug)
      setShowSuggestions(sug.length > 0)
    } else {
      setSuggestions([])
      setShowSuggestions(false)
    }

    // Auto-update if address matches suggestion
    const matching = getMockSuggestions(newAddress).find(
      (s) => s.name.toLowerCase() === newAddress.toLowerCase(),
    )
    if (matching) {
      setLocation({ lat: matching.lat, lng: matching.lng })
      onLocationSelect({ address: newAddress, lat: matching.lat, lng: matching.lng })
      setShowSuggestions(false)
    }
  }

  const handleSuggestionClick = (suggestion: { name: string; lat: number; lng: number }) => {
    setAddress(suggestion.name)
    setLocation({ lat: suggestion.lat, lng: suggestion.lng })
    onLocationSelect({ address: suggestion.name, lat: suggestion.lat, lng: suggestion.lng })
    setShowSuggestions(false)
    setSuggestions([])
  }

  // Handle map click to select location
  const handleMapClick = (e: MapClickEvent) => {
    if (mapClickable) {
      const newLat = e.latlng.lat
      const newLng = e.latlng.lng
      setLocation({ lat: newLat, lng: newLng })
      setAddress(`${newLat.toFixed(4)}, ${newLng.toFixed(4)}`)
      onLocationSelect({ address: `${newLat.toFixed(4)}, ${newLng.toFixed(4)}`, lat: newLat, lng: newLng })
    }
  }

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (suggestionsRef.current && !suggestionsRef.current.contains(event.target as Node)) {
        setShowSuggestions(false)
      }
    }

    if (showSuggestions) {
      document.addEventListener("mousedown", handleClickOutside)
      return () => document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [showSuggestions])

  return (
    <div className="space-y-4">
      <div className="space-y-3">
        <Label htmlFor="address" className="text-base font-medium">
          Location
        </Label>
        <div className="relative">
          <div className="flex gap-2">
            <Input
              id="address"
              placeholder="Enter address or search for a location"
              value={address}
              onChange={handleAddressChange}
              className="h-12 text-base"
              onFocus={() => suggestions.length > 0 && setShowSuggestions(true)}
            />
            <Button
              type="button"
              variant="outline"
              size="lg"
              onClick={handleUseCurrentLocation}
              disabled={useCurrentLocation || loading}
              className="shrink-0 bg-transparent"
              title="Use your current location"
            >
              {loading ? <Loader className="w-5 h-5 animate-spin" /> : <MapPin className="w-5 h-5" />}
            </Button>
          </div>

          {/* Location suggestions dropdown */}
          {showSuggestions && suggestions.length > 0 && (
            <Card
              ref={suggestionsRef}
              className="absolute top-full left-0 right-0 mt-2 z-50 border-2 border-border p-0 max-h-64 overflow-y-auto"
            >
              {suggestions.map((suggestion, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSuggestionClick(suggestion)}
                  className="w-full text-left px-4 py-3 hover:bg-accent transition-colors border-b border-border last:border-b-0 flex items-center gap-2"
                >
                  <MapPin className="w-4 h-4 text-muted-text flex-shrink-0" />
                  <span className="text-sm text-text">{suggestion.name}</span>
                </button>
              ))}
            </Card>
          )}
        </div>
        <p className="text-sm text-muted-text">
          Click the pin icon for current location, type to search, or click on the map to select a location
        </p>
      </div>

      <div
        className="rounded-lg overflow-hidden border-2 border-border cursor-crosshair hover:border-primary transition-colors"
        onClick={(e) => {
          if ((e.target as HTMLElement).closest('[data-slot="map"]')) {
            // Map click will be handled by the Map component callback
          }
        }}
      >
        <MapClickableWrapper center={[location.lat, location.lng]} onMapClick={handleMapClick} />
      </div>

      <div className="bg-accent/30 rounded-lg p-4 border border-accent">
        <p className="text-sm text-text font-medium">Current location:</p>
        <p className="text-sm text-muted-text mt-1">{address || "No location selected"}</p>
        <p className="text-xs text-muted-text mt-1">
          Coordinates: {location.lat.toFixed(4)}, {location.lng.toFixed(4)}
        </p>
      </div>
    </div>
  )
}

// Wrapper component to handle map clicks
function MapClickableWrapper({
  center,
  onMapClick,
}: {
  center: [number, number]
  onMapClick: (e: MapClickEvent) => void
}) {
  const mapContainerRef = useRef<HTMLDivElement>(null)
  const mapInstanceRef = useRef<any>(null)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    if (typeof window === "undefined") return

    // Check if Leaflet is already loaded
    if ((window as any).L && mapInstanceRef.current === null) {
      setIsLoaded(true)
      return
    }

    // Load Leaflet CSS
    const link = document.createElement("link")
    link.rel = "stylesheet"
    link.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
    document.head.appendChild(link)

    // Load Leaflet JS
    const script = document.createElement("script")
    script.src = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"
    script.async = true
    script.onload = () => {
      setIsLoaded(true)
    }
    document.head.appendChild(script)
  }, [])

  useEffect(() => {
    if (!isLoaded || !mapContainerRef.current || mapInstanceRef.current) return

    const L = (window as any).L

    // Only initialize if container is in DOM and map not already created
    if (!mapContainerRef.current.hasChildNodes()) {
      // Fix for default marker icon
      delete (L.Icon.Default.prototype as any)._getIconUrl
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
        iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
        shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
      })

      // Create map
      const map = L.map(mapContainerRef.current).setView(center, 13)

      // Add OpenStreetMap tiles
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 19,
      }).addTo(map)

      // Add click event listener
      map.on("click", onMapClick)

      // Add current location marker
      const marker = L.marker(center).addTo(map).bindPopup("Your selected location")

      mapInstanceRef.current = { map, marker }
    } else if (mapInstanceRef.current) {
      // Update marker position if center changed
      mapInstanceRef.current.marker.setLatLng(center)
      mapInstanceRef.current.map.setView(center, 13)
    }

    return () => {
      // Cleanup on unmount
      if (mapInstanceRef.current?.map) {
        mapInstanceRef.current.map.off("click", onMapClick)
        mapInstanceRef.current.map.remove()
        mapInstanceRef.current = null
      }
    }
  }, [isLoaded, center, onMapClick])

  return (
    <div
      ref={mapContainerRef}
      data-slot="map"
      style={{ height: "400px", width: "100%" }}
      className="rounded-lg"
    >
      {!isLoaded && (
        <div className="flex items-center justify-center h-full bg-muted">
          <p className="text-muted-text">Loading map...</p>
        </div>
      )}
    </div>
  )
}

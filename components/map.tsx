"use client"

import { useEffect, useRef, useState } from "react"

interface MapProps {
  center: [number, number]
  zoom?: number
  markers?: Array<{
    position: [number, number]
    popup?: string
  }>
  height?: string
  className?: string
}

export function Map({ center, zoom = 13, markers = [], height = "400px", className = "" }: MapProps) {
  const mapRef = useRef<HTMLDivElement>(null)
  const mapInstanceRef = useRef<any>(null)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    if (typeof window === "undefined" || mapInstanceRef.current) return

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

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove()
        mapInstanceRef.current = null
      }
    }
  }, [])

  useEffect(() => {
    if (!isLoaded || !mapRef.current || mapInstanceRef.current) return

    const L = (window as any).L

    // Fix for default marker icon
    delete L.Icon.Default.prototype._getIconUrl
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
      iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
      shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
    })

    // Create map
    const map = L.map(mapRef.current).setView(center, zoom)

    // Add OpenStreetMap tiles
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      maxZoom: 19,
    }).addTo(map)

    // Add markers
    markers.forEach((marker) => {
      const leafletMarker = L.marker(marker.position).addTo(map)
      if (marker.popup) {
        leafletMarker.bindPopup(marker.popup)
      }
    })

    mapInstanceRef.current = map
  }, [isLoaded, center, zoom, markers])

  return (
    <div ref={mapRef} style={{ height, width: "100%" }} className={`rounded-lg ${className}`}>
      {!isLoaded && (
        <div className="flex items-center justify-center h-full bg-muted">
          <p className="text-muted-text">Loading map...</p>
        </div>
      )}
    </div>
  )
}

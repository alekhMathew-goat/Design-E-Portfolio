"use client"

import { useEffect, useRef, useState } from "react"

interface MapProps {
  center: [number, number]
  zoom?: number
  markers?: Array<{
    id?: string
    position: [number, number]
    popup?: string
    acceptable?: boolean
  }>
  onAccept?: (id: string) => void
  height?: string
  className?: string
}

export function Map({ center, zoom = 13, markers = [], height = "400px", className = "", onAccept }: MapProps) {
  const mapRef = useRef<HTMLDivElement>(null)
  const mapInstanceRef = useRef<any>(null)
  const markersLayerRef = useRef<any>(null)
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

    // Create a layer group for markers so we can update them later
    markersLayerRef.current = L.layerGroup().addTo(map)

    // Add initial markers to the layer
    markers.forEach((marker) => {
      const leafletMarker = L.marker(marker.position).addTo(markersLayerRef.current)
      if (marker.popup || (marker.acceptable && onAccept && marker.id)) {
        const popupDiv = document.createElement('div')
        if (marker.popup) popupDiv.innerHTML = marker.popup
        if (marker.acceptable && onAccept && marker.id) {
          const btn = document.createElement('button')
          btn.textContent = 'Accept'
          btn.className = 'mt-2 px-3 py-1 bg-primary text-white rounded'
          btn.onclick = (e: any) => {
            e.stopPropagation()
            onAccept(marker.id!)
          }
          popupDiv.appendChild(btn)
        }
        leafletMarker.bindPopup(popupDiv)
      }
    })

    mapInstanceRef.current = map
  }, [isLoaded, center, zoom, markers])

  // Update markers when `markers` prop changes after map is initialized
  useEffect(() => {
    if (!isLoaded || !mapInstanceRef.current) return

    const L = (window as any).L
    const layer = markersLayerRef.current || L.layerGroup().addTo(mapInstanceRef.current)
    markersLayerRef.current = layer

    // Clear existing markers
    layer.clearLayers()

    // Add new markers
    markers.forEach((marker) => {
      const leafletMarker = L.marker(marker.position).addTo(layer)
      if (marker.popup || (marker.acceptable && onAccept && marker.id)) {
        const popupDiv = document.createElement('div')
        if (marker.popup) popupDiv.innerHTML = marker.popup
        if (marker.acceptable && onAccept && marker.id) {
          const btn = document.createElement('button')
          btn.textContent = 'Accept'
          btn.className = 'mt-2 px-3 py-1 bg-primary text-white rounded'
          btn.onclick = (e: any) => {
            e.stopPropagation()
            onAccept(marker.id!)
          }
          popupDiv.appendChild(btn)
        }
        leafletMarker.bindPopup(popupDiv)
      }
    })
  }, [isLoaded, markers, onAccept])

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

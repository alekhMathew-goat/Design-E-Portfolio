"use client"

import { useState, useEffect, useCallback } from "react"

export default function useFirstVisit(key: string) {
  const [seen, setSeen] = useState<boolean>(true)

  useEffect(() => {
    try {
      const v = localStorage.getItem(key)
      setSeen(v === "1")
    } catch (e) {
      setSeen(true)
    }
  }, [key])

  const markSeen = useCallback(() => {
    try {
      localStorage.setItem(key, "1")
    } catch (e) {
      // ignore
    }
    setSeen(true)
  }, [key])

  return [seen, markSeen] as const
}

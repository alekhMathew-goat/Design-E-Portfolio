"use client"

export interface User {
  id: string
  email: string
  password: string
  role: "grandparent" | "helper"
  profile: {
    name: string
    age?: number
    phone: string
    preferredContact: string
    emergencyContact?: string
    location?: {
      lat: number
      lng: number
      address: string
    }
  }
  createdAt: string
}

export interface Request {
  id: string
  userId: string
  userName: string
  userPhone: string
  type: string
  title: string
  description: string
  priority: "low" | "medium" | "high" | "urgent"
  location: {
    lat: number
    lng: number
    address: string
  }
  date: string
  time: string
  status: "open" | "accepted" | "completed"
  acceptedBy?: {
    id: string
    name: string
    phone: string
  }
  createdAt: string
}

const USERS_KEY = "neighborly_users"
const CURRENT_USER_KEY = "neighborly_current_user"
const REQUESTS_KEY = "neighborly_requests"

// User Management
export function getUsers(): User[] {
  if (typeof window === "undefined") return []
  const users = localStorage.getItem(USERS_KEY)
  return users ? JSON.parse(users) : []
}

export function saveUser(user: User): void {
  const users = getUsers()
  users.push(user)
  localStorage.setItem(USERS_KEY, JSON.stringify(users))
}

export function updateUser(userId: string, updates: Partial<User>): void {
  const users = getUsers()
  const index = users.findIndex((u) => u.id === userId)
  if (index !== -1) {
    users[index] = { ...users[index], ...updates }
    localStorage.setItem(USERS_KEY, JSON.stringify(users))

    // Update current user if it's the same
    const currentUser = getCurrentUser()
    if (currentUser?.id === userId) {
      setCurrentUser({ ...currentUser, ...updates })
    }
  }
}

export function getCurrentUser(): User | null {
  if (typeof window === "undefined") return null
  const user = localStorage.getItem(CURRENT_USER_KEY)
  return user ? JSON.parse(user) : null
}

export function setCurrentUser(user: User | null): void {
  if (user) {
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user))
  } else {
    localStorage.removeItem(CURRENT_USER_KEY)
  }
}

export function signup(
  email: string,
  password: string,
  role: "grandparent" | "helper",
  profile: User["profile"],
): { success: boolean; error?: string; user?: User } {
  const users = getUsers()

  // Check if email already exists
  if (users.find((u) => u.email === email)) {
    return { success: false, error: "Email already exists" }
  }

  const newUser: User = {
    id: `user_${Date.now()}`,
    email,
    password, // In production, this should be hashed
    role,
    profile,
    createdAt: new Date().toISOString(),
  }

  saveUser(newUser)
  setCurrentUser(newUser)

  return { success: true, user: newUser }
}

export function login(email: string, password: string): { success: boolean; error?: string; user?: User } {
  const users = getUsers()
  const user = users.find((u) => u.email === email && u.password === password)

  if (!user) {
    return { success: false, error: "Invalid email or password" }
  }

  setCurrentUser(user)
  return { success: true, user }
}

export function logout(): void {
  setCurrentUser(null)
}

// Request Management
export function getRequests(): Request[] {
  if (typeof window === "undefined") return []
  const requests = localStorage.getItem(REQUESTS_KEY)
  return requests ? JSON.parse(requests) : []
}

export function saveRequest(request: Request): void {
  const requests = getRequests()
  requests.push(request)
  localStorage.setItem(REQUESTS_KEY, JSON.stringify(requests))
}

export function updateRequest(requestId: string, updates: Partial<Request>): void {
  const requests = getRequests()
  const index = requests.findIndex((r) => r.id === requestId)
  if (index !== -1) {
    requests[index] = { ...requests[index], ...updates }
    localStorage.setItem(REQUESTS_KEY, JSON.stringify(requests))
  }
}

export function getRequestById(id: string): Request | undefined {
  return getRequests().find((r) => r.id === id)
}

export function getUserRequests(userId: string): Request[] {
  return getRequests().filter((r) => r.userId === userId)
}

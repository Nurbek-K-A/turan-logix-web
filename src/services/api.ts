import axios, { AxiosError } from 'axios'
import toast from 'react-hot-toast'

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080'

export const api = axios.create({
  baseURL: `${BASE_URL}/api`,
  timeout: 30000,
  headers: { 'Content-Type': 'application/json' },
})

// Request interceptor — attach JWT
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('turanlogix-token')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

// Response interceptor — handle auth errors globally
api.interceptors.response.use(
  (res) => res,
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('turanlogix-token')
      localStorage.removeItem('turanlogix-user')
      window.dispatchEvent(new CustomEvent('auth:logout'))
    }
    if (error.response?.status && error.response.status >= 500) {
      toast.error('Ошибка сервера. Попробуйте позже.')
    }
    return Promise.reject(error)
  }
)

// Auth
export const authApi = {
  login: (data: { email: string; password: string }) =>
    api.post<{ token: string; user: User }>('/auth/login', data),
  register: (data: RegisterDto) =>
    api.post<{ token: string; user: User }>('/auth/register', data),
  getProfile: () => api.get<User>('/profile'),
  updateProfile: (data: Partial<User>) => api.put<User>('/profile', data),
}

// Orders
export const ordersApi = {
  getMyOrders: () => api.get<Order[]>('/orders/my'),
  getOrder: (id: number) => api.get<Order>(`/orders/${id}`),
  createOrder: (data: CreateOrderDto) => api.post<Order>('/orders', data),
  getDocuments: (orderId: number) => api.get<Document[]>(`/orders/${orderId}/documents`),
  uploadDocument: (orderId: number, file: File) => {
    const form = new FormData()
    form.append('file', file)
    return api.post<Document>(`/orders/${orderId}/documents/upload`, form, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
  },
}

// AI Chat
export const chatApi = {
  sendMessage: (message: string, history: ChatMessage[]) =>
    api.post<{ response: string }>('/chat', { message, history }),
}

// Types
export interface User {
  id: number
  fullName: string
  email: string
  phoneNumber: string
  companyName?: string
  bin?: string
  role: 'Client' | 'Manager' | 'Admin'
  createdAt: string
}

export interface RegisterDto {
  fullName: string
  email: string
  phoneNumber: string
  password: string
  companyName?: string
  bin?: string
}

export interface Order {
  id: number
  fromCity: string
  toCity: string
  cargoDescription: string
  weightKg: number
  volumeM3?: number
  status: 'Pending' | 'InProgress' | 'Completed' | 'Cancelled'
  createdAt: string
  updatedAt: string
  trackingNumber?: string
}

export interface CreateOrderDto {
  fromCity: string
  toCity: string
  cargoDescription: string
  weightKg: number
  volumeM3?: number
  contactPhone?: string
  notes?: string
}

export interface Document {
  id: number
  orderId: number
  fileName: string
  fileType: string
  fileUrl: string
  isSigned: boolean
  uploadedAt: string
}

export interface ChatMessage {
  role: 'user' | 'assistant'
  content: string
}

// Jednostka miary
export interface UnitOfMeasurement {
  idUnitOfMeasurement: number;
  name: string | null;
  description: string | null;
  isActive: boolean;
}

// Kategoria
export interface Category {
  idCategory: number;
  name: string | null;
  description: string | null;
  isActive: boolean;
}

// Klient
export interface Client {
  idClient: number;
  name: string | null;
  adress: string | null;  // Typo w bazie - zostawiamy
  phoneNumber: string | null;
  isActive: boolean;
}

// Pracownik
export interface Worker {
  idWorker: number;
  firstName: string | null;
  lastName: string | null;
  isActive: boolean;
  login: string;
  password?: string;
}

// Produkt (ItemDto z backendu)
export interface Item {
  idItem: number;
  name: string | null;
  description: string | null;
  idCategory: number;
  categoryName: string | null;
  price: number | null;
  quantity: number | null;
  idUnitOfMeasurement: number | null;
  unitName: string | null;
  code: string | null;
  isActive: boolean;
}

// Request types (dla Create/Update)
export interface CreateItemRequest {
  name: string;
  description?: string;
  idCategory: number;
  price?: number;
  quantity?: number;
  fotoUrl?: string;
  idUnitOfMeasurement?: number;
  code?: string;
}

export interface UpdateItemRequest extends CreateItemRequest {
  idItem: number;
  isActive: boolean;
}

export interface Author {
  idAuthor: number;
  firstName: string;
  lastName: string;
  isActive: boolean;
}

export interface Review {
  idReview: number;
  content: string;
  rating: number;
}

export interface Book {
  idBook: number;
  title: string;
  description: string;
  price: number;
  pages: number;
  language: string;
  idAuthor: number;
  idPublisher: number | null;
  isActive: boolean;

  authorName: string;
  publisherName: string;
  categories: string[];
  averageRating?: number;
  reviews?: Review[];
  categoryIds?: number[];
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
}

export interface AuthUser {
  idAppUser: number;
  name: string;
  email: string;
  role: string;
}

export interface CreateBookRequest {
  title: string;
  description: string;
  price: number;
  pages: number;
  language: string;
  idAuthor: number;
  idPublisher?: number | null;
  idBookCategories: number[];
}

export interface UpdateBookRequest {
  idBook: number;
  title: string;
  description: string;
  price: number;
  pages: number;
  language: string;
  idAuthor: number;
  idPublisher?: number | null;
  idBookCategories: number[];
  isActive: boolean;
}

export interface Publisher {
  idPublisher: number;
  name: string;
  isActive: boolean;
}

export interface BookCategory {
  idBookCategory: number;
  name: string;
  isActive: boolean;
}

export interface CreateReviewRequest {
  idBook: number;
  content: string;
  rating: number;
}
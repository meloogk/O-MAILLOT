export type OrderStatus = 'EN_ATTENTE' | 'CONFIRMÉE' | 'EXPÉDIÉE' | 'LIVRÉE' | 'ANNULÉE';
export type PaymentStatus = 'EN_ATTENTE' | 'CONFIRMÉE' | 'ÉCHOUÉE' | 'REMBOURSÉE';
export type PaymentMethod = 'WAVE' | 'ORANGE_MONEY' | 'MTN_MONEY' | 'MOOV_MONEY' | 'CASH' | 'PAYPAL' | 'CARD';

export type Order = {
  id: string;
  userId: string;
  user?: import('./user').User;
  items: import('./product').CartItem[];
  total: {
    XOF: number;
    EUR: number;
    USD: number;
  };
  status: OrderStatus;
  shippingAddress: {
    fullName: string;
    street: string;
    city: string;
    postalCode: string;
    country: string;
    phone: string;
  };
  paymentStatus: PaymentStatus;
  paymentId?: string;
  invoiceId?: string;
  pointsEarned?: number;
  createdAt: Date;
  updatedAt: Date;
};

export type Payment = {
  id: string;
  orderId: string;
  order?: Order;
  amount: {
    XOF: number;
    EUR: number;
    USD: number;
  };
  method: PaymentMethod;
  status: PaymentStatus;
  transactionId?: string;
  createdAt: Date;
  updatedAt: Date;
};

export type Invoice = {
  id: string;
  orderId: string;
  order?: Order;
  amount: {
    XOF: number;
    EUR: number;
    USD: number;
  };
  status: 'DRAFT' | 'SENT' | 'PAID' | 'OVERDUE';
  dueDate: Date;
  createdAt: Date;
  updatedAt: Date;
};
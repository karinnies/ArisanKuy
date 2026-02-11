
export interface GroupData {
  id?: string;
  name: string;
  slug: string;
  adminId: string;
  iuran: number;
  waAdmin: string;
  rekening: string;
  rules: string[];
  createdAt: any;
}

export interface Participant {
  id: string;
  nama: string;
  noWa: string;
  status: 'Lunas' | 'Belum';
  proofUrl?: string;
  paidAt?: any;
  isWinner?: boolean;
}

export interface MonthWinner {
  periode: number;
  nama: string;
  date: any;
}

export interface Message {
  role: 'user' | 'model';
  text: string;
}

// Fix: Added missing Skill interface for Skills component
export interface Skill {
  name: string;
  level: number;
  category: string;
}

// Fix: Added missing Project interface for Projects component
export interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  tags: string[];
  link: string;
}

// Fix: Added missing Rule interface for AdminPanel and PaymentSection components
export interface Rule {
  Konten: string;
}

// Fix: Added missing AppSettings interface for AdminPanel and PaymentInfoCard components
export interface AppSettings {
  whatsapp_admin: string;
  rekening_tujuan: string;
  admin_pin: string;
}

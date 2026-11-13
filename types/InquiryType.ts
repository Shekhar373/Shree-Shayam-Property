export type InquiryStatus =
  | "new"
  | "contacted"
  | "interested"
  | "closed"
  | "spam";

export interface InquiryProperty {
  _id?: string;
  title: string;
  slug?: string;
}

export interface Inquiry {
  _id: string;
  name: string;
  email?: string;
  phone: string;
  message: string;
  status: InquiryStatus;
  notes?: string;
  followUpAt?: string | null;
  property?: InquiryProperty | null;
  createdAt: string;
  updatedAt: string;
}

export interface InquiryUpdateData {
  status?: InquiryStatus;
  notes?: string;
  followUpAt?: string | null;
}
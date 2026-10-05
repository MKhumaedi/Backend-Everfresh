export interface CreateInquiryInput {
  fullName: string;
  companyName: string;
  email: string;
  phone: string;
  city: string;
  interestedProduct: string;
  targetCapacity?: string;
  notes?: string;
}

export interface InquiryFilterQuery {
  status?: string;
  search?: string;
  page?: number;
  pageSize?: number;
}

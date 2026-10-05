export interface CreateTestimonialInput {
  name: string;
  role: string;
  quote: string;
  avatarUrl?: string;
  rating?: number;
  isVisible?: boolean;
  sortOrder?: number;
}

export type UpdateTestimonialInput = Partial<CreateTestimonialInput>;

export interface TestimonialQueryFilter {
  search?: string;
  isVisible?: boolean | string;
}

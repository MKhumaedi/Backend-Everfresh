export interface DashboardSummary {
  newQuotesCount: number;
  newQuotesDiffYesterday: number;
  publishedArticlesCount: number;
  draftArticlesCount: number;
  activeProductsCount: number;
  completedProjectsCount: number;
}

export interface DayQuoteCount {
  date: string;
  count: number;
}

export interface DashboardData {
  summary: DashboardSummary;
  recentQuotes: unknown[];
  recentActivities: unknown[];
  draftArticles: unknown[];
  quoteChart30Days: DayQuoteCount[];
  bestSellerSpec: {
    title: string;
    description: string;
    tags: string[];
  };
}

import rateLimit from 'express-rate-limit';

export const apiRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 300,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    data: null,
    message: 'Terlalu banyak permintaan ke server. Silakan coba kembali dalam 15 menit.',
  },
});

export const authRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    data: null,
    message: 'Terlalu banyak percobaan login gagal. Silakan tunggu 15 menit.',
  },
});

export const publicQuoteRateLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    data: null,
    message: 'Batas pengiriman penawaran tercapai (maks 5/jam). Silakan hubungi kami via WhatsApp.',
  },
});

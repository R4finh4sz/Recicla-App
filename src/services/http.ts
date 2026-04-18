import axios from 'axios';
import * as SecureStore from 'expo-secure-store';

const http = axios.create({
  baseURL: 'https://reciclaonline.com.br/api',
});

const maskSensitiveFields = (value: unknown): unknown => {
  if (!value || typeof value !== 'object') {
    return value;
  }

  if (Array.isArray(value)) {
    return value.map(item => maskSensitiveFields(item));
  }

  const record = value as Record<string, unknown>;
  const masked: Record<string, unknown> = {};

  Object.entries(record).forEach(([key, item]) => {
    const normalizedKey = key.toLowerCase();
    const isSensitive =
      normalizedKey.includes('password') || normalizedKey.includes('token');

    masked[key] = isSensitive ? '********' : maskSensitiveFields(item);
  });

  return masked;
};

http.interceptors.request.use(
  async config => {
    if (config.data?._parts) {
      config.headers['Content-Type'] = 'multipart/form-data';
    }

    const accessToken = await SecureStore.getItemAsync('accessToken');
    if (accessToken) {
      config.headers!.Authorization = `Bearer ${accessToken}`;
    }

    const method = (config.method || 'get').toUpperCase();
    const route = `${config.baseURL || ''}${config.url || ''}`;
    console.warn(`[HTTP] ${method} ${route}`);

    if (config.data) {
      console.warn('[HTTP] Payload:', maskSensitiveFields(config.data));
    }

    return config;
  },
  error => Promise.reject(error),
);

export { http };

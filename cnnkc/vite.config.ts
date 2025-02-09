import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // Sunucuyu tüm ağ bağlantıları için erişilebilir yapar
    port: 5174, // Belirli bir portu sabitler
    strictPort: true, // Port kullanılamazsa başka bir port aramaz
  },
});
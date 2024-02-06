'use client';

import { ThemeProvider } from 'next-themes';
import { ToastContainer } from 'react-toastify';
import { AppProgressBar as ProgressBar } from 'next-nprogress-bar';

import 'react-toastify/dist/ReactToastify.css';

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="light">
      <ToastContainer theme="colored" />

      <ProgressBar color="#3498DB" height="4px" />

      {children}
    </ThemeProvider>
  );
}

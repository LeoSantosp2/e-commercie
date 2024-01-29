'use client';

import { ThemeProvider } from 'styled-components';

import { GlobalStyles } from '../styles/global-styles';
import { theme } from '../styles/theme';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <html lang="pt-BR">
        <title>Model Project NextJs</title>
        <body>{children}</body>
      </html>
    </ThemeProvider>
  );
}

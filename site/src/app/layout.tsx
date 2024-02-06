import { Roboto } from 'next/font/google';

import '../styles/globals.css';

import Providers from '../providers';

const roboto = Roboto({ weight: '400', subsets: ['latin'] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <title>Pay Commercie</title>
      <body
        className={
          (roboto.className, 'w-full h-screen bg-primary dark:bg-secondary')
        }
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}

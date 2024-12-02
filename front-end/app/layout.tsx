import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Gerenciador de Alunos",
  description: "Aplicação simples para gerenciamento de alunos"
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body
        className='antialiased text-gray-900 bg-white dark:bg-gray-900 dark:text-white'
      >
        {children}
      </body>
    </html>
  );
}

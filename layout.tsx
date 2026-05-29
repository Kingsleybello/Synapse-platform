// app/layout.tsx
import React from 'react';
import Script from 'next/script';
import { WalletProvider } from '@/components/WalletProvider'; // Crucial integration link
import '@/app/globals.css';

export const metadata = {
  title: 'Synapse | Web3 Project Lifecycle Hub',
  description: 'Neural link between milestone delivery and fund execution',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* MANDATORY HACKATHON RULES: Novus.ai SDK Integration */}
        <Script
          id="novus-analytics"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(n,o,v,u,s){
                n[s]=n[s]||function(){(n[s].q=n[s].q||[]).push(arguments)};
                var a=o.createElement(v);var m=o.getElementsByTagName(v)[0];
                a.async=1;a.src=u;m.parentNode.insertBefore(a,m)
              })(window,document,'script','https://novus.ai');
              
              novus('init', '${process.env.NEXT_PUBLIC_NOVUS_PROJECT_TOKEN || "HACKATHON_MIND_THE_PRODUCT_2026"}');
              novus('track', 'pageview');
            `,
          }}
        />
      </head>
      <body className="bg-slate-950 text-slate-100 font-sans antialiased">
        {/* Providing global Web3 state connection across all pages */}
        <WalletProvider>
          <main className="min-h-screen flex flex-col">
            {children}
          </main>
        </WalletProvider>
      </body>
    </html>
  );
}
      </head>
      <body className="bg-slate-950 text-slate-100 font-sans antialiased">
        <main className="min-h-screen flex flex-col">
          {children}
        </main>
      </body>
    </html>
  );
}

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Client Portal - AesthetiCare Pro',
  description: 'Manage your orders, appointments, and view your history with AesthetiCare Pro.',
};

export default function PortalLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="bg-muted/40 min-h-screen">
      <div className="p-4 sm:p-6 lg:p-8 container mx-auto max-w-7xl">
          {children}
      </div>
    </div>
  );
}

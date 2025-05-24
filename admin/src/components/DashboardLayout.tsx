import type React from 'react';
import Sidebar from './Sidebar';
import Header from './Header';

type Props = {
    children: React.ReactNode;
};

function DashboardLayout({ children }: Props) {
    return (
        <div className="min-h-screen flex flex-col">
            <Header />
            <div className="flex flex-1">
                <Sidebar />
                <main className="flex-1 p-4">{children}</main>
            </div>
        </div>
    );
}

export default DashboardLayout;

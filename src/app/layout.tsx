import HeaderComponent from '@/components/HeaderComponent';
import '../styles/global.css';

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
        <body>
        <HeaderComponent />
        <main>{children}</main>
        </body>
        </html>
    );
}

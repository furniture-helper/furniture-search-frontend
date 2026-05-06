import type {Metadata} from "next";
import {Geist, Geist_Mono} from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "Product Search",
    description: "Find Products",
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html
            lang="en"
            className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
        >
        <body className="min-h-screen flex flex-col justify-center items-center">
        <Header/>
        <div className="flex-1 w-full min-w-[1000px] max-w-[1920px] p-10">
            {children}
        </div>
        </body>
        </html>
    );
}

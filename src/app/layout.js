"use client";
import { StyleProvider } from "@ant-design/cssinjs";
import "./globals.css";



export default function RootLayout({
    children,
}) {
    return (
        <StyleProvider hashPriority="high">

            <html lang="en">

                {children}

            </html>

        </StyleProvider>
    );
}
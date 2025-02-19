import "./globals.css";

import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import localFont from "next/font/local";

import CookieConsentOverlay from '@/components/CookieConsentOverlay';
import CookieConsentProvider from '@/providers/CookieConsentProvider';
import GsapProvider from '@/providers/GsapProvider';
import GoogleRecaptchaProvider from '@/providers/GoogleRecaptchaProvider';
import GoogleAnalytics from '@/components/GoogleAnalytics';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SectionProvider from '@/providers/SectionProvider';

const bodyFont = Montserrat({
    subsets: ["latin"],
    variable: '--font-body',
    display: 'swap'
});

const headerFont = localFont({
    src: [
        {
            path: '../fonts/earthorbiter.woff2',
            weight: '400',
            style: 'normal'
        },
        {
            path: '../fonts/earthorbiterbold.woff2',
            weight: '600',
            style: 'normal'
        },
        {
            path: '../fonts/earthorbiterxtrabold.woff2',
            weight: '700',
            style: 'normal'
        },
    ],
    display: 'swap',
    variable: '--font-header'
})

export const metadata: Metadata = {
	title: "Justin Conabree",
	description: "Full-stack developer with a passion for building cool stuff",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={`font-sans ${bodyFont.variable} ${headerFont.variable}`}>
				<CookieConsentProvider>
                    <GoogleAnalytics analyticsId={process.env.GOOGLE_ANALYTICS_ID} />
                    <GoogleRecaptchaProvider recaptchaKey={process.env.RECAPTCHA_SITE_KEY}>
                        <Header />
                        <GsapProvider>
                            <SectionProvider>
                                {children}
                            </SectionProvider>
                        </GsapProvider>
                        <Footer />
                    </GoogleRecaptchaProvider>
                    <CookieConsentOverlay />
                </CookieConsentProvider>
			</body>
		</html>
	);
}

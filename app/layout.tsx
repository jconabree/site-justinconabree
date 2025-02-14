import "./globals.css";

import type { Metadata } from "next";
import { Inter, Ubuntu, Montserrat } from "next/font/google";
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

// const headerFont = localFont({
//     src: '../fonts/BabaPro-Bold.woff2',
//     display: 'swap',
//     variable: '--font-header'
// })

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
	description: "Full-stack developer with a passion for building cool things",
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
                <svg width="0" height="0">
                    <filter id="rgb-split">
                        <feOffset in="SourceGraphic" dx="2" dy="2" result="layer-one" />
                        <feComponentTransfer in="layer-one" result="magenta">
                            <feFuncR type="identity" />
                            <feFuncG type="discrete" tableValues="0" />
                            <feFuncB type="identity" />
                        </feComponentTransfer>

                        <feOffset in="SourceGraphic" dx="-2" dy="-2" result="layer-two" />
                        <feComponentTransfer in="layer-two" result="cyan">
                            <feFuncR type="discrete" tableValues="0" />
                            <feFuncG type="identity" />
                            <feFuncB type="identity" />
                        </feComponentTransfer>

                        <feBlend in="magenta" in2="cyan" mode="screen" result="color-split" />
                    </filter>
                </svg>
			</body>
		</html>
	);
}

import type { Metadata } from "next";
import ContactSection from '@/app-pages/Home/Sections/Contact';

export const metadata: Metadata = {
	title: "Contact | Justin Conabree",
	description: "Get in touch with me using this contact page. Your message will be sent to my personal email and I'll respond as soon as possible.",
    publisher: 'Justin Conabree',
    openGraph: {
        type: 'website',
    }
};

export default function Contact() {
    return (
        <main className="flex min-h-screen flex-col py-8 md_py-12 lg_py-24 content-page">
            <ContactSection />
        </main>
    )
}
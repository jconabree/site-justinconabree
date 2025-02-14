import type { Metadata } from "next";
import ContactSection from '@/app-pages/Home/Sections/Contact';

export const metadata: Metadata = {
	title: "Contact | Justin Conabree"
};

export default function Contact() {
    return (
        <main className="flex min-h-screen flex-col p-24 content-page">
            <ContactSection />
        </main>
    )
}
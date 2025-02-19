import type { Metadata } from 'next';
import HomePage from '@/app-pages/Home';

export default function Home() {
  return <HomePage />;
}

export const metadata: Metadata = {
	title: "Home | Justin Conabree",
	description: "Learn about projects I've worked on, technology I've worked with, and some of the skills I've picked up along the way. I'm a full-stack developer with a passion for building cool stuff.",
  publisher: 'Justin Conabree',
  openGraph: {
      type: 'website',
  }
};
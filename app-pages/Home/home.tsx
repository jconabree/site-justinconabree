import Section from '@/components/Section';
import SectionNavigation from '@/components/SectionNavigation';

import HeroSection from './Sections/Hero';
import AboutSection from './Sections/About';
import SkillsSection from './Sections/Skills';
import WorkSection from './Sections/Work';
import ProjectsSection from './Sections/Projects';
import ContactSection from './Sections/Contact';

import classes from './home.module.css';

export default function Home() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-between pb-24">
            <Section id="hero" title="Intro" className={classes.section}>
                <HeroSection />
            </Section>
            <Section id="about" title="About Me" className={classes.section}>
                <AboutSection />
            </Section>
            <Section id="skills" title="Skills" className={classes.section}>
                <SkillsSection />
            </Section>
            <Section id="work" title="Work" className={classes.section}>
                <WorkSection />
            </Section>
            <Section id="projects" title="Projects" className={classes.section}>
                <ProjectsSection />
            </Section>
            <Section id="contact" title="Contact" className={classes.section}>
                <ContactSection />
            </Section>
            <SectionNavigation />
        </main>
    );
}
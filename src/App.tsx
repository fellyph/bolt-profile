import React from 'react';
import { Github, Linkedin, Mail } from 'lucide-react';
import { ContactPopup } from './components/ContactPopup';
import { ExpandableTabs } from './components/ui/expandable-tabs';
import { FlickeringGrid } from './components/ui/flickering-grid';
import { BlurFade } from './components/ui/blur-fade';
import { Button as MovingBorderButton } from './components/ui/moving-border';

function App() {
  const [isContactOpen, setIsContactOpen] = React.useState(false);
  
  const socialTabs = [
    { title: "GitHub", icon: Github, href: "https://github.com/fellyph" },
    { type: "separator" },
    { title: "LinkedIn", icon: Linkedin, href: "https://linkedin.com/in/fellyph" },
    { type: "separator" },
    { title: "Email", icon: Mail, href: "mailto:fellyph@gmail.com" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="/src/imgs/background.jpeg"
            alt="Hero background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm"></div>
        </div>

        <div className="relative z-10 text-center text-white">
          <BlurFade delay={0.2}>
            <div className="mb-8">
              <img
                src="/src/imgs/profile-fellyph.jpeg"
                alt="Profile"
                className="w-32 h-32 rounded-full mx-auto border-4 border-white/50 shadow-xl object-cover"
              />
            </div>
          </BlurFade>
          
          <BlurFade delay={0.4}>
            <h1 className="text-5xl font-bold mb-4">Fellyph Cintra</h1>
          </BlurFade>
          
          <BlurFade delay={0.6}>
            <p className="text-xl text-white/90 mb-8">Front-end Developer and Educator</p>
          </BlurFade>
          
          <BlurFade delay={0.8}>
            <ExpandableTabs 
              tabs={socialTabs}
              activeColor="text-white"
              className="mx-auto max-w-fit"
            />
          </BlurFade>
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex items-start justify-center p-2">
            <div className="w-1 h-3 bg-white/50 rounded-full"></div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="relative py-20 px-4">
        <FlickeringGrid
          className="absolute inset-0 z-0"
          squareSize={4}
          gridGap={6}
          color="#6B7280"
          maxOpacity={0.1}
          flickerChance={0.1}
        />
        <div className="relative z-10 max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-gray-900">About Me</h2>
          
          <div className="space-y-6 text-lg text-gray-700">
            <p>
              With over 8 years of experience in web development, I specialize in creating beautiful,
              functional, and user-friendly applications. My expertise spans across the full stack,
              from designing intuitive user interfaces to building robust backend systems.
            </p>
            
            <p>
              I'm passionate about using technology to solve real-world problems and create
              meaningful experiences. My approach combines technical excellence with creative
              problem-solving, ensuring that every project not only meets but exceeds expectations.
            </p>

            <div className="pt-6">
              <h3 className="text-xl font-semibold mb-4 text-gray-800">Core Skills</h3>
              <div className="flex flex-wrap gap-2">
                {['React', 'TypeScript', 'Node.js', 'Python', 'AWS', 'UI/UX Design', 'GraphQL', 'Docker'].map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8 text-gray-900">Get in Touch</h2>
          <p className="text-gray-600 mb-12">
            Have a project in mind? Let's discuss how we can work together.
          </p>
          
          <MovingBorderButton
            borderRadius="1.75rem"
            className="bg-white dark:bg-slate-900 text-black dark:text-white border-neutral-200 dark:border-slate-800 hover:bg-slate-100 transition-colors"
            onClick={() => setIsContactOpen(true)}
          >
            Contact Me
          </MovingBorderButton>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-gray-900 text-white/80">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <p>© {new Date().getFullYear()} Fellyph Cintra. All rights reserved.</p>
        </div>
      </footer>

      <ContactPopup isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
    </div>
  );
}

export default App;
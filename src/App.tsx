/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import Navbar from "./components/Navbar.tsx";
import Hero from "./components/Hero.tsx";
import About from "./components/About.tsx";
import Skills from "./components/Skills.tsx";
import Projects from "./components/Projects.tsx";
import Services from "./components/Services.tsx";
import Process from "./components/Process.tsx";
import Contact from "./components/Contact.tsx";
import Footer from "./components/Footer.tsx";
import BackgroundEffect from "./components/BackgroundEffect.tsx";
import CursorFollower from "./components/CursorFollower.tsx";
import { AppProvider } from "./AppContext.tsx";

export default function App() {
  return (
    <AppProvider>
      <div className="relative font-sans antialiased text-slate-900 dark:text-slate-200 transition-colors duration-500 overflow-x-hidden">
        <CursorFollower />
        <BackgroundEffect />
        <Navbar />
        
        <main>
          <Hero />
          <About />
          <Skills />
          <Projects />
          <Services />
          <Process />
          <Contact />
        </main>

        <Footer />
      </div>
    </AppProvider>
  );
}


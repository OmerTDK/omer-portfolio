import { Navbar } from "@/components/nav/Navbar";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <section id="hero" className="flex h-screen items-center justify-center">
          <h1 className="font-mono text-4xl text-[#60a5fa]">Hero</h1>
        </section>
        <section id="about" className="flex h-screen items-center justify-center">
          <h2 className="text-2xl text-[#f1f5f9]">About</h2>
        </section>
        <section id="skills" className="flex h-screen items-center justify-center">
          <h2 className="text-2xl text-[#f1f5f9]">Skills</h2>
        </section>
        <section id="projects" className="flex h-screen items-center justify-center">
          <h2 className="text-2xl text-[#f1f5f9]">Projects</h2>
        </section>
        <section id="experience" className="flex h-screen items-center justify-center">
          <h2 className="text-2xl text-[#f1f5f9]">Experience</h2>
        </section>
        <section id="contact" className="flex h-screen items-center justify-center">
          <h2 className="text-2xl text-[#f1f5f9]">Contact</h2>
        </section>
      </main>
    </>
  );
}

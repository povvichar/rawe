import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { sections } from "@/data/sections";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        {sections.map(({ id, Component }) => (
          <Component key={id} />
        ))}
      </main>
      <Footer />
    </>
  );
}

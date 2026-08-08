import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Features from "./components/Features";

export default function App() {
  return (
    <div className="min-h-screen bg-paper">
      <Navbar />
      <main>
        <Hero />
        <Features />
      </main>
    </div>
  );
}
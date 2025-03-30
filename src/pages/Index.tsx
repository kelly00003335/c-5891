
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import Testimonials from "@/components/Testimonials";
import DepositSection from "@/components/DepositSection";
import Download from "@/components/Download";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      <Features />
      <Testimonials />
      <div className="py-12 text-center">
        <h2 className="text-3xl font-bold text-white mb-4">Ready to get started?</h2>
        <p className="text-white/70 mb-6 max-w-2xl mx-auto">
          Make a deposit to your Vertex account and start trading instantly.
        </p>
        <Link to="/deposit">
          <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white">
            Deposit Now
          </Button>
        </Link>
      </div>
      <DepositSection />
      <Download />
      <Footer />
    </div>
  );
};

export default Index;


import { Button } from "@/components/ui/button";

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-4 bg-background/80 backdrop-blur-lg">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="text-2xl font-bold text-white">Vertex</div>
        <div className="hidden md:flex items-center space-x-8">
          <a href="#" className="text-white/80 hover:text-white transition-colors">Deposit</a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

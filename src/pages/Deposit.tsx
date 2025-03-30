
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import DepositForm from "@/components/DepositForm";

const Deposit = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="py-20 px-4 bg-background relative overflow-hidden">
        <div className="absolute inset-0 bg-accent/5 backdrop-blur-3xl"></div>
        <div className="max-w-7xl mx-auto relative z-10">
          <h2 className="text-4xl font-bold text-white text-center mb-4">
            Vertex Deposit
          </h2>
          <p className="text-xl text-white/60 text-center mb-12 max-w-2xl mx-auto">
            Securely deposit funds to your Vertex trading account
          </p>
          
          <DepositForm />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Deposit;

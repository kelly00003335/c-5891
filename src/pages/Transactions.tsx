
import Navbar from "@/components/Navbar";
import TransactionHistory from "@/components/TransactionHistory";
import Footer from "@/components/Footer";

const Transactions = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold text-white mb-8">Your Transactions</h1>
        <TransactionHistory />
      </div>
      <Footer />
    </div>
  );
};

export default Transactions;


import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import DepositStatus from './DepositStatus';
import TransactionHistory from './TransactionHistory';
import NavigationBar from './NavigationBar';
import PaymentInstructions from "./PaymentInstructions";

const DepositForm = () => {
  const [amount, setAmount] = useState('');
  const [selectedPayment, setSelectedPayment] = useState('mpesa');
  const [depositStatus, setDepositStatus] = useState('pending');
  const [showInstructions, setShowInstructions] = useState(false);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('+254 ');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount || parseFloat(amount) < 10) return;
    setDepositStatus('processing');
    setTimeout(() => {
      setDepositStatus(Math.random() > 0.2 ? 'completed' : 'failed');
    }, 5000);
  };

  const handleShowInstructions = () => {
    setShowInstructions(true);
  };

  return (
    <>
      <NavigationBar onShowInstructions={handleShowInstructions} />
      {showInstructions ? (
        <PaymentInstructions 
          paymentMethod={selectedPayment}
          amount={amount}
          referenceId="VTX123456"
          status={depositStatus}
          exchangeRate={145}
          onBack={() => setShowInstructions(false)}
        />
      ) : (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="p-6 glass-effect">
          <form onSubmit={handleSubmit}>
            <div className="space-y-6">
              <div>
                <Label htmlFor="phone" className="text-white">Phone Number</Label>
                <Input 
                  id="phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="bg-white/10 border-white/20 text-white"
                  required
                />
              </div>
              <div>
                <Label htmlFor="amount" className="text-white">Deposit Amount (USD)</Label>
                <Input 
                  id="amount"
                  type="number"
                  placeholder="Minimum $10"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="bg-white/10 border-white/20 text-white"
                  required
                  min="10"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-white">Payment Method</Label>
                <div className="space-y-2">
                  <div 
                    className={`p-3 rounded-lg flex items-center justify-between cursor-pointer ${selectedPayment === 'mpesa' ? 'bg-white/20' : 'bg-white/10'}`}
                    onClick={() => setSelectedPayment('mpesa')}
                  >
                    <div className="flex items-center">
                      <input 
                        type="radio" 
                        checked={selectedPayment === 'mpesa'} 
                        onChange={() => setSelectedPayment('mpesa')}
                        className="mr-2"
                      />
                      <span className="text-white">M-Pesa</span>
                    </div>
                    <span className="bg-green-600 text-xs px-2 py-1 rounded text-white">Recommended</span>
                  </div>

                  <div 
                    className={`p-3 rounded-lg flex items-center justify-between cursor-pointer ${selectedPayment === 'airtel' ? 'bg-white/20' : 'bg-white/10'}`}
                    onClick={() => setSelectedPayment('airtel')}
                  >
                    <div className="flex items-center">
                      <input 
                        type="radio" 
                        checked={selectedPayment === 'airtel'} 
                        onChange={() => setSelectedPayment('airtel')}
                        className="mr-2"
                      />
                      <span className="text-white">Airtel Money</span>
                    </div>
                  </div>

                  <div 
                    className={`p-3 rounded-lg flex items-center justify-between cursor-pointer ${selectedPayment === 'card' ? 'bg-white/20' : 'bg-white/10'}`}
                    onClick={() => setSelectedPayment('card')}
                  >
                    <div className="flex items-center">
                      <input 
                        type="radio" 
                        checked={selectedPayment === 'card'} 
                        onChange={() => setSelectedPayment('card')}
                        className="mr-2"
                      />
                      <span className="text-white">Credit Card/Visa</span>
                    </div>
                    <div className="flex space-x-1">
                      <img src="/visa.png" alt="Visa" className="h-6" />
                      <img src="/mastercard.png" alt="Mastercard" className="h-6" />
                    </div>
                  </div>
                </div>
              </div>

              <Button 
                type="submit" 
                className="w-full bg-yellow-600 hover:bg-yellow-700 text-white"
                disabled={!amount || parseFloat(amount) < 10}
              >
                Proceed to Payment
              </Button>
            </div>
          </form>
        </Card>
        <div className="space-y-8">
          <DepositStatus status={depositStatus} />
          <TransactionHistory />
        </div>
      </div>
      )}
    </>
  );
};

export default DepositForm;

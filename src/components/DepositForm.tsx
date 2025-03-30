
import { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";
import PaymentMethodSelector from './PaymentMethodSelector';
import PaymentInstructions from './PaymentInstructions';
import DepositStatus from "./DepositStatus";
import TransactionHistory from "./TransactionHistory";

const DepositForm = () => {
  const [amount, setAmount] = useState('');
  const [selectedPayment, setSelectedPayment] = useState('mpesa');
  const [showInstructions, setShowInstructions] = useState(false);
  const [depositStatus, setDepositStatus] = useState('pending');
  const [amountError, setAmountError] = useState(false);
  
  // User information state
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount || parseFloat(amount) < 10) {
      setAmountError(true);
      return;
    }
    setShowInstructions(true);
  };

  if (showInstructions) {
    return (
      <PaymentInstructions 
        paymentMethod={selectedPayment}
        amount={amount}
        referenceId="TX123456789"
        status={depositStatus}
        exchangeRate={145.50}
      />
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <Card className="p-6 glass-effect">
        <form onSubmit={handleSubmit}>
          <div className="space-y-6">
            <h3 className="text-2xl font-semibold text-white mb-6">Deposit Details</h3>
            
            {/* User Details */}
            <div className="space-y-4 mb-6">
              <div>
                <Label htmlFor="fullName" className="text-white">Full Name</Label>
                <Input 
                  id="fullName" 
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="bg-white/10 border-white/20 text-white"
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="email" className="text-white">Email</Label>
                <Input 
                  id="email" 
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-white/10 border-white/20 text-white"
                  required
                />
              </div>
              
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
            </div>
            
            {/* Amount */}
            <div className="mb-6">
              <Label htmlFor="amount" className="text-white">Deposit Amount (USD)</Label>
              <Input 
                id="amount" 
                type="number" 
                value={amount} 
                onChange={(e) => {
                  setAmount(e.target.value);
                  setAmountError(false);
                }}
                className="bg-white/10 border-white/20 text-white"
                placeholder="Minimum $10"
                required
              />
              {amountError && (
                <p className="text-red-400 text-sm mt-1 flex items-center">
                  <AlertCircle className="h-4 w-4 mr-1" />
                  Minimum deposit amount is $10
                </p>
              )}
            </div>

            {/* Payment Method Selection */}
            <div className="mb-6">
              <Label className="text-white mb-2 block">Select Payment Method</Label>
              <PaymentMethodSelector 
                selected={selectedPayment} 
                onSelect={setSelectedPayment} 
              />
            </div>

            <Button 
              type="submit"
              className="w-full bg-gradient-to-r from-yellow-400 to-yellow-600 hover:from-yellow-500 hover:to-yellow-700 text-black"
              disabled={!amount || amountError}
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
  );
};

export default DepositForm;


import React, { useState, useEffect } from 'react';
import { Card } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Button } from './ui/button';
import PaymentMethodSelector from './PaymentMethodSelector';
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
  const [phone, setPhone] = useState('');
  const [amountError, setAmountError] = useState(false);

  const handleShowInstructions = () => {
    setShowInstructions(true);
  };

  useEffect(() => {
    if (amount && parseFloat(amount) < 10) {
      setAmountError(true);
    } else {
      setAmountError(false);
    }
  }, [amount]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount || parseFloat(amount) < 10) {
      setAmountError(true);
      return;
    }
    setDepositStatus('processing');
    setTimeout(() => {
      setDepositStatus(Math.random() > 0.2 ? 'completed' : 'failed');
    }, 5000);
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
                <div className="space-y-4">
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
                  <div>
                    <Label htmlFor="amount" className="text-white">Amount (USD)</Label>
                    <Input 
                      id="amount"
                      type="number"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      className="bg-white/10 border-white/20 text-white"
                      required
                      min="10"
                    />
                    {amountError && (
                      <p className="text-red-500 text-sm mt-1">Minimum deposit amount is $10</p>
                    )}
                  </div>
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
      )}
    </>
  );
};

export default DepositForm;

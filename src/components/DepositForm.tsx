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
  const [amount, setAmount] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("mpesa");
  const [depositStatus, setDepositStatus] = useState("pending");
  const [showInstructions, setShowInstructions] = useState(false);
  const [referenceId, setReferenceId] = useState("");
  const [amountError, setAmountError] = useState(false);
  const exchangeRate = 153.5; // KES to USD exchange rate

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!amount || parseFloat(amount) < 10) {
      setAmountError(true);
      return;
    }

    setShowInstructions(true);
    setDepositStatus("processing");

    setTimeout(() => {
      if (Math.random() > 0.2) {
        setDepositStatus("completed");
      } else {
        setDepositStatus("failed");
      }
    }, 5000);
  };

  if (showInstructions) {
    return (
      <Card className="p-6 glass-effect">
        <PaymentInstructions 
          paymentMethod={paymentMethod}
          amount={amount}
          referenceId={referenceId}
          status={depositStatus}
          exchangeRate={exchangeRate}
        />
      </Card>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <Card className="p-6 glass-effect">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <Label htmlFor="amount" className="text-white mb-2 block">Deposit Amount (USD)</Label>
            <Input
              id="amount"
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Enter amount"
              className="bg-white/5 border-white/10 text-white placeholder:text-white/50"
            />
            {amountError && (
              <p className="text-red-400 text-sm mt-1 flex items-center">
                <AlertCircle className="h-4 w-4 mr-1" />
                Minimum deposit amount is $10
              </p>
            )}
            {amount && !amountError && (
              <p className="text-white/60 text-sm mt-1">
                ≈ KES {(parseFloat(amount) * exchangeRate).toFixed(2)}
              </p>
            )}
          </div>

          <PaymentMethodSelector 
            paymentMethod={paymentMethod} 
            setPaymentMethod={setPaymentMethod} 
          />

          <Button 
            type="submit"
            className="w-full bg-green-500 hover:bg-green-600 text-white"
            disabled={!amount || amountError}
          >
            Continue to Payment
          </Button>
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
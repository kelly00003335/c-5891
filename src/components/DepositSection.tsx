
import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Check, AlertCircle } from "lucide-react";
import DepositTracker from "./DepositTracker";
import TransactionHistory from "./TransactionHistory";
import PaymentInstructions from "./PaymentInstructions";

// Exchange rate - in a real app this would come from an API
const exchangeRate = 130; // 1 USD = 130 KES (example)

const DepositSection = () => {
  const [amount, setAmount] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("mpesa");
  const [depositStatus, setDepositStatus] = useState("pending");
  const [showInstructions, setShowInstructions] = useState(false);
  const [referenceId, setReferenceId] = useState("");
  const [amountError, setAmountError] = useState(false);

  // Validate amount
  useEffect(() => {
    if (amount && parseFloat(amount) < 10) {
      setAmountError(true);
    } else {
      setAmountError(false);
    }
  }, [amount]);

  // Generate a unique reference ID
  useEffect(() => {
    const uniqueId = `VTX${Date.now().toString().slice(-6)}${Math.floor(Math.random() * 1000)}`;
    setReferenceId(uniqueId);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!amount || parseFloat(amount) < 10) {
      setAmountError(true);
      return;
    }
    
    // Show payment instructions
    setShowInstructions(true);
    
    // In a real app, this would trigger the payment API
    // Simulate status changes for demo purposes
    setDepositStatus("processing");
    
    setTimeout(() => {
      // 80% chance of success for demo
      if (Math.random() > 0.2) {
        setDepositStatus("completed");
      } else {
        setDepositStatus("failed");
      }
    }, 5000);
  };

  return (
    <div className="py-20 px-4 bg-background relative overflow-hidden">
      <div className="absolute inset-0 bg-accent/5 backdrop-blur-3xl"></div>
      <div className="max-w-7xl mx-auto relative z-10">
        <h2 className="text-4xl font-bold text-white text-center mb-4">
          Vertex Deposit
        </h2>
        <p className="text-xl text-white/60 text-center mb-12 max-w-2xl mx-auto">
          Securely deposit funds to your Vertex trading account
        </p>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {!showInstructions ? (
            <Card className="p-6 glass-effect">
              <form onSubmit={handleSubmit}>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-2xl font-semibold text-white mb-6">Deposit Details</h3>
                    
                    {/* User Details */}
                    <div className="space-y-4 mb-6">
                      <div>
                        <Label htmlFor="fullName" className="text-white">Full Name</Label>
                        <Input 
                          id="fullName" 
                          value={mockUser.fullName} 
                          className="bg-white/10 border-white/20 text-white"
                          readOnly={mockUser.isLoggedIn}
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="email" className="text-white">Email</Label>
                        <Input 
                          id="email" 
                          type="email" 
                          value={mockUser.email} 
                          className="bg-white/10 border-white/20 text-white"
                          readOnly={mockUser.isLoggedIn}
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="phone" className="text-white">Phone Number</Label>
                        <Input 
                          id="phone" 
                          value={mockUser.phone} 
                          className="bg-white/10 border-white/20 text-white"
                          readOnly={mockUser.isLoggedIn}
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
                        onChange={(e) => setAmount(e.target.value)}
                        className="bg-white/10 border-white/20 text-white"
                        placeholder="Minimum $10"
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
                    
                    {/* Payment Method */}
                    <div className="mb-6">
                      <Label className="text-white mb-2 block">Payment Method</Label>
                      <RadioGroup 
                        value={paymentMethod} 
                        onValueChange={setPaymentMethod}
                        className="space-y-3"
                      >
                        <div className="flex items-center space-x-2 bg-white/5 p-3 rounded-lg hover:bg-white/10 transition-colors">
                          <RadioGroupItem value="mpesa" id="mpesa" className="text-white" />
                          <Label htmlFor="mpesa" className="text-white cursor-pointer flex-1">M-Pesa</Label>
                          <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/02/M-PESA_LOGO-01.svg/320px-M-PESA_LOGO-01.svg.png" alt="M-Pesa" className="h-8" />
                        </div>
                        
                        <div className="flex items-center space-x-2 bg-white/5 p-3 rounded-lg hover:bg-white/10 transition-colors">
                          <RadioGroupItem value="airtel" id="airtel" className="text-white" />
                          <Label htmlFor="airtel" className="text-white cursor-pointer flex-1">Airtel Money</Label>
                          <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/72/Airtel_Money.svg/320px-Airtel_Money.svg.png" alt="Airtel Money" className="h-8" />
                        </div>
                        
                        <div className="flex items-center space-x-2 bg-white/5 p-3 rounded-lg hover:bg-white/10 transition-colors">
                          <RadioGroupItem value="card" id="card" className="text-white" />
                          <Label htmlFor="card" className="text-white cursor-pointer flex-1">Credit Card/Visa</Label>
                          <div className="flex">
                            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/Visa.svg/200px-Visa.svg.png" alt="Visa" className="h-6 mr-1" />
                            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Mastercard-logo.svg/200px-Mastercard-logo.svg.png" alt="Mastercard" className="h-6" />
                          </div>
                        </div>
                      </RadioGroup>
                    </div>
                    
                    <Button 
                      type="submit" 
                      className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white"
                      disabled={!amount || amountError}
                    >
                      Proceed to Payment
                    </Button>
                  </div>
                </div>
              </form>
            </Card>
          ) : (
            <Card className="p-6 glass-effect">
              <PaymentInstructions 
                paymentMethod={paymentMethod} 
                amount={amount} 
                referenceId={referenceId} 
                status={depositStatus}
                exchangeRate={exchangeRate}
              />
            </Card>
          )}
          
          <div className="space-y-8">
            <DepositTracker status={depositStatus} />
            <TransactionHistory />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DepositSection;


import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Check, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import PaymentMethodSelector from "./PaymentMethodSelector";
import PaymentInstructions from "./PaymentInstructions";
import DepositStatus from "./DepositStatus";
import TransactionHistory from "./TransactionHistory";

// Exchange rate - in a real app this would come from an API
const exchangeRate = 130; // 1 USD = 130 KES (example)

const DepositForm = () => {
  const [userDetails, setUserDetails] = useState({
    fullName: mockUser.fullName,
    email: mockUser.email,
    phone: mockUser.phone
  });
  const [amount, setAmount] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("mpesa");
  const [depositStatus, setDepositStatus] = useState("pending");
  const [showInstructions, setShowInstructions] = useState(false);
  const [referenceId, setReferenceId] = useState("");
  const [amountError, setAmountError] = useState(false);
  const { toast } = useToast();

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

  const handleUserDetailsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setUserDetails(prev => ({
      ...prev,
      [id]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!amount || parseFloat(amount) < 10) {
      setAmountError(true);
      toast({
        variant: "destructive",
        title: "Invalid amount",
        description: "Minimum deposit amount is $10",
      });
      return;
    }
    
    // Show payment instructions
    setShowInstructions(true);
    
    // In a real app, this would trigger the payment API
    // Simulate status changes for demo purposes
    setDepositStatus("processing");
    
    toast({
      title: "Processing payment",
      description: "Your payment is being processed",
    });
    
    setTimeout(() => {
      // 80% chance of success for demo
      if (Math.random() > 0.2) {
        setDepositStatus("completed");
        toast({
          title: "Payment successful",
          description: "Your deposit has been completed",
          variant: "default",
        });
      } else {
        setDepositStatus("failed");
        toast({
          variant: "destructive",
          title: "Payment failed",
          description: "Please try again or use a different payment method",
        });
      }
    }, 5000);
  };

  return (
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
                      value={userDetails.fullName} 
                      onChange={handleUserDetailsChange}
                      className="bg-white/10 border-white/20 text-white"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="email" className="text-white">Email</Label>
                    <Input 
                      id="email" 
                      type="email" 
                      value={userDetails.email} 
                      onChange={handleUserDetailsChange}
                      className="bg-white/10 border-white/20 text-white"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="phone" className="text-white">Phone Number</Label>
                    <Input 
                      id="phone" 
                      value={userDetails.phone} 
                      onChange={handleUserDetailsChange}
                      className="bg-white/10 border-white/20 text-white"
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
                <PaymentMethodSelector 
                  paymentMethod={paymentMethod}
                  setPaymentMethod={setPaymentMethod}
                />
                
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
        <DepositStatus status={depositStatus} />
        <TransactionHistory />
      </div>
    </div>
  );
};

export default DepositForm;


import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface PaymentMethodSelectorProps {
  paymentMethod: string;
  setPaymentMethod: (method: string) => void;
}

const PaymentMethodSelector = ({ paymentMethod, setPaymentMethod }: PaymentMethodSelectorProps) => {
  return (
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
          <div className="bg-green-500/20 px-3 py-1 rounded text-xs text-green-300">Recommended</div>
          <img src="/images/mpesa-logo.png" alt="M-Pesa" className="h-8 w-8 object-contain" />
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
  );
};

export default PaymentMethodSelector;

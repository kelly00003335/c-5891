
import { Card } from "@/components/ui/card";
import { CheckCircle, Clock, XCircle } from "lucide-react";

const TransactionHistory = () => {
  // Mock transaction data - in a real app, this would come from an API
  const transactions = [
    {
      id: "VTX123456",
      date: "2024-07-12",
      amount: "$150.00",
      method: "M-Pesa",
      status: "completed"
    },
    {
      id: "VTX789012",
      date: "2024-07-05",
      amount: "$75.00",
      method: "Credit Card",
      status: "completed"
    },
    {
      id: "VTX345678",
      date: "2024-06-28",
      amount: "$200.00",
      method: "Airtel Money",
      status: "failed"
    },
    {
      id: "VTX901234",
      date: "2024-06-15",
      amount: "$50.00",
      method: "M-Pesa",
      status: "completed"
    }
  ];

  const getStatusIcon = (status: string) => {
    if (status === "completed") {
      return <CheckCircle className="h-4 w-4 text-green-500" />;
    } else if (status === "pending" || status === "processing") {
      return <Clock className="h-4 w-4 text-yellow-500" />;
    } else {
      return <XCircle className="h-4 w-4 text-red-500" />;
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <Card className="p-6 glass-effect">
      <h3 className="text-2xl font-semibold text-white mb-6">Transaction History</h3>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/10">
              <th className="text-left py-3 px-2 text-white/70 font-medium">ID</th>
              <th className="text-left py-3 px-2 text-white/70 font-medium">Date</th>
              <th className="text-left py-3 px-2 text-white/70 font-medium">Amount</th>
              <th className="text-left py-3 px-2 text-white/70 font-medium">Method</th>
              <th className="text-left py-3 px-2 text-white/70 font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction) => (
              <tr key={transaction.id} className="border-b border-white/5 hover:bg-white/5">
                <td className="py-3 px-2 text-white">{transaction.id}</td>
                <td className="py-3 px-2 text-white">{formatDate(transaction.date)}</td>
                <td className="py-3 px-2 text-white">{transaction.amount}</td>
                <td className="py-3 px-2 text-white">{transaction.method}</td>
                <td className="py-3 px-2">
                  <div className="flex items-center">
                    {getStatusIcon(transaction.status)}
                    <span className={`ml-2 ${
                      transaction.status === "completed" 
                        ? "text-green-500" 
                        : transaction.status === "failed" 
                        ? "text-red-500" 
                        : "text-yellow-500"
                    }`}>
                      {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
                    </span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {transactions.length === 0 && (
        <div className="text-center py-6 text-white/50">
          No transaction history available
        </div>
      )}
    </Card>
  );
};

export default TransactionHistory;

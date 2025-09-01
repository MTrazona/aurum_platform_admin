import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import TransactionDetailsPage from "@/components/sheets/transaction-details-page";
import type { TransactionsType } from "@/types/buy-request.types";
import useTransactionList from "@/hooks/transactions-list";
import { LoadingSpinner } from "@/components/ui/loading-spinner";

const TransactionDetailsRoute = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { all: transactions = [], isLoading } = useTransactionList();
  const [transaction, setTransaction] = useState<TransactionsType | null>(null);

  useEffect(() => {
    if (id && transactions.length > 0) {
      const foundTransaction = transactions.find(
        (t) => t.txnID === id || t.transactionCode === id
      );
      
      if (foundTransaction) {
        setTransaction(foundTransaction);
      } else {
        // If transaction not found, redirect back to transactions list
        navigate('/transactions', { replace: true });
      }
    }
  }, [id, transactions, navigate]);

  const handleBackToList = () => {
    navigate('/transactions');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#1E1E20] flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  if (!transaction) {
    return (
      <div className="min-h-screen bg-[#1E1E20] flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-400 text-lg">Transaction not found</p>
          <button
            onClick={handleBackToList}
            className="mt-4 px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600"
          >
            Back to Transactions
          </button>
        </div>
      </div>
    );
  }

  return (
    <TransactionDetailsPage
      transaction={transaction}
      onBack={handleBackToList}
      title="Transaction Details"
    />
  );
};

export default TransactionDetailsRoute;

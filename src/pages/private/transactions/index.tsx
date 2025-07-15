import CustomDataTable from "@/components/custom-data-table";
import useTransactionList from "@/hooks/transactions-list";
import { transactionColumnDefs } from "./column-def";

const TransactionsPage = () => {
  const { all, isLoading } = useTransactionList();
  console.log(all);
  return (
    <div className="p-4 space-y-4">
      <h1 className="text-xl font-semibold text-white">User Transactions</h1>
      <CustomDataTable
        columnDefs={transactionColumnDefs}
        rowData={all || []}
        loading={isLoading}
        paginationPageSize={10}
      />
    </div>
  );
};

export default TransactionsPage;

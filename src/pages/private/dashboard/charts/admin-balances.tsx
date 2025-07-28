import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { BadgeDollarSign, Coins, Zap } from "lucide-react";

const formatBigNumber = (num: string, precision = 4) => {
  return parseFloat(num).toLocaleString(undefined, {
    maximumFractionDigits: precision,
  });
};

type BlockchainBalances = {
  usdtBalance: string;
  qmgtBalance: string;
  ftmBalance: string;
  usdtTotalSupply: string;
  qmgtTotalSupply: string;
};

type Props = {
  data: BlockchainBalances;
};

export const AdminBlockchainBalances = ({ data }: Props) => {
  const balances = [
    {
      name: "USDT",
      icon: <BadgeDollarSign className="w-5 h-5 text-green-500" />,
      balance: data?.usdtBalance,
      total: data?.usdtTotalSupply,
      color: "text-green-500",
    },
    {
      name: "QMGT",
      icon: <Coins className="w-5 h-5 text-purple-500" />,
      balance: data?.qmgtBalance,
      total: data?.qmgtTotalSupply,
      color: "text-purple-500",
    },
    {
      name: "FTM",
      icon: <Zap className="w-5 h-5 text-blue-400" />,
      balance: data?.ftmBalance,
      total: null,
      color: "text-blue-400",
    },
  ];

  return (
    <Card className="rounded-xl stat-color w-full">
      <CardHeader>
        <CardTitle className="text-base font-semibold dark:text-white">
          ⚡ Admin Blockchain Balances
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {balances.map((token, index) => {
          const percent =
            token.total && parseFloat(token.total) > 0
              ? (
                  (parseFloat(token.balance) / parseFloat(token.total)) *
                  100
                ).toFixed(4)
              : null;

          return (
            <div
              key={index}
              className="flex items-center justify-between p-2 rounded-md hover:bg-white/5 transition"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-full bg-white/10">{token.icon}</div>
                <div className="text-sm">
                  <p className="font-semibold text-white">{token.name}</p>
                  <p className="text-muted-foreground">
                    Balance: {formatBigNumber(token.balance)}
                  </p>
                  {token.total && (
                    <p className="text-muted-foreground">
                      Supply: {formatBigNumber(token.total)} ({percent}%)
                    </p>
                  )}
                </div>
              </div>
              <div className={`text-right text-sm font-semibold ${token.color}`}>
                {formatBigNumber(token.balance, 6)}
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
};

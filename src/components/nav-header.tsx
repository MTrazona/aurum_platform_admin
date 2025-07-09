import { usePrices } from "@/hooks/use-prices";
import Marquee from "react-fast-marquee";

export default function NavHeader() {
  const { data, isLoading } = usePrices();

  if (isLoading || !data) return null;

  const {
    standardGoldValue,
    standardUsdtValue,
    buySellingPrice,
    convertSellingPrice,
    gaeSellingPrice,
    gaePHSellingPrice,
  } = data;

  return (
    <div className="h-full flex items-center bg-gradient-to-r from-yellow-600 to-yellow-800 text-black py-1 px-4 text-sm font-medium">
      <Marquee pauseOnHover gradient={false} speed={40} className="gap-10">
        <span className="mx-4 flex items-center gap-2"><img src="/qmgt.png" className="w-8" alt="" /> GOLD (LME): 1g = ${standardGoldValue.toFixed(2)}</span>
        <span className="mx-4 flex items-center gap-2"><img src="/aurum-platform.png" className="w-8" alt="" /> GOLD: 1g = 1 QMGT</span>
        <span className="mx-4 flex items-center gap-2"><img src="/php.png" className="w-8" alt="" /> 1 USDT = {standardUsdtValue.toFixed(2)}</span>
        <span className="mx-4 flex items-center gap-2"><img src="/qmgt.png" className="w-8" alt="" /> BUY/SELL: 1g = ${buySellingPrice.toFixed(2)}/g</span>
        <span className="mx-4 flex items-center gap-2"><img src="/thether.png" className="w-8" alt="" /> CONVERT: 1g = ${convertSellingPrice.toFixed(2)}/g</span>
        <span className="mx-4 flex items-center gap-2"><img src="/auusd.png" className="w-8" alt="" /> GAE = ${gaeSellingPrice.toFixed(2)}/g</span>
        <span className="mx-4 flex items-center gap-2"><img src="/usdc.png" className="w-8" alt="" /> GAE EXTRA = ${gaePHSellingPrice.toFixed(2)}/g</span>
      </Marquee>
    </div>
  );
}

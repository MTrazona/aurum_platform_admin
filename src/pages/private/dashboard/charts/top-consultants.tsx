import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { UserPlus, DollarSign, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

type Consultant = {
  name: string;
  avatarUrl: string;
  groupSales: number;
  referralInvites: number;
};

type Props = {
  consultants: Consultant[];
};

const ITEMS_PER_PAGE = 3;

export const TopConsultantsCard = ({ consultants }: Props) => {
  const [page, setPage] = useState(0);
  const totalPages = Math.ceil(consultants.length / ITEMS_PER_PAGE);

  const currentConsultants = consultants.slice(
    page * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE + ITEMS_PER_PAGE
  );

  const totalGroupSales = consultants.reduce((sum, c) => sum + c.groupSales, 0);
  const totalInvites = consultants.reduce((sum, c) => sum + c.referralInvites, 0);

  return (
    <Card className="stat-color rounded-xl overflow-hidden">
      <CardHeader>
        <div className="flex flex-col gap-1">
          <CardTitle className="text-base font-semibold">🏆 Top Consultants</CardTitle>
          <div className="flex flex-wrap gap-2 text-xs text-white/70">
            <span className="bg-white/10 px-2 py-1 rounded-full">
              👥 {consultants.length} {consultants.length === 1 ? "Consultant" : "Consultants"}
            </span>
            <span className="bg-white/10 px-2 py-1 rounded-full">
              💰 {totalGroupSales.toLocaleString()} Total Group Sales
            </span>
            <span className="bg-white/10 px-2 py-1 rounded-full">
              📨 {totalInvites.toLocaleString()} Total Invites
            </span>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {currentConsultants.map((consultant, index) => {
          const actualIndex = page * ITEMS_PER_PAGE + index;
          return (
            <div
              key={actualIndex}
              className={cn(
                "flex items-center justify-between gap-4 p-2 rounded-lg",
                actualIndex === 0 ? "bg-white/5 border border-white/10" : ""
              )}
            >
              {/* Left: Avatar and Name */}
              <div className="flex items-center gap-3">
                <img
                  src={consultant.avatarUrl || "/aurum-platform.png"}
                  alt={consultant.name}
                  className="h-10 w-10 rounded-full object-cover ring-2 ring-[#8b5cf6]"
                />
                <div>
                  <p className="font-semibold dark:text-white">{consultant.name}</p>
                  <p className="flex items-center text-sm text-muted-foreground gap-1">
                    <DollarSign className="w-4 h-4 text-green-400" />
                    {consultant.groupSales.toLocaleString()} Group Sales
                  </p>
                </div>
              </div>

              {/* Right: Rank + Invites */}
              <div className="text-right">
                <span
                  className={cn(
                    "text-xs font-semibold px-2 py-1 rounded-full",
                    actualIndex === 0
                      ? "bg-gradient-to-r from-yellow-400 to-yellow-600 text-black"
                      : "bg-gradient-to-r from-emerald-400 to-emerald-600 text-white"
                  )}
                >
                  {actualIndex === 0 ? "🥇 Top 1" : "Top Consultant"}
                </span>
                <p className="flex items-center justify-end text-sm text-muted-foreground gap-1 mt-1">
                  <UserPlus className="w-4 h-4 text-blue-400" />
                  {consultant.referralInvites.toLocaleString()} invites
                </p>
              </div>
            </div>
          );
        })}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-end items-center gap-2 pt-2">
            <button
              onClick={() => setPage((prev) => Math.max(prev - 1, 0))}
              disabled={page === 0}
              className="text-xs px-2 py-1 rounded bg-white/10 hover:bg-white/20 disabled:opacity-30 flex items-center gap-1"
            >
              <ChevronLeft className="w-4 h-4" /> Prev
            </button>
            <span className="text-xs text-muted-foreground">
              Page {page + 1} of {totalPages}
            </span>
            <button
              onClick={() => setPage((prev) => Math.min(prev + 1, totalPages - 1))}
              disabled={page === totalPages - 1}
              className="text-xs px-2 py-1 rounded bg-white/10 hover:bg-white/20 disabled:opacity-30 flex items-center gap-1"
            >
              Next <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

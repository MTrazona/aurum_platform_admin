/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { useCharities } from "@/hooks/use-charities";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Eye,
  Search,
  Filter,
  X,
  Mail,
  MapPin,
  Building2,
  User,
} from "lucide-react";
import { RedemptionBusiness } from "@/types/redemption.type";

interface RedemptionResponse {
  status: string;
  data: RedemptionBusiness[];
}

interface RedemptionCardGridProps {
  business: RedemptionResponse | RedemptionBusiness[]; // allow both shapes
  isLoading: boolean;
}

export default function RedemptionCardGrid({
  business,
  isLoading,
}: RedemptionCardGridProps) {
  const { applyFilters, clearFilters } = useCharities();
  const [filters, setFilters] = useState<Record<string, string | undefined>>({});
  const [viewingCharity, setViewingCharity] = useState<RedemptionBusiness | null>(
    null
  );

  const handleFilterChange = (key: string, value: string) => {
    const newFilters = { ...filters, [key]: value || undefined };
    setFilters(newFilters);
    applyFilters(newFilters);
  };

  const handleClearFilters = () => {
    setFilters({});
    clearFilters();
  };

  // Normalize business data (support both wrapped & raw array)
  const businessData = Array.isArray(business)
    ? business
    : business?.data ?? [];

  if (isLoading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-center h-32">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#f89004]"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      {/* Filters */}
      <Card className="stat-color border-primary">
        <CardHeader>
          <CardTitle className="flex text-white items-center gap-2">
            <Filter className="w-5 h-5" />
            Filters
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search businesses..."
                value={filters.search || ""}
                onChange={(e) => handleFilterChange("search", e.target.value)}
                className="pl-10 text-black"
              />
            </div>

            <Input
              placeholder="Address..."
              value={filters.businessAddress || ""}
              onChange={(e) =>
                handleFilterChange("businessAddress", e.target.value)
              }
            />
          </div>

          <div className="flex justify-end">
            <Button
              variant="outline"
              onClick={handleClearFilters}
              className="flex items-center text-black gap-2"
            >
              <X className="w-4 h-4" />
              Clear Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Business Grid */}
      <Card className="bg-[#1E1E20] border-primary">
        <CardHeader className="text-white">
          <CardTitle>Businesses ({businessData.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {businessData.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              <Building2 className="w-16 h-16 mx-auto mb-4 text-gray-300" />
              <p className="text-lg font-medium">No businesses found</p>
              <p className="text-sm">Try adjusting your search filters</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {businessData.map((biz) => (
                <Card
                  key={biz.id}
                  className="group pt-0 hover:shadow-xl transition-all duration-300 hover:scale-[1.02] overflow-hidden bg-primary border-0 text-white/80 border-b-2 border-amber-500"
                >
                  {/* Image / Logo */}
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={biz.businessImage} // placeholder
                      alt={biz.legalBusinessName}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                    <div className="absolute bottom-4 left-4 right-4">
                      <h3 className="font-bold text-xl text-white drop-shadow-lg">
                        {biz.legalBusinessName}
                      </h3>
                      <p className="text-slate-200 text-sm mt-1 line-clamp-2">
                        {biz.businessInformation}
                      </p>
                    </div>
                  </div>

                  <CardContent className="p-6 space-y-4">
                    {/* Contact Person */}
                    <div className="flex items-center gap-2 mb-2">
                      <span>
                        <User className="w-4 h-4 text-slate-400" />
                      </span>
                      <span className="text-sm font-medium text-slate-300">
                        Contact Person: {biz.customer?.firstName}{" "}
                        {biz.customer?.lastName}
                      </span>
                    </div>

                    {/* Contact Info */}
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm">
                        <span>
                          <Mail className="w-4 h-4 text-green-400" />
                        </span>
                        <span className="text-slate-300 truncate">
                          {biz.businessEmail}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <span>
                          <MapPin className="w-4 h-4 text-red-400" />
                        </span>
                        <span className="text-slate-300">
                          {biz.businessAddress}
                        </span>
                      </div>
                    </div>

                    {/* Action */}
                    {/* <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setViewingCharity(biz)}
                      className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white border-0 font-semibold py-2.5 transition-all duration-200 hover:shadow-lg"
                    >
                      <Eye className="w-4 h-4 mr-2" />
                      View Details
                    </Button> */}
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </>
  );
}

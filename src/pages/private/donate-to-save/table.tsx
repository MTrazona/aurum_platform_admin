import { useState } from "react";
import { useCharities } from "@/hooks/use-charities";
import type { Charity, CharityFilters } from "@/types/charity.types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
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
  Heart,
  DollarSign
} from "lucide-react";
import ViewCharityDialog from "./view-charity-dialog";

interface CharitiesCardGridProps {
  charities: Charity[];
  isLoading: boolean;
}

export default function CharitiesCardGrid({ charities, isLoading }: CharitiesCardGridProps) {
  const { applyFilters, clearFilters } = useCharities();
  const [filters, setFilters] = useState<CharityFilters>({});
  const [viewingCharity, setViewingCharity] = useState<Charity | null>(null);

  const handleFilterChange = (key: keyof CharityFilters, value: string) => {
    const newFilters = { ...filters, [key]: value || undefined };
    setFilters(newFilters);
    applyFilters(newFilters);
  };

  const handleClearFilters = () => {
    setFilters({});
    clearFilters();
  };

  const getStatusBadgeVariant = (isActive: boolean) => {
    return isActive ? "default" : "secondary";
  };

  const getTotalDonations = (donateReceiver: any[]) => {
    return donateReceiver.length;
  };

  const getTotalAmount = (donateReceiver: any[]) => {
    return donateReceiver.reduce((total, donation) => {
      return total + parseFloat(donation.amount || 0);
    }, 0);
  };

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
                placeholder="Search charities..."
                value={filters.search || ""}
                onChange={(e) => handleFilterChange("search", e.target.value)}
                className="pl-10"
              />
            </div>

            <Input
              placeholder="Country..."
              value={filters.country || ""}
              onChange={(e) => handleFilterChange("country", e.target.value)}
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

      {/* Charities Grid */}
      <Card className="bg-[#1E1E20] border-primary">
        <CardHeader className="text-white">
          <CardTitle>Charities ({charities.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {charities.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              <Building2 className="w-16 h-16 mx-auto mb-4 text-gray-300" />
              <p className="text-lg font-medium">No charities found</p>
              <p className="text-sm">Try adjusting your search filters</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {charities.map((charity) => {
                const totalDonations = getTotalDonations(charity.donateReceiver);
                const totalAmount = getTotalAmount(charity.donateReceiver);
                
                return(
                <Card key={charity.id} className="group pt-0  hover:shadow-xl transition-all duration-300 hover:scale-[1.02] overflow-hidden  bg-primary border-0  shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] text-white/80 border-b-2 border-amber-500">
                  {/* Image Header */}
                  <div className="relative h-48 overflow-hidden">
                   
                      <img
                        src={charity.charity.imageUrl ?? '/groupLogo.png'}
                        alt={charity.charity.charityName}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    
                    
                    {/* Overlay with Status Badge */}
                    <div className="absolute top-4 right-4">
                      <Badge 
                        variant={getStatusBadgeVariant(charity.charity.is_active)} 
                        className={`px-3 py-1 text-xs font-semibold ${
                          charity.charity.is_active 
                            ? 'bg-green-500/90 text-white border-green-400' 
                            : 'bg-red-500/90 text-white border-red-400'
                        }`}
                      >
                        {charity.charity.is_active ? "Active" : "Inactive"}
                      </Badge>
                    </div>

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                    
                    {/* Charity Name Overlay */}
                    <div className="absolute bottom-4 left-4 right-4">
                      <h3 className="font-bold text-xl text-white drop-shadow-lg">
                        {charity.charity.charityName}
                      </h3>
                      <p className="text-slate-200 text-sm mt-1 line-clamp-2">
                        {charity.charity.description}
                      </p>
                    </div>
                  </div>

                  <CardContent className="p-6 space-y-4">
                    {/* Donation Statistics */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-3 bg-green-500/10 rounded-lg border border-green-500/20">
                        <div className="flex items-center justify-center gap-2 mb-1">
                          <Heart className="w-4 h-4 text-green-400" />
                          <span className="text-xs font-medium text-green-300">Donations</span>
                        </div>
                        <div className="text-lg font-bold text-green-400">{totalDonations}</div>
                      </div>
                      <div className="text-center p-3 bg-blue-500/10 rounded-lg border border-blue-500/20">
                        <div className="flex items-center justify-center gap-2 mb-1">
                          <DollarSign className="w-4 h-4 text-blue-400" />
                          <span className="text-xs font-medium text-blue-300">Amount</span>
                        </div>
                        <div className="text-lg font-bold text-blue-400">${totalAmount.toFixed(2)}</div>
                      </div>
                    </div>

                    {/* Contact Person */}
                    <div className="p-3 bg-slate-700/50 rounded-lg border border-slate-600/30">
                      <div className="flex items-center gap-2 mb-2">
                        <User className="w-4 h-4 text-slate-400" />
                        <span className="text-sm font-medium text-slate-300">Contact Person</span>
                      </div>
                      <div className="text-sm">
                        <div className="font-medium text-white">
                          {charity.firstName} {charity.middleName} {charity.lastName}
                        </div>
                        <div className="text-slate-400">@{charity.username}</div>
                      </div>
                    </div>

                    {/* Contact Information */}
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm">
                        <Mail className="w-4 h-4 text-green-400" />
                        <span className="text-slate-300 truncate">{charity.email}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <MapPin className="w-4 h-4 text-red-400" />
                        <span className="text-slate-300">{charity.country}</span>
                      </div>
                    </div>

                    {/* Action Button */}
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setViewingCharity(charity)}
                      className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white border-0 font-semibold py-2.5 transition-all duration-200 hover:shadow-lg"
                    >
                      <Eye className="w-4 h-4 mr-2" />
                      View Details
                    </Button>
                  </CardContent>
                </Card>
              )})}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Dialogs */}
      <ViewCharityDialog
        charity={viewingCharity}
        open={!!viewingCharity}
        onClose={() => setViewingCharity(null)}
      />
    </>
  );
}

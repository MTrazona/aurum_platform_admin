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
  Phone,
  MapPin,
  Building2,
  User
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

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case "Active":
        return "default";
      case "Inactive":
        return "secondary";
      case "Pending":
        return "outline";
      case "Suspended":
        return "destructive";
      default:
        return "secondary";
    }
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
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
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
              className="flex items-center gap-2"
            >
              <X className="w-4 h-4" />
              Clear Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Charities Grid */}
      <Card>
        <CardHeader>
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
              {charities.map((charity) => (
                <Card key={charity.id} className="hover:shadow-lg transition-shadow duration-200">
                  <CardContent className="p-6">
                    {/* Header with Image and Basic Info */}
                    <div className="flex items-start gap-4 mb-4">
                      {charity.imageUrl ? (
                        <img
                          src={charity.imageUrl}
                          alt={charity.charityName}
                          className="w-16 h-16 rounded-lg object-cover"
                        />
                      ) : (
                        <div className="w-16 h-16 rounded-lg bg-gray-200 flex items-center justify-center">
                          <Building2 className="w-8 h-8 text-gray-500" />
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-lg truncate">{charity.charityName}</h3>
                        <Badge variant={getStatusBadgeVariant(charity.status)} className="mt-1">
                          {charity.status}
                        </Badge>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                      {charity.description}
                    </p>

                    {/* Contact Person */}
                    <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <User className="w-4 h-4 text-gray-500" />
                        <span className="text-sm font-medium text-gray-700">Contact Person</span>
                      </div>
                      <div className="text-sm">
                        <div className="font-medium">
                          {charity.firstName} {charity.middleName} {charity.lastName}
                        </div>
                        <div className="text-gray-500">@{charity.username}</div>
                      </div>
                    </div>

                    {/* Contact Information */}
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center gap-2 text-sm">
                        <Mail className="w-4 h-4 text-green-500" />
                        <span className="text-gray-600 truncate">{charity.email}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Phone className="w-4 h-4 text-blue-500" />
                        <span className="text-gray-600">{charity.phoneNumber}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <MapPin className="w-4 h-4 text-red-500" />
                        <span className="text-gray-600">{charity.country}</span>
                      </div>
                    </div>

                    {/* Action Button */}
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setViewingCharity(charity)}
                      className="w-full"
                    >
                      <Eye className="w-4 h-4 mr-2" />
                      View Details
                    </Button>
                  </CardContent>
                </Card>
              ))}
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

import { useState } from "react";
import { useCharities } from "@/hooks/use-charities";
import type { Charity, CharityFilters } from "@/types/charity.types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Edit, 
  Trash2, 
  Eye, 
  Search, 
  Filter, 
  X,
  Globe,
  Mail,
  Phone,
  MapPin,
  Building2
} from "lucide-react";
import EditCharityDialog from "./edit-charity-dialog";
import DeleteCharityDialog from "./delete-charity-dialog";
import ViewCharityDialog from "./view-charity-dialog";

interface CharitiesDataTableProps {
  charities: Charity[];
  isLoading: boolean;
}

export default function CharitiesDataTable({ charities, isLoading }: CharitiesDataTableProps) {
  const { applyFilters, clearFilters } = useCharities();
  const [filters, setFilters] = useState<CharityFilters>({});
  const [editingCharity, setEditingCharity] = useState<Charity | null>(null);
  const [deletingCharity, setDeletingCharity] = useState<Charity | null>(null);
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

  const getCategoryBadgeVariant = (category: string) => {
    switch (category) {
      case "Education":
        return "default";
      case "Healthcare":
        return "destructive";
      case "Environment":
        return "outline";
      case "Poverty Relief":
        return "secondary";
      case "Animal Welfare":
        return "default";
      case "Disaster Relief":
        return "destructive";
      case "Arts & Culture":
        return "outline";
      case "Human Rights":
        return "secondary";
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
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search charities..."
                value={filters.search || ""}
                onChange={(e) => handleFilterChange("search", e.target.value)}
                className="pl-10"
              />
            </div>
            
            <Select
              value={filters.category || ""}
              onValueChange={(value) => handleFilterChange("category", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Categories</SelectItem>
                <SelectItem value="Education">Education</SelectItem>
                <SelectItem value="Healthcare">Healthcare</SelectItem>
                <SelectItem value="Environment">Environment</SelectItem>
                <SelectItem value="Poverty Relief">Poverty Relief</SelectItem>
                <SelectItem value="Animal Welfare">Animal Welfare</SelectItem>
                <SelectItem value="Disaster Relief">Disaster Relief</SelectItem>
                <SelectItem value="Arts & Culture">Arts & Culture</SelectItem>
                <SelectItem value="Human Rights">Human Rights</SelectItem>
                <SelectItem value="Other">Other</SelectItem>
              </SelectContent>
            </Select>

            <Select
              value={filters.status || ""}
              onValueChange={(value) => handleFilterChange("status", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="All Statuses" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Statuses</SelectItem>
                <SelectItem value="Active">Active</SelectItem>
                <SelectItem value="Inactive">Inactive</SelectItem>
                <SelectItem value="Pending">Pending</SelectItem>
                <SelectItem value="Suspended">Suspended</SelectItem>
              </SelectContent>
            </Select>

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

      {/* Data Table */}
      <Card>
        <CardHeader>
          <CardTitle>Charities ({charities.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Country</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {charities.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8 text-gray-500">
                      No charities found
                    </TableCell>
                  </TableRow>
                ) : (
                  charities.map((charity) => (
                    <TableRow key={charity.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          {charity.imageUrl ? (
                            <img
                              src={charity.imageUrl}
                              alt={charity.name}
                              className="w-10 h-10 rounded-full object-cover"
                            />
                          ) : (
                            <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                              <Building2 className="w-5 h-5 text-gray-500" />
                            </div>
                          )}
                          <div>
                            <div className="font-medium">{charity.name}</div>
                            <div className="text-sm text-gray-500 line-clamp-2">
                              {charity.description}
                            </div>
                          </div>
                        </div>
                      </TableCell>
                      
                      <TableCell>
                        <Badge variant={getCategoryBadgeVariant(charity.category)}>
                          {charity.category}
                        </Badge>
                      </TableCell>
                      
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <MapPin className="w-4 h-4 text-gray-400" />
                          {charity.country}
                        </div>
                      </TableCell>
                      
                      <TableCell>
                        <Badge variant={getStatusBadgeVariant(charity.status)}>
                          {charity.status}
                        </Badge>
                      </TableCell>
                      
                      <TableCell>
                        <div className="space-y-1">
                          {charity.website && (
                            <div className="flex items-center gap-1 text-sm">
                              <Globe className="w-3 h-3 text-blue-500" />
                              <a 
                                href={charity.website} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="text-blue-600 hover:underline"
                              >
                                Website
                              </a>
                            </div>
                          )}
                          {charity.email && (
                            <div className="flex items-center gap-1 text-sm">
                              <Mail className="w-3 h-3 text-green-500" />
                              {charity.email}
                            </div>
                          )}
                          {charity.phone && (
                            <div className="flex items-center gap-1 text-sm">
                              <Phone className="w-3 h-3 text-purple-500" />
                              {charity.phone}
                            </div>
                          )}
                        </div>
                      </TableCell>
                      
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setViewingCharity(charity)}
                          >
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setEditingCharity(charity)}
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setDeletingCharity(charity)}
                            className="text-red-600 hover:text-red-700"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Dialogs */}
      <EditCharityDialog
        charity={editingCharity}
        open={!!editingCharity}
        onClose={() => setEditingCharity(null)}
      />

      <DeleteCharityDialog
        charity={deletingCharity}
        open={!!deletingCharity}
        onClose={() => setDeletingCharity(null)}
      />

      <ViewCharityDialog
        charity={viewingCharity}
        open={!!viewingCharity}
        onClose={() => setViewingCharity(null)}
      />
    </>
  );
}

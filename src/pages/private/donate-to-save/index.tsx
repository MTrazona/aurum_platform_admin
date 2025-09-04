import StatCard from "@/components/stat-card";
import { useCharities } from "@/hooks/use-charities";
import Breadcrumb from "@/components/routes-bread-crumb";
import { 
  Building2, 
  Heart, 
  Clock3, 
  Ban, 
  CheckCircle 
} from "lucide-react";
import CharitiesCardGrid from "./table";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import CreateCharityDialog from "./create-charity-dialog";

export default function DonateToSavePage() {
  const {
    charities,
    isLoading,
    error,
    getStats,
  } = useCharities();

  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

  const stats = getStats();

  return (
    <div className="p-4 space-y-6">
      <div className="flex justify-between items-center">
        <Breadcrumb />
        <Button
          onClick={() => setIsCreateDialogOpen(true)}
          className="bg-[#f89004] hover:bg-[#f89004]/90"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Charity
        </Button>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <StatCard
          title="Total Charities"
          value={stats.total}
          description="All registered charities"
          icon={Building2}
          color="blue"
        />
        <StatCard
          title="Active Charities"
          value={stats.active}
          description="Currently accepting donations"
          icon={CheckCircle}
          color="green"
        />
        <StatCard
          title="Pending Review"
          value={stats.pending}
          description="Awaiting approval"
          icon={Clock3}
          color="orange"
        />
        <StatCard
          title="Inactive"
          value={stats.inactive}
          description="Temporarily disabled"
          icon={Ban}
          color="gray"
        />
        <StatCard
          title="Suspended"
          value={stats.suspended}
          description="Administratively suspended"
          icon={Heart}
          color="red"
        />
      </div>

      {/* Error Display */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-md p-4">
          <p className="text-red-800 text-sm">{error}</p>
        </div>
      )}

      {/* Charities Card Grid */}
      <CharitiesCardGrid
        charities={charities}
        isLoading={isLoading}
      />

      {/* Create Charity Dialog */}
      <CreateCharityDialog
        open={isCreateDialogOpen}
        onClose={() => setIsCreateDialogOpen(false)}
      />
    </div>
  );
}

import Breadcrumb from "@/components/routes-bread-crumb"
import StatCard from "@/components/stat-card"
import { Button } from "@/components/ui/button"
import { Ban, Building2, CheckCircle, Heart, Package, Plus } from "lucide-react"
import RedemptionCardGrid from "./component/table"
import { RedemptionBusiness } from "@/types/redemption.type"
import { redemptionApi } from "@/apis/redemptionAPI"
import { useEffect, useState } from "react"
import CreateRedemptionBusinessDialog from "./component/CreateRedemptionBusinessDialog"

const index = () => {
    const [businesses, setBusinesses] = useState<RedemptionBusiness[]>([]);
    const [loading, setLoading] = useState(true);
    const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

    useEffect(() => {
        const fetchBusinesses = async () => {
        try {
            const data = await redemptionApi.getAll();
            setBusinesses(data);
        } catch (error) {
            console.error("Failed to fetch businesses:", error);
        } finally {
            setLoading(false);
        }
        };

        fetchBusinesses();
    }, []);

    const handleBusinessCreated = (newBusiness: RedemptionBusiness) => {
        // setBusinesses((prev) => [newBusiness, ...prev]);
        setIsCreateDialogOpen(false); // close modal after creation
    };
  return (
        <div className="p-4 space-y-6">
            <div className="flex justify-between items-center">
                <Breadcrumb />
                <Button
                    onClick={() => setIsCreateDialogOpen(true)}
                    className="bg-[#f89004] hover:bg-[#f89004]/90"
                >
                    <Plus className="w-4 h-4 mr-2" />
                    Add Merchant
                </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                <StatCard
                    title="Total Merchant"
                    value={0}
                    description="All registered merchant"
                    icon={Building2}
                    color="blue"
                />
                <StatCard
                    title="Active Merchant"
                    value={0}
                    description="Merchant with active products"
                    icon={CheckCircle}
                    color="green"
                />
                <StatCard
                    title="Active Products"
                    value={0}
                    description="Products with stocks"
                    icon={Package}
                    color="orange"
                />
                <StatCard
                    title="Inactive"
                    value={0}
                    description="Temporarily disabled"
                    icon={Ban}
                    color="gray"
                />
                <StatCard
                    title="Suspended"
                    value={0}
                    description="Administratively suspended"
                    icon={Heart}
                    color="red"
                />
            </div>
            <RedemptionCardGrid
                business={businesses }
                isLoading={loading}
            />
            <CreateRedemptionBusinessDialog
                open={isCreateDialogOpen}
                onOpenChange={setIsCreateDialogOpen}
                onCreated={handleBusinessCreated} // pass success callback
            />
        </div>
    )
}

export default index
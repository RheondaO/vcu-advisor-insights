import { useState, useMemo } from "react";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { KPICard } from "@/components/dashboard/KPICard";
import { FilterPanel } from "@/components/dashboard/FilterPanel";
import { ResidencyChart } from "@/components/dashboard/ResidencyChart";
import { VisualizationTabs } from "@/components/dashboard/VisualizationTabs";
import { StudentTable } from "@/components/dashboard/StudentTable";
import { 
  mockStudents, 
  enrollmentData, 
  getStatistics, 
  filterStudents, 
  exportToCSV,
  FilterOptions 
} from "@/data/mockStudents";
import { CheckCircle, TrendingDown, DollarSign, AlertTriangle, CreditCard, Users } from "lucide-react";

const Index = () => {
  const [lastRefreshed, setLastRefreshed] = useState(new Date());
  const [filters, setFilters] = useState<FilterOptions>({
    semester: 'all',
    residency: 'all',
    studentLevel: 'all',
  });
  const [showContact, setShowContact] = useState(false);
  const [showAcademic, setShowAcademic] = useState(false);

  // Filter students based on current filters
  const filteredStudents = useMemo(() => {
    return filterStudents(mockStudents, filters);
  }, [filters]);

  // Calculate statistics based on filtered data
  const stats = useMemo(() => {
    return getStatistics(filteredStudents);
  }, [filteredStudents]);

  const handleRefresh = () => {
    setLastRefreshed(new Date());
  };

  const handleExport = () => {
    exportToCSV(filteredStudents, showContact, showAcademic);
  };

  const formatCurrency = (value: number) => {
    if (value >= 1000000) {
      return `$${(value / 1000000).toFixed(1)}M`;
    }
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <div className="min-h-screen gradient-bg p-6 lg:p-8">
      <div className="max-w-[1800px] mx-auto">
        <DashboardHeader 
          lastRefreshed={lastRefreshed}
          onRefresh={handleRefresh}
          onExport={handleExport}
        />

        {/* Main Grid Layout */}
        <div className="grid grid-cols-12 gap-6">
          {/* Left Content Area - 9 columns */}
          <div className="col-span-12 lg:col-span-9 space-y-6">
            {/* KPI Cards Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <KPICard
                title="Good Standing"
                value={`${stats.goodStandingPercent}%`}
                subtitle="Academic status"
                icon={CheckCircle}
                variant="success"
              />
              <KPICard
                title="Average Gap"
                value={formatCurrency(stats.averageGap)}
                subtitle="Per student"
                icon={TrendingDown}
                variant="danger"
              />
              <KPICard
                title="Total Unmet Need"
                value={formatCurrency(stats.totalUnmetNeed)}
                subtitle="(Gap > $5k)"
                icon={DollarSign}
                variant="warning"
              />
              <KPICard
                title="High Risk Students"
                value={stats.highRiskCount.toString()}
                subtitle="Immediate attention"
                icon={AlertTriangle}
                variant="danger"
              />
            </div>

            {/* Secondary Metrics Row */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              <ResidencyChart data={stats.avgGapByResidency} />
              
              <div className="glass-card p-6 flex flex-col justify-center items-center">
                <CreditCard className="h-8 w-8 text-primary mb-3" />
                <p className="text-sm text-muted-foreground uppercase tracking-wide">Installment Plans</p>
                <p className="text-4xl font-bold text-foreground mt-2">{stats.installmentPlanCount}</p>
                <p className="text-sm text-muted-foreground mt-1">Active plans</p>
              </div>
              
              <div className="glass-card p-6 flex flex-col justify-center items-center">
                <Users className="h-8 w-8 text-primary mb-3" />
                <p className="text-sm text-muted-foreground uppercase tracking-wide">Adoption Rate</p>
                <p className="text-4xl font-bold text-foreground mt-2">{stats.adoptionRate}%</p>
                <p className="text-sm text-muted-foreground mt-1">Payment plan uptake</p>
              </div>
            </div>

            {/* Visualization Tabs */}
            <VisualizationTabs 
              enrollmentData={enrollmentData}
              students={filteredStudents}
              stats={stats}
            />

            {/* Student Table */}
            <StudentTable 
              students={filteredStudents}
              showContact={showContact}
              showAcademic={showAcademic}
            />
          </div>

          {/* Right Sidebar - Filter Panel - 3 columns */}
          <div className="col-span-12 lg:col-span-3">
            <div className="sticky top-6">
              <FilterPanel
                filters={filters}
                onFiltersChange={setFilters}
                showContact={showContact}
                onShowContactChange={setShowContact}
                showAcademic={showAcademic}
                onShowAcademicChange={setShowAcademic}
              />
              
              {/* Quick Stats */}
              <div className="glass-card p-6 mt-6">
                <h3 className="text-sm font-semibold text-primary uppercase tracking-wide mb-4">
                  Quick Stats
                </h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Total Students</span>
                    <span className="font-medium">{filteredStudents.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">In-State</span>
                    <span className="font-medium">
                      {filteredStudents.filter(s => s.residency === 'In-State').length}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Out-of-State</span>
                    <span className="font-medium">
                      {filteredStudents.filter(s => s.residency === 'Out-of-State').length}
                    </span>
                  </div>
                  <div className="border-t border-white/10 pt-3 flex justify-between">
                    <span className="text-muted-foreground">Avg Credit Hours</span>
                    <span className="font-medium">
                      {filteredStudents.length > 0 
                        ? (filteredStudents.reduce((sum, s) => sum + s.credit_hours, 0) / filteredStudents.length).toFixed(1)
                        : '0'
                      }
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;

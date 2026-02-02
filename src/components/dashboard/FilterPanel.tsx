import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { FilterOptions } from "@/data/mockStudents";
import { Filter } from "lucide-react";

interface FilterPanelProps {
  filters: FilterOptions;
  onFiltersChange: (filters: FilterOptions) => void;
  showContact: boolean;
  onShowContactChange: (show: boolean) => void;
  showAcademic: boolean;
  onShowAcademicChange: (show: boolean) => void;
}

export function FilterPanel({
  filters,
  onFiltersChange,
  showContact,
  onShowContactChange,
  showAcademic,
  onShowAcademicChange,
}: FilterPanelProps) {
  return (
    <div className="glass-card p-6 space-y-6">
      <div className="flex items-center gap-2 text-primary">
        <Filter className="h-5 w-5" />
        <h3 className="font-semibold text-lg">Filters</h3>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label className="text-sm text-muted-foreground">Semester</Label>
          <Select
            value={filters.semester}
            onValueChange={(value) => onFiltersChange({ ...filters, semester: value })}
          >
            <SelectTrigger className="w-full bg-secondary/50 border-white/10">
              <SelectValue placeholder="Select semester" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Semesters</SelectItem>
              <SelectItem value="Fall 2024">Fall 2024</SelectItem>
              <SelectItem value="Spring 2025">Spring 2025</SelectItem>
              <SelectItem value="Summer 2025">Summer 2025</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label className="text-sm text-muted-foreground">Residency</Label>
          <Select
            value={filters.residency}
            onValueChange={(value) => onFiltersChange({ ...filters, residency: value })}
          >
            <SelectTrigger className="w-full bg-secondary/50 border-white/10">
              <SelectValue placeholder="Select residency" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Residencies</SelectItem>
              <SelectItem value="In-State">In-State</SelectItem>
              <SelectItem value="Out-of-State">Out-of-State</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label className="text-sm text-muted-foreground">Student Level</Label>
          <Select
            value={filters.studentLevel}
            onValueChange={(value) => onFiltersChange({ ...filters, studentLevel: value })}
          >
            <SelectTrigger className="w-full bg-secondary/50 border-white/10">
              <SelectValue placeholder="Select level" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Levels</SelectItem>
              <SelectItem value="Freshman">Freshman</SelectItem>
              <SelectItem value="Sophomore">Sophomore</SelectItem>
              <SelectItem value="Junior">Junior</SelectItem>
              <SelectItem value="Senior">Senior</SelectItem>
              <SelectItem value="Graduate">Graduate</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="border-t border-white/10 pt-4 space-y-4">
        <p className="text-sm font-medium text-muted-foreground">Display Options</p>
        
        <div className="flex items-center space-x-3">
          <Checkbox
            id="showContact"
            checked={showContact}
            onCheckedChange={(checked) => onShowContactChange(checked as boolean)}
            className="border-white/20 data-[state=checked]:bg-primary data-[state=checked]:border-primary"
          />
          <Label htmlFor="showContact" className="text-sm cursor-pointer">
            Show Contact Information
          </Label>
        </div>

        <div className="flex items-center space-x-3">
          <Checkbox
            id="showAcademic"
            checked={showAcademic}
            onCheckedChange={(checked) => onShowAcademicChange(checked as boolean)}
            className="border-white/20 data-[state=checked]:bg-primary data-[state=checked]:border-primary"
          />
          <Label htmlFor="showAcademic" className="text-sm cursor-pointer">
            Show Academic Standing
          </Label>
        </div>
      </div>
    </div>
  );
}

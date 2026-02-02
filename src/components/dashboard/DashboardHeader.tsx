import { Button } from "@/components/ui/button";
import { RefreshCw, Download } from "lucide-react";

interface DashboardHeaderProps {
  lastRefreshed: Date;
  onRefresh: () => void;
  onExport: () => void;
}

export function DashboardHeader({ lastRefreshed, onRefresh, onExport }: DashboardHeaderProps) {
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });
  };

  return (
    <header className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-gradient-gold">
          VCU SFMC Institutional Gap Analysis Dashboard
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          Financial Aid Gap Analysis & Student Risk Assessment
        </p>
      </div>
      
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <span>Last Refreshed:</span>
          <span className="font-mono text-foreground">{formatTime(lastRefreshed)}</span>
        </div>
        
        <Button
          variant="outline"
          size="sm"
          onClick={onRefresh}
          className="border-white/20 bg-white/5 hover:bg-white/10"
        >
          <RefreshCw className="h-4 w-4 mr-2" />
          Refresh
        </Button>
        
        <Button
          size="sm"
          onClick={onExport}
          className="bg-primary text-primary-foreground hover:bg-primary/90 glow-gold"
        >
          <Download className="h-4 w-4 mr-2" />
          Export CSV
        </Button>
      </div>
    </header>
  );
}

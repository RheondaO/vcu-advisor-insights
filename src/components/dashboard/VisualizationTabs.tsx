import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { EnrollmentChart } from "./EnrollmentChart";
import { EnrollmentData, Student } from "@/data/mockStudents";
import { TrendingUp, BarChart3, Users } from "lucide-react";

interface VisualizationTabsProps {
  enrollmentData: EnrollmentData[];
  students: Student[];
  stats: {
    goodStandingPercent: number;
    averageGap: number;
    highRiskCount: number;
  };
}

export function VisualizationTabs({ enrollmentData, students, stats }: VisualizationTabsProps) {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  // Calculate performance metrics
  const levelDistribution = students.reduce((acc, s) => {
    acc[s.student_level] = (acc[s.student_level] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const avgGpaByLevel = Object.keys(levelDistribution).reduce((acc, level) => {
    const levelStudents = students.filter(s => s.student_level === level);
    const avgGpa = levelStudents.reduce((sum, s) => sum + s.gpa, 0) / levelStudents.length;
    acc[level] = avgGpa;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className="glass-card-gold p-6">
      <Tabs defaultValue="enrollment" className="w-full">
        <TabsList className="grid w-full grid-cols-3 bg-secondary/50 mb-6">
          <TabsTrigger 
            value="gap" 
            className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
          >
            <BarChart3 className="h-4 w-4 mr-2" />
            Gap Analysis
          </TabsTrigger>
          <TabsTrigger 
            value="enrollment"
            className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
          >
            <TrendingUp className="h-4 w-4 mr-2" />
            Enrollment Trends
          </TabsTrigger>
          <TabsTrigger 
            value="performance"
            className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
          >
            <Users className="h-4 w-4 mr-2" />
            Student Performance
          </TabsTrigger>
        </TabsList>

        <TabsContent value="gap" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="glass-card p-6 text-center">
              <p className="text-sm text-muted-foreground mb-2">Total Students Analyzed</p>
              <p className="text-4xl font-bold text-foreground">{students.length}</p>
            </div>
            <div className="glass-card p-6 text-center">
              <p className="text-sm text-muted-foreground mb-2">Students with Gap &gt; $5k</p>
              <p className="text-4xl font-bold text-danger">
                {students.filter(s => s.gap_amount > 5000).length}
              </p>
            </div>
            <div className="glass-card p-6 text-center">
              <p className="text-sm text-muted-foreground mb-2">Median Gap Amount</p>
              <p className="text-4xl font-bold text-warning">
                {formatCurrency(students.length > 0 
                  ? [...students].sort((a, b) => a.gap_amount - b.gap_amount)[Math.floor(students.length / 2)].gap_amount
                  : 0
                )}
              </p>
            </div>
          </div>
          <div className="glass-card p-6">
            <h4 className="text-lg font-semibold mb-4">Gap Distribution Summary</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div className="p-4 bg-success/10 rounded-lg border border-success/20">
                <p className="text-muted-foreground">$0 - $2,000</p>
                <p className="text-2xl font-bold text-success">
                  {students.filter(s => s.gap_amount <= 2000).length}
                </p>
              </div>
              <div className="p-4 bg-primary/10 rounded-lg border border-primary/20">
                <p className="text-muted-foreground">$2,001 - $5,000</p>
                <p className="text-2xl font-bold text-primary">
                  {students.filter(s => s.gap_amount > 2000 && s.gap_amount <= 5000).length}
                </p>
              </div>
              <div className="p-4 bg-warning/10 rounded-lg border border-warning/20">
                <p className="text-muted-foreground">$5,001 - $10,000</p>
                <p className="text-2xl font-bold text-warning">
                  {students.filter(s => s.gap_amount > 5000 && s.gap_amount <= 10000).length}
                </p>
              </div>
              <div className="p-4 bg-danger/10 rounded-lg border border-danger/20">
                <p className="text-muted-foreground">$10,000+</p>
                <p className="text-2xl font-bold text-danger">
                  {students.filter(s => s.gap_amount > 10000).length}
                </p>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="enrollment">
          <EnrollmentChart data={enrollmentData} />
        </TabsContent>

        <TabsContent value="performance" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="glass-card p-6">
              <h4 className="text-lg font-semibold mb-4">Students by Level</h4>
              <div className="space-y-3">
                {Object.entries(levelDistribution).map(([level, count]) => (
                  <div key={level} className="flex items-center justify-between">
                    <span className="text-muted-foreground">{level}</span>
                    <div className="flex items-center gap-4">
                      <div className="w-32 h-2 bg-secondary rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-primary rounded-full"
                          style={{ width: `${(count / students.length) * 100}%` }}
                        />
                      </div>
                      <span className="font-medium w-12 text-right">{count}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="glass-card p-6">
              <h4 className="text-lg font-semibold mb-4">Average GPA by Level</h4>
              <div className="space-y-3">
                {Object.entries(avgGpaByLevel).map(([level, gpa]) => (
                  <div key={level} className="flex items-center justify-between">
                    <span className="text-muted-foreground">{level}</span>
                    <div className="flex items-center gap-4">
                      <div className="w-32 h-2 bg-secondary rounded-full overflow-hidden">
                        <div 
                          className="h-full rounded-full"
                          style={{ 
                            width: `${(gpa / 4) * 100}%`,
                            backgroundColor: gpa >= 3.0 ? 'hsl(142, 76%, 36%)' : gpa >= 2.5 ? 'hsl(43, 100%, 50%)' : 'hsl(0, 84%, 60%)'
                          }}
                        />
                      </div>
                      <span className="font-medium w-12 text-right">{gpa.toFixed(2)}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="glass-card p-6">
            <h4 className="text-lg font-semibold mb-4">Academic Standing Overview</h4>
            <div className="grid grid-cols-3 gap-6">
              <div className="text-center">
                <p className="text-4xl font-bold text-success">
                  {students.filter(s => s.academic_standing === 'Good').length}
                </p>
                <p className="text-sm text-muted-foreground mt-1">Good Standing</p>
              </div>
              <div className="text-center">
                <p className="text-4xl font-bold text-warning">
                  {students.filter(s => s.academic_standing === 'Warning').length}
                </p>
                <p className="text-sm text-muted-foreground mt-1">Academic Warning</p>
              </div>
              <div className="text-center">
                <p className="text-4xl font-bold text-danger">
                  {students.filter(s => s.academic_standing === 'Probation').length}
                </p>
                <p className="text-sm text-muted-foreground mt-1">On Probation</p>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

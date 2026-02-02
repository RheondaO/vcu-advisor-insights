import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Student } from "@/data/mockStudents";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { ChevronUp, ChevronDown } from "lucide-react";

interface StudentTableProps {
  students: Student[];
  showContact: boolean;
  showAcademic: boolean;
}

type SortField = 'student_id' | 'credit_hours' | 'gap_amount' | 'risk_level';
type SortDirection = 'asc' | 'desc';

const riskOrder = { 'Low': 0, 'Medium': 1, 'High': 2 };

export function StudentTable({ students, showContact, showAcademic }: StudentTableProps) {
  const [sortField, setSortField] = useState<SortField>('risk_level');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  };

  const sortedStudents = [...students].sort((a, b) => {
    let comparison = 0;
    
    switch (sortField) {
      case 'student_id':
        comparison = a.student_id.localeCompare(b.student_id);
        break;
      case 'credit_hours':
        comparison = a.credit_hours - b.credit_hours;
        break;
      case 'gap_amount':
        comparison = a.gap_amount - b.gap_amount;
        break;
      case 'risk_level':
        comparison = riskOrder[a.risk_level] - riskOrder[b.risk_level];
        break;
    }
    
    return sortDirection === 'asc' ? comparison : -comparison;
  });

  // Show only flagged students (Medium or High risk)
  const flaggedStudents = sortedStudents.filter(s => s.risk_level !== 'Low').slice(0, 20);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const SortIcon = ({ field }: { field: SortField }) => {
    if (sortField !== field) return null;
    return sortDirection === 'asc' ? 
      <ChevronUp className="h-4 w-4 inline ml-1" /> : 
      <ChevronDown className="h-4 w-4 inline ml-1" />;
  };

  return (
    <div className="glass-card p-6">
      <h3 className="text-lg font-semibold text-primary mb-4">Flagged Student List</h3>
      <div className="overflow-auto max-h-96">
        <Table>
          <TableHeader>
            <TableRow className="border-white/10 hover:bg-transparent">
              <TableHead 
                className="text-muted-foreground cursor-pointer hover:text-foreground"
                onClick={() => handleSort('student_id')}
              >
                Student ID <SortIcon field="student_id" />
              </TableHead>
              {showContact && (
                <>
                  <TableHead className="text-muted-foreground">Name</TableHead>
                  <TableHead className="text-muted-foreground">Email</TableHead>
                </>
              )}
              <TableHead 
                className="text-muted-foreground cursor-pointer hover:text-foreground"
                onClick={() => handleSort('credit_hours')}
              >
                Credit Hours <SortIcon field="credit_hours" />
              </TableHead>
              <TableHead 
                className="text-muted-foreground cursor-pointer hover:text-foreground"
                onClick={() => handleSort('gap_amount')}
              >
                Calculated Gap <SortIcon field="gap_amount" />
              </TableHead>
              {showAcademic && (
                <>
                  <TableHead className="text-muted-foreground">GPA</TableHead>
                  <TableHead className="text-muted-foreground">Standing</TableHead>
                </>
              )}
              <TableHead 
                className="text-muted-foreground cursor-pointer hover:text-foreground"
                onClick={() => handleSort('risk_level')}
              >
                Risk Level <SortIcon field="risk_level" />
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {flaggedStudents.map((student) => (
              <TableRow key={student.student_id} className="border-white/5 hover:bg-white/5">
                <TableCell className="font-mono text-sm">{student.student_id}</TableCell>
                {showContact && (
                  <>
                    <TableCell>{student.first_name} {student.last_name}</TableCell>
                    <TableCell className="text-sm text-muted-foreground">{student.email}</TableCell>
                  </>
                )}
                <TableCell>{student.credit_hours}</TableCell>
                <TableCell className="font-medium">{formatCurrency(student.gap_amount)}</TableCell>
                {showAcademic && (
                  <>
                    <TableCell>{student.gpa.toFixed(2)}</TableCell>
                    <TableCell>
                      <span className={cn(
                        "px-2 py-1 rounded text-xs font-medium",
                        student.academic_standing === 'Good' && "bg-success/20 text-success",
                        student.academic_standing === 'Warning' && "bg-warning/20 text-warning",
                        student.academic_standing === 'Probation' && "bg-danger/20 text-danger"
                      )}>
                        {student.academic_standing}
                      </span>
                    </TableCell>
                  </>
                )}
                <TableCell>
                  <div className="flex items-center gap-2">
                    <span className={cn(
                      "w-3 h-3 rounded-full",
                      student.risk_level === 'Low' && "bg-success",
                      student.risk_level === 'Medium' && "bg-warning",
                      student.risk_level === 'High' && "bg-danger"
                    )} />
                    <span className={cn(
                      "text-sm font-medium",
                      student.risk_level === 'Low' && "text-success",
                      student.risk_level === 'Medium' && "text-warning",
                      student.risk_level === 'High' && "text-danger"
                    )}>
                      {student.risk_level}
                    </span>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

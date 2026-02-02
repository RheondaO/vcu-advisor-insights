export interface Student {
  student_id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  residency: 'In-State' | 'Out-of-State';
  gap_amount: number;
  risk_score: number;
  risk_level: 'Low' | 'Medium' | 'High';
  credit_hours: number;
  semester: 'Fall 2024' | 'Spring 2025' | 'Summer 2025';
  student_level: 'Freshman' | 'Sophomore' | 'Junior' | 'Senior' | 'Graduate';
  enrollment_date: string;
  gpa: number;
  academic_standing: 'Good' | 'Probation' | 'Warning';
  has_installment_plan: boolean;
}

export interface EnrollmentData {
  month: string;
  totalEnroll: number;
  newEnroll: number;
}

const firstNames = [
  'James', 'Mary', 'Robert', 'Patricia', 'John', 'Jennifer', 'Michael', 'Linda',
  'David', 'Elizabeth', 'William', 'Barbara', 'Richard', 'Susan', 'Joseph', 'Jessica',
  'Thomas', 'Sarah', 'Christopher', 'Karen', 'Charles', 'Lisa', 'Daniel', 'Nancy',
  'Matthew', 'Betty', 'Anthony', 'Margaret', 'Mark', 'Sandra', 'Donald', 'Ashley',
  'Steven', 'Kimberly', 'Paul', 'Emily', 'Andrew', 'Donna', 'Joshua', 'Michelle',
  'Kenneth', 'Carol', 'Kevin', 'Amanda', 'Brian', 'Dorothy', 'George', 'Melissa',
  'Timothy', 'Deborah', 'Ronald', 'Stephanie', 'Edward', 'Rebecca', 'Jason', 'Sharon',
  'Jeffrey', 'Laura', 'Ryan', 'Cynthia', 'Jacob', 'Kathleen', 'Gary', 'Amy'
];

const lastNames = [
  'Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis',
  'Rodriguez', 'Martinez', 'Hernandez', 'Lopez', 'Gonzalez', 'Wilson', 'Anderson',
  'Thomas', 'Taylor', 'Moore', 'Jackson', 'Martin', 'Lee', 'Perez', 'Thompson',
  'White', 'Harris', 'Sanchez', 'Clark', 'Ramirez', 'Lewis', 'Robinson', 'Walker',
  'Young', 'Allen', 'King', 'Wright', 'Scott', 'Torres', 'Nguyen', 'Hill', 'Flores',
  'Green', 'Adams', 'Nelson', 'Baker', 'Hall', 'Rivera', 'Campbell', 'Mitchell'
];

function seededRandom(seed: number): () => number {
  return function() {
    seed = Math.sin(seed) * 10000;
    return seed - Math.floor(seed);
  };
}

function generateStudents(count: number): Student[] {
  const students: Student[] = [];
  const random = seededRandom(42);
  
  const semesters: Student['semester'][] = ['Fall 2024', 'Spring 2025', 'Summer 2025'];
  const levels: Student['student_level'][] = ['Freshman', 'Sophomore', 'Junior', 'Senior', 'Graduate'];
  const residencies: Student['residency'][] = ['In-State', 'Out-of-State'];
  const standings: Student['academic_standing'][] = ['Good', 'Probation', 'Warning'];
  
  for (let i = 0; i < count; i++) {
    const firstName = firstNames[Math.floor(random() * firstNames.length)];
    const lastName = lastNames[Math.floor(random() * lastNames.length)];
    const residency = residencies[random() < 0.65 ? 0 : 1]; // 65% in-state
    
    // Gap amount: higher for out-of-state students
    const baseGap = residency === 'Out-of-State' 
      ? 3000 + random() * 12000 
      : 1000 + random() * 8000;
    const gap_amount = Math.round(baseGap);
    
    // Risk score based on gap amount
    const risk_score = Math.min(100, Math.round((gap_amount / 150) + random() * 20));
    const risk_level: Student['risk_level'] = 
      risk_score >= 70 ? 'High' : 
      risk_score >= 40 ? 'Medium' : 'Low';
    
    // Credit hours: weighted toward full-time
    const credit_hours = random() < 0.7 
      ? Math.floor(12 + random() * 7) // 12-18 hours (full-time)
      : Math.floor(3 + random() * 9);  // 3-11 hours (part-time)
    
    const semester = semesters[Math.floor(random() * semesters.length)];
    const student_level = levels[Math.floor(random() * levels.length)];
    
    // GPA distribution
    const gpa = Math.round((2.0 + random() * 2.0) * 100) / 100;
    
    // Academic standing: correlated with GPA
    const academic_standing: Student['academic_standing'] = 
      gpa >= 2.5 ? 'Good' : 
      gpa >= 2.0 ? 'Warning' : 'Probation';
    
    // Enrollment date in the past year
    const enrollMonth = Math.floor(random() * 12) + 1;
    const enrollDay = Math.floor(random() * 28) + 1;
    const enrollment_date = `2024-${String(enrollMonth).padStart(2, '0')}-${String(enrollDay).padStart(2, '0')}`;
    
    // Installment plan: more likely for high-gap students
    const has_installment_plan = gap_amount > 5000 ? random() < 0.6 : random() < 0.3;
    
    students.push({
      student_id: `V${String(900000 + i).padStart(7, '0')}`,
      first_name: firstName,
      last_name: lastName,
      email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@vcu.edu`,
      phone: `(804) ${String(Math.floor(random() * 900) + 100).padStart(3, '0')}-${String(Math.floor(random() * 9000) + 1000).padStart(4, '0')}`,
      residency,
      gap_amount,
      risk_score,
      risk_level,
      credit_hours,
      semester,
      student_level,
      enrollment_date,
      gpa,
      academic_standing,
      has_installment_plan,
    });
  }
  
  return students;
}

// Generate 250 students
export const mockStudents: Student[] = generateStudents(250);

// Enrollment trend data (monthly)
export const enrollmentData: EnrollmentData[] = [
  { month: 'Jan', totalEnroll: 4200, newEnroll: 320 },
  { month: 'Feb', totalEnroll: 4350, newEnroll: 280 },
  { month: 'Mar', totalEnroll: 4500, newEnroll: 350 },
  { month: 'Apr', totalEnroll: 4650, newEnroll: 290 },
  { month: 'May', totalEnroll: 4400, newEnroll: 180 },
  { month: 'Jun', totalEnroll: 3800, newEnroll: 150 },
  { month: 'Jul', totalEnroll: 3600, newEnroll: 120 },
  { month: 'Aug', totalEnroll: 5200, newEnroll: 1200 },
  { month: 'Sep', totalEnroll: 5450, newEnroll: 450 },
  { month: 'Oct', totalEnroll: 5380, newEnroll: 280 },
  { month: 'Nov', totalEnroll: 5320, newEnroll: 220 },
  { month: 'Dec', totalEnroll: 5250, newEnroll: 180 },
];

// Calculate derived statistics
export function getStatistics(students: Student[]) {
  const total = students.length;
  if (total === 0) {
    return {
      goodStandingPercent: 0,
      averageGap: 0,
      totalUnmetNeed: 0,
      highRiskCount: 0,
      installmentPlanCount: 0,
      adoptionRate: 0,
      avgGapByResidency: { 'In-State': 0, 'Out-of-State': 0 },
    };
  }
  
  const goodStanding = students.filter(s => s.academic_standing === 'Good').length;
  const goodStandingPercent = Math.round((goodStanding / total) * 100);
  
  const totalGap = students.reduce((sum, s) => sum + s.gap_amount, 0);
  const averageGap = Math.round(totalGap / total);
  
  const highGapStudents = students.filter(s => s.gap_amount > 5000);
  const totalUnmetNeed = highGapStudents.reduce((sum, s) => sum + s.gap_amount, 0);
  
  const highRiskCount = students.filter(s => s.risk_level === 'High').length;
  
  const installmentPlanCount = students.filter(s => s.has_installment_plan).length;
  const adoptionRate = Math.round((installmentPlanCount / total) * 100);
  
  const inStateStudents = students.filter(s => s.residency === 'In-State');
  const outStateStudents = students.filter(s => s.residency === 'Out-of-State');
  
  const avgGapByResidency = {
    'In-State': inStateStudents.length > 0 
      ? Math.round(inStateStudents.reduce((sum, s) => sum + s.gap_amount, 0) / inStateStudents.length)
      : 0,
    'Out-of-State': outStateStudents.length > 0
      ? Math.round(outStateStudents.reduce((sum, s) => sum + s.gap_amount, 0) / outStateStudents.length)
      : 0,
  };
  
  return {
    goodStandingPercent,
    averageGap,
    totalUnmetNeed,
    highRiskCount,
    installmentPlanCount,
    adoptionRate,
    avgGapByResidency,
  };
}

// Filter students
export interface FilterOptions {
  semester: string;
  residency: string;
  studentLevel: string;
}

export function filterStudents(students: Student[], filters: FilterOptions): Student[] {
  return students.filter(student => {
    if (filters.semester !== 'all' && student.semester !== filters.semester) {
      return false;
    }
    if (filters.residency !== 'all' && student.residency !== filters.residency) {
      return false;
    }
    if (filters.studentLevel !== 'all' && student.student_level !== filters.studentLevel) {
      return false;
    }
    return true;
  });
}

// Export to CSV
export function exportToCSV(students: Student[], showContact: boolean, showAcademic: boolean): void {
  const headers = [
    'Student ID',
    'Residency',
    'Gap Amount',
    'Risk Level',
    'Risk Score',
    'Credit Hours',
    'Semester',
    'Student Level',
    ...(showContact ? ['First Name', 'Last Name', 'Email', 'Phone'] : []),
    ...(showAcademic ? ['GPA', 'Academic Standing'] : []),
    'Has Installment Plan',
  ];
  
  const rows = students.map(s => [
    s.student_id,
    s.residency,
    s.gap_amount.toString(),
    s.risk_level,
    s.risk_score.toString(),
    s.credit_hours.toString(),
    s.semester,
    s.student_level,
    ...(showContact ? [s.first_name, s.last_name, s.email, s.phone] : []),
    ...(showAcademic ? [s.gpa.toString(), s.academic_standing] : []),
    s.has_installment_plan ? 'Yes' : 'No',
  ]);
  
  const csvContent = [
    headers.join(','),
    ...rows.map(row => row.map(cell => `"${cell}"`).join(',')),
  ].join('\n');
  
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = `gap_analysis_export_${new Date().toISOString().split('T')[0]}.csv`;
  link.click();
  URL.revokeObjectURL(link.href);
}

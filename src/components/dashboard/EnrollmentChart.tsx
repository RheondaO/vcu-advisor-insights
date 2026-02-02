import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { EnrollmentData } from '@/data/mockStudents';

interface EnrollmentChartProps {
  data: EnrollmentData[];
}

export function EnrollmentChart({ data }: EnrollmentChartProps) {
  return (
    <div className="h-80">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
          <XAxis 
            dataKey="month" 
            stroke="rgba(255,255,255,0.5)"
            fontSize={12}
          />
          <YAxis 
            stroke="rgba(255,255,255,0.5)"
            fontSize={12}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: 'rgba(0,0,0,0.9)',
              border: '1px solid rgba(255,255,255,0.2)',
              borderRadius: '8px',
              color: '#fff',
            }}
          />
          <Legend 
            wrapperStyle={{
              paddingTop: '20px',
            }}
          />
          <Line 
            type="monotone" 
            dataKey="totalEnroll" 
            name="Total Enrollment"
            stroke="hsl(43, 100%, 50%)" 
            strokeWidth={3}
            dot={{ fill: 'hsl(43, 100%, 50%)', strokeWidth: 2, r: 4 }}
            activeDot={{ r: 6, fill: 'hsl(43, 100%, 60%)' }}
          />
          <Line 
            type="monotone" 
            dataKey="newEnroll" 
            name="New Enrollment"
            stroke="hsl(200, 100%, 50%)" 
            strokeWidth={3}
            dot={{ fill: 'hsl(200, 100%, 50%)', strokeWidth: 2, r: 4 }}
            activeDot={{ r: 6, fill: 'hsl(200, 100%, 60%)' }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

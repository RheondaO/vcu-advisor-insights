import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

interface ResidencyChartProps {
  data: {
    'In-State': number;
    'Out-of-State': number;
  };
}

export function ResidencyChart({ data }: ResidencyChartProps) {
  const chartData = [
    { name: 'In-State', value: data['In-State'], color: 'hsl(142, 76%, 36%)' },
    { name: 'Out-of-State', value: data['Out-of-State'], color: 'hsl(0, 84%, 60%)' },
  ];

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <div className="glass-card p-6 h-full">
      <h3 className="text-lg font-semibold text-primary mb-4">Average Gap by Residency</h3>
      <div className="h-48">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} layout="vertical" margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" horizontal={false} />
            <XAxis 
              type="number" 
              tickFormatter={formatCurrency}
              stroke="rgba(255,255,255,0.5)"
              fontSize={12}
            />
            <YAxis 
              type="category" 
              dataKey="name" 
              stroke="rgba(255,255,255,0.5)"
              fontSize={12}
              width={80}
            />
            <Tooltip
              formatter={(value: number) => [formatCurrency(value), 'Avg Gap']}
              contentStyle={{
                backgroundColor: 'rgba(0,0,0,0.9)',
                border: '1px solid rgba(255,255,255,0.2)',
                borderRadius: '8px',
                color: '#fff',
              }}
            />
            <Bar dataKey="value" radius={[0, 4, 4, 0]}>
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

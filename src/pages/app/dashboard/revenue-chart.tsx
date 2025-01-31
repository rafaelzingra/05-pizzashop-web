import { useQuery } from '@tanstack/react-query'
import {
    CartesianGrid,    
    Line,
    LineChart,
    ResponsiveContainer, XAxis,
    YAxis
} from 'recharts'
import colors from 'tailwindcss/colors'
  
  import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'
import { getDayliRevenueInPeriod } from '@/api/get-daily-revenue-in-period'

  
export function RevenueChart() {

  const {data: dailyRevenueInPeriod} = useQuery({
    queryKey: ['metrics', 'daily-receipt-in-period'],
    queryFn: getDayliRevenueInPeriod
  })

  return (
    <Card className="col-span-6">
      <CardHeader className="flex-row items-center justify-between pb-8">
        <div className="space-y-1">
          <CardTitle className="text-base font-medium">
            Receita no período
          </CardTitle>
          <CardDescription>Receita diária no período</CardDescription>
        </div>        
      </CardHeader>
      <CardContent>
        {dailyRevenueInPeriod && (
          <ResponsiveContainer width="100%" height={240}>
          <LineChart data={dailyRevenueInPeriod} style={{ fontSize: 12 }}>
            <XAxis dataKey="date" axisLine={false} tickLine={false} dy={16} />
            <YAxis
              stroke="#888"
              axisLine={false}
              tickLine={false}
              width={80}
              tickFormatter={(value: number) =>
                value.toLocaleString('pt-BR', {
                  style: 'currency',
                  currency: 'BRL',
                })
              }
            />
            <CartesianGrid vertical={false} className="stroke-muted" />
            <Line
              stroke={colors.violet[500]}
              type="linear"
              strokeWidth={2}
              dataKey="receipt"
            />
          </LineChart>
        </ResponsiveContainer>
        )}
      </CardContent>
    </Card>
  )
}
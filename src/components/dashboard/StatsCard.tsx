import React from 'react'
import { DivideIcon as LucideIcon, TrendingUp, TrendingDown } from 'lucide-react'
import { Card, CardContent } from '../ui/Card'

interface StatsCardProps {
  title: string
  value: string | number
  icon: LucideIcon
  color: 'emerald' | 'blue' | 'amber' | 'red'
  trend?: {
    value: number
    isPositive: boolean
  }
}

export const StatsCard: React.FC<StatsCardProps> = ({
  title,
  value,
  icon: Icon,
  color,
  trend
}) => {
  const colorClasses = {
    emerald: 'text-emerald-600 bg-emerald-100',
    blue: 'text-blue-600 bg-blue-100',
    amber: 'text-amber-600 bg-amber-100',
    red: 'text-red-600 bg-red-100'
  }

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">{title}</p>
            <p className="text-2xl font-bold text-gray-900">{value}</p>
            {trend && (
              <div className={`flex items-center mt-2 text-sm ${
                trend.isPositive ? 'text-green-600' : 'text-red-600'
              }`}>
                {trend.isPositive ? (
                  <TrendingUp className="h-4 w-4 mr-1" />
                ) : (
                  <TrendingDown className="h-4 w-4 mr-1" />
                )}
                <span>{trend.value}%</span>
              </div>
            )}
          </div>
          <div className={`w-12 h-12 rounded-full flex items-center justify-center ${colorClasses[color]}`}>
            <Icon className="h-6 w-6" />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
import type { ReactNode } from 'react';
import { Card } from '../ui/Card';

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: ReactNode;
  description?: string;
}

export function StatsCard({ title, value, icon, description }: StatsCardProps) {
  return (
    <Card>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <p className="mt-2 text-2xl font-bold text-gray-900">{value}</p>
          {description && <p className="mt-1 text-xs text-gray-400">{description}</p>}
        </div>
        <div className="p-2 bg-linear-to-r from-[#F2A9DD]/20 via-[#C8B2F5]/20 to-[#F7FAE4]/20 rounded-lg">
          {icon}
        </div>
      </div>
    </Card>
  );
}

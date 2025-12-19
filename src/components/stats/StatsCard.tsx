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
    <Card hover className="group">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-semibold text-[#054460] mb-1">{title}</p>
          <p className="mt-2 text-3xl font-bold text-ocean">
            {value}
          </p>
          {description && <p className="mt-2 text-xs text-[#4b6b80] font-medium">{description}</p>}
        </div>
        <div className="p-3 bg-ocean/10 rounded-xl shadow-sm group-hover:shadow-md transition-all duration-300 text-[var(--ocean-500)]">
          {icon}
        </div>
      </div>
    </Card>
  );
}

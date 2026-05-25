"use client";

import StatCard    from "@/components/ui/StatCard";
import ProgressBar from "@/components/ui/ProgressBar";
import { MonthlyLineChart, WasteDonutChart, CarbonBarChart } from "@/components/DashboardCharts";

export default function AnalyticsPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        <StatCard icon="🌿" label="CO₂ Offset"    value="47.3kg" change="↑ 12% this month" color="green" />
        <StatCard icon="♻️" label="Total Recycled" value="284"    change="Lifetime total"   color="blue"  />
        <StatCard icon="🏆" label="Eco Score"      value="82"     change="Top 8% users"     color="yellow"/>
        <StatCard icon="🔥" label="Max Streak"     value="28 days" change="consecutive"     color="red"   />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <div className="chart-card eco-card">
          <h3 className="font-display font-bold text-sm mb-4">Monthly Recycling Trend</h3>
          <div className="h-48"><MonthlyLineChart /></div>
        </div>
        <div className="eco-card">
          <h3 className="font-display font-bold text-sm mb-4">Waste Breakdown by Category</h3>
          <div className="h-48"><WasteDonutChart /></div>
        </div>
      </div>

      <div className="eco-card">
        <h3 className="font-display font-bold text-sm mb-4">Carbon Footprint Reduced (Weekly)</h3>
        <div className="h-48"><CarbonBarChart /></div>
      </div>

      <div className="eco-card">
        <h3 className="font-display font-bold text-sm mb-5">Material Recycling Rate</h3>
        <div className="flex flex-col gap-4">
          {[
            { label:"Plastic", pct:92, color:"eco"    },
            { label:"Paper",   pct:88, color:"eco"    },
            { label:"Metal",   pct:76, color:"eco"    },
            { label:"E-Waste", pct:62, color:"yellow" },
          ].map(({ label, pct, color }) => (
            <div key={label}>
              <div className="flex justify-between text-sm mb-1.5">
                <span>{label}</span>
                <span className="font-semibold text-eco-blue">{pct}%</span>
              </div>
              <ProgressBar value={pct} color={color} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
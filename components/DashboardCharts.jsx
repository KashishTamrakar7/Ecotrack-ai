"use client";

import { useEffect, useRef } from "react";
import {
  Chart,
  BarElement, LineElement, PointElement, ArcElement,
  CategoryScale, LinearScale,
  Tooltip, Legend, Filler,
} from "chart.js";

Chart.register(
  BarElement, LineElement, PointElement, ArcElement,
  CategoryScale, LinearScale,
  Tooltip, Legend, Filler
);

function useChart(ref, config) {
  useEffect(() => {
    if (!ref.current) return;
    const chart = new Chart(ref.current, config);
    return () => chart.destroy();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}

export function WeeklyBarChart() {
  const ref = useRef(null);
  useChart(ref, {
    type: "bar",
    data: {
      labels: ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"],
      datasets: [{
        label: "Items Scanned",
        data:  [8,12,7,15,10,18,6],
        backgroundColor(ctx) {
          const g = ctx.chart.ctx.createLinearGradient(0,0,0,200);
          g.addColorStop(0, "rgba(0,201,127,.9)");
          g.addColorStop(1, "rgba(0,168,232,.6)");
          return g;
        },
        borderRadius: 10,
        borderSkipped: false,
        hoverBackgroundColor: "#00C97F",
      }],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: { callbacks: { label: c => `${c.raw} items` } },
      },
      scales: {
        x: { grid: { display: false }, ticks: { font: { size: 11 } } },
        y: { grid: { color: "rgba(0,0,0,.04)" }, ticks: { font: { size: 11 } } },
      },
      animation: { duration: 900, easing: "easeOutBounce" },
    },
  });
  return <canvas ref={ref} />;
}

export function MonthlyLineChart() {
  const ref = useRef(null);
  useChart(ref, {
    type: "line",
    data: {
      labels: ["Jan","Feb","Mar","Apr","May","Jun"],
      datasets: [{
        label: "Items Recycled",
        data:  [24,38,32,55,48,76],
        borderColor: "#00C97F",
        backgroundColor: "rgba(0,201,127,.08)",
        tension: .4, fill: true,
        pointBackgroundColor: "#00C97F",
        pointRadius: 5, pointHoverRadius: 8,
      }],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { display: false } },
      scales: {
        x: { grid: { display: false } },
        y: { grid: { color: "rgba(0,0,0,.04)" } },
      },
      animation: { duration: 800 },
    },
  });
  return <canvas ref={ref} />;
}

export function WasteDonutChart() {
  const ref = useRef(null);
  useChart(ref, {
    type: "doughnut",
    data: {
      labels: ["Plastic","Paper","Metal","Glass","Other"],
      datasets: [{
        data: [45,20,15,10,10],
        backgroundColor: ["#00A8E8","#00C97F","#F9C74F","#8B5CF6","#E5E7EB"],
        borderWidth: 0,
        hoverOffset: 8,
      }],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: "right",
          labels: { font: { size: 12 }, boxWidth: 12, padding: 12 },
        },
      },
      cutout: "70%",
      animation: { duration: 900 },
    },
  });
  return <canvas ref={ref} />;
}

export function CarbonBarChart() {
  const ref = useRef(null);
  useChart(ref, {
    type: "bar",
    data: {
      labels: ["W1","W2","W3","W4","W5","W6","W7","W8"],
      datasets: [{
        label: "CO₂ Saved (kg)",
        data: [4.2,6.8,5.1,8.3,7.4,9.2,6.6,8.7],
        backgroundColor: "rgba(0,168,232,.75)",
        borderRadius: 8,
        borderSkipped: false,
        hoverBackgroundColor: "#00A8E8",
      }],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { display: false } },
      scales: {
        x: { grid: { display: false } },
        y: { grid: { color: "rgba(0,0,0,.04)" } },
      },
      animation: { duration: 800 },
    },
  });
  return <canvas ref={ref} />;
}

export function AreaBarChart() {
  const ref = useRef(null);
  const data = [72,58,81,65,90,44,76,68];
  const colors = data.map(v => v>=80?"#00C97F":v>=65?"#F9C74F":"#FF4D6D");
  useChart(ref, {
    type: "bar",
    data: {
      labels: ["Zone A","Zone B","Zone C","Zone D","Zone E","Zone F","Zone G","Zone H"],
      datasets: [{
        label: "Recycling %",
        data,
        backgroundColor: colors,
        borderRadius: 8,
        borderSkipped: false,
      }],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: { callbacks: { label: c => `${c.raw}% recycled` } },
      },
      scales: {
        x: { grid: { display: false } },
        y: { grid: { color: "rgba(0,0,0,.04)" }, max: 100, ticks: { callback: v => v+"%" } },
      },
      animation: { duration: 900 },
    },
  });
  return <canvas ref={ref} />;
}
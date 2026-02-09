"use client";

import { useTranslations } from "next-intl";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend
);

export default function ApplicantsChart() {
  const t = useTranslations("employerOverviewChart");
  const data = {
    labels: ["October", "November", "December"],
    datasets: [
      {
        label: "Applicants A",
        data: [1.2, 1.3, 1.9],
        borderColor: "#0d6efd",
        backgroundColor: "transparent",
        tension: 0.4,
        pointRadius: 0,
      },
      {
        label: "Applicants B",
        data: [0.7, 1.2, 1.4],
        borderColor: "#fd7e14",
        backgroundColor: "transparent",
        tension: 0.4,
        pointRadius: 0,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        ticks: {
          stepSize: 0.5,
        },
        grid: {
          color: "#eee",
        },
      },
    },
  };

  return (
    <div
      style={{
        background: "#fff",
        borderRadius: 12,
        padding: 20,
        boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
        height: 300,
      }}
    >
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h6 className="mb-0 fw-bold">{t("title")}</h6>
        <small className="text-muted">
          {t("range")} ⌄
        </small>
      </div>

      {/* Chart */}
      <Line data={data} options={options} />
    </div>
  );
}

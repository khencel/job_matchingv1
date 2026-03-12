"use client";

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
import { useTranslations } from "next-intl";

interface Prop{
  chart_report: {
    current_year_data: number[];
    previous_year_data: number[];
  }
}

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend
);

export default function ApplicantsChart({chart_report}:Prop) {
  const t = useTranslations("employerOverview");

  const data = {
    labels: [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      t("chart.months.october"),
      t("chart.months.november"),
      t("chart.months.december"),
    ],
    datasets: [
      {
        label: t("chart.series.applicantsA"),
        data: chart_report.current_year_data,
        borderColor: "#0d6efd",
        backgroundColor: "transparent",
        tension: 0.4,
        pointRadius: 0,
      },
      {
        label: t("chart.series.applicantsB"),
        data: chart_report.previous_year_data,
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
        <h6 className="mb-0 fw-bold">{t("chart.title")}</h6>
        <small className="text-muted">
          {/* {t("chart.period")} ⌄ */}
          Year (2025-2026)
        </small>
      </div>

      {/* Chart */}
      <Line data={data} options={options} />
    </div>
  );
}

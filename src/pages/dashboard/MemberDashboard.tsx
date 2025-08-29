import ReactApexChart from "react-apexcharts";
import { useSelector } from "react-redux";
import type { RootState } from "../../redux/store";

const TOTAL_MAX = 1000;  
const MONTHLY_MAX = 100;

const tierColors: Record<string, string> = {
  Gold: "#D4AF37",
  Platinum: "#6b7280",
  Silver: "#9CA3AF",
  Bronze: "#CD7F32",
};

export default function MemberDashboard() {
  const { memberPoints } = useSelector((s: RootState) => s.data);
  const totalPct = Math.min(100, (memberPoints.total / TOTAL_MAX) * 100 || 0);
  const monthlyPct = Math.min(100, (memberPoints.monthly / MONTHLY_MAX) * 100 || 0);
  const tierColor = tierColors[memberPoints.tier] ?? "#6b7280"; 

  const baseRadial = {
    chart: { type: "radialBar", sparkline: { enabled: true } },
    plotOptions: {
      radialBar: {
        hollow: { size: "70%" },
        track: { strokeWidth: "100%" },
        dataLabels: {
          name: { fontSize: "14px", offsetY: 20 },
          value: {
            fontSize: "22px",
            offsetY: -10,
            formatter: (val: number) => `${Math.round(val)}%`,
          },
        },
      },
    },
  } as const;

  const totalOptions = {
    ...baseRadial,
    colors: ["#2563eb"],
    labels: ["Total"],
    plotOptions: {
      ...baseRadial.plotOptions,
      radialBar: {
        ...baseRadial.plotOptions.radialBar,
        dataLabels: {
          ...baseRadial.plotOptions.radialBar.dataLabels,
          value: {
            ...baseRadial.plotOptions.radialBar.dataLabels.value,
          },
          total: {
            show: true,
            label: `${memberPoints.total} pts`,
            formatter: () => "", 
          },
        },
      },
    },
  };

  const monthlyOptions = {
    ...baseRadial,
    colors: ["#10b981"],
    labels: ["This Month"],
    plotOptions: {
      ...baseRadial.plotOptions,
      radialBar: {
        ...baseRadial.plotOptions.radialBar,
        dataLabels: {
          ...baseRadial.plotOptions.radialBar.dataLabels,
          total: {
            show: true,
            label: `${memberPoints.monthly} pts`,
            formatter: () => "",
          },
        },
      },
    },
  };

  const tierOptions = {
    ...baseRadial,
    colors: [tierColor],
    labels: [memberPoints.tier || "Tier"],
    plotOptions: {
      ...baseRadial.plotOptions,
      radialBar: {
        ...baseRadial.plotOptions.radialBar,
        hollow: { size: "78%" },
        dataLabels: {
          name: { fontSize: "14px", offsetY: 18 },
          value: {
            fontSize: "18px",
            offsetY: -8,
            formatter: () => "",
          },
          total: {
            show: true,
            label: memberPoints.tier,
            formatter: () => "",
          },
        },
      },
    },
  };

  return (
    <div className="space-y-6">
      <h1 className="h1">Member Dashboard</h1>

      {/* <div className="card">
        <h2 className="h2 mb-3">Points Summary</h2>
        <div className="grid gap-4 sm:grid-cols-3">
          <div className="rounded-xl border p-4 text-center">
            <div className="text-sm text-gray-500">Total</div>
            <div className="text-3xl font-bold">{memberPoints.total}</div>
          </div>
          <div className="rounded-xl border p-4 text-center">
            <div className="text-sm text-gray-500">This Month</div>
            <div className="text-3xl font-bold">{memberPoints.monthly}</div>
          </div>
          <div className="rounded-xl border p-4 text-center">
            <div className="text-sm text-gray-500">Tier</div>
            <div className="text-3xl font-bold">{memberPoints.tier}</div>
          </div>
        </div>
      </div> */}

      {/* Charts */}
      <div className="card">
        <h2 className="h2 mb-3">Points Summary</h2>
        <div className="grid gap-6 sm:grid-cols-3">
          <div className="flex flex-col items-center">
            <ReactApexChart options={totalOptions} series={[totalPct]} type="radialBar" height={260} />
            <div className="mt-2 text-sm text-gray-500">Progress to Total </div>
          </div>

          <div className="flex flex-col items-center">
            <ReactApexChart options={monthlyOptions} series={[monthlyPct]} type="radialBar" height={260} />
            <div className="mt-2 text-sm text-gray-500">Progress this Month </div>
          </div>

          <div className="flex flex-col items-center">
            {/* Tier ring — always full, just uses tier color */}
            <ReactApexChart options={tierOptions} series={[100]} type="radialBar" height={260} />
            <div className="mt-2 text-sm text-gray-500">Current Tier</div>
          </div>
        </div>
      </div>
    </div>
  );
}

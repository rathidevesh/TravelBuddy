"use client"

import { useState, useEffect } from "react"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js"
import { Line, Bar, Pie } from "react-chartjs-2"
import "./dashboard.css"

// Register ChartJS components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, ArcElement, Title, Tooltip, Legend)

const Dashboard = () => {
  const [summary, setSummary] = useState(null)
  const [revenue, setRevenue] = useState(null)
  const [bookings, setBookings] = useState(null)
  const [vehicleTypes, setVehicleTypes] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token")
      const headers = { "auth-token": token }
      const baseUrl = "http://localhost:5000/api/dashboard"

      try {
        // Fetch all data in parallel
        const [summaryRes, revenueRes, bookingsRes, typesRes] = await Promise.all([
          fetch(`${baseUrl}/summary`, { headers }),
          fetch(`${baseUrl}/monthly-revenue`, { headers }),
          fetch(`${baseUrl}/bookings-per-month`, { headers }),
          fetch(`${baseUrl}/vehicle-types`, { headers }),
        ])

        const summaryData = await summaryRes.json()
        const revenueData = await revenueRes.json()
        const bookingsData = await bookingsRes.json()
        const typesData = await typesRes.json()

        setSummary(summaryData)
        setRevenue(revenueData)
        setBookings(bookingsData)
        setVehicleTypes(typesData)
        setLoading(false)
      } catch (error) {
        console.error("Error fetching dashboard data:", error)
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  if (loading) {
    return <div className="loading-container">Loading Dashboard...</div>
  }

  // Helper for Month Labels
  const monthLabels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

  // Line Chart Data (Monthly Revenue)
  const revenueChartData = {
    labels: monthLabels,
    datasets: [
      {
        label: "Earnings (₹)",
        data: monthLabels.map((_, i) => {
          const item = revenue?.earnings?.find((e) => e._id === i + 1)
          return item ? item.total : 0
        }),
        borderColor: "rgb(75, 192, 192)",
        backgroundColor: "rgba(75, 192, 192, 0.5)",
        tension: 0.3,
      },
      {
        label: "Spending (₹)",
        data: monthLabels.map((_, i) => {
          const item = revenue?.spending?.find((s) => s._id === i + 1)
          return item ? item.total : 0
        }),
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
        tension: 0.3,
      },
    ],
  }

  // Bar Chart Data (Bookings Per Month)
  const bookingsChartData = {
    labels: monthLabels,
    datasets: [
      {
        label: "Number of Bookings",
        data: monthLabels.map((_, i) => {
          const item = bookings?.find((b) => b._id === i + 1)
          return item ? item.count : 0
        }),
        backgroundColor: "rgba(54, 162, 235, 0.7)",
        borderRadius: 5,
      },
    ],
  }

  // Pie Chart Data (Vehicle Type Distribution)
  const typeChartData = {
    labels: vehicleTypes?.map((t) => t._id) || [],
    datasets: [
      {
        data: vehicleTypes?.map((t) => t.count) || [],
        backgroundColor: ["rgba(255, 159, 64, 0.7)", "rgba(153, 102, 255, 0.7)", "rgba(255, 205, 86, 0.7)"],
        borderWidth: 1,
      },
    ],
  }

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">Rental Dashboard</h1>

      {/* 1. Summary Cards */}
      <div className="summary-grid">
        <div className="card">
          <div className="card-label">Total Vehicles</div>
          <div className="card-value">{summary?.totalVehicles || 0}</div>
        </div>
        <div className="card">
          <div className="card-label">Total Bookings</div>
          <div className="card-value">{summary?.totalBookings || 0}</div>
        </div>
        <div className="card">
          <div className="card-label">Active Bookings</div>
          <div className="card-value">{summary?.activeBookings || 0}</div>
        </div>
        <div className="card">
          <div className="card-label">Total Earnings</div>
          <div className="card-value">₹ {summary?.totalEarnings?.toLocaleString() || 0}</div>
        </div>
        <div className="card">
          <div className="card-label">Total Spending</div>
          <div className="card-value">₹ {summary?.totalSpending?.toLocaleString() || 0}</div>
        </div>
      </div>

      <div className="charts-grid">
        {/* 2. Monthly Revenue (Line Chart) */}
        <div className="chart-card revenue-chart">
          <h2 className="chart-title">Monthly Revenue & Spending</h2>
          <div style={{ height: "300px" }}>
            <Line
              data={revenueChartData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { position: "top" } },
              }}
            />
          </div>
        </div>

        {/* 3. Bookings Per Month (Bar Chart) */}
        <div className="chart-card">
          <h2 className="chart-title">Bookings Trend</h2>
          <div style={{ height: "300px" }}>
            <Bar
              data={bookingsChartData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { display: false } },
              }}
            />
          </div>
        </div>

        {/* 4. Vehicle Type Distribution (Pie Chart) */}
        <div className="chart-card">
          <h2 className="chart-title">Vehicle Distribution</h2>
          <div style={{ height: "300px", display: "flex", justifyContent: "center" }}>
            {vehicleTypes && vehicleTypes.length > 0 ? (
              <Pie data={typeChartData} options={{ responsive: true, maintainAspectRatio: false }} />
            ) : (
              <div className="no-data">No vehicle data available</div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard

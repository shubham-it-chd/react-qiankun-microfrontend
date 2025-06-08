import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, LineChart, Line, PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import './Dashboard.css';

const Dashboard = ({ globalContext }) => {
  const [dashboardData, setDashboardData] = useState({
    salesData: [
      { name: 'Jan', sales: 4000, profit: 2400 },
      { name: 'Feb', sales: 3000, profit: 1398 },
      { name: 'Mar', sales: 2000, profit: 9800 },
      { name: 'Apr', sales: 2780, profit: 3908 },
      { name: 'May', sales: 1890, profit: 4800 },
      { name: 'Jun', sales: 2390, profit: 3800 },
    ],
    userActivity: [
      { name: 'Mobile', value: 60, color: '#667eea' },
      { name: 'Desktop', value: 30, color: '#764ba2' },
      { name: 'Tablet', value: 10, color: '#f093fb' },
    ],
    metrics: {
      totalUsers: 12459,
      revenue: 98743,
      orders: 1247,
      conversion: 3.2
    }
  });

  useEffect(() => {
    // Update shared data in Context7
    if (globalContext) {
      globalContext.actions.setSharedData({
        'micro-app-1': {
          lastUpdated: new Date().toISOString(),
          metrics: dashboardData.metrics,
          status: 'active'
        }
      });
    }
  }, [globalContext, dashboardData]);

  const handleRefreshData = () => {
    // Simulate data refresh
    setDashboardData(prev => ({
      ...prev,
      metrics: {
        ...prev.metrics,
        totalUsers: prev.metrics.totalUsers + Math.floor(Math.random() * 100),
        revenue: prev.metrics.revenue + Math.floor(Math.random() * 1000),
        orders: prev.metrics.orders + Math.floor(Math.random() * 10),
        conversion: (prev.metrics.conversion + (Math.random() - 0.5) * 0.5).toFixed(1)
      }
    }));
  };

  const theme = globalContext?.state?.theme || 'light';

  return (
    <div className={`dashboard theme-${theme}`}>
      <div className="dashboard-header">
        <h2>Analytics Dashboard</h2>
        <div className="dashboard-actions">
          <button onClick={handleRefreshData} className="refresh-btn">
            🔄 Refresh Data
          </button>
          {globalContext && (
            <div className="context7-indicator">
              <span className="indicator-dot"></span>
              Context7 Connected
            </div>
          )}
        </div>
      </div>

      <div className="metrics-grid">
        <div className="metric-card">
          <div className="metric-icon">👥</div>
          <div className="metric-content">
            <h3>{dashboardData.metrics.totalUsers.toLocaleString()}</h3>
            <p>Total Users</p>
          </div>
        </div>
        
        <div className="metric-card">
          <div className="metric-icon">💰</div>
          <div className="metric-content">
            <h3>${dashboardData.metrics.revenue.toLocaleString()}</h3>
            <p>Revenue</p>
          </div>
        </div>
        
        <div className="metric-card">
          <div className="metric-icon">📦</div>
          <div className="metric-content">
            <h3>{dashboardData.metrics.orders.toLocaleString()}</h3>
            <p>Orders</p>
          </div>
        </div>
        
        <div className="metric-card">
          <div className="metric-icon">📈</div>
          <div className="metric-content">
            <h3>{dashboardData.metrics.conversion}%</h3>
            <p>Conversion Rate</p>
          </div>
        </div>
      </div>

      <div className="charts-grid">
        <div className="chart-container">
          <h3>Sales & Profit Trends</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={dashboardData.salesData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="sales" fill="#667eea" />
              <Bar dataKey="profit" fill="#764ba2" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-container">
          <h3>User Activity by Device</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={dashboardData.userActivity}
                cx="50%"
                cy="50%"
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {dashboardData.userActivity.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="chart-container full-width">
        <h3>Revenue Trend</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={dashboardData.salesData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="profit" stroke="#667eea" strokeWidth={3} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {globalContext && (
        <div className="context7-data">
          <h3>Shared Context Data</h3>
          <div className="context-display">
            <pre>{JSON.stringify(globalContext.state.sharedData, null, 2)}</pre>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard; 
import React, { useEffect, useState } from 'react';
import { Users, Trophy, Coins, TrendingUp, Clock, DollarSign } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import StatCard from '../components/StatCard';
import { dashboardAPI } from '../services/api';
import { DashboardStats } from '../types';

const Dashboard: React.FC = () => {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  const fetchDashboardStats = async () => {
    try {
      const response = await dashboardAPI.getStats();
      setStats(response.data.dashboard);
    } catch (error) {
      console.error('Error fetching dashboard stats:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!stats) {
    return (
      <div className="text-center text-gray-400 py-12">
        Failed to load dashboard data
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Dashboard</h1>
        <p className="text-gray-400">Welcome to ArenaX Admin Panel</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <StatCard
          title="Total Users"
          value={stats.overview.totalUsers}
          icon={Users}
          color="blue"
        />
        <StatCard
          title="Active Users"
          value={stats.overview.activeUsers}
          icon={Users}
          color="green"
        />
        <StatCard
          title="Total Tournaments"
          value={stats.overview.totalTournaments}
          icon={Trophy}
          color="purple"
        />
        <StatCard
          title="Live Tournaments"
          value={stats.overview.liveTournaments}
          icon={Clock}
          color="orange"
        />
        <StatCard
          title="Pending Approval"
          value={stats.overview.pendingTournaments}
          icon={Clock}
          color="red"
        />
        <StatCard
          title="Coins in Circulation"
          value={stats.overview.totalCoinsInCirculation.toLocaleString()}
          icon={Coins}
          color="blue"
        />
        <StatCard
          title="Total Revenue (PKR)"
          value={`₨${stats.overview.totalRevenuePKR.toLocaleString()}`}
          icon={DollarSign}
          color="green"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50">
          <h3 className="text-xl font-bold text-white mb-4">User Growth (Last 30 Days)</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={stats.charts.userGrowth}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="_id" stroke="#9CA3AF" />
              <YAxis stroke="#9CA3AF" />
              <Tooltip
                contentStyle={{ backgroundColor: '#1F2937', border: '1px solid #374151', borderRadius: '8px' }}
                labelStyle={{ color: '#E5E7EB' }}
              />
              <Line type="monotone" dataKey="count" stroke="#3B82F6" strokeWidth={2} dot={{ fill: '#3B82F6' }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50">
          <h3 className="text-xl font-bold text-white mb-4">Coin Purchases (Last 30 Days)</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={stats.charts.coinPurchasesTrend}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="_id" stroke="#9CA3AF" />
              <YAxis stroke="#9CA3AF" />
              <Tooltip
                contentStyle={{ backgroundColor: '#1F2937', border: '1px solid #374151', borderRadius: '8px' }}
                labelStyle={{ color: '#E5E7EB' }}
              />
              <Bar dataKey="totalCoins" fill="#8B5CF6" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50">
          <h3 className="text-xl font-bold text-white mb-4">Top Coin Holders</h3>
          <div className="space-y-3">
            {stats.topCoinHolders.map((holder, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 bg-gray-700/30 rounded-lg hover:bg-gray-700/50 transition-colors"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold">
                    {index + 1}
                  </div>
                  <div>
                    <p className="text-white font-medium">{holder.username}</p>
                    <p className="text-gray-400 text-sm">{holder.userType}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-blue-400 font-bold">{holder.coinBalance.toLocaleString()}</p>
                  <p className="text-gray-400 text-sm">AX Coins</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50">
          <h3 className="text-xl font-bold text-white mb-4">Recent Transactions</h3>
          <div className="space-y-3">
            {stats.recentTransactions.slice(0, 5).map((transaction) => (
              <div
                key={transaction._id}
                className="flex items-center justify-between p-3 bg-gray-700/30 rounded-lg"
              >
                <div>
                  <p className="text-white text-sm font-medium">{transaction.description}</p>
                  <p className="text-gray-400 text-xs">{transaction.userId.username}</p>
                </div>
                <div className="text-right">
                  <p className={`font-bold ${transaction.transactionType === 'credit' ? 'text-green-400' : 'text-red-400'}`}>
                    {transaction.transactionType === 'credit' ? '+' : '-'}{transaction.amount}
                  </p>
                  <p className="text-gray-400 text-xs">{transaction.category}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

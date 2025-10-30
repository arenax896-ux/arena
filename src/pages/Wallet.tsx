import React, { useEffect, useState } from 'react';
import { Coins, TrendingUp, TrendingDown, DollarSign } from 'lucide-react';
import { transactionAPI } from '../services/api';
import StatCard from '../components/StatCard';

const Wallet: React.FC = () => {
  const [overview, setOverview] = useState<any>(null);
  const [transactions, setTransactions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [overviewRes, transactionsRes] = await Promise.all([
        transactionAPI.getWalletOverview(),
        transactionAPI.getAll({ limit: 50 })
      ]);
      setOverview(overviewRes.data.overview);
      setTransactions(transactionsRes.data.transactions);
    } catch (error) {
      console.error('Error fetching wallet data:', error);
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

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Coin Wallet Management</h1>
        <p className="text-gray-400">Monitor coin economy and transactions</p>
      </div>

      {overview && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            title="Total Distributed"
            value={overview.totalCoinsDistributed.toLocaleString()}
            icon={TrendingUp}
            color="green"
          />
          <StatCard
            title="Total Spent"
            value={overview.totalCoinsSpent.toLocaleString()}
            icon={TrendingDown}
            color="red"
          />
          <StatCard
            title="In Circulation"
            value={overview.totalCoinsInCirculation.toLocaleString()}
            icon={Coins}
            color="blue"
          />
          <StatCard
            title="Total Users"
            value={overview.totalUsers}
            icon={DollarSign}
            color="purple"
          />
        </div>
      )}

      <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50">
        <h3 className="text-xl font-bold text-white mb-4">Recent Transactions</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="text-left py-3 px-4 text-gray-400 font-medium">User</th>
                <th className="text-left py-3 px-4 text-gray-400 font-medium">Type</th>
                <th className="text-left py-3 px-4 text-gray-400 font-medium">Amount</th>
                <th className="text-left py-3 px-4 text-gray-400 font-medium">Category</th>
                <th className="text-left py-3 px-4 text-gray-400 font-medium">Description</th>
                <th className="text-left py-3 px-4 text-gray-400 font-medium">Date</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((transaction) => (
                <tr key={transaction._id} className="border-b border-gray-700/50 hover:bg-gray-700/30">
                  <td className="py-4 px-4">
                    <p className="text-white">{transaction.userId.username}</p>
                  </td>
                  <td className="py-4 px-4">
                    <span className={`px-2 py-1 rounded text-xs ${transaction.transactionType === 'credit' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                      {transaction.transactionType}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <p className={`font-bold ${transaction.transactionType === 'credit' ? 'text-green-400' : 'text-red-400'}`}>
                      {transaction.transactionType === 'credit' ? '+' : '-'}{transaction.amount}
                    </p>
                  </td>
                  <td className="py-4 px-4">
                    <p className="text-gray-300 text-sm">{transaction.category}</p>
                  </td>
                  <td className="py-4 px-4">
                    <p className="text-gray-300 text-sm">{transaction.description}</p>
                  </td>
                  <td className="py-4 px-4">
                    <p className="text-gray-400 text-sm">{new Date(transaction.createdAt).toLocaleString()}</p>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Wallet;

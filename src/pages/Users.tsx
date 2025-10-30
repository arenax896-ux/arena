import React, { useEffect, useState } from 'react';
import { Users as UsersIcon, Search, Eye, Ban, CheckCircle, Plus, Minus } from 'lucide-react';
import { userAPI } from '../services/api';
import { User } from '../types';

const Users: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [userTypeFilter, setUserTypeFilter] = useState('all');
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [showCoinModal, setShowCoinModal] = useState(false);
  const [coinData, setCoinData] = useState({
    amount: '',
    type: 'credit' as 'credit' | 'debit',
    description: '',
    paymentMethod: 'Admin',
    paymentReference: ''
  });

  useEffect(() => {
    fetchUsers();
  }, [userTypeFilter]);

  const fetchUsers = async () => {
    try {
      const params: any = {};
      if (userTypeFilter !== 'all') params.userType = userTypeFilter;
      if (search) params.search = search;

      const response = await userAPI.getAll(params);
      setUsers(response.data.users);
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (userId: string, status: string) => {
    try {
      await userAPI.updateStatus(userId, status);
      fetchUsers();
    } catch (error) {
      console.error('Error updating user status:', error);
    }
  };

  const handleCoinAdjustment = async () => {
    if (!selectedUser || !coinData.amount || !coinData.description) {
      alert('Please fill all required fields');
      return;
    }

    try {
      await userAPI.adjustCoins(selectedUser._id, {
        amount: parseInt(coinData.amount),
        type: coinData.type,
        description: coinData.description,
        paymentMethod: coinData.paymentMethod,
        paymentReference: coinData.paymentReference || undefined
      });

      setCoinData({
        amount: '',
        type: 'credit',
        description: '',
        paymentMethod: 'Admin',
        paymentReference: ''
      });
      setShowCoinModal(false);
      fetchUsers();
      alert('Coins adjusted successfully');
    } catch (error: any) {
      alert(error.response?.data?.message || 'Error adjusting coins');
    }
  };

  const getStatusBadge = (status: string) => {
    const badges: Record<string, { bg: string; text: string }> = {
      active: { bg: 'bg-green-500/20', text: 'text-green-400' },
      suspended: { bg: 'bg-yellow-500/20', text: 'text-yellow-400' },
      banned: { bg: 'bg-red-500/20', text: 'text-red-400' },
    };

    const badge = badges[status] || badges.active;
    return (
      <span className={`px-3 py-1 rounded-full text-xs font-medium ${badge.bg} ${badge.text}`}>
        {status.toUpperCase()}
      </span>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">User Management</h1>
          <p className="text-gray-400">Manage users and their coin balances</p>
        </div>
      </div>

      <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={20} />
            <input
              type="text"
              placeholder="Search users..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && fetchUsers()}
              className="w-full pl-10 pr-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
            />
          </div>

          <select
            value={userTypeFilter}
            onChange={(e) => setUserTypeFilter(e.target.value)}
            className="px-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
          >
            <option value="all">All Users</option>
            <option value="player">Players</option>
            <option value="organizer">Organizers</option>
          </select>
        </div>

        {loading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-700">
                  <th className="text-left py-3 px-4 text-gray-400 font-medium">User</th>
                  <th className="text-left py-3 px-4 text-gray-400 font-medium">Type</th>
                  <th className="text-left py-3 px-4 text-gray-400 font-medium">Coin Balance</th>
                  <th className="text-left py-3 px-4 text-gray-400 font-medium">Total Earned</th>
                  <th className="text-left py-3 px-4 text-gray-400 font-medium">Total Spent</th>
                  <th className="text-left py-3 px-4 text-gray-400 font-medium">Status</th>
                  <th className="text-left py-3 px-4 text-gray-400 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user._id} className="border-b border-gray-700/50 hover:bg-gray-700/30">
                    <td className="py-4 px-4">
                      <div>
                        <p className="text-white font-medium">{user.username}</p>
                        <p className="text-gray-400 text-sm">{user.email}</p>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <span className={`px-2 py-1 rounded text-xs ${user.userType === 'player' ? 'bg-blue-500/20 text-blue-400' : 'bg-purple-500/20 text-purple-400'}`}>
                        {user.userType}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <p className="text-blue-400 font-bold">{user.coinBalance.toLocaleString()} AX</p>
                    </td>
                    <td className="py-4 px-4">
                      <p className="text-green-400">{user.totalCoinsEarned.toLocaleString()}</p>
                    </td>
                    <td className="py-4 px-4">
                      <p className="text-red-400">{user.totalCoinsSpent.toLocaleString()}</p>
                    </td>
                    <td className="py-4 px-4">
                      {getStatusBadge(user.accountStatus)}
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => {
                            setSelectedUser(user);
                            setShowModal(true);
                          }}
                          className="p-2 rounded-lg bg-blue-500/20 text-blue-400 hover:bg-blue-500/30 transition-colors"
                          title="View Details"
                        >
                          <Eye size={18} />
                        </button>
                        <button
                          onClick={() => {
                            setSelectedUser(user);
                            setShowCoinModal(true);
                          }}
                          className="p-2 rounded-lg bg-green-500/20 text-green-400 hover:bg-green-500/30 transition-colors"
                          title="Adjust Coins"
                        >
                          <Plus size={18} />
                        </button>
                        {user.accountStatus === 'active' ? (
                          <button
                            onClick={() => handleStatusUpdate(user._id, 'suspended')}
                            className="p-2 rounded-lg bg-yellow-500/20 text-yellow-400 hover:bg-yellow-500/30 transition-colors"
                            title="Suspend"
                          >
                            <Ban size={18} />
                          </button>
                        ) : (
                          <button
                            onClick={() => handleStatusUpdate(user._id, 'active')}
                            className="p-2 rounded-lg bg-green-500/20 text-green-400 hover:bg-green-500/30 transition-colors"
                            title="Activate"
                          >
                            <CheckCircle size={18} />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {showModal && selectedUser && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-gray-700">
            <div className="sticky top-0 bg-gray-800 p-6 border-b border-gray-700 flex items-center justify-between">
              <h3 className="text-2xl font-bold text-white">User Details</h3>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                ✕
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-gray-400 text-sm">Username</p>
                  <p className="text-white font-medium">{selectedUser.username}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Email</p>
                  <p className="text-white">{selectedUser.email}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Full Name</p>
                  <p className="text-white">{selectedUser.fullName}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Phone</p>
                  <p className="text-white">{selectedUser.phoneNumber || 'N/A'}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">User Type</p>
                  <p className="text-white capitalize">{selectedUser.userType}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Status</p>
                  {getStatusBadge(selectedUser.accountStatus)}
                </div>
              </div>

              <div className="bg-gray-700/30 rounded-lg p-4">
                <h4 className="text-white font-bold mb-3">Coin Information</h4>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <p className="text-gray-400 text-sm">Current Balance</p>
                    <p className="text-blue-400 font-bold text-xl">{selectedUser.coinBalance.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Total Earned</p>
                    <p className="text-green-400 font-bold text-xl">{selectedUser.totalCoinsEarned.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Total Spent</p>
                    <p className="text-red-400 font-bold text-xl">{selectedUser.totalCoinsSpent.toLocaleString()}</p>
                  </div>
                </div>
              </div>

              <div className="bg-gray-700/30 rounded-lg p-4">
                <h4 className="text-white font-bold mb-3">Game Statistics</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-gray-400 text-sm">Tournaments Joined</p>
                    <p className="text-white font-medium">{selectedUser.gameStats.totalTournamentsJoined}</p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Tournaments Created</p>
                    <p className="text-white font-medium">{selectedUser.gameStats.totalTournamentsCreated}</p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Total Wins</p>
                    <p className="text-white font-medium">{selectedUser.gameStats.totalWins}</p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Total Kills</p>
                    <p className="text-white font-medium">{selectedUser.gameStats.totalKills}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {showCoinModal && selectedUser && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 rounded-xl max-w-md w-full border border-gray-700">
            <div className="p-6 border-b border-gray-700">
              <h3 className="text-2xl font-bold text-white">Adjust Coins</h3>
              <p className="text-gray-400 text-sm mt-1">{selectedUser.username} - Current Balance: {selectedUser.coinBalance} AX</p>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">Transaction Type</label>
                <select
                  value={coinData.type}
                  onChange={(e) => setCoinData({ ...coinData, type: e.target.value as 'credit' | 'debit' })}
                  className="w-full px-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                >
                  <option value="credit">Credit (Add Coins)</option>
                  <option value="debit">Debit (Remove Coins)</option>
                </select>
              </div>

              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">Amount</label>
                <input
                  type="number"
                  value={coinData.amount}
                  onChange={(e) => setCoinData({ ...coinData, amount: e.target.value })}
                  className="w-full px-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                  placeholder="Enter amount"
                />
              </div>

              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">Description</label>
                <textarea
                  value={coinData.description}
                  onChange={(e) => setCoinData({ ...coinData, description: e.target.value })}
                  className="w-full px-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                  rows={3}
                  placeholder="Enter reason for adjustment"
                />
              </div>

              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">Payment Method</label>
                <select
                  value={coinData.paymentMethod}
                  onChange={(e) => setCoinData({ ...coinData, paymentMethod: e.target.value })}
                  className="w-full px-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                >
                  <option value="Admin">Admin</option>
                  <option value="JazzCash">JazzCash</option>
                  <option value="Easypaisa">Easypaisa</option>
                  <option value="PayPal">PayPal</option>
                  <option value="Bank Transfer">Bank Transfer</option>
                </select>
              </div>

              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">Payment Reference (Optional)</label>
                <input
                  type="text"
                  value={coinData.paymentReference}
                  onChange={(e) => setCoinData({ ...coinData, paymentReference: e.target.value })}
                  className="w-full px-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                  placeholder="Transaction ID or reference"
                />
              </div>

              <div className="flex space-x-3 pt-4">
                <button
                  onClick={handleCoinAdjustment}
                  className="flex-1 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all"
                >
                  Confirm
                </button>
                <button
                  onClick={() => {
                    setShowCoinModal(false);
                    setCoinData({
                      amount: '',
                      type: 'credit',
                      description: '',
                      paymentMethod: 'Admin',
                      paymentReference: ''
                    });
                  }}
                  className="flex-1 py-2 bg-gray-700 text-white rounded-lg font-semibold hover:bg-gray-600 transition-all"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Users;

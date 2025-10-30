import React, { useEffect, useState } from 'react';
import { Trophy, Search, Eye, CheckCircle, XCircle, Trash2, Clock } from 'lucide-react';
import { tournamentAPI } from '../services/api';
import { Tournament } from '../types';

const Tournaments: React.FC = () => {
  const [tournaments, setTournaments] = useState<Tournament[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedTournament, setSelectedTournament] = useState<Tournament | null>(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchTournaments();
  }, [statusFilter]);

  const fetchTournaments = async () => {
    try {
      const params: any = {};
      if (statusFilter !== 'all') params.status = statusFilter;
      if (search) params.search = search;

      const response = await tournamentAPI.getAll(params);
      setTournaments(response.data.tournaments);
    } catch (error) {
      console.error('Error fetching tournaments:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (tournamentId: string, status: string, rejectionReason?: string) => {
    try {
      await tournamentAPI.updateStatus(tournamentId, status, rejectionReason);
      fetchTournaments();
      setShowModal(false);
      setSelectedTournament(null);
    } catch (error) {
      console.error('Error updating tournament status:', error);
    }
  };

  const handleDelete = async (tournamentId: string) => {
    if (window.confirm('Are you sure you want to delete this tournament?')) {
      try {
        await tournamentAPI.delete(tournamentId);
        fetchTournaments();
      } catch (error) {
        console.error('Error deleting tournament:', error);
      }
    }
  };

  const getStatusBadge = (status: string) => {
    const badges: Record<string, { bg: string; text: string }> = {
      pending: { bg: 'bg-yellow-500/20', text: 'text-yellow-400' },
      approved: { bg: 'bg-green-500/20', text: 'text-green-400' },
      live: { bg: 'bg-blue-500/20', text: 'text-blue-400' },
      completed: { bg: 'bg-gray-500/20', text: 'text-gray-400' },
      cancelled: { bg: 'bg-red-500/20', text: 'text-red-400' },
      rejected: { bg: 'bg-red-500/20', text: 'text-red-400' },
    };

    const badge = badges[status] || badges.pending;
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
          <h1 className="text-3xl font-bold text-white mb-2">Tournament Management</h1>
          <p className="text-gray-400">Manage and approve tournaments</p>
        </div>
      </div>

      <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={20} />
            <input
              type="text"
              placeholder="Search tournaments..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && fetchTournaments()}
              className="w-full pl-10 pr-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
            />
          </div>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="live">Live</option>
            <option value="completed">Completed</option>
            <option value="rejected">Rejected</option>
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
                  <th className="text-left py-3 px-4 text-gray-400 font-medium">Tournament</th>
                  <th className="text-left py-3 px-4 text-gray-400 font-medium">Organizer</th>
                  <th className="text-left py-3 px-4 text-gray-400 font-medium">Entry Fee</th>
                  <th className="text-left py-3 px-4 text-gray-400 font-medium">Prize Pool</th>
                  <th className="text-left py-3 px-4 text-gray-400 font-medium">Participants</th>
                  <th className="text-left py-3 px-4 text-gray-400 font-medium">Status</th>
                  <th className="text-left py-3 px-4 text-gray-400 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {tournaments.map((tournament) => (
                  <tr key={tournament._id} className="border-b border-gray-700/50 hover:bg-gray-700/30">
                    <td className="py-4 px-4">
                      <div>
                        <p className="text-white font-medium">{tournament.title}</p>
                        <p className="text-gray-400 text-sm">{tournament.gameType}</p>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <p className="text-white">{tournament.organizer.username}</p>
                    </td>
                    <td className="py-4 px-4">
                      <p className="text-blue-400 font-medium">{tournament.entryFee} AX</p>
                    </td>
                    <td className="py-4 px-4">
                      <p className="text-green-400 font-medium">{tournament.prizePool} AX</p>
                    </td>
                    <td className="py-4 px-4">
                      <p className="text-white">{tournament.currentParticipants}/{tournament.maxParticipants}</p>
                    </td>
                    <td className="py-4 px-4">
                      {getStatusBadge(tournament.status)}
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => {
                            setSelectedTournament(tournament);
                            setShowModal(true);
                          }}
                          className="p-2 rounded-lg bg-blue-500/20 text-blue-400 hover:bg-blue-500/30 transition-colors"
                          title="View Details"
                        >
                          <Eye size={18} />
                        </button>
                        {tournament.status === 'pending' && (
                          <>
                            <button
                              onClick={() => handleStatusUpdate(tournament._id, 'approved')}
                              className="p-2 rounded-lg bg-green-500/20 text-green-400 hover:bg-green-500/30 transition-colors"
                              title="Approve"
                            >
                              <CheckCircle size={18} />
                            </button>
                            <button
                              onClick={() => {
                                const reason = prompt('Enter rejection reason:');
                                if (reason) handleStatusUpdate(tournament._id, 'rejected', reason);
                              }}
                              className="p-2 rounded-lg bg-red-500/20 text-red-400 hover:bg-red-500/30 transition-colors"
                              title="Reject"
                            >
                              <XCircle size={18} />
                            </button>
                          </>
                        )}
                        <button
                          onClick={() => handleDelete(tournament._id)}
                          className="p-2 rounded-lg bg-red-500/20 text-red-400 hover:bg-red-500/30 transition-colors"
                          title="Delete"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {showModal && selectedTournament && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-gray-700">
            <div className="sticky top-0 bg-gray-800 p-6 border-b border-gray-700 flex items-center justify-between">
              <h3 className="text-2xl font-bold text-white">Tournament Details</h3>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <XCircle size={24} />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <p className="text-gray-400 text-sm">Title</p>
                <p className="text-white font-medium">{selectedTournament.title}</p>
              </div>
              <div>
                <p className="text-gray-400 text-sm">Description</p>
                <p className="text-white">{selectedTournament.description}</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-gray-400 text-sm">Game Type</p>
                  <p className="text-white">{selectedTournament.gameType}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Status</p>
                  {getStatusBadge(selectedTournament.status)}
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Entry Fee</p>
                  <p className="text-blue-400 font-bold">{selectedTournament.entryFee} AX Coins</p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Prize Pool</p>
                  <p className="text-green-400 font-bold">{selectedTournament.prizePool} AX Coins</p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Participants</p>
                  <p className="text-white">{selectedTournament.currentParticipants}/{selectedTournament.maxParticipants}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Scheduled Date</p>
                  <p className="text-white">{new Date(selectedTournament.scheduledDate).toLocaleString()}</p>
                </div>
              </div>
              <div>
                <p className="text-gray-400 text-sm">Organizer</p>
                <p className="text-white">{selectedTournament.organizer.username} ({selectedTournament.organizer.email})</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Tournaments;

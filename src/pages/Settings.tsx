import React, { useEffect, useState } from 'react';
import { Save, DollarSign } from 'lucide-react';
import { settingsAPI } from '../services/api';

const Settings: React.FC = () => {
  const [settings, setSettings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [conversionRate, setConversionRate] = useState('1');

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const response = await settingsAPI.getAll();
      setSettings(response.data.settings);
      const rateSetting = response.data.settings.find((s: any) => s.settingKey === 'coin_conversion_rate');
      if (rateSetting) setConversionRate(rateSetting.settingValue.toString());
    } catch (error) {
      console.error('Error fetching settings:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveConversionRate = async () => {
    try {
      await settingsAPI.update('coin_conversion_rate', parseFloat(conversionRate), '1 AX Coin = PKR conversion rate');
      alert('Conversion rate updated successfully');
      fetchSettings();
    } catch (error) {
      console.error('Error updating conversion rate:', error);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Settings</h1>
        <p className="text-gray-400">Configure platform settings</p>
      </div>

      <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50">
        <h3 className="text-xl font-bold text-white mb-4">Economy Settings</h3>

        <div className="space-y-4">
          <div>
            <label className="block text-gray-300 text-sm font-medium mb-2">
              Coin Conversion Rate (1 AX Coin = ? PKR)
            </label>
            <div className="flex items-center space-x-4">
              <div className="relative flex-1">
                <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={20} />
                <input
                  type="number"
                  value={conversionRate}
                  onChange={(e) => setConversionRate(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                  placeholder="1.0"
                  step="0.1"
                />
              </div>
              <button
                onClick={handleSaveConversionRate}
                className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transition-all flex items-center space-x-2"
              >
                <Save size={20} />
                <span>Save</span>
              </button>
            </div>
            <p className="text-gray-400 text-sm mt-2">
              Current rate: 1 AX Coin = {conversionRate} PKR
            </p>
          </div>
        </div>
      </div>

      <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50">
        <h3 className="text-xl font-bold text-white mb-4">Payment Gateway Settings</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gray-700/30 rounded-lg p-4">
            <h4 className="text-white font-medium mb-2">JazzCash</h4>
            <p className="text-gray-400 text-sm">Configure JazzCash payment integration</p>
            <div className="mt-3">
              <span className="px-3 py-1 rounded-full text-xs bg-green-500/20 text-green-400">Active</span>
            </div>
          </div>

          <div className="bg-gray-700/30 rounded-lg p-4">
            <h4 className="text-white font-medium mb-2">Easypaisa</h4>
            <p className="text-gray-400 text-sm">Configure Easypaisa payment integration</p>
            <div className="mt-3">
              <span className="px-3 py-1 rounded-full text-xs bg-green-500/20 text-green-400">Active</span>
            </div>
          </div>

          <div className="bg-gray-700/30 rounded-lg p-4">
            <h4 className="text-white font-medium mb-2">PayPal</h4>
            <p className="text-gray-400 text-sm">Configure PayPal payment integration</p>
            <div className="mt-3">
              <span className="px-3 py-1 rounded-full text-xs bg-yellow-500/20 text-yellow-400">Pending</span>
            </div>
          </div>

          <div className="bg-gray-700/30 rounded-lg p-4">
            <h4 className="text-white font-medium mb-2">Bank Transfer</h4>
            <p className="text-gray-400 text-sm">Configure bank transfer details</p>
            <div className="mt-3">
              <span className="px-3 py-1 rounded-full text-xs bg-green-500/20 text-green-400">Active</span>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50">
        <h3 className="text-xl font-bold text-white mb-4">Platform Information</h3>

        <div className="space-y-3">
          <div className="flex items-center justify-between py-3 border-b border-gray-700/50">
            <span className="text-gray-400">Platform Name</span>
            <span className="text-white font-medium">ArenaX</span>
          </div>
          <div className="flex items-center justify-between py-3 border-b border-gray-700/50">
            <span className="text-gray-400">Version</span>
            <span className="text-white font-medium">1.0.0</span>
          </div>
          <div className="flex items-center justify-between py-3 border-b border-gray-700/50">
            <span className="text-gray-400">Support Email</span>
            <span className="text-white font-medium">support@arenax.com</span>
          </div>
          <div className="flex items-center justify-between py-3">
            <span className="text-gray-400">Admin Panel Version</span>
            <span className="text-white font-medium">1.0.0</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;

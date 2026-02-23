import React, { useState } from 'react';
import { FaSave, FaCog, FaBell, FaShieldAlt, FaPalette, FaStore } from 'react-icons/fa';
import { toast } from 'react-toastify';
import Meta from '../components/Meta';
import CustomDropdown from '../components/CustomDropdown';

const SettingsScreen = () => {

  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('general');

  // General Settings
  const [generalSettings, setGeneralSettings] = useState({
    siteName: 'MearnSneakers',
    siteDescription: 'Premium sneakers and footwear',
    siteUrl: 'https://mearnsneakers.com',
    adminEmail: 'admin@mearnsneakers.com',
    supportEmail: 'support@mearnsneakers.com',
    phoneNumber: '+91 9876543210',
    address: '123 Fashion Street, Mumbai, Maharashtra 400001'
  });

  // Store Settings
  const [storeSettings, setStoreSettings] = useState({
    currency: 'INR',
    taxRate: 18,
    shippingCost: 0,
    freeShippingThreshold: 1000,
    returnPolicy: '30 days return policy',
    refundPolicy: 'Full refund within 30 days'
  });

  // Notification Settings
  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    orderNotifications: true,
    userNotifications: true,
    productNotifications: true,
    systemNotifications: true
  });

  // Security Settings
  const [securitySettings, setSecuritySettings] = useState({
    twoFactorAuth: false,
    sessionTimeout: 30,
    passwordPolicy: 'strong',
    loginAttempts: 5,
    ipWhitelist: false
  });

  // Appearance Settings
  const [appearanceSettings, setAppearanceSettings] = useState({
    theme: 'light',
    primaryColor: '#1f2937',
    secondaryColor: '#3b82f6',
    logoUrl: '/logo.svg',
    faviconUrl: '/favicon.ico'
  });

  const handleGeneralChange = (field, value) => {
    setGeneralSettings(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleStoreChange = (field, value) => {
    setStoreSettings(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleNotificationChange = (field, value) => {
    setNotificationSettings(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSecurityChange = (field, value) => {
    setSecuritySettings(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleAppearanceChange = (field, value) => {
    setAppearanceSettings(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = async (settingsType) => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      toast.success(`${settingsType} settings saved successfully!`);
    } catch (error) {
      toast.error('Failed to save settings');
    } finally {
      setLoading(false);
    }
  };

  const tabs = [
    { id: 'general', name: 'General', icon: FaCog },
    { id: 'store', name: 'Store', icon: FaStore },
    { id: 'notifications', name: 'Notifications', icon: FaBell },
    { id: 'security', name: 'Security', icon: FaShieldAlt },
    { id: 'appearance', name: 'Appearance', icon: FaPalette }
  ];

  const renderGeneralSettings = () => (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
        <div className="md:col-span-2 pb-4 border-b border-slate-dark/5">
          <span className="text-[10px] font-black text-slate-dark/40 uppercase tracking-[0.4em] italic">Identity Manifest</span>
        </div>
        <div className="space-y-2">
          <label className="text-[10px] font-black text-slate-dark uppercase tracking-widest pl-1">Site Identity</label>
          <input
            type="text"
            value={generalSettings.siteName}
            onChange={(e) => handleGeneralChange('siteName', e.target.value)}
            className="w-full bg-off-white-warm px-6 py-4 rounded-2xl font-bold text-slate-dark border-none focus:ring-4 focus:ring-slate-dark/5 transition-all outline-none"
          />
        </div>
        <div className="space-y-2">
          <label className="text-[10px] font-black text-slate-dark uppercase tracking-widest pl-1">Operational URL</label>
          <input
            type="url"
            value={generalSettings.siteUrl}
            onChange={(e) => handleGeneralChange('siteUrl', e.target.value)}
            className="w-full bg-off-white-warm px-6 py-4 rounded-2xl font-bold text-slate-dark border-none focus:ring-4 focus:ring-slate-dark/5 transition-all outline-none"
          />
        </div>
        <div className="md:col-span-2 space-y-2">
          <label className="text-[10px] font-black text-slate-dark uppercase tracking-widest pl-1">Executive Summary</label>
          <textarea
            value={generalSettings.siteDescription}
            onChange={(e) => handleGeneralChange('siteDescription', e.target.value)}
            rows={3}
            className="w-full bg-off-white-warm px-6 py-4 rounded-2xl font-bold text-slate-dark border-none focus:ring-4 focus:ring-slate-dark/5 transition-all outline-none resize-none"
          />
        </div>

        <div className="md:col-span-2 pt-8 pb-4 border-b border-slate-dark/5">
          <span className="text-[10px] font-black text-slate-dark/40 uppercase tracking-[0.4em] italic">Liaison Protocols</span>
        </div>
        <div className="space-y-2">
          <label className="text-[10px] font-black text-slate-dark uppercase tracking-widest pl-1">Administrative Link</label>
          <input
            type="email"
            value={generalSettings.adminEmail}
            onChange={(e) => handleGeneralChange('adminEmail', e.target.value)}
            className="w-full bg-off-white-warm px-6 py-4 rounded-2xl font-bold text-slate-dark border-none focus:ring-4 focus:ring-slate-dark/5 transition-all outline-none"
          />
        </div>
        <div className="space-y-2">
          <label className="text-[10px] font-black text-slate-dark uppercase tracking-widest pl-1">Support Channel</label>
          <input
            type="email"
            value={generalSettings.supportEmail}
            onChange={(e) => handleGeneralChange('supportEmail', e.target.value)}
            className="w-full bg-off-white-warm px-6 py-4 rounded-2xl font-bold text-slate-dark border-none focus:ring-4 focus:ring-slate-dark/5 transition-all outline-none"
          />
        </div>
        <div className="space-y-2">
          <label className="text-[10px] font-black text-slate-dark uppercase tracking-widest pl-1">Hotline Registry</label>
          <input
            type="tel"
            value={generalSettings.phoneNumber}
            onChange={(e) => handleGeneralChange('phoneNumber', e.target.value)}
            className="w-full bg-off-white-warm px-6 py-4 rounded-2xl font-bold text-slate-dark border-none focus:ring-4 focus:ring-slate-dark/5 transition-all outline-none"
          />
        </div>
        <div className="space-y-2">
          <label className="text-[10px] font-black text-slate-dark uppercase tracking-widest pl-1">Physical Archive</label>
          <textarea
            value={generalSettings.address}
            onChange={(e) => handleGeneralChange('address', e.target.value)}
            rows={2}
            className="w-full bg-off-white-warm px-6 py-4 rounded-2xl font-bold text-slate-dark border-none focus:ring-4 focus:ring-slate-dark/5 transition-all outline-none resize-none"
          />
        </div>
      </div>
    </div>
  );

  const renderStoreSettings = () => (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
        <div className="md:col-span-2 pb-4 border-b border-slate-dark/5">
          <span className="text-[10px] font-black text-slate-dark/40 uppercase tracking-[0.4em] italic">Fiscal Architecture</span>
        </div>
        <div className="space-y-2">
          <label className="text-[10px] font-black text-slate-dark uppercase tracking-widest pl-1">Primary Currency</label>
          <CustomDropdown
            options={[
              { label: 'Indian Rupee (₹)', value: 'INR' },
              { label: 'US Dollar ($)', value: 'USD' },
              { label: 'Euro (€)', value: 'EUR' },
            ]}
            value={storeSettings.currency}
            onChange={(val) => handleStoreChange('currency', val)}
            className="w-full !p-0 !bg-transparent !border-none !shadow-none"
          />
        </div>
        <div className="space-y-2">
          <label className="text-[10px] font-black text-slate-dark uppercase tracking-widest pl-1">Fiscal Tax Percentage</label>
          <input
            type="number"
            value={storeSettings.taxRate}
            onChange={(e) => handleStoreChange('taxRate', parseFloat(e.target.value))}
            className="w-full bg-off-white-warm px-6 py-4 rounded-2xl font-bold text-slate-dark border-none focus:ring-4 focus:ring-slate-dark/5 transition-all outline-none"
          />
        </div>
        <div className="space-y-2">
          <label className="text-[10px] font-black text-slate-dark uppercase tracking-widest pl-1">Logistics Overhead</label>
          <input
            type="number"
            value={storeSettings.shippingCost}
            onChange={(e) => handleStoreChange('shippingCost', parseFloat(e.target.value))}
            className="w-full bg-off-white-warm px-6 py-4 rounded-2xl font-bold text-slate-dark border-none focus:ring-4 focus:ring-slate-dark/5 transition-all outline-none"
          />
        </div>
        <div className="space-y-2">
          <label className="text-[10px] font-black text-slate-dark uppercase tracking-widest pl-1">Gratis Threshold</label>
          <input
            type="number"
            value={storeSettings.freeShippingThreshold}
            onChange={(e) => handleStoreChange('freeShippingThreshold', parseFloat(e.target.value))}
            className="w-full bg-off-white-warm px-6 py-4 rounded-2xl font-bold text-slate-dark border-none focus:ring-4 focus:ring-slate-dark/5 transition-all outline-none"
          />
        </div>

        <div className="md:col-span-2 pt-8 pb-4 border-b border-slate-dark/5">
          <span className="text-[10px] font-black text-slate-dark/40 uppercase tracking-[0.4em] italic">Governance Manifestos</span>
        </div>
        <div className="md:col-span-2 space-y-2">
          <label className="text-[10px] font-black text-slate-dark uppercase tracking-widest pl-1">Reciprocity Policy</label>
          <textarea
            value={storeSettings.returnPolicy}
            onChange={(e) => handleStoreChange('returnPolicy', e.target.value)}
            rows={3}
            className="w-full bg-off-white-warm px-6 py-4 rounded-2xl font-bold text-slate-dark border-none focus:ring-4 focus:ring-slate-dark/5 transition-all outline-none resize-none"
          />
        </div>
        <div className="md:col-span-2 space-y-2">
          <label className="text-[10px] font-black text-slate-dark uppercase tracking-widest pl-1">Restitution Protocol</label>
          <textarea
            value={storeSettings.refundPolicy}
            onChange={(e) => handleStoreChange('refundPolicy', e.target.value)}
            rows={3}
            className="w-full bg-off-white-warm px-6 py-4 rounded-2xl font-bold text-slate-dark border-none focus:ring-4 focus:ring-slate-dark/5 transition-all outline-none resize-none"
          />
        </div>
      </div>
    </div>
  );

  const renderNotificationSettings = () => (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="space-y-8">
        <div className="pb-4 border-b border-slate-dark/5">
          <span className="text-[10px] font-black text-slate-dark/40 uppercase tracking-[0.4em] italic">Information Streams</span>
        </div>
        <div className="grid grid-cols-1 gap-6">
          {Object.entries(notificationSettings).map(([key, value]) => (
            <div key={key} className="flex items-center justify-between p-8 bg-off-white-warm rounded-[32px] group hover:bg-slate-dark/5 transition-all">
              <div className="space-y-1">
                <label className="text-[11px] font-black text-slate-dark uppercase tracking-widest">
                  {key.replace(/([A-Z])/g, ' $1').trim()}
                </label>
                <p className="text-[10px] font-bold text-slate-dark/30 uppercase tracking-tight italic">
                  {key === 'emailNotifications' && 'Global dispatch of system updates'}
                  {key === 'orderNotifications' && 'Inbound market logistics alerts'}
                  {key === 'userNotifications' && 'Identity cohort registration monitoring'}
                  {key === 'productNotifications' && 'Archive inventory variance reports'}
                  {key === 'systemNotifications' && 'Core manifest synchronization status'}
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={value}
                  onChange={(e) => handleNotificationChange(key, e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-14 h-8 bg-slate-dark/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-6 peer-checked:after:border-white after:content-[''] after:absolute after:top-1 after:left-1 after:bg-white after:border-slate-dark/10 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-slate-dark"></div>
              </label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderSecuritySettings = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Authentication & Security</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <label className="text-sm font-medium text-gray-700">Two-Factor Authentication</label>
              <p className="text-xs text-gray-500">Add an extra layer of security to your account</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={securitySettings.twoFactorAuth}
                onChange={(e) => handleSecurityChange('twoFactorAuth', e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Session Timeout (minutes)</label>
            <input
              type="number"
              value={securitySettings.sessionTimeout}
              onChange={(e) => handleSecurityChange('sessionTimeout', parseInt(e.target.value))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Password Policy</label>
            <CustomDropdown
              options={[
                { label: 'Basic (6+ characters)', value: 'basic' },
                { label: 'Strong (8+ chars, numbers, symbols)', value: 'strong' },
                { label: 'Very Strong (12+ chars, mixed case, numbers, symbols)', value: 'very-strong' },
              ]}
              value={securitySettings.passwordPolicy}
              onChange={(val) => handleSecurityChange('passwordPolicy', val)}
              className="w-full !p-0 !bg-transparent !border-none !shadow-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Max Login Attempts</label>
            <input
              type="number"
              value={securitySettings.loginAttempts}
              onChange={(e) => handleSecurityChange('loginAttempts', parseInt(e.target.value))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>
    </div>
  );

  const renderAppearanceSettings = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Theme & Colors</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Theme</label>
            <CustomDropdown
              options={[
                { label: 'Light', value: 'light' },
                { label: 'Dark', value: 'dark' },
                { label: 'Auto', value: 'auto' },
              ]}
              value={appearanceSettings.theme}
              onChange={(val) => handleAppearanceChange('theme', val)}
              className="w-full !p-0 !bg-transparent !border-none !shadow-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Primary Color</label>
            <input
              type="color"
              value={appearanceSettings.primaryColor}
              onChange={(e) => handleAppearanceChange('primaryColor', e.target.value)}
              className="w-full h-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Secondary Color</label>
            <input
              type="color"
              value={appearanceSettings.secondaryColor}
              onChange={(e) => handleAppearanceChange('secondaryColor', e.target.value)}
              className="w-full h-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Logo URL</label>
            <input
              type="url"
              value={appearanceSettings.logoUrl}
              onChange={(e) => handleAppearanceChange('logoUrl', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>
    </div>
  );

  const renderActiveTab = () => {
    switch (activeTab) {
      case 'general':
        return renderGeneralSettings();
      case 'store':
        return renderStoreSettings();
      case 'notifications':
        return renderNotificationSettings();
      case 'security':
        return renderSecuritySettings();
      case 'appearance':
        return renderAppearanceSettings();
      default:
        return renderGeneralSettings();
    }
  };

  return (
    <>
      <Meta title="Configuration Registry | Mearn Admin" />
      <div className="max-w-[1600px] mx-auto px-4 py-12 pb-32">
        {/* Editorial Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8 border-b border-slate-dark/5 pb-12">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-[2px] bg-slate-dark/20"></div>
              <span className="text-[11px] font-black tracking-[0.5em] text-slate-dark/40 uppercase">System Calibration</span>
            </div>
            <h1 className="text-7xl font-black text-slate-dark tracking-tighter uppercase leading-none">
              Control <span className="text-slate-dark/20">Panel</span>
            </h1>
            <p className="text-xs font-bold text-slate-dark/50 tracking-widest uppercase">
              Operational manifests and core system <span className="text-slate-dark">parameters.</span>
            </p>
          </div>
          <div className="text-right">
            <button
              onClick={() => handleSave(activeTab)}
              disabled={loading}
              className="bg-slate-dark text-white px-10 py-5 rounded-full font-black text-[10px] uppercase tracking-[0.3em] hover:bg-black transition-all shadow-xl flex items-center gap-3 active:scale-95 disabled:opacity-50 disabled:scale-100"
            >
              <FaSave className="text-xs" />
              {loading ? 'Synchronizing...' : 'Commit Changes'}
            </button>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-20">
          {/* Registry Navigation */}
          <div className="lg:w-80 shrink-0">
            <div className="sticky top-12 space-y-12">
              <div className="space-y-4">
                <span className="text-[10px] font-black text-slate-dark/30 uppercase tracking-[0.4em] px-4">Registry Sections</span>
                <nav className="space-y-2">
                  {tabs.map((tab) => {
                    const Icon = tab.icon;
                    const isActive = activeTab === tab.id;
                    return (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl transition-all duration-300 group ${isActive
                          ? 'bg-slate-dark text-white shadow-2xl shadow-slate-dark/20 -translate-x-2'
                          : 'text-slate-dark/40 hover:bg-slate-dark/5 hover:text-slate-dark hover:-translate-x-1'
                          }`}
                      >
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${isActive ? 'bg-white/10' : 'bg-slate-dark/5 group-hover:bg-slate-dark/10'}`}>
                          <Icon className="text-sm" />
                        </div>
                        <span className="text-[11px] font-black uppercase tracking-widest">{tab.name}</span>
                      </button>
                    );
                  })}
                </nav>
              </div>

              <div className="p-8 bg-off-white-warm rounded-[32px] space-y-2 border border-slate-dark/5">
                <p className="text-[9px] font-black text-slate-dark/20 uppercase tracking-[0.3em]">Operational Status</p>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-[10px] font-black text-slate-dark uppercase tracking-widest italic">All Systems Nominal</span>
                </div>
              </div>
            </div>
          </div>

          {/* Configuration Manifest */}
          <div className="flex-1">
            <div className="bg-white rounded-[40px] shadow-2xl shadow-slate-dark/5 border border-slate-dark/5 overflow-hidden">
              <div className="p-12 space-y-12">
                <div className="flex items-center gap-6 pb-8 border-b border-slate-dark/5">
                  <div className="w-16 h-16 bg-off-white-warm rounded-3xl flex items-center justify-center text-slate-dark">
                    {tabs.find(t => t.id === activeTab)?.icon({ className: 'text-2xl' })}
                  </div>
                  <div>
                    <h2 className="text-2xl font-black text-slate-dark uppercase tracking-tight">{activeTab} Protocol</h2>
                    <p className="text-[10px] font-bold text-slate-dark/30 uppercase tracking-[0.2em]">Configuring primary system manifest</p>
                  </div>
                </div>

                <div className="registry-form-content">
                  {renderActiveTab()}
                </div>
              </div>
            </div>

            {/* Context Footer */}
            <div className="mt-12 px-12 py-8 bg-slate-dark/5 rounded-[32px] border border-dashed border-slate-dark/10 flex items-center justify-between">
              <div className="flex items-center gap-4 text-slate-dark/40 italic">
                <FaStore className="text-sm" />
                <span className="text-[10px] font-bold uppercase tracking-widest">Global Node: {generalSettings.siteName}</span>
              </div>
              <span className="text-[10px] font-black text-slate-dark/20 uppercase tracking-widest italic">Archived at: {new Date().toLocaleTimeString()}</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SettingsScreen;

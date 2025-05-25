import React, { useState, useEffect } from 'react';
import { Calendar, Clock, Phone, MessageCircle, Bell, Plus, X, CheckCircle, AlertCircle, Users, Activity, Settings, Send, MapPin, Star, Gift, Globe, FileText, Stethoscope, Heart, Award, Navigation, Zap, Target, Sparkles, Timer, UserCheck } from 'lucide-react';

const AdvancedHealthcareSystem = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [patients, setPatients] = useState([
    {
      id: 1,
      name: 'Sarah Johnson',
      phone: '+1-555-0123',
      email: 'sarah.j@email.com',
      language: 'English',
      lastVisit: '2024-05-20',
      nextFollowUp: '2024-05-30',
      condition: 'Hypertension Follow-up',
      preferredContact: 'whatsapp',
      status: 'pending',
      adherenceScore: 85,
      location: 'New York, NY',
      family: ['John Johnson (Spouse)', 'Emma Johnson (Daughter)'],
      customReminders: { time: '09:00', frequency: 'weekly' },
      recurringTreatments: ['Blood Pressure Check - Monthly', 'Lab Work - Quarterly'],
      completedSurveys: 3,
      isVIP: true
    },
    {
      id: 2,
      name: 'Michael Chen',
      phone: '+1-555-0456',
      email: 'mchen@email.com',
      language: 'Mandarin',
      lastVisit: '2024-05-18',
      nextFollowUp: '2024-05-28',
      condition: 'Diabetes Management',
      preferredContact: 'sms',
      status: 'sent',
      adherenceScore: 92,
      location: 'San Francisco, CA',
      family: ['Lisa Chen (Wife)'],
      customReminders: { time: '08:00', frequency: 'daily' },
      recurringTreatments: ['HbA1c Test - Every 3 months', 'Eye Exam - Annually'],
      completedSurveys: 5,
      isVIP: false
    },
    {
      id: 3,
      name: 'Emma Wilson',
      phone: '+1-555-0789',
      email: 'emma.w@email.com',
      language: 'Spanish',
      lastVisit: '2024-05-15',
      nextFollowUp: '2024-05-26',
      condition: 'Post-Surgery Recovery',
      preferredContact: 'email',
      status: 'confirmed',
      adherenceScore: 78,
      location: 'Miami, FL',
      family: [],
      customReminders: { time: '10:00', frequency: 'daily' },
      recurringTreatments: ['Physical Therapy - 3x weekly'],
      completedSurveys: 2,
      isVIP: false
    }
  ]);

  const [waitlist, setWaitlist] = useState([
    { id: 1, patientName: 'David Kim', preferredDate: '2024-05-25', priority: 'high', waitingSince: '2024-05-20' },
    { id: 2, patientName: 'Maria Garcia', preferredDate: '2024-05-27', priority: 'medium', waitingSince: '2024-05-21' }
  ]);

  const [doctorAvailability, setDoctorAvailability] = useState([
    { date: '2024-05-26', slots: ['09:00', '10:30', '14:00', '15:30'] },
    { date: '2024-05-27', slots: ['08:30', '11:00', '16:00'] },
    { date: '2024-05-28', slots: ['09:30', '13:00', '17:00'] }
  ]);

  const [healthTips, setHealthTips] = useState([
    { id: 1, condition: 'Hypertension', tip: 'Reduce sodium intake to less than 2,300mg per day', sent: false },
    { id: 2, condition: 'Diabetes', tip: 'Monitor blood sugar levels before and after meals', sent: false },
    { id: 3, condition: 'Post-Surgery', tip: 'Keep incision site clean and dry', sent: true }
  ]);
  
  const [showAddPatient, setShowAddPatient] = useState(false);
  const [showWaitlistModal, setShowWaitlistModal] = useState(false);
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null);
  
  const [newPatient, setNewPatient] = useState({
    name: '',
    phone: '',
    email: '',
    condition: '',
    followUpDate: '',
    preferredContact: 'sms',
    language: 'English',
    location: '',
    family: '',
    customTime: '09:00',
    frequency: 'weekly'
  });
  
  const [notifications, setNotifications] = useState([]);
  const [gamificationData, setGamificationData] = useState({
    doctorScore: 87,
    patientsHelped: 156,
    adherenceImprovement: 23,
    rewardsDistributed: 12
  });

  // Simulate real-time notifications and updates
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const randomPatient = patients[Math.floor(Math.random() * patients.length)];
      
      if (Math.random() > 0.8) { // 20% chance every 3 seconds
        const activities = [
          `${randomPatient.name} confirmed appointment`,
          `Health tip sent to ${randomPatient.name}`,
          `Survey completed by ${randomPatient.name}`,
          `Reminder sent via ${randomPatient.preferredContact.toUpperCase()}`,
          `${randomPatient.name} earned adherence points`,
          `Waitlist updated - new patient added`
        ];
        
        const newNotification = {
          id: Date.now(),
          message: activities[Math.floor(Math.random() * activities.length)],
          time: now.toLocaleTimeString(),
          type: 'success'
        };
        setNotifications(prev => [newNotification, ...prev.slice(0, 6)]);
      }
    }, 3000);
    
    return () => clearInterval(interval);
  }, [patients]);

  const addPatient = () => {
    if (newPatient.name && newPatient.phone && newPatient.followUpDate) {
      const patient = {
        id: Date.now(),
        ...newPatient,
        lastVisit: new Date().toISOString().split('T')[0],
        nextFollowUp: newPatient.followUpDate,
        status: 'pending',
        adherenceScore: Math.floor(Math.random() * 40) + 60,
        family: newPatient.family ? newPatient.family.split(',').map(f => f.trim()) : [],
        customReminders: { time: newPatient.customTime, frequency: newPatient.frequency },
        recurringTreatments: [],
        completedSurveys: 0,
        isVIP: false
      };
      setPatients([...patients, patient]);
      setNewPatient({
        name: '', phone: '', email: '', condition: '', followUpDate: '',
        preferredContact: 'sms', language: 'English', location: '',
        family: '', customTime: '09:00', frequency: 'weekly'
      });
      setShowAddPatient(false);
    }
  };

  const sendReminder = (patientId, type = 'standard') => {
    setPatients(patients.map(p => 
      p.id === patientId ? { ...p, status: 'sent' } : p
    ));
    
    const patient = patients.find(p => p.id === patientId);
    const messages = {
      standard: `Standard reminder sent to ${patient.name}`,
      health_tip: `Health tip sent to ${patient.name}`,
      survey: `Post-visit survey sent to ${patient.name}`,
      family: `Family reminder sent for ${patient.name}`
    };
    
    setNotifications(prev => [{
      id: Date.now(),
      message: messages[type] || messages.standard,
      time: new Date().toLocaleTimeString(),
      type: 'success'
    }, ...prev.slice(0, 6)]);
  };

  const getLanguageFlag = (language) => {
    const flags = {
      'English': '🇺🇸',
      'Spanish': '🇪🇸',
      'Mandarin': '🇨🇳',
      'French': '🇫🇷',
      'German': '🇩🇪',
      'Hindi': '🇮🇳'
    };
    return flags[language] || '🌐';
  };

  const getAdherenceColor = (score) => {
    if (score >= 90) return 'text-green-600 bg-green-100';
    if (score >= 70) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  const stats = {
    totalPatients: patients.length,
    pendingReminders: patients.filter(p => p.status === 'pending').length,
    averageAdherence: Math.round(patients.reduce((acc, p) => acc + p.adherenceScore, 0) / patients.length),
    surveysCompleted: patients.reduce((acc, p) => acc + p.completedSurveys, 0),
    waitlistCount: waitlist.length,
    vipPatients: patients.filter(p => p.isVIP).length
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Enhanced Header */}
      <header className="bg-white shadow-lg border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                <Stethoscope className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  HealthFlow Pro
                </h1>
                <p className="text-sm text-gray-600">Advanced Patient Management System</p>
              </div>
              <div className="flex items-center space-x-2 bg-gradient-to-r from-green-500 to-green-600 text-white px-3 py-1 rounded-full">
                <Award className="w-4 h-4" />
                <span className="text-sm font-medium">Score: {gamificationData.doctorScore}</span>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Bell className="w-6 h-6 text-gray-600" />
                {notifications.length > 0 && (
                  <div className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
                    <span className="text-xs text-white font-bold">{notifications.length}</span>
                  </div>
                )}
              </div>
              <Globe className="w-6 h-6 text-gray-600" />
              <div className="w-8 h-8 bg-gradient-to-r from-green-400 to-blue-500 rounded-full"></div>
            </div>
          </div>
        </div>
      </header>

      {/* Enhanced Navigation */}
      <nav className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex space-x-8 overflow-x-auto">
            {[
              { id: 'dashboard', label: 'Dashboard', icon: Activity },
              { id: 'patients', label: 'Patients', icon: Users },
              { id: 'reminders', label: 'Smart Reminders', icon: Bell },
              { id: 'waitlist', label: 'Waitlist', icon: Clock },
              { id: 'scheduling', label: 'Scheduling', icon: Calendar },
              { id: 'analytics', label: 'Analytics', icon: Target },
              { id: 'settings', label: 'Settings', icon: Settings }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-4 py-4 border-b-2 transition-all duration-300 whitespace-nowrap ${
                  activeTab === tab.id 
                    ? 'border-blue-500 text-blue-600' 
                    : 'border-transparent text-gray-600 hover:text-blue-600'
                }`}
              >
                <tab.icon className="w-5 h-5" />
                <span className="font-medium">{tab.label}</span>
              </button>
            ))}
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {activeTab === 'dashboard' && (
          <div className="space-y-8">
            {/* Enhanced Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-6">
              {[
                { label: 'Total Patients', value: stats.totalPatients, icon: Users, color: 'from-blue-500 to-blue-600' },
                { label: 'Avg Adherence', value: `${stats.averageAdherence}%`, icon: Target, color: 'from-green-500 to-green-600' },
                { label: 'Pending Reminders', value: stats.pendingReminders, icon: Clock, color: 'from-amber-500 to-orange-600' },
                { label: 'Surveys Done', value: stats.surveysCompleted, icon: FileText, color: 'from-purple-500 to-purple-600' },
                { label: 'Waitlist', value: stats.waitlistCount, icon: Timer, color: 'from-red-500 to-red-600' },
                { label: 'VIP Patients', value: stats.vipPatients, icon: Star, color: 'from-yellow-500 to-yellow-600' }
              ].map((stat, index) => (
                <div key={index} className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-600 text-sm font-medium">{stat.label}</p>
                      <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                    </div>
                    <div className={`w-10 h-10 bg-gradient-to-r ${stat.color} rounded-xl flex items-center justify-center`}>
                      <stat.icon className="w-5 h-5 text-white" />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Gamification Dashboard */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-gradient-to-br from-purple-600 to-blue-600 rounded-2xl shadow-lg p-6 text-white">
                <h3 className="text-xl font-bold mb-4 flex items-center">
                  <Sparkles className="w-6 h-6 mr-2" />
                  Doctor Performance
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold">{gamificationData.doctorScore}</div>
                    <div className="text-purple-200 text-sm">Overall Score</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold">{gamificationData.patientsHelped}</div>
                    <div className="text-purple-200 text-sm">Patients Helped</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold">{gamificationData.adherenceImprovement}%</div>
                    <div className="text-purple-200 text-sm">Adherence Boost</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold">{gamificationData.rewardsDistributed}</div>
                    <div className="text-purple-200 text-sm">Rewards Given</div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                  <Activity className="w-6 h-6 mr-2 text-blue-600" />
                  Live Activity Feed
                </h3>
                <div className="space-y-3 max-h-64 overflow-y-auto">
                  {notifications.length === 0 ? (
                    <p className="text-gray-500 text-center py-8">Monitoring system activity...</p>
                  ) : (
                    notifications.map(notification => (
                      <div key={notification.id} className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg border border-green-200 animate-fade-in">
                        <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                        <div className="flex-1 min-w-0">
                          <p className="text-green-800 font-medium text-sm truncate">{notification.message}</p>
                          <p className="text-green-600 text-xs">{notification.time}</p>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'patients' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">Advanced Patient Management</h2>
              <button
                onClick={() => setShowAddPatient(true)}
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl font-medium hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 flex items-center space-x-2"
              >
                <Plus className="w-5 h-5" />
                <span>Add Patient</span>
              </button>
            </div>

            {/* Enhanced Patient Cards */}
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {patients.map(patient => (
                <div key={patient.id} className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 relative">
                  {patient.isVIP && (
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center">
                      <Star className="w-4 h-4 text-white" />
                    </div>
                  )}
                  
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <div className="flex items-center space-x-2">
                        <h3 className="text-lg font-bold text-gray-900">{patient.name}</h3>
                        <span className="text-lg">{getLanguageFlag(patient.language)}</span>
                      </div>
                      <p className="text-gray-600 text-sm">{patient.condition}</p>
                    </div>
                    <div className={`px-2 py-1 rounded-full text-xs font-bold ${getAdherenceColor(patient.adherenceScore)}`}>
                      {patient.adherenceScore}%
                    </div>
                  </div>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <MapPin className="w-4 h-4" />
                      <span>{patient.location}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <Calendar className="w-4 h-4" />
                      <span>Next: {patient.nextFollowUp}</span>
                    </div>
                    {patient.family.length > 0 && (
                      <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <Users className="w-4 h-4" />
                        <span>{patient.family.length} family members</span>
                      </div>
                    )}
                  </div>

                  {/* Recurring Treatments */}
                  {patient.recurringTreatments.length > 0 && (
                    <div className="mb-4">
                      <p className="text-xs font-medium text-gray-700 mb-2">Recurring Treatments:</p>
                      <div className="space-y-1">
                        {patient.recurringTreatments.map((treatment, idx) => (
                          <div key={idx} className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded">
                            {treatment}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  <div className="flex space-x-2">
                    <button
                      onClick={() => sendReminder(patient.id, 'standard')}
                      className="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 text-white py-2 px-3 rounded-lg font-medium hover:shadow-lg transition-all duration-300 flex items-center justify-center space-x-1 text-sm"
                    >
                      <Send className="w-3 h-3" />
                      <span>Remind</span>
                    </button>
                    <button
                      onClick={() => sendReminder(patient.id, 'health_tip')}
                      className="flex-1 bg-gradient-to-r from-green-500 to-green-600 text-white py-2 px-3 rounded-lg font-medium hover:shadow-lg transition-all duration-300 flex items-center justify-center space-x-1 text-sm"
                    >
                      <Heart className="w-3 h-3" />
                      <span>Health Tip</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'waitlist' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">Waitlist Management</h2>
              <button
                onClick={() => setShowWaitlistModal(true)}
                className="bg-gradient-to-r from-orange-500 to-red-600 text-white px-6 py-3 rounded-xl font-medium hover:shadow-lg transition-all duration-300 flex items-center space-x-2"
              >
                <Plus className="w-5 h-5" />
                <span>Add to Waitlist</span>
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {waitlist.map(item => (
                <div key={item.id} className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all duration-300">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-lg font-bold text-gray-900">{item.patientName}</h3>
                      <p className="text-gray-600 text-sm">Preferred: {item.preferredDate}</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      item.priority === 'high' ? 'bg-red-100 text-red-800' :
                      item.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {item.priority} priority
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-4">Waiting since: {item.waitingSince}</p>
                  <button className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-2 px-4 rounded-lg font-medium hover:shadow-lg transition-all duration-300">
                    Schedule Appointment
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'scheduling' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Doctor Availability & Scheduling</h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {doctorAvailability.map(day => (
                <div key={day.date} className="bg-white rounded-2xl shadow-lg p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">{day.date}</h3>
                  <div className="space-y-2">
                    {day.slots.map(slot => (
                      <div key={slot} className="flex justify-between items-center p-3 bg-green-50 rounded-lg border border-green-200">
                        <span className="font-medium text-green-800">{slot}</span>
                        <button className="bg-green-600 text-white px-3 py-1 rounded-lg text-sm font-medium hover:bg-green-700 transition-colors">
                          Book
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'analytics' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Analytics & Insights</h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Patient Adherence Trends</h3>
                <div className="space-y-4">
                  {patients.map(patient => (
                    <div key={patient.id} className="flex items-center justify-between">
                      <span className="text-gray-700">{patient.name}</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-32 bg-gray-200 rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full ${
                              patient.adherenceScore >= 90 ? 'bg-green-500' :
                              patient.adherenceScore >= 70 ? 'bg-yellow-500' : 'bg-red-500'
                            }`}
                            style={{ width: `${patient.adherenceScore}%` }}
                          ></div>
                        </div>
                        <span className="text-sm font-medium">{patient.adherenceScore}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Survey Completion Rate</h3>
                <div className="text-center">
                  <div className="text-4xl font-bold text-blue-600 mb-2">
                    {Math.round((stats.surveysCompleted / (patients.length * 2)) * 100)}%
                  </div>
                  <p className="text-gray-600">Average completion rate</p>
                  <div className="mt-4 space-y-2">
                    {patients.map(patient => (
                      <div key={patient.id} className="flex justify-between text-sm">
                        <span>{patient.name}</span>
                        <span className="font-medium">{patient.completedSurveys} surveys</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Advanced System Settings</h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Multilingual Support</h3>
                <div className="space-y-4">
                  {['English 🇺🇸', 'Spanish 🇪🇸', 'Mandarin 🇨🇳', 'French 🇫🇷', 'German 🇩🇪', 'Hindi 🇮🇳'].map(lang => (
                    <div key={lang} className="flex items-center justify-between">
                      <span className="text-gray-700">{lang}</span>
                      <div className="w-12 h-6 bg-blue-600 rounded-full p-1 cursor-pointer">
                        <div className="w-4 h-4 bg-white rounded-full transform translate-x-6 transition-transform"></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Gamification Settings</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-700">Patient Rewards</span>
                    <div className="w-12 h-6 bg-blue-600 rounded-full p-1 cursor-pointer">
                      <div className="w-4 h-4 bg-white rounded-full transform translate-x-6 transition-transform"></div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-700">Doctor Scoring</span>
                    <div className="w-12 h-6 bg-blue-600 rounded-full p-1 cursor-pointer">
                      <div className="w-4 h-4 bg-white rounded-full transform translate-x-6 transition-transform"></div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-700">Achievement Badges</span>
                    <div className="w-12 h-6 bg-blue-600 rounded-full p-1 cursor-pointer">
                      <div className="w-4 h-4 bg-white rounded-full transform translate-x-6 transition-transform"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'reminders' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Smart Reminder System</h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Health Tips Distribution</h3>
                <div className="space-y-3">
                  {healthTips.map(tip => (
                    <div key={tip.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex-1">
                        <p className="font-medium text-gray-900">{tip.condition}</p>
                        <p className="text-sm text-gray-600">{tip.tip}</p>
                      </div>
                      <button
                        onClick={() => sendReminder(1, 'health_tip')}
                        className={`px-3 py-1 rounded-lg text-sm font-medium ${
                          tip.sent 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-blue-600 text-white hover:bg-blue-700'
                        }`}
                      >
                        {tip.sent ? 'Sent' : 'Send'}
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Location-Based Reminders</h3>
                <div className="space-y-3">
                  {patients.map(patient => (
                    <div key={patient.id} className="flex items-center justify-between p-3 bg-blue-50 rounded-lg border border-blue-200">
                      <div>
                        <p className="font-medium text-blue-900">{patient.name}</p>
                        <p className="text-blue-700 text-sm flex items-center">
                          <MapPin className="w-3 h-3 mr-1" />
                          {patient.location}
                        </p>
                      </div>
                      <button className="bg-blue-600 text-white px-3 py-1 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
                        Find Clinics
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Enhanced Add Patient Modal */}
      {showAddPatient && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full p-6 transform transition-all duration-300 scale-100 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-gray-900">Add New Patient</h3>
              <button
                onClick={() => setShowAddPatient(false)}
                className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Patient Name"
                value={newPatient.name}
                onChange={(e) => setNewPatient({...newPatient, name: e.target.value})}
                className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
              />
              <input
                type="tel"
                placeholder="Phone Number"
                value={newPatient.phone}
                onChange={(e) => setNewPatient({...newPatient, phone: e.target.value})}
                className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
              />
              <input
                type="email"
                placeholder="Email Address"
                value={newPatient.email}
                onChange={(e) => setNewPatient({...newPatient, email: e.target.value})}
                className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
              />
              <input
                type="text"
                placeholder="Location"
                value={newPatient.location}
                onChange={(e) => setNewPatient({...newPatient, location: e.target.value})}
                className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
              />
              <input
                type="text"
                placeholder="Medical Condition"
                value={newPatient.condition}
                onChange={(e) => setNewPatient({...newPatient, condition: e.target.value})}
                className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
              />
              <input
                type="date"
                placeholder="Follow-up Date"
                value={newPatient.followUpDate}
                onChange={(e) => setNewPatient({...newPatient, followUpDate: e.target.value})}
                className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
              />
              <select
                value={newPatient.preferredContact}
                onChange={(e) => setNewPatient({...newPatient, preferredContact: e.target.value})}
                className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
              >
                <option value="sms">SMS</option>
                <option value="whatsapp">WhatsApp</option>
                <option value="email">Email</option>
              </select>
              <select
                value={newPatient.language}
                onChange={(e) => setNewPatient({...newPatient, language: e.target.value})}
                className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
              >
                <option value="English">English 🇺🇸</option>
                <option value="Spanish">Spanish 🇪🇸</option>
                <option value="Mandarin">Mandarin 🇨🇳</option>
                <option value="French">French 🇫🇷</option>
                <option value="German">German 🇩🇪</option>
                <option value="Hindi">Hindi 🇮🇳</option>
              </select>
              <input
                type="text"
                placeholder="Family Members (comma separated)"
                value={newPatient.family}
                onChange={(e) => setNewPatient({...newPatient, family: e.target.value})}
                className="md:col-span-2 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
              />
              <input
                type="time"
                value={newPatient.customTime}
                onChange={(e) => setNewPatient({...newPatient, customTime: e.target.value})}
                className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
              />
              <select
                value={newPatient.frequency}
                onChange={(e) => setNewPatient({...newPatient, frequency: e.target.value})}
                className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
              >
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
              </select>
            </div>
            
            <div className="flex space-x-3 mt-6">
              <button
                onClick={() => setShowAddPatient(false)}
                className="flex-1 py-3 px-4 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
              >
                Cancel
              </button>
              <button
                onClick={addPatient}
                className="flex-1 py-3 px-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all transform hover:-translate-y-0.5 font-medium"
              >
                Add Patient
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdvancedHealthcareSystem;
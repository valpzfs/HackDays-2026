import { useState } from 'react';
import { ExternalLink, ChevronDown } from 'lucide-react';

export default function App() {
  const [apiKey, setApiKey] = useState('');
  const [currentStep, setCurrentStep] = useState(1);
  const [description, setDescription] = useState('');
  const [budget, setBudget] = useState('300');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [viewMode, setViewMode] = useState<'parts' | 'community'>('parts');

  const quickPrompts = [
    'indoors', 'outdoors', 'pick & place', 'navigation',
    'with camera', 'with lidar', 'ROS2', 'autonomous',
    'raspberry pi', 'arduino'
  ];

  const toggleTag = (tag: string) => {
    setSelectedTags(prev =>
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );
  };

  const components = [
    {
      category: 'microcontroller',
      name: 'Raspberry Pi 4 Model B',
      description: 'Quad-core ARM processor, 4GB RAM',
      price: 55.00,
      compatibility: 98,
    },
    {
      category: 'motor driver',
      name: 'L298N Dual H-Bridge',
      description: 'Drives two DC motors or one stepper',
      price: 8.50,
      compatibility: 95,
    },
    {
      category: 'depth camera',
      name: 'Intel RealSense D435',
      description: 'Stereo depth perception, USB 3.0',
      price: 189.00,
      compatibility: 92,
    },
    {
      category: 'lidar',
      name: 'RPLIDAR A1M8',
      description: '360° laser scanner, 12m range',
      price: 99.00,
      compatibility: 88,
    },
    {
      category: 'chassis',
      name: 'Aluminum Robot Platform',
      description: 'Two-tier mobile robot base',
      price: 42.00,
      compatibility: 100,
    },
    {
      category: 'battery',
      name: 'LiPo 3S 5000mAh',
      description: '11.1V rechargeable battery pack',
      price: 34.00,
      compatibility: 85,
    },
    {
      category: 'wheels',
      name: 'Rubber Wheels 65mm',
      description: 'Set of 4 with mounting hubs',
      price: 18.00,
      compatibility: 100,
    },
    {
      category: 'power regulator',
      name: 'Buck Converter 5V 3A',
      description: 'Step-down voltage regulator',
      price: 6.50,
      compatibility: 90,
    },
    {
      category: 'frame',
      name: 'Carbon Fiber Mounting Plate',
      description: 'Lightweight sensor mount',
      price: 28.00,
      compatibility: 94,
    }
  ];

  const totalCost = components.reduce((sum, c) => sum + c.price, 0);
  const avgCompatibility = Math.round(
    components.reduce((sum, c) => sum + c.compatibility, 0) / components.length
  );

  const communityBuilds = [
    {
      name: 'Indoor Navigator Pro',
      description: 'Autonomous indoor mapping robot with obstacle avoidance',
      totalCost: 425.00,
      builds: 127,
      successRate: 94,
      difficulty: 'Intermediate',
      image: '/api/placeholder/400/300',
      tags: ['ROS2', 'indoors', 'navigation', 'raspberry pi'],
      reviews: [
        { user: '@alex_robotics', rating: 5, comment: 'Worked perfectly! The LiDAR mapping was spot on.' },
        { user: '@sarah_m', rating: 5, comment: 'Built this for my apartment. Navigation is flawless.' }
      ]
    },
    {
      name: 'Pick & Place Assistant',
      description: 'Robotic arm with vision for sorting and organizing items',
      totalCost: 385.00,
      builds: 89,
      successRate: 87,
      difficulty: 'Advanced',
      image: '/api/placeholder/400/300',
      tags: ['pick & place', 'with camera', 'arduino', 'indoors'],
      reviews: [
        { user: '@maker_jane', rating: 4, comment: 'This worked for me! Camera calibration took time but worth it.' },
        { user: '@robot_dan', rating: 5, comment: 'Amazing accuracy. Using it for my workshop.' }
      ]
    },
    {
      name: 'Outdoor Explorer',
      description: 'All-terrain robot with GPS navigation and weatherproofing',
      totalCost: 520.00,
      builds: 64,
      successRate: 91,
      difficulty: 'Advanced',
      image: '/api/placeholder/400/300',
      tags: ['outdoors', 'navigation', 'autonomous', 'with camera'],
      reviews: [
        { user: '@outdoor_bot', rating: 5, comment: 'Built 3 of these. Rock solid in all weather conditions.' },
        { user: '@explorer_22', rating: 4, comment: 'GPS accuracy is great. Battery life could be better.' }
      ]
    },
    {
      name: 'Budget Line Follower',
      description: 'Simple and affordable line-following robot for beginners',
      totalCost: 85.00,
      builds: 342,
      successRate: 98,
      difficulty: 'Beginner',
      image: '/api/placeholder/400/300',
      tags: ['arduino', 'indoors', 'navigation'],
      reviews: [
        { user: '@first_timer', rating: 5, comment: 'Perfect first project! Worked on the first try.' },
        { user: '@student_bob', rating: 5, comment: 'Built this for robotics class. A+' }
      ]
    },
    {
      name: 'Vision Tracking Bot',
      description: 'Object detection and tracking with real-time computer vision',
      totalCost: 340.00,
      builds: 153,
      successRate: 89,
      difficulty: 'Intermediate',
      image: '/api/placeholder/400/300',
      tags: ['with camera', 'ROS2', 'python', 'raspberry pi'],
      reviews: [
        { user: '@cv_expert', rating: 5, comment: 'OpenCV integration works beautifully.' },
        { user: '@tracky_bot', rating: 4, comment: 'Tracking is smooth and accurate. Worked for me!' }
      ]
    },
    {
      name: 'Warehouse Mini',
      description: 'Compact material transport robot with load sensors',
      totalCost: 295.00,
      builds: 78,
      successRate: 92,
      difficulty: 'Intermediate',
      image: '/api/placeholder/400/300',
      tags: ['indoors', 'navigation', 'autonomous', 'arduino'],
      reviews: [
        { user: '@warehouse_pro', rating: 5, comment: 'Using 5 of these in my small warehouse. Perfect!' },
        { user: '@logistics_lou', rating: 4, comment: 'Works great. Added bigger wheels for carpet.' }
      ]
    }
  ];

  const componentLegend = [
    { name: 'Depth Camera', color: '#00d9ff' },
    { name: 'LiDAR', color: '#a855f7' },
    { name: 'Raspberry Pi', color: '#22c55e' },
    { name: 'Motor Driver', color: '#f59e0b' },
    { name: 'Battery', color: '#f97316' }
  ];

  const issues = {
    critical: [
      {
        title: 'Power draw exceeds battery capacity',
        description: 'Combined current draw of all components is 4.2A but battery can only sustain 3.5A continuous.'
      }
    ],
    high: [
      {
        title: 'LiDAR interference with depth camera',
        description: 'Both sensors emit IR light that can cause cross-talk when mounted too close.'
      }
    ],
    medium: [
      {
        title: 'Weight distribution unbalanced',
        description: 'Heavy components on front tier will cause tipping during acceleration.'
      }
    ],
    low: [
      {
        title: 'USB bandwidth constraints',
        description: 'Depth camera + LiDAR both on same USB controller may cause frame drops.'
      }
    ]
  };

  const edgeCases = {
    high: [
      {
        title: 'Outdoor sunlight interference',
        description: 'Depth camera will fail in direct sunlight due to IR washout.'
      }
    ],
    medium: [
      {
        title: 'WiFi dropout during navigation',
        description: 'ROS2 nodes rely on network — test autonomous fallback behavior.'
      }
    ],
    low: [
      {
        title: 'Motor stall on carpet',
        description: 'Wheels may not have enough torque for thick carpet or inclines.'
      }
    ]
  };

  const fixes = [
    {
      title: 'Upgrade to higher capacity battery',
      action: 'Switch to 6000mAh pack or add second battery in parallel'
    },
    {
      title: 'Add sensor mounting bracket with offset',
      action: 'Position LiDAR 20cm above camera to prevent IR interference'
    },
    {
      title: 'Redistribute component placement',
      action: 'Move battery to rear tier and center heavy components'
    }
  ];

  const getCompatibilityColor = (compat: number) => {
    if (compat >= 95) return '#22c55e';
    if (compat >= 85) return '#f59e0b';
    return '#ef4444';
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'CRITICAL': return '#ef4444';
      case 'HIGH': return '#f97316';
      case 'MEDIUM': return '#f59e0b';
      case 'LOW': return '#6b7280';
      default: return '#6b7280';
    }
  };

  return (
    <div className="min-h-screen bg-[#1e2128] text-gray-400" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      {/* Header */}
      <div className="border-b border-gray-800 px-6 py-4">
        <div className="flex items-start justify-between max-w-7xl mx-auto">
          <div>
            <div className="flex items-center gap-2 mb-0.5">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-cyan-400">
                <rect x="7" y="6" width="10" height="11" stroke="currentColor" strokeWidth="1.5" />
                <rect x="9.5" y="8.5" width="1.5" height="1.5" fill="currentColor" />
                <rect x="13" y="8.5" width="1.5" height="1.5" fill="currentColor" />
                <line x1="9.5" y1="13" x2="14.5" y2="13" stroke="currentColor" strokeWidth="1.5" />
                <line x1="12" y1="3" x2="12" y2="6" stroke="currentColor" strokeWidth="1.5" />
                <line x1="5.5" y1="11" x2="7" y2="11" stroke="currentColor" strokeWidth="1.5" />
                <line x1="17" y1="11" x2="18.5" y2="11" stroke="currentColor" strokeWidth="1.5" />
                <line x1="9" y1="17" x2="9" y2="20" stroke="currentColor" strokeWidth="1.5" />
                <line x1="15" y1="17" x2="15" y2="20" stroke="currentColor" strokeWidth="1.5" />
              </svg>
              <h1 className="text-2xl font-medium text-white">buildwise</h1>
            </div>
            <p className="text-xs text-gray-500 ml-6">reality-checked robot builds</p>
          </div>
          <div className="flex items-center gap-4">
            <input
              type="password"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="key"
              className="bg-transparent border-none outline-none text-xs text-gray-600 placeholder:text-gray-700 w-12"
            />
            <span className="text-xs text-gray-600">${budget}</span>
          </div>
        </div>
      </div>

      <main className="px-8 py-8 max-w-6xl mx-auto">
        {/* Step 1 - Describe Robot */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-6 cursor-pointer group" onClick={() => currentStep > 1 && setCurrentStep(1)}>
            <div className="bg-cyan-400 text-black px-2.5 py-1 text-xs font-mono rounded">01</div>
            <h2 className="text-sm text-gray-400 font-mono">describe robot</h2>
            {currentStep > 1 && <ChevronDown className="w-4 h-4 text-gray-600 group-hover:text-gray-500" />}
          </div>

          {currentStep === 1 && (
            <div className="ml-0 border-l-2 border-cyan-400 pl-8">
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="what should this thing do..."
                className="w-full h-36 bg-[#13151a] text-gray-400 placeholder:text-gray-700 p-4 rounded-lg border border-gray-800 outline-none resize-none text-sm mb-6"
              />

              <div className="mb-6">
                <div className="text-xs text-gray-600 mb-3 uppercase tracking-wider font-mono">BUDGET</div>
                <div className="inline-block bg-[#13151a] border border-gray-800 rounded px-4 py-2">
                  <input
                    type="text"
                    value={`$${budget}`}
                    onChange={(e) => setBudget(e.target.value.replace('$', ''))}
                    className="bg-transparent border-none outline-none text-white text-sm w-16 font-mono"
                  />
                </div>
              </div>

              <div className="mb-6">
                <div className="text-xs text-gray-600 mb-3 uppercase tracking-wider font-mono">TAGS</div>
                <div className="flex flex-wrap gap-2">
                  {quickPrompts.map(tag => (
                    <button
                      key={tag}
                      onClick={() => toggleTag(tag)}
                      className={`px-3 py-1.5 rounded text-xs font-mono transition-colors ${
                        selectedTags.includes(tag)
                          ? 'bg-[#13151a] text-gray-400 border border-gray-700'
                          : 'bg-transparent text-gray-700 border border-gray-800 hover:border-gray-700'
                      }`}
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>

              <button
                onClick={() => setCurrentStep(2)}
                className="bg-cyan-400 text-black px-5 py-2 rounded text-xs font-medium hover:bg-cyan-300 transition-colors"
              >
                generate list &gt;
              </button>
            </div>
          )}

          {currentStep > 1 && (
            <div className="ml-8 text-xs text-gray-600 font-mono">
              ...
            </div>
          )}
        </div>

        {/* Step 2 - Parts List */}
        {currentStep >= 2 && (
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-6 cursor-pointer group" onClick={() => currentStep > 2 && setCurrentStep(2)}>
              <div className="bg-cyan-400 text-black px-2.5 py-1 text-xs font-mono rounded">02</div>
              <h2 className="text-sm text-gray-400 font-mono">parts list</h2>
              {currentStep > 2 && <ChevronDown className="w-4 h-4 text-gray-600 group-hover:text-gray-500" />}
            </div>

            {currentStep === 2 && (
              <div className="ml-0 border-l-2 border-cyan-400 pl-8">
                {/* Tabs */}
                <div className="flex gap-2 mb-6">
                  <button
                    onClick={() => setViewMode('parts')}
                    className={`px-4 py-2 text-xs font-mono rounded transition-colors ${
                      viewMode === 'parts'
                        ? 'bg-cyan-400 text-black'
                        : 'bg-transparent text-gray-600 hover:text-gray-500'
                    }`}
                  >
                    parts
                  </button>
                  <button
                    onClick={() => setViewMode('community')}
                    className={`px-4 py-2 text-xs font-mono rounded transition-colors ${
                      viewMode === 'community'
                        ? 'bg-cyan-400 text-black'
                        : 'bg-transparent text-gray-600 hover:text-gray-500'
                    }`}
                  >
                    community
                  </button>
                </div>

                {viewMode === 'parts' ? (
                  <>
                    {/* Stats */}
                    <div className="flex gap-12 mb-6 text-sm">
                      <div>
                        <div className="text-white text-2xl font-light">${totalCost.toFixed(2)}</div>
                        <div className="text-gray-600 text-xs font-mono">total</div>
                      </div>
                      <div>
                        <div className="text-white text-2xl font-light">{avgCompatibility}%</div>
                        <div className="text-gray-600 text-xs font-mono">avg compat</div>
                      </div>
                      <div>
                        <div className="text-white text-2xl font-light">{components.length}</div>
                        <div className="text-gray-600 text-xs font-mono">parts</div>
                      </div>
                    </div>

                    {/* Components List */}
                    <div className="space-y-4">
                      {components.map((comp, idx) => (
                        <div key={idx} className="group">
                          <div className="flex items-start justify-between mb-1">
                            <div className="flex-1">
                              <div className="text-xs text-gray-600 font-mono mb-1 flex items-center gap-1.5">
                                <span>{comp.category}</span>
                                <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-50" />
                              </div>
                              <div className="text-white text-sm mb-1">{comp.name}</div>
                              <div className="text-gray-600 text-xs mb-2">{comp.description}</div>
                              <div className="flex items-center gap-3 text-xs font-mono">
                                <a href="#" className="text-gray-600 hover:text-cyan-400 flex items-center gap-1">
                                  amzn <ExternalLink className="w-3 h-3" />
                                </a>
                                <a href="#" className="text-gray-600 hover:text-cyan-400 flex items-center gap-1">
                                  vendor <ExternalLink className="w-3 h-3" />
                                </a>
                              </div>
                            </div>
                            <div className="text-right ml-6">
                              <div className="text-white text-sm mb-2">${comp.price.toFixed(2)}</div>
                              <div className="flex items-center gap-2">
                                <div className="w-20 h-1.5 bg-gray-800 rounded-full overflow-hidden">
                                  <div
                                    className="h-full rounded-full"
                                    style={{
                                      width: `${comp.compatibility}%`,
                                      backgroundColor: getCompatibilityColor(comp.compatibility)
                                    }}
                                  />
                                </div>
                                <span className="text-xs text-gray-600 font-mono">{comp.compatibility}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    <button
                      onClick={() => setCurrentStep(3)}
                      className="bg-cyan-400 text-black px-5 py-2 rounded text-xs font-medium hover:bg-cyan-300 transition-colors mt-6"
                    >
                      render bot &gt;
                    </button>
                  </>
                ) : (
                  <>
                    <div className="text-xs text-gray-600 mb-4 font-mono">
                      Builds matched to your requirements • Sorted by success rate
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      {communityBuilds.map((build, idx) => (
                        <div key={idx} className="bg-[#13151a] border border-gray-800 rounded overflow-hidden hover:border-gray-700 transition-colors">
                          {/* Image */}
                          <div className="relative h-40 bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
                            <div className="text-gray-700 text-xs">Image placeholder</div>
                            <div className="absolute top-2 right-2 bg-green-500 text-white text-xs px-2 py-1 rounded font-mono flex items-center gap-1">
                              <span>✓</span> {build.successRate}%
                            </div>
                          </div>

                          {/* Content */}
                          <div className="p-4">
                            <div className="flex items-start justify-between mb-2">
                              <div className="text-white text-sm font-medium">{build.name}</div>
                              <div className="text-cyan-400 text-sm font-mono">${build.totalCost}</div>
                            </div>

                            <div className="text-gray-500 text-xs mb-3">{build.description}</div>

                            <div className="flex items-center gap-3 text-xs font-mono text-gray-600 mb-3">
                              <span>👥 {build.builds} builds</span>
                              <span>⏱ {build.reviews.length * 4} hours</span>
                              <span className={`px-2 py-0.5 rounded ${
                                build.difficulty === 'Beginner' ? 'bg-green-500/20 text-green-500' :
                                build.difficulty === 'Intermediate' ? 'bg-yellow-500/20 text-yellow-500' :
                                'bg-red-500/20 text-red-500'
                              }`}>
                                {build.difficulty}
                              </span>
                            </div>

                            <div className="flex flex-wrap gap-1.5 mb-3">
                              {build.tags.map((tag, i) => (
                                <span key={i} className="text-xs bg-gray-800 text-gray-500 px-2 py-0.5 rounded font-mono">
                                  {tag}
                                </span>
                              ))}
                            </div>

                            <div className="space-y-2 mb-4">
                              {build.reviews.slice(0, 2).map((review, i) => (
                                <div key={i} className="text-xs">
                                  <div className="flex items-center gap-1 mb-0.5">
                                    <span className="text-yellow-500">{'★'.repeat(review.rating)}</span>
                                    <span className="text-gray-600">✓</span>
                                  </div>
                                  <div className="text-gray-500 italic">"{review.comment}" —{review.user}</div>
                                </div>
                              ))}
                            </div>

                            <button className="w-full bg-transparent border border-cyan-400/30 text-cyan-400 px-4 py-2 rounded text-xs font-medium hover:bg-cyan-400/10 transition-colors">
                              Select This Build
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>

                    <button
                      onClick={() => setCurrentStep(3)}
                      className="bg-cyan-400 text-black px-5 py-2 rounded text-xs font-medium hover:bg-cyan-300 transition-colors mt-6"
                    >
                      continue &gt;
                    </button>
                  </>
                )}
              </div>
            )}

            {currentStep > 2 && (
              <div className="ml-8 text-xs text-gray-600 font-mono">
                {components.length} parts / ${totalCost.toFixed(2)}
              </div>
            )}
          </div>
        )}

        {/* Step 3 - 3D Render */}
        {currentStep >= 3 && (
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-6 cursor-pointer group" onClick={() => currentStep > 3 && setCurrentStep(3)}>
              <div className="bg-cyan-400 text-black px-2.5 py-1 text-xs font-mono rounded">03</div>
              <h2 className="text-sm text-gray-400 font-mono">3d render</h2>
              {currentStep > 3 && <ChevronDown className="w-4 h-4 text-gray-600 group-hover:text-gray-500" />}
            </div>

            {currentStep === 3 && (
              <div className="ml-0 border-l-2 border-cyan-400 pl-8">
                <div className="bg-[#13151a] border border-gray-800 rounded p-6 mb-6">
                  <div className="flex gap-8">
                    {/* 3D View */}
                    <div className="flex-1 aspect-video bg-gradient-to-br from-[#1e2937] to-[#0f1419] rounded flex items-center justify-center">
                      <div className="text-gray-700 text-sm font-mono">[3D Render Placeholder]</div>
                    </div>

                    {/* Component Legend */}
                    <div className="w-56">
                      <div className="text-xs text-gray-600 mb-4 uppercase tracking-wider font-mono">COMPONENT LEGEND</div>
                      <div className="space-y-2">
                        {componentLegend.map((item, idx) => (
                          <div key={idx} className="flex items-center gap-2">
                            <div
                              className="w-3 h-3 rounded-full"
                              style={{ backgroundColor: item.color }}
                            />
                            <span className="text-sm text-gray-400">{item.name}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="text-xs text-gray-600 font-mono mb-6">
                  BUILD: INDOOR NAVIGATOR PRO • 127 SUCCESSFUL BUILDS
                </div>

                <button
                  onClick={() => setCurrentStep(4)}
                  className="bg-cyan-400 text-black px-5 py-2 rounded text-xs font-medium hover:bg-cyan-300 transition-colors"
                >
                  Analyze Build &gt;
                </button>
              </div>
            )}

            {currentStep > 3 && (
              <div className="ml-8 text-xs text-gray-600 font-mono">
                3D render generated
              </div>
            )}
          </div>
        )}

        {/* Step 4 - Reality Check */}
        {currentStep >= 4 && (
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-cyan-400 text-black px-2.5 py-1 text-xs font-mono rounded">04</div>
              <h2 className="text-sm text-gray-400 font-mono">reality check</h2>
            </div>

            <div className="ml-0 border-l-2 border-cyan-400 pl-8">
              {/* Score Circle */}
              <div className="bg-[#13151a] border border-yellow-600/50 rounded p-6 mb-6">
                <div className="flex items-center gap-8">
                  <div className="relative w-28 h-28">
                    <svg className="w-28 h-28 transform -rotate-90">
                      <circle
                        cx="56"
                        cy="56"
                        r="50"
                        stroke="#374151"
                        strokeWidth="8"
                        fill="none"
                      />
                      <circle
                        cx="56"
                        cy="56"
                        r="50"
                        stroke="#f59e0b"
                        strokeWidth="8"
                        fill="none"
                        strokeDasharray={`${65 * 3.14} 314`}
                        strokeLinecap="round"
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center flex-col">
                      <div className="text-white text-3xl font-light">65</div>
                      <div className="text-gray-600 text-xs font-mono">/100</div>
                    </div>
                  </div>
                  <div>
                    <div className="text-yellow-500 text-base font-mono uppercase tracking-wider mb-2">PROCEED WITH CAUTION</div>
                    <div className="text-gray-400 text-sm">
                      Your design has critical power and sensor placement issues that will cause failures in<br />
                      real-world deployment. Address the high-severity items before building.
                    </div>
                  </div>
                </div>
              </div>

              {/* Issues Grid */}
              <div className="grid grid-cols-2 gap-6 mb-6">
                {/* Problems */}
                <div>
                  <div className="text-red-500 text-xs font-mono uppercase tracking-wider mb-4">WHAT WILL BREAK IN THE REAL WORLD</div>
                  <div className="space-y-3">
                    {Object.entries(issues).map(([severity, items]) => items.map((issue, idx) => (
                      <div key={`${severity}-${idx}`} className="bg-[#13151a] border border-gray-800 rounded p-4">
                        <div className="flex items-start gap-2 mb-2">
                          <span
                            className="text-xs px-2 py-0.5 rounded font-mono uppercase"
                            style={{
                              backgroundColor: `${getSeverityColor(severity.toUpperCase())}20`,
                              color: getSeverityColor(severity.toUpperCase())
                            }}
                          >
                            {severity}
                          </span>
                        </div>
                        <div className="text-white text-sm mb-1">{issue.title}</div>
                        <div className="text-gray-500 text-xs">{issue.description}</div>
                      </div>
                    )))}
                  </div>
                </div>

                {/* Edge Cases */}
                <div>
                  <div className="text-cyan-400 text-xs font-mono uppercase tracking-wider mb-4">EDGE CASES TO TEST BEFORE DEPLOYING</div>
                  <div className="space-y-3">
                    {Object.entries(edgeCases).map(([severity, items]) => items.map((issue, idx) => (
                      <div key={`${severity}-${idx}`} className="bg-[#13151a] border border-gray-800 rounded p-4">
                        <div className="flex items-start gap-2 mb-2">
                          <span
                            className="text-xs px-2 py-0.5 rounded font-mono uppercase"
                            style={{
                              backgroundColor: `${getSeverityColor(severity.toUpperCase())}20`,
                              color: getSeverityColor(severity.toUpperCase())
                            }}
                          >
                            {severity}
                          </span>
                        </div>
                        <div className="text-white text-sm mb-1">{issue.title}</div>
                        <div className="text-gray-500 text-xs">{issue.description}</div>
                      </div>
                    )))}
                  </div>
                </div>
              </div>

              {/* Top Fixes */}
              <div>
                <div className="text-green-500 text-xs font-mono uppercase tracking-wider mb-4">TOP FIXES BEFORE YOU BUILD</div>
                <div className="space-y-3">
                  {fixes.map((fix, idx) => (
                    <div key={idx} className="bg-[#13151a] border border-gray-800 rounded p-4 flex gap-4">
                      <div className="w-8 h-8 bg-green-500/20 text-green-500 rounded flex items-center justify-center text-sm font-mono flex-shrink-0">
                        {idx + 1}
                      </div>
                      <div className="flex-1">
                        <div className="text-white text-sm mb-1">{fix.title}</div>
                        <div className="text-gray-500 text-xs">{fix.action}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

import { motion } from 'framer-motion';
import { Battery, Zap, TrendingUp, Activity, Wifi, Shield, BarChart3, Globe } from 'lucide-react';
import { useEffect, useState } from 'react';

interface EnergyDashboardProps {
  title?: string;
  subtitle?: string;
  systemId?: string;
}

const EnergyDashboard: React.FC<EnergyDashboardProps> = ({ 
  title = 'CARBONOZ SolarAutopilot Platform',
  subtitle = 'Intelligent Battery Management',
  systemId = 'MEGA-400V • System ID: LX-2024-001'
}) => {
  const [batteryLevel, setBatteryLevel] = useState(87);
  const [powerOutput, setPowerOutput] = useState(45.2);
  const [efficiency, setEfficiency] = useState(98.5);
  const [carbonIntensity, setCarbonIntensity] = useState('Low');
  const [isCharging, setIsCharging] = useState(true);

  // Simulate real-time data updates
  useEffect(() => {
    const interval = setInterval(() => {
      setBatteryLevel(prev => {
        const change = (Math.random() - 0.5) * 2;
        return Math.max(75, Math.min(95, prev + change));
      });
      setPowerOutput(prev => {
        const change = (Math.random() - 0.5) * 5;
        return Math.max(35, Math.min(55, prev + change));
      });
      setEfficiency(prev => {
        const change = (Math.random() - 0.5) * 0.5;
        return Math.max(97, Math.min(99.5, prev + change));
      });
      setIsCharging(Math.random() > 0.3);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3 }
    }
  };

  const pulseVariants = {
    pulse: {
      scale: [1, 1.1, 1],
      opacity: [1, 0.8, 1],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <motion.div 
      className="bg-gradient-to-br from-[#0a1a0d] via-[#0d1410] to-[#060a07] border border-brand-green/20 rounded-3xl p-8 max-w-lg mx-auto relative overflow-hidden"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Animated Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-full h-full">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-brand-green rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                opacity: [0, 1, 0],
                scale: [0, 1, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: Math.random() * 3,
              }}
            />
          ))}
        </div>
      </div>

      {/* Header */}
      <motion.div className="flex items-center justify-between mb-8" variants={itemVariants}>
        <div>
          <h3 className="text-white font-bold text-xl mb-1">{title}</h3>
          <p className="text-brand-green text-sm mono">{systemId}</p>
        </div>
        <div className="flex items-center gap-2">
          <motion.div 
            className="w-3 h-3 bg-brand-green rounded-full"
            variants={pulseVariants}
            animate="pulse"
          />
          <Wifi className="text-brand-green" size={16} />
        </div>
      </motion.div>

      {/* Main Battery Visualization */}
      <motion.div className="mb-8" variants={itemVariants}>
        <div className="relative">
          <div className="bg-brand-black/50 border border-brand-green/30 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <Battery className="text-brand-green" size={28} />
                <div>
                  <div className="text-white font-bold text-2xl mono">{batteryLevel.toFixed(1)}%</div>
                  <div className="text-white/60 text-sm">State of Charge</div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-brand-green font-bold text-xl mono">{powerOutput.toFixed(1)}kW</div>
                <div className="text-white/60 text-sm">{isCharging ? 'Charging' : 'Discharging'}</div>
              </div>
            </div>
            
            {/* Animated Battery Level */}
            <div className="relative">
              <div className="w-full bg-white/10 rounded-full h-3 overflow-hidden">
                <motion.div 
                  className="bg-gradient-to-r from-brand-green to-brand-lime h-full rounded-full relative"
                  initial={{ width: 0 }}
                  animate={{ width: `${batteryLevel}%` }}
                  transition={{ duration: 1, ease: "easeOut" }}
                >
                  <motion.div
                    className="absolute inset-0 bg-white/20 rounded-full"
                    animate={{
                      x: ['-100%', '100%'],
                    }}
                    transition={
                      isCharging ? {
                        duration: 2,
                        repeat: Infinity,
                        ease: "linear"
                      } : {}
                    }
                  />
                </motion.div>
              </div>
              <div className="flex justify-between text-xs text-white/50 mt-2">
                <span>0%</span>
                <span>50%</span>
                <span>100%</span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Performance Metrics Grid */}
      <motion.div className="grid grid-cols-2 gap-4 mb-8" variants={itemVariants}>
        <motion.div 
          className="bg-brand-green/10 border border-brand-green/30 rounded-xl p-4 hover:bg-brand-green/15 transition-colors"
          whileHover={{ scale: 1.02 }}
        >
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="text-brand-green" size={20} />
            <span className="text-white/70 text-sm">Efficiency</span>
          </div>
          <div className="text-white font-bold text-xl mono">{efficiency.toFixed(1)}%</div>
          <div className="text-brand-green text-xs">+0.2% from yesterday</div>
        </motion.div>

        <motion.div 
          className="bg-brand-green/10 border border-brand-green/30 rounded-xl p-4 hover:bg-brand-green/15 transition-colors"
          whileHover={{ scale: 1.02 }}
        >
          <div className="flex items-center gap-2 mb-2">
            <Activity className="text-brand-green" size={20} />
            <span className="text-white/70 text-sm">Health</span>
          </div>
          <div className="text-white font-bold text-xl">Optimal</div>
          <div className="text-brand-green text-xs">All systems normal</div>
        </motion.div>

        <motion.div 
          className="bg-brand-green/10 border border-brand-green/30 rounded-xl p-4 hover:bg-brand-green/15 transition-colors"
          whileHover={{ scale: 1.02 }}
        >
          <div className="flex items-center gap-2 mb-2">
            <BarChart3 className="text-brand-green" size={20} />
            <span className="text-white/70 text-sm">Daily Energy</span>
          </div>
          <div className="text-white font-bold text-xl mono">847kWh</div>
          <div className="text-brand-green text-xs">+12% vs target</div>
        </motion.div>

        <motion.div 
          className="bg-brand-green/10 border border-brand-green/30 rounded-xl p-4 hover:bg-brand-green/15 transition-colors"
          whileHover={{ scale: 1.02 }}
        >
          <div className="flex items-center gap-2 mb-2">
            <Globe className="text-brand-green" size={20} />
            <span className="text-white/70 text-sm">Carbon</span>
          </div>
          <div className="text-white font-bold text-xl">{carbonIntensity}</div>
          <div className="text-brand-green text-xs">Optimal window</div>
        </motion.div>
      </motion.div>

      {/* AI Optimization Status */}
      <motion.div 
        className="bg-gradient-to-r from-brand-green/20 to-transparent border border-brand-green/40 rounded-xl p-4 mb-6"
        variants={itemVariants}
      >
        <div className="flex items-center gap-3">
          <motion.div
            className="w-8 h-8 bg-brand-green/20 rounded-full flex items-center justify-center"
            animate={{ rotate: 360 }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          >
            <div className="w-3 h-3 bg-brand-green rounded-full" />
          </motion.div>
          <div>
            <div className="text-white font-semibold text-sm">AI Optimization Active</div>
            <div className="text-brand-green text-xs">Smart charging algorithm running</div>
          </div>
        </div>
      </motion.div>

      {/* Security & Compliance */}
      <motion.div className="flex items-center justify-between" variants={itemVariants}>
        <div className="flex items-center gap-2">
          <Shield className="text-brand-green" size={16} />
          <span className="text-white/70 text-sm">Secure Connection</span>
        </div>
        <div className="flex items-center gap-4 text-xs text-white/50">
          <span>IP55 Rated</span>
          <span>•</span>
          <span>CE Certified</span>
          <span>•</span>
          <span>ISO 27001</span>
        </div>
      </motion.div>

      {/* Subtle Glow Effect */}
      <div className="absolute -inset-1 bg-gradient-to-r from-brand-green/20 via-transparent to-brand-green/20 rounded-3xl blur-xl -z-10" />
    </motion.div>
  );
};

export default EnergyDashboard;
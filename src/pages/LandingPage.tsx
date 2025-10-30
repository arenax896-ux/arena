import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Trophy, Users, Coins, Zap, Shield, Target, ChevronRight, Menu, X, Gamepad2 } from 'lucide-react';

const LandingPage = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is authenticated
    const token = localStorage.getItem('adminToken');
    if (token) {
      navigate('/admin');
    }
  }, [navigate]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const features = [
    {
      icon: <Trophy className="w-8 h-8" />,
      title: "Competitive Tournaments",
      description: "Join thrilling eSports tournaments with real rewards. Compete in Solo, Duo, or Squad matches."
    },
    {
      icon: <Coins className="w-8 h-8" />,
      title: "AX Coin Economy",
      description: "Our virtual currency system makes transactions seamless. 1 PKR = 1 AX Coin, simple and transparent."
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Secure & Fair",
      description: "Every transaction is logged and verified. Play with confidence in our secure gaming environment."
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Instant Payments",
      description: "Quick deposits via JazzCash & Easypaisa. Get your AX Coins credited instantly after verification."
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Growing Community",
      description: "Join thousands of mobile eSports players. Build your reputation and climb the leaderboards."
    },
    {
      icon: <Target className="w-8 h-8" />,
      title: "Real Rewards",
      description: "Win tournaments and earn real money. Convert your AX Coins back to PKR anytime."
    }
  ];

  const stats = [
    { value: "10K+", label: "Active Players" },
    { value: "500+", label: "Tournaments" },
    { value: "₨2M+", label: "Prize Pool" },
    { value: "99.9%", label: "Uptime" }
  ];

  return (
    <div className="min-h-screen relative overflow-hidden" style={{
      background: 'linear-gradient(180deg, #0B0B0F 0%, #14141E 50%, #1A1A2E 100%)'
    }}>
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `
              linear-gradient(rgba(0, 229, 255, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0, 229, 255, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px'
          }}
        />

        <motion.div
          animate={{
            x: [0, 100, 0],
            y: [0, -100, 0],
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl"
          style={{
            background: 'radial-gradient(circle, rgba(0, 229, 255, 0.15) 0%, transparent 70%)'
          }}
        />

        <motion.div
          animate={{
            x: [0, -100, 0],
            y: [0, 100, 0],
            scale: [1, 1.3, 1],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
          className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full blur-3xl"
          style={{
            background: 'radial-gradient(circle, rgba(138, 43, 226, 0.15) 0%, transparent 70%)'
          }}
        />
      </div>

      {/* Navigation */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? 'backdrop-blur-lg bg-[#0B0B0F]/80 shadow-lg shadow-cyan-500/10' : ''
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <motion.div
              className="flex items-center space-x-3"
              whileHover={{ scale: 1.02 }}
            >
              <div className="w-11 h-11 rounded-xl flex items-center justify-center relative overflow-hidden"
                style={{
                  background: 'rgba(0, 229, 255, 0.1)',
                  border: '2px solid rgba(0, 229, 255, 0.3)',
                  backdropFilter: 'blur(10px)'
                }}
              >
                <Gamepad2 className="w-6 h-6 text-cyan-400" />
                <div className="absolute inset-0 bg-cyan-400/20 blur-xl" />
              </div>
              <span className="text-2xl font-bold text-white tracking-wide">ArenaX</span>
            </motion.div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-gray-300 hover:text-cyan-400 transition-colors font-medium">Features</a>
              <a href="#how-it-works" className="text-gray-300 hover:text-cyan-400 transition-colors font-medium">How It Works</a>
              <a href="#stats" className="text-gray-300 hover:text-cyan-400 transition-colors font-medium">Stats</a>
              <motion.a
                href="/login"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-2.5 rounded-xl text-white font-semibold relative overflow-hidden group"
                style={{
                  background: 'rgba(0, 229, 255, 0.1)',
                  border: '2px solid rgba(0, 229, 255, 0.4)',
                  backdropFilter: 'blur(10px)'
                }}
              >
                <span className="relative z-10">Admin Login</span>
                <div className="absolute inset-0 bg-cyan-400/0 group-hover:bg-cyan-400/10 transition-all duration-300" />
              </motion.a>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden text-white"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="md:hidden mt-4 pb-4 space-y-4"
            >
              <a href="#features" className="block text-gray-300 hover:text-cyan-400 transition-colors font-medium">Features</a>
              <a href="#how-it-works" className="block text-gray-300 hover:text-cyan-400 transition-colors font-medium">How It Works</a>
              <a href="#stats" className="block text-gray-300 hover:text-cyan-400 transition-colors font-medium">Stats</a>
              <a
                href="/login"
                className="block px-6 py-2.5 rounded-xl text-white font-semibold text-center"
                style={{
                  background: 'rgba(0, 229, 255, 0.1)',
                  border: '2px solid rgba(0, 229, 255, 0.4)',
                  backdropFilter: 'blur(10px)'
                }}
              >
                Admin Login
              </a>
            </motion.div>
          )}
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="inline-block px-4 py-2 rounded-full mb-6"
                style={{
                  background: 'rgba(0, 229, 255, 0.1)',
                  border: '1px solid rgba(0, 229, 255, 0.3)'
                }}
              >
                <span className="text-cyan-400 font-semibold">🎮 Pakistan's #1 Mobile eSports Platform</span>
              </motion.div>

              <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
                <span className="text-white">Control the Game.</span>
                <br />
                <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
                  Command the Arena.
                </span>
              </h1>

              <p className="text-xl text-gray-400 mb-8 leading-relaxed">
                Join the ultimate mobile eSports tournament platform. Compete, win, and earn real money with our innovative AX Coin economy. Your path to glory starts here.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <motion.button
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 rounded-xl text-white font-bold text-lg flex items-center justify-center space-x-2 relative overflow-hidden group"
                  style={{
                    background: 'rgba(0, 229, 255, 0.15)',
                    border: '2px solid rgba(0, 229, 255, 0.5)',
                    backdropFilter: 'blur(10px)',
                    boxShadow: '0 0 30px rgba(0, 229, 255, 0.2)'
                  }}
                >
                  <span className="relative z-10">Start Playing</span>
                  <ChevronRight className="w-5 h-5 relative z-10" />
                  <div className="absolute inset-0 bg-cyan-400/0 group-hover:bg-cyan-400/20 transition-all duration-300" />
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 rounded-xl text-white font-bold text-lg relative overflow-hidden group"
                  style={{
                    background: 'rgba(255, 255, 255, 0.03)',
                    border: '2px solid rgba(138, 43, 226, 0.3)',
                    backdropFilter: 'blur(10px)'
                  }}
                >
                  <span className="relative z-10">Learn More</span>
                  <div className="absolute inset-0 bg-purple-500/0 group-hover:bg-purple-500/10 transition-all duration-300" />
                </motion.button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="relative w-full aspect-square max-w-lg mx-auto">
                <motion.div
                  animate={{
                    rotate: 360
                  }}
                  transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                  className="absolute inset-0 rounded-full"
                  style={{
                    background: 'conic-gradient(from 0deg, #00E5FF, #8A2BE2, #00E5FF)',
                    opacity: 0.3,
                    filter: 'blur(40px)'
                  }}
                />
                
                <div className="relative w-full h-full rounded-3xl p-8 flex items-center justify-center"
                  style={{
                    background: 'rgba(255, 255, 255, 0.03)',
                    border: '2px solid rgba(0, 229, 255, 0.2)',
                    backdropFilter: 'blur(20px)',
                    boxShadow: '0 0 60px rgba(0, 229, 255, 0.2)'
                  }}
                >
                  <Trophy className="w-64 h-64 text-cyan-400" style={{ filter: 'drop-shadow(0 0 30px rgba(0, 229, 255, 0.6))' }} />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section id="stats" className="py-20 px-6 relative">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center p-6 rounded-2xl"
                style={{
                  background: 'rgba(255, 255, 255, 0.03)',
                  border: '1px solid rgba(0, 229, 255, 0.2)',
                  backdropFilter: 'blur(10px)'
                }}
              >
                <div className="text-4xl md:text-5xl font-bold mb-2 bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
                  {stat.value}
                </div>
                <div className="text-gray-400 text-sm md:text-base">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-6 relative">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Why Choose ArenaX?
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Experience the future of mobile eSports with cutting-edge features designed for competitive gaming.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className="p-8 rounded-2xl group cursor-pointer"
                style={{
                  background: 'rgba(255, 255, 255, 0.03)',
                  border: '1px solid rgba(0, 229, 255, 0.2)',
                  backdropFilter: 'blur(10px)'
                }}
              >
                <div className="mb-4 text-cyan-400 group-hover:scale-110 transition-transform">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                <p className="text-gray-400 leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 px-6 relative">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              How ArenaX Works
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Simple steps to start your eSports journey and win real rewards.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { step: "01", title: "Create Account", desc: "Sign up and verify your JazzCash or Easypaisa number" },
              { step: "02", title: "Buy AX Coins", desc: "Send payment and get coins credited instantly (1 PKR = 1 AX Coin)" },
              { step: "03", title: "Join & Win", desc: "Enter tournaments, compete, and earn real money rewards" }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="relative p-8 rounded-2xl"
                style={{
                  background: 'rgba(255, 255, 255, 0.03)',
                  border: '1px solid rgba(0, 229, 255, 0.2)',
                  backdropFilter: 'blur(10px)'
                }}
              >
                <div className="text-6xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent opacity-20">
                  {item.step}
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">{item.title}</h3>
                <p className="text-gray-400">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 relative">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative p-12 rounded-3xl text-center overflow-hidden"
            style={{
              background: 'rgba(255, 255, 255, 0.03)',
              border: '2px solid rgba(0, 229, 255, 0.3)',
              backdropFilter: 'blur(20px)'
            }}
          >
            <div className="absolute inset-0 opacity-10"
              style={{
                background: 'linear-gradient(135deg, #00E5FF 0%, #8A2BE2 100%)'
              }}
            />
            <div className="relative z-10">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                Ready to Dominate?
              </h2>
              <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                Join thousands of players competing for real prizes. Your arena awaits.
              </p>
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="px-10 py-4 rounded-xl text-white font-bold text-lg relative overflow-hidden group"
                style={{
                  background: 'rgba(0, 229, 255, 0.15)',
                  border: '2px solid rgba(0, 229, 255, 0.5)',
                  backdropFilter: 'blur(10px)',
                  boxShadow: '0 0 40px rgba(0, 229, 255, 0.3)'
                }}
              >
                <span className="relative z-10">Get Started Now</span>
                <div className="absolute inset-0 bg-cyan-400/0 group-hover:bg-cyan-400/20 transition-all duration-300" />
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-cyan-500/20">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="w-11 h-11 rounded-xl flex items-center justify-center relative overflow-hidden"
              style={{
                background: 'rgba(0, 229, 255, 0.1)',
                border: '2px solid rgba(0, 229, 255, 0.3)',
                backdropFilter: 'blur(10px)'
              }}
            >
              <Gamepad2 className="w-6 h-6 text-cyan-400" />
              <div className="absolute inset-0 bg-cyan-400/20 blur-xl" />
            </div>
            <span className="text-2xl font-bold text-white tracking-wide">ArenaX</span>
          </div>
          <p className="text-gray-400 mb-4">
            Pakistan's Premier Mobile eSports Tournament Platform
          </p>
          <p className="text-gray-500 text-sm">
            © 2025 ArenaX. All rights reserved. Built with passion for gamers.
          </p>
        </div>
      </footer>

      <style>{`
        ::selection {
          background-color: rgba(0, 229, 255, 0.3);
          color: white;
        }

        html {
          scroll-behavior: smooth;
        }

        ::-webkit-scrollbar {
          width: 10px;
        }

        ::-webkit-scrollbar-track {
          background: rgba(11, 11, 15, 0.5);
        }

        ::-webkit-scrollbar-thumb {
          background: linear-gradient(180deg, #00E5FF 0%, #8A2BE2 100%);
          border-radius: 5px;
        }
      `}</style>
    </div>
  );
};

export default LandingPage;
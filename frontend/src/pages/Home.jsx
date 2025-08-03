import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { Ship, Container, Users, Clock, Activity, Globe, Truck, Waves, MapPin, Phone, Mail } from 'lucide-react'; // Added MapPin, Phone, Mail icons

const Home = ({ isTransitioning = false, onBackToLogin = () => {} }) => {
  const [scrollY, setScrollY] = useState(0);
  const navigate = useNavigate();
  const [visibleSections, setVisibleSections] = useState(new Set());

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
      
      // Check which sections are visible
      const sections = document.querySelectorAll('[data-scroll-section]');
      const visible = new Set();
      
      sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight * 0.8 && rect.bottom > 0;
        if (isVisible) {
          visible.add(section.dataset.scrollSection);
        }
      });
      
      setVisibleSections(visible);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Real-time data simulation
  const [liveData, setLiveData] = useState({
    currentTEUs: 7600000,
    todayTEUs: 2847,
    shipsInPort: 24,
    totalBerths: 32
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setLiveData(prev => ({
        ...prev,
        todayTEUs: prev.todayTEUs + Math.floor(Math.random() * 5),
        shipsInPort: Math.max(15, Math.min(32, prev.shipsInPort + (Math.random() > 0.5 ? 1 : -1)))
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`min-h-screen relative overflow-hidden transition-all duration-1000 ${isTransitioning ? 'scale-90 blur-sm opacity-0' : 'scale-100 blur-0 opacity-100'}`}>
      {/* Dynamic Background with Parallax - Updated with your blue colors */}
      <div 
        className="fixed inset-0 transition-transform duration-100"
        style={{
          background: 'linear-gradient(135deg, #A3C5F1 0%, #192338 20%, #6582AA 40%, #4B6387 60%, #334663 80%, #1E2B40 90%, #0C121D 100%)',
          transform: `translateY(${scrollY * 0.3}px)`
        }}
      >
        <div className="absolute inset-0">
          <div 
            className="absolute top-20 right-10 w-64 h-64 rounded-full mix-blend-multiply filter blur-3xl animate-pulse opacity-30" 
            style={{
              backgroundColor: '#6582AA',
              transform: `translate(${scrollY * 0.1}px, ${scrollY * 0.15}px)`
            }}
          ></div>
          <div 
            className="absolute bottom-20 left-10 w-80 h-80 rounded-full mix-blend-multiply filter blur-3xl opacity-30" 
            style={{
              backgroundColor: '#4B6387',
              transform: `translate(${-scrollY * 0.08}px, ${scrollY * 0.12}px)`,
              animationDelay: '3s'
            }}
          ></div>
        </div>
        
        {/* Animated Geometric patterns */}
        <div className="absolute inset-0 opacity-10">
          <div 
            className="absolute top-1/4 left-1/4 w-32 h-32 border-2" 
            style={{
              borderColor: '#A3C5F1',
              transform: `rotate(${45 + scrollY * 0.1}deg) translate(${scrollY * 0.05}px, ${scrollY * 0.03}px)`
            }}
          ></div>
          <div 
            className="absolute top-3/4 right-1/4 w-24 h-24 border-2 animate-pulse" 
            style={{
              borderColor: '#192338',
              transform: `rotate(${12 + scrollY * 0.08}deg) translate(${-scrollY * 0.04}px, ${scrollY * 0.06}px)`
            }}
          ></div>
        </div>
      </div>

      {/* Header with scroll effect - Fixed logo implementation */}
      <nav 
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          backgroundColor: scrollY > 50 ? 'rgba(0, 0, 0, 0.9)' : 'rgba(0, 0, 0, 0.6)',
          backdropFilter: 'blur(20px)',
          borderBottom: scrollY > 50 ? '1px solid rgba(255, 255, 255, 0.2)' : '1px solid rgba(255, 255, 255, 0.1)'
        }}
      >
        <div className="px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <div>
                <img 
                  src="/img/TM_logo.png" 
                  alt="Tanger Med Logo" 
                  className="w-10 h-10 object-contain transition-all duration-300 group-hover:scale-110"
                  style={{ display: 'block' }}
                />
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">TANGER MED</h1>
                <p className="text-sm" style={{color: '#A3C5F1'}}>Journey Manager</p>
              </div>
            </div>
            <div className="flex items-center space-x-6">
            <a
               href="https://www.tangermedport.com/en/"
               target="_blank"
                rel="noopener noreferrer"
            className="text-white hover:opacity-75 transition-all duration-300 hover:scale-110 hover:text-blue-300 relative group"
         >
    Tanger Med Port Authority
    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-300 transition-all duration-300 group-hover:w-full"></span>
  </a>

              <a
               href="#services"
  className="text-white hover:opacity-75 transition-all duration-300 hover:scale-110 hover:text-blue-300 relative group"
>
  Services
  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-300 transition-all duration-300 group-hover:w-full"></span>
</a>
             
              <a
  href="#contact"
  className="text-white hover:opacity-75 transition-all duration-300 hover:scale-110 hover:text-blue-300 relative group"
>
  Contact
  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-300 transition-all duration-300 group-hover:w-full"></span>
</a>

              <button 
                onClick={() => navigate('/authentication/sign-in')}
                className="px-4 py-2 rounded-lg border border-white/30 text-white hover:bg-white/10 transition-all duration-300 hover:scale-105 hover:border-blue-300 hover:shadow-lg hover:shadow-blue-300/20"
              >
                Login
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="relative z-10 pt-20">
        {/* Hero Section with Parallax */}
        <div 
          className="text-center mb-16 py-20 px-6"
          style={{
            transform: `translateY(${scrollY * 0.2}px)`,
            opacity: Math.max(0, 1 - scrollY / 800)
          }}
        >
          <h2 className="text-6xl font-bold text-white mb-6 animate-fade-in">
            NEW GENERATION OF
          </h2>
          <h3 className="text-7xl font-bold mb-8 animate-fade-in-delay" style={{color: '#A3C5F1'}}>
            PORT LOGISTICS
          </h3>
          <p className="text-xl text-white/80 max-w-2xl mx-auto mb-8 animate-fade-in-delay">
            Africa's leading container port in the Mediterranean with 4 container terminals and a handling capacity of 9 million TEU containers, connecting to 180 ports and 70 countries.
          </p>
          <button className="px-8 py-4 rounded-lg text-white font-semibold text-lg border border-white/30 hover:bg-white/10 transition-all duration-300 animate-fade-in-delay hover:scale-110 hover:border-blue-300 hover:shadow-xl hover:shadow-blue-300/30 hover:rotate-1 group">
            <span className="group-hover:animate-pulse">Get in touch</span>
          </button>
        </div>

        {/* Live Statistics Cards with Scroll Animations */}
        <div 
          className="px-6 mb-16"
          data-scroll-section="stats"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { 
                icon: Container, 
                label: "Annual Capacity", 
                value: "9M TEU", 
                color: "#6582AA",
                subtitle: "Leading in Africa"
              },
              { 
                icon: Ship, 
                label: "Global Connectivity", 
                value: "180", 
                color: "#4B6387",
                subtitle: "Ports worldwide"
              },
              { 
                icon: Users, 
                label: "Passengers/Year", 
                value: "7M+", 
                color: "#B3A2CD",
                subtitle: "Ferry capacity"
              },
              { 
                icon: Globe, 
                label: "Countries Served", 
                value: "70", 
                color: "#334663",
                subtitle: "Across 5 continents"
              }
            ].map((stat, index) => (
              <div 
                key={index} 
                className={`bg-black/40 backdrop-blur-lg rounded-2xl p-6 shadow-lg border border-white/10 hover:shadow-xl hover:border-white/20 transition-all duration-500 transform hover:-translate-y-4 hover:scale-105 hover:rotate-1 group cursor-pointer ${
                  visibleSections.has('stats') ? 'animate-slide-up opacity-100' : 'opacity-0 translate-y-10'
                }`}
                style={{
                  animationDelay: `${index * 150}ms`,
                  transform: `translateX(${Math.sin(scrollY * 0.01 + index) * 5}px) translateY(${Math.cos(scrollY * 0.008 + index) * 3}px)`
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = '0 25px 50px -12px rgba(163, 197, 241, 0.25)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = '';
                }}
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-all duration-300 group-hover:scale-125 group-hover:rotate-12 group-hover:shadow-lg`} style={{backgroundColor: stat.color}}>
                  <stat.icon className="text-white transition-all duration-300 group-hover:animate-pulse" size={24} />
                </div>
                <h3 className="text-3xl font-bold text-white mb-2">
                  {stat.value}
                </h3>
                <p className="text-white/70 mb-1">{stat.label}</p>
                <p className="text-white/50 text-sm">{stat.subtitle}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Live Operations Dashboard */}
        <div 
          className="px-6 mb-16"
          data-scroll-section="operations"
        >
          <div className={`bg-black/40 backdrop-blur-lg rounded-2xl p-8 shadow-lg border border-white/10 transition-all duration-1000 ${
            visibleSections.has('operations') ? 'animate-slide-up opacity-100' : 'opacity-0 translate-y-20'
          }`}>
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-3xl font-bold text-white flex items-center">
                <Activity className="mr-3" style={{color: '#A3C5F1'}} size={32} />
                Live Port Operations
              </h3>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-white/70">Real-time data</span>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-gradient-to-br from-blue-500/20 to-blue-600/20 rounded-xl p-6 border border-blue-400/30 hover:scale-105 hover:rotate-1 transition-all duration-300 cursor-pointer group hover:shadow-xl hover:shadow-blue-400/20">
                <div className="flex items-center justify-between mb-4">
                  <Container className="text-blue-400 group-hover:animate-bounce" size={28} />
                  <span className="text-blue-400 text-sm group-hover:animate-pulse">Live</span>
                </div>
                <p className="text-2xl font-bold text-white mb-1">{liveData.todayTEUs.toLocaleString()}</p>
                <p className="text-blue-300 text-sm">TEUs Today</p>
                <div className="mt-2 bg-blue-400/20 rounded-full h-2">
                  <div className="bg-blue-400 h-2 rounded-full" style={{width: '67%'}}></div>
                </div>
              </div>
              
              <div className="bg-gradient-to-br from-teal-500/20 to-teal-600/20 rounded-xl p-6 border border-teal-400/30 hover:scale-105 hover:rotate-1 transition-all duration-300 cursor-pointer group hover:shadow-xl hover:shadow-teal-400/20">
                <div className="flex items-center justify-between mb-4">
                  <Ship className="text-teal-400 group-hover:animate-bounce" size={28} />
                  <span className="text-teal-400 text-sm group-hover:animate-pulse">Live</span>
                </div>
                <p className="text-2xl font-bold text-white mb-1">{liveData.shipsInPort}/{liveData.totalBerths}</p>
                <p className="text-teal-300 text-sm">Ships in Port</p>
                <div className="mt-2 bg-teal-400/20 rounded-full h-2">
                  <div className="bg-teal-400 h-2 rounded-full" style={{width: `${(liveData.shipsInPort/liveData.totalBerths)*100}%`}}></div>
                </div>
              </div>
              
              <div className="bg-gradient-to-br from-purple-500/20 to-purple-600/20 rounded-xl p-6 border border-purple-400/30 hover:scale-105 hover:rotate-1 transition-all duration-300 cursor-pointer group hover:shadow-xl hover:shadow-purple-400/20">
                <div className="flex items-center justify-between mb-4">
                  <Truck className="text-purple-400 group-hover:animate-bounce" size={28} />
                  <span className="text-purple-400 text-sm group-hover:animate-pulse">Capacity</span>
                </div>
                <p className="text-2xl font-bold text-white mb-1">700K</p>
                <p className="text-purple-300 text-sm">Trucks/Year</p>
                <div className="mt-2 bg-purple-400/20 rounded-full h-2">
                  <div className="bg-purple-400 h-2 rounded-full" style={{width: '82%'}}></div>
                </div>
              </div>
              
              <div className="bg-gradient-to-br from-orange-500/20 to-orange-600/20 rounded-xl p-6 border border-orange-400/30 hover:scale-105 hover:rotate-1 transition-all duration-300 cursor-pointer group hover:shadow-xl hover:shadow-orange-400/20">
                <div className="flex items-center justify-between mb-4">
                  <Clock className="text-orange-400 group-hover:animate-bounce" size={28} />
                  <span className="text-orange-400 text-sm group-hover:animate-pulse">Average</span>
                </div>
                <p className="text-2xl font-bold text-white mb-1">18.5h</p>
                <p className="text-orange-300 text-sm">Ship Turnaround</p>
                <div className="mt-2 bg-orange-400/20 rounded-full h-2">
                  <div className="bg-orange-400 h-2 rounded-full" style={{width: '75%'}}></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Global Connectivity with Scroll Parallax */}
        <div 
          className="px-6 mb-16"
          data-scroll-section="connectivity"
        >
          <div 
            className={`rounded-2xl p-8 text-white transition-all duration-1000 ${
              visibleSections.has('connectivity') ? 'animate-slide-up opacity-100' : 'opacity-0 translate-y-20'
            }`}
            style={{
              background: 'linear-gradient(135deg, #4B6387 0%, #334663 50%, #1E2B40 100%)',
              transform: `translateY(${scrollY * 0.05}px)`
            }}
          >
            <div className="text-center mb-12">
              <h3 className="text-5xl font-bold text-white mb-4">GLOBAL CONNECTIVITY</h3>
              <p className="text-white/80 max-w-3xl mx-auto text-lg">
                Located at the crossroads of main shipping routes, Tanger Med offers weekly connectivity with direct links to over 180 ports and 70 countries on 5 continents. The port is 3 days from Northern Europe, 10 days from America, and 20 days from China.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { region: "Europe", ports: "72", time: "3 days", countries: "Multiple", color: "#A3C5F1" },
                { region: "Africa", ports: "40", time: "Weekly", countries: "22", color: "#6582AA" },
                { region: "Americas", ports: "60", time: "10 days", countries: "Multiple", color: "#4B6387" },
                { region: "Asia", ports: "54", time: "20 days", countries: "Multiple", color: "#B3A2CD" }
              ].map((region, index) => (
                <div 
                  key={index}
                  className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300 hover:scale-110 hover:rotate-2 cursor-pointer group hover:shadow-xl"
                  style={{
                    transform: `translateY(${Math.sin(scrollY * 0.005 + index * 0.5) * 10}px)`,
                    boxShadow: 'none'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow = `0 20px 40px -12px ${region.color}40`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  <div className="w-12 h-12 rounded-lg flex items-center justify-center mb-4 group-hover:scale-125 group-hover:rotate-12 transition-all duration-300" style={{backgroundColor: region.color}}>
                    <Globe className="text-white group-hover:animate-spin" size={24} />
                  </div>
                  <h4 className="text-xl font-bold mb-2">{region.region}</h4>
                  <p className="text-white/80 mb-1">{region.ports} ports connected</p>
                  <p className="text-white/60 text-sm">Transit: {region.time}</p>
                  <p className="text-white/60 text-sm">{region.countries} countries</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Services with Staggered Animations */}
        <div 
          className="px-6 mb-16"
          data-scroll-section="services"
        >
          <div className="text-center mb-12">
            <h3 
            id="services" data-scroll-section="services"
             className="text-5xl font-bold text-white mb-4">PORT SERVICES</h3>
            <p className="text-white/70 max-w-2xl mx-auto text-lg">
              Comprehensive maritime services with cutting-edge technology and world-class infrastructure.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { 
                icon: Container, 
                title: "CONTAINER TERMINALS", 
                description: "4 container terminals with a total capacity of 5.2 million TEUs annually and two kilometers berth length with automated handling systems",
                color: "#6582AA"
              },
              { 
                icon: Users, 
                title: "PASSENGER SERVICES", 
                description: "Annual capacity to process 7 million passengers, connected to 6 European cities across Spain, France, and Italy with modern facilities",
                color: "#4B6387"
              },
              { 
                icon: Waves, 
                title: "LIQUID BULK TERMINAL", 
                description: "Horizon Tangiers Terminal handling 8 million tons of processed hydrocarbons with specialized infrastructure",
                color: "#B3A2CD"
              },
              { 
                icon: Truck, 
                title: "RO-RO OPERATIONS", 
                description: "Advanced roll-on/roll-off facilities handling 700,000 trucks and 2 million vehicles annually",
                color: "#334663"
              },
              { 
                icon: Activity, // Replaced BarChart3 with Activity for variety and common association
                title: "TRANSSHIPMENT HUB", 
                description: "Major transshipment hub for 2M, OCEAN ALLIANCE, THE ALLIANCE with extensive maritime connectivity",
                color: "#8FB3E2"
              },
              { 
                icon: Globe, 
                title: "MULTIMODAL TRANSPORT", 
                description: "Integrated rail, road, and sea connections providing seamless multimodal transport solutions",
                color: "#A3C5F1"
              }
            ].map((service, index) => (
              <div 
                key={index} 
                className={`bg-black/40 backdrop-blur-lg rounded-2xl p-8 border border-white/10 hover:border-white/20 transition-all duration-700 group hover:scale-105 hover:-translate-y-4 hover:rotate-1 cursor-pointer ${
                  visibleSections.has('services') ? 'animate-slide-up opacity-100' : 'opacity-0 translate-y-20'
                }`}
                style={{
                  animationDelay: `${index * 200}ms`,
                  transform: `rotateY(${Math.sin(scrollY * 0.002 + index) * 2}deg) translateZ(0)`
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = `0 25px 50px -12px ${service.color}40`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = '';
                }}
              >
                <div className="flex flex-col items-center text-center">
                  <div 
                    className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-125 group-hover:rotate-12 transition-all duration-500 group-hover:shadow-xl" 
                    style={{backgroundColor: service.color}}
                  >
                    <service.icon className="text-white group-hover:animate-pulse" size={32} />
                  </div>
                  <h4 className="text-xl font-bold text-white mb-4">{service.title}</h4>
                  <p className="text-white/70 leading-relaxed">{service.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Contact Section */}
        <section className="bg-gray-900/80 backdrop-blur-lg py-16 px-6 mb-16" id="contact" data-scroll-section="contact">
          <div className={`max-w-6xl mx-auto transition-all duration-1000 ${
            visibleSections.has('contact') ? 'animate-slide-up opacity-100' : 'opacity-0 translate-y-20'
          }`}>
            <div className="text-center mb-12">
              <h2 className="text-5xl font-bold text-white mb-4">Contactez-Nous</h2>
              <p className="text-white/70 max-w-3xl mx-auto text-lg">
                Pour plus d'informations sur nos services ou pour toute demande spécifique, n'hésitez pas à nous contacter.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Contact Info */}
              <div className="space-y-8">
                {[
                  { icon: MapPin, title: "Adresse", text: "Tanger Med, Maroc" },
                  { icon: Phone, title: "Téléphone", text: "+212 5 39 39 34 00" },
                  { icon: Mail, title: "Email", text: "a.tmpa@tangermed.ma" }
                ].map((item, index) => (
                  <div key={index} className="flex items-start space-x-4 bg-black/30 p-6 rounded-xl border border-white/10 shadow-lg hover:border-blue-400/30 transition-all duration-300">
                    <div className="w-12 h-12 flex-shrink-0 rounded-full bg-blue-500/50 flex items-center justify-center text-white">
                      <item.icon size={24} />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-white mb-1">{item.title}</h3>
                      <p className="text-white/70">{item.text}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Contact Form */}
              <div className="bg-black/30 p-8 rounded-xl shadow-lg border border-white/10 hover:border-blue-400/30 transition-all duration-300">
                <h2 className="text-3xl font-bold text-white mb-6 text-center">Envoyer un message</h2>
                <form className="space-y-6">
                  <div>
                    <input 
                      type="text" 
                      placeholder="Nom complet" 
                      className="w-full p-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300" 
                      required 
                    />
                  </div>
                  <div>
                    <input 
                      type="email" // Changed type to email for better validation
                      placeholder="Email" 
                      className="w-full p-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300" 
                      required 
                    />
                  </div>
                  <div>
                    <textarea 
                      placeholder="Votre message" 
                      rows="6" 
                      className="w-full p-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-400 resize-y transition-all duration-300" 
                      required
                    ></textarea>
                  </div>
                  <div className="text-center">
                    <button 
                      type="submit" 
                      className="px-8 py-3 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-all duration-300 shadow-lg hover:shadow-blue-500/50 transform hover:scale-105"
                    >
                      Envoyer
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>
      </div>

      

      {/* Enhanced CSS for advanced animations */}
      <style dangerouslySetInnerHTML={{
        __html: `
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(50px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
        
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        @keyframes wave {
          0%, 100% { transform: translateX(0); }
          50% { transform: translateX(10px); }
        }
        
        .animate-fade-in {
          animation: fadeIn 1s ease-out;
        }
        
        .animate-fade-in-delay {
          animation: fadeIn 1s ease-out 0.3s both;
        }
        
        .animate-slide-up {
          animation: slideUp 0.8s ease-out both;
        }
        
        .animate-float {
          animation: float linear infinite;
        }
        
        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }
        
        .animate-wave {
          animation: wave 3s ease-in-out infinite;
        }
        
        html {
          scroll-behavior: smooth;
        }
        
        .group {
          transform-style: preserve-3d;
        }
        `
      }} />
    </div>
  );
};

export default Home;
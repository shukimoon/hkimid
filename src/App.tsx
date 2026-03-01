import React, { useState, useEffect } from 'react';
import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';
import { Studio } from 'sanity';
import sanityConfig from '../sanity.config.ts';
import { 
  Globe, 
  Zap, 
  Shield, 
  Users, 
  Cpu, 
  TrendingUp, 
  ChevronRight, 
  Menu, 
  X,
  ExternalLink,
  Award,
  BarChart3,
  Network,
  Activity,
  Battery,
  Scan,
  Scissors
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import ProjectShowcase3D from './components/ProjectShowcase3D';

// Sanity Client Configuration
const client = createClient({
  projectId: '54hpcgpc',
  dataset: 'production',
  useCdn: false, // 暫時關閉 CDN 以確保直接連接
  apiVersion: '2024-01-01', // 更新至較新的 API 版本
});

const builder = imageUrlBuilder(client);
function urlFor(source: any) {
  return builder.image(source);
}

const MatrixBackground = () => {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', resize);
    resize();

    // Multiple layers for 3D depth effect
    const layers = [
      { fontSize: 12, speed: 0.8, opacity: 0.3, color: '#1e40af' }, // Far layer
      { fontSize: 16, speed: 1.5, opacity: 0.5, color: '#3b82f6' }, // Middle layer
      { fontSize: 22, speed: 2.5, opacity: 0.8, color: '#60a5fa' }, // Near layer
    ];

    const characters = '0101010101010101010101010101010101010101010101010101010101010101'; // More binary for "digital space"
    
    const layerData = layers.map(layer => {
      const columns = Math.ceil(canvas.width / layer.fontSize);
      return {
        ...layer,
        drops: Array(columns).fill(0).map(() => Math.random() * canvas.height / layer.fontSize)
      };
    });

    const draw = () => {
      // Clear with slight fade for trail effect
      ctx.fillStyle = 'rgba(2, 6, 23, 0.1)'; // Matches slate-950
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      layerData.forEach(layer => {
        ctx.font = `bold ${layer.fontSize}px monospace`;
        
        for (let i = 0; i < layer.drops.length; i++) {
          const text = characters.charAt(Math.floor(Math.random() * characters.length));
          
          // Add glow effect
          ctx.shadowBlur = 8;
          ctx.shadowColor = layer.color;
          ctx.fillStyle = layer.color;
          ctx.globalAlpha = layer.opacity;

          const x = i * layer.fontSize;
          const y = layer.drops[i] * layer.fontSize;

          ctx.fillText(text, x, y);

          // Reset drop if it reaches bottom or randomly
          if (y > canvas.height && Math.random() > 0.98) {
            layer.drops[i] = 0;
          }
          
          layer.drops[i] += layer.speed * 0.5;
        }
      });

      // Add a radial gradient overlay to create a "tunnel" focus
      const gradient = ctx.createRadialGradient(
        canvas.width / 2, canvas.height / 2, 0,
        canvas.width / 2, canvas.height / 2, canvas.width * 0.8
      );
      gradient.addColorStop(0, 'rgba(2, 6, 23, 0)');
      gradient.addColorStop(1, 'rgba(2, 6, 23, 0.8)');
      ctx.fillStyle = gradient;
      ctx.globalAlpha = 1;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      ctx.shadowBlur = 0; // Reset shadow for next frame
      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 -z-10 pointer-events-none" />;
};

const Navbar = ({ logoUrl }: { logoUrl?: string }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: '關於我們', href: '#about' },
    { name: '核心戰略', href: '#strategy' },
    { name: '核心優勢', href: '#advantages' },
    { name: '重點項目', href: '#projects' },
    { name: '全球合作', href: '#partners' },
  ];

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white/90 backdrop-blur-md shadow-md py-3' : 'bg-transparent py-5'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="flex flex-col">
            <span className={`font-serif font-bold text-sm leading-tight ${isScrolled ? 'text-brand-purple' : 'text-white'}`}>香港創新模式與產業發展研究院</span>
            <span className={`text-[10px] leading-tight opacity-80 ${isScrolled ? 'text-brand-purple-light' : 'text-white'}`}>HK Institute of Innovation Models and Industry Development</span>
          </div>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href} 
              className={`text-sm font-medium transition-colors hover:text-brand-purple-light ${isScrolled ? 'text-gray-700' : 'text-white'}`}
            >
              {link.name}
            </a>
          ))}
          <button className="bg-brand-purple hover:bg-brand-purple-dark text-white px-5 py-2 rounded-full text-sm font-medium transition-all transform hover:scale-105">
            聯繫我們
          </button>
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden text-brand-purple" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <X className={isScrolled ? 'text-brand-purple' : 'text-white'} /> : <Menu className={isScrolled ? 'text-brand-purple' : 'text-white'} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 w-full bg-white shadow-xl py-6 px-6 flex flex-col gap-4 md:hidden"
          >
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href} 
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-gray-800 font-medium py-2 border-b border-gray-100"
              >
                {link.name}
              </a>
            ))}
            <button className="bg-brand-purple text-white py-3 rounded-lg font-medium mt-2">
              聯繫我們
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = ({ dynamicTitle, dynamicImage }: { dynamicTitle?: string, dynamicImage?: string }) => {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0 opacity-20">
        <img 
          src={dynamicImage || "https://picsum.photos/seed/hk-skyline/1920/1080"} 
          alt="HK Skyline" 
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-brand-purple-dark/90 to-blue-700/60"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 text-center text-white">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="font-serif text-4xl md:text-7xl font-bold mb-6 tracking-tight">
            {dynamicTitle || "香港創新模式與產業發展研究院"}
          </h1>
          <p className="text-xl md:text-2xl font-light mb-10 opacity-90 max-w-4xl mx-auto">
            HK Institute of Innovation Models and Industry Development
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <button className="bg-brand-purple hover:bg-brand-purple-dark text-white px-8 py-4 rounded-full text-lg font-semibold transition-all flex items-center justify-center gap-2">
              了解更多 <ChevronRight size={20} />
            </button>
            <button className="bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/30 text-white px-8 py-4 rounded-full text-lg font-semibold transition-all">
              合作洽談
            </button>
          </div>
        </motion.div>
      </div>

      {/* Stats Overlay */}
      <div className="absolute bottom-0 left-0 w-full bg-white/5 backdrop-blur-sm border-t border-white/10 py-8 hidden md:block">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-4 gap-8">
          {[
            { label: '成立年份', value: '2013' },
            { label: '專家團隊', value: '200+' },
            { label: '覆蓋產業', value: '11大類' },
            { label: '估值提升', value: '≥ 50%' },
          ].map((stat, i) => (
            <div key={i} className="text-center border-r border-white/10 last:border-0">
              <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
              <div className="text-sm text-white/60 uppercase tracking-widest">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const About = () => {
  return (
    <section id="about" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="inline-block px-4 py-1 bg-brand-purple/20 text-brand-purple-light rounded-full text-sm font-bold mb-6">
              研究院簡介
            </div>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-white mb-8 leading-tight">
              中國產業出海浪潮中的<br /><span className="text-brand-purple-light">超級樞紐</span>
            </h2>
            <p className="text-gray-400 text-lg mb-6 leading-relaxed">
              香港創新模式與產業發展研究院成立於2013年，依託香港特區政府各創科界機構持份者的科研支持，是香港特區最早專注於雙向產業轉移與深度孵化的研究機構。
            </p>
            <p className="text-gray-400 text-lg mb-8 leading-relaxed">
              作為國際的樞紐窗口，致力於為全球範圍內的企事業單位及科研創新團隊提供全方位、多層次的支持，為創業團隊提供全鏈條的孵化和服務。
            </p>
            <div className="grid grid-cols-2 gap-6">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-brand-purple/20 rounded-lg text-brand-purple-light">
                  <TrendingUp size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-white">賦能企業</h4>
                  <p className="text-sm text-gray-500">助力增值升級轉型</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="p-2 bg-brand-purple/20 rounded-lg text-brand-purple-light">
                  <Globe size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-white">全球佈局</h4>
                  <p className="text-sm text-gray-500">雙向突破本土深耕</p>
                </div>
              </div>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="aspect-square bg-slate-900 rounded-3xl overflow-hidden shadow-2xl border border-white/10">
              <img 
                src="https://picsum.photos/seed/tech-lab/800/800" 
                alt="Tech Lab" 
                className="w-full h-full object-cover opacity-80"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="absolute -bottom-10 -left-10 bg-brand-purple text-white p-8 rounded-2xl shadow-xl hidden lg:block border border-white/10">
              <div className="text-4xl font-bold mb-1 text-white">12+</div>
              <div className="text-sm opacity-80 text-white">載科研積澱<br />深耕產業孵化</div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const Strategy = () => {
  const strategies = [
    {
      title: "「雙循環戰略賦能平臺」",
      desc: "通過香港獨特的超級聯繫人優勢，助力企業實現全球化佈局與本土化深耕的雙向突破。",
      icon: <Network className="w-8 h-8" />,
      color: "brand-purple"
    },
    {
      title: "用好香港「國際場景」",
      desc: "幫助更多海外和內地企業，充分利用香港優勢打造香港戰略支點，前沿佈局全球創新資源網絡。",
      icon: <Globe className="w-8 h-8" />,
      color: "brand-purple-light"
    },
    {
      title: "香港核心「科創生態圈」",
      desc: "助力技術領域前沿研發及成果轉化，賦能企業增值升級轉型，實現價值維度跳升。",
      icon: <Cpu className="w-8 h-8" />,
      color: "brand-purple-dark"
    }
  ];

  return (
    <section id="strategy" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-white mb-4">核心戰略定位</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">順應國家戰略及未來科技發展需求，強化「超級增值人」功能</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {strategies.map((s, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -10 }}
              className="bg-white/5 backdrop-blur-sm p-10 rounded-3xl shadow-sm border border-white/10 flex flex-col items-center text-center"
            >
              <div className={`w-16 h-16 rounded-2xl bg-brand-purple/20 text-brand-purple-light flex items-center justify-center mb-8`}>
                {s.icon}
              </div>
              <h3 className="font-serif text-xl font-bold text-white mb-4">{s.title}</h3>
              <p className="text-gray-400 leading-relaxed">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Advantages = ({ whitePaperUrl }: { whitePaperUrl?: string }) => {
  const advantages = [
    { title: "國家戰略級資源池", desc: "同時對接內地與香港及國際網絡的官方機構", icon: <Shield /> },
    { title: "資源優勢", desc: "唯一同時接入香港科技園+海外法國索菲亞科技園雙向孵化平臺", icon: <Users /> },
    { title: "生態全規模", desc: "覆蓋從芯片到醫療的11大產業協同網絡", icon: <Network /> },
    { title: "合作價值保證", desc: "企業估值提升 ≥ 50%，通過香港上市通道+國際品牌溢價", icon: <TrendingUp /> },
    { title: "國際型技術/產業智囊", desc: "200+專家團隊，覆蓋技術研發、國際法務、跨境金融", icon: <Award /> },
    { title: "雙向增值模式", desc: "技術引進溢價率提升30%，出海企業估值溢價超50%", icon: <BarChart3 /> },
  ];

  return (
    <section id="advantages" className="py-24 relative text-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="max-w-2xl">
            <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4">HK IMID 六大護航優勢</h2>
            <p className="text-brand-purple-light text-lg">全球頂尖機構為什麼選擇與我們同行</p>
          </div>
          {whitePaperUrl ? (
            <a 
              href={whitePaperUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-brand-purple text-white px-6 py-3 rounded-full font-bold hover:bg-brand-purple-dark transition-colors inline-block"
            >
              下載優勢白皮書
            </a>
          ) : (
            <button className="bg-brand-purple text-white px-6 py-3 rounded-full font-bold hover:bg-brand-purple-dark transition-colors">
              下載優勢白皮書
            </button>
          )}
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {advantages.map((adv, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-brand-purple/10 backdrop-blur-md border border-white/10 p-8 rounded-2xl hover:bg-brand-purple/20 transition-all group"
            >
              <div className="text-brand-purple-light mb-6 group-hover:scale-110 transition-transform">
                {React.cloneElement(adv.icon as React.ReactElement<any>, { size: 32 })}
              </div>
              <h3 className="font-serif text-xl font-bold mb-3">{adv.title}</h3>
              <p className="text-white/60 leading-relaxed">{adv.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Projects = () => {
  const projects = [
    {
      id: 1,
      title: "毫米波雷達脊柱智能掃描儀",
      tags: ["精準醫療", "AI生物力學"],
      desc: "全球首款採用0.1mm級穿透精度解析骨骼曲度，輻射強度僅為WiFi的1/50。實現脊椎病症「檢測-評估-干預」全流程數字化。",
      icon: <Scan className="w-12 h-12" />,
      image: "https://picsum.photos/seed/medical-scan/600/400"
    },
    {
      id: 2,
      title: "新一代超級快充可移動充電設備",
      tags: ["新能源", "智能調度"],
      desc: "突破傳統充電樁限制，採用自主導航技術實現全自動尋車充電，10分鐘極速補能，續航超過25km。",
      icon: <Battery className="w-12 h-12" />,
      image: "https://picsum.photos/seed/ev-charging/600/400"
    },
    {
      id: 3,
      title: "基於AI人像識別的生命體徵檢測",
      tags: ["無接觸監測", "FDA認證"],
      desc: "通過攝像頭實時捕捉面部微血管變化，實現醫療級精度的心率、血氧測量，適用於遠程醫療場景。",
      icon: <Activity className="w-12 h-12" />,
      image: "https://picsum.photos/seed/ai-health/600/400"
    },
    {
      id: 4,
      title: "結合AI圖像識別的新一代激光切割",
      tags: ["工業4.0", "智能製造"],
      desc: "搭載深度學習算法實現0.01mm級圖像即時糾偏，良品率提升至99.9%，覆蓋管材加工全流程無人化操作。",
      icon: <Scissors className="w-12 h-12" />,
      image: "https://picsum.photos/seed/laser-cut/600/400"
    }
  ];

  return (
    <section id="projects" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-white mb-4">重點科研項目</h2>
          <p className="text-gray-400">以香港為核心樞紐，實現科技成果的深度轉化與增值</p>
        </div>
        <div className="grid lg:grid-cols-2 gap-12">
          {projects.map((p, i) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex flex-col md:flex-row bg-white/5 backdrop-blur-sm rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all border border-white/10"
            >
              <div className="md:w-2/5 relative">
                <img 
                  src={p.image} 
                  alt={p.title} 
                  className="w-full h-full object-cover opacity-70"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-4 left-4 bg-slate-900/80 backdrop-blur-md p-3 rounded-xl text-brand-purple-light shadow-lg border border-white/10">
                  {p.icon}
                </div>
              </div>
              <div className="md:w-3/5 p-8 flex flex-col">
                <div className="flex flex-wrap gap-2 mb-4">
                  {p.tags.map(tag => (
                    <span key={tag} className="px-3 py-1 bg-brand-purple/20 text-brand-purple-light text-xs font-bold rounded-full uppercase tracking-wider">
                      {tag}
                    </span>
                  ))}
                </div>
                <h3 className="font-serif text-2xl font-bold text-white mb-4">{p.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed mb-6 flex-grow">
                  {p.desc}
                </p>
                <button className="flex items-center gap-2 text-brand-purple-light font-bold hover:gap-4 transition-all">
                  查看詳情 <ChevronRight size={18} />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Partners = () => {
  const partners = [
    { name: "法國索菲亞創新中心", location: "Sophia Antipolis", desc: "歐洲最早、規模最大的科技園區，譽為「法國硅谷」。" },
    { name: "廣東國防科技產業促進會", location: "廣東", desc: "整合國防科技產業，推動軍民融合成果回報社會。" },
    { name: "廣東醫谷", location: "廣東", desc: "專注生物醫藥和醫療器械產業，全球生物醫藥創新中心。" },
    { name: "中星灣產業集團", location: "佛山", desc: "專注產業發展和城市產業升級，推動區域經濟結構優化。" },
    { name: "西南交大微型磁懸浮中心", location: "成都", desc: "促進微型磁懸浮在城市物流、旅遊觀光等方面的應用。" },
  ];

  return (
    <section id="partners" className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-white mb-4">全球聯合發起機構</h2>
          <p className="text-gray-400">構建國際科創生態圈，實現雙向共贏</p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {partners.map((partner, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.02 }}
              className="bg-white/5 backdrop-blur-sm p-8 rounded-2xl shadow-sm border border-white/10"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-brand-purple/20 rounded-full flex items-center justify-center text-brand-purple-light">
                  <Network size={20} />
                </div>
                <div>
                  <h4 className="font-serif font-bold text-white">{partner.name}</h4>
                  <p className="text-xs text-brand-purple-light font-medium">{partner.location}</p>
                </div>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed">
                {partner.desc}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Marquee-like effect for logos or more partners could go here */}
        <div className="mt-20 pt-10 border-t border-white/10">
          <div className="flex flex-wrap justify-center items-center gap-12 opacity-30 grayscale hover:grayscale-0 transition-all">
            <div className="text-2xl font-black tracking-tighter text-white">TECH'HUB</div>
            <div className="text-2xl font-black tracking-tighter text-white">MEDV</div>
            <div className="text-2xl font-black tracking-tighter text-white">ZHONG XING WAN</div>
            <div className="text-2xl font-black tracking-tighter text-white">SWJTU</div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Events = () => {
  const events = [
    {
      date: "2025.05",
      title: "新加坡 GovWare 展會",
      desc: "助力企業對接全球網絡安全生態資源，整合東南亞數字合規網絡。",
      topic: "網絡安全 / AI安全"
    },
    {
      date: "2025.08",
      title: "廣東國際家庭服務博覽會",
      desc: "聚焦「家康養」全產業鏈，助力家政企業以粵港澳為基點走向國際。",
      topic: "AI健康管理 / 數字平臺"
    },
    {
      date: "2025.10",
      title: "第四屆藥食同源發展大會",
      desc: "搭建「國際標準認證+傳統藥食文化輸出」雙通道，加速大健康產業佈局。",
      topic: "中醫藥 / 大健康"
    }
  ];

  return (
    <section className="py-24 relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-white mb-4">2025 研究院協同活動</h2>
            <p className="text-gray-400">整合國際資源，為出海企業提供全週期服務</p>
          </div>
          <button className="text-brand-purple-light font-bold flex items-center gap-2">
            查看完整日曆 <ChevronRight size={20} />
          </button>
        </div>
        <div className="space-y-6">
          {events.map((e, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="group flex flex-col md:flex-row items-center gap-8 p-8 bg-white/5 backdrop-blur-sm rounded-3xl hover:bg-brand-purple/20 transition-all border border-white/10 hover:border-brand-purple/40"
            >
              <div className="flex-shrink-0 text-center md:text-left">
                <div className="text-brand-purple-light font-black text-3xl">{e.date}</div>
                <div className="text-gray-500 text-xs uppercase tracking-widest font-bold mt-1">Upcoming Event</div>
              </div>
              <div className="flex-grow">
                <h3 className="font-serif text-xl font-bold text-white mb-2 group-hover:text-brand-purple-light transition-colors">{e.title}</h3>
                <p className="text-gray-400 text-sm">{e.desc}</p>
              </div>
              <div className="flex-shrink-0">
                <span className="px-4 py-2 bg-slate-900 rounded-full text-xs font-bold text-brand-purple-light shadow-sm border border-brand-purple/20">
                  {e.topic}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Footer = ({ logoUrl }: { logoUrl?: string }) => {
  return (
    <footer className="bg-gray-900 text-white pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 lg:col-span-2">
            <div className="flex items-center gap-4 mb-6">
              <div className="flex flex-col">
                <span className="font-serif font-bold text-lg leading-tight">香港創新模式與產業發展研究院</span>
                <span className="text-xs opacity-60">HK Institute of Innovation Models and Industry Development</span>
              </div>
            </div>
            <p className="text-gray-400 max-w-md mb-8 leading-relaxed">
              作為國際的樞紐窗口，致力於為全球範圍內的企事業單位及科研創新團隊提供全方位、多層次的支持，實現雙向共贏。
            </p>
            <div className="flex gap-4">
              {['LinkedIn', 'WeChat', 'Twitter', 'Facebook'].map(social => (
                <a key={social} href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-brand-purple transition-all">
                  <span className="sr-only">{social}</span>
                  <Globe size={18} />
                </a>
              ))}
            </div>
          </div>
          <div>
            <h4 className="font-serif font-bold mb-6 text-lg">快速鏈接</h4>
            <ul className="space-y-4 text-gray-400">
              <li><a href="#about" className="hover:text-white transition-colors">關於我們</a></li>
              <li><a href="#strategy" className="hover:text-white transition-colors">核心戰略</a></li>
              <li><a href="#projects" className="hover:text-white transition-colors">重點項目</a></li>
              <li><a href="#partners" className="hover:text-white transition-colors">全球合作</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-serif font-bold mb-6 text-lg">聯繫我們</h4>
            <ul className="space-y-4 text-gray-400">
              <li className="flex items-start gap-3">
                <Globe size={18} className="mt-1 text-brand-purple-light" />
                <span>香港特別行政區<br />科學園核心大樓</span>
              </li>
              <li className="flex items-center gap-3">
                <Users size={18} className="text-brand-purple-light" />
                <span>info@hkimid.org</span>
              </li>
              <li className="flex items-center gap-3">
                <Zap size={18} className="text-brand-purple-light" />
                <span>+852 2345 6789</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="pt-10 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500">
          <p>© 2025 香港創新模式與產業發展研究院. All rights reserved.</p>
          <div className="flex gap-8">
            <a href="#" className="hover:text-white">隱私政策</a>
            <a href="#" className="hover:text-white">服務條款</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default function App() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [sanityData, setSanityData] = useState<{ title?: string; imageUrl?: string; whitePaperUrl?: string; logoUrl?: string }>({});

  useEffect(() => {
    // 判斷是否訪問管理後台
    if (window.location.pathname.startsWith('/admin')) {
      setIsAdmin(true);
      return;
    }

    const fetchData = async () => {
      try {
        // 抓取 siteSettings 類型的文檔，增加超時控制
        const query = `*[_type == "siteSettings"][0]{title, logo, mainImage, whitePaperUrl}`;
        const result = await client.fetch(query).catch(err => {
          if (err.message.includes('Request error')) {
            console.warn("Sanity CORS 尚未設定，請參考說明文件新增來源。");
          }
          throw err;
        });

        if (result) {
          setSanityData({
            title: result.title || undefined,
            imageUrl: result.mainImage ? urlFor(result.mainImage).url() : undefined,
            logoUrl: result.logo ? urlFor(result.logo).url() : undefined,
            whitePaperUrl: result.whitePaperUrl || undefined
          });
        }
      } catch (error) {
        // 僅在開發環境輸出詳細錯誤
        if (process.env.NODE_ENV !== 'production') {
          console.error("Sanity Fetch Error:", error);
        }
      }
    };

    fetchData();
  }, []);

  if (isAdmin) {
    return (
      <div className="h-screen">
        <Studio config={sanityConfig} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 font-sans text-gray-100 selection:bg-brand-purple/20 selection:text-brand-purple">
      <MatrixBackground />
      <Navbar logoUrl={sanityData.logoUrl} />
      <main className="relative z-10">
        <Hero dynamicTitle={sanityData.title} dynamicImage={sanityData.imageUrl} />
        <About />
        <Strategy />
        <ProjectShowcase3D />
        <Advantages whitePaperUrl={sanityData.whitePaperUrl} />
        <Projects />
        <Partners />
        <Events />
      </main>
      <Footer logoUrl={sanityData.logoUrl} />
    </div>
  );
}

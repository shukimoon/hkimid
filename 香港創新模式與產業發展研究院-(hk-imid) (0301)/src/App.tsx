import React, { useState, useEffect } from 'react';
import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';
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

// Sanity Client Configuration
const client = createClient({
  projectId: '54hpcgpc',
  dataset: 'production',
  useCdn: true,
  apiVersion: '2023-05-03',
});

const builder = imageUrlBuilder(client);
function urlFor(source: any) {
  return builder.image(source);
}

const Navbar = () => {
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
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-blue-900 rounded-full flex items-center justify-center text-white font-bold text-xl">IM</div>
          <div className="flex flex-col">
            <span className={`font-bold text-sm leading-tight ${isScrolled ? 'text-blue-900' : 'text-white'}`}>香港創新模式與產業發展研究院</span>
            <span className={`text-[10px] leading-tight opacity-80 ${isScrolled ? 'text-blue-800' : 'text-white'}`}>HK Institute of Innovation Models and Industry Development</span>
          </div>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href} 
              className={`text-sm font-medium transition-colors hover:text-blue-500 ${isScrolled ? 'text-gray-700' : 'text-white'}`}
            >
              {link.name}
            </a>
          ))}
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-full text-sm font-medium transition-all transform hover:scale-105">
            聯繫我們
          </button>
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden text-blue-900" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <X className={isScrolled ? 'text-blue-900' : 'text-white'} /> : <Menu className={isScrolled ? 'text-blue-900' : 'text-white'} />}
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
            <button className="bg-blue-600 text-white py-3 rounded-lg font-medium mt-2">
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
      <div className="absolute inset-0 z-0">
        <img 
          src={dynamicImage || "https://picsum.photos/seed/hk-skyline/1920/1080"} 
          alt="HK Skyline" 
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 to-black/60"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 text-center text-white">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl md:text-7xl font-bold mb-6 tracking-tight">
            {dynamicTitle || "香港創新模式與產業發展研究院"}
          </h1>
          <p className="text-xl md:text-2xl font-light mb-10 opacity-90 max-w-4xl mx-auto">
            HK Institute of Innovation Models and Industry Development
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-full text-lg font-semibold transition-all flex items-center justify-center gap-2">
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
    <section id="about" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="inline-block px-4 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-bold mb-6">
              研究院簡介
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 leading-tight">
              中國產業出海浪潮中的<br /><span className="text-blue-600">超級樞紐</span>
            </h2>
            <p className="text-gray-600 text-lg mb-6 leading-relaxed">
              香港創新模式與產業發展研究院成立於2013年，依託香港特區政府各創科界機構持份者的科研支持，是香港特區最早專注於雙向產業轉移與深度孵化的研究機構。
            </p>
            <p className="text-gray-600 text-lg mb-8 leading-relaxed">
              作為國際的樞紐窗口，致力於為全球範圍內的企事業單位及科研創新團隊提供全方位、多層次的支持，為創業團隊提供全鏈條的孵化和服務。
            </p>
            <div className="grid grid-cols-2 gap-6">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-blue-50 rounded-lg text-blue-600">
                  <TrendingUp size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900">賦能企業</h4>
                  <p className="text-sm text-gray-500">助力增值升級轉型</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="p-2 bg-blue-50 rounded-lg text-blue-600">
                  <Globe size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900">全球佈局</h4>
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
            <div className="aspect-square bg-gray-100 rounded-3xl overflow-hidden shadow-2xl">
              <img 
                src="https://picsum.photos/seed/tech-lab/800/800" 
                alt="Tech Lab" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="absolute -bottom-10 -left-10 bg-blue-600 text-white p-8 rounded-2xl shadow-xl hidden lg:block">
              <div className="text-4xl font-bold mb-1">12+</div>
              <div className="text-sm opacity-80">載科研積澱<br />深耕產業孵化</div>
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
      color: "blue"
    },
    {
      title: "用好香港「國際場景」",
      desc: "幫助更多海外和內地企業，充分利用香港優勢打造香港戰略支點，前沿佈局全球創新資源網絡。",
      icon: <Globe className="w-8 h-8" />,
      color: "indigo"
    },
    {
      title: "香港核心「科創生態圈」",
      desc: "助力技術領域前沿研發及成果轉化，賦能企業增值升級轉型，實現價值維度跳升。",
      icon: <Cpu className="w-8 h-8" />,
      color: "emerald"
    }
  ];

  return (
    <section id="strategy" className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">核心戰略定位</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">順應國家戰略及未來科技發展需求，強化「超級增值人」功能</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {strategies.map((s, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -10 }}
              className="bg-white p-10 rounded-3xl shadow-sm border border-gray-100 flex flex-col items-center text-center"
            >
              <div className={`w-16 h-16 rounded-2xl bg-${s.color}-50 text-${s.color}-600 flex items-center justify-center mb-8`}>
                {s.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">{s.title}</h3>
              <p className="text-gray-500 leading-relaxed">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Advantages = () => {
  const advantages = [
    { title: "國家戰略級資源池", desc: "同時對接內地與香港及國際網絡的官方機構", icon: <Shield /> },
    { title: "資源優勢", desc: "唯一同時接入香港科技園+海外法國索菲亞科技園雙向孵化平臺", icon: <Users /> },
    { title: "生態全規模", desc: "覆蓋從芯片到醫療的11大產業協同網絡", icon: <Network /> },
    { title: "合作價值保證", desc: "企業估值提升 ≥ 50%，通過香港上市通道+國際品牌溢價", icon: <TrendingUp /> },
    { title: "國際型技術/產業智囊", desc: "200+專家團隊，覆蓋技術研發、國際法務、跨境金融", icon: <Award /> },
    { title: "雙向增值模式", desc: "技術引進溢價率提升30%，出海企業估值溢價超50%", icon: <BarChart3 /> },
  ];

  return (
    <section id="advantages" className="py-24 bg-blue-900 text-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="max-w-2xl">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">HK IMID 七大護航優勢</h2>
            <p className="text-blue-200 text-lg">全球頂尖機構為什麼選擇與我們同行</p>
          </div>
          <button className="bg-white text-blue-900 px-6 py-3 rounded-full font-bold hover:bg-blue-50 transition-colors">
            下載優勢白皮書
          </button>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {advantages.map((adv, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-white/5 border border-white/10 p-8 rounded-2xl hover:bg-white/10 transition-all group"
            >
              <div className="text-blue-400 mb-6 group-hover:scale-110 transition-transform">
                {React.cloneElement(adv.icon as React.ReactElement, { size: 32 })}
              </div>
              <h3 className="text-xl font-bold mb-3">{adv.title}</h3>
              <p className="text-blue-100/60 leading-relaxed">{adv.desc}</p>
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
    <section id="projects" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">重點科研項目</h2>
          <p className="text-gray-600">以香港為核心樞紐，實現科技成果的深度轉化與增值</p>
        </div>
        <div className="grid lg:grid-cols-2 gap-12">
          {projects.map((p, i) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex flex-col md:flex-row bg-gray-50 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all border border-gray-100"
            >
              <div className="md:w-2/5 relative">
                <img 
                  src={p.image} 
                  alt={p.title} 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md p-3 rounded-xl text-blue-600 shadow-lg">
                  {p.icon}
                </div>
              </div>
              <div className="md:w-3/5 p-8 flex flex-col">
                <div className="flex flex-wrap gap-2 mb-4">
                  {p.tags.map(tag => (
                    <span key={tag} className="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-bold rounded-full uppercase tracking-wider">
                      {tag}
                    </span>
                  ))}
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{p.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-6 flex-grow">
                  {p.desc}
                </p>
                <button className="flex items-center gap-2 text-blue-600 font-bold hover:gap-4 transition-all">
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
    <section id="partners" className="py-24 bg-gray-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">全球聯合發起機構</h2>
          <p className="text-gray-600">構建國際科創生態圈，實現雙向共贏</p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {partners.map((partner, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.02 }}
              className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center text-blue-600">
                  <Network size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900">{partner.name}</h4>
                  <p className="text-xs text-blue-600 font-medium">{partner.location}</p>
                </div>
              </div>
              <p className="text-gray-500 text-sm leading-relaxed">
                {partner.desc}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Marquee-like effect for logos or more partners could go here */}
        <div className="mt-20 pt-10 border-t border-gray-200">
          <div className="flex flex-wrap justify-center items-center gap-12 opacity-50 grayscale hover:grayscale-0 transition-all">
            <div className="text-2xl font-black tracking-tighter text-gray-400">TECH'HUB</div>
            <div className="text-2xl font-black tracking-tighter text-gray-400">MEDV</div>
            <div className="text-2xl font-black tracking-tighter text-gray-400">ZHONG XING WAN</div>
            <div className="text-2xl font-black tracking-tighter text-gray-400">SWJTU</div>
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
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">2025 研究院協同活動</h2>
            <p className="text-gray-600">整合國際資源，為出海企業提供全週期服務</p>
          </div>
          <button className="text-blue-600 font-bold flex items-center gap-2">
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
              className="group flex flex-col md:flex-row items-center gap-8 p-8 bg-gray-50 rounded-3xl hover:bg-blue-50 transition-all border border-transparent hover:border-blue-100"
            >
              <div className="flex-shrink-0 text-center md:text-left">
                <div className="text-blue-600 font-black text-3xl">{e.date}</div>
                <div className="text-gray-400 text-xs uppercase tracking-widest font-bold mt-1">Upcoming Event</div>
              </div>
              <div className="flex-grow">
                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-900 transition-colors">{e.title}</h3>
                <p className="text-gray-500 text-sm">{e.desc}</p>
              </div>
              <div className="flex-shrink-0">
                <span className="px-4 py-2 bg-white rounded-full text-xs font-bold text-blue-600 shadow-sm border border-blue-50">
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

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 lg:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-2xl">IM</div>
              <div className="flex flex-col">
                <span className="font-bold text-lg leading-tight">香港創新模式與產業發展研究院</span>
                <span className="text-xs opacity-60">HK Institute of Innovation Models and Industry Development</span>
              </div>
            </div>
            <p className="text-gray-400 max-w-md mb-8 leading-relaxed">
              作為國際的樞紐窗口，致力於為全球範圍內的企事業單位及科研創新團隊提供全方位、多層次的支持，實現雙向共贏。
            </p>
            <div className="flex gap-4">
              {['LinkedIn', 'WeChat', 'Twitter', 'Facebook'].map(social => (
                <a key={social} href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-blue-600 transition-all">
                  <span className="sr-only">{social}</span>
                  <Globe size={18} />
                </a>
              ))}
            </div>
          </div>
          <div>
            <h4 className="font-bold mb-6 text-lg">快速鏈接</h4>
            <ul className="space-y-4 text-gray-400">
              <li><a href="#about" className="hover:text-white transition-colors">關於我們</a></li>
              <li><a href="#strategy" className="hover:text-white transition-colors">核心戰略</a></li>
              <li><a href="#projects" className="hover:text-white transition-colors">重點項目</a></li>
              <li><a href="#partners" className="hover:text-white transition-colors">全球合作</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-6 text-lg">聯繫我們</h4>
            <ul className="space-y-4 text-gray-400">
              <li className="flex items-start gap-3">
                <Globe size={18} className="mt-1 text-blue-500" />
                <span>香港特別行政區<br />科學園核心大樓</span>
              </li>
              <li className="flex items-center gap-3">
                <Users size={18} className="text-blue-500" />
                <span>info@hkimid.org</span>
              </li>
              <li className="flex items-center gap-3">
                <Zap size={18} className="text-blue-500" />
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
  const [sanityData, setSanityData] = useState<{ title?: string; imageUrl?: string }>({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Query for a document that has both title and mainImage
        // We try common types like 'post', 'page', or just any document with these fields
        const query = `*[_type in ["post", "page", "siteSettings"] || (defined(title) && defined(mainImage))][0]{title, mainImage}`;
        const result = await client.fetch(query);
        if (result) {
          setSanityData({
            title: result.title,
            imageUrl: result.mainImage ? urlFor(result.mainImage).url() : undefined
          });
        }
      } catch (error) {
        console.error("Error fetching from Sanity:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="min-h-screen font-sans text-gray-900 selection:bg-blue-100 selection:text-blue-900">
      <Navbar />
      <main>
        <Hero dynamicTitle={sanityData.title} dynamicImage={sanityData.imageUrl} />
        <About />
        <Strategy />
        <Advantages />
        <Projects />
        <Partners />
        <Events />
      </main>
      <Footer />
    </div>
  );
}

import React, { useState, useRef } from 'react';
import { Upload, Download, Image as ImageIcon, Type, ShieldCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const [logo, setLogo] = useState<string | null>(null);
  const [instituteName, setInstituteName] = useState('香港創新模式與產業發展研究院');
  const [englishName, setEnglishName] = useState('HK Institute of Innovation Models and Industry Development');
  const [isDragging, setIsDragging] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (readerEvent) => {
        setLogo(readerEvent.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const onDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const onDragLeave = () => {
    setIsDragging(false);
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (readerEvent) => {
        setLogo(readerEvent.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8 flex flex-col items-center">
      <header className="w-full max-w-4xl mb-12 text-center">
        <h1 className="text-4xl font-bold text-slate-900 tracking-tight mb-2">HKIMID ID Generator</h1>
        <p className="text-slate-500">專業證件與標題生成工具</p>
      </header>

      <main className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        {/* Controls Section */}
        <section className="space-y-8 bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-4 flex items-center gap-2">
              <ImageIcon size={18} className="text-indigo-500" />
              上傳機構 Logo (支持透明 PNG)
            </label>
            <div
              onDragOver={onDragOver}
              onDragLeave={onDragLeave}
              onDrop={onDrop}
              className={`relative border-2 border-dashed rounded-2xl p-8 transition-all duration-200 flex flex-col items-center justify-center cursor-pointer ${
                isDragging ? 'border-indigo-500 bg-indigo-50' : 'border-slate-200 hover:border-indigo-400 hover:bg-slate-50'
              }`}
              onClick={() => document.getElementById('logo-upload')?.click()}
            >
              <input
                id="logo-upload"
                type="file"
                className="hidden"
                accept="image/png,image/svg+xml"
                onChange={handleLogoUpload}
              />
              {logo ? (
                <div className="relative group">
                  <img src={logo} alt="Logo Preview" className="h-24 object-contain" referrerPolicy="no-referrer" />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                    <p className="text-white text-xs font-medium">點擊更換</p>
                  </div>
                </div>
              ) : (
                <>
                  <Upload className="text-slate-400 mb-3" size={32} />
                  <p className="text-sm text-slate-500 font-medium text-center">
                    拖放圖片或點擊上傳<br />
                    <span className="text-xs text-slate-400 mt-1 block">建議使用透明背景的 PNG 格式</span>
                  </p>
                </>
              )}
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2">
                <Type size={18} className="text-indigo-500" />
                中文名稱
              </label>
              <input
                type="text"
                value={instituteName}
                onChange={(e) => setInstituteName(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
                placeholder="輸入機構中文名稱"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2">
                <Type size={18} className="text-indigo-500" />
                英文名稱
              </label>
              <input
                type="text"
                value={englishName}
                onChange={(e) => setEnglishName(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
                placeholder="Enter English Name"
              />
            </div>
          </div>

          <div className="pt-4">
            <button 
              className="w-full bg-slate-900 text-white py-4 rounded-xl font-semibold flex items-center justify-center gap-2 hover:bg-slate-800 transition-colors shadow-lg shadow-slate-200"
              onClick={() => alert('此功能僅供演示，實際導出可使用 html2canvas 等庫')}
            >
              <Download size={20} />
              導出為高清圖片
            </button>
          </div>
        </section>

        {/* Preview Section */}
        <section className="sticky top-8">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-sm font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
              <ShieldCheck size={16} />
              實時預覽
            </h2>
            <span className="text-xs text-slate-400">1200 x 400px</span>
          </div>

          <div 
            ref={cardRef}
            className="id-card-bg w-full aspect-[3/1] rounded-3xl shadow-2xl flex items-center px-8 md:px-12 relative z-10 border border-white/10"
          >
            <div className="flex items-center gap-6 md:gap-10 w-full">
              {/* Logo Container - The key to transparency is NOT having a background color here */}
              <div className="flex-shrink-0 w-24 h-24 md:w-32 md:h-32 flex items-center justify-center">
                {logo ? (
                  <motion.img 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    src={logo} 
                    alt="Institute Logo" 
                    className="max-w-full max-h-full object-contain drop-shadow-2xl"
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <div className="w-full h-full rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center">
                    <ImageIcon className="text-white/20" size={40} />
                  </div>
                )}
              </div>

              {/* Text Content */}
              <div className="flex flex-col justify-center overflow-hidden">
                <motion.h2 
                  layout
                  className="text-2xl md:text-4xl font-bold text-white mb-1 md:mb-2 tracking-tight leading-tight"
                >
                  {instituteName}
                </motion.h2>
                <motion.p 
                  layout
                  className="text-sm md:text-xl text-white/70 font-medium tracking-wide truncate"
                >
                  {englishName}
                </motion.p>
              </div>
            </div>
          </div>

          {/* Explanation for the user */}
          <div className="mt-8 bg-indigo-50 p-6 rounded-2xl border border-indigo-100">
            <h3 className="text-indigo-900 font-bold mb-3 flex items-center gap-2">
              💡 如何解決透明背景問題？
            </h3>
            <ul className="text-sm text-indigo-800 space-y-2 list-disc pl-5">
              <li>
                <strong>移除背景色：</strong> 確保 Logo 的容器（如 <code>&lt;div&gt;</code>）沒有設置 <code>background-color: white</code> 或 <code>bg-white</code>。
              </li>
              <li>
                <strong>使用透明格式：</strong> 上傳的圖片必須是 <strong>PNG</strong> 或 <strong>SVG</strong> 格式，且在製作時已去除背景。
              </li>
              <li>
                <strong>CSS 混合模式：</strong> 如果 Logo 邊緣有白邊，可以嘗試使用 <code>mix-blend-mode: multiply</code>（僅適用於白色背景）或更好的做法是使用高質量的透明 PNG。
              </li>
              <li>
                <strong>Canvas 導出：</strong> 如果使用 Canvas 繪製，請確保 <code>ctx.clearRect()</code> 被正確調用，且不要手動填充白色背景。
              </li>
            </ul>
          </div>
        </section>
      </main>

      <footer className="mt-20 text-slate-400 text-sm pb-12">
        &copy; 2026 HKIMID ID Generator. All rights reserved.
      </footer>
    </div>
  );
}

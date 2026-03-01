import React, { Suspense, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Float, MeshDistortMaterial, MeshWobbleMaterial, Text, PerspectiveCamera, Environment, ContactShadows } from '@react-three/drei';
import { motion } from 'motion/react';

const InnovationModel = ({ type }: { type: number }) => {
  if (type === 0) {
    // Digital Twin City - Abstract Cubes
    return (
      <group>
        {Array.from({ length: 15 }).map((_, i) => (
          <mesh key={i} position={[Math.sin(i) * 2, Math.cos(i) * 0.5, Math.cos(i) * 2]}>
            <boxGeometry args={[0.5, Math.random() * 2 + 0.5, 0.5]} />
            <meshStandardMaterial color="#3b82f6" wireframe={i % 2 === 0} transparent opacity={0.8} />
          </mesh>
        ))}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1, 0]}>
          <planeGeometry args={[10, 10]} />
          <meshStandardMaterial color="#1e3a8a" transparent opacity={0.2} />
        </mesh>
      </group>
    );
  }

  if (type === 1) {
    // Blockchain & Decryption - Nodes and Links
    return (
      <group>
        <Float speed={3} rotationIntensity={1.5} floatIntensity={2}>
          <mesh>
            <octahedronGeometry args={[1, 0]} />
            <meshStandardMaterial color="#8b5cf6" emissive="#7c3aed" emissiveIntensity={0.5} wireframe />
          </mesh>
          <mesh scale={0.8}>
            <octahedronGeometry args={[1, 0]} />
            <meshStandardMaterial color="#a78bfa" transparent opacity={0.3} />
          </mesh>
        </Float>
        {Array.from({ length: 8 }).map((_, i) => {
          const angle = (i / 8) * Math.PI * 2;
          const x = Math.cos(angle) * 2;
          const z = Math.sin(angle) * 2;
          return (
            <group key={i}>
              <mesh position={[x, Math.sin(Date.now() * 0.001 + i) * 0.5, z]}>
                <boxGeometry args={[0.3, 0.3, 0.3]} />
                <meshStandardMaterial color="#c084fc" />
              </mesh>
              {/* Connection lines would be complex in raw three, using a simple visual proxy */}
              <mesh position={[x/2, 0, z/2]} rotation={[0, -angle, 0]}>
                <boxGeometry args={[1.5, 0.02, 0.02]} />
                <meshStandardMaterial color="#8b5cf6" transparent opacity={0.2} />
              </mesh>
            </group>
          );
        })}
      </group>
    );
  }

  // EV Charging & Future Energy - Battery/Power Visualization
  return (
    <group>
      {/* Battery Base */}
      <mesh position={[0, -1, 0]}>
        <cylinderGeometry args={[1.2, 1.2, 0.2, 32]} />
        <meshStandardMaterial color="#059669" />
      </mesh>
      
      {/* Charging Core */}
      <Float speed={4} rotationIntensity={0.5} floatIntensity={1}>
        <mesh position={[0, 0.5, 0]}>
          <cylinderGeometry args={[0.8, 0.8, 2, 32]} />
          <meshStandardMaterial color="#10b981" transparent opacity={0.4} />
        </mesh>
        {/* Energy Levels */}
        {Array.from({ length: 4 }).map((_, i) => (
          <mesh key={i} position={[0, -0.6 + i * 0.5, 0]}>
            <cylinderGeometry args={[0.7, 0.7, 0.3, 32]} />
            <meshStandardMaterial color="#34d399" emissive="#10b981" emissiveIntensity={1.5} />
          </mesh>
        ))}
      </Float>

      {/* Rising Particles */}
      {Array.from({ length: 12 }).map((_, i) => (
        <Float key={i} speed={2 + Math.random() * 2} position={[Math.random() - 0.5, Math.random() * 2, Math.random() - 0.5]}>
          <mesh>
            <sphereGeometry args={[0.05, 8, 8]} />
            <meshStandardMaterial color="#6ee7b7" emissive="#10b981" />
          </mesh>
        </Float>
      ))}
    </group>
  );
};

const ProjectShowcase3D = () => {
  const [activeTab, setActiveTab] = useState(0);

  const projects = [
    {
      title: "數字孿生城市系統",
      desc: "利用大數據與 AI 構建城市級別的數字模擬，實現資源優化配置與災害預警。",
      color: "text-blue-500"
    },
    {
      title: "去中心化加密技術",
      desc: "專注於區塊鏈底層架構與去加密算法研究，為跨境數據傳輸提供金融級安全保障。",
      color: "text-purple-500"
    },
    {
      title: "超級快充與能源網格",
      desc: "結合物聯網的智慧綠色能源調度系統，實現電動汽車極速補能與電網負載平衡。",
      color: "text-emerald-500"
    }
  ];

  return (
    <section id="innovation-3d" className="py-24 bg-slate-950 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-serif font-bold text-white mb-6"
          >
            沉浸式創新展示
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-gray-400 max-w-2xl mx-auto"
          >
            透過互動式 3D 模型，探索研究院在數字化轉型、前沿計算與永續能源領域的突破性成果。
          </motion.p>
        </div>

        <div className="grid lg:grid-cols-3 gap-12 items-center">
          {/* Controls/Info */}
          <div className="order-2 lg:order-1 space-y-6">
            {projects.map((project, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                onClick={() => setActiveTab(idx)}
                className={`p-6 rounded-2xl cursor-pointer transition-all duration-300 border ${
                  activeTab === idx 
                    ? 'bg-white/10 border-blue-500/50 shadow-[0_0_20px_rgba(59,130,246,0.2)]' 
                    : 'bg-white/5 border-white/10 hover:bg-white/8'
                }`}
              >
                <h3 className={`text-xl font-bold mb-2 ${activeTab === idx ? project.color : 'text-white'}`}>
                  {project.title}
                </h3>
                <p className="text-sm text-gray-400 leading-relaxed">
                  {project.desc}
                </p>
              </motion.div>
            ))}
            
            <div className="pt-6">
              <div className="flex items-center gap-4 text-xs text-gray-500 italic">
                <div className="flex gap-2">
                  <span className="px-2 py-1 bg-white/5 rounded">旋轉: 左鍵</span>
                  <span className="px-2 py-1 bg-white/5 rounded">縮放: 滾輪</span>
                  <span className="px-2 py-1 bg-white/5 rounded">平移: 右鍵</span>
                </div>
              </div>
            </div>
          </div>

          {/* 3D Canvas */}
          <div className="order-1 lg:order-2 lg:col-span-2 h-[500px] md:h-[600px] bg-slate-900/50 rounded-3xl border border-white/10 relative group">
            <Canvas shadows>
              <PerspectiveCamera makeDefault position={[0, 0, 6]} />
              <ambientLight intensity={0.5} />
              <pointLight position={[10, 10, 10]} intensity={1} />
              <spotLight position={[-10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
              
              <Suspense fallback={null}>
                <InnovationModel type={activeTab} />
                <Environment preset="city" />
                <ContactShadows position={[0, -2, 0]} opacity={0.4} scale={10} blur={2.5} far={4} />
              </Suspense>

              <OrbitControls 
                enablePan={true} 
                enableZoom={true} 
                enableRotate={true}
                minDistance={3}
                maxDistance={10}
                autoRotate
                autoRotateSpeed={0.5}
              />
            </Canvas>
            
            {/* Overlay Label */}
            <div className="absolute bottom-6 right-6 bg-black/40 backdrop-blur-md px-4 py-2 rounded-full border border-white/10 text-[10px] text-blue-400 uppercase tracking-widest font-bold">
              Interactive 3D Render Engine v1.0
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectShowcase3D;

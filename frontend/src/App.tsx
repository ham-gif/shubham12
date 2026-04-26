import React, { useState } from "react";
import { Navbar } from "./components/Navbar";
import { SwapCard } from "./components/SwapCard";
import { LiquidityCard } from "./components/LiquidityCard";
import { PriceChart } from "./components/PriceChart";
import { EventLog } from "./components/EventLog";
import { TOKENS } from "./config";
import { LayoutGrid, ArrowRightLeft, Droplets, PieChart as ChartIcon, Zap, TrendingUp, ShieldCheck, Activity } from "lucide-react";
import { usePool } from "./hooks/usePool";

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"swap" | "pool">("swap");
  const { poolStats } = usePool();

  return (
    <div className="min-h-screen bg-[#020203] text-slate-200 selection:bg-primary/30 selection:text-white overflow-x-hidden">
      {/* Background Mesh */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/20 blur-[120px] animate-pulse rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-secondary/10 blur-[120px] animate-pulse rounded-full delay-1000" />
      </div>

      <Navbar />

      <main className="relative pt-24 md:pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="space-y-12">
          
          {/* ─── Hero Section ─────────────────────────────── */}
          <div className="text-center space-y-4 max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 border border-primary/20 rounded-full text-primary text-[10px] font-black uppercase tracking-widest animate-pulse">
              <Zap className="w-3 h-3" />
              Soroban Live on Testnet
            </div>
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tighter text-white">
              Liquid Assets, <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-accent">Seamless Trading.</span>
            </h1>
            <p className="text-slate-400 text-lg md:text-xl font-medium max-w-2xl mx-auto leading-relaxed">
              Experience the next generation of AMM on Aura. Deep liquidity, ultra-low fees, and a UI that feels like the future.

            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

            {/* ─── Left Column: Trading Core ─────────────────────────── */}
            <div className="lg:col-span-4 space-y-8">
              {/* Tab Switcher */}
              <div className="crystal p-1.5 rounded-[2rem] flex shadow-inner">
                <button
                  onClick={() => setActiveTab("swap")}
                  className={`flex-1 flex items-center justify-center gap-2 py-4 rounded-3xl font-extrabold transition-all duration-500 text-sm ${
                    activeTab === "swap" 
                      ? "bg-gradient-to-br from-primary to-secondary text-white shadow-xl shadow-primary/20 scale-100" 
                      : "text-slate-500 hover:text-slate-300 scale-95"
                  }`}
                >
                  <ArrowRightLeft className="w-4 h-4" /> SWAP
                </button>
                <button
                  onClick={() => setActiveTab("pool")}
                  className={`flex-1 flex items-center justify-center gap-2 py-4 rounded-3xl font-extrabold transition-all duration-500 text-sm ${
                    activeTab === "pool" 
                      ? "bg-gradient-to-br from-primary to-secondary text-white shadow-xl shadow-primary/20 scale-100" 
                      : "text-slate-500 hover:text-slate-300 scale-95"
                  }`}
                >
                  <Droplets className="w-4 h-4" /> POOL
                </button>
              </div>

              {/* Active Panel */}
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
                {activeTab === "swap" ? <SwapCard /> : <LiquidityCard />}
              </div>

              {/* Pool Stats Card */}
              <div className="crystal rounded-[2.5rem] p-8 space-y-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <TrendingUp className="w-5 h-5 text-accent" />
                    <h3 className="text-xs font-black uppercase tracking-[0.2em] text-slate-400">Network Stats</h3>
                  </div>
                  <div className="px-2 py-1 bg-success/10 text-success text-[10px] font-bold rounded-lg">LIVE</div>
                </div>
                
                <div className="space-y-4">
                  {[
                    ["Volume (24h)", poolStats?.volumeA || "0.00", "XLM", "text-tokenA"],
                    ["Liquidity", poolStats?.tvlEstimate || "$0.00", "USD", "text-secondary"],
                    ["Swaps", poolStats?.swapCount || "0", "TXNS", "text-accent"],
                  ].map(([label, value, unit, color]) => (
                    <div key={label} className="group cursor-default">
                      <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mb-1">{label}</p>
                      <div className="flex items-baseline gap-2">
                        <span className={`text-2xl font-extrabold tracking-tight transition-all group-hover:translate-x-1 ${color}`}>{value}</span>
                        <span className="text-[10px] text-slate-600 font-mono font-bold">{unit}</span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="pt-6 border-t border-white/5 flex items-center gap-3 text-[10px] text-slate-500 font-bold">
                  <ShieldCheck className="w-4 h-4 text-success" />
                  SECURED BY SOROBAN SMART CONTRACTS
                </div>
              </div>
            </div>

            {/* ─── Right Column: Insights ────────────────────────────── */}
            <div className="lg:col-span-8 space-y-8">
              {/* Analytics Dashboard */}
              <div className="crystal rounded-[3rem] p-8 space-y-8">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center">
                      <ChartIcon className="w-6 h-6 text-secondary" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-black text-white tracking-tighter">Market Overview</h2>
                      <p className="text-xs text-slate-500 font-bold uppercase tracking-widest">{TOKENS.TOKEN_A.symbol} / {TOKENS.TOKEN_B.symbol} Pair</p>
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    {[TOKENS.TOKEN_A, TOKENS.TOKEN_B].map((token, i) => (
                      <div key={token.id} className={`px-4 py-2 bg-white/5 rounded-2xl border border-white/10 flex items-center gap-3`}>
                        <div className={`w-2 h-2 rounded-full ${i === 0 ? 'bg-tokenA' : 'bg-tokenB'}`} />
                        <span className="text-xs font-mono font-bold text-slate-300">
                          {token.id.slice(0, 4)}...{token.id.slice(-4)}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="h-[450px] w-full">
                  <PriceChart />
                </div>
              </div>

              {/* Secondary Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="crystal rounded-[2.5rem] p-8 space-y-6">
                  <div className="flex items-center gap-3">
                    <LayoutGrid className="w-5 h-5 text-accent" />
                    <h2 className="text-sm font-black uppercase tracking-widest text-white">Pool Depth</h2>
                  </div>
                  <div className="h-64 flex flex-col items-center justify-center text-center space-y-4">
                    <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center animate-pulse">
                      <Droplets className="w-8 h-8 text-slate-700" />
                    </div>
                    <p className="text-xs text-slate-500 font-bold uppercase tracking-[0.2em] leading-relaxed">
                      Liquidity Visualization<br />Engine Loading
                    </p>
                  </div>
                </div>
                
                <div className="crystal rounded-[2.5rem] overflow-hidden">
                  <EventLog />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-16 border-t border-white/5 relative z-10 bg-background/50 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center">
                <Activity className="text-white w-5 h-5" />
              </div>
              <span className="text-xl font-black tracking-tighter text-white uppercase">Aura DEX</span>
            </div>
            <p className="text-slate-500 text-sm max-w-sm font-medium">
              The premier liquidity protocol for the Aura ecosystem. High-fidelity trading powered by advanced Soroban logic.

            </p>
          </div>
          <div className="flex flex-col md:items-end gap-6">
            <div className="flex gap-8 text-[11px] font-black uppercase tracking-widest text-slate-400">
              <a href="#" className="hover:text-primary transition-colors">Docs</a>
              <a href="#" className="hover:text-primary transition-colors">GitHub</a>
              <a href="#" className="hover:text-primary transition-colors">Security</a>
            </div>
            <p className="text-[10px] text-slate-600 font-mono font-bold uppercase tracking-[0.3em]">
              V1.0.0-AURORA — AURA GLOBAL 2026

            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;

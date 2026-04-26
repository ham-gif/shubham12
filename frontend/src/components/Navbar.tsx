import React from "react";
import { useWallet } from "../hooks/useWallet";
import { Wallet, LogOut, Activity } from "lucide-react";

export const Navbar: React.FC = () => {
  const { isConnected, publicKey, xlmBalance, connectWallet, disconnectWallet, isLoading } = useWallet();

  return (
    <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-2rem)] max-w-5xl">
      <div className="crystal rounded-[2rem] px-6 py-3 flex justify-between items-center shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center shadow-lg shadow-primary/20 rotate-3 transition-transform hover:rotate-12 duration-500">
            <Activity className="text-white w-6 h-6" />
          </div>
          <div>
            <h1 className="font-extrabold text-lg tracking-tight text-white leading-none">Aura <span className="text-primary">DEX</span></h1>
            <div className="flex items-center gap-1.5 mt-0.5">
              <div className="w-1.5 h-1.5 rounded-full bg-success animate-pulse" />
              <span className="text-[9px] text-slate-400 uppercase tracking-widest font-bold">Aura Testnet</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden lg:flex items-center gap-6 text-sm font-semibold text-slate-400 mr-4">
            <a href="#" className="hover:text-white transition-colors">Trade</a>
            <a href="#" className="hover:text-white transition-colors">Pools</a>
            <a href="#" className="hover:text-white transition-colors">Analytics</a>
          </div>

          {isConnected ? (
            <div className="flex items-center gap-4 bg-white/5 pl-4 pr-2 py-1.5 rounded-2xl border border-white/5 hover:border-white/10 transition-all">
              <div className="flex flex-col items-end">
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-tighter leading-none">
                  {xlmBalance ? `${parseFloat(xlmBalance).toFixed(2)} XLM` : "0.00"}
                </span>
                <span className="text-xs font-mono font-bold text-primary leading-none mt-1">
                  {publicKey?.slice(0, 4)}...{publicKey?.slice(-4)}
                </span>
              </div>
              <button
                onClick={disconnectWallet}
                className="p-2 hover:bg-danger/20 text-slate-400 hover:text-danger rounded-xl transition-all"
                title="Disconnect"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <button
              onClick={connectWallet}
              disabled={isLoading}
              className="btn-aura !py-2.5 !px-5 text-sm"
            >
              <Wallet className="w-4 h-4" />
              {isLoading ? "Connecting..." : "Connect Wallet"}
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

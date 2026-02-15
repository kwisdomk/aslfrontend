import RadialProgress from "./RadialProgress";

interface DashboardHeaderProps {
  globalProgress: number;
  velocity: number;
  primaryFocus?: string;
  totalHours?: number;
}

const DashboardHeader = ({ 
  globalProgress, 
  velocity, 
  primaryFocus = "QRadar Tech Sales",
  totalHours = 0 
}: DashboardHeaderProps) => {
  return (
    <div className="bg-white rounded-[40px] p-10 flex justify-between items-center shadow-sm border border-slate-50">
      <div className="flex-1">
        <h1 className="text-6xl font-bold text-slate-900 mb-2">
          Welcome back, Wisdom.
        </h1>
        <p className="text-slate-500 text-lg">
          You are operating at{" "}
          <span className="text-rose-500 font-bold">{velocity.toFixed(1)}x Velocity</span>.
          {primaryFocus && (
            <>
              {" "}Primary focus is <span className="font-semibold text-slate-700">{primaryFocus}</span>.
            </>
          )}
        </p>
        
        <div className="flex gap-3 mt-8">
          <span className="px-4 py-2 bg-orange-50 text-orange-600 rounded-full text-xs font-bold flex items-center gap-2">
            ⚡ HPI: {velocity.toFixed(1)}
          </span>
          <span className="px-4 py-2 bg-emerald-50 text-emerald-600 rounded-full text-xs font-bold flex items-center gap-2">
            📈 Protocol Balanced
          </span>
          {totalHours > 0 && (
            <span className="px-4 py-2 bg-blue-50 text-blue-600 rounded-full text-xs font-bold flex items-center gap-2">
              ⏱️ {totalHours}h Active
            </span>
          )}
        </div>
      </div>

      {/* Large Radial Progress Indicator */}
      <div className="relative w-48 h-48 shrink-0 ml-8">
        <RadialProgress 
          value={globalProgress} 
          size={192} 
          strokeWidth={12} 
          color="#f43f5e"
          backgroundColor="#f1f5f9"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div className="text-4xl font-black text-slate-900">{Math.round(globalProgress)}%</div>
          <div className="text-xs text-slate-400 font-bold uppercase tracking-wider">Complete</div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;
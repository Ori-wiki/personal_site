export function IsometricWorkspace() {
  return (
    <div className="relative h-[650px] w-full max-w-[760px]">
      <div className="absolute left-24 top-20 h-52 w-[560px] -skew-y-12 rounded-sm bg-[#8d96ad] opacity-80 shadow-[0_28px_70px_rgba(0,0,0,0.45)]" />
      <div className="absolute left-48 top-4 h-[300px] w-[330px] -skew-y-12 bg-[#23252b] shadow-[20px_20px_0_rgba(0,0,0,0.35)]">
        <div className="h-6 bg-[#101116]" />
        <div className="mt-12 mx-auto h-40 w-40 rounded-full bg-[#a328c7] shadow-[8px_8px_0_#111]" />
        <div className="absolute left-[112px] top-[142px] text-7xl font-black tracking-[-0.2em] text-white drop-shadow-[5px_5px_0_#111]">
          DK
        </div>
      </div>
      <div className="absolute left-10 top-20 h-36 w-44 -skew-y-12 bg-[#59616d]/80" />
      <div className="absolute left-20 top-56 h-36 w-28 -skew-y-12 bg-[#59616d]/80" />
      <div className="absolute right-0 top-40 h-44 w-48 -skew-y-12 bg-[#4b5360]/80" />
      <div className="absolute right-20 top-52 h-60 w-48 -skew-y-12 bg-[#111317] shadow-[16px_16px_0_rgba(0,0,0,0.35)]">
        <div className="space-y-2 p-5 text-[8px] leading-tight text-cyan-300">
          <p>const portfolio = build()</p>
          <p className="text-fuchsia-400">interface Motion</p>
          <p className="text-amber-300">return cleanCode</p>
          <p className="text-zinc-300">export default work</p>
        </div>
      </div>
      <div className="absolute bottom-24 left-44 h-20 w-80 -skew-y-12 bg-[#dbe7f5] shadow-[0_22px_30px_rgba(0,0,0,0.45)]">
        <div className="grid grid-cols-10 gap-1 p-3">
          {Array.from({ length: 40 }).map((_, index) => (
            <span key={index} className="h-2 bg-[#8794a9]" />
          ))}
        </div>
      </div>
      <div className="absolute bottom-5 right-28 h-24 w-16 rounded-b-2xl rounded-t-lg bg-zinc-300 shadow-[10px_18px_0_rgba(0,0,0,0.35)]" />
      <div className="absolute bottom-52 left-0 h-20 w-20 rotate-12 bg-[#9d27b8] shadow-[0_24px_35px_rgba(157,39,184,0.35)] [clip-path:polygon(50%_0,100%_50%,50%_100%,0_50%)]" />
    </div>
  );
}

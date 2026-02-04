import { useCurrentFrame, interpolate } from 'remotion';

export const KpiCard: React.FC<{
    title: string;
    value: number;
    unit: string;
    color: 'green' | 'purple';
    icon?: React.ReactNode
}> = ({ title, value, unit, color, icon }) => {
    const frame = useCurrentFrame();

    // Animation: Count up
    const displayValue = interpolate(frame, [0, 30], [0, value], {
        extrapolateRight: 'clamp',
    });

    const borderColor = color === 'green' ? 'border-neon-green' : 'border-neon-purple';
    const textColor = color === 'green' ? 'text-neon-green' : 'text-neon-purple';

    return (
        <div className={`flex flex-col p-6 bg-slate-900/80 backdrop-blur-md rounded-xl border-l-4 ${borderColor} w-full h-full justify-center shadow-lg relative overflow-hidden`}>
            <div className="absolute right-0 top-0 p-4 opacity-10">
                {icon}
            </div>
            <h3 className="text-slate-400 text-sm font-bold uppercase tracking-wider mb-2">{title}</h3>
            <div className="flex items-baseline gap-2">
                <span className={`text-5xl font-mono font-bold ${textColor}`}>
                    {Math.round(displayValue)}
                </span>
                <span className="text-sm text-slate-500">{unit}</span>
            </div>
        </div>
    );
};

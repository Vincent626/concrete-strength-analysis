import { SpringConfig, spring, useCurrentFrame, useVideoConfig } from 'remotion';

export const TitleSequence: React.FC<{ title: string; subtitle: string }> = ({ title, subtitle }) => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    const entrance = spring({
        frame,
        fps,
        config: { damping: 200 },
    });

    const opacity = spring({
        frame: frame - 10,
        fps,
        config: { mass: 0.5 },
    });

    return (
        <div className="flex flex-col items-center justify-center w-full h-full bg-slate-950 text-white">
            <div
                className="text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-neon-blue to-neon-green mb-4 text-center"
                style={{ transform: `scale(${entrance})` }}
            >
                {title}
            </div>
            <div
                className="text-2xl text-slate-400 font-mono tracking-widest uppercase border-t border-slate-700 pt-4"
                style={{ opacity: Math.max(0, opacity) }}
            >
                {subtitle}
            </div>
        </div>
    );
};

import { AbsoluteFill, Sequence, useVideoConfig, Audio, staticFile } from 'remotion';
import { TitleSequence } from './components/TitleSequence';
import { KpiCard } from './components/KpiCard';
import { TrendChart } from './components/TrendChart';
import { ConcreteData } from './utils/loadData';

export const ConcreteReportVideo: React.FC<{ data: ConcreteData[] }> = ({ data }) => {
    const { fps } = useVideoConfig();

    // Data Processing
    const m60Data = data.filter(d => d.type === 'M60');
    const s60Data = data.filter(d => d.type === 'S60');

    // Recent 30 points
    const recentM60 = m60Data.slice(-30);
    const recentS60 = s60Data.slice(-30);

    // Avg Calcs
    const avg = (arr: number[]) => arr.length ? arr.reduce((a, b) => a + b, 0) / arr.length : 0;
    const m60Str = avg(m60Data.map(d => d.strength));
    const m60Curr = avg(m60Data.map(d => d.current));
    const s60Str = avg(s60Data.map(d => d.strength));
    const s60Wb = avg(s60Data.map(d => d.wbRatio));

    return (
        <AbsoluteFill className="bg-slate-950 text-white">

            {/* Scene 1: Intro (0s - 3s) */}
            <Sequence from={0} durationInFrames={3 * fps}>
                <TitleSequence
                    title="Concrete Strength Report"
                    subtitle={`Updated: ${new Date().toLocaleDateString()}`}
                />
            </Sequence>

            {/* Scene 2: M60 Section (3s - 8s) */}
            <Sequence from={3 * fps} durationInFrames={5 * fps}>
                <AbsoluteFill className="flex flex-row p-10 gap-8">
                    {/* Left: KPIs */}
                    <div className="flex flex-col w-1/3 gap-4 justify-center">
                        <h2 className="text-3xl font-bold text-neon-green mb-4">M60 Propulsion Pipe</h2>
                        <div className="h-32">
                            <KpiCard title="Avg Strength" value={m60Str} unit="kgf/cm²" color="green" />
                        </div>
                        <div className="h-32">
                            <KpiCard title="Avg Current" value={m60Curr} unit="A" color="green" />
                        </div>
                    </div>
                    {/* Right: Chart */}
                    <div className="flex-1">
                        <TrendChart
                            data={recentM60.map(d => d.strength)}
                            labels={recentM60.map(d => d.date.substring(5))}
                            label="M60 Strength Trend"
                            color="#00ff9d"
                        />
                    </div>
                </AbsoluteFill>
            </Sequence>

            {/* Scene 3: S60 Section (8s - 13s) */}
            <Sequence from={8 * fps} durationInFrames={5 * fps}>
                <AbsoluteFill className="flex flex-row p-10 gap-8">
                    {/* Left: KPIs */}
                    <div className="flex flex-col w-1/3 gap-4 justify-center">
                        <h2 className="text-3xl font-bold text-neon-purple mb-4">S60 Propulsion Pipe</h2>
                        <div className="h-32">
                            <KpiCard title="Avg Strength" value={s60Str} unit="kgf/cm²" color="purple" />
                        </div>
                        <div className="h-32">
                            <KpiCard title="Avg W/B Ratio" value={s60Wb} unit="W/B" color="purple" />
                        </div>
                    </div>
                    {/* Right: Chart */}
                    <div className="flex-1">
                        <TrendChart
                            data={recentS60.map(d => d.strength)}
                            labels={recentS60.map(d => d.date.substring(5))}
                            label="S60 Strength Trend"
                            color="#bf00ff"
                        />
                    </div>
                </AbsoluteFill>
            </Sequence>

            {/* Scene 4: Outro (13s - 15s) */}
            <Sequence from={13 * fps} durationInFrames={2 * fps}>
                <div className="flex items-center justify-center w-full h-full bg-slate-900">
                    <h1 className="text-4xl font-bold text-white">Powered by AI Agent</h1>
                </div>
            </Sequence>

        </AbsoluteFill>
    );
};

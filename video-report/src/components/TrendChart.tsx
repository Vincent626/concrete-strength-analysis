import { useRef, useEffect } from 'react';
import { Chart, ChartData, ChartOptions, registerables } from 'chart.js';
import { useCurrentFrame, useVideoConfig } from 'remotion';

Chart.register(...registerables);

export const TrendChart: React.FC<{
    data: number[];
    labels: string[];
    label: string;
    color: string;
}> = ({ data, labels, label, color }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const chartRef = useRef<Chart | null>(null);
    const frame = useCurrentFrame();
    const { durationInFrames } = useVideoConfig();

    // Progress 0 -> 1
    const progress = Math.min(frame / (durationInFrames * 0.8), 1);

    useEffect(() => {
        const ctx = canvasRef.current?.getContext('2d');
        if (!ctx) return;

        if (chartRef.current) {
            chartRef.current.destroy();
        }

        const chartData: ChartData = {
            labels: labels,
            datasets: [
                {
                    label: label,
                    data: data,
                    borderColor: color,
                    backgroundColor: color,
                    tension: 0.4,
                    pointRadius: 0,
                    borderWidth: 3,
                },
            ],
        };

        const options: ChartOptions = {
            responsive: true,
            animation: false, // We control animation manually via partial data if needed, but here simple static render is safer for frame-by-frame
            scales: {
                x: {
                    grid: { display: false },
                    ticks: { color: '#94a3b8' }
                },
                y: {
                    grid: { color: '#334155' },
                    ticks: { color: '#e2e8f0' }
                }
            },
            plugins: {
                legend: {
                    labels: { color: '#cbd5e1', font: { family: 'Inter' } }
                }
            }
        };

        chartRef.current = new Chart(ctx, {
            type: 'line',
            data: chartData,
            options: options,
        });

        // Very simple "reveal" animation by clipping the canvas width
        // In a real Remotion chart, we might use chart.js custom plugin or partial data array
        // Here we use CSS clip-path for performance

    }, [data, labels, label, color]);

    return (
        <div className="w-full h-full p-4 bg-slate-900/50 rounded-xl backdrop-blur-sm border border-slate-700">
            <div
                className="w-full h-full relative"
                style={{
                    clipPath: `inset(0 ${100 - (progress * 100)}% 0 0)` // Reveal from left to right
                }}
            >
                <canvas ref={canvasRef} />
            </div>
        </div>
    );
};

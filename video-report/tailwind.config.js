module.exports = {
    content: ['./src/**/*.{ts,tsx}'],
    theme: {
        extend: {
            colors: {
                slate: {
                    850: '#1e293b',
                    900: '#0f172a',
                    950: '#020617',
                },
                neon: {
                    green: '#00ff9d',
                    blue: '#00ccff',
                    red: '#ff3366',
                    purple: '#bf00ff',
                },
            },
            fontFamily: {
                mono: ['JetBrains Mono', 'monospace'],
                sans: ['Inter', 'sans-serif'],
            },
        },
    },
    plugins: [],
};

import { Config } from '@remotion/cli/config';

Config.setVideoImageFormat('jpeg');
Config.setOverwriteOutput(true);

Config.overrideWebpackConfig((currentConfiguration) => {
    const rules = currentConfiguration.module?.rules
        ? currentConfiguration.module.rules.filter((rule) => {
            if (rule && typeof rule === 'object' && 'test' in rule && rule.test instanceof RegExp) {
                return !rule.test.test('.css');
            }
            return true;
        })
        : [];

    return {
        ...currentConfiguration,
        module: {
            ...currentConfiguration.module,
            rules: [
                ...rules,
                {
                    test: /\.css$/i,
                    use: [
                        'style-loader',
                        'css-loader',
                        'postcss-loader',
                    ],
                },
            ],
        },
    };
});

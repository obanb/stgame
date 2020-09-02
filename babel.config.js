module.exports = function(api) {
    api.cache(true);

    const presets = [
        [
            'next/babel',
            {
                useBuiltIns: 'usage',
                targets: {
                    chrome: '71',
                    firefox: '60',
                    safari: '11',
                    opera: '48',
                    edge: '13',
                },
            },
        ],
    ];
    // https://babeljs.io/docs/en/options#compact
    const env = {
        development: {
            compact: false,
        },
    };

    const sourceMaps = true;
    const retainLines = true;

    return {
        presets,
        sourceMaps,
        retainLines,
        env,
    };
};

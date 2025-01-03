const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');

/**
 * Metro configuration
 * https://reactnative.dev/docs/metro
 *
 * @type {import('metro-config').MetroConfig}
 */
const defaultConfig = getDefaultConfig(__dirname);
const { assetExts, sourceExts } = defaultConfig.resolver;

const customConfig = {
    transformer: {
        babelTransformerPath: require.resolve('react-native-svg-transformer'),
    },
    resolver: {
        assetExts: [...assetExts.filter((ext) => ext !== 'svg'), 'png', 'jpg', 'jpeg', 'gif', 'webp'],
        sourceExts: [...sourceExts, 'svg'],
        extraNodeModules: {
            '@component': `${__dirname}/src/components`,
            '@type': `${__dirname}/src/types`,
            '@navigation': `${__dirname}/src/navigation`,
            '@screen': `${__dirname}/src/screens`,
            '@hook': `${__dirname}/src/hooks`,
            '@asset': `${__dirname}/src/assets`,
            '@context': `${__dirname}/src/contexts`,
            '@helper': `${__dirname}/src/helpers`,
            '@api': `${__dirname}/src/api`,
            '@root': `${__dirname}/src`,
        },
    },
};

module.exports = mergeConfig(defaultConfig, customConfig);

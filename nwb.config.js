module.exports = {
    type: 'react-component',
    npm: {
        esModules: true,
        umd: {
            global: 'dsBlueprint',
            externals: {
                react: 'React'
            }
        }
    },
    devServer: {
        hot: false,
    },
    webpack: {
        extra: {
            mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
            module: {
                rules: [
                    {
                        enforce: 'pre',
                        test: /\.(js|jsx)$/,
                        options: {
                            cache: true,
                            eslintPath: require.resolve('eslint'),
                            emitWarning: !(process.env.NODE_ENV === 'production'),
                        },
                        loader: require.resolve('eslint-loader'),
                    },
                ]
            }
        }
    }
};

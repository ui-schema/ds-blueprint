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
    }
}

const { override, fixBabelImports, addLessLoader } = require('customize-cra');
module.exports = {
    webpack: override(
        fixBabelImports('import', {
            libraryName: 'antd',
            libraryDirectory: 'es',
            style: 'css',
        }),
        addLessLoader({
            javascriptEnabled: true,
            modifyVars: { '@primary-color': '#c62f2f' },
        }),
    )
};
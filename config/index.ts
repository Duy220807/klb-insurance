import { defineConfig, type UserConfigExport } from '@tarojs/cli';
import TsconfigPathsPlugin from 'tsconfig-paths-webpack-plugin';
import webpack from 'webpack'; // Thêm import webpack
import devConfig from './dev';
import prodConfig from './prod';
import uatConfig from './uat'; // Thêm import uatConfig

export default defineConfig<'webpack5'>(async (merge, { command, mode }) => {
  const baseConfig: UserConfigExport<'webpack5'> = {
    projectName: 'klb-insurance',
    date: '2025-3-19',
    designWidth: 750,
    deviceRatio: {
      640: 2.34 / 2,
      750: 1,
      375: 2,
      828: 1.81 / 2,
    },
    sourceRoot: 'src',
    outputRoot: 'dist',
    plugins: [],
    defineConstants: {},
    copy: {
      patterns: [],
      options: {},
    },
    framework: 'react',
    compiler: 'webpack5',
    cache: {
      enable: false,
    },
    mini: {
      postcss: {
        pxtransform: {
          enable: true,
          config: {},
        },
        cssModules: {
          enable: false,
          config: {
            namingPattern: 'module',
            generateScopedName: '[name]__[local]___[hash:base64:5]',
          },
        },
      },
      webpackChain(chain) {
        chain.resolve.plugin('tsconfig-paths').use(TsconfigPathsPlugin);

        chain.merge({
          resolve: {
            fallback: {
              process: false,
              'node:process': false,
            },
          },
        });

        chain.merge({
          plugin: {
            install: {
              plugin: require('weapp-tailwindcss/webpack').UnifiedWebpackPluginV5,
              args: [
                {
                  appType: 'taro',
                  rem2rpx: true,
                },
              ],
            },
          },
        });

        // Thêm cấu hình stats để lọc bỏ cảnh báo
        chain.stats({
          warningsFilter: [
            /sass-loader/, // Bỏ qua các cảnh báo từ sass-loader
            /@import/, // Bỏ qua các cảnh báo liên quan đến @import
          ],
        });
      },
    },
    h5: {
      publicPath: '/',
      staticDirectory: 'static',
      output: {
        filename: 'js/[name].[hash:8].js',
        chunkFilename: 'js/[name].[chunkhash:8].js',
      },
      miniCssExtractPluginOption: {
        ignoreOrder: true,
        filename: 'css/[name].[hash].css',
        chunkFilename: 'css/[name].[chunkhash].css',
      },
      postcss: {
        autoprefixer: {
          enable: true,
          config: {},
        },
        cssModules: {
          enable: false,
          config: {
            namingPattern: 'module',
            generateScopedName: '[name]__[local]___[hash:base64:5]',
          },
        },
      },
      webpackChain(chain) {
        chain.resolve.plugin('tsconfig-paths').use(TsconfigPathsPlugin);

        // Bỏ qua process và node:process
        chain.merge({
          resolve: {
            fallback: {
              process: false,
              'node:process': false,
            },
          },
        });

        // Đảm bảo process.env được định nghĩa trong runtime
        chain.plugin('define').use(webpack.DefinePlugin, [
          {
            'process.env': JSON.stringify({
              TARO_APP_ID: process.env.TARO_APP_ID || '',
              TARO_APP_API: process.env.TARO_APP_API || '',
              NODE_ENV: process.env.NODE_ENV || mode || 'development', // Thêm NODE_ENV vào runtime
            }),
          },
        ]);

        // Thêm cấu hình stats để lọc bỏ cảnh báo
        chain.stats({
          warningsFilter: [
            /sass-loader/, // Bỏ qua các cảnh báo từ sass-loader
            /@import/, // Bỏ qua các cảnh báo liên quan đến @import
            /DefinePlugin/, // Bỏ qua các cảnh báo từ DefinePlugin
            /Critical dependency: the request of a dependency is an expression/, // Bỏ qua cảnh báo liên quan đến process.env
          ],
        });
      },
    },
    rn: {
      appName: 'taroDemo',
      postcss: {
        cssModules: {
          enable: false,
        },
      },
    },
  };

  // Sử dụng mode (từ --env) để chọn file cấu hình
  if (mode === 'uat') {
    console.log('Sử dụng cấu hình UAT từ config/uat.js');
    return merge({}, baseConfig, uatConfig);
  }
  if (command === 'build') {
    console.log('Sử dụng cấu hình production từ config/prod.js');
    return merge({}, baseConfig, prodConfig);
  }
  console.log('Sử dụng cấu hình development từ config/dev.js');
  return merge({}, baseConfig, devConfig);
});
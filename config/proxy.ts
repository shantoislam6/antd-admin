/**
 * @name Configuration of the proxy
 * @see The proxy cannot take effect in the production environment,
 * so there is no configuration for the production environment
 * For details, please see
 * https://pro.ant.design/docs/deploy
 *
 * @doc https://umijs.org/docs/guides/proxy
 */
export default {
  // If you need to customize the local development server, please uncomment and adjust as needed
  // dev: {
  //   // localhost:8000/api/** -> https://preview.pro.ant.design/api/**
  //   '/api/': {
  //     // Target to proxy to
  //     target: 'https://preview.pro.ant.design',
  //     // This is configured to proxy from http to https
  //     // This may be needed for functionality that relies on origin, such as cookies
  //     changeOrigin: true,
  //   },
  // },

  /**
   * @name Detailed proxy configuration
   * @doc https://github.com/chimurai/http-proxy-middleware
   */
  test: {
    // localhost:8000/api/** -> https://proapi.azurewebsites.net/api/**
    '/api/': {
      target: 'https://proapi.azurewebsites.net',
      changeOrigin: true,
      pathRewrite: { '^': '' },
    },
  },
  pre: {
    '/api/': {
      target: 'your pre url',
      changeOrigin: true,
      pathRewrite: { '^': '' },
    },
  },
};

// https://umijs.org/config/
import { defineConfig } from '@umijs/max';
import { join } from 'path';
import defaultSettings from './defaultSettings';
import proxy from './proxy';

import routes from './routes';

const { REACT_APP_ENV = 'dev' } = process.env;

export default defineConfig({
  /**
   * @name Enable hash mode
   * @description Append a hash suffix to the build output. Typically used for incremental publishing and avoiding browser caching.
   * @doc https://umijs.org/docs/api/config#hash
   */
  hash: true,

  /**
   * @name Compatibility settings
   * @description Setting for IE11 compatibility. Note that it may not be perfectly compatible and requires checking all dependencies.
   * @doc https://umijs.org/docs/api/config#targets
   */
  // targets: {
  //   ie: 11,
  // },
  /**
   * @name Route configuration
   * @description Only supports configuration for path, component, routes, redirect, wrappers, and title.
   * @doc https://umijs.org/docs/guides/routes
   */
  // umi routes: https://umijs.org/docs/routing
  routes,
  /**
   * @name Theme configuration
   * @description Although called theme, it's actually just setting less variables.
   * @doc Ant Design theme customization https://ant.design/docs/react/customize-theme-cn
   * @doc Umi theme configuration https://umijs.org/docs/api/config#theme
   */
  theme: {
    // Set this to default if you don't want to dynamically set the theme with configProvide
    // Only when set to variable can configProvide be used to dynamically set the primary color scheme
    'root-entry-name': 'variable',
  },
  /**
   * @name Moment internationalization configuration
   * @description If internationalization is not required, enabling this can reduce the size of JS bundles.
   * @doc https://umijs.org/docs/api/config#ignoremomentlocale
   */
  ignoreMomentLocale: true,
  /**
   * @name Proxy configuration
   * @description Allows your local server to proxy requests to your server, allowing you to access server data locally.
   * @see Note that proxy can only be used during local development and won't work after build.
   * @doc Proxy introduction https://umijs.org/docs/guides/proxy
   * @doc Proxy configuration https://umijs.org/docs/api/config#proxy
   */
  proxy: proxy[REACT_APP_ENV as keyof typeof proxy],
  /**
   * @name Fast refresh configuration
   * @description A nice hot reload component that preserves state during updates.
   */
  fastRefresh: true,
  //============== The following are max plugin configurations ===============
  /**
   * @name Data flow plugin
   * @@doc https://umijs.org/docs/max/data-flow
   */
  model: {},
  /**
   * A global initial data flow, can be used to share data between plugins
   * @description Can be used to store some global data, such as user information, or some global states, which are created at the beginning of the entire Umi project.
   * @doc https://umijs.org/docs/max/data-flow#%E5%85%A8%E5%B1%80%E5%88%9D%E5%A7%8B%E7%8A%B6%E6%80%81
   */
  initialState: {},
  /**
   * @name Layout plugin
   * @doc https://umijs.org/docs/max/layout-menu
   */
  title: 'HMS',
  layout: {
    locale: true,
    ...defaultSettings,
  },
  /**
   * @name Moment2dayjs plugin
   * @description Replaces moment in the project with dayjs
   * @doc https://umijs.org/docs/max/moment2dayjs
   */
  moment2dayjs: {
    preset: 'antd',
    plugins: ['duration'],
  },
  /**
   * @name Internationalization plugin
   * @doc https://umijs.org/docs/max/i18n
   */
  locale: {
    // default zh-CN
    default: 'eng-US',
    antd: true,
    // default true, when it is true, will use `navigator.language` overwrite default
    baseNavigator: true,
  },
  /**
   * @name Ant Design plugin
   * @description Built-in babel import plugin for Ant Design
   * @doc https://umijs.org/docs/max/antd#antd
   */
  antd: {},
  /**
   * @name Network request configuration
   * @description It provides a unified network request and error handling solution based on axios and ahooks' useRequest.
   * @doc https://umijs.org/docs/max/request
   */
  request: {},
  /**
   * @name Access plugin
   * @description Permissions plugin based on initialState, initialState must be opened first
   * @doc https://umijs.org/docs/max/access
   */
  access: {},
  /**
   * @name Additional scripts in <head>
   * @description Configure additional scripts in <head>
   */
  headScripts: [
    // Fix white screen issue on initial load
    { src: '/scripts/loading.js', async: true },
  ],
  //================ Pro plugin configurations =================
  presets: ['umi-presets-pro'],
  /**
   * @name OpenAPI plugin configuration
   * @description Generates serve and mock based on openapi specifications, reducing a lot of boilerplate code
   * @doc https://pro.ant.design/en-US/docs/openapi/
   */
  openAPI: [
    {
      requestLibPath: "import { request } from '@umijs/max'",
      // Or use the online version
      // schemaPath: "https://gw.alipayobjects.com/os/antfincdn/M%24jrzTTYJN/oneapi.json"
      schemaPath: join(__dirname, 'oneapi.json'),
      mock: false,
    },
    {
      requestLibPath: "import { request } from '@umijs/max'",
      schemaPath: 'https://gw.alipayobjects.com/os/antfincdn/CA1dOm%2631B/openapi.json',
      projectName: 'swagger',
    },
  ],
  mock: {
    include: ['mock/**/*', 'src/pages/**/_mock.ts'],
  },
  mfsu: {
    strategy: 'normal',
  },
  esbuildMinifyIIFE: true,
  requestRecord: {},
});

import { ProLayoutProps } from '@ant-design/pro-components';

/**
 * @name Settings
 */
const Settings: ProLayoutProps & {
  pwa?: boolean;
  logo?: string;
} = {
  navTheme: 'light',
  // Dawn Blue
  colorPrimary: '#1890ff',
  layout: 'mix',
  contentWidth: 'Fluid',
  fixedHeader: false,
  fixSiderbar: true,
  colorWeak: false,
  title: 'HMS ADMIN',
  pwa: true,
  logo: 'http://localhost:8000/logo-hms.svg',
  iconfontUrl: '',
  token: {
    // Refer to the TypeScript declaration, see the documentation for the demo, modify styles through tokens
    // https://procomponents.ant.design/components/layout#%E9%80%9A%E8%BF%87-token-%E4%BF%AE%E6%94%B9%E6%A0%B7%E5%BC%8F
  },
};

export default Settings;

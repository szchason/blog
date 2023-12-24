const navbar = require('./config/navbar.js');

const config = {
  title: 'Chason‘s Blogs and Notes',
  favicon: 'img/favicon.ico',
  url: 'https://your-docusaurus-test-site.com',
  baseUrl: process.env.NODE_ENV === 'production' ? '/blog/' : '/',
  headTags: [
    /**
     * 处理图片加载失败
     */
    {
      tagName: 'meta',
      attributes: {
        name: 'referrer',
        content: 'no-referrer',
      },
    },
  ],
  organizationName: 'Chason',
  projectName: 'blog',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  /**
   * 静态资源文件
   */
  staticDirectories: ['assets'],
  presets: [
    [
      'classic',
      {
        docs: {
          path: 'docs',
          sidebarPath: require.resolve('./config/sidebars.js'),
          routeBasePath: '/',
        },
        blog: false,
        theme: {
          customCss: require.resolve('./src/css/entry.css'),
        },
      },
    ],
  ],

  themeConfig: {
    navbar: navbar,
    colorMode: {
      defaultMode: 'dark',
      disableSwitch: true,
    },
    footer: {
      style: 'dark',
      copyright: `Copyright © 2021 - ${new Date().getFullYear()} by Chason`,
    },
    prism: {
      theme: require('prism-react-renderer/themes/dracula'),
    },
  },
};

module.exports = config;

const navbar = require('./config/navbar.js');

const config = {
  title: 'Chason‘s Blogs and Notes',
  tagline: "Keep looking, and don't settle.",
  favicon: 'img/favicon.ico',
  url: 'https://your-docusaurus-test-site.com',
  baseUrl: '/',
  headTags: [
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
          customCss: require.resolve('./src/css/custom.css'),
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

module.exports = {
  title: 'Chason',
  logo: {
    alt: "'Chason'Logo",
    src: 'img/logo.png',
  },
  items: [
    {
      label: '笔记',
      type: 'dropdown',
      position: 'right',
      items: [
        // {
        //   label: 'HTML(5)',
        //   type: 'docSidebar',
        //   sidebarId: 'html',
        // },
        // {
        //   label: 'CSS(3)',
        //   type: 'docSidebar',
        //   sidebarId: 'css',
        // },
        // {
        //   label: 'SCSS',
        //   type: 'docSidebar',
        //   sidebarId: 'scss',
        // },
        {
          label: 'JavaScript',
          type: 'docSidebar',
          sidebarId: 'javascript',
        },
        {
          label: 'JQuery',
          type: 'docSidebar',
          sidebarId: 'jquery',
        },
        {
          label: 'TypeScript',
          type: 'docSidebar',
          sidebarId: 'typescript',
        },
        {
          label: 'Node',
          type: 'docSidebar',
          sidebarId: 'node',
        },
        {
          label: 'Webpack',
          type: 'docSidebar',
          sidebarId: 'webpack',
        },
        {
          label: 'React',
          type: 'docSidebar',
          sidebarId: 'react',
        },
        {
          label: 'Angular',
          type: 'docSidebar',
          sidebarId: 'angular',
        },
        // {
        //   label: 'Next',
        //   type: 'docSidebar',
        //   sidebarId: 'next',
        // },
        // {
        //   label: 'Flutter',
        //   type: 'docSidebar',
        //   sidebarId: 'flutter',
        // },
        {
          label: '网络工程',
          type: 'docSidebar',
          sidebarId: 'network',
        },
      ],
    },
    {
      label: '博客',
      type: 'docSidebar',
      sidebarId: 'blog',
      position: 'right',
    },
    {
      type: 'docSidebar',
      sidebarId: 'devops',
      label: 'DevOps',
      position: 'right',
    },
    {
      type: 'docSidebar',
      sidebarId: 'record',
      label: '随笔',
      position: 'right',
    },
    {
      href: 'https://github.com/szchason',
      label: 'GitHub',
      position: 'right',
    },
  ],
};

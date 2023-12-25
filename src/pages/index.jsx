import React from 'react';
import { Redirect } from '@docusaurus/router';
import './index.module.css';

// const redirectUrl = process.env.NODE_ENV === 'production' ? '/blog/' : '/';

export default function Home() {
  return <Redirect to={'/' + 'blogs/devops/autoblog'} />;
}

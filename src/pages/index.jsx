import React from 'react';
import { Redirect } from '@docusaurus/router';
import './index.module.css';

export default function Home() {
  return <Redirect to="/blogs/devops/devopsblog" />;
}

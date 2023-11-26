import React from 'react';
import Layout from '@theme/Layout';
import NotFoundSvg from '@site/assets/img/NotFound.svg';
import Link from '@docusaurus/Link';

export default function NotFound() {
  return (
    <Layout>
      <main className="container margin-vert--xl">
        <div style={{ textAlign: 'center' }}>
          <NotFoundSvg />
          <h3 style={{ fontSize: '28px' }}>Page Not Found</h3>
          <p>We could not find what you were looking for.</p>
          <p>
            <Link to="/blogs/devops/autoblog">返回</Link>
          </p>
        </div>
      </main>
    </Layout>
  );
}

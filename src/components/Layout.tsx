import React, { FunctionComponent, ReactNode } from 'react';
import cx from 'classnames';

import Container from './Container';

interface Props {
  className?: string;
  actions?: ReactNode;
}

const Layout: FunctionComponent<Props> = ({
  className,
  actions,
  children,
}) => {
  return (
    <Container>
      <div className={cx('layout', className)}>
        <section className="page-header">
          <h1>Students Report</h1>
          {actions}
        </section>
        <section className="page-content">
          {children}
        </section>
      </div>
    </Container>
  );
};

export default Layout;

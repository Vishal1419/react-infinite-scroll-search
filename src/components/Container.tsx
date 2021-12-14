import React, { FC, ReactNode } from 'react';

interface Props {
  children: ReactNode | ReactNode[]
}

const Container: FC<Props> = ({ children }) => (
  <div className="container">
    {children}
  </div>
);

export default Container;

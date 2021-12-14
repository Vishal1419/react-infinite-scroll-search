import React, { FC } from "react";
import classNames from "classnames";

export interface LoaderProps {
  size?: number;
  containerClassName?: string;
}

const Loader: FC<LoaderProps> = ({ size = 50, containerClassName }) => {
  return (
    <div className={classNames("loader-container", containerClassName)}>
      <div
        className="loader"
        style={{
          height: size,
          width: size,
          borderWidth: size / 10,
        }}
      />
    </div>
  );
};

export default Loader;

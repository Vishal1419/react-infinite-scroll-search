import { FC, Fragment } from "react";


export interface HighlightProps {
  search?: string;
  children: string;
}

const escapeRegExp = (str = "") =>
  str.replace(/([.?*+^$[\]\\(){}|-])/g, "\\$1");

const Highlight: FC<HighlightProps> = ({ search, children }) => {
  const pattern = new RegExp(`(${escapeRegExp(search)})`, "i");
  const parts = String(children).split(pattern);

  if (search) {
    return (
      <>
        {parts.map((part, index) =>
          pattern.test(part) ? <mark key={part}>{part}</mark> : <Fragment key={part}>{part}</Fragment>
        )}
      </>
    );
  }

  return <>{children}</>;
};

export default Highlight;

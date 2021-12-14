import React, { ReactNode, useEffect } from "react";
import BlockUi from "react-block-ui";
import { useInView } from "react-intersection-observer";

import Loader from "../components/Loader";

export interface InfiniteScrollProps<T> {
  blocking?: boolean;
  loading: boolean;
  items: T[];
  fetchItems: (page: number, limit: number) => void;
  total: number | null;
  page: number;
  limit: number;
  children: (items: T[]) => ReactNode;
  noDataMessage?: string;
}

const InfiniteScroll = <T extends any>({
  blocking,
  loading,
  items,
  fetchItems,
  total,
  page,
  limit,
  children,
  noDataMessage,
}: InfiniteScrollProps<T>) => {
  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView && !loading) {
      if (total === null || total > items.length) {
        fetchItems(page + 1, limit);
      }
    }
  }, [inView]);

  return (
    <div className="infinite-scroll">
      <BlockUi
        tag="div"
        className="infinite-scroll-loader"
        loader={Loader}
        blocking={blocking || (loading && items.length === 0)}
        renderChildren={false}
      >
        <div className="infinite-scroll-content">
          {(total === 0 && !loading) ? (
            <div className="no-data">{noDataMessage || "No Data Available"}</div>
          ) : (
            <>
              {children(items)}
              {loading ? (
                <Loader size={20} />
              ) : (
                <div
                  ref={ref}
                  className="sensor"
                  style={{ width: "100%", height: "1px" }}
                ></div>
              )}
            </>
          )}
        </div>
      </BlockUi>
    </div>
  );
};

export default InfiniteScroll;

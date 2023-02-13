import React, { FC } from 'react';
// @ts-ignore
import ContentLoader from 'react-content-loader';

interface ProductSkeletonProps {}

export const MiniProductSkeleton: FC<ProductSkeletonProps> = () => (
  <ContentLoader
    className="pizza-block"
    speed={2}
    width={260}
    height={500}
    viewBox="0 0 260 466"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
  >
    <circle cx="130" cy="130" r="130" />
    <rect x="0" y="277" rx="15" ry="15" width="260" height="22" />
    <rect x="0" y="314" rx="15" ry="15" width="260" height="88" />
    <rect x="0" y="427" rx="15" ry="15" width="90" height="30" />
    <rect x="143" y="418" rx="15" ry="15" width="117" height="45" />
  </ContentLoader>
);

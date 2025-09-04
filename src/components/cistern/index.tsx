import { IReactProps } from '@/settings/type';
import { memo } from 'react';
import './index.less';
import { twMerge } from 'tailwind-merge';

const Cistern = memo(({ children, className }: IReactProps & { className?: string }) => {
  return <div className={twMerge('Cistern', className || '')}>{children}</div>;
});
export default Cistern;

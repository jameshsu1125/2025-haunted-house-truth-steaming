import { IReactProps } from '@/settings/type';
import { memo } from 'react';
import './index.less';

const Cistern = memo(({ children }: IReactProps) => {
  return <div className='Cistern'>{children}</div>;
});
export default Cistern;

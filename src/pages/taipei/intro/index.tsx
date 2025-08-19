import CoverNode from '@/components/coverNode';
import { memo, useContext } from 'react';
import { twMerge } from 'tailwind-merge';
import { TaipeiContext, TaipeiPageType } from '../config';
import Background from './background';
import Dialog from './dialog';
import './index.less';
import Button from './button';

const Intro = memo(() => {
  const [{ page }] = useContext(TaipeiContext);

  return (
    <div className={twMerge('Intro', page === TaipeiPageType.intro ? 'visible' : 'invisible')}>
      <CoverNode>
        <Background />
        <Dialog />
        <Button />
      </CoverNode>
    </div>
  );
});
export default Intro;

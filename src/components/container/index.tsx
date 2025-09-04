import { IReactProps } from '@/settings/type';
import { memo } from 'react';
import Div100vh from 'react-div-100vh';

const Container = memo(({ children }: IReactProps) => (
  <Div100vh className='from-backgroundGrey to-backgroundColor w-full bg-gradient-to-b'>
    <div id='container' className='flex h-full w-full justify-center overflow-y-auto'>
      <div className='bg-background relative h-full min-h-full w-full max-w-2xl'>{children}</div>
    </div>
  </Div100vh>
));
export default Container;

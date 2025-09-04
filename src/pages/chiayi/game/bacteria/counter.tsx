import { forwardRef, useImperativeHandle } from 'react';

export type CounterHandle = {
  increase: (event: React.PointerEvent<HTMLDivElement>) => void;
};

const Counter = forwardRef((_, ref) => {
  useImperativeHandle(ref, () => ({
    increase(event: React.PointerEvent<HTMLDivElement>) {
      console.log('increase', event.clientX, event.clientY);
    },
  }));
  return <div className='counter'></div>;
});

export default Counter;

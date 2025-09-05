import { memo, useRef } from 'react';
import './index.less';

const SteamText = memo(({ scale = 1 }: { onAssetsLoaded?: () => void; scale?: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  return (
    <div ref={ref} className='SteamText' style={{ transform: `scale(${scale})` }}>
      <div />
    </div>
  );
});
export default SteamText;

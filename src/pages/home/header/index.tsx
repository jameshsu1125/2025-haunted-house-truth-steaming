import { memo } from 'react';
import Body from './body';
import Button from './button';
import Headline from './headline';
import './index.less';

const Header = memo(() => (
  <div className='Header'>
    <Headline />
    <Body />
    <Button />
  </div>
));
export default Header;

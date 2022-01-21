import React, { useRef } from 'react';
// import { NavLink } from 'react-router-dom'
import { Link } from 'react-router-dom';
import styled from 'styled-components'
import { FiSettings } from "react-icons/fi";
import { FaGithubSquare, FaTwitterSquare, FaTelegram } from "react-icons/fa";
// import { IoAnalytics} from 'react-ico'
// import LogoIcon from '../../assets/svg/fusefi-wordmark.svg'
// import TopLogo from '../../assets/images/plogo.jpeg';
// import { ReactComponent as BridgeIcon } from '../../assets/svg/bridge.svg'
// import { ReactComponent as PoolIcon } from '../../assets/svg/pool.svg'
// import { ReactComponent as SwapIcon } from '../../assets/svg/swap.svg'
// import { ReactComponent as FarmIcon } from '../../assets/svg/farm.svg'
// import { ReactComponent as HomeIcon } from '../../assets/svg/home.svg'
// import { ReactComponent as LendingIcon } from '../../assets/svg/lend.svg'
import { ReactComponent as Analytics } from '../../assets/svg/analyticsMenu.svg'

// import telegram from '../../assets/svg/telegram.svg'
// import twitter from '../../assets/svg/twitter.svg'
// import github from '../../assets/svg/github.svg'
import { ReactComponent as FUSD } from '../../assets/svg/fuse-dollar.svg'
import { FUSE_CHAIN_ID } from '../../connectors';
// import useRampWidget from '../../hooks/useRamp'
// import Settings from '../../components/Settings';
// import { FUSE_CHAIN_ID } from '../../connectors'
// import { ExternalLink } from '../../theme'

// const activeClassName = 'ACTIVE'
const StyledMenu = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100vw;
  height:60px;
  text-align: left;
  z-index: 100;
  border-bottom: 1px solid rgb(231, 227, 235);
  background-color: white !important;
  position: relative;
  ${({ theme }) => theme.mediaWidth.upToExtraSmall`
    display: none;
  `};
`

const MenuLeft = styled.div`
  display: flex;
  align-items: center;
  margin-left: 20px;
  color:rgb(122, 110, 170);
`;
const MenuRight = styled.div`
display: flex;
justify-content: center;
align-items: center;
  margin-right: 20px;
  color:rgb(122, 110, 170);
`;
const LogoTag = styled.div`
cursor: pointer;
  color:#000;
  font-weight: 900;
  font-size: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 30px;
  img{
    margin-right: 10px;
  }
`;
const TopMenuItemGO = styled.div`
  width: 100px;
  border-radius: 10px;
  font-size: 18px;
  margin-left: 20px;
  display:flex;
  justify-content: center;
  align-items: center;
  font-weight: 600;
  height:50px;
  cursor: pointer;
  &:hover{
    background-color:  #eef5f5;
    color: #3f2a74 !important;
  }
`;
const TopMenuItem = styled.div`
  width: 65px;
  border-radius: 10px;
  margin-left: 10px;
  display:flex;
  font-size: 18px;
  font-weight: 600;
  justify-content: center;
  align-items: center;
  height:50px;
  cursor: pointer;
  transition: all 0.3s;
  background-color: white;
  text-decoration: none !important;
  &:hover{
    background-color:  #eef5f5;
    color: #3f2a74 !important;
  }
`;
const SocialItems = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 30px;
`;
const SocialItem = styled.div`
  margin-left: 5px;
  transition: all 0.3s;
  :hover{
    transform: scale(1.2,1.2);
  }
  .githubIcon{
    font-size: 23px;
  }
  .githubIcons{
    font-size: 24px;
  }
`;
const TopMenuRightItem = styled.div`
  transition: all 0.3s;
  margin-left: 15px;
  :hover{
    transform: scale(1.2,1.2);
  }
  .SettingIcon{
    font-size: 20px;
  }
`;



export default function Sidebar() {
  const node = useRef<HTMLDivElement>()
  // const openRampWidget = useRampWidget()

  return (
    <StyledMenu ref={node as any}>
      <MenuLeft>
        <Link to='/home'><LogoTag>
          <img src='images/plogo.png' draggable={false} width={30} height={30} /> Pond
        </LogoTag>
        </Link>
        <Link to='/home'><TopMenuItem>Home</TopMenuItem></Link>
        <Link to='/swap'><TopMenuItem>Swap</TopMenuItem></Link>
        <Link to='/pool'><TopMenuItem>Pool</TopMenuItem></Link>
        <Link to='/bridge'><TopMenuItem>Bridge</TopMenuItem></Link>
        <Link to={`/farm/${FUSE_CHAIN_ID}`}><TopMenuItem>Farm</TopMenuItem></Link>
        <Link to='/lending'><TopMenuItem>Lending</TopMenuItem></Link>
        <TopMenuItemGO>Governance</TopMenuItemGO>
      </MenuLeft>
      <MenuRight>
        <a href='https://info.fuseswap.com/' target='_blank'><TopMenuRightItem><Analytics /></TopMenuRightItem></a>
        <TopMenuRightItem><FUSD /></TopMenuRightItem>
        <TopMenuRightItem><FiSettings className='SettingIcon' /></TopMenuRightItem>
        <SocialItems>
          <a href='https://github.com/fuseio' target='_blank'><SocialItem><FaGithubSquare className='githubIcons' /></SocialItem></a>
          <a href='https://t.me/fuse_fi' target='_blank'><SocialItem><FaTelegram className='githubIcon' /></SocialItem></a>
          <a href='https://twitter.com/Fuse_Fi' target='_blank'><SocialItem><FaTwitterSquare className='githubIcon' /></SocialItem></a>
        </SocialItems>
      </MenuRight>
    </StyledMenu>
  )
}

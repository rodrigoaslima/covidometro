import logo from '../../assets/images/logo.png'

import { Container, LogoImg } from './styles';

const HeaderComponent = () => {
  return(
    <Container>
        <LogoImg src={logo}/>
    </Container>
  )
}

export default HeaderComponent;
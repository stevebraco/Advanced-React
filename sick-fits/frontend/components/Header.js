import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import Nav from './Nav';
import Cart from './Cart';

const Logo = styled.h1`
  background: red;
  font-size: 4rem;
  position: relative;
  z-index: 2;
  margin-left: 2rem;
  transform: skew(-7deg);

  a {
    color: #ffffff;
    text-decoration: none;
    text-transform: uppercase;
    padding: 0.5rem 1rem;
  }
`;

const HeaderStyles = styled.header`
  .bar {
    border-bottom: 10px solid var(--black, black);
    display: grid;
    grid-template-columns: auto 1fr;
    justify-content: space-between;
    align-items: stretch;
  }
  .sub-bar {
    display: grid;
    grid-template-columns: 1fr auto;
    border-bottom: 1px solid var(--black, black);
  }
`;

const Header = () => (
  <HeaderStyles>
    <div className="bar">
      <Logo>
        <Link href="/">Sick Fits</Link>
      </Logo>
      <Nav />
    </div>
    <div className="sub-bar">
      <p>search</p>
    </div>
    <Cart />
  </HeaderStyles>
);

export default Header;

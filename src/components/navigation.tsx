import React from "react";
import { Link } from "gatsby";
import { css } from "@emotion/core";
import styled from "@emotion/styled";
import { SearchIcon, CloseIcon, HamburgerIcon } from "./icons";

interface Props {
  showNav: boolean;
  setShowNav: (showNav: boolean) => void;
  showSearch: boolean;
  setShowSearch: (showSearch: boolean) => void;
  theme: string;
}

const Navigation: React.FunctionComponent<Props> = ({
  showNav,
  setShowNav,
  showSearch,
  setShowSearch,
  theme
}) => (
  <NavWrapper>
    <div
      css={css`
        position: absolute;
        top: 0.5rem;
        right: 2rem;
        z-index: 10;
      `}
    >
      <button
        css={styles.button}
        onClick={() => {
          setShowNav(false);
          setShowSearch(!showSearch);
        }}
        title="Buscar"
      >
        {showSearch ? <CloseIcon /> : <SearchIcon theme={theme} />}
      </button>
      <button
        title="Abrir menú"
        css={styles.button}
        onClick={() => {
          setShowNav(!showNav);
          setShowSearch(false);
        }}
      >
        {showNav ? <CloseIcon /> : <HamburgerIcon theme={theme} />}
      </button>
    </div>
    {!showSearch && (
      <Nav navOpen={showNav}>
        <div
          css={css`
            width: 100%;
            bottom: 0px;
            right: 0px;
            position: absolute;
            font-family: "Barlow Condensed", sans-serif;
            font-size: 1.25rem;
          `}
        >
          <ul
            css={css`
              max-width: 1200px;
              margin: 0 auto;
              display: flex;
              flex-wrap: wrap;
              justify-content: flex-end;

              @media (max-width: 768px) {
                justify-content: center;
              }
            `}
          >
            <li css={styles.li}>
              <NavLink theme={theme} to="/">
                Inicio
              </NavLink>
            </li>
            <li css={styles.li}>
              <NavLink theme={theme} to="/articulos">
                Artículos
              </NavLink>
            </li>
            <li css={styles.li}>
              <NavLink theme={theme} to="/contacto">
                Contacto
              </NavLink>
            </li>
          </ul>
        </div>
      </Nav>
    )}
  </NavWrapper>
);

interface NavProps {
  navOpen: boolean;
}

const Nav = styled.nav<NavProps>(props => ({
  position: "relative",
  width: "100%",
  height: "5.5rem",
  transition: "opacity 0.2s ease-in-out",
  opacity: props.navOpen ? 1 : 0
}));

const NavWrapper = styled.div({
  position: "fixed",
  width: "100%",
  height: "0px",
  zIndex: 10
});

const styles = {
  button: css`
    background: none;
    padding: 0px;
    border: none;
    cursor: pointer;
    outline: none;
  `,
  li: css`
    padding: 0.25rem 1rem 0.5rem 1rem;
  `
};

interface NavLinkInterface {
  theme: string;
}

const NavLink = styled(Link)<NavLinkInterface>(props => ({
  color:
    props.theme === "home" ? "rgba(255, 255, 255, 1)" : "rgba(0, 0, 0, 0.75)",
  "@media (max-width: 1023px)": {
    color: "rgba(0, 0, 0, 0.75)"
  }
}));

export default Navigation;

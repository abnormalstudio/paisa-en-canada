import React, { useState, useEffect } from "react";
import { StaticQuery, graphql } from "gatsby";
import { MDXProvider } from "@mdx-js/tag";
import { Global, css } from "@emotion/core";
import styled from "@emotion/styled";
import Helmet from "react-helmet";
import Link from "gatsby-link";
import "prismjs/themes/prism-okaidia.css";

import Navigation from "./navigation";
import Reset from "./reset";
import mdxComponents from "./mdx";
import Search from "./search";
import MapleLeaf from "../images/icon-512x512.png";

interface Props {
  theme?: string;
}

const Layout: React.FunctionComponent<Props> = ({ children, theme }) => {
  const [showSearch, setShowSearch] = useState(false);
  const [showNav, setShowNav] = useState(false);

  useEffect(() => {
    document.body.addEventListener("keyup", e => {
      if (e.key === "Escape") {
        setShowSearch(false);
      }
    });
  }, []);

  return (
    <StaticQuery
      query={graphql`
        query SiteTitleQuery {
          site {
            siteMetadata {
              title
            }
          }
        }
      `}
      render={data => (
        <div
          css={css`
            width: 100vw;
            height: 100vh;
            overflow-x: hidden;
            position: relative;
          `}
        >
          <Reset />
          <Global styles={styles.global} />
          <Helmet>
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1"
            />
            <link
              href="https://fonts.googleapis.com/css?family=Barlow+Condensed:300|Allura"
              rel="stylesheet"
            />
          </Helmet>

          {theme === "default" && (
            <h2
              css={css`
                font-size: 2rem;
                line-height: 2rem;
                padding-top: 1rem;
                padding-left: 1rem;
                margin-top: 0px;
                margin-bottom: 0.25rem;
                position: absolute;
                z-index: 50;
                left: 1rem;
                font-family: "Allura", cursive;
              `}
            >
              <Link
                to="/"
                css={css`
                  color: rgba(0, 0, 0, 0.75);
                `}
                title="Una Paisa en Canadá"
              >
                <img
                  src={MapleLeaf}
                  alt="Red maple leaf"
                  css={css`
                    width: 1.25rem;
                    display: inline-block;
                    margin-right: 0.5rem;
                  `}
                />
                <span
                  css={css`
                    @media (max-width: 768px) {
                      display: none;
                    }
                  `}
                >
                  Una Paisa en Canadá
                </span>
              </Link>
            </h2>
          )}

          <Search showSearch={showSearch} />
          <Navigation
            showNav={showNav}
            setShowNav={setShowNav}
            showSearch={showSearch}
            setShowSearch={setShowSearch}
            theme={theme || "default"}
          />
          <ContentWrapper theme={theme || "default"}>
            <MDXProvider components={mdxComponents}>{children}</MDXProvider>
          </ContentWrapper>
        </div>
      )}
    />
  );
};

Layout.defaultProps = {
  theme: "default"
};

interface ContentWrapperProps {
  theme: string;
}

const ContentWrapper = styled.div<ContentWrapperProps>`
  position: absolute;
  top: ${props => (props.theme === "default" ? "6rem" : "0px")};
  height: calc(
    100vh - ${props => (props.theme === "default" ? "6rem" : "0px")}
  );
  overflow-x: scroll;
  width: 100%;

  @media (max-width: 1023px) {
    top: 6rem;
    height: calc(100vh - 6rem);
  }
`;

const styles = {
  global: css`
    html {
      box-sizing: border-box;
    }

    *,
    *:before,
    *:after {
      box-sizing: inherit;
    }

    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
        Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif;
      font-size: 18px;
      color: rgba(0, 0, 0, 0.75);
    }

    a {
      text-decoration: none;
      color: #1e8257;
    }

    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
      font-family: "Barlow Condensed", sans-serif;
    }

    h1 {
      font-size: 2.5rem;
      line-height: 3rem;
      margin: 1.25rem 0;
      text-align: center;
    }
    h2 {
      font-size: 2rem;
      line-height: 2.5rem;
      margin: 1rem 0 1.25rem 0;
    }
    h3 {
      font-size: 1.5rem;
      line-height: 2rem;
      margin: 0.75rem 0 1rem 0;
    }
    h4 {
      font-size: 1.25rem;
      line-height: 1.75rem;
      margin: 0.5rem 0 0.75rem 0;
    }

    p {
      margin: 1rem 0px;
      font-size: 1rem;
      line-height: 1.75rem;
    }

    strong {
      font-weight: bold;
    }
    small {
      font-size: 0.8rem;
    }

    @media (max-width: 768px) {
      body {
        font-size: 16px;
      }

      h1 {
        font-size: 1.75rem;
        line-height: 2.25rem;
      }
      h2 {
        font-size: 1.5rem;
        line-height: 2rem;
      }
      h3 {
        font-size: 1.25rem;
        line-height: 1.75rem;
      }
      h4 {
        font-size: 1rem;
        line-height: 1.5rem;
        font-weight: bold;
      }
    }
  `
};

export default Layout;

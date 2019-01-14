import { graphql, StaticQuery } from "gatsby";
import React, { useRef } from "react";
import { css } from "@emotion/core";
import Link from "gatsby-link";
import Image from "gatsby-image";
import { Layout, SEO, Tags } from "$components";
import MapleLeaf from "../images/icon-512x512.png";

interface IArticle {
  id: string;
  timeToRead: number;
  excerpt: string;
  frontmatter: {
    title: string;
    slug: string;
    date: string;
    tags: string;
    banner: any;
  };
}

interface IArticleNode {
  node: IArticle;
}

interface IndexPageProps {
  allMdx: {
    edges: IArticleNode[];
  };
}

const IndexPage = () => (
  <StaticQuery
    query={graphql`
      query IndexArticlesQuery {
        allMdx(sort: { fields: [frontmatter___date], order: DESC }, limit: 8) {
          edges {
            node {
              id
              timeToRead
              excerpt
              frontmatter {
                slug
                title
                tags
                date(formatString: "MMMM D, YYYY", locale: "es")
                updated(formatString: "MMMM D, YYYY", locale: "es")
                banner {
                  childImageSharp {
                    fluid(maxWidth: 800) {
                      ...GatsbyImageSharpFluid
                    }
                  }
                }
              }
            }
          }
        }
      }
    `}
    render={(data: IndexPageProps) => {
      const articles = data.allMdx.edges.map(edge => edge.node);

      return (
        <Layout theme="home">
          <SEO title="Inicio" />
          <div
            css={css`
              display: flex;
              flex-wrap: wrap;
            `}
          >
            <HomeIntro />
            <HomeArticles articles={articles} />
          </div>
        </Layout>
      );
    }}
  />
);

const HomeIntro: React.FunctionComponent = () => (
  <div
    css={css`
      width: 30%;
      position: relative;

      @media (max-width: 1023px) {
        width: 100%;
        height: 6rem;
      }
    `}
  >
    <div
      css={css`
        position: absolute;
        top: 70%;
        transform: translateY(-50%);
        width: 100%;

        @media (max-width: 1023px) {
          top: auto;
          bottom: 0px;
          transform: translateY(0px);
        }
      `}
    >
      <div
        css={css`
          text-align: right;
          padding-right: 2rem;

          @media (max-width: 1023px) {
            padding: 0px;
            text-align: center;
          }
        `}
      >
        <h2
          css={css`
            font-size: 2rem;
            margin-bottom: 0.25rem;
            font-family: "Allura", cursive;
          `}
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
          Una Paisa en Canadá
        </h2>
      </div>
      <div
        css={css`
          height: 2px;
          width: 100%;
          background-color: grey;
        `}
      />
      <ul
        css={css`
          display: flex;
          justify-content: flex-end;
          padding-right: 2rem;
          padding-top: 0.5rem;

          li {
            padding-left: 1rem;
          }

          a {
            color: #000;
            font-family: "Barlow Condensed", sans-serif;
          }
        `}
      >
        <li>
          <a href="https://www.instagram.com/paisa_canada" title="Instagram">
            instagram
          </a>
        </li>
        <li>
          <a href="https://www.youtube.com/paisa_en_canada" title="YouTube">
            youtube
          </a>
        </li>
      </ul>
    </div>
  </div>
);

interface HomeArticlesProps {
  articles: IArticle[];
}

const HomeArticles: React.FunctionComponent<HomeArticlesProps> = ({
  articles
}) => {
  const articlesDiv: any = useRef(null);

  return (
    <div
      ref={articlesDiv}
      css={css`
        width: 70%;
        overflow-x: scroll;
        scroll-behavior: smooth;
        height: 100vh;
        padding-top: 6rem;
        position: relative;
        background-color: #989cab;

        @media (max-width: 1023px) {
          width: 100%;
          height: auto;
          padding-top: 0px;
        }
      `}
    >
      {articles.length > 2 && <ArticleButtons articlesDiv={articlesDiv} />}
      <div
        css={css`
          display: flex;
          flex-wrap: wrap;
          width: ${35 * articles.length}vw;
          height: 88vh;

          @media (max-width: 1023px) {
            height: auto;
            width: auto;
            padding: 1rem;
          }
        `}
      >
        {articles.map(article => {
          const background: string =
            article.frontmatter.banner.childImageSharp.fluid.src;
          return (
            <div
              key={article.id}
              css={css`
                width: 35vw;
                position: relative;

                @media (max-width: 1023px) {
                  width: 100%;
                  margin-bottom: 2rem;
                }
              `}
            >
              <Link
                to={`/${article.frontmatter.slug}`}
                title={article.frontmatter.title}
              >
                <div
                  css={css`
                        position: absolute;
                        width: 80%;
                        height: 80vh;
                        right: 0px;
                        bottom: 0px;
                        background-position: center;
                        background-size: cover;
                        background-image: url('${background}');

                        @media (max-width: 1023px) {
                          display: none;
                        }
                      `}
                />
                <Image
                  fluid={article.frontmatter.banner.childImageSharp.fluid}
                  css={css`
                    display: none;

                    @media (max-width: 1023px) {
                      display: block;
                    }
                  `}
                />
              </Link>
              <div
                css={css`
                  position: absolute;
                  bottom: 0px;
                  left: 15%;
                  width: 60%;
                  padding: 1rem;
                  background-color: #000;

                  @media (max-width: 1023px) {
                    position: relative;
                    width: 100%;
                    left: 0px;
                  }

                  a {
                    color: #fff;
                  }

                  li a {
                    color: #ffd034;
                    font-size: 0.9rem;
                  }
                `}
              >
                <Link to={`/${article.frontmatter.slug}`}>
                  <h4>{article.frontmatter.title}</h4>
                </Link>
                <Tags tags={article.frontmatter.tags} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

interface ArticleButtonsProps {
  articlesDiv: any;
}

const ArticleButtons: React.FunctionComponent<ArticleButtonsProps> = ({
  articlesDiv
}) => (
  <div
    css={css`
      position: fixed;
      top: 50%;
      transform: translateY(-50%);
      z-index: 9;

      @media (max-width: 1023px) {
        display: none;
      }
    `}
  >
    <button
      onClick={() => {
        const width = Math.max(
          document.documentElement.clientWidth,
          window.innerWidth || 0
        );
        articlesDiv.current.scrollLeft -= (width / 100) * 35;
      }}
      css={css`
        border: none;
        outline: none;
        background: #000;
        color: #fff;
        padding: 0.75rem 1.25rem;
        font-size: 2rem;
        cursor: pointer;
        font-family: "Barlow Condensed", sans-serif;
      `}
    >
      &lt;
    </button>
    <button
      onClick={() => {
        const width = Math.max(
          document.documentElement.clientWidth,
          window.innerWidth || 0
        );
        articlesDiv.current.scrollLeft += (width / 100) * 35;
      }}
      css={css`
        border: none;
        outline: none;
        background: #000;
        color: #fff;
        padding: 0.75rem 1.25rem;
        font-size: 2rem;
        cursor: pointer;
        font-family: "Barlow Condensed", sans-serif;
      `}
    >
      &gt;
    </button>
  </div>
);

export default IndexPage;

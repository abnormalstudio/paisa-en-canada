import React from "react";
import { css } from "emotion";
import Link from "gatsby-link";
import { H3Line } from "$components";

interface Article {
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

interface Props {
  articles: Article[];
}

const ArticleRelated = ({ articles }: Props) => (
  <>
    <H3Line>Artículos Relacionados</H3Line>
    <ul
      css={css`
        margin-bottom: 2rem;
      `}
    >
      {articles.map(article => (
        <li
          key={article.id}
          css={css`
            display: flex;

            a {
              color: rgba(0, 0, 0, 0.75);
            }
          `}
        >
          <Link
            to={`/${article.frontmatter.slug}`}
            css={css`
              display: block;
              margin-bottom: 0.5rem;
              margin-right: 0.5rem;
              width: 80px;
              height: 60px;
              background-size: cover;
              background-position: center;
            `}
            style={{
              backgroundImage: `url('${
                article.frontmatter.banner.childImageSharp.fluid.src
              }')`
            }}
          />
          <Link
            to={`/${article.frontmatter.slug}`}
            css={css`
              display: block;
              width: calc(100% - 80px);
            `}
          >
            <h4
              css={css`
                margin: 0px;
                margin-bottom: 0.5rem;
              `}
            >
              {article.frontmatter.title}
            </h4>
            <div
              css={css`
                text-transform: uppercase;
                font-size: 0.75rem;
              `}
            >
              {article.frontmatter.date}
            </div>
          </Link>
        </li>
      ))}
    </ul>
  </>
);

export default ArticleRelated;

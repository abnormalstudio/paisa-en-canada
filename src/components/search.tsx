import React from "react";
import Link from "gatsby-link";
import {
  InstantSearch,
  SearchBox,
  Highlight,
  PoweredBy,
  Index,
  connectHits
} from "react-instantsearch-dom";
import { css } from "@emotion/core";
import styled from "@emotion/styled";
import { parseISO, format } from "date-fns";
import esLocale from "date-fns/locale/es";
import { Tags } from "./index";

interface Props {
  showSearch: boolean;
}

const Search: React.FunctionComponent<Props> = ({ showSearch }) => {
  if (!showSearch) {
    return null;
  }

  return (
    <div
      css={css`
        position: fixed;
        top: 0px;
        width: 100%;
        z-index: 10;
      `}
    >
      <InstantSearch
        appId="K0JL4F3M6O"
        apiKey="44e6f1b460576a20e727565b9349268a"
        indexName="articles"
      >
        <SearchWrapper>
          <SearchBox autoFocus={true} />
          <div
            css={css`
              display: flex;
              flex-wrap: wrap;
              margin-top: 3rem;

              .ais-MultiIndex__root {
                padding: 1rem 1rem;
                width: 80%;

                @media (max-width: 768px) {
                  padding: 0.5rem 1rem;
                  width: 100% !important;
                }
              }
              .ais-MultiIndex__root:first-of-type {
                width: 20%;
              }

              .ais-Highlight-highlighted {
                background-color: pink;
              }
            `}
          >
            <Index indexName="tags">
              <ConnectedTagHits />
            </Index>
            <Index indexName="articles">
              <ConnectedArticleHits />
            </Index>
          </div>
          <PoweredBy />
        </SearchWrapper>
      </InstantSearch>
    </div>
  );
};

const SearchWrapper = styled("div")`
  position: absolute;
  z-index: 10;
  background-color: rgba(240, 240, 240, 0.95);
  padding-bottom: 1rem;
  width: 100%;

  .ais-SearchBox-input {
    position: absolute;
    top: 0.75rem;
    right: 8rem;
    width: 300px;
    font-size: 1.25rem;
    padding: 0.5rem 1rem;
    outline: none;
    border: none;
    border-bottom: 2px solid black;
    background: none;

    @media (max-width: 768px) {
      width: 200px;
    }
  }

  .ais-SearchBox-submit,
  .ais-SearchBox-reset {
    display: none;
  }

  .ais-PoweredBy {
    display: inline-block;
    transform: scale(0.6) translateX(-20%);
  }
  .ais-PoweredBy-text {
    transform: translateY(-7px);
    display: inline-block;
  }
`;

const TagHits = ({ hits }: any) => (
  <>
    <h4>Tags</h4>
    {hits.length > 0 ? (
      <ul>
        {hits.slice(0, 9).map((hit: any) => (
          <li
            key={hit.objectID}
            css={css`
              margin-bottom: 0.5rem;
            `}
          >
            <TagHit hit={hit} />
          </li>
        ))}
      </ul>
    ) : (
      <small>
        <em>No hay resultados</em>
      </small>
    )}
  </>
);

const ConnectedTagHits = connectHits(TagHits);

interface TagHitProps {
  hit: any;
}

const TagHit: React.FunctionComponent<TagHitProps> = ({ hit }) => (
  <div>
    <Link to={`/tags/${hit.tag}`}>
      #<Highlight attribute="tag" hit={hit} />
    </Link>{" "}
    ({hit.numArticles})
  </div>
);

const ArticleHits = ({ hits }: any) => (
  <ul
    css={css`
      display: flex;
      flex-wrap: wrap;

      > li {
        padding: 0px 1rem 0px 0px;
        width: 33%;

        @media (max-width: 1023px) {
          width: 50%;
        }
        @media (max-width: 768px) {
          width: 100%;
        }
      }
    `}
  >
    {hits.slice(0, 6).map((hit: any) => (
      <li key={hit.objectID}>
        <ArticleHit hit={hit} />
      </li>
    ))}
  </ul>
);

const ConnectedArticleHits = connectHits(ArticleHits);

interface ArticleHitProps {
  hit: any;
}

const ArticleHit: React.FunctionComponent<ArticleHitProps> = ({ hit }) => (
  <div>
    <Link to={`/${hit.slug}`}>
      <h4
        css={css`
          margin-bottom: 0.5rem;
        `}
      >
        <span className="hit-title">
          <Highlight attribute="title" hit={hit} />
        </span>
      </h4>
    </Link>
    <div
      css={css`
        font-size: 0.75rem;
        margin-bottom: 0.75rem;
      `}
    >
      {format(parseISO(hit.date), "MMM d, YYYY", {
        awareOfUnicodeTokens: true,
        locale: esLocale
      })}
    </div>
    <Tags tags={hit.tags.join(", ")} />
    <p>
      <span className="hit-excerpt">
        <Highlight attribute="excerpt" hit={hit} />
      </span>
    </p>
  </div>
);

export default Search;

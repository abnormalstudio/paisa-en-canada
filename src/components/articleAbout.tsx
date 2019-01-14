import React from 'react';
import { StaticQuery, graphql } from 'gatsby';
import Image from 'gatsby-image';
import { H3Line } from '$components';

const ArticleAbout = () => (
  <StaticQuery
    query={graphql`
      query ArticleAboutQuery {
        file(relativePath: { eq: "marian.jpg" }) {
          childImageSharp {
            fluid(maxWidth: 300) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    `}
    render={data => (
      <div>
        <H3Line>Sobre Mí</H3Line>
        <Image fluid={data.file.childImageSharp.fluid} alt="Marian Serna" />
        <p>
          Hola! Yo soy Marian, una paisa muy feliz que vive en Canadá desde hace
          6 años.
        </p>
      </div>
    )}
  />
);

export default ArticleAbout;

const { gql } = require('graphql-tag');

const typeDefs = gql`
  type BlogPost {
    id: ID!
    featureImage: String
    content: String
    excerpt: String
    category: String
    createdAt: String
  }

  type Category {
    name: String
  }

  type Query {
    blogs(offset: Int!, limit: Int!): [BlogPost]
    blog(id: ID!): BlogPost
    blogsByCategory(category: String!): [BlogPost]
    categories: [Category]
  }

  type Mutation {
    createBlog(
      featureImage: String,
      content: String!,
      excerpt: String,
      category: String
    ): BlogPost
    deleteBlog(id: ID!): Boolean
  }
`;

module.exports = typeDefs;
const { ApolloServer, gql } = require('apollo-server');

// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
const typeDefs = gql`
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

  # This "Book" type defines the queryable fields for every book in our data source.
  type Book {
    title: String
    author: String
  }

  type User {
    id: Int
    email: String
    password: String
    firstName: String
    lastName: String
  }

  type Post {
    id: Int
    author: [User]
    comments: [Post]
    content: String
    createdAt: String
    updatedAt: String
  }


  ##############
  type Query {
    books: [Book],
    users: [User],
    posts: [Post]
  }


  type Mutation {
    addUser(id: Int, email: String, password: String, firstName: String, lastName: String): User
  }

`;

  const books = [
    {
      id: 'The Awakening',
      author: 'Kate Chopin',
    },
    {
      title: 'City of Glass',
      author: 'Paul Auster',
    },
  ];

  const users = [
    {
      id: 001,
      email: 'mail@test.com',
      password: 'password',
      firstName: 'firstname',
      lastName: 'lastname'
    },
    {
      id: 002,
      email: 'mail1@test.com',
      password: 'password1',
      firstName: 'firstname1',
      lastName: 'lastname1'
    }
  ];

  const posts = [
    {
      id: 001,
      author: users[0],
      comments: [
        {
        id: 002,
        author: users[1],
        comments: null,
        content: 'string',
        createdAt: 'Date',
        updatedAt: 'Date',
        }
      ],
      content: 'string',
      createdAt: 'Date',
      updatedAt: 'Date',
    },
  ];




  const resolvers = {
    Query: {
      books: () => books,
      users: () => users,
      posts: () => posts
    },

    Mutation:{
      addUser: (parent,variables) =>
        {
          return variables
        }
    }

  };
  
  
// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({ typeDefs, resolvers });

// The `listen` method launches a web server.
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});


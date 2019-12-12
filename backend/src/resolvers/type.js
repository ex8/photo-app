const { GraphQLScalarType } = require('graphql');

module.exports = {
  Photo: {
    url: ({ id }) => `https://site.com/img/${id}.png`,
    postedBy: ({ gitHubUser }) => users.find(u => u.gitHubLogin === gitHubUser),
    taggedUsers: ({ id }) => tags.filter(t => t.photoId === id).map(t => t.userId).map(id => users.find(u => u.gitHubLogin === id)),
  },
  User: {
    postedPhotos: ({ gitHubLogin }) => photos.filter(p => p.gitHubUser === gitHubLogin),
    inPhotos: ({ id }) => tags.filter(t => t.userId === id).map(t => t.photoId).map(id => photos.find(p => p.id === id)),
  },
  DateTime: new GraphQLScalarType({
    name: 'DateTime',
    description: 'A valid date-time value.',
    parseValue: value => new Date(value),
    serialize: value => new Date(value).toISOString(),
    parseLiteral: ast => ast.value,
  }),
};

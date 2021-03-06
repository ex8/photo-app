const { GraphQLScalarType } = require('graphql');

module.exports = {
  Photo: {
    id: parent => parent.id || parent._id,
    url: parent => `https://site.com/img/${parent._id}.png`,
    postedBy: (parent, __, { db }) => db.collection('users').findOne({ githubLogin: parent.userID }),
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

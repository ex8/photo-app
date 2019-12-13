require('dotenv').config();
const { authorizeWithGithub } = require('../utils');

module.exports = {
  postPhoto: async (_, { input }, { db, user }) => {
    if (!user) throw new Error("Only authorized users can post photos");
    const p = {
      ...input,
      userID: user.githubLogin,
      created: new Date(),
    };
    const { insertedIds } = await db.collection('photos').insert(p);
    p.id = insertedIds[0];
    return p;
  },
  githubAuth: async (_, { code }, { db }) => {
    const { message, access_token, avatar_url, login, name } = await authorizeWithGithub({
      client_id: process.env.GITHUB_CLIENT_ID,
      client_secret: process.env.GITHUB_CLIENT_SECRET,
      code,
    });
    if (message) throw new Error(message)
    let latestUserInfo = {
      name,
      githubLogin: login,
      githubToken: access_token,
      avatar: avatar_url
    }
    const { ops:[user] } = await db
      .collection('users')
      .replaceOne({ githubLogin: login }, latestUserInfo, { upsert: true })
    return { user, token: access_token }
  },
};

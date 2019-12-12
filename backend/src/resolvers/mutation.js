module.exports = {
  postPhoto: (_, { input }) => {
    const p = {
      id: _id++,
      created: new Date(),
      ...input
    };
    photos.push(p);
    return p;
  },
};

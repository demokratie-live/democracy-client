export const defaults = {
  isInstructionsShown: false
};

export const resolvers = {
  Mutation: {
    isInstructionsShown: (_, { isInstructionsShown }, { cache }) => {
      cache.writeData({ data: { isInstructionsShown } });
      return null;
    }
  }
};

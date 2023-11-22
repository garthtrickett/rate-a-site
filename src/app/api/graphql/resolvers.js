export const resolvers = {
  Query: {
    getUser: async () =>
      new Promise(resolve => {
        setTimeout(() => resolve({ id: '1', name: 'John' }), 1000)
      }),
    getPosts: async () =>
      new Promise(resolve => {
        setTimeout(
          () =>
            resolve([
              { id: '1', title: 'Post 1' },
              { id: '2', title: 'Post 2' }
            ]),
          3500
        )
      })
  }
}

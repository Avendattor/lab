const POSTS = [];

module.exports = {
  getAll: () => POSTS.filter(({_id}) => _id),
  findOne: ({ uri, _id }) => POSTS.find(post => post.uri === uri || post._id === _id),
  findOneAndUpdate: ({ _id }, newObj) => {
    const index = POSTS.findIndex(p => p._id == _id);
    POSTS[index] = {...newObj};
  },
  create: (data) => {
    if (!data.title || !data.body || !data.url) {
      return false;
    }

    if (['edit', 'admin'].includes(data.url)) {
      return false;
    }

    const post = POSTS.find(p => p.url === data.url);
    if (post) {
      return false;
    }

    const newPost = {...data, createdAt: Date.now(), _id: Math.floor(Math.random() * 1000)};
    POSTS.push(newPost);
    return newPost;
  },
  remove: (_id) => {
    const index = POSTS.findIndex(p => p._id === _id);
    if (!index) {
      return false;
    }

    POSTS[index] = {};
    return true;
  }
};

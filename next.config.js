module.exports = {
  async redirects() {
    return [{
       source: '/',
       destination: '/register',
       permanent: true,
    }, ]
 },
  env: {
      mongodburl: "mongodb+srv://mydbuser:mydbuser@cluster0.c2n4e.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
      secret: "INp8IvdIyeMcoGAgFGoA61DdBglwwSqnXJZkgz8PSnw"
  }
};
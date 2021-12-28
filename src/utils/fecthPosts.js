export async function fetchPosts(URL_POSTS, URL_PHOTOS) {
  const responsePosts = fetch(URL_POSTS);
  const responsePhotos = fetch(URL_PHOTOS);

  const [posts, photos] = await Promise.all([responsePosts, responsePhotos]);

  const postsJson = await posts.json();
  const photosJson = await photos.json();

  const postsAndPhotos = postsJson.map((post, index) => {
    return { ...post, cover: photosJson[index].url };
  });
  return postsAndPhotos
};
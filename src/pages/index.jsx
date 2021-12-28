import React, { useCallback, useEffect, useState } from "react";
import style from "../styles/Home.module.css";
import { fetchPosts } from "../utils/fecthPosts";
import Posts from "../components/Posts";
import Head from "next/head";
import Button from "../components/Button";
import Input from "../components/Input";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [allPosts, setAllPosts] = useState([]);
  const [page, setPage] = useState(0);
  const [postsPerpage] = useState(3);
  const [searchValue, setSearchValue] = useState("");

  const URL_POSTS = `https://jsonplaceholder.typicode.com/posts`;
  const URL_PHOTOS = `https://jsonplaceholder.typicode.com/photos`;
  const noMorePosts = page + postsPerpage >= allPosts.length;

  const filteredPosts = !!searchValue
    ? allPosts.filter((post) => {
        return post.title.toLowerCase().includes(searchValue.toLowerCase());
      })
    : posts;

  const handleFetchPosts = useCallback(async () => {
    const postsAndPhotos = await fetchPosts(URL_POSTS, URL_PHOTOS);
    setPosts(postsAndPhotos.slice(0, postsPerpage));
    setAllPosts(postsAndPhotos);

  }, [URL_POSTS, URL_PHOTOS, postsPerpage]);

  const loadMorePosts = () => {
    const nextPage = page + postsPerpage;
    const nextPosts = allPosts.slice(nextPage, nextPage + postsPerpage)

    posts.push(...nextPosts)

    setPosts(posts);
    setPage(nextPage);
  };

  const handleChange = (event) => {
    const { value } = event.target;
    setSearchValue(value);
  };

  useEffect(() => {
    handleFetchPosts();
  }, [handleFetchPosts]);


  return (
    <>
      <Head>
        <title>Fetch Posts</title>
      </Head>
      <div className={style.homeContainer}>
        <div className={style.searchContainer}>
          {!!searchValue && <h1>Search: {searchValue}</h1>}

          <Input
            placeholder="Search Posts"
            onChange={handleChange}
            value={searchValue}
          />
        </div>

        {filteredPosts.length > 0 && <Posts posts={filteredPosts} />}
        {filteredPosts.length === 0 && <h2>Post não encontrado</h2>}

        <div className={style.buttonContainer}>
          {!searchValue &&
            (noMorePosts ? (
              <Button disabled>Load more Posts</Button>
            ) : (
              <Button onClick={loadMorePosts}>Load more Posts</Button>
            ))}
        </div>
      </div>
    </>
  );
};

export default Home;

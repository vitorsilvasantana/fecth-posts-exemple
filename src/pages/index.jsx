import React from "react";
import style from "../styles/Home.module.css";
import { fetchPosts } from "../utils/fecthPosts";
import Posts from "../components/Posts";
import Head from "next/head";
import Button from "../components/Button";
import Input from "../components/Input";

class Home extends React.Component {
  state = {
    posts: [],
    allPosts: [],
    page: 0,
    postsPerpage: 2,
    searchValue: "",
  };

  URL_POSTS = `https://jsonplaceholder.typicode.com/posts`;
  URL_PHOTOS = `https://jsonplaceholder.typicode.com/photos`;

  handleFetchPosts = async () => {
    const { page, postsPerpage } = this.state;
    const postsAndPhotos = await fetchPosts(this.URL_POSTS, this.URL_PHOTOS);

    this.setState({
      posts: postsAndPhotos.slice(page, postsPerpage),
      allPosts: postsAndPhotos,
    });
  };

  loadMorePosts = () => {
    const { page, postsPerpage, allPosts, posts } = this.state;
    const nextPage = page + postsPerpage;
    const nextPosts = allPosts.slice(nextPage, nextPage + postsPerpage);

    posts.push(...nextPosts);
    this.setState({ posts, page: nextPage });
  };

  handleChange = (event) => {
    const { value } = event.target;
    this.setState({ searchValue: value });
  };

  async componentDidMount() {
    await this.handleFetchPosts();
  }

  render() {
    const { posts, page, postsPerpage, allPosts, searchValue } = this.state;
    const noMorePosts = page + postsPerpage >= allPosts.length;

    const filteredPosts = !!searchValue
      ? allPosts.filter((post) => {
          return post.title.toLowerCase().includes(searchValue.toLowerCase());
        })
      : posts;

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
              onChange={this.handleChange}
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
                <Button onClick={this.loadMorePosts}>Load more Posts</Button>
              ))}
          </div>
        </div>
      </>
    );
  }
}

export default Home;

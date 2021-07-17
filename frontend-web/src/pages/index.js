import Head from "next/head";
import * as types from "./../store/types";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import BodyComponent from "../containers/home/body";
import { fetchPosts } from "./../store/actions/postAction";
export default function Home({ posts }) {
  console.log(posts);
  const pushPostsToStore = () => async (dispatch) => {
    dispatch({
      type: types.GET_POSTS,
      payload: posts.posts,
    });
  };
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(pushPostsToStore());
    return () => {};
  }, []);

  return (
    <>
      <Head>
        <title>Review du thu</title>
        <meta name="review đủ thứ" content="review đủ thứ" />
      </Head>
      <BodyComponent posts={posts} />
    </>
  );
}

export const getStaticProps = async () => {
  const posts = await fetchPosts();
  return {
    props: {
      posts,
    },
    revalidate: 60 * 60 * 2,
  };
};

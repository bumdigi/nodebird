import AppLayout from '../components/AppLayout';
import React from 'react';
import { useSelector } from 'react-redux';
import PostForm from '../components/PostForm';
// PostCard import하여 사용시 계속 빌드 에러 발생함.
import PostCard from '../components/PostCard';

const Home = () => {
  const { isLoggedIn } = useSelector((state) => state.user);
  const { mainPosts } = useSelector((state) => state.post);
  return (
    <AppLayout>
      {isLoggedIn && <PostForm />}
      {mainPosts.map((post) => (
        <PostCard key={post.id} post={post} />
        // <div key={post.id}></div>
      ))}
    </AppLayout>
  );
};

export default Home;

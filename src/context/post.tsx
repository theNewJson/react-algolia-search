import algoliasearch from 'algoliasearch';
import { find, concat, reject, findIndex } from "lodash-es";
import { createContext, FunctionComponent, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { Post } from "../pages/Search";

const appId = process.env.REACT_APP_ALGOLIA_APLICATION_ID || '';
const apiKey = process.env.REACT_APP_ALGOLIA_APLICATION_KEY || '';
const indexName = process.env.REACT_APP_ALGOLIA_INDEX_NAME || '';

interface Context {
  post: Post[];
  favorite: Post[];
  keyword: string;
  handleSearch: (keyword: string) => void;
  addFavorite: (newFavorite: Post) => void;
  removeFavorite: (id: string) => void;
}

const PostContext = createContext<Partial<Context>>({});

const PostProvider: FunctionComponent = ({ children }) => {
  const client = useMemo(() => algoliasearch(appId, apiKey), []);
  const index = useMemo(() => client.initIndex(indexName), [client]);
  const [keyword, setKeyword] = useState('');
  const [post, setPost] = useState<Post[]>([])
  const [favorite, setFavorite] = useState<Post[]>([])

  // update post isFavorite status when favorite list is updated
  useEffect(() => {
    setPost(prev => prev.map((p) => findIndex(favorite, (fav) => fav.id === p.id) >= 0 ? { ...p, isFavorite: true } : p))
  }, [favorite])

  const handleSearch = useCallback(async (keyword: string) => {
    try {
      const result = await (await index.search<Post>(keyword)).hits;
      setPost(result.map((p) => findIndex(favorite, (fav) => fav.id === p.id) >= 0 ? { ...p, isFavorite: true } : p))
      setKeyword(keyword);
    } catch (e) {
      console.error(e)
    }
  }, [favorite, index]);

  const addFavorite = useCallback((newFavorite: Post) => {
    if (!find(favorite, (favorite) => favorite.id === newFavorite.id)) {
      setFavorite(concat(favorite, { ...newFavorite, isFavorite: true }));
      setPost(prev => prev.map((p) => p.id === newFavorite.id ? { ...p, isFavorite: true } : p))
    }
  }, [favorite])
  const removeFavorite = useCallback((id: string) => {
    console.log(reject(favorite, (fav) => fav.id === id))
    console.log(post.map((p) => p.id === id ? { ...p, isFavorite: false } : p))
    setFavorite(prev => reject(prev, (fav) => fav.id === id));
    setPost(prev => prev.map((p) => p.id === id ? { ...p, isFavorite: false } : p))
  }, [favorite, post])

  const value = useMemo(() => ({
    post,
    favorite,
    keyword,
    handleSearch,
    addFavorite,
    removeFavorite,
  }), [post, favorite, keyword, handleSearch, addFavorite, removeFavorite]);

  return <PostContext.Provider value={value}>{children}</PostContext.Provider>;
}

const usePostContext = (): Context => useContext(PostContext) as Context;

export { PostProvider, usePostContext };
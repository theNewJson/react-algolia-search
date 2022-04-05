import algoliasearch from 'algoliasearch';
import { find, concat, reject, findIndex } from "lodash-es";
import { createContext, FunctionComponent, useCallback, useContext, useEffect, useMemo, useState } from "react";

const appId = process.env.REACT_APP_ALGOLIA_APLICATION_ID || '';
const apiKey = process.env.REACT_APP_ALGOLIA_APLICATION_KEY || '';
const indexName = process.env.REACT_APP_ALGOLIA_INDEX_NAME || '';

export type ViewState = 'initial' | 'loading' | 'success'

export interface Post {
  id: string,
  title: string,
  author_name: string,
  categories: string[],
  isFavorite?: boolean
}


interface Context {
  post: Post[];
  favorite: Post[];
  keyword: string;
  viewState: ViewState;
  handleSearch: (keyword: string) => void;
  addFavorite: (newFavorite: Post) => void;
  removeFavorite: (id: string) => void;
}

const PostContext = createContext<Partial<Context>>({});

const PostProvider: FunctionComponent = ({ children }) => {
  const client = useMemo(() => algoliasearch(appId, apiKey), []);
  const index = useMemo(() => client.initIndex(indexName), [client]);
  const [viewState, setViewState] = useState<ViewState>('initial')
  const [keyword, setKeyword] = useState('');
  const [post, setPost] = useState<Post[]>([])
  const [favorite, setFavorite] = useState<Post[]>([])

  // update post isFavorite status when favorite list is updated
  useEffect(() => {
    setPost(prev => prev.map((p) => findIndex(favorite, (fav) => fav.id === p.id) >= 0 ? { ...p, isFavorite: true } : p))
  }, [favorite])

  const handleSearch = useCallback(async (keyword: string) => {
    try {
      setViewState('loading');
      setKeyword(keyword);
      const result = await (await index.search<Post>(keyword)).hits;
      setPost(result.map((p) => findIndex(favorite, (fav) => fav.id === p.id) >= 0 ? { ...p, isFavorite: true } : p))
      setViewState('success');
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
    setFavorite(prev => reject(prev, (fav) => fav.id === id));
    setPost(prev => prev.map((p) => p.id === id ? { ...p, isFavorite: false } : p))
  }, [])

  const value = useMemo(() => ({
    post,
    favorite,
    keyword,
    viewState,
    handleSearch,
    addFavorite,
    removeFavorite,
  }), [post, favorite, keyword, viewState, handleSearch, addFavorite, removeFavorite]);

  return <PostContext.Provider value={value}>{children}</PostContext.Provider>;
}

const usePostContext = (): Context => useContext(PostContext) as Context;

export { PostProvider, usePostContext };
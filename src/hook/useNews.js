import {useInfiniteQuery} from '@tanstack/react-query';
import {getAllNewsApi} from '../api/newsApi';

export const useNews = () => {
  const {
    data,
    isLoading,
    error,
    refetch,
    isFetching,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ['news'],
    queryFn: ({pageParam = 1}) =>
      getAllNewsApi({
        page: pageParam,
        limit: 10,
      }),
    getNextPageParam: lastPage => {
      const pagination = lastPage?.pagination;

      if (!pagination) return undefined;

      if (pagination.page < pagination.totalPages) {
        return pagination.page + 1;
      }

      return undefined;
    },
    initialPageParam: 1,
    staleTime: 5 * 60 * 1000,
    retry: 1,
  });

  const newsData = data?.pages
    ? data.pages.flatMap(page => {
        const list = Array.isArray(page?.data) ? page.data : [];
        return list.slice(1);
      })
    : [];

  return {
    newsData,
    isLoading,
    error,
    refetch,
    isFetching,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  };
};

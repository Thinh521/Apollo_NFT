import {useQuery} from '@tanstack/react-query';
import {getAllCategoryApi} from '../api/categoryApi';

export const useCategories = (type = 'news') => {
  const {
    data: categoryList = [],
    isLoading,
    error,
    refetch,
    isFetching,
  } = useQuery({
    queryKey: ['categories', type],
    queryFn: () => getAllCategoryApi(type),
    staleTime: 5 * 60 * 1000,
    select: res => res.data,
    retry: 1,
  });

  return {
    categoryList,
    isLoading,
    error,
    refetch,
    isFetching,
  };
};

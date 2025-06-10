import {
  addFavorite,
  getFavorites,
  removeFavorite,
} from "@/services/favorites.service";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useFavorites = () => {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ["favorites"],
    queryFn: getFavorites,
  });

  const add = useMutation({
    mutationFn: addFavorite,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["favorites"] }),
  });

  const remove = useMutation({
    mutationFn: removeFavorite,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["favorites"] }),
  });

  return {
    favorites: query.data || [],
    isLoading: query.isLoading,
    isError: query.isError,
    addFavorite: add.mutate,
    removeFavorite: remove.mutate,
    isAdding: add.isPending,
    isRemoving: remove.isPending,
  };
};

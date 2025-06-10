import { CapstoneIdea, deleteFavorite, fetchCapstones, fetchFavorites, insertFavorite } from "@/services/capstone-service";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useCapstones = (
  industry: string,
  projectType: string,
  difficulty: string
) => {
  return useQuery({
    queryKey: ["capstones", industry, projectType, difficulty],
    queryFn: () => fetchCapstones(industry, projectType, difficulty),
    enabled: false,
  });
};

export const useInsertFavorite = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (idea: CapstoneIdea) => insertFavorite(idea),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["capstones"] });
    },
  });
};

export const useDeleteFavorite = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteFavorite(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["capstones"] });
    },
  });
};

export const useFavorites = (userId: string) => { 
  return useQuery({
    queryKey: ["favorites", userId],
    queryFn: () => fetchFavorites(userId),
    enabled: !!userId,
  })
}
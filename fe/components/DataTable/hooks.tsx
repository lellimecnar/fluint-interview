import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

import { DataService, Datum } from '@/services/data';

export const useData = () => {
  const queryClient = useQueryClient();

  const result = useQuery({
    queryKey: ['data'],
    queryFn: async () => DataService.getAll(),
    initialData: [],
    select: (data) => {
      for (const datum of data) {
        queryClient.setQueryData(['datum', datum._id], datum);
      }

      return data;
    },
    notifyOnChangeProps: ['data', 'error'],
  });

  return [result.data, result] as const;
};

export const useDatum = (id: Datum['_id'] | void) => {
  const result = useQuery({
    queryKey: ['datum', id],
    queryFn: async () => DataService.get(id!),
    staleTime: Infinity,
    networkMode: 'offlineFirst',
    enabled: !!(id && typeof id === 'string'),
  });

  return [result.data, result] as const;
};

export const useCreateDatum = () => {
  const queryClient = useQueryClient();

  const result = useMutation({
    mutationFn: async (newDatum: Datum) => DataService.create(newDatum),
    onSuccess: (newDatum: Datum) => {
      queryClient.setQueryData<Datum>(['datum', newDatum._id], newDatum);
      queryClient.refetchQueries({
        queryKey: ['data'],
        exact: true,
      });
    },
  });

  return [result.mutateAsync, result] as const;
};

export const useUpdateDatum = (id: Datum['_id']) => {
  const queryClient = useQueryClient();

  const result = useMutation({
    mutationFn: async (newDatum: Datum): Promise<Datum> =>
      DataService.update(id!, newDatum),
    onSuccess: (newDatum: Datum) => {
      queryClient.setQueryData<Datum>(['datum', newDatum._id], newDatum);
      queryClient.refetchQueries({
        queryKey: ['data'],
        exact: true,
      });
    },
  });

  return [result.mutateAsync, result] as const;
};

export const useSaveDatum = (id?: Datum['_id']) => {
  const useCreateResult = useCreateDatum();
  const useUpdateResult = useUpdateDatum(id!);

  if (id) {
    return useUpdateResult;
  }

  return useCreateResult;
};

export const useDeleteDatum = (id: Datum['_id']) => {
  const queryClient = useQueryClient();

  const result = useMutation({
    mutationFn: async (): Promise<void> => DataService.delete(id!),
    onSuccess: () => {
      queryClient.removeQueries({ queryKey: ['datum', id], exact: true });
      queryClient.refetchQueries({
        queryKey: ['data'],
        exact: true,
      });
    },
  });

  return [result.mutateAsync, result] as const;
};

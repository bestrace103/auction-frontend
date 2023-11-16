import useSWR from 'swr';
import { useMemo } from 'react';
// utils
import { fetcher, endpoints } from 'src/utils/axios';
// types
import { AuctionItem } from 'src/types';

// ----------------------------------------------------------------------

export function useGetAuctions() {
  const URL = endpoints.auctions.list;

  const { data, isLoading, error, isValidating } = useSWR(URL, fetcher);

  const memoizedValue = useMemo(
    () => ({
      auctions: (data as AuctionItem[]) || [],
      auctionsLoading: isLoading,
      auctionsError: error,
      auctionsValidating: isValidating,
      auctionsEmpty: !isLoading && !data?.length,
    }),
    [data, error, isLoading, isValidating]
  );

  return memoizedValue;
}

// ----------------------------------------------------------------------

export function useGetAuctionRequest() {
  const URL = endpoints.auctions.request;

  const { data, isLoading, error, isValidating } = useSWR(URL, fetcher);

  const memoizedValue = useMemo(
    () => ({
      auctionRequest: (data as any[]) || [],
      auctionRequestLoading: isLoading,
      auctionRequestError: error,
      auctionRequestValidating: isValidating,
      auctionRequestEmpty: !isLoading && !data?.length,
    }),
    [data, error, isLoading, isValidating]
  );

  return memoizedValue;
}

// // ----------------------------------------------------------------------

// export function useSearchProducts(query: string) {
//   const URL = query ? [endpoints.product.search, { params: { query } }] : null;

//   const { data, isLoading, error, isValidating } = useSWR(URL, fetcher, {
//     keepPreviousData: true,
//   });

//   const memoizedValue = useMemo(
//     () => ({
//       searchResults: (data?.results as IProductItem[]) || [],
//       searchLoading: isLoading,
//       searchError: error,
//       searchValidating: isValidating,
//       searchEmpty: !isLoading && !data?.results.length,
//     }),
//     [data?.results, error, isLoading, isValidating]
//   );

//   return memoizedValue;
// }

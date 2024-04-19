'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { NextUIProvider } from '@nextui-org/react';

import DataTable from '@/components/DataTable';
// import { useState } from "react";
// import { useMount } from "react-use";

const queryClient = new QueryClient();

const Page = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <NextUIProvider>
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
          <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
            <DataTable />
          </div>
        </main>
      </NextUIProvider>
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
};

export default Page;

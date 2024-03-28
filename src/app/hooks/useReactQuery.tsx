// 하단의 글을 참고하여 react query 적용하였습니다.
// https://soobing.github.io/react/next-app-router-react-query/

'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const ReactQueryProviders = ({ children }: React.PropsWithChildren) => {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

export default ReactQueryProviders;

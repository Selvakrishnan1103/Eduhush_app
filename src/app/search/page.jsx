import { Suspense } from 'react';
import SearchPage from '../Components/Section/Search';

export default function Page() {
  return (
    <Suspense>
      <SearchPage />
    </Suspense>
  );
}

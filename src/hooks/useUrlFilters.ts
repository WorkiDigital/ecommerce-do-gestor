import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { useCallback } from 'react';

export function useUrlFilters() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  
  const setFilter = useCallback((key: string, value: any) => {
    const params = new URLSearchParams(searchParams.toString());
    
    if (value === undefined || value === null || value === '' || (Array.isArray(value) && value.length === 0)) {
      params.delete(key);
    } else {
      params.set(key, typeof value === 'object' ? JSON.stringify(value) : String(value));
    }
    
    if (key !== 'page') params.set('page', '1');
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  }, [searchParams, pathname, router]);
  
  const clearAllFilters = useCallback(() => {
    router.replace(pathname, { scroll: false });
  }, [pathname, router]);
  
  return { searchParams, setFilter, clearAllFilters };
}

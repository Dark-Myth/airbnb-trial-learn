import { Skeleton } from '@/components/ui/skeleton';
import dynamic from 'next/dynamic';

export function HomeMap({locationValue}:{locationValue:string}){
    // Here we have to import the map as dynamic because it is a third party library
    const LazyMap = dynamic(() => import('../components/Map'), {
        loading: () => <Skeleton className='h-[50vh] w-full ' />,
        ssr: false
    });
    return <LazyMap locationValue={locationValue} />
}
'use client';

import { cn } from '@/lib/utils/tailwind';
import React from 'react';
import { Skeleton } from './ui/skeleton';

export default function ProfileOptionSkeleton() {
  return (
    <li
      role='button'
      className={cn(
        'w-full cursor-pointer rounded-sm px-1 py-2 hover:bg-background',
        'flex items-center gap-3',
        'hover:ring-1 hover:ring-muted hover:ring-offset-0'
      )}
    >
      <Skeleton className='h-[36px] w-[36px] rounded-sm bg-[#544A67]' />
      <div className='flex flex-wrap items-center gap-x-3 gap-y-0'>
        <Skeleton className='my-[3px] h-[14px] w-[120px] rounded-sm bg-[#544A67]' />
        <Skeleton className='h-[20px] w-[40px] rounded-sm bg-[#544A67]' />
        <div className='flex items-center gap-2'>
          <Skeleton className='my-[3px] h-[14px] w-[70px] rounded-sm bg-[#544A67]' />
          <Skeleton className='h-[24px] w-[24px] rounded-sm bg-[#544A67]' />
        </div>
      </div>
    </li>
  );
}

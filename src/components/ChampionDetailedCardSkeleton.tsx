'use client';

import React from 'react';
import { cn } from '@/lib/utils/tailwind';
import { TrophyIcon } from '@heroicons/react/16/solid';
import { Skeleton } from './ui/skeleton';

export default function ChampionDetailedCardSkeleton() {
  return (
    <div
      className={`relative flex w-full flex-wrap rounded-lg bg-card to-card`}
    >
      <div className='absolute -left-2 -top-2 z-10 flex items-center justify-center rounded-sm bg-secondary px-2 py-1'>
        <div className='text-lg font-bold uppercase text-black'>
          <TrophyIcon className='h-5 w-5' /> #{1}
        </div>
      </div>
      <Skeleton
        className={cn(
          'aspect-[1/1.5] w-full rounded-l-lg bg-[length:auto_100%] bg-center bg-no-repeat md:w-[30%]',
          'transition-all duration-500 hover:bg-[length:auto_125%]',
          'flex flex-col justify-end shadow-[inset_10px_20px_50px_rgba(0,0,0,0.5)]'
        )}
      ></Skeleton>
      <div className='flex w-full flex-1 flex-col items-start justify-between p-6 px-8'>
        <div className='flex w-full flex-wrap items-center gap-6'>
          <Skeleton className='h-9 w-full rounded-full md:w-[170px]'></Skeleton>
          <div className='flex flex-col items-end gap-1 [flex:1]'>
            <Skeleton className='h-3 w-full rounded-full' />
            <Skeleton className='h-6 w-[100px] rounded-full' />
          </div>
        </div>
        <div className='w-full'>
          <Skeleton className='mb-4 mt-6 h-8 w-[170px] rounded-full' />
          <div className='relative flex w-full items-center justify-evenly gap-4 before:absolute before:inset-0 before:top-8'>
            {[0, 1, 2, 3, 4]?.map((ability) => (
              <Skeleton
                key={ability}
                className={cn(
                  'relative z-10 size-16 rounded-lg border-4 border-muted'
                )}
              />
            ))}
          </div>
          <div className='mt-6 h-max w-full rounded-2xl bg-card2 p-4'>
            <Skeleton className='h-7 w-6 rounded-full' />
            <Skeleton className='mt-2 h-8 w-[170px] rounded-full' />
            <Skeleton className='mt-4 h-6 w-full rounded-full' />
            <Skeleton className='mt-4 h-6 w-full rounded-full' />
          </div>
        </div>
      </div>
    </div>
  );
}

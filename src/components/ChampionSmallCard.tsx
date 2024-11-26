'use client';

import React from 'react';
import { ChampionAffinity } from '@/types/champion-affinity';
import { cn } from '@/lib/utils/tailwind';
import { Progress } from './ui/progress';

type Props = {
  affinity: ChampionAffinity;
  index: number;
};
export default function ChampionSmallCard({ affinity, index }: Props) {
  return (
    <div
      key={affinity.championId}
      className={cn(
        `flex aspect-[1/1.5] w-full flex-col items-center justify-end rounded-md`,
        `relative max-w-full transition-all duration-300`
      )}
    >
      <div className='absolute -left-2 -top-2 z-10 flex items-center justify-center rounded-lg bg-secondary px-2 py-1'>
        <div className='text-sm font-bold uppercase text-black'>
          #{index + 1}
        </div>
      </div>
      <div
        className={cn(
          'absolute left-0 top-0 z-0 h-full w-full rounded-lg bg-[length:auto_100%] bg-center bg-no-repeat',
          'transition-all duration-500 hover:bg-[length:auto_125%]',
          'flex flex-col justify-end hover:shadow-[inset_10px_20px_50px_rgba(0,0,0,0.5)]'
        )}
        style={{
          backgroundImage: `url("${affinity.championImage}")`,
        }}
      >
        <div className='flex h-1/2 w-full flex-col items-start justify-end rounded-lg bg-gradient-to-t from-black to-transparent p-4'>
          <div className='text-sm font-bold uppercase text-white md:text-lg'>
            {affinity.championName}
          </div>
          <div className='flex w-full items-center gap-1'>
            <Progress value={affinity.affinity * 100} />
            <div className='text-md font-bold text-white'>
              {(affinity.affinity * 100).toFixed(0)}%
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

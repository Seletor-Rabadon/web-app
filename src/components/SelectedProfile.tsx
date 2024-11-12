'use client';

import { cn } from '@/lib/utils/tailwind';
import {
  GameProfile,
  getGameRankIcon,
  getGameRankLabel,
} from '@/types/game-profile';
import Image from 'next/image';
import React from 'react';
import { Badge } from './ui/badge';

type Props = {
  profile: GameProfile;
};
export default function SelectedProfile({ profile }: Props) {
  return (
    <div className='mx-auto mb-4 flex w-[70vw] max-w-full items-center gap-3 border-b border-[#544A67] pb-4'>
      <div className='flex items-center gap-x-3'>
        {profile.profileIconId && (
          <Image
            className='rounded-sm'
            width={40}
            height={40}
            src={`https://opgg-static.akamaized.net/meta/images/profile_icons/profileIcon${profile.profileIconId}.jpg`}
            alt='Ícone'
          />
        )}
        {!profile.profileIconId && (
          <Image
            className='rounded-sm'
            width={40}
            height={40}
            src={`/extra-icons/placeholder.svg`}
            alt='Ícone'
          />
        )}
      </div>
      <div className='flex flex-wrap items-center gap-x-3 gap-y-0'>
        <p className='m-0 text-3xl font-bold'>{profile.gameName}</p>
        <Badge variant='outline' className='text-md bg-background'>
          #{profile.tagLine}
        </Badge>
        {profile.gameRank && (
          <div className='flex items-center gap-2'>
            <p className='m-0 text-sm font-thin text-muted'>
              {getGameRankLabel(profile.gameRank)}
            </p>
            <Image
              width={24}
              height={24}
              src={getGameRankIcon(profile.gameRank)}
              alt='Elo'
            />
          </div>
        )}
      </div>
    </div>
  );
}

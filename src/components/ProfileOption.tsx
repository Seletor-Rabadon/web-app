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
import { ClockIcon, XMarkIcon } from '@heroicons/react/16/solid';
import { Clock } from 'lucide-react';
import { Button } from './ui/button';

type Props = {
  onClick?: () => void;
  profile: GameProfile;
  isHistory?: boolean;
  onClose?: () => void;
};
export default function ProfileOption({
  profile,
  onClick,
  onClose,
  isHistory = false,
}: Props) {
  return (
    <li className={cn('relative w-full cursor-pointer rounded-sm')}>
      <div
        className={cn(
          'relative w-full cursor-pointer rounded-sm px-1 py-2 hover:bg-background',
          'flex flex-wrap items-center gap-3',
          'hover:ring-1 hover:ring-muted hover:ring-offset-0'
        )}
        onClick={onClick}
        role='button'
      >
        <div className='flex items-center gap-x-3'>
          {isHistory && <Clock className='size-6 min-w-6 text-muted' />}
          {profile.profileIconId && (
            <Image
              className='rounded-sm'
              width={36}
              height={36}
              src={`https://opgg-static.akamaized.net/meta/images/profile_icons/profileIcon${profile.profileIconId}.jpg`}
              alt='Ícone'
            />
          )}
          {!profile.profileIconId && (
            <Image
              className='rounded-sm'
              width={36}
              height={36}
              src={`/extra-icons/placeholder.svg`}
              alt='Ícone'
            />
          )}
        </div>
        <div className='flex flex-wrap items-center gap-x-3 gap-y-0'>
          <p className='m-0 text-sm font-bold'>{profile.gameName}</p>
          <Badge variant='outline' className='bg-background'>
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
      {isHistory && (
        <XMarkIcon
          onClick={() => {
            if (onClose) onClose();
          }}
          className='absolute right-2.5 top-1/2 size-6 h-6 w-6 -translate-y-1/2 transform text-muted'
        />
      )}
    </li>
  );
}

import { cn } from '@/lib/utils';
import {
  GameProfile,
  getGameRankIcon,
  getGameRankLabel,
} from '@/types/game-profile';
import Image from 'next/image';
import React from 'react';
import { Badge } from './ui/badge';

type Props = {
  onClick?: () => void;
  profile: GameProfile;
};
export default function ProfileOption({ profile, onClick }: Props) {
  return (
    <li
      onClick={onClick}
      role='button'
      className={cn(
        'w-full cursor-pointer rounded-sm px-1 py-2 hover:bg-background',
        'flex items-center gap-3',
        'hover:ring-1 hover:ring-muted hover:ring-offset-0'
      )}
    >
      <Image
        className='rounded-sm'
        width={36}
        height={36}
        src={`https://opgg-static.akamaized.net/meta/images/profile_icons/profileIcon${profile.profileIconId}.jpg`}
        alt='Ícone'
      />
      <p className='m-0 text-sm font-bold'>{profile.gameName}</p>
      <Badge variant='outline' className='bg-background'>
        #{profile.tagLine}
      </Badge>
      <p className='m-0 text-sm font-thin text-muted'>
        {getGameRankLabel(profile.gameRank)}
      </p>
      <Image
        width={24}
        height={24}
        src={getGameRankIcon(profile.gameRank)}
        alt='Elo'
      />
    </li>
  );
}

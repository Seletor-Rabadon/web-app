'use client';
import { NickSearchbar } from '@/components/NickSearchbar';
import ProfileCompatibility from '@/components/ProfileCompatibility';
import SelectedProfile from '@/components/SelectedProfile';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils/tailwind';
import { GameProfile } from '@/types/game-profile';
import Image from 'next/image';
import { useState } from 'react';

export default function Home() {
  const [searchFocused, setSearchFocused] = useState(false);

  const [selectedProfile, setSelectedProfile] = useState<GameProfile>();

  return (
    <div
      className={cn(
        'flex w-full items-center justify-center',
        searchFocused || selectedProfile ? 'items-start' : ''
      )}
    >
      <div
        className={cn(
          'flex w-full max-w-container flex-col items-center justify-center px-6 transition-all md:min-h-[480px]',
          (searchFocused || selectedProfile) && 'justify-start'
        )}
      >
        {!searchFocused && !selectedProfile && (
          <Image
            src='/logo/horizontal-logo.svg'
            alt='logo'
            className='mb-4 w-full md:w-[36%]'
            width={537}
            height={152}
          />
        )}
        {!searchFocused && !selectedProfile && (
          <p className='text-center text-sm text-muted'>
            Sistema de recomendação de campeões de League of Legends® baseado
            em Inteligência Artificial
          </p>
        )}
        <NickSearchbar
          onFocus={() => {
            setSearchFocused(true);
          }}
          onBlur={() => {
            setSearchFocused(false);
          }}
          onSelectProfile={(profile) => {
            setSelectedProfile(profile);
            setSearchFocused(false);
          }}
          onClear={() => {
            setSelectedProfile(undefined);
          }}
        />
        {!searchFocused && !selectedProfile && (
          <div className='max-w-[600px] text-center text-sm text-muted'>
            Digite seu Nome de Invocador e seu{' '}
            <Badge variant='outline'>#ID Riot</Badge> para encontrar os campeões
            mais compatíveis com você, baseado em seu perfil e na experiência de
            outros jogadores
          </div>
        )}

        {selectedProfile && <ProfileCompatibility profile={selectedProfile} />}
      </div>
    </div>
  );
}

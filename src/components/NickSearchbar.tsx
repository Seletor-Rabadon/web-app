'use client';

import { cn } from '@/lib/utils/tailwind';
import {
  ExclamationTriangleIcon,
  MagnifyingGlassIcon,
  XMarkIcon,
} from '@heroicons/react/16/solid';
import Image from 'next/image';
import * as React from 'react';
import { Separator } from './ui/separator';
import { useRef, useState } from 'react';
import { Button } from './ui/button';
import { GameProfile } from '@/types/game-profile';
import ProfileOption from './ProfileOption';
import { debounce } from '@/lib/utils/search';
import { useGameProfiles, useGameProfilesHistory } from '@/lib/game-profiles';
import { Alert, AlertDescription, AlertTitle } from './ui/alert';
import ProfileOptionSkeleton from './ProfileOptionSkeleton';

type Props = {
  onBlur?: () => void;
  onFocus?: () => void;
  onClear?: () => void;
  onSelectProfile?: (profile: GameProfile) => void;
};
export function NickSearchbar({
  onFocus,
  onBlur,
  onClear,
  onSelectProfile,
}: Props) {
  const [focused, setFocused] = useState(false);

  const [selectedProfile, setSelectedProfile] = useState<GameProfile>();

  const inputRef = useRef<HTMLInputElement>(null);

  const [value, setValue] = useState('');

  const { profiles, profilesError, isFetchingProfiles, refetchProfiles } =
    useGameProfiles({
      query: value,
    });

  const {
    profiles: profilesHistory,
    addToHistory,
    removeFromHistory,
  } = useGameProfilesHistory();

  const handleInputChange = debounce(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setValue(e.target.value || '');
      console.log('called');
    },
    300
  );

  const handleSelectProfile = (profile: GameProfile) => {
    if (onSelectProfile) onSelectProfile(profile);
    setFocused(false);
    addToHistory(profile);

    setSelectedProfile(profile);
    if (!inputRef.current) return;
    setValue('');
    inputRef.current.value = '';
  };

  const handleRemoveFromHistory = (profile: GameProfile) => {
    removeFromHistory(profile);
  };

  const handleOnFocus = () => {
    setFocused(true);
    if (onFocus) onFocus();
  };

  const handleClear = () => {
    if (!!value || !!selectedProfile) {
      if (!inputRef.current) return;
      setValue('');
      inputRef.current.value = '';
      inputRef.current.focus();
      setSelectedProfile(undefined);
      if (onClear) onClear();
      return;
    }
    setFocused(false);
    if (onBlur) onBlur();
  };

  return (
    <div className='mx-auto my-6 w-full max-w-[900px]'>
      <div className={cn('relative w-full rounded-md')}>
        <div className='relative z-30 flex w-full items-center justify-between gap-1'>
          <div className='relative flex-1'>
            <div className='absolute left-2.5 top-1/2 flex h-full -translate-y-1/2 transform flex-row items-center text-gray-500 peer-focus:text-gray-900'>
              <Image
                src='flags/brazil.svg'
                alt='Brasil'
                width={46}
                height={46}
                className='h-10 w-10'
              />
              <Separator
                className='mx-2.5 h-[60%] bg-muted'
                orientation='vertical'
              />
            </div>
            <input
              ref={inputRef}
              onChange={handleInputChange}
              onFocus={handleOnFocus}
              placeholder='Nome do jogo + #TAG'
              type='text'
              className={cn(
                'flex h-14 w-full rounded-md border border-input bg-white px-4 py-2 text-sm text-black ring-offset-background placeholder:text-muted focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50',
                'pl-[68px] pr-8 transition-all'
              )}
            />

            <MagnifyingGlassIcon
              onClick={() => {
                setFocused(true);
                inputRef.current?.focus();
                if (onFocus) onFocus();
              }}
              className='absolute right-2.5 top-1/2 h-6 w-6 -translate-y-1/2 transform cursor-pointer text-gray-500 peer-focus:text-gray-900'
            />
          </div>
          {(focused || selectedProfile) && (
            <Button
              className='flex aspect-square h-14 max-h-none w-auto max-w-none p-0 [&_svg]:size-6'
              onClick={handleClear}
            >
              <XMarkIcon />
            </Button>
          )}
        </div>
        {focused && (
          <div
            className={cn(
              'absolute top-[0] z-0 w-full rounded-lg bg-card pt-14 shadow-lg transition-all',
              'shadow-[0px_5px_10px_0px_#212131b6]'
            )}
          >
            {!value && profilesHistory.length == 0 && (
              <p className='m-0 p-6 text-muted'>
                Digite para procurar. Suas buscas recentes aparecerão aqui!
              </p>
            )}
            {!value && profilesHistory.length > 0 && (
              <ul>
                <li className='py-2 pl-1 text-muted'>Buscas Recentes</li>
                {profilesHistory?.map((profile) => (
                  <ProfileOption
                    isHistory
                    onClose={() => handleRemoveFromHistory(profile)}
                    profile={profile}
                    onClick={() => handleSelectProfile(profile)}
                  />
                ))}
              </ul>
            )}
            {!isFetchingProfiles && !!value && (profiles || []).length > 0 && (
              <ul>
                {profiles?.map((profile) => (
                  <ProfileOption
                    profile={profile}
                    onClick={() => handleSelectProfile(profile)}
                  />
                ))}
              </ul>
            )}
            {isFetchingProfiles && (
              <ul>
                {Array.from({ length: 3 }).map((i) => (
                  <ProfileOptionSkeleton />
                ))}
              </ul>
            )}
            {profilesError && (
              <Alert variant='destructive'>
                <ExclamationTriangleIcon className='size-4' />
                <AlertTitle>Erro</AlertTitle>
                <AlertDescription>
                  Erro ao Buscar Perfis de Jogador
                </AlertDescription>
              </Alert>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

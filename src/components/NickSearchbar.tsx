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
    if (focused && !value && selectedProfile) {
      setFocused(false);
      return;
    }
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

  const selectableValue = React.useMemo(() => {
    if (!isValidNick(value.trim())) return null;
    const parts = value.trim().split('#');
    return {
      gameName: parts[0].trim(),
      tagLine: parts[1].trim(),
      name: `${parts[0].trim()}#${parts[1].trim()}`,
    } as GameProfile;
  }, [value]);

  return (
    <div className='mx-auto my-6 w-[70vw] max-w-full'>
      <div className={cn('relative w-full rounded-md')}>
        <div className='relative z-50 flex w-full items-center justify-between gap-1'>
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
              {(focused && selectedProfile) || !selectedProfile ? (
                <XMarkIcon />
              ) : (
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='1em'
                  height='1em'
                  viewBox='0 0 24 24'
                >
                  <g fill='none' fillRule='evenodd'>
                    <path d='m12.594 23.258l-.012.002l-.071.035l-.02.004l-.014-.004l-.071-.036q-.016-.004-.024.006l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.016-.018m.264-.113l-.014.002l-.184.093l-.01.01l-.003.011l.018.43l.005.012l.008.008l.201.092q.019.005.029-.008l.004-.014l-.034-.614q-.005-.019-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.003-.011l.018-.43l-.003-.012l-.01-.01z' />
                    <path
                      fill='currentColor'
                      d='M17.278 2.613a1 1 0 0 1 1.89.643l-.038.11l-2.61 6.42l.657.175c1.05.281 1.924 1.134 2.09 2.298c.142 1 .275 2.52.092 4.086c-.182 1.552-.69 3.278-1.947 4.546c-.462.466-1.125.54-1.573.548c-.511.008-1.1-.07-1.705-.19c-1.216-.242-2.674-.69-4.054-1.166l-.414-.145l-.813-.294l-.78-.291l-.734-.283l-.978-.388l-.822-.335l-.817-.345a1 1 0 0 1-.228-1.708c1.377-1.08 2.67-2.322 3.761-3.469l.529-.564l.25-.274l.472-.527l.22-.252l.594-.695l.337-.406a3.1 3.1 0 0 1 2.981-1.087l.199.046l.737.197zM10.5 13.348a44 44 0 0 1-3.479 3.444q.863.349 1.733.68a7.3 7.3 0 0 0 1.426-1.338a7 7 0 0 0 .488-.654l.142-.232a1 1 0 0 1 1.747.973c-.234.42-.527.814-.832 1.184a10 10 0 0 1-.792.856c.462.158.924.308 1.372.446c.373-.257.81-.785 1.206-1.385q.239-.36.452-.74l.204-.384a1 1 0 0 1 1.793.887c-.229.462-.496.909-.78 1.339a11 11 0 0 1-.634.868l.421.082c.362.067.744.114 1.089.043c.766-.815 1.163-1.998 1.316-3.305q.053-.456.068-.904zm2.819-2.35a1.09 1.09 0 0 0-1.116.378l-.243.293l5.398 1.446l-.047-.392l-.024-.182c-.037-.253-.216-.491-.511-.61l-.116-.038zM5.565 7.716l.064.14A3.26 3.26 0 0 0 6.866 9.22l.1.058a.068.068 0 0 1 0 .118l-.1.058A3.26 3.26 0 0 0 5.63 10.82l-.064.139a.071.071 0 0 1-.13 0l-.064-.14a3.26 3.26 0 0 0-1.237-1.364l-.1-.058a.068.068 0 0 1 0-.118l.1-.058A3.26 3.26 0 0 0 5.37 7.855l.064-.139a.071.071 0 0 1 .13 0Zm2.832-4.859c.04-.09.166-.09.206 0l.102.222a5.2 5.2 0 0 0 1.97 2.171l.157.093a.108.108 0 0 1 0 .189l-.158.092a5.2 5.2 0 0 0-1.97 2.172l-.1.222a.113.113 0 0 1-.207 0l-.102-.222a5.2 5.2 0 0 0-1.97-2.172l-.158-.092a.108.108 0 0 1 0-.189l.159-.093a5.2 5.2 0 0 0 1.97-2.171l.1-.222Z'
                    />
                  </g>
                </svg>
              )}
            </Button>
          )}
        </div>

        <div
          className={cn(
            'absolute top-[0] z-40 w-full rounded-lg bg-card pt-14 shadow-lg transition-all',
            'shadow-[0px_5px_10px_0px_#212131b6]',
            'transition-all duration-300',
            focused
              ? 'max-h-[400px] opacity-100'
              : 'pointer-events-none max-h-0 opacity-0',
            'overflow-hidden'
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
              {profilesHistory
                .filter((p) => p.name != selectedProfile?.name)
                ?.map((profile) => (
                  <ProfileOption
                    isHistory
                    onClose={() => handleRemoveFromHistory(profile)}
                    profile={profile}
                    onClick={() => handleSelectProfile(profile)}
                  />
                ))}
            </ul>
          )}
          {!isFetchingProfiles && !!value && (
            <ul>
              {(profiles || []).length == 0 && selectableValue && (
                <ProfileOption
                  profile={selectableValue}
                  onClick={() => handleSelectProfile(selectableValue)}
                />
              )}
              {(profiles || []).length > 0 &&
                profiles?.map((profile) => (
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
      </div>
    </div>
  );
}

function isOnlyNumbersOrLettersOrSpaces(str: string) {
  return /^[a-zA-Z0-9 ]+$/.test(str);
}

function isValidNick(nick: string) {
  return (
    nick.length >= 3 &&
    nick.includes('#') &&
    nick.split('#').length == 2 &&
    nick.split('#')[1].length >= 3 &&
    isOnlyNumbersOrLettersOrSpaces(nick.split('#')[1]) &&
    isOnlyNumbersOrLettersOrSpaces(nick.split('#')[0])
  );
}

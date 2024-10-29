'use client';

import { cn } from '@/lib/utils';
import { MagnifyingGlassIcon, XMarkIcon } from '@heroicons/react/16/solid';
import Image from 'next/image';
import * as React from 'react';
import { Separator } from './ui/separator';
import { useEffect, useRef, useState } from 'react';
import { Button } from './ui/button';
import { GameProfile } from '@/types/game-profile';
import { localStorageGetItem } from '@/lib/storage-available';
import { getGameProfiles } from '@/services/game-profiles';
import ProfileOption from './ProfileOption';

type Props = {
  onBlur?: () => void;
  onFocus?: () => void;
};
export function NickSearchbar({ onFocus, onBlur }: Props) {
  const [focused, setFocused] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);

  const [value, setValue] = useState('');

  const [profiles, setProfiles] = useState<GameProfile[]>();

  useEffect(() => {
    if (!value) {
      const history = localStorageGetItem('historyProfiles');
      setProfiles(history ? JSON.parse(history) : undefined);
      return;
    }
    const fetchProfiles = async () => {
      let res = await getGameProfiles(value);
      setProfiles(res);
    };
    fetchProfiles();
  }, [value]);

  return (
    <div className='mx-auto my-6 w-full max-w-[900px]'>
      <div className={cn('w-full rounded-md bg-card', focused && 'p-1')}>
        <div className='flex w-full items-center justify-between'>
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
              value={value}
              onChange={(e) => setValue(e.target.value || '')}
              onFocus={() => {
                setFocused(true);
                if (onFocus) onFocus();
              }}
              placeholder='Nome do jogo + #TAG'
              type='text'
              className={cn(
                'flex h-14 w-full rounded-md border border-input bg-white px-4 py-2 text-sm text-black ring-offset-background placeholder:text-muted focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50',
                'pl-[68px] pr-8'
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
          {focused && (
            <Button
              className='flex aspect-square h-14 max-h-none w-auto max-w-none p-0 [&_svg]:size-6'
              onClick={() => {
                setFocused(false);
                if (onBlur) onBlur();
              }}
            >
              <XMarkIcon />
            </Button>
          )}
        </div>
        {focused && (
          <div className='w-full transition-all'>
            {!value && !profiles && (
              <p className='m-0 p-6 text-muted'>
                Digite para procurar. Suas buscas recentes aparecerão aqui!
              </p>
            )}
            {(profiles || []).length > 0 && (
              <ul>
                {profiles?.map((profile) => (
                  <ProfileOption profile={profile} />
                ))}
              </ul>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

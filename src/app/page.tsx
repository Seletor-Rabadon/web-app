'use client';
import { NickSearchbar } from '@/components/NickSearchbar';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { useState } from 'react';

export default function Home() {
  const [searchFocused, setSearchFocused] = useState(false);

  return (
    <div
      className={cn(
        'flex w-full items-center justify-center',
        searchFocused ? 'items-start' : ''
      )}
    >
      <div
        className={cn(
          'md:max-h-screen-content flex w-full max-w-container flex-col items-center justify-center px-6 py-36 transition-all',
          searchFocused && 'pt-6'
        )}
      >
        {!searchFocused && (
          <Image
            src='/logo/horizontal-logo.svg'
            alt='logo'
            className='mb-4 w-full md:w-[36%]'
            width={537}
            height={152}
          />
        )}
        {!searchFocused && (
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
        />
        {!searchFocused && (
          <div className='max-w-[600px] text-center text-sm text-muted'>
            Digite seu Nome de Invocador e seu{' '}
            <Badge variant='outline'>#ID Riot</Badge> para encontrar os campeões
            mais compatíveis com você, baseado em seu perfil e na experiência de
            outros jogadores
          </div>
        )}
      </div>
    </div>
  );
}

'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { ChampionAffinity } from '@/types/champion-affinity';
import { cn } from '@/lib/utils/tailwind';
import { Progress } from './ui/progress';
import { getChampionData } from '@/services/champion';
import { TrophyIcon } from '@heroicons/react/16/solid';
import { Champion, ChampionPassive } from '@/types/championFull';
import Image from 'next/image';

type Props = {
  affinity: ChampionAffinity;
  index: number;
};
export default function ChampionDetailedCard({ affinity, index }: Props) {
  const [champion, setChampion] = useState<Champion | undefined>(undefined);

  const championAbilities = useMemo(
    () =>
      champion
        ? [
            { ...champion.passive, type: 'Passiva' },
            ...champion.spells.map((spell, index) => ({
              description: spell.description,
              image: spell.image,
              name: spell.name,
              type: ['Q', 'W', 'E', 'Ultimate'][index],
            })),
          ]
        : undefined,
    [champion]
  );

  const [selectedAbility, setSelectedAbility] = useState<
    ChampionPassive | undefined
  >(champion?.passive);

  useEffect(() => {
    getChampionData(affinity.championId).then((champion) => {
      setChampion(champion);
      if (!selectedAbility) {
        setSelectedAbility(champion?.passive);
      }
    });
  }, [affinity.championId]);

  if (!champion) return null;

  return (
    <div
      key={affinity.championId}
      className={`relative flex w-full rounded-lg bg-card to-card`}
    >
      <div className='absolute -left-2 -top-2 z-10 flex items-center justify-center rounded-sm bg-secondary px-2 py-1'>
        <div className='text-lg font-bold uppercase text-black'>
          <TrophyIcon className='h-5 w-5' /> #{index + 1}
        </div>
      </div>
      <div
        className={cn(
          'aspect-[1/1.5] w-full rounded-l-lg bg-[length:auto_100%] bg-center bg-no-repeat md:w-[30%]',
          'transition-all duration-500 hover:bg-[length:auto_125%]',
          'flex flex-col justify-end shadow-[inset_10px_20px_50px_rgba(0,0,0,0.5)]'
        )}
        style={{
          backgroundImage: `url("${affinity.championImage}")`,
        }}
      ></div>
      <div className='flex flex-1 flex-col items-start justify-between p-6 px-8'>
        <div className='flex w-full items-center gap-6'>
          <h1 className='text-3xl font-black uppercase italic'>
            {champion.name}
          </h1>
          <div className='flex flex-col items-end gap-1 [flex:1]'>
            <Progress value={affinity.affinity * 100} />
            <div className='text-md font-bold text-white'>
              Compatibilidade: {affinity.affinity * 100}%
            </div>
          </div>
        </div>
        <div className='w-full'>
          <h1 className='mb-4 mt-6 text-2xl font-black uppercase italic text-card2'>
            Habilidades
          </h1>
          <div className='relative flex w-full items-center justify-evenly gap-4 before:absolute before:inset-0 before:top-8 before:z-0 before:h-[1px] before:w-full before:bg-card2'>
            {championAbilities?.map((ability) => (
              <Image
                key={ability.name}
                className={cn(
                  'relative z-10 size-16 cursor-pointer rounded-lg border-4 border-card2 transition-all duration-300',
                  selectedAbility?.name == ability.name && 'scale-125'
                )}
                onClick={() => {
                  setSelectedAbility(ability);
                }}
                width={64}
                height={64}
                src={
                  ability.type == 'Passiva'
                    ? `/passive/${ability.image.full}`
                    : `/spells/${ability.image.full}`
                }
                alt='Ícone'
              />
            ))}
          </div>
          <div className='mt-6 h-max w-full rounded-2xl bg-card2 p-4'>
            <p className='text-lg font-bold text-[#635C51]'>
              {selectedAbility?.type}
            </p>
            <p className='mt-2 text-2xl font-black uppercase italic text-card2-foreground'>
              {selectedAbility?.name}
            </p>
            <p className='text-md mt-4 text-card2-foreground'>
              {selectedAbility?.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

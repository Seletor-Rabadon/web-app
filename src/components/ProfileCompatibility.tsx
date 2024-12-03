'use client';

import { GameProfile } from '@/types/game-profile';
import React, { useState, useEffect } from 'react';
import { getChampionAffinity } from '@/services/championAffinity';
import { ChampionAffinity } from '@/types/champion-affinity';
import { cn } from '@/lib/utils/tailwind';
import { Progress } from './ui/progress';
import { Skeleton } from './ui/skeleton';
import ChampionSmallCard from './ChampionSmallCard';
import SelectedProfile from './SelectedProfile';
import { AlertTriangle } from 'lucide-react';
import ChampionDetailedCard from './ChampionDetailedCard';
import ChampionDetailedCardSkeleton from './ChampionDetailedCardSkeleton';
import { useGameProfilesHistory } from '@/lib/game-profiles';

type Props = {
  profile: GameProfile;
};
export default function ProfileCompatibility({ profile }: Props) {
  const [affinities, setAffinities] = useState<ChampionAffinity[]>([]);

  const [selectedProfile, setSelectedProfile] = useState<GameProfile>();

  const [isLoading, setIsLoading] = useState(true);

  const [error, setError] = useState<string | null>(null);

  const { addToHistory } = useGameProfilesHistory();
  useEffect(() => {
    setError(null);
    setSelectedProfile(undefined);
    setAffinities([]);

    setIsLoading(true);
    getChampionAffinity(
      profile.name ? profile.name : `${profile.gameName}#${profile.tagLine}`
    )
      .then((affinities) => {
        setAffinities(affinities.championAffinities || []);
        setSelectedProfile(affinities.profile);
        addToHistory({
          ...affinities.profile,
          name: profile.name
            ? profile.name
            : `${profile.gameName}#${profile.tagLine}`,
        });
      })
      .catch((e) => setError(e.message))
      .finally(() => setIsLoading(false));
  }, [profile]);

  return (
    <>
      {!error && selectedProfile && (
        <SelectedProfile profile={selectedProfile} />
      )}
      {error && (
        <div className='mx-auto mb-4 w-full rounded-md bg-red-400 p-4 md:w-[80vw] md:max-w-full'>
          <div className='flex items-center gap-3'>
            <AlertTriangle className='size-7 text-background' />
            <div>
              <p className='m-0 text-sm font-bold text-background'>
                Erro: {JSON.stringify(error)}
              </p>
              <p className='m-0 text-sm text-card'>
                Verifique se o nome de invocador e a tagline estão corretos
              </p>
            </div>
          </div>
        </div>
      )}
      <div className='w-full pb-10'>
        {!isLoading && !error && affinities.length > 0 && (
          <div className='mx-auto mb-4 w-full md:w-[80vw] md:max-w-full'>
            <ChampionDetailedCard affinity={affinities[0]} index={0} />
          </div>
        )}
        {isLoading && (
          <div className='mx-auto mb-4 w-full md:w-[80vw] md:max-w-full'>
            <ChampionDetailedCardSkeleton />
          </div>
        )}

        {!isLoading && !error && (
          <p className='mx-auto mb-4 w-full text-lg md:w-[80vw] md:max-w-full'>
            Tente também:
          </p>
        )}
        <div className='mx-auto grid w-full grid-cols-2 gap-4 md:w-[80vw] md:max-w-full md:grid-cols-[repeat(auto-fill,minmax(160px,1fr))]'>
          {isLoading &&
            Array.from({ length: 10 }).map((_, index) => (
              <Skeleton
                key={index}
                className={cn(
                  `flex aspect-[1/1.5] w-full flex-col items-center justify-end rounded-md`
                )}
              />
            ))}

          {!isLoading &&
            !error &&
            affinities?.length > 0 &&
            affinities
              ?.filter((a) => a.affinity >= 0.01)
              .map((affinity, index) =>
                index == 0 ? null : (
                  <ChampionSmallCard
                    key={affinity.championId}
                    affinity={affinity}
                    index={index}
                  />
                )
              )}
        </div>
      </div>
    </>
  );
}

import { GameProfile } from '@/types/game-profile';
import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  localStorageGetItem,
  localStorageSetItem,
} from './utils/storage-available';

type Props = {
  query: string;
};
export function useGameProfiles({ query }: Props) {
  const [historyProfiles, setHistoryProfiles] = useState<GameProfile[]>();

  const [profilesError, setProfilesError] = useState();

  useEffect(() => {
    const history = localStorageGetItem('historyProfiles');
    setHistoryProfiles(history ? JSON.parse(history) : undefined);
  }, []);

  const profiles = useMemo(() => {
    if (!query) return historyProfiles || [];
    return (
      historyProfiles?.filter(
        (p) =>
          p.name?.includes(query) ||
          p.gameName?.includes(query) ||
          p.tagLine?.includes(query)
      ) || []
    );
  }, [historyProfiles, query]);

  return {
    profiles,
    profilesError,
  };
}

export function useGameProfilesHistory() {
  const [profiles, setProfiles] = useState<GameProfile[]>([]);

  const updateProfiles = useCallback(() => {
    const storageData = localStorageGetItem('historyProfiles');
    const history = storageData ? JSON.parse(storageData) : [];
    setProfiles(history);
    return history;
  }, [setProfiles]);

  const addToHistory = (profile: GameProfile) => {
    const storageData = localStorageGetItem('historyProfiles');
    const history = storageData ? JSON.parse(storageData) : [];

    const newHistory = [
      profile,
      ...history.filter((p: GameProfile) => p.name != profile.name),
    ].slice(0, 5);

    localStorageSetItem('historyProfiles', JSON.stringify(newHistory));
    updateProfiles();
  };

  const removeFromHistory = (profile: GameProfile) => {
    const storageData = localStorageGetItem('historyProfiles');
    const history = storageData ? JSON.parse(storageData) : [];

    const newHistory = [
      ...history.filter((p: GameProfile) => p.name != profile.name),
    ];

    localStorageSetItem('historyProfiles', JSON.stringify(newHistory));
    updateProfiles();
  };

  useEffect(() => {
    updateProfiles();
  }, [updateProfiles]);

  return {
    profiles,
    addToHistory,
    removeFromHistory,
    updateProfiles,
  };
}

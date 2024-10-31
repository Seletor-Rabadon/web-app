import { GameProfile } from '@/types/game-profile';
import { useCallback, useEffect, useState } from 'react';
import {
  localStorageGetItem,
  localStorageSetItem,
} from './utils/storage-available';
import { getGameProfiles } from '@/services/game-profiles';

type Props = {
  query: string;
};
export function useGameProfiles({ query }: Props) {
  const [fetchingProfiles, setFetchingProfiles] = useState(false);

  const [profiles, setProfiles] = useState<GameProfile[]>();

  const [profilesError, setProfilesError] = useState();

  const fetchProfiles = useCallback(async () => {
    let res = await getGameProfiles(query);
    setProfiles(res);
  }, [setProfiles, query]);

  useEffect(() => {
    setFetchingProfiles(true);
    if (!query) {
      const history = localStorageGetItem('historyProfiles');
      setProfiles(history ? JSON.parse(history) : undefined);
      setFetchingProfiles(false);
      return;
    }

    fetchProfiles()
      .catch((e) => setProfilesError(e))
      .finally(() => setFetchingProfiles(false));
  }, [query]);

  return {
    refetchProfiles: fetchProfiles,
    profiles,
    profilesError,
    isFetchingProfiles: fetchingProfiles,
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

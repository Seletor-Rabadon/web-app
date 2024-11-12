import championData from '../mock/championFull.json';
import { Champion, ChampionFull } from '@/types/championFull';

export async function getChampionData(championId: string) {
  const champions = (championData as unknown as ChampionFull).data;

  return Promise.resolve(
    Object.values(champions).find((champion) => champion.id == championId)
  );
}

import { searchStr } from '@/lib/utils/search';
import { GameProfile } from '@/types/game-profile';
import { ChampionAffinity } from '@/types/champion-affinity';
import championData from '../mock/championFull.json';

const getRandomFloat = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min) + min) / 100;
};

export async function getChampionAffinity(
  name: string
): Promise<ChampionAffinity[]> {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const champions = championData.data;

  const affinities = Object.values(champions).map((champion, index) => ({
    championId: champion.id,
    championImage: `/champions/${champion.name
      .replace(' e ', '')
      .replace(' ', '')
      .replace("'", '')
      .replace('.', '')}_0.jpg`,
    championName: champion.name,
    affinity: getRandomFloat(0, 100),
  }));

  return affinities.sort((a, b) => b.affinity - a.affinity);
}

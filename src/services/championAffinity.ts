import {
  AffinityResponse,
  ChampionAffinityResponse,
} from '@/types/champion-affinity';
import championData from '../mock/championFull.json';

export async function fetchChampionAffinity(
  gameName: string,
  tagLine: string
): Promise<AffinityResponse> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}${process.env.NEXT_PUBLIC_PROFILE_AFFINITY_API_URL?.replace('{gameName}', gameName).replace('{tagLine}', tagLine)}`,
      {
        method: 'GET',
      }
    );

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    return res.json();
  } catch (error) {
    console.error('Error fetching champion affinity:', error);
    throw error;
  }
}

export async function getChampionAffinity(
  name: string
): Promise<ChampionAffinityResponse> {
  try {
    if (!name) throw new Error('Invalid profile');
    const gameName = name.split('#')[0];
    const tagLine = name.split('#')[1];

    if (!gameName || !tagLine) {
      throw new Error('Invalid profile');
    }

    const res = await fetchChampionAffinity(gameName, tagLine);

    const champions = championData.data;

    const affinities = Object.values(champions)
      .sort((a, b) => Number(a.id) - Number(b.id))
      .map((champion, index) => ({
        championId: champion.id,
        championImage: `/champions/${champion.name
          .replace(' e ', '')
          .replace(' ', '')
          .replace("'", '')
          .replace('.', '')}_0.jpg`,
        championName: champion.name,
        affinity: res.affinity[index],
        original: res.playerImage[`champion_${index + 1}`],
      }))
      .sort((a, b) => b.affinity - a.affinity);

    console.table(
      affinities.map((a) => ({
        original: a.original,
        affinity: a.affinity,
        name: a.championName,
      }))
    );
    return {
      profile: {
        ...res.profile,
        gameName,
        tagLine,
      },
      championAffinities: affinities,
    };
  } catch (error) {
    console.error('Error getting champion affinity:', error);
    throw error;
  }
}

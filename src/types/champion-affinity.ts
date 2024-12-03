import { GameProfile } from './game-profile';

export type ChampionAffinity = {
  championId: string;
  championImage: string;
  championName: string;
  affinity: number;
};
export type ChampionAffinityResponse = {
  profile: GameProfile;
  championAffinities: ChampionAffinity[];
};

export type AffinityResponse = {
  profile: GameProfile;
  affinity: any;
  playerImage: any;
};

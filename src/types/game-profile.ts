export type GameProfile = {
  gameName: string;
  gameRank: string;
  profileIconId: string;
  tagLine: string;
  name: string;
  revisionDate?: number;
  summonerLevel?: number;
};

export enum GameRankIcon {
  'BRONZE' = '/elos/bronze.svg',
  'CHALLENGER' = '/elos/challenger.svg',
  'DIAMOND' = '/elos/diamond.svg',
  'EMERALD' = '/elos/emerald.svg',
  'GOLD' = '/elos/gold.svg',
  'GRANDMASTER' = '/elos/grandmaster.svg',
  'MASTER' = '/elos/master.svg',
  'PLATINUM' = '/elos/platinum.svg',
  'SILVER' = '/elos/silver.svg',
  'IRON' = '/elos/iron.svg',
}

export enum GameRankLabel {
  'BRONZE' = 'Bronze',
  'CHALLENGER' = 'Desafiante',
  'DIAMOND' = 'Diamante',
  'EMERALD' = 'Esmeralda',
  'GOLD' = 'Ouro',
  'GRANDMASTER' = 'Grão-Mestre',
  'MASTER' = 'Mestre',
  'PLATINUM' = 'Platina',
  'SILVER' = 'Prata',
  'IRON' = 'Ferro',
}

export function getGameRankIcon(gameRank: string): string {
  if (!gameRank) return '';
  const sanitizedGameRank = gameRank?.split(
    ' '
  )?.[0] as keyof typeof GameRankIcon;

  return GameRankIcon[sanitizedGameRank];
}

export function getGameRankLabel(gameRank: string): string {
  if (!gameRank) return '';
  const parts = gameRank?.split(' ');
  const sanitizedGameRank = parts[0] as keyof typeof GameRankLabel;

  return parts.length > 1
    ? GameRankLabel[sanitizedGameRank] + parts[1]
    : GameRankLabel[sanitizedGameRank];
}

import { searchStr } from '@/lib/search';
import { GameProfile } from '@/types/game-profile';

export function getGameProfiles(search: string): GameProfile[] {
  return [
    {
      gameName: 'Veio',
      gameRank: 'EMERALD II',
      profileIconId: '6002',
      tagLine: 'HEIR',
      name: 'Veio#HEIR',
    },
    {
      gameName: 'supino incIinado',
      gameRank: 'EMERALD I',
      profileIconId: '1212',
      tagLine: 'BR1',
      name: 'supino incIinado#BR1',
    },
    {
      gameName: 'Pai do Green',
      gameRank: 'SILVER II',
      profileIconId: '5408',
      tagLine: 'BR1',
      name: 'Pai do Green#BR1',
    },
    {
      gameName: 'KR zabuza',
      gameRank: 'PLATINUM IV',
      profileIconId: '6106',
      tagLine: 'BR1',
      name: 'KR zabuza#BR1',
    },
  ].filter((item) => searchStr([item.gameName, item.name], search));
}

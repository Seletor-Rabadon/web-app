import { GameProfile } from '@/types/game-profile';
import React from 'react';

type Props = {
  profile: GameProfile;
};
export default function ProfileCompatibility({ profile }: Props) {
  return (
    <div className='w-full'>
      <div className='mx-auto h-[100vh] w-full max-w-[900px] rounded-2xl bg-gradient-to-r from-[#181825] to-card'>
        <h1>{profile.name}</h1>
      </div>
    </div>
  );
}

'use client';

import Image from 'next/image';
import { usePathname } from 'next/navigation';
import React from 'react';
import { Bars3Icon } from '@heroicons/react/16/solid';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from './ui/sheet';
import { Button } from './ui/button';
import { Separator } from './ui/separator';

export default function Footer() {
  return (
    <div className='mt-auto flex w-full flex-col items-center justify-center bg-card p-6'>
      <div className='flex w-full max-w-container flex-wrap items-center justify-between gap-10'>
        <div className='flex w-full flex-wrap items-center justify-center gap-4 md:w-auto md:justify-start'>
          <Image
            src='/logo/vertical-lol-logo.svg'
            alt='Unisagrado'
            className='flex-1'
            width={160}
            height={61.18}
          />
          <Separator
            orientation='vertical'
            className='hidden h-14 bg-muted sm:block'
          />
          <Image
            src='/logo/horizontal-unisagrado-logo.png'
            alt='Unisagrado'
            className='flex-1'
            width={246}
            height={86}
          />
        </div>
        <div className='ml-auto mr-auto max-w-[500px] md:mr-0'>
          <p className='text-center text-sm leading-normal md:text-right'>
            Projeto de Computação apresentado como parte dos requisitos do curso
            de Ciência da Computação - Centro Universitário Sagrado Coração.
          </p>

          <p className='mt-3 text-center text-sm leading-normal md:text-right'>
            Desenvolvido por Felipe Evaristo dos Santos e Roger Santos Barreto
          </p>
        </div>
      </div>
      <div className='w-full max-w-container'>
        <Separator className='my-6 bg-muted opacity-20' />

        <p className='text-center text-xs leading-normal text-muted md:text-left'>
          Copyright © 2024. Seletor Rabaddon não é endossado pela Riot Games e
          não reflete as visões ou opiniões da Riot Games ou de qualquer pessoa
          oficialmente envolvida na produção ou gerenciamento de League of
          Legends. League of Legends e Riot Games são marcas comerciais ou
          marcas registradas da Riot Games, Inc. League of Legends © Riot
          Games, Inc.
        </p>
      </div>
    </div>
  );
}

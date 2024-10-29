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

export default function Header() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <Sheet>
      <nav className='h-header flex w-full items-center justify-center bg-card px-6'>
        <div className='flex w-full max-w-container items-center justify-between gap-10 md:justify-start'>
          <Image
            src='/logo/horizontal-logo.svg'
            alt='logo'
            width={141.32}
            height={40}
          />

          <div className='md:hidden'>
            <SheetTrigger asChild>
              <Button variant='outline'>
                <Bars3Icon className='h-6 w-6' />
              </Button>
            </SheetTrigger>
          </div>

          <ul
            className={`flex flex-col items-center gap-4 md:flex-row ${isMenuOpen ? 'block' : 'hidden'} absolute left-0 top-full w-full bg-card md:relative md:flex md:w-auto md:bg-transparent`}
          >
            <li>
              <a
                href='/'
                className={`transition-colors hover:text-primary ${
                  pathname === '/' ? 'text-foreground' : 'text-muted'
                }`}
              >
                Página Inicial
              </a>
            </li>
            <li>
              <a
                href='/sobre'
                className={`transition-colors hover:text-primary ${
                  pathname === '/sobre' ? 'text-foreground' : 'text-muted'
                }`}
              >
                Sobre o Projeto
              </a>
            </li>
          </ul>
        </div>
      </nav>

      <SheetContent className='p-0 pt-12'>
        <div className='h-screen w-full'>
          <SheetTrigger asChild>
            <ul>
              <li
                className={`border-[hsl(240 13 41)] ${
                  pathname === '/' ? 'bg-card' : 'bg-background'
                }`}
              >
                <a
                  href='/'
                  className={`flex w-full items-center border-y px-2 py-4 transition-colors hover:text-primary ${
                    pathname === '/' ? 'text-foreground' : 'text-muted'
                  }`}
                >
                  Página Inicial
                </a>
              </li>
              <li
                className={`border-[hsl(240 13 41)] ${
                  pathname === '/sobre' ? 'bg-card' : 'bg-background'
                }`}
              >
                <a
                  href='/sobre'
                  className={`flex w-full items-center border-b px-2 py-4 transition-colors hover:text-primary ${
                    pathname === '/sobre' ? 'text-foreground' : 'text-muted'
                  }`}
                >
                  Sobre o Projeto
                </a>
              </li>
            </ul>
          </SheetTrigger>
        </div>
      </SheetContent>
    </Sheet>
  );
}

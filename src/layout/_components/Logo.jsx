import React from 'react';
import logo from '@/assets/img/img_logo.svg';
import Link from 'next/link';
import Image from 'next/image';

export default function Logo({ className }) {
  return (
    <Link href="/">
      <Image src={logo} alt="Docthur 로고" width={80} height={18} className={`${className} md:w-30 md:h-[27px]`} />
    </Link>
  );
}

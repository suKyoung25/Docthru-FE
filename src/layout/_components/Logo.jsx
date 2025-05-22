import React from "react";
import logo from "@/assets/img/img_logo.svg";
import Link from "next/link";
import Image from "next/image";
import { twMerge } from "tailwind-merge";

export default function Logo({ className }) {
  const mergedClassName = twMerge(
    "",
    className
  );
  return (
    <Link href="/">
      <Image
        src={logo}
        alt="Docthur 로고"
        width={80}
        height={18}
        className={mergedClassName}
      />
    </Link>
  );
}

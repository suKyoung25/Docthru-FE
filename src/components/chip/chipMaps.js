import ApiChip from "@/components/chip/chipType/ApiChip";
import CareerChip from "@/components/chip/chipType/CareerChip";
import ModernjsChip from "@/components/chip/chipType/ModernjsChip";
import NextjsChip from "@/components/chip/chipType/NextjsChip";
import WebChip from "@/components/chip/chipType/WebChip";
import BlogChip from "@/components/chip/chipCategory/BlogChip";
import OfficialDocChip from "@/components/chip/chipCategory/OfficialDocChip";

export const typeChipMap = {
  api: <ApiChip />,
  career: <CareerChip />,
  modernjs: <ModernjsChip />,
  nextjs: <NextjsChip />,
  web: <WebChip />,
};

export const categoryChipMap = {
  blog: <BlogChip />,
  officialdoc: <OfficialDocChip />,
};

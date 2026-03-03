import { UserRound, HandHeart, LucideIcon } from "lucide-react";

export interface OnboardingRole {
  id: string;
  href: string;
  title: string;
  description: string;
  icon: LucideIcon;
  color: string;
  hoverBorder: string;
  bgColor: string;
  hoverBg: string;
}

export const onboardingRoles: OnboardingRole[] = [
  {
    id: "grandparent",
    href: "/profile/grandparent",
    title: "Grandparent",
    description: "Post simple requests for help with daily tasks.",
    icon: UserRound,
    color: "text-primary",
    hoverBorder: "hover:border-primary",
    bgColor: "bg-primary/10",
    hoverBg: "group-hover:bg-primary/20",
  },
  {
    id: "helper",
    href: "/profile/helper",
    title: "Helper",
    description: "Build your profile and browse nearby requests.",
    icon: HandHeart,
    color: "text-secondary",
    hoverBorder: "hover:border-secondary",
    bgColor: "bg-secondary/20",
    hoverBg: "group-hover:bg-secondary/30",
  },
];

import cert1 from "@/assets/projects/Google Cloud Computing Foundations Certificate.png";
import cert2 from "@/assets/projects/Prepare Data for ML APIs on Google Cloud Skill Badge.png";
import cert3 from "@/assets/projects/Set Up an App Dev Environment on Google Cloud Skill Badge.png";
import cert4 from "@/assets/projects/Build a Secure Google Cloud Network Skill Badge.png";
import cert5 from "@/assets/projects/Implement Load Balancing on Compute Engine Skill Badge.png";
import cert6 from "@/assets/devops_for_fresher.jpg";
import cert7 from "@/assets/english.jpg";
import cert8 from "@/assets/thcp.jpg";

export interface Certificate {
  name: string;
  org: string;
  date: string;
  imageUrl: string;
  link?: string;
  variant: "primary" | "secondary" | "accent" | "info";
  badgeVariant: "primary" | "secondary" | "accent" | "info";
}

export const certificates: Certificate[] = [
  {
    name: "Google Cloud Computing Foundations Certificate",
    org: "Google Cloud",
    date: "01/2026",
    imageUrl: cert1,
    link: "https://www.credly.com/badges/f0113cf1-428d-4969-918d-73fd4411f86f/public_url",
    variant: "primary",
    badgeVariant: "primary",
  },
  {
    name: "Prepare Data for ML APIs on Google Cloud Skill Badge",
    org: "Google Cloud",
    date: "01/2026",
    imageUrl: cert2,
    link: "https://www.credly.com/badges/ff6f6c6d-dacd-471e-8060-7a6d7afc9695/public_url",
    variant: "info",
    badgeVariant: "info",
  },
  {
    name: "Set Up an App Dev Environment on Google Cloud Skill Badge",
    org: "Google Cloud",
    date: "01/2026",
    imageUrl: cert3,
    link: "https://www.credly.com/badges/bf345e0f-68df-45de-ac9e-61edffe3f818/public_url",
    variant: "accent",
    badgeVariant: "accent",
  },
  {
    name: "Build a Secure Google Cloud Network Skill Badge",
    org: "Google Cloud",
    date: "01/2026",
    imageUrl: cert4,
    link: "https://www.credly.com/badges/19abe520-d55d-4fd0-ad8b-47ad167048c7/public_url",
    variant: "secondary",
    badgeVariant: "secondary",
  },
  {
    name: "Implement Load Balancing on Compute Engine Skill Badge",
    org: "Google Cloud",
    date: "01/2026",
    imageUrl: cert5,
    link: "https://www.credly.com/badges/fc1c54c6-38e4-455a-8473-2351ec80c4de/public_url",
    variant: "primary",
    badgeVariant: "primary",
  },
  {
    name: "DevOps for Freshers",
    org: "DevOpsEdu.vn",
    date: "03/2026",
    imageUrl: cert6,
    variant: "accent",
    badgeVariant: "accent",
  },
  {
    name: "English Communication Course — B2 CEFR",
    org: "SunUni Academy",
    date: "07/2025",
    imageUrl: cert7,
    variant: "info",
    badgeVariant: "info",
  },
  {
    name: "Ứng dụng Công nghệ Thông tin Cơ bản",
    org: "ĐH Giao thông Vận tải TP.HCM",
    date: "05/2024",
    imageUrl: cert8,
    variant: "secondary",
    badgeVariant: "secondary",
  },
];


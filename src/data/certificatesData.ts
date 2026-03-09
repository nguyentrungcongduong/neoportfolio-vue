export interface Certificate {
  name: string;
  org: string;
  date: string;
  imageUrl: string;
  variant: "primary" | "secondary" | "accent" | "info";
  badgeVariant: "primary" | "secondary" | "accent" | "info";
}

export const certificates: Certificate[] = [
  {
    name: "Google Cloud Computing Foundations Certificate",
    org: "Google Cloud",
    date: "01/2026",
    imageUrl: "/certificates/foundations-data-ml-ai.png",
    variant: "primary",
    badgeVariant: "primary",
  },
  {
    name: "Prepare Data for ML APIs on Google Cloud Skill Badge",
    org: "Google Cloud",
    date: "01/2026",
    imageUrl: "/certificates/prepare-data-ml.png",
    variant: "info",
    badgeVariant: "info",
  },
  {
    name: "Set Up an App Dev Environment on Google Cloud Skill Badge",
    org: "Google Cloud",
    date: "01/2026",
    imageUrl: "/certificates/app-dev-environment.png",
    variant: "accent",
    badgeVariant: "accent",
  },
  {
    name: "Build a Secure Google Cloud Network Skill Badge",
    org: "Google Cloud",
    date: "01/2026",
    imageUrl: "/certificates/secure-network.png",
    variant: "secondary",
    badgeVariant: "secondary",
  },
  {
    name: "Implement Load Balancing on Compute Engine Skill Badge",
    org: "Google Cloud",
    date: "01/2026",
    imageUrl: "/certificates/load-balancing.png",
    variant: "primary",
    badgeVariant: "primary",
  },
  {
    name: "Google Cloud Computing Foundations: Networking and Security",
    org: "Google Cloud",
    date: "01/2026",
    imageUrl: "/certificates/networking-security.png",
    variant: "info",
    badgeVariant: "info",
  },
];

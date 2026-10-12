import raw from "./nfts.json";
import type { NftItem } from "@/components/NftGrid";

export const nfts = raw as { updatedAt: string | null; wallet: string; items: NftItem[] };

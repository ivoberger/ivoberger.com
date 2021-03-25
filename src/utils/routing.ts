import { useRouter } from "next/router";

export const useUrl = (relativPath?: string) => {
  // skip when Next does SSH/SSR
  if (typeof window === "undefined") return {};
  const router = useRouter();
  const path = router.asPath;
  const host = window.location.host;
  const protocol = window.location.protocol;
  const baseUrl = `${protocol}//${host}`;

  return {
    host,
    path,
    url: `${baseUrl}${path}`,
    resolvedPath: `${
      relativPath?.includes("http") ? "" : baseUrl
    }${relativPath}`,
  };
};

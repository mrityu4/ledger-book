import "~/styles/globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import type { AppType } from "next/app";
import { api } from "./../utils/trpc";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <ClerkProvider {...pageProps}>
      <Component {...pageProps} />
    </ClerkProvider>
  );
};

export default api.withTRPC(MyApp);

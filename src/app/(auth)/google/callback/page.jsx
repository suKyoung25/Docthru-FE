import LoadingSpinner from "@/components/loading/LoadingSpinner";
import { Suspense } from "react";
import GoogleClient from "./components/Client";

export default function GoogleCallbackPage() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <GoogleClient />
    </Suspense>
  );
}

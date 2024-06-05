import { Suspense } from "react";
import { CabinList } from "../_components/CabinList";
import Spinner from "../_components/Spinner";

export const revalidate = 3600;
// export const revalidate = 15;

export const metadata = { title: "Oasis Cabins" };

export default function Page() {
  // CHANGE
  return (
    <div>
      <h1 className="mb-5 text-4xl font-medium text-accent-400">
        Our Luxury Cabins
      </h1>
      <p className="mb-10 text-lg text-primary-200">
        Cozy yet luxurious cabins, located right in the heart of the Italian
        Dolomites. Imagine waking up to beautiful mountain views, spending your
        days exploring the dark forests around, or just relaxing in your private
        hot tub under the stars. Enjoy nature&apos;s beauty in your own little
        home away from home. The perfect spot for a peaceful, calm vacation.
        Welcome to paradise.
      </p>

      {/* Dynamic loading, this is the only party of page thats dynamic */}
      {/* fallback loader overriders the cabins loading.js with the global one */}
      <Suspense fallback={<Spinner name="cabin" />}>
        <CabinList />
      </Suspense>
    </div>
  );
}

import Link from "../../../components/ui/link";

export default function Cta() {
  return (
    <div className="py-24">
      <div className="relative isolate overflow-hidden bg-gray-100/50 px-6 py-24 text-center shadow-sm rounded-md sm:px-16">
        <h2 className="text-balance text-4xl font-semibold tracking-tight text-primary sm:text-5xl dark:text-foreground">
          The First Step to Elegance
        </h2>
        <p className="mx-auto mt-6 max-w-xl text-pretty text-lg/8 text-gray-600 dark:text-gray-200">
          Your collection hasn't been created yet. Curate your storefront with
          products that reflect your brand's true essence.
        </p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <Link
            href="/create"
            className="rounded-md bg-white px-3.5 py-2.5 text-gray-900 dark:text-gray-900 dark:hover:text-gray-900 shadow-sm hover:scale-90"
          >
            Start Adding Products
          </Link>
        </div>
        <svg
          viewBox="0 0 1024 1024"
          aria-hidden="true"
          className="absolute left-1/2 top-1/2 -z-10 size-[64rem] -translate-x-1/2 [mask-image:radial-gradient(closest-side,white,transparent)]"
        >
          <circle
            r={512}
            cx={512}
            cy={512}
            fill="url(#827591b1-ce8c-4110-b064-7cb85a0b1217)"
            fillOpacity="0.7"
          />
          <defs>
            <radialGradient id="827591b1-ce8c-4110-b064-7cb85a0b1217">
              <stop stopColor="#a20d2b" />
              <stop offset={1} stopColor="#E2123C" />
            </radialGradient>
          </defs>
        </svg>
      </div>
    </div>
  );
}

import Link from "next/link";

export default function NotFound() {
  return (
    <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col justify-center px-5 py-24">
      <p className="text-sm text-muted">404</p>
      <h1 className="mt-2 font-serif text-4xl tracking-tight">
        That page is not in this pack.
      </h1>
      <p className="mt-3 text-muted">
        Try the landing page, the self-serve kit, or overnight intake.
      </p>
      <Link href="/" className="mt-6 text-sm text-accent underline">
        Back to AppGate Pack
      </Link>
    </main>
  );
}

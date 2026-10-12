import Link from "next/link";

export default function NotFound() {
  return (
    <section className="wrap py-24">
      <h1 className="display text-[clamp(4rem,14vw,10rem)]">404</h1>
      <p className="mt-4 max-w-md text-lg">That wall got painted over. Head back to the front.</p>
      <Link href="/" className="btn mt-8">Home</Link>
    </section>
  );
}

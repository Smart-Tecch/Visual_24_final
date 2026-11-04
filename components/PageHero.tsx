import Image from "next/image";

interface PageHeroProps {
  kicker?: string;
  title: string;
  lede?: string;
  image: string;
}

export default function PageHero({
  kicker,
  title,
  lede,
  image,
}: PageHeroProps) {
  return (
    <section className="relative h-[58vh] min-h-[420px] w-full overflow-hidden">
      <Image
        src={image}
        alt=""
        fill
        priority
        className="object-cover"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-linear-to-t from-dark-100/80 via-dark-100/35 to-dark-100/20" />
      <div className="absolute inset-x-0 bottom-0 mx-auto max-w-7xl px-5 pb-12 sm:px-8">
        {kicker ? <p className="kicker text-primary">{kicker}</p> : null}
        <h1 className="mt-3 max-w-3xl text-4xl font-semibold tracking-tight text-white sm:text-6xl">
          {title}
        </h1>
        {lede ? (
          <p className="mt-4 max-w-xl text-lg text-white/80">{lede}</p>
        ) : null}
      </div>
    </section>
  );
}

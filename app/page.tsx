import Image from "next/image";
import Desktop from "/public/desktop-mockup.png";
import Mobile from "/public/mobile-mockup.png";
import { AndroidLogo, Dot } from "@phosphor-icons/react/dist/ssr";

export default function Home() {
  return (
    <main className="w-screen h-screen grid md:grid-cols-2 items-center justify-center font-light overflow-hidden">
      <div className="w-full h-full flex">
        <div className="relative p-8 md:m-auto space-y-8">
          <div className="flex flex-col items-left gap-4">
            <h1 className="text-4xl md:text-6xl font-thin">feather</h1>
            <p>the No BS to-do list app</p>
            <a
              href={process.env.NEXT_PUBLIC_FEATHER_APK}
              download="altar-preview"
              target="_blank"
            >
              <button
                type="button"
                className="w-fit text-white bg-black p-3 px-6 flex items-center gap-3 mt-4"
              >
                <AndroidLogo size={20} className="mt-px" />
                Download for Android
              </button>
            </a>
          </div>
          <div className="flex flex-col items-left gap-4">
            <div className="flex items-center gap-4">
              <p>v{process.env.NEXT_PUBLIC_FEATHER_VERSION}</p>
              <Dot size={16} />
              <p>
                made by{" "}
                <a
                  href="https://twitter.com/AshishK1331"
                  className="border-b border-neutral-300"
                >
                  Ashish
                </a>
              </p>
            </div>
            <p>
              for issues{" "}
              <a
                href="mailto:flangdev3000@gmail.com"
                className="border-b border-neutral-300"
              >
                send an email
              </a>
            </p>
          </div>
        </div>
      </div>
      <div className="md:hidden w-full -mt-16">
        <Image
          src={Mobile}
          alt="mobile mockup"
          className="w-full object-cover"
        />
      </div>
      <div className="hidden md:flex w-full h-full flex flex-row-reverse">
        <Image
          src={Desktop}
          className="w-fit h-full object-cover"
          alt="mockup for desktop"
        />
      </div>
    </main>
  );
}

import { TopBar } from "@/app/_components/top-bar";
import { Jumbotron } from "@/app/_components/jumbotron";
import { Video } from "@/app/_components/video";

export default async function HomePage() {
  return (
    <div className="absolute inset-0 bg-cover bg-center bg-home">
      <div className="min-h-screen w-full container mx-auto max-w-6xl">
        <div className="">
          <TopBar />
        </div>
        <div className="lg:mt-20 mt-10">
          <Jumbotron />
        </div>
        <div className="lg:mt-32 mt-10">
          <Video />
        </div>
      </div>
    </div>
  );
}

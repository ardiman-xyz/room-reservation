import {auth} from "@/auth";

export default async function HomePage() {
    const session = await auth()

  return (
    <main>
        Welcome {JSON.stringify(session)}
    </main>
  );
}

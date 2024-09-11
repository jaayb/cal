import Hero from "@/app/components/Hero";
import { signIn } from "@/auth";

export default function Home() {
  return (
    <>
      <Hero />
      <section className="text-center mt-32">
        <form
          action={async () => {
            "use server";
            await signIn("keycloakprovider");
          }}
        >
          <button type="submit">Signin with Keycloak</button>
        </form>
      </section>
    </>
  );
}

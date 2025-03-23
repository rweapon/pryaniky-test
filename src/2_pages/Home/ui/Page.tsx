import { AppPaths } from "@shared/model/configs";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <main className="flex items-center justify-center p-8">
      <section>
        <h1 className="text-3xl font-bold">Hello world!</h1>
        <Link to={AppPaths.LOGIN} className="text-lg">Login</Link>
      </section>
    </main>
  );
}

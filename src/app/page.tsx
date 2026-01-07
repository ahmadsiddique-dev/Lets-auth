import Image from "next/image";
import { Activity } from "react";

export default function Home() {
  return (
    <div>
      <Activity mode={1 < 2 ? "visible" : "hidden"}>
        <h1 className="bg-amber-300 text-transparent text-5xl bg-clip-text bg-linear-to-b shadow-lg text-center my-auto max-w-[90vw] mx-auto max-h-[40vh] rounded-lg mt-44">
        Am I visible
      </h1>
      </Activity>
    </div>
  );
}

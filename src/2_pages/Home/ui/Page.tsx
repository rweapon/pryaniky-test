import { skipToken } from "@reduxjs/toolkit/query";
import { Table, useGetTableInfoQuery } from "@widgets/table";

export default function Home() {
  const token = localStorage.getItem("token");

  const { isLoading } = useGetTableInfoQuery(token ? undefined : skipToken);

  return (
    <main className="flex flex-col items-start justify-start gap-5 p-8">
      <div className="size-full">
        <Table isLoading={isLoading} />
      </div>
    </main>
  );
}

import { Layout } from "~/components/layout";
import { Skeleton } from "~/components/ui/skeleton";
import { api } from "~/utils/api";

export default function () {
  const { data: parlors, isLoading } = api.parlor.getAll.useQuery();
  return (
    <Layout>
      {isLoading ? (
        <Skeleton className="w-[100px] h-[20px] rounded-full" />
      ) : (
        <></>
      )}
    </Layout>
  );
}

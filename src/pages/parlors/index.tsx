import { CommonAlert } from "~/components/commonAlert";
import { ParlorTable } from "~/components/parlor/table";
import { SkeletonTable } from "~/components/skeletonTable";
import { Layout } from "~/layouts";
import { api } from "~/utils/api";

export default function Parlors() {
  const { data: parlors, isLoading, isError, error } = api.parlor.getAll.useQuery();
  const subject = "雀荘"
  return (
    <Layout>
      <h1 className="my-4 text-center text-2xl">{subject}</h1>
      {isLoading ? (
        <SkeletonTable columnCount={3} />
      ) :
        isError ? <CommonAlert message={error?.message} /> : <ParlorTable parlors={parlors} />
      }
    </Layout>
  );
}

import { CommonAlert } from "~/components/commonAlert";
import { EmptyResource } from "~/components/emptyResource";
import { ParlorTable } from "~/components/parlorTable";
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
        <SkeletonTable columnCount={2} />
      ) :
        isError ? <CommonAlert message={error?.message} /> : parlors.length > 0 ? <ParlorTable parlors={parlors} /> : <EmptyResource subject={subject} />
      }
    </Layout>
  );
}

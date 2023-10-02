import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { Layout } from "~/components/layout";
import { MemberDetail } from "~/components/members/detail";

export default function () {
  const router = useRouter();
  const { id } = router.query;

  return (
    <Layout>
      <div className="mx-auto m-4 container">
        {id && <MemberDetail id={id} />}
      </div>
    </Layout>
  );
}

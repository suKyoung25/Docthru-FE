import React from "react";
import Link from "next/link";
import ListHead from "./ListHead";
import ListRow from "./ListRow";
import Pagination from "@/components/pagination/Pagination";

export default function AppliedChallenges({ resultData, totalCount, page, pageSize, onPageChange }) {
  return (
    <div className="overflow-scroll">
      <ListHead />
      <div>
        {resultData?.map((data, idx) => (
          <Link key={idx} href={`/challenges/my/apply/${data.id}`}>
            <ListRow key={idx} data={data} />
          </Link>
        ))}
      </div>
      <div className="mt-5">
        <Pagination totalCount={totalCount} currentPage={page} pageSize={pageSize} onPageChange={onPageChange} />
      </div>
    </div>
  );
}

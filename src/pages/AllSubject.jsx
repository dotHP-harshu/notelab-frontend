import React, { useCallback, useEffect, useState } from "react";
import Header from "../components/Header";
import SubjectCard from "../components/SubjectCard";
import Navbar from "../components/Navbar";
import { BsArrowLeft } from "react-icons/bs";
import { useNavigate, useSearchParams } from "react-router";
import { getSubjectsApi } from "../service/api";
import Loader from "../components/Loader";
import { useQuery } from "@tanstack/react-query";

function AllSubject() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const page = Number(searchParams.get("page")) || 1;

  const { data, isLoading, error } = useQuery({
    queryKey: ["subjects", page],
    queryFn: () => getSubjectsApi(page, limit).then((res) => res.data.data),
    keepPreviousData: true,
    staleTime: 5 * 60 * 1000, // cache for 5 mins
  });

  const subjects = data?.subjects || [];
  const pagination = data?.pagination || null;

  const handlePrev = () => {
    const prevPage = page - 1;
    navigate(`/all-subjects?page=${prevPage}`);
  };

  const handleNext = () => {
    const nextPage = page + 1;
    navigate(`/all-subjects?page=${nextPage}`);
  };
  if (isLoading) {
    return (
      <div className="h-dvh w-full flex justify-center items-center">
        <Loader />
      </div>
    );
  }

  return (
    <>
      <Header />

      <div className="pl-6">
        <span className="cursor-pointer" onClick={() => navigate(-1)}>
          <BsArrowLeft size={30} />
        </span>
      </div>
      {/* all subjects */}
      <section className="px-10">
        {/* header  */}
        <div className="w-full flex justify-between items-center py-6">
          <h3 className="text-3xl font-semibold tracking-tighter">
            All Subjects
          </h3>
        </div>
        {/* header  */}

        {pagination && (
          <div className="px-6 flex justify-center items-end flex-col">
            <p className="text-base w-fit">
              Total subjects : {pagination.total}
            </p>
            <p className="text-base w-fit">
              Page: {pagination.page}/{pagination.totalPages}
            </p>
          </div>
        )}

        {/* card-container  */}
        {subjects && (
          <>
            <div className="w-full py-4 grid grid-cols-[repeat(auto-fill,minmax(300px,300px))] gap-6 justify-center mt-10">
              {subjects.length === 0 ? (
                <div className="min-h-[60dvh] w-full justify-center items-center flex">
                  <p className="text-xl font-bold text-text-muted">
                    No result found.
                  </p>
                </div>
              ) : (
                subjects.map((sub, index) => (
                  <SubjectCard subject={sub} key={sub._id} />
                ))
              )}
            </div>
            {pagination && (
              <div className="w-full min-h-20 flex justify-center items-center gap-10 mt-4 relative">
                {pagination.hasPrev && (
                  <button
                    onClick={handlePrev}
                    className="text-base absolute top-1/2 right-1/2 -translate-y-1/2 -translate-x-10 bg-primary-color px-4 py-1 rounded-sm outline-none border-none cursor-pointer"
                  >
                    Prev
                  </button>
                )}
                {pagination.hasNext && (
                  <button
                    onClick={handleNext}
                    className="text-base absolute top-1/2 left-1/2 -translate-y-1/2 translate-x-10 bg-primary-color px-4 py-1 rounded-sm outline-none border-none cursor-pointer"
                  >
                    Next
                  </button>
                )}
              </div>
            )}
          </>
        )}
        {/* card-container  */}
      </section>
      {/* all subjects */}

      {/* navbar */}
      <Navbar />
      {/* navbar */}
    </>
  );
}

export default AllSubject;

import { Link, useSearchParams } from "@remix-run/react";
import { FaArrowLeft, FaArrowRight, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { Footer } from "./Footer";
import { Button } from "./ui/button";

/**
 * Thanks to Jacob Paris for this function
 * @param searchParams
 * @param changes
 * @see https://www.jacobparis.com/content/remix-pagination
 */
function setSearchParamsString(
  searchParams: URLSearchParams,
  changes: Record<string, string | number | undefined>,
) {
  const newSearchParams = new URLSearchParams(searchParams);

  for (const [key, value] of Object.entries(changes)) {
    if (value === undefined) {
      newSearchParams.delete(key);
      continue;
    }

    newSearchParams.set(key, String(value));
  }

  return Array.from(newSearchParams.entries())
    .map(([key, value]) => (value ? `${key}=${encodeURIComponent(value)}` : key))
    .join("&");
}

export const PaginationBar = ({ total }: { total: number }): React.ReactElement => {
  const [searchParams] = useSearchParams();
  const $skip = Number(searchParams.get("$skip")) || 0;
  const $top = Number(searchParams.get("$top")) || 10;

  const totalPages = Math.ceil(total / $top);
  const currentPage = Math.floor($skip / $top) + 1;
  const maxPages = 4;
  const halfMaxPages = Math.floor(maxPages / 2);

  const canPageBackwards = $skip > 0;
  const canPageForwards = $skip + $top < total;

  const pageNumbers = [] as Array<number>;
  if (totalPages <= maxPages) {
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i);
    }
  } else {
    let startPage = currentPage - halfMaxPages;
    let endPage = currentPage + halfMaxPages;

    if (startPage < 1) {
      endPage += Math.abs(startPage) + 1;
      startPage = 1;
    }

    if (endPage > totalPages) {
      startPage -= endPage - totalPages;
      endPage = totalPages;
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }
  }

  return (
    <>
      <section className="fixed mb-0 bottom-0 left-0 right-0 flex justify-center items-center">
        <div className="grid grid-cols-1 gap-1 justify-center items-center justify-items-center rounded-md">
          <div className="flex items-center gap-1">
            <Button
              aria-label="Go to first page"
              title="Go to first page"
              size="sm"
              variant="outline"
              asChild
              disabled={!canPageBackwards}
            >
              <Link
                to={{
                  search: setSearchParamsString(searchParams, {
                    page: 1,
                    $skip: 0,
                  }),
                }}
                preventScrollReset
                prefetch="intent"
                className="text-neutral-600 "
              >
                <span className="sr-only">First page</span>
                <FaChevronLeft name="arrow-left" />
              </Link>
            </Button>

            <Button
              aria-label="Go to previous page"
              title="Go to previous page"
              size="sm"
              variant="outline"
              asChild
              disabled={!canPageBackwards}
            >
              <Link
                to={{
                  search: setSearchParamsString(searchParams, {
                    page: $skip > 0 ? currentPage - 1 : currentPage,
                    $skip: Math.max($skip - $top, 0),
                  }),
                }}
                preventScrollReset
                prefetch="intent"
                className="text-neutral-600"
              >
                <span className="sr-only"> Previous page</span>
                <FaArrowLeft name="double-arrow-left" />
              </Link>
            </Button>

            {pageNumbers.map((pageNumber) => {
              const pageSkip = (pageNumber - 1) * $top;
              const isCurrentPage = pageNumber === currentPage;

              if (isCurrentPage) {
                return (
                  <Button
                    size="sm"
                    variant="ghost"
                    key={`${pageNumber}-active`}
                    className="grid min-w-[2rem] place-items-center bg-orange-300 hover:bg-orange-300 text-sm text-black hover:cursor-default"
                  >
                    <div>
                      <span className="sr-only">Page {pageNumber}</span>
                      <span>{pageNumber}</span>
                    </div>
                  </Button>
                );
              } else {
                return (
                  <Button
                    aria-label="Go to next page"
                    title="Go to next page"
                    size="sm"
                    variant="ghost"
                    asChild
                    key={pageNumber}
                    className="bg-slate-300"
                  >
                    <Link
                      to={{
                        search: setSearchParamsString(searchParams, {
                          page: pageNumber,
                          $skip: pageSkip,
                        }),
                      }}
                      preventScrollReset
                      prefetch="intent"
                      className="min-w-[2rem] font-normal text-neutral-900"
                    >
                      {pageNumber}
                    </Link>
                  </Button>
                );
              }
            })}

            <Button
              aria-label="Go to next page"
              title="Go to next page"
              size="sm"
              variant="outline"
              asChild
              disabled={!canPageForwards}
            >
              <Link
                to={{
                  search: setSearchParamsString(searchParams, {
                    page: $skip + $top < total ? currentPage + 1 : currentPage,
                    $skip: $skip + $top,
                  }),
                }}
                preventScrollReset
                prefetch="intent"
                className="text-neutral-600"
              >
                <span className="sr-only"> Next page</span>
                <FaArrowRight name="double-arrow-right" />
              </Link>
            </Button>

            <Button
              aria-label="Go to last page"
              title="Go to last page"
              size="sm"
              variant="outline"
              asChild
              disabled={!canPageForwards}
            >
              <Link
                to={{
                  search: setSearchParamsString(searchParams, {
                    page: currentPage === totalPages ? currentPage : totalPages,
                    $skip: (totalPages - 1) * $top,
                  }),
                }}
                preventScrollReset
                prefetch="intent"
                className="text-neutral-600"
              >
                <span className="sr-only">Last page</span>
                <FaChevronRight name="arrow-right" />
              </Link>
            </Button>
          </div>
          <div className="flex justify-center items-center bg-slate-200 rounded-md w-48 text-sm text-center">
            {currentPage} of {total}
          </div>{" "}
          <Footer />
        </div>
      </section>
    </>
  );
};

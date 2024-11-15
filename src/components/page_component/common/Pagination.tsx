import {Button} from "@/components/ui/button";
import {ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight} from "lucide-react";

interface PaginationProps {
    totalPage: number,
    setCurrentPage: (newPage: number) => void,
    currentPage: number,
    buttonSize: number,
    hasPreviousPage: boolean | undefined,
    hasNextPage: boolean | undefined,
}

const Pagination = ({
                        totalPage,
                        setCurrentPage,
                        currentPage,
                        buttonSize,
                        hasPreviousPage,
                        hasNextPage
                    }: PaginationProps) => {
    const halfMaxPagesToShow = Math.floor(buttonSize / 3);

    let startPage = Math.max(1, currentPage - halfMaxPagesToShow);
    const endPage = Math.min(totalPage, startPage + buttonSize - 1);

    if (endPage - startPage + 1 < buttonSize && startPage > 1) {
        startPage = Math.max(1, endPage - buttonSize + 1);
    }

    return (
        <div className="flex justify-center items-center space-x-1 mt-[1em]">
            {/* 이이전 버튼 */}
            <Button
                size="sm"
                disabled={!hasPreviousPage}
                variant="outline"
                onClick={() => {
                    setCurrentPage(0);
                }}
            >
                <ChevronsLeft/>
            </Button>


            {/* 이전 버튼 */}
            <Button
                size="sm"
                variant="outline"
                disabled={!hasPreviousPage}
                onClick={() => {
                    if (currentPage <= 0) return;

                    setCurrentPage(currentPage - 1);
                }}
            >
                <ChevronLeft/>
            </Button>


            {/* 보여지는 버튼 */}
            {[...Array(endPage - startPage + 1)].map((_, index) => (
                <button
                    key={index + startPage}
                    onClick={() => {
                        if (index + startPage === currentPage + 1) {
                            return;
                        } else {
                            setCurrentPage((index + startPage) - 1);
                        }
                    }}
                    className={`
                        inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium
                        border border-input bg-background hover:bg-accent hover:text-accent-foreground
                        h-9 px-3
                        ${index + startPage === currentPage + 1 && "hover:bg-secondary bg-secondary"}
                    `}
                >
                    {index + startPage}
                </button>
            ))}


            {/* 다음 버튼 */}
            <Button
                size="sm"
                variant="outline"
                disabled={!hasNextPage}
                onClick={() => {
                    if (currentPage >= totalPage) return;

                    setCurrentPage(currentPage + 1);
                }}
            >
                <ChevronRight/>
            </Button>


            {/* 다다음 버튼 */}
            <Button
                size="sm"
                disabled={!hasNextPage}
                variant="outline"
                onClick={() => {
                    setCurrentPage(totalPage - 1);
                }}
            >
                <ChevronsRight/>
            </Button>
        </div>
    );
};

export default Pagination;

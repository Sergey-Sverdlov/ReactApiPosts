import {useMemo} from "react";

export const usePagination = (totalPages) => {
    let pagesArray = []
    pagesArray = useMemo(() => {
        for (let i = 0; i < totalPages; i++) {
            pagesArray.push(i + 1)
        }
        return pagesArray
    }, [totalPages])
    return [pagesArray]
}
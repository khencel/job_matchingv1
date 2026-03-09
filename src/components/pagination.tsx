
interface PaginationProps {
    totalPages: number;
    currentPage: number;
    handlePageChange: (newPage: number) => void;
    next: string | null;
    previous: string | null;
    pageSize: number;
    count: number;
    handlePageSizeChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}



export default function Pagination({totalPages, currentPage, handlePageChange, next, previous, pageSize, count, handlePageSizeChange}: PaginationProps){
    return (
        <>
            <div className="d-flex justify-content-between align-items-center mt-3">
                <div className="d-flex align-items-center">
                    <label className="me-2">Items per page:</label>
                    <select 
                        className="form-select form-select-sm" 
                        style={{ width: 'auto' }}
                        value={pageSize}
                        onChange={handlePageSizeChange}
                    >
                        <option value={5}>5</option>
                        <option value={10}>10</option>
                        <option value={25}>25</option>
                        <option value={50}>50</option>
                    </select>
                    <span className="ms-3 text-muted">
                        {/* {t("users.pagination.showing", {
                            start: ((currentPage - 1) * pageSize) + 1,
                            end: Math.min(currentPage * pageSize, count),
                            total: count,
                        })} */}
                        Showing {((currentPage - 1) * pageSize) + 1} to {Math.min(currentPage * pageSize, count)} of {count}
                    </span>
                </div>
                <nav>
                    <ul className="pagination mb-0">
                        <li className={`page-item ${!previous ? 'disabled' : ''}`}>
                            <button 
                                className="page-link" 
                                onClick={() => handlePageChange(currentPage - 1)}
                                disabled={!previous}
                            >
                                {/* {t("users.pagination.previous")} */}
                                previous
                            </button>
                        </li>
                        
                        {[...Array(totalPages)].map((_, index) => (
                            <li 
                                key={index + 1} 
                                className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}
                            >
                                <button 
                                    className="page-link" 
                                    onClick={() => handlePageChange(index + 1)}
                                >
                                    {index + 1}
                                </button>
                            </li>
                        ))}
                        
                        <li className={`page-item ${!next ? 'disabled' : ''}`}>
                            <button 
                                className="page-link" 
                                onClick={() => handlePageChange(currentPage + 1)}
                                disabled={!next}
                            >
                                {/* {t("users.pagination.next")} */}
                                next
                            </button>
                        </li>
                    </ul>
                </nav>
            </div>
        </>
    )
}
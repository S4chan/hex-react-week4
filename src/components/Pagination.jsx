import PropTypes from "prop-types";

function Pagination({ pageInfo, pageChangeHandler }) {
  return (
    <div className="d-flex justify-content-center">
      <nav>
        <ul className="pagination">
          <li className={`page-item ${!pageInfo.has_pre && "disabled"}`}>
            <a
              className="page-link"
              href="#"
              onClick={() => pageChangeHandler(pageInfo.current_page - 1)}
            >
              上一頁
            </a>
          </li>

          {Array.from({ length: pageInfo.total_pages }).map((_, index) => (
            <li
              className={`page-item ${
                pageInfo.current_page === index + 1 && "active"
              }`}
              key={index}
            >
              <a
                className="page-link"
                href="#"
                onClick={() => pageChangeHandler(index + 1)}
              >
                {index + 1}
              </a>
            </li>
          ))}

          <li className={`page-item ${!pageInfo.has_next && "disabled"}`}>
            <a
              className="page-link"
              href="#"
              onClick={() => pageChangeHandler(pageInfo.current_page + 1)}
            >
              下一頁
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
}

Pagination.propTypes = {
  // pageInfo 是物件，定義其內部結構
  pageInfo: PropTypes.shape({
    has_pre: PropTypes.bool, // 是否有上一頁
    current_page: PropTypes.number, // 當前頁碼
    total_pages: PropTypes.number, // 總頁數
    has_next: PropTypes.bool, // 是否有下一頁
  }),
  // pageChangeHandler 是函數
  pageChangeHandler: PropTypes.func,
};

export default Pagination;

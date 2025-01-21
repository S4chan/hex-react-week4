import { useEffect, useRef } from "react";
import { Modal } from "bootstrap";
import axios from "axios";
import PropTypes from "prop-types";

const url = import.meta.env.VITE_BASE_URL;
const path = import.meta.env.VITE_API_PATH;

function DelProductModal({ catchProducts, tempProduct, isOpen, setIsOpen }) {
  const delProductModalRef = useRef(null);
  const deleteProductHandler = async () => {
    try {
      await deleteProduct();
      catchProducts();
      closeDelProductModal();
    } catch (error) {
      alert("產品刪除失敗");
      console.error(error);
    }
  };

  const deleteProduct = async () => {
    try {
      await axios.delete(`${url}/api/${path}/admin/product/${tempProduct.id}`);
    } catch (error) {
      alert("產品刪除失敗");
      console.error(error);
    }
  };

  const closeDelProductModal = () => {
    const modalInstance = Modal.getInstance(delProductModalRef.current);
    modalInstance.hide();
    setIsOpen(false);
  };

  useEffect(() => {
    new Modal(delProductModalRef.current, { backdrop: false });
  }, []);

  useEffect(() => {
    if (isOpen) {
      const modalInstance = Modal.getInstance(delProductModalRef.current);
      modalInstance.show();
    }
  }, [isOpen]);
  return (
    <div
      className="modal fade"
      id="delProductModal"
      ref={delProductModalRef}
      tabIndex="-1"
      style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5">刪除產品</h1>
            <button
              type="button"
              className="btn-close"
              onClick={closeDelProductModal}
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            你是否要刪除
            <span className="text-danger fw-bold">{tempProduct.title}</span>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={closeDelProductModal}
            >
              取消
            </button>
            <button
              type="button"
              className="btn btn-danger"
              onClick={deleteProductHandler}
            >
              刪除
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

DelProductModal.propTypes = {
  catchProducts: PropTypes.func,
  tempProduct: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    title: PropTypes.string,
  }),
  isOpen: PropTypes.bool,
  setIsOpen: PropTypes.func,
};

export default DelProductModal;

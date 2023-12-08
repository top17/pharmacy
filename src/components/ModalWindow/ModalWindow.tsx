import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function ModalWindow({
  show,
  onConfirm,
  onCancel,
}: {
  show: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}) {
  const handleClose = () => {
    onCancel();
  };
  const handleConfirm = () => {
    onConfirm();
  };
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Confirm Delete</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Are you sure you want to delete this product?</p>
      </Modal.Body>
      <Modal.Footer
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Button variant="secondary" onClick={handleClose}>
          No
        </Button>
        <Button
          variant="primary"
          style={{ backgroundColor: "red" }}
          onClick={handleConfirm}
        >
          Yes
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ModalWindow;

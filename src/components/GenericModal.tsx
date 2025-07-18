
const Modal = ({ title, children, onClose }: any) => (
  <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
    <div className="bg-white rounded-lg shadow-lg w-full max-w-md">
      <div className="p-4 border-b flex justify-between items-center">
        <h2 className="text-lg font-semibold">{title}</h2>
        <button onClick={onClose}>✕</button>
      </div>
      <div className="p-4">{children}</div>
    </div>
  </div>
);

export default Modal; 
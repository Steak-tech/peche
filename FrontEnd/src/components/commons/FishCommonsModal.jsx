import React from "react";

export default function FishCommonsModal({ open, onClose, children }) {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-[1100]"
      onClick={onClose}
    >
      <div
        className="bg-white p-4 rounded-lg shadow-lg min-w-[300px]"
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
}

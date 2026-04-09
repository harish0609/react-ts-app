import React, { ReactNode, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import "./dialog-style.scss";

type DialogProps = {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  footer?: ReactNode;
  width?: string;
  height?: string;
  closeOnOverlay?: boolean;
};

const Dialog: React.FC<DialogProps> = ({
  open,
  onClose,
  title,
  children,
  footer,
  width = "500px",
  height = "auto",
  closeOnOverlay = true,
}) => {
  const [mounted, setMounted] = useState(false);

  // Ensure DOM is available (important for SSR safety)
  useEffect(() => {
    setMounted(true);
  }, []);

  // Prevent background scroll
  useEffect(() => {
    if (open) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "auto";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [open]);

  if (!mounted || !open) return null;

  return createPortal(
    <div
      className="dialog-overlay"
      onClick={closeOnOverlay ? onClose : undefined}
    >
      <div
        className="dialog-container"
        style={{ width, height }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="dialog-header">
          <h3>{title}</h3>
          <button className="close-btn" onClick={onClose}>
            ✕
          </button>
        </div>

        {/* Body */}
        <div className="dialog-body">{children}</div>

        {/* Footer */}
        {footer && <div className="dialog-footer">{footer}</div>}
      </div>
    </div>,
    document.body // 🔥 This is the portal target
  );
};

export default Dialog;
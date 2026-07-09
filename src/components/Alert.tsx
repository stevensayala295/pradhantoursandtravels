/**
 * Alert/notification component
 */

import React from "react";

interface AlertProps {
  type: "success" | "error" | "warning" | "info";
  title?: string;
  message: string;
  onClose?: () => void;
}

export function Alert({ type, title, message, onClose }: AlertProps) {
  const colors = {
    success: {
      bg: "bg-green-50",
      border: "border-green-200",
      text: "text-green-800",
      icon: "✓",
    },
    error: {
      bg: "bg-red-50",
      border: "border-red-200",
      text: "text-red-800",
      icon: "✕",
    },
    warning: {
      bg: "bg-amber-50",
      border: "border-amber-200",
      text: "text-amber-800",
      icon: "!",
    },
    info: {
      bg: "bg-blue-50",
      border: "border-blue-200",
      text: "text-blue-800",
      icon: "ℹ",
    },
  };

  const color = colors[type];

  return (
    <div className={`${color.bg} border ${color.border} ${color.text} px-4 py-3 rounded-lg`}>
      <div className="flex items-start justify-between">
        <div className="flex items-start gap-3">
          <span className="text-lg font-bold">{color.icon}</span>
          <div>
            {title && <p className="font-semibold mb-1">{title}</p>}
            <p className="text-sm">{message}</p>
          </div>
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className="ml-4 text-lg hover:opacity-70"
            aria-label="Close alert"
          >
            ✕
          </button>
        )}
      </div>
    </div>
  );
}

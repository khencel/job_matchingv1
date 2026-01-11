"use client"

import React from "react";

interface ButtonProps {
  onClick?: () => void;
  disabled?: boolean;
  children?: React.ReactNode;
  label?: string;
  icon?: React.ReactNode;
  className?: string;
}

function BaseButton({
  onClick,
  disabled = false,
  className = "",
  label = "",
  icon,
}: ButtonProps & { className?: string }) {
  return (
    <button
      className={className}
      onClick={onClick}
      disabled={disabled}
    >
      {icon && <span className="me-2">{icon}</span>} 
      {label}
    </button>
  );
}

// Add Button
export function AddButton({ onClick, disabled, label, icon, className }: ButtonProps) {
  return (
    <BaseButton
      onClick={onClick}
      className={className}
      label={label}
      icon={icon}
    >
    </BaseButton>
  );
}

// Edit Button
export function EditButton({ onClick, disabled, label, icon }: ButtonProps) {
  return (
    <BaseButton
      onClick={onClick}
      disabled={disabled}
      className="btn-primary-custom"
      label={label}
      icon={icon}
    >
    </BaseButton>
  );
}

// Delete Button
export function DeleteButton({ onClick, disabled, label, icon }: ButtonProps) {
  return (
    <BaseButton
      onClick={onClick}
      disabled={disabled}
      className="btn-danger"
      label={label}
      icon={icon}
    >
    </BaseButton>
  );
}

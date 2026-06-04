import React from "react";
import { Loader2 } from "lucide-react";

// Bouton multi-variantes basé sur les classes du design system.
// variant : primary | ghost | soft | success | danger
export function Button({
  variant = "primary",
  size,
  loading = false,
  icon: Icon,
  children,
  className = "",
  disabled,
  ...rest
}) {
  const cls = [
    "btn",
    "btn-" + variant,
    size === "sm" ? "btn-sm" : "",
    size === "lg" ? "btn-lg" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <button className={cls} disabled={disabled || loading} {...rest}>
      {loading ? (
        <Loader2 className="spin" />
      ) : (
        Icon && <Icon />
      )}
      {children}
    </button>
  );
}

// Bouton icône carré.
export function IconButton({ icon: Icon, variant = "ghost", title, ...rest }) {
  return (
    <button className={"btn btn-" + variant + " btn-icon"} title={title} {...rest}>
      <Icon />
    </button>
  );
}

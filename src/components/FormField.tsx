import { forwardRef, useState, type InputHTMLAttributes } from "react";
import { Eye, EyeOff } from "lucide-react";

interface FormFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

const FormField = forwardRef<HTMLInputElement, FormFieldProps>(
  ({ label, error, id, type, ...rest }, ref) => {
    const fieldId = id ?? label.toLowerCase().replace(/\s+/g, "-");
    const isPassword = type === "password";
    const [visible, setVisible] = useState(false);

    return (
      <div>
        <label
          htmlFor={fieldId}
          className="mb-1.5 block text-[13px] font-medium text-ink"
        >
          {label}
        </label>
        <div className="relative">
          <input
            id={fieldId}
            ref={ref}
            type={isPassword ? (visible ? "text" : "password") : type}
            className={`w-full rounded-2xl border bg-paper px-4 py-3 text-[14.5px] text-ink outline-none transition-colors placeholder:text-ink-soft/50 focus:border-ink ${
              isPassword ? "pr-11" : ""
            } ${error ? "border-red-400" : "border-mist"}`}
            {...rest}
          />
          {isPassword && (
            <button
              type="button"
              onClick={() => setVisible((v) => !v)}
              tabIndex={-1}
              aria-label={visible ? "Hide password" : "Show password"}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-ink-soft transition-colors hover:text-ink"
            >
              {visible ? (
                <EyeOff size={17} strokeWidth={1.8} />
              ) : (
                <Eye size={17} strokeWidth={1.8} />
              )}
            </button>
          )}
        </div>
        {error && (
          <p className="mt-1.5 text-[12.5px] text-red-500">{error}</p>
        )}
      </div>
    );
  }
);

FormField.displayName = "FormField";
export default FormField;
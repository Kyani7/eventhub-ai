import { forwardRef, type InputHTMLAttributes } from "react";

interface FormFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

const FormField = forwardRef<HTMLInputElement, FormFieldProps>(
  ({ label, error, id, ...rest }, ref) => {
    const fieldId = id ?? label.toLowerCase().replace(/\s+/g, "-");
    return (
      <div>
        <label
          htmlFor={fieldId}
          className="mb-1.5 block text-[13px] font-medium text-ink"
        >
          {label}
        </label>
        <input
          id={fieldId}
          ref={ref}
          className={`w-full rounded-2xl border bg-paper px-4 py-3 text-[14.5px] text-ink outline-none transition-colors placeholder:text-ink-soft/50 focus:border-ink ${
            error ? "border-red-400" : "border-mist"
          }`}
          {...rest}
        />
        {error && (
          <p className="mt-1.5 text-[12.5px] text-red-500">{error}</p>
        )}
      </div>
    );
  }
);

FormField.displayName = "FormField";
export default FormField;
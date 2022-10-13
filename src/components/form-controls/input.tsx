import React from "react";

interface Props extends React.InputHTMLAttributes<HTMLElement> {
  label?: string;
  variant?: string;
  error?: string;
  register: any;
}

const Input = React.forwardRef(
  (
    {
      label,
      error,
      variant,
      required,
      register = {},
      type = "text",
      ...rest
    }: Props,
    ref
  ) => {
    return (
      <div className="grid items-center grid-cols-4">
        {!!label && (
          <label className="block text-sm font-medium text-center text-slate-700">
            {label}
          </label>
        )}
        <div className="flex flex-col justify-center w-full col-span-3">
          <input
            ref={ref as React.LegacyRef<HTMLInputElement>}
            type={type}
            required={required}
            className="block w-full px-3 py-2 text-sm bg-white border rounded-md shadow-sm peer border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none invalid:border-pink-500 invalid:text-pink-600 focus:invalid:border-pink-500 focus:invalid:ring-pink-500"
            {...rest}
            {...register}
          />

          <p className="hidden h-5 mt-2 text-sm text-pink-600 peer-valid:block">
            {error}
          </p>
        </div>
      </div>
    );
  }
);
export default Input;

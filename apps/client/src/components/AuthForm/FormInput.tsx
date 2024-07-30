import { FieldPath } from 'react-hook-form';
import { ErrorMessage } from '../ErrorMessage/ErrorMessage';
import React from 'react';
import { AuthPayload } from './types/auth-payload-schema';

type FormInputProps = {
  fieldName: FieldPath<AuthPayload>;
  errorMessage?: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

export const FormInput: React.FC<FormInputProps> = React.forwardRef<
  HTMLInputElement,
  FormInputProps
>(function FormInput({ fieldName, errorMessage, type = 'text', placeholder, ...props }, ref) {
  return (
    <div className="mb-4">
      <label
        className="block capitalize text-gray-700 text-sm font-bold mb-2"
        htmlFor={fieldName}
      >
        {fieldName}
      </label>
      <input
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-2 leading-tight focus:outline-none focus:shadow-outline"
        id={fieldName}
        type={type}
        placeholder={placeholder}
        ref={ref}
        {...props}
      />
      <div className="ml-1 h-4">{errorMessage && <ErrorMessage error={errorMessage} />}</div>
    </div>
  );
});

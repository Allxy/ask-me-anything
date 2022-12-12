import React, { useCallback, useState } from 'react';

interface UseFormProps<T> {
  values: T
  errors: { [K in keyof T]?: string | undefined }
  isValid: boolean
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  resetForm: (values: T) => void
  setCustomError: (key: keyof T, value: string | undefined) => void
}

const useForm = <T>(initialValues: T): UseFormProps<T> => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState<{ [K in keyof T]?: string | undefined }>({});
  const [isValid, setValid] = useState(false);

  const onChange = ({ target }: React.ChangeEvent<HTMLInputElement>): void => {
    const { value, name, validationMessage } = target;

    setValues({ ...values, [name]: value });
    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    setErrors({ ...errors, [name]: validationMessage || undefined });
    setValid(target.closest('form')?.checkValidity() ?? false);
  };

  const setCustomError = useCallback((key: keyof typeof errors, value: string | undefined) => {
    setErrors({ ...errors, [key]: value });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [errors]);

  const resetForm = useCallback((newValues: T) => {
    setValues({ ...initialValues, ...newValues });
    setErrors({});
    setValid(false);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { values, errors, isValid, onChange, resetForm, setCustomError };
};

export default useForm;

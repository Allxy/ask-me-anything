import React, { useCallback, useState } from 'react';

interface UseFormProps<T> {
  values: T
  errors: { [K in keyof T]?: string | undefined }
  isValid: boolean
  onChange: (e: React.ChangeEvent<any>) => void
  resetForm: (values?: T) => void
}

const useForm = <T>(initialValues: T): UseFormProps<T> => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState<{ [K in keyof T]?: string | undefined }>({});
  const [isValid, setValid] = useState(false);

  const onChange = ({ target }: React.ChangeEvent<HTMLInputElement>): void => {
    const { value, name, validationMessage } = target;
    setValues({ ...values, [name]: value });
    setErrors({ ...errors, [name]: validationMessage ?? '' });
    setValid(target.closest('form')?.checkValidity() ?? false);
  };

  const resetForm = useCallback((newValues: T = initialValues) => {
    setValues({ ...initialValues, ...newValues });
    setErrors({});
    setValid(false);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { values, errors, isValid, onChange, resetForm };
};

export default useForm;

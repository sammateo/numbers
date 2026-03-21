const InputValidationErrors = ({
  errors,
  isValid,
}: {
  errors?: {
    message: string;
  }[];
  isValid?: boolean;
}) => {
  return (
    <div>
      {!isValid && errors && (
        <div className="flex flex-col text-destructive">
          {errors.map((error, index) => (
            <span key={index}>{error?.message}</span>
          ))}
        </div>
      )}
    </div>
  );
};

export default InputValidationErrors;

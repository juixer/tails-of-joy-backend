import mongoose from "mongoose";
import { TErrorSources, TGenericErrorResponse } from "../interface/error";


const handleValidationError = (
  err: mongoose.Error.ValidationError
): TGenericErrorResponse => {
  const errorSources: TErrorSources = Object.values(err.errors).map(
    (validation: mongoose.Error.ValidatorError | mongoose.Error.CastError) => {
      return {
        path: validation.path,
        message: validation.message,
      };
    }
  );
  const statusCode = 400;
  return {
    statusCode,
    message: "Validation error",
    errorSources,
  };
};

export default handleValidationError;

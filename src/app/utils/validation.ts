type ValidationType = "required" | "minLength" | "nan" | "notvalid";

const validation = (name: string, type: ValidationType) => {
  switch (type) {
    case "required":
      return { message: `${name} is a required field` };
    case "minLength":
      return { message: `${name} must be at least 8 characters long` };
    case "nan":
      return { message: `${name} must be a number` };
    case "notvalid":
      return { message: `${name} is not a valid number` };
  }
};

export default validation;

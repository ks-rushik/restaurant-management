import { IMessages } from "../[locale]/messages";

type ValidationType = "required" | "minLength" | "nan" | "notvalid";

const validation = (name: string, type: ValidationType, lang?: IMessages) => {
  switch (type) {
    case "required":
      return { message: `${name} ${lang?.validation.required}` };
    case "minLength":
      return { message: `${name} ${lang?.validation.minLength}` };
    case "nan":
      return { message: `${name} ${lang?.validation.nan}` };
    case "notvalid":
      return { message: `${name} ${lang?.validation.notvalid}` };
  }
};

export default validation;

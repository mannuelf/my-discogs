import { responses } from "types";

export const getErrorMessage = (statusCode: number): string => {
  const response = responses.find(response => response.status === statusCode);
  if (response) {
    return `${response.title}: ${response.description}`;
  } else {
    return "An unknown error occurred.";
  }
}

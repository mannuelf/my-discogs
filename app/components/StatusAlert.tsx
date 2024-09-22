import { TerminalIcon } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";

export const StatusAlert = ({ error }: { error: Error }) => {
  return (
    <Alert>
      <TerminalIcon className="h-4 w-4" />
      <AlertTitle>Heads up!</AlertTitle>
      <AlertDescription>
        Error: {error.message} Check the Discogs{" "}
        <a
          href="https://status.discogs.com/posts/dashboard"
          className="text-color-red"
          target="_blank"
          rel="noreferrer"
        >
          Api status page here
        </a>{" "}
        if the problem persists.
      </AlertDescription>
    </Alert>
  );
};

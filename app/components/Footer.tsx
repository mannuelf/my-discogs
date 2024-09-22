import { FaGithub } from "react-icons/fa";

export const Footer = (): React.ReactElement => {
  return (
    <footer className="mt-4 p-4">
      Data 🫶 provided by{" "}
      <a href="https://www.discogs.com/developers" target="_blank" rel="noopener noreferrer">
        <img
          src="./Discogs_logo_black.svg"
          alt="Discogs logo"
          className="h-6 w-auto inline-block"
          title="Discogs API"
        />
      </a>{" "}
      |{" "}
      <a href="https://filtermusikk.no" target="_blank" rel="noopener noreferrer">
        <img
          src="https://res.cloudinary.com/mannuel/image/upload/v1720187186/images/xzq8sbpcw1ewk1qwqyo0.png"
          alt="Filter Musikk logo"
          className="h-9 w-auto inline-block"
          title="Filter Musikk"
        />
      </a>{" "}
      |{" "}
      <a
        href="https://github.com/mannuelf/my-discogs"
        target="_blank"
        rel="noopener noreferrer"
        title="See the code"
      >
        <FaGithub className="inline-block" name="Github" />
      </a>
    </footer>
  );
};

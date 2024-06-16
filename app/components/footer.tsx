export const Footer = (): React.ReactElement => {
  return (
    <footer className="mt-4 p-4">
      Data 🫶 provided by:{" "}
      <a href="https://www.discogs.com/developers" target="_blank" rel="noopener noreferrer">
        <img
          src="./Discogs_logo_black.svg"
          alt="Discogs logo"
          className="h-6 w-auto inline-block"
          title="Discogs API"
        />
      </a>{" "}
      | Built by:{" "}
      <a
        href="https://github.com/mannuelf/my-discogs"
        target="_blank"
        rel="noopener noreferrer"
        title="Mannuel Ferreira"
      >
        <img src="./mf-logo.svg" alt="Mannuel Ferreira logo" className="h-6 w-auto inline-block" />
      </a>
    </footer>
  );
};

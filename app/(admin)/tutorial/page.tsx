const TutorialPage = () => {
  return (
    <div className="w-full">
      <h1 className="font-semibold text-2xl">Petunjuk</h1>
      <p className="text-sm text-muted-foreground">
        Petunjuk penggunaan dan alur aplikasi
      </p>

      <div className="mt-10">
        <h1 className="text-lg font-semibold">Autentikasi</h1>
        <ul className="mb-10">
          <li># Flowchart Registrasi</li>
          <li># Flowchart Login</li>
          <li># Flowchart Lupa Password</li>
        </ul>
        <ul>
          <li># ERD Database</li>
          <li># Flowchart Dashboard</li>
          <li># Flowchart Master Data</li>
          <li># Flowchart Peminjaman</li>
          <li># Flowchart Kalender</li>
          <li># Flowchart Pengaturan</li>
        </ul>
      </div>
    </div>
  );
};

export default TutorialPage;

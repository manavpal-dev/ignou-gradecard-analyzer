export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="w-full border-t bg-white">
      <div className="max-w-6xl mx-auto px-4 py-4 text-center text-sm text-gray-500">
        <p>Not affiliated with IGNOU</p>
        <p className="mt-1">© {year} Built by Manav Pal</p>
      </div>
    </footer>
  );
}

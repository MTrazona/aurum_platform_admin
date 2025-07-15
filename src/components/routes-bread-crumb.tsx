// components/Breadcrumb.tsx
import { Link, useLocation } from "react-router-dom";
import { ChevronRight } from "lucide-react";

export default function Breadcrumb() {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);

  const capitalized = (str: string) =>
    str.charAt(0).toUpperCase() + str.slice(1).replace(/-/g, " ");

  return (
    <nav className="text-sm text-gray-300 flex items-center space-x-1">
      <Link to="/" className="hover:underline text-white font-medium">
        Dashboard
      </Link>

      {pathnames.map((segment, index) => {
        const fullPath = "/" + pathnames.slice(0, index + 1).join("/");
        const isLast = index === pathnames.length - 1;

        return (
          <span key={fullPath} className="flex items-center space-x-1">
            <ChevronRight className="w-4 h-4 text-gray-400" />
            {isLast ? (
              <span className="text-gray-100 font-semibold">
                {capitalized(segment)}
              </span>
            ) : (
              <Link to={fullPath} className="hover:underline text-gray-200">
                {capitalized(segment)}
              </Link>
            )}
          </span>
        );
      })}
    </nav>
  );
}

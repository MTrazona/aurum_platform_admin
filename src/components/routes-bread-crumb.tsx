// components/Breadcrumb.tsx
import { Link, useLocation } from "react-router-dom";
import { ChevronRight } from "lucide-react";

type BreadcrumbProps = {
  textColor?: string;
  rootColor?: string;
  linkColor?: string;
  currentColor?: string;
  separatorColor?: string;
};

export default function Breadcrumb({
  textColor = "text-gray-300",
  rootColor = "text-white",
  linkColor = "text-gray-200",
  currentColor = "text-gray-100",
  separatorColor = "text-gray-400",
}: BreadcrumbProps) {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);

  const capitalized = (str: string) =>
    str.charAt(0).toUpperCase() + str.slice(1).replace(/-/g, " ");

  return (
    <nav className={`text-sm flex items-center space-x-1 ${textColor}`}>
      <Link to="/" className={`hover:underline font-medium ${rootColor}`}>
        Dashboard
      </Link>

      {pathnames.map((segment, index) => {
        const fullPath = "/" + pathnames.slice(0, index + 1).join("/");
        const isLast = index === pathnames.length - 1;

        return (
          <span key={fullPath} className="flex items-center space-x-1">
            <ChevronRight className={`w-4 h-4 ${separatorColor}`} />
            {isLast ? (
              <span className={`font-semibold ${currentColor}`}>
                {capitalized(segment)}
              </span>
            ) : (
              <Link to={fullPath} className={`hover:underline ${linkColor}`}>
                {capitalized(segment)}
              </Link>
            )}
          </span>
        );
      })}
    </nav>
  );
}

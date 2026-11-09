import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

interface BreadcrumbItem {
  label: string;
  to?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items }) => {
  return (
    <nav className="flex items-center text-xs text-slate-500 py-3 overflow-x-auto whitespace-nowrap">
      <Link to="/" className="hover:text-blue-700 transition-colors flex items-center gap-1">
        <Home className="w-3.5 h-3.5" />
        <span>Home</span>
      </Link>

      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        return (
          <React.Fragment key={index}>
            <ChevronRight className="w-3 h-3 text-slate-400 mx-2 shrink-0" />
            {item.to && !isLast ? (
              <Link to={item.to} className="hover:text-blue-700 transition-colors">
                {item.label}
              </Link>
            ) : (
              <span className="font-semibold text-slate-800 truncate max-w-xs">{item.label}</span>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
};

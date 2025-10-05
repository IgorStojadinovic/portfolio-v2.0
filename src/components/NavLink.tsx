import Link from "next/link";

interface NavLinkProps {
  href: string;
  text: string;
  isActive: boolean;
  index: number;
  ref: (element: HTMLLIElement | null) => void;
  mouseEnter: (index: number) => void;
  mouseLeave: (index: number) => void;
  onClick: (text: string) => void;
}

const NavLink = ({
  href,
  text,
  isActive,
  index,
  ref,
  mouseEnter,
  mouseLeave,
  onClick,
}: NavLinkProps) => {
  return (
    <li
      ref={ref}
      onMouseEnter={() => mouseEnter(index)}
      onMouseLeave={() => mouseLeave(index)}
      onClick={() => onClick(text)}
      className={`cursor-pointer rounded-xs border border-transparent p-2 transition-all hover:border-stone-500 hover:bg-(--color-foreground)/5 ${
        isActive &&
        "translate-y-2 border bg-(--color-foreground)/5 transition-all sm:border-stone-500"
      }`}
    >
      <Link href={href}>
        {text}
      </Link>
    </li>
  );
};

export default NavLink;

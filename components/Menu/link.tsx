import { useState, useEffect } from 'react'

import { usePathname } from 'next/navigation'
import Link from 'next/link'

interface ActiveLinkProps {
  children: React.ReactNode;
  activeClassName?: string;
  className?: string;
  href: string;
  [key: string]: unknown;
}
const ActiveLink = ({
    children,
    activeClassName,
    className,
    href,
    ...props
}: ActiveLinkProps) => {
    const pathname = usePathname();
    const [computedClassName, setComputedClassName] = useState(className)

    useEffect(() => {
        const newClassName =
          href === pathname
            ? activeClassName
            : className ?
            className :
            '';

          setComputedClassName(newClassName);
    }, [
      pathname,
      href,
      activeClassName,
      className
    ])

	return (
		<Link className={computedClassName} href={href} {...props}>
			{children}
		</Link>
    )
}

export default ActiveLink
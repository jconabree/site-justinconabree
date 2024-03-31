import { useState, useEffect } from 'react'

import { usePathname } from 'next/navigation'
import Link from 'next/link'

const ActiveLink = ({
    children,
    activeClassName,
    className,
    href,
    ...props
}) => {
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
      props.as,
      props.href,
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
import Link from 'next/link'
import classes from './button.module.css'

function Button({ link, children }) {
  return (
    <Link className={classes.btn} href={link}>{children}</Link>
  )
}

export default Button;
import React from 'react'

interface ButtonProps {
  onClick?: React.MouseEventHandler<HTMLButtonElement>
  children?: React.ReactNode
}

const Button = ({
  children,
  onClick,
}: ButtonProps) => {
  return (
    <button
      className="btn"
      onClick={onClick}
    >{children}</button>
  )
}

export default Button

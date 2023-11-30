import { buttonVariants } from './button'
import { type VariantProps } from 'class-variance-authority'

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

export interface ComponentProps extends React.HTMLAttributes<HTMLDivElement> {}

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

export interface LabelProps
  extends React.LabelHTMLAttributes<HTMLLabelElement> {}

export interface SelectButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export interface SelectProps
  extends React.SelectHTMLAttributes<HTMLDivElement> {}

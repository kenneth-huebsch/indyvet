export const motion = {
  fadeIn: 'animate-in fade-in duration-500 ease-out motion-reduce:animate-none',
  slideUp: 'animate-in slide-in-from-bottom-4 duration-500 ease-out motion-reduce:animate-none',
  slideLeft: 'animate-in slide-in-from-right-4 duration-500 ease-out motion-reduce:animate-none',
  slideRight: 'animate-in slide-in-from-left-4 duration-500 ease-out motion-reduce:animate-none',
  staggerChildren:
    '[&>*]:animate-in [&>*]:fade-in [&>*]:duration-500 [&>*]:ease-out [&>*:nth-child(2)]:delay-100 [&>*:nth-child(3)]:delay-200 motion-reduce:[&>*]:animate-none',
  scaleOnHover:
    'transition-transform duration-500 ease-out hover:scale-95 motion-reduce:transition-none motion-reduce:hover:scale-100',
} as const

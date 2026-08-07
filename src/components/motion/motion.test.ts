import { describe, expect, it } from 'vitest'

import { motion } from './index'

describe('motion utility classes', () => {
  it('provides reduced-motion-safe fade and directional entry helpers', () => {
    expect(motion.fadeIn).toContain('animate-in')
    expect(motion.fadeIn).toContain('fade-in')
    expect(motion.fadeIn).toContain('motion-reduce:animate-none')

    expect(motion.slideUp).toContain('slide-in-from-bottom-4')
    expect(motion.slideLeft).toContain('slide-in-from-right-4')
    expect(motion.slideRight).toContain('slide-in-from-left-4')
    expect(motion.slideUp).toContain('motion-reduce:animate-none')
  })

  it('provides staggered children and reduced-motion-safe hover scaling', () => {
    expect(motion.staggerChildren).toContain('[&>*]:animate-in')
    expect(motion.staggerChildren).toContain('[&>*:nth-child(2)]:delay-100')
    expect(motion.staggerChildren).toContain('[&>*:nth-child(3)]:delay-200')
    expect(motion.staggerChildren).toContain('motion-reduce:[&>*]:animate-none')

    expect(motion.scaleOnHover).toContain('hover:scale-95')
    expect(motion.scaleOnHover).toContain('motion-reduce:hover:scale-100')
  })
})

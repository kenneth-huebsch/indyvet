import { CheckCircle2, Info, Shapes } from 'lucide-react'

import { motion } from '@/components/motion'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { Container } from '@/components/ui/container'
import { Divider } from '@/components/ui/divider'
import { Icon } from '@/components/ui/icon'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Section } from '@/components/ui/section'
import { Select } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { Typography } from '@/components/ui/typography'

const sampleBlockClass =
  'rounded-lg border border-border bg-card p-4 text-sm font-medium text-card-foreground shadow-sm'

export default function HomePage() {
  return (
    <div data-slot="phase1-showcase" className="min-h-screen bg-background">
      <Container>
        <Section className="space-y-8">
          <header className="space-y-3">
            <Badge variant="outline">Phase 1 implementation</Badge>
            <Typography variant="h1">Component showcase</Typography>
            <Typography className="max-w-2xl text-muted-foreground">
              A neutral reference page for the foundational interface primitives.
            </Typography>
          </header>

          <Divider />

          <section aria-labelledby="typography-heading" className="space-y-6">
            <Typography id="typography-heading" variant="h2">
              Typography
            </Typography>
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-4">
                <Typography variant="display">Display</Typography>
                <Typography variant="h1">H1</Typography>
                <Typography variant="h2">H2</Typography>
                <Typography variant="h3">H3</Typography>
                <Typography variant="h4">H4</Typography>
              </div>
              <div className="space-y-4">
                <Typography variant="body-large">Body Large</Typography>
                <Typography variant="body">Body</Typography>
                <Typography variant="small">Small Text</Typography>
                <Typography variant="caption">Caption</Typography>
                <Typography as="span" variant="label">
                  Label
                </Typography>
                <Typography as="a" href="#components" variant="link">
                  Link
                </Typography>
              </div>
            </div>
          </section>

          <Divider />

          <section id="components" aria-labelledby="components-heading" className="space-y-8">
            <Typography id="components-heading" variant="h2">
              Components
            </Typography>

            <div className="space-y-4">
              <Typography variant="h3">Buttons</Typography>
              <div className="flex flex-wrap items-center gap-3">
                <Button>Primary</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="outline">Outline</Button>
                <Button variant="ghost">Ghost</Button>
                <Button variant="link">Link</Button>
                <Button as="a" href="#forms" variant="outline">
                  As link
                </Button>
                <Button disabled>Disabled</Button>
              </div>
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
              <div className="space-y-4">
                <Typography variant="h3">Card</Typography>
                <Card className="space-y-2 p-6">
                  <Typography variant="h4">Sample surface</Typography>
                  <Typography className="text-muted-foreground">
                    Neutral content demonstrates spacing, border, and surface tokens.
                  </Typography>
                </Card>
              </div>

              <div className="space-y-4">
                <Typography variant="h3">Badges</Typography>
                <div className="flex flex-wrap gap-2">
                  <Badge>Default</Badge>
                  <Badge variant="secondary">Secondary</Badge>
                  <Badge variant="accent">Accent</Badge>
                  <Badge variant="outline">Outline</Badge>
                  <Badge variant="success">Success</Badge>
                  <Badge variant="warning">Warning</Badge>
                  <Badge variant="destructive">Destructive</Badge>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <Typography variant="h3">Icons</Typography>
              <div className="flex flex-wrap items-center gap-6">
                <div className="flex items-center gap-2">
                  <Icon icon={Shapes} size="sm" />
                  <Typography variant="small">Decorative, small</Typography>
                </div>
                <div className="flex items-center gap-2">
                  <Icon icon={Info} size="lg" aria-label="Information" />
                  <Typography variant="small">Labeled, large</Typography>
                </div>
                <Icon icon={CheckCircle2} size="xl" />
              </div>
            </div>
          </section>

          <Divider />

          <section aria-labelledby="forms-heading" className="space-y-6">
            <div className="space-y-2">
              <Typography id="forms-heading" variant="h2">
                Forms
              </Typography>
              <Typography className="text-muted-foreground">
                Visual control states without submission behavior.
              </Typography>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="sample-input">Input</Label>
                <Input id="sample-input" placeholder="Sample value" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="sample-disabled">Disabled input</Label>
                <Input id="sample-disabled" placeholder="Unavailable" disabled />
              </div>

              <div className="space-y-2">
                <Label htmlFor="sample-textarea">Textarea</Label>
                <Textarea id="sample-textarea" placeholder="Neutral sample text" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="sample-select">Select</Label>
                <Select id="sample-select" defaultValue="">
                  <option value="" disabled>
                    Choose an option
                  </option>
                  <option value="first">First option</option>
                  <option value="second">Second option</option>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="sample-error">Error state</Label>
                <Input
                  id="sample-error"
                  error
                  aria-describedby="sample-error-message"
                  placeholder="Review this value"
                />
                <Typography id="sample-error-message" variant="small" className="text-destructive">
                  Example error message.
                </Typography>
              </div>

              <div className="flex items-center gap-3">
                <Checkbox id="sample-checkbox" defaultChecked />
                <Label htmlFor="sample-checkbox">Checkbox selection</Label>
              </div>
            </div>
          </section>

          <Divider />

          <section aria-labelledby="motion-heading" className="space-y-6">
            <div className="space-y-2">
              <Typography id="motion-heading" variant="h2">
                Motion
              </Typography>
              <Typography className="text-muted-foreground">
                Static references for each motion helper.
              </Typography>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <div className={`${sampleBlockClass} ${motion.fadeIn}`}>Fade in</div>
              <div className={`${sampleBlockClass} ${motion.slideUp}`}>Slide up</div>
              <div className={`${sampleBlockClass} ${motion.slideLeft}`}>Slide left</div>
              <div className={`${sampleBlockClass} ${motion.slideRight}`}>Slide right</div>
              <div className={`${sampleBlockClass} ${motion.scaleOnHover}`}>Scale on hover</div>
              <div
                className={`grid gap-2 rounded-lg border border-border bg-muted p-4 ${motion.staggerChildren}`}
              >
                <div className="rounded-md bg-card p-2 text-sm">Stagger one</div>
                <div className="rounded-md bg-card p-2 text-sm">Stagger two</div>
                <div className="rounded-md bg-card p-2 text-sm">Stagger three</div>
              </div>
            </div>
          </section>
        </Section>
      </Container>
    </div>
  )
}

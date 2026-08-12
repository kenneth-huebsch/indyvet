import type { ReactElement } from 'react'

import { CmsCta } from '@/components/home/CmsCta'
import { HomeEyebrow } from '@/components/home/HomeEyebrow'
import { HomeHeadline } from '@/components/home/HomeHeadline'
import { ScrollReveal } from '@/components/home/ScrollReveal'
import { MediaImage } from '@/components/media/MediaImage'
import { Container } from '@/components/ui/container'
import { Section } from '@/components/ui/section'
import { Typography } from '@/components/ui/typography'
import { motion } from '@/components/motion'
import { isMedia } from '@/lib/media'
import { populatedDocs } from '@/lib/relations'
import { cn } from '@/lib/utils'
import type { HomePage, TeamMember } from '@/payload-types'

type HomeTeamProps = {
  team: NonNullable<HomePage['team']>
}

export function HomeTeam(props: HomeTeamProps): ReactElement | null {
  const { team } = props
  const members = populatedDocs<TeamMember>(team.members)

  if (!team.title?.trim() && members.length === 0) {
    return null
  }

  return (
    <Section data-slot="home-team" spacing="md">
      <Container>
        <div className="rounded-3xl bg-card px-5 py-10 sm:px-8 md:px-12 md:py-14">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-12 lg:items-start">
            <ScrollReveal>
              {team.eyebrow?.trim() ? (
                <HomeEyebrow className="mb-4">{team.eyebrow.trim()}</HomeEyebrow>
              ) : null}
              {team.title?.trim() ? <HomeHeadline>{team.title.trim()}</HomeHeadline> : null}
              <div className="mt-6">
                <CmsCta link={team.cta} />
              </div>
            </ScrollReveal>

            {members.length > 0 ? (
              <div className="grid grid-cols-2 gap-4 sm:gap-5">
                {members.map((member) => (
                  <ScrollReveal key={member.id}>
                    <article
                      data-slot="home-team-card"
                      className={cn(
                        'group relative overflow-hidden rounded-2xl bg-muted aspect-[3/4]',
                        motion.scaleOnHover,
                      )}
                    >
                      {isMedia(member.photo) ? (
                        <MediaImage
                          media={member.photo}
                          fill
                          sizes="(max-width: 1024px) 45vw, 280px"
                          className="object-cover"
                          fallbackAlt={member.name}
                        />
                      ) : (
                        <div className="flex size-full items-center justify-center bg-secondary text-3xl font-semibold text-muted-foreground">
                          {member.name.charAt(0)}
                        </div>
                      )}
                      <div className="absolute inset-x-0 bottom-0 bg-primary/85 px-3 py-3 text-primary-foreground sm:px-4">
                        <Typography
                          as="h3"
                          variant="h4"
                          className="text-sm text-primary-foreground sm:text-base"
                        >
                          {member.name}
                        </Typography>
                        <Typography variant="small" className="text-primary-foreground/80">
                          {member.role}
                        </Typography>
                      </div>
                    </article>
                  </ScrollReveal>
                ))}
              </div>
            ) : null}
          </div>
        </div>
      </Container>
    </Section>
  )
}

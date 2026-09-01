import type { ReactElement } from 'react'

import { CmsCta } from '@/components/home/CmsCta'
import { HomeEyebrow } from '@/components/home/HomeEyebrow'
import { HomeHeadline } from '@/components/home/HomeHeadline'
import { HomePhoto } from '@/components/home/HomePhoto'
import { ScrollReveal } from '@/components/home/ScrollReveal'
import { Container } from '@/components/ui/container'
import { Typography } from '@/components/ui/typography'
import { isMedia } from '@/lib/media'
import { populatedDocs } from '@/lib/relations'
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
    <section data-slot="home-team" className="border-t border-line bg-cream py-[74px]">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[minmax(0,0.72fr)_minmax(0,1.28fr)] lg:items-start lg:gap-[42px]">
          <ScrollReveal>
            {team.eyebrow?.trim() ? (
              <HomeEyebrow className="mb-4">{team.eyebrow.trim()}</HomeEyebrow>
            ) : null}
            {team.title?.trim() ? <HomeHeadline>{team.title.trim()}</HomeHeadline> : null}
            <div className="mt-6">
              <CmsCta link={team.cta} variant="outline" />
            </div>
          </ScrollReveal>

          {members.length > 0 ? (
            <div className="grid grid-cols-2 gap-4">
              {members.map((member) => (
                <ScrollReveal key={member.id}>
                  <article data-slot="home-team-card">
                    {isMedia(member.photo) && member.photo.url ? (
                      <HomePhoto
                        media={member.photo}
                        className="aspect-[3/4]"
                        sizes="(max-width: 1024px) 45vw, 280px"
                        fallbackAlt={member.name}
                      />
                    ) : (
                      <div className="flex aspect-[3/4] items-center justify-center bg-cream font-heading text-3xl text-muted-foreground">
                        {member.name.charAt(0)}
                      </div>
                    )}
                    <div className="border border-t-0 border-line bg-background px-3 py-3">
                      <Typography as="h3" className="text-sm">
                        {member.name}
                      </Typography>
                      <Typography variant="small" className="text-muted-foreground">
                        {member.role}
                      </Typography>
                    </div>
                  </article>
                </ScrollReveal>
              ))}
            </div>
          ) : null}
        </div>
      </Container>
    </section>
  )
}

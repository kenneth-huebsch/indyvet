import type { ReactElement } from 'react'

import { HomeEyebrow } from '@/components/home/HomeEyebrow'
import { HomeHeadline } from '@/components/home/HomeHeadline'
import { HomePhoto } from '@/components/home/HomePhoto'
import { ScrollReveal } from '@/components/home/ScrollReveal'
import { RichText } from '@/components/rich-text/RichText'
import { Container } from '@/components/ui/container'
import { Typography } from '@/components/ui/typography'
import { isMedia } from '@/lib/media'
import { populatedDocs } from '@/lib/relations'
import type { AboutPage, Media, TeamMember } from '@/payload-types'

type AboutTeamProps = {
  team: NonNullable<AboutPage['team']>
}

export function AboutTeam(props: AboutTeamProps): ReactElement | null {
  const { team } = props
  const members = populatedDocs<TeamMember>(team.members)
  const hasHeader = Boolean(team.title?.trim() || team.eyebrow?.trim())

  if (!hasHeader && members.length === 0) {
    return null
  }

  return (
    <section data-slot="about-team" className="border-t border-line bg-background py-[68px]">
      <Container>
        {hasHeader ? (
          <ScrollReveal className="mb-10 max-w-[640px]">
            {team.eyebrow?.trim() ? (
              <HomeEyebrow className="mb-4">{team.eyebrow.trim()}</HomeEyebrow>
            ) : null}
            {team.title?.trim() ? <HomeHeadline>{team.title.trim()}</HomeHeadline> : null}
          </ScrollReveal>
        ) : null}

        {members.length > 0 ? (
          <div>
            {members.map((member) => {
              const photo =
                isMedia(member.photo) && member.photo.url ? (member.photo as Media) : null

              return (
                <article
                  key={member.id}
                  data-slot="about-team-member"
                  className={
                    photo
                      ? 'grid gap-8 border-b border-line py-10 first:pt-0 last:border-b-0 md:grid-cols-[minmax(0,0.72fr)_minmax(0,1.28fr)] md:items-start md:gap-[42px]'
                      : 'border-b border-line py-10 first:pt-0 last:border-b-0'
                  }
                >
                  {photo ? (
                    <HomePhoto
                      media={photo}
                      className="aspect-[3/4] max-w-[320px]"
                      sizes="(max-width: 768px) 80vw, 280px"
                      fallbackAlt={member.name}
                    />
                  ) : null}
                  <div>
                    <Typography
                      as="h3"
                      className="font-heading text-2xl font-normal leading-[1.15]"
                    >
                      {member.name}
                    </Typography>
                    {member.role?.trim() ? (
                      <Typography
                        as="p"
                        className="mt-2 text-[11px] font-extrabold uppercase tracking-[0.18em] text-muted-foreground"
                      >
                        {member.role.trim()}
                      </Typography>
                    ) : null}
                    {member.bio ? (
                      <RichText
                        data={member.bio}
                        className="mt-5 text-[#435149] [&_p]:text-[#435149]"
                      />
                    ) : null}
                  </div>
                </article>
              )
            })}
          </div>
        ) : null}
      </Container>
    </section>
  )
}

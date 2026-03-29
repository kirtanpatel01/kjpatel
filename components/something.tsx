import {
  PageContainer,
  PageHeading,
  SectionHeading,
  FlexContainer,
  SectionSpacing,
  ResponsiveText,
  ResponsiveGrid,
} from "@/components/responsive-wrappers";

export default function NewPage() {
  return (
    <PageContainer>
      {/* Hero */}
      <SectionSpacing className="pt-0">
        <PageHeading>PAGE TITLE</PageHeading>
        <ResponsiveText className="mt-3 max-w-3xl text-foreground/80">
          Short intro text for this page. Keep this concise and clear.
        </ResponsiveText>
      </SectionSpacing>

      {/* Split section (mobile column -> desktop row) */}
      <SectionSpacing>
        <FlexContainer direction="row" className="lg:items-start lg:justify-between">
          <div className="w-full lg:max-w-xl">
            <SectionHeading>Left Content</SectionHeading>
            <ResponsiveText className="mt-3 text-foreground/80">
              Primary information goes here.
            </ResponsiveText>
          </div>

          <div className="w-full lg:max-w-xl">
            <SectionHeading>Right Content</SectionHeading>
            <ResponsiveText className="mt-3 text-foreground/80">
              Secondary block like form, stats, or links.
            </ResponsiveText>
          </div>
        </FlexContainer>
      </SectionSpacing>

      {/* Grid section */}
      <SectionSpacing>
        <SectionHeading>Grid Section</SectionHeading>
        <ResponsiveGrid cols={3} className="mt-6">
          <div className="border border-border p-4 rounded-xl">Card 1</div>
          <div className="border border-border p-4 rounded-xl">Card 2</div>
          <div className="border border-border p-4 rounded-xl">Card 3</div>
        </ResponsiveGrid>
      </SectionSpacing>
    </PageContainer>
  );
}
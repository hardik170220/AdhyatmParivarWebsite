import React from "react";


export async function generateMetadata({ params }) {
  const sectionID = params.sectionID;
  const decodedSectionID = decodeURIComponent(sectionID);
  const sectionData = await fetchApi(
    `api/sections?filters[SectionID][$eq]=${decodedSectionID}&fields[0]=Title`
  );


  const title =  sectionData[0]?.attributes?.Title;

  return {
    title: title,
    // openGraph: {
    //   images: [],
    // },
    description:"Overview"
  };
}

const page = async ({ params }) => {
  const { sectionID } = params;

  const decodedSectionID = decodeURIComponent(sectionID);

  const sectionData = await fetchApi(
    `api/sections?filters[SectionID][$eq]=${decodedSectionID}&fields[0]=Title&fields[1]=Language&populate[episodes][fields][0]=title&populate[episodes][fields][1]=Epno&populate[episodes][fields][2]=Description&populate[episodes][fields][3]=Language&populate[episodes][fields][4]=episodeID&populate[episodes][populate][Thumbnail][fields][0]=formats`
  );


  //for current section unique slug which is same for all languages
  const sectionSlugData = await fetchApi(`api/sections?filters[SectionID][$eq]=${decodedSectionID}&fields[0]=sectionSlug`);
  const sectionSlug = sectionSlugData[0].attributes.sectionSlug;
  

  const language = sectionData[0]?.attributes?.Language;
  const allSectionTitle = await fetchApi(
    `api/sections?sort=SectionKey&filters[Language][$eq]=${language}&fields[0]=Title&fields[1]=Language&fields[2]=SectionID&fields[3]=StandAlone&populate[episodes][fields][0]=title&populate[episodes][fields][1]=Epno&populate[episodes][fields][2]=Language&populate[episodes][fields][3]=episodeID`
  );
  const languageWiseSections = await fetchApi(
    `api/language-wise-sections?populate=*`
  );

  return (
    <div>
      <Providers
        selectedLanguage={language}
        languageWiseSections={languageWiseSections}
        languageWiseSectionTitle={allSectionTitle}
        sectionID={decodedSectionID}
        sectionData={sectionData}
        sectionSlug={sectionSlug}
      >
        <PageContent />
      </Providers>
    </div>
  );
};

export async function generateStaticParams() {
  const sections = await fetchAllArticles(`api/sections?fields[0]=SectionID`);
  const paths = sections.map((section) => ({
    sectionID:
      process.env.NODE_ENV === "production"
        ? section?.attributes?.SectionID
        : encodeURIComponent(section?.attributes?.SectionID),
  }));
  //  console.log(paths,"paths.///////")
  return paths;
}

export default page;

import Head from "next/head";
import NavBar from "../components/NavBar";
import Demo from "../components/Demo";
import Reviews from "../components/Reviews";
import Masthead from "../components/Masthead";
import { GetStaticProps } from "next";
import { initializeApollo } from "../src/apolloClient";
import { IndexDataDocument, IndexDataQuery, KeyValuePairDataFragment, Maybe, IndexAssetDataFragment, ContentDataFragment, DemoDataFragment, FeaturesDataFragment, MastheadDataFragment } from "../src/generated/queries";
import Features from "../components/Features";
import { Box, Divider, Stack } from "@chakra-ui/react";
import Content from "../components/Content";
import { Fragment } from "react";
import IconOrImage from "../components/IconOrImage";

const SECTION_BACKGROUNDS = {
  white: [
    "Content",
    "Features"
  ],
  brand: [
    "Masthead",
    "Demo"
  ]
};

export default function Home(props: IndexProps) {
  return (
    <div>
      <Head>
        <title>
          {props.productName} | {props.tagline}
        </title>

        <link rel="icon" href={props.faviconUrl} />
      </Head>

      <main>
        <NavBar logoUrl={props.logoUrl} />
        <Stack spacing={8} align="center">
          {props.contents.map((section, index, array) => (
            <Fragment key={section.__typename + section.heading}>
              {index !== 0 &&
                Object.values(SECTION_BACKGROUNDS)
                  .filter((arr) => arr.includes(section.__typename ?? ""))[0]
                  .includes(array[index - 1].__typename ?? "") && (
                <Divider/>
              )}
              { section.__typename === "Content" ? (
                <Content
                  heading={section.heading}
                  description={section.contentDescription}
                  image={section.media &&
                    <IconOrImage imageUrl={section.media.image?.url} faIconName={section.media.faIconName}/>}
                />
              ) : section.__typename === "Demo" ? (
                <Demo
                  heading={section.heading}
                  url={section.url.value}
                />
              ) : section.__typename === "Features" ? (
                <Features
                  heading={section.heading}
                  description={section.featuresDescription ?? undefined}
                  features={section.featuresCollection?.items.map(feature => ({
                    heading: feature.heading,
                    description: feature.description ?? undefined,
                    icon: feature.media &&
                      <IconOrImage imageUrl={feature.media.image?.url} faIconName={feature.media.faIconName}/>
                  }))}
                />
              ) : section.__typename === "Masthead" ? (
                <Masthead
                  heading={section.heading}
                  subheading={section.subheading.value}
                  imageSrc={section.image.url ?? ""}
                  ctaLink={section.ctaLink.value}
                  ctaText={section.ctaText.value}
                  subtext={section.subtext}
                />
              ) : undefined }
            </Fragment>
          ))}
        </Stack>
      </main>
    </div>
  );
}

interface IndexProps {
  productName: string,
  tagline: string,
  logoUrl: string,
  faviconUrl: string,
  // Can't make it a fragment so I had to copy and paste it from queries.ts
  contents: Array<(
    { __typename?: 'Content' }
    & ContentDataFragment
  ) | (
    { __typename?: 'Demo' }
    & DemoDataFragment
  ) | (
    { __typename?: 'Features' }
    & FeaturesDataFragment
  ) | (
    { __typename?: 'Masthead' }
    & MastheadDataFragment
  )>
}

const findValueForKey = (kvps: KeyValuePairDataFragment[], key: string) =>
  kvps.filter(kvp => kvp.key === key)[0].value;

const findUrlForAssetTitle = (assets: Maybe<IndexAssetDataFragment>[], title: string) =>
  assets.filter(asset => asset?.title === title)[0]?.url;

export const getStaticProps: GetStaticProps<IndexProps> = async (context) => {
  const apolloClient = initializeApollo();

  const { data } = await apolloClient.query<IndexDataQuery>({
    query: IndexDataDocument
  });

  const kvps = data.keyValuePairCollection?.items;

  if(!kvps) {
    throw new Error("KeyValuePairCollection is undefined");
  }

  const assets = data.assetCollection?.items;

  if(!assets) {
    throw new Error("AssetCollection is undefined");
  }

  const contents = data.pageCollection?.items[0].contentsCollection.items;

  if(!contents) {
    throw new Error("Contents is undefined");
  }

  return {
    props: {
      productName: findValueForKey(kvps, "Product name"),
      tagline: findValueForKey(kvps, "Tagline"),
      logoUrl: findUrlForAssetTitle(assets, "Product logo") ?? "",
      faviconUrl: findUrlForAssetTitle(assets, "Favicon") ?? "",
      contents
    },
    revalidate: 10
  };
}
import { Flex, Image, Link, SimpleGrid, Stack, Text } from '@chakra-ui/react';
import NextLink from 'next/link';
import FontAwesomeIcon, { FACollection } from './FontAwesomeIcon';

const YEAR = new Date().getFullYear();

interface FooterProps {
    organizationName: string;
    iconUrl: string;
    icons: {
        faCollection?: FACollection;
        faName: string;
        url: string;
    }[];
    links: {
        text: string;
        url: string;
    }[];
    badgeUrl?: string;
    badgeLink?: string;
}

export default function Footer(props: FooterProps) {
    return (
        <SimpleGrid
            fontFamily="Montserrat"
            fontWeight="bold"
            w="100%"
            maxW="80%"
            minChildWidth="250px"
            spacing={16}
            px="50px"
            pb={16}
            justifyItems="center"
            alignItems="flex-start"
            columns={3}
        >
            <Stack alignItems="center" spacing="1rem">
                <Flex align="center">
                    <Image src={props.iconUrl} maxW="2em" mr={4} />
                    <Text fontSize="md" color="gray.500">
                        &copy; {YEAR} {props.organizationName}.
                    </Text>
                </Flex>
                {props.badgeUrl && (
                    <Link href={props.badgeLink}>
                        <Image src={props.badgeUrl} maxW="15em"/>
                    </Link>
                )}
            </Stack> 

            <Stack>
                {props.links.map((link, index) => (
                    <Link key={index} as={NextLink} href={link.url}>
                        <a>{link.text}</a>
                    </Link>
                ))}
            </Stack>

            <Stack direction="row" spacing="12px">
                {props.icons.map((icon, index) => (
                    <Link key={index} as={NextLink} href={icon.url}>
                        <FontAwesomeIcon
                            cursor="pointer"
                            filter="invert(0.5)"
                            _hover={{
                                filter: "invert(0.7)"
                            }}
                            transition="filter 0.2s ease"
                            w="2em"
                            h="2em"
                            collection={icon.faCollection}
                            name={icon.faName}
                        />
                    </Link>
                ))}
            </Stack>
        </SimpleGrid>
    );
}

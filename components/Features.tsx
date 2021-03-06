import {
    Center,
    Heading,
    Stack,
    Text,
    Wrap,
    WrapItem
} from '@chakra-ui/react'

interface Feature {
    icon?: React.ReactNode | string;
    heading: string;
    description?: string;
}

interface FeaturesProps {
    heading?: string;
    description?: string;
    features?: Feature[];
}

// A block showing different features:
// -----------------------------------
// |              Header             |
// | Description goes here. Content  |
// | Icon     | Icon     | Icon      |
// | Header   | Header   | Header    |
// | Text     | Text     | Text      |
// -----------------------------------

export default function Features(props: FeaturesProps) {
    return (
        <Stack spacing={4} px="50px" align="center">
            {props.heading && (
                <Heading as="h2" size="xl">
                    {props.heading}
                </Heading>
            )}
            {props.description && (
                <Text fontSize="md">{props.description}</Text>
                )}
            {props.features && (
                <>
                    <Wrap spacing={4} justify="center">
                        {props.features.map((feature) => (
                            <WrapItem
                                key={feature.heading + feature.description}
                                borderWidth="0px"
                                p={8}
                                w="400px"
                            >
                                <Stack
                                    direction="column"
                                    spacing={8}
                                    alignItems="center"
                                >
                                    <Center
                                        bgColor="#effff4"
                                        w="4rem"
                                        p="20px 10px"
                                        borderRadius="50%"
                                    >
                                        {/* {feature.icon} */}
                                        {/* TODO: use icon */}
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 24 24"
                                            width="24"
                                            height="24"
                                            fill="#68d290"
                                        >
                                            <path
                                                fill="none"
                                                d="M0 0h24v24H0z"
                                            />
                                            <path d="M6.923 21C5.113 18.664 4 15.493 4 12c0-3.493 1.113-6.664 2.923-9h2.014C7.235 5.388 6.2 8.542 6.2 12s1.035 6.612 2.737 9H6.923zm10.151 0H15.06c1.702-2.388 2.737-5.542 2.737-9s-1.035-6.612-2.737-9h2.014c1.81 2.336 2.923 5.507 2.923 9 0 3.493-1.112 6.664-2.923 9z" />
                                        </svg>
                                    </Center>
                                    <Heading as="h3" size="lg">
                                        {feature.heading}
                                    </Heading>
                                    {feature.description && (
                                        <Text fontSize="md">
                                            {feature.description}
                                        </Text>
                                    )}
                                </Stack>
                            </WrapItem>
                        ))}
                    </Wrap>
                </>
            )}
        </Stack>
    );
}

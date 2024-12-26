import { Body, Button, Container, Head, Hr, Html, Img, Preview, Section, Text } from 'jsx-email';
import {PropsWithChildren, ReactNode} from "react";

interface EmailProps {
    userFirstname: string;
    userLastname: string;
    locale: string;
    buttonText: string;
    buttonLink: string;
    emailAddress: string;
    preview: string;
}

const main = {
    backgroundColor: '#ffffff',
    fontFamily:
        '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif'
};

const container = {
    margin: '0 auto',
    padding: '20px 0 48px'
};

const logo = {
    margin: '0 auto'
};

const paragraph = {
    fontSize: '16px',
    lineHeight: '26px'
};

const btnContainer = {
    textAlign: 'center' as const
};

const hr = {
    borderColor: '#cccccc',
    margin: '20px 0'
};

const footer = {
    color: '#8898aa',
    fontSize: '12px'
};

const baseUrl = 'https://raw.githubusercontent.com/eliatra-opensearch-enterprise-distro/meod-assets/refs/heads/main/img/';

export const templateName = "Eliatra Default";

export const previewProps = {
    userFirstname: 'Mister',
    userLastname: 'Spock',
    locale: 'en',
    preview: 'This is a preview text',
    buttonLink: "https://eliatra.com",
    buttonText: "HIT ME",
    emailAddress: "spock@enterprise.com",
    children: <Text style={paragraph}>Dummy Text<p/>Dummy Text</Text>
} as EmailProps;

export const EmailLayout = ({
                                userFirstname,
                                userLastname,
                                locale,
                                buttonText,
                                buttonLink,
                                emailAddress,
                                preview,
                                children,
                            }: PropsWithChildren<EmailProps>) => {
    return (
    <Html lang={locale}>
        <Head />
        <Preview>{preview}</Preview>
        <Body style={main}>
            <Container style={container}>
                <Img src={`${baseUrl}meod_logo_light.svg`} width="170" height="50" alt="Eliatra" style={logo} />
                <Text style={paragraph}>
                    Hi {userFirstname} {userLastname},
                    <br/><br/>
                    {children}
                </Text>
                <Section style={btnContainer}>
                    <Button
                        width={250}
                        height={44}
                        backgroundColor="#651fff"
                        borderRadius={3}
                        textColor="#fff"
                        align="center"
                        href={buttonLink}
                    >
                        {buttonText}
                    </Button>
                </Section>
                <Text style={paragraph}>
                    Best,
                    <br />
                    The Eliatra team
                </Text>
                <Hr style={hr} />
                <Text style={footer}>Sent to {emailAddress} on behalf of the MEOD application.</Text>
                <Text style={footer}>© 2025 | Eliatra, 77 Lower Camden Street, D02 XE80 Dublin, Ireland | www.eliatra.com</Text>
            </Container>
        </Body>
    </Html>
);
};

//needed for email previewer
export const Template = EmailLayout






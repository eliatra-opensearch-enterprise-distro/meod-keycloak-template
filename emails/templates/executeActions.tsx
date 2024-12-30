import { Text, render } from "jsx-email";
import { EmailLayout} from "../eliatra-layout";
import {
    createVariablesHelper,
    GetSubject,
    GetTemplate,
    GetTemplateProps,
} from "keycloakify-emails";

interface TemplateProps extends Omit<GetTemplateProps, "plainText"> {}

export const previewProps: TemplateProps = {
    locale: "en",
    themeName: "vanilla",
};

export const templateName = "Execute Actions";

const { exp } = createVariablesHelper("executeActions.ftl");

export const Template = ({ locale }: TemplateProps) => (
    <EmailLayout
        userFirstname={exp("user.firstName")}
        userLastname={exp("user.lastName")}
        locale={locale}
        buttonText={"Update or set your MEOD account password"}
        buttonLink={exp("link")}
        emailAddress={exp("user.email")}
        preview={"Update or set your MEOD account password"}>

        Someone has requested to update or set your MEOD account password. If
        this was you, click the link below.
        <br/><br/>
        The link will expire within {exp("linkExpirationFormatter(linkExpiration)")}.<br/>
        If the link is already expired, just try to login and a new verification link will be sent.
        <br/><br/>
        If you didn't create or request this change, just ignore this message.
    </EmailLayout>
);

export const getTemplate: GetTemplate = async (props) => {
    return await render(<Template {...props} />, { plainText: props.plainText });
};

export const getSubject: GetSubject = async (_props) => {
    return "Update your MEOD account";
};

import { render, Text, } from "jsx-email";
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

export const templateName = "Email Test";

const { exp } = createVariablesHelper("email-test.ftl");

export const Template = ({ locale }: TemplateProps) => (
    <EmailLayout
        userFirstname={"Keycloak"}
        userLastname={"Admin"}
        locale={locale}
        buttonText={exp('realmName')}
        buttonLink={""}
        emailAddress={exp("user.email")}
        preview={"This is a test message from {exp('realmName')"}>

        This is a test message from {exp("realmName")}

    </EmailLayout>
);

export const getTemplate: GetTemplate = async (props) => {
  return await render(<Template {...props} />, { plainText: props.plainText });
};

export const getSubject: GetSubject = async (_props) => {
  return "[KEYCLOAK] - SMTP EMail test message";
};

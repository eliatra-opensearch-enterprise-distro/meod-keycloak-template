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
        userFirstname={exp("user.firstName")}
        userLastname={exp("user.lastName")}
        locale={locale}
        buttonText={exp('realmName')}
        buttonLink={""}
        emailAddress={exp("user.email")}
        preview={"This is a test message from {exp('realmName')"}>
        <p>
          This is a test message from {exp("realmName")}
        </p>
    </EmailLayout>
);

export const getTemplate: GetTemplate = async (props) => {
  return await render(<Template {...props} />, { plainText: props.plainText });
};

export const getSubject: GetSubject = async (_props) => {
  return "[KEYCLOAK] - SMTP test message";
};

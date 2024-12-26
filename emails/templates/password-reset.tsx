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

export const templateName = "Password Reset";

const { exp } = createVariablesHelper("password-reset.ftl");

export const Template = ({ locale }: TemplateProps) => (
    <EmailLayout
        userFirstname={exp("user.firstName")}
        userLastname={exp("user.lastName")}
        locale={locale}
        buttonText={"Reset credentials"}
        buttonLink={exp("link")}
        emailAddress={exp("user.email")}
        preview={"Reset credentials"}>

        Someone just requested to change your {exp("realmName")} account's credentials. If
        this was you, click on the link below to reset them.
        <br/><br/>
        This link will expire within {exp("linkExpirationFormatter(linkExpiration)")}.
        <br/><br/>
        If you don't want to reset your credentials, just ignore this message and nothing
        will be changed.

    </EmailLayout>
);

export const getTemplate: GetTemplate = async (props) => {
  return await render(<Template {...props} />, { plainText: props.plainText });
};

export const getSubject: GetSubject = async (_props) => {
  return "Confirm password reset for MEOD";
};

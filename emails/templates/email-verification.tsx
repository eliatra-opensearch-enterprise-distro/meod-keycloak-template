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

export const templateName = "Email Verification";

const { exp } = createVariablesHelper("email-verification.ftl");

export const Template = ({ locale }: TemplateProps) => (
    <EmailLayout
        userFirstname={exp("user.firstName")}
        userLastname={exp("user.lastName")}
        locale={locale}
        buttonText={"Verify e-mail address"}
        buttonLink={exp("link")}
        emailAddress={exp("user.email")}
        preview={"Verify your email address"}>
        <p>
          Someone has created a {exp("user.firstName")} account with this email address. If
          this was you, click the link below to verify your email address
        </p>
        <p>
          The link will expire within {exp("linkExpirationFormatter(linkExpiration)")}.
          If the link is already expired just try to login and a new verification link will be sent.
        </p>
        <p>If you didn't create this account, just ignore this message.</p>
    </EmailLayout>
);

export const getTemplate: GetTemplate = async (props) => {
  return await render(<Template {...props} />, { plainText: props.plainText });
};

export const getSubject: GetSubject = async (_props) => {
  return "Verify email for your new MEOD account";
};

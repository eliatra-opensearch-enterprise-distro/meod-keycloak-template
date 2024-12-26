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

export const templateName = "Org Invite";

const { exp, v } = createVariablesHelper("org-invite.ftl");

export const Template = ({ locale }: TemplateProps) => (
    <EmailLayout
        userFirstname={exp("user.firstName")}
        userLastname={exp("user.lastName")}
        locale={locale}
        buttonText={"Join organization"}
        buttonLink={exp("link")}
        emailAddress={exp("user.email")}
        preview={"You were invited to join an organization"}>
        <p>
          You were invited to join the {exp("organization.name")} organization. Click the
          link below to join.{" "}
        </p>
        <p>
          This link will expire within {exp("linkExpirationFormatter(linkExpiration)")}.
        </p>
        <p>If you don't want to join the organization, just ignore this message.</p>
    </EmailLayout>
);

export const getTemplate: GetTemplate = async (props) => {
  return await render(<Template {...props} />, { plainText: props.plainText });
};

export const getSubject: GetSubject = async (_props) => {
  return "Invitation to join the {0} organization";
};

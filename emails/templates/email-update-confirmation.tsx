import { Text, render } from "jsx-email";
import { EmailLayout} from "../eliatra-layout";
import {
  GetSubject,
  GetTemplate,
  GetTemplateProps,
  createVariablesHelper,
} from "keycloakify-emails";
interface TemplateProps extends Omit<GetTemplateProps, "plainText"> {}

export const previewProps: TemplateProps = {
  locale: "en",
  themeName: "vanilla",
};

export const templateName = "Email Update Confirmation";

const { exp } = createVariablesHelper("email-update-confirmation.ftl");

export const Template = ({ locale }: TemplateProps) => (
    <EmailLayout
        userFirstname={exp("user.firstName")}
        userLastname={exp("user.lastName")}
        locale={locale}
        buttonText={"Confirm email address update"}
        buttonLink={exp("link")}
        emailAddress={exp("user.email")}
        preview={"Confirm email address update"}>

        To change the email address to {exp("newEmail")} for your MEOD account,
        click the link below.
        <br/><br/>
        This link will expire within {exp("linkExpirationFormatter(linkExpiration)")}.<br/>
        If the link is already expired, just try to login and a new verification link will be sent.
        <br/><br/>
        If you don't want to proceed with this modification, just ignore this message.
    </EmailLayout>
);

export const getTemplate: GetTemplate = async (props) => {
  return await render(<Template {...props} />, { plainText: props.plainText });
};

export const getSubject: GetSubject = async (_props) => {
  return "Confirm your new MEOD email address";
};

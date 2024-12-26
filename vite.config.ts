import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { keycloakify } from "keycloakify/vite-plugin";
import {buildEmailTheme} from "keycloakify-emails";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        react(),
        keycloakify({
            accountThemeImplementation: "none",
            postBuild: async (buildContext) => {
                await buildEmailTheme({
                    templatesSrcDirPath: import.meta.dirname + "/emails/templates",
                    themeNames: buildContext.themeNames,
                    keycloakifyBuildDirPath: buildContext.keycloakifyBuildDirPath,
                    locales: ["en", "de"],
                    cwd: import.meta.dirname,
                    esbuild: {}, // optional esbuild options
                });
            },
        })
    ]
});

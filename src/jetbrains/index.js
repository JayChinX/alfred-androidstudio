import fs from "fs";
import os from "os";
import { xml2js } from "xml-js";
// import * as xml2js from 'xml-js';
export async function getRecentProjects(app) {
  const preferencesBasePath = `${os.homedir()}/Library/Application Support/Google/`;
  const folders = fs.readdirSync(preferencesBasePath);
  const appDir = folders
    .filter((name) => name.startsWith(app))
    .reduce((p, v) => (p && p > v ? p : v), "");
  if (!appDir) {
    throw new Error("Not Found Application");
  }
  const recentPreferencesFile = `${preferencesBasePath}${appDir}/options/recentProjects.xml`;
  const recentPreferences = fs.readFileSync(recentPreferencesFile, {
    encoding: "utf8",
  });
  const recentPreferencesObj = xml2js(recentPreferences);
  return recentPreferencesObj.elements
    .find((e) => e.name === "application")
    .elements.find((e) => e.name === "component")
    .elements.find(
      (e) => e.name === "option" && e.attributes.name === "additionalInfo"
    )
    .elements.find((e) => e.name === "map")
    .elements.map((e) => {
      var _a;
      const recentProjectMetaInfo = e.elements
        .find((e) => e.name === "value")
        .elements.find((e) => e.name === "RecentProjectMetaInfo");
      const options = recentProjectMetaInfo.elements.filter(
        (i) => i.name === "option"
      );
      const frame = recentProjectMetaInfo.elements.find(
        (i) => i.name === "frame"
      );
      const frameTitle = recentProjectMetaInfo.attributes.frameTitle;
      const path = `${e.attributes.key}`.replace("$USER_HOME$", os.homedir());
      return {
        name: frameTitle
          ? `${frameTitle}`.split(" – ")[0]
          : path.substring(path.lastIndexOf("/") + 1),
        frameTitle,
        path: path,
        opened: recentProjectMetaInfo.attributes.opened !== "true",
        workspaceId: recentProjectMetaInfo.attributes.workspaceId,
        activationTimestamp: +((_a = options.find(
          (i) => i.attributes.name === "activationTimestamp"
        )) === null || _a === void 0
          ? void 0
          : _a.attributes.value),
        buildTimestamp: +options.find(
          (i) => i.attributes.name === "buildTimestamp"
        ).attributes.value,
        projectOpenTimestamp: +options.find(
          (i) => i.attributes.name === "projectOpenTimestamp"
        ).attributes.value,
        frame: frame && {
          x: +frame.attributes.x,
          y: +frame.attributes.y,
          width: +frame.attributes.width,
          height: +frame.attributes.height,
          extendedState: +frame.attributes.extendedState,
        },
      };
    });
}

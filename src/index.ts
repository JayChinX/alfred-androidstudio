import alfred, { OutputItem } from "./alfred/index.js";
import { getRecentProjects } from "./jetbrains/index.js";

const items: OutputItem[] = [{ arg: "", title: "Open", subtitle: "" }];

try {
  const recentProjects = await getRecentProjects("AndroidStudio");
  // console.log(recentProjects);
  items.push(
    ...recentProjects.reverse().map((i) => ({
      arg: i.path,
      title: `${i.name}${i.opened ? "(opened)" : ""}`,
      subtitle: i.path,
    }))
  );
} catch (e) {}
alfred.output({ items }, ["title"]);

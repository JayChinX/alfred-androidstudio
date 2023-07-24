export declare type JetbrainsApp =
  | "WebStorm"
  | "IntelliJIdea"
  | "DataGrip"
  | "PyCharm"
  | "AndroidStudio";
export declare function getRecentProjects(
  app: JetbrainsApp
): Promise<RecentProjects>;
export declare type RecentProjects = RecentProject[];
export interface RecentProject {
  path: string;
  name: string;
  opened: boolean;
  frameTitle: string;
  workspaceId: string;
  activationTimestamp?: number;
  buildTimestamp: number;
  projectOpenTimestamp: number;
  frame?: RecentProjectFrame;
}
export interface RecentProjectFrame {
  x: number;
  y: number;
  width: number;
  height: number;
  extendedState: number;
}

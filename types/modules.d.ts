declare module "@mapbox/rehype-prism";
declare module "rehype-stringify" {
  import { Plugin } from "unified";

  const html: Plugin;

  export default html;
}
declare module "remark-rehype" {
  import { Plugin } from "unified";

  const remark2rehype: Plugin;

  export default remark2rehype;
}

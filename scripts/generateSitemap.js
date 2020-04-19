const fs = require("fs");
const { formatISO } = require("date-fns");

const getPaths = () => {
  let paths = [];

  const walkSync = (dir) => {
    // Get all files of the current directory & iterate over them
    ignoredExtensions = ["png", "jpg", "js", "json"];
    fs.readdirSync(dir).forEach((file) => {
      // Construct whole file-path & retrieve file's stats
      const filePath = `${dir}${file}`;
      const fileStat = fs.statSync(filePath);

      if (fileStat.isDirectory()) {
        // Recurse one folder deeper
        walkSync(`${filePath}/`);
      } else {
        // Construct this file's pathname excluding the "pages" folder & its extension
        if (!ignoredExtensions.some((ext) => filePath.includes(`.${ext}`))) {
          const cleanPath = filePath
            .substr(0, filePath.lastIndexOf("."))
            .replace(dir, "")
            .replace("index", "");

          if (cleanPath !== "404") {
            paths = [
              ...paths,
              {
                path: `https://ivoberger.com/${cleanPath}`,
                lastModified: fileStat.mtime,
              },
            ];
          }
        }
      }
    });
  };

  walkSync(".next/serverless/pages/");

  return paths;
};

const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"> 
  ${getPaths().map(
    ({ path, lastModified }) => `<url>
    <loc>${path}</loc>
    <lastmod>${formatISO(new Date(lastModified))}</lastmod>
  </url>`
  )}
</urlset>`;

fs.writeFileSync("public/sitemap.xml", sitemapXml);

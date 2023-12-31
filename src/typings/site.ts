export interface site {
	/** required ------------------------------------- */

	//name of the project
	name: string;

	//FQDN of the source site
	rootUrl: string;

	//Initial URL to start scraping
	entryUrl: string;

	//Output dir path
	saveDir: string;

	//Log output dir path
	logDir: string;

	//Language of the source site.  Output file
	language: "JP" | "EN";

	//Source site type.
	siteType: "links" | "multipleArticle" | "singleArticle";

	//How to transition to the next page
	nextPageType: "parameter" | "pagenation" | "next" | "url" | "last";

	//If nextPageType = "last" | CSS selector for getting the last page url
	lastUrlSelector?: string;

	//If nextPageType = "last" | RegExp for getting the last page number
	lastPageNumberRegExp?: string;

	//If true, scrape articles that has matching tags to tags parameter
	tagFiltering: boolean;

	//Collect tags from the article
	tagCollect: boolean;

	//CSS selector for the title of the article
	articleTitleSelector: string;

	//CSS selector for the body of the article
	articleBodySelector: string;

	/** optional: Next Page parameters ------------- */

	//if nextPageType === "parameter"
	nextPageParameter?: string;

	//if nextPageType === "next|pagenation" | CSS selector for next page link
	nextPageLinkSelector?: string;

	//if nextPageType === "url" | RegExp for picking the page number from URL
	nextPageUrlRegExp?: string;

	//if nextPageType === "pagenation" && starting page is not the top/first page.
	startingPageNumber?: number;

	/** optional: Tags ----------------------------- */

	//if tagFiltering is true.  Tags used to filter the articles
	tags?: string[];

	//if tagFiltering is true. | CSS selector for the tags on index page
	indexTagSelector?: string;

	//if tagFiltering is true OR tagCollection is true | CSS selector for the tags
	articleTagSelector?: string;

	/** optional: siteType parameters ----------------------------- */

	//CSS selector for capturing link block on index page
	indexLinkBlockSelector?: string;

	//CSS selector for capturing link to the article page
	indexLinkSelector?: string;

	//CSS selector for capturing article block on multi-article page
	articleBlockSelector?: string;
}

"use strict";
import path from "path";
import { site } from "@/site";
import * as vldt from "./validator";

export function validateSrcWebsite(site: site): void {

	/** validations */
	if (vldt.areKeysValuesValid(site, ["name", "rootUrl", "entryUrl", "language", "saveDir", "siteType"])) {
		throw new Error(`Missing or invalid key parameters ${{ name: site.name, rootUrl: site.rootUrl, entryUrl: site.entryUrl, language: site.language, saveDir: site.saveDir, siteType: site.siteType }} `);
	}
	if (!["JP", "EN"].includes(site.language)) {
		throw new Error(`Language needs to be either 'JP' or 'EN'.`);
	}
	if (!/(EN|JP)$/.test(site.saveDir)) {
		site.saveDir = path.join(site.saveDir, site.language);
	}
	if (!vldt.isWritable(site.saveDir)) {
		throw new Error(`Export directory: ${site.saveDir} doesn't exist or does not have a write permission.`);
	}
	if (!vldt.isURL(site.rootUrl)) {
		throw new Error(`${site.rootUrl} is not a valid URL.`);
	}
	if (!vldt.isURL(site.entryUrl)) {
		throw new Error(`${site.entryUrl} is not a valid URL.`);
	}
	if (!["links", "multipleArticles", "singleArticle"].includes(site.siteType)) {
		throw new Error(`siteType value must be either "links", "multipleArticle", or "singleArticle".`);
	}
	if (!["parameter", "pagenation", "next"].includes(site.nextPageType)) {
		throw new Error(`nextPageType value must be either "parameter","pagenation", or"next".`);
	}
	if (site.tagFiltering) {
		if (!vldt.iskeyValueValid(site, "tags") || site.tags?.length === 0) {
			throw new Error(`Filtering tags missing.`);
		}
		if (site.siteType === 'links' && !vldt.iskeyValueValid(site, 'indexTagSelector')) {
			throw new Error(`indexTagSelector missing.`);
		}
		if (site.siteType !== 'links' && !vldt.iskeyValueValid(site, 'articleTagSelector')) {
			throw new Error(`articleTagSelector missing.`);
		}
	}
	if (site.nextPageType === 'parameter' && !vldt.iskeyValueValid(site, 'nextPageParameter')) {
		throw new Error(`nextPageParameter missing.`);
	}
	if (site.nextPageType !== 'parameter' && !vldt.iskeyValueValid(site, 'nextPageLinkSelector')) {
		throw new Error(`nextPageLinkSelector missing.`);
	}

	if (site.siteType === 'links' && !vldt.areKeysValuesValid(site, ["indexlinkBlockSelector", "indexlinkSelector"])) {
		throw new Error(`indexlinkBlockSelector" and "indexlinkSelector" are required when siteType is set to 'links. `);
	}

	if (!vldt.areKeysValuesValid(site, ["articleTitleSelector", "articleBodySelector"])) {
		throw new Error(`Missing article selector.`);
	}

}



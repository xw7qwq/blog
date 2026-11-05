import type {
	ExpressiveCodeConfig,
	LicenseConfig,
	MacFlareConfig,
	NavBarConfig,
	OJFlareConfig,
	ProfileConfig,
	SiteConfig,
} from "./types/config";
import { LinkPreset } from "./types/config";

const avatarUrl = "https://q1.qlogo.cn/g?b=qq&nk=3012967200&s=640";

export const siteConfig: SiteConfig = {
	title: "Lucius7's Blog",
	subtitle: "",
	lang: "zh_CN", // Legacy fallback; page language comes from the /zh/ or /en/ route.
	themeColor: {
		hue: 354, // xw7 brand pink (#b4527f), shared with the lucius7.dev panel. From 0 to 360, e.g. red: 0, teal: 200, cyan: 250
		fixed: false, // Hide the theme color picker for visitors
	},
	banner: {
		enable: true,
		src: "assets/images/demo-banner.png", // Relative to the /src directory. Relative to the /public directory if it starts with '/'
		position: "center", // Equivalent to object-position, only supports 'top', 'center', 'bottom'. 'center' by default
		credit: {
			enable: false, // Display the credit text of the banner image
			text: "", // Credit text to be displayed
			url: "", // (Optional) URL link to the original artwork or artist's page
		},
	},
	toc: {
		enable: true, // Display the table of contents on the right side of the post
		depth: 2, // Maximum heading depth to show in the table, from 1 to 3
	},
	favicon: [
		{
			src: avatarUrl,
		},
	],
};

export const navBarConfig: NavBarConfig = {
	links: [
		LinkPreset.Home,
		LinkPreset.Archive,
		LinkPreset.About,
		{
			name: "GitHub",
			url: "https://github.com/xw7qwq", // Internal links should not include the base path, as it is automatically added
			external: true, // Show an external link icon and will open in a new tab
		},
	],
};

export const profileConfig: ProfileConfig = {
	avatar: avatarUrl,
	name: "Lucius7",
	bio: "空のない世界に、花の香り描き",
	links: [
		{
			name: "GitHub",
			icon: "fa6-brands:github",
			url: "https://github.com/theLucius7",
		},
		{
			name: "X",
			icon: "fa6-brands:x-twitter",
			url: "https://x.com/theLucius7",
		},
		{
			name: "Bilibili",
			icon: "fa6-brands:bilibili",
			url: "https://space.bilibili.com/1814052279",
		},
		{
			name: "Email",
			icon: "fa6-solid:envelope",
			url: "mailto:i@lucius7.dev",
		},
	],
};

export const licenseConfig: LicenseConfig = {
	enable: true,
	name: "CC BY-NC-SA 4.0",
	url: "https://creativecommons.org/licenses/by-nc-sa/4.0/",
};

export const macFlareConfig: MacFlareConfig = {
	enable: true,
	baseUrl: "https://macflare.lucius7.dev",
};

export const ojFlareConfig: OJFlareConfig = {
	enable: true,
	baseUrl: "https://ojflare.lucius7.dev",
};

export const expressiveCodeConfig: ExpressiveCodeConfig = {
	// Note: Some styles (such as background color) are being overridden, see the astro.config.mjs file.
	// Please select a dark theme, as this blog theme currently only supports dark background color
	theme: "github-dark",
};

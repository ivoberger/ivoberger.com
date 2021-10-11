<script lang="ts">
	import Icon from 'svelte-awesome';
	import {
		faGithub,
		faStackOverflow,
		faDev,
		faTwitter,
		faLinkedin
	} from '@fortawesome/free-brands-svg-icons';
	import { faCopyright } from '@fortawesome/free-regular-svg-icons';

	import NavItem from './NavItem.svelte';
	import SocialLink from './SocialLink.svelte';
</script>

<footer>
	<div class="links">
		<SocialLink
			title="GitHub"
			link="https://github.com/ivoberger"
			icon={faGithub}
			class="hover:text-brand-github dark:hover:text-gray-100"
		/>
		<SocialLink
			title="StackOverflow"
			link="https://stackoverflow.com/users/8568922/ivo"
			icon={faStackOverflow}
			class="hover:text-brand-stackOverflow"
		/>
		<SocialLink
			title="DEV.to"
			link="https://dev.to/ivoberger"
			icon={faDev}
			class="hover:text-brand-dev dark:hover:text-gray-100"
		/>
		<SocialLink
			title="Twitter"
			link="https://twitter.com/__I__V__O__"
			icon={faTwitter}
			class="hover:text-brand-twitter"
		/>
		<SocialLink
			title="LinkedIn"
			link="https://www.linkedin.com/in/ivo-berger-00089b15b/"
			icon={faLinkedin}
			class="hover:text-brand-linkedIn"
		/>
		<p>
			<Icon data={faCopyright} class="mt-1 mr-2" />
			2019 - present, Ivo Berger
		</p>
	</div>
	<nav class="w-full sm:w-1/2">
		<ul class="flex -mx-2 sm:justify-end">
			<NavItem text="Home" link="/" />
			<NavItem text="About" link="/about/" />
			<NavItem text="Sitemap" link="/sitemap.xml" />
			<NavItem text="RSS Feed" link="/feed.xml" />
		</ul>
	</nav>
</footer>

<style>
	footer {
		@apply flex flex-wrap justify-between max-w-2xl px-6 py-8 mx-auto text-sm leading-normal text-gray-700 dark:text-gray-400 md:max-w-3xl xl:max-w-4xl sm:px-12 sm:pb-10;
	}
	.links {
		@apply w-full mb-4 sm:w-1/2 sm:mb-0;
	}
	nav {
		@apply w-full mb-4 sm:w-1/2 sm:mb-0;
	}
</style>

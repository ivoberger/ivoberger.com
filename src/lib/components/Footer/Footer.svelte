<script lang="ts">
	import Icon from 'svelte-awesome';
	import {
		faGithub,
		faStackOverflow,
		faDev,
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
		<ul class="-mx-2 flex sm:justify-end">
			<NavItem text="Home" link="/" />
			<NavItem text="About" link="/about/" />
			<NavItem text="Sitemap" link="/sitemap.xml" />
			<NavItem text="RSS Feed" link="/feed.xml" />
		</ul>
	</nav>
</footer>

<style>
	footer {
		@apply mx-auto flex max-w-2xl flex-wrap justify-between px-6 py-8 text-sm leading-normal text-gray-700 dark:text-gray-400 sm:px-12 sm:pb-10 md:max-w-3xl xl:max-w-4xl;
	}
	.links {
		@apply mb-4 w-full sm:mb-0 sm:w-1/2;
	}
	nav {
		@apply mb-4 w-full sm:mb-0 sm:w-1/2;
	}
</style>

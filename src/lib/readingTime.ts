export interface I18n {
	less: string;
	default: string;
}

export const en: I18n = {
	less: 'less than a minute read',
	default: 'min read'
};

interface ReadingTime {
	minutes: number;
	words: number;
	text: string;
}

const parseWords = (data: string): RegExpMatchArray =>
	data.match(/[\w\d\s,.\u00C0-\u024F]+/giu) ?? ([] as unknown as RegExpMatchArray);

const parseChineseWords = (data: string) => data.match(/[\u4E00-\u9FA5]/gu) ?? [];

const parseJapaneseWords = (data: string) => data.match(/[\u3041-\u3096]/gu) ?? [];

const getNumberOfWords = (data: string) =>
	parseWords(data).reduce(
		(accumulator, word) =>
			accumulator + (!word.trim().length ? 0 : word.trim().split(/\s+/u).length),
		0
	) +
	parseChineseWords(data).length +
	parseJapaneseWords(data).length;

const isLessThanAMinute = (minutes: number) => minutes < 1 + Number.EPSILON;

const getLocale = (minutes: number) => en[isLessThanAMinute(minutes) ? 'less' : 'default'];

const readingTime = (data: string, wordsPerMinute = 300): ReadingTime => {
	const words = getNumberOfWords(data ?? '');
	const minutes = +Math.round(words / wordsPerMinute).toFixed(2);

	return {
		minutes,
		words,
		text: `${isLessThanAMinute(minutes) ? '' : minutes} ${getLocale(minutes)}`.trimStart()
	};
};

export { readingTime };

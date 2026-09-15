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
	data.match(/[\w\d\s,.À-ɏ]+/giu) ?? ([] as unknown as RegExpMatchArray);

const parseChineseWords = (data: string) => data.match(/[一-龥]/gu) ?? [];

const parseJapaneseWords = (data: string) => data.match(/[ぁ-ゖ]/gu) ?? [];

const getNumberOfWords = (data: string) =>
	parseWords(data).reduce(
		(accumulator, word) =>
			accumulator + (word.trim().length === 0 ? 0 : word.trim().split(/\s+/u).length),
		0
	) +
	parseChineseWords(data).length +
	parseJapaneseWords(data).length;

const isLessThanAMinute = (minutes: number) => minutes < 1 + Number.EPSILON;

const getLocale = (minutes: number) => en[isLessThanAMinute(minutes) ? 'less' : 'default'];

export const readingTime = (data: string, wordsPerMinute = 300): ReadingTime => {
	const words = getNumberOfWords(data ?? '');
	const minutes = +Math.round(words / wordsPerMinute).toFixed(2);

	return {
		minutes,
		words,
		text: `${isLessThanAMinute(minutes) ? '' : minutes} ${getLocale(minutes)}`.trimStart()
	};
};

export declare type GetPageResponse = {
	parent:
		| {
				type: 'database_id';
				database_id: IdRequest;
		  }
		| {
				type: 'page_id';
				page_id: IdRequest;
		  }
		| {
				type: 'workspace';
				workspace: true;
		  };
	properties: Record<
		string,
		| {
				type: 'number';
				number: number | null;
				id: string;
		  }
		| {
				type: 'url';
				url: string | null;
				id: string;
		  }
		| {
				type: 'select';
				select: SelectPropertyResponse | null;
				id: string;
		  }
		| {
				type: 'multi_select';
				multi_select: Array<SelectPropertyResponse>;
				id: string;
		  }
		| {
				type: 'date';
				date: DateResponse | null;
				id: string;
		  }
		| {
				type: 'email';
				email: string | null;
				id: string;
		  }
		| {
				type: 'phone_number';
				phone_number: string | null;
				id: string;
		  }
		| {
				type: 'checkbox';
				checkbox: boolean;
				id: string;
		  }
		| {
				type: 'files';
				files: Array<
					| {
							file: {
								url: string;
								expiry_time: string;
							};
							name: StringRequest;
							type?: 'file';
					  }
					| {
							external: {
								url: TextRequest;
							};
							name: StringRequest;
							type?: 'external';
					  }
				>;
				id: string;
		  }
		| {
				type: 'created_by';
				created_by: PartialUserObjectResponse;
				id: string;
		  }
		| {
				type: 'created_time';
				created_time: string;
				id: string;
		  }
		| {
				type: 'last_edited_by';
				last_edited_by: PartialUserObjectResponse;
				id: string;
		  }
		| {
				type: 'last_edited_time';
				last_edited_time: string;
				id: string;
		  }
		| {
				type: 'formula';
				formula:
					| {
							type: 'string';
							string: string | null;
					  }
					| {
							type: 'date';
							date: DateResponse | null;
					  }
					| {
							type: 'number';
							number: number | null;
					  }
					| {
							type: 'boolean';
							boolean: boolean | null;
					  };
				id: string;
		  }
		| {
				type: 'title';
				title: Array<RichTextItemResponse>;
				id: string;
		  }
		| {
				type: 'rich_text';
				rich_text: Array<RichTextItemResponse>;
				id: string;
		  }
		| {
				type: 'people';
				people: Array<PartialUserObjectResponse>;
				id: string;
		  }
		| {
				type: 'relation';
				relation: Array<{
					id: string;
				}>;
				id: string;
		  }
		| {
				type: 'rollup';
				rollup:
					| {
							type: 'number';
							number: number | null;
							function: RollupFunction;
					  }
					| {
							type: 'date';
							date: DateResponse | null;
							function: RollupFunction;
					  }
					| {
							type: 'array';
							array: Array<
								| {
										type: 'title';
										title: Array<RichTextItemResponse>;
								  }
								| {
										type: 'rich_text';
										rich_text: Array<RichTextItemResponse>;
								  }
								| {
										type: 'people';
										people: Array<PartialUserObjectResponse>;
								  }
								| {
										type: 'relation';
										relation: Array<{
											id: string;
										}>;
								  }
							>;
							function: RollupFunction;
					  };
				id: string;
		  }
	>;
	icon:
		| {
				type: 'emoji';
				emoji: EmojiRequest;
		  }
		| null
		| {
				type: 'external';
				external: {
					url: TextRequest;
				};
		  }
		| null
		| {
				type: 'file';
				file: {
					url: string;
					expiry_time: string;
				};
		  }
		| null;
	cover:
		| {
				type: 'external';
				external: {
					url: TextRequest;
				};
		  }
		| null
		| {
				type: 'file';
				file: {
					url: string;
					expiry_time: string;
				};
		  }
		| null;
	created_by: {
		id: IdRequest;
		object: 'user';
	};
	last_edited_by: {
		id: IdRequest;
		object: 'user';
	};
	object: 'page';
	id: string;
	created_time: string;
	last_edited_time: string;
	archived: boolean;
	url: string;
};
export declare type BlockObjectResponse =
	| {
			type: 'paragraph';
			paragraph: {
				rich_text: Array<RichTextItemResponse>;
				color: ApiColor;
			};
			object: 'block';
			id: string;
			created_time: string;
			created_by: {
				id: IdRequest;
				object: 'user';
			};
			last_edited_time: string;
			last_edited_by: {
				id: IdRequest;
				object: 'user';
			};
			has_children: boolean;
			archived: boolean;
	  }
	| {
			type: 'heading_1';
			heading_1: {
				rich_text: Array<RichTextItemResponse>;
				color: ApiColor;
			};
			object: 'block';
			id: string;
			created_time: string;
			created_by: {
				id: IdRequest;
				object: 'user';
			};
			last_edited_time: string;
			last_edited_by: {
				id: IdRequest;
				object: 'user';
			};
			has_children: boolean;
			archived: boolean;
	  }
	| {
			type: 'heading_2';
			heading_2: {
				rich_text: Array<RichTextItemResponse>;
				color: ApiColor;
			};
			object: 'block';
			id: string;
			created_time: string;
			created_by: {
				id: IdRequest;
				object: 'user';
			};
			last_edited_time: string;
			last_edited_by: {
				id: IdRequest;
				object: 'user';
			};
			has_children: boolean;
			archived: boolean;
	  }
	| {
			type: 'heading_3';
			heading_3: {
				rich_text: Array<RichTextItemResponse>;
				color: ApiColor;
			};
			object: 'block';
			id: string;
			created_time: string;
			created_by: {
				id: IdRequest;
				object: 'user';
			};
			last_edited_time: string;
			last_edited_by: {
				id: IdRequest;
				object: 'user';
			};
			has_children: boolean;
			archived: boolean;
	  }
	| {
			type: 'bulleted_list_item';
			bulleted_list_item: {
				rich_text: Array<RichTextItemResponse>;
				color: ApiColor;
			};
			object: 'block';
			id: string;
			created_time: string;
			created_by: {
				id: IdRequest;
				object: 'user';
			};
			last_edited_time: string;
			last_edited_by: {
				id: IdRequest;
				object: 'user';
			};
			has_children: boolean;
			archived: boolean;
	  }
	| {
			type: 'numbered_list_item';
			numbered_list_item: {
				rich_text: Array<RichTextItemResponse>;
				color: ApiColor;
			};
			object: 'block';
			id: string;
			created_time: string;
			created_by: {
				id: IdRequest;
				object: 'user';
			};
			last_edited_time: string;
			last_edited_by: {
				id: IdRequest;
				object: 'user';
			};
			has_children: boolean;
			archived: boolean;
	  }
	| {
			type: 'quote';
			quote: {
				rich_text: Array<RichTextItemResponse>;
				color: ApiColor;
			};
			object: 'block';
			id: string;
			created_time: string;
			created_by: {
				id: IdRequest;
				object: 'user';
			};
			last_edited_time: string;
			last_edited_by: {
				id: IdRequest;
				object: 'user';
			};
			has_children: boolean;
			archived: boolean;
	  }
	| {
			type: 'to_do';
			to_do: {
				rich_text: Array<RichTextItemResponse>;
				color: ApiColor;
				checked: boolean;
			};
			object: 'block';
			id: string;
			created_time: string;
			created_by: {
				id: IdRequest;
				object: 'user';
			};
			last_edited_time: string;
			last_edited_by: {
				id: IdRequest;
				object: 'user';
			};
			has_children: boolean;
			archived: boolean;
	  }
	| {
			type: 'toggle';
			toggle: {
				rich_text: Array<RichTextItemResponse>;
				color: ApiColor;
			};
			object: 'block';
			id: string;
			created_time: string;
			created_by: {
				id: IdRequest;
				object: 'user';
			};
			last_edited_time: string;
			last_edited_by: {
				id: IdRequest;
				object: 'user';
			};
			has_children: boolean;
			archived: boolean;
	  }
	| {
			type: 'template';
			template: {
				rich_text: Array<RichTextItemResponse>;
			};
			object: 'block';
			id: string;
			created_time: string;
			created_by: {
				id: IdRequest;
				object: 'user';
			};
			last_edited_time: string;
			last_edited_by: {
				id: IdRequest;
				object: 'user';
			};
			has_children: boolean;
			archived: boolean;
	  }
	| {
			type: 'synced_block';
			synced_block: {
				synced_from: {
					type: 'block_id';
					block_id: IdRequest;
				} | null;
			};
			object: 'block';
			id: string;
			created_time: string;
			created_by: {
				id: IdRequest;
				object: 'user';
			};
			last_edited_time: string;
			last_edited_by: {
				id: IdRequest;
				object: 'user';
			};
			has_children: boolean;
			archived: boolean;
	  }
	| {
			type: 'child_page';
			child_page: {
				title: string;
			};
			object: 'block';
			id: string;
			created_time: string;
			created_by: {
				id: IdRequest;
				object: 'user';
			};
			last_edited_time: string;
			last_edited_by: {
				id: IdRequest;
				object: 'user';
			};
			has_children: boolean;
			archived: boolean;
	  }
	| {
			type: 'child_database';
			child_database: {
				title: string;
			};
			object: 'block';
			id: string;
			created_time: string;
			created_by: {
				id: IdRequest;
				object: 'user';
			};
			last_edited_time: string;
			last_edited_by: {
				id: IdRequest;
				object: 'user';
			};
			has_children: boolean;
			archived: boolean;
	  }
	| {
			type: 'equation';
			equation: {
				expression: string;
			};
			object: 'block';
			id: string;
			created_time: string;
			created_by: {
				id: IdRequest;
				object: 'user';
			};
			last_edited_time: string;
			last_edited_by: {
				id: IdRequest;
				object: 'user';
			};
			has_children: boolean;
			archived: boolean;
	  }
	| {
			type: 'code';
			code: {
				rich_text: Array<RichTextItemResponse>;
				caption: Array<RichTextItemResponse>;
				language: LanguageRequest;
			};
			object: 'block';
			id: string;
			created_time: string;
			created_by: {
				id: IdRequest;
				object: 'user';
			};
			last_edited_time: string;
			last_edited_by: {
				id: IdRequest;
				object: 'user';
			};
			has_children: boolean;
			archived: boolean;
	  }
	| {
			type: 'callout';
			callout: {
				rich_text: Array<RichTextItemResponse>;
				color: ApiColor;
				icon:
					| {
							type: 'emoji';
							emoji: EmojiRequest;
					  }
					| null
					| {
							type: 'external';
							external: {
								url: TextRequest;
							};
					  }
					| null
					| {
							type: 'file';
							file: {
								url: string;
								expiry_time: string;
							};
					  }
					| null;
			};
			object: 'block';
			id: string;
			created_time: string;
			created_by: {
				id: IdRequest;
				object: 'user';
			};
			last_edited_time: string;
			last_edited_by: {
				id: IdRequest;
				object: 'user';
			};
			has_children: boolean;
			archived: boolean;
	  }
	| {
			type: 'divider';
			divider: EmptyObject;
			object: 'block';
			id: string;
			created_time: string;
			created_by: {
				id: IdRequest;
				object: 'user';
			};
			last_edited_time: string;
			last_edited_by: {
				id: IdRequest;
				object: 'user';
			};
			has_children: boolean;
			archived: boolean;
	  }
	| {
			type: 'breadcrumb';
			breadcrumb: EmptyObject;
			object: 'block';
			id: string;
			created_time: string;
			created_by: {
				id: IdRequest;
				object: 'user';
			};
			last_edited_time: string;
			last_edited_by: {
				id: IdRequest;
				object: 'user';
			};
			has_children: boolean;
			archived: boolean;
	  }
	| {
			type: 'table_of_contents';
			table_of_contents: {
				color: ApiColor;
			};
			object: 'block';
			id: string;
			created_time: string;
			created_by: {
				id: IdRequest;
				object: 'user';
			};
			last_edited_time: string;
			last_edited_by: {
				id: IdRequest;
				object: 'user';
			};
			has_children: boolean;
			archived: boolean;
	  }
	| {
			type: 'column_list';
			column_list: EmptyObject;
			object: 'block';
			id: string;
			created_time: string;
			created_by: {
				id: IdRequest;
				object: 'user';
			};
			last_edited_time: string;
			last_edited_by: {
				id: IdRequest;
				object: 'user';
			};
			has_children: boolean;
			archived: boolean;
	  }
	| {
			type: 'column';
			column: EmptyObject;
			object: 'block';
			id: string;
			created_time: string;
			created_by: {
				id: IdRequest;
				object: 'user';
			};
			last_edited_time: string;
			last_edited_by: {
				id: IdRequest;
				object: 'user';
			};
			has_children: boolean;
			archived: boolean;
	  }
	| {
			type: 'link_to_page';
			link_to_page:
				| {
						type: 'page_id';
						page_id: IdRequest;
				  }
				| {
						type: 'database_id';
						database_id: IdRequest;
				  };
			object: 'block';
			id: string;
			created_time: string;
			created_by: {
				id: IdRequest;
				object: 'user';
			};
			last_edited_time: string;
			last_edited_by: {
				id: IdRequest;
				object: 'user';
			};
			has_children: boolean;
			archived: boolean;
	  }
	| {
			type: 'table';
			table: {
				has_column_header: boolean;
				has_row_header: boolean;
				table_width: number;
			};
			object: 'block';
			id: string;
			created_time: string;
			created_by: {
				id: IdRequest;
				object: 'user';
			};
			last_edited_time: string;
			last_edited_by: {
				id: IdRequest;
				object: 'user';
			};
			has_children: boolean;
			archived: boolean;
	  }
	| {
			type: 'table_row';
			table_row: {
				cells: Array<Array<RichTextItemResponse>>;
			};
			object: 'block';
			id: string;
			created_time: string;
			created_by: {
				id: IdRequest;
				object: 'user';
			};
			last_edited_time: string;
			last_edited_by: {
				id: IdRequest;
				object: 'user';
			};
			has_children: boolean;
			archived: boolean;
	  }
	| {
			type: 'embed';
			embed: {
				url: string;
				caption: Array<RichTextItemResponse>;
			};
			object: 'block';
			id: string;
			created_time: string;
			created_by: {
				id: IdRequest;
				object: 'user';
			};
			last_edited_time: string;
			last_edited_by: {
				id: IdRequest;
				object: 'user';
			};
			has_children: boolean;
			archived: boolean;
	  }
	| {
			type: 'bookmark';
			bookmark: {
				url: string;
				caption: Array<RichTextItemResponse>;
			};
			object: 'block';
			id: string;
			created_time: string;
			created_by: {
				id: IdRequest;
				object: 'user';
			};
			last_edited_time: string;
			last_edited_by: {
				id: IdRequest;
				object: 'user';
			};
			has_children: boolean;
			archived: boolean;
	  }
	| {
			type: 'image';
			image:
				| {
						type: 'external';
						external: {
							url: TextRequest;
						};
						caption: Array<RichTextItemResponse>;
				  }
				| {
						type: 'file';
						file: {
							url: string;
							expiry_time: string;
						};
						caption: Array<RichTextItemResponse>;
				  };
			object: 'block';
			id: string;
			created_time: string;
			created_by: {
				id: IdRequest;
				object: 'user';
			};
			last_edited_time: string;
			last_edited_by: {
				id: IdRequest;
				object: 'user';
			};
			has_children: boolean;
			archived: boolean;
	  }
	| {
			type: 'video';
			video:
				| {
						type: 'external';
						external: {
							url: TextRequest;
						};
						caption: Array<RichTextItemResponse>;
				  }
				| {
						type: 'file';
						file: {
							url: string;
							expiry_time: string;
						};
						caption: Array<RichTextItemResponse>;
				  };
			object: 'block';
			id: string;
			created_time: string;
			created_by: {
				id: IdRequest;
				object: 'user';
			};
			last_edited_time: string;
			last_edited_by: {
				id: IdRequest;
				object: 'user';
			};
			has_children: boolean;
			archived: boolean;
	  }
	| {
			type: 'pdf';
			pdf:
				| {
						type: 'external';
						external: {
							url: TextRequest;
						};
						caption: Array<RichTextItemResponse>;
				  }
				| {
						type: 'file';
						file: {
							url: string;
							expiry_time: string;
						};
						caption: Array<RichTextItemResponse>;
				  };
			object: 'block';
			id: string;
			created_time: string;
			created_by: {
				id: IdRequest;
				object: 'user';
			};
			last_edited_time: string;
			last_edited_by: {
				id: IdRequest;
				object: 'user';
			};
			has_children: boolean;
			archived: boolean;
	  }
	| {
			type: 'file';
			file:
				| {
						type: 'external';
						external: {
							url: TextRequest;
						};
						caption: Array<RichTextItemResponse>;
				  }
				| {
						type: 'file';
						file: {
							url: string;
							expiry_time: string;
						};
						caption: Array<RichTextItemResponse>;
				  };
			object: 'block';
			id: string;
			created_time: string;
			created_by: {
				id: IdRequest;
				object: 'user';
			};
			last_edited_time: string;
			last_edited_by: {
				id: IdRequest;
				object: 'user';
			};
			has_children: boolean;
			archived: boolean;
	  }
	| {
			type: 'audio';
			audio:
				| {
						type: 'external';
						external: {
							url: TextRequest;
						};
						caption: Array<RichTextItemResponse>;
				  }
				| {
						type: 'file';
						file: {
							url: string;
							expiry_time: string;
						};
						caption: Array<RichTextItemResponse>;
				  };
			object: 'block';
			id: string;
			created_time: string;
			created_by: {
				id: IdRequest;
				object: 'user';
			};
			last_edited_time: string;
			last_edited_by: {
				id: IdRequest;
				object: 'user';
			};
			has_children: boolean;
			archived: boolean;
	  }
	| {
			type: 'link_preview';
			link_preview: {
				url: TextRequest;
			};
			object: 'block';
			id: string;
			created_time: string;
			created_by: {
				id: IdRequest;
				object: 'user';
			};
			last_edited_time: string;
			last_edited_by: {
				id: IdRequest;
				object: 'user';
			};
			has_children: boolean;
			archived: boolean;
	  }
	| {
			type: 'unsupported';
			unsupported: EmptyObject;
			object: 'block';
			id: string;
			created_time: string;
			created_by: {
				id: IdRequest;
				object: 'user';
			};
			last_edited_time: string;
			last_edited_by: {
				id: IdRequest;
				object: 'user';
			};
			has_children: boolean;
			archived: boolean;
	  };
export declare type RichTextItemResponse =
	| {
			type: 'text';
			text: {
				content: string;
				link: {
					url: TextRequest;
				} | null;
			};
			annotations: {
				bold: boolean;
				italic: boolean;
				strikethrough: boolean;
				underline: boolean;
				code: boolean;
				color:
					| 'default'
					| 'gray'
					| 'brown'
					| 'orange'
					| 'yellow'
					| 'green'
					| 'blue'
					| 'purple'
					| 'pink'
					| 'red'
					| 'gray_background'
					| 'brown_background'
					| 'orange_background'
					| 'yellow_background'
					| 'green_background'
					| 'blue_background'
					| 'purple_background'
					| 'pink_background'
					| 'red_background';
			};
			plain_text: string;
			href: string | null;
	  }
	| {
			type: 'mention';
			mention:
				| {
						type: 'user';
						user: PartialUserObjectResponse;
				  }
				| {
						type: 'date';
						date: DateResponse;
				  }
				| {
						type: 'link_preview';
						link_preview: {
							url: TextRequest;
						};
				  }
				| {
						type: 'template_mention';
						template_mention:
							| {
									type: 'template_mention_date';
									template_mention_date: 'today' | 'now';
							  }
							| {
									type: 'template_mention_user';
									template_mention_user: 'me';
							  };
				  }
				| {
						type: 'page';
						page: {
							id: IdRequest;
						};
				  }
				| {
						type: 'database';
						database: {
							id: IdRequest;
						};
				  };
			annotations: {
				bold: boolean;
				italic: boolean;
				strikethrough: boolean;
				underline: boolean;
				code: boolean;
				color:
					| 'default'
					| 'gray'
					| 'brown'
					| 'orange'
					| 'yellow'
					| 'green'
					| 'blue'
					| 'purple'
					| 'pink'
					| 'red'
					| 'gray_background'
					| 'brown_background'
					| 'orange_background'
					| 'yellow_background'
					| 'green_background'
					| 'blue_background'
					| 'purple_background'
					| 'pink_background'
					| 'red_background';
			};
			plain_text: string;
			href: string | null;
	  }
	| {
			type: 'equation';
			equation: {
				expression: TextRequest;
			};
			annotations: {
				bold: boolean;
				italic: boolean;
				strikethrough: boolean;
				underline: boolean;
				code: boolean;
				color:
					| 'default'
					| 'gray'
					| 'brown'
					| 'orange'
					| 'yellow'
					| 'green'
					| 'blue'
					| 'purple'
					| 'pink'
					| 'red'
					| 'gray_background'
					| 'brown_background'
					| 'orange_background'
					| 'yellow_background'
					| 'green_background'
					| 'blue_background'
					| 'purple_background'
					| 'pink_background'
					| 'red_background';
			};
			plain_text: string;
			href: string | null;
	  };

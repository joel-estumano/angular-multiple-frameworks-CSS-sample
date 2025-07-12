interface Project {
	title: string;
	tags: string[];
	description: string;
	imgUrl: string;
}

type Projects = [Project, Project];

export const projects: Projects[] = [
	[
		{
			title: 'Admin',
			tags: ['v0.7.2', 'Desktop', 'WIP'],
			description:
				'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla! Maiores et perferendis eaque, exercitationem praesentium nihil.',
			imgUrl: 'projects/admin.png'
		},
		{
			title: 'Cards',
			tags: ['v0.7.2', 'Desktop', '?'],
			description:
				'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla! Maiores et perferendis eaque, exercitationem praesentium nihil.',
			imgUrl: 'projects/cards.png'
		}
	],
	[
		{
			title: 'Band',
			tags: ['v0.7.2', 'Desktop', '?'],
			description:
				'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla! Maiores et perferendis eaque, exercitationem praesentium nihil.',
			imgUrl: 'projects/band.png'
		},
		{
			title: 'Things',
			tags: ['v0.7.2', 'Desktop', '?'],
			description:
				'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla! Maiores et perferendis eaque, exercitationem praesentium nihil.',
			imgUrl: 'projects/cheatsheet.png'
		}
	],
	[
		{
			title: 'Blog',
			tags: ['v0.7.2', 'Desktop', 'WIP'],
			description:
				'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla! Maiores et perferendis eaque, exercitationem praesentium nihil.',
			imgUrl: 'projects/blog.png'
		},
		{
			title: 'Cover',
			tags: ['v0.7.2', 'Desktop', 'Mobile'],
			description:
				'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla! Maiores et perferendis eaque, exercitationem praesentium nihil.',
			imgUrl: 'projects/cover.png'
		}
	]
];

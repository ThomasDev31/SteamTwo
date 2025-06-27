export const navContent = [
	{
		sectionName: "Your Games",
		categories: [
			{
				title: "Added Games",
				icon: "fa-brands fa-playstation",
			},
		],
	},
	{
		sectionName: "New Releases",
		categories: [
			{
				title: "Last 30 days",
				icon: "fa-solid fa-star",
			},

			{
				title: "This week",
				icon: "fa-solid fa-fire",
			},
			{
				title: "Next week",
				icon: "fa-solid fa-forward",
			},
		],
	},
	{
		sectionName: "Top",
		categories: [
			{
				title: "Best of the year",
				icon: "fa-solid fa-trophy",
			},
			{
				title: "Popular in 2025",
				icon: "fa-solid fa-chart-simple",
			},
			{
				title: "All time top",
				icon: "fa-solid fa-crown",
			},
		],
	},
	{
		sectionName: "Platforms",
		categories: [
			{
				id: 1,
				title: "PC",
				icon: "fa-brands fa-windows",
			},
			{
				id: 2,
				title: "PlayStation",
				icon: "fa-brands fa-playstation",
			},
			{
				id: 3,
				title: "Xbox One",
				icon: "fa-brands fa-xbox",
			},
			{
				id: 7,
				title: "Nintendo Switch",
				icon: "fa-solid fa-gamepad",
			},
			{
				id: 4,
				title: "iOS",
				icon: "fa-brands fa-app-store-ios",
			},
			{
				id: 8,
				title: "Android",
				icon: "fa-brands fa-android",
			},
		],
	},

	{
		sectionName: "Genres",
		categories: [
			{
				id: 1,
				title: "Action",
				slug: "action",
				icon: "fa-solid fa-hand-fist",
			},
			{
				id: 2,
				title: "Strategy",
				slug: "strategy",
				icon: "fa-solid fa-chess-knight",
			},
			{
				id: 3,
				title: "RPG",
				slug: "role-playing-games-rpg",
				icon: "fa-solid fa-skull-crossbones",
			},
			{
				id: 4,
				title: "Shooter",
				slug: "shooter",
				icon: "fa-solid fa-gun",
			},
			{
				id: 5,
				title: "Adventure",
				slug: "adventure", 
				icon: "fa-solid fa-mountain",
			},
			{
				id: 6,
				title: "Puzzle",
				slug: "puzzle",
				icon: "fa-solid fa-puzzle-piece",
			},
			{
				id: 7,
				title: "Racing",
				slug: "racing",
				icon: "fa-solid fa-flag-checkered",
			},
			{
				id: 8,
				title: "Sports",
				slug: "sports",
				icon: "fa-solid fa-volleyball",
			},
		],
	},
];

export const filterBy = (data, filter) => {
	if (!data || !Array.isArray(data)) {
		return [];
	}

	switch (filter) {
		case "name":
			return data.sort((a, b) => a.title.localeCompare(b.title));
		case "popularity":
			return data.sort((a, b) => b.metacritic - a.metacritic);
		case "release_date":
			return data.sort(
				(a, b) => new Date(b.releaseDate) - new Date(a.releaseDate)
			);
		case "rating":
			return data.sort((a, b) => b.rating - a.rating);
		default:
			return data;
	}
};

const faker = require('faker');
const { MockList } = require('graphql-tools');

const ArtistList = () => {
	const count = faker.random.arrayElement([3267, 3351, 3489]);

	return {
		count,
		nodes: () => new MockList(count),
	};
};

module.exports = {
	ArtistList,
};

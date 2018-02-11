const faker = require('faker');
const { MockList } = require('graphql-tools');

const ReleaseList = () => {
	const count = faker.random.arrayElement([121377, 123400, 124655, 127885]);

	return {
		count,
		totalPlays: faker.random.arrayElement([567385948, 572642100]),
		nodes: () => new MockList(count),
	};
};

module.exports = {
	ReleaseList,
};

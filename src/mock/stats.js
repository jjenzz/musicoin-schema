const faker = require('faker');
const { MockList } = require('graphql-tools');

module.exports.Stats = () => ({
	totalArtists: faker.random.arrayElement([3267, 3351, 3489]),
	totalReleases: faker.random.arrayElement([121377, 123400, 124655, 127885]),
	totalPlays: faker.random.arrayElement([567385948, 572642100]),
});

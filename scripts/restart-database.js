const {
    Kuzzle,
    WebSocket
} = require('kuzzle-sdk');

// Replace 'kuzzle' with your Kuzzle server hostname (e.g. 'localhost')
const kuzzle = new Kuzzle(
    new WebSocket('localhost')
);
const main = async () => {
    try {
        await kuzzle.connect()
        await kuzzle.index.delete('school-software');
        // console.log('Index deleted');
        // TODO refresh after delete or this doesn't work
        kuzzle.disconnect()
    } catch(error) {
	    kuzzle.disconnect()
    }
try {
        await kuzzle.connect()
        await kuzzle.index.create('school-software')
        await kuzzle.collection.create('school-software', 'id-mapping')
    } catch (error) {
        console.error(error.message);
    } finally {
        kuzzle.disconnect()
    }
}

main()

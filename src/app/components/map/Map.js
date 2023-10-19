/**
 * Get an array of map tiles required to display a certain bounding box.
 * Angabe von topleft (north-west) und bottom-left (south-east)
 * Tiles are objects in this form:
 *    { x: number, y: number, z: number}
 * The calulation is based on our PHPTileDownloader (https://bitbucket.org/fluxguide/phptiledownloader/src/master/downloader.php)
 * @param {number} north latitude north
 * @param {number} east longitude east
 * @param {number} south latitude south
 * @param {number} west longitude west
 * @param {Array} zoomlevels zoomlevels (e.g. [10,11,12])
 * @returns {Array} list of tiles, each with properties x, y, z
 */

import MapStyles from './style.json'

function getTilesWithinBounds(north, east, south, west, zoomLevels) {
	function deg2rad(degrees) {
		return degrees * (Math.PI / 180)
	}

	// Convert to float
	north = parseFloat(north)
	east = parseFloat(east)
	south = parseFloat(south)
	west = parseFloat(west)

	/**
	 * @param number lon - The longitude
	 * @param number zoom - The zoomlevel
	 *
	 * @return number
	 * @description Get the x value for a tile at a certain longitude at a certain zoomlevel
	 */
	function getTileX(lon, zoom) {
		return Math.floor(((lon + 180) / 360) * Math.pow(2, zoom))
	}

	/**
	 * @param number lat - The latitude
	 * @param number zoom - The zoomlevel
	 *
	 * @return number
	 * @description Get the x value for a tile at a certain latitude at a certain zoomlevel
	 */
	function getTileY(lat, zoom) {
		return Math.floor(
			((1 - Math.log(Math.tan(deg2rad(lat)) + 1 / Math.cos(deg2rad(lat))) / Math.PI) / 2) * Math.pow(2, zoom)
		)
	}

	// all params are required
	if (north == undefined || east == undefined || south == undefined || west == undefined || zoomLevels == undefined) {
		throw new Error('Please provide north, east, south, west and zoomlevels parameters')
	}

	let tileUrl
	if (MapStyles?.sources?.fluxguide?.tiles[0]) {
		tileUrl = MapStyles.sources.fluxguide.tiles[0]
	} else {
		tileUrl = 'https://maptiles.fluxguide.com/data/v3/{z}/{x}/{y}.pbf'
	}

	// zoomlevels must be an array
	if (!_.isArray(zoomLevels)) {
		throw new Error('Parameter zoomlevels must be an array like [10, 11, 12]')
	}

	let tileUrls = []

	for (const zoomLevel of zoomLevels) {
		// get top-left tile number
		const topLeftX = getTileX(west, zoomLevel) - 1 // lon
		const topLeftY = getTileY(north, zoomLevel) - 1 // lat

		// get bottom-right tile number
		const bottomLeftX = getTileX(east, zoomLevel) + 1 // lon
		const bottomLeftY = getTileY(south, zoomLevel) + 1 // lat

		// loop x-axis
		for (let x = topLeftX; x <= bottomLeftX; x++) {
			// loop y-axis
			for (let y = topLeftY; y <= bottomLeftY; y++) {
				// replace z/x/y in tileserver url
				let newUrl = tileUrl.replace('{z}', zoomLevel.toString())
				newUrl = newUrl.replace('{x}', x.toString())
				newUrl = newUrl.replace('{y}', y.toString())

				if (zoomLevel >= 0 && x >= 0 && y >= 0) {
					tileUrls.push(newUrl)
				}
			}
		}
	}

	const files = tileUrls.map((tileUrl) => {
		let fileObject = {
			size: 5000, // Estimated avg size for vector tiles
			moddate: 1234,
			url: tileUrl,
		}
		fileObject['E_' + fg1.state.exhibitionId] = '1'
		fileObject['L_' + fg1.visitor.state.languageId] = '1'

		return fileObject
	})

	return files
}






/**
 * Get distance between two coordinates (in km)
 * @param {Array} geoposition1 like [12.1234, 25.987]
 * @param {Array} geoposition2 like [12.1234, 25.987]
 * @returns {number} the distance in km
 */
function getDistance(geoposition1, geoposition2) {

	// get coordinates
	let lat1 = parseFloat(geoposition1[0]);
	let lon1 = parseFloat(geoposition1[1]);
	let lat2 = parseFloat(geoposition2[0]);
	let lon2 = parseFloat(geoposition2[1]);

	// how to convert degrees to radiant
	// degrees * Math.PI / 180;

	let R = 6371; // km
	let dLat = (lat2 - lat1).toRad();
	let dLon = (lon2 - lon1).toRad();
	lat1 = lat1.toRad();
	lat2 = lat2.toRad();


	let a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
		Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
	let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
	let d = R * c;
	return d;
};






/**
 * Get bearing between two coordinates (angle in degrees)
 * @param {Array} geoposition1 like [12.1234, 25.987]
 * @param {Array} geoposition2 like [12.1234, 25.987]
 * @returns {number} the angle in degrees
 */
function getBearing(geoposition1, geoposition2) {

	let lat1 = parseFloat(geoposition1[0]);
	let lng1 = parseFloat(geoposition1[1]);
	let lat2 = parseFloat(geoposition2[0]);
	let lng2 = parseFloat(geoposition2[1]);

	// how to convert radiant to degree
	// rad * 180 / Math.PI;

	let dLon = (lng2 - lng1);
	let y = Math.sin(dLon) * Math.cos(lat2);
	let x = Math.cos(lat1) * Math.sin(lat2) - Math.sin(lat1) * Math.cos(lat2) * Math.cos(dLon);
	let brng = Math.atan2(y, x);
	brng = brng * 180 / Math.PI;
	let bearing = 360 - ((brng + 360) % 360);

	return bearing;
};












export default {
	getTilesWithinBounds,
	getDistance,
	getBearing
}

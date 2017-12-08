import { StyleSheet } from 'react-native';

export default StyleSheet.create({
	container: {
        flex: 1,
        flexDirection: 'column'
    },
	
    header: {
        flex: .25,
        backgroundColor: '#DCDCDC'
    },
	header_box: {
        flexDirection: 'row',
    },
	title: {
		fontSize: 20,
		fontWeight: 'bold',
		flex: 1
	},
	votes: {
		width: 75,
	},
	
    body: {
        flex: .5,
        backgroundColor: '#FFF'
    },
	fulltext: {
		fontSize: 18,
	},
	
	footer: {
        flex: .25,
        backgroundColor: '#000'
    },
	buttons: {},
});
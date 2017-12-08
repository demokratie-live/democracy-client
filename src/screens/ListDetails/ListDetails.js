import React, { Component } from 'react';
import { View, Text, ScrollView, Button } from 'react-native';

import styles from './ListDetailsStyles.js';
import detailsData from '../../data/details.json';

export default class ListDetailsScreen extends Component {
	//renderListData = ({ item }) => () => <Row {...item} />;

	render() {
		return (
			<View style={styles.container}>
				<View style={styles.header}>
					<View style={styles.header_box}>
						<Text style={styles.title}>
							{detailsData.title}
						</Text>
						<Text style={styles.votes}>
							{detailsData.votes}
						</Text>
					</View>
					<Text style={styles.date}>
						{detailsData.date}
					</Text>
				</View>
				<ScrollView style={styles.body}>
					<Text style={styles.fulltext}>
						{detailsData.text}{'\n'}{'\n'}
					</Text>
				</ScrollView>
				<View style={[styles.footer]}>
						<Button
							onPress={this.onPressAgree}
							title="Yes"
							color="#006400"
							style={styles.buttons}
							accessibilityLabel="Learn more about this purple button"
						/>
						<Button
							onPress={this.onPressUndecided}
							title="?"
							color="#0000FF"
							style={styles.buttons}
							accessibilityLabel="Learn more about this purple button"
						/>
						<Button
							onPress={this.onPressDisagree}
							title="No"
							color="#8B0000"
							style={styles.buttons}
							accessibilityLabel="Learn more about this purple button"
						/>
				</View>
			</View>
		);
	}
	
	onPressAgree(){
		console.log('button clicked');
    }
	
	onPressUndecided(){
		console.log('button clicked');
    }
	
	onPressDisagree(){
		console.log('button clicked');
    }
}
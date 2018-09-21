import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, TextInput } from'react-native';

const { width, height } = Dimensions.get('window');

export default class ToDo extends Component{
    state = {
        isEditing: false,
        isCompleted: false,
        toDoValue: ""
    }
    render(){
        const {isCompleted, isEditing, toDoValue} = this.state;
        const {text} = this.props;
        return (
        <View style={styles.container}>
            <View style={styles.column}>
                <TouchableOpacity onPress={this._toggleComplete}>
                    <View style={[styles.circle, isCompleted ? styles.completedCircle : styles.uncompletedCircle]} />
                </TouchableOpacity>
                {isEditing ? (
                    <TextInput style={[styles.text, styles.input, isCompleted ? styles.completedText : styles.uncompletedText]} 
                    value={toDoValue} 
                    multiline={true} 
                    onChangeText={this._controlEditToDo} 
                    returnKeyType={'done'} 
                    onBlur={this._finishEditing} />
                ) : (
                    <Text style={[styles.text, isCompleted ? styles.completedText : styles.uncompletedText]}>{text}</Text>
                )}
            </View>
                {isEditing ? (
                    <View style={styles.actions}>
                        <TouchableOpacity onPressOut={this._finishEditing}>
                            <View style={styles.actionContainer}>
                                <Text style={styles.actionText}>V</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                ) : (
                    <View style={styles.actions}>
                        <TouchableOpacity onPressOut={this._startEditing}>
                            <View style={styles.actionContainer}>
                                <Text style={styles.actionText}>Edit</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <View style={styles.actionContainer}>
                                <Text style={styles.actionText}>Del</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                )}
        </View>
        )
    };
    _toggleComplete = () => {
        this.setState(prevState => {
            return({
                isCompleted: !prevState.isCompleted
            })
        })
    };
    _startEditing = () => {
        const {text} = this.props;
        this.setState({
            isEditing: true,
            toDoValue: text
        })
    };
    _finishEditing = () => {
        this.setState({
            isEditing: false
        })
    }
    _controlEditToDo = text => {
        this.setState({
          toDoValue: text
        })
    }
}

const styles = StyleSheet.create({
    container: {
        width: width - 50,
        borderBottomColor: '#bbb',
        borderBottomWidth: StyleSheet.hairlineWidth,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    text: {
        fontWeight: '600',
        fontSize: 20,
        marginVertical: 10,
        padding: 10
    },
    circle: {
        width: 30,
        height: 30,
        borderRadius: 15,
        borderColor: 'red',
        borderWidth: 5,
        marginRight: 20
    },
    completedCircle: {
        borderColor: '#bbb'
    },
    uncompletedCircle: {
        borderColor: '#f23657'
    },
    completedText: {
        color: '#bbb',
        textDecorationLine: 'line-through'
    },
    uncompletedText: {
        color: '#353535'
    },
    column: {
        flexDirection: 'row',
        alignItems: 'center',
        width: width / 2,
    },
    actions: {
        flexDirection: 'row'
    },
    actionContainer: {
        marginVertical: 10,
        marginHorizontal: 10
    },
    input: {
        width: width / 2,
        marginVertical: 10,
        padding: 10
    }
})
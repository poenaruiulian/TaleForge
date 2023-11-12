import {
    FlatList, Keyboard,
    KeyboardAvoidingView,
    Platform,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';
import OpenAI from "openai";
import React, {useState} from "react";

import axios from "axios";

const apiKey = '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';

async function generateStoryLine({inputText}: { inputText: string }) {
    try {
        const response = await axios.post(
            'https://api.openai.com/v1/engines/text-davinci-003/completions',
            {
                prompt: "Give me just one simple but intriguing next sentence in a story based on the sentence:" + inputText,
                max_tokens: 50
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${apiKey}`
                }
            }
        );
        return response.data.choices[0].text.trim();
    } catch (error) {
        console.error('Error generating story line:', error);
        throw error;
    }
}

export default function App() {

    const [conversation, setConversation] = useState<String[]>([])
    const [userMessage, setUserMessage] = useState("")
    const [loading, setLoading] = useState(false)
    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.container}>


            <View style={styles.messageContent}>
                <View style={{height: 50}}><Text></Text></View>

                <FlatList data={conversation} renderItem={({item}) =>
                    <>
                        <View
                            style={{
                                width: "100%",
                                alignItems: conversation.indexOf(item) % 2 == 0 ? "flex-end" : "flex-start",
                            }}
                        >
                            <Text
                                style={{
                                    padding: 10,
                                    width: "60%",
                                    color: conversation.indexOf(item) % 2 == 0 ? "blue" : "red"
                                }}
                            >{item}</Text>
                        </View>
                        <View style={{height: 3}}><Text></Text></View>
                    </>
                }/>
            </View>
            <View style={styles.writingBar}>
                <TextInput
                    style={{
                        width: "70%",
                        backgroundColor: "white",
                        height: 50,
                        borderRadius: 10
                    }}
                    placeholder={"Tell you story..."}
                    textAlign={"center"}
                    value={userMessage}
                    onChangeText={(text) => {
                        setUserMessage(text)
                    }}
                />
                <TouchableOpacity
                    disabled={loading}
                    style={{
                        width: "20%",
                        alignItems: "center",
                        justifyContent: "center",
                        backgroundColor:"yellow",
                        borderRadius: 10,
                        height:50

                    }}

                    onPress={() => {
                        let aux = conversation
                        aux.push(userMessage)
                        setConversation(aux)
                        setUserMessage("");
                        setLoading(true)
                        generateStoryLine({inputText: userMessage}).then((response) => {
                            aux.push(response)
                            setConversation(aux);
                            Keyboard.dismiss();
                            setLoading(false);
                        });

                    }}
                >
                    <Text style={{alignSelf:"center"}}>
                        {loading? "Sending" : "Send"}
                    </Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center"
    },

    writingBar: {
        backgroundColor: "gray",
        width: "100%",
        flexDirection: "row",
        gap:10,
        height: "15%",
        alignItems: "center",
        justifyContent: "center"
    },
    messageContent: {
        height: "85%",
        width:"100%"
    }
});

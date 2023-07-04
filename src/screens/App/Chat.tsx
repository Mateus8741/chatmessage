import React, { useCallback, useLayoutEffect, useState } from "react";

import {
  addDoc,
  collection,
  getFirestore,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";

import { getAuth } from "firebase/auth";

import { Box, HStack } from "native-base";
import { GiftedChat } from "react-native-gifted-chat";

import Logo from '../../assets/logo.svg';

export function Chat() {
  const [messages, setMessages] = useState<any[]>([]);

  const db = getFirestore();
  const q = query(collection(db, "message"), orderBy("createdAt", "desc"));
  const unsubscribe = onSnapshot(q, (snapshot) => {
    setMessages(
      snapshot.docs.map((doc) => {
        return {
          _id: doc.id,
          createdAt: doc.data().createdAt,
          text: doc.data().text,
          user: doc.data().user,
        };
      })
    );
  });

  useLayoutEffect(() => {
    return () => {
      unsubscribe();
    };
  }, []);

  const onSend = useCallback((messages = []) => {
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, messages)
    );

    const { _id, createdAt, text, user } = messages[0];
    addDoc(collection(db, "message"), {
      _id,
      createdAt,
      text,
      user,
    });
  }, []);

  return (
    <Box safeAreaBottom safeAreaTop flex={1} bg="white">
      <HStack>
        <Box
          flex={1}
          bg="white"
          alignItems="center"
          py="2"
          borderBottomColor="gray.200"
          borderBottomWidth={1}
        >
          <Logo width={60} height={60} />
        </Box>
      </HStack>
      <GiftedChat
        messages={messages}
        onSend={(messages: any) => onSend(messages)}
        user={{
          _id: getAuth().currentUser?.uid.toString() || "",
          avatar:
            "https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
        }}
        messagesContainerStyle={{
          backgroundColor: "#fff",
        }}
        dateFormat="DD/MM/YYYY"
        timeFormat="HH:mm"
        renderDay={() => null}
        renderTime={() => null}
        showUserAvatar
      />
    </Box>
  );
}

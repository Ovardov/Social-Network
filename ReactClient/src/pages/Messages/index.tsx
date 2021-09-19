// Libraries
import React, { FC, useEffect, useState, useRef, useCallback } from 'react';
import io from 'socket.io-client';
import { useSelector } from 'react-redux';
// Components
import Avatar from '../../components/Global/Avatar';
import Icon from '../../components/Global/Icon';
import Loader from '../../components/Global/Loader';
// Services
import { getUserFriends } from '../../services/userService';
import { getAllRoomMessages } from '../../services/conversationService';
// Models
import { AppState } from '../../redux';
import { UserState } from '../../redux/actions/User';
import Message_ from '../../models/Message';
import User_ from '../../models/User';
// Utils
import { getTimeDifference } from '../../utils/date';
// Icons
import SendIcon from '../../../public/images/send-icon.svg';
import { Colors, Sizes, SocketActions } from '../../utils/enums';
// Styles
import styles from './index.module.scss';

const Messages: FC = () => {
  const user = useSelector<AppState, UserState>(state => state.user);
  const myUsername = user?.username;
  const messagesContainerRef = useRef(null);

  const [isLoading, setIsLoading] = useState(false);
  const [socket, setSocket] = useState(null);
  const [messages, setMessages] = useState<Message_[]>([]);
  const [users, setUsers] = useState<User_[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [currentRoom, setCurrentRoom] = useState('');

  useEffect(() => {
    const newSocket = io(process.env.SOCKET_URL, { transports: ['websocket'], upgrade: false, });
    setSocket(newSocket);

    newSocket?.on(SocketActions.MESSAGE, (newMessage: Message_) => {
      onMessage(newMessage);
    });

    newSocket?.on(SocketActions.ERROR, (error: string) => {
      onReceiveError(error);
    });

    return () => {
      newSocket.disconnect();
    };
  }, []);

  useEffect(() => {
    const initUsers = async () => {
      setIsLoading(true);

      try {
        const allFriends = await getUserFriends(myUsername);

        setUsers(allFriends);
      } catch (err) {
        console.log(err);
      }

      setIsLoading(false);
    };

    initUsers();
  }, []);

  const onMessage = (newMessage: Message_) => {
    setMessages((oldMessages) => {
      if (oldMessages?.length > 0) {
        return [
          ...oldMessages,
          newMessage
        ];
      }

      return [newMessage];
    });
  };

  const onReceiveError = (error: string) => {
    console.log(error);
  };

  const generateRoomName = (username: string) => {
    // Room name is represented like 'john-doe' => "username"-"username"
    return [username, myUsername]
      .sort((a: string, b: string) => a.localeCompare(b))
      .join('-');
  };

  const joinRoom = (roomName: string) => {
    if (roomName) {
      socket.emit('join', roomName);
    }
  };

  const sendMessage = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();

      if (socket) {
        socket.emit('message', { room: currentRoom, message: newMessage, sender: user.id, });

        setNewMessage('');
      }
    } catch (err) {
      console.log(err);
    }
  };

  const onChangeUser = async (e: React.MouseEvent<HTMLElement>, username: string) => {
    try {
      e.stopPropagation();
      setIsLoading(true);

      const room = generateRoomName(username);
      joinRoom(room);

      const { messages, } = await getAllRoomMessages(room);

      setMessages(messages);
      setCurrentRoom(room);
    } catch (err) {
      console.log(err);
    }

    setIsLoading(false);
  };

  // Subscribe to DOM event
  useEffect(() => {
    if (messagesContainerRef.current) {
      // Everytime when new message is addde in HTML DOM, this event is triggered
      messagesContainerRef.current.addEventListener('DOMNodeInserted', () => {
        scrollMessagesToBottom();
      });
    }
  }, []);

  const scrollMessagesToBottom = () => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scroll({ top: messagesContainerRef.current.scrollHeight, behavior: 'smooth', });
    }
  };

  const getTimeDifferenceMemoized = useCallback((date: Date) => {
    return getTimeDifference(date);
  }, []);

  const findUser = useCallback((id: string) => {
    return user.id === id
      ? user
      : users?.find(currentUser => currentUser.id === id);
  }, [user, users]);

  return (
    <div className={styles.container}>
      <section className={styles.users}>
        {users.length > 0 && users.map((userFromChat) => (
          <article
            key={userFromChat.username}
            className={`${styles.user} ${currentRoom?.includes(userFromChat.username) ? styles.selected : ''}`}
            onClick={(e) => onChangeUser(e, userFromChat.username)}
          >
            <Avatar
              type='image-with-info'
              user={userFromChat}
              size={Sizes.SM}
              stopRedirectToProfile
            />
          </article>
        ))}
      </section>


      <section className={styles.content}>
        <div
          ref={messagesContainerRef}
          className={styles.messages}
        >
          <>
            {isLoading && (
              <div className={styles['loader-container']}>
                <Loader type='local' color={Colors.PRIMARY} />
              </div>
            )}

            {!isLoading && !currentRoom && <h4 className={styles.text}>Please select a conversation!</h4>}

            {!isLoading && messages?.length > 0 && messages.map(({ id, sender, message, createdAt, }) => {
              const currentUser = findUser(sender);

              return (
                <div
                  key={id}
                  className={`${styles['message-container']} ${sender === user.id ? styles.right : styles.left}`}
                >
                  <Avatar type='image' user={currentUser} size={Sizes.SM} />
                  <span className={styles.message}>{message}</span>
                  <span className={styles.info}>{getTimeDifferenceMemoized(createdAt)}</span>
                </div>
              );
            })}
          </>
        </div>

        <form
          className={styles.form}
          onSubmit={sendMessage}
        >
          <input
            className={styles.input}
            placeholder='Add your message'
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            disabled={!currentRoom}
          />

          <button
            type='submit'
            className={styles['send-button']}
            disabled={newMessage.length === 0}
          >
            <span className={styles.text}>Sent</span>

            <Icon
              color={Colors.BACKGROUND}
              size={Sizes.XS}
              alt='Send Message Icon'
              Component={SendIcon}
            />
          </button>
        </form>
      </section>
    </div >
  );
};

export default Messages;

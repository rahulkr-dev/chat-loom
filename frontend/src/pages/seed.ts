const chatex = [
    {
      profileImage: 'https://www.gravatar.com/avatar/2c7d99fe281ecd3bcd65ab915bac6dd5?s=250',
      username: 'rahul8181',
      lastMessage: 'Hello',
      lastDate: '2021-01-01',
      notification: 3
    },
    {
      profileImage: 'https://www.gravatar.com/avatar/2c7d99fe281ecd3bcd65ab915bac6dd5?s=250',
      username: 'john_doe',
      lastMessage: 'Hey there!',
      lastDate: '2021-02-05',
      notification: 1
    },
    {
      profileImage: '',
      username: 'sara_smith',
      lastMessage: 'What are you up to?',
      lastDate: '2021-03-10',
      notification: 0
    },
    {
      profileImage: 'https://via.placeholder.com/150',
      username: 'mike92',
      lastMessage: 'Nice weather today!',
      lastDate: '2021-04-15',
      notification: 2
    },
    // Add more entries as needed...
  ];

  const dummyChatMessages = [
    {
      type: 'sent',
      text: 'Hey, how are you?',
      createdAt: '2024-02-16T08:00:00Z',
      seen: true
    },
    {
      type: 'received',
      text: 'I\'m doing well, thanks! How about you?',
      createdAt: '2024-02-16T08:05:00Z'
    },
    {
      type: 'sent',
      text: 'I\'m good too, just busy with work.',
      createdAt: '2024-02-16T08:10:00Z',
      seen: true
    },
    {
      type: 'received',
      text: 'Understood. Let me know if you need any help.',
      createdAt: '2024-02-16T08:15:00Z'
    },
    // Add more chat messages here
  ];
  

  const chatList =[...chatex]
  const chatMsg = [...dummyChatMessages]

  for(let i=0;i<50;i++){
    const randomNo = Math.floor(Math.random() * chatex.length);
    chatList.push(chatex[randomNo])
    chatMsg.push(dummyChatMessages[randomNo])
  }
  
  export {chatList,chatMsg}